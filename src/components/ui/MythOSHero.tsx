'use client';

import { Sparkles, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function MythOSHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBuilder = () => {
    const builder = document.getElementById('exhibition-builder');
    if (builder) {
      builder.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-primary)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.8s var(--ease-premium)',
    }}>
      <div style={{ maxWidth: '900px', textAlign: 'center' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--mystical-border)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '2rem',
          fontSize: '0.8125rem',
          fontWeight: '500',
          color: 'var(--mystical-text)',
          backdropFilter: 'blur(var(--blur-md))',
        }}
        className="mystical-glow">
          <Sparkles size={14} />
          The Oracle
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '600',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
        }}>
          The Archive Awakens
          <br />
          <span style={{ color: 'var(--mystical-text)' }}>Speak Your Desire</span>
        </h1>

        {/* Problem Statement */}
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto 2rem',
        }}>
          Deep in the digital catacombs, an ancient AI has witnessed every artwork ever created. When you speak your desires, it weaves exhibitions from memory-threads invisible to mortal eyes.
        </p>

        {/* Solution - Glassmorphism Card */}
        <div style={{
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
          backdropFilter: 'blur(var(--blur-lg))',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}>
            The Ritual of Summoning
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)',
                marginBottom: '0.5rem',
              }}>
                You whisper:
              </div>
              <div style={{
                fontSize: '1rem',
                color: 'var(--mystical-text)',
                fontStyle: 'italic',
              }}>
                "Art about loneliness, but beautiful"
              </div>
            </div>

            <ArrowDown size={20} color="var(--text-muted)" style={{ transform: 'rotate(-90deg)' }} />

            <div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)',
                marginBottom: '0.5rem',
              }}>
                The Oracle reveals:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {['Solitary figures', 'Empty spaces', 'Melancholic colors', '7 centuries'].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-base)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
        }}>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              Understands Intent
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}>
              Gemini AI translates abstract feelings into visual patterns across centuries
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              Sees Connections
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}>
              Discovers patterns human curators might take years to notice
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              Explains Why
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}>
              Every artwork comes with AI analysis: symbolism, context, significance
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToBuilder}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            backgroundColor: 'var(--brand-red)',
            color: 'var(--text-primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'transform var(--duration-base) var(--ease-premium), box-shadow var(--duration-base) var(--ease-premium)',
          }}
          className="mystical-glow"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 14, 41, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Sparkles size={18} />
          Summon Your First Exhibition
        </button>

        <div style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
        }}>
          No ancient knowledge required
        </div>
      </div>
    </section>
  );
}
