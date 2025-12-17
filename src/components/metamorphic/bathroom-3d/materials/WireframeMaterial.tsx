'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface WireframeMaterialProps {
  color?: string;
  opacity?: number;
  wireframeOpacity?: number;
  edgeColor?: string;
  pulseSpeed?: number;
  glowIntensity?: number;
}

/**
 * WireframeMaterial - Technical wireframe visualization
 *
 * Renders a mesh with:
 * - Semi-transparent solid fill
 * - Glowing edge lines
 * - Subtle pulse animation
 */
export function WireframeMaterial({
  color = '#9333ea',
  opacity = 0.08,
  wireframeOpacity = 0.6,
  edgeColor,
  pulseSpeed = 1,
  glowIntensity = 0.3,
}: WireframeMaterialProps) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const timeRef = useRef(0);

  // Pulse animation for the material
  useFrame((_, delta) => {
    if (!materialRef.current || pulseSpeed === 0) return;
    timeRef.current += delta * pulseSpeed;
    const pulse = Math.sin(timeRef.current * 2) * 0.5 + 0.5;
    materialRef.current.emissiveIntensity = glowIntensity + pulse * 0.1;
  });

  return (
    <meshStandardMaterial
      ref={materialRef}
      color={color}
      transparent
      opacity={opacity}
      side={THREE.DoubleSide}
      emissive={color}
      emissiveIntensity={glowIntensity}
      wireframe={false}
      roughness={0.8}
      metalness={0.2}
    />
  );
}

interface EdgeLinesProps {
  geometry: THREE.BufferGeometry;
  color?: string;
  opacity?: number;
  linewidth?: number;
}

/**
 * EdgeLines - Renders edge lines for a geometry
 */
export function EdgeLines({
  geometry,
  color = '#9333ea',
  opacity = 0.7,
  linewidth = 1,
}: EdgeLinesProps) {
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 15); // 15 degree threshold
  }, [geometry]);

  return (
    <lineSegments geometry={edgesGeometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        linewidth={linewidth}
      />
    </lineSegments>
  );
}

interface WireframeBoxProps {
  args: [number, number, number];
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  opacity?: number;
  edgeOpacity?: number;
}

/**
 * WireframeBox - Pre-built wireframe box component
 */
export function WireframeBox({
  args,
  color = '#9333ea',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  opacity = 0.08,
  edgeOpacity = 0.7,
}: WireframeBoxProps) {
  const geometry = useMemo(() => new THREE.BoxGeometry(...args), [args]);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <WireframeMaterial color={color} opacity={opacity} />
      </mesh>
      <EdgeLines geometry={geometry} color={color} opacity={edgeOpacity} />
    </group>
  );
}

interface WireframeCylinderProps {
  args: [number, number, number, number?];
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  opacity?: number;
  edgeOpacity?: number;
}

/**
 * WireframeCylinder - Pre-built wireframe cylinder component
 */
export function WireframeCylinder({
  args,
  color = '#9333ea',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  opacity = 0.08,
  edgeOpacity = 0.7,
}: WireframeCylinderProps) {
  const geometry = useMemo(() => new THREE.CylinderGeometry(...args), [args]);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <WireframeMaterial color={color} opacity={opacity} />
      </mesh>
      <EdgeLines geometry={geometry} color={color} opacity={edgeOpacity} />
    </group>
  );
}

interface WireframePlaneProps {
  args: [number, number];
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  opacity?: number;
  edgeOpacity?: number;
}

/**
 * WireframePlane - Pre-built wireframe plane component
 */
export function WireframePlane({
  args,
  color = '#9333ea',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  opacity = 0.08,
  edgeOpacity = 0.7,
}: WireframePlaneProps) {
  const geometry = useMemo(() => new THREE.PlaneGeometry(...args), [args]);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <WireframeMaterial color={color} opacity={opacity} />
      </mesh>
      <EdgeLines geometry={geometry} color={color} opacity={edgeOpacity} />
    </group>
  );
}

export default WireframeMaterial;
