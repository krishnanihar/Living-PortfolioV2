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

    // Bell curve with plateau: shrunk → expand → HOLD FULL → shrink
    // Exit happens EARLY (0.5-0.65) so it's visible before next card covers it
    cards.forEach((card) => {
      const inner = card.querySelector('.work-placeholder-inner') as HTMLDivElement;

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top bottom', // When card enters viewport
        end: 'bottom top', // When card leaves viewport
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;

          // Adjusted timing so exit happens before next card covers this one:
          // 0-0.2: shrunk → full (entry)
          // 0.2-0.5: hold at full (plateau)
          // 0.5-0.65: full → shrunk (exit - happens BEFORE next card appears)
          // 0.65-1.0: stays shrunk (already covered)
          let animProgress: number;
          if (progress < 0.2) {
            // Entry: 0-0.2 maps to 1-0 (shrunk to full)
            animProgress = 1 - (progress / 0.2);
          } else if (progress >= 0.5 && progress <= 0.65) {
            // Exit: 0.5-0.65 maps to 0-1 (full to shrunk)
            animProgress = (progress - 0.5) / 0.15;
          } else if (progress > 0.65) {
            // After exit: stays shrunk
            animProgress = 1;
          } else {
            // Plateau: 0.2-0.5 stays at 0 (full)
            animProgress = 0;
          }

          const easedProgress = gsap.parseEase('power2.out')(animProgress);

          if (inner) {
            // Scale: 0.92 ↔ 1.0
            const scale = 1 - easedProgress * 0.08;
            // Radius: 32 ↔ 0
            const radius = easedProgress * 32;

            inner.style.transform = `scale(${scale})`;
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
