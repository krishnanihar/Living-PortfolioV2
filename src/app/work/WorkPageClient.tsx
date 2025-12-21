'use client';

import { WorkNarrativePage } from './WorkNarrativePage';
import { NarrativeProvider } from '@/contexts/NarrativeContext';

/**
 * Client component wrapper for work page
 */
export function WorkPageClient() {
  return (
    <NarrativeProvider>
      <WorkNarrativePage />
    </NarrativeProvider>
  );
}
