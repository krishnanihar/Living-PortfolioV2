'use client';

import React, { useEffect, useState } from 'react';
import { getProjectInsight } from '@/data/projectInsights';

interface GeometricCompanionProps {
  enabled?: boolean;
}

/**
 * Geometric Companion - Isometric cube that follows mouse
 *
 * KEY ANTI-PATTERNS AVOIDED:
 * - pointer-events: none (never blocks clicks)
 * - Pure CSS animations (no useState for animations)
 * - CSS custom properties for positioning (set by hook)
 * - No Framer Motion MotionValues
 */
export function GeometricCompanion({ enabled = true }: GeometricCompanionProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Listen for hover events on project cards
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('[data-project]');

      if (card) {
        const projectId = card.getAttribute('data-project');
        setHoveredProject(projectId);

        // Position tooltip near companion
        setTooltipPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('[data-project]');

      if (card) {
        setHoveredProject(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  const insight = getProjectInsight(hoveredProject);

  return (
    <>
      <style jsx>{`
        @keyframes rotate-cube {
          from {
            transform: rotateX(30deg) rotateY(0deg) rotateZ(45deg);
          }
          to {
            transform: rotateX(30deg) rotateY(360deg) rotateZ(45deg);
          }
        }

        @keyframes breathe-companion {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fade-in-tooltip {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .geometric-companion {
          position: fixed;
          width: 24px;
          height: 24px;
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          transition: left 0.15s cubic-bezier(0.16, 1, 0.3, 1),
                      top 0.15s cubic-bezier(0.16, 1, 0.3, 1);
          left: var(--companion-x, 50%);
          top: var(--companion-y, 50%);
          transform: translate(40px, 40px); /* Offset from cursor */
          animation: breathe-companion 3s ease-in-out infinite;
        }

        .geometric-cube {
          width: 100%;
          height: 100%;
          animation: rotate-cube var(--companion-rotation-speed, 15s) linear infinite;
          transform-style: preserve-3d;
        }

        .geometric-cube line {
          stroke: var(--companion-color, rgba(59, 130, 246, 0.7));
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
          transition: stroke 0.3s ease;
        }

        .contextual-tooltip {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          padding: 0.625rem 1rem;
          background: var(--surface-secondary);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid var(--border-primary);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          font-size: 0.75rem;
          color: var(--text-secondary);
          white-space: nowrap;
          animation: fade-in-tooltip 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          max-width: 300px;
        }

        @media (prefers-reduced-motion: reduce) {
          .geometric-companion,
          .geometric-cube,
          .contextual-tooltip {
            animation: none !important;
          }
        }
      `}</style>

      {/* Geometric Companion */}
      <div className="geometric-companion">
        <svg
          className="geometric-cube"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Isometric cube outline */}
          {/* Bottom face */}
          <line x1="12" y1="18" x2="6" y2="14" />
          <line x1="12" y1="18" x2="18" y2="14" />
          <line x1="6" y1="14" x2="12" y2="10" />
          <line x1="18" y1="14" x2="12" y2="10" />

          {/* Top face */}
          <line x1="12" y1="10" x2="6" y2="6" />
          <line x1="12" y1="10" x2="18" y2="6" />
          <line x1="6" y1="6" x2="12" y2="2" />
          <line x1="18" y1="6" x2="12" y2="2" />

          {/* Vertical edges */}
          <line x1="6" y1="14" x2="6" y2="6" />
          <line x1="18" y1="14" x2="18" y2="6" />
          <line x1="12" y1="18" x2="12" y2="10" />
          <line x1="12" y1="10" x2="12" y2="2" />
        </svg>
      </div>

      {/* Contextual Tooltip */}
      {hoveredProject && (
        <div
          className="contextual-tooltip"
          style={{
            left: `${tooltipPosition.x + 60}px`,
            top: `${tooltipPosition.y + 20}px`,
          }}
        >
          {insight}
        </div>
      )}
    </>
  );
}
