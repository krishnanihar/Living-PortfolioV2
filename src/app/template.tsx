'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { PageTransition } from '@/components/transitions';
import { useSmoothScroll } from '@/components/effects/SmoothScrollProvider';

interface TemplateProps {
  children: ReactNode;
}

/**
 * App Router template - remounts on every navigation
 * Wraps all pages with glassmorphism fade+blur transitions
 */
export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const { lenis, scrollTo, stop, start } = useSmoothScroll();
  const isFirstRender = useRef(true);

  // Handle scroll reset on route change
  useEffect(() => {
    // Skip on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Pause Lenis during transition to prevent scroll during animation
    if (lenis) {
      stop();
    }

    // Reset scroll after exit animation (300ms) + small buffer
    const resetTimeout = setTimeout(() => {
      if (lenis) {
        scrollTo(0, { immediate: true });
        start();
      } else {
        window.scrollTo(0, 0);
      }
    }, 350);

    return () => {
      clearTimeout(resetTimeout);
      // Ensure Lenis is running on cleanup
      if (lenis) {
        start();
      }
    };
  }, [pathname, lenis, scrollTo, stop, start]);

  return <PageTransition>{children}</PageTransition>;
}
