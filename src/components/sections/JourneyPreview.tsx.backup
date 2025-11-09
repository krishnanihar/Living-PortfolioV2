'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function JourneyPreview() {
  const milestones = [
    { year: '2005', label: 'Spark', opacity: 0.4 },
    { year: '2018', label: 'BFA', opacity: 0.5 },
    { year: '2021', label: 'NID', opacity: 0.6 },
    { year: '2024', label: 'Now', opacity: 1 },
  ];

  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: '6rem 1.5rem',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(218, 14, 41, 0.08)',
            border: '1px solid rgba(218, 14, 41, 0.2)',
            borderRadius: '20px',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
          }}>
            <Compass size={16} />
            <span>The Journey</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '200',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}>
            From Curiosity to Craft
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7',
          }}>
            A timeline of design education, enterprise experience, and systems thinking
          </p>
        </div>

        {/* Timeline Preview */}
        <div style={{
          position: 'relative',
          padding: '3rem 0',
          marginBottom: '3rem',
        }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.6), rgba(218, 14, 41, 0.2))',
            transform: 'translateY(-50%)',
          }} />

          {/* Milestone Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 10%',
            position: 'relative',
          }}>
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: `rgba(218, 14, 41, ${milestone.opacity})`,
                  boxShadow: `0 0 20px rgba(218, 14, 41, ${milestone.opacity * 0.5})`,
                  border: '2px solid rgba(218, 14, 41, 0.3)',
                  transition: 'all 0.3s ease',
                }} />
                <div style={{
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.25rem',
                  }}>
                    {milestone.year}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    opacity: milestone.opacity,
                  }}>
                    {milestone.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
        }}>
          <Link
            href="/journey"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))',
              border: '1px solid rgba(218, 14, 41, 0.3)',
              borderRadius: '16px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
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
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
