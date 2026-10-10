'use client';

import { memo, useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import * as THREE from 'three';

// ─── Configuration ────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS: readonly string[] = SECTIONS.map((section) => section.id);

const SCROLL_SPRING = { stiffness: 90, damping: 28, mass: 0.3 } as const;

const FIELD = {
  count: 65,
  countCompact: 35,
  bounds: [340, 220, 160] as [number, number, number],
  drift: 0.16,
  linkDistance: 130,
  cameraZ: 280,
  maxPixelRatio: 1.5,
  accent: 0x38bdf8, // vibrant sky-400
} as const;

// ─── Hook: active section ─────────────────────────────────────────────────────

function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────

const ScrollProgress = memo(function ScrollProgress({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
      style={{ scaleX: progress }}
    />
  );
});

// ─── Section navigation (desktop XL only) ─────────────────────────────────────

const SectionNav = memo(function SectionNav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-3.5">
        {SECTIONS.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? 'location' : undefined}
                className="group flex items-center gap-3 rounded-full py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  className={`text-[0.68rem] font-sans tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'translate-x-0 text-slate-200 opacity-100 font-semibold'
                      : 'translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    isActive
                      ? 'h-2 w-2 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                      : 'h-1.5 w-1.5 bg-slate-600 group-hover:bg-slate-300'
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

// ─── Particle network (three.js with round sprite) ────────────────────────────

function createRenderer(compact: boolean): THREE.WebGLRenderer | null {
  try {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: 'high-performance',
    });
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    return renderer;
  } catch {
    return null;
  }
}

const ParticleField = memo(function ParticleField({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const lowPower = typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    const compact = window.innerWidth < 768 || lowPower;
    const renderer = createRenderer(compact);
    if (!renderer) return undefined;

    const count = compact ? FIELD.countCompact : FIELD.count;
    const linkDistanceSq = FIELD.linkDistance * FIELD.linkDistance;
    const lineColor = new THREE.Color(FIELD.accent);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, FIELD.maxPixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.z = FIELD.cameraZ;

    const field = new THREE.Group();
    scene.add(field);

    // Round sprite texture (eliminates square dots near the camera)
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = dotCanvas.height = 32;
    const dotCtx = dotCanvas.getContext('2d');
    if (dotCtx) {
      dotCtx.beginPath();
      dotCtx.arc(16, 16, 14, 0, Math.PI * 2);
      dotCtx.fillStyle = '#ffffff';
      dotCtx.fill();
    }
    const sprite = new THREE.CanvasTexture(dotCanvas);

    // Particles
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      for (let axis = 0; axis < 3; axis++) {
        positions[i * 3 + axis] = (Math.random() * 2 - 1) * FIELD.bounds[axis];
        velocities[i * 3 + axis] = (Math.random() - 0.5) * FIELD.drift * 2;
      }
    }

    const pointAttribute = new THREE.BufferAttribute(positions, 3);
    pointAttribute.setUsage(THREE.DynamicDrawUsage);
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', pointAttribute);

    const pointMaterial = new THREE.PointsMaterial({
      color: FIELD.accent,
      map: sprite,
      size: 3.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    field.add(new THREE.Points(pointGeometry, pointMaterial));

    // Connecting lines with subtle 0.28 opacity
    const maxVertices = count * (count - 1);
    const linePositions = new Float32Array(maxVertices * 3);
    const lineColors = new Float32Array(maxVertices * 3);

    const linePositionAttribute = new THREE.BufferAttribute(linePositions, 3);
    const lineColorAttribute = new THREE.BufferAttribute(lineColors, 3);
    linePositionAttribute.setUsage(THREE.DynamicDrawUsage);
    lineColorAttribute.setUsage(THREE.DynamicDrawUsage);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', linePositionAttribute);
    lineGeometry.setAttribute('color', lineColorAttribute);
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    field.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const advance = () => {
      for (let i = 0; i < count; i++) {
        for (let axis = 0; axis < 3; axis++) {
          const index = i * 3 + axis;
          positions[index] += velocities[index];
          if (Math.abs(positions[index]) > FIELD.bounds[axis]) {
            velocities[index] *= -1;
          }
        }
      }
      pointAttribute.needsUpdate = true;
    };

    const updateLinks = () => {
      let v = 0;
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        for (let j = i + 1; j < count; j++) {
          const jx = j * 3;
          const dx = positions[ix] - positions[jx];
          const dy = positions[ix + 1] - positions[jx + 1];
          const dz = positions[ix + 2] - positions[jx + 2];
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq >= linkDistanceSq) continue;

          const fade = 1 - Math.sqrt(distSq) / FIELD.linkDistance;
          const r = lineColor.r * fade;
          const g = lineColor.g * fade;
          const b = lineColor.b * fade;

          linePositions[v] = positions[ix];
          linePositions[v + 1] = positions[ix + 1];
          linePositions[v + 2] = positions[ix + 2];
          lineColors[v] = r;
          lineColors[v + 1] = g;
          lineColors[v + 2] = b;
          v += 3;

          linePositions[v] = positions[jx];
          linePositions[v + 1] = positions[jx + 1];
          linePositions[v + 2] = positions[jx + 2];
          lineColors[v] = r;
          lineColors[v + 1] = g;
          lineColors[v + 2] = b;
          v += 3;
        }
      }
      lineGeometry.setDrawRange(0, v / 3);
      linePositionAttribute.needsUpdate = true;
      lineColorAttribute.needsUpdate = true;
    };

    // Parallax tracking
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const renderFrame = () => {
      eased.x += (target.x - eased.x) * 0.04;
      eased.y += (target.y - eased.y) * 0.04;

      const p = progress.get() || 0;
      camera.position.x = eased.x * 12;
      camera.position.y = -p * 70 - eased.y * 10;
      camera.position.z = FIELD.cameraZ - p * 40;

      renderer.render(scene, camera);
    };

    let frameId = 0;
    let running = false;

    const loop = () => {
      frameId = requestAnimationFrame(loop);
      field.rotation.y += 0.0003;
      field.rotation.x += 0.0001;
      advance();
      updateLinks();
      renderFrame();
    };

    const start = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, FIELD.maxPixelRatio));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderFrame();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    start();

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      sprite.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [progress]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-80" />;
});

// ─── Main export ──────────────────────────────────────────────────────────────

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const hazeOpacity = useTransform(progress, [0, 1], [0.18, 0.32]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
      >
        {/* Soft top subtle glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(195_90%_58%/0.14),transparent_60%)]" />

        {/* Ambient floating blur orbs */}
        <div className="absolute -top-32 left-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 -right-24 h-[24rem] w-[24rem] rounded-full bg-cyan-400/8 blur-[110px]" />

        {/* Faint subtle grid, masked toward the edges */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(hsl(var(--foreground)/0.6)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.6)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

        {/* Interactive Three.js dynamic particle constellation with round dots */}
        <ParticleField progress={progress} />

        {/* Dynamic scroll haze */}
        <motion.div
          className="absolute left-1/2 top-[58%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]"
          style={{ opacity: hazeOpacity }}
        />

        {/* Strengthened vignette keeping text readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background)/0.92)_100%)]" />
      </div>

      <ScrollProgress progress={progress} />
      <SectionNav />
    </>
  );
}
