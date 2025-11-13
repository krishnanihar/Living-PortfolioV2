'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Map } from 'lucide-react';

interface AboutSectionV2Props {
  className?: string;
}

export default function AboutSectionV2({ className = '' }: AboutSectionV2Props) {
  const [mounted, setMounted] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
      detail: 'Bachelor of Fine Arts - exploring visual design, typography, and the foundations of creative thinking.',
      logoFile: 'bfa.jpeg',
      organization: 'JNAFAU'
    },
    {
      year: '2020',
      label: 'Infosys',
      id: 'infosys-2020',
      detail: 'UX Designer at Infosys - learning design systems, enterprise scale, and working with cross-functional teams on production features.',
      logoFile: 'infosys.svg',
      organization: 'Infosys'
    },
    {
      year: '2021',
      label: 'NID',
      id: 'nid-2021',
      detail: 'National Institute of Design Masters program - learning to build interfaces that breathe and systems thinking.',
      logoFile: 'nid.svg',
      organization: 'National Institute of Design'
    },
    {
      year: '2022',
      label: 'ISB',
      id: 'isb-2022',
      detail: 'Internship at ISB Digital Learning (online) - exploring digital education platforms and online learning experiences.',
      logoFile: 'isb.png',
      organization: 'Indian School of Business'
    },
    {
      year: '2024',
      label: 'Air India',
      id: 'air-india-2024',
      detail: 'Leading design transformation at Air India DesignLAB - building systems that serve 450+ daily users in aviation operations.',
      logoFile: 'air-india.svg',
      organization: 'Air India'
    },
  ];

  return (
    <section
      id="about-section"
      className={className}
      style={{
        background: 'transparent',
        fontFamily: 'Inter, sans-serif',
        padding: '6rem clamp(1.5rem, 3vw, 2.5rem)',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Glassmorphic About Card */}
        <div style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.15) 0%, rgba(10, 10, 10, 0.1) 100%)',
          backdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
          borderRadius: '28px',
          padding: 'clamp(2.5rem, 5vw, 3rem)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}>
          {/* Profile + Intro Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '2.5rem',
          }}>
            {/* Profile Picture */}
            <div style={{
              position: 'relative',
              width: isMobile ? '110px' : '140px',
              height: isMobile ? '110px' : '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))',
              padding: '4px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              flexShrink: 0,
              margin: isMobile ? '0 auto 1rem' : '0',
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(60px) saturate(120%)',
              }}>
                <Image
                  src="/images/profile/mypic.png"
                  alt="Nihar - Product Designer at Air India DesignLAB"
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
                color: 'rgba(255, 255, 255, 0.98)',
              }}>
                Hi, I'm Nihar
              </h1>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                fontWeight: '300',
                lineHeight: '1.7',
                letterSpacing: '0.01em',
              }}>
                Product Designer building living interfaces at{' '}
                <span style={{ color: 'var(--brand-red)', fontWeight: '500' }}>Air India DesignLAB</span>.
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
              gap: '0.75rem',
              overflowX: 'auto',
              marginBottom: '1.5rem',
              padding: '0.5rem 0',
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
                      flex: 1,
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      minWidth: '80px',
                    }}
                  >
                    {/* Logo Container */}
                    <div style={{
                      width: 'clamp(80px, 9vw, 96px)',
                      height: 'clamp(80px, 9vw, 96px)',
                      padding: '14px',
                      borderRadius: '18px',
                      background: activeTimeline === milestone.id
                        ? 'rgba(218, 14, 41, 0.12)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px) saturate(110%)',
                      border: activeTimeline === milestone.id
                        ? '2px solid var(--brand-red)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: activeTimeline === milestone.id
                        ? '0 0 24px rgba(218, 14, 41, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)'
                        : '0 2px 8px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                      {milestone.logoFile ? (
                        <Image
                          src={`/logos/${milestone.logoFile}`}
                          alt={milestone.organization || milestone.label}
                          width={62}
                          height={62}
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
                              : 'rgba(0, 0, 0, 0.4)',
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
                      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
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
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  background: 'rgba(218, 14, 41, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(218, 14, 41, 0.2)',
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

            {/* View Full Journey Button */}
            <Link
              href="/journey"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1.5rem',
                background: 'rgba(218, 14, 41, 0.1)',
                border: '1px solid rgba(218, 14, 41, 0.3)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.92)',
                fontSize: '0.9375rem',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <Map size={18} style={{ strokeWidth: 2, color: 'rgba(255, 255, 255, 0.92)' }} />
              Explore Full Journey
              <ArrowRight size={18} style={{ strokeWidth: 2, color: 'rgba(255, 255, 255, 0.92)' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
