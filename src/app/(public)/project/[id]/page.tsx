'use client';

import { useParams } from 'next/navigation';
import { useProject } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, GitBranch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const { project, loading, error } = useProject(projectId);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <Link href="/project">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/project">← Back to Projects</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {project.imageUrl && (
              <div className="relative h-64 md:h-96 w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-lg text-muted-foreground">
                {project.description}
              </p>
            </div>

            {project.technologies && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.liveLink && (
                  <Button asChild className="w-full">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                
                {project.frontendGithubLink && (
                  <Button asChild className="w-full" variant="outline">
                    <a href={project.frontendGithubLink} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Frontend Code
                    </a>
                  </Button>
                )}
                
                {project.backendGithubLink && (
                  <Button asChild className="w-full" variant="outline">
                    <a href={project.backendGithubLink} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Backend Code
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}