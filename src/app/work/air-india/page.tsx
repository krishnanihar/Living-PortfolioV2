import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { AirIndiaWork } from '@/components/sections/AirIndiaWork';
import { CaseStudyTracker } from '@/components/CaseStudyTracker';

export const metadata: Metadata = {
  title: 'Air India Case Study — Design Infrastructure from Zero | Krishna Nihar',
  description: 'How I built token architecture, QA automation (Pixel Radar, 450+ DAU), and AI-native features from zero during Air India\'s $200M Tata transformation — merging 4 airlines, 140 legacy systems.',
  openGraph: {
    title: 'Air India — Building Design Infrastructure Where None Existed',
    description: 'Case study: Token systems, Pixel Radar (450+ daily users), and AI search for Air India\'s 4-airline merger. Red Dot 2024.',
  },
  twitter: {
    title: 'Air India — Building Design Infrastructure Where None Existed',
    description: 'Case study: Token systems, Pixel Radar (450+ daily users), and AI search for Air India\'s 4-airline merger. Red Dot 2024.',
  },
};

export default function AirIndiaPage() {
  return (
    <>
      <CaseStudyTracker slug="air-india" />
      <PortfolioNavigation />
      <AirIndiaWork />
    </>
  );
}