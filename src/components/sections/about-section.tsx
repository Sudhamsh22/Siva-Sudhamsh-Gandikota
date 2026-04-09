'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { aboutData, achievements } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Zap, Users, CheckCircle, TrendingUp, Cpu } from 'lucide-react';

const iconMap = {
  'ML Model Accuracy': Target,
  'Concurrent Users': Users,
  'Students Mentored': Zap,
  'Performance Improvement': TrendingUp,
};

const AnimatedCounter = ({ value, text }: { value: number; text: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = value;
        if (start === end) return;
  
        const duration = 2000;
        const incrementTime = (duration / end);
  
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) {
            clearInterval(timer);
          }
        }, incrementTime);
  
        return () => clearInterval(timer);
      }
    }, [isInView, value]);
  
    return (
        <span ref={ref}>
          {count}
          {text.includes('%') ? '%' : '+'}
        </span>
    );
};

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const avatarImage = PlaceHolderImages.find(p => p.id === 'siva-avatar');

  return (
    <section id="about" ref={ref} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Col - Bio */}
        <motion.div
          className="glass-card shadow-[0_0_40px_rgba(0,0,0,0.5)] border-primary/20 bg-background/60 p-10 md:p-14 relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Subtle bg glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="text-primary animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-wide">About Me</h2>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutData.summary}
          </p>
          <ul className="mt-8 space-y-4">
            {(aboutData.bulletPoints as string[]).map((point, index) => (
              <li key={index} className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 font-light">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Col - Visuals & Stats */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end w-full"
        >
           {/* Avatar Area */}
           {avatarImage && (
             <div className="relative mb-12 flex justify-center w-full">
              {/* Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-dashed border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <Image
                src={avatarImage.imageUrl}
                alt={avatarImage.description}
                data-ai-hint={avatarImage.imageHint}
                width={220}
                height={220}
                className="relative z-10 rounded-full border-[4px] border-background shadow-[0_0_30px_rgba(0,212,255,0.4)] object-cover"
              />
              </div>
            )}

          {/* Achievement Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {achievements.slice(0, 4).map((achievement, index) => {
              const Icon = iconMap[achievement.label as keyof typeof iconMap] || Target;
              // Alternate border glow for visual interest
              const glowColor = index % 2 === 0 ? "border-primary/30" : "border-accent/30";
              const textColor = index % 2 === 0 ? "text-primary" : "text-accent";

              return (
                <Card key={index} className={`glass-card bg-black/40 p-6 flex flex-col items-center justify-center border ${glowColor} hover:bg-white/5 transition-all`}>
                  <CardContent className="p-0 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${textColor} opacity-80`} />
                    <h4 className={`text-4xl font-bold font-headline mb-1 drop-shadow-md ${textColor}`}>
                        <AnimatedCounter value={achievement.value} text={achievement.label} />
                    </h4>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground opacity-70">
                        {achievement.label.replace(/\d+%/g, '').trim()}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
