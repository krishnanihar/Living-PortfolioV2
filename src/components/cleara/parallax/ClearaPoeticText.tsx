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
  persistAfterRange?: boolean; // If true, text stays visible after scrollRange ends
}

/**
 * Poetic text component with line-by-line reveal animation
 * Inspired by David Whyte's flowing text alongside watercolor fragments
 *
 * Pure scroll-driven animation - each line appears sequentially as you scroll
 */
export function ClearaPoeticText({
  lines,
  scrollProgress,
  scrollRange,
  align = 'left',
  size = 'body',
  className,
  style,
  persistAfterRange = false,
}: PoeticTextProps) {
  // Calculate animation progress for each line
  const lineAnimations = useMemo(() => {
    const [start, end] = scrollRange;
    const range = end - start;

    // Each line gets an equal portion of the scroll range
    const perLineRange = range / lines.length;
    // Add overlap so lines fade in smoothly before previous line is fully done
    const fadeInDuration = perLineRange * 0.6;
    // Fade out duration is proportional to the range (not a fixed value)
    const fadeOutDuration = range * 0.5;

    return lines.map((_, index) => {
      // Stagger: each line starts slightly after the previous
      const lineStart = start + index * perLineRange * 0.7;
      const linePeak = lineStart + fadeInDuration;
      const sectionEnd = end;
      const lineEnd = sectionEnd + fadeOutDuration;

      let opacity = 0;
      let progress = 0; // 0 = hidden, 1 = fully visible

      if (scrollProgress < lineStart) {
        // Before this line should appear
        opacity = 0;
        progress = 0;
      } else if (scrollProgress < linePeak) {
        // Fading in
        progress = (scrollProgress - lineStart) / fadeInDuration;
        opacity = progress;
      } else if (scrollProgress <= sectionEnd || persistAfterRange) {
        // Fully visible (within range or persisting)
        opacity = 1;
        progress = 1;
      } else if (scrollProgress < lineEnd) {
        // Fading out (only if not persisting)
        const fadeProgress = (scrollProgress - sectionEnd) / fadeOutDuration;
        opacity = Math.max(0, 1 - fadeProgress);
        progress = 1 - fadeProgress;
      } else {
        // Fully hidden
        opacity = 0;
        progress = 0;
      }

      return {
        opacity: Math.max(0, Math.min(1, opacity)),
        // Smooth y and blur transitions based on progress
        y: 20 * (1 - Math.min(1, progress * 1.5)), // Reaches 0 at ~67% progress
        blur: 4 * (1 - Math.min(1, progress * 2)), // Clears at ~50% progress
      };
    });
  }, [scrollProgress, scrollRange, lines.length, persistAfterRange]);

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
      {lines.map((line, index) => {
        const anim = lineAnimations[index];
        return (
          <motion.div
            key={`${line}-${index}`}
            animate={{
              opacity: anim.opacity,
              y: anim.y,
              filter: `blur(${anim.blur}px)`,
            }}
            transition={{
              duration: 0.15, // Quick response to scroll
              ease: 'easeOut',
            }}
            style={{
              ...sizeStyles[size],
              marginBottom: size === 'display' || size === 'heading' ? '0.5em' : '0.75em',
              willChange: 'opacity, transform, filter',
            }}
          >
            {line}
          </motion.div>
        );
      })}
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
