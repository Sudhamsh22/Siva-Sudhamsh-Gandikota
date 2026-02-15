'use client';

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/lib/data';
import React from 'react';

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-background/80 backdrop-blur-sm w-full py-8 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-muted-foreground">
            &copy; {year || ''} Siva Sudhamsh Gandikota. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/70">
            Designed with 🚀, built with Next.js & Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5 hover:text-primary transition-colors" />
            </Button>
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
            </Button>
          </a>
          <a href={`mailto:${socialLinks.email}`}>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5 hover:text-primary transition-colors" />
            </Button>
          </a>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="group"
        >
          <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
          <span className="sr-only">Back to top</span>
        </Button>
      </div>
    </footer>
  );
}
