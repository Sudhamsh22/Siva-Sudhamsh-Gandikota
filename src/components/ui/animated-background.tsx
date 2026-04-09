'use client';

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { RobotFigure } from './RobotFigure';

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'achievements',
  'certifications',
  'contact',
] as const;

type SectionId = (typeof SECTION_IDS)[number];

const SECTION_LABELS: Record<SectionId, string> = {
  home: 'Launch',
  about: 'Profile',
  skills: 'Systems',
  experience: 'Career',
  projects: 'Projects',
  achievements: 'Impact',
  certifications: 'Proof',
  contact: 'Contact',
};

const SECTION_LABEL_LIST = SECTION_IDS.map((id) => SECTION_LABELS[id]);

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.02' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.8'/%3E%3C/svg%3E\")";

// Spring configs extracted so they can be shared / tweaked in one place
const SPRING_MOUSE = { stiffness: 90, damping: 24, mass: 0.3 } as const;
const SPRING_SCROLL = { stiffness: 70, damping: 22, mass: 0.25 } as const;

// Floating orb animation (defined once, not inline)
const ORB_ANIMATION = {
  x: [0, 14, -8, 0],
  y: [0, -12, 10, 0],
  opacity: [0.18, 0.28, 0.22, 0.18],
};

const ORB_TRANSITION = {
  duration: 18,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;

const SCAN_LINE_ANIMATION = {
  opacity: [0.2, 0.5, 0.2],
  scaleX: [0.85, 1.05, 0.85],
};

const SCAN_LINE_TRANSITION = {
  duration: 7,
  repeat: Infinity,
  ease: 'easeInOut',
} as const;

interface BackgroundWord {
  label: string;
  top: number;
  left: number;
  size: number;
  rotate: number;
  layer: 1 | 2 | 3;
  category: 'ml' | 'llm' | 'infra' | 'lang' | 'web';
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
}

const WORDS: BackgroundWord[] = [
  { label: 'TensorFlow', top: 12, left: 3, size: 0.72, rotate: -9, layer: 1, category: 'ml', driftX: 6, driftY: -10, duration: 22, delay: 0 },
  { label: 'PyTorch', top: 22, left: 6, size: 0.66, rotate: -5, layer: 2, category: 'ml', driftX: -8, driftY: 12, duration: 17, delay: 2.1 },
  { label: 'Ultralytics', top: 32, left: 2, size: 0.8, rotate: -11, layer: 1, category: 'ml', driftX: 5, driftY: 8, duration: 24, delay: 4.4 },
  { label: 'OpenCV', top: 42, left: 7, size: 0.62, rotate: -7, layer: 3, category: 'ml', driftX: -6, driftY: -14, duration: 14, delay: 1.2 },
  { label: 'scikit-learn', top: 52, left: 3, size: 0.7, rotate: -8, layer: 2, category: 'ml', driftX: 9, driftY: 10, duration: 19, delay: 3.5 },
  { label: 'NumPy', top: 62, left: 9, size: 0.64, rotate: -6, layer: 1, category: 'ml', driftX: -7, driftY: -8, duration: 23, delay: 6 },
  { label: 'Pandas', top: 72, left: 5, size: 0.62, rotate: -9, layer: 3, category: 'ml', driftX: 5, driftY: 12, duration: 15, delay: 0.8 },
  { label: 'XGBoost', top: 80, left: 12, size: 0.68, rotate: -5, layer: 2, category: 'ml', driftX: -9, driftY: -9, duration: 18, delay: 5.5 },
  { label: 'LangChain', top: 17, left: 22, size: 0.78, rotate: 4, layer: 2, category: 'llm', driftX: 8, driftY: -11, duration: 20, delay: 1 },
  { label: 'LangGraph', top: 35, left: 18, size: 0.68, rotate: 7, layer: 3, category: 'llm', driftX: -7, driftY: 13, duration: 16, delay: 3.3 },
  { label: 'Hugging Face', top: 55, left: 20, size: 0.64, rotate: 3, layer: 1, category: 'llm', driftX: 6, driftY: 9, duration: 25, delay: 7.1 },
  { label: 'Whisper', top: 75, left: 24, size: 0.72, rotate: 6, layer: 2, category: 'llm', driftX: -8, driftY: -10, duration: 21, delay: 2.7 },
  { label: 'Groq', top: 88, left: 16, size: 0.6, rotate: 5, layer: 3, category: 'llm', driftX: 7, driftY: 11, duration: 13, delay: 4.9 },
  { label: 'FastAPI', top: 10, left: 40, size: 0.7, rotate: -3, layer: 2, category: 'web', driftX: 5, driftY: -12, duration: 18, delay: 0.5 },
  { label: 'React', top: 28, left: 42, size: 0.74, rotate: 2, layer: 1, category: 'web', driftX: -6, driftY: 10, duration: 26, delay: 3.8 },
  { label: 'PostgreSQL', top: 68, left: 38, size: 0.64, rotate: -4, layer: 3, category: 'infra', driftX: 8, driftY: -10, duration: 14, delay: 1.6 },
  { label: 'MongoDB', top: 82, left: 44, size: 0.66, rotate: 3, layer: 2, category: 'infra', driftX: -5, driftY: 13, duration: 20, delay: 5.2 },
  { label: 'AWS', top: 62, left: 80, size: 0.72, rotate: 10, layer: 1, category: 'infra', driftX: -8, driftY: -10, duration: 24, delay: 0.3 },
  { label: 'Docker', top: 72, left: 84, size: 0.66, rotate: 8, layer: 3, category: 'infra', driftX: 6, driftY: 12, duration: 15, delay: 2.4 },
  { label: 'Redis', top: 82, left: 78, size: 0.6, rotate: 9, layer: 2, category: 'infra', driftX: -7, driftY: -8, duration: 19, delay: 6.7 },
  { label: 'C++', top: 75, left: 70, size: 0.82, rotate: 7, layer: 3, category: 'lang', driftX: 9, driftY: -13, duration: 14, delay: 1.9 },
  { label: 'Python', top: 86, left: 62, size: 0.76, rotate: 6, layer: 1, category: 'lang', driftX: -6, driftY: 10, duration: 23, delay: 4.3 },
  { label: 'YOLO', top: 68, left: 74, size: 0.88, rotate: 11, layer: 2, category: 'ml', driftX: 7, driftY: -11, duration: 17, delay: 3 },
];

const CATEGORY_TINT: Record<BackgroundWord['category'], string> = {
  ml: 'rgba(96, 200, 255, VAR)',
  llm: 'rgba(160, 140, 255, VAR)',
  infra: 'rgba(80, 220, 190, VAR)',
  lang: 'rgba(220, 200, 100, VAR)',
  web: 'rgba(180, 210, 255, VAR)',
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function padProgress(value: number): string {
  return String(Math.round(value * 100)).padStart(3, '0');
}

// ─── Hook: useScrollState ─────────────────────────────────────────────────────

interface ScrollState {
  progress: number;
  activeIndex: number;
}

function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, activeIndex: 0 });
  const rafRef = useRef<number>(0);

  const measure = useCallback(() => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    const nextProgress = clamp(window.scrollY / maxScroll, 0, 1);
    const probe = window.scrollY + window.innerHeight * 0.35;

    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (!el) continue;
      const distance = Math.abs(el.offsetTop - probe);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    setState({ progress: nextProgress, activeIndex: closestIndex });
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    measure();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [measure, scheduleUpdate]);

  return state;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface WordSpanProps {
  word: BackgroundWord;
  index: number;
}

