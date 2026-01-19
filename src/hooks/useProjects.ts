import { useState, useEffect, useCallback } from 'react';
import { projectService, LocalProject } from '@/services/projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectData = await projectService.getAll();
      setProjects(projectData);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};

export const useProject = (id: number) => {
  const [project, setProject] = useState<LocalProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const projectData = await projectService.getById(id);
      setProject(projectData);
    } catch (err) {
      setError('Failed to load project');
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [id, fetchProject]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject
  };
};

export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectData = await projectService.getFeatured();
      setProjects(projectData);
    } catch (err) {
      setError('Failed to load featured projects');
      console.error('Error loading featured projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchFeaturedProjects
  };
};

export const useProjectSearch = () => {
  const [projects, setProjects] = useState<LocalProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProjects = async (query: string) => {
    if (!query.trim()) {
      setProjects([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const projectData = await projectService.search(query);
      setProjects(projectData);
    } catch (err) {
      setError('Failed to search projects');
      console.error('Error searching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    searchProjects
  };
};