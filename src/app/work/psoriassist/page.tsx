import type { Metadata } from 'next';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { PsoriAssistWork } from '@/components/sections/PsoriAssistWork';

export const metadata: Metadata = {
  title: 'PsoriAssist — AI-Powered Psoriasis Digital Therapeutic Case Study',
  description: '18-month design concept reimagining psoriasis care through AI-powered digital therapeutics. 25 patient interviews, 75+ studies, clinical validation RCT pathway. Addressing treatment adherence, mental health integration, and early PsA detection for 125M patients globally. Ghost overlay innovation, AI PASI scoring 33% better than average dermatologist, predictive flare-up alerts.',
  openGraph: {
    title: 'PsoriAssist Case Study — Krishna Nihar Portfolio',
    description: '18-month digital health design concept born from lived experience. Clinical-grade AI, comprehensive research (25 interviews, 75+ studies), RCT validation pathway. $38M Year 5 revenue projection, 2M patients served.',
  },
  twitter: {
    title: 'PsoriAssist Case Study — Krishna Nihar Portfolio',
    description: 'Reimagining psoriasis care through AI-powered digital therapeutics. 18-month research-driven design concept with clinical validation pathway.',
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
