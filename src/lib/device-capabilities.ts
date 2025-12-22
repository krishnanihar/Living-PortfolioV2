/**
 * Device Capabilities Detection Utility
 *
 * Provides runtime detection of device capabilities for adaptive performance
 * optimization. Used for particle counts, animation complexity, and touch handling.
 */

export interface DeviceCapabilities {
  /** Number of logical processor cores */
  cores: number;
  /** Device memory in GB (if available) */
  memory: number | null;
  /** Whether this is considered a low-end device */
  isLowEnd: boolean;
  /** Whether the device is mobile-sized */
  isMobile: boolean;
  /** Whether device has touch capabilities */
  hasTouch: boolean;
  /** Whether user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Whether device has high DPI display */
  isHighDPI: boolean;
  /** Whether device supports hover */
  canHover: boolean;
  /** Whether device has fine pointer (mouse) */
  hasFinePointer: boolean;
}

export type AnimationQuality = 'none' | 'minimal' | 'reduced' | 'full';

/**
 * Detect device capabilities for performance optimization
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  // SSR guard
  if (typeof window === 'undefined') {
    return {
      cores: 4,
      memory: null,
      isLowEnd: false,
      isMobile: false,
      hasTouch: false,
      prefersReducedMotion: false,
      isHighDPI: false,
      canHover: true,
      hasFinePointer: true,
    };
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || null;

  // Low-end detection: <= 4 cores OR <= 4GB RAM
  const isLowEnd = cores <= 4 || (memory !== null && memory <= 4);

  // Mobile detection: viewport width OR touch-only device
  const isMobile = window.innerWidth < 768 ||
    (window.matchMedia('(hover: none) and (pointer: coarse)').matches);

  // Touch capability
  const hasTouch = 'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // High DPI detection
  const isHighDPI = window.devicePixelRatio > 1.5;

  // Hover capability (mouse/trackpad)
  const canHover = window.matchMedia('(hover: hover)').matches;

  // Fine pointer (mouse vs touch)
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  return {
    cores,
    memory,
    isLowEnd,
    isMobile,
    hasTouch,
    prefersReducedMotion,
    isHighDPI,
    canHover,
    hasFinePointer,
  };
}

/**
 * Determine animation quality based on device capabilities
 */
export function getAnimationQuality(caps: DeviceCapabilities): AnimationQuality {
  // User preference takes priority
  if (caps.prefersReducedMotion) return 'none';

  // Low-end devices get minimal animations
  if (caps.isLowEnd) return 'minimal';

  // Mobile devices get reduced animations
  if (caps.isMobile) return 'reduced';

  // Full animations for capable devices
  return 'full';
}

/**
 * Get adaptive particle count based on device capabilities
 */
export function getAdaptiveParticleCount(
  caps: DeviceCapabilities,
  baseCount: number = 25000
): number {
  const quality = getAnimationQuality(caps);

  switch (quality) {
    case 'none':
      return 0;
    case 'minimal':
      return Math.floor(baseCount * 0.12); // 3,000 particles
    case 'reduced':
      return Math.floor(baseCount * 0.32); // 8,000 particles
    case 'full':
    default:
      return baseCount;
  }
}

/**
 * Get adaptive animation duration multiplier
 */
export function getAnimationDuration(
  caps: DeviceCapabilities,
  baseDuration: number
): number {
  if (caps.prefersReducedMotion) {
    return Math.min(baseDuration, 300);
  }
  if (caps.isLowEnd) {
    return baseDuration * 0.7;
  }
  return baseDuration;
}

/**
 * Check if device should show heavy effects
 */
export function shouldShowHeavyEffects(caps: DeviceCapabilities): boolean {
  return !caps.prefersReducedMotion && !caps.isLowEnd && !caps.isMobile;
}

/**
 * Debounce utility for resize listeners
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Hook-friendly device capabilities with listener cleanup
 * Returns capabilities and a cleanup function
 */
export function createCapabilitiesListener(
  callback: (caps: DeviceCapabilities) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleChange = debounce(() => {
    callback(getDeviceCapabilities());
  }, 150);

  // Initial call
  callback(getDeviceCapabilities());

  // Listen for relevant changes
  window.addEventListener('resize', handleChange, { passive: true });

  const reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotionMQ.addEventListener('change', handleChange);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleChange);
    reducedMotionMQ.removeEventListener('change', handleChange);
  };
}
