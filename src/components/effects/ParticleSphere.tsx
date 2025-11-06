'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
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
  const mouseRef = useRef({ x: 0, y: 0, z: 0, active: false });
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const breathingRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Liquid physics parameters
  const physicsParams = {
    springStrength: 0.008,      // How fast particles return to rest position
    damping: 0.90,               // Velocity damping (friction) - 0.90 = freer flow than 0.92
    repulsionStrength: 350,      // How hard mouse pushes particles away (increased from 250)
    repulsionRadius: 250,        // Area of mouse influence in 3D space (increased from 180)
    cohesionStrength: 0.001,     // Particle-to-particle attraction (surface tension)
    cohesionRadius: 40,          // Distance for cohesion effect
    flowStrength: 150,           // Tangential swirl force strength (new)
    dragStrength: 8,             // Mouse velocity drag force (new)
  };

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

  // Mouse tracking for liquid scatter effect with velocity tracking
  useEffect(() => {
    if (!enableInteraction || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const sphereCenterX = rect.left + rect.width / 2;
      const sphereCenterY = rect.top + rect.height / 2;

      // Calculate mouse position relative to sphere center
      const mouseX = e.clientX - sphereCenterX;
      const mouseY = e.clientY - sphereCenterY;

      // Calculate mouse velocity (for drag/flow effects)
      mouseVelocityRef.current = {
        x: mouseX - previousMouseRef.current.x,
        y: mouseY - previousMouseRef.current.y,
      };

      // Store previous position for next frame
      previousMouseRef.current = { x: mouseX, y: mouseY };

      // Mouse is at z=0 plane (front of sphere)
      // We'll convert this to 3D space for particle repulsion
      mouseRef.current = {
        x: mouseX,
        y: mouseY,
        z: 0, // Mouse position is on the viewing plane
        active: true,
      };

      // Calculate target rotation based on normalized mouse position
      // Map mouse position to rotation angles (±0.3 radians = ~17°)
      const normalizedX = mouseX / (rect.width / 2);  // -1 to 1
      const normalizedY = mouseY / (rect.height / 2); // -1 to 1

      targetRotationRef.current = {
        x: -normalizedY * 0.3,  // Up/down tilt (negative for natural feel)
        y: normalizedX * 0.3,   // Left/right rotation
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseVelocityRef.current = { x: 0, y: 0 };
      // Return to neutral rotation when mouse leaves
      targetRotationRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
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
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
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

      // Update rotation to follow mouse (smooth interpolation)
      if (!prefersReducedMotion) {
        // Lerp (linear interpolation) for smooth rotation transitions
        const lerpFactor = 0.05; // Lower = smoother (0.05 = very smooth)
        rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * lerpFactor;
        rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * lerpFactor;

        // Breathing effect (subtle living quality) - keep this for organic feel
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

      // Update particle physics (liquid behavior)
      particlesRef.current.forEach((particle, index) => {
        // Calculate forces acting on particle
        let forceX = 0, forceY = 0, forceZ = 0;

        // 1. Spring force (pulls particle back to rest position)
        const dx = particle.baseX - particle.x;
        const dy = particle.baseY - particle.y;
        const dz = particle.baseZ - particle.z;
        forceX += dx * physicsParams.springStrength;
        forceY += dy * physicsParams.springStrength;
        forceZ += dz * physicsParams.springStrength;

        // 2. Mouse repulsion force (explosive scatter)
        if (enableInteraction && !isMobile && mouseRef.current.active && !prefersReducedMotion) {
          const mouseDistX = particle.x - mouseRef.current.x;
          const mouseDistY = particle.y - mouseRef.current.y;
          const mouseDistZ = particle.z - mouseRef.current.z;
          const mouseDist3D = Math.sqrt(mouseDistX**2 + mouseDistY**2 + mouseDistZ**2);

          if (mouseDist3D < physicsParams.repulsionRadius && mouseDist3D > 0.1) {
            // Inverse square law for repulsion (closer = stronger push)
            const repulsionForce = physicsParams.repulsionStrength / (mouseDist3D * mouseDist3D + 1);
            const directionX = mouseDistX / mouseDist3D;
            const directionY = mouseDistY / mouseDist3D;
            const directionZ = mouseDistZ / mouseDist3D;

            forceX += directionX * repulsionForce;
            forceY += directionY * repulsionForce;
            forceZ += directionZ * repulsionForce;

            // 2b. Tangential swirl force (creates vortex/flowing motion)
            // Apply force perpendicular to radial direction for swirling effect
            const falloff = 1 - (mouseDist3D / physicsParams.repulsionRadius);
            const swirlForce = physicsParams.flowStrength * falloff;

            // Perpendicular vector (tangent): rotate direction 90° in XY plane
            const tangentX = -directionY;
            const tangentY = directionX;

            forceX += tangentX * swirlForce;
            forceY += tangentY * swirlForce;
            // No Z component for tangent (swirl in 2D plane)

            // 2c. Drag force (particles follow mouse movement)
            // Mouse velocity creates "wake" effect
            const dragForce = physicsParams.dragStrength * falloff;
            forceX += mouseVelocityRef.current.x * dragForce;
            forceY += mouseVelocityRef.current.y * dragForce;
          }
        }

        // 3. Cohesion force (particles attract nearby particles - surface tension)
        if (!isMobile && !prefersReducedMotion) {
          let cohesionX = 0, cohesionY = 0, cohesionZ = 0;
          let neighborCount = 0;

          // Check nearby particles (performance: only check every 10th particle)
          for (let j = index + 1; j < Math.min(index + 20, particlesRef.current.length); j++) {
            const other = particlesRef.current[j];
            const cohDistX = other.x - particle.x;
            const cohDistY = other.y - particle.y;
            const cohDistZ = other.z - particle.z;
            const cohDist = Math.sqrt(cohDistX**2 + cohDistY**2 + cohDistZ**2);

            if (cohDist < physicsParams.cohesionRadius && cohDist > 0.1) {
              cohesionX += cohDistX;
              cohesionY += cohDistY;
              cohesionZ += cohDistZ;
              neighborCount++;
            }
          }

          if (neighborCount > 0) {
            forceX += (cohesionX / neighborCount) * physicsParams.cohesionStrength;
            forceY += (cohesionY / neighborCount) * physicsParams.cohesionStrength;
            forceZ += (cohesionZ / neighborCount) * physicsParams.cohesionStrength;
          }
        }

        // Apply forces to velocity
        particle.velocityX += forceX;
        particle.velocityY += forceY;
        particle.velocityZ += forceZ;

        // Apply damping (friction)
        particle.velocityX *= physicsParams.damping;
        particle.velocityY *= physicsParams.damping;
        particle.velocityZ *= physicsParams.damping;

        // Update position based on velocity
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.z += particle.velocityZ;
      });

      // Render particles
      sortedParticles.forEach((particle, index) => {
        // Get current particle position (already updated by physics)
        let { x, y, z } = particle;

        // Apply subtle rotation to base positions (for visual variety)
        if (!prefersReducedMotion) {
          // Rotate around Y axis
          const cosY = Math.cos(rotationRef.current.y);
          const sinY = Math.sin(rotationRef.current.y);
          const baseRotatedX = particle.baseX * cosY - particle.baseZ * sinY;
          const baseRotatedZ = particle.baseX * sinY + particle.baseZ * cosY;

          // Update base position for spring force to follow rotation
          particle.baseX = baseRotatedX;
          particle.baseZ = baseRotatedZ;
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
