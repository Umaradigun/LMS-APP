'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseCard } from '@/components/ui/course-card';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  Bell,
  Play,
  ChevronRight,
  Target
} from 'lucide-react';

const dashboardStats = [
  {
    title: 'Enrolled Courses',
    value: '12',
    change: '+2 this month',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  {
    title: 'Hours Learned',
    value: '47.5',
    change: '+8.2 this week',
    icon: Clock,
    color: 'text-green-600',
  },
  {
    title: 'Certificates',
    value: '5',
    change: '+1 this month',
    icon: Award,
    color: 'text-yellow-600',
  },
  {
    title: 'Learning Streak',
    value: '12 days',
    change: 'Keep it up!',
    icon: TrendingUp,
    color: 'text-purple-600',
  },
];

const recentCourses = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts and patterns for building scalable applications.',
    category: 'Programming',
    price: 0,
    currency: 'USD',
    instructor: 'John Smith',
    progress: 65,
    isEnrolled: true,
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design.',
    category: 'Design',
    price: 0,
    currency: 'USD',
    instructor: 'Sarah Wilson',
    progress: 30,
    isEnrolled: true,
  },
  {
    id: '3',
    title: 'Data Visualization with D3.js',
    description: 'Create stunning interactive data visualizations using D3.js.',
    category: 'Data Science',
    price: 0,
    currency: 'USD',
    instructor: 'Mike Johnson',
    progress: 85,
    isEnrolled: true,
  },
];

const upcomingDeadlines = [
  {
    title: 'React Project Submission',
    course: 'Advanced React Patterns',
    dueDate: '2024-01-15',
    type: 'Assignment',
  },
  {
    title: 'Design Portfolio Review',
    course: 'UI/UX Design Fundamentals',
    dueDate: '2024-01-18',
    type: 'Project',
  },
  {
    title: 'Final Quiz',
    course: 'Data Visualization with D3.js',
    dueDate: '2024-01-20',
    type: 'Quiz',
  },
];

const recentNotifications = [
  {
    title: 'New lesson available',
    message: 'Chapter 5: Advanced Hooks is now available in React Patterns',
    time: '2 hours ago',
    type: 'course',
  },
  {
    title: 'Assignment graded',
    message: 'Your UI Design assignment has been graded. Score: 95/100',
    time: '1 day ago',
    type: 'grade',
  },
  {
    title: 'Certificate earned',
    message: 'Congratulations! You earned a certificate in JavaScript Fundamentals',
    time: '3 days ago',
    type: 'achievement',
  },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
            <p className="text-muted-foreground mt-2">
              Continue your learning journey. You're doing great!
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Continue Learning
                </CardTitle>
                <CardDescription>
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-muted/30">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{course.title}</h4>
                        <Badge variant="secondary">{course.category}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <Button size="sm">
                      Continue
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Courses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Courses</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {recentCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{deadline.title}</h4>
                      <p className="text-xs text-muted-foreground">{deadline.course}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {deadline.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(deadline.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentNotifications.map((notification, index) => (
                  <div key={index} className="space-y-2 p-3 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}