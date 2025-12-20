'use client';

import React, { MutableRefObject, useMemo } from 'react';
import * as THREE from 'three';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { WireframeMaterial, EdgeLines } from '../materials/WireframeMaterial';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface SinkBasinProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * SinkBasin - Ceramic sink basin
 *
 * The functional sink component of the bathroom installation.
 */
export function SinkBasin({ scrollProgress }: SinkBasinProps) {
  // Dimensions
  const width = 1.6;
  const depth = 0.5;
  const height = 0.35;
  const wallThickness = 0.08;

  // Explosion animation - fourth to explode (0.36-0.50), fourth to implode (1.18-1.26)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: ExplodeDirections.down,
    distance: 1.5,
    startAt: 0.36,
    endAt: 0.50,
    easing: 'smoothstep',
    implodeStartAt: 1.18,
    implodeEndAt: 1.26,
  });

  // Create sink basin geometry (simplified as nested boxes)
  const outerGeometry = useMemo(() => new THREE.BoxGeometry(width, height, depth), []);
  const innerGeometry = useMemo(() =>
    new THREE.BoxGeometry(
      width - wallThickness * 2,
      height - wallThickness,
      depth - wallThickness * 2
    ), [width, height, depth, wallThickness]);

  // Drain
  const drainGeometry = useMemo(() => new THREE.CylinderGeometry(0.04, 0.03, 0.1, 16), []);

  // Countertop
  const countertopGeometry = useMemo(() => new THREE.BoxGeometry(width + 0.4, 0.05, depth + 0.2), []);

  const color = '#e0e0e0'; // Light gray/white for ceramic
  const drainColor = '#4a4a4a';

  return (
    <group ref={groupRef} position={[0, -1.5, 0.8]}>
      {/* Countertop */}
      <group position={[0, height / 2 + 0.025, 0]}>
        <mesh geometry={countertopGeometry}>
          <WireframeMaterial color="#8b8b8b" opacity={0.1} />
        </mesh>
        <EdgeLines geometry={countertopGeometry} color="#8b8b8b" opacity={0.5} />
      </group>

      {/* Sink outer */}
      <group position={[0, 0, 0]}>
        <mesh geometry={outerGeometry}>
          <WireframeMaterial color={color} opacity={0.08} />
        </mesh>
        <EdgeLines geometry={outerGeometry} color={color} opacity={0.6} />
      </group>

      {/* Sink inner (basin cavity - rendered as darker) */}
      <group position={[0, wallThickness / 2, 0]}>
        <mesh geometry={innerGeometry}>
          <meshStandardMaterial
            color="#1a1a1a"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Drain */}
      <group position={[0, -height / 2 + 0.05, 0]} rotation={[0, 0, 0]}>
        <mesh geometry={drainGeometry}>
          <meshStandardMaterial color={drainColor} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Floating label */}
      <FloatingLabel
        text="Sink Basin"
        subtext="Ceramic + Granite Counter"
        position={[width / 2 + 1, 0, 0]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.3)}
        delay={getLabelDelay(4)}
      />
    </group>
  );
}

export default SinkBasin;
