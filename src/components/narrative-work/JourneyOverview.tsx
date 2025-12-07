'use client';

import React from 'react';
import { JourneySection } from '../journey/JourneySection';

/**
 * Journey Overview Component - Logo-Based 3-Card System
 *
 * Clean, professional visual resume featuring 3 key milestones:
 * - NID (Foundation)
 * - Air India (Current)
 * - Future Research (Vision)
 *
 * Features:
 * - Logo-first design inspired by About page
 * - Premium 5-layer glassmorphism
 * - Dramatic scale hierarchy (280px → 320px → 360px)
 * - Click-to-scroll navigation
 * - WCAG AA accessibility
 */
export function JourneyOverview() {
  return (
    <section
      role="region"
      aria-label="My Professional Journey"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '8rem 2rem',
        background: 'var(--bg-primary)', // Clean black background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Section Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        maxWidth: '800px',
      }}>
        <h2 style={{
          fontSize: 'clamp(3rem, 6vw, 4rem)',
          fontWeight: '300',
          fontFamily: 'var(--font-space-grotesk)',
          color: 'var(--text-95)',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
        }}>
          My Professional Journey
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-60)',
          fontFamily: 'var(--font-dm-sans)',
        }}>
          2021 → 2025 → Future
        </p>
      </div>

      {/* Journey Cards */}
      <JourneySection />
    </section>
  );
}
