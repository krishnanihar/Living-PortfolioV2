'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Narrative Acts Structure
 * Act I (0-30%): Seduction — The promise of dream technology
 * Act II (30-70%): Complication — Ethical dilemmas and loss of mystery
 * Act III (70-100%): Resolution — Open-ended questions for the future
 */

export type NarrativeAct = 'seduction' | 'complication' | 'resolution';

export interface NarrativeState {
  progress: number; // 0-1 overall progress
  act: NarrativeAct;
  actProgress: number; // 0-1 progress within current act
  section: number; // Current section index
  intensity: number; // Emotional intensity 0-1
  color: {
    primary: string;
    secondary: string;
    atmosphere: string;
  };
}

/**
 * Custom hook to track narrative progression through Latent Space
 * Provides act structure, emotional intensity, and thematic color journeys
 */
export function useNarrativeProgress(
  containerRef?: React.RefObject<HTMLElement>
) {
  const [state, setState] = useState<NarrativeState>({
    progress: 0,
    act: 'seduction',
    actProgress: 0,
    section: 0,
    intensity: 0,
    color: {
      primary: 'rgba(147, 51, 234, 0.8)', // Purple - wonder
      secondary: 'rgba(14, 165, 233, 0.8)', // Blue - possibility
      atmosphere: 'rgba(147, 51, 234, 0.02)',
    },
  });

  const previousProgress = useRef(0);

  // Calculate narrative state based on scroll position
  const calculateNarrativeState = useCallback((scrollProgress: number): NarrativeState => {
    let act: NarrativeAct;
    let actProgress: number;
    let intensity: number;
    let color: NarrativeState['color'];

    // Act I: Seduction (0-30%)
    if (scrollProgress < 0.3) {
      act = 'seduction';
      actProgress = scrollProgress / 0.3;
      intensity = 0.3 + actProgress * 0.3; // Builds from 0.3 to 0.6
      color = {
        primary: 'rgba(147, 51, 234, 0.8)', // Purple - wonder
        secondary: 'rgba(14, 165, 233, 0.8)', // Blue - possibility
        atmosphere: `rgba(147, 51, 234, ${0.02 + actProgress * 0.02})`,
      };
    }
    // Act II: Complication (30-70%)
    else if (scrollProgress < 0.7) {
      act = 'complication';
      actProgress = (scrollProgress - 0.3) / 0.4;
      intensity = 0.6 + actProgress * 0.3; // Builds from 0.6 to 0.9

      // Transition from purple → red (warning)
      const redMix = actProgress;
      color = {
        primary: `rgba(${147 + redMix * 71}, ${51 - redMix * 37}, ${234 - redMix * 205}, 0.8)`,
        secondary: `rgba(${14 + redMix * 204}, ${165 - redMix * 151}, ${233 - redMix * 192}, 0.8)`,
        atmosphere: `rgba(${147 + redMix * 71}, ${51 - redMix * 37}, ${234 - redMix * 205}, ${0.04 + actProgress * 0.02})`,
      };
    }
    // Act III: Resolution (70-100%)
    else {
      act = 'resolution';
      actProgress = (scrollProgress - 0.7) / 0.3;
      intensity = 0.9 - actProgress * 0.4; // Releases from 0.9 to 0.5

      // Transition to blue (contemplation)
      const blueMix = actProgress;
      color = {
        primary: `rgba(${218 - blueMix * 204}, ${14 + blueMix * 151}, ${41 + blueMix * 192}, 0.8)`,
        secondary: `rgba(${14}, ${165}, ${233}, 0.8)`, // Blue constant
        atmosphere: `rgba(${14}, ${165}, ${233}, ${0.06 - actProgress * 0.03})`,
      };
    }

    // Calculate section (assuming 10 major sections)
    const section = Math.floor(scrollProgress * 10);

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
export function useNarrativeSectionTransition(
  onTransition?: (section: number, act: NarrativeAct) => void
) {
  const narrativeState = useNarrativeProgress();
  const previousSection = useRef(0);

  useEffect(() => {
    if (narrativeState.section !== previousSection.current) {
      onTransition?.(narrativeState.section, narrativeState.act);
      previousSection.current = narrativeState.section;
    }
  }, [narrativeState.section, narrativeState.act, onTransition]);

  return narrativeState;
}
