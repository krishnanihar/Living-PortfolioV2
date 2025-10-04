'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Sparkles,
  Layers,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  Map
} from 'lucide-react';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const journeyMilestones = [
    { year: '2005', label: 'The Spark', id: 'hyderabad-roots' },
    { year: '2018', label: 'BFA', id: 'undergrad-2018' },
    { year: '2021', label: 'NID', id: 'nid-2021' },
    { year: '2024', label: 'Air India', id: 'air-india-2024' },
  ];

  const featuredWork = [
    {
      title: 'Air India Design System',
      description: 'Scalable design system serving 450+ daily users',
      link: '/work',
      gradient: 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.05))',
    },
    {
      title: 'Pixel Radar',
      description: 'Real-time data visualization dashboard',
      link: '/work',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))',
    },
    {
      title: 'Metamorphic Fractal Reflections',
      description: 'Generative art installation with particle systems',
      link: '/work/metamorphic-fractal-reflections',
      gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.05))',
    },
    {
      title: 'Latent Space',
      description: 'Speculative design exploring AI consciousness',
      link: '/work/latent-space',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
    },
  ];

  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      paddingTop: '120px',
      paddingBottom: '6rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Mouse tracking background gradient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
          rgba(218, 14, 41, 0.02) 0%,
          transparent 40%)`,
        pointerEvents: 'none',
        transition: 'background 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Hero Introduction Card */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            marginBottom: '4rem',
          }}
        >
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '28px',
            padding: '3rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '2rem',
              alignItems: 'center',
              marginBottom: '2.5rem',
            }}>
              {/* Avatar Placeholder */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.05))',
                border: '2px solid rgba(218, 14, 41, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                boxShadow: '0 8px 32px rgba(218, 14, 41, 0.2)',
              }}>
                👋
              </div>

              {/* Introduction */}
              <div>
                <h1 style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '200',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em',
                }}>
                  Hi, I'm Nihar
                </h1>
                <p style={{
                  fontSize: '1.125rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '300',
                  lineHeight: '1.7',
                  letterSpacing: '0.01em',
                }}>
                  Product Designer building living interfaces at{' '}
                  <span style={{ color: 'var(--brand-red)', fontWeight: '500' }}>Air India DesignLAB</span>.
                  <br />
                  I specialize in design systems that reduce decision latency.
                </p>
              </div>
            </div>

            {/* Interactive Journey Timeline */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              {journeyMilestones.map((milestone, index) => (
                <React.Fragment key={milestone.id}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flex: 1,
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: index === journeyMilestones.length - 1
                        ? 'var(--brand-red)'
                        : 'rgba(255, 255, 255, 0.3)',
                      border: index === journeyMilestones.length - 1
                        ? '2px solid rgba(218, 14, 41, 0.5)'
                        : '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: index === journeyMilestones.length - 1
                        ? '0 0 12px rgba(218, 14, 41, 0.5)'
                        : 'none',
                      transition: 'all 0.3s ease',
                    }} />
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: index === journeyMilestones.length - 1
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                    }}>
                      {milestone.year}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontWeight: '300',
                    }}>
                      {milestone.label}
                    </div>
                  </div>
                  {index < journeyMilestones.length - 1 && (
                    <div style={{
                      flex: 1,
                      height: '1px',
                      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            animationDelay: '100ms',
            marginBottom: '4rem',
          }}
        >
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '28px',
            padding: '3rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
            }}>
              The Journey
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              fontWeight: '300',
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
            }}>
              I grew up in <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>Hyderabad</span>,
              taking apart computers and flashing custom ROMs. That curiosity led me to <span style={{ color: 'var(--brand-red)', fontWeight: '400' }}>NID</span>,
              where I learned to build interfaces that breathe.
            </p>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              fontWeight: '300',
              letterSpacing: '0.01em',
              marginBottom: '1.5rem',
            }}>
              Now at <span style={{ color: 'var(--brand-red)', fontWeight: '400' }}>Air India</span>,
              I'm designing for <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>450+ daily users</span>,
              creating systems that help airline operations move faster.
            </p>
            <Link href="/journey" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--brand-red)',
              fontSize: '0.9375rem',
              fontWeight: '400',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}>
              <Map size={16} />
              Explore full journey timeline
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Three Pillars Grid */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            animationDelay: '200ms',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Current Focus Card */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '28px',
            padding: '2.5rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <Briefcase size={32} style={{ color: 'var(--brand-red)', marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)',
            }}>
              Right Now
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontWeight: '300',
              marginBottom: '1rem',
            }}>
              Building design systems at Air India. 450+ daily users. Aviation UX.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '0.375rem 0.75rem',
              background: 'rgba(34, 197, 94, 0.1)',
              color: 'rgba(34, 197, 94, 1)',
              fontSize: '0.8125rem',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              fontWeight: '400',
            }}>
              Open to opportunities
            </div>
          </div>

          {/* Philosophy Card */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '28px',
            padding: '2.5rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <Sparkles size={32} style={{ color: 'rgba(147, 51, 234, 0.8)', marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)',
            }}>
              Belief
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontWeight: '300',
            }}>
              Interfaces should breathe, remember, and evolve. Reduce time between thought and action.
            </p>
          </div>

          {/* Approach Card */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '28px',
            padding: '2.5rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <Layers size={32} style={{ color: 'rgba(59, 130, 246, 0.8)', marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)',
            }}>
              How I Work
            </h3>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              fontWeight: '300',
            }}>
              Systems thinking. Creative coding. Data-driven design. Prototyping first.
            </p>
          </div>
        </div>

        {/* Featured Work Preview */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            animationDelay: '300ms',
            marginBottom: '4rem',
          }}
        >
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            marginBottom: '2rem',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}>
            Featured Work
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {featuredWork.map((work, index) => (
              <Link
                key={index}
                href={work.link as any}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{
                  position: 'relative',
                  background: work.gradient,
                  backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                  WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)',
                  }}>
                    {work.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.5',
                    fontWeight: '300',
                    marginBottom: '1rem',
                  }}>
                    {work.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--brand-red)',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                  }}>
                    View case study
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact CTA Card */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            animationDelay: '400ms',
          }}
        >
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '28px',
            padding: '3rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '200',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}>
              Let's build something together
            </h2>
            <p style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              fontWeight: '300',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
            }}>
              Whether you're hiring, collaborating, or just want to chat about design systems and living interfaces.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <a
                href="mailto:nihar@example.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  background: 'var(--brand-red)',
                  color: 'white',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(218, 14, 41, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 14, 41, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Mail size={18} />
                Email Me
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  fontWeight: '400',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  fontWeight: '400',
                  borderRadius: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Twitter size={18} />
                Twitter
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
