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
  Map,
  BookOpen,
  Gamepad2
} from 'lucide-react';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [avatarEmoji, setAvatarEmoji] = useState('👋');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

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

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Avatar emoji rotation (every 3 seconds)
  useEffect(() => {
    const emojis = ['👋', '🎨', '💻', '✨'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emojis.length;
      setAvatarEmoji(emojis[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const journeyMilestones = [
    {
      year: '2005',
      label: 'The Spark',
      id: 'hyderabad-roots',
      detail: 'Growing up in Hyderabad, tinkering with computers and flashing custom ROMs. The beginning of a lifelong curiosity.'
    },
    {
      year: '2018',
      label: 'BFA',
      id: 'undergrad-2018',
      detail: 'Bachelor of Fine Arts - exploring visual design, typography, and the foundations of creative thinking.'
    },
    {
      year: '2021',
      label: 'NID',
      id: 'nid-2021',
      detail: 'National Institute of Design Masters program - learning to build interfaces that breathe and systems thinking.'
    },
    {
      year: '2024',
      label: 'Air India',
      id: 'air-india-2024',
      detail: 'Leading design transformation at Air India DesignLAB - building systems that serve 450+ daily users in aviation operations.'
    },
  ];

  const handleEmailCopy = () => {
    navigator.clipboard.writeText('nihar@example.com');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const currentlyReading = [
    {
      title: 'Gödel, Escher, Bach',
      author: 'Douglas Hofstadter',
      impact: 'Strange loops and self-reference shape how I think about recursive design systems and emergent complexity.',
      gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.05))',
    },
    {
      title: 'I Am a Strange Loop',
      author: 'Douglas Hofstadter',
      impact: 'Consciousness emerging from patterns. Every interface is a loop between user intention and system feedback.',
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05))',
    },
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      impact: 'Affordances and signifiers. The foundation of my belief that interfaces should reduce cognitive load.',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))',
    },
    {
      title: 'Thinking in Systems',
      author: 'Donella Meadows',
      impact: 'Systems thinking informs every design decision—seeing connections, feedback loops, and leverage points.',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))',
    },
  ];

  const currentlyPlaying = [
    {
      title: "Baldur's Gate 3",
      studio: 'Larian Studios',
      impact: 'Emergent narratives from systemic design. Every choice branches into consequence trees—pure systems thinking.',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
    },
    {
      title: 'Red Dead Redemption 2',
      studio: 'Rockstar Games',
      impact: 'Attention to detail and world-building. Every animation, every interaction designed to feel alive and breathing.',
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
    },
    {
      title: 'Half-Life: Alyx',
      studio: 'Valve',
      impact: 'Spatial interfaces and presence. VR taught me how physical affordances translate to digital interactions.',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
    },
    {
      title: 'Detroit: Become Human',
      studio: 'Quantic Dream',
      impact: 'Choice architecture and consequence visualization. Flowcharts as narrative design systems.',
      gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05))',
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

        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 100,
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--brand-red), rgba(218, 14, 41, 0.6))',
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 8px rgba(218, 14, 41, 0.5)',
        }} />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.75rem 1.5rem',
          background: 'var(--surface-primary)',
          backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
          WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '16px',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          fontWeight: '400',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
          zIndex: 1000,
          animation: 'toastSlideIn 0.3s ease-out',
        }}>
          <span style={{ color: 'rgba(34, 197, 94, 1)' }}>✓</span> Email copied to clipboard
        </div>
      )}

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
              {/* Avatar with Rotating Emoji */}
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
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <span style={{
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'inline-block',
                }}>
                  {avatarEmoji}
                </span>
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
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                {journeyMilestones.map((milestone, index) => (
                  <React.Fragment key={milestone.id}>
                    <div
                      onClick={() => setActiveTimeline(activeTimeline === milestone.id ? null : milestone.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flex: 1,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{
                        width: activeTimeline === milestone.id ? '16px' : '12px',
                        height: activeTimeline === milestone.id ? '16px' : '12px',
                        borderRadius: '50%',
                        background: index === journeyMilestones.length - 1 || activeTimeline === milestone.id
                          ? 'var(--brand-red)'
                          : 'rgba(255, 255, 255, 0.3)',
                        border: index === journeyMilestones.length - 1 || activeTimeline === milestone.id
                          ? '2px solid rgba(218, 14, 41, 0.5)'
                          : '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: index === journeyMilestones.length - 1 || activeTimeline === milestone.id
                          ? '0 0 12px rgba(218, 14, 41, 0.5)'
                          : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }} />
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: activeTimeline === milestone.id || index === journeyMilestones.length - 1
                          ? 'var(--text-primary)'
                          : 'var(--text-muted)',
                        transition: 'color 0.3s ease',
                      }}>
                        {milestone.year}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: activeTimeline === milestone.id ? 'var(--brand-red)' : 'var(--text-muted)',
                        fontWeight: activeTimeline === milestone.id ? '400' : '300',
                        transition: 'all 0.3s ease',
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

              {/* Timeline Detail Expansion */}
              {activeTimeline && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  background: 'rgba(218, 14, 41, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(218, 14, 41, 0.2)',
                  animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    fontWeight: '300',
                    margin: 0,
                  }}>
                    {journeyMilestones.find(m => m.id === activeTimeline)?.detail}
                  </p>
                </div>
              )}
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

        {/* Currently Reading & Playing */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            animationDelay: '300ms',
            marginBottom: '4rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              marginBottom: '0.75rem',
              color: 'var(--text-primary)',
            }}>
              Currently Reading & Playing
            </h2>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-muted)',
              fontWeight: '300',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Books and games shaping how I think about design, systems, and storytelling
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
          }}>
            {/* Books Column */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}>
                <BookOpen size={20} style={{ color: 'var(--brand-red)' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Books
                </h3>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                {currentlyReading.map((book, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      background: book.gradient,
                      backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                      WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    }}
                  >
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      marginBottom: '0.25rem',
                      color: 'var(--text-primary)',
                    }}>
                      {book.title}
                    </h4>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                      fontWeight: '300',
                      marginBottom: '0.75rem',
                    }}>
                      {book.author}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      fontWeight: '300',
                      fontStyle: 'italic',
                    }}>
                      {book.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Games Column */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}>
                <Gamepad2 size={20} style={{ color: 'var(--brand-red)' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Games
                </h3>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                {currentlyPlaying.map((game, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      background: game.gradient,
                      backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                      WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    }}
                  >
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      marginBottom: '0.25rem',
                      color: 'var(--text-primary)',
                    }}>
                      {game.title}
                    </h4>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                      fontWeight: '300',
                      marginBottom: '0.75rem',
                    }}>
                      {game.studio}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      fontWeight: '300',
                      fontStyle: 'italic',
                    }}>
                      {game.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
              <button
                onClick={handleEmailCopy}
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
                  border: '1px solid rgba(218, 14, 41, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
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
                Copy Email
              </button>
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
