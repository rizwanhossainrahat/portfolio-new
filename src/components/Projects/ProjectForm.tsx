'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  demoUrlFrontend: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  demoUrlBackend: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  sourceCodeFrontend: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  sourceCodebackend: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
}

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      imageUrl: project?.imageUrl || '',
      demoUrlFrontend: project?.demoUrlFrontend || '',
      demoUrlBackend: project?.demoUrlBackend || '',
      sourceCodeFrontend: project?.sourceCodeFrontend || '',
      sourceCodebackend: project?.sourceCodebackend || '',
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      setLoading(true);
      
      if (project) {
        await apiClient.patch(`/project/${project.id}`, values);
        toast.success('Project updated successfully');
      } else {
        await apiClient.post('/create-project', values);
        toast.success('Project created successfully');
      }
      
      onSuccess?.();
      if (!project && !onSuccess) {
        // Check if we're in admin context
        const isAdminContext = window.location.pathname.includes('/admin');
        router.push(isAdminContext ? '/admin/projects' : '/dashboard/projects');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {project ? 'Edit Project' : 'Create New Project'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md"
                      placeholder="Project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="demoUrlFrontend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frontend Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="demoUrlBackend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backend Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourceCodeFrontend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frontend Source Code</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourceCodebackend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backend Source Code</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo-api" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}