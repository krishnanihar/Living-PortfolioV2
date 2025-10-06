import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import MythOSExperience from '@/components/sections/MythOSExperience';

export const metadata: Metadata = {
  title: 'mythOS — AI-Powered Art Curator',
  description: 'An intelligent digital art curator that explores visual motifs across art history. Uses computer vision and machine learning to generate thematic exhibitions, discover hidden patterns in artistic movements, and create algorithmic journeys through curated collections.',
  openGraph: {
    title: 'mythOS — AI Art Curation System',
    description: 'Exploring art history through algorithmic eyes. AI-powered exhibitions that reveal hidden patterns and connections across centuries of visual culture.',
  },
  twitter: {
    title: 'mythOS — AI Art Curation System',
    description: 'Exploring art history through algorithmic eyes. AI-powered exhibitions that reveal hidden patterns and connections across centuries of visual culture.',
  },
};

export default function MythOSPage() {
  return (
    <>
      <PortfolioNavigation />
      <MythOSExperience />
    </>
  );
}
