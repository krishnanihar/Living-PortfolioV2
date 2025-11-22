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

export default function NavDemoPage() {
  const [activeNav, setActiveNav] = useState('/work');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'calc(100% - 48px)',
          maxWidth: 'clamp(1200px, 90vw, 1400px)',
        }}
      >
        {/* Multi-layer glassmorphism container */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(80px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: '16px',
            padding: '0.75rem 1.5rem',
            boxShadow: `
              0 2px 8px rgba(0, 0, 0, 0.4),
              0 1px 2px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.08)
            `,
          }}
        >
          {/* Shimmer overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Nav content */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
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
                <>
                  {/* Background Aurora Glow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-20px',
                      borderRadius: '12px',
                      background: `
                        radial-gradient(ellipse at 20% 50%, rgba(180, 210, 240, 0.35), transparent 60%),
                        radial-gradient(ellipse at 80% 50%, rgba(100, 180, 255, 0.28), transparent 60%),
                        radial-gradient(ellipse at 50% 20%, rgba(150, 200, 255, 0.22), transparent 50%),
                        linear-gradient(135deg, rgba(180, 210, 240, 0.12) 0%, transparent 50%, rgba(120, 190, 255, 0.12) 100%)
                      `,
                      backgroundSize: '250% 250%',
                      animation: 'auroraDrift 4s ease-in-out infinite',
                      filter: 'blur(24px)',
                      pointerEvents: 'none',
                      zIndex: -2,
                    }}
                  />

                  {/* Glass Reflection Layer */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '12px',
                      background: `
                        radial-gradient(ellipse 100% 80% at center, rgba(180, 210, 240, 0.15), transparent 70%)
                      `,
                      backgroundSize: '200% 200%',
                      animation: 'auroraDrift 4s ease-in-out infinite',
                      filter: 'blur(20px)',
                      pointerEvents: 'none',
                      zIndex: -1,
                    }}
                  />

                  {/* Glow Border */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '12px',
                      boxShadow: `
                        0 0 20px rgba(180, 210, 240, 0.4),
                        0 0 40px rgba(180, 210, 240, 0.2),
                        inset 0 0 20px rgba(180, 210, 240, 0.1)
                      `,
                      pointerEvents: 'none',
                      zIndex: -1,
                    }}
                  />
                </>
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
                      <>
                        {/* Background Aurora Glow */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: '-20px',
                            borderRadius: '12px',
                            background: `
                              radial-gradient(ellipse at 20% 50%, rgba(180, 210, 240, 0.35), transparent 60%),
                              radial-gradient(ellipse at 80% 50%, rgba(100, 180, 255, 0.28), transparent 60%),
                              radial-gradient(ellipse at 50% 20%, rgba(150, 200, 255, 0.22), transparent 50%),
                              linear-gradient(135deg, rgba(180, 210, 240, 0.12) 0%, transparent 50%, rgba(120, 190, 255, 0.12) 100%)
                            `,
                            backgroundSize: '250% 250%',
                            animation: 'auroraDrift 4s ease-in-out infinite',
                            filter: 'blur(24px)',
                            pointerEvents: 'none',
                            zIndex: -2,
                          }}
                        />

                        {/* Glass Reflection Layer */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '12px',
                            background: `
                              radial-gradient(ellipse 100% 80% at center, rgba(180, 210, 240, 0.15), transparent 70%)
                            `,
                            backgroundSize: '200% 200%',
                            animation: 'auroraDrift 4s ease-in-out infinite',
                            filter: 'blur(20px)',
                            pointerEvents: 'none',
                            zIndex: -1,
                          }}
                        />

                        {/* Glow Border */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '12px',
                            boxShadow: `
                              0 0 20px rgba(180, 210, 240, 0.4),
                              0 0 40px rgba(180, 210, 240, 0.2),
                              inset 0 0 20px rgba(180, 210, 240, 0.1)
                            `,
                            pointerEvents: 'none',
                            zIndex: -1,
                          }}
                        />
                      </>
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

        /* Simple radial glow hover effect - only for inactive items */
        button:hover .hover-glow {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
