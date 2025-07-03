import { Metadata } from 'next';
import ApiDocumentation from '@/components/swagger-ui';

export const metadata: Metadata = {
  title: 'API Documentation - LMS Platform',
  description: 'Interactive API documentation for the LMS Platform',
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
              <p className="text-muted-foreground mt-2">
                Interactive documentation for the LMS Platform API
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Version 1.0.0
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <ApiDocumentation />
      </div>
    </div>
  );
}