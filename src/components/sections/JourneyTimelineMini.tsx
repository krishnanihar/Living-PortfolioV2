'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Map } from 'lucide-react';

interface JourneyTimelineMiniProps {
  act2InView: boolean;
  mounted: boolean;
}

export function JourneyTimelineMini({ act2InView, mounted }: JourneyTimelineMiniProps) {
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);

  const journeyMilestones = [
    {
      year: '1996',
      label: 'The Spark',
      id: 'hyderabad-roots',
      detail: 'Growing up in Hyderabad, tinkering with computers and flashing custom ROMs. The beginning of a lifelong curiosity.'
    },
    {
      year: '2019',
      label: 'BFA',
      id: 'undergrad-2018',
      detail: 'Bachelor of Fine Arts - exploring visual design, typography, and the foundations of creative thinking.'
    },
    {
      year: '2020',
      label: 'Infosys',
      id: 'infosys-2020',
      detail: 'UX Designer at Infosys - learning design systems, enterprise scale, and working with cross-functional teams on production features.'
    },
    {
      year: '2022',
      label: 'NID',
      id: 'nid-2021',
      detail: 'National Institute of Design Masters program - learning to build interfaces that breathe and systems thinking.'
    },
    {
      year: '2023',
      label: 'ISB',
      id: 'isb-2022',
      detail: 'Internship at ISB Digital Learning (online) - exploring digital education platforms and online learning experiences.'
    },
    {
      year: '2024',
      label: 'Air India',
      id: 'air-india-2024',
      detail: 'Leading design transformation at Air India DesignLAB - building systems that serve 450+ daily users in aviation operations.'
    },
  ];

  return (
    <div
      style={{
        marginTop: '5rem',
        opacity: act2InView && mounted ? 1 : 0,
        transform: act2InView && mounted ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s',
      }}
    >
      {/* Journey Section Title */}
      <h4
        style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
          fontWeight: '500',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        My Journey
      </h4>

      {/* Glass Card Container */}
      <div
        style={{
          position: 'relative',
          background: 'rgba(10, 10, 10, 0.15)',
          backdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
          borderRadius: '28px',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.01), 0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Interactive Journey Timeline */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
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

        {/* View Full Journey Link */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
        }}>
          <Link
            href="/journey"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(218, 14, 41, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(218, 14, 41, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
            }}
          >
            <Map size={18} style={{ strokeWidth: 2, color: 'rgba(255, 255, 255, 0.92)' }} />
            Explore Full Journey Timeline
            <ArrowRight size={18} style={{ strokeWidth: 2, color: 'rgba(255, 255, 255, 0.92)' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
