'use client';

import { useState } from 'react';

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

interface StaticGraphThumbnailProps {
  books: Book[];
  games: Game[];
  onClick: () => void;
}

export function StaticGraphThumbnail({ books, games, onClick }: StaticGraphThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract unique concepts
  const concepts = Array.from(
    new Set([
      ...books.flatMap(b => b.tags),
      ...games.flatMap(g => g.tags)
    ])
  );

  // Canvas dimensions
  const width = 500;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate positions for nodes in radial layout
  const conceptRadius = 60;
  const itemRadius = 180;

  // Position concept nodes in center cluster
  const conceptNodes = concepts.map((concept, i) => {
    const angle = (i / concepts.length) * Math.PI * 2;
    return {
      id: `concept-${concept}`,
      name: concept,
      type: 'concept' as const,
      x: centerX + Math.cos(angle) * conceptRadius,
      y: centerY + Math.sin(angle) * conceptRadius,
      color: '#DA0E29'
    };
  });

  // Position book nodes in left semicircle
  const bookNodes = books.map((book, i) => {
    const angle = Math.PI - (i / (books.length - 1 || 1)) * Math.PI;
    return {
      id: `book-${book.title}`,
      name: book.title,
      type: 'book' as const,
      x: centerX + Math.cos(angle) * itemRadius,
      y: centerY + Math.sin(angle) * itemRadius,
      color: 'rgba(255, 255, 255, 0.95)',
      tags: book.tags
    };
  });

  // Position game nodes in right semicircle
  const gameNodes = games.map((game, i) => {
    const angle = -(i / (games.length - 1 || 1)) * Math.PI;
    return {
      id: `game-${game.title}`,
      name: game.title,
      type: 'game' as const,
      x: centerX + Math.cos(angle) * itemRadius,
      y: centerY + Math.sin(angle) * itemRadius,
      color: 'rgba(255, 255, 255, 0.95)',
      tags: game.tags
    };
  });

  const allNodes = [...conceptNodes, ...bookNodes, ...gameNodes];

  // Create links
  const links: Array<{ source: typeof allNodes[number], target: typeof allNodes[number] }> = [];

  // Connect books to their concept tags
  bookNodes.forEach(book => {
    book.tags.forEach(tag => {
      const concept = conceptNodes.find(c => c.name === tag);
      if (concept) {
        links.push({ source: book, target: concept });
      }
    });
  });

  // Connect games to their concept tags
  gameNodes.forEach(game => {
    game.tags.forEach(tag => {
      const concept = conceptNodes.find(c => c.name === tag);
      if (concept) {
        links.push({ source: game, target: concept });
      }
    });
  });

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '400px',
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.015) 0%, transparent 60%)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered
          ? '0 12px 48px rgba(0, 0, 0, 0.5)'
          : '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >

      {/* SVG Graph */}
      <svg width={width} height={height} style={{ position: 'relative', zIndex: 5 }}>
        {/* Links */}
        {links.map((link, i) => (
          <line
            key={i}
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.5"
            opacity={isHovered ? 0.15 : 1}
            style={{ transition: 'all 0.4s ease-out' }}
          />
        ))}

        {/* Nodes */}
        {allNodes.map((node) => {
          const baseRadius = node.type === 'concept' ? 3 : 6;
          const finalRadius = baseRadius;

          if (node.type === 'concept') {
            // Concept: Orbital design (outer ring + inner dot)
            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={finalRadius * 2}
                  fill="none"
                  stroke="rgba(218, 14, 41, 0.3)"
                  strokeWidth="0.8"
                  opacity={0.6}
                  style={{ transition: 'all 0.3s ease' }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={finalRadius}
                  fill={node.color}
                  style={{ transition: 'all 0.3s ease' }}
                />
                <text
                  x={node.x}
                  y={node.y + finalRadius * 2 + 12}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="8"
                  fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  fontWeight="400"
                  letterSpacing="0.02em"
                  opacity={0.5}
                  style={{ transition: 'opacity 0.3s ease', pointerEvents: 'none' }}
                >
                  {node.name}
                </text>
              </g>
            );
          } else {
            // Books/Games: Concentric circles with depth
            return (
              <g key={node.id}>
                {/* Outer circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={finalRadius}
                  fill={node.color}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="0.4"
                  style={{ transition: 'all 0.3s ease' }}
                />
                {/* Inner ring for depth */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={finalRadius * 0.7}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="0.8"
                  style={{ transition: 'all 0.3s ease' }}
                />
              </g>
            );
          }
        })}
      </svg>

      {/* Hover overlay */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
          zIndex: 10,
        }}>
          <div style={{
            padding: '0.875rem 1.75rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.8125rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Explore Network →
          </div>
        </div>
      )}

      {/* Label */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        fontSize: '0.6875rem',
        color: 'rgba(255, 255, 255, 0.35)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontWeight: '400',
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        KNOWLEDGE NETWORK
      </div>
    </div>
  );
}
