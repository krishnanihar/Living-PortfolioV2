import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll progress from 0 to 1
 * Optimized for smooth 60fps performance
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          const newProgress = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
          setProgress(newProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return progress;
}
