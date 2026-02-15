'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { certifications } from '@/lib/data';
import { BadgeCheck } from 'lucide-react';

export function CertificationsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="certifications" ref={ref}>
      <h2 className="section-heading">Certifications</h2>
      <p className="section-subheading">
        Continuously learning and validating my skills with industry-recognized credentials.
      </p>
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {certifications.map((cert, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="glass-card group h-full overflow-hidden">
              <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                <div className="relative w-24 h-24 mb-4">
                  {/* For simplicity, we'll use a generic icon. In a real project, you'd use cert.logo */}
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <BadgeCheck className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground">{cert.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{cert.issuer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
