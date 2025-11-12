'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { NavigationBar } from '@/components/NavigationBar';
import { ScrollDarkeningOverlay } from '@/components/effects/ScrollDarkeningOverlay';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { HomeNarrativeWrapper } from '@/components/sections/HomeNarrativeWrapper';
import { HomeFirstPersonMoments } from '@/components/sections/HomeFirstPersonMoments';
import { BreathingMoment, NarrativeHook, ActTransition, ContemplativeSpace } from '@/components/ui/BreathingMoment';

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
        {/* ACT I: ARRIVAL (0-30%) - Purple, Curiosity & Wonder */}
        <IntroductionSection />

        {/* Breathing moment after hero */}
        <BreathingMoment type="pause" minHeight="60vh" />

        {/* Narrative hook - pull user forward */}
        <NarrativeHook question="What happens when design systems remember your context?" />

        {/* ACT I → ACT II TRANSITION */}
        <ActTransition
          fromAct="arrival"
          toAct="philosophy"
          title="The Philosophy"
        />

        {/* ACT II: PHILOSOPHY (30-70%) - Purple → Red, Conviction & Identity */}
        <SectionDivider text="Who thinks like this?" />

        <AboutSectionV2 />

        {/* Breathing moment with reflection */}
        <BreathingMoment
          type="reflection"
          quote="Design is not just what it looks like. It's how it thinks."
          author="Steve Jobs"
          minHeight="55vh"
        />

        {/* ACT II → ACT III TRANSITION */}
        <ActTransition
          fromAct="philosophy"
          toAct="catalog"
          title="The Work"
        />

        {/* ACT III: CATALOG (70-100%) - Red → Blue, Contemplation & Invitation */}
        <NarrativeHook question="Every project is a question answered. What's yours?" />

        {/* Contemplative space before footer */}
        <ContemplativeSpace height="50vh" />
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