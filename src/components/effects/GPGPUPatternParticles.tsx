'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { gpgpuVertexShader, gpgpuFragmentShader } from '@/shaders/gpgpu';

// Pattern types
enum Pattern {
  CLOUD = 0,
  SPHERE = 1,
  TORUS = 2,
  HELIX = 3,
}

// Get adaptive particle count
function getGPGPUParticleCount(): number {
  if (typeof window === 'undefined') return 30000;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pixelRatio = window.devicePixelRatio || 1;
  const isHighDPI = pixelRatio > 2;
  const cores = navigator.hardwareConcurrency || 4;

  // Adaptive counts for GPGPU particles
  if (isMobile && isHighDPI) return 10000;  // iPhone 13 Pro
  if (isMobile) return 15000;                // Standard mobile
  if (cores <= 4) return 25000;              // Low-end desktop
  if (isHighDPI) return 40000;               // Retina displays
  return 50000;                              // High-end desktop
}

interface GPGPUParticlesProps {
  scrollProgress: number;
}

function GPGPUParticles({ scrollProgress }: GPGPUParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = useMemo(() => getGPGPUParticleCount(), []);
  const noise3D = useMemo(() => createNoise3D(), []);

  // Calculate current pattern based on scroll
  const getCurrentPattern = (progress: number): Pattern => {
    if (progress < 0.25) return Pattern.CLOUD;
    if (progress < 0.40) return Pattern.SPHERE;
    if (progress < 0.60) return Pattern.TORUS;
    if (progress < 0.80) return Pattern.HELIX;
    return Pattern.CLOUD;
  };

  // Calculate morph progress within current pattern transition
  const getMorphProgress = (progress: number): number => {
    if (progress < 0.25) {
      // Cloud → Sphere transition
      const rangeProgress = (progress - 0.20) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    if (progress < 0.40) {
      // Sphere → Torus transition
      const rangeProgress = (progress - 0.35) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    if (progress < 0.60) {
      // Torus → Helix transition
      const rangeProgress = (progress - 0.55) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    if (progress < 0.80) {
      // Helix → Cloud transition
      const rangeProgress = (progress - 0.75) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    return 1.0;
  };

  // Generate initial particle positions and attributes
  const { geometry, initialPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const randomSeeds = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);
    const initialPositions = new Float32Array(particleCount * 3);

    // Initialize particles in random cloud
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random position in spherical volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 0.7) * 80;

      positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i3 + 2] = -Math.random() * 200 - 100; // Extended depth

      // Store initial positions
      initialPositions[i3] = positions[i3];
      initialPositions[i3 + 1] = positions[i3 + 1];
      initialPositions[i3 + 2] = positions[i3 + 2];

      // Initialize target (same as initial)
      targetPositions[i3] = positions[i3];
      targetPositions[i3 + 1] = positions[i3 + 1];
      targetPositions[i3 + 2] = positions[i3 + 2];

      // Initial velocity
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;

      randomSeeds[i] = Math.random();
      lifetimes[i] = 0.5 + Math.random() * 0.5; // 0.5-1.0
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geom.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geom.setAttribute('randomSeed', new THREE.BufferAttribute(randomSeeds, 1));
    geom.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

    return { geometry: geom, initialPositions };
  }, [particleCount]);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 2.5 },
        uScrollProgress: { value: 0 },
        // Color palette for velocity-based coloring
        uColorSlow: { value: new THREE.Color('#3B82F6') },    // Blue
        uColorMedium: { value: new THREE.Color('#8B5CF6') }, // Purple
        uColorFast: { value: new THREE.Color('#EC4899') },   // Pink
      },
      vertexShader: gpgpuVertexShader,
      fragmentShader: gpgpuFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
    });
  }, []);

  // Pattern target position calculators
  const calculateSpherePosition = (index: number, radius: number = 60): THREE.Vector3 => {
    // Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const i = index / particleCount;
    const theta = 2 * Math.PI * i * goldenRatio;
    const phi = Math.acos(1 - 2 * i);

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi) - 150
    );
  };

  const calculateTorusPosition = (index: number, majorRadius: number = 50, minorRadius: number = 20): THREE.Vector3 => {
    const u = (index / particleCount) * Math.PI * 2;
    const v = ((index * 7) % particleCount) / particleCount * Math.PI * 2;

    return new THREE.Vector3(
      (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u),
      (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u),
      minorRadius * Math.sin(v) - 150
    );
  };

  const calculateHelixPosition = (index: number, radius: number = 40, pitch: number = 0.3): THREE.Vector3 => {
    const t = (index / particleCount) * Math.PI * 10; // 5 full rotations

    return new THREE.Vector3(
      radius * Math.cos(t),
      radius * Math.sin(t),
      t * pitch - 150
    );
  };

  // Animation loop with pattern morphing and physics
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const positions = geometry.attributes.position.array as Float32Array;
    const velocities = geometry.attributes.velocity.array as Float32Array;
    const targetPositions = geometry.attributes.targetPosition.array as Float32Array;
    const lifetimes = geometry.attributes.lifetime.array as Float32Array;

    // Update shader uniforms
    if (material.uniforms) {
      material.uniforms.uTime.value = time;
      material.uniforms.uScrollProgress.value = scrollProgress;
    }

    // Get current pattern and morph progress
    const currentPattern = getCurrentPattern(scrollProgress);
    const morphProgress = getMorphProgress(scrollProgress);

    // Update target positions based on pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Calculate target based on current pattern
      let target: THREE.Vector3;
      switch (currentPattern) {
        case Pattern.SPHERE:
          target = calculateSpherePosition(i);
          break;
        case Pattern.TORUS:
          target = calculateTorusPosition(i);
          break;
        case Pattern.HELIX:
          target = calculateHelixPosition(i);
          break;
        case Pattern.CLOUD:
        default:
          // Random cloud position
          target = new THREE.Vector3(
            initialPositions[i3],
            initialPositions[i3 + 1],
            initialPositions[i3 + 2]
          );
      }

      targetPositions[i3] = target.x;
      targetPositions[i3 + 1] = target.y;
      targetPositions[i3 + 2] = target.z;

      // Flow field force (simplex noise)
      const noiseScale = 0.01;
      const timeScale = time * 0.1;

      const fx = noise3D(
        positions[i3] * noiseScale,
        positions[i3 + 1] * noiseScale,
        timeScale
      ) * 0.05;

      const fy = noise3D(
        positions[i3] * noiseScale + 100,
        positions[i3 + 1] * noiseScale + 100,
        timeScale
      ) * 0.05;

      const fz = noise3D(
        positions[i3] * noiseScale + 200,
        positions[i3 + 1] * noiseScale + 200,
        timeScale
      ) * 0.05;

      // Attraction to target position
      const dx = targetPositions[i3] - positions[i3];
      const dy = targetPositions[i3 + 1] - positions[i3 + 1];
      const dz = targetPositions[i3 + 2] - positions[i3 + 2];

      const attractionStrength = 0.02 * morphProgress;

      // Update velocity
      velocities[i3] += fx + dx * attractionStrength;
      velocities[i3 + 1] += fy + dy * attractionStrength;
      velocities[i3 + 2] += fz + dz * attractionStrength;

      // Damping
      velocities[i3] *= 0.97;
      velocities[i3 + 1] *= 0.97;
      velocities[i3 + 2] *= 0.97;

      // Update position
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Update lifetime (gentle pulse)
      lifetimes[i] = 0.7 + Math.sin(time * 2 + i * 0.01) * 0.3;
    }

    // Mark attributes as updated
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.targetPosition.needsUpdate = true;
    geometry.attributes.lifetime.needsUpdate = true;
  });

  // Cleanup
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <>
      <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />

      {/* Bloom effect for glow */}
      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

interface GPGPUPatternParticlesProps {
  scrollProgress: number;
  className?: string;
}

/**
 * GPGPUPatternParticles - GPU-accelerated pattern-forming particle system
 *
 * Features:
 * - 10,000-50,000 particles (adaptive)
 * - Dynamic pattern formation: Cloud → Sphere → Torus → Helix → Cloud
 * - Velocity-based colors (blue → purple → pink)
 * - Flow field physics with simplex noise
 * - Bloom post-processing
 * - Smooth morphing between patterns
 */
export default function GPGPUPatternParticles({
  scrollProgress,
  className = '',
}: GPGPUPatternParticlesProps) {
  // Respect reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 200], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        <GPGPUParticles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
