'use client';

import React, { useState, useEffect } from 'react';
import { HeroCard } from '@/components/HeroCard';
import { User } from 'lucide-react';

export function HeroCardSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('hero-card-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero-card-section"
      style={{
        background: 'var(--bg-primary)',
        fontFamily: 'Inter, sans-serif',
        padding: '6rem clamp(1.5rem, 3vw, 2.5rem)',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        {/* Section Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '4rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(147, 51, 234, 0.08))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(218, 14, 41, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(218, 14, 41, 0.15)',
            }}
          >
            <User size={18} style={{ color: 'rgba(218, 14, 41, 0.95)' }} />
          </div>

          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              color: 'rgba(218, 14, 41, 0.95)',
            }}
          >
            Introduction
          </h2>

          <div
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(218, 14, 41, 0.2)',
              fontSize: '0.75rem',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}
          >
            Deep Dive
          </div>
        </div>

        {/* HeroCard Container */}
        <div
          style={{
            maxWidth: 'clamp(640px, 85vw, 720px)',
            margin: '0 auto',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
