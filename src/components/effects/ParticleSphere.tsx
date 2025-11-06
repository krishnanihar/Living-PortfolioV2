'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  opacity: number;
  pulseOffset: number;
  twinkleOffset: number;
  color: string;
  layer: number;
}

interface ParticleSphereProps {
  radius?: number;
  particleCount?: number;
  enableInteraction?: boolean;
}

export function ParticleSphere({
  radius = 180,
  particleCount = 500,
  enableInteraction = true,
}: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const breathingRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (!enableInteraction || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1 to 1 range
      mouseRef.current = {
        x: ((e.clientX - centerX) / rect.width) * 2,
        y: ((e.clientY - centerY) / rect.height) * 2,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableInteraction, isMobile]);

  // Color interpolation helper
  const getParticleColor = (theta: number): string => {
    // Map theta (0 to 2π) to color gradient
    const normalized = (theta / (Math.PI * 2) + 1) % 1;

    if (normalized < 0.33) {
      // Electric Blue to Deep Purple
      return '#2196F3'; // Electric Blue
    } else if (normalized < 0.66) {
      // Deep Purple
      return '#7C3AED'; // Deep Purple
    } else {
      // Cyan/Teal
      return '#06B6D4'; // Cyan
    }
  };

  // Initialize particles using Fibonacci Sphere algorithm
  useEffect(() => {
    const particles: Particle[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    // Adjust particle count based on device
    const adjustedCount = isMobile ? 150 : particleCount;

    for (let i = 0; i < adjustedCount; i++) {
      // Fibonacci sphere distribution (even distribution on sphere)
      const t = i / adjustedCount;
      const phi = Math.acos(1 - 2 * t); // Latitude
      const theta = angleIncrement * i;  // Longitude

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Assign particles to layers (3 layers: inner, mid, outer)
      const layer = i % 3;
      const layerRadius = radius * (0.7 + (layer * 0.15)); // 70%, 85%, 100% radius

      const scaledX = (x / radius) * layerRadius;
      const scaledY = (y / radius) * layerRadius;
      const scaledZ = (z / radius) * layerRadius;

      particles.push({
        x: scaledX,
        y: scaledY,
        z: scaledZ,
        baseX: scaledX,
        baseY: scaledY,
        baseZ: scaledZ,
        size: isMobile ? (3 + Math.random() * 2) : (1 + Math.random() * 3), // 1-4px on desktop, 3-5px on mobile
        opacity: 0.3 + Math.random() * 0.6, // 0.3-0.9
        pulseOffset: Math.random() * Math.PI * 2, // Random starting phase for pulse
        twinkleOffset: Math.random() * 1000, // Random starting offset for twinkle
        color: getParticleColor(theta),
        layer,
      });
    }

    particlesRef.current = particles;
  }, [radius, particleCount, isMobile]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (larger to prevent clipping with effects)
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = isMobile ? 350 : 550; // Increased from 400px to 550px for proper effects rendering

      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let lastTime = 0;
    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
      const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;

      // Draw ambient glow layers (atmospheric depth)
      if (!isMobile && !prefersReducedMotion) {
        const glowLayers = [
          { radius: radius * 0.5, color: 'rgba(33, 150, 243, 0.02)', blur: 60 },   // Inner blue glow
          { radius: radius * 0.75, color: 'rgba(124, 58, 237, 0.015)', blur: 80 }, // Mid purple glow
          { radius: radius * 1.0, color: 'rgba(6, 182, 212, 0.01)', blur: 100 },   // Outer cyan glow
        ];

        glowLayers.forEach(layer => {
          ctx.save();
          ctx.shadowBlur = layer.blur;
          ctx.shadowColor = layer.color;
          ctx.beginPath();
          ctx.arc(centerX, centerY, layer.radius, 0, Math.PI * 2);
          ctx.fillStyle = layer.color;
          ctx.fill();
          ctx.restore();
        });
      }

      // Update rotation (ultra-subtle, barely perceptible)
      if (!prefersReducedMotion) {
        rotationRef.current.y += 0.00005; // 83% slower - barely perceptible rotation
        rotationRef.current.x += 0.00002; // 80% slower - minimal tilt

        // Breathing effect (subtle living quality)
        breathingRef.current += 0.0003; // 62.5% slower breathing
        const breathingScale = 1 + Math.sin(breathingRef.current) * 0.006; // 70% reduced amplitude (±0.6%)
      }

      // Sort particles by z-depth for proper rendering
      const sortedParticles = [...particlesRef.current].sort((a, b) => a.z - b.z);

      // Draw constellation lines between nearby particles (adds structural complexity)
      if (!isMobile && !prefersReducedMotion) {
        sortedParticles.forEach((particleA, i) => {
          // Only check next 5 particles (performance optimization)
          sortedParticles.slice(i + 1, i + 6).forEach(particleB => {
            const dx = particleA.x - particleB.x;
            const dy = particleA.y - particleB.y;
            const dz = particleA.z - particleB.z;
            const distance3D = Math.sqrt(dx*dx + dy*dy + dz*dz);

            // Only draw line if particles are close in 3D space (< 60px)
            if (distance3D < 60) {
              // Fade line opacity based on distance
              const lineOpacity = Math.max(0, (1 - distance3D / 60) * 0.12);

              // Project both particles to 2D
              const perspective = 600;
              const scaleA = perspective / (perspective + particleA.z);
              const scaleB = perspective / (perspective + particleB.z);
              const x2dA = centerX + particleA.x * scaleA;
              const y2dA = centerY + particleA.y * scaleA;
              const x2dB = centerX + particleB.x * scaleB;
              const y2dB = centerY + particleB.y * scaleB;

              // Draw subtle constellation line
              ctx.beginPath();
              ctx.moveTo(x2dA, y2dA);
              ctx.lineTo(x2dB, y2dB);
              ctx.strokeStyle = `rgba(124, 58, 237, ${lineOpacity})`; // Purple lines
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      sortedParticles.forEach((particle, index) => {
        // Apply rotation
        let { x, y, z } = particle;

        if (!prefersReducedMotion) {
          // Rotate around Y axis (all layers rotate together - no layer desync)
          const cosY = Math.cos(rotationRef.current.y);
          const sinY = Math.sin(rotationRef.current.y);
          const newX = x * cosY - z * sinY;
          const newZ = x * sinY + z * cosY;
          x = newX;
          z = newZ;

          // Rotate around X axis
          const cosX = Math.cos(rotationRef.current.x);
          const sinX = Math.sin(rotationRef.current.x);
          const newY = y * cosX - z * sinX;
          z = y * sinX + z * cosX;
          y = newY;

          // Apply breathing scale (subtle amplitude)
          const breathingScale = 1 + Math.sin(breathingRef.current) * 0.006;
          x *= breathingScale;
          y *= breathingScale;
          z *= breathingScale;
        }

        // Mouse parallax (subtle layer-based displacement - 60% reduced)
        if (enableInteraction && !isMobile && !prefersReducedMotion) {
          const parallaxStrength = (particle.layer + 1) * 2; // 2px, 4px, 6px per layer (was 5, 10, 15)
          x += mouseRef.current.x * parallaxStrength;
          y += mouseRef.current.y * parallaxStrength;
        }

        // Project 3D to 2D (perspective projection)
        const perspective = 600;
        const scale = perspective / (perspective + z);
        const x2d = centerX + x * scale;
        const y2d = centerY + y * scale;

        // Calculate size with depth (enhanced depth-of-field - foreground particles much larger)
        const depthSize = particle.size * scale * (1 + (z / radius) * 0.5); // 50% size boost for near particles

        // Pulse animation (individual particle glow)
        let pulseOpacity = particle.opacity;
        if (!prefersReducedMotion) {
          const pulseSpeed = 0.002 + (particle.layer * 0.001); // Different speeds per layer
          const pulse = Math.sin(currentTime * pulseSpeed + particle.pulseOffset);
          pulseOpacity = particle.opacity + pulse * 0.2; // ±0.2 opacity variation
        }

        // Twinkle effect (random sparkle)
        let twinkleBrightness = 1;
        if (!prefersReducedMotion) {
          const twinkleSpeed = 0.003;
          const twinkle = Math.sin((currentTime + particle.twinkleOffset) * twinkleSpeed);
          if (twinkle > 0.95) { // Only sparkle when sine is very high (rare)
            twinkleBrightness = 1 + (twinkle - 0.95) * 10; // Bright flash
          }
        }

        // Draw particle with multi-layer glow
        const opacity = Math.max(0, Math.min(1, pulseOpacity));

        // Parse color and create rgba
        const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : { r: 255, g: 255, b: 255 };
        };

        const rgb = hexToRgb(particle.color);
        const color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

        // Multi-layer glow (only on desktop or if not reduced motion)
        if (!isMobile && !prefersReducedMotion) {
          // Outer bloom (largest, softest)
          ctx.shadowBlur = 12 * twinkleBrightness;
          ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.3})`;

          // Mid glow
          ctx.shadowBlur = 8 * twinkleBrightness;
          ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.4})`;
        } else {
          // Simplified glow for mobile/reduced motion
          ctx.shadowBlur = 4;
          ctx.shadowColor = color;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(x2d, y2d, depthSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Inner bright core for twinkle effect
        if (twinkleBrightness > 1.5 && !prefersReducedMotion) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(255, 255, 255, ${(twinkleBrightness - 1) * 0.8})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, depthSize * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(twinkleBrightness - 1) * 0.6})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [radius, particleCount, enableInteraction, isMobile, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        filter: (prefersReducedMotion || isMobile) ? 'none' : 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.12))',
        opacity: prefersReducedMotion ? 0.7 : 1,
      }}
    />
  );
}
