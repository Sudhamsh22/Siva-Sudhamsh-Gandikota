'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { leadershipAndAchievements } from '@/lib/data';
import { Award, DollarSign, Presentation, Users, Sparkles } from 'lucide-react';

const achievementIcons = [Award, Sparkles, DollarSign, Presentation];

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Community & Impact</p>
        <h2 className="section-heading">Leadership & Achievements</h2>
        <p className="section-subheading">
          Leading technical initiatives, organizing university hackathons, and mentoring aspiring developers.
        </p>
      </motion.div>

      {/* 4 Cards Balanced Grid: 1 col on mobile, 2 cols on md, 4 cols on lg */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leadershipAndAchievements.map((item, index) => {
          const Icon = achievementIcons[index % achievementIcons.length];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="glass-card--interactive flex h-full flex-col justify-between rounded-2xl border-border/80 p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[0.68rem] text-primary">
                      {item.organization}
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>
                </CardHeader>

                <CardContent className="p-0 pt-2 flex-grow">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