const WordSpan = memo(function WordSpan({ word, index }: WordSpanProps) {
  const baseOpacity = word.layer === 1 ? 0.25 : word.layer === 2 ? 0.4 : 0.6;
  const tintTemplate = CATEGORY_TINT[word.category];

  return (
    <span
      className="absolute whitespace-nowrap select-none pointer-events-none transition-all duration-300 hover:opacity-100"
      style={{
        top: `${word.top}%`,
        left: `${word.left}%`,
        fontSize: `${word.size}rem`,
        transform: `rotate(${word.rotate}deg)`,
        fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
        fontWeight: 600,
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
        color: `rgba(220, 240, 255, ${baseOpacity})`,
        textShadow: `0 0 12px ${tintTemplate.replace('VAR', '0.6')}`,
        animation: `word-drift-${index} ${word.duration}s ${word.delay}s ease-in-out infinite alternate`,
        willChange: 'transform',
        zIndex: word.layer,
      }}
    >
      {word.label}
    </span>
  );
});

function useWordKeyframes() {
  useEffect(() => {
    const id = 'tech-word-keyframes';
    if (document.getElementById(id)) return;

    const rules = WORDS.map((word, index) => `
      @keyframes word-drift-${index} {
        from { transform: rotate(${word.rotate}deg) translate(0px, 0px); }
        to { transform: rotate(${word.rotate + (word.driftX > 0 ? 1.5 : -1.5)}deg) translate(${word.driftX}px, ${word.driftY}px); }
      }
    `).join('\n');

    const style = document.createElement('style');
    style.id = id;
    style.textContent = rules;
    document.head.appendChild(style);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);
}

const TechWordField = memo(function TechWordField() {
  useWordKeyframes();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0">
        {WORDS.map((word, index) => (
          <WordSpan key={`${word.label}-${index}`} word={word} index={index} />
        ))}
      </div>
    </div>
  );
});

// ─── Sub-component: HUD (top bar) ─────────────────────────────────────────────

interface HUDProps {
  progress: number;
  activeIndex: number;
}

