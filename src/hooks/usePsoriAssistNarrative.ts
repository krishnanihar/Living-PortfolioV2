'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Narrative Acts Structure for PsoriAssist
 * Act I (0-30%): Empathy — Living with the disease, patient struggles
 * Act II (30-70%): Discovery — Research, innovation, solution design
 * Act III (70-100%): Impact — Validation, outcomes, future vision
 */

export type PsoriAssistAct = 'empathy' | 'discovery' | 'impact';

export interface PsoriAssistNarrativeState {
  progress: number; // 0-1 overall progress
  act: PsoriAssistAct;
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
 * Custom hook to track narrative progression through PsoriAssist case study
 * Provides 3-act structure, emotional intensity, and thematic color journey
 */
export function usePsoriAssistNarrative(
  containerRef?: React.RefObject<HTMLElement>
) {
  const [state, setState] = useState<PsoriAssistNarrativeState>({
    progress: 0,
    act: 'empathy',
    actProgress: 0,
    section: 0,
    intensity: 0,
    color: {
      primary: 'rgba(239, 68, 68, 0.8)', // Red - pain/frustration
      secondary: 'rgba(236, 72, 153, 0.8)', // Pink - vulnerability
      atmosphere: 'rgba(239, 68, 68, 0.02)',
    },
  });

  const previousProgress = useRef(0);

  // Calculate narrative state based on scroll position
  const calculateNarrativeState = useCallback((scrollProgress: number): PsoriAssistNarrativeState => {
    let act: PsoriAssistAct;
    let actProgress: number;
    let intensity: number;
    let color: PsoriAssistNarrativeState['color'];

    // Act I: Empathy (0-30%) - Living with disease
    if (scrollProgress < 0.3) {
      act = 'empathy';
      actProgress = scrollProgress / 0.3;
      intensity = 0.4 + actProgress * 0.2; // Builds from 0.4 to 0.6

      // Transition from red (pain) → blue (hope)
      const hopeMix = actProgress;
      color = {
        primary: `rgba(${239 - hopeMix * 165}, ${68 + hopeMix * 76}, ${68 + hopeMix * 158}, 0.8)`,
        secondary: `rgba(${236 - hopeMix * 162}, ${72 + hopeMix * 93}, ${153 + hopeMix * 80}, 0.8)`,
        atmosphere: `rgba(${239 - hopeMix * 165}, ${68 + hopeMix * 76}, ${68 + hopeMix * 158}, ${0.02 + actProgress * 0.02})`,
      };
    }
    // Act II: Discovery (30-70%) - Research & innovation
    else if (scrollProgress < 0.7) {
      act = 'discovery';
      actProgress = (scrollProgress - 0.3) / 0.4;
      intensity = 0.6 + actProgress * 0.3; // Builds from 0.6 to 0.9

      // Transition from blue (hope) → purple (innovation)
      const innovationMix = actProgress;
      color = {
        primary: `rgba(${74 + innovationMix * 94}, ${144 - innovationMix * 59}, ${226 + innovationMix * 21}, 0.8)`,
        secondary: `rgba(${74 + innovationMix * 90}, ${144 + innovationMix * 21}, ${226 + innovationMix * 7}, 0.8)`,
        atmosphere: `rgba(${74 + innovationMix * 94}, ${144 - innovationMix * 59}, ${226 + innovationMix * 21}, ${0.04 + actProgress * 0.02})`,
      };
    }
    // Act III: Impact (70-100%) - Outcomes & future
    else {
      act = 'impact';
      actProgress = (scrollProgress - 0.7) / 0.3;
      intensity = 0.9 - actProgress * 0.3; // Releases from 0.9 to 0.6

      // Transition from purple (innovation) → green (healing/growth)
      const healingMix = actProgress;
      color = {
        primary: `rgba(${168 - healingMix * 88}, ${85 + healingMix * 115}, ${247 - healingMix * 127}, 0.8)`,
        secondary: `rgba(${164 - healingMix * 90}, ${165 - healingMix * 21}, ${233 - healingMix * 113}, 0.8)`,
        atmosphere: `rgba(${168 - healingMix * 88}, ${85 + healingMix * 115}, ${247 - healingMix * 127}, ${0.06 - actProgress * 0.03})`,
      };
    }

    // Calculate section (17 major sections in PsoriAssist)
    const section = Math.floor(scrollProgress * 17);

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
export function usePsoriAssistSectionTransition(
  onTransition?: (section: number, act: PsoriAssistAct) => void
) {
  const narrativeState = usePsoriAssistNarrative();
  const previousSection = useRef(0);

  useEffect(() => {
    if (narrativeState.section !== previousSection.current) {
      onTransition?.(narrativeState.section, narrativeState.act);
      previousSection.current = narrativeState.section;
    }
  }, [narrativeState.section, narrativeState.act, onTransition]);

  return narrativeState;
}
