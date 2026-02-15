'use client';

import { Home, User, Wrench, Briefcase, LayoutGrid, Mail } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const iconMap: { [key: string]: React.ElementType } = {
    'Home': Home,
    'About': User,
    'Skills': Wrench,
    'Experience': Briefcase,
    'Projects': LayoutGrid,
    'Contact': Mail
};

const DockItem = ({ mouseX, link, handleLinkClick, isMobile }: { mouseX: any, link: typeof navLinks[0], handleLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void, isMobile: boolean }) => {
  const Icon = iconMap[link.label];
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return 0;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [48, 72, 48]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  if (isMobile) {
    return (
      <Tooltip>
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
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          ref={ref}
          style={{ width }}
          href={link.href}
          onClick={(e) => handleLinkClick(e, link.href)}
          className="flex aspect-square items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
          aria-label={link.label}
        >
          {Icon && <Icon className="h-6 w-6" />}
        </motion.a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{link.label}</p>
      </TooltipContent>
    </Tooltip>
  );
};


export function Header() {
  const isMobile = useIsMobile();
  let mouseX = useMotionValue(Infinity);
  
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
        <motion.nav 
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end h-16 gap-2 rounded-full border border-primary/10 bg-card/50 p-2 shadow-lg backdrop-blur-lg"
        >
          {navLinks.map((link) => (
            <DockItem key={link.href} mouseX={mouseX} link={link} handleLinkClick={handleLinkClick} isMobile={isMobile} />
          ))}
        </motion.nav>
      </TooltipProvider>
    </header>
  );
}
