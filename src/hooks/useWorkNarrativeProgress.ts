'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Work Narrative Acts Structure
 * Act I (0-30%): Foundation — College projects and early experiments
 * Act II (30-70%): Industry — Professional work at Air India
 * Act III (70-100%): Innovation — Research and speculative futures
 */

export type WorkNarrativeAct = 'foundation' | 'industry' | 'innovation';

export interface WorkNarrativeState {
  progress: number; // 0-1 overall progress
  act: WorkNarrativeAct;
  actProgress: number; // 0-1 progress within current act
  section: number; // Current section index
  intensity: number; // Visual intensity 0-1
  color: {
    primary: string;
    secondary: string;
    atmosphere: string;
  };
}

/**
 * Custom hook to track narrative progression through work portfolio
 * Provides act structure and thematic color journeys
 */
export function useWorkNarrativeProgress(
  containerRef?: React.RefObject<HTMLElement>
) {
  const [state, setState] = useState<WorkNarrativeState>({
    progress: 0,
    act: 'foundation',
    actProgress: 0,
    section: 0,
    intensity: 0,
    color: {
      primary: 'rgba(147, 51, 234, 0.8)', // Purple - exploration
      secondary: 'rgba(14, 165, 233, 0.8)', // Blue - creativity
      atmosphere: 'rgba(147, 51, 234, 0.02)',
    },
  });

  const previousProgress = useRef(0);

  // Calculate narrative state based on scroll position
  const calculateNarrativeState = useCallback((scrollProgress: number): WorkNarrativeState => {
    let act: WorkNarrativeAct;
    let actProgress: number;
    let intensity: number;
    let color: WorkNarrativeState['color'];

    // Act I: Foundation (0-30%) - Purple theme
    if (scrollProgress < 0.3) {
      act = 'foundation';
      actProgress = scrollProgress / 0.3;
      intensity = 0.3 + actProgress * 0.3; // Builds from 0.3 to 0.6
      color = {
        primary: 'rgba(147, 51, 234, 0.8)', // Purple - exploration
        secondary: 'rgba(14, 165, 233, 0.8)', // Blue - creativity
        atmosphere: `rgba(147, 51, 234, ${0.02 + actProgress * 0.02})`,
      };
    }
    // Act II: Industry (30-70%) - Red theme (Air India brand)
    else if (scrollProgress < 0.7) {
      act = 'industry';
      actProgress = (scrollProgress - 0.3) / 0.4;
      intensity = 0.6 + actProgress * 0.3; // Builds from 0.6 to 0.9

      // Transition from purple → red (professional)
      const redMix = actProgress;
      color = {
        primary: `rgba(${147 + redMix * 71}, ${51 - redMix * 37}, ${234 - redMix * 205}, 0.8)`,
        secondary: `rgba(${14 + redMix * 204}, ${165 - redMix * 151}, ${233 - redMix * 192}, 0.8)`,
        atmosphere: `rgba(${147 + redMix * 71}, ${51 - redMix * 37}, ${234 - redMix * 205}, ${0.04 + actProgress * 0.02})`,
      };
    }
    // Act III: Innovation (70-100%) - Blue theme (research)
    else {
      act = 'innovation';
      actProgress = (scrollProgress - 0.7) / 0.3;
      intensity = 0.9 - actProgress * 0.3; // Gentle release from 0.9 to 0.6

      // Transition to blue (speculative futures)
      const blueMix = actProgress;
      color = {
        primary: `rgba(${218 - blueMix * 204}, ${14 + blueMix * 151}, ${41 + blueMix * 192}, 0.8)`,
        secondary: `rgba(${14}, ${165}, ${233}, 0.8)`, // Blue constant
        atmosphere: `rgba(${14}, ${165}, ${233}, ${0.06 - actProgress * 0.02})`,
      };
    }

    // Calculate section (12 major sections)
    const section = Math.floor(scrollProgress * 12);

    return {
      progress: scrollProgress,
      act,
      actProgress,
      section,
      intensity,
      color,
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let scrollProgress: number;

          if (containerRef?.current) {
            // Calculate progress relative to container
            const rect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrolled = -rect.top;
            const totalScroll = containerHeight - viewportHeight;
            scrollProgress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
          } else {
            // Calculate global scroll progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            scrollProgress = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
          }

          const newState = calculateNarrativeState(scrollProgress);
          setState(newState);
          previousProgress.current = scrollProgress;

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef, calculateNarrativeState]);

  return state;
}

/**
 * Hook to detect crossing section boundaries (for triggering events)
 */
export function useWorkNarrativeSectionTransition(
  onTransition?: (section: number, act: WorkNarrativeAct) => void
) {
  const narrativeState = useWorkNarrativeProgress();
  const previousSection = useRef(0);

  useEffect(() => {
    if (narrativeState.section !== previousSection.current) {
      onTransition?.(narrativeState.section, narrativeState.act);
      previousSection.current = narrativeState.section;
    }
  }, [narrativeState.section, narrativeState.act, onTransition]);

  return narrativeState;
}
