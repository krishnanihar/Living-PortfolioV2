import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { LatentSpaceWork } from '@/components/sections/LatentSpaceWork';

export const metadata: Metadata = {
  title: 'Latent Space — Dream Technology & Consciousness Research',
  description: 'A speculative exploration of dream technology through critical design. What if we could navigate our dreams while preserving the mystery of consciousness? Interactive experience exploring ethical frameworks for brain-computer interfaces.',
  openGraph: {
    title: 'Latent Space — Nihar Sunkara Portfolio',
    description: 'Speculative design research exploring dream technology, consciousness, and ethical frameworks for brain-computer interfaces. MIT Media Lab collaboration on consciousness technology.',
  },
  twitter: {
    title: 'Latent Space — Nihar Sunkara Portfolio',
    description: 'Speculative design research exploring dream technology, consciousness, and ethical frameworks for brain-computer interfaces. MIT Media Lab collaboration on consciousness technology.',
  },
};

export default function LatentSpacePage() {
  return (
    <>
      <PortfolioNavigation />
      <LatentSpaceWork />
    </>
  );
}