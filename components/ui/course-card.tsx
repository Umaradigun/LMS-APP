import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Star, Play } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  category: string;
  price: number;
  currency: string;
  instructor?: string;
  duration?: string;
  studentsCount?: number;
  rating?: number;
  progress?: number;
  isEnrolled?: boolean;
}

export function CourseCard({
  id,
  title,
  description,
  thumbnail,
  category,
  price,
  currency,
  instructor,
  duration,
  studentsCount,
  rating,
  progress,
  isEnrolled = false,
}: CourseCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Play className="h-12 w-12 text-primary/60" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
          {isEnrolled && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-primary text-primary-foreground">
                Enrolled
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {instructor && (
          <p className="text-sm text-muted-foreground">
            by <span className="font-medium">{instructor}</span>
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            {duration && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
            )}
            {studentsCount && (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{studentsCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {isEnrolled && typeof progress === 'number' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {price > 0 ? (
            <span className="text-lg font-bold">
              {currency} {price.toLocaleString()}
            </span>
          ) : (
            <span className="text-lg font-bold text-green-600">Free</span>
          )}
        </div>
        <Button asChild size="sm" className="ml-auto">
          <Link href={`/courses/${id}`}>
            {isEnrolled ? 'Continue' : 'View Course'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}