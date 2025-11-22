'use client';

import dynamic from 'next/dynamic';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';

// Dynamically import Gladeye particle scroll system for better performance
const GladeyeParticleScroll = dynamic(
  () => import('@/components/effects/GladeyeParticleScroll').then(mod => ({ default: mod.GladeyeParticleScroll })),
  {
    ssr: false,
    loading: () => null
  }
);

export default function JourneyPage() {
  return (
    <>
      <PortfolioNavigation />
      <GladeyeParticleScroll />
      <JourneyTimeline />
    </>
  );
}
