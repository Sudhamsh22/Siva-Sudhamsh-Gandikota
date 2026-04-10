'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { experience } from '@/lib/data';
import { BrainCircuit, Server, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: { [key: string]: React.ElementType } = {
  'Vishwam AI': BrainCircuit,
  'Freelance': Server,
};

function ExperienceItem({
  item,
  index,
}: {
  item: typeof experience[number];
  index: number;
}) {
  const itemRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const isLeft = index % 2 === 0;
  const Icon = iconMap[item.company] || Activity;

  // Animated connector line from center
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);

  return (
    <div key={index} ref={itemRef} className={cn("relative", index === experience.length - 1 ? 'mb-0' : 'mb-20 md:mb-32' )}>
      {/* Central Axis Node */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-4 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center z-20 shadow-[0_0_20px_rgba(0,212,255,0.5)]"
        style={{ scale, opacity }}
      >
        <Icon className="w-6 h-6 text-primary animate-pulse" />
      </motion.div>

      {/* Animated Connector Line */}
      <div className={`hidden md:block absolute top-10 w-[calc(50%-1.5rem)] h-0.5 bg-gradient-to-r from-primary to-transparent z-0
        ${isLeft ? 'right-1/2 bg-gradient-to-l' : 'left-1/2'} `}>
          <motion.div 
            className="w-full h-full bg-primary shadow-[0_0_10px_rgba(0,212,255,0.8)]"
            style={{ scaleX: scrollYProgress, transformOrigin: isLeft ? 'right' : 'left' }}
          />
      </div>

      <motion.div
        className={`w-full md:w-[45%] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'} pt-16 md:pt-0`}
        style={{ opacity, scale }}
      >
        <Card className="glass-card relative overflow-hidden border-primary/20 group hover:border-primary/50 transition-colors">
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <CardHeader className="relative z-10 pb-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <CardTitle className="font-headline text-2xl text-white tracking-wide">{item.role}</CardTitle>
              <span className="text-xs font-mono px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">{item.duration}</span>
            </div>
            <p className="text-accent font-semibold tracking-wider text-sm uppercase">{item.company}</p>
          </CardHeader>
          <CardContent className="relative z-10">
            <ul className="space-y-3 text-sm text-muted-foreground mt-4">
              {item.description.map((desc, descriptionIndex) => (
                <li key={descriptionIndex} className="flex items-start gap-3">
                  <span className="text-secondary mt-1 max-w-[12px]"><Activity size={12} /></span>
                  <span className="leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export function ExperienceSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const axisHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="py-24 relative overflow-hidden">
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent inline-block tracking-tight mb-4 filter drop-shadow-lg">
           Experience Protocol
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Chronological logs of professional deployments and milestone operations.
        </p>
      </div>

      <div className="mt-16 relative max-w-5xl mx-auto px-4">
        {/* Main Vertical Axis Background */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-0 w-1 bg-border/50 rounded-full"></div>
        
        {/* Animated Data Stream along the Axis */}
        <motion.div 
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 w-1 bg-gradient-to-b from-primary via-accent to-transparent rounded-full shadow-[0_0_15px_rgba(0,212,255,0.6)]"
            style={{ height: axisHeight }}
        ></motion.div>

        {experience.map((item, index) => (
          <ExperienceItem key={`${item.company}-${item.role}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
