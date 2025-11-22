'use client';

import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Compass, Beaker } from 'lucide-react';

/**
 * Full Navigation Demo - Aurora Mesh Gradient Effect
 *
 * Showcases the Aurora Mesh gradient glow effect in a realistic navigation context
 * with all actual nav items (Home, Work, About, Journey, Labs)
 */

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Work', icon: Briefcase, href: '/work' },
  { name: 'About', icon: User, href: '/about' },
  { name: 'Journey', icon: Compass, href: '/journey' },
  { name: 'Labs', icon: Beaker, href: '/labs' },
];

// Navigation constants (from PortfolioNavigation.tsx)
const SCROLL_THRESHOLD = 50;
const NAV_FLOATING_OFFSET = 12;
const NAV_WIDTH_OFFSET = 48;
const NAV_BORDER_RADIUS = 16;
const NAV_MAX_WIDTH = 'clamp(1200px, 90vw, 1400px)';

export default function NavDemoPage() {
  const [activeNav, setActiveNav] = useState('/work');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Responsive nav heights
  const navHeight = {
    normal: 56,
    scrolled: 52,
  };

  useEffect(() => {
    setMounted(true);

    // Scroll detection
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        padding: '2rem',
      }}
    >
      {/* Demo Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: scrolled ? `${NAV_FLOATING_OFFSET}px` : '0',
          left: 0,
          right: 0,
          zIndex: 9999,
          height: scrolled ? `${navHeight.scrolled}px` : `${navHeight.normal}px`,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          width: scrolled ? `calc(100% - ${NAV_WIDTH_OFFSET}px)` : '100%',
          maxWidth: scrolled ? NAV_MAX_WIDTH : '100%',
          margin: '0 auto',
          borderRadius: scrolled ? `${NAV_BORDER_RADIUS}px` : '0',
          overflow: scrolled ? 'hidden' : 'visible',
        }}
      >
        {/*
          Multi-layer glassmorphism system (5 layers):
          1. Base: Radial + linear gradients for depth
          2. Backdrop filter: 80px blur + 200% saturation when scrolled (iOS 18 aesthetic)
          3. Multi-shadow system: Inset highlights + drop shadows
          4. Shimmer overlay: Animated gradient sweep (8s loop)
          5. Liquid glass: Diagonal reflection with overlay blend mode
        */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: scrolled
            ? `radial-gradient(ellipse 200% 100% at top, rgba(255, 255, 255, 0.04) 0%, transparent 50%),
               linear-gradient(135deg,
                 rgba(10, 10, 10, 0.3) 0%,
                 rgba(0, 0, 0, 0.2) 50%,
                 rgba(10, 10, 10, 0.3) 100%)`
            : 'transparent',
          backdropFilter: scrolled ? 'blur(80px) saturate(200%) brightness(0.95)' : 'blur(20px) saturate(120%)',
          WebkitBackdropFilter: scrolled ? 'blur(80px) saturate(200%) brightness(0.95)' : 'blur(20px) saturate(120%)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.10)' : '1px solid transparent',
          boxShadow: scrolled
            ? `inset 0 1px 2px rgba(255, 255, 255, 0.1),
               inset 0 -1px 2px rgba(0, 0, 0, 0.6),
               inset 0 0 30px rgba(255, 255, 255, 0.01),
               0 8px 32px rgba(0, 0, 0, 0.6),
               0 20px 60px rgba(0, 0, 0, 0.3),
               0 0 0 1px rgba(255, 255, 255, 0.02)`
            : 'none',
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: scrolled ? 'transform, box-shadow' : 'auto',
        }}>
          {/* Animated shimmer overlay - only visible when scrolled */}
          {scrolled && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
              animation: 'shimmer 8s linear infinite',
              pointerEvents: 'none',
            }} />
          )}

          {/* Liquid Glass reflection layer - diagonal gradient overlay */}
          {scrolled && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg,
                rgba(255, 255, 255, 0.05) 0%,
                transparent 20%,
                transparent 80%,
                rgba(255, 255, 255, 0.03) 100%)`,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
              borderRadius: 'inherit',
            }} />
          )}
        </div>

        {/* Content container with relative positioning */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Ambient Aurora Reflection - Entire Nav Bar */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: scrolled ? `${NAV_BORDER_RADIUS}px` : '0',
              background: activeNav === '/'
                ? 'radial-gradient(ellipse 600px 200px at 15% 50%, rgba(180, 210, 240, 0.12), rgba(120, 180, 240, 0.06) 40%, transparent 70%)'
                : activeNav === '/work'
                ? 'radial-gradient(ellipse 600px 200px at 70% 50%, rgba(180, 210, 240, 0.12), rgba(120, 180, 240, 0.06) 40%, transparent 70%)'
                : activeNav === '/about'
                ? 'radial-gradient(ellipse 600px 200px at 78% 50%, rgba(180, 210, 240, 0.12), rgba(120, 180, 240, 0.06) 40%, transparent 70%)'
                : activeNav === '/journey'
                ? 'radial-gradient(ellipse 600px 200px at 86% 50%, rgba(180, 210, 240, 0.12), rgba(120, 180, 240, 0.06) 40%, transparent 70%)'
                : activeNav === '/labs'
                ? 'radial-gradient(ellipse 600px 200px at 94% 50%, rgba(180, 210, 240, 0.12), rgba(120, 180, 240, 0.06) 40%, transparent 70%)'
                : 'none',
              filter: 'blur(50px)',
              transition: 'background 0.6s ease',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Logo */}
          <button
              onClick={() => setActiveNav('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Home
                size={18}
                style={{
                  color: activeNav === '/' ? 'rgba(180, 210, 240, 1)' : 'rgba(255, 255, 255, 0.95)',
                  transition: 'color 0.3s ease',
                }}
              />
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  background: activeNav === '/'
                    ? 'linear-gradient(90deg, rgba(180, 210, 240, 0.7) 0%, rgba(180, 210, 240, 1) 30%, rgba(180, 210, 240, 1) 70%, rgba(180, 210, 240, 0.7) 100%)'
                    : 'linear-gradient(90deg, rgba(180, 210, 240, 0.6) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.95) 70%, rgba(180, 210, 240, 0.6) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: activeNav === '/'
                    ? 'drop-shadow(0 0 25px rgba(180, 210, 240, 0.3)) drop-shadow(0 0 12px rgba(180, 210, 240, 0.2))'
                    : 'drop-shadow(0 0 20px rgba(180, 210, 240, 0.2)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))',
                  transition: 'all 0.3s ease',
                }}
              >
                Krishna
              </span>

              {/* Aurora Mesh - Only for active state */}
              {activeNav === '/' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-20px',
                    borderRadius: '12px',
                    background: `
                      radial-gradient(ellipse at 20% 50%, rgba(180, 210, 240, 0.25), transparent 60%),
                      radial-gradient(ellipse at 80% 50%, rgba(100, 180, 255, 0.20), transparent 60%),
                      radial-gradient(ellipse at 50% 20%, rgba(150, 200, 255, 0.15), transparent 50%),
                      linear-gradient(135deg, rgba(180, 210, 240, 0.08) 0%, transparent 50%, rgba(120, 190, 255, 0.08) 100%)
                    `,
                    backgroundSize: '250% 250%',
                    animation: 'auroraDrift 4s ease-in-out infinite',
                    filter: 'blur(20px)',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
              )}

              {/* Simple Radial Glow - Only for inactive home on hover */}
              {activeNav !== '/' && (
                <div
                  className="hover-glow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    background: 'radial-gradient(ellipse 90% 60% at center, rgba(180, 210, 240, 0.28) 0%, rgba(180, 210, 240, 0.12) 40%, transparent 75%)',
                    filter: 'blur(12px)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
              )}
          </button>

          {/* Nav Items */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.href;

              return (
                <button
                    key={item.href}
                    onClick={() => setActiveNav(item.href)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.70)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                      zIndex: 1,
                    }}
                  >
                    <Icon size={15} />
                    <span>{item.name}</span>

                    {/* Aurora Mesh - Only for active state */}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: '-20px',
                          borderRadius: '12px',
                          background: `
                            radial-gradient(ellipse at 20% 50%, rgba(180, 210, 240, 0.25), transparent 60%),
                            radial-gradient(ellipse at 80% 50%, rgba(100, 180, 255, 0.20), transparent 60%),
                            radial-gradient(ellipse at 50% 20%, rgba(150, 200, 255, 0.15), transparent 50%),
                            linear-gradient(135deg, rgba(180, 210, 240, 0.08) 0%, transparent 50%, rgba(120, 190, 255, 0.08) 100%)
                          `,
                          backgroundSize: '250% 250%',
                          animation: 'auroraDrift 4s ease-in-out infinite',
                          filter: 'blur(20px)',
                          pointerEvents: 'none',
                          zIndex: -1,
                        }}
                      />
                    )}

                    {/* Simple Radial Glow - Only for inactive items on hover */}
                    {!isActive && (
                      <div
                        className="hover-glow"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '12px',
                          background: 'radial-gradient(ellipse 90% 60% at center, rgba(180, 210, 240, 0.28) 0%, rgba(180, 210, 240, 0.12) 40%, transparent 75%)',
                          filter: 'blur(12px)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          pointerEvents: 'none',
                          zIndex: -1,
                        }}
                      />
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div
        style={{
          maxWidth: '900px',
          margin: '8rem auto 0',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            background: 'linear-gradient(90deg, rgba(180, 210, 240, 0.7) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.95) 70%, rgba(180, 210, 240, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
          }}
        >
          Aurora Mesh Navigation
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.70)',
            marginBottom: '3rem',
            lineHeight: 1.6,
          }}
        >
          Multi-gradient mesh with animated drift creates a living, breathing glow effect.
          Click any nav item to see the Aurora Mesh in action.
        </p>

        {/* Effect Details Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '3rem',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '1.5rem',
            }}
          >
            Effect Details
          </h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'rgba(255, 255, 255, 0.90)' }}>Gradient Layers:</strong>
              <p style={{ color: 'rgba(255, 255, 255, 0.60)', marginTop: '0.25rem' }}>
                4 overlapping radial gradients at different positions (20%, 50%, 80%) with varying blue tones (180-210, 100-180, 150-200, 120-190)
              </p>
            </div>

            <div>
              <strong style={{ color: 'rgba(255, 255, 255, 0.90)' }}>Animation:</strong>
              <p style={{ color: 'rgba(255, 255, 255, 0.60)', marginTop: '0.25rem' }}>
                4-second ease-in-out infinite drift with 250% background-size • Dynamic blur (16-20px) and saturation (1.0-1.2x) during animation
              </p>
            </div>

            <div>
              <strong style={{ color: 'rgba(255, 255, 255, 0.90)' }}>Opacity Range:</strong>
              <p style={{ color: 'rgba(255, 255, 255, 0.60)', marginTop: '0.25rem' }}>
                15-25% opacity across gradient layers for subtle yet visible effect
              </p>
            </div>

            <div>
              <strong style={{ color: 'rgba(255, 255, 255, 0.90)' }}>Blur:</strong>
              <p style={{ color: 'rgba(255, 255, 255, 0.60)', marginTop: '0.25rem' }}>
                20px blur filter with animated saturation boost creates soft, natural glow
              </p>
            </div>

            <div>
              <strong style={{ color: 'rgba(255, 255, 255, 0.90)' }}>Performance:</strong>
              <p style={{ color: 'rgba(255, 255, 255, 0.60)', marginTop: '0.25rem' }}>
                GPU-accelerated CSS animations • 60fps smooth rendering • No JavaScript calculations
              </p>
            </div>
          </div>
        </div>

        {/* Current Active Indicator */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.60)', marginBottom: '0.5rem' }}>
            Currently Active:
          </p>
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'rgba(180, 210, 240, 1)',
            }}
          >
            {activeNav === '/' ? 'Home' : NAV_ITEMS.find(i => i.href === activeNav)?.name || 'None'}
          </p>
        </div>

        {/* Scroll Test Sections */}
        <div style={{ marginTop: '4rem', display: 'grid', gap: '3rem' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((section) => (
            <div
              key={section}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '20px',
                padding: '2.5rem',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.90)',
                  marginBottom: '1rem',
                }}
              >
                Test Section {section}
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.60)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                Scroll down to see the navigation transform from full-width to floating mode.
                The glassmorphic effects intensify when scrolled, with stronger blur, enhanced
                shadows, and the shimmer animation activating.
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.60)',
                  lineHeight: 1.7,
                }}
              >
                The navigation floats at 12px from the top, narrows by 48px, and gains a 16px
                border radius. The 5-layer glassmorphism system creates an iOS 18-level
                sophisticated glass surface with animated shimmer and liquid glass reflections.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes and Hover Styles */}
      <style jsx global>{`
        @keyframes auroraDrift {
          0%, 100% {
            background-position: 0% 50%;
            filter: blur(20px) saturate(1);
          }
          25% {
            background-position: 100% 25%;
            filter: blur(16px) saturate(1.2);
          }
          50% {
            background-position: 100% 75%;
            filter: blur(20px) saturate(1);
          }
          75% {
            background-position: 0% 100%;
            filter: blur(16px) saturate(1.2);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Simple radial glow hover effect - only for inactive items */
        button:hover .hover-glow {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
