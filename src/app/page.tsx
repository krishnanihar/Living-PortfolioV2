import { Metadata } from 'next';
import { NavigationBar } from '@/components/NavigationBar';
import { CosmicBackground } from '@/components/effects/CosmicBackground';
import { IntroductionSection } from '@/components/sections/IntroductionSection';
import WorkSection from '@/components/sections/WorkSection';
import AboutSectionV2 from '@/components/sections/AboutSectionV2';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { OrbReflectionProvider } from '@/contexts/OrbReflectionContext';

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
    <OrbReflectionProvider>
      <NavigationBar />
      <CosmicBackground />
      <main id="main-content">
        <IntroductionSection />
        <SectionDivider text="Who's Behind the Work?" />
        <AboutSectionV2 />
        <WorkSection />
      </main>
    </OrbReflectionProvider>
  );
}