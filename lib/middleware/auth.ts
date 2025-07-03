import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export function withRole(allowedRoles: string[]) {
  return function (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return async function (req: NextRequest) {
      try {
        const supabase = createServiceClient();
        
        // Get the authorization header
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