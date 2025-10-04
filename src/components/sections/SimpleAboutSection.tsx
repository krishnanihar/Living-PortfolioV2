'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SimpleAboutSectionProps {
  className?: string;
}

export default function SimpleAboutSection({ className = '' }: SimpleAboutSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const journeyMilestones = [
    { year: '2005', label: 'The Spark', opacity: 0.4, id: 'hyderabad-roots' },
    { year: '2018', label: 'BFA Journey', opacity: 0.55, id: 'undergrad-2018' },
    { year: '2021', label: 'NID Masters', opacity: 0.7, id: 'nid-2021' },
    { year: '2024', label: 'Air India', opacity: 1, id: 'air-india-2024' },
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');

        @keyframes aboutFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes milestonePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(218, 14, 41, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(218, 14, 41, 0);
          }
        }
      `}</style>

      <section style={{
        background: 'var(--bg-primary)',
        fontFamily: 'Inter, sans-serif',
        padding: '3rem 1.5rem',
        position: 'relative',
      }} className={className}>

        {/* Section Header */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 5rem',
          animation: 'aboutFadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
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
                background: 'var(--text-secondary)',
              }} />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
            }}>
              About
            </h2>
          </div>
        </div>

        {/* Single Unified Card */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              animation: 'aboutFadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
              transform: isHovered ? 'translateY(-4px) scale(1.005)' : 'translateY(0) scale(1)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Glass Card Body */}
            <div style={{
              position: 'relative',
              background: isHovered
                ? 'linear-gradient(135deg, var(--surface-secondary) 0%, var(--surface-primary) 100%)'
                : 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
              backdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              WebkitBackdropFilter: 'blur(40px) saturate(120%) brightness(0.9)',
              border: '1px solid var(--border-primary)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isHovered
                ? 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 10px 20px rgba(0, 0, 0, 0.3)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
            }}>

              {/* Introduction */}
              <p style={{
                fontSize: 'clamp(0.938rem, 2vw, 1.125rem)',
                fontWeight: '300',
                color: 'var(--text-primary)',
                lineHeight: '1.7',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
                maxWidth: '900px',
                opacity: isHovered ? 0.9 : 0.8,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                I'm Nihar, crafting interfaces that breathe, remember, and evolve. Currently leading design transformation at Air India DesignLAB, where I build systems that serve 450+ daily users.
              </p>

              {/* Two-Column Grid: Key Facts + Journey */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(2rem, 4vw, 4rem)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
              }}>

                {/* Left Column: Key Facts */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                    opacity: 0.7,
                  }}>
                    KEY FACTS
                  </h3>

                  {[
                    { label: 'Education', value: 'NID Masters (2021-2023) + BFA (2016-2020)' },
                    { label: 'Experience', value: '4+ Years, 12 Products Shipped' },
                    { label: 'Specialization', value: 'Aviation UX, Systems Thinking, Creative Coding' },
                    { label: 'Currently', value: 'Air India DesignLAB, 450+ Daily Users' },
                  ].map((fact, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}>
                      <div style={{
                        fontSize: '0.688rem',
                        fontWeight: '400',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.05em',
                        opacity: 0.6,
                      }}>
                        {fact.label}
                      </div>
                      <div style={{
                        fontSize: '0.813rem',
                        fontWeight: '300',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5',
                        opacity: isHovered ? 0.8 : 0.7,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}>
                        {fact.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Journey Timeline */}
                <div style={{
                  position: 'relative',
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    marginBottom: '1.5rem',
                    opacity: 0.7,
                  }}>
                    THE JOURNEY
                  </h3>

                  {/* Timeline Container */}
                  <div style={{
                    position: 'relative',
                  }}>
                    {/* Vertical Timeline Line */}
                    <div style={{
                      position: 'absolute',
                      left: '8px',
                      top: '0',
                      bottom: '0',
                      width: '2px',
                      background: 'linear-gradient(180deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.6), rgba(218, 14, 41, 0.2))',
                    }} />

                    {/* Milestone Items */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.75rem',
                      paddingLeft: '2rem',
                    }}>
                      {journeyMilestones.map((milestone, index) => {
                        const isMilestoneHovered = hoveredMilestone === index;

                        return (
                          <Link
                            key={milestone.year}
                            href={`/journey#${milestone.id}`}
                            onMouseEnter={() => setHoveredMilestone(index)}
                            onMouseLeave={() => setHoveredMilestone(null)}
                            style={{
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              textDecoration: 'none',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                              transform: isMilestoneHovered ? 'translateX(4px)' : 'translateX(0)',
                            }}
                          >
                            {/* Dot - Perfectly centered on line at 8px + 1px = 9px center */}
                            <div style={{
                              position: 'absolute',
                              left: '-31px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              background: `rgba(218, 14, 41, ${milestone.opacity})`,
                              boxShadow: `0 0 20px rgba(218, 14, 41, ${milestone.opacity * 0.5})`,
                              border: '2px solid rgba(218, 14, 41, 0.3)',
                              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                              animation: isMilestoneHovered ? 'milestonePulse 2s ease-in-out infinite' : 'none',
                              transform: isMilestoneHovered ? 'scale(1.2)' : 'scale(1)',
                            }} />

                            {/* Year + Label */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              gap: '0.75rem',
                            }}>
                              <span style={{
                                fontSize: '0.688rem',
                                color: 'var(--text-muted)',
                                fontWeight: '400',
                                letterSpacing: '0.05em',
                                opacity: isMilestoneHovered ? 1 : 0.6,
                                transition: 'all 0.3s ease',
                                minWidth: '35px',
                              }}>
                                {milestone.year}
                              </span>
                              <span style={{
                                fontSize: '0.875rem',
                                fontWeight: '400',
                                color: 'var(--text-primary)',
                                opacity: isMilestoneHovered ? 1 : milestone.opacity,
                                transition: 'all 0.3s ease',
                              }}>
                                {milestone.label}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer CTA */}
              <div style={{
                paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
                borderTop: '1px solid var(--border-primary)',
              }}>
                <Link
                  href="/journey"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))',
                    border: '1px solid rgba(218, 14, 41, 0.3)',
                    borderRadius: '16px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.18), rgba(255, 255, 255, 0.08))';
                    e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(218, 14, 41, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))';
                    e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span>Explore the Full Journey</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
