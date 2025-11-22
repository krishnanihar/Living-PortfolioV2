'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shimmerVertexShader, shimmerFragmentShader } from '@/shaders/gladeye';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';

// Determine particle count based on device capabilities
function getParticleCount(): number {
  if (typeof window === 'undefined') return 1800;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const pixelRatio = window.devicePixelRatio || 1;
  const isHighDPI = pixelRatio > 2;

  // Adaptive particle count for performance (further reduced for ultra-minimal aesthetic)
  if (isMobile && isHighDPI) return 600; // iPhone 13 Pro, etc.
  if (isMobile) return 900; // Standard mobile
  if (isHighDPI) return 1500; // Retina displays
  return 1800; // Standard desktop
}

interface GladeyeParticlesProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

function GladeyeParticles({ scrollProgress, mousePosition }: GladeyeParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = useMemo(() => getParticleCount(), []);

  // Generate particle geometry with custom attributes
  const { geometry, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const randomOffsets = new Float32Array(particleCount);
    const twinklePhases = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);

    // Spherical distribution with power clustering for elegant effect
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Fibonacci sphere distribution for even coverage
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radiusVariance = Math.pow(Math.random(), 1.5); // Power for clustering
      const radius = 25 + radiusVariance * 60;

      // Position in 3D space
      positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      positions[i3 + 2] = -Math.random() * 450; // Extended depth for long tunnel

      // Store original positions for recycling
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      // Custom attributes for shader
      randomOffsets[i] = Math.random() * Math.PI * 2;
      twinklePhases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 1));
    geo.setAttribute('twinklePhase', new THREE.BufferAttribute(twinklePhases, 1));

    return { geometry: geo, originalPositions };
  }, [particleCount]);

  // Create shader material
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
        // Pure white for elegant star-like particles
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

  // Animation loop with scroll and mouse integration
  useFrame((state) => {
    if (!pointsRef.current) return;

    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Update shader uniforms
    mat.uniforms.time.value = state.clock.elapsedTime;
    mat.uniforms.scrollProgress.value = scrollProgress;

    // Camera movement: travel through particle field during hero, then freeze
    // Threshold: 15% scroll (end of hero section) = stationary background
    const STATIC_THRESHOLD = 0.15;
    const targetCameraZ = scrollProgress < STATIC_THRESHOLD
      ? scrollProgress * 200 // Move during hero
      : STATIC_THRESHOLD * 200; // Freeze at threshold (30 units)

    // Mouse parallax (subtle, always active for interactivity)
    const targetCameraX = mousePosition.x * 3;
    const targetCameraY = mousePosition.y * 3;

    // Smooth camera movement with easing
    state.camera.position.z += (targetCameraZ - state.camera.position.z) * 0.08;
    state.camera.position.x += (targetCameraX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetCameraY - state.camera.position.y) * 0.05;

    // Particle recycling for infinite tunnel effect
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
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

    // Very subtle rotation for visual interest (time-based only, no scroll acceleration)
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

export function GladeyeParticleScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const narrativeState = useWorkNarrativeProgress();

  // Scroll handler with requestAnimationFrame for performance
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

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

  // Calculate opacity based on content type
  const containerOpacity = narrativeState.contentType === 'transition' ? 1 : 0.3;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        contain: 'layout style paint',
        willChange: 'transform',
        opacity: containerOpacity,
        transition: 'opacity 0.8s ease-in-out',
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
        dpr={Math.min(window.devicePixelRatio || 1, 2)} // Cap pixel ratio for performance
      >
        <GladeyeParticles scrollProgress={scrollProgress} mousePosition={mousePosition} />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  );
}
