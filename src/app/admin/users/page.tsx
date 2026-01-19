'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { apiClient } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, Shield, Calendar, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'ADMIN' | 'USER'>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.location && user.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.Role === roleFilter);
    }
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      const data = await apiClient.get('/users');
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading users...</div>;
  }

  const adminCount = users.filter(u => u.Role === 'ADMIN').length;
  const userCount = users.filter(u => u.Role === 'USER').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-xs text-muted-foreground">
              Administrator accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              Standard user accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as 'all' | 'ADMIN' | 'USER')}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Roles</option>
                <option value="ADMIN">Admin Only</option>
                <option value="USER">Users Only</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            {searchTerm || roleFilter !== 'all' ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  No users found matching your criteria
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No users found.</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    user.Role === 'ADMIN' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.Role}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                
                {user.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {user.location}
                  </div>
                )}
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
                
                {user.bio && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {user.bio}
                    </p>
                  </div>
                )}
                
                {/* Social Links */}
                {(user.github || user.linkedin || user.twitter || user.facebook) && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Social Links:</p>
                    <div className="flex flex-wrap gap-2">
                      {user.github && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={user.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        </Button>
                      )}
                      {user.linkedin && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {user.twitter && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                            Twitter
                          </a>
                        </Button>
                      )}
                      {user.facebook && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                            Facebook
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}