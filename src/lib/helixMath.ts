import * as THREE from 'three';

/**
 * Helix configuration for the 3D journey timeline
 */
export interface HelixConfig {
  radius: number;           // Horizontal spread of the helix
  pitch: number;            // Vertical distance per half-rotation
  verticalScale: number;    // Y-axis scaling for elliptical shape
  startZ: number;           // Starting Z position
}

/**
 * Default helix configuration tuned for the journey experience
 */
export const DEFAULT_HELIX_CONFIG: HelixConfig = {
  radius: 35,
  pitch: 70,
  verticalScale: 0.5,
  startZ: 30,
};

/**
 * Calculate the 3D position for a milestone on the helix path
 * Cards alternate left/right in a DNA-like spiral pattern
 */
export function calculateCardPosition(
  index: number,
  config: HelixConfig = DEFAULT_HELIX_CONFIG
): THREE.Vector3 {
  const angle = index * Math.PI; // 180 degrees per card = alternating sides
  const z = config.startZ - (index * config.pitch * 0.5);

  return new THREE.Vector3(
    Math.cos(angle) * config.radius,
    Math.sin(angle) * config.radius * config.verticalScale,
    z
  );
}

/**
 * Calculate rotation for card to face the camera path
 */
export function calculateCardRotation(index: number): THREE.Euler {
  const angle = index * Math.PI;
  // Cards slightly angled toward center of helix
  const yRotation = angle > 0 ? -0.15 : 0.15;
  return new THREE.Euler(0, yRotation, 0);
}

/**
 * Generate a smooth spline path through all milestone positions
 * Used for camera movement
 */
export function generateCameraPath(
  milestoneCount: number,
  config: HelixConfig = DEFAULT_HELIX_CONFIG
): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];

  // Add entry point before first milestone
  const firstPos = calculateCardPosition(0, config);
  points.push(new THREE.Vector3(0, 0, firstPos.z + 60));

  // Add camera positions along the helix center
  for (let i = 0; i < milestoneCount; i++) {
    const cardPos = calculateCardPosition(i, config);
    // Camera stays in center of helix, slightly behind cards
    points.push(new THREE.Vector3(
      cardPos.x * 0.15, // Subtle sway toward cards
      cardPos.y * 0.2,  // Reduced vertical movement
      cardPos.z - 15    // Closer to cards
    ));
  }

  // Add exit point after last milestone
  const lastPos = calculateCardPosition(milestoneCount - 1, config);
  points.push(new THREE.Vector3(0, 0, lastPos.z - 80));

  return new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
}

/**
 * Get the scroll zone for a specific milestone
 * Returns start and end as 0-1 progress values
 */
export function getMilestoneScrollZone(
  index: number,
  totalMilestones: number
): { start: number; end: number; center: number } {
  const zoneSize = 1 / totalMilestones;
  return {
    start: index * zoneSize,
    end: (index + 1) * zoneSize,
    center: (index + 0.5) * zoneSize,
  };
}

/**
 * Determine which milestone is active based on scroll progress
 */
export function getActiveMilestone(
  scrollProgress: number,
  totalMilestones: number
): number {
  const index = Math.floor(scrollProgress * totalMilestones);
  return Math.min(Math.max(0, index), totalMilestones - 1);
}

/**
 * Calculate distance from camera to a milestone position
 */
export function getDistanceToMilestone(
  cameraZ: number,
  milestoneIndex: number,
  config: HelixConfig = DEFAULT_HELIX_CONFIG
): number {
  const cardPos = calculateCardPosition(milestoneIndex, config);
  return Math.abs(cameraZ - cardPos.z);
}

/**
 * Get opacity and scale for a card based on distance from camera
 */
export function getCardVisibility(
  distance: number
): { opacity: number; scale: number } {
  const maxDistance = 400;
  const minDistance = 50;

  if (distance < minDistance) {
    return { opacity: 1, scale: 1.05 };
  }

  if (distance > maxDistance) {
    return { opacity: 0.3, scale: 0.75 };
  }

  const t = (distance - minDistance) / (maxDistance - minDistance);
  const eased = 1 - Math.pow(t, 0.5); // Ease out

  return {
    opacity: 0.3 + eased * 0.7,
    scale: 0.75 + eased * 0.3,
  };
}

/**
 * Generate positions for connection lines between milestones
 * Creates a flowing line that connects the helix path
 */
export function generateHelixLinePoints(
  milestoneCount: number,
  segments: number = 100,
  config: HelixConfig = DEFAULT_HELIX_CONFIG
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const totalLength = milestoneCount - 1;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * totalLength;
    const angle = t * Math.PI;
    const z = config.startZ - (t * config.pitch * 0.5);

    points.push(new THREE.Vector3(
      Math.cos(angle) * config.radius * 0.3, // Tighter helix line
      Math.sin(angle) * config.radius * config.verticalScale * 0.3,
      z
    ));
  }

  return points;
}
