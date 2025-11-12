'use client';

import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { AboutSection } from '@/components/sections/AboutSection';
import { ScrollDarkeningOverlay } from '@/components/effects/ScrollDarkeningOverlay';

// Dynamically import CosmicBackground for better performance
const CosmicBackground = dynamic(
  () => import('@/components/effects/CosmicBackground').then(mod => ({ default: mod.CosmicBackground })),
  {
    ssr: false,
    loading: () => null
  }
);

export default function AboutPage() {
  return (
    <>
      <PortfolioNavigation />
      <CosmicBackground />
      <ScrollDarkeningOverlay />
      <AboutSection />
    </>
  );
}
