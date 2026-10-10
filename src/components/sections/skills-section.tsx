'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/lib/data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Technical Capabilities</p>
        <h2 className="section-heading">Skills & Tech Stack</h2>
        <p className="section-subheading">
          Categorized technical toolset across machine learning engineering, backend services, and modern interfaces.
        </p>
      </motion.div>

      {/* 2x2 Balanced Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="glass-card--interactive flex h-full flex-col justify-between rounded-2xl border-border/80 p-6 sm:p-7">
                <CardHeader className="p-0 pb-4 border-b border-border/30">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg sm:text-xl font-bold text-foreground">
                        {category.category}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 pt-5 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-lg border border-white/10 bg-card/60 px-3 py-1.5 font-mono text-xs text-slate-200 transition-colors duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
