'use client';

import React, { useState, useEffect } from 'react';

export function CosmicBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Sphere position (static - right side of hero section, approximately 65% x, 45% y)
  const spherePosition = { x: 65, y: 45 };

  // Color reflection helper - calculates star color based on distance to particle sphere
  const getReflectedColor = (starX: number, starY: number, layerStrength: number = 0.6, layerOpacity: number = 0.7) => {
    const dx = starX - spherePosition.x;
    const dy = starY - spherePosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influenceRadius = 45; // % of viewport

    // No influence if too far from sphere
    if (distance > influenceRadius) return `rgba(255, 255, 255, ${layerOpacity})`;

    // Calculate influence strength (1 = at sphere center, 0 = at influence edge)
    const influence = 1 - (distance / influenceRadius);

    // Get angle to determine which color zone (matches sphere's color distribution)
    const angle = Math.atan2(dy, dx);
    const normalizedAngle = ((angle + Math.PI) / (Math.PI * 2) + 1) % 1;

    // Select base color based on angle (same as particle sphere)
    let baseColor;
    if (normalizedAngle < 0.33) {
      baseColor = { r: 33, g: 150, b: 243 }; // Electric Blue
    } else if (normalizedAngle < 0.66) {
      baseColor = { r: 124, g: 58, b: 237 }; // Deep Purple
    } else {
      baseColor = { r: 6, g: 182, b: 212 }; // Cyan
    }

    // Mix with white based on layer strength and influence
    // layerStrength: far layer = 0.7 (strong), mid = 0.5, near = 0.3 (subtle)
    const mixStrength = influence * layerStrength;
    const r = Math.round(255 * (1 - mixStrength) + baseColor.r * mixStrength);
    const g = Math.round(255 * (1 - mixStrength) + baseColor.g * mixStrength);
    const b = Math.round(255 * (1 - mixStrength) + baseColor.b * mixStrength);

    return `rgba(${r}, ${g}, ${b}, ${layerOpacity})`;
  };

  // Stabilize particle positions with deterministic algorithm - organic distribution
  const particlePositions = React.useMemo(() => {
    return {
      far: Array.from({ length: 50 }, (_, i) => {
        const seed = i / 50;
        const clusterSeed = Math.sin(i * 0.7) * 0.5 + 0.5; // Creates natural clustering
        return {
          left: (seed * 127.3 + clusterSeed * 40 + i * 7.2) % 100,
          top: (seed * 93.1 + clusterSeed * 35 + i * 8.7) % 100,
          delay1: (seed * 25.5 + 2.5 + i * 0.6) % 30,
          delay2: (seed * 18.3 + 1.7 + i * 0.4) % 20,
          duration1: 35 + ((seed * 23.7 + i * 0.5) % 25),
          duration2: 15 + ((seed * 9.4 + i * 0.2) % 10),
          size: 0.8 + ((seed * 13.2 + i * 0.3) % 0.4), // 0.8-1.2px
          brightness: 0.6 + ((seed * 17.4 + i * 0.4) % 0.4), // 0.6-1.0
        };
      }),
      mid: Array.from({ length: 30 }, (_, i) => {
        const seed = i / 30;
        const clusterSeed = Math.sin(i * 0.9 + 1.2) * 0.5 + 0.5;
        return {
          left: (seed * 141.2 + clusterSeed * 45 + i * 6.8) % 100,
          top: (seed * 88.4 + clusterSeed * 38 + i * 7.3) % 100,
          delay1: (seed * 22.1 + 2.9 + i * 0.8) % 25,
          delay2: (seed * 13.7 + 1.3 + i * 0.5) % 15,
          duration1: 28 + ((seed * 17.2 + i * 0.6) % 18),
          duration2: 12 + ((seed * 7.6 + i * 0.3) % 8),
          size: 1.0 + ((seed * 11.7 + i * 0.5) % 0.8), // 1.0-1.8px
          brightness: 0.65 + ((seed * 14.8 + i * 0.35) % 0.35), // 0.65-1.0
        };
      }),
      near: Array.from({ length: 15 }, (_, i) => {
        const seed = i / 15;
        const clusterSeed = Math.sin(i * 1.1 + 2.4) * 0.5 + 0.5;
        return {
          left: (seed * 119.6 + clusterSeed * 50 + i * 9.1) % 100,
          top: (seed * 102.3 + clusterSeed * 42 + i * 10.2) % 100,
          delay1: (seed * 18.4 + 1.6 + i * 1.0) % 20,
          delay2: (seed * 11.2 + 0.8 + i * 0.6) % 12,
          duration1: 22 + ((seed * 13.3 + i * 0.7) % 14),
          duration2: 10 + ((seed * 5.7 + i * 0.3) % 6),
          size: 1.5 + ((seed * 9.8 + i * 0.6) % 1.0), // 1.5-2.5px
          brightness: 0.7 + ((seed * 12.3 + i * 0.3) % 0.3), // 0.7-1.0
        };
      }),
      accent: Array.from({ length: 4 }, (_, i) => {
        const seed = i / 4;
        const clusterSeed = Math.sin(i * 1.5 + 3.7) * 0.5 + 0.5;
        return {
          left: 20 + ((seed * 72.4 + clusterSeed * 25 + i * 12.3) % 60),
          top: 20 + ((seed * 67.8 + clusterSeed * 20 + i * 11.6) % 60),
          delay1: (seed * 13.6 + i * 1.5) % 15,
          delay2: (seed * 9.1 + i * 1.1) % 10,
          duration1: 25 + ((seed * 14.2 + i * 0.9) % 15),
          duration2: 12 + ((seed * 7.4 + i * 0.8) % 8),
          size: 1.2 + ((seed * 8.6 + i * 0.7) % 0.6), // 1.2-1.8px
          brightness: 0.75 + ((seed * 10.5 + i * 0.25) % 0.25), // 0.75-1.0
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

            const color = getReflectedColor(particle.left, particle.top, 0.7, 0.7);

            return (
              <div
                key={`far-${i}`}
                className="cosmic-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: color,
                  boxShadow: `0 0 ${2 + particle.size}px ${color}`,
                  opacity: particle.brightness,
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

            const color = getReflectedColor(particle.left, particle.top, 0.5, 0.75);

            return (
              <div
                key={`mid-${i}`}
                className="cosmic-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: color,
                  boxShadow: `0 0 ${2.5 + particle.size}px ${color}`,
                  opacity: particle.brightness,
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

            const color = getReflectedColor(particle.left, particle.top, 0.3, 0.85);

            return (
              <div
                key={`near-${i}`}
                className="cosmic-particle"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: color,
                  boxShadow: `0 0 ${3 + particle.size}px ${color}`,
                  opacity: particle.brightness,
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

            // Accent particles shift from red to sphere colors when near sphere
            const accentColor = getReflectedColor(particle.left, particle.top, 0.8, 0.8);
            const isNearSphere = distance < 30; // Within 30% of viewport

            return (
              <div
                key={`accent-${i}`}
                className="cosmic-particle cosmic-particle-accent"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay1}s, ${particle.delay2}s`,
                  animationDuration: `${particle.duration1}s, ${particle.duration2}s`,
                  transform: `translate(${attractX}px, ${attractY}px)`,
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: isNearSphere ? accentColor : 'rgba(218, 14, 41, 0.7)',
                  boxShadow: isNearSphere
                    ? `0 0 ${4 + particle.size}px ${accentColor}`
                    : '0 0 6px rgba(218, 14, 41, 0.5)',
                  opacity: particle.brightness,
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
