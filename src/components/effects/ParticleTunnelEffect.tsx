'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TunnelParticlesProps {
  scrollProgress: number;
  isActive: boolean;
}

function TunnelParticles({ scrollProgress, isActive }: TunnelParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1500;
  const tunnelRadius = 15;
  const tunnelDepth = 150;

  // Generate cylindrical tunnel particles
  const [positions, colors, velocities] = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical distribution around center
      const angle = Math.random() * Math.PI * 2;
      const radius = tunnelRadius + (Math.random() - 0.5) * 5; // Slight variation
      const depth = Math.random() * tunnelDepth;

      // X, Y form circle, Z is depth
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -depth; // Negative Z = into screen

      // Color gradient by depth (white → blue → purple)
      const depthRatio = depth / tunnelDepth;
      if (depthRatio < 0.3) {
        // Near: bright white/blue
        colors[i * 3] = 0.8 + 0.2 * (1 - depthRatio / 0.3);     // R
        colors[i * 3 + 1] = 0.9 + 0.1 * (1 - depthRatio / 0.3); // G
        colors[i * 3 + 2] = 1.0;                                 // B
      } else if (depthRatio < 0.7) {
        // Mid: cyan/purple
        const midProgress = (depthRatio - 0.3) / 0.4;
        colors[i * 3] = 0.5 + 0.3 * midProgress;     // R
        colors[i * 3 + 1] = 0.4 - 0.2 * midProgress; // G
        colors[i * 3 + 2] = 0.95;                    // B
      } else {
        // Far: deep purple/navy
        const farProgress = (depthRatio - 0.7) / 0.3;
        colors[i * 3] = 0.4 - 0.2 * farProgress;     // R
        colors[i * 3 + 1] = 0.2 - 0.1 * farProgress; // G
        colors[i * 3 + 2] = 0.6 - 0.3 * farProgress; // B
      }

      // Individual velocities for organic feel
      velocities[i] = 0.5 + Math.random() * 0.5;
    }

    return [positions, colors, velocities];
  }, []);

  // Animate tunnel: particles move toward camera
  useFrame((_, delta) => {
    if (!pointsRef.current || !isActive) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const baseSpeed = scrollProgress * 80; // Scroll controls speed

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Move particle forward (positive Z)
      positions[i3 + 2] += velocities[i] * baseSpeed * delta;

      // Recycle: if particle passed camera, reset to far back
      if (positions[i3 + 2] > 10) {
        positions[i3 + 2] = -tunnelDepth;

        // Slight randomization on reset for variety
        const angle = Math.random() * Math.PI * 2;
        const radius = tunnelRadius + (Math.random() - 0.5) * 5;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Create geometry with buffer attributes
  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.8}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending} // Warp speed glow
      />
    </points>
  );
}

interface ParticleTunnelEffectProps {
  className?: string;
}

export function ParticleTunnelEffect({ className = '' }: ParticleTunnelEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is visible if any part is on screen
      const visible = rect.top < windowHeight && rect.bottom > 0;
      setIsActive(visible);

      // Calculate progress: 0 = section at bottom of viewport, 1 = section at top
      const sectionHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + windowHeight)));

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Camera Z position based on scroll
  const cameraZ = scrollProgress * 60; // Move camera forward into tunnel

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: '150vh' }} // Tall section for scroll range
    >
      {/* Three.js Canvas - Fixed position */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Canvas
          camera={{
            position: [0, 0, cameraZ],
            fov: 75,
            near: 0.1,
            far: 200,
          }}
          style={{ background: 'transparent' }}
        >
          <TunnelParticles scrollProgress={scrollProgress} isActive={isActive} />

          {/* Optional ambient light for subtle illumination */}
          <ambientLight intensity={0.2} />
        </Canvas>
      </div>

      {/* Optional text overlay in tunnel */}
      {scrollProgress > 0.3 && scrollProgress < 0.7 && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 1,
            opacity: scrollProgress > 0.5 ? 1 - ((scrollProgress - 0.5) / 0.2) : (scrollProgress - 0.3) / 0.2,
          }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-white/90 text-center px-6">
            Diving deeper...
          </h2>
        </div>
      )}
    </div>
  );
}
