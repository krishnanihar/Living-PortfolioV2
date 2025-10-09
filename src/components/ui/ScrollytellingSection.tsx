'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollytellingSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  animationType?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  once?: boolean;
}

export const ScrollytellingSection = ({
  children,
  className = '',
  threshold = 0.2,
  delay = 0,
  animationType = 'fade-up',
  once = true,
}: ScrollytellingSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, once]);

  const getAnimationClass = () => {
    const baseClasses = 'transition-all duration-1000 ease-smooth';

    if (!isVisible) {
      switch (animationType) {
        case 'fade-up':
          return `${baseClasses} opacity-0 translate-y-12`;
        case 'fade-in':
          return `${baseClasses} opacity-0`;
        case 'slide-left':
          return `${baseClasses} opacity-0 -translate-x-12`;
        case 'slide-right':
          return `${baseClasses} opacity-0 translate-x-12`;
        case 'scale':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={sectionRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
