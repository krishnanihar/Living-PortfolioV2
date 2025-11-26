'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shimmerVertexShader, shimmerFragmentShader } from '@/shaders/gladeye';
import GPGPUPatternParticles from './GPGPUPatternParticles';

// Particle count optimized for hero section
function getHeroParticleCount(): number {
  if (typeof window === 'undefined') return 1200;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pixelRatio = window.devicePixelRatio || 1;
  const isHighDPI = pixelRatio > 2;

  // Hero-specific particle counts (slightly fewer than work page for performance)
  if (isMobile && isHighDPI) return 600;   // iPhone 13 Pro, etc.
  if (isMobile) return 800;                // Standard mobile
  if (isHighDPI) return 1000;              // Retina displays
  return 1200;                             // Standard desktop
}

interface HeroStarParticlesProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

function HeroStarParticles({ scrollProgress, mousePosition }: HeroStarParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = useMemo(() => getHeroParticleCount(), []);

  // Generate particle geometry with spherical distribution
  const { geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const randomOffsets = new Float32Array(particleCount);
    const twinklePhases = new Float32Array(particleCount);

    // Spherical distribution for star field
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Fibonacci sphere distribution for even coverage
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radiusVariance = Math.pow(Math.random(), 1.5); // Clustering
      const radius = 25 + radiusVariance * 60;

      // Position in 3D space
      positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i3 + 2] = -Math.random() * 450; // Extended depth for tunnel

      // Custom attributes for shader
      randomOffsets[i] = Math.random() * Math.PI * 2;
      twinklePhases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));
    geo.setAttribute('twinklePhase', new THREE.BufferAttribute(twinklePhases, 1));

    // Set manual bounding sphere to prevent NaN computation errors
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -225), 1000);

    return { geometry: geo };
  }, [particleCount]);

  // Create shader material for white stars
  const material = useMemo(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        shimmerIntensity: { value: prefersReducedMotion ? 0 : 0.2 },
        scrollProgress: { value: 0 },
        // Pure white for star-like particles
        color: { value: new THREE.Color(1.0, 1.0, 1.0) },
      },
      vertexShader: shimmerVertexShader,
      fragmentShader: shimmerFragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
    });
  }, []);

  // Animation loop with zoom scroll effect
  useFrame((state) => {
    if (!pointsRef.current) return;

    // Early return if camera position has NaN values
    if (isNaN(state.camera.position.x) || isNaN(state.camera.position.y) || isNaN(state.camera.position.z)) {
      state.camera.position.set(0, 0, 0);
      return;
    }

    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Update shader uniforms
    mat.uniforms.time.value = state.clock.elapsedTime;
    mat.uniforms.scrollProgress.value = scrollProgress;

    // Camera zoom effect: continuous travel through stars
    // No freeze - accelerating zoom throughout entire page
    const zoomSpeed = 1 + scrollProgress * 2; // 1x → 3x speed (accelerating)
    const targetCameraZ = scrollProgress * 300 * zoomSpeed; // 0 → 900 units

    // Mouse parallax (subtle)
    const targetCameraX = mousePosition.x * 3;
    const targetCameraY = mousePosition.y * 3;

    // Smooth camera movement with easing
    state.camera.position.z += (targetCameraZ - state.camera.position.z) * 0.08;
    state.camera.position.x += (targetCameraX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetCameraY - state.camera.position.y) * 0.05;

    // Particle recycling for infinite tunnel effect
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Check ALL position components for NaN
      if (isNaN(positions[i3]) || isNaN(positions[i3 + 1]) || isNaN(positions[i3 + 2])) {
        // Reset entire particle to valid state
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 25 + Math.pow(Math.random(), 1.5) * 60;
        positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
        positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
        positions[i3 + 2] = -Math.random() * 450;
        continue;
      }

      const particleZ = positions[i3 + 2];

      // If particle is behind camera, reset it ahead
      if (particleZ > state.camera.position.z + 50) {
        positions[i3 + 2] -= 500;
      }

      // If particle is too far ahead, reset it behind
      if (particleZ < state.camera.position.z - 450) {
        positions[i3 + 2] += 500;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Subtle rotation for visual interest
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.02;
  });

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}

interface HeroParticleSystemProps {
  starOpacity?: number;
  className?: string;
}

/**
 * HeroParticleSystem - Dual-layer GPGPU particle system
 *
 * Combines:
 * - Layer 1 (z-index: 2): White star particles - Subtle background tunnel
 * - Layer 2 (z-index: 3): GPGPU pattern particles - Interactive foreground formations
 *
 * Features:
 * - Interactive GPGPU particles with mouse attraction force
 * - Dynamic pattern formation (cloud → sphere → torus → helix)
 * - Velocity-based colors (blue → purple → pink)
 * - Continuous zoom scroll (accelerating throughout page)
 * - White stars as subtle depth reference
 * - Mouse parallax camera movement
 * - Infinite tunnel with particle recycling
 * - 11,000-51,000 total particles (adaptive)
 *
 * @example
 * ```tsx
 * <HeroParticleSystem />
 *
 * // Customized
 * <HeroParticleSystem
 *   starOpacity={0.5}
 * />
 * ```
 */
export default function HeroParticleSystem({
  starOpacity = 0.2, // Reduced so GPGPU particles dominate
  className = '',
}: HeroParticleSystemProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userScrolled, setUserScrolled] = useState(false); // NEW: Track user scroll
  const rafRef = useRef<number | null>(null);

  // Scroll handler with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Detect user scroll (threshold: 50px)
      if (scrollTop > 50) {
        setUserScrolled(true);
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        // Calculate scroll progress (0-1)
        const maxScroll = documentHeight - windowHeight;
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

        setScrollProgress(progress);
      });
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Mouse parallax handler
  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return; // Disable mouse parallax on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized mouse position (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = -(e.clientY / window.innerHeight) + 0.5;

      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`hero-particle-system ${className}`}>
      {/* Layer 1: White Star Particles with Zoom Scroll (Background) */}
      <div
        className="hero-stars-layer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: starOpacity,
          willChange: 'transform',
        }}
      >
        <Canvas
          camera={{
            position: [0, 0, 0],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        >
          <HeroStarParticles scrollProgress={scrollProgress} mousePosition={mousePosition} />
          <ambientLight intensity={0.2} />
        </Canvas>
      </div>

      {/* Layer 2: GPGPU Pattern Particles (Interactive Foreground) */}
      <GPGPUPatternParticles
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
        userScrolled={userScrolled}
        className="hero-gpgpu-layer"
      />

      <style jsx>{`
        .hero-particle-system {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .hero-stars-layer {
          z-index: 2;
        }

        :global(.hero-gpgpu-layer) {
          z-index: 3;
        }
      `}</style>
    </div>
  );
}
