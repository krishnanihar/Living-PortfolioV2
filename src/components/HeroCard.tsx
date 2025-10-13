'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export function HeroCard() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Name & Title */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
      }}>
        <h1 style={{
          fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
          fontWeight: '200',
          color: 'var(--text-primary)',
          marginBottom: '0.625rem',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        }}>
          Nihar Sunkara
        </h1>

        <p style={{
          fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
          fontWeight: '300',
          color: 'var(--text-secondary)',
          letterSpacing: '0.02em',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        }}>
          Product & New Media Designer
        </p>
      </div>

      {/* Main Statement */}
      <p style={{
        fontSize: 'clamp(1.0625rem, 2.25vw, 1.375rem)',
        fontWeight: '300',
        color: 'var(--text-primary)',
        textAlign: 'center',
        lineHeight: '1.6',
        maxWidth: 'clamp(520px, 90%, 580px)',
        margin: '0 auto clamp(1.5rem, 2.5vw, 2rem)',
        letterSpacing: '-0.01em',
        opacity: 0,
        animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
      }}>
        Building living interfaces that breathe, remember, and evolve
      </p>

      {/* Current Role Badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
        opacity: 0,
        animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          background: 'var(--surface-primary)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-primary)',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '300',
          color: 'var(--text-secondary)',
          letterSpacing: '0.01em',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(218, 14, 41, 0.8)',
            boxShadow: '0 0 8px rgba(218, 14, 41, 0.4)',
          }} />
          Air India DesignLAB • 450+ daily users
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(0.75rem, 1.5vw, 1rem)',
        flexWrap: 'wrap',
        opacity: 0,
        animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
      }}>
        {/* Primary: View Work */}
        <Link
          href="/work"
          onMouseEnter={() => setHoveredButton('work')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: 'clamp(0.75rem, 1.5vw, 0.875rem) clamp(1.5rem, 2.5vw, 1.75rem)',
            background: hoveredButton === 'work'
              ? 'linear-gradient(135deg, rgba(218, 14, 41, 0.18), rgba(255, 255, 255, 0.08))'
              : 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))',
            border: hoveredButton === 'work'
              ? '1px solid rgba(218, 14, 41, 0.5)'
              : '1px solid rgba(218, 14, 41, 0.3)',
            borderRadius: '16px',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            fontWeight: '400',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hoveredButton === 'work' ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hoveredButton === 'work'
              ? '0 12px 32px rgba(218, 14, 41, 0.2)'
              : 'none',
          }}
        >
          <span>View Work</span>
          <ArrowRight size={16} />
        </Link>

        {/* Secondary: Contact */}
        <Link
          href="/contact"
          onMouseEnter={() => setHoveredButton('contact')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: 'clamp(0.75rem, 1.5vw, 0.875rem) clamp(1.5rem, 2.5vw, 1.75rem)',
            background: hoveredButton === 'contact'
              ? 'var(--surface-secondary)'
              : 'var(--surface-primary)',
            border: hoveredButton === 'contact'
              ? '1px solid var(--border-secondary)'
              : '1px solid var(--border-primary)',
            borderRadius: '16px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            fontWeight: '400',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hoveredButton === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hoveredButton === 'contact'
              ? '0 8px 24px rgba(0, 0, 0, 0.2)'
              : 'none',
          }}
        >
          <Mail size={16} />
          <span>Get in Touch</span>
        </Link>
      </div>
    </div>
  );
}
