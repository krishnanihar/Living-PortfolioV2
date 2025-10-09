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
                    textDecoration: 'none'
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
                  <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {exp.oneLiner}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
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
                    <ExternalLink
                      size={14}
                      className="ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ marginLeft: 'auto' }}
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
