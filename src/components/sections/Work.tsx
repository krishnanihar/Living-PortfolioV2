'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Circle, Hexagon, Grid3x3 } from 'lucide-react';

export function Work() {
  const [currentProject, setCurrentProject] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

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

    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const height = window.innerHeight;
        const newIndex = Math.round(scrollTop / height);
        setCurrentProject(newIndex);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const projects = [
    {
      id: 1,
      number: '01',
      icon: Circle,
      title: 'Design at Air India',
      category: 'Design Systems',
      description: 'Leading design transformation for India\'s flag carrier airline. Building scalable design systems and reimagining digital experiences across web, mobile, and in-flight entertainment platforms.',
      metric: '450+ Daily Active Users',
      tags: ['React', 'Design Systems', 'Aviation UX', 'Enterprise'],
      status: 'Active',
      year: '2024',
      color: '218, 14, 41',
    },
    {
      id: 2,
      number: '02',
      icon: Hexagon,
      title: 'Latent Space',
      category: 'Speculative Design',
      description: 'Speculative design exploration of dream technology ethics. Interactive prototype exploring the boundaries between consciousness, privacy, and AI through dream interface concepts.',
      metric: '∞ Unique Dream Maps',
      tags: ['Ethics', 'Consciousness', 'Future Concepts', 'Speculative'],
      status: 'Research',
      year: '2023',
      color: '140, 100, 255',
    },
    {
      id: 3,
      number: '03',
      icon: Grid3x3,
      title: 'Metamorphic Fractal Reflections',
      category: 'Psychedelic Journey',
      description: 'An immersive installation exploring consciousness through ego dissolution. Participants enter a bathroom mirror portal and traverse a trippy multiverse of liquid color and pattern-creatures.',
      metric: '2 Months Development',
      tags: ['TouchDesigner', 'Arduino', 'VR + Installation', 'Interactive Art'],
      status: 'Completed',
      year: '2023',
      color: '50, 200, 150',
    }
  ];

  const scrollToProject = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'auto'
      });
    }
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

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          height: '100vh',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'auto',
          background: '#000000',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(218, 14, 41, 0.015) 0%,
            transparent 50%)`,
          pointerEvents: 'none',
          transition: 'background 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />

        {/* Side Navigation Dots */}
        <div style={{
          position: 'fixed',
          right: '3rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
        }}>
          {projects.map((_, index) => (
            <div
              key={index}
              onClick={() => scrollToProject(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: currentProject === index
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: currentProject === index ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Project Sections */}
        {projects.map((project, index) => {
          const Icon = project.icon;
          const isActive = currentProject === index;
          const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

          const handleMouseMove = (e: React.MouseEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const x = ((e.clientY - centerY) / (rect.height / 2)) * 1.5;
            const y = ((e.clientX - centerX) / (rect.width / 2)) * -1.5;
            setCardTilt({ x, y });
          };

          const handleMouseLeave = () => {
            setCardTilt({ x: 0, y: 0 });
          };

          return (
            <section
              key={project.id}
              style={{
                height: '100vh',
                scrollSnapAlign: 'start',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                perspective: '2000px',
              }}
            >
              {/* Project Number Background */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
                fontSize: '20vw',
                fontWeight: '200',
                color: 'rgba(255, 255, 255, 0.02)',
                letterSpacing: '-0.05em',
                pointerEvents: 'none',
                animation: isActive ? 'fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }}>
                {project.number}
              </div>

              {/* Main Card Container */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={project.id === 1 ? () => window.location.href = '/work/air-india' : undefined}
                style={{
                  width: '100%',
                  maxWidth: '1400px',
                  height: '80vh',
                  maxHeight: '700px',
                  position: 'relative',
                  transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: project.id === 1 ? 'pointer' : 'default',
                }}
              >
                {/* Card Background Layers */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  background: `linear-gradient(135deg,
                    rgba(255, 255, 255, 0.03) 0%,
                    rgba(255, 255, 255, 0.005) 100%)`,
                  backdropFilter: 'blur(60px) saturate(130%) brightness(0.85)',
                  WebkitBackdropFilter: 'blur(60px) saturate(130%) brightness(0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: `
                    inset 0 2px 0 rgba(255, 255, 255, 0.04),
                    inset 0 -2px 0 rgba(0, 0, 0, 0.3),
                    0 30px 60px rgba(0, 0, 0, 0.5)
                  `,
                  overflow: 'hidden',
                }}>
                  {/* Shimmer Effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%)',
                    animation: isActive ? 'shimmer 3s ease-out' : 'none',
                  }} />
                </div>

                {/* Dark Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Content Grid */}
                <div style={{
                  position: 'relative',
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderRadius: '32px',
                  overflow: 'hidden',
                }}>
                  {/* Left Side - Image Placeholder */}
                  <div style={{
                    position: 'relative',
                    background: `linear-gradient(135deg,
                      rgba(${project.color}, 0.03) 0%,
                      rgba(0, 0, 0, 0.6) 100%)`,
                    overflow: 'hidden',
                    borderRadius: '32px 0 0 32px',
                  }}>
                    {/* Glass overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.01)',
                      backdropFilter: 'blur(40px)',
                      WebkitBackdropFilter: 'blur(40px)',
                    }} />

                    {/* Pattern */}
                    <svg style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '300px',
                      height: '300px',
                      opacity: 0.05,
                      animation: isActive ? 'rotate 30s linear infinite' : 'none',
                    }}>
                      {project.id === 1 && (
                        <g>
                          <circle cx="150" cy="150" r="60" stroke="white" strokeWidth="0.5" fill="none" />
                          <circle cx="150" cy="150" r="90" stroke="white" strokeWidth="0.5" fill="none" />
                          <circle cx="150" cy="150" r="120" stroke="white" strokeWidth="0.5" fill="none" />
                          <circle cx="150" cy="150" r="140" stroke="white" strokeWidth="0.5" fill="none" />
                        </g>
                      )}
                      {project.id === 2 && (
                        <g>
                          <polygon points="150,50 250,100 250,200 150,250 50,200 50,100" stroke="white" strokeWidth="0.5" fill="none" />
                          <polygon points="150,80 220,115 220,185 150,220 80,185 80,115" stroke="white" strokeWidth="0.5" fill="none" />
                          <polygon points="150,110 190,130 190,170 150,190 110,170 110,130" stroke="white" strokeWidth="0.5" fill="none" />
                        </g>
                      )}
                      {project.id === 3 && (
                        <g>
                          {[...Array(16)].map((_, i) => (
                            <rect
                              key={i}
                              x={(i % 4) * 70 + 10}
                              y={Math.floor(i / 4) * 70 + 10}
                              width="60"
                              height="60"
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
                      top: '2rem',
                      left: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: project.status === 'Active'
                          ? 'rgba(52, 211, 153, 0.8)'
                          : project.status === 'Research'
                          ? 'rgba(251, 191, 36, 0.8)'
                          : 'rgba(255, 255, 255, 0.3)',
                        boxShadow: project.status === 'Active'
                          ? '0 0 20px rgba(52, 211, 153, 0.6)'
                          : 'none',
                        animation: project.status === 'Active' ? 'pulse 2s ease-in-out infinite' : 'none',
                      }} />
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.5)',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div style={{
                    position: 'relative',
                    padding: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
                  }}>
                    {/* Category */}
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '300',
                      color: `rgba(${project.color}, 0.8)`,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      animation: isActive ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' : 'none',
                    }}>
                      {project.category}
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: '200',
                      color: 'rgba(255, 255, 255, 0.95)',
                      letterSpacing: '-0.02em',
                      marginBottom: '2rem',
                      lineHeight: '1.1',
                      animation: isActive ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' : 'none',
                    }}>
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p style={{
                      fontSize: '1rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.8',
                      letterSpacing: '0.02em',
                      marginBottom: '3rem',
                      maxWidth: '500px',
                      animation: isActive ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' : 'none',
                    }}>
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3rem',
                      marginBottom: '3rem',
                      animation: isActive ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' : 'none',
                    }}>
                      <div>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '200',
                          color: 'rgba(255, 255, 255, 0.9)',
                          marginBottom: '0.25rem',
                        }}>
                          {project.metric.split(' ')[0]}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          fontWeight: '300',
                          color: 'rgba(255, 255, 255, 0.4)',
                          letterSpacing: '0.05em',
                        }}>
                          {project.metric.split(' ').slice(1).join(' ')}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '200',
                          color: 'rgba(255, 255, 255, 0.9)',
                          marginBottom: '0.25rem',
                        }}>
                          {project.year}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          fontWeight: '300',
                          color: 'rgba(255, 255, 255, 0.4)',
                          letterSpacing: '0.05em',
                        }}>
                          Year
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      flexWrap: 'wrap',
                      marginBottom: '3rem',
                      animation: isActive ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' : 'none',
                    }}>
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.04)',
                            fontSize: '0.75rem',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.5)',
                            letterSpacing: '0.02em',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <div style={{
                      animation: isActive ? 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' : 'none',
                    }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem 2rem',
                          borderRadius: '16px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '0.875rem',
                          fontWeight: '400',
                          letterSpacing: '0.02em',
                          cursor: project.id === 1 ? 'default' : 'pointer',
                          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          animation: 'float 4s ease-in-out infinite',
                          pointerEvents: project.id === 1 ? 'none' : 'auto',
                        }}
                        onMouseEnter={(e) => {
                          if (project.id !== 1) {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.transform = 'translateX(5px)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (project.id !== 1) {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          }
                        }}
                      >
                        View Project
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Next Project Indicator */}
                {index < projects.length - 1 && (
                  <div
                    onClick={() => scrollToProject(index + 1)}
                    style={{
                      position: 'absolute',
                      bottom: '-4rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      animation: 'bounce 2s ease-in-out infinite',
                    }}
                  >
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.4)',
                      letterSpacing: '0.05em',
                    }}>
                      Next Project
                    </span>
                    <ArrowDown size={20} style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                    }} />
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}