'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RefreshCw, Download, Maximize2, Minimize2 } from 'lucide-react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * FractalGenerator - Interactive Kaleidoscope Canvas
 *
 * Touch/mouse-reactive canvas that creates kaleidoscopic patterns:
 * - 6-fold symmetry (hexagonal kaleidoscope)
 * - Colors match current narrative act
 * - Draw trails that fade over time
 * - Export/save functionality
 */

interface Point {
  x: number;
  y: number;
  age: number;
  color: string;
  size: number;
}

export function FractalGenerator() {
  const { atmosphereColor, isMobile, prefersReducedMotion, setIsInteracting, currentAct } = useMetamorphic();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Number of kaleidoscope segments
  const SEGMENTS = 6;
  const MAX_POINTS = 500;
  const FADE_RATE = 0.995;
  const POINT_LIFETIME = 200;

  // Get canvas dimensions
  const getCanvasSize = useCallback(() => {
    if (!containerRef.current) return { width: 400, height: 400 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      width: rect.width,
      height: Math.min(rect.width, isExpanded ? window.innerHeight * 0.7 : 400),
    };
  }, [isExpanded]);

  // Resize canvas
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = getCanvasSize();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, [getCanvasSize]);

  // Get color based on position and act
  const getColor = useCallback((x: number, y: number, centerX: number, centerY: number) => {
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const angle = Math.atan2(y - centerY, x - centerX);
    const hue = ((angle / Math.PI + 1) * 180 + distance * 0.5) % 360;

    // Base hue shifts based on act
    const actHueShift = currentAct === 1 ? 270 : currentAct === 2 ? 330 : 180;
    const finalHue = (hue + actHueShift) % 360;

    return `hsla(${finalHue}, 80%, 60%, 0.8)`;
  }, [currentAct]);

  // Add point at position
  const addPoint = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const { width, height } = getCanvasSize();
    const centerX = width / 2;
    const centerY = height / 2;

    pointsRef.current.push({
      x,
      y,
      age: 0,
      color: getColor(x, y, centerX, centerY),
      size: 3 + Math.random() * 4,
    });

    // Limit points
    if (pointsRef.current.length > MAX_POINTS) {
      pointsRef.current.shift();
    }
  }, [getCanvasSize, getColor]);

  // Draw kaleidoscope pattern
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = getCanvasSize();
    const centerX = width / 2;
    const centerY = height / 2;

    // Fade existing content
    ctx.fillStyle = `rgba(0, 0, 0, ${1 - FADE_RATE})`;
    ctx.fillRect(0, 0, width, height);

    // Draw points with kaleidoscope effect
    const points = pointsRef.current;
    const angleStep = (2 * Math.PI) / SEGMENTS;

    for (let i = points.length - 1; i >= 0; i--) {
      const point = points[i];
      point.age++;

      // Remove old points
      if (point.age > POINT_LIFETIME) {
        points.splice(i, 1);
        continue;
      }

      // Calculate opacity based on age
      const opacity = 1 - point.age / POINT_LIFETIME;

      // Draw in each segment
      for (let s = 0; s < SEGMENTS; s++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angleStep * s);

        // Original point
        const relX = point.x - centerX;
        const relY = point.y - centerY;

        ctx.beginPath();
        ctx.arc(relX, relY, point.size * opacity, 0, Math.PI * 2);
        ctx.fillStyle = point.color.replace(/[\d.]+\)$/, `${opacity * 0.8})`);
        ctx.fill();

        // Mirrored point
        ctx.beginPath();
        ctx.arc(-relX, relY, point.size * opacity, 0, Math.PI * 2);
        ctx.fillStyle = point.color.replace(/[\d.]+\)$/, `${opacity * 0.6})`);
        ctx.fill();

        ctx.restore();
      }
    }

    animationRef.current = requestAnimationFrame(drawFrame);
  }, [getCanvasSize]);

  // Mouse/touch handlers
  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDrawing(true);
    setIsInteracting(true);
    addPoint(clientX, clientY);
  }, [addPoint, setIsInteracting]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDrawing) return;
    addPoint(clientX, clientY);
  }, [isDrawing, addPoint]);

  const handleEnd = useCallback(() => {
    setIsDrawing(false);
    setIsInteracting(false);
  }, [setIsInteracting]);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  const onTouchEnd = () => handleEnd();

  // Clear canvas
  const handleClear = () => {
    pointsRef.current = [];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = getCanvasSize();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
  };

  // Download canvas as image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'metamorphic-fractal.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Initialize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Start animation loop
  useEffect(() => {
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(drawFrame);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawFrame, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-50)' }}>
          Interactive fractal generator disabled due to reduced motion preference.
        </p>
      </section>
    );
  }

  const brandRgb = '147, 51, 234';

  return (
    <section
      id="fractal-generator"
      style={{
        padding: isMobile ? '3rem 1.5rem' : '5rem 2rem',
        maxWidth: isExpanded ? '100%' : '800px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2
          style={{
            fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: '200',
            letterSpacing: '-0.02em',
            color: 'var(--text-95)',
            marginBottom: '0.75rem',
          }}
        >
          Create Your Own Fractal
        </h2>
        <p
          style={{
            color: 'var(--text-60)',
            fontSize: isMobile ? '0.875rem' : '0.9375rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          Draw with your {isMobile ? 'finger' : 'mouse'} to generate kaleidoscopic patterns
        </p>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#000',
          border: `1px solid rgba(${atmosphereColor.primary}, 0.2)`,
          boxShadow: `0 0 60px rgba(${atmosphereColor.primary}, 0.1)`,
          transition: 'all 0.5s ease',
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            display: 'block',
            cursor: 'crosshair',
            touchAction: 'none',
          }}
        />

        {/* Controls overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <ControlButton
            icon={RefreshCw}
            label="Clear"
            onClick={handleClear}
            color={atmosphereColor.primary}
          />
          <ControlButton
            icon={Download}
            label="Save"
            onClick={handleDownload}
            color={atmosphereColor.primary}
          />
          <ControlButton
            icon={isExpanded ? Minimize2 : Maximize2}
            label={isExpanded ? 'Shrink' : 'Expand'}
            onClick={toggleExpanded}
            color={atmosphereColor.primary}
          />
        </div>

        {/* Instructions overlay (shows briefly) */}
        {pointsRef.current.length === 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                padding: '1rem 2rem',
                borderRadius: '100px',
                background: 'var(--glass-08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-15)',
                color: 'var(--text-60)',
                fontSize: '0.875rem',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              {isMobile ? 'Touch and drag to draw' : 'Click and drag to draw'}
            </div>
          </div>
        )}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

// Control button component
interface ControlButtonProps {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  onClick: () => void;
  color: string;
}

function ControlButton({ icon: Icon, label, onClick, color }: ControlButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      title={label}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        background: isHovered ? `rgba(${color}, 0.2)` : 'var(--glass-08)',
        backdropFilter: 'blur(20px)',
        border: isHovered ? `1px solid rgba(${color}, 0.4)` : '1px solid var(--glass-15)',
        color: 'var(--text-80)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      <Icon size={18} />
    </button>
  );
}

export default FractalGenerator;
