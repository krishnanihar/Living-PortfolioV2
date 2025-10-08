'use client';

import { useEffect, useRef, useState } from 'react';

interface LiminalDividerProps {
  type?: 'fog' | 'void' | 'shimmer';
  height?: string;
  text?: string;
}

export function LiminalDivider({
  type = 'fog',
  height = '200px',
  text,
}: LiminalDividerProps) {
  const [scrollY, setScrollY] = useState(0);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!dividerRef.current) return;
      const rect = dividerRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;
      setScrollY(distance);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBackgroundStyle = () => {
    const parallaxOffset = scrollY * 0.3;

    switch (type) {
      case 'void':
        return {
          background: 'radial-gradient(circle at 50% 50%, rgba(218, 14, 41, 0.05) 0%, var(--mystical-bg) 70%)',
          position: 'relative' as const,
          overflow: 'hidden' as const,
        };
      case 'shimmer':
        return {
          background: 'linear-gradient(180deg, transparent 0%, rgba(218, 14, 41, 0.03) 50%, transparent 100%)',
          position: 'relative' as const,
        };
      case 'fog':
      default:
        return {
          background: `
            radial-gradient(ellipse at 50% ${50 + parallaxOffset * 0.1}%,
              rgba(218, 14, 41, 0.08) 0%,
              rgba(139, 125, 107, 0.04) 40%,
              transparent 70%)
          `,
          position: 'relative' as const,
        };
    }
  };

  return (
    <div
      ref={dividerRef}
      style={{
        height,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid var(--mystical-border)',
        borderBottom: '1px solid var(--mystical-border)',
        ...getBackgroundStyle(),
      }}
      className="mystical-scanline"
    >
      {text && (
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--mystical-text)',
            opacity: 0.4,
            textAlign: 'center',
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: 'transform 0.1s ease-out',
          }}
          className="rune-glow"
        >
          {text}
        </div>
      )}

      {/* Floating particles */}
      {type === 'fog' && (
        <>
          <div
            className="mystical-particle"
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'var(--mystical-particle)',
              borderRadius: '50%',
              left: '20%',
              top: '30%',
              animationDelay: '0s',
            }}
          />
          <div
            className="mystical-particle"
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              backgroundColor: 'var(--mystical-particle)',
              borderRadius: '50%',
              left: '70%',
              top: '60%',
              animationDelay: '2s',
            }}
          />
          <div
            className="mystical-particle"
            style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              backgroundColor: 'var(--mystical-particle)',
              borderRadius: '50%',
              left: '45%',
              top: '80%',
              animationDelay: '4s',
            }}
          />
        </>
      )}
    </div>
  );
}
