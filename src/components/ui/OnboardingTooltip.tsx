'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { animate } from '@/lib/anime-utils';

interface OnboardingTooltipProps {
  hintId: string;
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;           // Delay before showing (ms)
  autoDismissAfter?: number; // Auto-dismiss after X ms (default 5000)
  children: React.ReactNode;
}

/**
 * OnboardingTooltip - Contextual hint overlay
 *
 * Shows a one-time hint for first-time visitors.
 * Tracks shown hints via useOnboarding hook.
 * Uses anime.js for smooth entrance/exit animations.
 */
export function OnboardingTooltip({
  hintId,
  message,
  position = 'bottom',
  delay = 0,
  autoDismissAfter = 5000,
  children,
}: OnboardingTooltipProps) {
  const { shouldShowHint, markHintSeen } = useOnboarding();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoDismissRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we should show this hint
  const canShow = shouldShowHint(hintId);

  // Show tooltip after delay
  useEffect(() => {
    if (!canShow || hasShown) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);

      // Animate entrance
      if (!prefersReducedMotion && tooltipRef.current) {
        const translateProp = position === 'top' ? 'translateY'
          : position === 'bottom' ? 'translateY'
          : position === 'left' ? 'translateX'
          : 'translateX';

        const translateValue = position === 'top' ? [10, 0]
          : position === 'bottom' ? [-10, 0]
          : position === 'left' ? [10, 0]
          : [-10, 0];

        animate(tooltipRef.current, {
          opacity: [0, 1],
          [translateProp]: translateValue,
          scale: [0.95, 1],
          duration: 300,
          ease: 'outExpo',
        });

        // Subtle arrow pulse
        if (arrowRef.current) {
          animate(arrowRef.current, {
            scale: [1, 1.2, 1],
            duration: 1500,
            loop: 3,
            ease: 'inOutSine',
            delay: 300,
          });
        }
      }

      // Auto-dismiss after specified time
      autoDismissRef.current = setTimeout(() => {
        handleDismiss();
      }, autoDismissAfter);

    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    };
  }, [canShow, hasShown, delay, autoDismissAfter, position]);

  // Handle dismiss with animation
  const handleDismiss = () => {
    if (autoDismissRef.current) clearTimeout(autoDismissRef.current);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && tooltipRef.current) {
      const translateProp = position === 'top' ? 'translateY'
        : position === 'bottom' ? 'translateY'
        : position === 'left' ? 'translateX'
        : 'translateX';

      const translateValue = position === 'top' ? [0, -5]
        : position === 'bottom' ? [0, 5]
        : position === 'left' ? [0, -5]
        : [0, 5];

      animate(tooltipRef.current, {
        opacity: [1, 0],
        [translateProp]: translateValue,
        duration: 200,
        ease: 'inQuad',
        complete: () => {
          setIsVisible(false);
          markHintSeen(hintId);
        },
      });
    } else {
      setIsVisible(false);
      markHintSeen(hintId);
    }
  };

  // Handle interaction with wrapped element
  const handleInteraction = () => {
    if (isVisible) {
      handleDismiss();
    }
  };

  // Get tooltip position styles
  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1000,
      whiteSpace: 'nowrap',
    };

    switch (position) {
      case 'top':
        return { ...base, bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' };
      case 'bottom':
        return { ...base, top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' };
      case 'left':
        return { ...base, right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' };
      case 'right':
        return { ...base, left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' };
      default:
        return base;
    }
  };

  // Get arrow position styles
  const getArrowStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: '8px',
      height: '8px',
      background: 'var(--glass-08)',
      border: '1px solid var(--glass-12)',
      borderRadius: '2px',
      transform: 'rotate(45deg)',
    };

    switch (position) {
      case 'top':
        return { ...base, bottom: '-5px', left: '50%', marginLeft: '-4px', borderTop: 'none', borderLeft: 'none' };
      case 'bottom':
        return { ...base, top: '-5px', left: '50%', marginLeft: '-4px', borderBottom: 'none', borderRight: 'none' };
      case 'left':
        return { ...base, right: '-5px', top: '50%', marginTop: '-4px', borderBottom: 'none', borderLeft: 'none' };
      case 'right':
        return { ...base, left: '-5px', top: '50%', marginTop: '-4px', borderTop: 'none', borderRight: 'none' };
      default:
        return base;
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            ...getPositionStyles(),
            padding: '0.625rem 1rem',
            background: 'var(--glass-08)',
            backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
            border: '1px solid var(--glass-12)',
            borderRadius: '12px',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              0 2px 8px rgba(0, 0, 0, 0.1),
              inset 0 1px 1px var(--glass-15)
            `,
            opacity: 0, // Animated by anime.js
          }}
        >
          {/* Arrow */}
          <div ref={arrowRef} style={getArrowStyles()} />

          {/* Message */}
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: '400',
              color: 'var(--text-85)',
              letterSpacing: '0.01em',
            }}
          >
            {message}
          </span>
        </div>
      )}
    </div>
  );
}

export default OnboardingTooltip;
