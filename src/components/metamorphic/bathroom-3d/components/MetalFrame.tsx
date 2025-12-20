'use client';

import React, { MutableRefObject, useMemo } from 'react';
import * as THREE from 'three';
import { useExplodeAnimation, ExplodeDirections, shouldShowLabel, getLabelDelay } from '../hooks/useExplodeAnimation';
import { FloatingLabel } from '../annotations/FloatingLabel';

interface MetalFrameProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * MetalFrame - Welded metal skeleton structure
 *
 * The internal frame that supports all panels and components.
 * Rendered as wireframe line segments.
 */
export function MetalFrame({ scrollProgress }: MetalFrameProps) {
  // Dimensions (slightly smaller than outer shell)
  const width = 3.7;
  const height = 5.7;
  const depth = 2.7;

  // Explosion animation - second to explode (0.12-0.26), sixth to implode (1.24-1.38)
  const { groupRef, progress } = useExplodeAnimation(scrollProgress, {
    direction: ExplodeDirections.up,
    distance: 2,
    startAt: 0.12,
    endAt: 0.26,
    easing: 'smoothstep',
    rotation: new THREE.Euler(0, 0.1, 0),
    implodeStartAt: 1.24,
    implodeEndAt: 1.38,
  });

  // Create frame geometry from line segments
  const frameGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    // Define the 8 corners of the frame
    const hw = width / 2;
    const hh = height / 2;
    const hd = depth / 2;

    const vertices = new Float32Array([
      // Bottom rectangle
      -hw, -hh, -hd, hw, -hh, -hd,
      hw, -hh, -hd, hw, -hh, hd,
      hw, -hh, hd, -hw, -hh, hd,
      -hw, -hh, hd, -hw, -hh, -hd,

      // Top rectangle
      -hw, hh, -hd, hw, hh, -hd,
      hw, hh, -hd, hw, hh, hd,
      hw, hh, hd, -hw, hh, hd,
      -hw, hh, hd, -hw, hh, -hd,

      // Vertical edges
      -hw, -hh, -hd, -hw, hh, -hd,
      hw, -hh, -hd, hw, hh, -hd,
      hw, -hh, hd, hw, hh, hd,
      -hw, -hh, hd, -hw, hh, hd,

      // Cross braces (for structural realism)
      -hw, -hh, -hd, hw, hh, -hd,
      hw, -hh, -hd, -hw, hh, -hd,
      -hw, -hh, hd, hw, hh, hd,
      hw, -hh, hd, -hw, hh, hd,

      // Middle horizontal supports
      -hw, 0, -hd, hw, 0, -hd,
      -hw, 0, hd, hw, 0, hd,
      -hw, 0, -hd, -hw, 0, hd,
      hw, 0, -hd, hw, 0, hd,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geometry;
  }, [width, height, depth]);

  // Frame tubes (thicker lines at joints)
  const jointGeometry = useMemo(() => {
    return new THREE.SphereGeometry(0.06, 8, 8);
  }, []);

  // Joint positions
  const joints = useMemo(() => {
    const hw = width / 2;
    const hh = height / 2;
    const hd = depth / 2;

    return [
      [-hw, -hh, -hd], [hw, -hh, -hd], [hw, -hh, hd], [-hw, -hh, hd],
      [-hw, hh, -hd], [hw, hh, -hd], [hw, hh, hd], [-hw, hh, hd],
      [-hw, 0, -hd], [hw, 0, -hd], [hw, 0, hd], [-hw, 0, hd],
    ] as [number, number, number][];
  }, [width, height, depth]);

  const color = '#06b6d4'; // Cyan for metal

  return (
    <group ref={groupRef}>
      {/* Main frame lines */}
      <lineSegments geometry={frameGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.8} linewidth={2} />
      </lineSegments>

      {/* Joint spheres */}
      {joints.map((pos, i) => (
        <mesh key={i} position={pos} geometry={jointGeometry}>
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Floating label */}
      <FloatingLabel
        text="Metal Frame"
        subtext="Welded Steel Skeleton"
        position={[-width / 2 - 1.5, height / 4, 0]}
        side="left"
        visible={shouldShowLabel(progress.current, 0.25)}
        delay={getLabelDelay(1)}
      />
    </group>
  );
}

export default MetalFrame;
