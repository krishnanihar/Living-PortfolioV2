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

// Dynamically import the 3D Knowledge Graph Hero
const AboutHero = dynamic(
  () => import('@/components/sections/AboutHero').then(mod => ({ default: mod.AboutHero })),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '100vh', background: 'var(--bg-primary)' }} />
    )
  }
);

export default function AboutPage() {
  return (
    <>
      <PortfolioNavigation />
      <GladeyeParticleScroll />
      <AboutHero />
      <AboutSection />
    </>
  );
}
