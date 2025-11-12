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
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);

  const handleOpenChatWithContext = (contextMessage?: string) => {
    setChatContext(contextMessage);
    setIsChatOpen(true);
  };

  return (
    <HomeNarrativeWrapper>
      <NavigationBar />
      <CosmicBackground />
      <ScrollDarkeningOverlay />

      {/* First-person narrative moments - now interactive chatbot notifications */}
      <HomeFirstPersonMoments onOpenChat={handleOpenChatWithContext} />

      <main id="main-content">
        <IntroductionSection />

        <SectionDivider text="Who thinks like this?" />

        <AboutSectionV2 />
      </main>

      {/* Floating chat button */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chatbot modal */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatContext(undefined); // Clear context when closing
        }}
        intentContext="general"
      />
    </HomeNarrativeWrapper>
  );
}
