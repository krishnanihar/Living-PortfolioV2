'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { knowledgeGraphData, domainNodes } from '@/data/knowledge-graph';
import { KnowledgeNode } from '@/types/knowledge-graph';

interface Position {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  scale: number;
  opacity: number;
}

interface FloatOffset {
  phaseX: number;
  phaseY: number;
  speedX: number;
  speedY: number;
}

interface KnowledgeGraph2DProps {
  onNodeHover?: (node: KnowledgeNode | null) => void;
  onNodeClick?: (node: KnowledgeNode) => void;
}

// Node size multiplier
const NODE_SIZE_MULTIPLIER = 8;

// Get node color
const getNodeColor = (node: KnowledgeNode): string => {
  return node.color || 'rgba(255, 255, 255, 0.5)';
};

// Parse hex color to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(255, 255, 255, ${alpha})`;
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
};

export function KnowledgeGraph2D({ onNodeHover, onNodeClick }: KnowledgeGraph2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number | null>(null);
  const positionsRef = useRef<Map<string, Position>>(new Map());
  const floatOffsetsRef = useRef<Map<string, FloatOffset>>(new Map());
  const nodeAnimationRef = useRef<{ scale: number; opacity: number }[]>([]);

  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize dimensions and canvas
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

  // Initialize canvas with device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      contextRef.current = ctx;
    }
  }, [dimensions]);

  // Compute static orbital positions
  const computePositions = useCallback(() => {
    const centerX = dimensions.width / 2;
    // Shift center up by 40px on mobile to make room for bottom nav
    const centerY = dimensions.height / 2 - 40;
    const positions = new Map<string, Position>();
    const floatOffsets = new Map<string, FloatOffset>();

    // Separate nodes by type for orbital rings
    const coreNode = knowledgeGraphData.nodes.find(n => n.type === 'core');
    const domains = knowledgeGraphData.nodes.filter(n => n.type === 'domain');
    const skills = knowledgeGraphData.nodes.filter(n => n.type === 'skill');
    const projects = knowledgeGraphData.nodes.filter(n => n.type === 'project');
    const tools = knowledgeGraphData.nodes.filter(n => n.type === 'tool');
    const influences = knowledgeGraphData.nodes.filter(n => n.type === 'influence');

    // Ring radii based on container size (reduced to avoid bottom nav overlap)
    const innerRadius = Math.min(dimensions.width, dimensions.height) * 0.16;
    const middleRadius = Math.min(dimensions.width, dimensions.height) * 0.28;
    const outerRadius = Math.min(dimensions.width, dimensions.height) * 0.36;

    // Helper to place nodes in a ring
    const placeInRing = (nodes: KnowledgeNode[], radius: number, startAngle = -Math.PI / 2) => {
      nodes.forEach((node, i) => {
        const angle = startAngle + (i / nodes.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        positions.set(node.id, {
          x, y, baseX: x, baseY: y, scale: 0, opacity: 0
        });

        // Random float offset for organic motion
        floatOffsets.set(node.id, {
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          speedX: 0.3 + Math.random() * 0.4,
          speedY: 0.2 + Math.random() * 0.3,
        });
      });
    };

    // Core at center
    if (coreNode) {
      positions.set(coreNode.id, {
        x: centerX, y: centerY, baseX: centerX, baseY: centerY, scale: 0, opacity: 0
      });
      floatOffsets.set(coreNode.id, {
        phaseX: 0, phaseY: 0, speedX: 0, speedY: 0 // Core doesn't float
      });
    }

    // Domains in inner ring
    placeInRing(domains, innerRadius, -Math.PI / 2);

    // Skills and projects in middle ring (interleaved)
    const middleNodes = [...skills.slice(0, 12), ...projects];
    placeInRing(middleNodes, middleRadius, -Math.PI / 3);

    // Tools, influences, remaining skills in outer ring
    const outerNodes = [...tools, ...influences, ...skills.slice(12)];
    placeInRing(outerNodes, outerRadius, Math.PI / 6);

    positionsRef.current = positions;
    floatOffsetsRef.current = floatOffsets;

    // Initialize animation state for each node
    nodeAnimationRef.current = knowledgeGraphData.nodes.map(() => ({
      scale: 0,
      opacity: 0
    }));
  }, [dimensions]);

  // Compute positions when dimensions change
  useEffect(() => {
    if (dimensions.width > 0) {
      computePositions();
      setIsInitialized(true);
    }
  }, [dimensions, computePositions]);

  // Entrance animation with Anime.js
  useEffect(() => {
    if (!isInitialized || nodeAnimationRef.current.length === 0) return;

    // Animate all nodes from center with stagger
    animate(nodeAnimationRef.current, {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(25),
      duration: 800,
      ease: 'outElastic(1, 0.6)',
    });
  }, [isInitialized]);

  // Get connected node IDs
  const getConnectedIds = useCallback((nodeId: string): Set<string> => {
    const connected = new Set<string>();
    connected.add(nodeId);
    knowledgeGraphData.edges.forEach((edge) => {
      if (edge.source === nodeId) connected.add(edge.target);
      if (edge.target === nodeId) connected.add(edge.source);
    });
    return connected;
  }, []);

  // Render loop
  useEffect(() => {
    if (!contextRef.current || !isInitialized) return;

    const render = () => {
      const ctx = contextRef.current;
      if (!ctx) return;

      const time = performance.now() * 0.001;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const connectedIds = selectedNodeId ? getConnectedIds(selectedNodeId) : null;
      const nodes = knowledgeGraphData.nodes;
      const edges = knowledgeGraphData.edges;

      // Update positions with floating motion
      nodes.forEach((node, i) => {
        const pos = positionsRef.current.get(node.id);
        const offset = floatOffsetsRef.current.get(node.id);
        const animState = nodeAnimationRef.current[i];
        if (!pos || !offset || !animState) return;

        // Apply floating motion (not for core node)
        if (node.type !== 'core') {
          const floatX = Math.sin(time * offset.speedX + offset.phaseX) * 1.2;
          const floatY = Math.cos(time * offset.speedY + offset.phaseY) * 0.8;
          pos.x = pos.baseX + floatX;
          pos.y = pos.baseY + floatY;
        }

        pos.scale = animState.scale;
        pos.opacity = animState.opacity;
      });

      // Draw edges
      edges.forEach(edge => {
        const sourcePos = positionsRef.current.get(edge.source);
        const targetPos = positionsRef.current.get(edge.target);
        if (!sourcePos || !targetPos) return;
        if (sourcePos.opacity < 0.1 || targetPos.opacity < 0.1) return;

        const isHighlighted = connectedIds?.has(edge.source) && connectedIds?.has(edge.target);
        const isDimmed = connectedIds !== null && !isHighlighted;

        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);

        if (isHighlighted) {
          ctx.strokeStyle = 'rgba(218, 14, 41, 0.4)';
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = isDimmed
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 0.5;
        }

        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pos = positionsRef.current.get(node.id);
        const animState = nodeAnimationRef.current[i];
        if (!pos || !animState || pos.opacity < 0.01) return;

        const isActive = selectedNodeId === node.id;
        const isConnected = connectedIds?.has(node.id);
        const isDimmed = connectedIds !== null && !isConnected;
        const baseRadius = node.size * NODE_SIZE_MULTIPLIER;
        const radius = baseRadius * pos.scale;

        // Outer glow for active/core nodes
        if (isActive || node.type === 'core') {
          const glowRadius = radius * 2;
          const pulseScale = node.type === 'core' ? 1 + Math.sin(time * 0.8) * 0.1 : 1;

          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, radius * 0.5,
            pos.x, pos.y, glowRadius * pulseScale
          );
          gradient.addColorStop(0, hexToRgba(node.color, 0.3));
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, glowRadius * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Main circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = isDimmed ? 0.2 : (isActive ? 1 : 0.75) * pos.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Inner highlight
        if (isActive) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fill();
        }

        // Label for active node
        if (isActive && node.size >= 0.5) {
          ctx.font = '500 11px "DM Sans", system-ui, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(node.label, pos.x, pos.y + radius + 8);
        }

        // Label for core node always visible
        if (node.type === 'core' && !isActive) {
          ctx.font = '500 12px "DM Sans", system-ui, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(node.label, pos.x, pos.y + radius + 10);
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isInitialized, selectedNodeId, getConnectedIds]);

  // Find hit node helper
  const findHitNode = useCallback((x: number, y: number): KnowledgeNode | null => {
    let hitNode: KnowledgeNode | null = null;
    let minDist = Infinity;

    for (const node of knowledgeGraphData.nodes) {
      const pos = positionsRef.current.get(node.id);
      if (!pos) continue;

      const dist = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
      const hitRadius = Math.max(node.size * NODE_SIZE_MULTIPLIER, 22); // 44px min tap target

      if (dist < hitRadius && dist < minDist) {
        minDist = dist;
        hitNode = node;
      }
    }

    return hitNode;
  }, []);

  // Touch/click handling
  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const hitNode = findHitNode(x, y);

    if (hitNode) {
      const newSelectedId = selectedNodeId === hitNode.id ? null : hitNode.id;
      setSelectedNodeId(newSelectedId);

      if (newSelectedId) {
        onNodeClick?.(hitNode);
        onNodeHover?.(hitNode);

        // Animate connected nodes
        const connectedIds = getConnectedIds(hitNode.id);
        knowledgeGraphData.nodes.forEach((node, i) => {
          const animState = nodeAnimationRef.current[i];
          if (!animState) return;

          if (connectedIds.has(node.id)) {
            animate(animState, {
              scale: [animState.scale, 1.15, 1],
              duration: 400,
              ease: 'outQuad',
            });
          }
        });
      } else {
        onNodeHover?.(null);
      }
    } else {
      setSelectedNodeId(null);
      onNodeHover?.(null);
    }
  }, [selectedNodeId, onNodeClick, onNodeHover, getConnectedIds, findHitNode]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleInteraction]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    handleInteraction(e.clientX, e.clientY);
  }, [handleInteraction]);

  // Get selected node for tooltip
  const selectedNode = selectedNodeId
    ? knowledgeGraphData.nodes.find(n => n.id === selectedNodeId)
    : null;

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
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer',
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      />

      {/* Selected node info tooltip */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              bottom: 'calc(64px + env(safe-area-inset-bottom) + 4.5rem)',
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
              pointerEvents: 'none',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-90)',
                fontWeight: 500,
                marginBottom: selectedNode.description ? '0.25rem' : 0,
              }}
            >
              {selectedNode.label}
            </p>
            {selectedNode.description && (
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-50)',
                }}
              >
                {selectedNode.description}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default KnowledgeGraph2D;
