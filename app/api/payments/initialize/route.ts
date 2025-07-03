import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth';
import { withValidation } from '@/lib/middleware/validation';
import { withRateLimit, rateLimits } from '@/lib/middleware/rate-limit';
import { PaymentService } from '@/lib/services/payment-service';
import { createServiceClient } from '@/lib/supabase/server';
import { z } from 'zod';

const initializePaymentSchema = z.object({
  courseId: z.string().uuid(),
  gateway: z.enum(['STRIPE', 'PAYSTACK', 'FLUTTERWAVE']),
  currency: z.string().length(3),
  returnUrl: z.string().url().optional(),
});

/**
 * @swagger
 * /api/payments/initialize:
 *   post:
 *     summary: Initialize payment for course enrollment
 *     description: Creates a payment session for course enrollment using the specified payment gateway
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - gateway
 *               - currency
 *             properties:
 *               courseId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the course to enroll in
 *               gateway:
 *                 type: string
 *                 enum: [STRIPE, PAYSTACK, FLUTTERWAVE]
 *                 description: Payment gateway to use
 *               currency:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 3
 *                 description: Currency code (e.g., USD, NGN, GHS)
 *               returnUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL to redirect to after payment completion
 *     responses:
 *       200:
 *         description: Payment initialization successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactionId:
 *                       type: string
 *                       format: uuid
 *                     redirectUrl:
 *                       type: string
 *                       format: uri
 *                     clientSecret:
 *                       type: string
 *                     gatewayReference:
 *                       type: string
 *       400:
 *         description: Invalid request or course is free
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
async function initializePaymentHandler(
  req: AuthenticatedRequest,
  body: z.infer<typeof initializePaymentSchema>
) {
  const userId = req.user!.id;
  const userEmail = req.user!.email;

  try {
    // Get course details
    const supabase = createServiceClient();
    const { data: course, error } = await supabase
      .from('courses')
      .select('id, title, price, currency, status')
      .eq('id', body.courseId)
      .eq('status', 'PUBLISHED')
      .single();

    if (error || !course) {
      return NextResponse.json(
        { success: false, error: 'Course not found or not available' },
        { status: 404 }
      );
    }

    if (course.price === 0) {
      return NextResponse.json(
        { success: false, error: 'This course is free' },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', body.courseId)
      .single();

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    const paymentData = await PaymentService.initializePayment({
      userId,
      courseId: body.courseId,
      amount: course.price,
      currency: body.currency || course.currency,
      gateway: body.gateway,
      customerEmail: userEmail,
      returnUrl: body.returnUrl,
    });

    return NextResponse.json({
      success: true,
      data: paymentData,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(rateLimits.api)(
  withAuth(
    withValidation(initializePaymentSchema)(initializePaymentHandler)
  )
);