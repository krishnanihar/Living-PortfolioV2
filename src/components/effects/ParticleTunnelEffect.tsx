'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate smooth circular particle texture
function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  // Radial gradient: bright center → soft glow → transparent edge
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface TunnelParticlesProps {
  scrollProgress: number;
  isActive: boolean;
}

function TunnelParticles({ scrollProgress, isActive }: TunnelParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500; // Optimized for performance while maintaining visual richness
  const tunnelRadius = 15;
  const tunnelDepth = 150;

  // Create smooth circular texture (once)
  const circleTexture = React.useMemo(() => createCircleTexture(), []);

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

      // Enhanced color gradient by depth for elegant depth perception
      // Near (white/cyan) → Mid (electric blue/purple) → Far (deep purple/navy)
      const depthRatio = depth / tunnelDepth;

      if (depthRatio < 0.25) {
        // Near: bright white with subtle cyan tint
        const nearProgress = depthRatio / 0.25;
        colors[i * 3] = 0.95 - nearProgress * 0.15;      // R: 0.95 → 0.80
        colors[i * 3 + 1] = 0.97 - nearProgress * 0.17;  // G: 0.97 → 0.80
        colors[i * 3 + 2] = 1.0;                          // B: 1.0 (constant bright)
      } else if (depthRatio < 0.6) {
        // Mid: cyan → electric blue → purple transition
        const midProgress = (depthRatio - 0.25) / 0.35;
        colors[i * 3] = 0.80 - midProgress * 0.35;       // R: 0.80 → 0.45
        colors[i * 3 + 1] = 0.80 - midProgress * 0.50;   // G: 0.80 → 0.30
        colors[i * 3 + 2] = 1.0 - midProgress * 0.05;    // B: 1.0 → 0.95
      } else {
        // Far: deep purple → navy fade
        const farProgress = (depthRatio - 0.6) / 0.4;
        colors[i * 3] = 0.45 - farProgress * 0.25;       // R: 0.45 → 0.20
        colors[i * 3 + 1] = 0.30 - farProgress * 0.20;   // G: 0.30 → 0.10
        colors[i * 3 + 2] = 0.95 - farProgress * 0.45;   // B: 0.95 → 0.50
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
        map={circleTexture}
        size={0.4}
        vertexColors
        transparent
        opacity={0.90}
        alphaTest={0.01}
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
  const [sectionHeight, setSectionHeight] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Use requestAnimationFrame for smoother updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Section is visible if any part is on screen
        const visible = rect.top < windowHeight && rect.bottom > 0;
        setIsActive(visible);

        // Use cached section height (calculated on mount/resize)
        const height = sectionHeight || rect.height;
        const scrolled = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (height + windowHeight)));

        // Skip update if change is negligible (performance optimization)
        if (Math.abs(progress - lastProgressRef.current) > 0.001) {
          setScrollProgress(progress);
          lastProgressRef.current = progress;
        }
      });
    };

    // Cache section height on mount
    if (containerRef.current) {
      setSectionHeight(containerRef.current.getBoundingClientRect().height);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionHeight]);

  // Camera Z position based on scroll
  const cameraZ = scrollProgress * 60; // Move camera forward into tunnel

  // Smooth fade-in for tunnel (starts at 20% scroll, fully visible at 35%)
  const tunnelOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.20) / 0.15));

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: '150vh' }} // Tall section for scroll range
    >
      {/* Three.js Canvas - Fixed position (conditional rendering for performance) */}
      {isActive && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            opacity: tunnelOpacity,
            transition: 'opacity 0.8s ease-out',
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
      )}
    </div>
  );
}
