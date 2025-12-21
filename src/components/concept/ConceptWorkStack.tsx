'use client';

import { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConceptWorkPlaceholder from './ConceptWorkPlaceholder';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Featured projects data - matches main home page (AboutSectionV2)
const featuredProjects = [
  {
    id: 'air-india',
    title: 'Air India',
    category: 'Aviation Design System',
    description:
      'Designing experiences for millions of passengers at 30,000ft across mobile app and in-flight entertainment systems',
    brandColor: { r: 218, g: 14, b: 41 },
    year: '2024',
    link: '/work/air-india',
  },
  {
    id: 'psoriassist',
    title: 'PsoriAssist',
    category: 'Healthcare AI Platform',
    description:
      'AI-powered psoriasis management platform combining computer vision with clinical insights for personalized patient care',
    brandColor: { r: 16, g: 185, b: 129 },
    year: '2024',
    link: '/work/psoriassist',
  },
  {
    id: 'metamorphic',
    title: 'Metamorphic Fractal Reflections',
    category: 'Immersive Installation',
    description:
      'Psychedelic journey installation exploring consciousness, ego dissolution, and the nature of reality through interactive design',
    brandColor: { r: 139, g: 92, b: 246 },
    year: '2023',
    link: '/work/metamorphic-fractal-reflections',
  },
];

export default function ConceptWorkStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Callback ref to store card refs
  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null
    );

    if (!container || cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Create two-phase animation for each card
    cards.forEach((card) => {
      const inner = card.querySelector('.work-placeholder-inner') as HTMLDivElement;

      // Phase 1: ENTRY - Card scrolls into view, expands from shrunk to full
      const entryTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top bottom', // When card top enters viewport bottom
        end: 'top 20%', // Until card top is 20% from viewport top
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;
          const easedProgress = gsap.parseEase('power2.out')(progress);

          if (inner) {
            // Expand: 0.92 → 1.0 as card enters
            const scale = 0.92 + easedProgress * 0.08;
            const radius = 32 - easedProgress * 32;

            inner.style.transform = `scale(${scale})`;
            inner.style.borderRadius = `${radius}px`;
          }
        },
      });

      // Phase 2: PINNED + EXIT - Card is pinned, then shrinks on exit
      const pinTrigger = ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: 'bottom 60%',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const easedProgress = gsap.parseEase('power2.out')(progress);

          if (inner) {
            // Shrink: 1.0 → 0.92 as user scrolls past
            const scale = 1.0 - easedProgress * 0.08;
            const radius = easedProgress * 32;

            inner.style.transform = `scale(${scale})`;
            inner.style.borderRadius = `${radius}px`;
          }
        },
      });

      triggers.push(entryTrigger, pinTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="work-section"
      style={{
        position: 'relative',
        zIndex: 100,
        isolation: 'isolate',
      }}
    >
      {featuredProjects.map((project, index) => (
        <ConceptWorkPlaceholder
          key={project.id}
          ref={(el) => setCardRef(el, index)}
          project={project}
          index={index}
        />
      ))}
    </section>
  );
}
