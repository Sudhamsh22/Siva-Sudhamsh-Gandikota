'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { experience } from '@/lib/data';
import { BrainCircuit, Server, CheckCircle2, Calendar } from 'lucide-react';

const companyIcons: Record<string, React.ElementType> = {
  'Vishwam AI': BrainCircuit,
  'Independent Client Engineering': Server,
};

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Career Timeline</p>
        <h2 className="section-heading">Work Experience</h2>
        <p className="section-subheading">
          Engineering roles delivering measurable gains across ML accuracy, throughput, and system reliability.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="mt-12 relative">
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute left-4 sm:left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

        <div className="space-y-8 md:pl-16">
          {experience.map((item, index) => {
            const Icon = companyIcons[item.company] || Server;
            return (
              <motion.div
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-16 top-8 hidden md:flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm shadow-primary/50">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>

                <Card className="glass-card--interactive rounded-2xl p-6 sm:p-8 border-border/80 w-full">
                  <CardHeader className="p-0 pb-4 border-b border-border/40">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-headline text-xl font-bold text-foreground sm:text-2xl">
                            {item.role}
                          </h3>
                          <p className="text-sm font-medium text-primary">
                            {item.company}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex self-start sm:self-center items-center gap-1.5 rounded-full border border-border/80 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300">
                        <Calendar className="h-3 w-3 text-primary" />
                        {item.duration}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 pt-5">
                    <ul className="space-y-3">
                      {item.description.map((point, descIndex) => (
                        <li key={descIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-sky-400" />
                          <span
                            className="text-sm sm:text-base leading-relaxed text-slate-300 [&>strong]:font-semibold [&>strong]:text-foreground"
                            dangerouslySetInnerHTML={{ __html: point }}
                          />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
