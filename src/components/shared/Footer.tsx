import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/project' },
      { name: 'Contact', href: '/contact' },
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/rizwanhossainrahat', icon: Github },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rizwanhossainrahat', icon: Linkedin },
      { name: 'Facebook', href: 'https://www.facebook.com/rizwan.rahat.3', icon: Facebook },
      { name: 'Email', href: 'mailto:rizwanhossainrahat400@gmail.com', icon: Mail },
    ],
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Rizwan Hossain Rahat
            </h3>
            <p className="text-muted-foreground">
              Full-stack developer crafting beautiful and functional web experiences.
            </p>
          </div>

             {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect with me</h4>
            <div className="flex space-x-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              Let&apos;s build something amazing together!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

       
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Rizwan Hossain Rahat. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
