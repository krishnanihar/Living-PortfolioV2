import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import LatentSpaceSpeculative from '@/components/sections/LatentSpaceSpeculative';

export const metadata: Metadata = {
  title: 'Latent Space — Speculative Design on Dream Technology',
  description: 'A speculative design exploration questioning what might happen if we could interface with our dreams. What ethical frameworks would guide consciousness technology? What might we lose by making the invisible visible?',
  openGraph: {
    title: 'Latent Space — Speculative Design Project',
    description: 'A critical design fiction exploring dream technology, consciousness interfaces, and the ethics of mental privacy. What questions should we ask before consciousness becomes data?',
  },
  twitter: {
    title: 'Latent Space — Speculative Design Project',
    description: 'A critical design fiction exploring dream technology, consciousness interfaces, and the ethics of mental privacy. What questions should we ask before consciousness becomes data?',
  },
};

export default function LatentSpacePage() {
  return (
    <>
      <PortfolioNavigation />
      <LatentSpaceSpeculative />
    </>
  );
}