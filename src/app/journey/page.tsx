import { JourneyTimeline } from '@/components/sections/JourneyTimeline';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Journey | Krishna Nihar',
  description: 'Explore Nihar\'s professional journey from design education to building systems at scale. From Air India to Microsoft, NID to ISB - the story of designing living interfaces.',
  openGraph: {
    title: 'My Journey | Krishna Nihar',
    description: 'Explore Nihar\'s professional journey from design education to building systems at scale.',
  },
};

export default function JourneyPage() {
  return (
    <>
      <PortfolioNavigation />
      <JourneyTimeline />
    </>
  );
}
