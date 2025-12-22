'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  flipOnHover?: boolean;
  color?: string;
}

export function FlipCard({
  front,
  back,
  className = '',
  style = {},
  flipOnHover = false,
  color = '74, 144, 226'
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for responsive border-radius
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Responsive border-radius
  const borderRadius = isMobile ? '16px' : '24px';

  const handleFlip = () => {
    if (!flipOnHover) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (flipOnHover) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (flipOnHover) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className={className}
      style={{
        perspective: '1000px',
        cursor: flipOnHover ? 'default' : 'pointer',
        ...style
      }}
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flip-card"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
          transition: prefersReducedMotion
            ? 'opacity 0.3s ease'
            : 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: prefersReducedMotion ? 'none' : (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'),
        }}
      >
        {/* Front Face */}
        <div
          className="flip-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            WebkitBackfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            borderRadius,
            overflow: 'hidden',
            opacity: prefersReducedMotion ? (isFlipped ? 0 : 1) : 1,
            transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
          }}
        >
          {front}
        </div>

        {/* Back Face */}
        <div
          className="flip-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            WebkitBackfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            transform: prefersReducedMotion ? 'none' : 'rotateY(180deg)',
            borderRadius,
            overflow: 'hidden',
            opacity: prefersReducedMotion ? (isFlipped ? 1 : 0) : 1,
            transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
          }}
        >
          {back}
        </div>
      </div>

      {/* Flip Hint (optional) */}
      {!flipOnHover && !isFlipped && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            fontSize: '0.75rem',
            color: `rgb(${color})`,
            backgroundColor: `rgba(${color}, 0.1)`,
            padding: '0.375rem 0.75rem',
            borderRadius: '12px',
            border: `1px solid rgba(${color}, 0.3)`,
            pointerEvents: 'none',
            opacity: 0.8,
            transition: 'opacity 0.3s ease'
          }}
        >
          Click to flip
        </div>
      )}
    </div>
  );
}
