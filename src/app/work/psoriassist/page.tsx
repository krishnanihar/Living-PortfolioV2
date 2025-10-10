import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { PsoriAssistWork } from '@/components/sections/PsoriAssistWork';

export const metadata: Metadata = {
  title: 'PsoriAssist — AI-Powered Psoriasis Management Case Study',
  description: 'A deeply personal digital health platform born from lived experience. Designing AI-powered photo tracking, predictive analytics, and mental health integration for 125M people living with psoriasis. Clinical validation, FDA pathway, and human-centered care.',
  openGraph: {
    title: 'PsoriAssist Case Study — Nihar Sunkara Portfolio',
    description: 'Personal journey designing an AI-powered psoriasis management platform. Clinical-grade tracking, predictive intelligence, and mental health integration. Research-driven, empathy-led.',
  },
  twitter: {
    title: 'PsoriAssist Case Study — Nihar Sunkara Portfolio',
    description: 'Designing AI-powered psoriasis management from lived experience. Photo tracking, predictive analytics, mental health integration. 125M people, one personal mission.',
  },
};

export default function PsoriAssistPage() {
  return (
    <>
      <PortfolioNavigation />
      <PsoriAssistWork />
    </>
  );
}
