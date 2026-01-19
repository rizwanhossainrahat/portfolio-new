'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Database, 
  Globe, 
  Palette, 
  Server, 
  Smartphone,
  Users,
  Zap,
  Target,
  Mail
} from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  const frontendTech = [
    'Next.js', 'React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 
    'Shadcn UI', 'DaisyUI', 'Bootstrap', 'Material UI'
  ];

  const backendTech = [
    'Node.js', 'Express.js', 'Zod', 'JWT', 'Prisma'
  ];

  const databaseTech = [
    'MongoDB', 'PostgreSQL', 'Firebase'
  ];

  const cloudTech = [
    'Google Cloud', 'Firebase', 'Stripe', 'SSLcommerz', 'Npm'
  ];

  const designTech = [
    'Figma', 'Responsive Design', 'UI/UX'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Code2 className="w-16 h-16 text-white" />
            </div> */}
           
           <div className="relative w-36 h-36 mx-auto mb-8">
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-80 animate-pulse"></div>

  <div className="relative w-full h-full rounded-full
    bg-black
    flex items-center justify-center
    border border-cyan-400/40
    shadow-[0_0_60px_rgba(168,85,247,0.7)]
    transition duration-500 hover:scale-110 hover:rotate-12">

    <Code2 className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,1)]" />
  </div>
</div>


            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Full-Stack Web Developer
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              I am a passionate Full-Stack Web Developer who creates scalable, high-performance, 
              and user-focused web applications with clean and efficient code.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/project">
                <Globe className="mr-2 h-5 w-5" />
                View My Work
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Location</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently located in <span className="font-semibold text-primary">Dhaka, Bangladesh</span>
              </p>
              <p className="text-base text-muted-foreground mt-4">
                Available for remote work and collaborations worldwide
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack & Expertise</h2>
            <p className="text-lg text-muted-foreground">
              Technologies I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Palette className="w-8 h-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold">Frontend Development</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {frontendTech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backend */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Server className="w-8 h-8 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold">Backend Development</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {backendTech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Database */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Database className="w-8 h-8 text-purple-500 mr-3" />
                  <h3 className="text-xl font-semibold">Database & Storage</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {databaseTech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cloud & Services */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Globe className="w-8 h-8 text-orange-500 mr-3" />
                  <h3 className="text-xl font-semibold">Cloud & Services</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cloudTech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Design & Tools */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="w-8 h-8 text-pink-500 mr-3" />
                  <h3 className="text-xl font-semibold">Design & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {designTech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialization */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-semibold">Specialization</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Performance Optimization</Badge>
                  <Badge variant="secondary" className="text-xs">Clean Architecture</Badge>
                  <Badge variant="secondary" className="text-xs">Scalable Solutions</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-lg text-muted-foreground">
              Creating digital solutions that make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High-Performance Apps</h3>
              <p className="text-muted-foreground">
                Building fast, scalable web applications optimized for performance and user experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User-Focused Design</h3>
              <p className="text-muted-foreground">
                Creating intuitive interfaces that prioritize usability and accessibility for all users.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Code2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
              <p className="text-muted-foreground">
                Writing maintainable, efficient code following best practices and modern standards.
              </p>
            </div>
          </div>
        </div>
      </section>

     

     
    </div>
  );
};

export default AboutPage;