'use client';

import { Sparkles, ArrowDown, Eye, Network, Lightbulb } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function MythOSHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth <= 768);

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const heroHeight = heroRect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      const scrolled = -heroRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (heroHeight - windowHeight)));

      setScrollProgress(progress);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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

  // Calculate opacity and transforms for progressive reveal
  const badgeOpacity = Math.max(0, 1 - scrollProgress * 2);
  const headlineOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const descriptionOpacity = Math.max(0, 1 - scrollProgress * 1.2);
  const cardOpacity = Math.max(0, 1 - scrollProgress * 1);

  const badgeTransform = `translateY(${scrollProgress * -30}px)`;
  const headlineTransform = `translateY(${scrollProgress * -40}px)`;
  const descriptionTransform = `translateY(${scrollProgress * -35}px)`;

  return (
    <section
      ref={heroRef}
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-primary)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s var(--ease-premium)',
        overflow: 'hidden',
      }}
      className="mystical-vignette"
    >
      {/* Animated Background Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 20%, rgba(218, 14, 41, 0.08) 0%, transparent 50%)',
        animation: 'mystical-breathe 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Floating Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="mystical-particle"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: 'var(--mystical-particle)',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1000px', textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Badge with Pulse */}
        <div
          className={`mystical-glow badge-pulse ${isVisible ? 'hero-stagger' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--mystical-border)',
            borderRadius: 'var(--radius-full)',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--mystical-text)',
            backdropFilter: 'blur(var(--blur-md))',
            opacity: badgeOpacity,
            transform: badgeTransform,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            animationDelay: '0.3s',
          }}
        >
          <Sparkles size={16} />
          The Oracle
        </div>

        {/* Main Headline - Larger & Split Animation */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '700',
          lineHeight: '1.05',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '2rem',
          opacity: headlineOpacity,
          transform: headlineTransform,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
        }}>
          <div
            className={`rune-glow ${isVisible ? 'hero-stagger' : ''}`}
            style={{
              animationDelay: '0.5s',
              marginBottom: '0.5rem',
            }}
          >
            The Archive Awakens
          </div>
          <div
            className={`gradient-text ${isVisible ? 'hero-stagger' : ''}`}
            style={{
              animationDelay: '0.7s',
              fontSize: 'clamp(2rem, 6vw, 4rem)',
            }}
          >
            Speak Your Desire
          </div>
        </h1>

        {/* Description */}
        <p
          className={isVisible ? 'hero-stagger' : ''}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
            lineHeight: '1.6',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            maxWidth: '750px',
            margin: '0 auto 3rem',
            opacity: descriptionOpacity,
            transform: descriptionTransform,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            animationDelay: '0.8s',
          }}
        >
          Deep in the digital catacombs, an ancient AI has witnessed every artwork ever created. When you speak your desires, it weaves exhibitions from memory-threads invisible to mortal eyes.
        </p>

        {/* Enhanced Ritual Card */}
        <div
          className={isVisible ? 'hero-stagger' : ''}
          style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--mystical-border)',
            borderRadius: 'var(--radius-xl)',
            padding: isMobile ? '1.5rem' : 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '3rem',
            textAlign: 'left',
            backdropFilter: 'blur(var(--blur-lg))',
            opacity: cardOpacity,
            transition: 'opacity 0.15s ease-out, all 0.3s var(--ease-premium)',
            animationDelay: '1.1s',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(218, 14, 41, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.08)';
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--mystical-glow)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              width: '24px',
              height: '1px',
              backgroundColor: 'var(--mystical-glow)',
            }} />
            The Ritual of Summoning
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)',
                marginBottom: '0.75rem',
                fontWeight: '500',
              }}>
                You whisper:
              </div>
              <div style={{
                fontSize: '1.0625rem',
                color: 'var(--mystical-text)',
                fontStyle: 'italic',
                padding: '0.75rem',
                backgroundColor: 'rgba(218, 14, 41, 0.03)',
                borderRadius: '8px',
                border: '1px solid var(--mystical-border)',
              }}>
                "Art about loneliness, but beautiful"
              </div>
            </div>

            {!isMobile && (
              <div style={{ animation: 'flow-arrow 2s ease-in-out infinite' }}>
                <ArrowDown size={20} color="var(--mystical-glow)" />
              </div>
            )}

            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)',
                marginBottom: '0.75rem',
                fontWeight: '500',
              }}>
                The Oracle reveals:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {['Solitary figures', 'Empty spaces', 'Melancholic colors', '7 centuries'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.375rem 0.875rem',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--mystical-border)',
                      borderRadius: 'var(--radius-base)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-secondary)',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    className="mystical-spotlight"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = 'rgba(218, 14, 41, 0.08)';
                      e.currentTarget.style.borderColor = 'var(--mystical-glow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                      e.currentTarget.style.borderColor = 'var(--mystical-border)';
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Value Props with Icons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          marginBottom: '3rem',
          textAlign: 'left',
          opacity: cardOpacity,
          transition: 'opacity 0.15s ease-out',
        }}>
          {[
            { icon: Eye, title: 'Understands Intent', desc: 'Gemini AI translates abstract feelings into visual patterns across centuries', delay: '1.4s' },
            { icon: Network, title: 'Sees Connections', desc: 'Discovers patterns human curators might take years to notice', delay: '1.6s' },
            { icon: Lightbulb, title: 'Explains Why', desc: 'Every artwork comes with AI analysis: symbolism, context, significance', delay: '1.8s' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={isVisible ? 'hero-stagger' : ''}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--surface-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  backdropFilter: 'blur(var(--blur-md))',
                  transition: 'all 0.3s var(--ease-premium)',
                  animationDelay: item.delay,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.borderColor = 'var(--mystical-border)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 14, 41, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(218, 14, 41, 0.1)',
                  border: '1px solid var(--mystical-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--mystical-glow)',
                }}>
                  0{index + 1}
                </div>

                <Icon size={28} color="var(--mystical-glow)" style={{ marginBottom: '1rem' }} />
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Button */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={scrollToBuilder}
            className={`mystical-glow ${isVisible ? 'hero-stagger' : ''}`}
            style={{
              padding: isMobile ? '1rem 2rem' : '1.125rem 2.75rem',
              fontSize: '1.0625rem',
              fontWeight: '600',
              backgroundColor: 'var(--brand-red)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s var(--ease-premium)',
              opacity: cardOpacity,
              animationDelay: '2.0s',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(218, 14, 41, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(218, 14, 41, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(218, 14, 41, 0.3)';
            }}
          >
            <Sparkles size={20} />
            Summon Your First Exhibition
          </button>
        </div>

        <div
          className={isVisible ? 'hero-stagger' : ''}
          style={{
            marginTop: '1.25rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            opacity: cardOpacity,
            animationDelay: '2.2s',
          }}
        >
          No ancient knowledge required
        </div>
      </div>
    </section>
  );
}
