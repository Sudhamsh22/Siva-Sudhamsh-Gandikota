'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  CheckCircle2,
  MapPin,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroData, socialLinks } from '@/lib/data';

export function HeroSection() {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12 md:py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Recruiter Hook & Info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-left lg:col-span-7"
        >
          {/* Eyebrow badge (Availability + Grad Year + Location) */}
          <div className="mb-5 inline-flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-sans text-primary backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>{heroData.availabilityBadge}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs font-sans text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              <span>{heroData.location}</span>
            </div>
          </div>

          {/* Hero Name & Outcome-driven Headline */}
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl xl:text-7xl">
            {heroData.name}
          </h1>

          <p className="mt-4 font-headline text-2xl font-bold text-primary sm:text-3xl md:text-4xl [text-wrap:balance]">
            {heroData.headline}
          </p>

          <p className="mt-2 text-sm sm:text-base font-mono text-slate-300">
            {heroData.title}
          </p>

          {/* Concise bio description capped at ~65 chars */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {heroData.summary}
          </p>

          {/* Highlight metrics pill row with measurement context (Part 6.1) */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            {heroData.metrics.map((metric) => (
              <div
                key={metric.label}
                className="inline-flex flex-col gap-0.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 backdrop-blur-md transition-colors hover:border-primary/30"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold text-foreground font-mono text-sm">{metric.value}</span>
                  <span className="text-slate-300 font-medium">{metric.label}</span>
                </div>
                <span className="text-[0.68rem] text-muted-foreground pl-5">{metric.detail}</span>
              </div>
            ))}
          </div>

          {/* Two Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              <a href="#projects" onClick={scrollToProjects}>
                View projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-border bg-card/60 px-6 font-semibold text-foreground transition-all duration-300 hover:bg-white/10 hover:border-primary/50 hover:-translate-y-0.5"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download resume
                <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Quick Social & Direct Contact Links */}
          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/40 pt-6">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Connect:
            </span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5"
            >
              <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5"
            >
              <Linkedin className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Home Screen Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center lg:col-span-5 lg:justify-end"
        >
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Ambient subtle glow backdrop */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-cyan-400/15 to-sky-500/15 blur-2xl opacity-60" />

            {/* Main glass photo card without fake telemetry */}
            <div className="glass-card relative overflow-hidden rounded-3xl border border-primary/25 p-3.5 bg-card/60 backdrop-blur-2xl shadow-2xl">
              {/* Photo Container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                <Image
                  src="/Siva.jpg"
                  alt="Siva Sudhamsh Gandikota"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />

                {/* Subtle dark gradient overlay to blend smoothly with dark theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/30 pointer-events-none" />

                {/* Clean caption card without telemetry badges */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/75 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-headline text-xs font-semibold text-foreground">
                        {heroData.name}
                      </p>
                      <p className="text-[0.7rem] text-muted-foreground">
                        AI Specialization • GRIET
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
