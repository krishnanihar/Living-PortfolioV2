'use client';

import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { Hero } from '@/components/mythos/sections/Hero';
import { ProblemSection } from '@/components/mythos/sections/ProblemSection';
import { InnovationSection } from '@/components/mythos/sections/InnovationSection';
import { GallerySection } from '@/components/mythos/sections/GallerySection';
import { ImpactSection } from '@/components/mythos/sections/ImpactSection';
import { CTASection } from '@/components/mythos/sections/CTASection';

export default function MythosPage() {
  return (
    <>
      <PortfolioNavigation />
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Hero />
        <ProblemSection />
        <InnovationSection />
        <GallerySection />
        <ImpactSection />
        <CTASection />
      </div>
    </>
  );
}
