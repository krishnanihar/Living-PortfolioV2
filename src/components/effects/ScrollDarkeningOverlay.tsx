'use client';

import React, { useState, useEffect, useRef } from 'react';

export function ScrollDarkeningOverlay() {
  const [darkeningOpacity, setDarkeningOpacity] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll-based darkening effect
  useEffect(() => {
    const updateDarkening = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Hero section is 100vh
      const heroHeight = windowHeight;

      // Start darkening at 80% through hero section
      const darkeningStart = heroHeight * 0.8;

      // Full darkness by 200vh (hero + one more section)
      const darkeningEnd = windowHeight * 2;

      if (scrollY < darkeningStart) {
        // Still in hero section, no darkening
        setDarkeningOpacity(0);
      } else if (scrollY < darkeningEnd) {
        // Progressive darkening from 0 to 0.85
        const progress = (scrollY - darkeningStart) / (darkeningEnd - darkeningStart);
        // Smooth ease-out curve for natural feel
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDarkeningOpacity(easedProgress * 0.85);
      } else {
        // Maximum darkness after 200vh
        setDarkeningOpacity(0.85);
      }
    };

    const handleScroll = () => {
      if (prefersReducedMotion) {
        // Immediate update for reduced motion
        updateDarkening();
      } else {
        // Request animation frame for smooth 60fps updates
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(updateDarkening);
      }
    };

    // Initial check
    updateDarkening();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0.5,
        transition: prefersReducedMotion ? 'none' : 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: darkeningOpacity,
        background: `radial-gradient(
          ellipse 120% 100% at 50% 0%,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.4) 40%,
          rgba(0, 0, 0, 0.9) 100%
        )`,
      }}
    />
  );
}
