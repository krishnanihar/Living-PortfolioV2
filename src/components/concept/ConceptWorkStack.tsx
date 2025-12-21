'use client';

import { useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import ConceptWorkPlaceholder from './ConceptWorkPlaceholder';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium quart ease-out (matches SmoothScrollProvider)
const premiumEaseOut = (t: number): number => 1 - Math.pow(1 - t, 4);

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
  const { lenis } = useLenisScroll();

  // Track current card index
  const currentCardRef = useRef(0);
  const lastScrollTriggerRef = useRef(0);
  const touchStartRef = useRef(0);

  // Constants
  const SCROLL_LOCKOUT = 1200; // 1.2s lockout (matches home page)
  const SWIPE_THRESHOLD = 50; // Minimum swipe distance
  const cardCount = featuredProjects.length;

  // Callback ref to store card refs
  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // Controlled snap scroll handlers
  useEffect(() => {
    if (!lenis) return;
    const container = containerRef.current;
    if (!container) return;

    const vh = window.innerHeight;

    // Check if scroll position is within work section
    const isInWorkSection = () => {
      const rect = container.getBoundingClientRect();
      // In section when container fills viewport (top at or above 0, bottom at or below vh)
      return rect.top <= 0 && rect.bottom >= vh;
    };

    // Wheel handler - one scroll = one card
    const wheelHandler = (e: WheelEvent) => {
      // Check if target is inside an element that handles its own scroll
      let target = e.target as HTMLElement | null;
      while (target) {
        if (target.hasAttribute('data-lenis-prevent')) {
          return;
        }
        target = target.parentElement;
      }

      if (!isInWorkSection()) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTriggerRef.current < SCROLL_LOCKOUT) return;

      lastScrollTriggerRef.current = now;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextCard = Math.max(0, Math.min(cardCount - 1, currentCardRef.current + direction));

      if (nextCard !== currentCardRef.current) {
        // Navigate to next/previous card
        currentCardRef.current = nextCard;
        const targetScroll = container.offsetTop + nextCard * vh;

        lenis.scrollTo(targetScroll, {
          lock: true,
          duration: 0.7,
          easing: premiumEaseOut,
        });
      } else if (direction === -1 && currentCardRef.current === 0) {
        // At first card, scrolling up - exit to previous section
        const targetScroll = container.offsetTop - vh;
        lenis.scrollTo(targetScroll, {
          duration: 0.7,
          easing: premiumEaseOut,
        });
      } else if (direction === 1 && currentCardRef.current === cardCount - 1) {
        // At last card, scrolling down - exit to next section
        const targetScroll = container.offsetTop + cardCount * vh;
        lenis.scrollTo(targetScroll, {
          duration: 0.7,
          easing: premiumEaseOut,
        });
      }
    };

    // Touch handlers for mobile
    const touchStartHandler = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const touchEndHandler = (e: TouchEvent) => {
      if (!isInWorkSection()) return;

      const now = Date.now();
      if (now - lastScrollTriggerRef.current < SCROLL_LOCKOUT) return;

      const deltaY = touchStartRef.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;

      lastScrollTriggerRef.current = now;

      const direction = deltaY > 0 ? 1 : -1;
      const nextCard = Math.max(0, Math.min(cardCount - 1, currentCardRef.current + direction));

      if (nextCard !== currentCardRef.current) {
        currentCardRef.current = nextCard;
        const targetScroll = container.offsetTop + nextCard * vh;

        lenis.scrollTo(targetScroll, {
          lock: true,
          duration: 0.7,
          easing: premiumEaseOut,
        });
      } else if (direction === -1 && currentCardRef.current === 0) {
        const targetScroll = container.offsetTop - vh;
        lenis.scrollTo(targetScroll, {
          duration: 0.7,
          easing: premiumEaseOut,
        });
      } else if (direction === 1 && currentCardRef.current === cardCount - 1) {
        const targetScroll = container.offsetTop + cardCount * vh;
        lenis.scrollTo(targetScroll, {
          duration: 0.7,
          easing: premiumEaseOut,
        });
      }
    };

    // Add event listeners
    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('touchstart', touchStartHandler, { passive: true });
    window.addEventListener('touchend', touchEndHandler, { passive: true });

    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchend', touchEndHandler);
    };
  }, [lenis, cardCount]);

  // Sync card index when scrolling normally into section
  useEffect(() => {
    if (!lenis) return;
    const container = containerRef.current;
    if (!container) return;

    const syncCardIndex = () => {
      const vh = window.innerHeight;
      const scrollInSection = window.scrollY - container.offsetTop;

      if (scrollInSection >= 0 && scrollInSection < cardCount * vh) {
        const cardIndex = Math.round(scrollInSection / vh);
        currentCardRef.current = Math.max(0, Math.min(cardCount - 1, cardIndex));
      }
    };

    lenis.on('scroll', syncCardIndex);
    return () => lenis.off('scroll', syncCardIndex);
  }, [lenis, cardCount]);

  // Scale animation - exit only (like hero section)
  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null
    );

    if (cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card) => {
      const inner = card.querySelector('.work-placeholder-inner') as HTMLDivElement;
      if (!inner) return;

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top top', // Animation starts when card is at top
        end: 'bottom 60%', // Matches hero section
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const easedProgress = gsap.parseEase('power2.out')(progress);

          // Scale: 1.0 → 0.92 (shrink only on exit)
          const scale = 1 - easedProgress * 0.08;
          // Radius: 0 → 32 (round only on exit)
          const radius = easedProgress * 32;

          inner.style.transform = `scale(${scale})`;
          inner.style.borderRadius = `${radius}px`;
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
