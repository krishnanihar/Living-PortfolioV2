'use client';

/**
 * NavigationProgressArc Component
 *
 * SVG arc overlay showing case study exploration progress.
 * Wraps around an icon (typically the Journey/Help icon in navigation).
 *
 * Features:
 * - Animated progress arc
 * - Gradient color based on progress
 * - Tooltip with progress message
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePersonalization } from '@/hooks/usePersonalization';

// ============================================
// Component
// ============================================

interface NavigationProgressArcProps {
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
  className?: string;
}

export function NavigationProgressArc({
  size = 32,
  strokeWidth = 2,
  children,
  className = '',
}: NavigationProgressArcProps) {
  const { state } = usePersonalization();
  const { projectTrail, isReady } = state;

  // Calculate progress
  const progress = useMemo(() => {
    if (!isReady || projectTrail.total === 0) return 0;
    return projectTrail.viewed / projectTrail.total;
  }, [isReady, projectTrail.viewed, projectTrail.total]);

  // Don't show arc if no progress
  if (!isReady || progress === 0) {
    return <div className={className}>{children}</div>;
  }

  // SVG calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Gradient colors based on progress
  const gradientId = 'progress-gradient';
  const startColor = '#3B82F6'; // Blue
  const midColor = '#8B5CF6';   // Purple
  const endColor = '#EC4899';   // Pink

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Progress arc */}
      <svg
        width={size}
        height={size}
        className="absolute"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="50%" stopColor={midColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--glass-10)"
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>

      {/* Icon container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Tooltip on hover */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        style={{
          fontSize: '0.6875rem',
          color: 'var(--text-50)',
        }}
      >
        {projectTrail.message}
      </div>
    </div>
  );
}

// ============================================
// Standalone Progress Indicator
// ============================================

interface ProgressIndicatorProps {
  className?: string;
}

export function ExplorationProgress({ className = '' }: ProgressIndicatorProps) {
  const { state } = usePersonalization();
  const { projectTrail, isReady } = state;

  if (!isReady || projectTrail.viewed === 0) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{ color: 'var(--text-50)', fontSize: '0.75rem' }}
    >
      {/* Progress dots */}
      <div className="flex gap-1">
        {Array.from({ length: projectTrail.total }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{
              background:
                i < projectTrail.viewed
                  ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                  : 'var(--glass-20)',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <span>{projectTrail.message}</span>
    </div>
  );
}
