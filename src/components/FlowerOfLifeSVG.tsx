'use client';

import React from 'react';

export type FlowerOfLifeVariant = 'full' | 'simplified' | 'cursor';

interface FlowerOfLifeSVGProps {
  size?: number;
  color?: string;
  variant?: FlowerOfLifeVariant;
  className?: string;
}

/**
 * Flower of Life Sacred Geometry SVG
 *
 * Mathematical construction:
 * - Full: 19 interlocking circles (traditional pattern)
 * - Simplified: 7 circles (Seed of Life)
 * - Cursor: Minimal 7 circles for cursor indicator
 */
export function FlowerOfLifeSVG({
  size = 32,
  color = 'currentColor',
  variant = 'full',
  className = ''
}: FlowerOfLifeSVGProps) {

  // Calculate circle positions for Flower of Life
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 8; // Base circle radius

  // Generate circle positions using sacred geometry math
  const circles: Array<{ cx: number; cy: number; r: number }> = [];

  if (variant === 'cursor' || variant === 'simplified') {
    // Seed of Life - 7 circles
    // Center circle
    circles.push({ cx: centerX, cy: centerY, r: radius });

    // 6 circles around center at 60° intervals
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * (Math.PI / 180);
      const cx = parseFloat((centerX + radius * Math.cos(angle)).toFixed(3));
      const cy = parseFloat((centerY + radius * Math.sin(angle)).toFixed(3));
      circles.push({ cx, cy, r: radius });
    }
  } else {
    // Full Flower of Life - 19 circles
    // Center circle
    circles.push({ cx: centerX, cy: centerY, r: radius });

    // First ring - 6 circles at 60° intervals
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * (Math.PI / 180);
      const cx = parseFloat((centerX + radius * Math.cos(angle)).toFixed(3));
      const cy = parseFloat((centerY + radius * Math.sin(angle)).toFixed(3));
      circles.push({ cx, cy, r: radius });
    }

    // Second ring - 12 circles at 30° intervals, further out
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30) * (Math.PI / 180);
      const distance = radius * Math.sqrt(3); // Distance for perfect overlap
      const cx = parseFloat((centerX + distance * Math.cos(angle)).toFixed(3));
      const cy = parseFloat((centerY + distance * Math.sin(angle)).toFixed(3));
      circles.push({ cx, cy, r: radius });
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {circles.map((circle, index) => (
        <circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          stroke={color}
          strokeWidth={variant === 'cursor' ? 1 : 1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            // Stagger animation for organic pulse effect
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </svg>
  );
}
