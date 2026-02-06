'use client';

import { useEffect, useState } from 'react';

/**
 * AmbientHeroBackground - Replaces GPGPU particle system
 *
 * Three-layer composition:
 * 1. Warm radial gradients with CSS @property animation (terracotta glow)
 * 2. SVG feTurbulence grain texture overlay (editorial film grain)
 * 3. Single floating blur orb (subtle movement)
 *
 * Performance: Pure CSS + inline SVG. Zero JS libraries, zero canvas,
 * zero Three.js. GPU-composited transforms and opacity only.
 */
export default function AmbientHeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="ambient-hero-bg"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Layer 1: Ambient warm glow — CSS radial gradients */}
      <div
        className="ambient-glow"
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Layer 2: Film grain texture — SVG feTurbulence */}
      <div
        className="ambient-grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0 }}
        >
          <filter id="hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#hero-grain)"
          />
        </svg>
      </div>

      {/* Layer 3: Floating orb — single terracotta-tinted blur */}
      <div
        className="ambient-orb ambient-orb-1"
        style={{
          position: 'absolute',
          width: 'clamp(400px, 50vw, 700px)',
          height: 'clamp(400px, 50vw, 700px)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.12,
          mixBlendMode: 'screen',
          top: '15%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Secondary accent orb — cooler sienna, offset */}
      <div
        className="ambient-orb ambient-orb-2"
        style={{
          position: 'absolute',
          width: 'clamp(300px, 35vw, 500px)',
          height: 'clamp(300px, 35vw, 500px)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.08,
          mixBlendMode: 'screen',
          bottom: '10%',
          left: '25%',
          transform: 'translate(-50%, 50%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
