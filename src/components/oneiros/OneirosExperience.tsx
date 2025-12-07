'use client';

/**
 * Oneiros Experience Wrapper
 *
 * Manages the full Oneiros Palace experience flow:
 * 1. Dream input and analysis
 * 2. Room generation
 * 3. 3D palace exploration
 */

import React from 'react';
import { DreamAnalysisProvider, useDreamAnalysis } from './context/DreamAnalysisContext';
import { DreamInput } from './ui/DreamInput';
import { OneirosScene } from './scene/OneirosScene';

/**
 * Inner component that uses the context
 */
function OneirosExperienceInner() {
  const { state } = useDreamAnalysis();

  // Show dream input if user hasn't entered the palace yet
  if (!state.hasEnteredPalace) {
    return <DreamInput />;
  }

  // Show the 3D palace scene
  return <OneirosScene />;
}

/**
 * Main experience wrapper with provider
 */
export function OneirosExperience() {
  return (
    <DreamAnalysisProvider>
      <OneirosExperienceInner />
    </DreamAnalysisProvider>
  );
}

export default OneirosExperience;
