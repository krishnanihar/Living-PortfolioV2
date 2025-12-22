'use client';

import { WorkNarrativePage } from './WorkNarrativePage';
import { NarrativeProvider } from '@/contexts/NarrativeContext';

/**
 * Client component wrapper for work page
 * Clean glassmorphism hero with shrinking effect (no particles)
 */
export function WorkPageClient() {
  return (
    <NarrativeProvider>
      <WorkNarrativePage />
    </NarrativeProvider>
  );
}
