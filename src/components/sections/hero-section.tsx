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
    <section id="home" className="flex min-h-screen flex-col items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <h1 
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl font-headline"
        >
          {heroData.name}
        </h1>
        <p 
          className="mt-4 text-lg md:text-2xl text-muted-foreground font-medium"
        >
          {heroData.title}
        </p>
        <div
            className="mt-6 text-base md:text-xl text-primary font-mono h-8"
        >
            <AnimatedTyping />
        </div>
        <div 
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
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
        </div>
      </motion.div>
    </section>
  );
}
