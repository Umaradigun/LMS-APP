import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/auth/callback:
 *   get:
 *     summary: Handle authentication callback
 *     description: Handles the OAuth callback from Supabase authentication
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization code from OAuth provider
 *     responses:
 *       302:
 *         description: Redirect to dashboard on success or error page on failure
 *       400:
 *         description: Invalid or missing authorization code
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const { supabase, response } = createClient(request);
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Create or update user profile
      await supabase
        .from('users')
        .upsert({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata.name || data.user.email!.split('@')[0],
          role: 'STUDENT',
          status: 'ACTIVE',
        });

      return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/auth/error`);
}