import { NextRequest, NextResponse } from 'next/server';
import { withRole, AuthenticatedRequest } from '@/lib/middleware/auth';
import { withRateLimit, rateLimits } from '@/lib/middleware/rate-limit';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     description: Retrieves comprehensive dashboard data for administrators including platform statistics, revenue data, and user analytics
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data
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
 *                     totalUsers:
 *                       type: integer
 *                       description: Total number of active users
 *                     totalCourses:
 *                       type: integer
 *                       description: Total number of courses
 *                     totalRevenue:
 *                       type: number
 *                       description: Total revenue from completed transactions
 *                     monthlyGrowth:
 *                       type: number
 *                       description: Monthly user growth percentage
 *                     userRegistrations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                           count:
 *                             type: integer
 *                       description: Daily user registrations for the last 30 days
 *                     revenueStats:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             format: date
 *                           revenue:
 *                             type: number
 *                       description: Monthly revenue for the last 12 months
 *                     topCourses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           course:
 *                             $ref: '#/components/schemas/Course'
 *                           enrollments:
 *                             type: integer
 *                           revenue:
 *                             type: number
 *                       description: Top courses by enrollment and revenue
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Admin access required
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
async function getAdminDashboardHandler(req: AuthenticatedRequest) {
  const supabase = createServiceClient();

  try {
    // Get total users count
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ACTIVE');

    // Get total courses count
    const { count: totalCourses } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    // Get total revenue
    const { data: revenueData } = await supabase
      .from('transactions')
      .select('amount')
      .eq('status', 'COMPLETED');

    const totalRevenue = revenueData?.reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

    // Get user registrations for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: userRegistrations } = await supabase
      .from('users')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    // Group by date
    const registrationsByDate = userRegistrations?.reduce((acc, user) => {
      const date = new Date(user.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const userRegistrationsChart = Object.entries(registrationsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    // Get revenue stats for the last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const { data: monthlyRevenue } = await supabase
      .from('transactions')
      .select('amount, created_at')
      .eq('status', 'COMPLETED')
      .gte('created_at', twelveMonthsAgo.toISOString());

    const revenueByMonth = monthlyRevenue?.reduce((acc, transaction) => {
      const month = new Date(transaction.created_at).toISOString().substring(0, 7);
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>) || {};

    const revenueStats = Object.entries(revenueByMonth).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    // Get top courses by enrollment
    const { data: topCourses } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        price,
        enrollments(count)
      `)
      .order('enrollments.count', { ascending: false })
      .limit(10);

    // Calculate monthly growth
    const currentMonth = new Date().toISOString().substring(0, 7);
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthKey = lastMonth.toISOString().substring(0, 7);

    const currentMonthUsers = registrationsByDate[currentMonth] || 0;
    const lastMonthUsers = registrationsByDate[lastMonthKey] || 0;
    const monthlyGrowth = lastMonthUsers > 0 ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100 : 0;

    const dashboardData = {
      totalUsers: totalUsers || 0,
      totalCourses: totalCourses || 0,
      totalRevenue,
      monthlyGrowth,
      userRegistrations: userRegistrationsChart,
      revenueStats,
      topCourses: topCourses?.map(course => ({
        course,
        enrollments: course.enrollments?.[0]?.count || 0,
        revenue: (course.enrollments?.[0]?.count || 0) * course.price,
      })) || [],
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(rateLimits.api)(withRole(['ADMIN'])(getAdminDashboardHandler));