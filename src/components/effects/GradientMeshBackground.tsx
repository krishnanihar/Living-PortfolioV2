'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';
import { gradientMeshVertexShader, gradientMeshFragmentShader } from '@/shaders/gradientMesh';

interface GradientMeshProps {
  narrativeState: ReturnType<typeof useWorkNarrativeProgress>;
}

function GradientMesh({ narrativeState }: GradientMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Adaptive mesh density based on device capabilities
  const meshDensity = useMemo(() => {
    if (typeof window === 'undefined') return { x: 24, y: 24 };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    if (isMobile || isLowEnd) {
      return { x: 16, y: 16 }; // Low density for mobile
    }
    return { x: 40, y: 40 }; // High density for desktop
  }, []);

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(10, 10, meshDensity.x, meshDensity.y);
  }, [meshDensity]);

  // Narrative-driven colors (Red → Blue → Purple across acts)
  const colors = useMemo(() => {
    const { act, actProgress } = narrativeState;

    if (act === 'industry') {
      // Act I: Red theme (Air India)
      return {
        color1: new THREE.Color(0xDA0E29), // Brand red
        color2: new THREE.Color(0xFB923C), // Orange accent
        color3: new THREE.Color(0x991B1B), // Dark red
        color4: new THREE.Color(0xDC2626), // Medium red
      };
    }
    else if (act === 'innovation') {
      // Act II: Blue theme with smooth transition from red
      const blueMix = actProgress;
      return {
        color1: new THREE.Color().lerpColors(
          new THREE.Color(0xDA0E29), // Red
          new THREE.Color(0x0EA5E9), // Sky blue
          blueMix
        ),
        color2: new THREE.Color().lerpColors(
          new THREE.Color(0xFB923C), // Orange
          new THREE.Color(0x38BDF8), // Light blue
          blueMix
        ),
        color3: new THREE.Color().lerpColors(
          new THREE.Color(0x991B1B), // Dark red
          new THREE.Color(0x0369A1), // Dark blue
          blueMix
        ),
        color4: new THREE.Color().lerpColors(
          new THREE.Color(0xDC2626), // Medium red
          new THREE.Color(0x0284C7), // Medium blue
          blueMix
        ),
      };
    }
    else {
      // Act III: Purple theme (Foundation)
      return {
        color1: new THREE.Color(0x9333EA), // Purple
        color2: new THREE.Color(0x8B5CF6), // Light purple
        color3: new THREE.Color(0x6B21A8), // Dark purple
        color4: new THREE.Color(0x7C3AED), // Medium purple
      };
    }
  }, [narrativeState.act, narrativeState.actProgress]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNoiseFrequency: { value: 1.5 },
        uNoiseAmplitude: { value: 0.15 }, // Reduced from 0.3 for gentler movement
        uNoiseSpeed: { value: new THREE.Vector2(0.03, 0.02) }, // Slower drift for elegance
        uColor1: { value: colors.color1 },
        uColor2: { value: colors.color2 },
        uColor3: { value: colors.color3 },
        uColor4: { value: colors.color4 },
        uIntensity: { value: 0.6 },
      },
      vertexShader: gradientMeshVertexShader,
      fragmentShader: gradientMeshFragmentShader,
      transparent: false,
      side: THREE.DoubleSide,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update colors when narrative changes
  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uColor1.value = colors.color1;
    mat.uniforms.uColor2.value = colors.color2;
    mat.uniforms.uColor3.value = colors.color3;
    mat.uniforms.uColor4.value = colors.color4;
  }, [colors]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    // Very slow time progression for elegant, meditative movement
    mat.uniforms.uTime.value = state.clock.elapsedTime * 0.25;

    // Subtle intensity variation with narrative progression
    mat.uniforms.uIntensity.value = 0.15 + narrativeState.intensity * 0.15;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export function GradientMeshBackground() {
  const narrativeState = useWorkNarrativeProgress();

  // Detect reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (prefersReducedMotion) {
    // Render static gradient for reduced motion
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.15,
          background: `radial-gradient(circle at 50% 50%, ${narrativeState.color.primary.replace('0.8', '0.1')}, transparent 70%)`,
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.2,
        contain: 'layout style paint',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1}
      >
        <GradientMesh narrativeState={narrativeState} />
      </Canvas>
    </div>
  );
}
