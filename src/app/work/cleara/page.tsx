import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { ClearaCase } from '@/components/cleara/ClearaCase';
import { CaseStudyTracker } from '@/components/CaseStudyTracker';

export const metadata: Metadata = {
  title: 'Cleara — AI-Powered Psoriasis Digital Therapeutic',
  description: '18-month design journey reimagining psoriasis care through AI-powered digital therapeutics. A David Whyte-inspired immersive storytelling experience featuring watercolor aesthetics, parallax scrolling, and poetic typography.',
  openGraph: {
    title: 'Cleara Case Study — Krishna Nihar Portfolio',
    description: 'An immersive case study exploring the intersection of healthcare, AI, and human-centered design. 25 patient interviews, 75+ clinical studies, 18 months of research-driven design.',
  },
  twitter: {
    title: 'Cleara Case Study — Krishna Nihar Portfolio',
    description: 'Reimagining psoriasis care through AI-powered digital therapeutics. An immersive design journey.',
  },
};

export default function ClearaPage() {
  return (
    <>
      <CaseStudyTracker slug="cleara" />
      <PortfolioNavigation />
      <ClearaCase />
    </>
  );
}
