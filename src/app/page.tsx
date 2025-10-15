import { Metadata } from 'next';
import Portfolio from '@/components/Portfolio';
import WorkSection from '@/components/sections/WorkSection';
import SimpleAboutSection from '@/components/sections/SimpleAboutSection';
import { SectionDivider } from '@/components/ui/SectionDivider';

export const metadata: Metadata = {
  title: 'Nihar Sunkara - Product Designer & Systems Thinker',
  description: 'Product designer crafting thoughtful experiences across systems, mobile, and IFE. Exploring design, AI, and the future of human-computer interaction.',
  openGraph: {
    title: 'Nihar Sunkara - Product Designer & Systems Thinker',
    description: 'Product designer crafting thoughtful experiences across systems, mobile, and IFE. Exploring design, AI, and the future of human-computer interaction.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nihar Sunkara - Product Designer & Systems Thinker',
    description: 'Product designer crafting thoughtful experiences across systems, mobile, and IFE. Exploring design, AI, and the future of human-computer interaction.',
  },
};

export default function HomePage() {
  return (
    <>
      <Portfolio />
      <WorkSection />
      <SectionDivider text="Who's Behind the Work?" />
      <SimpleAboutSection />
    </>
  );
}