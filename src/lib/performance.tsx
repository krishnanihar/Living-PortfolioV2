/**
 * Performance Optimization Utilities
 * Ensures 60fps performance for premium animations and effects
 */

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { prefersReducedMotion } from './utils';

// Performance monitoring
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  isPerformant: boolean;
}

class PerformanceMonitor {
  private frames: number[] = [];
  private lastFrameTime = 0;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor() {
    this.tick = this.tick.bind(this);
    this.startMonitoring();
  }

  private tick(currentTime: number) {
    if (this.lastFrameTime) {
      const frameTime = currentTime - this.lastFrameTime;
      this.frames.push(frameTime);

      // Keep only last 60 frames
      if (this.frames.length > 60) {
        this.frames.shift();
      }

      // Calculate FPS and notify callbacks
      if (this.frames.length >= 10) {
        const avgFrameTime = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
        const fps = 1000 / avgFrameTime;

        const metrics: PerformanceMetrics = {
          fps: Math.round(fps),
          frameTime: Math.round(avgFrameTime * 100) / 100,
          memoryUsage: this.getMemoryUsage(),
          isPerformant: fps >= 50, // Consider 50+ fps as performant
        };

        this.callbacks.forEach(callback => callback(metrics));
      }
    }

    this.lastFrameTime = currentTime;
    requestAnimationFrame(this.tick);
  }

  private getMemoryUsage(): number | undefined {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100);
    }
    return undefined;
  }

  private startMonitoring() {
    if (typeof window !== 'undefined' && !prefersReducedMotion()) {
      requestAnimationFrame(this.tick);
    }
  }

  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }
}

// Singleton performance monitor
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const monitor = getPerformanceMonitor();
    const unsubscribe = monitor.subscribe(setMetrics);

    return unsubscribe;
  }, []);

  return metrics;
}

// GPU acceleration utilities
export function enableGPUAcceleration(element: HTMLElement) {
  if (typeof window === 'undefined') return;

  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
}

export function disableGPUAcceleration(element: HTMLElement) {
  if (typeof window === 'undefined') return;

  element.style.willChange = 'auto';
  element.style.transform = '';
  element.style.backfaceVisibility = '';
  element.style.perspective = '';
}

// Intersection Observer for performance optimization
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return { ref: elementRef, isIntersecting };
}

// Frame rate throttling
export function useFrameThrottle(callback: () => void, fps: number = 60) {
  const callbackRef = useRef(callback);
  const lastTimeRef = useRef(0);
  const frameInterval = 1000 / fps;

  callbackRef.current = callback;

  return useCallback((currentTime?: number) => {
    const now = currentTime || performance.now();

    if (now - lastTimeRef.current >= frameInterval) {
      lastTimeRef.current = now;
      callbackRef.current();
    }
  }, [frameInterval]);
}

// Memory optimization
export function useMemoryOptimization() {
  const cleanupFunctions = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctions.current.push(cleanup);
  }, []);

  const cleanup = useCallback(() => {
    cleanupFunctions.current.forEach(fn => fn());
    cleanupFunctions.current = [];
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { addCleanup, cleanup };
}

// Debounced resize observer
export function useDebouncedResize(
  callback: (entry: ResizeObserverEntry) => void,
  delay: number = 100
) {
  const elementRef = useRef<HTMLElement>(null);
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  callbackRef.current = callback;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(entries[0]);
      }, delay);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return elementRef;
}

// Performance-aware component wrapper
export function withPerformanceOptimization<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    enableIntersection?: boolean;
    gpuAcceleration?: boolean;
    threshold?: number;
  } = {}
) {
  const { enableIntersection = true, gpuAcceleration = true, threshold = 0.1 } = options;

  return function PerformanceOptimizedComponent(props: P) {
    const { ref, isIntersecting } = useIntersectionObserver({
      threshold,
    });

    useEffect(() => {
      const element = ref.current;
      if (!element || !gpuAcceleration) return;

      if (isIntersecting) {
        enableGPUAcceleration(element);
      } else {
        disableGPUAcceleration(element);
      }
    }, [isIntersecting, gpuAcceleration]);

    if (enableIntersection && !isIntersecting) {
      return <div ref={ref as any} style={{ minHeight: '100px' }} />;
    }

    return (
      <div ref={ref as any}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Adaptive quality based on performance
export function useAdaptiveQuality() {
  const metrics = usePerformanceMonitor();
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    if (!metrics) return;

    if (metrics.fps < 30) {
      setQuality('low');
    } else if (metrics.fps < 45) {
      setQuality('medium');
    } else {
      setQuality('high');
    }
  }, [metrics]);

  return {
    quality,
    metrics,
    shouldReduceEffects: quality === 'low',
    shouldReduceAnimations: quality !== 'high',
  };
}

// Performance budgets
export const performanceBudgets = {
  // Target metrics
  targetFPS: 60,
  minFPS: 45,
  maxMemoryUsage: 80, // percentage

  // Animation durations based on quality
  animationDurations: {
    high: {
      fast: 150,
      base: 300,
      slow: 500,
    },
    medium: {
      fast: 100,
      base: 200,
      slow: 300,
    },
    low: {
      fast: 50,
      base: 100,
      slow: 150,
    },
  },

  // Particle counts based on quality
  particleCounts: {
    high: { desktop: 150, mobile: 75 },
    medium: { desktop: 100, mobile: 50 },
    low: { desktop: 50, mobile: 25 },
  },

  // Blur amounts based on quality
  blurAmounts: {
    high: { light: 24, heavy: 40 },
    medium: { light: 16, heavy: 24 },
    low: { light: 8, heavy: 12 },
  },
};

// Device capability detection
export function getDeviceCapabilities() {
  if (typeof window === 'undefined') {
    return {
      isHighEnd: false,
      isMobile: false,
      supportsBackdropFilter: false,
      supportsHover: false,
    };
  }

  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const supportsBackdropFilter = typeof CSS !== 'undefined' && (CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)'));

  const supportsHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  // Rough performance estimation based on device characteristics
  const isHighEnd = !isMobile &&
    typeof navigator !== 'undefined' &&
    navigator.hardwareConcurrency > 4 &&
    supportsBackdropFilter &&
    supportsHover;

  return {
    isHighEnd,
    isMobile,
    supportsBackdropFilter,
    supportsHover,
  };
}