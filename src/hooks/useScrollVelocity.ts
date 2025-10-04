'use client';

import { useEffect, useState, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const rafId = useRef<number>();

  useEffect(() => {
    let ticking = false;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();

      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTimestamp - lastTimestamp.current;

      // Calculate velocity (pixels per millisecond)
      const newVelocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;

      // Smooth the velocity with exponential decay
      setVelocity((prev) => prev * 0.8 + newVelocity * 0.2);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = window.requestAnimationFrame(updateVelocity);
        ticking = true;
      }
    };

    // Decay velocity when not scrolling
    const decayInterval = setInterval(() => {
      setVelocity((prev) => prev * 0.9);
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decayInterval);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return velocity;
}
