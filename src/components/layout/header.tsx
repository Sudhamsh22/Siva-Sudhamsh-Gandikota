'use client';

import { Home, User, Wrench, Briefcase, LayoutGrid, Mail } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const iconMap: { [key: string]: React.ElementType } = {
    'Home': Home,
    'About': User,
    'Skills': Wrench,
    'Experience': Briefcase,
    'Projects': LayoutGrid,
    'Contact': Mail
};

export function Header() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <TooltipProvider>
        <nav className="flex items-center gap-2 rounded-full border border-primary/10 bg-card/50 p-2 shadow-lg backdrop-blur-lg">
          {navLinks.map((link) => {
            const Icon = iconMap[link.label];
            return (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                    aria-label={link.label}
                  >
                    {Icon && <Icon className="h-6 w-6" />}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </header>
  );
}
