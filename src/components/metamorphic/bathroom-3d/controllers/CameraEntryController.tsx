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
 *
 * FIXED: Camera now ends at comfortable viewing distance (Z=4)
 * FIXED: Uses Catmull-Rom spline to pass THROUGH mid-point
 * FIXED: Lerp factor matches CameraRig (0.05) for seamless handoff
 */

// Camera path waypoints - adjusted for comfortable viewing
const ENTRY_PATH = {
  // Start matches CameraRig end position at progress 1.40
  start: { position: new THREE.Vector3(18, 8, 0), lookAt: new THREE.Vector3(0, 0.8, 0) },
  // Mid-point camera PASSES THROUGH (not just control point)
  mid: { position: new THREE.Vector3(8, 4, 5), lookAt: new THREE.Vector3(0, 0.6, 0.3) },
  // End at comfortable viewing distance (Z=4 instead of 1.5)
  end: { position: new THREE.Vector3(0, 1.5, 4), lookAt: new THREE.Vector3(0, 1.2, 0) },
};

// Smooth easing
function smoothstep(x: number): number {
  return x * x * (3 - 2 * x);
}

/**
 * Catmull-Rom spline interpolation
 * Unlike Bezier, this passes THROUGH all control points
 */
function catmullRom(
  t: number,
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3
): THREE.Vector3 {
  const t2 = t * t;
  const t3 = t2 * t;

  return new THREE.Vector3(
    0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    0.5 * ((2 * p1.z) + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3)
  );
}

/**
 * Generate virtual start/end points for Catmull-Rom
 * Extends the curve naturally beyond the endpoints
 */
function getVirtualPoint(p1: THREE.Vector3, p2: THREE.Vector3): THREE.Vector3 {
  // Create a point that continues the line from p2 through p1
  return new THREE.Vector3(
    p1.x + (p1.x - p2.x),
    p1.y + (p1.y - p2.y),
    p1.z + (p1.z - p2.z)
  );
}

export function CameraEntryController({ scrollProgress }: CameraEntryControllerProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0));
  const hasInitialized = useRef(false);

  useFrame(() => {
    const progress = scrollProgress.current;

    // Only active during 1.40-1.70 range
    if (progress < 1.40 || progress >= 1.70) {
      hasInitialized.current = false;
      return;
    }

    // Mark as initialized
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    }

    // Calculate local progress (0-1 within this phase)
    const localProgress = (progress - 1.40) / 0.30;
    const easedProgress = smoothstep(localProgress);

    // Use Catmull-Rom for smooth curve that passes through all points
    // Virtual points extend the curve naturally
    const virtualStart = getVirtualPoint(ENTRY_PATH.start.position, ENTRY_PATH.mid.position);
    const virtualEnd = getVirtualPoint(ENTRY_PATH.end.position, ENTRY_PATH.mid.position);

    // For first half (0-0.5), interpolate from start to mid
    // For second half (0.5-1), interpolate from mid to end
    let targetPosition: THREE.Vector3;
    let targetLookAt: THREE.Vector3;

    if (easedProgress < 0.5) {
      const segmentT = easedProgress * 2; // 0-1 for first segment
      targetPosition = catmullRom(
        segmentT,
        virtualStart,
        ENTRY_PATH.start.position,
        ENTRY_PATH.mid.position,
        ENTRY_PATH.end.position
      );
      targetLookAt = catmullRom(
        segmentT,
        getVirtualPoint(ENTRY_PATH.start.lookAt, ENTRY_PATH.mid.lookAt),
        ENTRY_PATH.start.lookAt,
        ENTRY_PATH.mid.lookAt,
        ENTRY_PATH.end.lookAt
      );
    } else {
      const segmentT = (easedProgress - 0.5) * 2; // 0-1 for second segment
      targetPosition = catmullRom(
        segmentT,
        ENTRY_PATH.start.position,
        ENTRY_PATH.mid.position,
        ENTRY_PATH.end.position,
        virtualEnd
      );
      targetLookAt = catmullRom(
        segmentT,
        ENTRY_PATH.start.lookAt,
        ENTRY_PATH.mid.lookAt,
        ENTRY_PATH.end.lookAt,
        getVirtualPoint(ENTRY_PATH.end.lookAt, ENTRY_PATH.mid.lookAt)
      );
    }

    // FIXED: Use same lerp factor as CameraRig (0.05) for seamless handoff
    const lerpFactor = 0.05;
    camera.position.lerp(targetPosition, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default CameraEntryController;
