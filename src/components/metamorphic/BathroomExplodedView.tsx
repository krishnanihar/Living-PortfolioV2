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

const Vignette = dynamic(
  () => import('@react-three/postprocessing').then((mod) => mod.Vignette),
  { ssr: false }
);

/**
 * DynamicVignette - Progress-aware vignette effect
 * Increases darkness during LIGHTS_FADE phase (2.5-2.8)
 */
function DynamicVignetteEffect({ progress }: { progress: number }) {
  // Calculate vignette values based on progress
  // Active during LIGHTS_FADE phase (2.5-2.8)
  const offset = 0.1 + Math.max(0, progress - 2.5) * 0.5;
  const darkness = progress > 2.5 ? Math.min((progress - 2.5) * 3, 0.9) : 0;

  return <Vignette offset={offset} darkness={darkness} />;
}

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

// Animation phase markers (progress ranges 0-3)
export enum AnimationPhase {
  EXPLODE = 'EXPLODE',           // 0.00-1.00: Components explode + 360° orbit
  IMPLODE = 'IMPLODE',           // 1.00-1.50: Components return + 180° orbit
  HOLD = 'HOLD',                 // 1.50-2.00: Hold assembled view
  ZOOM_ENTRY = 'ZOOM_ENTRY',     // 2.00-2.50: Camera dollies into bathroom
  LIGHTS_FADE = 'LIGHTS_FADE',   // 2.50-2.80: Lights fade to darkness
  VIDEO_PLAY = 'VIDEO_PLAY',     // 2.80-3.00: Video plays on mirror
}

// Get current animation phase from progress
function getAnimationPhase(progress: number): AnimationPhase {
  if (progress < 1.00) return AnimationPhase.EXPLODE;
  if (progress < 1.50) return AnimationPhase.IMPLODE;
  if (progress < 2.00) return AnimationPhase.HOLD;
  if (progress < 2.50) return AnimationPhase.ZOOM_ENTRY;
  if (progress < 2.80) return AnimationPhase.LIGHTS_FADE;
  return AnimationPhase.VIDEO_PLAY;
}

/**
 * BathroomExplodedView - Main exploded view component
 *
 * Uses scroll locking to capture scroll input when section is in viewport.
 * Scroll input controls explosion animation until sequence completes.
 */
