'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { heroData } from '@/lib/data';

const AnimatedTyping = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
  
    useEffect(() => {
      const handleTyping = () => {
        const i = loopNum % heroData.animatedTexts.length;
        const fullText = heroData.animatedTexts[i];
  
        if (isDeleting) {
          setText(fullText.substring(0, text.length - 1));
        } else {
          setText(fullText.substring(0, text.length + 1));
        }
  
        if (!isDeleting && text === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(100);
        } else if (isDeleting && text === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(150);
        }
      };
  
      const typingTimeout = setTimeout(handleTyping, typingSpeed);
  
      return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return <span className="border-r-2 border-primary animate-pulse">{text}</span>;
}

export function HeroSection() {
    const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center">
      <div className="relative z-10">
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl font-headline font-bold tracking-tighter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {heroData.name}
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg md:text-2xl text-muted-foreground font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {heroData.title}
        </motion.p>
        <motion.div
            className="mt-6 text-base md:text-xl text-primary font-mono h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <AnimatedTyping />
        </motion.div>
        <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <Button size="lg" onClick={scrollToProjects}>
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
                <a href="/Siva-Gandikota-Resume.pdf" download>
                    Download Resume
                    <Download className="ml-2 h-5 w-5" />
                </a>
            </Button>
        </motion.div>
      </div>
    </section>
  );
}
