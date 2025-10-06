'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Target, Trophy, TrendingUp, CheckCircle, ArrowLeft, ChevronDown, ChevronUp, Circle, Hexagon, Grid3X3, Heart, type LucideIcon } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  target?: number;
  icon: LucideIcon;
  color: string;
}

interface ProjectCard {
  id: number;
  label: string;
  title: string;
  description: string;
  metric: string;
  color: string;
}

interface ProjectDetails {
  id: string;
  category: string;
  title: string;
  badge: string;
  description: string;
  contribution: {
    owned: string;
    collaborated: string;
  };
  outcome: string;
  link: string;
  isWinner?: boolean;
  tags: string[];
}

export function AirIndiaWork() {
  const [inView, setInView] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredOtherProject, setHoveredOtherProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const otherProjects = [
    {
      id: 2,
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Speculative design exploration of dream technology ethics.',
      year: '2024',
      href: '/work/latent-space' as const,
      orbColor: '140, 100, 255'
    },
    {
      id: 3,
      icon: Grid3X3,
      title: 'Metamorphic Fractal Reflections',
      category: 'Psychedelic Journey',
      description: 'An immersive installation exploring consciousness through ego dissolution.',
      year: '2023',
      href: '/work/metamorphic-fractal-reflections' as const,
      orbColor: '50, 200, 150'
    },
    {
      id: 4,
      icon: Heart,
      title: 'Living Organism',
      category: 'Meta Design',
      description: 'This portfolio website - architected to feel like a living organism.',
      year: '2024',
      href: '/' as const,
      orbColor: '255, 255, 255'
    }
  ] as const;

  const stats: StatItem[] = [
    {
      value: '8',
      label: 'Key Projects',
      target: 8,
      icon: Target,
      color: '99, 102, 241' // Indigo
    },
    {
      value: '2',
      label: 'Hackathon Wins',
      target: 2,
      icon: Trophy,
      color: '251, 191, 36' // Amber
    },
    {
      value: '↑',
      label: 'Review Speed',
      icon: TrendingUp,
      color: '16, 185, 129' // Green
    },
    {
      value: '↑',
      label: 'Consistency',
      icon: CheckCircle,
      color: '218, 14, 41' // Brand Red
    },
  ];

  const impactCards: ProjectCard[] = [
    {
      id: 1,
      label: '01',
      title: 'Design Systems',
      description: 'Token architecture and Pixel Radar plugin for design consistency',
      metric: '↑ Review efficiency',
      color: '99, 102, 241'
    },
    {
      id: 2,
      label: '02',
      title: 'Data Visualization',
      description: 'Narrative dashboards with progressive disclosure',
      metric: '↓ Decision time',
      color: '16, 185, 129'
    },
    {
      id: 3,
      label: '03',
      title: 'Mobile Patterns',
      description: 'Unified UX library for iOS and Android',
      metric: '↓ Platform bugs',
      color: '139, 92, 246'
    },
    {
      id: 4,
      label: '04',
      title: 'IFE Experience',
      description: 'In-flight entertainment with offline resilience',
      metric: '↑ User satisfaction',
      color: '236, 72, 153'
    },
    {
      id: 5,
      label: '05',
      title: 'Team Culture',
      description: 'Liftoff program for skill progression',
      metric: '↑ Team velocity',
      color: '251, 146, 60'
    },
    {
      id: 6,
      label: '06',
      title: 'Innovation',
      description: 'Hackathon wins now in production',
      metric: '→ Rapid validation',
      color: '14, 165, 233'
    },
  ];

  const projects: ProjectDetails[] = [
    {
      id: 'pixel-radar',
      category: 'Design Systems',
      title: 'Pixel Radar',
      badge: 'Figma Plugin',
      description: 'Design drift was causing significant rework and inconsistent experiences across Air India\'s digital products. Teams struggled to maintain token compliance without manual reviews.',
      contribution: {
        owned: 'Plugin architecture, audit logic, token normalization algorithms',
        collaborated: 'Design team on token naming, engineering on feasibility',
      },
      outcome: 'Significantly improved review speed and consistency. Teams report fewer design-dev handoff issues.',
      link: '#',
      tags: ['Figma', 'TypeScript', 'Design Tokens', 'Automation']
    },
    {
      id: 'analytics',
      category: 'Data Visualization',
      title: 'Analytics Platform',
      badge: 'Dashboard',
      description: 'Operations teams were overwhelmed by data complexity. Decision-making slowed as stakeholders struggled to extract insights from traditional reports.',
      contribution: {
        owned: 'Information architecture, narrative flow, interaction patterns',
        collaborated: 'Data team on metrics, operations on workflows',
      },
      outcome: 'Reduced decision time to minute-scale. Clearer understanding and faster alignment.',
      link: '#',
      tags: ['React', 'D3.js', 'Data Viz', 'UX Research']
    },
    {
      id: 'mobile-patterns',
      category: 'Mobile Experience',
      title: 'UX Pattern Library',
      badge: 'iOS + Android',
      description: 'Inconsistent mobile experiences across Air India\'s apps were causing user friction and development delays. Teams needed unified patterns for both platforms.',
      contribution: {
        owned: 'Pattern documentation, state matrices, gesture guidelines',
        collaborated: 'Mobile developers on constraints, QA on edge cases',
      },
      outcome: 'Faster mobile prototyping with consistent handoffs. Complete coverage of all states.',
      link: '#',
      tags: ['React Native', 'iOS', 'Android', 'Pattern Library', 'State Machines']
    },
    {
      id: 'token-architecture',
      category: 'Design Systems',
      title: 'Token Architecture',
      badge: 'Foundation',
      description: 'Beyond Pixel Radar, established comprehensive token architecture supporting themes, brands, and platforms. Created the foundation for scalable design decisions.',
      contribution: {
        owned: 'Token taxonomy, naming conventions, inheritance model',
        collaborated: 'Design leadership on governance, engineering on implementation',
      },
      outcome: 'Single source of truth for design decisions. Teams share common language and systematic approach.',
      link: '#',
      tags: ['Design Tokens', 'Theming', 'Architecture', 'Documentation']
    },
    {
      id: 'ife-concepts',
      category: 'In-Flight Entertainment',
      title: 'IFE Concepts',
      badge: 'Cabin Experience',
      description: 'Fragmented discovery and continuity experiences in-flight. Passengers struggled with content navigation and cross-device handoffs.',
      contribution: {
        owned: 'Continuity flows, readability standards, offline resilience',
        collaborated: 'Content team on catalog, backend on sync architecture',
      },
      outcome: 'Stakeholder alignment on modernized IFE journey. Seamless experience with robust offline support.',
      link: '#',
      tags: ['Offline-First', 'Content Discovery', 'Cross-Device', 'UX Flows']
    },
    {
      id: 'liftoff-program',
      category: 'Team Enablement',
      title: 'Liftoff Program',
      badge: 'Culture Building',
      description: 'Design team needed structured growth paths and visible progress indicators. Traditional mentorship wasn\'t scaling with team expansion.',
      contribution: {
        owned: 'Program design, mentorship mapping, weekly missions',
        collaborated: 'Design leadership on goals, team on feedback loops',
      },
      outcome: 'Visible skill progression across team. Weekly demos created momentum and knowledge sharing.',
      link: '#',
      tags: ['Mentorship', 'Team Growth', 'Knowledge Sharing', 'Program Design']
    },
    {
      id: 'hackathon',
      category: 'Innovation Sprint',
      title: 'Internal Hackathon',
      badge: 'Winner',
      description: 'Annual internal innovation sprint to explore bold ideas outside normal constraints. Focus on customer pain points with rapid prototyping.',
      contribution: {
        owned: 'Concept development, rapid prototyping, presentation',
        collaborated: 'Cross-functional team on implementation strategy',
      },
      outcome: 'First place win. Prototype moved to production pipeline within 2 weeks.',
      link: '#',
      isWinner: true,
      tags: ['Rapid Prototyping', 'Innovation', 'Team Collaboration']
    },
    {
      id: 'microsoft-hackathon',
      category: 'Partnership Innovation',
      title: 'Microsoft × Air India',
      badge: 'Winner',
      description: 'Joint hackathon with Microsoft to explore Azure AI services for aviation. Challenge: reimagine customer service with cloud-native solutions.',
      contribution: {
        owned: 'UX flows, conversational design, prototype interface',
        collaborated: 'Microsoft architects on Azure, Air India ops on use cases',
      },
      outcome: 'Winner in customer experience category. Prototype demonstrated 70% query resolution potential.',
      link: '#',
      isWinner: true,
      tags: ['Azure AI', 'Conversational Design', 'Cloud Architecture', 'Hackathon']
    },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel scroll detection
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentCarouselIndex(index);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Background Orb - Red Themed */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(218, 14, 41, 0.08), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          animation: 'floatOrb 30s ease-in-out infinite',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'floatOrb 35s ease-in-out infinite 10s',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
        }} />
      </div>

      {/* Hero Section */}
      <header style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 10vh, 8rem) 1.5rem clamp(3rem, 8vh, 6rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          {/* Journey Breadcrumb */}
          <Link
            href="/journey#air-india-2024"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(218, 14, 41, 0.08)',
              border: '1px solid rgba(218, 14, 41, 0.2)',
              borderRadius: '20px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(218, 14, 41, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(218, 14, 41, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.2)';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>Part of: Designing at 40,000 Feet</span>
          </Link>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '200',
            letterSpacing: '-0.04em',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
          }}>
            I build <span className="text-gradient-animated" style={{
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            }}>systems</span> that help teams ship better products, faster.
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: '1.8',
          }}>
            Select work from Air India's digital transformation. Public-safe case study with sanitized examples and directional metrics.
          </p>

          {/* Metadata Pill */}
          <div style={{
            display: 'inline-flex',
            padding: '0.375rem 0.875rem',
            borderRadius: '12px',
            background: 'var(--surface-primary)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-primary)',
            fontSize: '0.75rem',
            fontWeight: '300',
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
          }}>
            2023-Present · 450+ Daily Users
          </div>
        </div>
      </header>

      {/* Interactive Stats Cards */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 1.5rem 4rem',
        position: 'relative',
        zIndex: 1,
        marginTop: '-4rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                style={{
                  position: 'relative',
                  padding: '2rem',
                  borderRadius: '20px',
                  background: isHovered
                    ? `linear-gradient(135deg, rgba(${stat.color}, 0.08), var(--surface-primary))`
                    : 'var(--surface-primary)',
                  backdropFilter: 'blur(40px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(120%)',
                  border: `1px solid ${isHovered ? `rgba(${stat.color}, 0.3)` : 'var(--border-primary)'}`,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  cursor: 'default',
                  animation: inView ? `statCardReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s both` : 'none',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(${stat.color}, 0.15)`
                    : '0 4px 8px rgba(0, 0, 0, 0.2)',
                  overflow: 'hidden',
                }}
              >
                {/* Shimmer Line */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, rgba(${stat.color}, 0.8), transparent)`,
                    animation: 'shimmerLine 2s ease-in-out infinite',
                  }} />
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `rgba(${stat.color}, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  }}>
                    <Icon size={20} style={{ color: `rgb(${stat.color})` }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      lineHeight: '1',
                      marginBottom: '0.5rem',
                      animation: inView && stat.target ? `counterUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.1}s both` : 'none',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      fontWeight: '300',
                      letterSpacing: '0.02em',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Cards Grid */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            Six Areas of Impact
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
          }}>
            Systems and innovation across Air India's digital transformation
          </p>
        </div>

        {/* Desktop: Bento Grid */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}>
            {impactCards.map((card, index) => {
              const isHovered = hoveredCard === card.id;
              const isFeatured = card.id === 1;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                    setRipplePosition(null);
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setRipplePosition({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  style={{
                    position: 'relative',
                    padding: '2rem',
                    borderRadius: '20px',
                    gridColumn: isFeatured ? 'span 2' : 'span 1',
                    background: isHovered
                      ? `linear-gradient(135deg, rgba(${card.color}, 0.06), var(--surface-primary))`
                      : 'var(--surface-primary)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: `1px solid transparent`,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                    cursor: 'pointer',
                    animation: inView ? `scrollRevealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + index * 0.1}s both` : 'none',
                    boxShadow: isHovered
                      ? `0 20px 40px rgba(${card.color}, 0.15)`
                      : '0 4px 8px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Border Shimmer Effect */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      padding: '1px',
                      background: `linear-gradient(90deg, transparent, rgba(${card.color}, 0.8), transparent)`,
                      backgroundSize: '200% 100%',
                      animation: 'borderShimmer 3s ease-in-out infinite',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Ripple Effect */}
                  {isHovered && ripplePosition && hoveredCard === card.id && (
                    <div style={{
                      position: 'absolute',
                      left: ripplePosition.x,
                      top: ripplePosition.y,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: `rgba(${card.color}, 0.4)`,
                      animation: 'ripple 0.6s ease-out',
                      pointerEvents: 'none',
                    }} />
                  )}

                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: `rgb(${card.color})`,
                    marginBottom: '1rem',
                    letterSpacing: '0.1em',
                    opacity: 0.8,
                  }}>
                    {card.label}
                  </div>
                  <h3 style={{
                    fontSize: isFeatured ? '1.5rem' : '1.25rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-tertiary)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                  }}>
                    {card.description}
                  </p>
                  <div style={{
                    fontSize: '0.813rem',
                    fontWeight: '500',
                    color: `rgb(${card.color})`,
                    letterSpacing: '0.02em',
                  }}>
                    {card.metric}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile: Horizontal Carousel */}
        {isMobile && (
          <>
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {impactCards.map((card, index) => {
                const isHovered = hoveredCard === card.id;

                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      flex: '0 0 85%',
                      scrollSnapAlign: 'center',
                      position: 'relative',
                      padding: '2rem',
                      borderRadius: '20px',
                      background: isHovered
                        ? `linear-gradient(135deg, rgba(${card.color}, 0.06), var(--surface-primary))`
                        : 'var(--surface-primary)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                      border: `1px solid ${isHovered ? `rgba(${card.color}, 0.3)` : 'var(--border-primary)'}`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isHovered
                        ? `0 20px 40px rgba(${card.color}, 0.15)`
                        : '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: `rgb(${card.color})`,
                      marginBottom: '1rem',
                      letterSpacing: '0.1em',
                      opacity: 0.8,
                    }}>
                      {card.label}
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-tertiary)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                    }}>
                      {card.description}
                    </p>
                    <div style={{
                      fontSize: '0.813rem',
                      fontWeight: '500',
                      color: `rgb(${card.color})`,
                      letterSpacing: '0.02em',
                    }}>
                      {card.metric}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Progress Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}>
              {impactCards.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: currentCarouselIndex === index ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentCarouselIndex === index
                      ? 'var(--accent-primary)'
                      : 'var(--border-primary)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Project Details with Accordions */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1s both' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
          }}>
            Project Details
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-tertiary)',
          }}>
            Deep dives into key initiatives
          </p>
        </div>

        {projects.map((project, index) => {
          const isExpanded = expandedProject === project.id;
          const isHovered = hoveredProject === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                position: 'relative',
                marginBottom: '2rem',
                borderRadius: '20px',
                background: 'var(--surface-primary)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid transparent',
                overflow: 'hidden',
                animation: inView ? `scrollRevealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${1.1 + index * 0.2}s both` : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Animated Outline Effect - Shows on hover OR when expanded */}
              {(isHovered || isExpanded) && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  padding: '1px',
                  background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.6), rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.6))',
                  backgroundSize: '200% 200%',
                  animation: 'borderShimmer 3s ease-in-out infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Project Header - Clickable */}
              <div
                onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                style={{
                  padding: '2rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}>
                  <div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                    }}>
                      {project.category}
                    </div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}>
                      {project.title}
                    </h3>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      background: project.isWinner ? 'rgba(251, 146, 60, 0.15)' : 'var(--surface-secondary)',
                      border: project.isWinner ? '1px solid rgba(251, 146, 60, 0.3)' : '1px solid var(--border-secondary)',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: project.isWinner ? 'rgba(251, 146, 60, 1)' : 'var(--text-secondary)',
                      fontWeight: '600',
                    }}>
                      {project.badge}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                <p style={{
                  fontSize: '0.938rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '1rem',
                }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '8px',
                        background: 'var(--surface-secondary)',
                        border: '1px solid var(--border-primary)',
                        fontSize: '0.75rem',
                        fontWeight: '300',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div style={{
                  padding: '0 2rem 2rem',
                  animation: 'accordionExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div style={{
                    padding: '1.5rem',
                    background: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase',
                    }}>
                      My Contribution
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}>
                      <strong>Owned:</strong> {project.contribution.owned}
                      <br />
                      <strong>Collaborated:</strong> {project.contribution.collaborated}
                    </div>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'rgba(16, 185, 129, 0.9)',
                      letterSpacing: '0.1em',
                      marginBottom: '0.75rem',
                      textTransform: 'uppercase',
                    }}>
                      Outcome
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}>
                      {project.outcome}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* More Projects */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Section Header */}
        <div style={{
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '400',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            More Projects
          </h2>
          <Link
            href="/work"
            onMouseEnter={() => setHoveredCTA('back')}
            onMouseLeave={() => setHoveredCTA(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              background: hoveredCTA === 'back'
                ? 'var(--surface-secondary)'
                : 'transparent',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '400',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ArrowLeft size={16} />
            <span>All Work</span>
          </Link>
        </div>

        {/* Project Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {otherProjects.map((project) => {
            const Icon = project.icon;
            const isHovered = hoveredOtherProject === project.id;

            return (
              <Link
                key={project.id}
                href={project.href}
                onMouseEnter={() => setHoveredOtherProject(project.id)}
                onMouseLeave={() => setHoveredOtherProject(null)}
                style={{
                  position: 'relative',
                  display: 'block',
                  padding: '2rem',
                  borderRadius: '20px',
                  background: 'var(--surface-primary)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: '1px solid var(--border-primary)',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(${project.orbColor}, 0.15)`
                    : '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Animated Outline on Hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    padding: '1px',
                    background: `linear-gradient(135deg, rgba(${project.orbColor}, 0.6), rgba(${project.orbColor}, 0.2), rgba(${project.orbColor}, 0.6))`,
                    backgroundSize: '200% 200%',
                    animation: 'borderShimmer 3s ease-in-out infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `rgba(${project.orbColor}, 0.1)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                }}>
                  <Icon size={24} style={{ color: `rgb(${project.orbColor})` }} />
                </div>

                {/* Category & Year */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {project.category}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    opacity: 0.5,
                  }}>
                    •
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}>
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: '1.6',
                }}>
                  {project.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-primary)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          fontSize: '0.813rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--text-tertiary)',
          opacity: 0.5,
        }}>
          © 2024 Air India Case Study
        </div>
      </footer>
    </div>
  );
}
