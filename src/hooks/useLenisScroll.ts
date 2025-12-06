'use client';

import { useSmoothScroll } from '@/components/effects/SmoothScrollProvider';

/**
 * Hook to access Lenis smooth scroll state and controls
 *
 * @returns {Object} Scroll state and utilities
 * @property {number} progress - Scroll progress from 0 to 1
 * @property {number} velocity - Current scroll velocity
 * @property {number} scrollY - Current scroll position in pixels
 * @property {Function} scrollTo - Smooth scroll to target (selector, number, or element)
 * @property {Function} stop - Stop scrolling (use when opening modals)
 * @property {Function} start - Resume scrolling (use when closing modals)
 * @property {Lenis|null} lenis - Direct access to Lenis instance
 *
 * @example
 * // Basic usage
 * const { progress, scrollY } = useLenisScroll();
 *
 * @example
 * // Smooth scroll to element
 * const { scrollTo } = useLenisScroll();
 * scrollTo('#about-section', { offset: -60, duration: 1.5 });
 *
 * @example
 * // Modal scroll locking
 * const { stop, start } = useLenisScroll();
 * useEffect(() => {
 *   isOpen ? stop() : start();
 * }, [isOpen, stop, start]);
 */
export function useLenisScroll() {
  const {
    scrollProgress,
    scrollVelocity,
    scrollY,
    scrollTo,
    stop,
    start,
    lenis
  } = useSmoothScroll();

  return {
    progress: scrollProgress,
    velocity: scrollVelocity,
    scrollY,
    scrollTo,
    stop,
    start,
    lenis,
  };
}
