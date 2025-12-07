'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Artwork } from '@/data/mythos/artworks';

interface ArtworkFrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  artwork: Artwork;
  size?: [number, number];
}

/**
 * ArtworkFrame - 3D artwork display with glassmorphic frame
 *
 * Features:
 * - Loads artwork image as texture
 * - Glassmorphic frame effect
 * - Hover glow effect
 * - Info panel on interaction
 * - Subtle floating animation
 */
export function ArtworkFrame({
  position,
  rotation = [0, 0, 0],
  artwork,
  size = [3, 2],
}: ArtworkFrameProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [width, height] = size;

  // Load texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(artwork.imageUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [artwork.imageUrl]);

  // Frame material
  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1A1A1F',
      roughness: 0.3,
      metalness: 0.8,
      emissive: hovered ? '#8B5CF6' : '#000000',
      emissiveIntensity: hovered ? 0.2 : 0,
    });
  }, [hovered]);

  // Subtle floating animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.02;
    }
  });

  const frameDepth = 0.1;
  const frameWidth = 0.12;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Artwork canvas */}
      <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
        <planeGeometry args={[width - frameWidth * 2, height - frameWidth * 2]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Frame backing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, frameDepth]} />
        <meshStandardMaterial
          color="#1A1A1F"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Frame border - top */}
      <mesh position={[0, height / 2 - frameWidth / 2, frameDepth / 2]}>
        <boxGeometry args={[width, frameWidth, frameDepth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Frame border - bottom */}
      <mesh position={[0, -height / 2 + frameWidth / 2, frameDepth / 2]}>
        <boxGeometry args={[width, frameWidth, frameDepth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Frame border - left */}
      <mesh position={[-width / 2 + frameWidth / 2, 0, frameDepth / 2]}>
        <boxGeometry args={[frameWidth, height - frameWidth * 2, frameDepth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Frame border - right */}
      <mesh position={[width / 2 - frameWidth / 2, 0, frameDepth / 2]}>
        <boxGeometry args={[frameWidth, height - frameWidth * 2, frameDepth]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      {/* Hover glow effect */}
      {hovered && (
        <pointLight
          position={[0, 0, 1]}
          intensity={0.5}
          color="#8B5CF6"
          distance={3}
          decay={2}
        />
      )}

      {/* Info label (always visible, below frame) */}
      <group position={[0, -height / 2 - 0.25, 0.1]}>
        <Text
          fontSize={0.08}
          color="#FFFFFF"
          anchorX="center"
          anchorY="top"
          maxWidth={width}
        >
          {artwork.title}
        </Text>
        <Text
          position={[0, -0.12, 0]}
          fontSize={0.06}
          color="#888888"
          anchorX="center"
          anchorY="top"
          maxWidth={width}
        >
          {artwork.artist}, {artwork.year}
        </Text>
      </group>

      {/* Detailed info on hover */}
      {hovered && (
        <Html
          position={[0, 0, 0.5]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              maxWidth: '280px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '0.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#FFFFFF',
                fontFamily: 'var(--font-space-grotesk, system-ui)',
              }}
            >
              {artwork.title}
            </h3>
            <p
              style={{
                margin: 0,
                marginBottom: '0.75rem',
                fontSize: '0.875rem',
                color: '#8B5CF6',
                fontFamily: 'var(--font-dm-sans, system-ui)',
              }}
            >
              {artwork.artist} ({artwork.year})
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.375rem',
              }}
            >
              {artwork.motifs.slice(0, 4).map((motif) => (
                <span
                  key={motif}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.625rem',
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '4px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'var(--font-space-grotesk, system-ui)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {motif}
                </span>
              ))}
            </div>
            <p
              style={{
                margin: 0,
                marginTop: '0.75rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'var(--font-dm-sans, system-ui)',
              }}
            >
              {artwork.museum}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

export default ArtworkFrame;
