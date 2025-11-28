'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';
import { saveScrollDepth } from '@/lib/personalization';

// Dynamically import GPGPU Pattern Particles (interactive particle formations)
const HeroParticleSystem = dynamic(
  () => import('@/components/effects/HeroParticleSystem'),
  {
    ssr: false,
    loading: () => null
  }
);

// Lazy load below-the-fold sections for faster initial load
const AboutSectionV2 = dynamic(
  () => import('@/components/sections/AboutSectionV2'),
  {
    loading: () => null
  }
);

// Lazy load chat components
const FloatingChatButton = dynamic(
  () => import('@/components/FloatingChatButton').then(mod => ({ default: mod.FloatingChatButton })),
  {
    ssr: false,
    loading: () => null
  }
);

const Chatbot = dynamic(
  () => import('@/components/Chatbot').then(mod => ({ default: mod.Chatbot })),
  {
    ssr: false,
    loading: () => null
  }
);

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Track scroll depth for personalization
  const handleBeforeUnload = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    saveScrollDepth(scrollDepth);
  }, []);

  useEffect(() => {
    // Save scroll depth when user leaves the page
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Also save on visibility change (e.g., switching tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnload();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleBeforeUnload]);

  return (
    <HomeNarrativeWrapper>
      <PortfolioNavigation />

      {/* GPGPU Pattern Particles - Interactive particle formations with zoom scroll */}
      <HeroParticleSystem starOpacity={0.35} />

      {/* Scroll-snap container for smooth section snapping */}
      <div className="scroll-snap-container">
        {/* Normal scrolling main content */}
        <main id="main-content">
          {/* Hero Section */}
          <IntroductionSection />

          {/* Rest of page content */}
          <AboutSectionV2 />
        </main>
      </div>

      {/* Floating chat button */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chatbot modal */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        intentContext="general"
      />
    </HomeNarrativeWrapper>
  );
}
