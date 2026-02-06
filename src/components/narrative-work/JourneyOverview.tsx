'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Sparkles, Plane } from 'lucide-react';

interface Act {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const acts: Act[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Immersive installations and generative art systems at National Institute of Design',
    icon: Sparkles,
    color: 'rgba(147, 51, 234, 0.8)',
  },
  {
    id: 'industry',
    title: 'Enterprise Work',
    description: '8 key projects for Air India\'s digital transformation: design systems, mobile patterns, data visualization',
    icon: Plane,
    color: 'rgba(217, 119, 87, 0.8)',
  },
  {
    id: 'innovation',
    title: 'Research & Innovation',
    description: 'AI-powered health tech (Cleara), speculative design (Latent Space), and Gemini exhibitions',
    icon: Lightbulb,
    color: 'rgba(14, 165, 233, 0.8)',
  },
];

/**
 * Interactive timeline preview showing the portfolio journey structure
 * Users can see what's ahead and jump to specific sections
 */
export function JourneyOverview() {
  const [hoveredAct, setHoveredAct] = React.useState<string | null>(null);

  const scrollToAct = (actId: string) => {
    const actPositions = {
      foundation: 0.15, // Scroll to 15% of page
      industry: 0.5, // Scroll to 50% of page
      innovation: 0.8, // Scroll to 80% of page
    };

    const position = actPositions[actId as keyof typeof actPositions] || 0;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: scrollHeight * position,
      behavior: 'smooth',
    });
  };

  return (
    <section style={{
      position: 'relative',
      paddingTop: '6rem',
      paddingBottom: '6rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      overflow: 'hidden',
    }}>
      {/* Responsive styles */}
      <style jsx>{`
        @media (min-width: 768px) {
          .act-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1rem !important;
          }
          .timeline-connector {
            display: block !important;
          }
        }
      `}</style>

      {/* Section title */}
      <div style={{
        maxWidth: '80rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '4rem',
        textAlign: 'center',
      }}>
        <motion.p
          style={{
            fontSize: '0.875rem',
            fontWeight: '300',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-60)',
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Journey Ahead
        </motion.p>
        <motion.h2
          style={{
            fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
            fontWeight: '200',
            color: 'var(--text-90)',
            marginBottom: '1rem',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Portfolio Overview
        </motion.h2>
        <motion.p
          style={{
            color: 'var(--text-60)',
            maxWidth: '42rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From academic foundations to shipping enterprise systems and research-backed health tech
        </motion.p>
      </div>

      {/* Act timeline */}
      <div style={{
        maxWidth: '80rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div className="act-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            gap: '1.5rem',
          }}>
            {acts.map((act, index) => {
              const Icon = act.icon as React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
              const isHovered = hoveredAct === act.id;

              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredAct(act.id)}
                  onMouseLeave={() => setHoveredAct(null)}
                  onClick={() => scrollToAct(act.id)}
                >
                  {/* Card */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '1rem',
                      padding: 'clamp(1.5rem, 3vw, 2rem)',
                      height: '100%',
                      transition: 'all 500ms ease',
                      background: isHovered
                        ? `${act.color.replace('0.8', '0.04')}`
                        : 'var(--glass-02)',
                      backdropFilter: 'blur(40px)',
                      border: `1px solid ${isHovered ? act.color.replace('0.8', '0.15') : 'var(--text-06)'}`,
                      transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      style={{ marginBottom: '1.5rem' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon
                        size={40}
                        strokeWidth={1.5}
                        style={{
                          color: isHovered ? act.color : 'var(--text-60)',
                          transition: 'color 500ms ease',
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                        fontWeight: '300',
                        marginBottom: '0.75rem',
                        transition: 'color 500ms ease',
                        color: isHovered ? act.color : 'var(--text-90)',
                      }}
                    >
                      {act.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-60)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.625',
                    }}>
                      {act.description}
                    </p>

                    {/* Hover arrow */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        right: '1.5rem',
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight
                        size={20}
                        style={{ color: act.color }}
                      />
                    </motion.div>
                  </div>

                  {/* Timeline connector (desktop only) */}
                  {index < acts.length - 1 && (
                    <div className="timeline-connector" style={{
                        display: 'none',
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        width: '1rem',
                        transform: 'translateX(100%) translateY(-50%)',
                      }}>
                        <div style={{
                          height: '1px',
                          width: '100%',
                          background: 'linear-gradient(to right, var(--text-20), transparent)',
                        }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>

        {/* Click instruction */}
        <motion.p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-40)',
            marginTop: '2rem',
            letterSpacing: '0.025em',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Click any section to jump ahead →
        </motion.p>
      </div>
    </section>
  );
}
