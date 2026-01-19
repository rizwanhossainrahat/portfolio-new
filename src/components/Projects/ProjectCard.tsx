'use client';

import { LocalProject } from '@/services/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: LocalProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {project.imageUrl && (
        <div className="relative h-50 w-full">
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
        {project.technologies && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.technologies.slice(0, 10).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p> */}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.liveLink && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
              </a>
            </Button>
          )}
          
          {project.frontendGithubLink && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.frontendGithubLink} target="_blank" rel="noopener noreferrer">
                <GitBranch className="h-4 w-4 mr-1" />
                Frontend Code
              </a>
            </Button>
          )}

          {project.backendGithubLink && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.backendGithubLink} target="_blank" rel="noopener noreferrer">
                <GitBranch className="h-4 w-4 mr-1" />
                Backend Code
              </a>
            </Button>
          )}
        </div>
        
        <Button asChild className="w-full">
          <Link href={`/project/${project.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}