import { createServiceClient } from '../supabase/server';
import { NextRequest } from 'next/server';

export class AuthService {
  static async getUserFromRequest(request: NextRequest) {
    const supabase = createServiceClient();
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        return null;
      }

      // Get user profile data
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      return {
        id: user.id,
        email: user.email!,
        ...profile,
      };
    } catch (error) {
      return null;
    }
  }

  static async hasRole(userId: string, roles: string[]): Promise<boolean> {
    const supabase = createServiceClient();
    
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    return user ? roles.includes(user.role) : false;
  }

  static async isEnrolledInCourse(userId: string, courseId: string): Promise<boolean> {
    const supabase = createServiceClient();
    
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('status', 'ACTIVE')
      .single();

    return !!enrollment;
  }

  static async canAccessCourse(userId: string, courseId: string): Promise<boolean> {
    const supabase = createServiceClient();
    
    // Check if user is enrolled
    const isEnrolled = await this.isEnrolledInCourse(userId, courseId);
    if (isEnrolled) return true;

    // Check if user is the course creator
    const { data: course } = await supabase
      .from('courses')
      .select('created_by')
      .eq('id', courseId)
      .single();

    return course?.created_by === userId;
  }

  static async canModifyCourse(userId: string, courseId: string): Promise<boolean> {
    const supabase = createServiceClient();
    
    // Check if user is admin
    const isAdmin = await this.hasRole(userId, ['ADMIN']);
    if (isAdmin) return true;

    // Check if user is the course creator
    const { data: course } = await supabase
      .from('courses')
      .select('created_by')
      .eq('id', courseId)
      .single();

    return course?.created_by === userId;
  }
}