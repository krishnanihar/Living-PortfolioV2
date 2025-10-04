import { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { AboutSection } from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'About - Nihar Sunkara',
  description: 'Learn about Nihar Sunkara\'s journey as a product designer, design philosophy, and approach to creating thoughtful digital experiences.',
  openGraph: {
    title: 'About - Nihar Sunkara',
    description: 'Learn about Nihar Sunkara\'s journey as a product designer, design philosophy, and approach to creating thoughtful digital experiences.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Nihar Sunkara',
    description: 'Learn about Nihar Sunkara\'s journey as a product designer, design philosophy, and approach to creating thoughtful digital experiences.',
  },
};

export default function AboutPage() {
  return (
    <>
      <PortfolioNavigation />
      <AboutSection />
    </>
  );
}