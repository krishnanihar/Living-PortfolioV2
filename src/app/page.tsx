'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';

// Dynamically import optimized GPGPU Flow Field for ultimate visual experience
const OptimizedFlowField = dynamic(
  () => import('@/components/effects/OptimizedFlowField'),
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

      {/* Ultimate GPGPU Flow Field - Immersive particle experience */}
      <OptimizedFlowField preset="immersive" enableFPSMonitoring={true} />

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
