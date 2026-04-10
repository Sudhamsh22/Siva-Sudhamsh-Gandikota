'use client';

import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Cpu, BarChart3, Zap } from 'lucide-react';

export function ProjectsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const autoTuningProject = projects.find(p => p.id === 'autotuning-ai');
  const otherProjects = projects.filter(p => p.id !== 'autotuning-ai');

  const categories = ['All', 'Machine Learning', 'Full-Stack'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = otherProjects.filter(project => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Machine Learning') {
      return project.tech.some(t => ['Python', 'YOLO', 'Scikit-learn', 'FastAPI', 'Streamlit'].includes(t));
    }
    if (activeCategory === 'Full-Stack') {
       return project.tech.some(t => ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'].includes(t));
    }
    return true;
  });

  return (
    <section id="projects" ref={ref} className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4">
      
      <div className="text-center mb-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-white tracking-tight mb-4 filter drop-shadow-lg drop-shadow-primary/20">
                System <span className="text-primary">Deployments</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Showcase of engineered platforms, machine learning tools, and intelligent architectures.
            </p>
        </motion.div>
      </div>

      {autoTuningProject && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
        >
          {/* Main AutoTuning.AI Insights Dashboard */}
          <div className="relative glass-card border border-primary/30 p-1 rounded-3xl overflow-hidden shadow-[0_0_50px_-15px_rgba(0,212,255,0.2)] bg-gradient-to-b from-background/90 to-background/50">
            {/* Dashboard Header UI */}
            <div className="bg-black/40 border-b border-primary/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Cpu className="text-primary animate-pulse" />
                    <span className="font-mono text-sm tracking-widest text-primary/80 uppercase mr-4">Insights Tool</span>
                    <h3 className="font-headline text-2xl font-bold text-white tracking-wide">{autoTuningProject.name}</h3>
                </div>
                <div className="hidden sm:flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-ping"></div>
                    <div className="w-2 h-2 rounded-full bg-accent/50"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-px bg-primary/10">
                {/* Left Col - Info */}
                <div className="col-span-1 lg:col-span-2 bg-background p-8 lg:p-12 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 p-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 to-transparent blur-2xl"></div>
                    
                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-6 z-10">
                        {autoTuningProject.description} 
                        <br/><br/>
                        <span className="text-white/80 font-medium">Generative AI dynamically reasons to display relevant diagnostic insights to the user for drastically improved comprehension and workflow efficiency.</span>
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 z-10">
                        {autoTuningProject.tech.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider rounded">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 z-10">
                        {autoTuningProject.links.live && (
                            <Button asChild size="lg" className="bg-primary text-background shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]">
                                <a href={autoTuningProject.links.live} target="_blank" rel="noopener noreferrer">Live Diagnostics <ExternalLink className="ml-2 w-4 h-4" /></a>
                            </Button>
                        )}
                        {autoTuningProject.links.github && (
                            <Button asChild size="lg" variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
                                <a href={autoTuningProject.links.github} target="_blank" rel="noopener noreferrer">Source Code <Github className="ml-2 w-4 h-4" /></a>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Right Col - Stats HUD */}
                <div className="col-span-1 bg-black/60 p-8 flex flex-col justify-center gap-6 relative overflow-hidden backdrop-blur-md">
                    {/* Background grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    <div className="relative z-10 space-y-8">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2 text-primary/70 text-xs font-mono uppercase">
                                    <BarChart3 size={14} /> Evaluation Metric
                                </div>
                                <span className="text-3xl font-bold font-headline text-white drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">87%</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '87%' }} 
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_10px_rgba(0,212,255,1)]"
                                />
                            </div>
                            <div className="text-right mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">Accuracy reached after 10,000 loops</div>
                        </div>


                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2 text-green-400/70 text-xs font-mono uppercase">
                                    <Zap size={14} /> Diagnostic Latency
                                </div>
                                <span className="text-3xl font-bold font-headline text-white drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">&lt;2m</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: "100%" }}
                                    whileInView={{ width: '20%' }} 
                                    transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-green-400/50 to-green-400 shadow-[0_0_10px_rgba(74,222,128,1)]"
                                />
                            </div>
                            <div className="text-right mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">Rapid Result Output</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Other Projects Grid */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <h3 className="text-2xl font-headline font-bold text-white border-l-4 border-accent pl-4">Additional Architectures</h3>
        <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest transition-all ${activeCategory === cat ? 'bg-primary text-background shadow-[0_0_15px_rgba(0,212,255,0.4)]' : 'bg-primary/10 text-primary/70 hover:bg-primary/20 hover:text-primary'}`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>
      
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
             <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
             >
                <Card className="glass-card flex flex-col h-full bg-background/40 hover:bg-background/60 transition-colors border-white/5">
                    <CardHeader className="p-5 pb-3">
                        <CardTitle className="font-headline text-lg text-primary/90">{project.name}</CardTitle>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.stats.map(stat => (
                            <Badge key={stat.label} variant="secondary" className="text-[10px] bg-secondary/10 text-secondary border-none">{stat.value} {stat.label}</Badge>
                        ))}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-5 pt-2">
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-4">
                        {project.tech.map(tech => (
                            <span key={tech} className="text-[10px] font-mono text-white/40 uppercase tracking-widest bg-black/30 px-2 py-0.5 rounded">{tech}</span>
                        ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 p-5 pt-0">
                        {project.links.live && (
                        <Button asChild size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary pl-0">
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">Live <ExternalLink className="ml-1.5 w-3 h-3" /></a>
                        </Button>
                        )}
                        {project.links.github && (
                        <Button variant="ghost" asChild size="sm" className="hover:bg-accent/10 hover:text-accent pl-0">
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub <Github className="ml-1.5 w-3 h-3" /></a>
                        </Button>
                        )}
                    </CardFooter>
                </Card>
             </motion.div>
          ))}
          </AnimatePresence>
      </motion.div>
    </section>
  );
}
