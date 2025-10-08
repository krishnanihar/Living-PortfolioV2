'use client';

import { useState, useEffect, useRef } from 'react';

export function MythOSHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress for fade out
      const scrolled = -heroRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (heroHeight - windowHeight)));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBuilder = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    const builder = document.getElementById('exhibition-builder');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Simple fade out on scroll
  const opacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <section
      ref={heroRef}
      style={{
        backgroundColor: 'var(--bg-primary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="mystical-vignette"
    >
      {/* Main Content - Centered */}
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          opacity: opacity,
          transition: 'opacity 0.1s ease-out',
        }}
      >
        {/* Headline - Single, Massive, Centered */}
        <h1
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: '700',
            lineHeight: '1.0',
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            marginBottom: '4rem',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease-out 0.5s',
          }}
        >
          The Archive Awakens
        </h1>

        {/* CTA Button - Minimal */}
        <button
          onClick={scrollToBuilder}
          style={{
            padding: '1.5rem 3.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            backgroundColor: 'var(--brand-red)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'inline-block',
            transition: 'all 0.3s var(--ease-premium)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transitionDelay: '1.2s',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Begin
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: 'var(--text-muted)',
          opacity: isVisible && scrollProgress < 0.3 ? 0.5 : 0,
          transition: 'opacity 0.6s ease-out 1.8s',
          animation: 'float-particle 3s ease-in-out infinite',
          zIndex: 1,
        }}
      >
        ↓
      </div>
    </section>
  );
}
