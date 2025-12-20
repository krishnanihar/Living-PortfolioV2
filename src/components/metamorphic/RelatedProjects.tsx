'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Circle, Hexagon, Heart, ArrowLeft } from 'lucide-react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * RelatedProjects - More Projects Section
 *
 * Grid of related project cards with hover effects
 */

const OTHER_PROJECTS = [
  {
    id: 1,
    icon: Circle,
    title: 'Design at Air India',
    category: 'Design Systems',
    description: "Leading design transformation for India's flag carrier.",
    year: '2024',
    href: '/work/air-india' as const,
    orbColor: '218, 14, 41',
  },
  // HIDDEN: Latent Space WIP
  // {
  //   id: 2,
  //   icon: Hexagon,
  //   title: 'Latent Space',
  //   category: 'Speculative Design',
  //   description: 'Speculative design exploration of dream technology ethics.',
  //   year: '2024',
  //   href: '/work/latent-space' as const,
  //   orbColor: '140, 100, 255',
  // },
  {
    id: 3,
    icon: Heart,
    title: 'Living Organism',
    category: 'Meta Design',
    description: 'This portfolio website - architected to feel like a living organism.',
    year: '2024',
    href: '/' as const,
    orbColor: '255, 255, 255',
  },
] as const;

export function RelatedProjects() {
  const { isMobile } = useMetamorphic();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredCTA, setHoveredCTA] = useState(false);

  return (
    <section
      style={{
        padding: isMobile ? '3rem 1.5rem 4rem' : '5rem 2rem 6rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: '200',
            letterSpacing: '-0.02em',
            color: 'var(--text-95)',
            margin: 0,
          }}
        >
          More Projects
        </h2>
        <Link
          href="/work"
          onMouseEnter={() => setHoveredCTA(true)}
          onMouseLeave={() => setHoveredCTA(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            background: hoveredCTA ? 'var(--glass-08)' : 'transparent',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-70)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '400',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <ArrowLeft size={16} />
          <span>All Work</span>
        </Link>
      </div>

      {/* Project grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {OTHER_PROJECTS.map((project) => {
          const Icon = project.icon;
          const isHovered = hoveredProject === project.id;

          return (
            <Link
              key={project.id}
              href={project.href}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                position: 'relative',
                display: 'block',
                padding: '2rem',
                borderRadius: '20px',
                background: 'var(--glass-03)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid var(--glass-08)',
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? `0 20px 40px rgba(${project.orbColor}, 0.15)`
                  : 'none',
              }}
            >
              {/* Animated border */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    padding: '1px',
                    background: `linear-gradient(135deg, rgba(${project.orbColor}, 0.6), rgba(${project.orbColor}, 0.2), rgba(${project.orbColor}, 0.6))`,
                    backgroundSize: '200% 200%',
                    animation: 'borderShimmer 3s ease-in-out infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `rgba(${project.orbColor}, 0.1)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                }}
              >
                <Icon size={24} style={{ color: `rgb(${project.orbColor})` }} />
              </div>

              {/* Meta */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '400',
                    color: 'var(--text-50)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-30)' }}>•</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-50)' }}>
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'var(--text-95)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-60)',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                {project.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes borderShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

export default RelatedProjects;
