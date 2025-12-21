'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Narrative Acts Structure for Cleara (David Whyte style)
 * Act I (0-30%): Empathy - Living with the disease, patient struggles
 * Act II (30-70%): Discovery - Research, innovation, solution design
 * Act III (70-100%): Impact - Validation, outcomes, future vision
 */

export type ClearaAct = 'empathy' | 'discovery' | 'impact';

export interface ClearaScrollState {
  progress: number; // 0-1 overall scroll progress
  act: ClearaAct;
  actProgress: number; // 0-1 progress within current act
  section: number; // Current section index (0-based)
  velocity: number; // Scroll velocity for dynamic effects
  direction: 'up' | 'down' | 'idle';
  // Parallax depth calculations
  depth: {
    camera: number; // Camera Z position
    layerFar: number; // Far layer offset
    layerMid: number; // Mid layer offset
    layerNear: number; // Near layer offset
  };
  // Watercolor color journey
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const ACT_BOUNDARIES = {
  empathy: { start: 0, end: 0.3 },
  discovery: { start: 0.3, end: 0.7 },
  impact: { start: 0.7, end: 1.0 },
};

// Depth range for parallax camera
const DEPTH_RANGE = {
  start: 100, // Camera starts here
  end: -400, // Camera ends here (scrolled through)
};

/**
 * Hook for Cleara scroll-driven narrative
 * Provides scroll progress, act transitions, and parallax depth calculations
 */
export function useClearaScroll(
  containerRef?: React.RefObject<HTMLElement>
): ClearaScrollState {
  const [state, setState] = useState<ClearaScrollState>({
    progress: 0,
    act: 'empathy',
    actProgress: 0,
    section: 0,
    velocity: 0,
    direction: 'idle',
    depth: {
      camera: DEPTH_RANGE.start,
      layerFar: 0,
      layerMid: 0,
      layerNear: 0,
    },
    color: {
      primary: '#D4A5A5', // Warm Blush
      secondary: '#8B9DC3', // Dusty Lavender
      accent: '#B8C5E2', // Soft Periwinkle
    },
  });

  const previousProgress = useRef(0);
  const previousTime = useRef(Date.now());

  const calculateState = useCallback((scrollProgress: number): ClearaScrollState => {
    const now = Date.now();
    const timeDelta = Math.max(now - previousTime.current, 1);
    const progressDelta = scrollProgress - previousProgress.current;
    const velocity = Math.abs(progressDelta) / timeDelta * 1000;
    const direction = progressDelta > 0.001 ? 'down' : progressDelta < -0.001 ? 'up' : 'idle';

    // Determine current act
    let act: ClearaAct;
    let actProgress: number;

    if (scrollProgress < ACT_BOUNDARIES.empathy.end) {
      act = 'empathy';
      actProgress = scrollProgress / ACT_BOUNDARIES.empathy.end;
    } else if (scrollProgress < ACT_BOUNDARIES.discovery.end) {
      act = 'discovery';
      actProgress = (scrollProgress - ACT_BOUNDARIES.discovery.start) /
        (ACT_BOUNDARIES.discovery.end - ACT_BOUNDARIES.discovery.start);
    } else {
      act = 'impact';
      actProgress = (scrollProgress - ACT_BOUNDARIES.impact.start) /
        (ACT_BOUNDARIES.impact.end - ACT_BOUNDARIES.impact.start);
    }

    // Calculate parallax depths
    const depthProgress = scrollProgress;
    const camera = DEPTH_RANGE.start + (DEPTH_RANGE.end - DEPTH_RANGE.start) * depthProgress;
    const depth = {
      camera,
      layerFar: camera * 0.3, // Slowest
      layerMid: camera * 0.6, // Medium
      layerNear: camera * 1.2, // Fastest
    };

    // Watercolor color journey (soft transitions)
    let color: ClearaScrollState['color'];

    if (act === 'empathy') {
      // Warm Blush → Dusty Lavender
      const t = actProgress;
      color = {
        primary: interpolateColor('#D4A5A5', '#8B9DC3', t),
        secondary: interpolateColor('#E8C4C4', '#A8B8D8', t),
        accent: '#B8C5E2',
      };
    } else if (act === 'discovery') {
      // Dusty Lavender → Soft Periwinkle
      const t = actProgress;
      color = {
        primary: interpolateColor('#8B9DC3', '#B8C5E2', t),
        secondary: interpolateColor('#A8B8D8', '#C8D5EA', t),
        accent: '#A8C5B5',
      };
    } else {
      // Soft Periwinkle → Soft Sage
      const t = actProgress;
      color = {
        primary: interpolateColor('#B8C5E2', '#A8C5B5', t),
        secondary: interpolateColor('#C8D5EA', '#B8D5C5', t),
        accent: '#D4A5A5',
      };
    }

    // Calculate section (for 10 logical sections)
    const section = Math.floor(scrollProgress * 10);

    previousProgress.current = scrollProgress;
    previousTime.current = now;

    return {
      progress: scrollProgress,
      act,
      actProgress: Math.min(1, Math.max(0, actProgress)),
      section,
      velocity,
      direction,
      depth,
      color,
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let scrollProgress: number;

          if (containerRef?.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrolled = -rect.top;
            const totalScroll = containerHeight - viewportHeight;
            scrollProgress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
          } else {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            scrollProgress = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
          }

          setState(calculateState(scrollProgress));
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef, calculateState]);

  return state;
}

// Helper: Interpolate between two hex colors
function interpolateColor(color1: string, color2: string, t: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default useClearaScroll;
