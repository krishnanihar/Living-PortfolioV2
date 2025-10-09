'use client';

import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { labExperiments } from '@/data/labs-experiments';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LabsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const activeCount = labExperiments.filter(exp => exp.status === 'Playable' || exp.status === 'Field-Tested').length;

  return (
    <>
      <PortfolioNavigation />

      <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient Background Orbs */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'floatOrb 20s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'floatOrb 25s ease-in-out infinite 5s',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(218, 14, 41, 0.05), transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
            animation: 'floatOrb 30s ease-in-out infinite 10s',
          }} />
        </div>

        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 1 }}>

          {/* Enhanced Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', marginBottom: '6rem' }}
          >
            {/* Status Indicator & Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {/* Pulsing Orb Indicator */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--surface-primary)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--brand-red)',
                  animation: 'pulseOrb 2s ease-in-out infinite',
                }} />
              </div>

              {/* Animated Gradient Title */}
              <h1 className="text-gradient-animated" style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: '500',
                letterSpacing: '0.02em',
              }}>
                Nihar Labs
              </h1>

              {/* Glass Badge */}
              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                background: 'var(--surface-primary)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--border-primary)',
                fontSize: '0.75rem',
                fontWeight: '400',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}>
                {labExperiments.length} Experiments · {activeCount} Active
              </div>
            </div>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Rapid experiments in AI, mobility, and new media.
            </p>
          </motion.div>

          {/* Enhanced Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {labExperiments.map((exp, index) => {
              const link = exp.links.demo || exp.links.repo || exp.links.figma || '#';
              const isHovered = hoveredCard === exp.id;

              return (
                <motion.a
                  key={exp.id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onMouseEnter={() => setHoveredCard(exp.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    padding: '2rem',
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)',
                    backdropFilter: 'blur(40px) saturate(150%) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(40px) saturate(150%) brightness(1.1)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: isHovered
                      ? '0 16px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      : 'inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 8px 24px rgba(0, 0, 0, 0.15)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '320px',
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Featured Badge */}
                  {exp.featured && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: 'rgba(218, 14, 41, 0.1)',
                      border: '1px solid rgba(218, 14, 41, 0.3)',
                      fontSize: '0.75rem',
                      color: 'var(--brand-red)',
                      marginBottom: '1rem',
                      width: 'fit-content'
                    }}>
                      ⭐ Featured
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="group-hover:text-[var(--brand-red)] transition-colors"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '300',
                      marginBottom: '0.75rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {exp.title}
                  </h3>

                  {/* Domain Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.375rem',
                    marginBottom: '0.75rem'
                  }}>
                    {exp.domain.slice(0, 2).map((domain, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.125rem 0.5rem',
                          borderRadius: '0.25rem',
                          backgroundColor: 'rgba(147, 51, 234, 0.1)',
                          border: '1px solid rgba(147, 51, 234, 0.2)',
                          fontSize: '0.75rem',
                          color: 'rgba(147, 51, 234, 0.9)',
                          fontWeight: '400'
                        }}
                      >
                        {domain}
                      </span>
                    ))}
                  </div>

                  {/* One-liner */}
                  <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    lineHeight: '1.6',
                    fontSize: '0.9375rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1
                  }}>
                    {exp.oneLiner}
                  </p>

                  {/* Tech Stack */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.375rem',
                    marginBottom: '1rem'
                  }}>
                    {exp.tech.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.125rem 0.5rem',
                          borderRadius: '0.25rem',
                          backgroundColor: 'rgba(59, 130, 246, 0.08)',
                          border: '1px solid rgba(59, 130, 246, 0.15)',
                          fontSize: '0.75rem',
                          color: 'rgba(59, 130, 246, 0.8)',
                          fontWeight: '400'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer: Status, TRL, Updated */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-tertiary)'
                    }}>
                      {exp.status}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-tertiary)'
                    }}>
                      TRL {exp.trl}
                    </span>
                    <span style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      marginLeft: 'auto'
                    }}>
                      Updated {new Date(exp.dates.updated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <ExternalLink
                      size={14}
                      className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>

        </div>
      </main>
    </>
  );
}
