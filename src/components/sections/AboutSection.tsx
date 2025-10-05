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
  Gamepad2,
  ChevronDown,
  Clock,
  Calendar,
  Network,
  Filter
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { StaticGraphThumbnail } from '../ui/StaticGraphThumbnail';
import { InteractiveGraphModal } from '../ui/InteractiveGraphModal';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [avatarEmoji, setAvatarEmoji] = useState('👋');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'everything' | 'books' | 'games'>('everything');
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<any | null>(null);

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
      progress: 72,
      pageCount: 777,
      currentPage: 560,
      startedDate: 'Nov 2024',
      keyInsights: [
        'Self-referential systems create emergent complexity',
        'Strange loops appear in music, art, and consciousness',
        'Formal systems have inherent limitations (Gödel\'s theorem)'
      ],
      relatedWork: 'Air India Design System - recursive component patterns',
      tags: ['Systems', 'Design', 'Narrative']
    },
    {
      title: 'I Am a Strange Loop',
      author: 'Douglas Hofstadter',
      impact: 'Consciousness emerging from patterns. Every interface is a loop between user intention and system feedback.',
      gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05))',
      progress: 45,
      pageCount: 412,
      currentPage: 185,
      startedDate: 'Dec 2024',
      keyInsights: [
        'Consciousness arises from self-referential loops',
        'The "I" is a strange loop in the brain',
        'Pattern recognition creates meaning from symbols'
      ],
      relatedWork: 'Latent Space - exploring emergent AI consciousness patterns',
      tags: ['Systems', 'Narrative', 'Experience']
    },
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      impact: 'Affordances and signifiers. The foundation of my belief that interfaces should reduce cognitive load.',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))',
      progress: 100,
      pageCount: 368,
      currentPage: 368,
      startedDate: 'Sep 2024',
      keyInsights: [
        'Good design is invisible, bad design frustrates',
        'Affordances guide users without explicit instruction',
        'Feedback loops reduce user uncertainty'
      ],
      relatedWork: 'All projects - core philosophy of interface design',
      tags: ['Design', 'Experience']
    },
    {
      title: 'Thinking in Systems',
      author: 'Donella Meadows',
      impact: 'Systems thinking informs every design decision—seeing connections, feedback loops, and leverage points.',
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))',
      progress: 58,
      pageCount: 240,
      currentPage: 139,
      startedDate: 'Oct 2024',
      keyInsights: [
        'Small interventions at leverage points create big changes',
        'System behavior emerges from structure, not events',
        'Feedback delays cause oscillation and instability'
      ],
      relatedWork: 'Design systems architecture - holistic thinking',
      tags: ['Systems', 'Design']
    },
  ];

  const currentlyPlaying = [
    {
      title: "Baldur's Gate 3",
      studio: 'Larian Studios',
      impact: 'Emergent narratives from systemic design. Every choice branches into consequence trees—pure systems thinking.',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
      hoursPlayed: 147,
      completionRate: 83,
      platform: 'PC',
      startedDate: 'Aug 2023',
      keyMechanics: [
        'Systemic interactions create emergent stories',
        'Dice rolls as visible decision-making feedback',
        'Consequence trees branch from every choice'
      ],
      relatedWork: 'Journey timeline - branching narrative visualization',
      tags: ['Systems', 'Narrative', 'Strategy']
    },
    {
      title: 'Red Dead Redemption 2',
      studio: 'Rockstar Games',
      impact: 'Attention to detail and world-building. Every animation, every interaction designed to feel alive and breathing.',
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
      hoursPlayed: 92,
      completionRate: 67,
      platform: 'PC',
      startedDate: 'May 2024',
      keyMechanics: [
        'Every animation communicates character state',
        'World responds to player actions with delays',
        'Micro-interactions create sense of presence'
      ],
      relatedWork: 'Metamorphic Fractals - detail-oriented world-building',
      tags: ['World Building', 'Experience', 'Narrative']
    },
    {
      title: 'Half-Life: Alyx',
      studio: 'Valve',
      impact: 'Spatial interfaces and presence. VR taught me how physical affordances translate to digital interactions.',
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
      hoursPlayed: 34,
      completionRate: 100,
      platform: 'VR',
      startedDate: 'Jan 2024',
      keyMechanics: [
        'Spatial affordances guide player without UI',
        'Physical interactions replace abstract menus',
        'Presence through consistent physics simulation'
      ],
      relatedWork: 'Future VR prototyping - spatial design thinking',
      tags: ['Immersion', 'Design', 'Mechanics']
    },
    {
      title: 'Detroit: Become Human',
      studio: 'Quantic Dream',
      impact: 'Choice architecture and consequence visualization. Flowcharts as narrative design systems.',
      gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05))',
      hoursPlayed: 28,
      completionRate: 100,
      platform: 'PC',
      startedDate: 'Mar 2024',
      keyMechanics: [
        'Flowcharts make consequences visible',
        'Choice architecture creates meaningful decisions',
        'Branching paths as design documentation'
      ],
      relatedWork: 'Latent Space - decision tree visualization',
      tags: ['Narrative', 'Strategy', 'Experience']
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

        {/* Currently Reading & Playing - Card Container */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            animationDelay: '300ms',
            marginBottom: '4rem',
            background: 'var(--surface-primary)',
            backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
            borderRadius: '32px',
            border: '1px solid var(--border-primary)',
            padding: '4rem',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Section Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
            }}>
              Currently Reading & Playing
            </h2>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              fontWeight: '300',
            }}>
              Books and games shaping how I think about design, systems, and storytelling
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '2.5rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-primary)',
            paddingBottom: '1rem',
          }}>
              <button
                onClick={() => {
                  setActiveTab('everything');
                  setExpandedItem(null);
                  setSelectedGraphNode(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: activeTab === 'everything' ? 'var(--brand-red)' : 'var(--text-muted)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
              >
                <Network size={18} />
                Everything
                {activeTab === 'everything' && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--brand-red)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('books');
                  setExpandedItem(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: activeTab === 'books' ? 'var(--brand-red)' : 'var(--text-muted)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
              >
                <BookOpen size={18} />
                Books
                {activeTab === 'books' && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--brand-red)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('games');
                  setExpandedItem(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: activeTab === 'games' ? 'var(--brand-red)' : 'var(--text-muted)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
              >
                <Gamepad2 size={18} />
                Games
                {activeTab === 'games' && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--brand-red)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </div>

          {/* Content Area with AnimatePresence */}
          <div>
            <AnimatePresence mode="wait">
              {activeTab === 'everything' ? (
                <motion.div
                  key="everything"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50% 1fr',
                    gap: '3rem',
                  }}
                >
                  {/* LEFT: Static Graph Thumbnail */}
                  <div>
                    <StaticGraphThumbnail
                      books={currentlyReading}
                      games={currentlyPlaying}
                      onClick={() => setIsGraphModalOpen(true)}
                    />
                  </div>

                  {/* RIGHT: Minimal Clean Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Show Selected or Featured Items */}
                    {selectedGraphNode ? (
                      // When a node is clicked, show only that item
                      <>
                        {selectedGraphNode.type === 'book' && currentlyReading
                          .filter(book => book.title === selectedGraphNode.name)
                          .map((book, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              style={{
                                background: 'var(--surface-secondary)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '1px solid var(--border-primary)',
                                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '12px',
                                  background: 'var(--surface-active)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  <BookOpen size={20} style={{ color: 'var(--text-primary)' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <h4 style={{
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    marginBottom: '0.25rem',
                                    color: 'var(--text-primary)',
                                  }}>
                                    {book.title}
                                  </h4>
                                  <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '300',
                                  }}>
                                    by {book.author}
                                  </p>
                                </div>
                                <div style={{
                                  fontSize: '0.8125rem',
                                  fontWeight: '600',
                                  color: 'var(--text-primary)',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '8px',
                                  background: 'var(--surface-active)',
                                  height: 'fit-content',
                                }}>
                                  {book.progress}%
                                </div>
                              </div>
                              <p style={{
                                fontSize: '0.9375rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                fontWeight: '300',
                              }}>
                                {book.impact}
                              </p>
                            </motion.div>
                          ))}

                        {selectedGraphNode.type === 'game' && currentlyPlaying
                          .filter(game => game.title === selectedGraphNode.name)
                          .map((game, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              style={{
                                background: 'var(--surface-secondary)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '1px solid var(--border-primary)',
                                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '12px',
                                  background: 'var(--surface-active)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  <Gamepad2 size={20} style={{ color: 'var(--text-primary)' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <h4 style={{
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    marginBottom: '0.25rem',
                                    color: 'var(--text-primary)',
                                  }}>
                                    {game.title}
                                  </h4>
                                  <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '300',
                                  }}>
                                    by {game.studio}
                                  </p>
                                </div>
                                <div style={{
                                  fontSize: '0.8125rem',
                                  fontWeight: '600',
                                  color: 'var(--text-primary)',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '8px',
                                  background: 'var(--surface-active)',
                                  height: 'fit-content',
                                }}>
                                  {game.hoursPlayed}h
                                </div>
                              </div>
                              <p style={{
                                fontSize: '0.9375rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                fontWeight: '300',
                              }}>
                                {game.impact}
                              </p>
                            </motion.div>
                          ))}

                        {selectedGraphNode.type === 'concept' && (
                          <>
                            {currentlyReading
                              .filter(book => book.tags.includes(selectedGraphNode.name))
                              .slice(0, 1)
                              .map((book, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  style={{
                                    background: 'var(--surface-secondary)',
                                    backdropFilter: 'blur(40px)',
                                    WebkitBackdropFilter: 'blur(40px)',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    border: '1px solid var(--border-primary)',
                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)',
                                  }}
                                >
                                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '12px',
                                      background: 'var(--surface-active)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                    }}>
                                      <BookOpen size={20} style={{ color: 'var(--text-primary)' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                      <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        marginBottom: '0.25rem',
                                        color: 'var(--text-primary)',
                                      }}>
                                        {book.title}
                                      </h4>
                                      <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-muted)',
                                        fontWeight: '300',
                                      }}>
                                        by {book.author}
                                      </p>
                                    </div>
                                  </div>
                                  <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.5',
                                    fontWeight: '300',
                                  }}>
                                    {book.impact}
                                  </p>
                                </motion.div>
                              ))}

                            {currentlyPlaying
                              .filter(game => game.tags.includes(selectedGraphNode.name))
                              .slice(0, 1)
                              .map((game, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  style={{
                                    background: 'var(--surface-secondary)',
                                    backdropFilter: 'blur(40px)',
                                    WebkitBackdropFilter: 'blur(40px)',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    border: '1px solid var(--border-primary)',
                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)',
                                  }}
                                >
                                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '12px',
                                      background: 'var(--surface-active)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                    }}>
                                      <Gamepad2 size={20} style={{ color: 'var(--text-primary)' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                      <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        marginBottom: '0.25rem',
                                        color: 'var(--text-primary)',
                                      }}>
                                        {game.title}
                                      </h4>
                                      <p style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-muted)',
                                        fontWeight: '300',
                                      }}>
                                        by {game.studio}
                                      </p>
                                    </div>
                                  </div>
                                  <p style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.5',
                                    fontWeight: '300',
                                  }}>
                                    {game.impact}
                                  </p>
                                </motion.div>
                              ))}
                          </>
                        )}
                      </>
                    ) : (
                      // Default: Show 1 featured book + 1 featured game
                      <>
                        {currentlyReading.slice(0, 1).map((book, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              background: 'var(--surface-secondary)',
                              backdropFilter: 'blur(40px)',
                              WebkitBackdropFilter: 'blur(40px)',
                              borderRadius: '20px',
                              padding: '1.5rem',
                              border: '1px solid var(--border-primary)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'var(--surface-active)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <BookOpen size={20} style={{ color: 'var(--text-primary)' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <h4 style={{
                                  fontSize: '1rem',
                                  fontWeight: '500',
                                  marginBottom: '0.25rem',
                                  color: 'var(--text-primary)',
                                }}>
                                  {book.title}
                                </h4>
                                <p style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--text-muted)',
                                  fontWeight: '300',
                                }}>
                                  by {book.author}
                                </p>
                              </div>
                              <div style={{
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '8px',
                                background: 'var(--surface-active)',
                                height: 'fit-content',
                              }}>
                                {book.progress}%
                              </div>
                            </div>
                            <p style={{
                              fontSize: '0.9375rem',
                              color: 'var(--text-secondary)',
                              lineHeight: '1.6',
                              fontWeight: '300',
                            }}>
                              {book.impact}
                            </p>
                          </motion.div>
                        ))}

                        {currentlyPlaying.slice(0, 1).map((game, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                              background: 'var(--surface-secondary)',
                              backdropFilter: 'blur(40px)',
                              WebkitBackdropFilter: 'blur(40px)',
                              borderRadius: '20px',
                              padding: '1.5rem',
                              border: '1px solid var(--border-primary)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'var(--surface-active)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <Gamepad2 size={20} style={{ color: 'var(--text-primary)' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <h4 style={{
                                  fontSize: '1rem',
                                  fontWeight: '500',
                                  marginBottom: '0.25rem',
                                  color: 'var(--text-primary)',
                                }}>
                                  {game.title}
                                </h4>
                                <p style={{
                                  fontSize: '0.875rem',
                                  color: 'var(--text-muted)',
                                  fontWeight: '300',
                                }}>
                                  by {game.studio}
                                </p>
                              </div>
                              <div style={{
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '8px',
                                background: 'var(--surface-active)',
                                height: 'fit-content',
                              }}>
                                {game.hoursPlayed}h
                              </div>
                            </div>
                            <p style={{
                              fontSize: '0.9375rem',
                              color: 'var(--text-secondary)',
                              lineHeight: '1.6',
                              fontWeight: '300',
                            }}>
                              {game.impact}
                            </p>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              ) : activeTab === 'books' ? (
                <motion.div
                  key="books"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {currentlyReading.map((book, index) => {
                    const isExpanded = expandedItem === index;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setExpandedItem(isExpanded ? null : index)}
                        style={{
                          position: 'relative',
                          background: book.gradient,
                          backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                          WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                          borderRadius: '20px',
                          padding: '1.5rem',
                          border: isExpanded ? '1px solid rgba(218, 14, 41, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: isExpanded
                            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 8px 32px rgba(218, 14, 41, 0.15)'
                            : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div style={{ flex: 1 }}>
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
                            }}>
                              {book.author}
                            </p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
                          </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ marginBottom: '0.75rem' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem',
                          }}>
                            <span style={{
                              fontSize: '0.75rem',
                              color: 'var(--text-muted)',
                              fontWeight: '400',
                            }}>
                              {book.currentPage} / {book.pageCount} pages
                            </span>
                            <span style={{
                              fontSize: '0.75rem',
                              color: book.progress === 100 ? 'rgba(34, 197, 94, 1)' : 'var(--brand-red)',
                              fontWeight: '500',
                            }}>
                              {book.progress}%
                            </span>
                          </div>
                          <div style={{
                            height: '6px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            position: 'relative',
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${book.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                              style={{
                                height: '100%',
                                background: book.progress === 100
                                  ? 'linear-gradient(90deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.4))'
                                  : book.gradient.replace('135deg', '90deg'),
                                position: 'relative',
                              }}
                            >
                              {/* Shimmer effect */}
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                animation: 'shimmerTransform 2s infinite',
                              }} />
                            </motion.div>
                          </div>
                        </div>

                        {/* Impact Text */}
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6',
                          fontWeight: '300',
                          fontStyle: 'italic',
                          marginBottom: isExpanded ? '1rem' : 0,
                        }}>
                          {book.impact}
                        </p>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                              }}>
                                {/* Started Date */}
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  marginBottom: '1rem',
                                }}>
                                  <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                                  <span style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '300',
                                  }}>
                                    Started reading {book.startedDate}
                                  </span>
                                </div>

                                {/* Key Insights */}
                                <div style={{ marginBottom: '1rem' }}>
                                  <h5 style={{
                                    fontSize: '0.8125rem',
                                    fontWeight: '500',
                                    color: 'var(--text-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.75rem',
                                  }}>
                                    Key Insights
                                  </h5>
                                  <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                  }}>
                                    {book.keyInsights.map((insight, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        style={{
                                          fontSize: '0.8125rem',
                                          color: 'var(--text-secondary)',
                                          lineHeight: '1.5',
                                          paddingLeft: '1rem',
                                          position: 'relative',
                                        }}
                                      >
                                        <span style={{
                                          position: 'absolute',
                                          left: 0,
                                          color: 'var(--brand-red)',
                                        }}>•</span>
                                        {insight}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Related Work */}
                                <div style={{
                                  padding: '0.75rem',
                                  background: 'rgba(218, 14, 41, 0.05)',
                                  borderRadius: '12px',
                                  border: '1px solid rgba(218, 14, 41, 0.1)',
                                }}>
                                  <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.25rem',
                                  }}>
                                    Related Work
                                  </div>
                                  <div style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--brand-red)',
                                    fontWeight: '400',
                                  }}>
                                    {book.relatedWork}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="games"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {currentlyPlaying.map((game, index) => {
                    const isExpanded = expandedItem === index;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setExpandedItem(isExpanded ? null : index)}
                        style={{
                          position: 'relative',
                          background: game.gradient,
                          backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                          WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                          borderRadius: '20px',
                          padding: '1.5rem',
                          border: isExpanded ? '1px solid rgba(218, 14, 41, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: isExpanded
                            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 8px 32px rgba(218, 14, 41, 0.15)'
                            : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{
                              fontSize: '1rem',
                              fontWeight: '500',
                              marginBottom: '0.25rem',
                              color: 'var(--text-primary)',
                            }}>
                              {game.title}
                            </h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <p style={{
                                fontSize: '0.8125rem',
                                color: 'var(--text-muted)',
                                fontWeight: '300',
                              }}>
                                {game.studio}
                              </p>
                              <span style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                padding: '0.125rem 0.5rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                              }}>
                                {game.platform}
                              </span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
                          </motion.div>
                        </div>

                        {/* Playtime & Completion */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                          marginBottom: '0.75rem',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                            <span style={{
                              fontSize: '0.8125rem',
                              color: 'var(--text-secondary)',
                              fontWeight: '400',
                            }}>
                              {game.hoursPlayed}h played
                            </span>
                          </div>
                          <div style={{
                            fontSize: '0.8125rem',
                            color: game.completionRate === 100 ? 'rgba(34, 197, 94, 1)' : 'var(--brand-red)',
                            fontWeight: '500',
                          }}>
                            {game.completionRate}% complete
                          </div>
                        </div>

                        {/* Impact Text */}
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6',
                          fontWeight: '300',
                          fontStyle: 'italic',
                          marginBottom: isExpanded ? '1rem' : 0,
                        }}>
                          {game.impact}
                        </p>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                              }}>
                                {/* Started Date */}
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem',
                                  marginBottom: '1rem',
                                }}>
                                  <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                                  <span style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '300',
                                  }}>
                                    Started playing {game.startedDate}
                                  </span>
                                </div>

                                {/* Key Mechanics */}
                                <div style={{ marginBottom: '1rem' }}>
                                  <h5 style={{
                                    fontSize: '0.8125rem',
                                    fontWeight: '500',
                                    color: 'var(--text-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.75rem',
                                  }}>
                                    Key Mechanics & Lessons
                                  </h5>
                                  <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                  }}>
                                    {game.keyMechanics.map((mechanic, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        style={{
                                          fontSize: '0.8125rem',
                                          color: 'var(--text-secondary)',
                                          lineHeight: '1.5',
                                          paddingLeft: '1rem',
                                          position: 'relative',
                                        }}
                                      >
                                        <span style={{
                                          position: 'absolute',
                                          left: 0,
                                          color: 'var(--brand-red)',
                                        }}>•</span>
                                        {mechanic}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Related Work */}
                                <div style={{
                                  padding: '0.75rem',
                                  background: 'rgba(218, 14, 41, 0.05)',
                                  borderRadius: '12px',
                                  border: '1px solid rgba(218, 14, 41, 0.1)',
                                }}>
                                  <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.25rem',
                                  }}>
                                    Related Work
                                  </div>
                                  <div style={{
                                    fontSize: '0.8125rem',
                                    color: 'var(--brand-red)',
                                    fontWeight: '400',
                                  }}>
                                    {game.relatedWork}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
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

      {/* Interactive Graph Modal */}
      <InteractiveGraphModal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
        books={currentlyReading}
        games={currentlyPlaying}
        onNodeClick={(node) => setSelectedGraphNode(node)}
      />
    </section>
  );
}
