'use client';

import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';
import { NarrativeProvider } from '@/contexts/NarrativeContext';

// Dynamic imports of background effects for performance (client-side only)
const HeroParticleSystem = dynamic(
  () => import('@/components/effects/HeroParticleSystem'),
  { ssr: false, loading: () => null }
);

/**
 * Client component wrapper for work page
 * Background system:
 * - z-index 1-3: HeroParticleSystem (GPGPU dual-layer particles)
 * - z-index 10+: Content
 */
export function WorkPageClient() {
  return (
    <NarrativeProvider>
      {/* Hero Particle System - GPGPU dual-layer particle background */}
      <HeroParticleSystem starOpacity={0.35} />

      <WorkNarrativePage />
    </NarrativeProvider>
  );
}
