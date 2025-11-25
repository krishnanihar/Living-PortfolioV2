'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  KnowledgeNode,
  KnowledgeEdge,
  PhysicsConfig,
  NodePhysicsState,
} from '@/types/knowledge-graph';

// Default physics configuration
const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  repulsionStrength: 800,      // How strongly nodes push apart
  attractionStrength: 0.03,    // How strongly edges pull together
  centeringStrength: 0.01,     // Pull toward center
  damping: 0.92,               // Velocity decay (friction)
  maxVelocity: 8,              // Speed limit
  minDistance: 15,             // Minimum distance between nodes
};

// Layer-based initial positions (radial layout)
function getInitialPosition(node: KnowledgeNode, index: number, totalInLayer: number): THREE.Vector3 {
  const layerRadii: Record<string, number> = {
    core: 0,
    domain: 25,
    skill: 50,
    project: 40,
    influence: 65,
  };

  const radius = layerRadii[node.type] || 50;

  if (node.type === 'core') {
    return new THREE.Vector3(0, 0, 0);
  }

  // Distribute nodes in a sphere-like pattern
  const angle = (index / totalInLayer) * Math.PI * 2;
  const heightVariation = (Math.random() - 0.5) * 20;
  const radiusVariation = radius + (Math.random() - 0.5) * 10;

  return new THREE.Vector3(
    Math.cos(angle) * radiusVariation,
    heightVariation,
    Math.sin(angle) * radiusVariation
  );
}

export interface UseGraphPhysicsOptions {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  config?: Partial<PhysicsConfig>;
  enabled?: boolean;
}

export interface UseGraphPhysicsReturn {
  positions: Map<string, THREE.Vector3>;
  getPosition: (nodeId: string) => THREE.Vector3;
  isStable: boolean;
  resetPositions: () => void;
}

