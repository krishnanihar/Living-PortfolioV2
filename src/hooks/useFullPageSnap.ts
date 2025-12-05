'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useMotionValue, animate } from 'framer-motion';

// Configuration - 7 sections: Hero, Air India, PsoriAssist, Metamorphic, Latent Space, Explore All, About Me
const TOTAL_SECTIONS = 7;

// Spring config for smooth, snappy animations
const springConfig = {
  type: 'spring' as const,
  stiffness: 400,   // Higher = faster response
  damping: 35,      // Prevents oscillation
  restDelta: 0.01,  // Tighter finish
  mass: 0.5,        // Lighter = quicker
};

// Cooldown period after animation to prevent momentum-triggered scrolls (ms)
const SCROLL_COOLDOWN = 400; // Reduced for snappier feel

export interface FullPageSnapState {
  currentIndex: number;
  isAnimating: boolean;
  verticalY: ReturnType<typeof useMotionValue<number>>;
  navigate: (direction: 1 | -1) => void;
  goToSection: (index: number) => void;
  viewportHeight: number;
  totalSections: number;
}

export function useFullPageSnap(): FullPageSnapState {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Motion value for smooth animations
  const verticalY = useMotionValue(0);

  // Track if mounted
  const isMounted = useRef(false);

  // Ref-based lock for synchronous animation blocking (prevents double-scrolling)
  const animationLockRef = useRef(false);

  // Cooldown timer ref - prevents momentum scroll from triggering after animation
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate ref for stable wheel listener (avoids dependency trap)
  const navigateRef = useRef<(direction: 1 | -1) => void>(() => {});

  // Check reduced motion preference
  const prefersReducedMotion = useRef(false);

  // Initialize viewport dimensions
  useEffect(() => {
    isMounted.current = true;
    setViewportHeight(window.innerHeight);
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      // Re-snap to current section on resize
      if (isMounted.current) {
        verticalY.set(-currentIndex * window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', handleResize);
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, [currentIndex, verticalY]);

  // Helper to start cooldown after animation
  const startCooldown = useCallback(() => {
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }
    cooldownTimerRef.current = setTimeout(() => {
      animationLockRef.current = false;
      cooldownTimerRef.current = null;
    }, SCROLL_COOLDOWN);
  }, []);

  // Navigate to adjacent section
  const navigate = useCallback((direction: 1 | -1) => {
    if (isAnimating || viewportHeight === 0) {
      animationLockRef.current = false;
      return;
    }

    const newIndex = currentIndex + direction;

    // Boundary check
    if (newIndex < 0 || newIndex >= TOTAL_SECTIONS) {
      animationLockRef.current = false;
      return;
    }

    setIsAnimating(true);
    setCurrentIndex(newIndex);

    const targetY = -newIndex * viewportHeight;

    if (prefersReducedMotion.current) {
      // Instant transition for reduced motion
      verticalY.set(targetY);
      setIsAnimating(false);
      startCooldown();
    } else {
      // Spring animation
      animate(verticalY, targetY, {
        ...springConfig,
        onComplete: () => {
          if (isMounted.current) {
            setIsAnimating(false);
            startCooldown();
          }
        },
      });
    }
  }, [isAnimating, currentIndex, viewportHeight, verticalY, startCooldown]);

  // Keep navigateRef in sync with navigate
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  // Direct navigation to section
  const goToSection = useCallback((index: number) => {
    if (animationLockRef.current || isAnimating || index < 0 || index >= TOTAL_SECTIONS) return;
    if (index === currentIndex) return;

    animationLockRef.current = true;
    setIsAnimating(true);
    setCurrentIndex(index);

    const targetY = -index * viewportHeight;

    if (prefersReducedMotion.current) {
      verticalY.set(targetY);
      setIsAnimating(false);
      startCooldown();
    } else {
      animate(verticalY, targetY, {
        ...springConfig,
        onComplete: () => {
          if (isMounted.current) {
            setIsAnimating(false);
            startCooldown();
          }
        },
      });
    }
  }, [isAnimating, currentIndex, viewportHeight, verticalY, startCooldown]);

  // Wheel event handler - STABLE: uses ref to avoid dependency trap
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (animationLockRef.current) return;

      animationLockRef.current = true;
      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;
      navigateRef.current(direction as 1 | -1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (animationLockRef.current || isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        animationLockRef.current = true;
        const direction = deltaY > 0 ? 1 : -1;
        navigate(direction as 1 | -1);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animationLockRef.current || isAnimating) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          animationLockRef.current = true;
          navigate(1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          animationLockRef.current = true;
          navigate(-1);
          break;
        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;
        case 'End':
          e.preventDefault();
          goToSection(TOTAL_SECTIONS - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating, navigate, goToSection]);

  return {
    currentIndex,
    isAnimating,
    verticalY,
    navigate,
    goToSection,
    viewportHeight,
    totalSections: TOTAL_SECTIONS,
  };
}
