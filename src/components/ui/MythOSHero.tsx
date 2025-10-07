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
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E0E0E0',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
    }}>
      <div style={{ maxWidth: '900px', textAlign: 'center' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#F0F4FF',
          border: '1px solid #C3D4F5',
          borderRadius: '24px',
          marginBottom: '2rem',
          fontSize: '0.8125rem',
          fontWeight: '500',
          color: '#606060',
        }}>
          <Sparkles size={14} />
          AI-Powered Art Curator
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '600',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          color: '#1A1A1A',
          marginBottom: '1.5rem',
        }}>
          Art History Speaks
          <br />
          <span style={{ color: '#606060' }}>Your Language</span>
        </h1>

        {/* Problem Statement */}
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          color: '#606060',
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto 2rem',
        }}>
          Ever walked through a museum feeling lost? Art history wasn't written for you—centuries of elite knowledge, locked behind academic language.
        </p>

        {/* Solution */}
        <div style={{
          backgroundColor: '#FAFAFA',
          border: '1px solid #E8E8E8',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#9E9E9E',
            marginBottom: '1rem',
          }}>
            What if you could just... ask?
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
                color: '#9E9E9E',
                marginBottom: '0.5rem',
              }}>
                You say:
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#1A1A1A',
                fontStyle: 'italic',
              }}>
                "Art about loneliness, but beautiful"
              </div>
            </div>

            <ArrowDown size={20} color="#C0C0C0" style={{ transform: 'rotate(-90deg)' }} />

            <div>
              <div style={{
                fontSize: '0.875rem',
                color: '#9E9E9E',
                marginBottom: '0.5rem',
              }}>
                AI discovers:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {['Solitary figures', 'Empty spaces', 'Melancholic colors', '7 centuries'].map((tag) => (
                  <span key={tag} style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#E8F2FF',
                    border: '1px solid #B8DAFF',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    color: '#1A1A1A',
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
              color: '#1A1A1A',
              marginBottom: '0.5rem',
            }}>
              Understands Intent
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: '#606060',
              lineHeight: '1.5',
            }}>
              Gemini AI translates abstract feelings into visual patterns across centuries
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1A1A1A',
              marginBottom: '0.5rem',
            }}>
              Sees Connections
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: '#606060',
              lineHeight: '1.5',
            }}>
              Discovers patterns human curators might take years to notice
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1A1A1A',
              marginBottom: '0.5rem',
            }}>
              Explains Why
            </div>
            <div style={{
              fontSize: '0.9375rem',
              color: '#606060',
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
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Sparkles size={18} />
          Generate Your First Exhibition
        </button>

        <div style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#9E9E9E',
        }}>
          No art history degree required
        </div>
      </div>
    </section>
  );
}
