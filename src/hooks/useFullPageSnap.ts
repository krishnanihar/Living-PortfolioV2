'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useMotionValue, animate } from 'framer-motion';

// Configuration
const TOTAL_VERTICAL_SECTIONS = 6; // Hero, Philosophy, Impact, HorizontalProjects, About, Contact
const TOTAL_HORIZONTAL_SLIDES = 4; // Air India, PsoriAssist, Metamorphic, Latent Space
const HORIZONTAL_ZONE_INDEX = 3; // Index of horizontal section (Projects is section 3)

// Spring config for smooth, premium animations
const springConfig = {
  type: 'spring' as const,
  stiffness: 180,   // Balanced (was 260 - too fast)
  damping: 28,      // More controlled deceleration (was 20)
  restDelta: 0.5,
  mass: 0.8,        // Standard weight for natural feel (was 0.6)
};

// Cooldown period after animation to prevent momentum-triggered scrolls (ms)
const SCROLL_COOLDOWN = 600;

export interface FullPageSnapState {
  mode: 'vertical' | 'horizontal';
  verticalIndex: number;
  horizontalIndex: number;
  isAnimating: boolean;
  verticalY: ReturnType<typeof useMotionValue<number>>;
  horizontalX: ReturnType<typeof useMotionValue<number>>;
  navigate: (direction: 1 | -1) => void;
  goToSection: (index: number) => void;
  goToSlide: (index: number) => void;
}

