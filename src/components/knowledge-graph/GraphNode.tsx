'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { KnowledgeNode } from '@/types/knowledge-graph';

interface GraphNodeProps {
  node: KnowledgeNode;
  position: THREE.Vector3;
  isHovered: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

// Base size for nodes
const BASE_SIZE = 0.8;

// Size multipliers by node type
const TYPE_SIZE_MULTIPLIER: Record<string, number> = {
  core: 1.5,
  domain: 1.0,
  skill: 0.6,
  project: 0.8,
  influence: 0.4,
};

export function GraphNode({
  node,
  position,
  isHovered,
  isConnected,
  isDimmed,
  onClick,
  onPointerOver,
  onPointerOut,
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

  // Animate scale on hover and connection state
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Target scale based on state
    let targetScale = 1;
    if (isHovered) {
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
      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          opacity={isHovered ? 0.4 : isConnected ? 0.3 : 0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Main sphere with glassmorphic effect */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
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

      {/* Label - show for all nodes (always visible) */}
      {(isHovered || node.type === 'core' || node.type === 'domain' || node.type === 'project' || node.type === 'skill') && (
        <Billboard follow lockX={false} lockY={false} lockZ={false}>
          <Text
            position={[0, nodeSize + 1.5, 0]}
            fontSize={node.type === 'core' ? 3 : node.type === 'domain' ? 2 : 1.5}
            color="white"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.1}
            outlineColor="black"
          >
            {node.label}
          </Text>
        </Billboard>
      )}

      {/* Clickable indicator for projects */}
      {node.type === 'project' && isHovered && (
        <Billboard>
          <Text
            position={[0, -nodeSize - 1, 0]}
            fontSize={1}
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
