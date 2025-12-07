import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { OneirosExperience } from '@/components/oneiros/OneirosExperience';
import { CaseStudyTracker } from '@/components/CaseStudyTracker';

export const metadata: Metadata = {
  title: 'Oneiros Palace — 3D Dream Museum Experience',
  description: 'Navigate a procedural dream palace where rooms are generated from your dream patterns, filled with masterworks that resonate with your unconscious. Descend through sleep stages as you explore deeper.',
  openGraph: {
    title: 'Oneiros Palace — 3D Dream Museum',
    description: 'An immersive 3D experience combining dreams, art, and consciousness. Explore personalized galleries generated from your dream patterns.',
  },
  twitter: {
    title: 'Oneiros Palace — 3D Dream Museum',
    description: 'An immersive 3D experience combining dreams, art, and consciousness. Explore personalized galleries generated from your dream patterns.',
  },
};

export default function OneirosPalacePage() {
  return (
    <>
      <CaseStudyTracker slug="oneiros-palace" />
      <PortfolioNavigation />
      <OneirosExperience />
    </>
  );
}
