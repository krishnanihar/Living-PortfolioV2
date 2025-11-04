'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { HeroIntro } from '../about/HeroIntro';
import { BentoGrid } from '../about/BentoGrid';

interface AboutSectionV2Props {
  className?: string;
}

export default function AboutSectionV2({ className = '' }: AboutSectionV2Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-primary)',
        fontFamily: 'Inter, sans-serif',
        padding: '6rem 1.5rem',
        position: 'relative',
        minHeight: '100vh',
      }}
      className={className}
    >
      {/* Container */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(218, 14, 41, 0.08))',
              backdropFilter: 'blur(100px) saturate(150%)',
              WebkitBackdropFilter: 'blur(100px) saturate(150%)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.41), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgb(251, 191, 36)',
                boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
              }}
            />
          </div>

          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              color: 'rgba(251, 191, 36, 0.95)',
            }}
          >
            About
          </h2>

          <div
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(100px) saturate(150%)',
              WebkitBackdropFilter: 'blur(100px) saturate(150%)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              fontSize: '0.75rem',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
            }}
          >
            Designer · Hyderabad → San Francisco
          </div>
        </motion.div>

        {/* Hero Intro */}
        <HeroIntro />

        {/* Bento Grid */}
        <BentoGrid />

        {/* Footer CTAs */}
        <motion.div
          ref={footerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: '4rem',
            marginTop: '4rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {/* Primary CTA */}
            <Link
              href="/journey"
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.15))',
                border: '1.5px solid rgba(218, 14, 41, 0.4)',
                borderRadius: '15px',
                color: 'rgba(255, 255, 255, 0.95)',
                textDecoration: 'none',
                fontSize: '0.938rem',
                fontWeight: '500',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0px 8px 30px rgba(218, 14, 41, 0.25), 0px 0px 12px rgba(255, 255, 255, 0.03) inset',
                backdropFilter: 'blur(100px) saturate(150%)',
                WebkitBackdropFilter: 'blur(100px) saturate(150%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.3), rgba(218, 14, 41, 0.2))';
                e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0px 16px 48px rgba(218, 14, 41, 0.35), 0px 0px 16px rgba(255, 255, 255, 0.04) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.15))';
                e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.4)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0px 8px 30px rgba(218, 14, 41, 0.25), 0px 0px 12px rgba(255, 255, 255, 0.03) inset';
              }}
            >
              <span>Explore the Full Journey</span>
              <ArrowRight size={18} />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact"
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '15px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.938rem',
                fontWeight: '400',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(100px) saturate(150%)',
                WebkitBackdropFilter: 'blur(100px) saturate(150%)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0px 12px 40px rgba(0, 0, 0, 0.4), 0px 0px 12px rgba(255, 255, 255, 0.03) inset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(255, 255, 255, 0.02) inset';
              }}
            >
              <Mail size={18} />
              <span>Let's Talk</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
