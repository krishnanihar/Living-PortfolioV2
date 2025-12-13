'use client';

/**
 * Dream Analysis Context
 *
 * Provides global state for dream analysis across Oneiros Palace components.
 * Manages the flow from dream input → analysis → room generation → palace entry.
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type {
  DreamAnalysisState,
  DreamAnalysisAction,
  DreamAnalysisContextValue,
  PatternAnalysisResponse,
} from '@/types/oneiros';
import { generateRoomsFromAnalysis, getDefaultEntranceRoom } from '../generators/DreamRoomGenerator';

// Check if user has seen narrative before (localStorage)
function getInitialEntryMode(): 'informed' | 'skip' | 'returning' {
  if (typeof window === 'undefined') return 'informed';
  return localStorage.getItem('oneiros-seen-narrative') ? 'returning' : 'informed';
}

// Initial state
const initialState: DreamAnalysisState = {
  rawDreams: '',
  analysis: null,
  generatedRooms: [],
  currentRoomIndex: 0,
  isAnalyzing: false,
  hasEnteredPalace: false,
  error: null,
  // Narrative state
  hasCompletedNarrative: false,
  narrativeProgress: 0,
  entryMode: 'informed',
};

// Reducer for state management
function dreamAnalysisReducer(
  state: DreamAnalysisState,
  action: DreamAnalysisAction
): DreamAnalysisState {
  switch (action.type) {
    case 'SET_DREAMS':
      return { ...state, rawDreams: action.payload, error: null };

    case 'START_ANALYSIS':
      return { ...state, isAnalyzing: true, error: null };

    case 'ANALYSIS_SUCCESS':
      return {
        ...state,
        isAnalyzing: false,
        analysis: action.payload.analysis,
        generatedRooms: action.payload.rooms,
        error: null,
      };

    case 'ANALYSIS_ERROR':
      return {
        ...state,
        isAnalyzing: false,
        error: action.payload,
        // Provide default room on error so user can still enter
        generatedRooms: [getDefaultEntranceRoom()],
      };

    case 'ENTER_PALACE':
      return { ...state, hasEnteredPalace: true };

    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoomIndex: action.payload };

    case 'RESET':
      return initialState;

    case 'COMPLETE_NARRATIVE':
      // Mark narrative as seen in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('oneiros-seen-narrative', 'true');
      }
      return {
        ...state,
        hasCompletedNarrative: true,
        entryMode: 'informed',
      };

    case 'SET_NARRATIVE_PROGRESS':
      return { ...state, narrativeProgress: action.payload };

    case 'SET_ENTRY_MODE':
      return { ...state, entryMode: action.payload };

    case 'SKIP_NARRATIVE':
      return {
        ...state,
        hasCompletedNarrative: true,
        hasEnteredPalace: true,
        entryMode: 'skip',
        // Provide default entrance room when skipping
        generatedRooms: state.generatedRooms.length > 0
          ? state.generatedRooms
          : [getDefaultEntranceRoom()],
      };

    default:
      return state;
  }
}

// Create context
const DreamAnalysisContext = createContext<DreamAnalysisContextValue | null>(null);

// Provider component
export function DreamAnalysisProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dreamAnalysisReducer, initialState);

  // Analyze dreams via API
  const analyzeDreams = useCallback(async (dreams: string) => {
    dispatch({ type: 'SET_DREAMS', payload: dreams });
    dispatch({ type: 'START_ANALYSIS' });

    try {
      const response = await fetch('/api/pattern-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreams }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || data.error);
      }

      if (data.analysis) {
        const analysis = data.analysis as PatternAnalysisResponse;
        const rooms = generateRoomsFromAnalysis(analysis, 2);

        dispatch({
          type: 'ANALYSIS_SUCCESS',
          payload: { analysis, rooms },
        });
      } else {
        throw new Error('Invalid response from analysis API');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze dreams';
      console.error('Dream analysis error:', error);
      dispatch({ type: 'ANALYSIS_ERROR', payload: message });
    }
  }, []);

  // Enter the palace
  const enterPalace = useCallback(() => {
    // If no rooms generated yet, create default
    if (state.generatedRooms.length === 0) {
      dispatch({
        type: 'ANALYSIS_SUCCESS',
        payload: {
          analysis: null as unknown as PatternAnalysisResponse,
          rooms: [getDefaultEntranceRoom()],
        },
      });
    }
    dispatch({ type: 'ENTER_PALACE' });
  }, [state.generatedRooms.length]);

  // Set current room
  const setCurrentRoom = useCallback((index: number) => {
    dispatch({ type: 'SET_CURRENT_ROOM', payload: index });
  }, []);

  // Reset state
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Complete narrative (user scrolled through)
  const completeNarrative = useCallback(() => {
    dispatch({ type: 'COMPLETE_NARRATIVE' });
  }, []);

  // Update narrative progress
  const setNarrativeProgress = useCallback((progress: number) => {
    dispatch({ type: 'SET_NARRATIVE_PROGRESS', payload: progress });
  }, []);

  // Skip narrative (user chose to skip)
  const skipNarrative = useCallback(() => {
    dispatch({ type: 'SKIP_NARRATIVE' });
  }, []);

  const value: DreamAnalysisContextValue = {
    state,
    analyzeDreams,
    enterPalace,
    setCurrentRoom,
    reset,
    completeNarrative,
    setNarrativeProgress,
    skipNarrative,
  };

  return (
    <DreamAnalysisContext.Provider value={value}>
      {children}
    </DreamAnalysisContext.Provider>
  );
}

// Hook to use the context
export function useDreamAnalysis(): DreamAnalysisContextValue {
  const context = useContext(DreamAnalysisContext);

  if (!context) {
    throw new Error('useDreamAnalysis must be used within a DreamAnalysisProvider');
  }

  return context;
}

export default DreamAnalysisContext;
