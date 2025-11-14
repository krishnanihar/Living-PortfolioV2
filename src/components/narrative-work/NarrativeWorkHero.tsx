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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient particle field (CSS-based) */}
      <div className="absolute inset-0 overflow-hidden opacity-45">
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
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{
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
            className="font-light tracking-[0.2em] uppercase text-white/60 mb-6"
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A Design Journey
          </motion.p>

          {/* Main title */}
          <h1
            className="font-extralight leading-[1.1] mb-8"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
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
            className="text-lg md:text-xl font-light text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            4 years. 3 domains. 12+ shipped products.
            <br />
            <span className="text-white/50">
              Exploring the intersection of design, technology, and human experience.
            </span>
          </motion.p>

          {/* Stats pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
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
                className="glass-card px-4 py-2 rounded-full border border-white/10 transition-all duration-300 hover:border-white/20"
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                }}
              >
                <span className="text-white/50">{stat.label}</span>
                <span className="mx-2 text-white/30">→</span>
                <span className="text-white/85 font-medium">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{
          bottom: 'clamp(2rem, 5vh, 3rem)',
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
          className="tracking-[0.2em] uppercase text-white/50"
          style={{
            fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)',
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
          <ChevronDown size={24} className="text-white/50" />
        </motion.div>
      </motion.div>

      {/* Gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 1) 100%)',
        }}
      />
    </section>
  );
}
