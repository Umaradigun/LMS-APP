import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware/auth';
import { withRateLimit, rateLimits } from '@/lib/middleware/rate-limit';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/students/dashboard:
 *   get:
 *     summary: Get student dashboard data
 *     description: Retrieves comprehensive dashboard data for the authenticated student including course progress, notifications, and statistics
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data
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
 *                     enrolledCourses:
 *                       type: integer
 *                       description: Number of courses the student is enrolled in
 *                     completedCourses:
 *                       type: integer
 *                       description: Number of courses the student has completed
 *                     inProgressCourses:
 *                       type: integer
 *                       description: Number of courses currently in progress
 *                     totalLearningTime:
 *                       type: number
 *                       description: Total time spent learning in minutes
 *                     recentCourses:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Course'
 *                       description: Recently enrolled courses
 *                     upcomingDeadlines:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           title:
 *                             type: string
 *                           due_date:
 *                             type: string
 *                             format: date-time
 *                     recentNotifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           type:
 *                             type: string
 *                           title:
 *                             type: string
 *                           message:
 *                             type: string
 *                           read_at:
 *                             type: string
 *                             format: date-time
 *                             nullable: true
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                     progressData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           course_id:
 *                             type: string
 *                             format: uuid
 *                           percent_completed:
 *                             type: number
 *                             minimum: 0
 *                             maximum: 100
 *                           time_spent:
 *                             type: number
 *                             minimum: 0
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
async function getDashboardHandler(req: AuthenticatedRequest) {
  const supabase = createServiceClient();
  const userId = req.user!.id;

  try {
    // Get enrolled courses count
    const { count: enrolledCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'ACTIVE');

    // Get completed courses count
    const { count: completedCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'COMPLETED');

    // Get in-progress courses
    const { data: progressData } = await supabase
      .from('progress')
      .select(`
        course_id,
        percent_completed,
        time_spent,
        courses(id, title, thumbnail)
      `)
      .eq('user_id', userId)
      .lt('percent_completed', 100);

    // Get recent courses
    const { data: recentCourses } = await supabase
      .from('enrollments')
      .select(`
        course_id,
        enrolled_at,
        courses(id, title, description, thumbnail, category)
      `)
      .eq('user_id', userId)
      .eq('status', 'ACTIVE')
      .order('enrolled_at', { ascending: false })
      .limit(5);

    // Get upcoming deadlines
    const { data: upcomingDeadlines } = await supabase
      .from('assignments')
      .select(`
        id,
        title,
        due_date,
        lessons(
          title,
          modules(
            title,
            courses(title)
          )
        )
      `)
      .gte('due_date', new Date().toISOString())
      .order('due_date', { ascending: true })
      .limit(10);

    // Get recent notifications
    const { data: notifications } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate total learning time
    const { data: timeData } = await supabase
      .from('progress')
      .select('time_spent')
      .eq('user_id', userId);

    const totalLearningTime = timeData?.reduce((sum, record) => sum + record.time_spent, 0) || 0;

    const dashboardData = {
      enrolledCourses: enrolledCount || 0,
      completedCourses: completedCount || 0,
      inProgressCourses: progressData?.length || 0,
      totalLearningTime,
      recentCourses: recentCourses?.map(enrollment => enrollment.courses) || [],
      upcomingDeadlines: upcomingDeadlines || [],
      recentNotifications: notifications || [],
      progressData: progressData || [],
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(rateLimits.api)(withAuth(getDashboardHandler));