'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating abstract shape component
function FloatingShape({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Subtle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Particle field component
function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(200 * 3);

    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3));
    return geo;
  }, [particlesPosition]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#DA0E29"
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#DA0E29" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

      {/* Floating shapes */}
      <FloatingShape position={[-2, 0, 0]} color="#DA0E29" scale={0.8} />
      <FloatingShape position={[2, -1, -2]} color="#ffffff" scale={0.6} />
      <FloatingShape position={[0, 1.5, -1]} color="#DA0E29" scale={0.5} />

      {/* Particle field */}
      <ParticleField />

      {/* Main center sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[1, 64, 64]} scale={1.2}>
          <MeshDistortMaterial
            color="#DA0E29"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.9}
            emissive="#DA0E29"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>
    </>
  );
}

// Main exported component
export function HeroScene3D() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      opacity: 0.6,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
