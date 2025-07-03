import { NextRequest, NextResponse } from 'next/server';
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
xport function withRole(allowedRoles: string[]) {
  return function (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return async function (req: NextRequest) {
      try {
        const supabase = createServiceClient();
        
        // Get the authorization headerexport interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return NextResponse.json(
            { success: false, error: 'Authentication required' },
            { status: 401 }
          );
        }

        const token = authHeader.substring(7);
        
        // Verify the token and get user
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        
        if (authError || !user) {
          return NextResponse.json(
            { success: false, error: 'Invalid authentication token' },
            { status: 401 }
          );
        }

        // Get user profile with role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          return NextResponse.json(
            { success: false, error: 'User profile not found' },
            { status: 403 }
          );
        }

        // Check if user has required role
        if (!allowedRoles.includes(profile.role)) {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions' },
            { status: 403 }
          );
        }

        // Add user info to request
        const authenticatedReq = req as AuthenticatedRequest;
        authenticatedReq.user = {
          id: user.id,
          email: user.email || '',
          role: profile.role,
        };

        return handler(authenticatedReq);
      } catch (error) {
        console.error('Authentication middleware error:', error);
        return NextResponse.json(
          { success: false, error: 'Authentication failed' },
          { status: 500 }
        );
      }
    };
  };
}