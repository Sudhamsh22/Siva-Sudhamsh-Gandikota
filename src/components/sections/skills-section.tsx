'use client';

import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skills } from '@/lib/data';
import { Cpu, Code, Database, Cloud, Network, Layers, Server, Activity, Brain } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Code,
  Database,
  Cloud,
  Network,
  Layers,
  Server,
  Activity,
  Brain
};

// Circular gauge for the back of the card
const ProgressRing = ({ proficiency, color }: { proficiency: number, color: string }) => {
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24 mb-2">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + ' ' + circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="absolute font-mono text-lg font-bold text-white drop-shadow-md">
         {Math.round(proficiency)}
         <span className="text-xs text-white/60 ml-0.5">%</span>
      </div>
    </div>
  );
};

export function SkillsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(skills[0].category);

  return (
    <section id="skills" ref={ref} className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
      
      <div className="text-center mb-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block tracking-tight mb-4 filter drop-shadow-lg drop-shadow-primary/20">
                Neural Matrices
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Technical skill parameters calibrated for high-performance AI deployment and scalable full-stack engineering.
            </p>
        </motion.div>
      </div>

      {/* Futuristic Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {skills.map((cat) => {
          const Icon = cat.icon || Cpu;
          return (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-mono tracking-wide
              ${activeCategory === cat.category 
                ? 'text-primary-foreground shadow-[0_0_15px_rgba(0,212,255,0.4)]' 
                : 'text-muted-foreground hover:text-white border border-white/5 bg-white/5'
              }
            `}
          >
            {activeCategory === cat.category && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/90 rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                <Icon size={16} />
                {cat.category}
            </span>
          </button>
        )})}
      </div>

      {/* Cards Grid */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {skills.map((category) => {
            if (category.category !== activeCategory) return null;
            
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]"
              >
                {category.technologies.map((tech, i) => {
                  const Icon = iconMap[tech.icon] || Cpu;
                  // Alternate colors based on index to make it not generic
                  const neonColor = i % 2 === 0 ? '#00d4ff' : '#8b5cf6';

                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      className="group relative h-64 w-full [transform-style:preserve-3d] cursor-pointer"
                    >
                      {/* Inner wrapper for 3D flip */}
                      <div className="absolute inset-0 w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                        
                        {/* Front of Card */}
                        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-card border border-primary/20 p-6 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background/80 to-background/40">
                             {/* Circuit board background pattern */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:10px_10px]"></div>
                            
                            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_4s_linear_infinite]"></div>
                              <div className="absolute inset-[10%] rounded-full border border-dashed border-accent/50 animate-[spin_6s_linear_infinite_reverse]"></div>
                              <Icon size={36} style={{ color: neonColor, filter: `drop-shadow(0 0 8px ${neonColor})` }} />
                            </div>
                            <h3 className="text-xl font-bold font-headline text-white tracking-wide text-center drop-shadow-md">
                                {tech.name}
                            </h3>
                        </div>

                        {/* Back of Card */}
                        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-card border p-6 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl" style={{ borderColor: neonColor }}>
                           <ProgressRing proficiency={tech.proficiency} color={neonColor} />
                           {/* HUD style metadata */}
                           <div className="text-center w-full mt-2 space-y-1">
                               <div className="text-[10px] font-mono text-muted-foreground uppercase opacity-80 tracking-widest">Efficiency Rating</div>
                               <div className="text-sm font-semibold tracking-wide" style={{ color: neonColor, textShadow: `0 0 5px ${neonColor}` }}>
                                   {tech.level}
                               </div>
                           </div>
                           
                           {/* Decorative corners */}
                           <div className="absolute top-2 left-2 w-2 h-2 border-t border-l" style={{ borderColor: neonColor }}></div>
                           <div className="absolute top-2 right-2 w-2 h-2 border-t border-r" style={{ borderColor: neonColor }}></div>
                           <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l" style={{ borderColor: neonColor }}></div>
                           <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r" style={{ borderColor: neonColor }}></div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
