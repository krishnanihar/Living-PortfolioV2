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

// Tour-specific formations (all ring-based for elegant framing)
enum TourPattern {
  RING = 0,           // Default ring (same as initial)
  JOURNEY_RING = 1,   // Ring with vertical wave
  WORK_RING = 2,      // Ring with breathing pulse
  CONNECT_RING = 3,   // Ring with inward glow pulse
}

// Tour step colors - blue → purple → pink
const TOUR_COLORS = {
  0: { slow: '#1E40AF', medium: '#3B82F6', fast: '#60A5FA' },   // Journey: Blue
  1: { slow: '#5B21B6', medium: '#8B5CF6', fast: '#A78BFA' },   // Work: Purple
  2: { slow: '#9D174D', medium: '#EC4899', fast: '#F472B6' },   // Connect: Pink
};

// Get adaptive particle count
function getGPGPUParticleCount(): number {
  if (typeof window === 'undefined') return 30000;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pixelRatio = window.devicePixelRatio || 1;
  const isHighDPI = pixelRatio > 2;
  const cores = navigator.hardwareConcurrency || 4;

  // Adaptive counts for GPGPU particles
  if (isMobile && isHighDPI) return 5000;   // iPhone 13 Pro
  if (isMobile) return 8000;                 // Standard mobile
  if (cores <= 4) return 12000;              // Low-end desktop
  if (isHighDPI) return 20000;               // Retina displays
  return 25000;                              // High-end desktop
}

// Get responsive particle size based on screen width
// Scaled up ~50% for bolder visual statement
function getResponsiveParticleSize(): number {
  if (typeof window === 'undefined') return 1.5;

  const width = window.innerWidth;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return width < 400 ? 2.7 : 2.1;  // was 1.8, 1.4
  }

  if (width < 768) return 2.25;      // Tablet (was 1.5)
  if (width < 1280) return 1.95;     // 13-14" laptop (was 1.3)
  if (width < 1440) return 1.8;      // 15" laptop (was 1.2)
  if (width < 1920) return 1.5;      // 24" desktop - baseline (was 1.0)
  if (width < 2560) return 1.35;     // 27" desktop (was 0.9)
  return 1.3;                         // 32" desktop+ (was 0.85)
}

interface GPGPUParticlesProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  userScrolled: boolean;
  isDarkMode: boolean;
  // Tour state
  isTourActive?: boolean;
  tourStep?: number;
  tourMorphProgress?: number;
}

