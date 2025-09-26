'use client';

import React from 'react';

// Performance monitoring
const performance = {
  frameDrops: 0,
  lastFrameTime: 0,
  animationFrames: new Set<number>(),

  monitor(callback: () => void) {
    const startTime = Date.now();
    const frame = requestAnimationFrame(() => {
      callback();
      const frameTime = Date.now() - startTime;

      if (frameTime > 16.67) { // > 60fps threshold
        this.frameDrops++;
        if (this.frameDrops > 10) {
          console.warn('[MicroInteractions] Performance degradation detected');
        }
      }

      this.animationFrames.delete(frame);
    });

    this.animationFrames.add(frame);
    return frame;
  },

  cleanup() {
    this.animationFrames.forEach(frame => cancelAnimationFrame(frame));
    this.animationFrames.clear();
  }
};

// Device capabilities detection
const deviceCapabilities = {
  hasHover: typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
  hasTouch: typeof window !== 'undefined' && 'ontouchstart' in window,
  prefersReducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  isHighDPI: typeof window !== 'undefined' && window.devicePixelRatio > 1,

  update() {
    if (typeof window === 'undefined') return;

    this.hasHover = window.matchMedia('(hover: hover)').matches;
    this.hasTouch = 'ontouchstart' in window;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isHighDPI = window.devicePixelRatio > 1;
  }
};

// Magnetic hover effect
export interface MagneticOptions {
  strength?: number;
  radius?: number;
  damping?: number;
  scale?: number;
  rotation?: boolean;
  glow?: boolean;
}

export class MagneticEffect {
  private element: HTMLElement;
  private options: Required<MagneticOptions>;
  private isActive = false;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private animationFrame?: number;

  constructor(element: HTMLElement, options: MagneticOptions = {}) {
    this.element = element;
    this.options = {
      strength: options.strength || 0.2,
      radius: options.radius || 100,
      damping: options.damping || 0.1,
      scale: options.scale || 1.05,
      rotation: options.rotation || false,
      glow: options.glow || false,
    };

    this.init();
  }

  private init() {
    if (!deviceCapabilities.hasHover || deviceCapabilities.prefersReducedMotion) return;

    this.element.style.transition = 'none';
    this.element.style.willChange = 'transform';

    if (this.options.glow) {
      this.element.style.filter = 'drop-shadow(0 0 0 transparent)';
    }

    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  private handleMouseEnter() {
    this.isActive = true;
    this.startAnimation();
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.isActive) return;

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < this.options.radius) {
      const force = (1 - distance / this.options.radius) * this.options.strength;
      this.targetX = deltaX * force;
      this.targetY = deltaY * force;
    }
  }

  private handleMouseLeave() {
    this.isActive = false;
    this.targetX = 0;
    this.targetY = 0;
  }

  private startAnimation() {
    if (this.animationFrame) return;

    const animate = () => {
      // Smooth interpolation
      this.currentX += (this.targetX - this.currentX) * this.options.damping;
      this.currentY += (this.targetY - this.currentY) * this.options.damping;

      let transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

      if (this.isActive) {
        transform += ` scale(${this.options.scale})`;

        if (this.options.rotation) {
          const rotation = (this.currentX + this.currentY) * 0.1;
          transform += ` rotate(${rotation}deg)`;
        }
      }

      this.element.style.transform = transform;

      if (this.options.glow && this.isActive) {
        const glowIntensity = Math.min(Math.abs(this.currentX) + Math.abs(this.currentY), 20);
        this.element.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(180, 200, 240, 0.2))`;
      } else if (this.options.glow) {
        this.element.style.filter = 'drop-shadow(0 0 0 transparent)';
      }

      // Continue animation if active or still moving
      if (this.isActive || Math.abs(this.currentX) > 0.1 || Math.abs(this.currentY) > 0.1) {
        this.animationFrame = performance.monitor(() => {
          this.animationFrame = undefined;
          animate();
        });
      } else {
        this.animationFrame = undefined;
      }
    };

    animate();
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.element.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));

    this.element.style.transform = '';
    this.element.style.willChange = '';
    this.element.style.filter = '';
  }
}

// Cursor spotlight effect
export class SpotlightEffect {
  private isActive = false;
  private currentX = 0;
  private currentY = 0;
  private animationFrame?: number;
  private spotlight?: HTMLElement;

  constructor() {
    this.init();
  }

  private init() {
    if (deviceCapabilities.hasTouch || deviceCapabilities.prefersReducedMotion) return;

    this.createSpotlight();
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }

  private createSpotlight() {
    this.spotlight = document.createElement('div');
    this.spotlight.className = 'cursor-spotlight';
    this.spotlight.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      pointer-events: none;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(200, 220, 255, 0.04) 0%, transparent 60%);
      transform: translate(-50%, -50%);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      will-change: transform;
    `;

    document.body.appendChild(this.spotlight);
  }

  private handleMouseEnter() {
    this.isActive = true;
    if (this.spotlight) {
      this.spotlight.style.opacity = '1';
    }
    this.startAnimation();
  }

  private handleMouseMove(event: MouseEvent) {
    this.currentX = event.clientX;
    this.currentY = event.clientY;
  }

  private handleMouseLeave() {
    this.isActive = false;
    if (this.spotlight) {
      this.spotlight.style.opacity = '0';
    }
  }

  private startAnimation() {
    if (this.animationFrame) return;

    const animate = () => {
      if (this.spotlight && this.isActive) {
        this.spotlight.style.transform = `translate3d(${this.currentX - 200}px, ${this.currentY - 200}px, 0)`;
      }

      if (this.isActive) {
        this.animationFrame = performance.monitor(() => {
          this.animationFrame = undefined;
          animate();
        });
      }
    };

    animate();
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    document.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));

    if (this.spotlight) {
      document.body.removeChild(this.spotlight);
    }
  }
}

