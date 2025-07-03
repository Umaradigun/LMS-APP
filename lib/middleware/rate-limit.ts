import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function withRateLimit(config: RateLimitConfig) {
  return function(handler: (req: NextRequest) => Promise<Response>) {
    return async (req: NextRequest) => {
      const clientIp = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();
      
      const clientData = requestCounts.get(clientIp);
      
      if (!clientData || now > clientData.resetTime) {
        requestCounts.set(clientIp, { 
          count: 1, 
          resetTime: now + config.windowMs 
        });
        return await handler(req);
      }
      
      if (clientData.count >= config.maxRequests) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Rate limit exceeded',
            retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
          },
          { 
            status: 429,
            headers: {
              'Retry-After': Math.ceil((clientData.resetTime - now) / 1000).toString(),
            }
          }
        );
      }
      
      clientData.count++;
      return await handler(req);
    };
  };
}

// Predefined rate limit configurations
export const rateLimits = {
  auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  api: { maxRequests: 100, windowMs: 15 * 60 * 1000 }, // 100 requests per 15 minutes
  upload: { maxRequests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  webhook: { maxRequests: 50, windowMs: 60 * 1000 }, // 50 requests per minute
};