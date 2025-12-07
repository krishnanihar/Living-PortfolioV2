'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RoomAtmosphere {
  primaryColor: string;
  secondaryColor: string;
  ambientIntensity: number;
  particleDensity: number;
}

interface PalaceRoomProps {
  width?: number;
  depth?: number;
  height?: number;
  atmosphere?: RoomAtmosphere;
}

/**
 * PalaceRoom - The main gallery room of Oneiros Palace
 *
 * A simple rectangular room with:
 * - Floor with subtle grid pattern
 * - Four walls
 * - Ceiling with ambient lighting effect
 * - Glassmorphic aesthetic with dark, dreamy atmosphere
 */
// Default atmosphere (purple theme)
const DEFAULT_ATMOSPHERE: RoomAtmosphere = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#6366F1',
  ambientIntensity: 0.5,
  particleDensity: 0.5,
};

export function PalaceRoom({
  width = 30,
  depth = 30,
  height = 8,
  atmosphere = DEFAULT_ATMOSPHERE,
}: PalaceRoomProps) {
  // Use atmosphere colors for lighting
  const { primaryColor, secondaryColor, ambientIntensity } = atmosphere;
  const floorRef = useRef<THREE.Mesh>(null);

  // Create floor material with subtle reflection
  const floorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0A0A0A',
      roughness: 0.3,
      metalness: 0.8,
      envMapIntensity: 0.5,
    });
  }, []);

  // Create wall material - dark glass-like surface
  const wallMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0F0F12',
      roughness: 0.7,
      metalness: 0.3,
      side: THREE.BackSide,
    });
  }, []);

  // Create ceiling material with emissive glow
  const ceilingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0A0A0A',
      roughness: 0.9,
      metalness: 0.1,
      emissive: '#1a1025',
      emissiveIntensity: 0.3,
    });
  }, []);

  // Subtle animation for atmosphere
  useFrame(({ clock }) => {
    if (floorRef.current) {
      // Very subtle floor "breathing"
      const time = clock.getElapsedTime();
      const mat = floorRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.05 + Math.sin(time * 0.5) * 0.02;
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, depth, 32, 32]} />
        <meshStandardMaterial
          color="#1A1A20"
          roughness={0.3}
          metalness={0.8}
          emissive="#2a1a4e"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Floor grid overlay */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[width, depth]} />
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Ceiling */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, height, 0]}
        material={ceilingMaterial}
      >
        <planeGeometry args={[width, depth]} />
      </mesh>

      {/* Walls */}
      {/* Back wall (negative Z) */}
      <mesh position={[0, height / 2, -depth / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#1A1A22"
          roughness={0.7}
          metalness={0.3}
          emissive="#0a0a15"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Front wall (positive Z) - with doorway */}
      <mesh position={[0, height / 2, depth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#1A1A22"
          roughness={0.7}
          metalness={0.3}
          emissive="#0a0a15"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Left wall (negative X) */}
      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial
          color="#1A1A22"
          roughness={0.7}
          metalness={0.3}
          emissive="#0a0a15"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Right wall (positive X) */}
      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height]} />
        <meshStandardMaterial
          color="#1A1A22"
          roughness={0.7}
          metalness={0.3}
          emissive="#0a0a15"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Ambient floor lights - use atmosphere colors */}
      <pointLight
        position={[-10, 0.5, -10]}
        intensity={ambientIntensity * 1.6}
        color={primaryColor}
        distance={20}
        decay={2}
      />
      <pointLight
        position={[10, 0.5, -10]}
        intensity={ambientIntensity * 1.6}
        color={primaryColor}
        distance={20}
        decay={2}
      />
      <pointLight
        position={[-10, 0.5, 10]}
        intensity={ambientIntensity * 1.6}
        color={secondaryColor}
        distance={20}
        decay={2}
      />
      <pointLight
        position={[10, 0.5, 10]}
        intensity={ambientIntensity * 1.6}
        color={secondaryColor}
        distance={20}
        decay={2}
      />

      {/* Central ceiling light */}
      <pointLight
        position={[0, height - 1, 0]}
        intensity={1.5}
        color="#FFFFFF"
        distance={30}
        decay={2}
      />

      {/* Spotlight for artwork highlighting */}
      <spotLight
        position={[-12, 6, -8]}
        target-position={[-15, 2.5, -8]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      <spotLight
        position={[-12, 6, 0]}
        target-position={[-15, 2.5, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      <spotLight
        position={[-12, 6, 8]}
        target-position={[-15, 2.5, 8]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      <spotLight
        position={[12, 6, -8]}
        target-position={[15, 2.5, -8]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      <spotLight
        position={[12, 6, 0]}
        target-position={[15, 2.5, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />
      <spotLight
        position={[12, 6, 8]}
        target-position={[15, 2.5, 8]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />

      {/* Decorative corner pillars */}
      <Pillar position={[-width / 2 + 0.5, 0, -depth / 2 + 0.5]} height={height} />
      <Pillar position={[width / 2 - 0.5, 0, -depth / 2 + 0.5]} height={height} />
      <Pillar position={[-width / 2 + 0.5, 0, depth / 2 - 0.5]} height={height} />
      <Pillar position={[width / 2 - 0.5, 0, depth / 2 - 0.5]} height={height} />
    </group>
  );
}

/**
 * Decorative pillar component
 */
function Pillar({ position, height }: { position: [number, number, number]; height: number }) {
  return (
    <group position={position}>
      {/* Main pillar body */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshStandardMaterial
          color="#1A1A1F"
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial
          color="#1A1A1F"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Capital */}
      <mesh position={[0, height - 0.2, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial
          color="#1A1A1F"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

export default PalaceRoom;
