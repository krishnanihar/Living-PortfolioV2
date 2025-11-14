import { Metadata } from 'next';
import { WorkPageClient } from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Work - From Consciousness to Systems | Krish Suchak',
  description: 'A design journey through foundation, industry, and innovation. 4 years, 3 domains, 12+ shipped products.',
};

export default function Page() {
  return <WorkPageClient />;
}
