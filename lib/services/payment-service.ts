import Stripe from 'stripe';
import { Paystack } from 'paystack';
import Flutterwave from 'flutterwave-node-v3';
import { createServiceClient } from '../supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY!,
  process.env.FLUTTERWAVE_SECRET_KEY!
);

export interface PaymentInitiateRequest {
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  gateway: 'STRIPE' | 'PAYSTACK' | 'FLUTTERWAVE';
  customerEmail: string;
  returnUrl?: string;
}

export interface PaymentInitiateResponse {
  transactionId: string;
  redirectUrl?: string;
  clientSecret?: string;
  gatewayReference: string;
}

export class PaymentService {
  static async initializePayment(data: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    const supabase = createServiceClient();

    // Create transaction record
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: data.userId,
        course_id: data.courseId,
        amount: data.amount,
        currency: data.currency,
        gateway: data.gateway,
        gateway_reference: `temp_${Date.now()}`,
        status: 'PENDING',
      })
      .select()
      .single();

    if (error || !transaction) {
      throw new Error('Failed to create transaction record');
    }

    let result: PaymentInitiateResponse;

    switch (data.gateway) {
      case 'STRIPE':
        result = await this.initializeStripePayment(data, transaction.id);
        break;
      case 'PAYSTACK':
        result = await this.initializePaystackPayment(data, transaction.id);
        break;
      case 'FLUTTERWAVE':
        result = await this.initializeFlutterwavePayment(data, transaction.id);
        break;
      default:
        throw new Error('Unsupported payment gateway');
    }

    // Update transaction with gateway reference
    await supabase
      .from('transactions')
      .update({ gateway_reference: result.gatewayReference })
      .eq('id', transaction.id);

    return {
      ...result,
      transactionId: transaction.id,
    };
  }

  private static async initializeStripePayment(
    data: PaymentInitiateRequest,
    transactionId: string
  ): Promise<Omit<PaymentInitiateResponse, 'transactionId'>> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency.toLowerCase(),
      metadata: {
        transaction_id: transactionId,
        user_id: data.userId,
        course_id: data.courseId,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret!,
      gatewayReference: paymentIntent.id,
    };
  }

  private static async initializePaystackPayment(
    data: PaymentInitiateRequest,
    transactionId: string
  ): Promise<Omit<PaymentInitiateResponse, 'transactionId'>> {
    const response = await paystack.transaction.initialize({
      email: data.customerEmail,
      amount: Math.round(data.amount * 100), // Convert to kobo
      currency: data.currency,
      callback_url: data.returnUrl,
      metadata: {
        transaction_id: transactionId,
        user_id: data.userId,
        course_id: data.courseId,
      },
    });

    return {
      redirectUrl: response.data.authorization_url,
      gatewayReference: response.data.reference,
    };
  }

  private static async initializeFlutterwavePayment(
    data: PaymentInitiateRequest,
    transactionId: string
  ): Promise<Omit<PaymentInitiateResponse, 'transactionId'>> {
    const payload = {
      tx_ref: `flw_${transactionId}_${Date.now()}`,
      amount: data.amount,
      currency: data.currency,
      redirect_url: data.returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
      customer: {
        email: data.customerEmail,
      },
      meta: {
        transaction_id: transactionId,
        user_id: data.userId,
        course_id: data.courseId,
      },
    };

    const response = await flw.Charge.card(payload);

    return {
      redirectUrl: response.meta.authorization.redirect,
      gatewayReference: payload.tx_ref,
    };
  }

  static async handleWebhook(
    gateway: string,
    payload: any,
    signature: string
  ): Promise<void> {
    const supabase = createServiceClient();

    switch (gateway) {
      case 'stripe':
        await this.handleStripeWebhook(payload, signature);
        break;
      case 'paystack':
        await this.handlePaystackWebhook(payload, signature);
        break;
      case 'flutterwave':
        await this.handleFlutterwaveWebhook(payload, signature);
        break;
    }
  }

  private static async handleStripeWebhook(payload: any, signature: string): Promise<void> {
    const supabase = createServiceClient();
    
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const transactionId = paymentIntent.metadata.transaction_id;

        await supabase
          .from('transactions')
          .update({ status: 'COMPLETED' })
          .eq('id', transactionId);

        // Auto-enroll user in course
        await this.enrollUserInCourse(
          paymentIntent.metadata.user_id,
          paymentIntent.metadata.course_id
        );
      }
    } catch (error) {
      console.error('Stripe webhook error:', error);
      throw error;
    }
  }

  private static async handlePaystackWebhook(payload: any, signature: string): Promise<void> {
    // Implement Paystack webhook verification and processing
    const supabase = createServiceClient();
    
    if (payload.event === 'charge.success') {
      const transactionId = payload.data.metadata.transaction_id;

      await supabase
        .from('transactions')
        .update({ status: 'COMPLETED' })
        .eq('id', transactionId);

      await this.enrollUserInCourse(
        payload.data.metadata.user_id,
        payload.data.metadata.course_id
      );
    }
  }

  private static async handleFlutterwaveWebhook(payload: any, signature: string): Promise<void> {
    // Implement Flutterwave webhook verification and processing
    const supabase = createServiceClient();
    
    if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
      const transactionId = payload.data.meta.transaction_id;

      await supabase
        .from('transactions')
        .update({ status: 'COMPLETED' })
        .eq('id', transactionId);

      await this.enrollUserInCourse(
        payload.data.meta.user_id,
        payload.data.meta.course_id
      );
    }
  }

  private static async enrollUserInCourse(userId: string, courseId: string): Promise<void> {
    const supabase = createServiceClient();

    await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'ACTIVE',
      });
  }
}