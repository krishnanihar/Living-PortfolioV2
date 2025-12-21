'use client';

import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';
import { NarrativeProvider } from '@/contexts/NarrativeContext';

// Dynamic imports of background effects for performance (client-side only)
const GladeyeParticleScroll = dynamic(
  () => import('@/components/effects/GladeyeParticleScroll').then(mod => ({ default: mod.GladeyeParticleScroll })),
  { ssr: false, loading: () => null }
);

/**
 * Client component wrapper for work page
 * Background system:
 * - z-index 1: Particle system (shimmer effects)
 * - z-index 10+: Content
 */
export function WorkPageClient() {
  return (
    <NarrativeProvider>
      {/* Gladeye Particle Scroll - Interactive particle system */}
      <GladeyeParticleScroll />

      <WorkNarrativePage />
    </NarrativeProvider>
  );
}
