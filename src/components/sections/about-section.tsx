'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { aboutData, achievements } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Zap, Users, ShieldCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const iconMap = {
  'ML Model Accuracy': Target,
  'Concurrent Users': Users,
  'API Uptime': ShieldCheck,
  'Students Mentored': Zap,
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
  const isInView = useInView(ref, { once: true, margin: '-200px' });
  
  const avatarImage = PlaceHolderImages.find(p => p.id === 'siva-avatar');

  return (
    <section id="about" ref={ref}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-heading text-left">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {aboutData.summary}
          </p>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
        >
           {avatarImage && (
             <div className="flex justify-center">
              <Image
                src={avatarImage.imageUrl}
                alt={avatarImage.description}
                data-ai-hint={avatarImage.imageHint}
                width={200}
                height={200}
                className="rounded-full border-4 border-primary/50 shadow-lg"
              />
              </div>
            )}
          <div className="grid grid-cols-2 gap-6">
            {achievements.slice(0, 4).map((achievement, index) => {
              const Icon = iconMap[achievement.label as keyof typeof iconMap] || Target;
              return (
                <Card key={index} className="glass-card text-center p-4">
                  <CardContent className="p-0">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="text-3xl font-bold font-headline text-primary">
                        <AnimatedCounter value={achievement.value} text={achievement.label} />
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.label.replace(/\d+%/g, '').trim()}</p>
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
