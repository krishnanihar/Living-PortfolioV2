'use client';

/**
 * ContinuePill Component
 *
 * Quick access pill that appears for returning visitors,
 * allowing them to continue from their last viewed project.
 *
 * Features:
 * - Shows last viewed project
 * - Suggests next unviewed project
 * - Progress indicator
 * - Dismissible
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';

// ============================================
// Main Component
// ============================================

interface ContinuePillProps {
  variant?: 'continue' | 'suggested' | 'auto';
  className?: string;
  showProgress?: boolean;
  dismissible?: boolean;
}

export function ContinuePill({
  variant = 'auto',
  className = '',
  showProgress = true,
  dismissible = true,
}: ContinuePillProps) {
  const { state } = usePersonalization();
  const { scrollMemory, projectTrail, isReady } = state;
  const [isDismissed, setIsDismissed] = useState(false);

  // Determine what to show
  const displayData = useMemo(() => {
    if (!isReady || !scrollMemory.hasHistory) return null;

    if (variant === 'continue' && scrollMemory.lastProject) {
      return {
        type: 'continue' as const,
        slug: scrollMemory.lastProject,
        name: scrollMemory.lastProjectName,
        label: 'Continue',
      };
    }

    if (variant === 'suggested' && scrollMemory.suggestedNext) {
      return {
        type: 'suggested' as const,
        slug: scrollMemory.suggestedNext,
        name: scrollMemory.suggestedNextName,
        label: 'Up next',
      };
    }

    // Auto mode: prefer continue, fallback to suggested
    if (variant === 'auto') {
      if (scrollMemory.lastProject) {
        return {
          type: 'continue' as const,
          slug: scrollMemory.lastProject,
          name: scrollMemory.lastProjectName,
          label: 'Continue',
        };
      }
      if (scrollMemory.suggestedNext) {
        return {
          type: 'suggested' as const,
          slug: scrollMemory.suggestedNext,
          name: scrollMemory.suggestedNextName,
          label: 'Suggested',
        };
      }
    }

    return null;
  }, [isReady, scrollMemory, variant]);

  // Don't render if nothing to show or dismissed
  if (!displayData || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`inline-flex items-center ${className}`}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={`/work/${displayData.slug}`}
          className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all"
          style={{
            background: 'var(--glass-05)',
            border: '1px solid var(--glass-10)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Icon */}
          {displayData.type === 'suggested' ? (
            <Sparkles
              className="w-3.5 h-3.5"
              style={{ color: 'var(--text-50)' }}
            />
          ) : (
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--text-50)' }}
            />
          )}

          {/* Label + Project name */}
          <span className="text-sm" style={{ color: 'var(--text-60)' }}>
            {displayData.label}
          </span>
          <span
            className="text-sm font-medium transition-colors group-hover:text-[#DA0E29]"
            style={{ color: 'var(--text-90)' }}
          >
            {displayData.name}
          </span>

          {/* Progress (optional) */}
          {showProgress && projectTrail.viewed > 0 && (
            <span
              className="ml-1 text-xs"
              style={{ color: 'var(--text-40)' }}
            >
              ({projectTrail.viewed}/{projectTrail.total})
            </span>
          )}

          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'var(--glass-05)',
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsDismissed(true);
            }}
            className="ml-1 p-1 rounded-full transition-colors hover:bg-[var(--glass-10)]"
            style={{ color: 'var(--text-30)' }}
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// Navigation Variant (Compact)
// ============================================

export function NavigationContinuePill() {
  const { state } = usePersonalization();
  const { scrollMemory, isReady } = state;

  if (!isReady || !scrollMemory.lastProject) {
    return null;
  }

  return (
    <Link
      href={`/work/${scrollMemory.lastProject}`}
      className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all"
      style={{
        background: 'var(--glass-05)',
        border: '1px solid var(--glass-08)',
        color: 'var(--text-60)',
      }}
    >
      <span>Continue</span>
      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      <span
        className="font-medium transition-colors group-hover:text-[#DA0E29]"
        style={{ color: 'var(--text-80)' }}
      >
        {scrollMemory.lastProjectName}
      </span>
    </Link>
  );
}

// ============================================
// Floating Variant (Fixed Position)
// ============================================

interface FloatingContinuePillProps {
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}

export function FloatingContinuePill({
  position = 'bottom-right',
}: FloatingContinuePillProps) {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2',
    'bottom-left': 'fixed bottom-6 left-6',
  };

  return (
    <div className={`${positionClasses[position]} z-40`}>
      <ContinuePill
        variant="auto"
        showProgress={true}
        dismissible={true}
      />
    </div>
  );
}
