'use client';

import { useRef, MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExplodeConfig {
  /** Direction to explode in (normalized) */
  direction: THREE.Vector3;
  /** Maximum distance to travel */
  distance: number;
  /** Scroll progress range start (0-1) */
  startAt?: number;
  /** Scroll progress range end (0-1) */
  endAt?: number;
  /** Easing function */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'smoothstep';
  /** Rotation during explosion (radians) */
  rotation?: THREE.Euler;
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

    // Calculate progress within our range
    const scrollT = scrollProgress.current;
    const rangeT = Math.max(0, Math.min(1, (scrollT - startAt) / (endAt - startAt)));

    // Apply easing
    const easingFn = easingFunctions[easing];
    const easedT = easingFn(rangeT);

    progress.current = easedT;
    isExploding.current = easedT > 0 && easedT < 1;

    // Calculate new position
    const offset = direction.clone().multiplyScalar(easedT * distance);
    groupRef.current.position.copy(basePosition.current.clone().add(offset));

    // Apply rotation if specified
    if (rotation && baseRotation.current) {
      groupRef.current.rotation.set(
        baseRotation.current.x + rotation.x * easedT,
        baseRotation.current.y + rotation.y * easedT,
        baseRotation.current.z + rotation.z * easedT
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
