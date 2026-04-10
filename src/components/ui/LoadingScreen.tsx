'use client';

import { useState, useEffect } from 'react';
import { Orbitron, Share_Tech_Mono } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-orbitron',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-share',
});

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    let audioCtx: AudioContext | null = null;
    try {
      const WebKitAudioContext = (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const AudioCtxClass = window.AudioContext || WebKitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        // Classic sci-fi boot sound curve
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(50, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 1.5);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 2.0);
      }
    } catch {
      // Browser autorefusal guard - fail silently
    }
    
    const timer1 = setTimeout(() => {
      setFaded(true);
    }, 2200);

    const timer2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 3000); // 800ms for fade transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = 'auto';
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-[#020810] transition-opacity duration-800 ${orbitron.variable} ${shareTechMono.variable} ${faded ? 'opacity-0' : 'opacity-100'}`}
    >
      <div 
        className="font-[family-name:var(--font-orbitron)] text-4xl font-black tracking-[8px] text-[#e8f4ff]"
        style={{ textShadow: '0 0 30px rgba(77,159,255,1)' }}
      >
        WELCOME
      </div>
      
      <div className="font-[family-name:var(--font-share)] text-[11px] tracking-[4px] text-[#7aa8d0] animate-[pulse_1s_infinite]">
        INITIALIZING PORTFOLIO SYSTEMS...
      </div>
      
      <div className="relative h-[2px] w-[280px] overflow-hidden bg-[rgba(77,159,255,0.15)]">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0a2a6e] to-[#4d9fff] shadow-[0_0_10px_#4d9fff] animate-[loader-fill_2s_ease-out_forwards]"
        />
      </div>

      <style jsx global>{`
        @keyframes loader-fill {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
