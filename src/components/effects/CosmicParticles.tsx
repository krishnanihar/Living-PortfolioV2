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
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* Particle layer 1 - Far (smallest, dimmest) */}
      <div className="cosmic-particle-layer cosmic-particle-layer-far">
        {particlePositions.farParticles.map((particle, i) => (
          <div
            key={`far-${i}`}
            className="cosmic-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: '1px',
              height: '1px',
              animationDelay: `${particle.delay}s, ${particle.delay * 0.7}s`,
              animationDuration: `${particle.duration}s, ${particle.duration * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Particle layer 2 - Mid (medium size and brightness) */}
      <div className="cosmic-particle-layer cosmic-particle-layer-mid">
        {particlePositions.midParticles.map((particle, i) => (
          <div
            key={`mid-${i}`}
            className="cosmic-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: '1.5px',
              height: '1.5px',
              animationDelay: `${particle.delay}s, ${particle.delay * 0.7}s`,
              animationDuration: `${particle.duration}s, ${particle.duration * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Particle layer 3 - Near (largest, brightest) */}
      <div className="cosmic-particle-layer cosmic-particle-layer-near">
        {particlePositions.nearParticles.map((particle, i) => (
          <div
            key={`near-${i}`}
            className="cosmic-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: '2px',
              height: '2px',
              animationDelay: `${particle.delay}s, ${particle.delay * 0.7}s`,
              animationDuration: `${particle.duration}s, ${particle.duration * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle brand accent particles */}
      <div className="cosmic-particle-layer cosmic-particle-layer-accent">
        {particlePositions.accentParticles.map((particle, i) => (
          <div
            key={`accent-${i}`}
            className="cosmic-particle cosmic-particle-accent"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: '1.5px',
              height: '1.5px',
              animationDelay: `${particle.delay}s, ${particle.delay * 0.7}s`,
              animationDuration: `${particle.duration}s, ${particle.duration * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern - reduced opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.15,
        }}
      />
    </div>
  );
}
