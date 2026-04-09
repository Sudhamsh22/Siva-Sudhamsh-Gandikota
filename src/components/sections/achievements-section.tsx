'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leadershipAndAchievements } from '@/lib/data';
import { Award, DollarSign, Presentation, Briefcase, Star } from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  'Vice-President': Star,
  '24-hour hackathon': Award,
  'sponsorships secured': DollarSign,
  'workshops conducted': Presentation,
  'students placed': Briefcase,
};

export function AchievementsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="achievements" ref={ref}>
      <h2 className="section-heading">Leadership & Achievements</h2>
      <p className="section-subheading">
        Beyond the code, I&apos;m passionate about building communities and fostering growth.
      </p>
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leadershipAndAchievements.map((achievement, index) => {
          const Icon = iconMap[Object.keys(iconMap).find(key => achievement.title.includes(key)) || ''] || Star;
          return (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Card className="glass-card h-full transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-primary/20">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
