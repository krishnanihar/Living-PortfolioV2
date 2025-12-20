'use client';

import React, { MutableRefObject, useMemo } from 'react';
import * as THREE from 'three';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { WireframeMaterial, EdgeLines } from '../materials/WireframeMaterial';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface OuterShellProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * OuterShell - Outer plywood/granite panels of the bathroom installation
 *
 * This represents the visible exterior shell that conceals the
 * technical components within.
 */
export function OuterShell({ scrollProgress }: OuterShellProps) {
  // Dimensions
  const width = 4;
  const height = 6;
  const depth = 3;
  const thickness = 0.15;

  // Explosion animation - first to explode (0.00-0.14), last to implode (1.34-1.40)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: ExplodeDirections.forward,
    distance: 3,
    startAt: 0.00,
    endAt: 0.14,
    easing: 'smoothstep',
    implodeStartAt: 1.34,
    implodeEndAt: 1.40,
  });

  // Create hollow box geometry (outer shell with panels)
  const panelGeometries = useMemo(() => {
    return {
      front: new THREE.BoxGeometry(width, height, thickness),
      back: new THREE.BoxGeometry(width, height, thickness),
      left: new THREE.BoxGeometry(thickness, height, depth),
      right: new THREE.BoxGeometry(thickness, height, depth),
      top: new THREE.BoxGeometry(width, thickness, depth),
    };
  }, []);

  const color = '#9333ea'; // Purple accent

  return (
    <group ref={groupRef}>
      {/* Front panel - has mirror cutout (simplified as solid for now) */}
      <group position={[0, 0, depth / 2]}>
        <mesh geometry={panelGeometries.front}>
          <WireframeMaterial color={color} opacity={0.06} />
        </mesh>
        <EdgeLines geometry={panelGeometries.front} color={color} opacity={0.5} />
      </group>

      {/* Back panel */}
      <group position={[0, 0, -depth / 2]}>
        <mesh geometry={panelGeometries.back}>
          <WireframeMaterial color={color} opacity={0.06} />
        </mesh>
        <EdgeLines geometry={panelGeometries.back} color={color} opacity={0.5} />
      </group>

      {/* Left panel */}
      <group position={[-width / 2, 0, 0]}>
        <mesh geometry={panelGeometries.left}>
          <WireframeMaterial color={color} opacity={0.06} />
        </mesh>
        <EdgeLines geometry={panelGeometries.left} color={color} opacity={0.5} />
      </group>

      {/* Right panel */}
      <group position={[width / 2, 0, 0]}>
        <mesh geometry={panelGeometries.right}>
          <WireframeMaterial color={color} opacity={0.06} />
        </mesh>
        <EdgeLines geometry={panelGeometries.right} color={color} opacity={0.5} />
      </group>

      {/* Top panel */}
      <group position={[0, height / 2, 0]}>
        <mesh geometry={panelGeometries.top}>
          <WireframeMaterial color={color} opacity={0.06} />
        </mesh>
        <EdgeLines geometry={panelGeometries.top} color={color} opacity={0.5} />
      </group>

      {/* Floating label */}
      <FloatingLabel
        text="Outer Shell"
        subtext="Plywood + Granite Finish"
        position={[width / 2 + 1.5, height / 3, 0]}
        side="right"
        visible={shouldShowLabel(progress.current, 0.2)}
        delay={getLabelDelay(0)}
      />
    </group>
  );
}

export default OuterShell;
