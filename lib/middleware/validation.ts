import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export function withValidation<T>(schema: z.ZodSchema<T>) {
  return function(handler: (req: NextRequest, body: T) => Promise<Response>) {
    return async (req: NextRequest) => {
      try {
        const body = await req.json();
        const validatedBody = schema.parse(body);
        return await handler(req, validatedBody);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json(
            {
              success: false,
              error: 'Validation failed',
              errors: error.errors.map(err => ({
                path: err.path.join('.'),
                message: err.message,
              })),
            },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { success: false, error: 'Invalid request body' },
          { status: 400 }
        );
      }
    };
  };
}

// Common validation schemas
export const courseSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().min(0),
  currency: z.string().length(3),
  category: z.string().min(1),
  thumbnail: z.string().url().optional(),
});

export const moduleSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  order_num: z.number().int().min(1),
});

export const lessonSchema = z.object({
  title: z.string().min(1).max(255),
  type: z.enum(['VIDEO', 'TEXT', 'PDF', 'AUDIO']),
  content_url: z.string().url().optional(),
  content: z.string().optional(),
  duration: z.number().int().min(0).optional(),
  order_num: z.number().int().min(1),
});

export const quizSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  duration: z.number().int().min(1),
  total_marks: z.number().int().min(1),
  passing_marks: z.number().int().min(1),
  max_attempts: z.number().int().min(1).default(3),
});

export const questionSchema = z.object({
  question_text: z.string().min(1),
  type: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'ESSAY', 'FILL_BLANK']),
  options: z.array(z.string()).optional(),
  correct_answer: z.string().min(1),
  marks: z.number().int().min(1),
  order_num: z.number().int().min(1),
});