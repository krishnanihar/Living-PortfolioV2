/**
 * Anime.js v4 Utility Functions
 *
 * Shared utilities for anime.js animations used across the Metamorphic
 * Fractal Reflections case study and other components.
 *
 * Anime.js v4 uses named exports:
 * - animate() instead of anime()
 * - stagger() for stagger effects
 * - createTimeline() for timelines
 */

import { animate, stagger, createTimeline } from 'animejs';

// Re-export anime.js functions for convenience
export { animate, stagger, createTimeline };

/**
 * Custom hook-friendly throttle function for mouse events
 */
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Utility to calculate grid index from mouse position
 */
export const getGridIndexFromPosition = (
  mouseX: number,
  mouseY: number,
  gridWidth: number,
  gridHeight: number,
  cols: number,
  rows: number,
  offsetX: number = 0,
  offsetY: number = 0
): number => {
  const cellWidth = gridWidth / cols;
  const cellHeight = gridHeight / rows;

  const col = Math.floor((mouseX - offsetX) / cellWidth);
  const row = Math.floor((mouseY - offsetY) / cellHeight);

  // Clamp to valid range
  const clampedCol = Math.max(0, Math.min(col, cols - 1));
  const clampedRow = Math.max(0, Math.min(row, rows - 1));

  return clampedRow * cols + clampedCol;
};
