'use client';

import { useRef, MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExplodeConfig {
  /** Direction to explode in (normalized) */
  direction: THREE.Vector3;
  /** Maximum distance to travel */
  distance: number;
  /** Scroll progress range start (0-1) - when explosion begins */
  startAt?: number;
  /** Scroll progress range end (0-1) - when explosion completes */
  endAt?: number;
  /** Easing function */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'smoothstep';
  /** Rotation during explosion (radians) */
  rotation?: THREE.Euler;
  /** Scroll progress when implode begins (1.0-2.0) - component returns to base */
  implodeStartAt?: number;
  /** Scroll progress when implode completes (1.0-2.0) */
  implodeEndAt?: number;
}

interface UseExplodeAnimationReturn {
  /** Ref to attach to the group */
  groupRef: MutableRefObject<THREE.Group | null>;
  /** Current explosion progress (0-1) */
  progress: MutableRefObject<number>;
  /** Whether the component is currently exploding */
  isExploding: MutableRefObject<boolean>;
}

/**
 * Easing functions
 */
const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  smoothstep: (t: number) => t * t * (3 - 2 * t),
};

/**
 * useExplodeAnimation - Hook for scroll-driven explosion animation
 *
 * @param scrollProgress - MutableRefObject containing current scroll progress (0-1)
 * @param config - Explosion configuration
 * @returns Object containing groupRef to attach and progress state
 */
export function useExplodeAnimation(
  scrollProgress: MutableRefObject<number>,
  config: ExplodeConfig
): UseExplodeAnimationReturn {
  const {
    direction,
    distance,
    startAt = 0,
    endAt = 1,
    easing = 'smoothstep',
    rotation,
    implodeStartAt,
    implodeEndAt,
  } = config;

  const groupRef = useRef<THREE.Group | null>(null);
  const progress = useRef(0);
  const isExploding = useRef(false);
  const basePosition = useRef<THREE.Vector3 | null>(null);
  const baseRotation = useRef<THREE.Euler | null>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Store initial position/rotation on first frame
    if (basePosition.current === null) {
      basePosition.current = groupRef.current.position.clone();
      baseRotation.current = groupRef.current.rotation.clone();
    }

    const scrollT = scrollProgress.current;
    const easingFn = easingFunctions[easing];
    let finalProgress = 0;

    // Phase 1: EXPLODE (0 → 1 progress range)
    if (scrollT <= 1) {
      // Calculate progress within explode range
      const rangeT = Math.max(0, Math.min(1, (scrollT - startAt) / (endAt - startAt)));
      finalProgress = easingFn(rangeT);
      isExploding.current = finalProgress > 0 && finalProgress < 1;
    }
    // Phase 2: HOLD (1.0 → implodeStartAt) - Stay fully exploded
    else if (implodeStartAt && scrollT < implodeStartAt) {
      finalProgress = 1; // Hold at fully exploded
      isExploding.current = false;
    }
    // Phase 3: IMPLODE (implodeStartAt → implodeEndAt) - Return to base
    else if (implodeStartAt && implodeEndAt && scrollT >= implodeStartAt) {
      // Calculate reverse progress (1 → 0)
      const implodeRangeT = Math.max(0, Math.min(1,
        (scrollT - implodeStartAt) / (implodeEndAt - implodeStartAt)
      ));
      // Reverse: starts at 1, ends at 0
      const reversedT = 1 - easingFn(implodeRangeT);
      finalProgress = reversedT;
      isExploding.current = reversedT > 0 && reversedT < 1;
    }
    // No implode configured, stay exploded
    else {
      finalProgress = 1;
      isExploding.current = false;
    }

    progress.current = finalProgress;

    // Calculate new position
    const offset = direction.clone().multiplyScalar(finalProgress * distance);
    groupRef.current.position.copy(basePosition.current.clone().add(offset));

    // Apply rotation if specified
    if (rotation && baseRotation.current) {
      groupRef.current.rotation.set(
        baseRotation.current.x + rotation.x * finalProgress,
        baseRotation.current.y + rotation.y * finalProgress,
        baseRotation.current.z + rotation.z * finalProgress
      );
    }
  });

  return { groupRef, progress, isExploding };
}

/**
 * Predefined explosion directions
 */
export const ExplodeDirections = {
  forward: new THREE.Vector3(0, 0, 1),
  backward: new THREE.Vector3(0, 0, -1),
  up: new THREE.Vector3(0, 1, 0),
  down: new THREE.Vector3(0, -1, 0),
  left: new THREE.Vector3(-1, 0, 0),
  right: new THREE.Vector3(1, 0, 0),
  forwardUp: new THREE.Vector3(0, 0.5, 1).normalize(),
  forwardDown: new THREE.Vector3(0, -0.5, 1).normalize(),
  backwardUp: new THREE.Vector3(0, 0.5, -1).normalize(),
  backwardDown: new THREE.Vector3(0, -0.5, -1).normalize(),
} as const;

/**
 * Helper to calculate label visibility based on explosion progress
 */
export function shouldShowLabel(
  progress: number,
  threshold: number = 0.3
): boolean {
  return progress >= threshold;
}

/**
 * Helper to calculate label delay based on component order
 */
export function getLabelDelay(
  componentIndex: number,
  baseDelay: number = 0,
  staggerDelay: number = 100
): number {
  return baseDelay + componentIndex * staggerDelay;
}

export default useExplodeAnimation;
