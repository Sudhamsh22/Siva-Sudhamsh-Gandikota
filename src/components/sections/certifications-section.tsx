'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { certifications } from '@/lib/data';
import { Cloud, ShieldCheck, BrainCircuit, ExternalLink, CheckCircle } from 'lucide-react';

const providerIcons: Record<string, React.ElementType> = {
  'AWS Certified AI Practitioner': Cloud,
  'Microsoft Azure Fundamentals (AZ-900)': ShieldCheck,
  'Machine Learning Certificate': BrainCircuit,
};

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Continuous Learning</p>
        <h2 className="section-heading">Certifications & Proof</h2>
        <p className="section-subheading">
          Industry-recognized credentials in machine learning, generative AI, and cloud fundamentals.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const Icon = providerIcons[cert.name] || BrainCircuit;
          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="glass-card--interactive flex h-full flex-col justify-between rounded-2xl border-border/80 p-6 sm:p-7 text-center">
                <CardContent className="p-0 flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary mb-4">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.68rem] text-primary mb-2">
                      {cert.type}
                    </span>
                    <h3 className="font-headline text-lg font-bold text-foreground leading-snug">
                      {cert.name}
                    </h3>
                    <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/30 w-full">
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="w-full text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-xl"
                    >
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5"
                      >
                        Verify Credential <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
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
