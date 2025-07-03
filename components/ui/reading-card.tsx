import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadingCardProps {
  title: string;
  description?: string;
  content: ReactNode;
  author?: string;
  readTime?: string;
  category?: string;
  className?: string;
}

export function ReadingCard({
  title,
  description,
  content,
  author,
  readTime,
  category,
  className,
}: ReadingCardProps) {
  return (
    <Card className={cn('max-w-4xl mx-auto', className)}>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {author && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl lg:text-3xl leading-tight">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-base mt-2 leading-relaxed">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="reading-content prose prose-lg max-w-none">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}