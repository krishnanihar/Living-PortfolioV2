'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSmoothScroll } from '@/components/effects/SmoothScrollProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero entrance for narrative work page
 * Immersive title card with parallax and ambient particles
 */
export function NarrativeWorkHero() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger for parallax (synced with Lenis)
  useEffect(() => {
    if (!contentRef.current || !sectionRef.current || !scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on content
      gsap.to(contentRef.current, {
        y: -200,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out scroll indicator faster
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible', // Allow content to overflow for smooth scrolling
      }}
    >
      {/* Main content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          maxWidth: '80rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Eyebrow */}
          <motion.p
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
              fontWeight: '300',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '2rem',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A Design Journey
          </motion.p>

          {/* Main title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '100',
              lineHeight: '1.15',
              letterSpacing: '0.02em',
              marginBottom: '2.5rem',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            From Consciousness
            <br />
            to Systems
          </h1>

          {/* Subtitle */}
          <motion.p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.625',
              marginBottom: '4rem',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            4 years. 3 domains. 12+ shipped products.
            <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Exploring the intersection of design, technology, and human experience.
            </span>
          </motion.p>

          {/* Journey organization pills */}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '5rem',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {[
              { organization: 'Infosys', timeframe: '2020', logo: 'infosys.svg' },
              { organization: 'National Institute of Design', timeframe: '2021 - 2023', logo: 'nid.svg' },
              { organization: 'Air India', timeframe: '2024 - Present', logo: 'air-india.svg' },
              { organization: 'Indian School of Business', timeframe: '2023', logo: 'ISB.svg' },
            ].map((org, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderRadius: '1rem',
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  transition: 'all 300ms ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                }}
              >
                {/* Logo */}
                <img
                  src={`/logos/${org.logo}`}
                  alt={org.organization}
                  style={{
                    width: '28px',
                    height: '28px',
                    objectFit: 'contain',
                    flexShrink: 0,
                  }}
                />

                {/* Organization name */}
                <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: '500', whiteSpace: 'nowrap' }}>
                  {org.organization}
                </span>

                {/* Timeframe */}
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                  {org.timeframe}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 'clamp(2rem, 5vh, 3rem)',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => {
          scrollTo(window.innerHeight, { duration: 0.7 });
        }}
      >
        <span
          style={{
            fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          Begin Journey
        </span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={24} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
