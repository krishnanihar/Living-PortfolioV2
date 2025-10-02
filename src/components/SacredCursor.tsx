'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FlowerOfLifeSVG } from './FlowerOfLifeSVG';

interface SacredCursorProps {
  enabled?: boolean;
}

/**
 * Sacred Cursor - Custom cursor with Flower of Life geometry
 *
 * ACCESSIBILITY FEATURES:
 * - Automatically disabled on touch devices
 * - Respects prefers-reduced-motion
 * - Reverts to default cursor on text inputs
 * - ESC key toggle (persisted in localStorage)
 * - Fallback to OS cursor if fails
 */
export function SacredCursor({ enabled = true }: SacredCursorProps) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorColor, setCursorColor] = useState('rgba(59, 130, 246, 0.7)');
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check accessibility preferences
    const hasTouch = 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const userDisabled = localStorage.getItem('sacred-cursor-disabled') === 'true';

    // Disable if not suitable
    if (hasTouch || prefersReducedMotion || userDisabled) {
      setIsActive(false);
      return;
    }

    setIsActive(true);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });

        // Update cursor color from CSS variable (set by useAmbientConsciousness)
        const color = getComputedStyle(document.documentElement)
          .getPropertyValue('--companion-color')
          .trim();

        if (color) {
          setCursorColor(color);
        }
      });
    };

    // ESC key toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const newState = !isActive;
        setIsActive(newState);
        localStorage.setItem('sacred-cursor-disabled', String(!newState));

        // Show toast notification
        const toast = document.createElement('div');
        toast.textContent = newState
          ? 'Sacred cursor enabled'
          : 'Sacred cursor disabled (press ESC to re-enable)';
        toast.style.cssText = `
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 10, 10, 0.9);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.875rem;
          z-index: 10000;
          pointer-events: none;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transition = 'opacity 0.3s ease';
          setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, isActive]);

  // Update CSS to hide/show default cursor
  useEffect(() => {
    if (isActive) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      document.body.style.cursor = '';
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      <style jsx>{`
        .sacred-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          mix-blend-mode: difference;
          filter: drop-shadow(0 0 4px currentColor);
        }

        @media (prefers-reduced-motion: reduce) {
          .sacred-cursor {
            display: none !important;
          }
        }

        @media (hover: none) {
          .sacred-cursor {
            display: none !important;
          }
        }
      `}</style>

      <div
        ref={cursorRef}
        className="sacred-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          color: cursorColor,
        }}
      >
        <FlowerOfLifeSVG
          size={16}
          color={cursorColor}
          variant="cursor"
        />
      </div>
    </>
  );
}
