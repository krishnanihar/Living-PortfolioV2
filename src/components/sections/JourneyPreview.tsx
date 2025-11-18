'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Sparkles, GraduationCap, Briefcase, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/components/effects/ThemeProvider';

interface Milestone {
  year: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  metrics?: { label: string; value: string }[];
  color: string;
  organization: string;
  status: 'Past' | 'Education' | 'Current';
  logoFile?: string;
}

export default function JourneyPreview() {
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardTilts, setCardTilts] = useState<Record<number, { x: number; y: number }>>({});
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const cardRefs = useRef<Record<number, HTMLElement | null>>({});
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const milestones: Milestone[] = [
    {
      year: '2005',
      label: 'The Spark',
      description: 'Hyderabad childhood: curiosity, wires, and wonder. First computer fix at age 10, flashed 20+ custom ROMs.',
      icon: <Sparkles size={24} />,
      metrics: [
        { label: 'First Computer Fix', value: 'Age 10' },
        { label: 'ROMs Flashed', value: '20+' }
      ],
      color: '#FFB800',
      organization: 'Hyderabad',
      status: 'Past'
    },
    {
      year: '2018',
      label: 'BFA Multimedia',
      description: 'First formal design education at Srishti Manipal. 15+ projects built, 8 new skills acquired.',
      icon: <GraduationCap size={24} />,
      metrics: [
        { label: 'Projects Built', value: '15+' },
        { label: 'Skills Acquired', value: '8' }
      ],
      color: '#7C3AED',
      organization: 'Srishti Manipal',
      status: 'Education',
      logoFile: 'JNAFAU.svg'
    },
    {
      year: '2021',
      label: 'NID',
      description: 'M.Des Information & Interface Design at National Institute of Design. 3 research papers, 12+ prototypes.',
      icon: <GraduationCap size={24} />,
      metrics: [
        { label: 'Research Papers', value: '3' },
        { label: 'Prototypes', value: '12+' }
      ],
      color: '#2196F3',
      organization: 'National Institute of Design',
      status: 'Education',
      logoFile: 'nid.svg'
    },
    {
      year: '2024',
      label: 'Now',
      description: 'Enterprise systems design at Air India. 10K+ daily users, 5+ systems designed for India\'s flag carrier.',
      icon: <Briefcase size={24} />,
      metrics: [
        { label: 'Daily Users', value: '10K+' },
        { label: 'Systems Designed', value: '5+' }
      ],
      color: '#DA0E29',
      organization: 'Air India',
      status: 'Current',
      logoFile: 'air-india.svg'
    },
  ];

  // Intersection Observer for scroll reveal
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

  // Mobile/Desktop detection
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth > 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const calculateTilt = (e: React.MouseEvent, cardRef: HTMLElement | null, index: number) => {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * 4;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * -4;
    setCardTilts(prev => ({ ...prev, [index]: { x, y } }));
  };

  const handleCardClick = (e: React.MouseEvent, cardRef: HTMLElement | null) => {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
    setTimeout(() => setRipplePosition(null), 600);
  };

  const getStatusText = (status: string) => {
    if (status === 'Current') return 'Now';
    if (status === 'Education') return 'Education';
    return 'Origin';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Current') return 'rgba(52, 211, 153, 0.8)';
    if (status === 'Education') return 'rgba(251, 191, 36, 0.8)';
    return resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
  };

  return (
    <>
      <style jsx>{`
        @keyframes journeyFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes journeyShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes journeyGlow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes journeyFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
          }
        }

        @keyframes journeyRipple {
          0% {
            transform: scale(0);
            opacity: 0.4;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .mobile-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .mobile-carousel::-webkit-scrollbar {
          display: none;
        }

        .mobile-carousel > * {
          scroll-snap-align: center;
          flex-shrink: 0;
          width: 85vw;
          max-width: 400px;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: 'var(--bg-primary)',
          padding: '6rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient Background Orbs */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {hoveredCard !== null && (
            <>
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '500px',
                height: '500px',
                background: `radial-gradient(circle, ${milestones[hoveredCard]?.color}20, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(100px)',
                opacity: hoveredCard !== null ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: `radial-gradient(circle, ${milestones[hoveredCard]?.color}15, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(80px)',
                opacity: hoveredCard !== null ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }} />
            </>
          )}
        </div>

        {/* Header */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 3rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: inView ? 1 : 0,
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(100px) saturate(150%)',
              WebkitBackdropFilter: 'blur(100px) saturate(150%)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: resolvedTheme === 'light'
                ? '0px 8px 30px rgba(0, 0, 0, 0.08), 0px 0px 12px rgba(255, 255, 255, 0.5) inset'
                : '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
            }}>
              <Compass size={16} style={{ color: 'rgba(218, 14, 41, 0.8)' }} />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
            }}>
              The Journey
            </h2>
            <div style={{
              padding: '0.375rem 0.875rem',
              borderRadius: '15px',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(100px) saturate(150%)',
              WebkitBackdropFilter: 'blur(100px) saturate(150%)',
              border: '1px solid var(--border-primary)',
              fontSize: '0.75rem',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
              boxShadow: resolvedTheme === 'light'
                ? '0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(255, 255, 255, 0.5) inset'
                : '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
            }}>
              {milestones.length} Milestones
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
          perspective: '2000px',
          position: 'relative',
          zIndex: 1,
        }}
        className={isMobile ? 'mobile-carousel' : ''}
        >
          {milestones.map((milestone, index) => {
            const isHovered = hoveredCard === index;
            const cardTilt = cardTilts[index] || { x: 0, y: 0 };

            const getRevealAnimation = () => {
              if (!inView) return 'none';
              return `scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both`;
            };

            return (
              <div
                key={milestone.year}
                ref={(ref) => { cardRefs.current[index] = ref; }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setCardTilts(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
                }}
                onMouseMove={(e) => {
                  if (isHovered) {
                    calculateTilt(e, cardRefs.current[index], index);
                  }
                }}
                onClick={(e) => handleCardClick(e, cardRefs.current[index])}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  animation: getRevealAnimation(),
                  transform: isHovered
                    ? `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) translateZ(10px) scale(1.01)`
                    : 'rotateX(0) rotateY(0) translateZ(0) scale(1)',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
              >
                {/* Ripple Effect */}
                {ripplePosition && (
                  <div style={{
                    position: 'absolute',
                    top: ripplePosition.y,
                    left: ripplePosition.x,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                    animation: 'journeyRipple 0.6s ease-out',
                    pointerEvents: 'none',
                    zIndex: 100,
                  }} />
                )}

                {/* Border Shimmer on Hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  border: isHovered ? '1px solid transparent' : '1px solid var(--border-primary)',
                  animation: isHovered ? 'borderShimmer 2s ease-in-out infinite' : 'none',
                  pointerEvents: 'none',
                  zIndex: 10,
                }} />

                {/* Visual Area */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '180px',
                  background: `linear-gradient(135deg, ${milestone.color}15 0%, transparent 100%)`,
                  overflow: 'hidden',
                }}>
                  {/* Icon/Year Display */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                  }}>
                    {/* Year */}
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '200',
                      color: milestone.color,
                      letterSpacing: '-0.03em',
                      opacity: 0.9,
                    }}>
                      {milestone.year}
                    </div>
                    {/* Logo or Icon */}
                    <div style={{
                      width: 'clamp(88px, 10vw, 112px)',
                      height: 'clamp(88px, 10vw, 112px)',
                      borderRadius: '20px',
                      background: milestone.logoFile
                        ? (resolvedTheme === 'light'
                          ? (milestone.logoFile === 'JNAFAU.svg' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.05)')
                          : (milestone.logoFile === 'JNAFAU.svg' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.10)'))
                        : `${milestone.color}15`,
                      border: milestone.logoFile
                        ? (resolvedTheme === 'light'
                          ? `1px solid rgba(0, 0, 0, ${milestone.logoFile === 'JNAFAU.svg' ? '0.15' : '0.12'})`
                          : `1px solid rgba(255, 255, 255, ${milestone.logoFile === 'JNAFAU.svg' ? '0.20' : '0.18'})`)
                        : `1px solid ${milestone.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: milestone.color,
                      animation: isHovered ? 'journeyFloat 3s ease-in-out infinite' : 'none',
                      padding: milestone.logoFile ? '18px' : '0',
                      backdropFilter: milestone.logoFile ? 'blur(20px) saturate(140%)' : 'none',
                      boxShadow: milestone.logoFile
                        ? (resolvedTheme === 'light'
                          ? (milestone.logoFile === 'JNAFAU.svg'
                            ? 'inset 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.08)'
                            : '0 4px 16px rgba(0, 0, 0, 0.08)')
                          : (milestone.logoFile === 'JNAFAU.svg'
                            ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 16px rgba(0, 0, 0, 0.2)'
                            : '0 4px 16px rgba(0, 0, 0, 0.2)'))
                        : 'none',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                      {milestone.logoFile ? (
                        <Image
                          src={`/logos/${milestone.logoFile}`}
                          alt={milestone.organization}
                          width={76}
                          height={76}
                          style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: 'auto',
                          }}
                        />
                      ) : (
                        milestone.icon
                      )}
                    </div>
                  </div>

                  {/* Glass layer */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered
                      ? (resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)')
                      : (resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.005)' : 'rgba(255, 255, 255, 0.005)'),
                    backdropFilter: 'blur(30px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(120%)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }} />

                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: resolvedTheme === 'light'
                      ? 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 80%, rgba(0, 0, 0, 0.05) 100%)'
                      : 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 80%, rgba(0, 0, 0, 0.05) 100%)',
                    pointerEvents: 'none',
                    opacity: 0.4,
                  }} />

                  {/* Shimmer effect on hover */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: resolvedTheme === 'light'
                        ? 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%)'
                        : 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%)',
                      animation: 'journeyShimmer 1.5s ease-out',
                    }} />
                  )}

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '10px',
                    background: 'var(--surface-primary)',
                    backdropFilter: 'blur(100px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                    border: `1px solid ${getStatusColor(milestone.status)}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    boxShadow: resolvedTheme === 'light'
                      ? '0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(255, 255, 255, 0.5) inset'
                      : '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: getStatusColor(milestone.status),
                      boxShadow: milestone.status === 'Current' ? `0 0 12px ${getStatusColor(milestone.status)}` : 'none',
                      animation: milestone.status === 'Current' ? 'journeyGlow 2s ease-in-out infinite' : 'none',
                    }} />
                    <span style={{
                      fontSize: '0.688rem',
                      fontWeight: '400',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.02em',
                    }}>
                      {getStatusText(milestone.status)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Glass Card Body */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  top: '180px',
                  background: 'var(--surface-secondary)',
                  backdropFilter: 'blur(75px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(75px) saturate(180%)',
                  border: isHovered
                    ? (resolvedTheme === 'light' ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)')
                    : '1px solid var(--border-primary)',
                  borderTop: 'none',
                  borderRadius: '0 0 20px 20px',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered
                    ? (resolvedTheme === 'light'
                      ? '0px 16px 48px rgba(0, 0, 0, 0.12), 0px 0px 16px rgba(255, 255, 255, 0.6) inset'
                      : '0px 16px 48px rgba(0, 0, 0, 0.5), 0px 0px 16px rgba(255, 255, 255, 0.04) inset')
                    : (resolvedTheme === 'light'
                      ? '0px 8px 30px rgba(0, 0, 0, 0.08), 0px 0px 12px rgba(255, 255, 255, 0.5) inset'
                      : '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset'),
                }} />

                {/* Translucent overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  top: '180px',
                  background: resolvedTheme === 'light'
                    ? 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.02) 100%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.02) 100%)',
                  pointerEvents: 'none',
                  opacity: isHovered ? 0.1 : 0.2,
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />

                {/* Content */}
                <div style={{
                  position: 'relative',
                  padding: '2rem',
                  paddingTop: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '240px',
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '300',
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem',
                        letterSpacing: '-0.01em',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                      }}>
                        {milestone.label}
                      </h3>
                      <p style={{
                        fontSize: '0.75rem',
                        fontWeight: '300',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.02em',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: isHovered ? 0.8 : 0.7,
                      }}>
                        {milestone.organization}
                      </p>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'var(--surface-primary)',
                      backdropFilter: 'blur(100px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                      border: '1px solid var(--border-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
                      animation: isHovered ? 'journeyFloat 3s ease-in-out infinite' : 'none',
                      boxShadow: resolvedTheme === 'light'
                        ? '0px 4px 12px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(255, 255, 255, 0.5) inset'
                        : '0px 4px 12px rgba(0, 0, 0, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
                    }}>
                      <ArrowUpRight size={14} style={{
                        color: 'var(--text-secondary)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.813rem',
                    fontWeight: '300',
                    color: 'var(--text-tertiary)',
                    lineHeight: '1.6',
                    letterSpacing: '0.01em',
                    marginBottom: 'auto',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isHovered ? 0.7 : 0.5,
                  }}>
                    {milestone.description}
                  </p>

                  {/* Footer - Metrics */}
                  {milestone.metrics && (
                    <div style={{
                      paddingTop: '1.5rem',
                      marginTop: '1.5rem',
                      borderTop: '1px solid var(--border-primary)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.75rem',
                    }}>
                      {milestone.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: 'var(--surface-primary)',
                            backdropFilter: 'blur(60px) saturate(130%)',
                            WebkitBackdropFilter: 'blur(60px) saturate(130%)',
                            border: '1px solid var(--border-primary)',
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s`,
                            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
                          }}
                        >
                          <div style={{
                            fontSize: '0.688rem',
                            color: 'var(--text-muted)',
                            marginBottom: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}>
                            {metric.label}
                          </div>
                          <div style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: milestone.color,
                          }}>
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          position: 'relative',
          zIndex: 1,
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          <Link href="/journey" style={{ textDecoration: 'none' }}>
            <button
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '0.875rem 2rem',
                borderRadius: '28px',
                background: 'var(--surface-primary)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                fontWeight: '400',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = resolvedTheme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface-primary)';
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Explore the Full Journey
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
