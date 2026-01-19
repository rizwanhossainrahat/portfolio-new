import { apiClient } from '@/lib/api';
import { User, LoginCredentials, RegisterData } from '@/lib/types';

export const authService = {
  // Login
  login: (credentials: LoginCredentials) => 
    apiClient.post('/login', credentials),
  
  // Logout
  logout: () => apiClient.post('/logout'),
  
  // Register
  register: (data: RegisterData) => 
    apiClient.post('/create-user', data),
  
  // Get current user
  getCurrentUser: (): Promise<User> => apiClient.get('/me'),
  
  // Update current user
  updateProfile: (data: Partial<User>) => 
    apiClient.patch('/update', data),
  
  // Delete current user
  deleteAccount: () => apiClient.delete('/delete'),
  
  // Get all users (public)
  getAllUsers: (): Promise<User[]> => apiClient.get('/users'),
};