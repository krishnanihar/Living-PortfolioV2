'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { animate, stagger } from 'animejs';
import { throttle } from '@/lib/anime-utils';

/**
 * InteractiveGridBackground - Cursor-Reactive Dot Grid
 *
 * Inspired by animejs.com's hero section. Creates a grid of dots that:
 * - Respond to cursor movement with proximity-based highlighting
 * - Create ripple wave effects on click
 * - Have an idle breathing animation when not interacting
 * - Respect reduced motion preferences
 */

interface InteractiveGridBackgroundProps {
  /** Number of columns in the grid (default: 25 on desktop, 15 on mobile) */
  cols?: number;
  /** Number of rows in the grid (default: 15 on desktop, 10 on mobile) */
  rows?: number;
  /** Dot size in pixels (default: 4) */
  dotSize?: number;
  /** Gap between dots in pixels (default: 0, uses CSS grid for spacing) */
  gap?: number;
  /** Highlight radius around cursor in pixels (default: 150) */
  highlightRadius?: number;
  /** Whether to show idle animation (default: true) */
  showIdleAnimation?: boolean;
  /** Custom z-index (default: 0) */
  zIndex?: number;
}

export function InteractiveGridBackground({
  cols: propCols,
  rows: propRows,
  dotSize = 4,
  highlightRadius = 150,
  showIdleAnimation = true,
  zIndex = 0,
}: InteractiveGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const idleAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Determine grid size based on screen size
  const cols = propCols ?? (isMobile ? 15 : 25);
  const rows = propRows ?? (isMobile ? 10 : 15);
  const totalDots = cols * rows;

  // Calculate cell dimensions
  const cellWidth = dimensions.width / cols;
  const cellHeight = dimensions.height / rows;

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);

    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Check mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Start idle animation
  useEffect(() => {
    if (!isClient || prefersReducedMotion || !showIdleAnimation) return;
    if (dotsRef.current.length === 0) return;

    // Create idle breathing wave from center
    idleAnimationRef.current = animate(dotsRef.current, {
      scale: [
        { to: 1.3, duration: 1200, ease: 'inOutSine' },
        { to: 1, duration: 1200, ease: 'inOutSine' },
      ],
      opacity: [
        { to: 0.35, duration: 1200 },
        { to: 0.15, duration: 1200 },
      ],
      delay: stagger(25, { grid: [cols, rows], from: 'center' }),
      loop: true,
    });

    return () => {
      if (idleAnimationRef.current) {
        idleAnimationRef.current.pause();
      }
    };
  }, [isClient, prefersReducedMotion, showIdleAnimation, cols, rows]);

  // Handle mouse move - highlight dots near cursor
  const handleMouseMove = useMemo(() => {
    if (prefersReducedMotion) return undefined;

    return throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        const col = index % cols;
        const row = Math.floor(index / cols);
        const dotX = col * cellWidth + cellWidth / 2;
        const dotY = row * cellHeight + cellHeight / 2;

        const distance = Math.hypot(mouseX - dotX, mouseY - dotY);

        if (distance < highlightRadius) {
          const intensity = 1 - distance / highlightRadius;
          const scale = 1 + intensity * 0.8;
          const opacity = 0.15 + intensity * 0.6;

          dot.style.transform = `scale(${scale})`;
          dot.style.opacity = String(opacity);
          dot.style.backgroundColor = `rgba(var(--metamorphic-accent-rgb), ${0.3 + intensity * 0.5})`;
        } else {
          dot.style.transform = 'scale(1)';
          dot.style.opacity = '0.15';
          dot.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        }
      });
    }, 16); // ~60fps
  }, [prefersReducedMotion, cols, rows, cellWidth, cellHeight, highlightRadius]);

  // Reset dots on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;

    dotsRef.current.forEach((dot) => {
      if (!dot) return;
      dot.style.transform = 'scale(1)';
      dot.style.opacity = '0.15';
      dot.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    });
  }, [prefersReducedMotion]);

  // Handle click - create ripple wave
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate clicked grid cell
      const clickedCol = Math.floor(mouseX / cellWidth);
      const clickedRow = Math.floor(mouseY / cellHeight);
      const clickedIndex = clickedRow * cols + clickedCol;

      // Pause idle animation during ripple
      if (idleAnimationRef.current) {
        idleAnimationRef.current.pause();
      }

      // Create ripple effect
      animate(dotsRef.current, {
        scale: [
          { to: 2, duration: 150, ease: 'outSine' },
          { to: 1, duration: 500, ease: 'outQuad' },
        ],
        backgroundColor: [
          { to: 'rgba(147, 51, 234, 0.8)', duration: 150 },
          { to: 'rgba(255, 255, 255, 0.15)', duration: 500 },
        ],
        opacity: [
          { to: 0.9, duration: 150 },
          { to: 0.15, duration: 500 },
        ],
        delay: stagger(35, {
          grid: [cols, rows],
          from: clickedIndex,
        }),
        onComplete: () => {
          // Resume idle animation after ripple
          if (idleAnimationRef.current && showIdleAnimation) {
            idleAnimationRef.current.restart();
          }
        },
      });
    },
    [prefersReducedMotion, cellWidth, cellHeight, cols, rows, showIdleAnimation]
  );

  // Generate dots array
  const dots = useMemo(() => {
    return Array.from({ length: totalDots }, (_, index) => (
      <div
        key={index}
        ref={(el) => {
          if (el) dotsRef.current[index] = el;
        }}
        className="grid-dot"
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          opacity: 0.15,
          transition: prefersReducedMotion ? 'none' : 'transform 0.15s ease-out',
          willChange: 'transform, opacity, background-color',
        }}
        aria-hidden="true"
      />
    ));
  }, [totalDots, dotSize, prefersReducedMotion]);

  if (!isClient) {
    return null; // SSR: render nothing
  }

  return (
    <div
      ref={containerRef}
      className="interactive-grid-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        placeItems: 'center',
        pointerEvents: 'auto',
        cursor: 'crosshair',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {dots}
    </div>
  );
}

export default InteractiveGridBackground;
