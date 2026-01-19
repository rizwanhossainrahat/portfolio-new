'use client';

import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/Projects/ProjectCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import AboutPage from './about/page';
import ContactPage from './contact/page';

export default function HomePage() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Hi I&apos;m Rizwan Hossain Rahat
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Full-stack developer passionate about creating amazing web experiences
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link href="/project">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
                
                {/* Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <Image
                    src="/assets/rahat.png"
                    alt="Rizwan Hossain Rahat"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/50 py-16">
        <h2 className="text-center text-4xl font-bold mb-4">About Me</h2>
       <div >
         <AboutPage/>
       </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-xl text-muted-foreground">
            Explore all of my work and side projects
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="container mx-auto px-4">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4"> Contact Me</h2>
        </div> */}
        <div>
          <ContactPage/>
        </div>
       
      </section>
    </div>
  );
}