export function useFullPageSnap(): FullPageSnapState {
  // State
  const [mode, setMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [verticalIndex, setVerticalIndex] = useState(0);
  const [horizontalIndex, setHorizontalIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Motion values for smooth animations
  const verticalY = useMotionValue(0);
  const horizontalX = useMotionValue(0);

  // Track if mounted
  const isMounted = useRef(false);

  // Ref-based lock for synchronous animation blocking (prevents double-scrolling)
  const animationLockRef = useRef(false);

  // Cooldown timer ref - prevents momentum scroll from triggering after animation
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate ref for stable wheel listener (avoids dependency trap)
  const navigateRef = useRef<(direction: 1 | -1) => void>(() => {});

  // Initialize viewport dimensions
  useEffect(() => {
    isMounted.current = true;
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', handleResize);
      // Clean up cooldown timer on unmount
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  // Helper to start cooldown after animation
  const startCooldown = useCallback(() => {
    // Clear any existing cooldown
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }
    // Start new cooldown - lock stays active during this period
    cooldownTimerRef.current = setTimeout(() => {
      animationLockRef.current = false;
      cooldownTimerRef.current = null;
    }, SCROLL_COOLDOWN);
  }, []);

  // Handle vertical navigation
  const handleVerticalNav = useCallback((direction: number) => {
    if (isAnimating || viewportHeight === 0) {
      // Release lock if we can't navigate
      animationLockRef.current = false;
      return;
    }

    const newIndex = verticalIndex + direction;

    // Check if entering horizontal zone (at Impact section, scrolling toward Projects)
    // Impact is at index 2, Projects/Horizontal is at index 3
    if (verticalIndex === HORIZONTAL_ZONE_INDEX - 1 && direction === 1) {
      // Switch to horizontal mode and snap to Projects section
      setIsAnimating(true);
      setMode('horizontal');
      setHorizontalIndex(0);
      horizontalX.set(0);

      // Snap to horizontal zone position
      animate(verticalY, -HORIZONTAL_ZONE_INDEX * viewportHeight, {
        ...springConfig,
        onComplete: () => {
          if (isMounted.current) {
            setIsAnimating(false);
            startCooldown(); // Start cooldown instead of immediate unlock
          }
        },
      });
      return;
    }

    // Skip horizontal section when navigating vertically (if we're past it)
    let targetIndex = newIndex;

    // If going down from index 3 (horizontal section) in vertical mode, skip to 4
    if (verticalIndex === HORIZONTAL_ZONE_INDEX && direction === 1) {
      targetIndex = HORIZONTAL_ZONE_INDEX + 1;
    }
    // If going up to index 3 from below, skip to 2 (Impact)
    if (newIndex === HORIZONTAL_ZONE_INDEX && verticalIndex > HORIZONTAL_ZONE_INDEX && direction === -1) {
      targetIndex = HORIZONTAL_ZONE_INDEX - 1;
    }

    // Normal vertical navigation
    if (targetIndex >= 0 && targetIndex < TOTAL_VERTICAL_SECTIONS) {
      setIsAnimating(true);
      setVerticalIndex(targetIndex);

      animate(verticalY, -targetIndex * viewportHeight, {
        ...springConfig,
        onComplete: () => {
          if (isMounted.current) {
            setIsAnimating(false);
            startCooldown(); // Start cooldown instead of immediate unlock
          }
        },
      });
    } else {
      // No animation started, release lock
      animationLockRef.current = false;
    }
  }, [isAnimating, verticalIndex, viewportHeight, verticalY, horizontalX, startCooldown]);

  // Handle horizontal navigation
  const handleHorizontalNav = useCallback((direction: number) => {
    if (isAnimating || viewportWidth === 0) {
      // Release lock if we can't navigate
      animationLockRef.current = false;
      return;
    }

    const newIndex = horizontalIndex + direction;

    // Check if exiting horizontal zone backward
    if (newIndex < 0) {
      // Exit backward → go to Impact section (index 2)
      setIsAnimating(true);
      setMode('vertical');
      const prevVerticalIndex = HORIZONTAL_ZONE_INDEX - 1; // Impact = index 2
      setVerticalIndex(prevVerticalIndex);

      animate(verticalY, -prevVerticalIndex * viewportHeight, {
        ...springConfig,
        onComplete: () => {
          if (isMounted.current) {
            setIsAnimating(false);
            startCooldown(); // Start cooldown instead of immediate unlock
          }
        },
      });
      return;
    }

    // Check if exiting horizontal zone forward
    if (newIndex >= TOTAL_HORIZONTAL_SLIDES) {
      // Exit forward → go to About section (next vertical section)
      setIsAnimating(true);
      setMode('vertical');
      const nextVerticalIndex = HORIZONTAL_ZONE_INDEX + 1;
      setVerticalIndex(nextVerticalIndex);

      animate(verticalY, -nextVerticalIndex * viewportHeight, {
        ...springConfig,
        onComplete: () => {
          if (isMounted.current) {
            setIsAnimating(false);
            startCooldown(); // Start cooldown instead of immediate unlock
          }
        },
      });
      return;
    }

    // Normal horizontal navigation
    setIsAnimating(true);
    setHorizontalIndex(newIndex);

    animate(horizontalX, -newIndex * viewportWidth, {
      ...springConfig,
      onComplete: () => {
        if (isMounted.current) {
          setIsAnimating(false);
          startCooldown(); // Start cooldown instead of immediate unlock
        }
      },
    });
  }, [isAnimating, horizontalIndex, viewportWidth, viewportHeight, horizontalX, verticalY, startCooldown]);

  // Main navigate function
  const navigate = useCallback((direction: 1 | -1) => {
    // Note: Lock should already be set by caller (wheel/touch handler)
    // This check is a fallback for safety
    if (isAnimating) {
      animationLockRef.current = false;
      return;
    }

    if (mode === 'vertical') {
      handleVerticalNav(direction);
    } else {
      handleHorizontalNav(direction);
    }
  }, [mode, isAnimating, handleVerticalNav, handleHorizontalNav]);

  // Keep navigateRef in sync with navigate (for stable wheel listener)
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  // Direct navigation to section
  const goToSection = useCallback((index: number) => {
    if (animationLockRef.current || isAnimating || index < 0 || index >= TOTAL_VERTICAL_SECTIONS) return;

    // Set lock for direct navigation
    animationLockRef.current = true;
    setIsAnimating(true);
    setMode('vertical');
    setVerticalIndex(index);

    animate(verticalY, -index * viewportHeight, {
      ...springConfig,
      onComplete: () => {
        if (isMounted.current) {
          setIsAnimating(false);
          startCooldown(); // Start cooldown instead of immediate unlock
        }
      },
    });
  }, [isAnimating, viewportHeight, verticalY, startCooldown]);

  // Direct navigation to slide (within horizontal mode)
  const goToSlide = useCallback((index: number) => {
    if (animationLockRef.current || isAnimating || index < 0 || index >= TOTAL_HORIZONTAL_SLIDES) return;

    animationLockRef.current = true;
    setIsAnimating(true);
    setHorizontalIndex(index);

    animate(horizontalX, -index * viewportWidth, {
      ...springConfig,
      onComplete: () => {
        if (isMounted.current) {
          setIsAnimating(false);
          startCooldown(); // Start cooldown instead of immediate unlock
        }
      },
    });
  }, [isAnimating, viewportWidth, horizontalX, startCooldown]);

  // Wheel event handler - STABLE: uses ref to avoid dependency trap
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check ONLY the ref lock (synchronous, no state dependency)
      if (animationLockRef.current) return;

      // Set lock IMMEDIATELY before anything else
      animationLockRef.current = true;

      // Prevent default to stop page scroll
      e.preventDefault();

      // Determine direction from vertical scroll
      const direction = e.deltaY > 0 ? 1 : -1;

      // Call navigate via ref (always current, no re-registration)
      navigateRef.current(direction as 1 | -1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []); // ← EMPTY DEPENDENCIES - listener registered ONCE, never re-registered

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    const SWIPE_THRESHOLD = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Check both lock and state
      if (animationLockRef.current || isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;

      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      // Determine if swipe was more vertical or horizontal
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        // Vertical swipe
        if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
          animationLockRef.current = true;  // Set lock before navigate
          const direction = deltaY > 0 ? 1 : -1;
          navigate(direction as 1 | -1);
        }
      } else {
        // Horizontal swipe (only in horizontal mode)
        if (mode === 'horizontal' && Math.abs(deltaX) > SWIPE_THRESHOLD) {
          animationLockRef.current = true;  // Set lock before navigate
          const direction = deltaX > 0 ? 1 : -1;
          navigate(direction as 1 | -1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating, navigate, mode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check both lock and state
      if (animationLockRef.current || isAnimating) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
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
        case 'ArrowRight':
          if (mode === 'horizontal') {
            e.preventDefault();
            animationLockRef.current = true;
            navigate(1);
          }
          break;
        case 'ArrowLeft':
          if (mode === 'horizontal') {
            e.preventDefault();
            animationLockRef.current = true;
            navigate(-1);
          }
          break;
        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;
        case 'End':
          e.preventDefault();
          goToSection(TOTAL_VERTICAL_SECTIONS - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating, navigate, mode, goToSection]);

  return {
    mode,
    verticalIndex,
    horizontalIndex,
    isAnimating,
    verticalY,
    horizontalX,
    navigate,
    goToSection,
    goToSlide,
  };
}
