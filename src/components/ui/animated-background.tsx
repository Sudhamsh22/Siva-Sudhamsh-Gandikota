'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import * as THREE from 'three';

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

const SPRING_SCROLL = { stiffness: 70, damping: 22, mass: 0.25 } as const;

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

const PARTICLE_COUNT = 250;
const PARTICLE_BOUNDS = { x: 300, y: 300, z: 200 } as const;
const PARTICLE_DRIFT = 0.4;
const MAX_MOUSE_INFLUENCE = 80;
const MAX_CONNECTION_DISTANCE_SQ = 15000;
const MAX_LINE_FLOATS = PARTICLE_COUNT * (PARTICLE_COUNT - 1) * 3;

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

// ─── Sub-component: HUD (top bar) ─────────────────────────────────────────────

interface HUDProps {
  progress: number;
  activeIndex: number;
}

interface TrainingLogLine {
  kind: 'boot' | 'data' | 'train' | 'eval' | 'save';
  text: string;
}

interface TrainingSnapshot {
  phase: string;
  epoch: string;
  loss: string;
  valAccuracy: string;
  gpu: string;
  throughput: string;
  learningRate: string;
  queueDepth: string;
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

const TRAINING_LOGS: TrainingLogLine[] = [
  {
    kind: 'boot',
    text: '$ python train.py --model yolov11m --data custom.yaml --epochs 150 --batch 32 --device cuda:0',
  },
  {
    kind: 'data',
    text: '[loader] indexed 128492 samples | cache=ram | augment=mosaic,mixup,randaugment',
  },
  {
    kind: 'train',
    text: '[epoch 008/150] loss=1.1423 cls=0.218 box=0.671 dfl=0.253 grad_norm=7.8',
  },
  {
    kind: 'train',
    text: '[epoch 019/150] loss=0.6841 lr=3.10e-4 throughput=408 img/s warmup=complete',
  },
  {
    kind: 'eval',
    text: '[validate] top1=91.8% precision=0.934 recall=0.917 f1=0.925 auc=0.962',
  },
  {
    kind: 'save',
    text: '[checkpoint] best.pt updated | val_loss improved 0.441 -> 0.398 | sync=tensorboard',
  },
  {
    kind: 'data',
    text: '[dataloader] prefetch queue stable | workers=8 pinned_memory=true cpu_load=61%',
  },
  {
    kind: 'train',
    text: '[epoch 047/150] loss=0.3927 ema=enabled label_smoothing=0.05 amp=fp16',
  },
  {
    kind: 'eval',
    text: '[validate] map50=0.948 map50-95=0.811 calibration_error=0.017 drift=nominal',
  },
  {
    kind: 'save',
    text: '[export] onnx checkpoint staged | tracing kernels | artifact=vision-stack-v4.onnx',
  },
  {
    kind: 'train',
    text: '[epoch 083/150] loss=0.2148 val_loss=0.2671 scheduler=cosine_restart patience=12',
  },
  {
    kind: 'eval',
    text: '[monitor] early-stop guard healthy | gpu_temp=67C vram=17.2/24.0GB power=241W',
  },
];

const TRAINING_SNAPSHOTS: TrainingSnapshot[] = [
  {
    phase: 'Dataset Profiling',
    epoch: '008 / 150',
    loss: '1.142',
    valAccuracy: '91.8%',
    gpu: '74%',
    throughput: '408 img/s',
    learningRate: '3.10e-4',
    queueDepth: '28 batches',
  },
  {
    phase: 'Backbone Warmup',
    epoch: '019 / 150',
    loss: '0.684',
    valAccuracy: '93.4%',
    gpu: '82%',
    throughput: '421 img/s',
    learningRate: '2.66e-4',
    queueDepth: '31 batches',
  },
  {
    phase: 'Feature Fusion',
    epoch: '047 / 150',
    loss: '0.393',
    valAccuracy: '94.1%',
    gpu: '86%',
    throughput: '437 img/s',
    learningRate: '1.90e-4',
    queueDepth: '33 batches',
  },
  {
    phase: 'Fine-Tuning Heads',
    epoch: '083 / 150',
    loss: '0.215',
    valAccuracy: '95.0%',
    gpu: '89%',
    throughput: '452 img/s',
    learningRate: '1.14e-4',
    queueDepth: '35 batches',
  },
  {
    phase: 'Calibration Sweep',
    epoch: '116 / 150',
    loss: '0.181',
    valAccuracy: '95.6%',
    gpu: '78%',
    throughput: '398 img/s',
    learningRate: '6.90e-5',
    queueDepth: '24 batches',
  },
  {
    phase: 'Checkpoint Consolidation',
    epoch: '149 / 150',
    loss: '0.164',
    valAccuracy: '96.1%',
    gpu: '64%',
    throughput: '366 img/s',
    learningRate: '1.50e-5',
    queueDepth: '12 batches',
  },
];

const TRAINING_WINDOW_SIZE = 6;
const TRAINING_TICK_MS = 1600;

function getLogAccent(kind: TrainingLogLine['kind']): string {
  switch (kind) {
    case 'boot':
      return 'text-sky-100/70';
    case 'data':
      return 'text-cyan-200/70';
    case 'train':
      return 'text-emerald-200/75';
    case 'eval':
      return 'text-amber-200/75';
    case 'save':
      return 'text-violet-200/75';
    default:
      return 'text-slate-200/70';
  }
}

function useTrainingTelemetry() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTick((current) => current + 1);
    }, TRAINING_TICK_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const visibleLogs = useMemo(() => {
    return Array.from({ length: TRAINING_WINDOW_SIZE }, (_, offset) => {
      const historyIndex = tick - (TRAINING_WINDOW_SIZE - 1 - offset);
      if (historyIndex < 0) return null;

      const log = TRAINING_LOGS[historyIndex % TRAINING_LOGS.length];
      return {
        ...log,
        id: `${historyIndex}-${log.text}`,
      };
    }).filter((log): log is TrainingLogLine & { id: string } => Boolean(log));
  }, [tick]);

  const snapshot = TRAINING_SNAPSHOTS[tick % TRAINING_SNAPSHOTS.length];
  const cycleProgress = ((tick % TRAINING_SNAPSHOTS.length) + 1) / TRAINING_SNAPSHOTS.length;

  return { cycleProgress, snapshot, tick, visibleLogs };
}

