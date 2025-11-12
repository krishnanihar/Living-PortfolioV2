'use client';

import dynamic from 'next/dynamic';
import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';

// Dynamically import CosmicBackground for better performance
const CosmicBackground = dynamic(
  () => import('@/components/effects/CosmicBackground').then(mod => ({ default: mod.CosmicBackground })),
  {
    ssr: false,
    loading: () => null
  }
);

// Import ScrollDarkeningOverlay for depth effect
const ScrollDarkeningOverlay = dynamic(
  () => import('@/components/effects/ScrollDarkeningOverlay').then(mod => ({ default: mod.ScrollDarkeningOverlay })),
  {
    ssr: false,
    loading: () => null
  }
);

export default function JourneyPage() {
  return (
    <>
      <PortfolioNavigation />
      <CosmicBackground />
      <ScrollDarkeningOverlay />
      <JourneyTimeline />
    </>
  );
}
