import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'LMS Platform API',
        version: '1.0.0',
        description: 'A comprehensive Learning Management System API with multi-role support, payment integration, and course management capabilities.',
        contact: {
          name: 'LMS Platform Support',
          email: 'support@lmsplatform.com',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      servers: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter your JWT token in the format: Bearer <token>',
          },
        },
        schemas: {
          User: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              role: { type: 'string', enum: ['STUDENT', 'TEACHER', 'ADMIN'] },
              avatar: { type: 'string', nullable: true },
              status: { type: 'string', enum: ['ACTIVE', 'BANNED', 'PENDING'] },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
          Course: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              title: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number', minimum: 0 },
              currency: { type: 'string', minLength: 3, maxLength: 3 },
              category: { type: 'string' },
              thumbnail: { type: 'string', nullable: true },
              created_by: { type: 'string', format: 'uuid' },
              status: { type: 'string', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
          Enrollment: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              user_id: { type: 'string', format: 'uuid' },
              course_id: { type: 'string', format: 'uuid' },
              enrolled_at: { type: 'string', format: 'date-time' },
              completed_at: { type: 'string', format: 'date-time', nullable: true },
              status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'DROPPED'] },
            },
          },
          Transaction: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              user_id: { type: 'string', format: 'uuid' },
              course_id: { type: 'string', format: 'uuid' },
              amount: { type: 'number', minimum: 0 },
              currency: { type: 'string', minLength: 3, maxLength: 3 },
              status: { type: 'string', enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'] },
              gateway: { type: 'string', enum: ['STRIPE', 'PAYSTACK', 'FLUTTERWAVE'] },
              gateway_reference: { type: 'string' },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' },
            },
          },
          Error: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: false },
              error: { type: 'string' },
              errors: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    path: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          Success: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'object' },
              message: { type: 'string' },
            },
          },
          PaginationResponse: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              data: { type: 'array', items: {} },
              pagination: {
                type: 'object',
                properties: {
                  page: { type: 'integer', minimum: 1 },
                  limit: { type: 'integer', minimum: 1 },
                  total: { type: 'integer', minimum: 0 },
                  totalPages: { type: 'integer', minimum: 0 },
                },
              },
            },
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: [
        {
          name: 'Authentication',
          description: 'User authentication and authorization endpoints',
        },
        {
          name: 'Students',
          description: 'Student-specific endpoints for course access and progress',
        },
        {
          name: 'Teachers',
          description: 'Teacher-specific endpoints for course management',
        },
        {
          name: 'Admin',
          description: 'Administrative endpoints for platform management',
        },
        {
          name: 'Payments',
          description: 'Payment processing and transaction management',
        },
        {
          name: 'Public',
          description: 'Public endpoints that do not require authentication',
        },
      ],
    },
  });
  return spec;
};