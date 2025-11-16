'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle colors inspired by Gladeye - vibrant and dreamy
const PARTICLE_COLORS = [
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#A855F7', // Light purple
  '#F472B6', // Light pink
  '#FBBF24', // Yellow
];

interface ParticleFieldProps {
  scrollProgress: number;
  isMobile: boolean;
}

function ParticleField({ scrollProgress, isMobile }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  // Reduce particle count on mobile for better performance
  const particleCount = isMobile ? 800 : 2000;

  // Generate particle positions and colors
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in 3D space
      // X and Y: spread across screen (-50 to 50)
      // Z: depth tunnel (-200 to 0)
      positions[i * 3] = (Math.random() - 0.5) * 100; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = Math.random() * -200; // z (tunnel depth)

      // Random color from palette
      const color = new THREE.Color(PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varying particle sizes
      sizes[i] = Math.random() * 3 + 1; // 1-4
    }

    return [positions, colors, sizes];
  }, [particleCount]);

  // Animate particles and camera based on scroll
  useFrame(({ camera }) => {
    if (!pointsRef.current) return;

    // Move camera forward through the tunnel based on scroll
    // Map scroll 0-1 to camera Z position 0 to -150
    const targetZ = scrollProgress * -150;
    camera.position.z += (targetZ - camera.position.z) * 0.1; // Smooth lerp

    // Particle recycling: move particles that passed the camera back to the end
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const particleZ = positions[i3 + 2];

      // If particle is behind camera (relative to camera movement)
      if (particleZ > camera.position.z + 10) {
        // Reset to far distance
        positions[i3 + 2] = camera.position.z - 200;
        // Randomize X and Y position for variety
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ParticleTunnelProps {
  className?: string;
}

export default function ParticleTunnel({ className = '' }: ParticleTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth < 768);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visibility
      const visible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(visible);

      // Calculate scroll progress within this section (0 to 1)
      // When section top is at bottom of viewport: 0
      // When section bottom is at top of viewport: 1
      const sectionHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + windowHeight)));

      setScrollProgress(progress);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text fade in/out based on scroll progress
  const textOpacity = useMemo(() => {
    // Fade in from 0.2 to 0.4, stay visible until 0.7, then fade out
    if (scrollProgress < 0.2) return 0;
    if (scrollProgress < 0.4) return (scrollProgress - 0.2) / 0.2;
    if (scrollProgress < 0.7) return 1;
    if (scrollProgress < 0.9) return 1 - ((scrollProgress - 0.7) / 0.2);
    return 0;
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: '150vh' }} // Taller section for more scroll range
    >
      {/* Three.js Canvas - Fixed position */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 1000 }}
            style={{ background: 'transparent' }}
          >
            <ParticleField scrollProgress={scrollProgress} isMobile={isMobile} />
          </Canvas>
        )}
      </div>

      {/* Text Overlay */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 1,
          opacity: textOpacity,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <div className="text-center px-6 max-w-4xl">
          <h2
            className="text-5xl md:text-7xl font-light mb-6"
            style={{
              fontFamily: 'var(--font-inter)',
              lineHeight: 1.2
            }}
          >
            Creative innovation
          </h2>
          <p
            className="text-3xl md:text-5xl font-light italic"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            for a <em>regenerative</em> future
          </p>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8))',
          zIndex: 2
        }}
      />
    </div>
  );
}