const TrainingConsole = memo(function TrainingConsole() {
  const { cycleProgress, snapshot, visibleLogs } = useTrainingTelemetry();

  return (
    <>
      <motion.div
        className="absolute right-[4%] top-[18%] hidden w-[24rem] overflow-hidden rounded-[1.6rem] border border-sky-200/10 bg-slate-950/24 shadow-[0_30px_90px_rgba(2,12,27,0.35)] backdrop-blur-2xl xl:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-between border-b border-slate-200/10 bg-slate-950/45 px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-slate-400">
          <span>training-monitor.log</span>
          <span className="text-emerald-300/80">cuda:0 active</span>
        </div>

        <div className="space-y-2 px-4 py-4 font-mono text-[0.68rem] leading-6">
          {visibleLogs.map((log, index) => {
            const isLatest = index === visibleLogs.length - 1;
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: isLatest ? 0.98 : 0.62, x: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`flex gap-3 ${getLogAccent(log.kind)}`}
              >
                <span className="text-slate-500">[{String(index + 1).padStart(2, '0')}]</span>
                <span className="flex-1">{log.text}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="border-t border-slate-200/10 px-4 py-4">
          <div className="mb-2 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.28em] text-slate-400">
            <span>{snapshot.phase}</span>
            <span>{snapshot.epoch}</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-slate-200/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300"
              animate={{ width: `${cycleProgress * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[14%] left-[4%] hidden w-[20rem] rounded-[1.4rem] border border-white/10 bg-slate-950/20 p-4 shadow-[0_24px_80px_rgba(2,12,27,0.28)] backdrop-blur-2xl lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="mb-4 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.28em] text-slate-400">
          <span>Training Telemetry</span>
          <span className="text-sky-200/80">{snapshot.phase}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[0.7rem]">
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-slate-500">Loss</div>
            <div className="mt-1 font-mono text-emerald-200">{snapshot.loss}</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-slate-500">Val Acc</div>
            <div className="mt-1 font-mono text-cyan-200">{snapshot.valAccuracy}</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-slate-500">GPU Util</div>
            <div className="mt-1 font-mono text-sky-100">{snapshot.gpu}</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-slate-500">Throughput</div>
            <div className="mt-1 font-mono text-violet-200">{snapshot.throughput}</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-slate-500">LR</div>
            <div className="mt-1 font-mono text-amber-200">{snapshot.learningRate}</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
            <div className="text-slate-500">Queue</div>
            <div className="mt-1 font-mono text-slate-100">{snapshot.queueDepth}</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[11%] hidden -translate-x-1/2 rounded-full border border-sky-200/10 bg-slate-950/25 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-slate-300 shadow-[0_16px_60px_rgba(2,12,27,0.2)] backdrop-blur-xl md:flex"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="mr-3 text-emerald-300/85">ml pipeline</span>
        <span className="text-slate-400">augmentation</span>
        <span className="mx-3 text-slate-600">/</span>
        <span className="text-slate-400">backprop</span>
        <span className="mx-3 text-slate-600">/</span>
        <span className="text-slate-400">checkpointing</span>
      </motion.div>
    </>
  );
});

const NeuralScene = memo(function NeuralScene({ smoothProgress }: { smoothProgress: MotionValue<number> }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    node.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const px = (Math.random() - 0.5) * PARTICLE_BOUNDS.x * 2;
      const py = (Math.random() - 0.5) * PARTICLE_BOUNDS.y * 2;
      const pz = (Math.random() - 0.5) * PARTICLE_BOUNDS.z * 2;
      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      basePositions[i * 3] = px;
      basePositions[i * 3 + 1] = py;
      basePositions[i * 3 + 2] = pz;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * PARTICLE_DRIFT,
          (Math.random() - 0.5) * PARTICLE_DRIFT,
          (Math.random() - 0.5) * PARTICLE_DRIFT,
        ),
      );
    }
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', positionAttribute);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4d9fff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_LINE_FLOATS);
    const linePositionAttribute = new THREE.BufferAttribute(linePositions, 3);
    linePositionAttribute.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute('position', linePositionAttribute);
    lineGeometry.setDrawRange(0, 0);

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    const material = new THREE.PointsMaterial({
      color: 0x1a6bff,
      size: 2.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let reqId: number;
    const positionsArray = geometry.attributes.position.array as Float32Array;
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      mouse.lerp(targetMouse, 0.1);
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, mouseWorld);

      scene.rotation.y += 0.0005;
      scene.rotation.x += 0.0002;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idxX = i * 3;
        const idxY = i * 3 + 1;
        const idxZ = i * 3 + 2;

        basePositions[idxX] += velocities[i].x;
        basePositions[idxY] += velocities[i].y;
        basePositions[idxZ] += velocities[i].z;

        if (Math.abs(basePositions[idxX]) > PARTICLE_BOUNDS.x) velocities[i].x *= -1;
        if (Math.abs(basePositions[idxY]) > PARTICLE_BOUNDS.y) velocities[i].y *= -1;
        if (Math.abs(basePositions[idxZ]) > PARTICLE_BOUNDS.z) velocities[i].z *= -1;

        positionsArray[idxX] = basePositions[idxX];
        positionsArray[idxY] = basePositions[idxY];
        positionsArray[idxZ] = basePositions[idxZ];

        const dx = positionsArray[idxX] - mouseWorld.x;
        const dy = positionsArray[idxY] - mouseWorld.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_MOUSE_INFLUENCE && distance > 0) {
          const force = (MAX_MOUSE_INFLUENCE - distance) / MAX_MOUSE_INFLUENCE;
          positionsArray[idxX] += (dx / distance) * force * 40;
          positionsArray[idxY] += (dy / distance) * force * 40;
        }
      }
      positionAttribute.needsUpdate = true;

      let vertexpos = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = positionsArray[i * 3] - positionsArray[j * 3];
          const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
          const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < MAX_CONNECTION_DISTANCE_SQ) {
            linePositions[vertexpos++] = positionsArray[i * 3];
            linePositions[vertexpos++] = positionsArray[i * 3 + 1];
            linePositions[vertexpos++] = positionsArray[i * 3 + 2];

            linePositions[vertexpos++] = positionsArray[j * 3];
            linePositions[vertexpos++] = positionsArray[j * 3 + 1];
            linePositions[vertexpos++] = positionsArray[j * 3 + 2];
          }
        }
      }
      lineGeometry.setDrawRange(0, vertexpos / 3);
      linePositionAttribute.needsUpdate = true;

      const p = smoothProgress.get() || 0;
      camera.position.z = 250 - p * 80;
      camera.position.y = -(p * 150);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (renderer.domElement.parentNode === node) {
        node.removeChild(renderer.domElement);
      }
      geometry.dispose();
      lineGeometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [smoothProgress]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
});

// ─── Main export ──────────────────────────────────────────────────────────────

export function AnimatedBackground() {
  const { progress, activeIndex } = useScrollState();
  const scrollMotion = useMotionValue(0);
  const smoothProgress = useSpring(scrollMotion, SPRING_SCROLL);

  useEffect(() => {
    scrollMotion.set(progress);
  }, [progress, scrollMotion]);

  const hazeOpacity = useTransform(smoothProgress, [0, 0.55, 1], [0.18, 0.28, 0.36]);
  const ringScale = useTransform(smoothProgress, [0, 1], [0.88, 1.16]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#030812]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,146,196,0.24),transparent_36%),linear-gradient(160deg,#071120_0%,#030812_45%,#08111d_100%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(220,235,248,0.17)_1px,transparent_1px),linear-gradient(90deg,rgba(164,184,204,0.12)_1px,transparent_1px)] [background-size:92px_92px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(1,6,11,0.28)_44%,rgba(1,6,11,0.62)_100%)]" />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/10 will-change-transform"
        style={{ scale: ringScale }}
      >
        <div className="absolute inset-[9%]  rounded-full border border-sky-100/10" />
        <div className="absolute inset-[19%] rounded-full border border-blue-200/10" />
        <div className="absolute inset-[31%] rounded-full border border-slate-200/10" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[56%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(80,175,255,0.28),rgba(80,175,255,0)_65%)] blur-3xl will-change-[opacity]"
        style={{ opacity: hazeOpacity }}
      />

      <NeuralScene smoothProgress={smoothProgress} />
      <TrainingConsole />

      <motion.div
        className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,236,248,0.18),rgba(220,236,248,0)_72%)] blur-3xl"
        animate={ORB_ANIMATION}
        transition={ORB_TRANSITION}
      />

      <motion.div
        className="absolute bottom-[14%] left-[10%] h-px w-[20rem] bg-gradient-to-r from-transparent via-sky-200/45 to-transparent"
        animate={SCAN_LINE_ANIMATION}
        transition={SCAN_LINE_TRANSITION}
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{ backgroundImage: NOISE_SVG }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(2,8,18,0.78)_100%)]" />

      <div className="pointer-events-auto">
        <HUD progress={progress} activeIndex={activeIndex} />
      </div>
    </div>
  );
}
