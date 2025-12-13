'use client';

/**
 * Oneiros Experience Wrapper
 *
 * Manages the full Oneiros Palace experience flow:
 * 1. Narrative layer (scroll-driven story) - skipped when embedded
 * 2. Dream input and analysis
 * 3. Room generation
 * 4. 3D palace exploration
 *
 * Flow (standalone):
 * - OneirosNarrativeLayer (includes embedded DreamInput)
 * - → User enters dreams and clicks "Enter Palace"
 * - → OneirosScene (3D experience)
 *
 * Flow (embedded in Latent Space):
 * - DreamInput directly (Latent Space IS the narrative)
 * - → OneirosScene (3D experience)
 */

import React from 'react';
import { DreamAnalysisProvider, useDreamAnalysis } from './context/DreamAnalysisContext';
import { OneirosNarrativeLayer } from './narrative/OneirosNarrativeLayer';
import { OneirosScene } from './scene/OneirosScene';
import { DreamInput } from './ui/DreamInput';

interface OneirosExperienceProps {
  /**
   * When true, skip the narrative layer and show DreamInput directly.
   * Used when embedding Oneiros in Latent Space (which provides the narrative).
   */
  embedded?: boolean;
}

/**
 * Inner component that uses the context
 */
function OneirosExperienceInner({ embedded = false }: { embedded: boolean }) {
  const { state } = useDreamAnalysis();

  // Show the 3D palace scene once user has entered
  if (state.hasEnteredPalace) {
    return <OneirosScene />;
  }

  // When embedded (in Latent Space), skip narrative and show DreamInput directly
  if (embedded) {
    return <DreamInput embedded />;
  }

  // Standalone mode: Show full narrative layer (includes embedded DreamInput)
  return <OneirosNarrativeLayer />;
}

/**
 * Main experience wrapper with provider
 */
export function OneirosExperience({ embedded = false }: OneirosExperienceProps) {
  return (
    <DreamAnalysisProvider>
      <OneirosExperienceInner embedded={embedded} />
    </DreamAnalysisProvider>
  );
}

export default OneirosExperience;