// Scroll reveal effect
export interface ScrollRevealOptions {
  threshold?: number;
  duration?: number;
  delay?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number;
  opacity?: boolean;
}

export class ScrollReveal {
  private observer?: IntersectionObserver;
  private elements = new Map<Element, ScrollRevealOptions>();

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const options = this.elements.get(entry.target);
          if (!options) return;

          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            this.animateIn(element, options);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px' }
    );
  }

  observe(element: HTMLElement, options: ScrollRevealOptions = {}) {
    if (!this.observer) return;

    const opts: Required<ScrollRevealOptions> = {
      threshold: options.threshold || 0.1,
      duration: options.duration || 600,
      delay: options.delay || 0,
      distance: options.distance || 30,
      direction: options.direction || 'up',
      scale: options.scale || 1,
      opacity: options.opacity !== false,
    };

    this.elements.set(element, opts);
    this.setupElement(element, opts);
    this.observer.observe(element);
  }

  private setupElement(element: HTMLElement, options: Required<ScrollRevealOptions>) {
    if (deviceCapabilities.prefersReducedMotion) return;

    const transforms = [];

    switch (options.direction) {
      case 'up':
        transforms.push(`translateY(${options.distance}px)`);
        break;
      case 'down':
        transforms.push(`translateY(-${options.distance}px)`);
        break;
      case 'left':
        transforms.push(`translateX(${options.distance}px)`);
        break;
      case 'right':
        transforms.push(`translateX(-${options.distance}px)`);
        break;
    }

    if (options.scale !== 1) {
      transforms.push(`scale(${options.scale})`);
    }

    element.style.transform = transforms.join(' ');
    element.style.opacity = options.opacity ? '0' : '1';
    element.style.transition = `transform ${options.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${options.duration}ms ease`;
  }

  private animateIn(element: HTMLElement, options: ScrollRevealOptions) {
    if (deviceCapabilities.prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = '';
      return;
    }

    setTimeout(() => {
      element.style.transform = 'translate3d(0, 0, 0) scale(1)';
      element.style.opacity = '1';
    }, options.delay || 0);
  }

  unobserve(element: HTMLElement) {
    this.observer?.unobserve(element);
    this.elements.delete(element);
  }

  destroy() {
    this.observer?.disconnect();
    this.elements.clear();
    performance.cleanup();
  }
}

// Hook-like functions for React components
export const useMagneticEffect = (ref: React.RefObject<HTMLElement | null>, options?: MagneticOptions) => {
  const effectRef = React.useRef<MagneticEffect | undefined>(undefined);

  React.useEffect(() => {
    if (ref.current && !effectRef.current) {
      effectRef.current = new MagneticEffect(ref.current as HTMLElement, options);
    }

    return () => {
      effectRef.current?.destroy();
      effectRef.current = undefined;
    };
  }, [ref, options]);

  return effectRef.current;
};

export const useScrollReveal = () => {
  const revealRef = React.useRef<ScrollReveal | undefined>(undefined);

  React.useEffect(() => {
    if (!revealRef.current) {
      revealRef.current = new ScrollReveal();
    }

    return () => {
      revealRef.current?.destroy();
      revealRef.current = undefined;
    };
  }, []);

  const observe = React.useCallback((element: HTMLElement, options?: ScrollRevealOptions) => {
    revealRef.current?.observe(element, options);
  }, []);

  const unobserve = React.useCallback((element: HTMLElement) => {
    revealRef.current?.unobserve(element);
  }, []);

  return { observe, unobserve };
};

// Initialize global effects
export const initializeMicroInteractions = () => {
  deviceCapabilities.update();

  // Initialize spotlight effect globally
  if (!deviceCapabilities.hasTouch && !deviceCapabilities.prefersReducedMotion) {
    new SpotlightEffect();
  }
};

// Export for cleanup
export const cleanup = () => {
  performance.cleanup();
};