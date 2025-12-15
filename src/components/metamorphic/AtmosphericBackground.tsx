'use client';

import React from 'react';
import { useMetamorphic } from './MetamorphicContext';
import { ConsciousnessParticles } from './ConsciousnessParticles';

/**
 * AtmosphericBackground - Dynamic Scroll-Responsive Backdrop
 *
 * Creates a multi-layered atmospheric background that:
 * - Transitions colors based on narrative act (purple → magenta → cyan)
 * - Includes floating consciousness particles
 * - Provides subtle noise texture overlay
 * - Responds to reduced motion preferences
 */

interface AtmosphericBackgroundProps {
  /** Show/hide particles (default: true) */
  showParticles?: boolean;
  /** Show/hide noise texture (default: true) */
  showNoise?: boolean;
  /** Custom z-index (default: 0) */
  zIndex?: number;
}

export function AtmosphericBackground({
  showParticles = true,
  showNoise = true,
  zIndex = 0,
}: AtmosphericBackgroundProps) {
  const { atmosphereColor, currentAct, prefersReducedMotion } = useMetamorphic();

  return (
    <div
      className="atmospheric-background"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Layer 1: Base gradient (top glow) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(${atmosphereColor.primary}, 0.12) 0%, transparent 60%)`,
          transition: 'background 1.5s ease-out',
        }}
      />

      {/* Layer 2: Secondary gradient (bottom accent) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 40% at 50% 110%, rgba(${atmosphereColor.secondary}, 0.08) 0%, transparent 50%)`,
          transition: 'background 1.5s ease-out',
        }}
      />

      {/* Layer 3: Conic gradient (psychedelic swirl) - Only in Act II */}
      {currentAct === 2 && !prefersReducedMotion && (
        <div
          style={{
            position: 'absolute',
            inset: '-50%',
            background: `conic-gradient(from ${Date.now() / 100 % 360}deg at 50% 50%,
              rgba(${atmosphereColor.primary}, 0.03) 0deg,
              transparent 60deg,
              rgba(${atmosphereColor.secondary}, 0.03) 120deg,
              transparent 180deg,
              rgba(${atmosphereColor.primary}, 0.03) 240deg,
              transparent 300deg,
              rgba(${atmosphereColor.secondary}, 0.03) 360deg
            )`,
            filter: 'blur(100px)',
            animation: prefersReducedMotion ? 'none' : 'atmospheric-rotate 60s linear infinite',
            transition: 'opacity 2s ease-out',
          }}
        />
      )}

      {/* Layer 4: Side vignettes */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, transparent 15%, transparent 85%, rgba(0, 0, 0, 0.3) 100%),
            linear-gradient(180deg, transparent 0%, transparent 85%, rgba(0, 0, 0, 0.2) 100%)
          `,
        }}
      />

      {/* Layer 5: Floating particles */}
      {showParticles && <ConsciousnessParticles />}

      {/* Layer 6: Subtle noise texture */}
      {showNoise && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes atmospheric-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AtmosphericBackground;
