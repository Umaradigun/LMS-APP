'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Award, Zap, Play, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { CourseCard } from '@/components/ui/course-card';

const featuredCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    category: 'Programming',
    price: 99,
    currency: 'USD',
    instructor: 'Sarah Johnson',
    duration: '12 hours',
    studentsCount: 2847,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Digital Marketing Fundamentals',
    description: 'Master the art of digital marketing with practical strategies and real-world examples.',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    category: 'Marketing',
    price: 79,
    currency: 'USD',
    instructor: 'Michael Chen',
    duration: '8 hours',
    studentsCount: 1923,
    rating: 4.6,
  },
  {
    id: '3',
    title: 'Data Science with Python',
    description: 'Dive into data analysis, visualization, and machine learning using Python.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
    category: 'Data Science',
    price: 149,
    currency: 'USD',
    instructor: 'Dr. Emily Rodriguez',
    duration: '20 hours',
    studentsCount: 3156,
    rating: 4.9,
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Rich Course Content',
    description: 'Access thousands of courses with video lectures, interactive exercises, and downloadable resources.',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals and academic experts who bring real-world experience.',
  },
  {
    icon: Award,
    title: 'Certificates',
    description: 'Earn verified certificates upon course completion to showcase your new skills.',
  },
  {
    icon: Zap,
    title: 'Interactive Learning',
    description: 'Engage with quizzes, assignments, and peer discussions for a comprehensive learning experience.',
  },
];

const stats = [
  { label: 'Active Students', value: '50,000+' },
  { label: 'Expert Instructors', value: '1,200+' },
  { label: 'Courses Available', value: '5,000+' },
  { label: 'Countries Reached', value: '120+' },
];

export default function HomePage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">EduFlow</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Courses
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              🎉 New courses added weekly
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Learn Without Limits,{' '}
              <span className="text-primary">Grow Without Boundaries</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join thousands of learners worldwide in our comprehensive learning platform. 
              Master new skills, advance your career, and unlock your potential with expert-led courses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button size="lg" className="w-full sm:w-auto">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 rating</span>
              </div>
              <div>50,000+ students</div>
              <div>Free trial available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular courses, carefully curated by experts to help you achieve your learning goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                View All Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose EduFlow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need for a comprehensive and engaging learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-none bg-transparent">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center p-8 lg:p-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="space-y-6">
              <CardTitle className="text-3xl lg:text-4xl font-bold">
                Ready to Start Your Learning Journey?
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed max-w-2xl mx-auto">
                Join our community of learners and start building the skills you need to succeed. 
                Get access to premium courses, expert support, and a certificate upon completion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Start Free Trial
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">EduFlow</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering learners worldwide with high-quality education and expert instruction.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link></li>
                <li><Link href="/instructors" className="hover:text-foreground transition-colors">Instructors</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/api-docs" className="hover:text-foreground transition-colors">API Docs</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link href="/community" className="hover:text-foreground transition-colors">Community</Link></li>
                <li><Link href="/status" className="hover:text-foreground transition-colors">Status</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 EduFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}