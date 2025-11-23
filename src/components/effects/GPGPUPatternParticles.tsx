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

  // Adaptive counts for GPGPU particles (50% reduction for performance)
  if (isMobile && isHighDPI) return 5000;   // iPhone 13 Pro
  if (isMobile) return 8000;                 // Standard mobile
  if (cores <= 4) return 12000;              // Low-end desktop
  if (isHighDPI) return 20000;               // Retina displays
  return 25000;                              // High-end desktop
}

// Get responsive particle size based on screen width
function getResponsiveParticleSize(): number {
  if (typeof window === 'undefined') return 1.0;

  const width = window.innerWidth;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Scale particles inversely with screen width
  // Smaller screens need LARGER particles for visibility
  // Larger screens can use SMALLER particles for refinement

  if (isMobile) {
    // Mobile devices: 1.4-1.8x larger
    return width < 400 ? 1.8 : 1.4;
  }

  // Desktop/laptop scaling
  if (width < 768) return 1.5;       // Tablet (768px)
  if (width < 1280) return 1.3;      // 13-14" laptop (1280px)
  if (width < 1440) return 1.2;      // 15" laptop (1440px)
  if (width < 1920) return 1.0;      // 24" desktop (1920px) - baseline
  if (width < 2560) return 0.9;      // 27" desktop (2560px)
  return 0.85;                        // 32" desktop+ (2560px+)
}

interface GPGPUParticlesProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

