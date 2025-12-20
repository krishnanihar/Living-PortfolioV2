'use client';

import { MutableRefObject, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface LightFadeControllerProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * LightFadeController - Fade scene lights to complete darkness
 *
 * Active during progress 2.5-2.8
 * Smoothly fades all scene lights to 0% intensity,
 * creating complete darkness before the video reveal on the mirror.
 *
 * Synchronized with the final camera zoom phase.
 */

// Store original light intensities to restore on scroll back
interface LightIntensity {
  light: THREE.Light;
  originalIntensity: number;
}

function smoothstep(x: number): number {
  return x * x * (3 - 2 * x);
}

export function LightFadeController({ scrollProgress }: LightFadeControllerProps) {
  const { scene } = useThree();
  const lightsRef = useRef<LightIntensity[]>([]);
  const hasInitialized = useRef(false);

  // Collect all lights in the scene on first render
  useEffect(() => {
    if (hasInitialized.current) return;

    const lights: LightIntensity[] = [];
    scene.traverse((object) => {
      if (object instanceof THREE.Light) {
        lights.push({
          light: object,
          originalIntensity: object.intensity,
        });
      }
    });

    lightsRef.current = lights;
    hasInitialized.current = true;
  }, [scene]);

  useFrame(() => {
    const progress = scrollProgress.current;
    const lights = lightsRef.current;

    if (lights.length === 0) return;

    // Calculate intensity multiplier based on progress phase
    let intensityMultiplier = 1;

    if (progress < 2.5) {
      // Before fade phase: full intensity
      intensityMultiplier = 1;
    } else if (progress >= 2.5 && progress < 2.8) {
      // During fade phase: fade from 100% to 0%
      const localProgress = (progress - 2.5) / 0.3;
      const easedProgress = smoothstep(localProgress);
      intensityMultiplier = 1 - easedProgress; // 1 -> 0 (complete darkness)
    } else if (progress >= 2.8) {
      // After fade: stay at 0% (complete darkness for video)
      intensityMultiplier = 0;
    }

    // Apply intensity to all lights
    lights.forEach(({ light, originalIntensity }) => {
      light.intensity = originalIntensity * intensityMultiplier;
    });
  });

  return null;
}

export default LightFadeController;
