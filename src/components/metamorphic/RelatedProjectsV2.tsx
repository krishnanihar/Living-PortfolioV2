'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Circle, Hexagon, Heart, ArrowRight } from 'lucide-react';
import { animate, stagger } from 'animejs';

/**
 * RelatedProjectsV2 - Related Projects with Wave Hover Effect
 *
 * Grid of project cards with anime.js wave hover animation:
 * - Scroll-triggered stagger reveal
 * - Wave ripple effect on hover
 * - Glassmorphic cards with accent colors
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
    color: '217, 119, 87',
  },
  // HIDDEN: Latent Space WIP
  // {
  //   id: 2,
  //   icon: Hexagon,
  //   title: 'Latent Space',
  //   category: 'Speculative Design',
  //   description: 'Exploring dream technology ethics through design fiction.',
  //   year: '2024',
  //   href: '/work/latent-space' as const,
  //   color: '140, 100, 255',
  // },
  {
    id: 3,
    icon: Heart,
    title: 'Cleara',
    category: 'Healthcare AI',
    description: 'AI-powered digital therapeutic with watercolor healing aesthetic.',
    year: '2024',
    href: '/work/cleara' as const,
    color: '139, 157, 195',
  },
] as const;

export function RelatedProjectsV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-triggered reveal with anime.js v4
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          if (!prefersReducedMotion) {
            animate(cardsRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.95, 1],
              delay: stagger(100, { start: 200 }),
              duration: 600,
              ease: 'outExpo',
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, prefersReducedMotion]);

  // Wave hover effect with anime.js v4
  const handleHover = useCallback(
    (index: number | null) => {
      setHoveredIndex(index);

      if (prefersReducedMotion || index === null) {
        // Reset all cards
        animate(cardsRef.current, {
          translateY: 0,
          scale: 1,
          duration: 200,
          ease: 'outSine',
        });
        return;
      }

      // Wave effect from hovered card
      animate(cardsRef.current, {
        translateY: ((_target: unknown, i: number) => {
          const distance = Math.abs(i - index);
          return distance === 0 ? -8 : distance === 1 ? -4 : 0;
        }) as unknown as number,
        scale: ((_target: unknown, i: number) => (i === index ? 1.02 : 1)) as unknown as number,
        delay: stagger(40, { from: index }),
        duration: 300,
        ease: 'outSine',
      });
    },
    [prefersReducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      id="related-projects"
      style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '2rem' : '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
            opacity: isVisible || prefersReducedMotion ? 1 : 0,
            transform:
              isVisible || prefersReducedMotion
                ? 'translateY(0)'
                : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <h2
            style={{
              fontSize: isMobile
                ? 'clamp(1.5rem, 5vw, 2rem)'
                : 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'var(--text-95)',
              margin: 0,
            }}
          >
            More Projects
          </h2>
          <Link
            href="/work"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              borderRadius: '100px',
              background: 'var(--glass-05)',
              border: '1px solid var(--glass-10)',
              color: 'var(--text-70)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 400,
              transition: 'all 0.3s ease',
            }}
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Project cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1.25rem' : '1.5rem',
          }}
        >
          {OTHER_PROJECTS.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={project.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                href={project.href}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
                style={{
                  display: 'block',
                  padding: isMobile ? '1.5rem' : '2rem',
                  borderRadius: '20px',
                  background: isHovered
                    ? `rgba(${project.color}, 0.06)`
                    : 'var(--glass-03)',
                  border: isHovered
                    ? `1px solid rgba(${project.color}, 0.25)`
                    : '1px solid var(--glass-08)',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                  opacity: prefersReducedMotion ? 1 : 0,
                }}
              >
                {/* Icon and year */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: `rgba(${project.color}, 0.1)`,
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'none',
                    }}
                  >
                    <Icon
                      size={22}
                      style={{ color: `rgba(${project.color}, 0.9)` }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--text-40)',
                    }}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Category */}
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: `rgba(${project.color}, 0.7)`,
                    marginBottom: '0.5rem',
                  }}
                >
                  {project.category}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: 'var(--text-95)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-60)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>

                {/* View link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--glass-06)',
                    color: isHovered ? `rgba(${project.color}, 0.9)` : 'var(--text-50)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                  }}
                >
                  View project
                  <ArrowRight
                    size={14}
                    style={{
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RelatedProjectsV2;
