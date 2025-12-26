'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Atropos from 'atropos';
import 'atropos/css';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 400, damping: 25 };

export interface ProjectData {
  id: string;
  name: string;
  company: string;
  tagline: string;
  description: string;
  status: 'live' | 'shipped' | 'concept' | 'winner' | 'development';
  category: string;
  tags: string[];
  year: string;
  accentColor: string;
  image: string;
}

interface ProjectSectionProps {
  project: ProjectData;
  isActive: boolean;
}

// Status badge styling (matching ProjectCard.tsx)
const getStatusStyles = (status: string) => {
  const styles: Record<string, string> = {
    live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    shipped: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    concept: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    winner: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    development: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };
  return styles[status] || styles.development;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    live: 'Live',
    shipped: 'Shipped',
    concept: 'Concept',
    winner: 'Winner',
    development: 'In Dev',
  };
  return labels[status] || 'In Dev';
};

export function ProjectSection({ project, isActive }: ProjectSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  const atroposRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Initialize Atropos 3D effect
  useEffect(() => {
    if (!atroposRef.current || prefersReducedMotion) return;

    // Only initialize on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    atroposInstance.current = Atropos({
      el: atroposRef.current,
      activeOffset: 60,
      rotateXMax: 3,
      rotateYMax: 3,
      shadow: false,
      highlight: false,
      duration: 800,
    });

    return () => {
      atroposInstance.current?.destroy();
    };
  }, [prefersReducedMotion]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: PREMIUM_EASE,
      },
    }),
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}
    >
      {/* Card with Atropos 3D Effect */}
      <motion.div
        custom={0.1}
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        style={{ width: '100%' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={atroposRef}
          className="atropos"
          style={{ width: '100%' }}
        >
          <div className="atropos-scale">
            <div className="atropos-rotate">
              <div
                className="atropos-inner group"
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'var(--glass-03)',
                  backdropFilter: 'blur(40px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                  border: '1px solid var(--text-08)',
                  borderLeft: isHovered ? `2px solid ${project.accentColor}` : '2px solid transparent',
                  padding: '1.5rem',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {/* Top accent line animation */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '2px',
                    width: isHovered ? '100%' : '0%',
                    background: project.accentColor,
                    transition: 'width 0.3s ease',
                  }}
                />

                {/* Header: Title + Status Badge */}
                <div
                  data-atropos-offset="2"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                        fontWeight: 600,
                        color: 'var(--text-95)',
                        fontFamily: 'var(--font-space-grotesk)',
                        margin: 0,
                        marginBottom: '0.25rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {project.name}
                    </h2>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--text-60)',
                        margin: 0,
                      }}
                    >
                      {project.company}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={getStatusStyles(project.status)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      flexShrink: 0,
                    }}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                {/* Image Container - 16:9 aspect ratio */}
                <div
                  data-atropos-offset="5"
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.3s ease',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                </div>

                {/* Description */}
                <p
                  data-atropos-offset="3"
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-70)',
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: '1rem',
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div
                  data-atropos-offset="2"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        borderRadius: '6px',
                        background: isHovered ? 'var(--glass-10)' : 'var(--glass-05)',
                        border: `1px solid ${isHovered ? 'var(--text-20)' : 'var(--text-10)'}`,
                        color: isHovered ? 'var(--text-90)' : 'var(--text-80)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer: Year + View Details */}
                <div
                  data-atropos-offset="1"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--text-10)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: isHovered ? 'var(--text-70)' : 'var(--text-50)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {project.year}
                  </span>

                  <Link href={`/work/${project.id}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={prefersReducedMotion ? undefined : { x: 3 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.375rem 0.75rem',
                        background: isHovered ? 'var(--glass-08)' : 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: 'var(--text-80)',
                        }}
                      >
                        View Details
                      </span>
                      <ArrowRight
                        size={12}
                        style={{ color: project.accentColor }}
                      />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Project data for the tour - Order: Air India, Cleara, Metamorphic
export const TOUR_PROJECTS: ProjectData[] = [
  {
    id: 'air-india',
    name: 'Air India',
    company: 'Air India DesignLAB',
    tagline: 'Design System at 40,000 Feet',
    description: 'Unified design language serving 450+ daily users across in-flight entertainment, crew tools, and passenger touchpoints.',
    status: 'shipped',
    category: 'system',
    tags: ['Design Systems', 'Aviation', 'Enterprise', 'IFE'],
    year: '2024',
    accentColor: '#DA0E29',
    image: '/images/air-india/IFE.png',
  },
  {
    id: 'cleara',
    name: 'Cleara',
    company: 'Personal Research',
    tagline: 'AI-Powered Psoriasis Care',
    description: '18-month digital therapeutic design concept reimagining psoriasis care through AI-powered interventions with a watercolor healing aesthetic.',
    status: 'concept',
    category: 'research',
    tags: ['Digital Health', 'AI/ML', 'UX Research', 'Mobile'],
    year: '2024',
    accentColor: '#10B981',
    image: '/images/cleara/watercolor/hero-fragment-1.png',
  },
  {
    id: 'metamorphic-fractal-reflections',
    name: 'Metamorphic Fractal Reflections',
    company: 'National Institute of Design',
    tagline: 'Generative Art Exhibition',
    description: 'Psychedelic journey installation exploring consciousness through ego dissolution. An immersive bathroom mirror portal experience.',
    status: 'shipped',
    category: 'research',
    tags: ['Installation', 'TouchDesigner', 'Consciousness', 'Art'],
    year: '2023',
    accentColor: '#8B5CF6',
    image: '/images/metamorphic/meta1.jpg',
  },
];
