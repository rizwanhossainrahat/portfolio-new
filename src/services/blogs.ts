import { apiClient } from '@/lib/api';
import { Blog } from '@/lib/types';

export const blogService = {
  // Get all blogs (protected)
  getAll: () => apiClient.get('/blogs'),
  
  // Get single blog (protected)
  getById: (id: number) => apiClient.get(`/blog/${id}`),
  
  // Create blog (protected)
  create: (data: Omit<Blog, 'id' | 'publishedAt' | 'userId' | 'user'>) => 
    apiClient.post('/create-blog', data),
  
  // Update blog (protected)
  update: (id: number, data: Partial<Blog>) => 
    apiClient.patch(`/blog/${id}`, data),
  
  // Delete blog (protected)
  delete: (id: number) => apiClient.delete(`/blog/${id}`),
};