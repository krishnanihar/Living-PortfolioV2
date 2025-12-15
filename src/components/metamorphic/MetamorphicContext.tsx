'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Metamorphic Fractal Reflections - Narrative Context
 *
 * Manages scroll-driven narrative state with 3-act color progression:
 * - Act I (0-25%): Purple - The Approach (seduction)
 * - Act II (25-65%): Magenta - The Dissolution (transformation)
 * - Act III (65-100%): Cyan - The Integration (clarity)
 */

// Color definitions (RGB format for dynamic opacity)
const COLORS = {
  purple: { r: 147, g: 51, b: 234 },   // Act I - Seduction
  magenta: { r: 255, g: 0, b: 122 },   // Act II - Dissolution
  cyan: { r: 0, g: 255, b: 255 },      // Act III - Integration
  pink: { r: 236, g: 72, b: 153 },     // Secondary accent
  orange: { r: 255, g: 184, b: 0 },    // Process accent
} as const;

// Act thresholds (scroll percentages)
const ACT_THRESHOLDS = {
  actOne: { start: 0, end: 0.25 },
  actTwo: { start: 0.25, end: 0.65 },
  actThree: { start: 0.65, end: 1 },
} as const;

// Types
interface RGB {
  r: number;
  g: number;
  b: number;
}

interface AtmosphereColor {
  primary: string;      // RGB: "147, 51, 234"
  secondary: string;    // RGB: "236, 72, 153"
  glow: string;         // RGB: "147, 51, 234"
  hex: string;          // "#9333ea"
}

interface MetamorphicState {
  scrollProgress: number;
  currentAct: 1 | 2 | 3;
  atmosphereColor: AtmosphereColor;
  isInteracting: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

interface MetamorphicContextValue extends MetamorphicState {
  setIsInteracting: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  getActProgress: (act: 1 | 2 | 3) => number;
}

// Context
const MetamorphicContext = createContext<MetamorphicContextValue | null>(null);

// Helper: Interpolate between two colors
function interpolateColor(from: RGB, to: RGB, t: number): RGB {
  const clampedT = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(from.r + (to.r - from.r) * clampedT),
    g: Math.round(from.g + (to.g - from.g) * clampedT),
    b: Math.round(from.b + (to.b - from.b) * clampedT),
  };
}

// Helper: RGB to string
function rgbToString(rgb: RGB): string {
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

// Helper: RGB to hex
function rgbToHex(rgb: RGB): string {
  return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
}

// Get atmosphere color based on scroll progress
function getAtmosphereColor(scrollProgress: number): AtmosphereColor {
  let primary: RGB;
  let secondary: RGB;

  if (scrollProgress < ACT_THRESHOLDS.actOne.end) {
    // Act I: Pure purple
    primary = COLORS.purple;
    secondary = COLORS.pink;
  } else if (scrollProgress < ACT_THRESHOLDS.actTwo.end) {
    // Act II: Interpolate purple → magenta
    const t = (scrollProgress - ACT_THRESHOLDS.actTwo.start) /
              (ACT_THRESHOLDS.actTwo.end - ACT_THRESHOLDS.actTwo.start);
    primary = interpolateColor(COLORS.purple, COLORS.magenta, t);
    secondary = interpolateColor(COLORS.pink, COLORS.orange, t);
  } else {
    // Act III: Interpolate magenta → cyan
    const t = (scrollProgress - ACT_THRESHOLDS.actThree.start) /
              (ACT_THRESHOLDS.actThree.end - ACT_THRESHOLDS.actThree.start);
    primary = interpolateColor(COLORS.magenta, COLORS.cyan, t);
    secondary = interpolateColor(COLORS.orange, COLORS.purple, t);
  }

  return {
    primary: rgbToString(primary),
    secondary: rgbToString(secondary),
    glow: rgbToString(primary),
    hex: rgbToHex(primary),
  };
}

// Get current act based on scroll progress
function getCurrentAct(scrollProgress: number): 1 | 2 | 3 {
  if (scrollProgress < ACT_THRESHOLDS.actOne.end) return 1;
  if (scrollProgress < ACT_THRESHOLDS.actTwo.end) return 2;
  return 3;
}

// Provider component
interface MetamorphicProviderProps {
  children: React.ReactNode;
}

export function MetamorphicProvider({ children }: MetamorphicProviderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;

      if (maxScroll > 0) {
        const progress = Math.max(0, Math.min(1, scrollPosition / maxScroll));
        setScrollProgress(progress);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section helper
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Get progress within a specific act (0-1)
  const getActProgress = useCallback((act: 1 | 2 | 3): number => {
    const thresholds = act === 1
      ? ACT_THRESHOLDS.actOne
      : act === 2
        ? ACT_THRESHOLDS.actTwo
        : ACT_THRESHOLDS.actThree;

    if (scrollProgress < thresholds.start) return 0;
    if (scrollProgress > thresholds.end) return 1;

    return (scrollProgress - thresholds.start) / (thresholds.end - thresholds.start);
  }, [scrollProgress]);

  // Memoized derived state
  const currentAct = useMemo(() => getCurrentAct(scrollProgress), [scrollProgress]);
  const atmosphereColor = useMemo(() => getAtmosphereColor(scrollProgress), [scrollProgress]);

  // Context value
  const value = useMemo<MetamorphicContextValue>(() => ({
    scrollProgress,
    currentAct,
    atmosphereColor,
    isInteracting,
    isMobile,
    prefersReducedMotion,
    setIsInteracting,
    scrollToSection,
    getActProgress,
  }), [
    scrollProgress,
    currentAct,
    atmosphereColor,
    isInteracting,
    isMobile,
    prefersReducedMotion,
    scrollToSection,
    getActProgress,
  ]);

  return (
    <MetamorphicContext.Provider value={value}>
      {children}
    </MetamorphicContext.Provider>
  );
}

// Hook to use context
export function useMetamorphic(): MetamorphicContextValue {
  const context = useContext(MetamorphicContext);
  if (!context) {
    throw new Error('useMetamorphic must be used within a MetamorphicProvider');
  }
  return context;
}

// Export constants for use in other components
export { COLORS, ACT_THRESHOLDS };
export type { RGB, AtmosphereColor, MetamorphicState };
