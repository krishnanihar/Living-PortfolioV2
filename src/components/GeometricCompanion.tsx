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
