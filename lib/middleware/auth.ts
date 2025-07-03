import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../services/auth-service';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    try {
      const user = await AuthService.getUserFromRequest(req);
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      (req as AuthenticatedRequest).user = user;
      return await handler(req as AuthenticatedRequest);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

export function withRole(roles: string[]) {
  return function(handler: (req: AuthenticatedRequest) => Promise<Response>) {
    return withAuth(async (req: AuthenticatedRequest) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      return await handler(req);
    });
  };
}

export function withCourseAccess(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return withAuth(async (req: AuthenticatedRequest) => {
    const courseId = req.nextUrl.pathname.split('/').find((segment, index, array) => 
      array[index - 1] === 'courses'
    );

    if (courseId && !await AuthService.canAccessCourse(req.user!.id, courseId)) {
      return NextResponse.json(
        { success: false, error: 'Course access denied' },
        { status: 403 }
      );
    }

    return await handler(req);
  });
}