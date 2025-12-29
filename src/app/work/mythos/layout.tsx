import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'mythOS - AI Art Curator Case Study',
  description:
    'An AI art curator that sees patterns humans might miss. Tell it what you want to see, and Gemini AI generates thematic exhibitions across centuries. Making elite art knowledge accessible to everyone.',
  openGraph: {
    title: 'mythOS - AI Art Curator Case Study',
    description:
      'An AI art curator powered by Gemini AI that generates thematic exhibitions from abstract concepts.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mythOS - AI Art Curator Case Study',
    description:
      'An AI art curator that generates thematic exhibitions from abstract concepts.',
  },
};

export default function MythosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
