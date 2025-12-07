'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { OneirosArtwork } from '@/data/oneiros/artworks-expanded';

interface ArtworkInfoPanelProps {
  artwork: OneirosArtwork;
  position: [number, number, number];
  viewDistance?: number; // Distance at which panel becomes visible
  primaryColor?: string;
}

/**
 * 3D Info Panel for Artworks
 * Shows artwork details when player is close enough
 */
export function ArtworkInfoPanel({
  artwork,
  position,
  viewDistance = 5,
  primaryColor = '#8B5CF6',
}: ArtworkInfoPanelProps) {
  const { camera } = useThree();
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const panelPos = useRef(new THREE.Vector3(...position));

  // Check distance to camera each frame
  useFrame(() => {
    const distance = camera.position.distanceTo(panelPos.current);
    const shouldShow = distance < viewDistance;

    if (shouldShow !== isVisible) {
      setIsVisible(shouldShow);
    }

    // Smooth opacity transition
    const targetOpacity = shouldShow ? 1 : 0;
    setOpacity((prev) => prev + (targetOpacity - prev) * 0.1);
  });

  if (opacity < 0.01) return null;

  return (
    <Html
      position={[position[0], position[1] + 1.2, position[2]]}
      center
      style={{
        opacity,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          minWidth: '200px',
          maxWidth: '280px',
          padding: '1rem 1.25rem',
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px ${primaryColor}15`,
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            borderRadius: '12px 12px 0 0',
            background: `linear-gradient(90deg, ${primaryColor}80, transparent)`,
          }}
        />

        {/* Title */}
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.95)',
            fontFamily: 'var(--font-space-grotesk)',
            marginBottom: '0.25rem',
            lineHeight: '1.3',
          }}
        >
          {artwork.title}
        </h3>

        {/* Artist & Year */}
        <p
          style={{
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'var(--font-dm-sans)',
            marginBottom: '0.5rem',
          }}
        >
          {artwork.artist}, {artwork.year}
        </p>

        {/* Motifs/Tags */}
        {artwork.motifs && artwork.motifs.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
            }}
          >
            {artwork.motifs.slice(0, 4).map((motif) => (
              <span
                key={motif}
                style={{
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.5rem',
                  background: `${primaryColor}20`,
                  border: `1px solid ${primaryColor}30`,
                  borderRadius: '4px',
                  color: primaryColor,
                  fontFamily: 'var(--font-dm-sans)',
                  textTransform: 'lowercase',
                }}
              >
                {motif}
              </span>
            ))}
          </div>
        )}

        {/* Museum */}
        {artwork.museum && (
          <p
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.4)',
              fontFamily: 'var(--font-dm-sans)',
              marginTop: '0.5rem',
              fontStyle: 'italic',
            }}
          >
            {artwork.museum}
          </p>
        )}
      </div>
    </Html>
  );
}

export default ArtworkInfoPanel;
