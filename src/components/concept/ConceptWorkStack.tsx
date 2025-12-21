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

    // Create shrink animation for each card - matches hero behavior
    cards.forEach((card) => {
      // Get inner glass container
      const inner = card.querySelector('.work-placeholder-inner') as HTMLDivElement;

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: 'bottom 60%', // Matches hero
        scrub: 0.5, // Smooth scroll-linked animation
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const easedProgress = gsap.parseEase('power2.out')(progress);

          // Shrink animation - matches hero exactly
          const padding = easedProgress * 48;
          card.style.paddingLeft = `${padding}px`;
          card.style.paddingRight = `${padding}px`;

          if (inner) {
            const radius = easedProgress * 32;
            inner.style.borderRadius = `${radius}px`;
          }
        },
      });

      triggers.push(trigger);
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
