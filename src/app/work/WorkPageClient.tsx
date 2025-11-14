'use client';

import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';

// Dynamic import of CosmicBackground for performance (client-side only)
const CosmicBackground = dynamic(
  () => import('@/components/effects/CosmicBackground').then(mod => ({ default: mod.CosmicBackground })),
  { ssr: false, loading: () => null }
);

/**
 * Client component wrapper for work page
 * Handles client-side only components (CosmicBackground)
 */
export function WorkPageClient() {
  return (
    <>
      {/* Cosmic Stars Background */}
      <CosmicBackground />

      <WorkNarrativePage />
    </>
  );
}
