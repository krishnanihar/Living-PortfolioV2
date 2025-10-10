'use client';

import React, { useState } from 'react';

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
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Face */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '24px',
            overflow: 'hidden'
          }}
        >
          {front}
        </div>

        {/* Back Face */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '24px',
            overflow: 'hidden'
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
