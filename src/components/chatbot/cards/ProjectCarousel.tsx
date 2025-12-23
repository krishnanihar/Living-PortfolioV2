'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';

interface ProjectCarouselProps {
  projectSlugs: string[];
  onClose?: () => void;
}

// Map project slugs to their data
const PROJECT_MAP: Record<string, { title: string; subtitle: string; image: string; href: string }> = {
  'air-india': {
    title: 'Air India DesignLAB',
    subtitle: 'Design system at scale',
    image: '/images/airindiafigma.png',
    href: '/work/air-india',
  },
  'latent-space': {
    title: 'Latent Space',
    subtitle: 'Dream recording speculation',
    image: '/images/latent-space/hero-bg.jpg',
    href: '/work/latent-space',
  },
  'psoriassist': {
    title: 'PsoriAssist',
    subtitle: 'AI health management',
    image: '/projects/psoriassist-cover.png',
    href: '/work/psoriassist',
  },
  'cleara': {
    title: 'Cleara',
    subtitle: 'Healthcare AI design',
    image: '/images/cleara/watercolor/hero-fragment-1.png',
    href: '/work/cleara',
  },
  'mythos': {
    title: 'mythOS',
    subtitle: 'AI art curator',
    image: '/projects/mythoscover1.png',
    href: '/work/mythos',
  },
  'metamorphic-fractal-reflections': {
    title: 'Metamorphic Fractals',
    subtitle: 'Psychedelic installation',
    image: '/projects/mfr-cover.png',
    href: '/work/metamorphic-fractal-reflections',
  },
  'oneiros-palace': {
    title: 'Oneiros Palace',
    subtitle: 'Dream architecture',
    image: '/projects/oneiros-cover.png',
    href: '/work/oneiros-palace',
  },
};

export function ProjectCarousel({ projectSlugs, onClose }: ProjectCarouselProps) {
  // Filter to only valid projects
  const validProjects = projectSlugs
    .map(slug => PROJECT_MAP[slug])
    .filter(Boolean)
    .slice(0, 4);

  if (validProjects.length === 0) return null;

  return (
    <div
      style={{
        marginTop: '0.75rem',
        opacity: 0,
        animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--glass-20) transparent',
        }}
      >
        {validProjects.map((project, index) => (
          <Link
            key={index}
            href={project.href}
            onClick={onClose}
            style={{
              minWidth: '150px',
              maxWidth: '150px',
              background: 'var(--glass-06)',
              borderRadius: '12px',
              border: '1px solid var(--glass-10)',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-10)';
              e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-06)';
              e.currentTarget.style.borderColor = 'var(--glass-10)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Image */}
            <div
              style={{
                height: '70px',
                background: `linear-gradient(180deg, transparent 0%, var(--glass-20) 100%), url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Content */}
            <div style={{ padding: '0.625rem' }}>
              <h4
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  margin: 0,
                  marginBottom: '0.25rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.title}
              </h4>
              <p
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {project.subtitle}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.65rem',
                  color: 'rgba(218, 14, 41, 0.9)',
                  fontWeight: '500',
                }}
              >
                View <ArrowRight size={10} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectCarousel;
