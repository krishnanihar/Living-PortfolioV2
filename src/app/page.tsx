'use client';

import { useState } from 'react';
import { NavigationBar } from '@/components/NavigationBar';
import { CosmicBackground } from '@/components/effects/CosmicBackground';
import { ScrollDarkeningOverlay } from '@/components/effects/ScrollDarkeningOverlay';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import JourneyPreview from '@/components/sections/JourneyPreview';
import WorkSection from '@/components/sections/WorkSection';
import AboutSectionV2 from '@/components/sections/AboutSectionV2';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { OrbReflectionProvider } from '@/contexts/OrbReflectionContext';
import { FloatingChatButton } from '@/components/FloatingChatButton';
import { Chatbot } from '@/components/Chatbot';

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
        <JourneyPreview />
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