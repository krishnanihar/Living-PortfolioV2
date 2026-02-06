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
              fontWeight: '400',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-50)',
              marginBottom: '1rem',
              fontFamily: 'var(--font-newsreader)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Selected Work
          </motion.p>

          {/* Main title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: '200',
              lineHeight: '1.3',
              letterSpacing: '0.02em',
              marginBottom: '1rem',
              color: 'var(--text-95)',
              fontFamily: 'var(--font-newsreader)',
            }}
          >
            Explore My Work
          </h1>

          {/* Subtitle */}
          <motion.p
            style={{
              fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
              fontWeight: '300',
              color: 'var(--text-60)',
              maxWidth: '42rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              letterSpacing: '0.01em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            From enterprise systems at 30,000ft to consciousness-exploring research
          </motion.p>

          {/* Stats Row */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(2rem, 5vw, 4rem)',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {[
              { value: '12+', label: 'Shipped Products' },
              { value: '4', label: 'Years Experience' },
              { value: '3', label: 'Domains' },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: '300',
                    color: 'var(--text-90)',
                    fontFamily: 'var(--font-newsreader)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                    fontWeight: '400',
                    color: 'var(--text-45)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {stat.label}
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
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-40)',
          }}
        >
          Scroll
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
          <ChevronDown size={24} style={{ color: 'var(--text-50)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
