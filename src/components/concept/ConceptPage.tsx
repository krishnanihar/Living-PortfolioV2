'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import ConceptHero from './ConceptHero';
import ConceptStatement from './ConceptStatement';
import ConceptWorkStack from './ConceptWorkStack';
import ConceptFooter from './ConceptFooter';

// Dynamic import for HeroParticleSystem (no SSR - uses Three.js)
const HeroParticleSystem = dynamic(
  () => import('@/components/effects/HeroParticleSystem'),
  { ssr: false }
);

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConceptPage() {
  const { progress } = useLenisScroll();

  useEffect(() => {
    // Refresh ScrollTrigger after all content is loaded
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      // Clean up all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Particle background - fixed, full viewport */}
      <HeroParticleSystem
        starOpacity={0.35}
        scrollProgress={progress}
      />

      {/* Navigation - fixed */}
      <PortfolioNavigation />

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero - Shrinks on scroll with glassmorphism */}
        <ConceptHero scrollProgress={progress} />

        {/* Statement - Glassmorphic container */}
        <ConceptStatement />

        {/* Work Cards - 3D cards that pin on scroll */}
        <ConceptWorkStack />

        {/* Footer */}
        <ConceptFooter />
      </main>
    </div>
  );
}
