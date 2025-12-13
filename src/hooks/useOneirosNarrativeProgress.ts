'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Oneiros Palace Narrative Layer - Progress Hook
 *
 * Tracks scroll progress through the narrative experience BEFORE
 * entering the 3D dream palace game.
 *
 * Three-Act Structure:
 * Act I (0-30%): Seduction — "The Archive Welcomes You"
 *   - Hero, Promise, Dream Taxonomy, The Collection
 *   - Color: Purple/Violet (wonder, possibility)
 *
 * Act II (30-70%): Complication — "Who Catalogued Your Unconscious?"
 *   - Archive Revealed, Research, Ethics, The Question
 *   - Color: Blue/Indigo (unease, depth)
 *
 * Act III (70-100%): Resolution — "Descend Knowing"
 *   - Sleep Stages, Nine Rooms, Dream Input, Transition
 *   - Color: Pink/Magenta (dreams, choice)
 */

export type OneirosNarrativeAct = 'seduction' | 'complication' | 'resolution';

export interface OneirosNarrativeState {
  progress: number; // 0-1 overall progress
  act: OneirosNarrativeAct;
  actProgress: number; // 0-1 progress within current act
  section: number; // Current section index (0-12)
  intensity: number; // Emotional intensity 0-1
  isNearEnd: boolean; // True when close to dream input
  color: {
    primary: string;
    secondary: string;
    atmosphere: string;
    gradient: string;
  };
}

// Act boundaries
const ACT_BOUNDARIES = {
  seduction: { start: 0, end: 0.30 },
  complication: { start: 0.30, end: 0.70 },
  resolution: { start: 0.70, end: 1.0 },
};

// Color palettes for each act
const ACT_COLORS = {
  seduction: {
    primary: '#8B5CF6', // Purple
    secondary: '#A78BFA', // Light purple
    startRGB: [139, 92, 246],
    endRGB: [167, 139, 250],
  },
  complication: {
    primary: '#3B82F6', // Blue
    secondary: '#1D4ED8', // Deep blue
    startRGB: [59, 130, 246],
    endRGB: [29, 78, 216],
  },
  resolution: {
    primary: '#EC4899', // Pink
    secondary: '#F472B6', // Light pink
    startRGB: [236, 72, 153],
    endRGB: [244, 114, 182],
  },
};

// Section definitions for narrative tracking
export const ONEIROS_SECTIONS = [
  // Act I: Seduction
  { id: 'hero', name: 'Hero', act: 'seduction' as const, scrollStart: 0 },
  { id: 'promise', name: 'The Promise', act: 'seduction' as const, scrollStart: 0.08 },
  { id: 'taxonomy', name: 'Dream Taxonomy', act: 'seduction' as const, scrollStart: 0.16 },
  { id: 'collection', name: 'The Collection', act: 'seduction' as const, scrollStart: 0.23 },

  // Act II: Complication
  { id: 'transition-1', name: 'Act Transition', act: 'complication' as const, scrollStart: 0.30 },
  { id: 'archive', name: 'The Archive Revealed', act: 'complication' as const, scrollStart: 0.38 },
  { id: 'research', name: 'Surveillance Dreams', act: 'complication' as const, scrollStart: 0.48 },
  { id: 'ethics', name: 'Ethical Framework', act: 'complication' as const, scrollStart: 0.56 },
  { id: 'question', name: 'The Question', act: 'complication' as const, scrollStart: 0.64 },

  // Act III: Resolution
  { id: 'transition-2', name: 'Act Transition', act: 'resolution' as const, scrollStart: 0.70 },
  { id: 'sleep-stages', name: 'Sleep Stages', act: 'resolution' as const, scrollStart: 0.76 },
  { id: 'rooms', name: 'The Nine Rooms', act: 'resolution' as const, scrollStart: 0.84 },
  { id: 'dream-input', name: 'Dream Input', act: 'resolution' as const, scrollStart: 0.92 },
];

/**
 * Linear interpolation helper
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Interpolate RGB colors
 */
