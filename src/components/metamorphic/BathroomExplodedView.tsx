'use client';

import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause } from 'lucide-react';
import { useSmoothScroll } from '@/components/effects/SmoothScrollProvider';

// Dynamically import Canvas to avoid SSR issues
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

// Dynamically import drei components
const PerspectiveCamera = dynamic(
  () => import('@react-three/drei').then((mod) => mod.PerspectiveCamera),
  { ssr: false }
);

const Environment = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Environment),
  { ssr: false }
);

// Dynamically import postprocessing
const EffectComposer = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.EffectComposer),
  { ssr: false }
);

const Bloom = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Bloom),
  { ssr: false }
);

// Dynamically import scene
const BathroomSceneInner = dynamic(
  () => import('./bathroom-3d/BathroomScene').then((mod) => mod.BathroomScene),
  { ssr: false }
);

/**
 * LoadingFallback - Displayed while 3D scene loads
 */
function LoadingFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '2px solid var(--glass-10)',
            borderTopColor: 'rgba(var(--metamorphic-accent-rgb), 0.8)',
            borderRadius: '50%',
            animation: 'explodedViewSpin 1s linear infinite',
          }}
        />
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-50)',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          Loading 3D View...
        </span>
      </div>
    </div>
  );
}

/**
 * ScrollIndicator - Visual hint to scroll
 */
function ScrollIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'explodedViewFadeInUp 0.6s ease-out',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-40)',
          fontFamily: 'var(--font-space-grotesk)',
        }}
      >
        Scroll to Explore
      </span>
      <div
        style={{
          width: '24px',
          height: '40px',
          border: '2px solid var(--glass-20)',
          borderRadius: '12px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '8px',
            background: 'rgba(var(--metamorphic-accent-rgb), 0.6)',
            borderRadius: '2px',
            animation: 'explodedViewScrollBounce 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

/**
 * ProgressMarkers - Side progress indicator
 */
function ProgressMarkers({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const markers = ['Shell', 'Frame', 'Mirror', 'Sink', 'Tap', 'Electronics', 'Lights'];
  const progressPerMarker = 1 / markers.length;

  return (
    <div
      style={{
        position: 'absolute',
        left: isMobile ? '1rem' : '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {markers.map((label, i) => {
        const markerProgress = (i + 1) * progressPerMarker;
        const isActive = progress >= markerProgress - progressPerMarker;
        const isPast = progress >= markerProgress;

        return (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: isActive ? (isPast ? 1 : 0.7) : 0.3,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isPast
                  ? 'rgba(var(--metamorphic-accent-rgb), 1)'
                  : 'rgba(var(--metamorphic-accent-rgb), 0.4)',
                transition: 'background 0.3s ease',
              }}
            />
            <span
              style={{
                fontSize: '0.6875rem',
                color: isPast ? 'var(--text-70)' : 'var(--text-40)',
                fontFamily: 'var(--font-space-grotesk)',
                display: isMobile ? 'none' : 'block',
                transition: 'color 0.3s ease',
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface BathroomExplodedViewProps {
  className?: string;
}

// Scroll sensitivity constants
const WHEEL_SENSITIVITY = 0.0008;
const TOUCH_SENSITIVITY = 0.002;

/**
 * BathroomExplodedView - Main exploded view component
 *
 * Uses scroll locking to capture scroll input when section is in viewport.
 * Scroll input controls explosion animation until sequence completes.
 */
export function BathroomExplodedView({ className }: BathroomExplodedViewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const targetProgressRef = useRef(0); // Target progress for damped animation
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Scroll lock state
  const [isLocked, setIsLocked] = useState(false);
  const isLockedRef = useRef(false);
  const touchStartY = useRef(0);
  const hasUnlockedRef = useRef(false);
  const hasUserScrolled = useRef(false); // Track if user has scrolled at all

  // Transition state for smooth fade to next section
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitioningRef = useRef(false);

  // Lerp animation loop ref
  const lerpAnimationRef = useRef<number | null>(null);

  // Auto-play state
  const [isPlaying, setIsPlaying] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const playStartTimeRef = useRef<number | null>(null);

  // Get Lenis instance for scroll control
  const { lenis, stop, start, scrollTo } = useSmoothScroll();

  // Only render Canvas on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for reduced motion preference and mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Track when user first scrolls (to prevent locking on page load)
    const handleFirstScroll = () => {
      hasUserScrolled.current = true;
      window.removeEventListener('scroll', handleFirstScroll);
    };
    // Small delay before adding listener to avoid false triggers on load
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleFirstScroll, { passive: true });
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleFirstScroll);
      clearTimeout(timer);
    };
  }, []);

  // Update progress and sync ref
  const updateProgress = useCallback((newProgress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, newProgress));
    scrollProgressRef.current = clampedProgress;
    setScrollProgress(clampedProgress);

    // Hide scroll hint after scrolling starts
    if (clampedProgress > 0.02) {
      setShowScrollHint(false);
    }
  }, []);

  // Lock scroll when section enters viewport
  const lockScroll = useCallback(() => {
    // Don't lock if already locked, reduced motion, or user hasn't scrolled yet
    if (isLockedRef.current || prefersReducedMotion || !hasUserScrolled.current) return;

    // Safety check: don't lock if Lenis isn't ready
    if (!lenis) return;

    isLockedRef.current = true;
    setIsLocked(true);
    stop();

    // Add overflow hidden to prevent any scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }, [stop, prefersReducedMotion, lenis]);

  // Unlock scroll and continue to next section
  const unlockScroll = useCallback(() => {
    if (!isLockedRef.current) return;

    isLockedRef.current = false;
    setIsLocked(false);
    hasUnlockedRef.current = true;
    start();

    // Remove overflow hidden
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // Smooth scroll to next section with longer duration
    setTimeout(() => {
      scrollTo('#process-gallery', { offset: 0, duration: 1.5 }); // Longer duration for smoother transition
    }, 100);
  }, [start, scrollTo]);

  // Handle wheel events during lock - updates TARGET progress (damped)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isLockedRef.current || transitioningRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY;
    // Update TARGET progress, not actual progress (lerp loop will smooth it)
    const newTarget = Math.max(0, Math.min(1, targetProgressRef.current + delta * WHEEL_SENSITIVITY));
    targetProgressRef.current = newTarget;

    // Hide scroll hint when scrolling starts
    if (newTarget > 0.02) {
      setShowScrollHint(false);
    }

    // Allow scrolling back up if at start
    if (newTarget <= 0 && delta < 0) {
      // User is scrolling up at the beginning - unlock and scroll up
      targetProgressRef.current = 0;
      scrollProgressRef.current = 0;
      setScrollProgress(0);
      isLockedRef.current = false;
      setIsLocked(false);
      start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [start]);

  // Handle touch events during lock
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  // Handle touch move during lock - updates TARGET progress (damped)
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isLockedRef.current || transitioningRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    touchStartY.current = currentY;

    // Update TARGET progress, not actual progress (lerp loop will smooth it)
    const newTarget = Math.max(0, Math.min(1, targetProgressRef.current + deltaY * TOUCH_SENSITIVITY));
    targetProgressRef.current = newTarget;

    // Hide scroll hint when scrolling starts
    if (newTarget > 0.02) {
      setShowScrollHint(false);
    }

    // Allow scrolling back up if at start
    if (newTarget <= 0 && deltaY < 0) {
      targetProgressRef.current = 0;
      scrollProgressRef.current = 0;
      setScrollProgress(0);
      isLockedRef.current = false;
      setIsLocked(false);
      start();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [start]);

  // Setup IntersectionObserver to detect when section enters viewport
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;

        // Reset all state when section is above viewport (user scrolled back up past it)
        if (!entry.isIntersecting && rect.top > 0) {
          hasUnlockedRef.current = false;
          transitioningRef.current = false;
          setIsTransitioning(false);
          scrollProgressRef.current = 0;
          targetProgressRef.current = 0;
          setScrollProgress(0);
          setShowScrollHint(true);
        }

        // Lock when section top reaches viewport top (or is above it)
        if (entry.isIntersecting && rect.top <= 0 && rect.bottom > window.innerHeight * 0.5) {
          if (!hasUnlockedRef.current && scrollProgressRef.current < 1.0) {
            lockScroll();
          }
        }
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1.0],
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [lockScroll, prefersReducedMotion]);

  // Attach event listeners to section element only
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    // Create wrapper handlers that only work when section is in view
    const wheelHandler = (e: WheelEvent) => {
      // Only handle if we're locked
      if (!isLockedRef.current) return;
      handleWheel(e);
    };

    const touchStartHandler = (e: TouchEvent) => {
      handleTouchStart(e);
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      handleTouchMove(e);
    };

    // Add listeners to section with passive: false
    section.addEventListener('wheel', wheelHandler, { passive: false });
    section.addEventListener('touchstart', touchStartHandler, { passive: true });
    section.addEventListener('touchmove', touchMoveHandler, { passive: false });

    // Also need global handler when locked (to capture all wheel events)
    const globalWheelHandler = (e: WheelEvent) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
      handleWheel(e);
    };

    window.addEventListener('wheel', globalWheelHandler, { passive: false });

    return () => {
      section.removeEventListener('wheel', wheelHandler);
      section.removeEventListener('touchstart', touchStartHandler);
      section.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('wheel', globalWheelHandler);

      // Cleanup: ensure scroll is unlocked
      if (isLockedRef.current) {
        start();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, start, prefersReducedMotion]);

  // Lerp animation loop - smoothly interpolates actual progress toward target
  // This creates the "damped" feel where fast scrolling queues up but plays smoothly
  useEffect(() => {
    if (!isLocked && !isPlaying) {
      // Cleanup when not locked
      if (lerpAnimationRef.current) {
        cancelAnimationFrame(lerpAnimationRef.current);
        lerpAnimationRef.current = null;
      }
      return;
    }

    // Don't run lerp during auto-play (it handles its own animation)
    if (isPlaying) return;

    const LERP_FACTOR = 0.04; // Lower = slower/smoother (0.04 means ~25 frames to catch up)
    const THRESHOLD = 0.001; // Stop lerping when close enough

    const animate = () => {
      const current = scrollProgressRef.current;
      const target = targetProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > THRESHOLD) {
        // Lerp toward target
        const newProgress = current + diff * LERP_FACTOR;
        scrollProgressRef.current = newProgress;
        setScrollProgress(newProgress);

        // Check if we've reached the end (trigger transition)
        if (newProgress >= 0.98 && !transitioningRef.current) {
          transitioningRef.current = true;
          setIsTransitioning(true);

          // Fade out, then unlock and scroll to next section
          setTimeout(() => {
            unlockScroll();
          }, 800); // 800ms fade duration
        }
      }

      lerpAnimationRef.current = requestAnimationFrame(animate);
    };

    lerpAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (lerpAnimationRef.current) {
        cancelAnimationFrame(lerpAnimationRef.current);
        lerpAnimationRef.current = null;
      }
    };
  }, [isLocked, isPlaying, unlockScroll]);

  // Mark as loaded after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play animation - directly updates progress (bypasses damping for smooth timed animation)
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      playStartTimeRef.current = null;
      return;
    }

    const duration = 12000; // 12 seconds for full animation - more dramatic
    const startProgress = scrollProgressRef.current;

    const animate = (timestamp: number) => {
      if (!playStartTimeRef.current) {
        playStartTimeRef.current = timestamp;
      }

      const elapsed = timestamp - playStartTimeRef.current;
      const progressDelta = elapsed / duration;
      const newProgress = Math.min(startProgress + progressDelta * (1 - startProgress), 1);

      // Update both refs so they stay in sync
      scrollProgressRef.current = newProgress;
      targetProgressRef.current = newProgress;
      setScrollProgress(newProgress);

      if (newProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        playStartTimeRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Toggle play/pause
  const handlePlayToggle = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If at 100%, reset to start
      if (scrollProgressRef.current >= 1) {
        scrollProgressRef.current = 0;
        targetProgressRef.current = 0;
        transitioningRef.current = false;
        setIsTransitioning(false);
        setScrollProgress(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <section
      ref={sectionRef}
      id="technical-system"
      className={className}
      style={{
        position: 'relative',
        zIndex: 2, // Stack above next section to prevent bleed
        width: '100%',
        height: '100vh', // Single viewport height - scroll locked
        minHeight: '100vh', // Ensure full coverage
        overflow: 'hidden', // Prevent next section from bleeding in
        background: `linear-gradient(180deg,
          var(--bg-primary) 0%,
          var(--metamorphic-bg-primary) 30%,
          var(--metamorphic-bg-primary) 70%,
          var(--bg-primary) 100%)`,
      }}
    >
      {/* Full viewport container for 3D scene */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Section header */}
        <div
          style={{
            position: 'absolute',
            top: isMobile ? '1.5rem' : '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(var(--metamorphic-accent-rgb), 0.8)',
            }}
          >
            Technical Architecture
          </span>
          <h2
            style={{
              fontSize: isMobile
                ? 'clamp(1.5rem, 5vw, 2rem)'
                : 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'var(--text-95)',
              marginTop: '0.5rem',
            }}
          >
            Exploded View
          </h2>
        </div>

        {/* Progress markers */}
        <ProgressMarkers progress={scrollProgress} isMobile={isMobile} />

        {/* 3D Canvas - only render on client */}
        {isMounted && (
          <Canvas
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            style={{
              width: '100%',
              height: '100%',
              opacity: isLoaded ? 1 : 0, // Only fade in on load, don't hide on transition
              transition: 'opacity 0.5s ease-out',
            }}
          >
            {/* Camera */}
            <PerspectiveCamera
              makeDefault
              position={[8, 3, 8]}
              fov={50}
              near={0.1}
              far={100}
            />

            {/* Environment for reflections */}
            <Environment preset="night" />

            {/* Scene with scroll progress passed as prop */}
            <Suspense fallback={null}>
              <BathroomSceneInner scrollProgress={scrollProgressRef} />
            </Suspense>

            {/* Post-processing effects */}
            {!prefersReducedMotion && !isMobile && (
              <EffectComposer>
                <Bloom
                  intensity={0.4}
                  luminanceThreshold={0.3}
                  luminanceSmoothing={0.9}
                  mipmapBlur
                  radius={0.6}
                />
              </EffectComposer>
            )}
          </Canvas>
        )}

        {/* Loading state */}
        {!isLoaded && <LoadingFallback />}

        {/* Scroll indicator */}
        <ScrollIndicator visible={isLoaded && showScrollHint && !isLocked} />

        {/* Lock indicator */}
        {isLocked && (
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '0.5rem 1rem',
              background: 'var(--glass-08)',
              border: '1px solid var(--glass-15)',
              borderRadius: '100px',
              backdropFilter: 'blur(8px)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-60)',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {Math.round(scrollProgress * 100)}% • Scroll to explore
            </span>
          </div>
        )}

        {/* Play/Pause button */}
        {isLoaded && !isLocked && (
          <button
            onClick={handlePlayToggle}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            style={{
              position: 'absolute',
              bottom: '2rem',
              right: isMobile ? '1rem' : '2rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid var(--glass-20)',
              background: 'var(--glass-08)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'all 0.3s ease',
              color: isPlaying ? 'rgba(var(--metamorphic-accent-rgb), 1)' : 'var(--text-60)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-15)';
              e.currentTarget.style.borderColor = 'rgba(var(--metamorphic-accent-rgb), 0.5)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-08)';
              e.currentTarget.style.borderColor = 'var(--glass-20)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isPlaying ? (
              <Pause size={20} strokeWidth={2} />
            ) : (
              <Play size={20} strokeWidth={2} style={{ marginLeft: '2px' }} />
            )}
          </button>
        )}

        {/* Tech stack tags */}
        <div
          style={{
            position: 'absolute',
            bottom: '5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            zIndex: 10,
            opacity: scrollProgress > 0.8 ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          {[
            'TouchDesigner',
            'Arduino Uno',
            'Rotary Encoder',
            'Relay Module',
            'Deforum Stable Diffusion',
          ].map((tech) => (
            <span
              key={tech}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: 400,
                color: 'var(--text-60)',
                background: 'var(--glass-05)',
                border: '1px solid var(--glass-10)',
                borderRadius: '100px',
                backdropFilter: 'blur(8px)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Safety buffer to prevent section bleed at bottom - extended for smoother blend */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px', // Increased for smoother visual blend
          background: 'linear-gradient(180deg, transparent 0%, var(--bg-primary) 80%, var(--bg-primary) 100%)',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}

export default BathroomExplodedView;
