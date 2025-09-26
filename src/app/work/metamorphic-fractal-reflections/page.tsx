import type { Metadata } from 'next';
import { MetamorphicFractalWork } from '@/components/sections/MetamorphicFractalWork';

export const metadata: Metadata = {
  title: 'Metamorphic Fractal Reflections — Psychedelic Journey Case Study',
  description: 'An immersive installation exploring consciousness through ego dissolution. Participants enter a bathroom mirror portal and traverse a trippy multiverse of liquid color and pattern-creatures. Built with TouchDesigner, Arduino, and VR.',
  openGraph: {
    title: 'Metamorphic Fractal Reflections — Nihar Sunkara Portfolio',
    description: 'Psychedelic journey installation exploring consciousness, ego dissolution, and immersive art. Interactive experience combining TouchDesigner, Arduino, and VR technologies.',
  },
  twitter: {
    title: 'Metamorphic Fractal Reflections — Nihar Sunkara Portfolio',
    description: 'Psychedelic journey installation exploring consciousness, ego dissolution, and immersive art. Interactive experience combining TouchDesigner, Arduino, and VR technologies.',
  },
};

export default function MetamorphicFractalReflectionsPage() {
  return <MetamorphicFractalWork />;
}