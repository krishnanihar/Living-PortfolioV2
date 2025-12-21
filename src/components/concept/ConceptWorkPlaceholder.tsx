'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  brandColor: { r: number; g: number; b: number };
  year: string;
  link: string;
}

interface Props {
  project: Project;
  index: number;
}

const ConceptWorkPlaceholder = forwardRef<HTMLDivElement, Props>(
  ({ project, index }, ref) => {
    const brandRgb = `${project.brandColor.r}, ${project.brandColor.g}, ${project.brandColor.b}`;

    return (
      <div
        ref={ref}
        style={{
          height: '100dvh',
          position: 'relative',
          padding: 0,
          willChange: 'padding',
          display: 'flex',
          alignItems: 'center',
          zIndex: 100,
        }}
      >
        {/* Inner glass container - matches hero */}
        <div
          className="work-placeholder-inner"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 0,
            willChange: 'border-radius',
            background: 'var(--glass-03)',
            backdropFilter: 'blur(60px) saturate(180%)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Gradient overlay for depth */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse 80% 50% at 50% 0%, var(--glass-08) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 100%, rgba(${brandRgb}, 0.05) 0%, transparent 40%)
              `,
              pointerEvents: 'none',
            }}
          />

          {/* Centered Content */}
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              width: '100%',
              textAlign: 'center',
              padding: '0 clamp(1.5rem, 4vw, 3rem)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Project Number */}
            <div
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                fontWeight: 300,
                color: `rgba(${brandRgb}, 0.8)`,
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 200,
                lineHeight: 1.3,
                letterSpacing: '0.02em',
                marginBottom: '0.75rem',
                color: 'var(--text-95)',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {project.title}
            </h2>

            {/* Category */}
            <div
              style={{
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                fontWeight: 300,
                color: 'var(--text-60)',
                marginBottom: '1.5rem',
              }}
            >
              {project.category} · {project.year}
            </div>

            {/* Description */}
            <p
              style={{
                maxWidth: '650px',
                margin: '0 auto 2.5rem',
                fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
                fontWeight: 300,
                color: 'var(--text-65)',
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </p>

            {/* CTA Button - matches hero style */}
            <Link
              href={project.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '13px 26px',
                background: `linear-gradient(135deg, rgba(${brandRgb}, 0.04), rgba(${brandRgb}, 0.02))`,
                border: `1px solid rgba(${brandRgb}, 0.15)`,
                borderRadius: '20px',
                color: 'var(--text-95)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                backdropFilter: 'blur(100px) saturate(220%)',
                WebkitBackdropFilter: 'blur(100px) saturate(220%)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: `
                  0 12px 48px rgba(0, 0, 0, 0.15),
                  0 4px 16px rgba(0, 0, 0, 0.10),
                  inset 0 1px 2px var(--glass-25),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.15)
                `,
              }}
            >
              <span>View Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

ConceptWorkPlaceholder.displayName = 'ConceptWorkPlaceholder';
export default ConceptWorkPlaceholder;
