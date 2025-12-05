'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';
import { useFullPageSnap } from '@/hooks/useFullPageSnap';
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

  // Full-page snap scrolling
  const snapState = useFullPageSnap();
  const { currentIndex, verticalY, viewportHeight, totalSections } = snapState;

  // Calculate simulated scroll position for particle effects
  const simulatedScrollY = currentIndex * viewportHeight;
  const totalHeight = totalSections * viewportHeight;
  const scrollProgress = totalHeight > viewportHeight
    ? simulatedScrollY / (totalHeight - viewportHeight)
    : 0;

  // Lock body scroll when snap mode is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Track scroll depth for personalization (using snap position)
  const handleBeforeUnload = useCallback(() => {
    const scrollDepth = (currentIndex / (totalSections - 1)) * 100;
    saveScrollDepth(scrollDepth);
  }, [currentIndex, totalSections]);

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

  return (
    <HomeNarrativeWrapper>
      <PortfolioNavigation snapIndex={currentIndex} />

      {/* GPGPU Pattern Particles - Interactive particle formations with zoom scroll */}
      <HeroParticleSystem
        starOpacity={0.35}
        simulatedScrollY={simulatedScrollY}
        scrollProgress={scrollProgress}
      />

      {/* Snap scrolling container */}
      <motion.main
        id="main-content"
        style={{
          y: verticalY,
          height: `${totalSections * 100}vh`,
          willChange: 'transform',
        }}
      >
        {/* Hero Section */}
        <IntroductionSection snapController={snapState} />

        {/* Rest of page content */}
        <AboutSectionV2 />
      </motion.main>

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
