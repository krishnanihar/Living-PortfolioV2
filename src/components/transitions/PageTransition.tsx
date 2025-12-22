'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelectedLayoutSegment } from 'next/navigation';
import { FrozenRouter } from './FrozenRouter';

interface PageTransitionProps {
  children: ReactNode;
}

// Transition configuration matching the portfolio's design system
const transitionConfig = {
  duration: {
    exit: 0.3,
    enter: 0.5,
  },
  // Premium easing from animations.ts
  ease: [0.22, 1, 0.36, 1] as const,
  blur: {
    initial: 16,
    exit: 12,
  },
  scale: {
    initial: 1.02,
    exit: 0.98,
  },
};

// Full animation variants - glassmorphism-inspired fade + blur
const pageVariants = {
  initial: {
    opacity: 0,
    filter: `blur(${transitionConfig.blur.initial}px)`,
    scale: transitionConfig.scale.initial,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: transitionConfig.duration.enter,
      ease: transitionConfig.ease,
      delay: 0.05, // Slight overlap with exit for smoothness
    },
  },
  exit: {
    opacity: 0,
    filter: `blur(${transitionConfig.blur.exit}px)`,
    scale: transitionConfig.scale.exit,
    transition: {
      duration: transitionConfig.duration.exit,
      ease: transitionConfig.ease,
    },
  },
};

// Reduced motion variants - simple opacity fade
const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const segment = useSelectedLayoutSegment();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment || 'root'}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
