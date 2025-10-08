'use client';

import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // 0.1 = slow, 0.5 = medium, 1.0 = fast
  direction?: 'up' | 'down';
  style?: CSSProperties;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.3,
  direction = 'up',
  style = {},
  className = '',
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;

      // Calculate parallax offset
      const parallaxOffset = distance * speed * (direction === 'up' ? -1 : 1);
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.05s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
