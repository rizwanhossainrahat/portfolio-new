import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, User, FolderOpen, FileText, Plus } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/projects', label: 'My Projects', icon: FolderOpen },
    { href: '/dashboard/projects/new', label: 'New Project', icon: Plus },
    { href: '/dashboard/blogs', label: 'My Blogs', icon: FileText },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-card border-r min-h-screen p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Dashboard</h2>
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