export function BathroomExplodedView({ className }: BathroomExplodedViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
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

  // Cinematic overlay for seamless transition - fades to black then reveals video section
  const [overlayOpacity, setOverlayOpacity] = useState(0);

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

  // Update progress and sync ref - extended to 0-3 range
  const updateProgress = useCallback((newProgress: number) => {
    const clampedProgress = Math.max(0, Math.min(3, newProgress)); // Extended to 3
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

    // Smooth scroll to video section with onComplete callback
    // Overlay fades out only after scroll animation completes
    setTimeout(() => {
      scrollTo('#experience-film', {
        offset: 0,
        duration: 1.2, // Slightly faster for snappier feel
        onComplete: () => {
          // Fade out overlay after scroll completes - reveals video section
          setOverlayOpacity(0);
        },
      });
    }, 50); // Reduced delay - overlay masks the transition
  }, [start, scrollTo]);

  // Handle wheel events during lock - updates TARGET progress (damped)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isLockedRef.current || transitioningRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY;
    // Update TARGET progress, not actual progress (lerp loop will smooth it)
    // Extended to 0-3 range for full continuation sequence
    const newTarget = Math.max(0, Math.min(3, targetProgressRef.current + delta * WHEEL_SENSITIVITY));
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
    // Extended to 0-3 range for full continuation sequence
    const newTarget = Math.max(0, Math.min(3, targetProgressRef.current + deltaY * TOUCH_SENSITIVITY));
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

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;

        // Reset all state when container is above viewport (user scrolled back up past it)
        if (!entry.isIntersecting && rect.top > 0) {
          hasUnlockedRef.current = false;
          transitioningRef.current = false;
          setIsTransitioning(false);
          scrollProgressRef.current = 0;
          targetProgressRef.current = 0;
          setScrollProgress(0);
          setShowScrollHint(true);
          setOverlayOpacity(0); // Reset overlay
        }

        // Lock when sticky section is at top of viewport
        // The sticky section stays at top=0, so we lock when container top is at or above viewport top
        if (entry.isIntersecting && rect.top <= 0) {
          if (!hasUnlockedRef.current && scrollProgressRef.current < 3.0) {
            lockScroll();
          }
        }
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1.0],
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [lockScroll, prefersReducedMotion]);

  // Attach event listeners to container element
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

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

    // Add listeners to container with passive: false
    container.addEventListener('wheel', wheelHandler, { passive: false });
    container.addEventListener('touchstart', touchStartHandler, { passive: true });
    container.addEventListener('touchmove', touchMoveHandler, { passive: false });

    // Also need global handler when locked (to capture all wheel events)
    const globalWheelHandler = (e: WheelEvent) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
      handleWheel(e);
    };

    window.addEventListener('wheel', globalWheelHandler, { passive: false });

    return () => {
      container.removeEventListener('wheel', wheelHandler);
      container.removeEventListener('touchstart', touchStartHandler);
      container.removeEventListener('touchmove', touchMoveHandler);
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

        // Control overlay opacity during LIGHTS_FADE phase (2.5-2.95)
        // This creates a cinematic fade-to-black that masks the scroll transition
        if (newProgress >= 2.5 && newProgress < 2.95) {
          const fadeProgress = (newProgress - 2.5) / 0.45; // 0-1 over range
          setOverlayOpacity(fadeProgress);
        } else if (newProgress >= 2.95) {
          // Ensure overlay is fully opaque before transition
          setOverlayOpacity(1);
        }

        // Trigger transition at end of animation (progress 2.95)
        // Overlay is now fully opaque, so scroll will be invisible
        if (newProgress >= 2.95 && !transitioningRef.current) {
          transitioningRef.current = true;
          setIsTransitioning(true);
          // Unlock immediately - overlay masks the transition
          unlockScroll();
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

    const duration = 36000; // 36 seconds for full 0-3 sequence (12s per phase)
    const startProgress = scrollProgressRef.current;

    const animate = (timestamp: number) => {
      if (!playStartTimeRef.current) {
        playStartTimeRef.current = timestamp;
      }

      const elapsed = timestamp - playStartTimeRef.current;
      const progressDelta = elapsed / duration;
      // Extended to 0-3 range for full continuation sequence with video
      const newProgress = Math.min(startProgress + progressDelta * (3 - startProgress), 3);

      // Update both refs so they stay in sync
      scrollProgressRef.current = newProgress;
      targetProgressRef.current = newProgress;
      setScrollProgress(newProgress);

      if (newProgress < 3) {
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
      // If at 100% (full sequence complete), reset to start
      if (scrollProgressRef.current >= 3) {
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
    <div
      ref={containerRef}
      id="technical-system"
      className={className}
      style={{
        position: 'relative',
        height: '200vh', // Extra scroll height - sticky section stays while container scrolls
        zIndex: 10, // High z-index to ensure it stacks above next section
      }}
    >
      <section
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
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
                {/* Dynamic vignette - increases during LIGHTS_FADE phase */}
                <DynamicVignetteEffect progress={scrollProgress} />
              </EffectComposer>
            )}
          </Canvas>
        )}

        {/* Loading state */}
        {!isLoaded && <LoadingFallback />}

        {/* Scroll indicator */}
        <ScrollIndicator visible={isLoaded && showScrollHint && !isLocked} />

        {/* Lock indicator with phase info */}
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
              {Math.round((scrollProgress / 3) * 100)}% • {getAnimationPhase(scrollProgress).replace('_', ' ')}
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

      {/* Cinematic transition overlay - fades to black during LIGHTS_FADE, stays during scroll, fades out after */}
      {overlayOpacity > 0 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            opacity: overlayOpacity,
            pointerEvents: 'none',
            zIndex: 100, // Above everything including navigation
            transition: 'opacity 0.4s ease-out', // Smooth fade-out when set to 0
          }}
        />
      )}
    </div>
  );
}

export default BathroomExplodedView;
