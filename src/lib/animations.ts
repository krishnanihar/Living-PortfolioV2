/**
 * Animation Primitives - Essential motion system for Living Portfolio v2
 * Only includes actively used animation functions
 */

import { MotionValue, useMotionValue, useSpring } from 'framer-motion';
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
} as const;

// Transition presets
export const transitions = {
  fast: { duration: 0.15, ease: easings.smooth },
  base: { duration: 0.2, ease: easings.premium },
  slow: { duration: 0.3, ease: easings.premium },
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