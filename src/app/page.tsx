'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { NavigationBar } from '@/components/NavigationBar';
import { ScrollDarkeningOverlay } from '@/components/effects/ScrollDarkeningOverlay';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import WorkSection from '@/components/sections/WorkSection';
import AboutSectionV2 from '@/components/sections/AboutSectionV2';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { OrbReflectionProvider } from '@/contexts/OrbReflectionContext';
import { FloatingChatButton } from '@/components/FloatingChatButton';
import { Chatbot } from '@/components/Chatbot';

// Dynamically import CosmicBackground for better performance
const CosmicBackground = dynamic(
  () => import('@/components/effects/CosmicBackground').then(mod => ({ default: mod.CosmicBackground })),
  {
    ssr: false,
    loading: () => null
  }
);

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <OrbReflectionProvider>
      <NavigationBar />
      <CosmicBackground />
      <ScrollDarkeningOverlay />
      <main id="main-content">
        <IntroductionSection />
        <SectionDivider text="Who's Behind the Work?" />
        <AboutSectionV2 />
        <WorkSection />
      </main>

      {/* Floating chat button */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />

      {/* Chatbot modal */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        intentContext="general"
      />
    </OrbReflectionProvider>
  );
}