function lerpRGB(startRGB: number[], endRGB: number[], t: number): string {
  const r = Math.round(lerp(startRGB[0], endRGB[0], t));
  const g = Math.round(lerp(startRGB[1], endRGB[1], t));
  const b = Math.round(lerp(startRGB[2], endRGB[2], t));
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculate narrative state based on scroll position
 */
export function calculateOneirosNarrativeState(scrollProgress: number): OneirosNarrativeState {
  // Clamp progress
  const progress = Math.min(Math.max(scrollProgress, 0), 1);

  // Determine current act
  let act: OneirosNarrativeAct;
  let actProgress: number;
  let actColors: typeof ACT_COLORS.seduction;

  if (progress < ACT_BOUNDARIES.seduction.end) {
    act = 'seduction';
    actProgress = progress / ACT_BOUNDARIES.seduction.end;
    actColors = ACT_COLORS.seduction;
  } else if (progress < ACT_BOUNDARIES.complication.end) {
    act = 'complication';
    actProgress = (progress - ACT_BOUNDARIES.complication.start) /
                  (ACT_BOUNDARIES.complication.end - ACT_BOUNDARIES.complication.start);
    actColors = ACT_COLORS.complication;
  } else {
    act = 'resolution';
    actProgress = (progress - ACT_BOUNDARIES.resolution.start) /
                  (ACT_BOUNDARIES.resolution.end - ACT_BOUNDARIES.resolution.start);
    actColors = ACT_COLORS.resolution;
  }

  // Calculate intensity (emotional arc)
  let intensity: number;
  switch (act) {
    case 'seduction':
      // Builds wonder: 0.3 → 0.6
      intensity = 0.3 + actProgress * 0.3;
      break;
    case 'complication':
      // Builds tension: 0.6 → 0.9
      intensity = 0.6 + actProgress * 0.3;
      break;
    case 'resolution':
      // Releases to contemplation: 0.9 → 0.5
      intensity = 0.9 - actProgress * 0.4;
      break;
  }

  // Calculate current section
  let section = 0;
  for (let i = ONEIROS_SECTIONS.length - 1; i >= 0; i--) {
    if (progress >= ONEIROS_SECTIONS[i].scrollStart) {
      section = i;
      break;
    }
  }

  // Interpolate colors within act
  const primaryColor = lerpRGB(actColors.startRGB, actColors.endRGB, actProgress);
  const secondaryColor = actColors.secondary;

  // Calculate atmosphere opacity based on intensity
  const atmosphereOpacity = 0.02 + intensity * 0.04;

  return {
    progress,
    act,
    actProgress,
    section,
    intensity,
    isNearEnd: progress >= 0.88,
    color: {
      primary: primaryColor,
      secondary: secondaryColor,
      atmosphere: `rgba(${actColors.startRGB.join(', ')}, ${atmosphereOpacity.toFixed(3)})`,
      gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
    },
  };
}

/**
 * Hook to track narrative progress through Oneiros pre-game experience
 */
export function useOneirosNarrativeProgress(
  containerRef?: React.RefObject<HTMLElement | null>
): OneirosNarrativeState {
  const [state, setState] = useState<OneirosNarrativeState>(() =>
    calculateOneirosNarrativeState(0)
  );

  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      let scrollProgress: number;

      if (containerRef?.current) {
        // Calculate progress relative to container
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const totalScroll = containerHeight - viewportHeight;
        scrollProgress = totalScroll > 0 ? scrolled / totalScroll : 0;
      } else {
        // Calculate global scroll progress
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        scrollProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      }

      const newState = calculateOneirosNarrativeState(scrollProgress);
      setState(newState);
      ticking.current = false;
    });
  }, [containerRef]);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return state;
}

/**
 * Hook to detect section transitions
 */
export function useOneirosNarrativeSectionTransition(
  onTransition?: (section: number, sectionId: string, act: OneirosNarrativeAct) => void
): OneirosNarrativeState {
  const state = useOneirosNarrativeProgress();
  const previousSection = useRef(0);

  useEffect(() => {
    if (state.section !== previousSection.current) {
      const sectionData = ONEIROS_SECTIONS[state.section];
      onTransition?.(state.section, sectionData?.id || '', state.act);
      previousSection.current = state.section;
    }
  }, [state.section, state.act, onTransition]);

  return state;
}

/**
 * Get section metadata by ID
 */
export function getOneirosSection(sectionId: string) {
  return ONEIROS_SECTIONS.find(s => s.id === sectionId);
}

/**
 * Get current section name
 */
export function getCurrentSectionName(state: OneirosNarrativeState): string {
  return ONEIROS_SECTIONS[state.section]?.name || 'Unknown';
}

/**
 * Get act display name
 */
export function getActDisplayName(act: OneirosNarrativeAct): string {
  const names: Record<OneirosNarrativeAct, string> = {
    seduction: 'The Archive Welcomes You',
    complication: 'Who Catalogued Your Unconscious?',
    resolution: 'Descend Knowing',
  };
  return names[act];
}

export default useOneirosNarrativeProgress;