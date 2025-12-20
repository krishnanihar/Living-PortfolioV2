'use client';

import { MutableRefObject, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface LightFadeControllerProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * LightFadeController - Fade scene lights to darkness
 *
 * Active during progress 1.70-1.90
 * Smoothly fades all scene lights to 5% intensity,
 * creating a dramatic atmosphere before the installation reveal.
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

    if (progress < 1.70) {
      // Before fade phase: full intensity
      intensityMultiplier = 1;
    } else if (progress >= 1.70 && progress < 1.90) {
      // During fade phase: fade from 100% to 5%
      const localProgress = (progress - 1.70) / 0.20;
      const easedProgress = smoothstep(localProgress);
      intensityMultiplier = 1 - easedProgress * 0.95; // 1 -> 0.05
    } else if (progress >= 1.90) {
      // After fade: stay at 5%
      intensityMultiplier = 0.05;
    }

    // Apply intensity to all lights
    lights.forEach(({ light, originalIntensity }) => {
      light.intensity = originalIntensity * intensityMultiplier;
    });
  });

  return null;
}

export default LightFadeController;
