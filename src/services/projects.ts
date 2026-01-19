// Local project data interface for projects.json
export interface LocalProject {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  frontendGithubLink?: string;
  backendGithubLink?: string;
  liveLink?: string;
  technologies?: string[];
}

export const projectService = {
  // Get all projects from local JSON file
  getAll: async (): Promise<LocalProject[]> => {
    try {
      const response = await fetch('/projects.json');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projects: LocalProject[] = await response.json();
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },
  
  // Get single project by id from local JSON file
  getById: async (id: number): Promise<LocalProject | null> => {
    try {
      const projects = await projectService.getAll();
      return projects.find(project => project.id === id) || null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  },
  
  // Get user's projects (same as getAll for local data)
  getUserProjects: async (): Promise<LocalProject[]> => {
    return await projectService.getAll();
  },
  
  // Get projects by technology filter
  getByTechnology: async (technology: string): Promise<LocalProject[]> => {
    try {
      const projects = await projectService.getAll();
      return projects.filter(project => 
        project.technologies?.some(tech => 
          tech.toLowerCase().includes(technology.toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error filtering projects by technology:', error);
      return [];
    }
  },

  // Search projects by title or description
  search: async (query: string): Promise<LocalProject[]> => {
    try {
      const projects = await projectService.getAll();
      const searchTerm = query.toLowerCase();
      return projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies?.some(tech => 
          tech.toLowerCase().includes(searchTerm)
        )
      );
    } catch (error) {
      console.error('Error searching projects:', error);
      return [];
    }
  },

  // Get featured projects (first 3 projects)
  getFeatured: async (): Promise<LocalProject[]> => {
    try {
      const projects = await projectService.getAll();
      return projects.slice(0, 3);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  },

  // Legacy methods for backward compatibility (now using local data)
  getLocalProjects: async (): Promise<LocalProject[]> => {
    return await projectService.getAll();
  },

  getLocalProjectById: async (id: number): Promise<LocalProject | null> => {
    return await projectService.getById(id);
  }
};