'use client';

import React, { useState, useEffect } from 'react';

export function CosmicBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Stabilize particle positions with deterministic algorithm
  const particlePositions = React.useMemo(() => {
    return {
      far: Array.from({ length: 50 }, (_, i) => {
        const seed = i / 50;
        return {
          left: (seed * 87.3 + 13.7 + i * 4.2) % 100,
          top: (seed * 73.1 + 17.3 + i * 5.7) % 100,
          delay1: (seed * 25.5 + 2.5 + i * 0.6) % 30,
          delay2: (seed * 18.3 + 1.7 + i * 0.4) % 20,
          duration1: 35 + ((seed * 23.7 + i * 0.5) % 25),
          duration2: 15 + ((seed * 9.4 + i * 0.2) % 10),
        };
      }),
      mid: Array.from({ length: 30 }, (_, i) => {
        const seed = i / 30;
        return {
          left: (seed * 91.2 + 8.8 + i * 3.8) % 100,
          top: (seed * 68.4 + 21.6 + i * 4.3) % 100,
          delay1: (seed * 22.1 + 2.9 + i * 0.8) % 25,
          delay2: (seed * 13.7 + 1.3 + i * 0.5) % 15,
          duration1: 28 + ((seed * 17.2 + i * 0.6) % 18),
          duration2: 12 + ((seed * 7.6 + i * 0.3) % 8),
        };
      }),
      near: Array.from({ length: 20 }, (_, i) => {
        const seed = i / 20;
        return {
          left: (seed * 79.6 + 20.4 + i * 5.1) % 100,
          top: (seed * 82.3 + 17.7 + i * 6.2) % 100,
          delay1: (seed * 18.4 + 1.6 + i * 1.0) % 20,
          delay2: (seed * 11.2 + 0.8 + i * 0.6) % 12,
          duration1: 22 + ((seed * 13.3 + i * 0.7) % 14),
          duration2: 10 + ((seed * 5.7 + i * 0.3) % 6),
        };
      }),
      accent: Array.from({ length: 3 }, (_, i) => {
        const seed = i / 3;
        return {
          left: 20 + ((seed * 52.4 + i * 8.3) % 60),
          top: 20 + ((seed * 47.8 + i * 7.6) % 60),
          delay1: (seed * 13.6 + i * 1.5) % 15,
          delay2: (seed * 9.1 + i * 1.1) % 10,
          duration1: 25 + ((seed * 14.2 + i * 0.9) % 15),
          duration2: 12 + ((seed * 7.4 + i * 0.8) % 8),
        };
      }),
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Fixed cosmic background that stays visible */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Particle layer - Far (slowest, smoothest) with mouse attraction */}
        <div className="cosmic-particle-layer cosmic-particle-layer-far">
          {particlePositions.far.map((particle, i) => {
            // Calculate distance from mouse
            const dx = mousePos.x - particle.left;
            const dy = mousePos.y - particle.top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Subtle attraction force
            const maxDistance = 30;
            const force = distance < maxDistance ? 1 - distance / maxDistance : 0;

            // Smooth attraction (max ~12px movement)
            const attractX = dx * force * 0.15;
            const attractY = dy * force * 0.15;

            return (
              <div
                key={`far-${i}`}
                className="cosmic-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: '1px',
                  height: '1px',
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Particle layer - Mid (medium speed) */}
        <div className="cosmic-particle-layer cosmic-particle-layer-mid">
          {particlePositions.mid.map((particle, i) => {
            const dx = mousePos.x - particle.left;
            const dy = mousePos.y - particle.top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 32;
            const force = distance < maxDistance ? 1 - distance / maxDistance : 0;

            const attractX = dx * force * 0.2;
            const attractY = dy * force * 0.2;

            return (
              <div
                key={`mid-${i}`}
                className="cosmic-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: '1.5px',
                  height: '1.5px',
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Particle layer - Near */}
        <div className="cosmic-particle-layer cosmic-particle-layer-near">
          {particlePositions.near.map((particle, i) => {
            const dx = mousePos.x - particle.left;
            const dy = mousePos.y - particle.top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 35;
            const force = distance < maxDistance ? 1 - distance / maxDistance : 0;

            const attractX = dx * force * 0.25;
            const attractY = dy * force * 0.25;

            return (
              <div
                key={`near-${i}`}
                className="cosmic-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: '2px',
                  height: '2px',
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Accent particles */}
        <div className="cosmic-particle-layer cosmic-particle-layer-accent">
          {particlePositions.accent.map((particle, i) => {
            const dx = mousePos.x - particle.left;
            const dy = mousePos.y - particle.top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 32;
            const force = distance < maxDistance ? 1 - distance / maxDistance : 0;

            const attractX = dx * force * 0.18;
            const attractY = dy * force * 0.18;

            return (
              <div
                key={`accent-${i}`}
                className="cosmic-particle cosmic-particle-accent"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: '1.5px',
                  height: '1.5px',
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Subtle grid pattern */}
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

      {/* Minimal spotlight effect with mouse tracking */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%,
            rgba(255, 255, 255, 0.015) 0%,
            transparent 50%)`,
          pointerEvents: 'none',
          transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
        }}
      />
    </>
  );
}
