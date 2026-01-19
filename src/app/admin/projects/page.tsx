'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, ExternalLink, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import Image from 'next/image';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'user'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProjects(filtered);
  }, [projects, searchTerm, filterBy]);

  const fetchProjects = async () => {
    try {
      const data = await apiClient.get('/project');
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    
    try {
      await apiClient.delete(`/project/${id}`);
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
      toast.success('Project deleted successfully');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div className="text-center">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Projects</h1>
          <p className="text-muted-foreground">Manage all portfolio projects</p>
        </div>
        
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by title, description, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'user')}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Projects</option>
                <option value="user">User Projects</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </CardContent>
      </Card>

      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            {searchTerm ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  No projects found matching &quot;{searchTerm}&quot;
                </p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-4">No projects found.</p>
                <Button asChild>
                  <Link href="/admin/projects/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Project
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {project.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  By {project.user.name} • {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Project Links */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.demoUrlFrontend && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.demoUrlFrontend} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                  
                  {project.sourceCodeFrontend && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.sourceCodeFrontend} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
                
                {/* Admin Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/project/${project.id}`}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(project.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}