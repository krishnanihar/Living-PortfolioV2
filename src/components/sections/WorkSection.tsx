'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Circle, Hexagon, Grid3X3, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: number;
  icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  metric: string;
  tags: string[];
  status: 'Active' | 'Research' | 'Completed';
  year: string;
  orbColor: string;
}

interface WorkSectionProps {
  className?: string;
}

export default function WorkSection({ className = '' }: WorkSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardTilts, setCardTilts] = useState<Record<number, { x: number; y: number }>>({});
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null);
  const cardRefs = useRef<Record<number, HTMLElement | null>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      icon: Circle,
      title: 'Design at Air India',
      category: 'Design Systems',
      description: 'Leading design transformation for India\'s flag carrier. Building scalable design systems and reimagining digital experiences across web, mobile, and in-flight entertainment.',
      metric: '450+ Daily Active Users',
      tags: ['React', 'Systems', 'Aviation UX'],
      status: 'Active',
      year: '2024',
      orbColor: '218, 14, 41'
    },
    {
      id: 2,
      icon: Hexagon,
      title: 'mythOS',
      category: 'AI Art Curator',
      description: 'An AI-powered digital art curator that explores visual motifs across art history. Uses computer vision and machine learning to generate thematic exhibitions and discover hidden patterns.',
      metric: 'Algorithmic Curation',
      tags: ['Computer Vision', 'AI/ML', 'Art History'],
      status: 'Research',
      year: '2024',
      orbColor: '236, 72, 153'
    },
    {
      id: 3,
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Speculative design exploration of dream technology ethics. Interactive prototype exploring the boundaries between consciousness, privacy, and AI through dream interface concepts.',
      metric: '∞ Unique Dream Maps',
      tags: ['Ethics', 'Consciousness', 'Future Concepts'],
      status: 'Research',
      year: '2024',
      orbColor: '140, 100, 255'
    },
    {
      id: 4,
      icon: Grid3X3,
      title: 'Metamorphic Fractal Reflections',
      category: 'Psychedelic Journey',
      description: 'An immersive installation exploring consciousness through ego dissolution. Participants enter a bathroom mirror portal and traverse a trippy multiverse of liquid color and pattern-creatures.',
      metric: '2 Months Development',
      tags: ['TouchDesigner', 'Arduino', 'VR + Installation'],
      status: 'Completed',
      year: '2023',
      orbColor: '50, 200, 150'
    },
    {
      id: 5,
      icon: Heart,
      title: 'Living Organism',
      category: 'Meta Design',
      description: 'This portfolio website itself - architected to feel like a living organism. Breathing animations, consciousness-aware interactions, and adaptive micro-behaviors that respond to user presence and intent.',
      metric: 'Living & Breathing',
      tags: ['Next.js', 'Framer Motion', 'Consciousness UI'],
      status: 'Active',
      year: '2024',
      orbColor: '255, 255, 255'
    }
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

  // Mobile detection and desktop check
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsDesktop(window.innerWidth > 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const calculateTilt = (e: React.MouseEvent, cardRef: HTMLElement | null, projectId: number) => {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * 4; // Increased from 2.5 to 4
    const y = ((e.clientX - centerX) / (rect.width / 2)) * -4; // Increased from 2.5 to 4
    setCardTilts(prev => ({ ...prev, [projectId]: { x, y } }));
  };

  const handleCardClick = (e: React.MouseEvent, cardRef: HTMLElement | null) => {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
    setTimeout(() => setRipplePosition(null), 600);
  };

  const activeProjectsCount = projects.filter(p => p.status === 'Active').length;

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes workFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes workShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes workGlow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes workFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
          }
        }

        @keyframes workBreathe {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        @keyframes workRipple {
          0% {
            transform: scale(0);
            opacity: 0.4;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Mobile carousel styles */
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
          fontFamily: 'Inter, sans-serif',
          padding: '3rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}
        className={className}
      >
        {/* Ambient Background Orbs */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {hoveredCard && (
            <>
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: '500px',
                height: '500px',
                background: `radial-gradient(circle, rgba(${projects.find(p => p.id === hoveredCard)?.orbColor}, 0.08), transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(100px)',
                animation: 'floatOrb 20s ease-in-out infinite',
                opacity: hoveredCard ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: `radial-gradient(circle, rgba(${projects.find(p => p.id === hoveredCard)?.orbColor}, 0.05), transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'floatOrb 25s ease-in-out infinite 5s',
                opacity: hoveredCard ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }} />
            </>
          )}
        </div>

        {/* Section Header - Enhanced */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 5rem',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--brand-red)',
                animation: 'pulseOrb 2s ease-in-out infinite',
              }} />
            </div>
            <h2 className="text-gradient-animated" style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
            }}>
              Selected Work
            </h2>
            <div style={{
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
              {projects.length} Projects · {activeProjectsCount} Active
            </div>
          </div>
        </div>

        {/* Cards Grid - Bento Layout */}
        <div style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
          perspective: '2000px',
          position: 'relative',
          zIndex: 1,
        }}
        className={isMobile ? 'mobile-carousel' : ''}
        >
          {projects.map((project, index) => {
            const Icon = project.icon as React.ElementType;
            const isHovered = hoveredCard === project.id;
            const cardTilt = cardTilts[project.id] || { x: 0, y: 0 };

            // Animation direction based on index
            const getRevealAnimation = () => {
              if (!inView) return 'none';
              if (index === 0) return `scrollRevealLeft 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both`;
              if (index === projects.length - 1) return `scrollRevealRight 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both`;
              return `scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both`;
            };

            // Status badge text
            const getStatusText = () => {
              if (project.status === 'Active') return 'Live Now';
              if (project.status === 'Research') return 'In Research';
              return 'Case Study';
            };

            const getStatusColor = () => {
              if (project.status === 'Active') return 'rgba(52, 211, 153, 0.8)';
              if (project.status === 'Research') return 'rgba(251, 191, 36, 0.8)';
              return 'rgba(255, 255, 255, 0.3)';
            };

            const cardContent = (
              <div
                ref={(ref) => { cardRefs.current[project.id] = ref; }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setCardTilts(prev => ({ ...prev, [project.id]: { x: 0, y: 0 } }));
                }}
                onMouseMove={(e) => {
                  if (isHovered) {
                    calculateTilt(e, cardRefs.current[project.id], project.id);
                  }
                }}
                onClick={(e) => handleCardClick(e, cardRefs.current[project.id])}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  animation: getRevealAnimation(),
                  transform: isHovered
                    ? `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) translateZ(10px) scale(1.01)`
                    : 'rotateX(0) rotateY(0) translateZ(0) scale(1)',
                  transformStyle: 'preserve-3d' as const,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  // Bento grid: Air India spans 2 columns on desktop
                  gridColumn: project.id === 1 && isDesktop ? 'span 2' : 'span 1',
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
                    background: 'rgba(255, 255, 255, 0.3)',
                    animation: 'workRipple 0.6s ease-out',
                    pointerEvents: 'none',
                    zIndex: 100,
                  }} />
                )}

                {/* Border Shimmer on Hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  border: isHovered ? '1px solid transparent' : '1px solid var(--border-primary)',
                  animation: isHovered ? 'borderShimmer 2s ease-in-out infinite' : 'none',
                  pointerEvents: 'none',
                  zIndex: 10,
                }} />

                {/* Image Placeholder with enhanced glass */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '180px',
                  background: `linear-gradient(135deg,
                    rgba(${project.orbColor}, 0.01) 0%,
                    transparent 100%)`,
                  overflow: 'hidden',
                }}>
                  {/* Glass layer for image */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered
                      ? 'rgba(255, 255, 255, 0.02)'
                      : 'rgba(255, 255, 255, 0.005)',
                    backdropFilter: 'blur(30px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(120%)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }} />

                  {/* Very light gradient overlay to blend into card */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.02) 80%, rgba(0, 0, 0, 0.05) 100%)',
                    pointerEvents: 'none',
                    opacity: 0.4,
                  }} />

                  {/* Shimmer effect on hover */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%)',
                      animation: 'workShimmer 1.5s ease-out',
                    }} />
                  )}

                  {/* Pattern as placeholder visual */}
                  <svg style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
                    width: '120px',
                    height: '120px',
                    opacity: 0.08,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    animation: isHovered ? 'workBreathe 3s ease-in-out infinite' : 'none',
                  }}>
                    {project.id === 1 && (
                      <g>
                        <circle cx="60" cy="60" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="60" cy="60" r="45" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="0.5" fill="none" />
                      </g>
                    )}
                    {project.id === 2 && (
                      <g>
                        <polygon points="60,20 100,40 100,80 60,100 20,80 20,40" stroke="white" strokeWidth="0.5" fill="none" />
                        <polygon points="60,35 85,47.5 85,72.5 60,85 35,72.5 35,47.5" stroke="white" strokeWidth="0.5" fill="none" />
                        <circle cx="60" cy="60" r="15" stroke="white" strokeWidth="0.5" fill="none" />
                      </g>
                    )}
                    {project.id === 3 && (
                      <g>
                        <polygon points="60,20 100,40 100,80 60,100 20,80 20,40" stroke="white" strokeWidth="0.5" fill="none" />
                        <polygon points="60,35 85,47.5 85,72.5 60,85 35,72.5 35,47.5" stroke="white" strokeWidth="0.5" fill="none" />
                      </g>
                    )}
                    {project.id === 4 && (
                      <g>
                        {[...Array(9)].map((_, i) => (
                          <rect
                            key={i}
                            x={(i % 3) * 35 + 15}
                            y={Math.floor(i / 3) * 35 + 15}
                            width="30"
                            height="30"
                            stroke="white"
                            strokeWidth="0.5"
                            fill="none"
                          />
                        ))}
                      </g>
                    )}
                  </svg>

                  {/* Status Badge - Redesigned as Pill */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '16px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${getStatusColor()}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: getStatusColor(),
                      boxShadow: project.status === 'Active' ? `0 0 12px ${getStatusColor()}` : 'none',
                      animation: project.status === 'Active' ? 'workGlow 2s ease-in-out infinite' : 'none',
                    }} />
                    <span style={{
                      fontSize: '0.688rem',
                      fontWeight: '400',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.02em',
                    }}>
                      {getStatusText()}
                    </span>
                  </div>
                </div>

                {/* Enhanced Glass Card Body */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  top: '180px',
                  background: isHovered
                    ? 'linear-gradient(135deg, var(--surface-secondary) 0%, var(--surface-primary) 100%)'
                    : 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
                  backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                  WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                  border: '1px solid var(--border-primary)',
                  borderTop: 'none',
                  borderRadius: '0 0 24px 24px',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered
                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 10px 20px rgba(0, 0, 0, 0.3)'
                    : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                }} />

                {/* Very light translucent overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  top: '180px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.02) 100%)',
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
                    marginBottom: '2rem',
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
                        {project.title}
                      </h3>
                      <p style={{
                        fontSize: '0.75rem',
                        fontWeight: '300',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.02em',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: isHovered ? 0.8 : 0.7,
                      }}>
                        {project.category}
                      </p>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'var(--surface-primary)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid var(--border-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
                      animation: isHovered ? 'workFloat 3s ease-in-out infinite' : 'none',
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
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div style={{
                    paddingTop: '1.5rem',
                    marginTop: '1.5rem',
                    borderTop: '1px solid var(--border-primary)',
                  }}>
                    {/* Metric */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}>
                        {React.createElement(Icon, {
                          size: 14,
                          style: {
                            color: 'var(--text-secondary)',
                            opacity: isHovered ? 0.7 : 0.6,
                            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          }
                        })}
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '400',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.02em',
                        }}>
                          {project.metric}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '300',
                          color: 'var(--text-tertiary)',
                          letterSpacing: '0.02em',
                        }}>
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Tags with enhanced glass */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}>
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.25rem 0.625rem',
                            borderRadius: '8px',
                            background: 'var(--surface-primary)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid var(--border-primary)',
                            fontSize: '0.688rem',
                            fontWeight: '300',
                            color: 'var(--text-secondary)',
                            letterSpacing: '0.01em',
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${tagIndex * 0.05}s`,
                            opacity: isHovered ? 0.8 : 0.7,
                            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );

            // Determine the URL based on project id
            const getProjectUrl = (id: number) => {
              switch (id) {
                case 1: return '/work/air-india';
                case 2: return '/work/mythos';
                case 3: return '/work/latent-space';
                case 4: return '/work/metamorphic-fractal-reflections';
                default: return null;
              }
            };

            const projectUrl = getProjectUrl(project.id);

            return projectUrl ? (
              <Link key={project.id} href={projectUrl as any} style={{ textDecoration: 'none' }}>
                {cardContent}
              </Link>
            ) : (
              <div key={project.id}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Dots */}
        {isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
          }}>
            {projects.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--border-primary)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* View All Work CTA */}
        <div style={{
          maxWidth: '1400px',
          margin: '5rem auto 0',
          display: 'flex',
          justifyContent: 'center',
          animation: inView ? 'scrollRevealUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
          opacity: inView ? 1 : 0,
        }}>
          <Link href="/work" style={{ textDecoration: 'none' }}>
            <button
              className="btn-primary"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '0.875rem 2rem',
                borderRadius: '28px',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                fontWeight: '400',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              View All Work
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
