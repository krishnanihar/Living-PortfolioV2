'use client';

import React, { useEffect, useState } from 'react';
import { getProjectInsight } from '@/data/projectInsights';
import { FlowerOfLifeSVG } from './FlowerOfLifeSVG';

interface GeometricCompanionProps {
  enabled?: boolean;
}

/**
 * Geometric Companion - Flower of Life sacred geometry that follows mouse
 *
 * FEATURES:
 * - Full Flower of Life pattern (19 circles)
 * - Rotation + breathing animations combined
 * - Color states via CSS variables
 * - Contextual tooltips on hover
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
        @keyframes rotate-sacred {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes breathe-flower {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes pulse-petals {
          0%, 100% {
            stroke-opacity: 0.6;
          }
          50% {
            stroke-opacity: 1;
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

        .flower-companion {
          position: fixed;
          width: 36px;
          height: 36px;
          pointer-events: none;
          z-index: 9998;
          will-change: left, top;
          transition: left 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                      top 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          left: calc(var(--companion-x, 50%) + 40px);
          top: calc(var(--companion-y, 50%) + 40px);
          animation: breathe-flower 3s ease-in-out infinite;
        }

        .flower-svg-container {
          width: 100%;
          height: 100%;
          animation: rotate-sacred var(--companion-rotation-speed, 15s) linear infinite;
        }

        .flower-svg-container :global(circle) {
          stroke: var(--companion-color, rgba(59, 130, 246, 0.7));
          transition: stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          animation: pulse-petals 2s ease-in-out infinite;
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
          .flower-companion,
          .flower-svg-container,
          .flower-svg-container :global(circle),
          .contextual-tooltip {
            animation: none !important;
          }
        }
      `}</style>

      {/* Flower of Life Companion */}
      <div className="flower-companion">
        <div className="flower-svg-container">
          <FlowerOfLifeSVG
            size={36}
            variant="full"
            className="flower-pattern"
          />
        </div>
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
