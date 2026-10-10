'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Github,
  Zap,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

function MyFiDiagram() {
  return (
    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/[0.03] p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            System Architecture: Multi-Agent Orchestration
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LangGraph Stateful Routing
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-center">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-muted-foreground">Input</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">Transaction Stream</span>
          <span className="text-[0.65rem] text-slate-400 mt-1">PostgreSQL Ledger</span>
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-2.5 flex flex-col items-center justify-center relative">
          <span className="text-[0.65rem] font-mono uppercase text-primary">Hybrid RAG</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">SentenceTransformers</span>
          <span className="text-[0.65rem] text-primary/80 mt-1">ChromaDB Vector Store</span>
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-primary">Agents</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">Monitor → Explainer</span>
          <span className="text-[0.65rem] text-primary/80 mt-1">Ollama / LLM Reasoning</span>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-muted-foreground">Output</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">FastAPI Advisory</span>
          <span className="text-[0.65rem] text-emerald-400 mt-1">Zero Hallucination</span>
        </div>
      </div>
    </div>
  );
}

function AutoTuningDiagram() {
  return (
    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/[0.03] p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            Vision Pipeline: Automated Fault Inspection
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          92% mAP on 20+ Parts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-center">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-muted-foreground">Ingest</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">Component Imagery</span>
          <span className="text-[0.65rem] text-slate-400 mt-1">Preprocessed Frames</span>
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-primary">Inference</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">YOLO Segmentation</span>
          <span className="text-[0.65rem] text-primary/80 mt-1">20+ Mechanical Parts</span>
        </div>

        <div className="rounded-lg border border-primary/30 bg-primary/[0.06] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-primary">Analysis</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">FastAPI & Node.js</span>
          <span className="text-[0.65rem] text-primary/80 mt-1">&lt;2 Min Turnaround</span>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex flex-col items-center justify-center">
          <span className="text-[0.65rem] font-mono uppercase text-muted-foreground">Deployment</span>
          <span className="text-xs font-semibold text-foreground mt-0.5">Docker on AWS</span>
          <span className="text-[0.65rem] text-emerald-400 mt-1">Diagnostic Dashboard</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-eyebrow">Work & Systems</p>
        <h2 className="section-heading">Featured Projects</h2>
        <p className="section-subheading">
          Selected projects across AI, backend and full-stack.
        </p>
      </motion.div>

      {/* Featured Projects (Top 2 Full-Width Cards) */}
      <div className="mt-12 space-y-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card--interactive overflow-hidden rounded-2xl border-border/80 p-6 sm:p-8 md:p-9">
              {/* Header */}
              <div className="flex flex-col justify-between gap-4 border-b border-border/40 pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-0.5 font-mono text-[0.72rem] font-medium text-primary border border-primary/25">
                      <Sparkles className="h-3 w-3" />
                      {project.badgeType}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-300 mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Quick Link Buttons */}
                <div className="flex items-center gap-2.5">
                  {project.links.live && (
                    <Button
                      asChild
                      size="sm"
                      className="rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 shadow-sm"
                    >
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        Live Demo <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-border bg-card/60 hover:bg-white/10"
                    >
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        Code <Github className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Architecture Visual Diagram */}
              {project.id === 'myfi-ai' && <MyFiDiagram />}
              {project.id === 'autotuning-ai' && <AutoTuningDiagram />}

              {/* 5/7 Column Layout: Problem vs What I Built */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5 rounded-xl border border-white/5 bg-white/[0.02] p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                    <span>Problem</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 flex-grow">
                    {project.problem}
                  </p>
                </div>

                <div className="lg:col-span-7 rounded-xl border border-white/5 bg-white/[0.02] p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
                    <Zap className="h-4 w-4 text-sky-400" />
                    <span>What I Built</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300 flex-grow">
                    {project.built}
                  </p>
                </div>
              </div>

              {/* Highlights Outcome Callout */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-sky-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Highlights:
                </span>
                <span className="text-xs sm:text-sm text-foreground">
                  {project.highlights}
                </span>
              </div>

              {/* Dedicated Row for Tech Tags */}
              <div className="mt-4 pt-3 border-t border-border/30 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-muted-foreground mr-1">Stack:</span>
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-card/80 px-2.5 py-0.5 font-mono text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Projects Section */}
      <div className="mt-16 mb-6">
        <h3 className="font-headline text-xl font-semibold text-foreground sm:text-2xl">
          Additional Deployments & Prototypes
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Production systems, web platforms, and student assessment tools.
        </p>
      </div>

      {/* Grid of Other Projects (2 on md, 2 on lg for clean alignment) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="h-full"
          >
            <Card className="glass-card--interactive flex h-full flex-col justify-between rounded-2xl border-border/70 p-6">
              <CardHeader className="p-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-md bg-white/5 px-2 py-0.5 font-mono text-[0.68rem] text-primary mb-1.5 border border-white/10">
                      {project.badgeType}
                    </span>
                    <h4 className="font-headline text-lg font-bold text-foreground">
                      {project.name}
                    </h4>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-normal">
                  {project.tagline}
                </p>
              </CardHeader>

              <CardContent className="p-0 my-4 flex-grow space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.built}
                </p>

                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                  <span className="text-[0.7rem] font-mono uppercase text-primary font-medium block">
                    Highlights
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {project.highlights}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[0.7rem] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-0 pt-3 border-t border-border/30 flex items-center gap-2">
                {project.links.live && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2.5 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                  >
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      Live Preview <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg"
                  >
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      GitHub <Github className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
