'use client';

import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';

// Dynamic import of Gladeye particle scroll system for performance (client-side only)
const GladeyeParticleScroll = dynamic(
  () => import('@/components/effects/GladeyeParticleScroll').then(mod => ({ default: mod.GladeyeParticleScroll })),
  { ssr: false, loading: () => null }
);

/**
 * Client component wrapper for work page
 * Handles client-side only components (GladeyeParticleScroll)
 */
export function WorkPageClient() {
  return (
    <>
      {/* Gladeye Particle Scroll Background */}
      <GladeyeParticleScroll />

      <WorkNarrativePage />
    </>
  );
}
