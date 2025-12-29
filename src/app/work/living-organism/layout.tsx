import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Living Organism - Portfolio Architecture Case Study',
  description:
    'How this portfolio was built as a living, breathing digital organism. Features consciousness-aware interactions, breathing animations, and adaptive micro-behaviors that respond to user presence.',
  openGraph: {
    title: 'Living Organism - Portfolio Architecture Case Study',
    description:
      'How this portfolio was built as a living, breathing digital organism with consciousness-aware interactions.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Living Organism - Portfolio Architecture Case Study',
    description:
      'How this portfolio was built as a living, breathing digital organism.',
  },
};

export default function LivingOrganismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
