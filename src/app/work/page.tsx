import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { Work } from '@/components/sections/Work';

export const metadata: Metadata = {
  title: 'Work — Product & Design Systems Portfolio',
  description: 'Product & Design Systems work by Nihar — Air India transformation, mobile UX patterns, hackathon wins, and aviation interfaces serving 450+ daily users.',
  openGraph: {
    title: 'Work — Nihar Sunkara Portfolio',
    description: 'Design systems, aviation UX, and consciousness-aware interfaces that serve 450+ daily users at Air India.',
  },
  twitter: {
    title: 'Work — Nihar Sunkara Portfolio',
    description: 'Design systems, aviation UX, and consciousness-aware interfaces that serve 450+ daily users at Air India.',
  },
};

export default function WorkPage() {
  return (
    <>
      <PortfolioNavigation />
      <Work />
    </>
  );
}