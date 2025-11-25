'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { KnowledgeNode } from '@/types/knowledge-graph';

interface GraphNodeProps {
  node: KnowledgeNode;
  position: THREE.Vector3;
  isHovered: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  isDragging?: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
}

// Base size for nodes - reduced for denser graph
const BASE_SIZE = 0.6;

// Size multipliers by node type - smaller for density
const TYPE_SIZE_MULTIPLIER: Record<string, number> = {
  core: 1.5,
  domain: 0.9,
  skill: 0.5,
  project: 0.7,
  influence: 0.35,
  tool: 0.4,
};

export function GraphNode({
  node,
  position,
  isHovered,
  isConnected,
  isDimmed,
  isDragging = false,
  onClick,
  onPointerOver,
  onPointerOut,
  onPointerDown,
}: GraphNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Calculate node size
  const nodeSize = useMemo(() => {
    const typeMultiplier = TYPE_SIZE_MULTIPLIER[node.type] || 1;
    return BASE_SIZE * node.size * typeMultiplier;
  }, [node.size, node.type]);

  // Parse color
  const nodeColor = useMemo(() => new THREE.Color(node.color), [node.color]);

  // Animate scale on hover, connection, and drag state
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Target scale based on state
    let targetScale = 1;
    if (isDragging) {
      targetScale = 1.4; // Larger when dragging
    } else if (isHovered) {
      targetScale = 1.3;
    } else if (isConnected) {
      targetScale = 1.1;
    } else if (isDimmed) {
      targetScale = 0.8;
    }

    // Smooth interpolation
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 8);
    groupRef.current.scale.setScalar(newScale);

    // Pulsing effect for core node
    if (node.type === 'core' && glowRef.current) {
      const pulse = Math.sin(Date.now() * 0.003) * 0.1 + 1;
      glowRef.current.scale.setScalar(pulse);
    }

    // Update position from physics
    groupRef.current.position.copy(position);
  });

  // Material opacity based on state
  const opacity = isDimmed ? 0.3 : 1;

  return (
    <group ref={groupRef} position={position}>
      {/* Outer halo - softer, larger glow */}
      <mesh scale={2.0}>
        <sphereGeometry args={[nodeSize, 16, 16]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isHovered ? 0.15 : 0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow sphere - brighter, tighter */}
      <mesh ref={glowRef} scale={1.4}>
        <sphereGeometry args={[nodeSize, 24, 24]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isHovered ? 0.35 : isConnected ? 0.25 : 0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Main sphere with glassmorphic effect */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
      >
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <meshPhysicalMaterial
          color={nodeColor}
          metalness={0.1}
          roughness={0.2}
          transmission={node.type === 'core' ? 0 : 0.6}
          thickness={1.5}
          transparent
          opacity={opacity}
          envMapIntensity={1}
        />
      </mesh>

      {/* Inner core (for visual depth) */}
      <mesh scale={0.6}>
        <sphereGeometry args={[nodeSize, 16, 16]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>

      {/* Label - show for important nodes and on hover */}
      {(isHovered || node.type === 'core' || node.type === 'domain' || node.type === 'project' || node.type === 'skill' || node.type === 'tool') && (
        <Billboard follow lockX={false} lockY={false} lockZ={false}>
          <Text
            position={[0, nodeSize + 0.4, 0]}
            fontSize={node.type === 'core' ? 0.8 : node.type === 'domain' ? 0.6 : 0.4}
            color="white"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.03}
            outlineColor="black"
            letterSpacing={0.02}
          >
            {node.label}
          </Text>
        </Billboard>
      )}

      {/* Clickable indicator for projects */}
      {node.type === 'project' && isHovered && (
        <Billboard>
          <Text
            position={[0, -nodeSize - 0.6, 0]}
            fontSize={0.35}
            color="rgba(255,255,255,0.6)"
            anchorX="center"
            anchorY="top"
          >
            Click to view →
          </Text>
        </Billboard>
      )}
    </group>
  );
}
