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
  connectionDistance = 120,
  mouseInfluence = 0.3,
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
      low: 0.05,  // Ultra-sparse
      medium: 0.08, // Still very few
      high: 0.12,   // Modest amount
    };

    const baseCount = Math.min((typeof window !== 'undefined' ? window.innerWidth : 1920) || 1920, 1920) * (densityMap[density] / 10);
    return reducedMotion ? Math.floor(baseCount * 0.5) : Math.floor(baseCount * 0.5); // 50% reduction
  }, [propParticleCount, density, reducedMotion]);

  // Ultra-subtle theme-based colors
  const colors = useMemo(() => {
    if (isDark) {
      return {
        particle: 'rgba(255, 255, 255, 0.01)',
        connection: 'rgba(255, 255, 255, 0)',
        accent: 'rgba(218, 14, 41, 0.005)',
        glow: 'rgba(255, 255, 255, 0.01)',
      };
    } else {
      return {
        particle: 'rgba(0, 0, 0, 0.02)',
        connection: 'rgba(0, 0, 0, 0)',
        accent: 'rgba(218, 14, 41, 0.01)',
        glow: 'rgba(0, 0, 0, 0.01)',
      };
    }
  }, [isDark]);

  // Create ultra-subtle particles
  const createParticle = useCallback((width: number, height: number): Particle => {
    const baseOpacity = 0.01; // Barely visible dust motes

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed * 0.3, // Much slower movement
      vy: (Math.random() - 0.5) * speed * 0.3,
      radius: Math.random() * 1 + 0.5, // Smaller particles
      opacity: baseOpacity,
      originalOpacity: baseOpacity,
      hue: Math.random() * 60 + 340,
      brightness: Math.random() * 30 + 70,
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

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * mouseInfluence * 0.01;
          particle.vy += (dy / distance) * force * mouseInfluence * 0.01;
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

    // Connections disabled for ultra-minimal aesthetic

    // Draw ultra-minimal particles - like dust motes
    particles.forEach((particle) => {
      // Simple, constant opacity - no dynamic effects
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    });

    // No mouse effects - pure minimalism
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