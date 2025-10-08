'use client';

import React from 'react';

export function CosmicParticles() {
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
          background: rgba(255, 255, 255, 0.6);
          borderRadius: 50%;
          animation: particleFloat linear infinite, particleTwinkle ease-in-out infinite;
        }

        /* Particle depth layers with different opacities */
        .particle-layer-far .particle {
          opacity: 0.2;
        }

        .particle-layer-mid .particle {
          opacity: 0.35;
        }

        .particle-layer-near .particle {
          opacity: 0.5;
        }

        /* Brand accent particles */
        .particle-accent {
          background: rgba(218, 14, 41, 0.4);
          opacity: 0.3;
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
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`far-${i}`}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '1px',
                height: '1px',
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>

        {/* Particle layer 2 - Mid (medium size and brightness) */}
        <div className="particle-layer particle-layer-mid">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`mid-${i}`}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '1.5px',
                height: '1.5px',
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Particle layer 3 - Near (largest, brightest) */}
        <div className="particle-layer particle-layer-near">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`near-${i}`}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle brand accent particles */}
        <div className="particle-layer particle-layer-accent">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`accent-${i}`}
              className="particle particle-accent"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                width: '1.5px',
                height: '1.5px',
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${12 + Math.random() * 6}s`,
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
