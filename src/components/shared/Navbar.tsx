"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, LogOut, Code2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/project", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleDownloadResume = () => {
    // You can replace this with your actual resume file path
    const resumeUrl = "/resume.pdf"; // Place your resume.pdf in the public folder
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Rizwan_Hossain_Rahat_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Resume downloaded successfully!");
  };

  return (
    <nav className="w-full sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
            <div className="relative  h-10 rounded-full
    bg-black
    flex items-center justify-center
    border border-cyan-400/40
    shadow-[0_0_60px_rgba(168,85,247,0.7)]
    transition duration-500 hover:scale-110 hover:rotate-12">

    <Code2 className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,1)]" />
  </div>
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
             Rizwan Hossain Rahat
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section + Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Download Resume Button */}
            <Button
              onClick={handleDownloadResume}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
            >
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </Button>
            
            <ThemeToggle />
            
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {user.Role === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white/95 dark:bg-black/95 backdrop-blur">
          <div className="flex flex-col space-y-2 p-4">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Download Resume Button */}
            <button
              onClick={() => {
                handleDownloadResume();
                setIsOpen(false);
              }}
              className="flex items-center space-x-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-2 rounded-md transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </button>
            
            {!loading && user && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {user.Role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/dashboard/profile"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
