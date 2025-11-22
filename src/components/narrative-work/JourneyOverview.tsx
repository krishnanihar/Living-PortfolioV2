'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Briefcase, Lightbulb, ArrowRight } from 'lucide-react';

interface Act {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  projects: string[];
}

const acts: Act[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    description: 'Immersive installations and generative art systems at National Institute of Design',
    icon: Palette,
    color: 'rgba(147, 51, 234, 0.8)',
    projects: ['Metamorphic Fractal Reflections'],
  },
  {
    id: 'industry',
    title: 'Enterprise Work',
    description: '8 key projects for Air India\'s digital transformation: design systems, mobile patterns, data visualization',
    icon: Briefcase,
    color: 'rgba(218, 14, 41, 0.8)',
    projects: ['Pixel Radar', 'Aviation Analytics', 'Mobile Patterns', 'Design Systems'],
  },
  {
    id: 'innovation',
    title: 'Research & Innovation',
    description: 'AI-powered health tech (PsoriAssist), speculative design (Latent Space), and Gemini exhibitions',
    icon: Lightbulb,
    color: 'rgba(14, 165, 233, 0.8)',
    projects: ['Latent Space', 'mythOS', 'PsoriAssist'],
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
            color: 'rgba(255, 255, 255, 0.6)',
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
            color: 'rgba(255, 255, 255, 0.9)',
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
            color: 'rgba(255, 255, 255, 0.6)',
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
              const Icon = act.icon as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
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
                        ? `${act.color.replace('0.8', '0.08')}`
                        : 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(40px)',
                      border: `1px solid ${isHovered ? act.color.replace('0.8', '0.3') : 'rgba(255, 255, 255, 0.06)'}`,
                      transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    }}
                  >
                    {/* Icon */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '9999px',
                          transition: 'all 500ms ease',
                          background: isHovered ? act.color : 'rgba(255, 255, 255, 0.05)',
                          boxShadow: isHovered ? `0 0 30px ${act.color}` : 'none',
                        }}
                      >
                        <Icon
                          size={20}
                          style={{
                            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                        fontWeight: '300',
                        marginBottom: '0.75rem',
                        transition: 'color 500ms ease',
                        color: isHovered ? act.color : 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {act.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.625',
                    }}>
                      {act.description}
                    </p>

                    {/* Projects */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}>
                      {act.projects.map((project, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            transition: 'color 300ms ease',
                            color: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          <div
                            style={{
                              width: '0.25rem',
                              height: '0.25rem',
                              borderRadius: '9999px',
                              transition: 'all 300ms ease',
                              background: isHovered ? act.color : 'rgba(255, 255, 255, 0.3)',
                              boxShadow: isHovered ? `0 0 8px ${act.color}` : 'none',
                            }}
                          />
                          {project}
                        </div>
                      ))}
                    </div>

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

                    {/* Glow effect on hover */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        borderRadius: '1rem',
                        opacity: 0,
                        pointerEvents: 'none',
                        background: `radial-gradient(circle at 50% 50%, ${act.color.replace('0.8', '0.1')} 0%, transparent 70%)`,
                      }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    />
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
                          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.2), transparent)',
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
            color: 'rgba(255, 255, 255, 0.4)',
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
