'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useCycle } from 'framer-motion';

// Spacing scale from globals.css
const spacingScale = [
  { token: '--space-0', value: '0', px: 0, rem: '0' },
  { token: '--space-px', value: '1px', px: 1, rem: '1px' },
  { token: '--space-0_5', value: '0.125rem', px: 2, rem: '0.125rem' },
  { token: '--space-1', value: '0.25rem', px: 4, rem: '0.25rem' },
  { token: '--space-1_5', value: '0.375rem', px: 6, rem: '0.375rem' },
  { token: '--space-2', value: '0.5rem', px: 8, rem: '0.5rem' },
  { token: '--space-2_5', value: '0.625rem', px: 10, rem: '0.625rem' },
  { token: '--space-3', value: '0.75rem', px: 12, rem: '0.75rem' },
  { token: '--space-3_5', value: '0.875rem', px: 14, rem: '0.875rem' },
  { token: '--space-4', value: '1rem', px: 16, rem: '1rem' },
  { token: '--space-5', value: '1.25rem', px: 20, rem: '1.25rem' },
  { token: '--space-6', value: '1.5rem', px: 24, rem: '1.5rem' },
  { token: '--space-7', value: '1.75rem', px: 28, rem: '1.75rem' },
  { token: '--space-8', value: '2rem', px: 32, rem: '2rem' },
  { token: '--space-9', value: '2.25rem', px: 36, rem: '2.25rem' },
  { token: '--space-10', value: '2.5rem', px: 40, rem: '2.5rem' },
  { token: '--space-11', value: '2.75rem', px: 44, rem: '2.75rem' },
  { token: '--space-12', value: '3rem', px: 48, rem: '3rem' },
  { token: '--space-14', value: '3.5rem', px: 56, rem: '3.5rem' },
  { token: '--space-16', value: '4rem', px: 64, rem: '4rem' },
];

// Filter to show key values only (not all 20)
const displayScale = spacingScale.filter((_, i) =>
  i === 0 || i === 3 || i === 5 || i === 7 || i === 9 || i === 11 || i === 13 || i === 15 || i === 16 || i === 17 || i === 19
);

const MAX_BAR_WIDTH = 280;
const MAX_PX = 64;

interface SpacingScaleVisualizationProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function SpacingScaleVisualization({
  autoPlay = true,
  autoPlayInterval = 2000,
}: SpacingScaleVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play state
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || hasInteracted || !isInView) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setAutoPlayIndex((prev) => (prev + 1) % displayScale.length);
      }, autoPlayInterval);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, hasInteracted, autoPlayInterval, isInView]);

  const handleCopy = useCallback(async (token: string) => {
    setHasInteracted(true);
    try {
      await navigator.clipboard.writeText(`var(${token})`);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const handleHover = (index: number | null) => {
    setHasInteracted(true);
    setHighlightedIndex(index);
  };

  const activeIndex = hasInteracted ? highlightedIndex : autoPlayIndex;

  return (
    <div ref={containerRef}>
      {/* Hint */}
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-40)',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: hasInteracted ? 'var(--text-30)' : '#50C878',
          animation: hasInteracted ? 'none' : 'pulse 2s infinite',
        }} />
        {hasInteracted ? 'Click bars to copy token' : 'Auto-playing · Hover to explore'}
      </div>

      {/* Main container */}
      <div style={{
        background: 'var(--glass-03)',
        borderRadius: 16,
        padding: '1.5rem',
        border: '1px solid var(--border-primary)',
      }}>
        {/* Scale bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {displayScale.map((space, index) => {
            const barWidth = (space.px / MAX_PX) * MAX_BAR_WIDTH;
            const isActive = activeIndex === index;
            const isAccessible = space.px >= 44;

            return (
              <motion.div
                key={space.token}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleCopy(space.token)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.35rem 0.5rem',
                  borderRadius: 8,
                  background: isActive ? 'var(--glass-08)' : 'transparent',
                  transition: 'background 0.2s ease',
                }}
              >
                {/* Token name */}
                <span style={{
                  width: 90,
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: isActive ? 'var(--text-80)' : 'var(--text-50)',
                  flexShrink: 0,
                  transition: 'color 0.2s ease',
                }}>
                  {space.token}
                </span>

                {/* Bar */}
                <motion.div
                  style={{
                    height: 16,
                    borderRadius: 4,
                    background: isAccessible
                      ? 'linear-gradient(90deg, #50C878, #2DD4BF)'
                      : 'linear-gradient(90deg, var(--text-30), var(--text-20))',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: Math.max(barWidth, 4) }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                >
                  {/* Shimmer effect when active */}
                  {isActive && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      }}
                    />
                  )}
                </motion.div>

                {/* Pixel value */}
                <span style={{
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: isActive ? 'var(--text-70)' : 'var(--text-40)',
                  minWidth: 40,
                  transition: 'color 0.2s ease',
                }}>
                  {space.px}px
                </span>

                {/* Accessibility badge */}
                {isAccessible && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      fontSize: '0.6rem',
                      color: '#50C878',
                      background: 'rgba(80, 200, 120, 0.15)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: 4,
                      fontWeight: 500,
                    }}
                  >
                    Touch OK
                  </motion.span>
                )}

                {/* Copied indicator */}
                <AnimatePresence>
                  {copiedToken === space.token && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        color: 'var(--text-90)',
                        background: 'var(--glass-20)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: 4,
                        marginLeft: 'auto',
                      }}
                    >
                      COPIED
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Accessibility note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
          style={{
            marginTop: '1.25rem',
            padding: '0.75rem 1rem',
            borderRadius: 8,
            background: 'rgba(80, 200, 120, 0.08)',
            border: '1px solid rgba(80, 200, 120, 0.2)',
          }}
        >
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#50C878',
            marginBottom: '0.25rem',
          }}>
            Healthcare Accessibility
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--text-60)',
            lineHeight: 1.5,
          }}>
            Touch targets 44px+ ensure comfortable interaction for users with motor impairments
            or elderly patients. PsoriAssist uses --space-11 (44px) minimum for all interactive elements.
          </div>
        </motion.div>
      </div>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
