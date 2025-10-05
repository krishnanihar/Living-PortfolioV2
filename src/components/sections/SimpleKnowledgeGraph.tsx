'use client';

import { useState, useMemo } from 'react';

interface Book {
  title: string;
  author: string;
  tags: string[];
  progress: number;
}

interface Game {
  title: string;
  studio: string;
  tags: string[];
  hoursPlayed: number;
}

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'book' | 'game' | 'concept';
  color: string;
  metadata?: {
    author?: string;
    studio?: string;
    progress?: number;
    hoursPlayed?: number;
  };
}

interface GraphLink {
  source: string;
  target: string;
}

interface SimpleKnowledgeGraphProps {
  books: Book[];
  games: Game[];
  onNodeClick?: (node: GraphNode | null) => void;
}

export function SimpleKnowledgeGraph({ books, games, onNodeClick }: SimpleKnowledgeGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Zoom and Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Drag state
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  // Build graph data with static positions
  const { nodes, links } = useMemo(() => {
    const concepts = new Set<string>();
    books.forEach(book => book.tags.forEach(tag => concepts.add(tag)));
    games.forEach(game => game.tags.forEach(tag => concepts.add(tag)));

    const conceptArray = Array.from(concepts);
    const graphNodes: GraphNode[] = [];
    const graphLinks: GraphLink[] = [];

    // SVG viewport dimensions
    const centerX = 450;
    const centerY = 275;

    // Create concept nodes in center cluster
    const conceptRadius = 120;
    conceptArray.forEach((concept, i) => {
      const angle = (i / conceptArray.length) * Math.PI * 2;
      graphNodes.push({
        id: `concept-${concept}`,
        label: concept,
        x: centerX + Math.cos(angle) * conceptRadius,
        y: centerY + Math.sin(angle) * conceptRadius,
        type: 'concept',
        color: '#DA0E29',
      });
    });

    // Create book nodes on left side
    const bookRadius = 280;
    books.forEach((book, i) => {
      const bookId = `book-${i}`;
      const angle = Math.PI - (i / (books.length - 1 || 1)) * Math.PI;

      graphNodes.push({
        id: bookId,
        label: book.title,
        x: centerX + Math.cos(angle) * bookRadius,
        y: centerY + Math.sin(angle) * bookRadius,
        type: 'book',
        color: 'rgba(255, 255, 255, 0.95)',
        metadata: {
          author: book.author,
          progress: book.progress,
        },
      });

      book.tags.forEach(tag => {
        graphLinks.push({
          source: bookId,
          target: `concept-${tag}`,
        });
      });
    });

    // Create game nodes on right side
    const gameRadius = 280;
    games.forEach((game, i) => {
      const gameId = `game-${i}`;
      const angle = -(i / (games.length - 1 || 1)) * Math.PI;

      graphNodes.push({
        id: gameId,
        label: game.title,
        x: centerX + Math.cos(angle) * gameRadius,
        y: centerY + Math.sin(angle) * gameRadius,
        type: 'game',
        color: 'rgba(255, 255, 255, 0.95)',
        metadata: {
          studio: game.studio,
          hoursPlayed: game.hoursPlayed,
        },
      });

      game.tags.forEach(tag => {
        graphLinks.push({
          source: gameId,
          target: `concept-${tag}`,
        });
      });
    });

    return { nodes: graphNodes, links: graphLinks };
  }, [books, games]);

  // Determine connected nodes for hover effects
  const connectedNodes = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const connected = new Set<string>([hoveredNode]);
    links.forEach(link => {
      if (link.source === hoveredNode) connected.add(link.target);
      if (link.target === hoveredNode) connected.add(link.source);
    });
    return connected;
  }, [hoveredNode, links]);

  const handleNodeClick = (node: GraphNode) => {
    if (draggedNode) return; // Don't click if dragging
    const newSelected = selectedNode === node.id ? null : node.id;
    setSelectedNode(newSelected);
    if (onNodeClick) {
      onNodeClick(newSelected ? node : null);
    }
  };

  // Get node position (from state or original)
  const getNodePosition = (node: GraphNode) => {
    return nodePositions.get(node.id) || { x: node.x, y: node.y };
  };

  // Zoom handler
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  // Pan and drag handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName === 'svg' || target.tagName === 'g') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    } else if (draggedNode) {
      const svgRect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
      const svgX = ((e.clientX - svgRect.left - pan.x) / zoom) * (900 / svgRect.width);
      const svgY = ((e.clientY - svgRect.top - pan.y) / zoom) * (550 / svgRect.height);

      setNodePositions(prev => new Map(prev).set(draggedNode, { x: svgX, y: svgY }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNode(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggedNode(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      const pos = getNodePosition(node);
      setDragStart({ x: pos.x, y: pos.y });
    }
  };

  // Reset view
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      style={{
        width: '100%',
        height: 550,
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.015) 0%, transparent 60%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        transition: 'border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }}
    >

      {/* SVG Graph */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 900 550"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'relative', zIndex: 5, cursor: isPanning ? 'grabbing' : 'grab' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 0.9; }
            }
          `}</style>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
        {/* Links */}
        <g>
          {links.map((link, i) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            if (!sourceNode || !targetNode) return null;

            const sourcePos = getNodePosition(sourceNode);
            const targetPos = getNodePosition(targetNode);

            const isConnected = hoveredNode && (
              connectedNodes.has(link.source) && connectedNodes.has(link.target)
            );
            const isSelectedConnection = selectedNode && (
              link.source === selectedNode || link.target === selectedNode
            );

            return (
              <line
                key={`link-${i}`}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth={isConnected || isSelectedConnection ? 0.8 : 0.5}
                opacity={isConnected || isSelectedConnection ? 0.15 : 1}
                style={{
                  transition: 'all 0.4s ease-out',
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map(node => {
            const pos = getNodePosition(node);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const isConnected = hoveredNode && connectedNodes.has(node.id);
            const isDimmed = hoveredNode && !isConnected && !isSelected;
            const isDragging = draggedNode === node.id;

            // Layered concentric circle sizing
            const baseRadius = node.type === 'concept' ? 4 : 8;
            const scale = isHovered || isSelected ? 1.12 : 1;
            const finalRadius = baseRadius * scale;

            // Truncate label if too long
            const maxLabelLength = 20;
            const displayLabel = node.label.length > maxLabelLength
              ? node.label.substring(0, maxLabelLength) + '...'
              : node.label;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                onClick={() => handleNodeClick(node)}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                opacity={isDimmed ? 0.3 : 1}
              >
                {/* Layered circle nodes with depth */}
                {node.type === 'concept' ? (
                  // Concept: Orbital design (outer ring + inner dot)
                  <>
                    {/* Outer pulsing ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={finalRadius * 2}
                      fill="none"
                      stroke="rgba(218, 14, 41, 0.3)"
                      strokeWidth="1"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: isHovered || isSelected ? 1 : 0.6,
                        animation: 'pulse 4s ease-in-out infinite',
                      }}
                    />
                    {/* Inner dot with glow */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={finalRadius + 2}
                      fill={node.color}
                      opacity={isHovered || isSelected ? 0.3 : 0}
                      filter="blur(4px)"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={finalRadius}
                      fill={node.color}
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </>
                ) : (
                  // Books/Games: Concentric circles with depth
                  <>
                    {/* Outer glow ring on hover */}
                    {(isHovered || isSelected) && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={finalRadius + 4}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="1"
                        style={{
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    )}
                    {/* Outer circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={finalRadius}
                      fill={node.color}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="0.5"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                    {/* Inner ring for depth */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={finalRadius * 0.75}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </>
                )}

                {/* Label with glow effect and slide-up */}
                {/* Glow layer */}
                <text
                  x={pos.x}
                  y={pos.y + finalRadius + (isHovered || isSelected ? 12 : 14)}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="10"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.03em"
                  filter="blur(6px)"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isHovered || isSelected ? 0.6 : 0,
                    pointerEvents: 'none',
                  }}
                >
                  {displayLabel}
                </text>
                {/* Main text layer */}
                <text
                  x={pos.x}
                  y={pos.y + finalRadius + (isHovered || isSelected ? 12 : 14)}
                  textAnchor="middle"
                  fill="rgba(255, 255, 255, 0.95)"
                  fontSize="10"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.03em"
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isHovered || isSelected ? 1 : 0.7,
                    pointerEvents: 'none',
                  }}
                >
                  {displayLabel}
                </text>
              </g>
            );
          })}
        </g>
        </g>
      </svg>

      {/* Reset button */}
      <button
        onClick={handleReset}
        onDoubleClick={handleReset}
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.75rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontWeight: '500',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
          opacity: zoom !== 1 || pan.x !== 0 || pan.y !== 0 ? 1 : 0.3,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        Reset View
      </button>

      {/* Zoom indicator */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        padding: '0.5rem 0.75rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.6875rem',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        zIndex: 10,
        opacity: zoom !== 1 ? 1 : 0.3,
        transition: 'opacity 0.3s ease',
      }}>
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}
