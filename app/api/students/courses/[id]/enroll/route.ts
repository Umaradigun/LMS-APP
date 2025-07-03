import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth';
import { withRateLimit, rateLimits } from '@/lib/middleware/rate-limit';
import { createServiceClient } from '@/lib/supabase/server';

async function enrollHandler(req: AuthenticatedRequest, { params }: { params: { id: string } }) {
  const supabase = createServiceClient();
  const userId = req.user!.id;
  const courseId = params.id;

  try {
    // Check if course exists and is published
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id, title, price, status')
      .eq('id', courseId)
      .eq('status', 'PUBLISHED')
      .single();

    if (courseError || !course) {
      return NextResponse.json(
        { success: false, error: 'Course not found or not available' },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Check if course is free or requires payment
    if (course.price > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment required for this course',
          requiresPayment: true,
          coursePrice: course.price
        },
        { status: 402 }
      );
    }

    // Enroll user in free course
    const { data: enrollment, error: enrollError } = await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'ACTIVE',
      })
      .select()
      .single();

    if (enrollError) {
      throw enrollError;
    }

    // Send notification
    await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: 'COURSE_UPDATE',
        title: 'Course Enrollment Successful',
        message: `You have successfully enrolled in "${course.title}"`,
      });

    return NextResponse.json({
      success: true,
      data: enrollment,
      message: 'Successfully enrolled in course',
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(rateLimits.api)(withAuth(enrollHandler));