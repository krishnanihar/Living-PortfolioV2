'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { NavigationBar } from '@/components/NavigationBar';
import { ScrollDarkeningOverlay } from '@/components/effects/ScrollDarkeningOverlay';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';
import { HomeFirstPersonMoments } from '@/components/sections/HomeFirstPersonMoments';

// Dynamically import CosmicBackground for better performance
const CosmicBackground = dynamic(
  () => import('@/components/effects/CosmicBackground').then(mod => ({ default: mod.CosmicBackground })),
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
      <NavigationBar />
      <CosmicBackground />
      <ScrollDarkeningOverlay />

      {/* First-person narrative moments */}
      <HomeFirstPersonMoments />

      <main id="main-content">
        <IntroductionSection />

        {/* Breathing moment after hero */}
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            fontSize: '3rem',
            color: 'rgba(255, 255, 255, 0.3)',
            fontWeight: '100'
          }}>
            •
          </div>
        </div>

        <SectionDivider text="Who thinks like this?" />

        <AboutSectionV2 />

        {/* Contemplative space before footer */}
        <div style={{ minHeight: '40vh', background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8))' }} />
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