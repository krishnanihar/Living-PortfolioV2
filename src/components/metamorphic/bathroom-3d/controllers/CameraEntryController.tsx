'use client';

import { MutableRefObject, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraEntryControllerProps {
  scrollProgress: MutableRefObject<number>;
}

/**
 * CameraZoomController - Dolly camera into the bathroom toward mirror
 *
 * Active during progress 1.5-2.8:
 * - 1.5-2.0: HOLD - Camera holds at orbit end position
 * - 2.0-2.8: ZOOM - Camera dollies into bathroom toward mirror
 *
 * Takes over from CameraRig at progress 1.5
 * Hands off to video playback at progress 2.8
 */

// Camera path waypoints - end very close to mirror for video reveal
const ZOOM_PATH = {
  // Start: End of orbit phase (at 570° ≈ 210°, radius 14, height 6)
  // Camera position at 570° (same as 210°): sin(210°) ≈ -0.5, cos(210°) ≈ -0.866
  start: {
    position: new THREE.Vector3(14 * Math.sin(Math.PI * 7/6), 6, 14 * Math.cos(Math.PI * 7/6)),
    lookAt: new THREE.Vector3(0, 0.8, 0)
  },
  // Mid-point: Transitioning through bathroom entrance
  mid: {
    position: new THREE.Vector3(2, 2.5, 5),
    lookAt: new THREE.Vector3(0, 1.0, 0.5)
  },
  // End: Face-to-face with mirror (very close for video reveal)
  end: {
    position: new THREE.Vector3(0, 1.2, 1.8),
    lookAt: new THREE.Vector3(0, 1.2, 1.0)
  },
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

    // Only active during 1.5-2.8 range
    if (progress < 1.5 || progress >= 2.8) {
      hasInitialized.current = false;
      return;
    }

    // Mark as initialized
    if (!hasInitialized.current) {
      hasInitialized.current = true;
    }

    // Two-phase control:
    // 1.5-2.0: HOLD at start position (easedProgress = 0)
    // 2.0-2.8: ZOOM from start to end
    let easedProgress: number;

    if (progress < 2.0) {
      // HOLD phase: stay at start position
      easedProgress = 0;
    } else {
      // ZOOM phase: interpolate from start to end
      // Range is 2.0 to 2.8 = 0.8 units
      const localProgress = (progress - 2.0) / 0.8;
      easedProgress = smoothstep(localProgress);
    }

    // Use Catmull-Rom for smooth curve that passes through all points
    // Virtual points extend the curve naturally
    const virtualStart = getVirtualPoint(ZOOM_PATH.start.position, ZOOM_PATH.mid.position);
    const virtualEnd = getVirtualPoint(ZOOM_PATH.end.position, ZOOM_PATH.mid.position);

    // For first half (0-0.5), interpolate from start to mid
    // For second half (0.5-1), interpolate from mid to end
    let targetPosition: THREE.Vector3;
    let targetLookAt: THREE.Vector3;

    if (easedProgress < 0.5) {
      const segmentT = easedProgress * 2; // 0-1 for first segment
      targetPosition = catmullRom(
        segmentT,
        virtualStart,
        ZOOM_PATH.start.position,
        ZOOM_PATH.mid.position,
        ZOOM_PATH.end.position
      );
      targetLookAt = catmullRom(
        segmentT,
        getVirtualPoint(ZOOM_PATH.start.lookAt, ZOOM_PATH.mid.lookAt),
        ZOOM_PATH.start.lookAt,
        ZOOM_PATH.mid.lookAt,
        ZOOM_PATH.end.lookAt
      );
    } else {
      const segmentT = (easedProgress - 0.5) * 2; // 0-1 for second segment
      targetPosition = catmullRom(
        segmentT,
        ZOOM_PATH.start.position,
        ZOOM_PATH.mid.position,
        ZOOM_PATH.end.position,
        virtualEnd
      );
      targetLookAt = catmullRom(
        segmentT,
        ZOOM_PATH.start.lookAt,
        ZOOM_PATH.mid.lookAt,
        ZOOM_PATH.end.lookAt,
        getVirtualPoint(ZOOM_PATH.end.lookAt, ZOOM_PATH.mid.lookAt)
      );
    }

    // Use same lerp factor as CameraRig (0.05) for seamless handoff
    const lerpFactor = 0.05;
    camera.position.lerp(targetPosition, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export default CameraEntryController;
