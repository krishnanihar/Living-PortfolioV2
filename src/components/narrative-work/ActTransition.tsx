'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNarrativeContext } from '@/contexts/NarrativeContext';

interface ActTransitionProps {
  actTitle: string;
  quote: string;
  actColor: string;
  actNumber?: string;
  showDividers?: boolean;
}

/**
 * Elegant editorial-style transition between narrative acts
 * Minimal design with typography hierarchy and subtle accent lines
 * Reports visibility to NarrativeContext for particle activation
 */
export function ActTransition({
  actTitle,
  quote,
  actColor,
  actNumber,
  showDividers = true
}: ActTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { setContentType } = useNarrativeContext();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setContentType('transition');
          } else {
            setContentType('content');
          }
        });
      },
      { threshold: [0, 0.3, 0.5, 0.7, 1] }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [setContentType]);

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 'clamp(6rem, 10vh, 10rem)',
      paddingBottom: 'clamp(6rem, 10vh, 10rem)',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    }}>
      <div style={{
        position: 'relative',
        textAlign: 'center',
        maxWidth: '48rem',
        width: '100%',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top divider line */}
          {showDividers && (
            <motion.div
              style={{
                width: '40%',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${actColor} 20%, ${actColor} 80%, transparent)`,
                opacity: 0.3,
                marginBottom: '4rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {/* Act number label (optional) */}
          {actNumber && (
            <motion.div
              style={{
                fontSize: '0.6875rem',
                fontWeight: '500',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-60)',
                marginBottom: '1rem',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              ACT {actNumber}
            </motion.div>
          )}

          {/* Act title */}
          <h2
            style={{
              fontSize: 'clamp(3.5rem, 7vw, 5rem)',
              fontWeight: '100',
              letterSpacing: '0.05em',
              marginBottom: '2.5rem',
              color: 'var(--text-95)',
              lineHeight: '1.1',
            }}
          >
            {actTitle}
          </h2>

          {/* Quote */}
          <motion.p
            style={{
              fontSize: 'clamp(1.125rem, 2.25vw, 1.375rem)',
              fontWeight: '300',
              letterSpacing: '0.01em',
              color: 'var(--text-60)',
              fontStyle: 'italic',
              lineHeight: '1.6',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {quote}
          </motion.p>

          {/* Bottom divider line */}
          {showDividers && (
            <motion.div
              style={{
                width: '40%',
                height: '1px',
                background: `linear-gradient(to right, transparent, ${actColor} 20%, ${actColor} 80%, transparent)`,
                opacity: 0.3,
                marginTop: '3rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
