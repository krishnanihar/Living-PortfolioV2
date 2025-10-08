'use client';

import React, { useMemo } from 'react';

export function CosmicParticles() {
  // Generate stable particle positions once on mount
  const particlePositions = useMemo(() => {
    const farParticles = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 20 + Math.random() * 15,
    }));

    const midParticles = Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 10,
    }));

    const nearParticles = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 8,
    }));

    const accentParticles = Array.from({ length: 3 }, () => ({
      left: 20 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 6,
    }));

    return { farParticles, midParticles, nearParticles, accentParticles };
  }, []);

  return (
    <>
      <style jsx>{`
        /* Particle system styles */
        .particle-layer {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
          animation: particleFloat linear infinite, particleTwinkle ease-in-out infinite;
        }

        /* Particle depth layers with different opacities - increased for visibility */
        .particle-layer-far .particle {
          opacity: 0.3;
        }

        .particle-layer-mid .particle {
          opacity: 0.5;
        }

        .particle-layer-near .particle {
          opacity: 0.7;
        }

        /* Brand accent particles - more visible */
        .particle-accent {
          background: rgba(218, 14, 41, 0.6);
          opacity: 0.5;
          box-shadow: 0 0 4px rgba(218, 14, 41, 0.4);
        }

        /* Particle animations */
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -15px);
          }
          50% {
            transform: translate(-8px, -30px);
          }
          75% {
            transform: translate(-15px, -15px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes particleTwinkle {
          0%, 100% {
            opacity: inherit;
          }
          50% {
            opacity: calc(var(--particle-opacity, 0.5) * 0.3);
          }
        }

        /* Accessibility - reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: particleTwinkle 4s ease-in-out infinite;
          }
          @keyframes particleFloat {
            0%, 100% {
              transform: translate(0, 0);
            }
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .particle-layer-far {
            display: none;
          }
          .particle-layer-mid .particle:nth-child(n+15) {
            display: none;
          }
          .particle-layer-near .particle:nth-child(n+10) {
            display: none;
          }
        }
      `}</style>

      {/* Fixed cosmic particle background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Particle layer 1 - Far (smallest, dimmest) */}
        <div className="particle-layer particle-layer-far">
          {particlePositions.farParticles.map((particle, i) => (
            <div
              key={`far-${i}`}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: '1px',
                height: '1px',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Particle layer 2 - Mid (medium size and brightness) */}
        <div className="particle-layer particle-layer-mid">
          {particlePositions.midParticles.map((particle, i) => (
            <div
              key={`mid-${i}`}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: '1.5px',
                height: '1.5px',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Particle layer 3 - Near (largest, brightest) */}
        <div className="particle-layer particle-layer-near">
          {particlePositions.nearParticles.map((particle, i) => (
            <div
              key={`near-${i}`}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: '2px',
                height: '2px',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle brand accent particles */}
        <div className="particle-layer particle-layer-accent">
          {particlePositions.accentParticles.map((particle, i) => (
            <div
              key={`accent-${i}`}
              className="particle particle-accent"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: '1.5px',
                height: '1.5px',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle grid pattern - reduced opacity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.15,
        }} />
      </div>
    </>
  );
}
