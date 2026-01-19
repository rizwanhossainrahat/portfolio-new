'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Settings, Database, Users, Shield, Activity } from 'lucide-react';

export default function AdminSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">
          System configuration and administrative tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Database Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage database operations and maintenance tasks.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" disabled>
                Backup Database
              </Button>
              <Button variant="outline" className="w-full" disabled>
                View Database Stats
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Advanced user management and role assignments.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" disabled>
                Bulk User Actions
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Export User Data
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure security policies and access controls.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" disabled>
                Security Audit
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Access Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              System Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Monitor system performance and health metrics.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" disabled>
                System Health
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Performance Metrics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Admin Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Admin Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Admin User:</span>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Role:</span>
              <span className="text-sm font-medium text-red-600">{user?.Role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Session:</span>
              <span className="text-sm font-medium">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notice */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Settings className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                Development Notice
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Some administrative features are currently in development and will be available in future updates.
                Contact the development team for specific administrative needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}