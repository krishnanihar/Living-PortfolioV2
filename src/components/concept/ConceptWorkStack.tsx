'use client';

import { useRef, useLayoutEffect, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp, ChevronDown } from 'lucide-react';
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
    tags: ['Design System', 'React', 'Aviation', 'Mobile'],
  },
  {
    id: 'origen',
    title: 'Origen',
    category: 'Design System for AI',
    description:
      'The first design system built for the AI era. Give LLMs programmatic access to query design decisions instead of hallucinating tokens.',
    brandColor: { r: 59, g: 130, b: 246 },
    year: '2025',
    link: '/work/origen',
    tags: ['MCP', 'Design Tokens', 'AI-Native', 'TypeScript'],
  },
  {
    id: 'cleara',
    title: 'Cleara',
    category: 'Digital Therapeutic',
    description:
      'AI-powered psoriasis digital therapeutic with watercolor healing aesthetic, combining clinical AI with supportive design',
    brandColor: { r: 139, g: 157, b: 195 },
    year: '2024',
    link: '/work/cleara',
    tags: ['AI/ML', 'Healthcare', 'Digital Therapeutic', 'Watercolor'],
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
    tags: ['TouchDesigner', 'Arduino', 'Psychedelic', 'Installation'],
  },
];

export default function ConceptWorkStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { lenis } = useLenisScroll();

  // Track current card index - both ref (for scroll sync) and state (for UI)
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showIndicators, setShowIndicators] = useState(false);
  const currentCardRef = useRef(0);
  const lastScrollTriggerRef = useRef(0);
  const touchStartRef = useRef(0);
  const hasSnappedToSection = useRef(false); // Track if we've auto-snapped into section
  const lastScrollY = useRef(0); // Track scroll direction
  const isAnimatingRef = useRef(false); // Track programmatic scroll animation state

  // Constants
  const SCROLL_LOCKOUT = 1300; // Must exceed animation duration (1000ms) + buffer to prevent interrupts
  const SWIPE_THRESHOLD = 50; // Minimum swipe distance
  const ENTRY_SNAP_THRESHOLD = 0.1; // Snap when 10% visible (magnetic pull)
  const cardCount = featuredProjects.length;

  // Callback ref to store card refs
  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // Click-to-navigate function for dot indicators
  const scrollToCard = useCallback((index: number) => {
    if (!lenis || !containerRef.current) return;

    currentCardRef.current = index;
    setActiveCardIndex(index);
    lastScrollTriggerRef.current = Date.now();
    isAnimatingRef.current = true;

    const vh = window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + index * vh;

    lenis.scrollTo(targetScroll, {
      lock: true,
      duration: 1.0,
      easing: premiumEaseOut,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [lenis]);

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

      // Skip if animation is in progress
      if (isAnimatingRef.current) return;

      const now = Date.now();
      if (now - lastScrollTriggerRef.current < SCROLL_LOCKOUT) return;

      lastScrollTriggerRef.current = now;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextCard = Math.max(0, Math.min(cardCount - 1, currentCardRef.current + direction));

      if (nextCard !== currentCardRef.current) {
        // Navigate to next/previous card
        currentCardRef.current = nextCard;
        setActiveCardIndex(nextCard); // Update reactive state for UI
        isAnimatingRef.current = true;
        const targetScroll = container.offsetTop + nextCard * vh;

        lenis.scrollTo(targetScroll, {
          lock: true,
          duration: 1.0, // Snappy, smooth
          easing: premiumEaseOut,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      } else if (direction === -1 && currentCardRef.current === 0) {
        // At first card, scrolling up - exit to previous section
        isAnimatingRef.current = true;
        const targetScroll = container.offsetTop - vh;
        lenis.scrollTo(targetScroll, {
          duration: 1.0, // Snappy, smooth
          easing: premiumEaseOut,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      }
      // At last card scrolling down - let infinite scroll loop naturally to hero
      // (removed explicit exit scroll - Lenis infinite handles the loop)
    };

    // Touch handlers for mobile
    const touchStartHandler = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const touchEndHandler = (e: TouchEvent) => {
      if (!isInWorkSection()) return;

      // Skip if animation is in progress
      if (isAnimatingRef.current) return;

      const now = Date.now();
      if (now - lastScrollTriggerRef.current < SCROLL_LOCKOUT) return;

      const deltaY = touchStartRef.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;

      lastScrollTriggerRef.current = now;

      const direction = deltaY > 0 ? 1 : -1;
      const nextCard = Math.max(0, Math.min(cardCount - 1, currentCardRef.current + direction));

      if (nextCard !== currentCardRef.current) {
        currentCardRef.current = nextCard;
        setActiveCardIndex(nextCard); // Update reactive state for UI
        isAnimatingRef.current = true;
        const targetScroll = container.offsetTop + nextCard * vh;

        lenis.scrollTo(targetScroll, {
          lock: true,
          duration: 1.0, // Snappy, smooth
          easing: premiumEaseOut,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      } else if (direction === -1 && currentCardRef.current === 0) {
        isAnimatingRef.current = true;
        const targetScroll = container.offsetTop - vh;
        lenis.scrollTo(targetScroll, {
          duration: 1.0, // Snappy, smooth
          easing: premiumEaseOut,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      }
      // At last card scrolling down - let infinite scroll loop naturally to hero
      // (removed explicit exit scroll - Lenis infinite handles the loop)
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
      // Skip sync during programmatic scroll animation to prevent race conditions
      if (isAnimatingRef.current) return;

      const vh = window.innerHeight;
      const scrollInSection = window.scrollY - container.offsetTop;

      // Track section visibility for dot indicators (hide halfway through last card)
      const isInSection = scrollInSection >= -vh * 0.1 && scrollInSection < (cardCount - 0.5) * vh;
      setShowIndicators(isInSection);

      if (scrollInSection >= 0 && scrollInSection < cardCount * vh) {
        // Use floor + 0.5 offset for more predictable snapping (same as Math.round but clearer)
        const cardIndex = Math.max(0, Math.min(cardCount - 1, Math.floor((scrollInSection + vh * 0.5) / vh)));
        if (cardIndex !== currentCardRef.current) {
          currentCardRef.current = cardIndex;
          setActiveCardIndex(cardIndex); // Update reactive state for UI
        }
      }
    };

    lenis.on('scroll', syncCardIndex);
    return () => lenis.off('scroll', syncCardIndex);
  }, [lenis, cardCount]);

  // Auto-snap when work section enters viewport at 10%
  // Creates elegant "magnetic pull" into the first work card (only when scrolling DOWN)
  useEffect(() => {
    if (!lenis) return;
    const container = containerRef.current;
    if (!container) return;

    const checkEntrySnap = () => {
      const vh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const currentScrollY = window.scrollY;

      // Detect scroll direction
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Calculate how much of the section is visible (0 to 1)
      const visibleFromBottom = (vh - rect.top) / vh;

      // Check if section is entering from bottom (scrolling down)
      const isEnteringFromBottom = rect.top > 0 && rect.top < vh;

      // Snap when 10% visible, scrolling DOWN, and we haven't snapped yet
      if (isEnteringFromBottom && isScrollingDown && visibleFromBottom >= ENTRY_SNAP_THRESHOLD && !hasSnappedToSection.current) {
        hasSnappedToSection.current = true;
        lastScrollTriggerRef.current = Date.now();
        isAnimatingRef.current = true;

        // Snap to first card
        currentCardRef.current = 0;
        setActiveCardIndex(0);

        lenis.scrollTo(container.offsetTop, {
          lock: true,
          duration: 1.0, // Snappy, smooth
          easing: premiumEaseOut,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      }

      // Reset snap flag when scrolled well above the section (to allow re-entry)
      if (rect.top > vh * 0.5) {
        hasSnappedToSection.current = false;
      }
    };

    lenis.on('scroll', checkEntrySnap);
    return () => lenis.off('scroll', checkEntrySnap);
  }, [lenis]);

  // Scale animation - bidirectional: expand on entry, shrink on exit
  // Creates symmetric animation: shrunk → full → shrunk
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
        start: 'top bottom', // Start when card enters viewport from bottom
        end: 'bottom top', // End when card exits viewport from top
        scrub: 0.3, // Tighter sync to reduce jitter during snap scroll
        onUpdate: (self) => {
          const progress = self.progress;

          // Bell curve animation:
          // 0.0 - 0.35: Entry (shrunk → full) - card entering from bottom
          // 0.35 - 0.55: Hold at full (plateau) - centered sweet spot
          // 0.55 - 0.75: Exit (full → shrunk) - card exiting from top
          // 0.75 - 1.0: Stay shrunk (card off screen)
          let animProgress: number;

          if (progress < 0.35) {
            // Entry: shrunk → full (1 → 0)
            animProgress = 1 - (progress / 0.35);
          } else if (progress >= 0.55 && progress <= 0.75) {
            // Exit: full → shrunk (0 → 1)
            animProgress = (progress - 0.55) / 0.2;
          } else if (progress > 0.75) {
            // After exit: stays shrunk
            animProgress = 1;
          } else {
            // Plateau: 0.35-0.55 stays at full (0)
            animProgress = 0;
          }

          const easedProgress = gsap.parseEase('power2.out')(animProgress);

          // Scale: 0.92 ↔ 1.0
          const scale = 1 - easedProgress * 0.08;
          // Radius: 32 ↔ 0
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
          isActive={activeCardIndex === index}
        />
      ))}

      {/* Scroll Indicators - Tailwind responsive classes (bulletproof) */}
      <div
        className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-1 md:gap-3 z-[110] p-1.5 md:p-3 rounded-xl md:rounded-2xl"
        style={{
          background: 'var(--glass-08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          opacity: showIndicators ? 1 : 0,
          pointerEvents: showIndicators ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Up Arrow */}
        <button
          onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
          aria-label="Previous project"
          className="p-0 bg-transparent border-none flex items-center justify-center"
          style={{
            cursor: activeCardIndex === 0 ? 'default' : 'pointer',
            opacity: activeCardIndex === 0 ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-white/60" />
        </button>

        {/* Dot Indicators */}
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            aria-label={`Go to project ${index + 1}`}
            className={`w-1 md:w-2 rounded-sm md:rounded border-none p-0 cursor-pointer ${
              index === activeCardIndex
                ? 'h-3 md:h-6 bg-white/90'
                : 'h-1 md:h-2 bg-white/25'
            }`}
            style={{ transition: 'all 0.3s ease' }}
          />
        ))}

        {/* Down Arrow */}
        <button
          onClick={() => scrollToCard(Math.min(cardCount - 1, activeCardIndex + 1))}
          aria-label="Next project"
          className="p-0 bg-transparent border-none flex items-center justify-center"
          style={{
            cursor: activeCardIndex === cardCount - 1 ? 'default' : 'pointer',
            opacity: activeCardIndex === cardCount - 1 ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-white/60" />
        </button>
      </div>
    </section>
  );
}
