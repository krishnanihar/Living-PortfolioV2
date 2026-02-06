'use client';

import React, { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { animate } from 'animejs';

interface FloatingLabelProps {
  text: string;
  subtext?: string;
  position?: [number, number, number];
  visible?: boolean;
  side?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  color?: string;
}

/**
 * FloatingLabel - 3D-positioned HTML annotation
 *
 * Uses drei's Html component to render DOM elements in 3D space
 * with anime.js for staggered reveal animations
 */
export function FloatingLabel({
  text,
  subtext,
  position = [0, 0, 0],
  visible = true,
  side = 'right',
  delay = 0,
  color = 'var(--metamorphic-accent-rgb)',
}: FloatingLabelProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Animate in when visible
  useEffect(() => {
    if (!labelRef.current || !visible || hasAnimated.current) return;

    hasAnimated.current = true;

    animate(labelRef.current, {
      opacity: [0, 1],
      translateX: side === 'left' ? [20, 0] : side === 'right' ? [-20, 0] : [0, 0],
      translateY: side === 'top' ? [20, 0] : side === 'bottom' ? [-20, 0] : [0, 0],
      delay: delay,
      duration: 500,
      ease: 'outExpo',
    });
  }, [visible, side, delay]);

  // Reset animation state when visibility changes
  useEffect(() => {
    if (!visible) {
      hasAnimated.current = false;
      if (labelRef.current) {
        labelRef.current.style.opacity = '0';
      }
    }
  }, [visible]);

  // Determine flex direction based on side
  const getFlexDirection = () => {
    switch (side) {
      case 'left':
        return 'row-reverse';
      case 'right':
        return 'row';
      case 'top':
        return 'column-reverse';
      case 'bottom':
        return 'column';
      default:
        return 'row';
    }
  };

  // Determine line gradient direction
  const getLineGradient = () => {
    switch (side) {
      case 'left':
        return 'linear-gradient(270deg, transparent, rgba(var(--metamorphic-accent-rgb), 0.6))';
      case 'right':
        return 'linear-gradient(90deg, transparent, rgba(var(--metamorphic-accent-rgb), 0.6))';
      case 'top':
        return 'linear-gradient(0deg, transparent, rgba(var(--metamorphic-accent-rgb), 0.6))';
      case 'bottom':
        return 'linear-gradient(180deg, transparent, rgba(var(--metamorphic-accent-rgb), 0.6))';
      default:
        return 'linear-gradient(90deg, transparent, rgba(var(--metamorphic-accent-rgb), 0.6))';
    }
  };

  const isHorizontal = side === 'left' || side === 'right';

  return (
    <Html
      position={position}
      center
      distanceFactor={15}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      zIndexRange={[100, 0]}
    >
      <div
        ref={labelRef}
        className="floating-label"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexDirection: getFlexDirection(),
          opacity: 0,
          fontFamily: 'var(--font-newsreader)',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Connector line */}
        <div
          className="label-line"
          style={{
            width: isHorizontal ? '40px' : '1px',
            height: isHorizontal ? '1px' : '40px',
            background: getLineGradient(),
          }}
        />

        {/* Label content */}
        <div
          className="label-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5rem 0.75rem',
            background: 'var(--glass-08)',
            border: '1px solid var(--glass-15)',
            borderRadius: '8px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="label-text"
            style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--text-90)',
              lineHeight: 1.2,
            }}
          >
            {text}
          </span>
          {subtext && (
            <span
              className="label-subtext"
              style={{
                fontSize: '0.6875rem',
                color: 'var(--text-50)',
                marginTop: '0.125rem',
              }}
            >
              {subtext}
            </span>
          )}
        </div>
      </div>
    </Html>
  );
}

export default FloatingLabel;
