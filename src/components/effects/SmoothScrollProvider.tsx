'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollProgress: number;
  scrollVelocity: number;
  scrollY: number;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollY: 0,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Track current section explicitly (avoids race condition with lenis.scroll during animation)
  const currentSectionRef = useRef(0);
  // Track touch start position for swipe detection
  const touchStartYRef = useRef(0);
  // Timestamp when last scroll was TRIGGERED (not just any wheel event)
  const lastScrollTriggerTimeRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if home page for controlled snap behavior
    const isHomePage = window.location.pathname === '/';
    const sectionCount = 8; // Hero, Philosophy, Air India, PsoriAssist, Metamorphic, Latent Space, View All, About

    // Initialize Lenis with settings optimized for controlled snap on home page
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.15, // Snappier response
      duration: prefersReducedMotion ? 0 : 0.6, // Faster animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out

      // THE FIX: virtualScroll returning false COMPLETELY disables Lenis wheel processing
      // wheelMultiplier: 0 only multiplies delta by 0, but Lenis still processes events internally
      // This ensures our custom handler has FULL control on home page
      virtualScroll: () => !isHomePage, // false on home page = Lenis ignores ALL wheel/touch events

      wheelMultiplier: isHomePage ? 0 : 0.8, // Keep for safety
      touchMultiplier: isHomePage ? 0 : 1.5,
      smoothWheel: !prefersReducedMotion,
      syncTouch: !isHomePage,
      syncTouchLerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    lenisRef.current = lenis;

    // Apple-style controlled wheel handler (home page only)
    // One scroll gesture = exactly one section (no momentum overshoot)
    let wheelHandler: ((e: WheelEvent) => void) | null = null;
    let touchStartHandler: ((e: TouchEvent) => void) | null = null;
    let touchEndHandler: ((e: TouchEvent) => void) | null = null;

    if (isHomePage && !prefersReducedMotion) {
      const vh = window.innerHeight;
      const SWIPE_THRESHOLD = 50; // Minimum swipe distance to trigger
      // ABSOLUTE LOCKOUT: Ignore ALL scroll input for this duration after triggering a scroll
      // This outlasts trackpad momentum (typically 500-1000ms) completely
      const SCROLL_LOCKOUT = 1200; // 1.2 seconds - longer than any trackpad momentum

      // Wheel handler - intercept and navigate one section at a time
      wheelHandler = (e: WheelEvent) => {
        e.preventDefault();

        const now = Date.now();

        // ABSOLUTE LOCKOUT: Ignore ALL wheel events for SCROLL_LOCKOUT ms after triggering
        // This prevents trackpad momentum from triggering additional scrolls
        if (now - lastScrollTriggerTimeRef.current < SCROLL_LOCKOUT) return;

        // Mark the trigger time BEFORE animation starts
        lastScrollTriggerTimeRef.current = now;

        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(sectionCount - 1, currentSectionRef.current + direction));

        if (nextSection !== currentSectionRef.current) {
          currentSectionRef.current = nextSection;
          lenis.scrollTo(nextSection * vh, {
            lock: true,
            duration: 0.6,
          });
        }
      };

      // Touch handlers - same pattern for mobile swipes
      touchStartHandler = (e: TouchEvent) => {
        touchStartYRef.current = e.touches[0].clientY;
      };

      touchEndHandler = (e: TouchEvent) => {
        const now = Date.now();

        // Same lockout for touch
        if (now - lastScrollTriggerTimeRef.current < SCROLL_LOCKOUT) return;

        const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

        if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
          lastScrollTriggerTimeRef.current = now;

          const direction = deltaY > 0 ? 1 : -1;
          const nextSection = Math.max(0, Math.min(sectionCount - 1, currentSectionRef.current + direction));

          if (nextSection !== currentSectionRef.current) {
            currentSectionRef.current = nextSection;
            lenis.scrollTo(nextSection * vh, {
              lock: true,
              duration: 0.6,
            });
          }
        }
      };

      // Add event listeners with passive: false to allow preventDefault
      window.addEventListener('wheel', wheelHandler, { passive: false });
      window.addEventListener('touchstart', touchStartHandler, { passive: true });
      window.addEventListener('touchend', touchEndHandler, { passive: true });
    }

    // Scroll event handler - provides smooth interpolated values
    lenis.on('scroll', ({ scroll, limit, velocity, progress }: {
      scroll: number;
      limit: number;
      velocity: number;
      progress: number;
    }) => {
      setScrollProgress(progress);
      setScrollVelocity(velocity);
      setScrollY(scroll);

      // Update ScrollTrigger on each scroll event
      ScrollTrigger.update();
    });

    // Sync Lenis with GSAP's ticker for perfect frame alignment
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing for instant response
    gsap.ticker.lagSmoothing(0);

    setIsReady(true);

    // Cleanup
    return () => {
      // Remove controlled scroll handlers
      if (wheelHandler) {
        window.removeEventListener('wheel', wheelHandler);
      }
      if (touchStartHandler) {
        window.removeEventListener('touchstart', touchStartHandler);
      }
      if (touchEndHandler) {
        window.removeEventListener('touchend', touchEndHandler);
      }

      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Smooth scroll to target
  const scrollTo = useCallback((
    target: string | number | HTMLElement,
    options: ScrollToOptions = {}
  ) => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(target, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 0.8,
      easing: options.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      immediate: options.immediate ?? false,
      lock: options.lock ?? false,
      onComplete: options.onComplete,
    });
  }, []);

  // Stop scrolling (for modals)
  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  // Resume scrolling
  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollProgress,
        scrollVelocity,
        scrollY,
        scrollTo,
        stop,
        start,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
