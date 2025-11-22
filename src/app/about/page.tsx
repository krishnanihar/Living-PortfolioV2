'use client';

import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { AboutSection } from '@/components/sections/AboutSection';

// Dynamically import Gladeye particle scroll system for better performance
const GladeyeParticleScroll = dynamic(
  () => import('@/components/effects/GladeyeParticleScroll').then(mod => ({ default: mod.GladeyeParticleScroll })),
  {
    ssr: false,
    loading: () => null
  }
);

export default function AboutPage() {
  return (
    <>
      <PortfolioNavigation />
      <GladeyeParticleScroll />
      <AboutSection />
    </>
  );
}
