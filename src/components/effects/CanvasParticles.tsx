'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface CanvasParticlesProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
  variant?: 'subtle' | 'ambient' | 'dynamic';
}

export function CanvasParticles({
  className = '',
  particleCount = 50,
  connectionDistance = 120,
  mouseInfluence = 0.5,
  variant = 'subtle',
}: CanvasParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const performanceRef = useRef({ lastTime: 0, frameCount: 0, fps: 0 });

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Performance monitoring
  const updatePerformance = useCallback((currentTime: number) => {
    const perf = performanceRef.current;
    perf.frameCount++;

    if (currentTime - perf.lastTime >= 1000) {
      perf.fps = Math.round(perf.frameCount * 1000 / (currentTime - perf.lastTime));
      perf.frameCount = 0;
      perf.lastTime = currentTime;

      // Log performance warnings
      if (perf.fps < 45) {
        console.warn(`[Particles] Low FPS detected: ${perf.fps}fps`);
      }
    }
  }, []);

  // Create sophisticated particle
  const createParticle = useCallback((width: number, height: number): Particle => {
    const baseOpacity = variant === 'dynamic' ? 0.8 : variant === 'ambient' ? 0.4 : 0.2;
    const maxLife = 200 + Math.random() * 300;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      opacity: baseOpacity,
      baseOpacity,
      hue: 0, // Will be set based on theme
      life: Math.random() * maxLife,
      maxLife,
    };
  }, [variant]);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(rect.width, rect.height)
    );
  }, [particleCount, createParticle]);

  // Update canvas dimensions
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set actual dimensions
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set display dimensions
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Scale context
    const ctx = contextRef.current;
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    // Reinitialize particles with new dimensions
    initializeParticles();
  }, [initializeParticles]);

  // Mouse tracking
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isActive: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isActive = false;
  }, []);

  // Update particle physics
  const updateParticles = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    const mouse = mouseRef.current;
    const particles = particlesRef.current;

    particles.forEach((particle) => {
      // Update life cycle
      particle.life += deltaTime;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }

      // Life-based opacity
      const lifeCycle = particle.life / particle.maxLife;
      const fadeIn = Math.min(lifeCycle * 4, 1);
      const fadeOut = lifeCycle > 0.8 ? (1 - lifeCycle) * 5 : 1;
      particle.opacity = particle.baseOpacity * fadeIn * fadeOut;

      // Mouse interaction
      if (mouse.isActive) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * mouseInfluence * 0.02;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
          particle.opacity *= 1.5; // Brighten near mouse
        }
      }

      // Apply velocity with damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Add subtle random movement
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;

      // Velocity limits
      const maxVel = 2;
      particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
      particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));
    });
  }, [mouseInfluence]);

  // Render particles and connections
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear canvas with subtle trail effect
    ctx.fillStyle = isDark ? 'rgba(10, 10, 10, 0.1)' : 'rgba(248, 250, 252, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Connection lines
    if (connectionDistance > 0) {
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Render particles
    particles.forEach((particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );

      const centerColor = isDark
        ? `rgba(255, 255, 255, ${particle.opacity})`
        : `rgba(0, 0, 0, ${particle.opacity})`;
      const edgeColor = isDark
        ? `rgba(255, 255, 255, 0)`
        : `rgba(0, 0, 0, 0)`;

      gradient.addColorStop(0, centerColor);
      gradient.addColorStop(1, edgeColor);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Mouse cursor effect
    if (mouse.isActive) {
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 80
      );

      gradient.addColorStop(0, 'rgba(218, 14, 41, 0.1)');
      gradient.addColorStop(1, 'rgba(218, 14, 41, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [isDark, connectionDistance]);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    updatePerformance(currentTime);

    const deltaTime = Math.min((currentTime - performanceRef.current.lastTime) * 0.01, 1);

    updateParticles(deltaTime);
    render();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updatePerformance, updateParticles, render]);

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');
    if (!contextRef.current) return;

    updateCanvasSize();

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Single render for reduced motion
      render();
    }

    // Event listeners
    const handleResize = () => updateCanvasSize();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCanvasSize, animate, render, handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{
        mixBlendMode: isDark ? 'normal' : 'multiply',
      }}
      aria-hidden="true"
    />
  );
}