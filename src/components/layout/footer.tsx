'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/lib/data';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full border-t border-border/40 bg-card/20 py-10 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">
            &copy; {year || 2025} Siva Sudhamsh Gandikota. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Built with Next.js, Three.js & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
          >
            <Button variant="ghost" size="sm" className="h-9 px-3 rounded-xl hover:text-primary gap-1.5 text-xs text-slate-300">
              <FileText className="h-3.5 w-3.5" />
              Resume
            </Button>
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:text-primary">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:text-primary">
              <Linkedin className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            aria-label="Email Siva"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:text-primary">
              <Mail className="h-4 w-4" />
            </Button>
          </a>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-2 h-9 w-9 rounded-xl border-border/80 hover:bg-white/10"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
