'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Hero entrance for narrative work page
 * Immersive title card with parallax and ambient particles
 */
export function NarrativeWorkHero() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offset (slower than scroll)
  const parallaxOffset = scrollY * 0.5;

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Ambient particle field (CSS-based) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: Math.max(0, 1 - scrollY / 400) * 0.45,
      }}>
        {[...Array(20)].map((_, i) => {
          const colors = [
            'from-purple-500/30 to-blue-500/30',
            'from-red-500/25 to-purple-500/25',
            'from-blue-500/30 to-cyan-500/30',
          ];
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full bg-gradient-to-br ${colors[i % colors.length]}`}
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(60px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          maxWidth: '80rem',
          transform: `translateY(-${parallaxOffset}px)`,
          opacity: Math.max(0, 1 - scrollY / 400),
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
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '200',
              lineHeight: '1.1',
              marginBottom: '3rem',
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

          {/* Stats pills */}
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
              { label: 'College Projects', value: 'Foundation' },
              { label: 'Professional Work', value: 'Industry' },
              { label: 'Research', value: 'Innovation' },
            ].map((stat, index) => (
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
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{stat.label}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>→</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: '500' }}>{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
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
          opacity: Math.max(0, 1 - scrollY / 200),
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          });
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
