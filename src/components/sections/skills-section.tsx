'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skills } from '@/lib/data';
import {
  Server,
  BrainCircuit,
  Code,
  Database,
  Cloud,
  Icon as LucideIcon,
  Cpu,
  Smartphone,
  PenTool,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categoryIcons: { [key: string]: LucideIcon } = {
  'Backend & APIs': Server,
  'AI/ML': BrainCircuit,
  'Frontend': Code,
  'Databases': Database,
  'Cloud & DevOps': Cloud,
};

export function SkillsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="skills" ref={ref}>
      <h2 className="section-heading">Technical Skills</h2>
      <p className="section-subheading">
        My toolbox for building intelligent and scalable solutions. I'm always learning and expanding my skillset.
      </p>
      <div className="mt-16">
        <Tabs defaultValue={skills[0].category} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {skills.map((skillCategory) => (
              <TabsTrigger key={skillCategory.category} value={skillCategory.category}>
                {skillCategory.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {skills.map((skillCategory) => (
            <TabsContent key={skillCategory.category} value={skillCategory.category}>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {skillCategory.technologies.map((tech, index) => {
                  const Icon = tech.icon ? Cpu : Code;
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="glass-card text-center p-6 group h-full">
                        <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping-slow group-hover:animate-ping"></div>
                          <div className="relative bg-background p-3 rounded-full">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.level}</p>
                        <Progress value={tech.proficiency} className="mt-2 h-2" />
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
