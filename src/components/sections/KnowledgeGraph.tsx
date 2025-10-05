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
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface Particle {
  link: any;
  progress: number;
  speed: number;
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });
  const [pulsePhase, setPulsePhase] = useState(0);

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

    // Create concept nodes (central hub nodes) - LARGER
    concepts.forEach(concept => {
      nodes.push({
        id: `concept-${concept}`,
        name: concept,
        type: 'concept',
        val: 35, // Increased from 20
        color: '#06B6D4', // Teal/cyan
      });
    });

    // Create book nodes
    books.forEach((book, index) => {
      const bookId = `book-${index}`;
      nodes.push({
        id: bookId,
        name: book.title,
        type: 'book',
        val: 22, // Increased from 15
        color: '#A855F7', // Purple
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
        val: 22, // Increased from 15
        color: '#F59E0B', // Amber
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
          height: 550, // Fixed height for side-by-side layout
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Pulse animation for concept nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 0.02) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Watch Dogs-inspired technical node rendering
  const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    // Safety check: nodes need valid positions before rendering
    if (!node.x || !node.y || !isFinite(node.x) || !isFinite(node.y)) {
      return;
    }

    const label = node.name;
    const fontSize = node.type === 'concept' ? 10 : 11;
    const scaledFontSize = fontSize / globalScale;
    const baseSize = Math.sqrt(node.val) * 1.5;
    const nodeSize = baseSize / Math.pow(globalScale, 0.3);

    // Determine node appearance based on state
    const isSelected = selectedNode === node.id;
    const opacity = 1;
    const scale = isSelected ? 1.15 : 1;

    const finalSize = nodeSize * scale;

    ctx.save();
    ctx.globalAlpha = opacity;

    // Watch Dogs style: Square nodes with technical edges
    const squareSize = finalSize * 2;

    // Outer glow for selected
    if (isSelected) {
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Draw square/diamond shape based on type
    ctx.beginPath();
    if (node.type === 'concept') {
      // Diamond shape for concepts
      ctx.moveTo(node.x, node.y - squareSize);
      ctx.lineTo(node.x + squareSize, node.y);
      ctx.lineTo(node.x, node.y + squareSize);
      ctx.lineTo(node.x - squareSize, node.y);
      ctx.closePath();
    } else {
      // Square for books/games
      ctx.rect(
        node.x - squareSize / 2,
        node.y - squareSize / 2,
        squareSize,
        squareSize
      );
    }

    // Fill with dark background
    ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
    ctx.fill();

    // Neon border
    ctx.strokeStyle = node.color;
    ctx.lineWidth = isSelected ? 2.5 : 1.5;
    ctx.stroke();

    // Inner accent lines (technical detail)
    if (node.type === 'concept') {
      ctx.beginPath();
      ctx.moveTo(node.x - squareSize * 0.5, node.y);
      ctx.lineTo(node.x + squareSize * 0.5, node.y);
      ctx.strokeStyle = `${node.color}40`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    // Technical label - always visible
    ctx.save();
    ctx.font = `${scaledFontSize}px "Courier New", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labelY = node.type === 'concept' ? node.y + squareSize + 12 : node.y + squareSize / 2 + 14;

    // Label background
    const textMetrics = ctx.measureText(label);
    const textWidth = textMetrics.width;
    const padding = 4;

    ctx.fillStyle = 'rgba(10, 10, 10, 0.85)';
    ctx.fillRect(
      node.x - textWidth / 2 - padding,
      labelY - scaledFontSize / 2 - padding / 2,
      textWidth + padding * 2,
      scaledFontSize + padding
    );

    // Label text with neon effect
    if (isSelected) {
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 8;
    }
    ctx.fillStyle = node.color;
    ctx.fillText(label, node.x, labelY);

    ctx.shadowBlur = 0;
    ctx.restore();
  }, [selectedNode, graphData.links, pulsePhase]);

  // Watch Dogs-inspired link rendering - straight thin neon lines
  const drawLink = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const source = link.source;
    const target = link.target;

    // Safety check: both nodes need valid positions
    if (!source || !target || !source.x || !source.y || !target.x || !target.y ||
        !isFinite(source.x) || !isFinite(source.y) || !isFinite(target.x) || !isFinite(target.y)) {
      return;
    }

    const isConnectedToSelected = selectedNode &&
      (source.id === selectedNode || target.id === selectedNode);

    let opacity = 0.15;
    let width = 0.8;

    if (isConnectedToSelected) {
      opacity = 0.6;
      width = 1.5;
    }

    ctx.save();
    ctx.globalAlpha = opacity;

    // Thin neon cyan line
    ctx.strokeStyle = '#06B6D4';

    if (isConnectedToSelected) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#06B6D4';
    }

    ctx.lineWidth = width / globalScale;
    ctx.lineCap = 'square';

    // Draw straight line (no curve)
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();

    ctx.restore();
  }, [selectedNode]);

  // Handle node click
  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node.id === selectedNode ? null : node.id);
    if (onNodeClick) {
      onNodeClick(node.id === selectedNode ? null : node);
    }
  }, [selectedNode, onNodeClick]);

  // Handle node hover - simplified (no state updates to prevent jittering)
  const handleNodeHover = useCallback((node: any) => {
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  return (
    <div
      id="knowledge-graph-container"
      style={{
        width: '100%',
        height: dimensions.height,
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
          100% { transform: translateY(${dimensions.height + 200}px); }
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

      {/* Graph */}
      <div style={{ position: 'relative', zIndex: 5 }}>
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
          cooldownTicks={50}
          warmupTicks={30}
          d3AlphaDecay={0.05}
          d3VelocityDecay={0.4}
          d3AlphaMin={0.001}
          enableNodeDrag={false}
          enableZoomInteraction={false}
          enablePanInteraction={false}
          backgroundColor="transparent"
          onEngineStop={() => {
            if (graphRef.current) {
              graphRef.current.pauseAnimation();

              // Configure d3 forces ONCE after simulation stops
              const fg = graphRef.current;
              fg.d3Force('link')?.distance(80);
              fg.d3Force('charge')?.strength(-200);
              fg.d3Force('link')?.strength(0.4);
            }
          }}
        />
      </div>
    </div>
  );
}
