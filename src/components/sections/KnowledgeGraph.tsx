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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });
  const [particles, setParticles] = useState<Particle[]>([]);
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
          height: Math.min(700, window.innerHeight * 0.7),
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

  // Particle system for active connections
  useEffect(() => {
    if (!hoveredNode && !selectedNode) {
      setParticles([]);
      return;
    }

    const activeNode = hoveredNode || selectedNode;
    const relevantLinks = graphData.links.filter(
      link => {
        const source = typeof link.source === 'string' ? link.source : link.source.id;
        const target = typeof link.target === 'string' ? link.target : link.target.id;
        return source === activeNode || target === activeNode;
      }
    );

    const newParticles: Particle[] = relevantLinks.flatMap(link =>
      Array.from({ length: 2 }, (_, i) => ({
        link,
        progress: i * 0.5,
        speed: 0.01 + Math.random() * 0.01,
      }))
    );

    setParticles(newParticles);
  }, [hoveredNode, selectedNode, graphData.links]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const animate = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          progress: (p.progress + p.speed) % 1,
        }))
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length]);

  // Custom node rendering with beautiful gradients and glows
  const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = node.type === 'concept' ? 11 : 12;
    const scaledFontSize = fontSize / globalScale;
    const baseSize = Math.sqrt(node.val) * 1.8; // Slightly larger multiplier
    const nodeSize = baseSize / Math.pow(globalScale, 0.3); // Scale more gracefully with zoom

    // Determine node appearance based on state
    const isHovered = hoveredNode === node.id;
    const isSelected = selectedNode === node.id;
    const isConnectedToHovered = hoveredNode && graphData.links.some(
      link => {
        const source = typeof link.source === 'object' ? link.source.id : link.source;
        const target = typeof link.target === 'object' ? link.target.id : link.target;
        return (source === hoveredNode && target === node.id) ||
               (target === hoveredNode && source === node.id);
      }
    );

    let opacity = 1;
    let scale = 1;
    if (hoveredNode && !isHovered && !isConnectedToHovered) {
      opacity = 0.15;
    }
    if (isHovered) {
      scale = 1.3;
    }

    const finalSize = nodeSize * scale;

    // Pulsing effect for concept nodes
    let pulseScale = 1;
    if (node.type === 'concept') {
      pulseScale = 1 + Math.sin(pulsePhase) * 0.05;
    }

    ctx.save();

    // Outer glow (aura)
    if (isHovered || isSelected) {
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalSize * 2.5 * pulseScale);
      gradient.addColorStop(0, `${node.color}60`);
      gradient.addColorStop(0.5, `${node.color}20`);
      gradient.addColorStop(1, `${node.color}00`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, finalSize * 2.5 * pulseScale, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Main glow
    const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalSize * 1.8 * pulseScale);
    glowGradient.addColorStop(0, `${node.color}${Math.round(opacity * 200).toString(16).padStart(2, '0')}`);
    glowGradient.addColorStop(0.5, `${node.color}${Math.round(opacity * 120).toString(16).padStart(2, '0')}`);
    glowGradient.addColorStop(1, `${node.color}00`);
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, finalSize * 1.8 * pulseScale, 0, 2 * Math.PI);
    ctx.fill();

    // Core gradient (bright center)
    const coreGradient = ctx.createRadialGradient(
      node.x - finalSize * 0.3,
      node.y - finalSize * 0.3,
      0,
      node.x,
      node.y,
      finalSize * pulseScale
    );
    coreGradient.addColorStop(0, `${node.color}FF`);
    coreGradient.addColorStop(0.6, `${node.color}${Math.round(opacity * 240).toString(16).padStart(2, '0')}`);
    coreGradient.addColorStop(1, `${node.color}${Math.round(opacity * 180).toString(16).padStart(2, '0')}`);

    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, finalSize * pulseScale, 0, 2 * Math.PI);
    ctx.fill();

    // Outer ring for books/games (showing progress/completion)
    if (node.type !== 'concept') {
      const progress = node.metadata?.progress ?? node.metadata?.hoursPlayed ?? 0;
      const ringProgress = node.type === 'book' ? progress / 100 : Math.min(progress / 150, 1);

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
      ctx.lineWidth = 2 / globalScale;
      ctx.beginPath();
      ctx.arc(node.x, node.y, finalSize * pulseScale + 3, -Math.PI / 2, -Math.PI / 2 + ringProgress * Math.PI * 2);
      ctx.stroke();
    }

    // Inner highlight (shimmer)
    if (isHovered || isSelected) {
      const highlightGradient = ctx.createRadialGradient(
        node.x - finalSize * 0.4,
        node.y - finalSize * 0.4,
        0,
        node.x,
        node.y,
        finalSize * 0.5
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, finalSize * 0.5 * pulseScale, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();

    // Draw labels
    ctx.save();
    ctx.font = `600 ${scaledFontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Text shadow for readability
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';

    // Concept nodes: always show label
    if (node.type === 'concept') {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
      ctx.fillText(label.toUpperCase(), node.x, node.y + finalSize + scaledFontSize * 1.5);
    }

    // Books/Games: show on hover with glassmorphic card
    if (node.type !== 'concept' && (isHovered || isSelected)) {
      const cardPadding = 12;
      const cardWidth = Math.max(label.length * 7, 120);
      const cardHeight = node.description ? 44 : 32;
      const cardX = node.x - cardWidth / 2;
      const cardY = node.y + finalSize + 15;

      // Glass card background
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.fillStyle = 'rgba(10, 10, 10, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Rounded rectangle
      const radius = 8;
      ctx.beginPath();
      ctx.moveTo(cardX + radius, cardY);
      ctx.lineTo(cardX + cardWidth - radius, cardY);
      ctx.quadraticCurveTo(cardX + cardWidth, cardY, cardX + cardWidth, cardY + radius);
      ctx.lineTo(cardX + cardWidth, cardY + cardHeight - radius);
      ctx.quadraticCurveTo(cardX + cardWidth, cardY + cardHeight, cardX + cardWidth - radius, cardY + cardHeight);
      ctx.lineTo(cardX + radius, cardY + cardHeight);
      ctx.quadraticCurveTo(cardX, cardY + cardHeight, cardX, cardY + cardHeight - radius);
      ctx.lineTo(cardX, cardY + radius);
      ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Title
      ctx.shadowBlur = 0;
      ctx.font = `600 ${scaledFontSize * 1.1}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillText(label, node.x, cardY + (node.description ? 14 : cardHeight / 2));

      // Subtitle
      if (node.description) {
        ctx.font = `400 ${scaledFontSize * 0.85}px Inter, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(node.description, node.x, cardY + 30);
      }
    }

    ctx.restore();
  }, [hoveredNode, selectedNode, graphData.links, pulsePhase]);

  // Custom link rendering with curves and gradients
  const drawLink = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const source = link.source;
    const target = link.target;

    const isConnectedToHovered = hoveredNode &&
      (source.id === hoveredNode || target.id === hoveredNode);
    const isConnectedToSelected = selectedNode &&
      (source.id === selectedNode || target.id === selectedNode);

    let opacity = 0.08;
    let width = 1.5;
    let useGradient = false;

    if (isConnectedToHovered || isConnectedToSelected) {
      opacity = 0.35;
      width = 2.5;
      useGradient = true;
    }

    // Calculate control point for curve
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    const curvature = 0.15;
    const cpx = (source.x + target.x) / 2 + dy * curvature;
    const cpy = (source.y + target.y) / 2 - dx * curvature;

    ctx.save();
    ctx.globalAlpha = opacity;

    if (useGradient) {
      const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
      gradient.addColorStop(0, source.color || 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, target.color || 'rgba(255, 255, 255, 0.8)');
      ctx.strokeStyle = gradient;

      // Add glow
      ctx.shadowBlur = 6;
      ctx.shadowColor = source.color || 'rgba(255, 255, 255, 0.5)';
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    }

    ctx.lineWidth = width / globalScale;
    ctx.lineCap = 'round';

    // Draw curved line
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.quadraticCurveTo(cpx, cpy, target.x, target.y);
    ctx.stroke();

    ctx.restore();

    // Draw particles on active links
    if (useGradient && particles.length > 0) {
      particles.forEach(particle => {
        const particleLink = particle.link;
        const pSource = typeof particleLink.source === 'object' ? particleLink.source : null;
        const pTarget = typeof particleLink.target === 'object' ? particleLink.target : null;

        if (!pSource || !pTarget) return;
        if (pSource.id !== source.id || pTarget.id !== target.id) return;

        const t = particle.progress;
        const x = Math.pow(1 - t, 2) * source.x + 2 * (1 - t) * t * cpx + Math.pow(t, 2) * target.x;
        const y = Math.pow(1 - t, 2) * source.y + 2 * (1 - t) * t * cpy + Math.pow(t, 2) * target.y;

        ctx.save();
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
        particleGradient.addColorStop(0, `${source.color}FF`);
        particleGradient.addColorStop(1, `${source.color}00`);
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });
    }
  }, [hoveredNode, selectedNode, particles]);

  // Handle node click
  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node.id === selectedNode ? null : node.id);
    if (onNodeClick) {
      onNodeClick(node.id === selectedNode ? null : node);
    }
  }, [selectedNode, onNodeClick]);

  // Handle node hover (with debounce)
  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node ? node.id : null);
    document.body.style.cursor = node ? 'pointer' : 'default';
  }, []);

  return (
    <div
      id="knowledge-graph-container"
      style={{
        width: '100%',
        height: dimensions.height,
        background: 'radial-gradient(ellipse at center, rgba(15, 15, 15, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 60px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Floating subtitle */}
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
        opacity: 0.7,
      }}>
        {hoveredNode ? (
          graphData.nodes.find(n => n.id === hoveredNode)?.type === 'concept'
            ? 'Concept connecting ideas...'
            : graphData.nodes.find(n => n.id === hoveredNode)?.type === 'book'
            ? 'Book shaping thinking...'
            : 'Game teaching mechanics...'
        ) : (
          'Interactive knowledge constellation'
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
        cooldownTicks={150}
        warmupTicks={100}
        d3AlphaDecay={0.015}
        d3VelocityDecay={0.25}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        backgroundColor="transparent"
      />
    </div>
  );
}
