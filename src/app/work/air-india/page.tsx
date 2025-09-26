import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { AirIndiaWork } from '@/components/sections/AirIndiaWork';

export const metadata: Metadata = {
  title: 'Air India Case Study — Design Systems & Digital Transformation',
  description: 'Deep dive into Air India\'s digital transformation. Building systems that help teams ship better products, faster. 450+ daily users, design systems, and innovation.',
  openGraph: {
    title: 'Air India Case Study — Nihar Sunkara Portfolio',
    description: 'Systems and innovation across Air India\'s digital transformation. Design systems, data visualization, and hackathon wins in production.',
  },
  twitter: {
    title: 'Air India Case Study — Nihar Sunkara Portfolio',
    description: 'Systems and innovation across Air India\'s digital transformation. Design systems, data visualization, and hackathon wins in production.',
  },
};

export default function AirIndiaPage() {
  return (
    <>
      <PortfolioNavigation />
      <AirIndiaWork />
    </>
  );
}