'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Briefcase,
  Sparkles,
  Layers,
  Mail,
  Linkedin,
  Twitter,
  BookOpen,
  Gamepad2,
  ChevronDown,
  Clock,
  Calendar,
  Network
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { StaticGraphThumbnail } from '../ui/StaticGraphThumbnail';
import { InteractiveGraphModal } from '../ui/InteractiveGraphModal';
import { ContactChat } from '../ContactChat';
import { Chatbot } from '../Chatbot';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'everything' | 'books' | 'games'>('everything');
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<any | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Check if mobile on mount
    setIsMobile(window.innerWidth < 768);

    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  const journeyMilestones = [
    {
      year: '1996',
      label: 'The Spark',
      id: 'hyderabad-roots',
      detail: 'Growing up in Hyderabad, tinkering with computers and flashing custom ROMs. The beginning of a lifelong curiosity: "How does this work, and how can I make it better?"'
    },
    {
      year: '2016',
      label: 'BFA',
      id: 'undergrad-2018',
      detail: 'Bachelor of Fine Arts - learned the language of visual design. Typography, composition, color theory. The foundation of seeing design as a system, not decoration.',
      logoFile: 'JNAFAU.png',
      organization: 'JNAFAU'
    },
    {
      year: '2020',
      label: 'Infosys',
      id: 'infosys-2020',
      detail: 'UX Designer at Infosys - where I learned design systems can\'t succeed without developer buy-in. Built my first component library. Saw the translation gap between design and code. Realized I needed to learn their language.',
      logoFile: 'infosys.svg',
      organization: 'Infosys'
    },
    {
      year: '2021',
      label: 'NID',
      id: 'nid-2021',
      detail: 'National Institute of Design Masters - learned to think in systems, not screens. Interfaces that breathe. Feedback loops. Decision latency. The philosophy that would define my work.',
      logoFile: 'nid.svg',
      organization: 'National Institute of Design'
    },
    {
      year: '2023',
      label: 'ISB',
      id: 'isb-2022',
      detail: 'Internship at ISB Digital Learning - exploring how education scales through digital platforms. Applied systems thinking to learning experiences.',
      logoFile: 'ISB.jpeg',
      organization: 'Indian School of Business'
    },
    {
      year: '2024',
      label: 'Air India',
      id: 'air-india-2024',
      detail: 'Air India DesignLAB - proving that designers and developers can speak the same language. Building component libraries where design tokens become code. 450+ daily users. Design systems that scale.',
      logoFile: 'air-india.svg',
      organization: 'Air India'
    },
  ];

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
      relatedWork: 'Metamorphic - exploring emergent consciousness patterns',
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
      relatedWork: 'PsoriAssist - decision tree visualization',
      tags: ['Narrative', 'Strategy', 'Experience']
    },
  ];

  return (
    <section
      data-section-id="about-hero"
      style={{
        minHeight: '100vh',
        background: 'transparent',
        color: 'var(--text-primary)',
        paddingTop: '120px',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style jsx>{`

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

      {/* Morphing background blobs - Award-winning ambient motion */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '600px',
        height: '600px',
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.12), rgba(147, 51, 234, 0.04))',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        zIndex: 0,
      }}
      className="blob-morph"
      />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.10), rgba(59, 130, 246, 0.03))',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        borderRadius: '50% 50% 30% 70% / 50% 50% 30% 60%',
        animation: 'morphBlob 30s ease-in-out infinite 10s',
        zIndex: 0,
      }} />

      {/* Scroll Progress Indicator */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'var(--border-primary)',
        zIndex: 100,
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--brand-red), rgba(217, 119, 87, 0.6))',
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 8px rgba(217, 119, 87, 0.5)',
        }} />
      </div>

      {/* Mouse tracking background gradient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
          rgba(217, 119, 87, 0.02) 0%,
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
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
            borderRadius: '28px',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-small)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
              gap: isMobile ? '1.5rem' : '2rem',
              alignItems: isMobile ? 'center' : 'center',
              justifyItems: isMobile ? 'center' : 'start',
              marginBottom: '2.5rem',
            }}>
              {/* Profile Picture with Glassmorphic Effect */}
              <div
                className="profile-avatar-container"
                style={{
                  position: 'relative',
                  width: 'clamp(100px, 15vw, 140px)',
                  height: 'clamp(100px, 15vw, 140px)',
                  borderRadius: '50%',
                  background: 'var(--glass-surface)',
                  padding: '4px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-large)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid var(--border-secondary)',
                  boxShadow: 'var(--shadow-medium)',
                  backdropFilter: 'blur(60px) saturate(120%)',
                }}>
                  <Image
                    src="/images/profile/mypic.png"
                    alt="Nihar - Product Designer & Developer at Air India DesignLAB"
                    width={140}
                    height={140}
                    priority
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              </div>

              {/* Introduction */}
              <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
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
                  color: 'var(--text-primary)',
                  fontWeight: '400',
                  lineHeight: '1.7',
                  letterSpacing: '0.01em',
                  marginBottom: '0.75rem',
                }}>
                  I design systems that think, then ship them in code.
                </p>
                <p style={{
                  fontSize: '1.0625rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '300',
                  lineHeight: '1.7',
                  letterSpacing: '0.01em',
                }}>
                  Currently at <span style={{ color: 'var(--brand-red)', fontWeight: '500' }}>Air India DesignLAB</span>, where I've built design infrastructure serving{' '}
                  <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>450+ daily users</span>{' '}
                  across aviation operations. Designer by training{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(NID, BFA)</span>,
                  developer by practice{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>(React, TypeScript, Three.js)</span>,
                  systems thinker by obsession.
                  <br /><br />
                  I specialize in <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>reducing decision latency</span> — that split-second gap between thought and action in digital interfaces.
                </p>
              </div>
            </div>

            {/* Interactive Journey Timeline */}
            <div
              data-section-id="about-journey"
              style={{
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-primary)',
              }}
            >
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}>
                From Pixels to Production
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                fontWeight: '300',
                marginBottom: '2rem',
                lineHeight: '1.6',
              }}>
                Each chapter taught me a different language. Together, they made me fluent in building systems that scale.
              </p>
              <div
                className={isMobile ? 'hide-scrollbar' : ''}
                data-lenis-prevent={isMobile ? true : undefined}
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.5rem' : '0.75rem',
                overflowX: isMobile ? 'scroll' : 'visible',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: isMobile ? '0.5rem' : '0',
                scrollSnapType: isMobile ? 'x proximity' : 'none',
                overscrollBehaviorX: isMobile ? 'contain' : 'auto',
                touchAction: isMobile ? 'pan-x' : 'auto',
                paddingLeft: isMobile ? '0.5rem' : '0',
                paddingRight: isMobile ? '0.5rem' : '0',
              }}>
                {journeyMilestones.map((milestone, index) => (
                  <React.Fragment key={milestone.id}>
                    <div
                      onClick={() => setActiveTimeline(activeTimeline === milestone.id ? null : milestone.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                        flex: isMobile ? '0 0 auto' : 1,
                        minWidth: isMobile ? '100px' : 'auto',
                        flexShrink: 0,
                        scrollSnapAlign: isMobile ? 'center' : undefined,
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        const container = e.currentTarget.querySelector('[data-logo-container]') as HTMLElement;
                        if (container) {
                          container.style.transform = 'scale(1.06)';
                          container.style.borderColor = 'rgba(217, 119, 87, 0.4)';
                          container.style.boxShadow = '0 0 20px rgba(217, 119, 87, 0.25), var(--shadow-small)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const container = e.currentTarget.querySelector('[data-logo-container]') as HTMLElement;
                        if (container) {
                          container.style.transform = 'scale(1)';
                          container.style.borderColor = activeTimeline === milestone.id
                            ? 'var(--brand-red)'
                            : 'var(--border-muted)';
                          container.style.boxShadow = activeTimeline === milestone.id
                            ? '0 0 24px rgba(217, 119, 87, 0.3), var(--shadow-small)'
                            : 'var(--shadow-small)';
                        }
                      }}
                    >
                      {/* Logo Container */}
                      <div
                        data-logo-container
                        style={{
                          width: isMobile ? '64px' : 'clamp(80px, 9vw, 96px)',
                          height: isMobile ? '64px' : 'clamp(80px, 9vw, 96px)',
                          flexShrink: 0,
                          padding: '14px',
                          borderRadius: '18px',
                          background: activeTimeline === milestone.id
                            ? 'rgba(217, 119, 87, 0.12)'
                            : 'transparent',
                          backdropFilter: 'blur(20px) saturate(110%)',
                          border: activeTimeline === milestone.id
                            ? '2px solid var(--brand-red)'
                            : '1px solid var(--border-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: activeTimeline === milestone.id
                            ? '0 0 24px rgba(217, 119, 87, 0.3), var(--shadow-small)'
                            : 'var(--shadow-small)',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {milestone.logoFile ? (
                          <Image
                            src={`/logos/${milestone.logoFile}`}
                            alt={milestone.organization || milestone.label}
                            width={milestone.logoFile === 'JNAFAU.png' ? 112 : 62}
                            height={milestone.logoFile === 'JNAFAU.png' ? 112 : 62}
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        ) : (
                          <Sparkles
                            size={32}
                            style={{
                              color: activeTimeline === milestone.id
                                ? 'var(--brand-red)'
                                : 'var(--text-secondary)',
                            }}
                          />
                        )}
                      </div>

                      {/* Year */}
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

                      {/* Label */}
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
                        background: 'linear-gradient(to right, var(--border-secondary), var(--border-primary))',
                        alignSelf: 'flex-start',
                        marginTop: 'clamp(40px, 4.5vw, 48px)',
                      }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Timeline Detail Expansion */}
              {activeTimeline && (() => {
                const activeMilestone = journeyMilestones.find(m => m.id === activeTimeline);
                return (
                  <div style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: 'rgba(217, 119, 87, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(217, 119, 87, 0.2)',
                    animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
                      fontWeight: '300',
                      margin: 0,
                    }}>
                      {activeMilestone?.detail}
                    </p>
                  </div>
                );
              })()}
            </div>
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
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(180px) saturate(180%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(180px) saturate(180%) brightness(1.1)',
            borderRadius: '28px',
            padding: '2.5rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-medium)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.borderColor = 'var(--border-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
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
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(180px) saturate(180%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(180px) saturate(180%) brightness(1.1)',
            borderRadius: '28px',
            padding: '2.5rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-medium)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.borderColor = 'var(--border-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
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
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(180px) saturate(180%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(180px) saturate(180%) brightness(1.1)',
            borderRadius: '28px',
            padding: '2.5rem',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-medium)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.borderColor = 'var(--border-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
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
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
            borderRadius: '32px',
            border: '1px solid var(--border-primary)',
            padding: '4rem',
            boxShadow: 'var(--shadow-large)',
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
              How I Think: Books, Games, and Systems
            </h2>
            <p style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              fontWeight: '300',
            }}>
              I learn from stories, systems, and simulations. Here's what's shaping how I design right now.
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
                    gridTemplateColumns: isMobile ? '1fr' : '50% 1fr',
                    gap: isMobile ? '2rem' : '3rem',
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
                                boxShadow: 'var(--shadow-small)',
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
                                boxShadow: 'var(--shadow-small)',
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
                          border: isExpanded ? '1px solid rgba(217, 119, 87, 0.3)' : '1px solid var(--border-primary)',
                          boxShadow: isExpanded
                            ? '0 8px 32px rgba(217, 119, 87, 0.15)'
                            : 'var(--shadow-small)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = 'var(--border-secondary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-primary)';
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
                            background: 'var(--border-muted)',
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
                                borderTop: '1px solid var(--border-primary)',
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

                                {/* Applied To */}
                                <div style={{
                                  padding: '1rem',
                                  background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.08), rgba(217, 119, 87, 0.03))',
                                  borderRadius: '14px',
                                  border: '1px solid rgba(217, 119, 87, 0.15)',
                                }}>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                  }}>
                                    <Sparkles size={14} style={{ color: 'var(--brand-red)' }} />
                                    <div style={{
                                      fontSize: '0.75rem',
                                      color: 'var(--text-primary)',
                                      fontWeight: '600',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em',
                                    }}>
                                      Applied to
                                    </div>
                                  </div>
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '400',
                                    lineHeight: '1.5',
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
                          border: isExpanded ? '1px solid rgba(217, 119, 87, 0.3)' : '1px solid var(--border-primary)',
                          boxShadow: isExpanded
                            ? '0 8px 32px rgba(217, 119, 87, 0.15)'
                            : 'var(--shadow-small)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = 'var(--border-secondary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-primary)';
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
                                background: 'var(--surface-muted)',
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
                                borderTop: '1px solid var(--border-primary)',
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

                                {/* Applied To */}
                                <div style={{
                                  padding: '1rem',
                                  background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.08), rgba(217, 119, 87, 0.03))',
                                  borderRadius: '14px',
                                  border: '1px solid rgba(217, 119, 87, 0.15)',
                                }}>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                  }}>
                                    <Sparkles size={14} style={{ color: 'var(--brand-red)' }} />
                                    <div style={{
                                      fontSize: '0.75rem',
                                      color: 'var(--text-primary)',
                                      fontWeight: '600',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em',
                                    }}>
                                      Applied to
                                    </div>
                                  </div>
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    fontWeight: '400',
                                    lineHeight: '1.5',
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

      </div>

      {/* Let's Build Something Together Section */}
      <div style={{
        marginTop: '2rem',
        padding: '5rem 2rem',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(217, 119, 87, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          background: 'var(--glass-surface)',
          backdropFilter: 'blur(120px) saturate(180%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(120px) saturate(180%) brightness(1.05)',
          border: '1px solid var(--border-muted)',
          borderRadius: isMobile ? '20px' : '24px',
          padding: isMobile ? '1.5rem' : '3rem',
          boxShadow: 'var(--shadow-large)',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '200',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}>
            Let's build something that breathes
          </h2>

          <p style={{
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            fontWeight: '300',
            letterSpacing: '0.01em',
            lineHeight: '1.6',
          }}>
            Building a design system? Launching a product? Need someone who can design it{' '}
            <span style={{ fontStyle: 'italic' }}>and</span> ship it?{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>Let's talk.</span>
          </p>

          <ContactChat onMessageSubmit={(message, intent) => {
            setInitialMessage(message);
            setChatOpen(true);
          }} />
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

      {/* Chatbot Modal */}
      {chatOpen && (
        <Chatbot
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          initialMessage={initialMessage}
          intentContext="collaboration"
        />
      )}
    </section>
  );
}
