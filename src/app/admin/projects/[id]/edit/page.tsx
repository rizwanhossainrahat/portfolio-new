'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Project } from '@/lib/types';
import { apiClient } from '@/lib/api';
import ProjectForm from '@/components/Projects/ProjectForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminEditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiClient.get(`/project/${params.id}`);
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
        toast.error('Failed to load project');
        router.push('/admin/projects');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

  const handleSuccess = () => {
    toast.success('Project updated successfully');
    router.push('/admin/projects');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <Link href="/admin/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="text-muted-foreground">
            Update project: {project.title}
          </p>
        </div>
        
        <Button variant="outline" asChild>
          <Link href="/admin/projects">← Back to Projects</Link>
        </Button>
      </div>
      
      <ProjectForm project={project} onSuccess={handleSuccess} />
    </div>
  );
}