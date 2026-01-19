// Type definitions based on backend models
export interface User {
  id: number;
  name: string;
  email: string;
  Role: 'ADMIN' | 'USER';
  bio?: string;
  avatarUrl?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrlFrontend?: string;
  demoUrlBackend?: string;
  sourceCodeFrontend?: string;
  sourceCodebackend?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: User;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  userId: number;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}