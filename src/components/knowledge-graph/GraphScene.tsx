'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { GraphNode } from './GraphNode';
import { GraphEdge } from './GraphEdge';
import { useGraphPhysics } from './useGraphPhysics';
import { knowledgeGraphData, getConnectedNodes } from '@/data/knowledge-graph';
import { KnowledgeNode } from '@/types/knowledge-graph';

interface GraphSceneProps {
  onNodeHover?: (node: KnowledgeNode | null) => void;
  onNodeClick?: (node: KnowledgeNode) => void;
}

export function GraphScene({ onNodeHover, onNodeClick }: GraphSceneProps) {
  const router = useRouter();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Initialize physics
  const { positions, getPosition } = useGraphPhysics({
    nodes: knowledgeGraphData.nodes,
    edges: knowledgeGraphData.edges,
    enabled: true,
  });

  // Get connected node IDs for the hovered node
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();

    const hoveredNode = knowledgeGraphData.nodes.find(n => n.id === hoveredNodeId);
    if (!hoveredNode) return new Set<string>();

    const connected = new Set<string>(hoveredNode.connections);
    connected.add(hoveredNodeId); // Include the hovered node itself
    return connected;
  }, [hoveredNodeId]);

  // Get highlighted edge keys
  const highlightedEdges = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();

    const edges = new Set<string>();
    knowledgeGraphData.edges.forEach(edge => {
      if (edge.source === hoveredNodeId || edge.target === hoveredNodeId) {
        edges.add(`${edge.source}-${edge.target}`);
      }
    });
    return edges;
  }, [hoveredNodeId]);

  // Handle node hover
  const handleNodeHover = useCallback(
    (node: KnowledgeNode | null) => {
      setHoveredNodeId(node?.id || null);
      onNodeHover?.(node);
    },
    [onNodeHover]
  );

  // Handle node click
  const handleNodeClick = useCallback(
    (node: KnowledgeNode) => {
      setSelectedNodeId(node.id);
      onNodeClick?.(node);

      // Navigate to project page if it's a project node
      if (node.type === 'project' && node.url) {
        router.push(node.url);
      }
    },
    [onNodeClick, router]
  );

  return (
    <group>
      {/* Render edges first (behind nodes) */}
      {knowledgeGraphData.edges.map(edge => {
        const sourcePos = getPosition(edge.source);
        const targetPos = getPosition(edge.target);

        const edgeKey = `${edge.source}-${edge.target}`;
        const isHighlighted = highlightedEdges.has(edgeKey);
        const isDimmed = hoveredNodeId !== null && !isHighlighted;

        return (
          <GraphEdge
            key={edgeKey}
            edge={edge}
            sourcePosition={sourcePos}
            targetPosition={targetPos}
            isHighlighted={isHighlighted}
            isDimmed={isDimmed}
          />
        );
      })}

      {/* Render nodes */}
      {knowledgeGraphData.nodes.map(node => {
        const position = getPosition(node.id);
        const isHovered = hoveredNodeId === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const isDimmed = hoveredNodeId !== null && !isConnected;

        return (
          <GraphNode
            key={node.id}
            node={node}
            position={position}
            isHovered={isHovered}
            isConnected={isConnected}
            isDimmed={isDimmed}
            onClick={() => handleNodeClick(node)}
            onPointerOver={() => handleNodeHover(node)}
            onPointerOut={() => handleNodeHover(null)}
          />
        );
      })}
    </group>
  );
}
