import { NextRequest, NextResponse } from 'next/server';
import { withRole, AuthenticatedRequest } from '@/lib/middleware/auth';
import { withValidation, courseSchema } from '@/lib/middleware/validation';
import { withRateLimit, rateLimits } from '@/lib/middleware/rate-limit';
import { createServiceClient } from '@/lib/supabase/server';

async function getCoursesHandler(req: AuthenticatedRequest) {
  const supabase = createServiceClient();
  const userId = req.user!.id;
  const { searchParams } = new URL(req.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const status = searchParams.get('status');
  
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('courses')
      .select(`
        *,
        enrollments(count)
      `)
      .eq('created_by', userId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: courses, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    // Get total count
    let countQuery = supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', userId);

    if (status) {
      countQuery = countQuery.eq('status', status);
    }

    const { count: total } = await countQuery;

    return NextResponse.json({
      success: true,
      data: courses,
      pagination: {
        page,
        limit,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Teacher courses fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

async function createCourseHandler(
  req: AuthenticatedRequest,
  body: z.infer<typeof courseSchema>
) {
  const supabase = createServiceClient();
  const userId = req.user!.id;

  try {
    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        ...body,
        created_by: userId,
        status: 'DRAFT',
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course created successfully',
    });
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(rateLimits.api)(withRole(['TEACHER', 'ADMIN'])(getCoursesHandler));
export const POST = withRateLimit(rateLimits.api)(
  withRole(['TEACHER', 'ADMIN'])(
    withValidation(courseSchema)(createCourseHandler)
  )
);