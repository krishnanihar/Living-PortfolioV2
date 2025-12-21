'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface PoeticTextProps {
  lines: string[];
  // Legacy props - kept for compatibility but no longer used
  scrollProgress?: number;
  scrollRange?: [number, number];
  align?: 'left' | 'center' | 'right';
  size?: 'display' | 'heading' | 'body' | 'caption';
  className?: string;
  style?: React.CSSProperties;
  persistAfterRange?: boolean;
  /** Delay between each line appearing (in seconds) */
  staggerDelay?: number;
  /** How far down the viewport the element should be before animating (0-1, default 0.6 = 60% from top) */
  viewportThreshold?: number;
}

/**
 * Poetic text component with line-by-line reveal animation
 * Inspired by David Whyte's flowing text alongside watercolor fragments
 *
 * Uses viewport-based triggering - each line appears when the container
 * is visible on screen (slightly below center by default)
 */
export function ClearaPoeticText({
  lines,
  align = 'left',
  size = 'body',
  className,
  style,
  staggerDelay = 0.15,
  viewportThreshold = 0.4, // Trigger when 40% visible (appears when ~60% down screen)
}: PoeticTextProps) {
  // Typography styles based on size
  const sizeStyles: Record<string, React.CSSProperties> = {
    display: {
      fontFamily: 'var(--font-cormorant), Cormorant Garamond, Georgia, serif',
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    heading: {
      fontFamily: 'var(--font-cormorant), Cormorant Garamond, Georgia, serif',
      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    body: {
      fontFamily: 'var(--font-dm-sans), DM Sans, system-ui, sans-serif',
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: 'var(--font-dm-sans), DM Sans, system-ui, sans-serif',
      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
  };

  const alignStyles: Record<string, React.CSSProperties> = {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
  };

  // Animation variants for each line
  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportThreshold }}
      style={{
        ...alignStyles[align],
        color: 'var(--cleara-text-primary, #2A2A2A)',
        ...style,
      }}
    >
      {lines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          variants={lineVariants}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // Smooth ease-out
            delay: index * staggerDelay,
          }}
          style={{
            ...sizeStyles[size],
            marginBottom: size === 'display' || size === 'heading' ? '0.5em' : '0.75em',
          }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Simple fade-in text block (no line-by-line)
 */
export interface FadeTextProps {
  children: React.ReactNode;
  // Legacy props - kept for compatibility
  scrollProgress?: number;
  scrollRange?: [number, number];
  className?: string;
  style?: React.CSSProperties;
  viewportThreshold?: number;
}

export function ClearaFadeText({
  children,
  className,
  style,
  viewportThreshold = 0.4,
}: FadeTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportThreshold }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        color: 'var(--cleara-text-primary, #2A2A2A)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ClearaPoeticText;
