'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';
import { useLenisScroll } from '@/hooks/useLenisScroll';
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
  const [chatTourMode, setChatTourMode] = useState(false);

  // Handle starting the tour from the hero pill
  const handleStartTour = () => {
    setChatTourMode(true);
    setIsChatOpen(true);
  };

  // Handle tour completion/exit
  const handleTourComplete = () => {
    setChatTourMode(false);
  };

  // Lenis smooth scroll - provides buttery smooth scroll progress
  const { progress, scrollY, stop, start } = useLenisScroll();

  // Calculate current section index from scroll position (for components that need it)
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const currentSectionIndex = Math.floor(scrollY / viewportHeight);

  // Track scroll depth for personalization
  const handleBeforeUnload = useCallback(() => {
    const scrollDepth = progress * 100;
    saveScrollDepth(scrollDepth);
  }, [progress]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

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

  // Stop/start Lenis when chat modal opens/closes
  useEffect(() => {
    if (isChatOpen) {
      stop();
    } else {
      start();
    }
  }, [isChatOpen, stop, start]);

  return (
    <HomeNarrativeWrapper>
      <PortfolioNavigation />

      {/* GPGPU Pattern Particles - Interactive particle formations with smooth scroll */}
      <HeroParticleSystem
        starOpacity={0.35}
        scrollProgress={progress}
      />

      {/* Main content - natural scroll flow */}
      <main
        id="main-content"
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Hero Section */}
        <IntroductionSection onStartTour={handleStartTour} />

        {/* Rest of page content */}
        <AboutSectionV2 snapIndex={currentSectionIndex} />
      </main>

      {/* Floating chat button */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chatbot modal */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatTourMode(false); // Reset tour mode when closing
        }}
        intentContext="general"
        tourMode={chatTourMode}
        onTourComplete={handleTourComplete}
      />
    </HomeNarrativeWrapper>
  );
}
