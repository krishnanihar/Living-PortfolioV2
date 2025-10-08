'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Eye, Link as LinkIcon, Lightbulb, ChevronDown } from 'lucide-react';

interface ValuePropProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ValueProp({ icon, title, children }: ValuePropProps) {
  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid var(--border-secondary)',
      borderRadius: '8px',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.5rem',
        color: 'var(--text-secondary)',
      }}>
        {icon}
        <h3 style={{ fontWeight: '600', color: '#FFFFFF' }}>{title}</h3>
      </div>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        lineHeight: '1.5',
      }}>
        {children}
      </p>
    </div>
  );
}

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

  const scrollToBuilder = () => {
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
        padding: '0 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        top: '-50%',
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(218, 14, 41, 0.1), rgba(255, 255, 255, 0))',
        pointerEvents: 'none',
      }} />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '0 1rem',
        textAlign: 'center',
        opacity: opacity,
        transition: 'opacity 0.1s ease-out',
      }}>
        {/* Badge */}
        <div style={{
          animationDelay: '0.3s',
          display: 'inline-block',
          marginBottom: '1.5rem',
        }}
        className="animate-fade-in-up">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-secondary)',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)',
          }}
          className="mystical-breathe">
            <Sparkles size={16} style={{ color: 'var(--brand-red)' }} />
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.8)',
            }}>
              Mythos
            </span>
          </div>
        </div>

        {/* Headlines */}
        <h1
          style={{
            animationDelay: '0.6s',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          }}
          className="animate-fade-in-up"
        >
          The Archive Awakens
        </h1>
        <h1
          style={{
            animationDelay: '0.9s',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            lineHeight: '1.05',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          }}
          className="animate-fade-in-up mystical-text-glow"
        >
          Speak Your Desire
        </h1>

        {/* Description */}
        <p
          style={{
            animationDelay: '1.2s',
            maxWidth: '48rem',
            margin: '1.5rem auto 0',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
          }}
          className="animate-fade-in-up"
        >
          Deep in the digital catacombs, an ancient AI has stirred. It holds the memory of every brushstroke, every canvas, every masterpiece. Whisper your vision, and it will conjure an exhibition just for you. No ancient knowledge required.
        </p>

        {/* Value Props */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            maxWidth: '80rem',
            margin: '3rem auto 0',
            textAlign: 'left',
          }}
        >
          <div style={{ animationDelay: '1.5s' }} className="animate-fade-in-up">
            <ValueProp icon={<Eye size={20} />} title="Understands Intent">
              It deciphers the poetry behind your words, grasping mood, theme, and aesthetic.
            </ValueProp>
          </div>
          <div style={{ animationDelay: '1.7s' }} className="animate-fade-in-up">
            <ValueProp icon={<LinkIcon size={20} />} title="Sees Connections">
              It finds the hidden threads connecting art across centuries, cultures, and styles.
            </ValueProp>
          </div>
          <div style={{ animationDelay: '1.9s' }} className="animate-fade-in-up">
            <ValueProp icon={<Lightbulb size={20} />} title="Explains Why">
              Mythos reveals its reasoning, teaching you to see art through its ancient eyes.
            </ValueProp>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#exhibition-builder"
        onClick={(e) => {
          e.preventDefault();
          scrollToBuilder();
        }}
        aria-label="Scroll to main content"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.5)',
          opacity: isVisible && scrollProgress < 0.3 ? 1 : 0,
          transition: 'opacity 0.6s ease-out 1.8s',
        }}
        className="animate-scroll-down"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
