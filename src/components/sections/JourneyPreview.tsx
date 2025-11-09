'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, GraduationCap, Briefcase, Zap } from 'lucide-react';

interface Milestone {
  year: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  metrics?: { label: string; value: string }[];
  color: string;
}

export default function JourneyPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 200, damping: 30 });

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
      color: '#FFB800'
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
      color: '#7C3AED'
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
      color: '#2196F3'
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
      color: '#DA0E29'
    },
  ];

  const cardWidth = 380;
  const gap = 32;
  const totalWidth = (cardWidth + gap) * milestones.length;

  // Calculate scale and opacity for each card based on scroll position
  const getCardStyle = (index: number) => {
    const x = useTransform(springX, (latest) => {
      const cardCenter = index * (cardWidth + gap);
      const viewportCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      const distanceFromCenter = Math.abs((cardCenter + latest) - viewportCenter);
      const scale = Math.max(0.85, 1 - distanceFromCenter / 800);
      return scale;
    });

    const opacity = useTransform(springX, (latest) => {
      const cardCenter = index * (cardWidth + gap);
      const viewportCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      const distanceFromCenter = Math.abs((cardCenter + latest) - viewportCenter);
      return Math.max(0.4, 1 - distanceFromCenter / 1000);
    });

    return { scale: x, opacity };
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);

    // Calculate snap position
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Determine target index based on drag direction and velocity
    let targetIndex = activeIndex;
    if (Math.abs(velocity) > 500) {
      targetIndex = velocity > 0 ? Math.max(0, activeIndex - 1) : Math.min(milestones.length - 1, activeIndex + 1);
    } else if (Math.abs(offset) > cardWidth / 3) {
      targetIndex = offset > 0 ? Math.max(0, activeIndex - 1) : Math.min(milestones.length - 1, activeIndex + 1);
    }

    snapToIndex(targetIndex);
  };

  const snapToIndex = (index: number) => {
    setActiveIndex(index);
    const targetX = -index * (cardWidth + gap);
    dragX.set(targetX);
  };

  const handleMinimapClick = (index: number) => {
    snapToIndex(index);
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
    <section style={{
      background: 'var(--bg-primary)',
      padding: '6rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center',
        marginBottom: '3rem',
      }}>
        <div style={{
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
        }}>
          <Compass size={16} />
          <span>The Journey</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '200',
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          From Curiosity to Craft
        </h2>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 1.5rem',
          lineHeight: '1.7',
        }}>
          Drag to explore · Arrow keys to navigate
        </p>

        {/* Minimap Navigator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}>
          {milestones.map((milestone, index) => (
            <button
              key={milestone.year}
              onClick={() => handleMinimapClick(index)}
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
                  ? `0 0 16px ${milestone.color}40`
                  : 'none',
              }}
              aria-label={`Jump to ${milestone.year}`}
            />
          ))}
        </div>
      </div>

      {/* Draggable Timeline */}
      <div style={{
        position: 'relative',
        height: '600px',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}>
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: -(totalWidth - cardWidth - gap * 2), right: cardWidth }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            paddingLeft: 'calc(50vw - 190px)',
            x: springX,
          }}
        >
          {milestones.map((milestone, index) => {
            const { scale, opacity } = getCardStyle(index);

            return (
              <motion.div
                key={milestone.year}
                style={{
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                  scale,
                  opacity,
                  pointerEvents: isDragging ? 'none' : 'auto',
                }}
              >
                {/* Milestone Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(40px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                  border: `1px solid ${milestone.color}20`,
                  borderRadius: '24px',
                  padding: '2rem',
                  height: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.3s ease',
                  boxShadow: activeIndex === index
                    ? `0 20px 60px ${milestone.color}15, 0 0 0 1px ${milestone.color}10 inset`
                    : '0 10px 40px rgba(0, 0, 0, 0.3)',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: `${milestone.color}15`,
                    border: `1px solid ${milestone.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: milestone.color,
                    marginBottom: '1.5rem',
                  }}>
                    {milestone.icon}
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
                        <div
                          key={idx}
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        marginTop: '4rem',
      }}>
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
      </div>
    </section>
  );
}
