import { Metadata } from 'next';
import ConceptPage from '@/components/concept/ConceptPage';

export const metadata: Metadata = {
  title: 'Concept — Otherlife Inspired',
  description: 'A concept home page inspired by Otherlife.xyz featuring shrinking hero, mixed typography, and pinned work cards.',
  openGraph: {
    title: 'Concept — Otherlife Inspired',
    description: 'A concept home page inspired by Otherlife.xyz',
    type: 'website',
  },
};

export default function ConceptPageRoute() {
  return <ConceptPage />;
}
