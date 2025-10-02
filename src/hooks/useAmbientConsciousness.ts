'use client';

import { useRef, useEffect, useCallback } from 'react';

export type EngagementLevel = 'dormant' | 'aware' | 'engaged' | 'focused';

interface AmbientConsciousnessState {
  engagementLevel: EngagementLevel;
  mouseX: number;
  mouseY: number;
  hoveredElement: string | null;
  scrollProgress: number;
}

/**
 * Ambient Consciousness Hook - Build-Safe Version
 *
 * KEY PRINCIPLES (Learned from past failures):
 * - Uses useRef instead of useState (no re-renders)
 * - Updates CSS custom properties directly
 * - Event-driven only (no setInterval)
 * - No complex dependencies
 * - Build-time safe
 */
export function useAmbientConsciousness() {
  // Stable refs - never cause re-renders
  const stateRef = useRef<AmbientConsciousnessState>({
    engagementLevel: 'dormant',
    mouseX: 0,
    mouseY: 0,
    hoveredElement: null,
    scrollProgress: 0,
  });

  const lastActivityRef = useRef<number>(Date.now());
  const engagementTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update CSS custom properties for companion positioning
  const updateCSSProperties = useCallback(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const state = stateRef.current;

    // Update position
    root.style.setProperty('--companion-x', `${state.mouseX}px`);
    root.style.setProperty('--companion-y', `${state.mouseY}px`);

    // Update engagement color
    const colors = {
      dormant: 'rgba(156, 163, 175, 0.5)',
      aware: 'rgba(59, 130, 246, 0.7)',
      engaged: 'rgba(16, 185, 129, 0.8)',
      focused: 'rgba(218, 14, 41, 0.9)',
    };
    root.style.setProperty('--companion-color', colors[state.engagementLevel]);

    // Update rotation speed
    const speeds = {
      dormant: '20s',
      aware: '15s',
      engaged: '10s',
      focused: '6s',
    };
    root.style.setProperty('--companion-rotation-speed', speeds[state.engagementLevel]);
  }, []);

  // Determine engagement level based on activity
  const updateEngagementLevel = useCallback(() => {
    const now = Date.now();
    const timeSinceActivity = now - lastActivityRef.current;
    const state = stateRef.current;

    let newLevel: EngagementLevel = 'dormant';

    if (timeSinceActivity < 15000) {
      // Active within last 15 seconds
      if (state.hoveredElement) {
        newLevel = 'engaged'; // Hovering over something
      } else {
        newLevel = 'aware'; // Just mouse movement
      }
    }

    // Update only if changed
    if (newLevel !== state.engagementLevel) {
      state.engagementLevel = newLevel;
      updateCSSProperties();
    }
  }, [updateCSSProperties]);

  // Register activity
  const registerActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    updateEngagementLevel();

    // Clear existing timer
    if (engagementTimerRef.current) {
      clearTimeout(engagementTimerRef.current);
    }

    // Set timer to check engagement after inactivity
    engagementTimerRef.current = setTimeout(() => {
      updateEngagementLevel();
    }, 15000);
  }, [updateEngagementLevel]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    stateRef.current.mouseX = e.clientX;
    stateRef.current.mouseY = e.clientY;
    updateCSSProperties();
    registerActivity();
  }, [updateCSSProperties, registerActivity]);

  // Hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Check if hovering over project card or interesting element
    const card = target.closest('[data-project]');
    const button = target.closest('button, a');

    if (card) {
      const projectId = card.getAttribute('data-project');
      stateRef.current.hoveredElement = projectId;
      stateRef.current.engagementLevel = 'engaged';
    } else if (button) {
      stateRef.current.engagementLevel = 'focused';
    }

    updateCSSProperties();
    registerActivity();
  }, [updateCSSProperties, registerActivity]);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest('[data-project]');

    if (card) {
      stateRef.current.hoveredElement = null;
      stateRef.current.engagementLevel = 'aware';
      updateCSSProperties();
    }
  }, [updateCSSProperties]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);

    stateRef.current.scrollProgress = progress;
    registerActivity();
  }, [registerActivity]);

  // Initialize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial update
    updateCSSProperties();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);

      if (engagementTimerRef.current) {
        clearTimeout(engagementTimerRef.current);
      }
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, handleScroll, updateCSSProperties]);

  // Return stable getters (not reactive state)
  return {
    getEngagementLevel: () => stateRef.current.engagementLevel,
    getHoveredElement: () => stateRef.current.hoveredElement,
    getScrollProgress: () => stateRef.current.scrollProgress,
  };
}
