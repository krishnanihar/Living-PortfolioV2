'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export function HeroIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
        {/* Statement Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: '300',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            I design interfaces that <span style={{ color: 'var(--brand-red)', fontWeight: '400' }}>breathe</span>, remember, and <span style={{ fontStyle: 'italic', opacity: 0.9 }}>evolve</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '300',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              marginTop: '1.5rem',
              maxWidth: '600px',
            }}
          >
            Leading design transformation at Air India, building systems that power 450+ daily operations with thoughtful, human-centered design.
          </motion.p>
        </div>

        {/* Portrait with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
            style={{
              position: 'relative',
              width: '256px',
              height: '256px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.1), rgba(251, 191, 36, 0.05))',
              padding: '4px',
              transform: isHovered
                ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.05)`
                : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(20, 20, 20, 0.95))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                fontWeight: '300',
                color: 'var(--text-muted)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Placeholder - replace with actual image */}
              <span style={{ opacity: 0.3 }}>NS</span>

              {/* Hover glow effect */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: 'radial-gradient(circle, rgba(218, 14, 41, 0.3) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'spin 8s linear infinite',
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
