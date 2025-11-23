'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
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

  if (isMobile) {
    return width < 400 ? 1.8 : 1.4;
  }

  if (width < 768) return 1.5;       // Tablet
  if (width < 1280) return 1.3;      // 13-14" laptop
  if (width < 1440) return 1.2;      // 15" laptop
  if (width < 1920) return 1.0;      // 24" desktop - baseline
  if (width < 2560) return 0.9;      // 27" desktop
  return 0.85;                        // 32" desktop+
}

interface GPGPUParticlesProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  userScrolled: boolean;
}

function GPGPUParticles({ scrollProgress, mousePosition, userScrolled }: GPGPUParticlesProps) {
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

  // Generate initial particle positions and attributes
  const { geometry, initialPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const randomSeeds = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);
    const initialPositions = new Float32Array(particleCount * 3);

    // Initialize particles directly in ring formation around hero
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Ring formation calculation
      const angle = (i / particleCount) * Math.PI * 2;
      const radiusVariation = 55 + (Math.random() - 0.5) * 8; // 51-59 radius
      const depthVariation = (Math.random() - 0.5) * 15;

      // Position in ring around hero text
      positions[i3] = Math.cos(angle) * radiusVariation;
      positions[i3 + 1] = Math.sin(angle) * radiusVariation;
      positions[i3 + 2] = -150 + depthVariation; // Hero text depth

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
        // Color palette
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
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const i = index / particleCount;
    const theta = 2 * Math.PI * i * goldenRatio;
    const phi = Math.acos(1 - 2 * i);

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi) + cameraZ - 150
    );
  };

  const calculateTorusPosition = (index: number, cameraZ: number, majorRadius: number = 50, minorRadius: number = 20): THREE.Vector3 => {
    const u = (index / particleCount) * Math.PI * 2;
    const v = ((index * 7) % particleCount) / particleCount * Math.PI * 2;

    return new THREE.Vector3(
      (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u),
      (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u),
      minorRadius * Math.sin(v) + cameraZ - 150
    );
  };

  const calculateHelixPosition = (index: number, cameraZ: number, radius: number = 40, pitch: number = 0.3): THREE.Vector3 => {
    const t = (index / particleCount) * Math.PI * 10;

    return new THREE.Vector3(
      radius * Math.cos(t),
      radius * Math.sin(t),
      t * pitch + cameraZ - 150
    );
  };

  // Animation loop with scroll-reactive behavior
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

      // Get current pattern and morph progress
      const currentPattern = getCurrentPattern(scrollProgress);
      const morphProgress = getMorphProgress(scrollProgress);

      // Calculate target based on pattern (camera-relative)
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
          target = new THREE.Vector3(
            initialPositions[i3],
            initialPositions[i3 + 1],
            initialPositions[i3 + 2] + camera.position.z
          );
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

      const attractionStrength = 0.02 * morphProgress;

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

    // Particle recycling (SCROLL phase only - infinite tunnel)
    if (introPhase === IntroPhase.SCROLL) {
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const particleZ = positions[i3 + 2];

        if (particleZ > camera.position.z + 50) {
          positions[i3 + 2] = camera.position.z - 700 - Math.random() * 100;
        }

        if (particleZ < camera.position.z - 800) {
          positions[i3 + 2] = camera.position.z - 200 - Math.random() * 100;
        }
      }
    }

    // Mark attributes as updated
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.targetPosition.needsUpdate = true;
    geometry.attributes.lifetime.needsUpdate = true;
  });

  // Dynamic bloom intensity based on intro phase
  const bloomIntensity = useMemo(() => {
    if (introPhase === IntroPhase.CHAOS) return 0.8;
    if (introPhase === IntroPhase.CONVERGE) {
      const phaseProgress = phaseStartTimeRef.current > 0
        ? Math.min((Date.now() / 1000 - phaseStartTimeRef.current) / 2.0, 1.0)
        : 0;
      return 0.8 - (phaseProgress * 0.4); // 0.8 → 0.4
    }
    return 0.4; // SCROLL phase
  }, [introPhase]);

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

      {/* Bloom effect - dynamic intensity */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
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
  userScrolled: boolean; // NEW PROP
  className?: string;
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
        <GPGPUParticles
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
          userScrolled={userScrolled}
        />
      </Canvas>
    </div>
  );
}
