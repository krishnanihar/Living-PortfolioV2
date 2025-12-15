'use client';

import React, { useMemo } from 'react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * ConsciousnessParticles - Ambient Floating Orbs
 *
 * Creates a dreamy atmosphere with floating particles that:
 * - Change color based on narrative act (purple → magenta → cyan)
 * - Move in slow orbital patterns
 * - Respond to reduced motion preferences
 */

interface ParticleConfig {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Generate static particle configurations (SSR-safe)
const PARTICLE_CONFIGS: ParticleConfig[] = [
  { id: 0, size: 400, x: 10, y: 15, duration: 25, delay: 0, opacity: 0.15 },
  { id: 1, size: 350, x: 85, y: 25, duration: 30, delay: -8, opacity: 0.12 },
  { id: 2, size: 300, x: 50, y: 60, duration: 28, delay: -4, opacity: 0.18 },
  { id: 3, size: 250, x: 25, y: 80, duration: 22, delay: -12, opacity: 0.14 },
  { id: 4, size: 380, x: 75, y: 70, duration: 32, delay: -6, opacity: 0.16 },
  { id: 5, size: 320, x: 40, y: 35, duration: 26, delay: -10, opacity: 0.13 },
  { id: 6, size: 280, x: 90, y: 50, duration: 24, delay: -2, opacity: 0.15 },
  { id: 7, size: 360, x: 15, y: 45, duration: 29, delay: -14, opacity: 0.11 },
];

interface ConsciousnessParticlesProps {
  /** Override the atmosphere color (RGB string: "147, 51, 234") */
  colorOverride?: string;
  /** Number of particles to render (default: 8) */
  count?: number;
  /** Base opacity multiplier (default: 1) */
  opacityMultiplier?: number;
}

export function ConsciousnessParticles({
  colorOverride,
  count = 8,
  opacityMultiplier = 1,
}: ConsciousnessParticlesProps) {
  const { atmosphereColor, prefersReducedMotion, isMobile } = useMetamorphic();

  // Use override color or context color
  const particleColor = colorOverride || atmosphereColor.primary;

  // Select particles to render
  const particles = useMemo(() => {
    return PARTICLE_CONFIGS.slice(0, Math.min(count, PARTICLE_CONFIGS.length));
  }, [count]);

  // Reduce particles on mobile for performance
  const displayParticles = isMobile ? particles.slice(0, 4) : particles;

  // If reduced motion, show static particles
  if (prefersReducedMotion) {
    return (
      <div className="consciousness-particles-static">
        {displayParticles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, rgba(${particleColor}, ${particle.opacity * opacityMultiplier}), transparent)`,
              filter: `blur(${particle.size * 0.2}px)`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes consciousness-float-0 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          25% { transform: translate(-50%, -50%) translate(40px, -60px) scale(1.05); }
          50% { transform: translate(-50%, -50%) translate(-30px, 40px) scale(0.95); }
          75% { transform: translate(-50%, -50%) translate(20px, -30px) scale(1.02); }
        }
        @keyframes consciousness-float-1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          33% { transform: translate(-50%, -50%) translate(-50px, 30px) scale(1.08); }
          66% { transform: translate(-50%, -50%) translate(35px, -45px) scale(0.92); }
        }
        @keyframes consciousness-float-2 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          20% { transform: translate(-50%, -50%) translate(25px, 50px) scale(0.98); }
          40% { transform: translate(-50%, -50%) translate(-40px, -20px) scale(1.06); }
          60% { transform: translate(-50%, -50%) translate(30px, -40px) scale(0.94); }
          80% { transform: translate(-50%, -50%) translate(-20px, 30px) scale(1.03); }
        }
        @keyframes consciousness-float-3 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          50% { transform: translate(-50%, -50%) translate(-35px, -55px) scale(1.1); }
        }
        @keyframes consciousness-pulse {
          0%, 100% { opacity: var(--base-opacity); }
          50% { opacity: calc(var(--base-opacity) * 1.3); }
        }
        .consciousness-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
        }
      `}</style>

      <div className="consciousness-particles">
        {displayParticles.map((particle, index) => {
          const animationIndex = index % 4;
          const baseOpacity = particle.opacity * opacityMultiplier;

          return (
            <div
              key={particle.id}
              className="consciousness-particle"
              style={{
                '--base-opacity': baseOpacity,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle at 30% 30%, rgba(${particleColor}, ${baseOpacity}), transparent 70%)`,
                filter: `blur(${particle.size * 0.15}px)`,
                animation: `consciousness-float-${animationIndex} ${particle.duration}s ease-in-out infinite, consciousness-pulse ${particle.duration * 0.4}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s, ${particle.delay * 0.5}s`,
                transition: 'background 1s ease-out',
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </>
  );
}

export default ConsciousnessParticles;
