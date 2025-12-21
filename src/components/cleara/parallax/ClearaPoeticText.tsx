'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export interface PoeticTextProps {
  lines: string[];
  scrollProgress: number;
  scrollRange: [number, number]; // When to animate (0-1)
  align?: 'left' | 'center' | 'right';
  size?: 'display' | 'heading' | 'body' | 'caption';
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number; // Delay between lines
}

/**
 * Poetic text component with line-by-line reveal animation
 * Inspired by David Whyte's flowing text alongside watercolor fragments
 */
export function ClearaPoeticText({
  lines,
  scrollProgress,
  scrollRange,
  align = 'left',
  size = 'body',
  className,
  style,
  staggerDelay = 0.15,
}: PoeticTextProps) {
  // Calculate which lines should be visible
  const { visibleLines, lineOpacities } = useMemo(() => {
    const [start, end] = scrollRange;
    const range = end - start;
    const perLineRange = range / lines.length;

    const visibleLines: number[] = [];
    const lineOpacities: number[] = [];

    lines.forEach((_, index) => {
      const lineStart = start + index * perLineRange;
      const lineEnd = lineStart + perLineRange * 1.5; // Overlap for smooth reveal

      if (scrollProgress >= lineStart - 0.02) {
        visibleLines.push(index);

        // Calculate opacity based on position in range
        if (scrollProgress < lineStart) {
          lineOpacities.push((scrollProgress - (lineStart - 0.02)) / 0.02);
        } else if (scrollProgress > lineEnd) {
          // Fade out gradually after section (0.25 = 25% of scroll for slower fade)
          const fadeProgress = (scrollProgress - lineEnd) / 0.25;
          lineOpacities.push(Math.max(0, 1 - fadeProgress));
        } else {
          lineOpacities.push(1);
        }
      } else {
        lineOpacities.push(0);
      }
    });

    return { visibleLines, lineOpacities };
  }, [scrollProgress, scrollRange, lines.length]);

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

  return (
    <div
      className={className}
      style={{
        ...alignStyles[align],
        color: 'var(--cleara-text-primary, #2A2A2A)',
        ...style,
      }}
    >
      {lines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{
            opacity: lineOpacities[index] ?? 0,
            y: (lineOpacities[index] ?? 0) > 0.5 ? 0 : 20,
            filter: (lineOpacities[index] ?? 0) > 0.5 ? 'blur(0px)' : 'blur(4px)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
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
    </div>
  );
}

/**
 * Simple fade-in text block (no line-by-line)
 */
export interface FadeTextProps {
  children: React.ReactNode;
  scrollProgress: number;
  scrollRange: [number, number];
  className?: string;
  style?: React.CSSProperties;
}

export function ClearaFadeText({
  children,
  scrollProgress,
  scrollRange,
  className,
  style,
}: FadeTextProps) {
  const opacity = useMemo(() => {
    const [start, end] = scrollRange;
    const fadeIn = 0.05;
    const fadeOut = 0.05;

    if (scrollProgress < start - fadeIn || scrollProgress > end + fadeOut) {
      return 0;
    }

    if (scrollProgress < start) {
      return (scrollProgress - (start - fadeIn)) / fadeIn;
    }

    if (scrollProgress > end) {
      return 1 - (scrollProgress - end) / fadeOut;
    }

    return 1;
  }, [scrollProgress, scrollRange]);

  return (
    <motion.div
      className={className}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
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
