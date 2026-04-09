'use client';

import { Home, User, Wrench, Briefcase, LayoutGrid, Mail } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
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

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
};

const DockItem = ({ mouseX, link }: { mouseX: MotionValue<number>, link: typeof navLinks[0] }) => {
  const Icon = iconMap[link.label];
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Adjust the range and magnification for a better feel
  const widthSync = useTransform(distance, [-150, 0, 150], [56, 96, 56]);
  // Tweak spring settings for less lag
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          ref={ref}
          style={{ width }}
          href={link.href}
          onClick={(e) => handleLinkClick(e, link.href)}
          className="flex aspect-square items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary"
          aria-label={link.label}
        >
          {Icon && <Icon className="h-7 w-7" />}
        </motion.a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{link.label}</p>
      </TooltipContent>
    </Tooltip>
  );
};


const MobileDock = () => {
    return (
        <nav className="flex items-end h-20 gap-2 rounded-full border border-primary/10 bg-card/50 p-2 shadow-lg backdrop-blur-lg">
            {navLinks.map((link) => {
                const Icon = iconMap[link.label];
                return (
                    <Tooltip key={link.href}>
                        <TooltipTrigger asChild>
                        <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="flex h-14 w-14 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                            aria-label={link.label}
                        >
                            {Icon && <Icon className="h-7 w-7" />}
                        </a>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{link.label}</p>
                        </TooltipContent>
                    </Tooltip>
                )
            })}
        </nav>
    );
};


export function Header() {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(Infinity);
  
  // This helps prevent a flash of the desktop dock on mobile
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // or a placeholder
  }

  if (isMobile) {
    return (
        <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <TooltipProvider>
                <MobileDock />
            </TooltipProvider>
        </header>
    )
  }

  return (
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <TooltipProvider>
        <motion.nav 
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end h-20 gap-2 rounded-full border border-primary/10 bg-card/50 p-2 shadow-lg backdrop-blur-lg"
        >
          {navLinks.map((link) => (
            <DockItem key={link.href} mouseX={mouseX} link={link} />
          ))}
        </motion.nav>
      </TooltipProvider>
    </header>
  );
}
