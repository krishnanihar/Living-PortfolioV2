'use client';

import { MutableRefObject, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraEntryControllerProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * CameraEntryController - Dolly camera into the bathroom
 *
 * Active during progress 1.40-1.70
 * Smoothly moves camera from orbit position into the bathroom,
 * facing the mirror for the installation activation.
 */

// Camera path waypoints
const ENTRY_PATH = {
  start: { position: new THREE.Vector3(18, 8, 0), lookAt: new THREE.Vector3(0, 0.8, 0) },
  mid: { position: new THREE.Vector3(5, 3, 4), lookAt: new THREE.Vector3(0, 0.5, 0.5) },
  end: { position: new THREE.Vector3(0, 1.2, 1.5), lookAt: new THREE.Vector3(0, 1.2, -0.5) },
};

// Smooth bezier-like interpolation
function smoothstep(x: number): number {
  return x * x * (3 - 2 * x);
}

// Cubic bezier interpolation for positions
function cubicBezier(
  t: number,
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3
): THREE.Vector3 {
  const oneMinusT = 1 - t;
  const result = new THREE.Vector3();

  // Quadratic bezier: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
  result.x = oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x;
  result.y = oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y;
  result.z = oneMinusT * oneMinusT * p0.z + 2 * oneMinusT * t * p1.z + t * t * p2.z;

  return result;
}

export function CameraEntryController({ scrollProgress }: CameraEntryControllerProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  useFrame(() => {
    const progress = scrollProgress.current;

    // Only active during 1.40-1.70 range
    if (progress < 1.40 || progress >= 1.70) return;

    // Calculate local progress (0-1 within this phase)
    const localProgress = (progress - 1.40) / 0.30;
    const easedProgress = smoothstep(localProgress);

    // Calculate target position along bezier curve
    const targetPosition = cubicBezier(
      easedProgress,
      ENTRY_PATH.start.position,
      ENTRY_PATH.mid.position,
      ENTRY_PATH.end.position
    );

    // Calculate target lookAt along bezier curve
    const targetLookAt = cubicBezier(
      easedProgress,
      ENTRY_PATH.start.lookAt,
      ENTRY_PATH.mid.lookAt,
      ENTRY_PATH.end.lookAt
    );

    // Smooth camera movement with faster lerp for responsive feel
    const lerpFactor = 0.08;
    camera.position.lerp(targetPosition, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default CameraEntryController;
