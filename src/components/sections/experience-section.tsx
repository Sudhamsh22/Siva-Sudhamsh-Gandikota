'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { experience } from '@/lib/data';
import { BrainCircuit, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: { [key: string]: React.ElementType } = {
  'Vishwam AI': BrainCircuit,
  'Freelance': Server,
};

export function ExperienceSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <section id="experience" ref={ref}>
      <h2 className="section-heading">Experience</h2>
      <p className="section-subheading">
        A journey of growth, innovation, and impact in the tech world.
      </p>

      <div className="mt-16 relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>
        
        {experience.map((item, index) => {
          const isLeft = index % 2 === 0;
          const Icon = iconMap[item.company] || BrainCircuit;

          const itemRef = React.useRef(null);
          const itemInView = useInView(itemRef, { once: true, margin: '-200px' });
          
          return (
            <div key={index} ref={itemRef} className={cn("relative", index === experience.length - 1 ? 'mb-0' : 'mb-12 md:mb-24' )}>
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 bg-background border-2 border-primary rounded-full flex items-center justify-center z-10"
                initial={{ scale: 0 }}
                animate={itemInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Icon className="w-5 h-5 text-primary" />
              </motion.div>
              
              <motion.div
                className={`w-full md:w-5/12 ${isLeft ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'}`}
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                animate={itemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-headline text-xl text-primary">{item.role}</CardTitle>
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                    </div>
                    <p className="text-muted-foreground font-semibold">{item.company}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">▹</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
