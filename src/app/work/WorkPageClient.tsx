'use client';

import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';
import { NoiseTextureOverlay } from '@/components/effects/NoiseTextureOverlay';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';

// Dynamic import of Gladeye particle scroll system for performance (client-side only)
const GladeyeParticleScroll = dynamic(
  () => import('@/components/effects/GladeyeParticleScroll').then(mod => ({ default: mod.GladeyeParticleScroll })),
  { ssr: false, loading: () => null }
);

/**
 * Client component wrapper for work page
 * Handles client-side only components (GladeyeParticleScroll, NoiseTextureOverlay)
 */
export function WorkPageClient() {
  const narrativeState = useWorkNarrativeProgress();

  return (
    <>
      {/* Gladeye Particle Scroll Background */}
      <GladeyeParticleScroll />

      {/* Noise texture overlay for premium tactile quality */}
      <NoiseTextureOverlay
        opacity={0.04}
        blendMode="overlay"
        tintColor={narrativeState.color.atmosphere}
      />

      <WorkNarrativePage />
    </>
  );
}
