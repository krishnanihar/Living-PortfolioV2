'use client';

/**
 * useBehaviorTracking Hook
 *
 * Passive tracking for scroll, dwell time, and interactions.
 * All event listeners use { passive: true } for performance.
 * Uses requestAnimationFrame for scroll to avoid blocking main thread.
 */

import { useEffect, useRef, useCallback } from 'react';
import { usePersonalization } from './usePersonalization';

// ============================================
// Configuration
// ============================================

const DWELL_UPDATE_INTERVAL = 10000; // Update dwell time every 10 seconds
const SCROLL_THROTTLE = 100; // Minimum ms between scroll updates
const HOVER_THRESHOLD = 500; // Minimum hover duration to track (ms)

// ============================================
// Main Hook
// ============================================

export function useBehaviorTracking() {
  const {
    state,
    updateScrollDepth,
    updateDwellTime,
    addInteraction,
    updateSectionInterest,
  } = usePersonalization();

  // Only run tracking when state is ready
  const isReady = state.isReady;

  // Scroll tracking
  useScrollTracking(isReady, updateScrollDepth);

  // Dwell time tracking
  useDwellTimeTracking(isReady, updateDwellTime);

  // Interaction tracking (clicks)
  useInteractionTracking(isReady, addInteraction);

  // Section interest tracking (IntersectionObserver)
  useSectionTracking(isReady, updateSectionInterest);
}

// ============================================
// Scroll Tracking
// ============================================

function useScrollTracking(
  isReady: boolean,
  updateScrollDepth: (depth: number) => void
) {
  const lastScrollY = useRef(0);
  const lastUpdateTime = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return;

    const calculateScrollDepth = (): number => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return 100;
      return Math.round((window.scrollY / scrollHeight) * 100);
    };

    const handleScroll = () => {
      const now = Date.now();

      // Throttle updates
      if (now - lastUpdateTime.current < SCROLL_THROTTLE) return;

      if (!ticking.current) {
        requestAnimationFrame(() => {
          const depth = calculateScrollDepth();

          // Only update if depth increased
          if (depth > lastScrollY.current) {
            updateScrollDepth(depth);
            lastScrollY.current = depth;
          }

          lastUpdateTime.current = now;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReady, updateScrollDepth]);
}

// ============================================
// Dwell Time Tracking
// ============================================

function useDwellTimeTracking(
  isReady: boolean,
  updateDwellTime: (seconds: number) => void
) {
  const sessionStart = useRef(Date.now());
  const lastUpdate = useRef(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return;

    // Update dwell time periodically while page is visible
    intervalRef.current = setInterval(() => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        const deltaSeconds = (now - lastUpdate.current) / 1000;
        updateDwellTime(deltaSeconds);
        lastUpdate.current = now;
      }
    }, DWELL_UPDATE_INTERVAL);

    // Also track visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page hidden - save final dwell time
        const now = Date.now();
        const deltaSeconds = (now - lastUpdate.current) / 1000;
        if (deltaSeconds > 0) {
          updateDwellTime(deltaSeconds);
        }
        lastUpdate.current = now;
      } else {
        // Page visible again - reset last update time
        lastUpdate.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Final update on unmount
      const deltaSeconds = (Date.now() - lastUpdate.current) / 1000;
      if (deltaSeconds > 0) {
        updateDwellTime(deltaSeconds);
      }
    };
  }, [isReady, updateDwellTime]);
}

// ============================================
// Interaction Tracking (Clicks + Hovers)
// ============================================

function useInteractionTracking(
  isReady: boolean,
  addInteraction: (interaction: { type: 'click' | 'hover' | 'focus'; target: string; duration?: number }) => void
) {
  const hoverTimers = useRef(new Map<string, number>());
  const hoverStarts = useRef(new Map<string, number>());

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return;

    // Get trackable target identifier
    const getTrackTarget = (element: Element | null): string | null => {
      if (!element) return null;

      // Check for data-track attribute
      const tracked = element.closest('[data-track]');
      if (tracked) return tracked.getAttribute('data-track');

      // Check for id
      if (element.id) return `#${element.id}`;

      // Check for navigation links
      const navLink = element.closest('a[href]');
      if (navLink) return `link:${navLink.getAttribute('href')}`;

      // Check for buttons
      const button = element.closest('button');
      if (button) {
        const text = button.textContent?.trim().slice(0, 30);
        return text ? `button:${text}` : null;
      }

      return null;
    };

    // Click tracking
    const handleClick = (e: MouseEvent) => {
      const target = getTrackTarget(e.target as Element);
      if (target) {
        addInteraction({ type: 'click', target });
      }
    };

    // Hover tracking (only for significant hovers)
    const handleMouseEnter = (e: MouseEvent) => {
      const target = getTrackTarget(e.target as Element);
      if (target && !hoverTimers.current.has(target)) {
        hoverStarts.current.set(target, Date.now());
        hoverTimers.current.set(
          target,
          window.setTimeout(() => {
            const startTime = hoverStarts.current.get(target);
            if (startTime) {
              const duration = Date.now() - startTime;
              addInteraction({ type: 'hover', target, duration });
            }
            hoverTimers.current.delete(target);
            hoverStarts.current.delete(target);
          }, HOVER_THRESHOLD)
        );
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = getTrackTarget(e.target as Element);
      if (target && hoverTimers.current.has(target)) {
        clearTimeout(hoverTimers.current.get(target));
        hoverTimers.current.delete(target);
        hoverStarts.current.delete(target);
      }
    };

    // Use event delegation on document
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });

      // Clear all pending hover timers
      hoverTimers.current.forEach((timer) => clearTimeout(timer));
      hoverTimers.current.clear();
      hoverStarts.current.clear();
    };
  }, [isReady, addInteraction]);
}

// ============================================
// Section Interest Tracking (IntersectionObserver)
// ============================================

function useSectionTracking(
  isReady: boolean,
  updateSectionInterest: (sectionId: string, dwellTime: number) => void
) {
  const sectionTimers = useRef(new Map<string, { startTime: number; totalTime: number }>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') return;

    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (!sectionId) return;

          if (entry.isIntersecting) {
            // Section entered viewport
            const existing = sectionTimers.current.get(sectionId);
            sectionTimers.current.set(sectionId, {
              startTime: Date.now(),
              totalTime: existing?.totalTime || 0,
            });
          } else {
            // Section left viewport
            const data = sectionTimers.current.get(sectionId);
            if (data?.startTime) {
              const dwellTime = (Date.now() - data.startTime) / 1000;
              if (dwellTime > 1) {
                // Only track if > 1 second
                updateSectionInterest(sectionId, dwellTime);
              }
              sectionTimers.current.set(sectionId, {
                startTime: 0,
                totalTime: data.totalTime + dwellTime,
              });
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px',
      }
    );

    // Observe all sections with data-section-id
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      // Flush remaining dwell times
      sectionTimers.current.forEach((data, sectionId) => {
        if (data.startTime) {
          const dwellTime = (Date.now() - data.startTime) / 1000;
          if (dwellTime > 1) {
            updateSectionInterest(sectionId, dwellTime);
          }
        }
      });

      observerRef.current?.disconnect();
      sectionTimers.current.clear();
    };
  }, [isReady, updateSectionInterest]);
}

// ============================================
// Export Individual Hooks for Flexibility
// ============================================

export { useScrollTracking, useDwellTimeTracking, useInteractionTracking, useSectionTracking };
