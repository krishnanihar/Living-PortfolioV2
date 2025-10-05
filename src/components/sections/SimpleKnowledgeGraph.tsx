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
        color: '#06B6D4',
      });
    });

    // Create book nodes on left side
    const bookRadius = 240;
    books.forEach((book, i) => {
      const bookId = `book-${i}`;
      const angle = Math.PI - (i / (books.length - 1 || 1)) * Math.PI;

      graphNodes.push({
        id: bookId,
        label: book.title,
        x: centerX + Math.cos(angle) * bookRadius,
        y: centerY + Math.sin(angle) * bookRadius,
        type: 'book',
        color: '#A855F7',
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
    const gameRadius = 240;
    games.forEach((game, i) => {
      const gameId = `game-${i}`;
      const angle = -(i / (games.length - 1 || 1)) * Math.PI;

      graphNodes.push({
        id: gameId,
        label: game.title,
        x: centerX + Math.cos(angle) * gameRadius,
        y: centerY + Math.sin(angle) * gameRadius,
        type: 'game',
        color: '#F59E0B',
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
    const newSelected = selectedNode === node.id ? null : node.id;
    setSelectedNode(newSelected);
    if (onNodeClick) {
      onNodeClick(newSelected ? node : null);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: 550,
        background: '#0A0A0A',
        borderRadius: '24px',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 0 100px rgba(6, 182, 212, 0.05), 0 20px 60px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Watch Dogs Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Scan Line Animation */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
        height: '200px',
        animation: 'scanLine 8s linear infinite',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <style jsx>{`
        @keyframes scanLine {
          0% { transform: translateY(-200px); }
          100% { transform: translateY(750px); }
        }
      `}</style>

      {/* Technical HUD Label */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        fontSize: '0.75rem',
        color: '#06B6D4',
        fontFamily: '"Courier New", monospace',
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        KNOWLEDGE NETWORK
      </div>

      {/* SVG Graph */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 900 550"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'relative', zIndex: 5 }}
      >
        {/* Links */}
        <g>
          {links.map((link, i) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            if (!sourceNode || !targetNode) return null;

            const isConnected = hoveredNode && (
              connectedNodes.has(link.source) && connectedNodes.has(link.target)
            );
            const isSelectedConnection = selectedNode && (
              link.source === selectedNode || link.target === selectedNode
            );

            return (
              <line
                key={`link-${i}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="#06B6D4"
                strokeWidth={isConnected || isSelectedConnection ? 1.5 : 0.8}
                opacity={isConnected || isSelectedConnection ? 0.6 : 0.15}
                style={{
                  transition: 'all 0.2s ease',
                  filter: isConnected || isSelectedConnection ? 'drop-shadow(0 0 8px #06B6D4)' : 'none',
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map(node => {
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const isConnected = hoveredNode && connectedNodes.has(node.id);
            const isDimmed = hoveredNode && !isConnected && !isSelected;

            const size = node.type === 'concept' ? 20 : 16;
            const scale = isHovered || isSelected ? 1.15 : 1;
            const finalSize = size * scale;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
                style={{ cursor: 'pointer' }}
                opacity={isDimmed ? 0.2 : 1}
              >
                {/* Node shape */}
                {node.type === 'concept' ? (
                  // Diamond for concepts
                  <polygon
                    points={`
                      ${node.x},${node.y - finalSize}
                      ${node.x + finalSize},${node.y}
                      ${node.x},${node.y + finalSize}
                      ${node.x - finalSize},${node.y}
                    `}
                    fill="rgba(10, 10, 10, 0.8)"
                    stroke={node.color}
                    strokeWidth={isHovered || isSelected ? 2.5 : 1.5}
                    style={{
                      transition: 'all 0.2s ease',
                      filter: isHovered || isSelected ? `drop-shadow(0 0 20px ${node.color})` : 'none',
                    }}
                  />
                ) : (
                  // Square for books/games
                  <rect
                    x={node.x - finalSize}
                    y={node.y - finalSize}
                    width={finalSize * 2}
                    height={finalSize * 2}
                    fill="rgba(10, 10, 10, 0.8)"
                    stroke={node.color}
                    strokeWidth={isHovered || isSelected ? 2.5 : 1.5}
                    style={{
                      transition: 'all 0.2s ease',
                      filter: isHovered || isSelected ? `drop-shadow(0 0 20px ${node.color})` : 'none',
                    }}
                  />
                )}

                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + finalSize + 16}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="11"
                  fontFamily='"Courier New", monospace'
                  style={{
                    transition: 'all 0.2s ease',
                    filter: isHovered || isSelected ? `drop-shadow(0 0 8px ${node.color})` : 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
