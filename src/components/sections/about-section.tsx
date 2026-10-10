'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { aboutData, educationData, aboutMetrics, currentlyBuilding } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Target, Zap, Clock, GraduationCap, Award, Flame } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const metricIcons = [Target, Clock, Zap, Award];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Professional Profile</p>
        <h2 className="section-heading">About Me</h2>
        <p className="section-subheading">
          A bit about how I work, what I build, and what I&apos;m looking for.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left Column: Summary & Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-between lg:col-span-7"
        >
          <div className="glass-card flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8 border-border/80">
            <div>
              <h3 className="font-headline text-xl font-bold text-foreground sm:text-2xl">
                Bridging Machine Learning Research & Production Engineering
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {aboutData.summary}
              </p>

              <div className="mt-6 space-y-3.5">
                {aboutData.bulletPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.05]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-slate-300">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card embedded cleanly */}
            <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.03] p-4 sm:p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="font-headline text-sm sm:text-base font-bold text-foreground">
                      {educationData.institution}
                    </h4>
                    <span className="font-mono text-xs text-muted-foreground">
                      {educationData.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary font-medium mt-0.5">
                    {educationData.degree}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-primary">
                    <span>CGPA: {educationData.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Key Metrics Grid (Aligned Height) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-5 h-full"
        >
          {aboutMetrics.map((item, index) => {
            const Icon = metricIcons[index] || Target;
            return (
              <Card
                key={item.context}
                className="glass-card--interactive flex flex-col justify-between p-6 rounded-2xl border-border/80 h-full"
              >
                <CardContent className="p-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-xl bg-primary/10 p-2.5 text-primary border border-primary/20">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[0.7rem] font-medium text-slate-400">
                        {item.label}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                      <AnimatedCounter value={item.value} />
                      <span className="text-primary">{item.suffix}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground font-medium leading-snug">
                      {item.context}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      </div>

      {/* Currently Building Strip (Part 6.6) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.03] p-5 sm:p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-4 w-4 text-primary animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
            Now / Currently Building
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentlyBuilding.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-md bg-white/5 px-2 py-0.5 font-mono text-[0.68rem] text-primary mb-1.5 border border-white/10">
                  {item.tag}
                </span>
                <h4 className="font-headline text-sm font-bold text-foreground">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
