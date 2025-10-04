'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
});

interface GraphNode {
  id: string;
  name: string;
  type: 'book' | 'game' | 'concept';
  val: number;
  color: string;
  description?: string;
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
  value: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface KnowledgeGraphProps {
  books: Array<{
    title: string;
    author: string;
    tags: string[];
    progress: number;
  }>;
  games: Array<{
    title: string;
    studio: string;
    tags: string[];
    hoursPlayed: number;
  }>;
  onNodeClick?: (node: GraphNode | null) => void;
}

export function KnowledgeGraph({ books, games, onNodeClick }: KnowledgeGraphProps) {
  const graphRef = useRef<any>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Extract all unique concepts/tags from books and games
  const extractConcepts = useCallback(() => {
    const allTags = new Set<string>();
    books.forEach(book => book.tags.forEach(tag => allTags.add(tag)));
    games.forEach(game => game.tags.forEach(tag => allTags.add(tag)));
    return Array.from(allTags);
  }, [books, games]);

  // Build graph data
  useEffect(() => {
    const concepts = extractConcepts();
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Create concept nodes (central hub nodes)
    concepts.forEach(concept => {
      nodes.push({
        id: `concept-${concept}`,
        name: concept,
        type: 'concept',
        val: 20,
        color: 'rgba(6, 182, 212, 0.8)', // Teal for concepts
      });
    });

    // Create book nodes
    books.forEach((book, index) => {
      const bookId = `book-${index}`;
      nodes.push({
        id: bookId,
        name: book.title,
        type: 'book',
        val: 15,
        color: 'rgba(147, 51, 234, 0.8)', // Purple for books
        description: book.author,
        metadata: {
          author: book.author,
          progress: book.progress,
        },
      });

      // Create links from book to its concepts
      book.tags.forEach(tag => {
        links.push({
          source: bookId,
          target: `concept-${tag}`,
          value: 1,
        });
      });
    });

    // Create game nodes
    games.forEach((game, index) => {
      const gameId = `game-${index}`;
      nodes.push({
        id: gameId,
        name: game.title,
        type: 'game',
        val: 15,
        color: 'rgba(245, 158, 11, 0.8)', // Amber for games
        description: game.studio,
        metadata: {
          studio: game.studio,
          hoursPlayed: game.hoursPlayed,
        },
      });

      // Create links from game to its concepts
      game.tags.forEach(tag => {
        links.push({
          source: gameId,
          target: `concept-${tag}`,
          value: 1,
        });
      });
    });

    setGraphData({ nodes, links });
  }, [books, games, extractConcepts]);

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('knowledge-graph-container');
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.min(600, window.innerHeight * 0.6),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Custom node rendering with Canvas
  const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    const nodeSize = Math.sqrt(node.val) * 2;

    // Determine node appearance based on state
    const isHovered = hoveredNode === node.id;
    const isSelected = selectedNode === node.id;
    const isConnectedToHovered = hoveredNode && graphData.links.some(
      link =>
        (link.source === hoveredNode && link.target === node.id) ||
        (link.target === hoveredNode && link.source === node.id)
    );

    let opacity = 1;
    if (hoveredNode && !isHovered && !isConnectedToHovered) {
      opacity = 0.2;
    }

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
    ctx.fillStyle = node.color.replace(/[\d.]+\)$/g, `${opacity})`);
    ctx.fill();

    // Add glow effect for hovered/selected nodes
    if (isHovered || isSelected) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = node.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize + 2, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw label
    ctx.font = `${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
    ctx.fillText(label, node.x, node.y + nodeSize + fontSize);

    // Draw node type indicator for books/games
    if (node.type !== 'concept' && (isHovered || isSelected)) {
      ctx.font = `${fontSize * 0.8}px Inter, sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
      ctx.fillText(node.description || '', node.x, node.y + nodeSize + fontSize * 2.2);
    }
  }, [hoveredNode, selectedNode, graphData.links]);

  // Custom link rendering
  const drawLink = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isConnectedToHovered = hoveredNode &&
      (link.source.id === hoveredNode || link.target.id === hoveredNode);
    const isConnectedToSelected = selectedNode &&
      (link.source.id === selectedNode || link.target.id === selectedNode);

    let opacity = 0.1;
    let width = 1;

    if (isConnectedToHovered || isConnectedToSelected) {
      opacity = 0.4;
      width = 2;
    }

    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = width / globalScale;
    ctx.stroke();
  }, [hoveredNode, selectedNode]);

  // Handle node click
  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node.id === selectedNode ? null : node.id);
    if (onNodeClick) {
      onNodeClick(node.id === selectedNode ? null : node);
    }
  }, [selectedNode, onNodeClick]);

  // Handle node hover
  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node ? node.id : null);
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  return (
    <div
      id="knowledge-graph-container"
      style={{
        width: '100%',
        height: '600px',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtitle */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        textAlign: 'right',
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        {hoveredNode ? (
          graphData.nodes.find(n => n.id === hoveredNode)?.type === 'concept'
            ? 'Concept connecting ideas...'
            : graphData.nodes.find(n => n.id === hoveredNode)?.type === 'book'
            ? 'Book shaping thinking...'
            : 'Game teaching mechanics...'
        ) : (
          'Books & games that shape my thinking'
        )}
      </div>

      {/* Graph */}
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeVal="val"
        nodeColor="color"
        nodeCanvasObject={drawNode}
        linkCanvasObject={drawLink}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        cooldownTicks={100}
        warmupTicks={50}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        backgroundColor="transparent"
      />
    </div>
  );
}
