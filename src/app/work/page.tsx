import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { WorkNarrativePage } from './WorkNarrativePage';

// Dynamic import of CosmicBackground for performance
const CosmicBackground = dynamic(
  () => import('@/components/effects/CosmicBackground').then(mod => ({ default: mod.CosmicBackground })),
  { ssr: false, loading: () => null }
);

export const metadata: Metadata = {
  title: 'Work - From Consciousness to Systems | Krish Suchak',
  description: 'A design journey through foundation, industry, and innovation. 4 years, 3 domains, 12+ shipped products.',
};

export default function Page() {
  return (
    <>
      {/* Cosmic Stars Background */}
      <CosmicBackground />

      <WorkNarrativePage />
    </>
  );
}
