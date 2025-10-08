'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
}

interface ConsciousnessParticlesProps {
  particleCount?: number;
  enabled?: boolean;
}

/**
 * Environmental Storytelling Component
 * Floating consciousness particles that respond to narrative progression
 * - Act I (Seduction): Harmonious, flowing particles
 * - Act II (Complication): Erratic, fragmenting behavior
 * - Act III (Resolution): Gentle, contemplative movement
 */
export function ConsciousnessParticles({
  particleCount = 20,
  enabled = true,
}: ConsciousnessParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const narrativeState = useNarrativeProgress();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  useEffect(() => {
    if (!enabled) return;

    const initializeParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          hue: 270, // Start with purple
        });
      }
      particlesRef.current = particles;
    };

    initializeParticles();

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [particleCount, enabled]);

  // Animate particles based on narrative state
  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Adjust behavior based on narrative act
        const { act, intensity, actProgress } = narrativeState;

        // Act I: Seduction - harmonious flow
        if (act === 'seduction') {
          particle.hue = 270; // Purple
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = (Math.random() - 0.5) * 0.5;
          particle.opacity = 0.2 + actProgress * 0.2;
        }
        // Act II: Complication - erratic, fragmenting
        else if (act === 'complication') {
          particle.hue = 270 - actProgress * 90; // Purple → Red (270 → 0)
          particle.vx += (Math.random() - 0.5) * 0.3 * intensity;
          particle.vy += (Math.random() - 0.5) * 0.3 * intensity;
          particle.opacity = 0.4 + Math.random() * 0.3; // Flickering
        }
        // Act III: Resolution - contemplative, gentle
        else {
          particle.hue = 210; // Blue
          particle.vx *= 0.95; // Dampen movement
          particle.vy *= 0.95;
          particle.opacity = 0.3 - actProgress * 0.2; // Fade out
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Limit velocity
        const maxSpeed = act === 'complication' ? 2 : 1;
        const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Draw connection lines to nearby particles
        particlesRef.current.forEach((otherParticle) => {
          if (particle.id >= otherParticle.id) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx ** 2 + dy ** 2);

          if (distance < 150) {
            const connectionOpacity = (1 - distance / 150) * 0.15 * particle.opacity;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${connectionOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, narrativeState, dimensions]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.6,
      }}
    />
  );
}

/**
 * Simpler CSS-based particle alternative for better performance
 */
export function ConsciousnessOrbs({ count = 5 }: { count?: number }) {
  const narrativeState = useNarrativeProgress();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${(i * 25 + 10) % 100}%`,
            left: `${(i * 37 + 15) % 100}%`,
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${narrativeState.color.primary.replace('0.8', '0.3')}, transparent)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, Math.sin(i * 0.5) * 100, 0],
            y: [0, Math.cos(i * 0.7) * 80, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
