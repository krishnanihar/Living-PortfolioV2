import { Metadata } from 'next';
import ConceptPage from '@/components/concept/ConceptPage';

export const metadata: Metadata = {
  title: 'Krishna Nihar Sunkara — Product Designer',
  description: 'Product Designer at Air India. I design and code experiences that remember, learn, and scale—serving millions across aviation, healthcare, and beyond.',
  openGraph: {
    title: 'Krishna Nihar Sunkara — Product Designer',
    description: 'Product Designer at Air India. I design and code experiences that remember, learn, and scale.',
    type: 'website',
  },
};

export default function ConceptPageRoute() {
  return <ConceptPage />;
}
