'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Circle, Hexagon, Grid3X3, Heart } from 'lucide-react';
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
}

interface WorkSectionProps {
  className?: string;
}

export default function WorkSection({ className = '' }: WorkSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let rafId: number;
    let isThrottled = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isThrottled) return;

      isThrottled = true;
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setMousePos({ x, y });
        isThrottled = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
      year: '2024'
    },
    {
      id: 2,
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Speculative design exploration of dream technology ethics. Interactive prototype exploring the boundaries between consciousness, privacy, and AI through dream interface concepts.',
      metric: '∞ Unique Dream Maps',
      tags: ['Ethics', 'Consciousness', 'Future Concepts'],
      status: 'Research',
      year: '2023'
    },
    {
      id: 3,
      icon: Grid3X3,
      title: 'Metamorphic Fractal Reflections',
      category: 'Psychedelic Journey',
      description: 'An immersive installation exploring consciousness through ego dissolution. Participants enter a bathroom mirror portal and traverse a trippy multiverse of liquid color and pattern-creatures.',
      metric: '2 Months Development',
      tags: ['TouchDesigner', 'Arduino', 'VR + Installation'],
      status: 'Completed',
      year: '2023'
    },
    {
      id: 4,
      icon: Heart,
      title: 'Living Organism',
      category: 'Meta Design',
      description: 'This portfolio website itself - architected to feel like a living organism. Breathing animations, consciousness-aware interactions, and adaptive micro-behaviors that respond to user presence and intent.',
      metric: 'Living & Breathing',
      tags: ['Next.js', 'Framer Motion', 'Consciousness UI'],
      status: 'Active',
      year: '2024'
    }
  ];

  const calculateTilt = (e: React.MouseEvent, cardRef: HTMLElement | null) => {
    if (!cardRef) return { x: 0, y: 0 };
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * 2.5; // Max 2.5 degrees
    const y = ((e.clientX - centerX) / (rect.width / 2)) * -2.5; // Max 2.5 degrees, inverted
    return { x, y };
  };

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
      `}</style>

      <section style={{
        background: '#000000',
        fontFamily: 'Inter, sans-serif',
        padding: '3rem 1.5rem',
        position: 'relative',
      }} className={className}>
        {/* Subtle background gradient */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(218, 14, 41, 0.01) 0%,
            transparent 40%)`,
          pointerEvents: 'none',
          transition: 'background 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />

        {/* Section Header */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 5rem',
          animation: 'workFadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
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
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.6)',
              }} />
            </div>
            <h2 style={{
              fontSize: '1rem',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.05em',
            }}>
              Selected Work
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
          perspective: '2000px',
        }}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredCard === project.id;
            const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
            const [cardRef, setCardRef] = useState<HTMLElement | null>(null);

            return (
              <div
                key={project.id}
                ref={(ref) => setCardRef(ref)}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setCardTilt({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => {
                  if (isHovered) {
                    const tilt = calculateTilt(e, cardRef);
                    setCardTilt(tilt);
                  }
                }}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  animation: `workFadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s both`,
                  transform: isHovered
                    ? `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) translateZ(10px) scale(1.01)`
                    : 'rotateX(0) rotateY(0) translateZ(0) scale(1)',
                  transformStyle: 'preserve-3d' as const,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Image Placeholder with enhanced glass */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '180px',
                  background: `linear-gradient(135deg,
                    rgba(${project.id === 1 ? '218, 14, 41' : project.id === 2 ? '140, 100, 255' : '50, 200, 150'}, 0.02) 0%,
                    rgba(0, 0, 0, 0.4) 100%)`,
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

                  {/* Gradient Overlay to blend into card */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.95) 100%)',
                    pointerEvents: 'none',
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
                      </g>
                    )}
                    {project.id === 3 && (
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

                  {/* Status Indicator */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: project.status === 'Active'
                      ? 'rgba(52, 211, 153, 0.8)'
                      : project.status === 'Research'
                      ? 'rgba(251, 191, 36, 0.8)'
                      : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: project.status === 'Active'
                      ? '0 0 12px rgba(52, 211, 153, 0.5)'
                      : 'none',
                    animation: project.status === 'Active' ? 'workGlow 2s ease-in-out infinite' : 'none',
                  }} />
                </div>

                {/* Enhanced Glass Card Body */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  top: '180px',
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%)',
                  backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                  WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderTop: 'none',
                  borderRadius: '0 0 24px 24px',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered
                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 10px 20px rgba(0, 0, 0, 0.3)'
                    : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
                }} />

                {/* Dark translucent overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  top: '180px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
                  pointerEvents: 'none',
                  opacity: isHovered ? 0.5 : 1,
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
                        color: 'rgba(255, 255, 255, 0.9)',
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
                        color: 'rgba(255, 255, 255, 0.4)',
                        letterSpacing: '0.02em',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: isHovered ? 0.6 : 0.4,
                      }}>
                        {project.category}
                      </p>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
                      animation: isHovered ? 'workFloat 3s ease-in-out infinite' : 'none',
                    }}>
                      <ArrowUpRight size={14} style={{
                        color: 'rgba(255, 255, 255, 0.4)',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.813rem',
                    fontWeight: '300',
                    color: 'rgba(255, 255, 255, 0.5)',
                    lineHeight: '1.6',
                    letterSpacing: '0.01em',
                    marginBottom: project.id === 1 ? '1rem' : 'auto',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isHovered ? 0.7 : 0.5,
                  }}>
                    {project.description}
                  </p>

                  {/* Case Study Link for Air India */}
                  {project.id === 1 && (
                    <Link
                      href="/work/air-india"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '400',
                        color: 'rgba(218, 14, 41, 0.8)',
                        textDecoration: 'none',
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: isHovered ? 1 : 0.8,
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                        marginBottom: 'auto',
                      }}
                    >
                      View Full Case Study
                      <ArrowUpRight size={12} />
                    </Link>
                  )}

                  {/* Footer */}
                  <div style={{
                    paddingTop: '1.5rem',
                    marginTop: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
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
                        <Icon size={14} style={{
                          color: 'rgba(255, 255, 255, 0.3)',
                          opacity: isHovered ? 0.5 : 0.3,
                          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }} />
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '400',
                          color: 'rgba(255, 255, 255, 0.6)',
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
                          color: 'rgba(255, 255, 255, 0.3)',
                          letterSpacing: '0.02em',
                          opacity: isHovered ? 0.5 : 0.3,
                          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}>
                          {project.status}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: '300',
                          color: 'rgba(255, 255, 255, 0.3)',
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
                            background: 'rgba(255, 255, 255, 0.02)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.03)',
                            fontSize: '0.688rem',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.4)',
                            letterSpacing: '0.01em',
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${tagIndex * 0.05}s`,
                            opacity: isHovered ? 0.6 : 0.4,
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
          })}
        </div>
      </section>
    </>
  );
}