'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createNoise2D } from 'simplex-noise';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  history: { x: number; y: number }[];
  hue: number;
}

interface FlowFieldParticlesProps {
  particleCount?: number;
  trailLength?: number;
  speed?: number;
  mouseInfluence?: number;
}

export default function FlowFieldParticles({
  particleCount = 8000,
  trailLength = 30,
  speed = 0.5,
  mouseInfluence = 0.3
}: FlowFieldParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const noise2D = useRef(createNoise2D());
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          history: [],
          hue: Math.random() * 60 + 200 // Blue to purple range
        });
      }
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Flow field calculation
    const getFlowField = (x: number, y: number, time: number): { x: number; y: number } => {
      const scale = 0.003;
      const noiseValue = noise2D.current(x * scale, y * scale + time * 0.0001);
      const angle = noiseValue * Math.PI * 4;

      return {
        x: Math.cos(angle),
        y: Math.sin(angle)
      };
    };

    // FPS monitoring
    let frameCount = 0;
    let lastTime = performance.now();

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      // FPS calculation
      frameCount++;
      if (time >= lastTime + 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      // Clear canvas with low alpha for trailing effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Get flow field force
        const field = getFlowField(particle.x, particle.y, time);

        // Add mouse repulsion/attraction
        if (mouseRef.current.isActive) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const force = (1 - distance / 150) * mouseInfluence;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        // Apply flow field force
        particle.vx += field.x * speed * 0.2;
        particle.vy += field.y * speed * 0.2;

        // Apply damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update position
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update history for trails
        particle.history.push({ x: particle.x, y: particle.y });
        if (particle.history.length > trailLength) {
          particle.history.shift();
        }

        // Draw particle trail
        if (particle.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.history[0].x, particle.history[0].y);

          for (let i = 1; i < particle.history.length; i++) {
            ctx.lineTo(particle.history[i].x, particle.history[i].y);
          }

          // Color based on velocity and hue
          const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          const alpha = Math.min(velocity * 0.5, 0.8);
          const saturation = 60 + velocity * 40;
          const lightness = 50 + velocity * 10;

          ctx.strokeStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${alpha})`;
          ctx.lineWidth = 1 + velocity * 0.5;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, trailLength, speed, mouseInfluence]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: '#0A0A0A'
        }}
      />

      {/* FPS Display */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        color: fps >= 55 ? '#4ade80' : fps >= 30 ? '#fbbf24' : '#ef4444',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {fps} FPS
      </div>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: '0.875rem'
      }}>
        Move your mouse to interact
      </div>
    </div>
  );
}
