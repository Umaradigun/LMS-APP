'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { ReadingCard } from '@/components/ui/reading-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Clock, User, Heart, Share2, Bookmark } from 'lucide-react';

const sampleContent = (
  <div className="space-y-6">
    <p>
      Learning is a lifelong journey that extends far beyond the confines of traditional classrooms. 
      In today's rapidly evolving world, the ability to continuously acquire new knowledge and skills 
      has become not just advantageous, but essential for personal and professional growth.
    </p>
    
    <p>
      The digital revolution has fundamentally transformed how we access and consume educational content. 
      Online learning platforms have democratized education, making high-quality instruction available 
      to anyone with an internet connection. This shift has broken down geographical barriers and 
      created unprecedented opportunities for global knowledge sharing.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">The Science of Effective Learning</h2>
    
    <p>
      Research in cognitive science has revealed fascinating insights about how our brains process 
      and retain information. The concept of spaced repetition, for instance, demonstrates that 
      reviewing material at increasing intervals significantly improves long-term retention compared 
      to cramming sessions.
    </p>

    <blockquote className="border-l-4 border-primary pl-6 italic text-lg my-6">
      "The beautiful thing about learning is that no one can take it away from you." 
      <footer className="text-sm text-muted-foreground mt-2">— B.B. King</footer>
    </blockquote>

    <p>
      Active learning strategies, such as teaching others, creating mind maps, and engaging in 
      discussions, have been shown to be far more effective than passive consumption of content. 
      When we actively engage with material, we create multiple neural pathways that strengthen 
      our understanding and recall abilities.
    </p>

    <h3 className="text-xl font-semibold mt-6 mb-3">Key Principles for Effective Learning</h3>
    
    <ul className="space-y-2 ml-6">
      <li className="flex items-start">
        <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>Consistency over intensity:</strong> Regular, shorter study sessions are more effective than marathon cramming sessions.</span>
      </li>
      <li className="flex items-start">
        <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>Embrace mistakes:</strong> Errors are valuable learning opportunities that help strengthen correct understanding.</span>
      </li>
      <li className="flex items-start">
        <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>Connect new to known:</strong> Linking new information to existing knowledge creates stronger memory associations.</span>
      </li>
      <li className="flex items-start">
        <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>Practice retrieval:</strong> Testing yourself regularly improves both learning and retention.</span>
      </li>
    </ul>

    <p>
      The journey of learning is deeply personal, and what works for one person may not work for another. 
      Some learners thrive in visual environments, while others prefer auditory or kinesthetic approaches. 
      Understanding your own learning style and preferences can significantly enhance your educational experience.
    </p>

    <p>
      As we continue to navigate an increasingly complex world, the skills of learning how to learn 
      become paramount. The ability to adapt, unlearn outdated concepts, and acquire new competencies 
      will determine our success in both personal and professional spheres.
    </p>
  </div>
);

export default function ReadingPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Article Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">
            Educational Psychology
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            The Art and Science of Effective Learning
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Discover evidence-based strategies and timeless principles that can transform 
            your approach to learning and unlock your full potential.
          </p>
        </div>

        {/* Article Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-y">
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Dr. Sarah Mitchell</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Educational Research</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Reading Card */}
        <ReadingCard
          title=""
          content={sampleContent}
          className="border-0 shadow-none bg-transparent px-0"
        />

        {/* Article Footer */}
        <div className="space-y-6 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Tags:</span>
            {['Learning', 'Education', 'Psychology', 'Study Tips', 'Cognitive Science'].map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Dr. Sarah Mitchell</h4>
                <p className="text-sm text-muted-foreground">
                  Educational Psychologist & Learning Researcher
                </p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 sm:mt-0">
              Follow Author
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="space-y-6 pt-8 border-t">
          <h3 className="text-2xl font-bold">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Memory Techniques That Actually Work',
                description: 'Explore scientifically-proven methods to improve your memory and retention.',
                readTime: '6 min read',
                category: 'Memory',
              },
              {
                title: 'Building Effective Study Habits',
                description: 'Create sustainable learning routines that fit your lifestyle and goals.',
                readTime: '5 min read',
                category: 'Study Skills',
              },
            ].map((article, index) => (
              <div key={index} className="p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                <Badge variant="secondary" className="mb-3 text-xs">
                  {article.category}
                </Badge>
                <h4 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {article.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}