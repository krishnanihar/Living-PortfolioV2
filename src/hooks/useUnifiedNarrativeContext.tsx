'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNarrativeProgress, NarrativeState, NarrativeAct } from './useNarrativeProgress';
import { calculateDepthState, DepthState, SleepStage } from './useDepthProgress';

/**
 * Unified Narrative Context
 *
 * Bridges scroll-based narrative (Latent Space) with 3D depth-based narrative (Oneiros Palace).
 * Provides seamless transitions between modes while maintaining narrative continuity.
 */

export type NarrativeMode = 'scroll' | '3d';

export interface UnifiedNarrativeState {
  // Mode
  mode: NarrativeMode;
  isTransitioning: boolean;

  // Scroll state (from useNarrativeProgress)
  scrollProgress: number;
  scrollAct: NarrativeAct;

  // 3D state (from useDepthProgress)
  depthProgress: number;
  sleepStage: SleepStage;

  // Unified outputs (computed from active mode)
  act: NarrativeAct;
  progress: number;
  intensity: number;
  color: {
    primary: string;
    secondary: string;
    atmosphere: string;
  };
}

export interface UnifiedNarrativeContextValue {
  state: UnifiedNarrativeState;

  // Mode transitions
  transitionTo3D: () => void;
  transitionToScroll: () => void;

  // 3D depth updates
  setDepthProgress: (progress: number) => void;

  // Scroll position management
  savedScrollPosition: number;
}

const defaultState: UnifiedNarrativeState = {
  mode: 'scroll',
  isTransitioning: false,
  scrollProgress: 0,
  scrollAct: 'seduction',
  depthProgress: 0,
  sleepStage: 'wake',
  act: 'seduction',
  progress: 0,
  intensity: 0.3,
  color: {
    primary: 'rgba(147, 51, 234, 0.8)',
    secondary: 'rgba(14, 165, 233, 0.8)',
    atmosphere: 'rgba(147, 51, 234, 0.02)',
  },
};

const UnifiedNarrativeContext = createContext<UnifiedNarrativeContextValue | null>(null);

/**
 * Provider component for unified narrative state
 */
export function UnifiedNarrativeProvider({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement>;
}) {
  // Get scroll-based narrative state
  const scrollState = useNarrativeProgress(containerRef);

  // Internal state for mode and 3D progress
  const [mode, setMode] = useState<NarrativeMode>('scroll');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [depthProgress, setDepthProgressState] = useState(0);
  const savedScrollRef = useRef(0);

  // Calculate 3D depth state
  const depthState = calculateDepthState(depthProgress);

  // Compute unified state based on active mode
  const computeUnifiedState = useCallback((): UnifiedNarrativeState => {
    if (mode === 'scroll') {
      return {
        mode,
        isTransitioning,
        scrollProgress: scrollState.progress,
        scrollAct: scrollState.act,
        depthProgress,
        sleepStage: depthState.sleepStage,
        // Use scroll values for unified outputs
        act: scrollState.act,
        progress: scrollState.progress,
        intensity: scrollState.intensity,
        color: scrollState.color,
      };
    } else {
      return {
        mode,
        isTransitioning,
        scrollProgress: scrollState.progress,
        scrollAct: scrollState.act,
        depthProgress,
        sleepStage: depthState.sleepStage,
        // Use 3D depth values for unified outputs
        act: depthState.act,
        progress: depthProgress,
        intensity: depthState.intensity,
        color: depthState.color,
      };
    }
  }, [mode, isTransitioning, scrollState, depthProgress, depthState]);

  // Transition to 3D mode
  const transitionTo3D = useCallback(() => {
    // Save scroll position
    savedScrollRef.current = window.scrollY;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${savedScrollRef.current}px`;

    // Start transition
    setIsTransitioning(true);

    // After transition animation
    setTimeout(() => {
      setMode('3d');
      setIsTransitioning(false);
    }, 1500); // Match fade duration
  }, []);

  // Transition back to scroll mode
  const transitionToScroll = useCallback(() => {
    setIsTransitioning(true);

    setTimeout(() => {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';

      // Restore scroll position
      window.scrollTo(0, savedScrollRef.current);

      setMode('scroll');
      setIsTransitioning(false);
    }, 1000); // Slightly faster exit
  }, []);

  // Update depth progress (called from 3D scene)
  const setDepthProgress = useCallback((progress: number) => {
    setDepthProgressState(Math.max(0, Math.min(1, progress)));
  }, []);

  const state = computeUnifiedState();

  const value: UnifiedNarrativeContextValue = {
    state,
    transitionTo3D,
    transitionToScroll,
    setDepthProgress,
    savedScrollPosition: savedScrollRef.current,
  };

  return (
    <UnifiedNarrativeContext.Provider value={value}>
      {children}
    </UnifiedNarrativeContext.Provider>
  );
}

/**
 * Hook to access unified narrative context
 */
export function useUnifiedNarrative(): UnifiedNarrativeContextValue {
  const context = useContext(UnifiedNarrativeContext);

  if (!context) {
    throw new Error(
      'useUnifiedNarrative must be used within a UnifiedNarrativeProvider'
    );
  }

  return context;
}

/**
 * Hook to check if currently in 3D mode
 */
export function useIs3DMode(): boolean {
  const { state } = useUnifiedNarrative();
  return state.mode === '3d';
}

/**
 * Hook to check if transitioning between modes
 */
export function useIsTransitioning(): boolean {
  const { state } = useUnifiedNarrative();
  return state.isTransitioning;
}

export default UnifiedNarrativeProvider;