const HUD = memo(function HUD({ progress, activeIndex }: HUDProps) {
  const progressPercent = useMemo(() => padProgress(progress), [progress]);

  return (
    <div
      role="status"
      aria-label={`Page progress ${progressPercent}%`}
      className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 py-6 text-[0.66rem] uppercase tracking-[0.32em] text-slate-400 md:px-10"
    >
      <div className="rounded-full border border-slate-300/10 bg-slate-950/20 px-3 py-2 backdrop-blur-xl select-none">
        Siva Sudhamsh // Neural Interface
      </div>
      <div className="min-w-[10rem] rounded-2xl border border-slate-300/10 bg-slate-950/20 px-4 py-3 text-right backdrop-blur-xl">
        <span aria-hidden="true">{progressPercent}%</span>
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-px w-full overflow-hidden bg-slate-300/15"
        >
          <div
            className="h-full bg-gradient-to-r from-sky-200 via-sky-400 to-slate-100 transition-[width] duration-150 ease-linear will-change-[width]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 text-[0.58rem] tracking-[0.35em] text-sky-200/90"
        >
          {SECTION_LABEL_LIST[activeIndex]}
        </div>
      </div>
    </div>
  );
});

// ─── Sub-component: RobotLayer ─────────────────────────────────────────────────

interface RobotLayerProps {
  smoothProgress: MotionValue<number>;
}

const RobotLayer = memo(function RobotLayer({ smoothProgress }: RobotLayerProps) {
  const scale  = useTransform(smoothProgress, [0, 1], [0.92, 1.26]);
  const y      = useTransform(smoothProgress, [0, 1], [40, -110]);
  const x      = useTransform(smoothProgress, [0, 1], [16, -24]);
  const rotate = useTransform(smoothProgress, [0, 1], [-4, 3]);

  return (
    <motion.div
      className="absolute right-[-3%] top-[7%] h-[82vh] w-[min(48rem,52vw)] min-w-[20rem] max-w-[56rem] will-change-transform"
      style={{ scale, y, x, rotate, transformOrigin: '50% 60%' }}
    >
      {/* Ambient glow behind figure */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_44%,rgba(179,227,255,0.16),rgba(179,227,255,0)_54%)] blur-3xl" />
      {/* Blurred ghost layer for depth */}
      <div className="absolute inset-0 opacity-70 blur-[60px]" aria-hidden="true">
        <RobotFigure />
      </div>
      {/* Sharp layer */}
      <div className="absolute inset-0">
        <RobotFigure />
      </div>
    </motion.div>
  );
});

// ─── Main export ──────────────────────────────────────────────────────────────

export function AnimatedBackground() {
  const { progress, activeIndex } = useScrollState();
  const scrollMotion = useMotionValue(0);
  const smoothProgress = useSpring(scrollMotion, SPRING_SCROLL);

  // Keep scroll motion value in sync with derived progress state
  useEffect(() => {
    scrollMotion.set(progress);
  }, [progress, scrollMotion]);

  const hazeOpacity = useTransform(smoothProgress, [0, 1, 1], [0.18, 0.28, 0.36]);
  const ringScale   = useTransform(smoothProgress, [0, 1], [0.88, 1.16]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#030812]"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,146,196,0.24),transparent_36%),linear-gradient(160deg,#071120_0%,#030812_45%,#08111d_100%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(220,235,248,0.17)_1px,transparent_1px),linear-gradient(90deg,rgba(164,184,204,0.12)_1px,transparent_1px)] [background-size:92px_92px]" />

      {/* Static ML word field */}
      <TechWordField />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(1,6,11,0.28)_44%,rgba(1,6,11,0.62)_100%)]" />

      {/* Parallax orbit rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/10 will-change-transform"
        style={{ scale: ringScale }}
      >
        <div className="absolute inset-[9%]  rounded-full border border-sky-100/10" />
        <div className="absolute inset-[19%] rounded-full border border-blue-200/10" />
        <div className="absolute inset-[31%] rounded-full border border-slate-200/10" />
      </motion.div>

      {/* Central haze */}
      <motion.div
        className="absolute left-1/2 top-[56%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(80,175,255,0.28),rgba(80,175,255,0)_65%)] blur-3xl will-change-[opacity]"
        style={{ opacity: hazeOpacity }}
      />

      {/* Robot figure */}
      <RobotLayer smoothProgress={smoothProgress} />

      {/* Floating ambient orb */}
      <motion.div
        className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,236,248,0.18),rgba(220,236,248,0)_72%)] blur-3xl"
        animate={ORB_ANIMATION}
        transition={ORB_TRANSITION}
      />

      {/* Animated scan line */}
      <motion.div
        className="absolute bottom-[14%] left-[10%] h-px w-[20rem] bg-gradient-to-r from-transparent via-sky-200/45 to-transparent"
        animate={SCAN_LINE_ANIMATION}
        transition={SCAN_LINE_TRANSITION}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{ backgroundImage: NOISE_SVG }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(2,8,18,0.78)_100%)]" />

      {/* ── Interactive HUD overlays (pointer-events re-enabled locally) ── */}
      <div className="pointer-events-auto">
        <HUD progress={progress} activeIndex={activeIndex} />
      </div>
    </div>
  );
}
