'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Terminal, Cpu, Network } from 'lucide-react';
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

    return (
        <span className="flex items-center text-accent/90">
            <span className="mr-2 text-primary">&gt;</span>
            {text}
            <span className="inline-block w-2.5 h-6 ml-1 bg-primary animate-pulse relative top-1"></span>
        </span>
    );
}

export function HeroSection() {
    const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center w-full px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Holographic glowing card background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 rounded-3xl blur-xl" />
        
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-background/60 p-8 md:p-14 backdrop-blur-2xl shadow-[0_0_80px_-15px_rgba(0,212,255,0.15)]">
            {/* Top terminal bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 border-b border-primary/20 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 text-xs font-mono text-muted-foreground flex items-center gap-2">
                    <Terminal size={12} />
                    ~/system/ai-core/init.sh
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-6"
                >
                    <Network size={16} className="animate-pulse" />
                    <span>Neural Network Online</span>
                </motion.div>

                <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl font-headline filter drop-shadow-lg">
                    {heroData.name}
                </h1>
                
                <p className="mt-6 text-xl md:text-3xl text-primary font-light tracking-wide flex items-center justify-center gap-3">
                    <Cpu size={28} className="text-primary hidden sm:block" />
                    {heroData.title}
                    <Cpu size={28} className="text-primary hidden sm:block" />
                </p>

                <div className="mt-8 mb-10 h-10 flex items-center justify-center text-lg md:text-2xl font-mono font-semibold bg-black/30 w-full max-w-2xl mx-auto rounded-lg border border-white/5 py-8">
                    <AnimatedTyping />
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
                    <Button 
                        size="lg" 
                        onClick={scrollToProjects}
                        className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold h-14 px-8 rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:-translate-y-1"
                    >
                        Initialize Projects
                        <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
                    </Button>
                    <Button 
                        size="lg" 
                        variant="outline" 
                        asChild
                        className="h-14 px-8 rounded-xl border-accent/50 text-accent hover:bg-accent/10 transition-all duration-300 backdrop-blur-sm"
                    >
                        <a href="/resume.pdf" download>
                            Extract Data (Resume)
                            <Download className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
}
