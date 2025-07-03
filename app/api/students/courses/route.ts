import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth';
import { withRateLimit, rateLimits } from '@/lib/middleware/rate-limit';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/students/courses:
 *   get:
 *     summary: Get enrolled courses for student
 *     description: Retrieves a paginated list of courses the authenticated student is enrolled in
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter courses by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search courses by title
 *     responses:
 *       200:
 *         description: List of enrolled courses with progress
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Course'
 *                       - type: object
 *                         properties:
 *                           enrollment:
 *                             $ref: '#/components/schemas/Enrollment'
 *                           progress:
 *                             type: object
 *                             properties:
 *                               percent_completed:
 *                                 type: number
 *                                 minimum: 0
 *                                 maximum: 100
 *                               time_spent:
 *                                 type: number
 *                                 minimum: 0
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Authentication required
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
async function getCoursesHandler(req: AuthenticatedRequest) {
  const supabase = createServiceClient();
  const userId = req.user!.id;
  const { searchParams } = new URL(req.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  const offset = (page - 1) * limit;

  try {
    let query = supabase
      .from('enrollments')
      .select(`
        id,
        enrolled_at,
        status,
        courses(
          id,
          title,
          description,
          thumbnail,
          category,
          price,
          currency,
          status
        )
      `)
      .eq('user_id', userId);

    if (category) {
      query = query.eq('courses.category', category);
    }

    if (search) {
      query = query.ilike('courses.title', `%${search}%`);
    }

    const { data: enrollments, error } = await query
      .order('enrolled_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (category) {
      countQuery = countQuery.eq('courses.category', category);
    }

    const { count: total } = await countQuery;

    // Get progress for each course
    const courseIds = enrollments?.map(e => e.courses?.id).filter(Boolean) || [];
    
    const { data: progressData } = await supabase
      .from('progress')
      .select('course_id, percent_completed, time_spent')
      .eq('user_id', userId)
      .in('course_id', courseIds);

    const progressMap = new Map(
      progressData?.map(p => [p.course_id, p]) || []
    );

    const coursesWithProgress = enrollments?.map(enrollment => ({
      ...enrollment.courses,
      enrollment: {
        id: enrollment.id,
        enrolled_at: enrollment.enrolled_at,
        status: enrollment.status,
      },
      progress: progressMap.get(enrollment.courses?.id) || {
        percent_completed: 0,
        time_spent: 0,
      },
    }));

    return NextResponse.json({
      success: true,
      data: coursesWithProgress,
      pagination: {
        page,
        limit,
        total: total || 0,
        totalPages: Math.ceil((total || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(rateLimits.api)(withAuth(getCoursesHandler));