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
      color: '#06B6D4'
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
      color: '#A855F7',
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
      color: '#F59E0B',
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
        background: '#0A0A0A',
        borderRadius: '24px',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isHovered
          ? 'inset 0 0 100px rgba(6, 182, 212, 0.1), 0 20px 60px rgba(0, 0, 0, 0.6)'
          : 'inset 0 0 100px rgba(6, 182, 212, 0.05), 0 20px 60px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        opacity: isHovered ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
      }} />

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
            stroke="#06B6D4"
            strokeWidth="1"
            opacity={isHovered ? 0.3 : 0.15}
            style={{ transition: 'opacity 0.3s ease' }}
          />
        ))}

        {/* Nodes */}
        {allNodes.map((node) => {
          const size = node.type === 'concept' ? 12 : 10;

          if (node.type === 'concept') {
            // Diamond for concepts
            const points = `
              ${node.x},${node.y - size}
              ${node.x + size},${node.y}
              ${node.x},${node.y + size}
              ${node.x - size},${node.y}
            `;
            return (
              <g key={node.id}>
                <polygon
                  points={points}
                  fill="rgba(10, 10, 10, 0.8)"
                  stroke={node.color}
                  strokeWidth="1.5"
                  opacity={isHovered ? 1 : 0.8}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
                <text
                  x={node.x}
                  y={node.y + size + 14}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="9"
                  fontFamily="Courier New, monospace"
                  opacity={isHovered ? 0.9 : 0.6}
                  style={{ transition: 'opacity 0.3s ease' }}
                >
                  {node.name}
                </text>
              </g>
            );
          } else {
            // Square for books/games
            return (
              <g key={node.id}>
                <rect
                  x={node.x - size / 2}
                  y={node.y - size / 2}
                  width={size}
                  height={size}
                  fill="rgba(10, 10, 10, 0.8)"
                  stroke={node.color}
                  strokeWidth="1.5"
                  opacity={isHovered ? 1 : 0.8}
                  style={{ transition: 'opacity 0.3s ease' }}
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
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 10,
        }}>
          <div style={{
            padding: '1rem 2rem',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '12px',
            color: '#06B6D4',
            fontSize: '0.875rem',
            fontFamily: 'Courier New, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            {'>> Click to Explore Network'}
          </div>
        </div>
      )}

      {/* Label */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        fontSize: '0.75rem',
        color: '#06B6D4',
        fontFamily: 'Courier New, monospace',
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        KNOWLEDGE NETWORK
      </div>
    </div>
  );
}
