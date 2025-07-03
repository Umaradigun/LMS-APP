import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export const rateLimits = {
  api: { windowMs: 15 * 60 * 1000, maxRequests: 100 }, // 100 requests per 15 minutes
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 },  // 5 requests per 15 minutes
  upload: { windowMs: 60 * 60 * 1000, maxRequests: 10 }, // 10 requests per hour
};

// In-memory store for rate limiting (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getClientId(req: NextRequest): string {
  // Use IP address as client identifier
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

export function withRateLimit(config: RateLimitConfig) {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async function (req: NextRequest) {
      const clientId = getClientId(req);
      const now = Date.now();
      const key = `${clientId}:${req.nextUrl.pathname}`;
      
      // Clean up expired entries
      for (const [k, v] of requestCounts.entries()) {
        if (now > v.resetTime) {
          requestCounts.delete(k);
        }
      }
      
      const current = requestCounts.get(key);
      
      if (!current) {
        // First request from this client
        requestCounts.set(key, {
          count: 1,
          resetTime: now + config.windowMs,
        });
      } else if (now > current.resetTime) {
        // Window has expired, reset
        requestCounts.set(key, {
          count: 1,
          resetTime: now + config.windowMs,
        });
      } else if (current.count >= config.maxRequests) {
        // Rate limit exceeded
        const resetIn = Math.ceil((current.resetTime - now) / 1000);
        
        return NextResponse.json(
          {
            success: false,
            error: 'Rate limit exceeded',
            resetIn,
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': current.resetTime.toString(),
              'Retry-After': resetIn.toString(),
            },
          }
        );
      } else {
        // Increment count
        current.count++;
      }
      
      const remaining = Math.max(0, config.maxRequests - (current?.count || 0));
      
      const response = await handler(req);
      
      // Add rate limit headers to response
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', (current?.resetTime || now + config.windowMs).toString());
      
      return response;
    };
  };
}