function GPGPUParticles({
  scrollProgress,
  mousePosition,
  userScrolled,
  isDarkMode,
  isTourActive = false,
  tourStep = 0,
  tourMorphProgress = 0,
}: GPGPUParticlesProps) {
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
      const rangeProgress = (progress - 0.20) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    if (progress < 0.40) {
      const rangeProgress = (progress - 0.35) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    if (progress < 0.60) {
      const rangeProgress = (progress - 0.55) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    if (progress < 0.80) {
      const rangeProgress = (progress - 0.75) / 0.05;
      return Math.max(0, Math.min(1, rangeProgress));
    }
    return 1.0;
  };

  // Generate initial particle positions and attributes with single ring
  const { geometry, initialPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const randomSeeds = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);
    const initialPositions = new Float32Array(particleCount * 3);

    // Initialize particles in single ring (64-76 units radius)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 64 + Math.random() * 12; // Single ring: 64-76 units

      // Position in ring
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = -120 + (Math.random() - 0.5) * 15;

      // Store initial positions
      initialPositions[i3] = positions[i3];
      initialPositions[i3 + 1] = positions[i3 + 1];
      initialPositions[i3 + 2] = positions[i3 + 2];

      // Initialize target (same as initial)
      targetPositions[i3] = positions[i3];
      targetPositions[i3 + 1] = positions[i3 + 1];
      targetPositions[i3 + 2] = positions[i3 + 2];

      // Gentle orbital velocity (subtle movement)
      const orbitalSpeed = 0.01 + Math.random() * 0.02;
      velocities[i3] = -Math.sin(angle) * orbitalSpeed;
      velocities[i3 + 1] = Math.cos(angle) * orbitalSpeed;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01; // Slight Z drift

      randomSeeds[i] = Math.random();
      lifetimes[i] = 0.5 + Math.random() * 0.5;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geom.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geom.setAttribute('randomSeed', new THREE.BufferAttribute(randomSeeds, 1));
    geom.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

    // Set manual bounding sphere to prevent NaN computation errors
    geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -120), 1000);

    return { geometry: geom, initialPositions };
  }, [particleCount]);

  // Create shader material with theme-aware dual color palettes
  const material = useMemo(() => {
    const responsiveSize = getResponsiveParticleSize();
    // Slightly larger particles in light mode (vibrant colors don't need huge size)
    const themeSize = isDarkMode ? responsiveSize : responsiveSize * 1.3;

    // Theme-aware color palettes
    // Dark mode: Vibrant colors with additive blending (glow effect)
    // Light mode: Vibrant saturated colors for visual appeal on white background
    const coolPalette = isDarkMode
      ? { slow: '#1E40AF', medium: '#06B6D4', fast: '#F0F9FF' }  // Deep Blue → Cyan → Near White
      : { slow: '#1E40AF', medium: '#0EA5E9', fast: '#06B6D4' }; // Deep Blue → Sky → Cyan

    const warmPalette = isDarkMode
      ? { slow: '#3B82F6', medium: '#8B5CF6', fast: '#EC4899' }  // Blue → Purple → Pink
      : { slow: '#7C3AED', medium: '#A855F7', fast: '#EC4899' }; // Violet → Purple → Pink

    // Alpha multiplier: higher for light mode to compensate for low base alpha
    const alphaMultiplier = isDarkMode ? 1.0 : 2.5;

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: themeSize },
        uScrollProgress: { value: 0 },
        uAlphaMultiplier: { value: alphaMultiplier },
        // Cool palette
        uColorSlowCool: { value: new THREE.Color(coolPalette.slow) },
        uColorMediumCool: { value: new THREE.Color(coolPalette.medium) },
        uColorFastCool: { value: new THREE.Color(coolPalette.fast) },
        // Warm palette
        uColorSlowWarm: { value: new THREE.Color(warmPalette.slow) },
        uColorMediumWarm: { value: new THREE.Color(warmPalette.medium) },
        uColorFastWarm: { value: new THREE.Color(warmPalette.fast) },
      },
      vertexShader: gpgpuVertexShader,
      fragmentShader: gpgpuFragmentShader,
      transparent: true,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthTest: true,
      depthWrite: false,
      toneMapped: false, // Allow HDR colors for better bloom
    });
  }, [isDarkMode]);

  // Pattern target position calculators (camera-relative, depth -120)
  const calculateSpherePosition = (index: number, cameraZ: number, radius: number = 60): THREE.Vector3 => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const i = index / particleCount;
    const theta = 2 * Math.PI * i * goldenRatio;
    const phi = Math.acos(1 - 2 * i);

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi) + cameraZ - 120
    );
  };

  const calculateTorusPosition = (index: number, cameraZ: number, majorRadius: number = 50, minorRadius: number = 20): THREE.Vector3 => {
    const u = (index / particleCount) * Math.PI * 2;
    const v = ((index * 7) % particleCount) / particleCount * Math.PI * 2;

    return new THREE.Vector3(
      (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u),
      (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u),
      minorRadius * Math.sin(v) + cameraZ - 120
    );
  };

  const calculateHelixPosition = (index: number, cameraZ: number, radius: number = 40, pitch: number = 0.3): THREE.Vector3 => {
    const t = (index / particleCount) * Math.PI * 10;

    return new THREE.Vector3(
      radius * Math.cos(t),
      radius * Math.sin(t),
      t * pitch + cameraZ - 120
    );
  };

  // ============================================
  // Tour-specific formation calculators (Ring-based framing)
  // All formations elegantly frame the tour card like the hero ring
  // ============================================

  // Journey step: Ring with subtle vertical wave
  const calculateJourneyRingPosition = (index: number, time: number): THREE.Vector3 => {
    const angle = (index / particleCount) * Math.PI * 2;
    const baseRadius = 55 + (index % 100) / 100 * 10; // 55-65 units (deterministic spread)

    // Subtle vertical wave - representing timeline/growth
    const verticalWave = Math.sin(angle * 2 + time * 0.5) * 3;

    return new THREE.Vector3(
      Math.cos(angle) * baseRadius,
      Math.sin(angle) * baseRadius + verticalWave,
      -120
    );
  };

  // Work step: Ring with gentle breathing pulse
  const calculateWorkRingPosition = (index: number, time: number): THREE.Vector3 => {
    const angle = (index / particleCount) * Math.PI * 2;
    const baseRadius = 55 + (index % 100) / 100 * 10; // 55-65 units

    // Gentle breathing (8% radius pulse) - representing expanding portfolio
    const breathe = 1 + Math.sin(time * 0.8) * 0.08;
    const radius = baseRadius * breathe;

    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      -120
    );
  };

  // Connect step: Ring with inward glow pulse
  const calculateConnectRingPosition = (index: number, time: number): THREE.Vector3 => {
    const angle = (index / particleCount) * Math.PI * 2;
    const baseRadius = 55 + (index % 100) / 100 * 10; // 55-65 units

    // Inward pulse toward center - representing connection/coming together
    const inwardPulse = Math.sin(time * 1.2 + angle) * 4;
    const radius = baseRadius - inwardPulse;

    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      -120
    );
  };

  // Get tour formation target based on current step (all ring-based)
  const getTourTarget = (index: number, step: number, time: number): THREE.Vector3 => {
    switch (step) {
      case 0: // Journey - Blue ring with vertical wave
        return calculateJourneyRingPosition(index, time);
      case 1: // Work - Purple ring with breathing
        return calculateWorkRingPosition(index, time);
      case 2: // Connect - Pink ring with inward pulse
        return calculateConnectRingPosition(index, time);
      default:
        return calculateJourneyRingPosition(index, time);
    }
  };

  // Animation loop with scroll-reactive behavior
  useFrame(({ clock, camera }) => {
    if (!pointsRef.current) return;

    // Early return if camera position has NaN values
    if (isNaN(camera.position.x) || isNaN(camera.position.y) || isNaN(camera.position.z)) {
      camera.position.set(0, 0, 0);
      return;
    }

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

    // Camera zoom
    const zoomSpeed = 1 + scrollProgress * 2;
    const targetCameraZ = scrollProgress * 300 * zoomSpeed;

    const targetCameraX = mousePosition.x * 3;
    const targetCameraY = mousePosition.y * 3;

    camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
    camera.position.x += (targetCameraX - camera.position.x) * 0.05;
    camera.position.y += (targetCameraY - camera.position.y) * 0.05;

    // Update particles with scroll-reactive forces
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      let target: THREE.Vector3;
      let effectiveMorphProgress: number;

      // Tour mode: Use tour formations
      if (isTourActive) {
        target = getTourTarget(i, tourStep, time);
        effectiveMorphProgress = tourMorphProgress;
      } else {
        // Normal scroll mode: Use pattern formations
        const currentPattern = getCurrentPattern(scrollProgress);
        effectiveMorphProgress = getMorphProgress(scrollProgress);

        // Calculate target based on pattern (camera-relative)
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
            target = new THREE.Vector3(
              initialPositions[i3],
              initialPositions[i3 + 1],
              initialPositions[i3 + 2] + camera.position.z
            );
        }
      }

      targetPositions[i3] = target.x;
      targetPositions[i3 + 1] = target.y;
      targetPositions[i3 + 2] = target.z;

      // Flow field force (optimized: only every 3rd particle)
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

      // Stronger attraction during tour for snappier formations
      const baseAttractionStrength = isTourActive ? 0.04 : 0.02;
      const attractionStrength = baseAttractionStrength * Math.max(0.3, effectiveMorphProgress);

      velocities[i3] += fx + dx * attractionStrength;
      velocities[i3 + 1] += fy + dy * attractionStrength;
      velocities[i3 + 2] += fz + dz * attractionStrength;

      // Mouse attraction force
      const mouseWorldX = mousePosition.x * 100 + camera.position.x;
      const mouseWorldY = mousePosition.y * 100 + camera.position.y;
      const mouseWorldZ = camera.position.z;

      const mouseDistX = mouseWorldX - positions[i3];
      const mouseDistY = mouseWorldY - positions[i3 + 1];
      const mouseDistZ = mouseWorldZ - positions[i3 + 2];
      const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY + mouseDistZ * mouseDistZ);

      const mouseAttractionRadius = 150;
      const mouseAttractionStrength = 0.03;

      if (mouseDist < mouseAttractionRadius && mouseDist > 0.1) {
        const mouseForce = mouseAttractionStrength / (mouseDist + 1);
        velocities[i3] += (mouseDistX / mouseDist) * mouseForce;
        velocities[i3 + 1] += (mouseDistY / mouseDist) * mouseForce;
        velocities[i3 + 2] += (mouseDistZ / mouseDist) * mouseForce;
      }

      // Standard damping
      velocities[i3] *= 0.97;
      velocities[i3 + 1] *= 0.97;
      velocities[i3 + 2] *= 0.97;

      // Update position (all phases)
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Update lifetime (gentle pulse)
      lifetimes[i] = 0.7 + Math.sin(time * 2 + i * 0.01) * 0.3;
    }

    // Particle recycling for infinite tunnel effect
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Check ALL position components for NaN
      const hasNaN = isNaN(positions[i3]) || isNaN(positions[i3 + 1]) || isNaN(positions[i3 + 2]) ||
                     isNaN(velocities[i3]) || isNaN(velocities[i3 + 1]) || isNaN(velocities[i3 + 2]);

      if (hasNaN) {
        // Reset particle to valid state with single ring radius
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 64 + Math.random() * 12; // Single ring: 64-76

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
        positions[i3 + 2] = camera.position.z - 120 + (Math.random() - 0.5) * 15;
        velocities[i3] = 0;
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = 0;
        continue;
      }

      const particleZ = positions[i3 + 2];

      if (particleZ > camera.position.z + 50) {
        positions[i3 + 2] = camera.position.z - 700 - Math.random() * 100;
      }

      if (particleZ < camera.position.z - 800) {
        positions[i3 + 2] = camera.position.z - 200 - Math.random() * 100;
      }
    }

    // Mark attributes as updated
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.targetPosition.needsUpdate = true;
    geometry.attributes.lifetime.needsUpdate = true;
  });

  // Enhanced bloom intensity for bolder glow
  const bloomIntensity = 0.7;

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

      {/* Bloom effect - enhanced for bold glow */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.15}
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
  userScrolled: boolean;
  isDarkMode: boolean;
  className?: string;
  // Tour state
  isTourActive?: boolean;
  tourStep?: number;
  tourMorphProgress?: number;
}

/**
 * GPGPUPatternParticles - GPU-accelerated 3-phase cinematic particle system
 *
 * Features:
 * - Phase 1 (0-2s): CHAOS - Explosive vortex filling screen
 * - Phase 2 (2-4s): CONVERGE - Ring formation framing hero text
 * - Phase 3 (4s+): SCROLL - Pattern morphing + camera zoom
 * - 5,000-25,000 particles (adaptive)
 * - Interactive mouse attraction
 * - Velocity-based colors (blue → purple → pink)
 * - Dynamic bloom intensity (0.8 → 0.4)
 */
export default function GPGPUPatternParticles({
  scrollProgress,
  mousePosition,
  userScrolled = false,
  isDarkMode,
  className = '',
  isTourActive = false,
  tourStep = 0,
  tourMorphProgress = 0,
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
        <GPGPUParticles
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
          userScrolled={userScrolled}
          isDarkMode={isDarkMode}
          isTourActive={isTourActive}
          tourStep={tourStep}
          tourMorphProgress={tourMorphProgress}
        />
      </Canvas>
    </div>
  );
}
