'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'fade-in' | 'scale';
  delay?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.3,
  className = ''
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    };

    const animations = {
      'fade-up': {
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      },
      'slide-left': {
        transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
      },
      'slide-right': {
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
      },
      'fade-in': {},
      'scale': {
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      },
    };

    return { ...baseStyles, ...animations[animation] };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
};
