'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import { Project, Blog } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen, FileText, User } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, blogsData] = await Promise.all([
          apiClient.get('/projects-user'),
          apiClient.get('/blogs'),
        ]);
        setProjects(projectsData);
        setBlogs(blogsData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">{user?.Role}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-muted-foreground mb-4">No projects yet.</p>
            ) : (
              <div className="space-y-2 mb-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex justify-between items-center">
                    <span className="truncate">{project.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button asChild className="w-full">
              <Link href="/dashboard/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            {blogs.length === 0 ? (
              <p className="text-muted-foreground mb-4">No blogs yet.</p>
            ) : (
              <div className="space-y-2 mb-4">
                {blogs.slice(0, 3).map((blog) => (
                  <div key={blog.id} className="flex justify-between items-center">
                    <span className="truncate">{blog.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button asChild className="w-full">
              <Link href="/dashboard/blogs/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}