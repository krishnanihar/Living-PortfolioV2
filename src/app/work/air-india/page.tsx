import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { AirIndiaWork } from '@/components/sections/AirIndiaWork';
import { CaseStudyTracker } from '@/components/CaseStudyTracker';

export const metadata: Metadata = {
  title: 'Air India Case Study — $200M Digital Transformation | Red Dot Award',
  description: 'Built design infrastructure from zero during Air India\'s Tata transformation. Pixel Radar (450+ daily users), AI-native features, MCP handoff. Red Dot 2024, Gold Stevie, APEX Four Star recognition.',
  openGraph: {
    title: 'Air India Case Study — Design Infrastructure from Zero',
    description: 'When Tata acquired Air India, zero design infrastructure existed. I built Pixel Radar (450+ users), design systems for 4 merging airlines, and AI-native features that won Red Dot 2024.',
  },
  twitter: {
    title: 'Air India Case Study — Design Infrastructure from Zero',
    description: 'When Tata acquired Air India, zero design infrastructure existed. I built Pixel Radar (450+ users), design systems for 4 merging airlines, and AI-native features that won Red Dot 2024.',
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