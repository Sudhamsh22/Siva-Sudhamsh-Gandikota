/**
 * RobotFigure — cinematic blue-silver mecha portrait
 *
 * Drop-in replacement for the RobotFigure component in AnimatedBackground.tsx.
 * All gradient/filter IDs are namespaced with "rf-" to avoid SVG <defs> collisions
 * with any other SVG on the page.
 *
 * Usage:
 *   import { RobotFigure } from './RobotFigure';
 *   // or just paste the component into AnimatedBackground.tsx replacing the existing one.
 */

import { memo } from 'react';

export const RobotFigure = memo(function RobotFigure() {
  return (
    <svg
      viewBox="0 0 680 780"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Metal shell — light top-left to deep bottom-right */}
        <linearGradient id="rf-faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#e8f4ff" />
          <stop offset="22%"  stopColor="#c2d8ee" />
          <stop offset="52%"  stopColor="#7a9ab6" />
          <stop offset="78%"  stopColor="#4a6880" />
          <stop offset="100%" stopColor="#d8eaf8" />
        </linearGradient>

        {/* Dark inner recess */}
        <linearGradient id="rf-innerFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#1e3348" />
          <stop offset="100%" stopColor="#0a1824" />
        </linearGradient>

        {/* Eye iris — cool white core to deep blue rim */}
        <radialGradient id="rf-eyeGlow" cx="50%" cy="38%" r="55%">
          <stop offset="0%"   stopColor="#dff8ff" stopOpacity="1"   />
          <stop offset="30%"  stopColor="#72d4ff" stopOpacity="0.95"/>
          <stop offset="70%"  stopColor="#1a8fe0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0d4a90" stopOpacity="0.6" />
        </radialGradient>

        {/* Eye socket depth */}
        <radialGradient id="rf-socketGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#061428" />
          <stop offset="100%" stopColor="#020810" />
        </radialGradient>

        {/* Neck/collar */}
        <linearGradient id="rf-collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#5d7e9a" />
          <stop offset="50%"  stopColor="#3a5570" />
          <stop offset="100%" stopColor="#1e3448" />
        </linearGradient>

        {/* Mouth grill */}
        <linearGradient id="rf-grillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#0a2035" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020c18" stopOpacity="1"   />
        </linearGradient>

        {/* Status LED */}
        <radialGradient id="rf-ledGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#a8f0ff" />
          <stop offset="60%"  stopColor="#4cc8f4" />
          <stop offset="100%" stopColor="#1a80c0" stopOpacity="0" />
        </radialGradient>

        {/* Crown rim highlight */}
        <linearGradient id="rf-rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#b8d4ea" stopOpacity="0"   />
          <stop offset="28%"  stopColor="#e8f6ff" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.95"/>
          <stop offset="72%"  stopColor="#e8f6ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b8d4ea" stopOpacity="0"   />
        </linearGradient>

        {/* Panel seam */}
        <linearGradient id="rf-seamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#9bb8d0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4a6070" stopOpacity="0.2" />
        </linearGradient>

        {/* Eye bloom — soft glow emanating from iris */}
        <filter id="rf-eyeBloom" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Neck / collar ─────────────────────────────────────────────────────── */}
      <rect x="278" y="530" width="124" height="28" rx="6"  fill="url(#rf-collarGrad)" />
      <rect x="265" y="552" width="150" height="36" rx="10" fill="url(#rf-collarGrad)" />
      <rect x="285" y="558" width="130" height="2" rx="1" fill="#8ab0cc" opacity="0.4" />
      <rect x="293" y="564" width="114" height="2" rx="1" fill="#6a90ac" opacity="0.3" />
      <circle cx="295" cy="567" r="4" fill="#2a4860" stroke="#7aaac8" strokeWidth="0.8" />
      <circle cx="385" cy="567" r="4" fill="#2a4860" stroke="#7aaac8" strokeWidth="0.8" />

      {/* ── Skull shell ───────────────────────────────────────────────────────── */}
      {/* Shadow depth */}
      <path
        d="M202 145 Q202 82 340 72 Q478 82 478 145 L488 462 Q488 518 340 528 Q192 518 192 462 Z"
        fill="#0a1a2c"
        opacity="0.6"
      />
      {/* Main face plate */}
      <path
        d="M198 142 Q198 78 340 68 Q482 78 482 142 L491 460 Q491 516 340 526 Q189 516 189 460 Z"
        fill="url(#rf-faceGrad)"
      />
      {/* Cranium highlight */}
      <ellipse cx="340" cy="108" rx="118" ry="40" fill="url(#rf-rimGrad)" opacity="0.55" />
      {/* Inner recess */}
      <path
        d="M220 186 Q220 158 340 152 Q460 158 460 186 L466 450 Q466 490 340 496 Q214 490 214 450 Z"
        fill="url(#rf-innerFaceGrad)"
        opacity="0.96"
      />

      {/* ── Forehead panel ────────────────────────────────────────────────────── */}
      <rect x="290" y="80"  width="100" height="8" rx="4" fill="#4a6a88" opacity="0.7"  />
      <rect x="310" y="80"  width="60"  height="8" rx="4" fill="#8abcd8" opacity="0.45" />
      <circle cx="320" cy="100" r="4" fill="url(#rf-ledGlow)" filter="url(#rf-eyeBloom)" opacity="0.9"  />
      <circle cx="340" cy="95"  r="4" fill="url(#rf-ledGlow)" filter="url(#rf-eyeBloom)" opacity="0.95" />
      <circle cx="360" cy="100" r="4" fill="url(#rf-ledGlow)" filter="url(#rf-eyeBloom)" opacity="0.9"  />

      {/* ── Side panel seams ──────────────────────────────────────────────────── */}
      <path d="M198 200 L218 200 L218 420 L198 400" fill="none" stroke="url(#rf-seamGrad)" strokeWidth="0.8" opacity="0.6" />
      <path d="M198 260 L220 268" fill="none" stroke="#7aaac8" strokeWidth="0.6" opacity="0.5" />
      <path d="M198 320 L220 326" fill="none" stroke="#7aaac8" strokeWidth="0.6" opacity="0.5" />
      <path d="M198 380 L220 384" fill="none" stroke="#7aaac8" strokeWidth="0.6" opacity="0.5" />
      <path d="M482 200 L462 200 L462 420 L482 400" fill="none" stroke="url(#rf-seamGrad)" strokeWidth="0.8" opacity="0.6" />
      <path d="M482 260 L460 268" fill="none" stroke="#7aaac8" strokeWidth="0.6" opacity="0.5" />
      <path d="M482 320 L460 326" fill="none" stroke="#7aaac8" strokeWidth="0.6" opacity="0.5" />
      <path d="M482 380 L460 384" fill="none" stroke="#7aaac8" strokeWidth="0.6" opacity="0.5" />

      {/* ── Brow ridge ────────────────────────────────────────────────────────── */}
      <path
        d="M228 194 Q270 176 340 174 Q410 176 452 194 L456 208 Q414 196 340 194 Q266 196 224 208 Z"
        fill="#5a7a98"
        opacity="0.55"
      />
      <path
        d="M236 196 Q340 182 444 196"
        fill="none"
        stroke="#b8d8f0"
        strokeWidth="1.2"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* ── Eye sockets ───────────────────────────────────────────────────────── */}
      <ellipse cx="283" cy="268" rx="46" ry="38" fill="url(#rf-socketGrad)" />
      <ellipse cx="283" cy="268" rx="46" ry="38" fill="none" stroke="#2a4a68" strokeWidth="1.2" />
      <ellipse cx="397" cy="268" rx="46" ry="38" fill="url(#rf-socketGrad)" />
      <ellipse cx="397" cy="268" rx="46" ry="38" fill="none" stroke="#2a4a68" strokeWidth="1.2" />

      {/* ── Left eye ──────────────────────────────────────────────────────────── */}
      <ellipse cx="283" cy="266" rx="38" ry="30" fill="#1a6aaa" opacity="0.35" filter="url(#rf-eyeBloom)" />
      <ellipse cx="283" cy="266" rx="32" ry="26" fill="url(#rf-eyeGlow)" filter="url(#rf-eyeBloom)" />
      <ellipse cx="283" cy="266" rx="18" ry="15" fill="none" stroke="#72d4ff" strokeWidth="1.2" opacity="0.8" />
      <ellipse cx="283" cy="266" rx="8"  ry="14" fill="#031020" opacity="0.9" />
      <ellipse cx="283" cy="266" rx="8"  ry="14" fill="none" stroke="#4abcf0" strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="276" cy="259" rx="5"  ry="3.5" fill="white" opacity="0.65" transform="rotate(-20 276 259)" />

      {/* ── Right eye ─────────────────────────────────────────────────────────── */}
      <ellipse cx="397" cy="266" rx="38" ry="30" fill="#1a6aaa" opacity="0.35" filter="url(#rf-eyeBloom)" />
      <ellipse cx="397" cy="266" rx="32" ry="26" fill="url(#rf-eyeGlow)" filter="url(#rf-eyeBloom)" />
      <ellipse cx="397" cy="266" rx="18" ry="15" fill="none" stroke="#72d4ff" strokeWidth="1.2" opacity="0.8" />
      <ellipse cx="397" cy="266" rx="8"  ry="14" fill="#031020" opacity="0.9" />
      <ellipse cx="397" cy="266" rx="8"  ry="14" fill="none" stroke="#4abcf0" strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="390" cy="259" rx="5"  ry="3.5" fill="white" opacity="0.65" transform="rotate(-20 390 259)" />

      {/* ── Nose bridge ───────────────────────────────────────────────────────── */}
      <rect x="326" y="294" width="28" height="60" rx="6" fill="#1a3050" opacity="0.8" />
      <rect x="330" y="298" width="20" height="4"  rx="2" fill="#5a9ac8" opacity="0.5" />
      <rect x="333" y="308" width="14" height="36" rx="2" fill="#0a1e32" opacity="0.9" />
      <rect x="336" y="312" width="8"  height="6"  rx="1" fill="url(#rf-ledGlow)" opacity="0.7" />
      <rect x="336" y="322" width="8"  height="6"  rx="1" fill="url(#rf-ledGlow)" opacity="0.5" />
      <rect x="336" y="332" width="8"  height="6"  rx="1" fill="url(#rf-ledGlow)" opacity="0.3" />

      {/* ── Cheek panels ──────────────────────────────────────────────────────── */}
      <path d="M228 310 Q238 300 260 300 L268 340 Q256 348 238 346 Z" fill="#1a3450" opacity="0.6" />
      <path d="M232 314 Q242 305 262 306" fill="none" stroke="#5a8aac" strokeWidth="0.7" opacity="0.6" />
      <path d="M234 326 Q244 318 264 320" fill="none" stroke="#5a8aac" strokeWidth="0.7" opacity="0.4" />
      <path d="M452 310 Q442 300 420 300 L412 340 Q424 348 442 346 Z" fill="#1a3450" opacity="0.6" />
      <path d="M448 314 Q438 305 418 306" fill="none" stroke="#5a8aac" strokeWidth="0.7" opacity="0.6" />
      <path d="M446 326 Q436 318 416 320" fill="none" stroke="#5a8aac" strokeWidth="0.7" opacity="0.4" />

      {/* ── Mouth / speaker grill ─────────────────────────────────────────────── */}
      <rect x="256" y="390" width="168" height="68" rx="12" fill="url(#rf-grillGrad)" />
      <rect x="256" y="390" width="168" height="68" rx="12" fill="none" stroke="#2a4a68" strokeWidth="0.8" />
      {/* Grill slots */}
      <rect x="272" y="402" width="136" height="5" rx="2.5" fill="#1a6090" opacity="0.35" />
      <rect x="272" y="412" width="136" height="5" rx="2.5" fill="#1a6090" opacity="0.35" />
      <rect x="272" y="422" width="136" height="5" rx="2.5" fill="#1a6090" opacity="0.35" />
      <rect x="272" y="432" width="136" height="5" rx="2.5" fill="#1a6090" opacity="0.35" />
      <rect x="272" y="442" width="136" height="5" rx="2.5" fill="#1a6090" opacity="0.35" />
      {/* Active voice indicator highlights */}
      <rect x="294" y="412" width="42" height="5" rx="2.5" fill="#4abcf0" opacity="0.55" />
      <rect x="308" y="422" width="64" height="5" rx="2.5" fill="#4abcf0" opacity="0.65" />
      <rect x="298" y="432" width="52" height="5" rx="2.5" fill="#4abcf0" opacity="0.45" />
      {/* Corner bolts */}
      <circle cx="268" cy="398" r="3" fill="#0e2438" stroke="#4a7aaa" strokeWidth="0.6" />
      <circle cx="412" cy="398" r="3" fill="#0e2438" stroke="#4a7aaa" strokeWidth="0.6" />
      <circle cx="268" cy="452" r="3" fill="#0e2438" stroke="#4a7aaa" strokeWidth="0.6" />
      <circle cx="412" cy="452" r="3" fill="#0e2438" stroke="#4a7aaa" strokeWidth="0.6" />

      {/* ── Outer shell edge highlights ───────────────────────────────────────── */}
      <path d="M196 145 Q194 80 340 70" fill="none" stroke="#d8eeff" strokeWidth="1.4" opacity="0.4" strokeLinecap="round" />
      <path d="M484 145 Q486 80 340 70" fill="none" stroke="#d8eeff" strokeWidth="1.4" opacity="0.4" strokeLinecap="round" />
      <path d="M294 72 Q340 64 386 72"  fill="none" stroke="#ffffff" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />

      {/* ── Temple / ear modules ──────────────────────────────────────────────── */}
      {/* Left ear */}
      <rect x="154" y="240" width="42" height="110" rx="12" fill="url(#rf-collarGrad)" opacity="0.9" />
      <rect x="156" y="244" width="38" height="102" rx="10" fill="#0e1e30" opacity="0.8" />
      <rect x="160" y="254" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.6" />
      <rect x="160" y="262" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.4" />
      <rect x="160" y="270" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.3" />
      <circle cx="175" cy="290" r="10" fill="#061428" stroke="#3a6a8a" strokeWidth="0.8" />
      <circle cx="175" cy="290" r="6"  fill="url(#rf-ledGlow)" opacity="0.8" filter="url(#rf-eyeBloom)" />
      <rect x="160" y="318" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.3" />
      <rect x="160" y="326" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.4" />
      <rect x="160" y="334" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.25" />
      <rect x="190" y="252" width="10" height="86" rx="4" fill="#3a5a7a" opacity="0.6" />

      {/* Right ear */}
      <rect x="484" y="240" width="42" height="110" rx="12" fill="url(#rf-collarGrad)" opacity="0.9" />
      <rect x="486" y="244" width="38" height="102" rx="10" fill="#0e1e30" opacity="0.8" />
      <rect x="490" y="254" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.6" />
      <rect x="490" y="262" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.4" />
      <rect x="490" y="270" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.3" />
      <circle cx="505" cy="290" r="10" fill="#061428" stroke="#3a6a8a" strokeWidth="0.8" />
      <circle cx="505" cy="290" r="6"  fill="url(#rf-ledGlow)" opacity="0.8" filter="url(#rf-eyeBloom)" />
      <rect x="490" y="318" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.3" />
      <rect x="490" y="326" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.4" />
      <rect x="490" y="334" width="30" height="4" rx="2" fill="#4a7a9a" opacity="0.25" />
      <rect x="480" y="252" width="10" height="86" rx="4" fill="#3a5a7a" opacity="0.6" />

      {/* ── Sub-chin ──────────────────────────────────────────────────────────── */}
      <path d="M264 520 Q340 532 416 520 L416 530 Q340 544 264 530 Z" fill="#4a6a88" opacity="0.4" />
      <path d="M280 524 Q340 534 400 524" fill="none" stroke="#8ab8d8" strokeWidth="0.8" opacity="0.5" />

      {/* ── HUD scan line ─────────────────────────────────────────────────────── */}
      <path d="M222 360 L458 360" fill="none" stroke="#4abcf0" strokeWidth="0.5" opacity="0.18" strokeDasharray="4 6" />
    </svg>
  );
});
