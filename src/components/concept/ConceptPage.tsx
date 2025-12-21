'use client';

import { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress } = useLenisScroll();

  useEffect(() => {
    // Initialize ScrollTrigger with proper settings
    ScrollTrigger.defaults({
      markers: false,
    });

    // Refresh ScrollTrigger after all content is loaded
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      // Clean up all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
      }}
    >
      {/* Particle background - fixed, full viewport */}
      <HeroParticleSystem
        starOpacity={0.35}
        scrollProgress={progress}
      />

      {/* Navigation */}
      <PortfolioNavigation />

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10, isolation: 'isolate' }}>
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
