'use client';

import React, { useEffect, useState } from 'react';
import { getProjectInsight } from '@/data/projectInsights';

interface GeometricCompanionProps {
  enabled?: boolean;
}

/**
 * Geometric Companion - Isometric cube that follows mouse
 *
 * FIXED:
 * - 2D rotation only (no 3D transform)
 * - Working color states via CSS variables
 * - Tooltips appear on hover
 * - Proper data-project detection
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
        @keyframes rotate-flat {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes breathe-companion {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
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
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 9998;
          will-change: left, top;
          transition: left 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                      top 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          left: calc(var(--companion-x, 50%) + 40px);
          top: calc(var(--companion-y, 50%) + 40px);
          animation: breathe-companion 3s ease-in-out infinite;
        }

        .geometric-cube {
          width: 100%;
          height: 100%;
          animation: rotate-flat var(--companion-rotation-speed, 15s) linear infinite;
        }

        .geometric-cube line,
        .geometric-cube path {
          stroke: var(--companion-color, rgba(59, 130, 246, 0.7));
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          transition: stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contextual-tooltip {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          padding: 0.625rem 1rem;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
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
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Isometric cube - flat 2D design */}
          {/* Top diamond */}
          <path d="M 16 4 L 26 10 L 16 16 L 6 10 Z" />

          {/* Left face */}
          <path d="M 6 10 L 6 22 L 16 28 L 16 16 Z" />

          {/* Right face */}
          <path d="M 26 10 L 26 22 L 16 28 L 16 16 Z" />

          {/* Internal lines for detail */}
          <line x1="16" y1="16" x2="16" y2="28" />
          <line x1="6" y1="10" x2="16" y2="16" />
          <line x1="26" y1="10" x2="16" y2="16" />
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
