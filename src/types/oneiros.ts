/**
 * Oneiros Palace - Type Definitions
 *
 * Types for dream analysis, room generation, and palace experience.
 */

import type { OneirosArtwork } from '@/data/oneiros/artworks-expanded';
import type { DreamRoom } from '@/data/oneiros/artwork-mappings';

/**
 * Theme extracted from dream analysis
 */
export interface DreamTheme {
  name: string;
  frequency: number; // 0-100 percentage
  description: string;
  examples: string[];
}

/**
 * Symbol identified in dream analysis
 */
export interface DreamSymbol {
  symbol: string;
  occurrences: number;
  interpretation: string;
}

/**
 * Emotional signature from dream analysis
 */
export interface EmotionalSignature {
  primary: string;
  secondary: string[];
  intensity: number; // 0-100
}

/**
 * Full response from pattern-analyze API
 */
export interface PatternAnalysisResponse {
  themes: DreamTheme[];
  symbols: DreamSymbol[];
  emotionalSignature: EmotionalSignature;
  insights: string[];
}

/**
 * A generated room with its configuration and artworks
 */
export interface GeneratedRoom {
  roomConfig: DreamRoom;
  artworks: OneirosArtwork[];
  position: {
    x: number;
    z: number;
  };
}

/**
 * Entry mode - how user entered the palace
 */
export type EntryMode = 'informed' | 'skip' | 'returning';

/**
 * State for dream analysis context
 */
export interface DreamAnalysisState {
  // Input
  rawDreams: string;

  // Analysis results
  analysis: PatternAnalysisResponse | null;

  // Generated rooms
  generatedRooms: GeneratedRoom[];
  currentRoomIndex: number;

  // UI state
  isAnalyzing: boolean;
  hasEnteredPalace: boolean;
  error: string | null;

  // Narrative layer state
  hasCompletedNarrative: boolean;
  narrativeProgress: number; // 0-1
  entryMode: EntryMode;
}

/**
 * Actions for dream analysis context
 */
export type DreamAnalysisAction =
  | { type: 'SET_DREAMS'; payload: string }
  | { type: 'START_ANALYSIS' }
  | { type: 'ANALYSIS_SUCCESS'; payload: { analysis: PatternAnalysisResponse; rooms: GeneratedRoom[] } }
  | { type: 'ANALYSIS_ERROR'; payload: string }
  | { type: 'ENTER_PALACE' }
  | { type: 'SET_CURRENT_ROOM'; payload: number }
  | { type: 'RESET' }
  | { type: 'COMPLETE_NARRATIVE' }
  | { type: 'SET_NARRATIVE_PROGRESS'; payload: number }
  | { type: 'SET_ENTRY_MODE'; payload: EntryMode }
  | { type: 'SKIP_NARRATIVE' };

/**
 * Context value exposed to components
 */
export interface DreamAnalysisContextValue {
  state: DreamAnalysisState;
  analyzeDreams: (dreams: string) => Promise<void>;
  enterPalace: () => void;
  setCurrentRoom: (index: number) => void;
  reset: () => void;
  completeNarrative: () => void;
  setNarrativeProgress: (progress: number) => void;
  skipNarrative: () => void;
}
