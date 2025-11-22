'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';

// Dynamically import Premium Background System (aurora mesh + dreamy particles)
const PremiumBackgroundSystem = dynamic(
  () => import('@/components/effects/PremiumBackgroundSystem'),
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

  return (
    <HomeNarrativeWrapper>
      <PortfolioNavigation />

      {/* Premium Background System - Aurora mesh + dreamy golden particles */}
      <PremiumBackgroundSystem />

      <main id="main-content">
        <IntroductionSection />

        <AboutSectionV2 />
      </main>

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
