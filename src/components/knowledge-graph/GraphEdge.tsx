'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { KnowledgeEdge } from '@/types/knowledge-graph';

interface GraphEdgeProps {
  edge: KnowledgeEdge;
  sourcePosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  isHighlighted: boolean;
  isDimmed: boolean;
}

export function GraphEdge({
  edge,
  sourcePosition,
  targetPosition,
  isHighlighted,
  isDimmed,
}: GraphEdgeProps) {
  // State to hold current points - triggers re-render when positions change
  const [points, setPoints] = useState<[number, number, number][]>([
    [sourcePosition.x, sourcePosition.y, sourcePosition.z],
    [targetPosition.x, targetPosition.y, targetPosition.z],
  ]);

  // Update points each frame to follow physics-driven node positions
  useFrame(() => {
    const newPoints: [number, number, number][] = [
      [sourcePosition.x, sourcePosition.y, sourcePosition.z],
      [targetPosition.x, targetPosition.y, targetPosition.z],
    ];

    // Only update state if positions have actually changed
    if (
      points[0][0] !== newPoints[0][0] ||
      points[0][1] !== newPoints[0][1] ||
      points[0][2] !== newPoints[0][2] ||
      points[1][0] !== newPoints[1][0] ||
      points[1][1] !== newPoints[1][1] ||
      points[1][2] !== newPoints[1][2]
    ) {
      setPoints(newPoints);
    }
  });

  // Calculate opacity based on state and edge strength
  // Thinner, more delicate appearance with lower base opacity
  const baseOpacity = edge.strength * 0.2; // was 0.3
  let opacity = baseOpacity;

  if (isHighlighted) {
    opacity = 0.5; // was 0.6
  } else if (isDimmed) {
    opacity = baseOpacity * 0.1; // was 0.2 - more aggressive dimming
  }

  // Color - darker gray for visibility in light mode, still visible in dark mode
  const color = '#555555';

  return (
    <group>
      {/* Glow line (subtle, for highlighted edges) */}
      {isHighlighted && (
        <Line
          points={points}
          color={color}
          lineWidth={2}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      )}

      {/* Main line - dashed by default, solid on hover */}
      <Line
        points={points}
        color={color}
        lineWidth={isHighlighted ? 1.5 : 0.5}
        transparent
        opacity={isHighlighted ? 0.6 : opacity}
        dashed={!isHighlighted}
        dashSize={2}
        gapSize={2}
      />
    </group>
  );
}

// Optimized version using LineSegments for many edges
export function GraphEdges({
  edges,
  positions,
  highlightedEdges,
  dimmedEdges,
}: {
  edges: KnowledgeEdge[];
  positions: Map<string, THREE.Vector3>;
  highlightedEdges: Set<string>;
  dimmedEdges: Set<string>;
}) {
  const lineSegmentsRef = useRef<THREE.LineSegments>(null);

  // Build line segment geometry from all edges
  const geometry = useMemo(() => {
    const points: number[] = [];
    const colorArray: number[] = [];

    edges.forEach(edge => {
      const sourcePos = positions.get(edge.source);
      const targetPos = positions.get(edge.target);

      if (sourcePos && targetPos) {
        points.push(
          sourcePos.x, sourcePos.y, sourcePos.z,
          targetPos.x, targetPos.y, targetPos.z
        );

        // Default color (white)
        const edgeKey = `${edge.source}-${edge.target}`;
        const isHighlighted = highlightedEdges.has(edgeKey) || highlightedEdges.has(`${edge.target}-${edge.source}`);
        const isDimmed = dimmedEdges.has(edgeKey) || dimmedEdges.has(`${edge.target}-${edge.source}`);

        const color = isHighlighted ? new THREE.Color('#DA0E29') : new THREE.Color('#ffffff');

        // Two vertices per edge
        colorArray.push(color.r, color.g, color.b, color.r, color.g, color.b);
      }
    });

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));

    return geom;
  }, [edges, positions, highlightedEdges, dimmedEdges]);

  // Update positions each frame
  useFrame(() => {
    if (!lineSegmentsRef.current) return;

    const positionAttr = lineSegmentsRef.current.geometry.attributes.position;
    if (!positionAttr) return;

    let idx = 0;
    edges.forEach(edge => {
      const sourcePos = positions.get(edge.source);
      const targetPos = positions.get(edge.target);

      if (sourcePos && targetPos) {
        positionAttr.setXYZ(idx, sourcePos.x, sourcePos.y, sourcePos.z);
        positionAttr.setXYZ(idx + 1, targetPos.x, targetPos.y, targetPos.z);
        idx += 2;
      }
    });

    positionAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineSegmentsRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </lineSegments>
  );
}
