'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ResearchProject {
  title: string;
  description: string;
  category: string;
  stats?: Array<{ label: string; value: string }>;
  image?: string;
  videoUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  color: string; // RGB format
}

interface ResearchShowcaseProps {
  project: ResearchProject;
  inView: boolean;
  index?: number;
}

/**
 * Flexible showcase for research projects
 * Supports images, videos, stats, and CTAs
 */
export function ResearchShowcase({ project, inView, index = 0 }: ResearchShowcaseProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(60px) saturate(150%)',
        border: `1px solid ${isHovered ? `rgba(${project.color}, 0.3)` : 'rgba(255, 255, 255, 0.06)'}`,
        transition: 'all 0.5s ease',
      }}
    >
      <div style={{
        padding: 'clamp(2rem, 4vw, 3rem)',
      }}>
        {/* Category & Title */}
        <div style={{ marginBottom: '2rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: '300',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              color: `rgb(${project.color})`,
            }}
          >
            {project.category}
          </p>
          <h3
            style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
              fontWeight: '300',
              marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              lineHeight: '1.625',
              maxWidth: '48rem',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Stats grid (if provided) */}
        {project.stats && project.stats.length > 0 && (
          <>
            <style jsx>{`
              @media (min-width: 768px) {
                .research-stats-grid {
                  grid-template-columns: repeat(3, minmax(0, 1fr));
                }
              }
            `}</style>
            <div className="research-stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '300',
                      marginBottom: '0.25rem',
                      color: `rgb(${project.color})`,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em',
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video embed (if provided) */}
        {project.videoUrl && (
          <div style={{
            marginBottom: '2rem',
            borderRadius: '1rem',
            overflow: 'hidden',
          }}>
            <iframe
              src={project.videoUrl}
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* CTAs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          {project.caseStudyUrl && (
            <Link
              href={project.caseStudyUrl as any}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                borderRadius: '0.75rem',
                transition: 'all 300ms ease',
                background: isHovered ? `rgba(${project.color}, 0.15)` : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isHovered ? `rgba(${project.color}, 0.3)` : 'rgba(255, 255, 255, 0.1)'}`,
                color: isHovered ? `rgb(${project.color})` : 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
              }}
            >
              <span>View Case Study</span>
              <ArrowRight
                size={16}
                style={{
                  transition: 'transform 300ms ease',
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                }}
              />
            </Link>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                borderRadius: '0.75rem',
                transition: 'all 300ms ease',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
              }}
            >
              <span>Try Demo</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Hover glow */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            pointerEvents: 'none',
            transition: 'opacity 500ms ease',
            background: `radial-gradient(circle at 50% 50%, rgba(${project.color}, 0.08) 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
