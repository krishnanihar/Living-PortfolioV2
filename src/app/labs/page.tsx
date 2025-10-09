'use client';

import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { labExperiments } from '@/data/labs-experiments';
import { ExternalLink } from 'lucide-react';

export default function LabsPage() {
  return (
    <>
      <PortfolioNavigation />

      <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '200',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              Nihar Labs
            </h1>
            <p style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: '300',
              color: 'var(--text-secondary)'
            }}>
              {labExperiments.length} rapid experiments in AI, mobility, and new media.
            </p>
          </div>

          {/* Simple Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {labExperiments.map((exp) => {
              const link = exp.links.demo || exp.links.repo || exp.links.figma || '#';

              return (
                <a
                  key={exp.id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-all duration-300"
                  style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '280px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
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
                </a>
              );
            })}
          </div>

        </div>
      </main>
    </>
  );
}
