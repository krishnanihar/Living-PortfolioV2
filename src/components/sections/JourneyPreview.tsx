'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, GraduationCap, Briefcase } from 'lucide-react';

interface Milestone {
  year: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  metrics?: { label: string; value: string }[];
  color: string;
  logo?: string; // Logo URL or SVG path
  organization: string;
}

export default function JourneyPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const milestones: Milestone[] = [
    {
      year: '2005',
      label: 'The Spark',
      description: 'Hyderabad childhood: curiosity, wires, and wonder',
      icon: <Sparkles size={24} />,
      metrics: [
        { label: 'First Computer Fix', value: 'Age 10' },
        { label: 'ROMs Flashed', value: '20+' }
      ],
      color: '#FFB800',
      organization: 'Hyderabad'
    },
    {
      year: '2018',
      label: 'BFA Multimedia',
      description: 'First formal design education at Srishti',
      icon: <GraduationCap size={24} />,
      metrics: [
        { label: 'Projects Built', value: '15+' },
        { label: 'Skills Acquired', value: '8' }
      ],
      color: '#7C3AED',
      organization: 'Srishti Manipal'
    },
    {
      year: '2021',
      label: 'NID',
      description: 'M.Des Information & Interface Design',
      icon: <GraduationCap size={24} />,
      metrics: [
        { label: 'Research Papers', value: '3' },
        { label: 'Prototypes', value: '12+' }
      ],
      color: '#2196F3',
      organization: 'National Institute of Design'
    },
    {
      year: '2024',
      label: 'Now',
      description: 'Enterprise systems at Air India',
      icon: <Briefcase size={24} />,
      metrics: [
        { label: 'Daily Users', value: '10K+' },
        { label: 'Systems Designed', value: '5+' }
      ],
      color: '#DA0E29',
      organization: 'Air India'
    },
  ];

  // Responsive card sizing - larger for desktop carousel feel
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const cardWidth = isDesktop ? 520 : 380; // Larger cards on desktop

  // Apple Cover Flow style: Calculate position, rotation, scale, and depth for each card
  const getCardStyle = (index: number) => {
    const isCenter = index === activeIndex;
    const offset = index - activeIndex;

    // X Position: Cards fan out from center with overlap
    const spacing = cardWidth * 0.6; // 60% overlap for Cover Flow effect
    const x = offset * spacing;

    // Cover Flow Rotation: ±30° for side cards (more subtle than 45°)
    const rotateY = offset === 0 ? 0 : offset > 0 ? 30 : -30;

    // Reduced Scaling: Center card is 1.2x (was 1.5x - less aggressive)
    const scale = isCenter ? 1.2 : 1;

    // Better Z-depth: Keep side cards visible
    const translateZ = isCenter ? 50 : -(50 + Math.abs(offset) * 80);

    // Z-index: Center always on top
    const zIndex = isCenter ? 100 : 1;

    // Opacity for far cards
    const opacity = Math.abs(offset) > 2 ? 0.6 : 1;

    return { x, rotateY, scale, translateZ, zIndex, opacity };
  };

  const snapToIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        snapToIndex(activeIndex - 1);
      } else if (e.key === 'ArrowRight' && activeIndex < milestones.length - 1) {
        snapToIndex(activeIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-primary)',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center',
        marginBottom: '3rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(218, 14, 41, 0.08)',
            border: '1px solid rgba(218, 14, 41, 0.2)',
            borderRadius: '20px',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
          }}
        >
          <Compass size={16} />
          <span>The Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '200',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          From Curiosity to Craft
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
            lineHeight: '1.7',
          }}
        >
          Click cards or use arrow keys to navigate
        </motion.p>

        {/* Minimap Navigator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          {milestones.map((milestone, index) => (
            <motion.button
              key={milestone.year}
              onClick={() => snapToIndex(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative',
                width: activeIndex === index ? '48px' : '32px',
                height: '4px',
                background: activeIndex === index
                  ? milestone.color
                  : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeIndex === index
                  ? `0 0 20px ${milestone.color}60`
                  : 'none',
              }}
              aria-label={`Jump to ${milestone.year}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Cover Flow Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: isDesktop ? '700px' : '600px',
          perspective: '640px', // Apple Cover Flow perspective (40em)
          perspectiveOrigin: '50% 50%',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.2) 100%)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
          {milestones.map((milestone, index) => {
            const { x, rotateY, scale, translateZ, zIndex, opacity } = getCardStyle(index);

            return (
              <motion.div
                key={milestone.year}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => snapToIndex(index)}
                animate={{
                  x,
                  rotateY,
                  scale,
                  translateZ,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0, 0, 0.001, 1], // Apple's luxury cubic-bezier
                }}
                style={{
                  position: 'absolute',
                  width: `${cardWidth}px`,
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer',
                  zIndex,
                  opacity,
                }}
              >
                {/* Milestone Card */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(40px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                    border: `1px solid ${milestone.color}${index === activeIndex ? '40' : '20'}`,
                    borderRadius: '8px', // Sharp Apple aesthetic
                    padding: isDesktop ? '2.5rem' : '2rem',
                    height: isDesktop ? '580px' : '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.3s ease',
                    boxShadow: index === activeIndex
                      ? `0 20px 60px ${milestone.color}20, 0 0 0 1px ${milestone.color}15 inset`
                      : '0 10px 40px rgba(0, 0, 0, 0.3)',
                    // Apple Cover Flow reflection
                    WebkitBoxReflect: 'below 8px linear-gradient(transparent, rgba(0, 0, 0, 0.25))',
                  }}
                >
                  {/* Header Row: Icon + Organization */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}>
                    {/* Icon */}
                    <motion.div
                      animate={hoveredCard === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: `${milestone.color}15`,
                        border: `1px solid ${milestone.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: milestone.color,
                      }}
                    >
                      {milestone.icon}
                    </motion.div>

                    {/* Organization Badge */}
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'var(--text-secondary)',
                      textAlign: 'right',
                      letterSpacing: '0.02em',
                    }}>
                      {milestone.organization}
                    </div>
                  </div>

                  {/* Year */}
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '200',
                    color: milestone.color,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.5rem',
                  }}>
                    {milestone.year}
                  </div>

                  {/* Label */}
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {milestone.label}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    flex: 1,
                  }}>
                    {milestone.description}
                  </p>

                  {/* Metrics */}
                  {milestone.metrics && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '1rem',
                      marginTop: 'auto',
                    }}>
                      {milestone.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                          }}
                        >
                          <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            marginBottom: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}>
                            {metric.label}
                          </div>
                          <div style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: milestone.color,
                          }}>
                            {metric.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Link
          href="/journey"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))',
            border: '1px solid rgba(218, 14, 41, 0.3)',
            borderRadius: '16px',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.18), rgba(255, 255, 255, 0.08))';
            e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.5)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(218, 14, 41, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(218, 14, 41, 0.12), rgba(255, 255, 255, 0.05))';
            e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span>Explore the Full Journey</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  );
}