export function useGraphPhysics({
  nodes,
  edges,
  config: userConfig,
  enabled = true,
}: UseGraphPhysicsOptions): UseGraphPhysicsReturn {
  const config = useMemo(
    () => ({ ...DEFAULT_PHYSICS_CONFIG, ...userConfig }),
    [userConfig]
  );

  // Physics state for each node
  const physicsState = useRef<Map<string, NodePhysicsState>>(new Map());
  const isStableRef = useRef(false);
  const frameCount = useRef(0);

  // Initialize positions
  const positions = useMemo(() => {
    const posMap = new Map<string, THREE.Vector3>();

    // Group nodes by type for radial distribution
    const nodesByType: Record<string, KnowledgeNode[]> = {};
    nodes.forEach(node => {
      if (!nodesByType[node.type]) nodesByType[node.type] = [];
      nodesByType[node.type].push(node);
    });

    // Initialize each node
    nodes.forEach(node => {
      const typeNodes = nodesByType[node.type];
      const indexInType = typeNodes.indexOf(node);
      const initialPos = getInitialPosition(node, indexInType, typeNodes.length);

      posMap.set(node.id, initialPos);

      // Initialize physics state
      physicsState.current.set(node.id, {
        position: { x: initialPos.x, y: initialPos.y, z: initialPos.z },
        velocity: { x: 0, y: 0, z: 0 },
      });
    });

    return posMap;
  }, [nodes]);

  // Build edge lookup for fast access
  const edgeLookup = useMemo(() => {
    const lookup = new Map<string, Set<string>>();

    edges.forEach(edge => {
      if (!lookup.has(edge.source)) lookup.set(edge.source, new Set());
      if (!lookup.has(edge.target)) lookup.set(edge.target, new Set());

      lookup.get(edge.source)!.add(edge.target);
      lookup.get(edge.target)!.add(edge.source);
    });

    return lookup;
  }, [edges]);

  // Get edge strength between two nodes
  const getEdgeStrength = useCallback(
    (source: string, target: string): number => {
      const edge = edges.find(
        e =>
          (e.source === source && e.target === target) ||
          (e.source === target && e.target === source)
      );
      return edge?.strength ?? 0;
    },
    [edges]
  );

  // Physics simulation step
  useFrame((_, delta) => {
    if (!enabled) return;

    // Limit delta to prevent huge jumps
    const dt = Math.min(delta, 0.05);
    frameCount.current++;

    let totalVelocity = 0;
    const nodeArray = Array.from(physicsState.current.entries());

    // Calculate forces for each node
    nodeArray.forEach(([nodeId, state]) => {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;

      // Core node stays fixed at center
      if (node.type === 'core') {
        state.position = { x: 0, y: 0, z: 0 };
        state.velocity = { x: 0, y: 0, z: 0 };
        return;
      }

      let fx = 0,
        fy = 0,
        fz = 0;

      // 1. Repulsion from all other nodes
      nodeArray.forEach(([otherId, otherState]) => {
        if (otherId === nodeId) return;

        const dx = state.position.x - otherState.position.x;
        const dy = state.position.y - otherState.position.y;
        const dz = state.position.z - otherState.position.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < config.minDistance) {
          // Strong repulsion when too close
          const repulsion = config.repulsionStrength / (config.minDistance * config.minDistance);
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          const nz = dz / (dist || 1);
          fx += nx * repulsion * 0.5;
          fy += ny * repulsion * 0.5;
          fz += nz * repulsion * 0.5;
        } else if (dist < 200) {
          // Normal repulsion
          const repulsion = config.repulsionStrength / distSq;
          const nx = dx / dist;
          const ny = dy / dist;
          const nz = dz / dist;
          fx += nx * repulsion;
          fy += ny * repulsion;
          fz += nz * repulsion;
        }
      });

      // 2. Attraction along edges
      const connectedNodes = edgeLookup.get(nodeId);
      if (connectedNodes) {
        connectedNodes.forEach(targetId => {
          const targetState = physicsState.current.get(targetId);
          if (!targetState) return;

          const dx = targetState.position.x - state.position.x;
          const dy = targetState.position.y - state.position.y;
          const dz = targetState.position.z - state.position.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist > 0) {
            const strength = getEdgeStrength(nodeId, targetId);
            const attraction = config.attractionStrength * strength * dist;
            fx += (dx / dist) * attraction;
            fy += (dy / dist) * attraction;
            fz += (dz / dist) * attraction;
          }
        });
      }

      // 3. Centering force (pull toward origin)
      fx -= state.position.x * config.centeringStrength;
      fy -= state.position.y * config.centeringStrength;
      fz -= state.position.z * config.centeringStrength;

      // Apply forces to velocity
      state.velocity.x += fx * dt;
      state.velocity.y += fy * dt;
      state.velocity.z += fz * dt;

      // Apply damping
      state.velocity.x *= config.damping;
      state.velocity.y *= config.damping;
      state.velocity.z *= config.damping;

      // Clamp velocity
      const speed = Math.sqrt(
        state.velocity.x ** 2 + state.velocity.y ** 2 + state.velocity.z ** 2
      );
      if (speed > config.maxVelocity) {
        const scale = config.maxVelocity / speed;
        state.velocity.x *= scale;
        state.velocity.y *= scale;
        state.velocity.z *= scale;
      }

      // Update position
      state.position.x += state.velocity.x;
      state.position.y += state.velocity.y;
      state.position.z += state.velocity.z;

      // Track total velocity for stability detection
      totalVelocity += speed;
    });

    // Update Three.js Vector3 positions
    nodeArray.forEach(([nodeId, state]) => {
      const pos = positions.get(nodeId);
      if (pos) {
        pos.set(state.position.x, state.position.y, state.position.z);
      }
    });

    // Check stability (low total velocity = stable)
    isStableRef.current = totalVelocity < 0.5 && frameCount.current > 60;
  });

  // Get position for a specific node
  const getPosition = useCallback(
    (nodeId: string): THREE.Vector3 => {
      return positions.get(nodeId) ?? new THREE.Vector3();
    },
    [positions]
  );

  // Reset positions to initial layout
  const resetPositions = useCallback(() => {
    frameCount.current = 0;
    isStableRef.current = false;

    // Group nodes by type for radial distribution
    const nodesByType: Record<string, KnowledgeNode[]> = {};
    nodes.forEach(node => {
      if (!nodesByType[node.type]) nodesByType[node.type] = [];
      nodesByType[node.type].push(node);
    });

    nodes.forEach(node => {
      const typeNodes = nodesByType[node.type];
      const indexInType = typeNodes.indexOf(node);
      const initialPos = getInitialPosition(node, indexInType, typeNodes.length);

      const pos = positions.get(node.id);
      if (pos) {
        pos.set(initialPos.x, initialPos.y, initialPos.z);
      }

      const state = physicsState.current.get(node.id);
      if (state) {
        state.position = { x: initialPos.x, y: initialPos.y, z: initialPos.z };
        state.velocity = { x: 0, y: 0, z: 0 };
      }
    });
  }, [nodes, positions]);

  return {
    positions,
    getPosition,
    isStable: isStableRef.current,
    resetPositions,
  };
}
