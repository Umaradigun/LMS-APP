'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { CourseCard } from '@/components/ui/course-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Grid, List } from 'lucide-react';

const categories = [
  'All Categories',
  'Programming',
  'Design',
  'Marketing',
  'Business',
  'Data Science',
  'Photography',
  'Music',
  'Language',
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const allCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    category: 'Programming',
    price: 149,
    currency: 'USD',
    instructor: 'Sarah Johnson',
    duration: '40 hours',
    studentsCount: 15420,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    description: 'Master the art of user interface and user experience design with hands-on projects.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    category: 'Design',
    price: 99,
    currency: 'USD',
    instructor: 'Michael Chen',
    duration: '25 hours',
    studentsCount: 8930,
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    description: 'Learn to create effective digital marketing campaigns that drive results.',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    category: 'Marketing',
    price: 79,
    currency: 'USD',
    instructor: 'Emily Rodriguez',
    duration: '18 hours',
    studentsCount: 6750,
    rating: 4.6,
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
    category: 'Data Science',
    price: 129,
    currency: 'USD',
    instructor: 'Dr. James Wilson',
    duration: '35 hours',
    studentsCount: 12340,
    rating: 4.9,
  },
  {
    id: '5',
    title: 'Photography Fundamentals',
    description: 'Learn the basics of photography, from composition to post-processing.',
    thumbnail: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    category: 'Photography',
    price: 59,
    currency: 'USD',
    instructor: 'Lisa Anderson',
    duration: '12 hours',
    studentsCount: 4560,
    rating: 4.5,
  },
  {
    id: '6',
    title: 'Business Strategy Essentials',
    description: 'Develop strategic thinking skills and learn to create winning business strategies.',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'Business',
    price: 89,
    currency: 'USD',
    instructor: 'Robert Taylor',
    duration: '20 hours',
    studentsCount: 7890,
    rating: 4.4,
  },
  {
    id: '7',
    title: 'Introduction to Machine Learning',
    description: 'Get started with machine learning concepts and practical implementations.',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    category: 'Data Science',
    price: 0,
    currency: 'USD',
    instructor: 'Dr. Maria Garcia',
    duration: '15 hours',
    studentsCount: 18920,
    rating: 4.8,
  },
  {
    id: '8',
    title: 'Spanish for Beginners',
    description: 'Learn Spanish from scratch with interactive lessons and practical exercises.',
    thumbnail: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg',
    category: 'Language',
    price: 49,
    currency: 'USD',
    instructor: 'Carlos Mendez',
    duration: '30 hours',
    studentsCount: 9870,
    rating: 4.6,
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Explore Courses</h1>
            <p className="text-muted-foreground mt-2">
              Discover thousands of courses from expert instructors
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(1).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCourses.length} of {allCourses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Load More */}
        {filteredCourses.length > 0 && (
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Courses
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}