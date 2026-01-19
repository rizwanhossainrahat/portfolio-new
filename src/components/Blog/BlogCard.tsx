'use client';

import { Blog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {blog.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(blog.publishedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {blog.user.name}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {blog.content.substring(0, 150)}...
        </p>
        
        <Button asChild className="w-full">
          <Link href={`/blog/${blog.id}`}>
            Read More
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}