function GPGPUParticles({ scrollProgress, mousePosition }: GPGPUParticlesProps) {
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
      positions[i3 + 2] = -200 - Math.random() * 500; // Extended depth for zoom tunnel (-200 to -700)

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
    const responsiveSize = getResponsiveParticleSize();

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: responsiveSize },
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

  // Pattern target position calculators (camera-relative)
  const calculateSpherePosition = (index: number, cameraZ: number, radius: number = 60): THREE.Vector3 => {
    // Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const i = index / particleCount;
    const theta = 2 * Math.PI * i * goldenRatio;
    const phi = Math.acos(1 - 2 * i);

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi) + cameraZ - 150 // 150 units ahead of camera
    );
  };

  const calculateTorusPosition = (index: number, cameraZ: number, majorRadius: number = 50, minorRadius: number = 20): THREE.Vector3 => {
    const u = (index / particleCount) * Math.PI * 2;
    const v = ((index * 7) % particleCount) / particleCount * Math.PI * 2;

    return new THREE.Vector3(
      (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u),
      (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u),
      minorRadius * Math.sin(v) + cameraZ - 150 // 150 units ahead of camera
    );
  };

  const calculateHelixPosition = (index: number, cameraZ: number, radius: number = 40, pitch: number = 0.3): THREE.Vector3 => {
    const t = (index / particleCount) * Math.PI * 10; // 5 full rotations

    return new THREE.Vector3(
      radius * Math.cos(t),
      radius * Math.sin(t),
      t * pitch + cameraZ - 150 // 150 units ahead of camera
    );
  };

  // Animation loop with pattern morphing and physics
  useFrame(({ clock, camera }) => {
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

    // Camera zoom effect: synchronized with white star particles
    // Accelerating zoom throughout entire page
    const zoomSpeed = 1 + scrollProgress * 2; // 1x → 3x speed (accelerating)
    const targetCameraZ = scrollProgress * 300 * zoomSpeed; // 0 → 900 units

    // Mouse parallax (subtle, matching stars)
    const targetCameraX = mousePosition.x * 3;
    const targetCameraY = mousePosition.y * 3;

    // Smooth camera movement with easing
    camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
    camera.position.x += (targetCameraX - camera.position.x) * 0.05;
    camera.position.y += (targetCameraY - camera.position.y) * 0.05;

    // Get current pattern and morph progress
    const currentPattern = getCurrentPattern(scrollProgress);
    const morphProgress = getMorphProgress(scrollProgress);

    // Update target positions based on pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Calculate target based on current pattern (camera-relative)
      let target: THREE.Vector3;
      switch (currentPattern) {
        case Pattern.SPHERE:
          target = calculateSpherePosition(i, camera.position.z);
          break;
        case Pattern.TORUS:
          target = calculateTorusPosition(i, camera.position.z);
          break;
        case Pattern.HELIX:
          target = calculateHelixPosition(i, camera.position.z);
          break;
        case Pattern.CLOUD:
        default:
          // Random cloud position (camera-relative)
          target = new THREE.Vector3(
            initialPositions[i3],
            initialPositions[i3 + 1],
            initialPositions[i3 + 2] + camera.position.z
          );
      }

      targetPositions[i3] = target.x;
      targetPositions[i3 + 1] = target.y;
      targetPositions[i3 + 2] = target.z;

      // Flow field force (simplex noise) - optimized: only every 3rd particle
      let fx = 0, fy = 0, fz = 0;
      if (i % 3 === 0) {
        const noiseScale = 0.01;
        const timeScale = time * 0.1;

        fx = noise3D(
          positions[i3] * noiseScale,
          positions[i3 + 1] * noiseScale,
          timeScale
        ) * 0.05;

        fy = noise3D(
          positions[i3] * noiseScale + 100,
          positions[i3 + 1] * noiseScale + 100,
          timeScale
        ) * 0.05;

        fz = noise3D(
          positions[i3] * noiseScale + 200,
          positions[i3 + 1] * noiseScale + 200,
          timeScale
        ) * 0.05;
      }

      // Attraction to target position
      const dx = targetPositions[i3] - positions[i3];
      const dy = targetPositions[i3 + 1] - positions[i3 + 1];
      const dz = targetPositions[i3 + 2] - positions[i3 + 2];

      const attractionStrength = 0.02 * morphProgress;

      // Update velocity with flow field and pattern attraction
      velocities[i3] += fx + dx * attractionStrength;
      velocities[i3 + 1] += fy + dy * attractionStrength;
      velocities[i3 + 2] += fz + dz * attractionStrength;

      // Mouse attraction force
      // Convert normalized mouse position (-0.5 to 0.5) to camera-relative world space
      const mouseWorldX = mousePosition.x * 100 + camera.position.x; // Relative to camera
      const mouseWorldY = mousePosition.y * 100 + camera.position.y; // Relative to camera
      const mouseWorldZ = camera.position.z; // Mouse is at camera's front plane

      const mouseDistX = mouseWorldX - positions[i3];
      const mouseDistY = mouseWorldY - positions[i3 + 1];
      const mouseDistZ = mouseWorldZ - positions[i3 + 2];
      const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY + mouseDistZ * mouseDistZ);

      const mouseAttractionRadius = 150; // Only attract particles within 150 units
      const mouseAttractionStrength = 0.03; // Gentle pull

      if (mouseDist < mouseAttractionRadius && mouseDist > 0.1) {
        const mouseForce = mouseAttractionStrength / (mouseDist + 1);
        velocities[i3] += (mouseDistX / mouseDist) * mouseForce;
        velocities[i3 + 1] += (mouseDistY / mouseDist) * mouseForce;
        velocities[i3 + 2] += (mouseDistZ / mouseDist) * mouseForce;
      }

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

    // Particle recycling for infinite tunnel effect
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const particleZ = positions[i3 + 2];

      // If particle is behind camera, reset it far ahead
      if (particleZ > camera.position.z + 50) {
        positions[i3 + 2] = camera.position.z - 700 - Math.random() * 100; // -700 to -800 ahead
      }

      // If particle is too far ahead, reset it closer
      if (particleZ < camera.position.z - 800) {
        positions[i3 + 2] = camera.position.z - 200 - Math.random() * 100; // -200 to -300 ahead
      }
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
          intensity={0.4}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

interface GPGPUPatternParticlesProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  className?: string;
}

/**
 * GPGPUPatternParticles - GPU-accelerated pattern-forming particle system
 *
 * Features:
 * - 10,000-50,000 particles (adaptive)
 * - Interactive mouse attraction force
 * - Dynamic pattern formation: Cloud → Sphere → Torus → Helix → Cloud
 * - Velocity-based colors (blue → purple → pink)
 * - Flow field physics with simplex noise
 * - Bloom post-processing
 * - Smooth morphing between patterns
 */
export default function GPGPUPatternParticles({
  scrollProgress,
  mousePosition,
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
        camera={{ position: [0, 0, 0], fov: 50, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      >
        <GPGPUParticles scrollProgress={scrollProgress} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
