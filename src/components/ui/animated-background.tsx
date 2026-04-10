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
