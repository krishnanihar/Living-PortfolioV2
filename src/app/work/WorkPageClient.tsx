'use client';

import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';
import { NoiseTextureOverlay } from '@/components/effects/NoiseTextureOverlay';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';

// Dynamic imports of background effects for performance (client-side only)
const GradientMeshBackground = dynamic(
  () => import('@/components/effects/GradientMeshBackground').then(mod => ({ default: mod.GradientMeshBackground })),
  { ssr: false, loading: () => null }
);

const GladeyeParticleScroll = dynamic(
  () => import('@/components/effects/GladeyeParticleScroll').then(mod => ({ default: mod.GladeyeParticleScroll })),
  { ssr: false, loading: () => null }
);

/**
 * Client component wrapper for work page
 * Layered background system:
 * - z-index 0: Gradient mesh (morphing color gradients)
 * - z-index 1: Particle system (shimmer effects)
 * - z-index 2: Noise texture (film grain)
 * - z-index 10+: Content
 */
export function WorkPageClient() {
  const narrativeState = useWorkNarrativeProgress();

  return (
    <>
      {/* Gradient mesh background - Stripe-style morphing gradients */}
      <GradientMeshBackground />

      {/* Gladeye Particle Scroll - Interactive particle system */}
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
