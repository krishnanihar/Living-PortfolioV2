'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { knowledgeGraphData } from '@/data/knowledge-graph';
import { KnowledgeNode } from '@/types/knowledge-graph';

interface Position {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface KnowledgeGraph2DProps {
  onNodeHover?: (node: KnowledgeNode | null) => void;
  onNodeClick?: (node: KnowledgeNode) => void;
}

// Node size multiplier for 2D
const NODE_SIZE_MULTIPLIER = 8;

// Color mapping by node type
const getNodeColor = (node: KnowledgeNode): string => {
  return node.color || 'var(--text-50)';
};

export function KnowledgeGraph2D({ onNodeHover, onNodeClick }: KnowledgeGraph2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [positions, setPositions] = useState<Map<string, Position>>(new Map());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);
  const isInitialized = useRef(false);

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize positions with force-directed layout
  useEffect(() => {
    if (isInitialized.current || dimensions.width === 0) return;
    isInitialized.current = true;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const initialPositions = new Map<string, Position>();

    // Position nodes in a circle initially, with core at center
    knowledgeGraphData.nodes.forEach((node, index) => {
      if (node.type === 'core') {
        initialPositions.set(node.id, {
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
        });
      } else {
        const angle = (index / knowledgeGraphData.nodes.length) * Math.PI * 2;
        const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
        initialPositions.set(node.id, {
          x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
          y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
          vx: 0,
          vy: 0,
        });
      }
    });

    setPositions(initialPositions);

    // Run force simulation
    let iteration = 0;
    const maxIterations = 200;

    const simulate = () => {
      if (iteration >= maxIterations) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      setPositions((prevPositions) => {
        const newPositions = new Map(prevPositions);
        const alpha = 1 - iteration / maxIterations;
        const nodes = knowledgeGraphData.nodes;
        const edges = knowledgeGraphData.edges;

        // Apply forces
        nodes.forEach((node) => {
          const pos = newPositions.get(node.id);
          if (!pos) return;

          let fx = 0;
          let fy = 0;

          // Repulsion from all other nodes
          nodes.forEach((otherNode) => {
            if (node.id === otherNode.id) return;
            const otherPos = newPositions.get(otherNode.id);
            if (!otherPos) return;

            const dx = pos.x - otherPos.x;
            const dy = pos.y - otherPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 2000 / (dist * dist);

            fx += (dx / dist) * force * alpha;
            fy += (dy / dist) * force * alpha;
          });

          // Attraction along edges
          edges.forEach((edge) => {
            let targetId: string | null = null;
            if (edge.source === node.id) targetId = edge.target;
            if (edge.target === node.id) targetId = edge.source;
            if (!targetId) return;

            const targetPos = newPositions.get(targetId);
            if (!targetPos) return;

            const dx = targetPos.x - pos.x;
            const dy = targetPos.y - pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = dist * 0.01 * edge.strength;

            fx += dx * force * alpha;
            fy += dy * force * alpha;
          });

          // Center gravity
          const dx = centerX - pos.x;
          const dy = centerY - pos.y;
          fx += dx * 0.001 * alpha;
          fy += dy * 0.001 * alpha;

          // Apply velocity
          pos.vx = (pos.vx + fx) * 0.6;
          pos.vy = (pos.vy + fy) * 0.6;

          // Update position (keep core node fixed)
          if (node.type !== 'core') {
            pos.x += pos.vx;
            pos.y += pos.vy;

            // Boundary constraints
            const padding = 40;
            pos.x = Math.max(padding, Math.min(dimensions.width - padding, pos.x));
            pos.y = Math.max(padding, Math.min(dimensions.height - padding, pos.y));
          }

          newPositions.set(node.id, pos);
        });

        return newPositions;
      });

      iteration++;
      animationRef.current = requestAnimationFrame(simulate);
    };

    simulate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  // Handle node tap
  const handleNodeClick = useCallback(
    (node: KnowledgeNode) => {
      setSelectedNodeId((prev) => (prev === node.id ? null : node.id));
      onNodeClick?.(node);
    },
    [onNodeClick]
  );

  // Handle node hover
  const handleNodeHover = useCallback(
    (node: KnowledgeNode | null) => {
      setHoveredNodeId(node?.id || null);
      onNodeHover?.(node);
    },
    [onNodeHover]
  );

  // Get connected node IDs
  const getConnectedIds = (nodeId: string): Set<string> => {
    const connected = new Set<string>();
    connected.add(nodeId);
    knowledgeGraphData.edges.forEach((edge) => {
      if (edge.source === nodeId) connected.add(edge.target);
      if (edge.target === nodeId) connected.add(edge.source);
    });
    return connected;
  };

  const activeNodeId = hoveredNodeId || selectedNodeId;
  const connectedIds = activeNodeId ? getConnectedIds(activeNodeId) : null;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        touchAction: 'manipulation',
      }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {/* Edges */}
        <g>
          {knowledgeGraphData.edges.map((edge) => {
            const sourcePos = positions.get(edge.source);
            const targetPos = positions.get(edge.target);
            if (!sourcePos || !targetPos) return null;

            const isHighlighted =
              connectedIds?.has(edge.source) && connectedIds?.has(edge.target);
            const isDimmed = connectedIds !== null && !isHighlighted;

            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={isHighlighted ? 'var(--text-40)' : 'var(--text-15)'}
                strokeWidth={isHighlighted ? 1.5 : 0.5}
                strokeDasharray={isHighlighted ? 'none' : '4 4'}
                opacity={isDimmed ? 0.2 : 1}
                style={{ transition: 'all 0.3s ease' }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {knowledgeGraphData.nodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;

            const isActive = activeNodeId === node.id;
            const isConnected = connectedIds?.has(node.id);
            const isDimmed = connectedIds !== null && !isConnected;
            const radius = node.size * NODE_SIZE_MULTIPLIER;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNodeClick(node)}
                onPointerEnter={() => handleNodeHover(node)}
                onPointerLeave={() => handleNodeHover(null)}
              >
                {/* Glow effect for active/hovered */}
                {isActive && (
                  <circle
                    r={radius + 8}
                    fill={getNodeColor(node)}
                    opacity={0.2}
                    style={{ filter: 'blur(8px)' }}
                  />
                )}

                {/* Main node circle */}
                <circle
                  r={radius}
                  fill={getNodeColor(node)}
                  opacity={isDimmed ? 0.3 : isActive ? 1 : 0.8}
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Inner highlight */}
                <circle
                  r={radius * 0.6}
                  fill="var(--text-10)"
                  opacity={isActive ? 0.3 : 0}
                  style={{ transition: 'opacity 0.3s ease' }}
                />

                {/* Label for larger nodes */}
                {node.size >= 0.8 && !isDimmed && (
                  <text
                    y={radius + 14}
                    textAnchor="middle"
                    fill="var(--text-70)"
                    fontSize={node.type === 'core' ? 12 : 10}
                    fontWeight={node.type === 'core' ? 500 : 400}
                    opacity={isActive ? 1 : 0.7}
                    style={{
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Selected node info tooltip */}
      <AnimatePresence>
        {selectedNodeId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--glass-10)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '0.75rem 1.25rem',
              border: '1px solid var(--text-10)',
              maxWidth: '280px',
              textAlign: 'center',
            }}
          >
            {(() => {
              const node = knowledgeGraphData.nodes.find(
                (n) => n.id === selectedNodeId
              );
              if (!node) return null;
              return (
                <>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-90)',
                      fontWeight: 500,
                      marginBottom: node.description ? '0.25rem' : 0,
                    }}
                  >
                    {node.label}
                  </p>
                  {node.description && (
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-50)',
                      }}
                    >
                      {node.description}
                    </p>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default KnowledgeGraph2D;
