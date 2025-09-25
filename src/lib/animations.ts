/**
 * Animation Primitives - Premium motion system for Living Portfolio v2
 * Provides reusable animation building blocks with consistent spring physics
 */

import { Variants, Transition, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './utils';

// Spring configurations for different interaction types
export const springConfigs = {
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
    mass: 0.8,
  },
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
    mass: 0.3,
  },
  smooth: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
  premium: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    mass: 0.6,
  },
  magnetic: {
    type: 'spring',
    stiffness: 600,
    damping: 25,
    mass: 0.4,
  },
} as const;

// Easing curves for different contexts
export const easings = {
  premium: [0.22, 1, 0.36, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounce: [0.68, -0.6, 0.32, 1.6] as [number, number, number, number],
  anticipate: [0.6, -0.28, 0.735, 0.045] as [number, number, number, number],
} as const;

// Base animation variants for common patterns
export const baseVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Scale animations with premium easing
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },

  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },

  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },

  // Stagger container for child animations
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  },

  // Magnetic hover effect
  magneticHover: {
    initial: { x: 0, y: 0 },
    hover: { scale: 1.02 },
  },

  // Button press effect
  buttonPress: {
    initial: { scale: 1 },
    hover: { scale: 1.02, y: -1 },
    tap: { scale: 0.98, y: 0 },
  },
} as const;

// Transition presets
export const transitions = {
  fast: { duration: 0.15, ease: easings.smooth },
  base: { duration: 0.2, ease: easings.premium },
  slow: { duration: 0.3, ease: easings.premium },
  slower: { duration: 0.5, ease: easings.premium },
  spring: springConfigs.premium,
  magnetic: springConfigs.magnetic,
  gentle: springConfigs.gentle,
} as const;

/**
 * Magnetic Effect Hook - Creates cursor-following magnetic attraction
 */
export function useMagneticEffect(strength: number = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfigs.magnetic);
  const springY = useSpring(y, springConfigs.magnetic);

  const handleMouseMove = (event: MouseEvent, element: HTMLElement) => {
    if (prefersReducedMotion()) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    x: springX,
    y: springY,
    handleMouseMove,
    handleMouseLeave,
  };
}

/**
 * Glow Effect Hook - Creates ambient cursor-responsive glow
 */
export function useGlowEffect() {
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);

  const springX = useSpring(glowX, springConfigs.gentle);
  const springY = useSpring(glowY, springConfigs.gentle);
  const springOpacity = useSpring(glowOpacity, springConfigs.smooth);

  const updateGlow = (event: MouseEvent, element: HTMLElement) => {
    if (prefersReducedMotion()) return;

    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    glowX.set(x);
    glowY.set(y);
    glowOpacity.set(0.6);
  };

  const hideGlow = () => {
    glowOpacity.set(0);
  };

  return {
    x: springX,
    y: springY,
    opacity: springOpacity,
    updateGlow,
    hideGlow,
  };
}

/**
 * Morphing Text Animation Variants
 */
export function createMorphingTextVariants(texts: string[]) {
  const variants: Record<string, any> = {};

  texts.forEach((text, index) => {
    variants[`state${index}`] = {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easings.premium,
        opacity: { duration: 0.3 },
        y: { duration: 0.6 },
        scale: { duration: 0.6 },
      },
    };
  });

  variants.exit = {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: easings.premium,
    },
  };

  return variants;
}

/**
 * Liquid Morph Animation for Navigation Indicators
 */
export const liquidMorphVariants = {
  initial: {
    scaleX: 0,
    opacity: 0,
  },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
      opacity: {
        duration: 0.2,
        ease: easings.smooth,
      },
    },
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easings.smooth,
    },
  },
} as const;

/**
 * Scroll-triggered Animation Hook
 */
export function useScrollTrigger(threshold: number = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useMotionValue(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.set(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, isVisible]);

  return { ref, isVisible };
}

/**
 * Staggered Animation Hook for Multiple Elements
 */
export function useStaggeredAnimation(count: number, delay: number = 0.1) {
  const variants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easings.premium,
      },
    },
  };

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
      },
    },
  };

  return { variants, containerVariants };
}

/**
 * Variable Font Weight Animation
 */
export const variableFontVariants = {
  initial: { fontWeight: 400 },
  hover: {
    fontWeight: 600,
    transition: {
      duration: 0.3,
      ease: easings.premium,
    },
  },
} as const;

/**
 * Glass Panel Hover Effects
 */
export const glassPanelVariants = {
  initial: {},
  hover: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: {
      duration: 0.3,
      ease: easings.premium,
    },
  },
} as const;

/**
 * Breathing Animation for Ambient Effects
 */
export const breathingVariants = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.6, 0.8, 0.6],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
} as const;

/**
 * Chromatic Aberration Effect for Glass Edges
 */
export function createChromaticAberrationEffect(intensity: number = 1) {
  return {
    filter: `
      drop-shadow(${intensity}px 0px 0px rgba(255, 0, 0, 0.1))
      drop-shadow(-${intensity}px 0px 0px rgba(0, 0, 255, 0.1))
    `,
  };
}

/**
 * Performance-optimized Animation Hook
 * Uses will-change for GPU acceleration
 */
export function useOptimizedAnimation() {
  const ref = useRef<HTMLElement>(null);

  const enableAnimation = () => {
    if (ref.current) {
      ref.current.style.willChange = 'transform, opacity';
    }
  };

  const disableAnimation = () => {
    if (ref.current) {
      ref.current.style.willChange = 'auto';
    }
  };

  return {
    ref,
    enableAnimation,
    disableAnimation,
  };
}