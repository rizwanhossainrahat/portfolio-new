import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Users, FolderOpen, FileText, Plus, Settings, BarChart3 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { href: '/admin', label: 'Admin Overview', icon: BarChart3 },
    { href: '/admin/projects', label: 'All Projects', icon: FolderOpen },
    { href: '/admin/projects/new', label: 'Add Project', icon: Plus },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/blogs', label: 'All Blogs', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Admin Sidebar */}
          <aside className="w-64 bg-card border-r min-h-screen p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-red-600">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">Administrative Dashboard</p>
            </div>
            
            <nav className="space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={link.href}>
                      <Icon className="h-4 w-4 mr-2" />
                      {link.label}
                    </Link>
                  </Button>
                );
              })}
              
              {/* Divider */}
              <div className="border-t my-4"></div>
              
              {/* Quick Links */}
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  User Dashboard
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Public Site
                </Link>
              </Button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}