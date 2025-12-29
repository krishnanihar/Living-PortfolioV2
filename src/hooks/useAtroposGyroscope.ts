'use client';

import { useEffect, useRef, useCallback, useState, RefObject } from 'react';

/**
 * Atropos Gyroscope Hook
 *
 * Enables gyroscope-based 3D tilt effect on Android mobile devices.
 * Applies transforms directly to the .atropos-rotate element.
 *
 * - Android: Works immediately (no permission needed)
 * - iOS: Skipped (requires user gesture for permission)
 * - Desktop: Disabled (Atropos handles mouse-based tilt)
 */

interface UseAtroposGyroscopeOptions {
  maxRotateX?: number;
  maxRotateY?: number;
  enabled?: boolean;
  sensitivity?: number;
  neutralBeta?: number;
  damping?: number;
}

interface UseAtroposGyroscopeReturn {
  isActive: boolean;
  isSupported: boolean;
}

// Detect iOS (requires permission, skip for simplicity)
const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  return typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function';
};

// Clamp value between min and max
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Linear interpolation for smooth damping
const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export function useAtroposGyroscope(
  rotateRef: RefObject<HTMLDivElement | null>,
  options: UseAtroposGyroscopeOptions = {}
): UseAtroposGyroscopeReturn {
  const {
    maxRotateX = 1,
    maxRotateY = 1,
    enabled = true,
    sensitivity = 30,
    neutralBeta = 45,
    damping = 0.1,
  } = options;

  const [isActive, setIsActive] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Current rotation values for damping
  const currentRotateX = useRef(0);
  const currentRotateY = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Handle device orientation event
  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;

      // Skip if no data
      if (beta === null || gamma === null) return;

      // Calculate target rotation values
      // beta: front-back tilt (-180 to 180), centered around neutralBeta
      // gamma: left-right tilt (-90 to 90)
      const targetRotateX = clamp((beta - neutralBeta) / sensitivity, -1, 1) * maxRotateX;
      const targetRotateY = clamp(gamma / sensitivity, -1, 1) * maxRotateY;

      // Apply damping for smooth motion
      currentRotateX.current = lerp(currentRotateX.current, targetRotateX, damping);
      currentRotateY.current = lerp(currentRotateY.current, targetRotateY, damping);

      // Apply transform to rotate element
      if (rotateRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          if (rotateRef.current) {
            rotateRef.current.style.transform =
              `perspective(1200px) rotateX(${currentRotateX.current}deg) rotateY(${currentRotateY.current}deg)`;
          }
        });
      }
    },
    [maxRotateX, maxRotateY, sensitivity, neutralBeta, damping, rotateRef]
  );

  useEffect(() => {
    // Skip if not enabled or not in browser
    if (!enabled || typeof window === 'undefined') return;

    // Skip iOS (requires permission flow)
    if (isIOS()) {
      setIsSupported(false);
      return;
    }

    // Check if device orientation is supported
    if (!('DeviceOrientationEvent' in window)) {
      setIsSupported(false);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    // Add will-change for performance
    if (rotateRef.current) {
      rotateRef.current.style.willChange = 'transform';
    }

    // Start listening to device orientation
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    setIsActive(true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      setIsActive(false);

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Reset transform
      if (rotateRef.current) {
        rotateRef.current.style.transform = '';
        rotateRef.current.style.willChange = '';
      }
    };
  }, [enabled, handleOrientation, rotateRef]);

  return { isActive, isSupported };
}
