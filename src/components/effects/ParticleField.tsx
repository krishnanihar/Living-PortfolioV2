'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from './ThemeProvider';
import { prefersReducedMotion, clamp, lerp } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  originalOpacity: number;
  hue: number;
  brightness: number;
  connections: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
  speed?: number;
  density?: 'low' | 'medium' | 'high';
  variant?: 'subtle' | 'ambient' | 'dynamic';
}

export function ParticleField({
  className = '',
  particleCount: propParticleCount,
  connectionDistance = 80,
  mouseInfluence = 0.4,
  speed = 0.5,
  density = 'medium',
  variant = 'subtle',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const lastTimeRef = useRef(0);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const reducedMotion = prefersReducedMotion();

  // Dynamic particle count based on density and screen size
  const particleCount = useMemo(() => {
    if (propParticleCount) return propParticleCount;

    const densityMap = {
      low: 0.06,    // Visible but sparse
      medium: 0.1,  // Balanced ambient
      high: 0.15,   // Rich atmosphere
    };

    const baseCount = Math.min((typeof window !== 'undefined' ? window.innerWidth : 1920) || 1920, 1920) * (densityMap[density] / 10);
    return reducedMotion ? Math.floor(baseCount * 0.7) : Math.floor(baseCount); // Restored count
  }, [propParticleCount, density, reducedMotion]);

  // Visible but ambient theme-based colors
  const colors = useMemo(() => {
    if (isDark) {
      return {
        particle: 'rgba(255, 255, 255, 0.06)',
        connection: 'rgba(255, 255, 255, 0.02)',
        accent: 'rgba(218, 14, 41, 0.03)',
        glow: 'rgba(255, 255, 255, 0.04)',
      };
    } else {
      return {
        particle: 'rgba(0, 0, 0, 0.08)',
        connection: 'rgba(0, 0, 0, 0.025)',
        accent: 'rgba(218, 14, 41, 0.04)',
        glow: 'rgba(0, 0, 0, 0.06)',
      };
    }
  }, [isDark]);

  // Create visible but ambient particles
  const createParticle = useCallback((width: number, height: number): Particle => {
    const baseOpacity = variant === 'ambient' ? 0.08 : variant === 'dynamic' ? 0.1 : 0.06;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed * 0.8, // Gentle movement
      vy: (Math.random() - 0.5) * speed * 0.8,
      radius: Math.random() * 1.5 + 0.8, // Slightly larger for visibility
      opacity: baseOpacity,
      originalOpacity: baseOpacity,
      hue: Math.random() * 60 + 340,
      brightness: Math.random() * 40 + 60,
      connections: 0,
    };
  }, [speed, variant]);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const { width, height } = dimensionsRef.current;
    if (!width || !height) return;

    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(width, height)
    );
  }, [particleCount, createParticle]);

  // Update canvas dimensions
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;

    // Set actual dimensions
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set display dimensions
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Scale context for crisp rendering
    if (contextRef.current) {
      contextRef.current.scale(dpr, dpr);
    }

    dimensionsRef.current = { width: rect.width, height: rect.height };
  }, []);

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
    const { width, height } = dimensionsRef.current;
    const mouse = mouseRef.current;

    particlesRef.current.forEach((particle) => {
      // Reset connections count
      particle.connections = 0;

      // Apply mouse influence if active
      if (mouse.isActive && !reducedMotion) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.vx += (dx / distance) * force * mouseInfluence * 0.02;
          particle.vy += (dy / distance) * force * mouseInfluence * 0.02;
        }
      }

      // Apply velocity with damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Bounce off edges with smooth reflection
      if (particle.x <= 0 || particle.x >= width) {
        particle.vx *= -0.8;
        particle.x = clamp(particle.x, 0, width);
      }
      if (particle.y <= 0 || particle.y >= height) {
        particle.vy *= -0.8;
        particle.y = clamp(particle.y, 0, height);
      }

      // Add subtle random movement
      if (!reducedMotion) {
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;
      }

      // Clamp velocity
      const maxVel = reducedMotion ? 0.5 : 2;
      particle.vx = clamp(particle.vx, -maxVel, maxVel);
      particle.vy = clamp(particle.vy, -maxVel, maxVel);
    });
  }, [mouseInfluence, reducedMotion]);

  // Render particles and connections
  const render = useCallback(() => {
    const ctx = contextRef.current;
    const { width, height } = dimensionsRef.current;

    if (!ctx || !width || !height) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Draw subtle connections first (behind particles)
    if (connectionDistance > 0) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.02;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            particles[i].connections++;
            particles[j].connections++;
          }
        }
      }
    }

    // Draw ambient particles with gentle glow
    particles.forEach((particle) => {
      const glowOpacity = Math.min(particle.connections * 0.01 + particle.opacity, particle.opacity * 1.5);

      // Subtle glow effect
      if (glowOpacity > particle.opacity) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Main particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    });

    // Gentle mouse cursor effect
    if (mouse.isActive && !reducedMotion) {
      const cursorRadius = 60;
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, cursorRadius
      );
      gradient.addColorStop(0, 'rgba(218, 14, 41, 0.02)');
      gradient.addColorStop(1, 'rgba(218, 14, 41, 0)');

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, cursorRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, [connectionDistance, variant, reducedMotion]);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Limit to ~60fps
    if (deltaTime > 16) {
      updateParticles(deltaTime * 0.01);
      render();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, render]);

  // Initialize and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext('2d');

    updateCanvasSize();
    initializeParticles();

    // Start animation
    if (!reducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // Static render for reduced motion
      render();
    }

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateCanvasSize);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateCanvasSize);
      }
    };
  }, [
    updateCanvasSize,
    initializeParticles,
    animate,
    render,
    handleMouseMove,
    handleMouseLeave,
    reducedMotion,
  ]);

  // Reinitialize when theme or settings change
  useEffect(() => {
    initializeParticles();
  }, [initializeParticles, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: isDark ? 'normal' : 'multiply',
      }}
      aria-hidden="true"
    />
  );
}