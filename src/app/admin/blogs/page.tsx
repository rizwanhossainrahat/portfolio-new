'use client';

import { useState, useEffect } from 'react';
import { Blog } from '@/lib/types';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;
    
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm]);

  const fetchBlogs = async () => {
    try {
      const data = await apiClient.get('/blogs');
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;
    
    try {
      await apiClient.delete(`/blog/${id}`);
      const updatedBlogs = blogs.filter(b => b.id !== id);
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
      toast.success('Blog post deleted successfully');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete blog post';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div className="text-center">Loading blogs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage all blog posts</p>
        </div>
        
        <Button asChild>
          <Link href="/dashboard/blogs/new">
            <Plus className="h-4 w-4 mr-2" />
            Create Blog Post
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredBlogs.length} of {blogs.length} blog posts
          </div>
        </CardContent>
      </Card>

      {filteredBlogs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            {searchTerm ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  No blog posts found matching &quot;{searchTerm}&quot;
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-4">No blog posts found.</p>
                <Button asChild>
                  <Link href="/dashboard/blogs/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Blog Post
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2 mb-2">{blog.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {blog.user.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/blog/${blog.id}`}>
                        View
                      </Link>
                    </Button>
                    
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/blogs/${blog.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(blog.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {blog.content.substring(0, 300)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}