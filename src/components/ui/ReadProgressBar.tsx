'use client';

/**
 * ReadProgressBar Component
 *
 * Shows reading progress within a case study page.
 * Appears at the top of the page below the navigation.
 *
 * Features:
 * - Smooth scroll progress tracking
 * - Gradient color
 * - Optional percentage label
 * - Remembers position for returning visitors
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// ============================================
// Main Component
// ============================================

interface ReadProgressBarProps {
  showPercentage?: boolean;
  height?: number;
  className?: string;
  gradientColors?: [string, string, string];
}

export function ReadProgressBar({
  showPercentage = false,
  height = 2,
  className = '',
  gradientColors = ['#3B82F6', '#8B5CF6', '#EC4899'],
}: ReadProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  // Track percentage for display
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setPercentage(Math.round(v * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const gradientId = 'read-progress-gradient';

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height: showPercentage ? height + 16 : height }}
    >
      {/* Progress bar */}
      <svg
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="50%" stopColor={gradientColors[1]} />
            <stop offset="100%" stopColor={gradientColors[2]} />
          </linearGradient>
        </defs>

        {/* Background track */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="var(--glass-05)"
        />

        {/* Progress fill */}
        <motion.rect
          x="0"
          y="0"
          height="100%"
          fill={`url(#${gradientId})`}
          style={{
            width: '100%',
            scaleX,
            transformOrigin: 'left',
          }}
        />
      </svg>

      {/* Percentage label (optional) */}
      {showPercentage && percentage > 0 && (
        <div
          className="absolute right-3 top-1 text-xs font-medium"
          style={{ color: 'var(--text-40)' }}
        >
          {percentage}%
        </div>
      )}
    </div>
  );
}

// ============================================
// Minimal Variant (Just the bar)
// ============================================

export function MinimalProgressBar() {
  return <ReadProgressBar height={2} showPercentage={false} />;
}

// ============================================
// Navigation-Integrated Variant
// ============================================

interface NavigationProgressBarProps {
  navigationHeight?: number;
}

export function NavigationProgressBar({
  navigationHeight = 60,
}: NavigationProgressBarProps) {
  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{ top: navigationHeight }}
    >
      <ReadProgressBar height={2} showPercentage={false} />
    </div>
  );
}

// ============================================
// Circular Progress (Alternative)
// ============================================

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularReadProgress({
  size = 40,
  strokeWidth = 3,
  className = '',
}: CircularProgressProps) {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgress(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Don't show if at top
  if (progress < 0.02) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 ${className}`}
      style={{
        background: 'var(--glass-10)',
        backdropFilter: 'blur(20px)',
        borderRadius: '50%',
        padding: 4,
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="circular-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--glass-15)"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#circular-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.1 }}
        />
      </svg>

      {/* Percentage */}
      <div
        className="absolute inset-0 flex items-center justify-center text-xs font-medium"
        style={{ color: 'var(--text-70)' }}
      >
        {Math.round(progress * 100)}
      </div>
    </div>
  );
}

// ============================================
// Hook for Custom Implementations
// ============================================

export function useReadProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgress(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return {
    progress,
    percentage: Math.round(progress * 100),
    isAtTop: progress < 0.02,
    isAtBottom: progress > 0.98,
  };
}
