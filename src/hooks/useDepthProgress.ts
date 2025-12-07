'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Sleep Stage / Depth Structure for Oneiros Palace
 * Maps player position/room to sleep stages and narrative acts
 *
 * Wake/N1 (0-25%): Seduction — Beautiful entrance, familiar art
 * N2 (25-50%): Exploration — Themed rooms based on dreams
 * N3 (50-75%): Complication — Deeper, darker works
 * REM (75-100%): Resolution — Generative chamber, questions
 */

export type SleepStage = 'wake' | 'n1' | 'n2' | 'n3' | 'rem';
export type NarrativeAct = 'seduction' | 'complication' | 'resolution';

export interface DepthState {
  progress: number; // 0-1 overall depth
  sleepStage: SleepStage;
  act: NarrativeAct;
  stageProgress: number; // 0-1 progress within current stage
  intensity: number; // Emotional intensity 0-1
  roomIndex: number; // Current room
  color: {
    primary: string;
    secondary: string;
    atmosphere: string;
  };
}

// Sleep stage thresholds
const STAGE_THRESHOLDS = {
  wake: 0,
  n1: 0.15,
  n2: 0.35,
  n3: 0.60,
  rem: 0.80,
};

// Map sleep stages to narrative acts
const STAGE_TO_ACT: Record<SleepStage, NarrativeAct> = {
  wake: 'seduction',
  n1: 'seduction',
  n2: 'complication',
  n3: 'complication',
  rem: 'resolution',
};

// Color palettes for each stage
const STAGE_COLORS: Record<SleepStage, { primary: string; secondary: string }> = {
  wake: { primary: '#8B5CF6', secondary: '#6366F1' }, // Purple - wonder
  n1: { primary: '#7C3AED', secondary: '#818CF8' }, // Violet - descent
  n2: { primary: '#2563EB', secondary: '#3B82F6' }, // Blue - depth
  n3: { primary: '#1E40AF', secondary: '#1D4ED8' }, // Deep blue - darkness
  rem: { primary: '#EC4899', secondary: '#F472B6' }, // Pink - dreams
};

/**
 * Calculate depth state from room index and total rooms
 */
export function calculateDepthFromRoom(
  roomIndex: number,
  totalRooms: number
): DepthState {
  const progress = totalRooms > 1 ? roomIndex / (totalRooms - 1) : 0;
  return calculateDepthState(progress);
}

/**
 * Calculate depth state from player Z position
 */
export function calculateDepthFromPosition(
  playerZ: number,
  minZ: number = 0,
  maxZ: number = -100
): DepthState {
  // Player starts at 0 and moves toward negative Z (deeper)
  const progress = Math.min(Math.max((minZ - playerZ) / (minZ - maxZ), 0), 1);
  return calculateDepthState(progress);
}

/**
 * Core calculation of depth state
 */
export function calculateDepthState(progress: number): DepthState {
  // Determine sleep stage
  let sleepStage: SleepStage = 'wake';
  let stageProgress = 0;

  if (progress >= STAGE_THRESHOLDS.rem) {
    sleepStage = 'rem';
    stageProgress = (progress - STAGE_THRESHOLDS.rem) / (1 - STAGE_THRESHOLDS.rem);
  } else if (progress >= STAGE_THRESHOLDS.n3) {
    sleepStage = 'n3';
    stageProgress = (progress - STAGE_THRESHOLDS.n3) / (STAGE_THRESHOLDS.rem - STAGE_THRESHOLDS.n3);
  } else if (progress >= STAGE_THRESHOLDS.n2) {
    sleepStage = 'n2';
    stageProgress = (progress - STAGE_THRESHOLDS.n2) / (STAGE_THRESHOLDS.n3 - STAGE_THRESHOLDS.n2);
  } else if (progress >= STAGE_THRESHOLDS.n1) {
    sleepStage = 'n1';
    stageProgress = (progress - STAGE_THRESHOLDS.n1) / (STAGE_THRESHOLDS.n2 - STAGE_THRESHOLDS.n1);
  } else {
    sleepStage = 'wake';
    stageProgress = progress / STAGE_THRESHOLDS.n1;
  }

  // Get narrative act
  const act = STAGE_TO_ACT[sleepStage];

  // Calculate intensity (builds through acts)
  let intensity: number;
  switch (act) {
    case 'seduction':
      intensity = 0.3 + stageProgress * 0.3;
      break;
    case 'complication':
      intensity = 0.6 + stageProgress * 0.3;
      break;
    case 'resolution':
      intensity = 0.9 - stageProgress * 0.4;
      break;
    default:
      intensity = 0.5;
  }

  // Get colors for current stage
  const stageColors = STAGE_COLORS[sleepStage];

  return {
    progress,
    sleepStage,
    act,
    stageProgress,
    intensity,
    roomIndex: Math.floor(progress * 5), // Assume 5 rooms max
    color: {
      primary: stageColors.primary,
      secondary: stageColors.secondary,
      atmosphere: `${stageColors.primary}15`, // 15% opacity for atmosphere
    },
  };
}

/**
 * Hook to track depth progress in Oneiros Palace
 * Can track via room index or player position
 */
export function useDepthProgress(
  roomIndex: number = 0,
  totalRooms: number = 1
): DepthState {
  const [state, setState] = useState<DepthState>(() =>
    calculateDepthFromRoom(roomIndex, totalRooms)
  );

  useEffect(() => {
    const newState = calculateDepthFromRoom(roomIndex, totalRooms);
    setState(newState);
  }, [roomIndex, totalRooms]);

  return state;
}

/**
 * Hook to track depth based on player position in 3D space
 */
export function usePositionDepth(
  playerPositionRef: React.RefObject<{ z: number }>,
  minZ: number = 0,
  maxZ: number = -100
): DepthState {
  const [state, setState] = useState<DepthState>(() =>
    calculateDepthState(0)
  );
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateDepth = () => {
      if (playerPositionRef.current) {
        const newState = calculateDepthFromPosition(
          playerPositionRef.current.z,
          minZ,
          maxZ
        );
        setState(newState);
      }
      frameRef.current = requestAnimationFrame(updateDepth);
    };

    frameRef.current = requestAnimationFrame(updateDepth);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [playerPositionRef, minZ, maxZ]);

  return state;
}

/**
 * Get display name for sleep stage
 */
export function getSleepStageName(stage: SleepStage): string {
  const names: Record<SleepStage, string> = {
    wake: 'Waking',
    n1: 'Light Sleep (N1)',
    n2: 'Sleep Spindles (N2)',
    n3: 'Deep Sleep (N3)',
    rem: 'REM Dreams',
  };
  return names[stage];
}

/**
 * Get description for current act
 */
export function getActDescription(act: NarrativeAct): string {
  const descriptions: Record<NarrativeAct, string> = {
    seduction: 'The palace welcomes you with beauty...',
    complication: 'But who catalogued your unconscious?',
    resolution: 'What should we have asked first?',
  };
  return descriptions[act];
}

export default useDepthProgress;
