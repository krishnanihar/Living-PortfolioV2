'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Code2,
  Palette,
  Brain,
  Layers,
  BarChart3,
  Sparkles,
  ArrowRight,
  Award,
  Users,
  Zap
} from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
}

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  tags: string[];
  current?: boolean;
  type: 'fulltime' | 'contract' | 'internship';
}

interface Education {
  degree: string;
  school: string;
  period: string;
  type: string;
  skills: string[];
}

export function AboutSection() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
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

  const stats: Stat[] = [
    {
      value: "4+",
      label: "Years Experience",
      icon: <Award style={{ width: '20px', height: '20px' }} />,
      gradient: "rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1)"
    },
    {
      value: "12",
      label: "Products Shipped",
      icon: <Zap style={{ width: '20px', height: '20px' }} />,
      gradient: "rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1)"
    },
    {
      value: "450+",
      label: "Daily Active Users",
      icon: <Users style={{ width: '20px', height: '20px' }} />,
      gradient: "rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1)"
    }
  ];

  const skills: Skill[] = [
    { name: "Design Systems", level: 95, icon: <Layers style={{ width: '20px', height: '20px' }} /> },
    { name: "Data Viz", level: 90, icon: <BarChart3 style={{ width: '20px', height: '20px' }} /> },
    { name: "HCI", level: 85, icon: <Brain style={{ width: '20px', height: '20px' }} /> },
    { name: "Prototyping", level: 92, icon: <Code2 style={{ width: '20px', height: '20px' }} /> },
    { name: "Creative Coding", level: 88, icon: <Sparkles style={{ width: '20px', height: '20px' }} /> }
  ];

  const experience: Experience[] = [
    {
      role: "Product Designer",
      company: "Air India Limited",
      period: "Aug 2024 - Present",
      location: "Mumbai, India",
      description: "Leading design transformation for India's flag carrier. Building scalable design systems and reimagining digital experiences.",
      tags: ["Design Systems", "Aviation UX", "Digital Transformation"],
      current: true,
      type: "fulltime"
    },
    {
      role: "Digital Learning Designer",
      company: "Indian School of Business",
      period: "Sep - Dec 2023",
      description: "Designed digital learning experiences and interactive educational interfaces for executive education programs.",
      tags: ["EdTech", "Learning Design", "Interactive Media"],
      type: "contract"
    },
    {
      role: "UX Researcher",
      company: "WONGDOODY",
      period: "Mar - Oct 2021",
      description: "Conducted user research and created wireframes for digital products. Focused on HCI principles and usability testing.",
      tags: ["UX Research", "User Testing", "Wireframing"],
      type: "internship"
    }
  ];

  const education: Education[] = [
    {
      degree: "Master's in New Media Design",
      school: "National Institute of Design",
      period: "2021-2023",
      type: "Masters",
      skills: ["Prototyping", "Systems Thinking", "Creative Coding"]
    },
    {
      degree: "BFA in Design & Applied Arts",
      school: "JNTU",
      period: "2016-2020",
      type: "Bachelors",
      skills: ["Visual Design", "Typography", "Adobe Suite"]
    }
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#000000',
        color: 'rgba(255, 255, 255, 0.95)',
        paddingTop: '100px',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
      }}
    >
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px) translateZ(0);
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
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        transition: 'background 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />

      {/* Animated gradient background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-10rem',
          width: '24rem',
          height: '24rem',
          background: 'rgba(147, 51, 234, 0.4)',
          borderRadius: '50%',
          filter: 'blur(128px)',
          animation: 'pulse 4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '24rem',
          height: '24rem',
          background: 'rgba(59, 130, 246, 0.4)',
          borderRadius: '50%',
          filter: 'blur(128px)',
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: '2s',
        }} />
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(3rem, 8vw, 4rem)',
            fontWeight: '200',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            About
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1.125rem',
            fontWeight: '300',
            letterSpacing: '0.025em',
          }}>
            Building living interfaces at the intersection of design & code
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={isVisible ? 'animate-fade-in-up' : ''}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{stat.icon}</div>
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '300',
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Role & Philosophy */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem'
        }}>
          <div
            className={isVisible ? 'animate-fade-in-left' : ''}
            style={{ opacity: isVisible ? 1 : 0, position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                height: '100%',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div style={{
                color: 'rgba(147, 51, 234, 0.6)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
                fontWeight: '400',
              }}>Current Role</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '300',
                marginBottom: '1.5rem',
                color: 'rgba(255, 255, 255, 0.95)',
              }}>Position</h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.7',
                fontSize: '1rem',
                fontWeight: '300',
                letterSpacing: '0.01em',
              }}>
                I'm <span style={{ fontWeight: '600', color: 'rgba(255, 255, 255, 1)' }}>Nihar</span>, building living interfaces at{' '}
                <span style={{ fontWeight: '600', color: 'rgba(255, 255, 255, 1)' }}>Air India DesignLAB</span>. I specialize in design systems
                and data visualization that reduce decision latency.
              </p>
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(147, 51, 234, 0.8)',
              }}>
                <Briefcase style={{ width: '16px', height: '16px' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '300' }}>Open to opportunities</span>
              </div>
            </div>
          </div>

          <div
            className={isVisible ? 'animate-fade-in-right' : ''}
            style={{ opacity: isVisible ? 1 : 0, position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                height: '100%',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <div style={{
                color: 'rgba(59, 130, 246, 0.6)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
                fontWeight: '400',
              }}>Design Philosophy</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '300',
                marginBottom: '1.5rem',
                color: 'rgba(255, 255, 255, 0.95)',
              }}>Approach</h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.7',
                fontSize: '1rem',
                fontWeight: '300',
                letterSpacing: '0.01em',
              }}>
                Interfaces should breathe, remember, and evolve. Every system should reduce the time between
                thought and action.
              </p>
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(59, 130, 246, 0.8)',
              }}>
                <Sparkles style={{ width: '16px', height: '16px' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '300' }}>Human-centered design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              color: 'rgba(147, 51, 234, 0.6)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
              fontWeight: '400',
            }}>Core Expertise</div>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.95)',
            }}>Skills</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {skills.map((skill, index) => (
              <div
                key={index}
                className={isVisible ? 'animate-fade-in-up' : ''}
                style={{
                  animationDelay: `${index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div
                  style={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: activeSkill === index ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: activeSkill === index ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                    color: 'rgba(147, 51, 234, 0.8)',
                  }}>
                    {skill.icon}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '0.75rem',
                    fontWeight: '300',
                  }}>{skill.name}</div>
                  <div style={{
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(to right, rgba(147, 51, 234, 1), rgba(59, 130, 246, 1))',
                        borderRadius: '2px',
                        width: activeSkill === index ? `${skill.level}%` : '0%',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.95)',
            }}>Experience</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experience.map((exp, index) => (
              <div
                key={index}
                className={isVisible ? 'animate-fade-in-left' : ''}
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    const bg = e.currentTarget.previousElementSibling as HTMLElement;
                    if (bg) bg.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                    const bg = e.currentTarget.previousElementSibling as HTMLElement;
                    if (bg) bg.style.opacity = '0';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '0.5rem',
                        }}>
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 1)',
                          }}>{exp.role}</h3>
                          {exp.current && (
                            <span style={{
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              background: 'rgba(34, 197, 94, 0.2)',
                              color: 'rgba(34, 197, 94, 1)',
                              borderRadius: '12px',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                            }}>
                              Current
                            </span>
                          )}
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: 'rgba(255, 255, 255, 0.4)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.04)',
                            textTransform: 'capitalize',
                          }}>
                            {exp.type}
                          </span>
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem' }}>{exp.company}</div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontSize: '0.875rem',
                      }}>
                        <Calendar style={{ width: '16px', height: '16px' }} />
                        {exp.period}
                      </div>
                    </div>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.6',
                      fontSize: '0.95rem',
                      fontWeight: '300',
                    }}>{exp.description}</p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}>
                      {exp.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} style={{
                          padding: '0.375rem 0.75rem',
                          fontSize: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: 'rgba(255, 255, 255, 0.6)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.04)',
                          fontWeight: '300',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              color: 'rgba(147, 51, 234, 0.6)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
              fontWeight: '400',
            }}>Background</div>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.95)',
            }}>Education</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {education.map((edu, index) => (
              <div
                key={index}
                className={isVisible ? 'animate-fade-in-up' : ''}
                style={{
                  animationDelay: `${index * 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  <GraduationCap style={{
                    width: '32px',
                    height: '32px',
                    color: 'rgba(147, 51, 234, 0.8)',
                    marginBottom: '1rem',
                  }} />
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(147, 51, 234, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '0.25rem',
                    fontWeight: '400',
                  }}>
                    {edu.type}
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '300',
                    color: 'rgba(255, 255, 255, 1)',
                    marginBottom: '0.5rem',
                  }}>{edu.degree}</h3>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                  }}>{edu.school}</div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                  }}>{edu.period}</div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}>
                    {edu.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontWeight: '300',
                      }}>
                        {skill}{skillIndex < edu.skills.length - 1 && ' • '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}