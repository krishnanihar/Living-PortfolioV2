'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Eye, Waves, Sun, ArrowRight } from 'lucide-react';
import { animate, stagger } from 'animejs';

/**
 * JourneyNarrative - Three-Phase Journey Section
 *
 * Displays the installation's narrative arc:
 * - Phase 1: The Approach (entering the bathroom, confronting the mirror)
 * - Phase 2: The Dissolution (tap interaction, ego dissolution)
 * - Phase 3: The Integration (return to self, reflection)
 *
 * Features:
 * - Expandable cards with anime.js transitions
 * - Scroll-triggered stagger reveal
 * - Connecting line animations
 */

interface JourneyPhase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
}

const JOURNEY_PHASES: JourneyPhase[] = [
  {
    id: 'approach',
    number: '01',
    title: 'The Approach',
    subtitle: 'Entering the Threshold',
    description:
      'Participants enter a custom-designed bathroom space, confronting their reflection in a two-way mirror that conceals a hidden TV screen.',
    details: [
      'Custom bathroom environment with warm, familiar lighting',
      'Two-way mirror positioned above a functional sink',
      'Concealed TV screen behind the mirror surface',
      'Rotary encoder module embedded in the water tap',
    ],
    icon: Eye,
    color: 'var(--metamorphic-accent-rgb)',
  },
  {
    id: 'dissolution',
    number: '02',
    title: 'The Dissolution',
    subtitle: 'Ego Death Simulation',
    description:
      'Turning the tap triggers a cascade of events—flickering lights, psychedelic visuals, and a dissolve effect that merges the participant with AI-generated patterns.',
    details: [
      'Arduino detects tap rotation via rotary encoder',
      'Relay switch modulates ambient lighting into flickering darkness',
      'TouchDesigner processes webcam feed in real-time',
      'AI-generated visuals (Deforum Stable Diffusion) fill the mirror',
      "Participant's reflection dissolves into psychedelic patterns",
    ],
    icon: Waves,
    color: 'var(--metamorphic-highlight-rgb)',
  },
  {
    id: 'integration',
    number: '03',
    title: 'The Integration',
    subtitle: 'Return to Self',
    description:
      'The experience concludes as the TV fades to black, lights return, and the mirror once again reflects the participant—symbolizing the re-emergence of the ego.',
    details: [
      'Arduino signals the end of the experience',
      'TV display gracefully fades to black',
      'Bathroom lights re-illuminate gradually',
      'Mirror returns to its reflective state',
      'Moment of integration and reflection',
    ],
    icon: Sun,
    color: 'var(--metamorphic-cyan-rgb)',
  },
];

export function JourneyNarrative() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  // Scroll-triggered reveal animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          if (!prefersReducedMotion) {
            // Stagger animate cards with anime.js v4
            animate(cardsRef.current, {
              opacity: [0, 1],
              translateY: [60, 0],
              scale: [0.95, 1],
              delay: stagger(150, { start: 200 }),
              duration: 800,
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

  // Handle card expansion
  const handleCardClick = (phaseId: string) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseId);

      // Animate the expansion with anime.js v4
      if (!prefersReducedMotion) {
        const card = cardsRef.current[JOURNEY_PHASES.findIndex((p) => p.id === phaseId)];
        if (card) {
          const details = card.querySelector('.phase-details');
          if (details) {
            animate(details, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 400,
              ease: 'outQuad',
            });
          }
        }
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="journey"
      style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '3rem' : '4rem',
            opacity: isVisible || prefersReducedMotion ? 1 : 0,
            transform:
              isVisible || prefersReducedMotion
                ? 'translateY(0)'
                : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(var(--metamorphic-accent-rgb), 0.8)',
            }}
          >
            The Experience
          </span>
          <h2
            style={{
              fontSize: isMobile
                ? 'clamp(1.75rem, 6vw, 2.25rem)'
                : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'var(--text-95)',
              marginTop: '0.75rem',
            }}
          >
            A Journey in Three Acts
          </h2>
          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.0625rem',
              color: 'var(--text-60)',
              maxWidth: '600px',
              margin: '1rem auto 0',
              lineHeight: 1.7,
            }}
          >
            Based on Timothy Leary's adaptation of the Tibetan Book of the Dead,
            this installation guides participants through a simulated psychedelic
            experience.
          </p>
        </div>

        {/* Phase cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
          }}
        >
          {JOURNEY_PHASES.map((phase, index) => {
            const Icon = phase.icon;
            const isExpanded = expandedPhase === phase.id;

            return (
              <div
                key={phase.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                onClick={() => handleCardClick(phase.id)}
                style={{
                  background: isExpanded
                    ? `rgba(${phase.color}, 0.08)`
                    : 'var(--glass-03)',
                  border: isExpanded
                    ? `1px solid rgba(${phase.color}, 0.3)`
                    : '1px solid var(--glass-08)',
                  borderRadius: '20px',
                  padding: isMobile ? '1.5rem' : '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: prefersReducedMotion ? 1 : 0,
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = `rgba(${phase.color}, 0.2)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--glass-08)';
                  }
                }}
              >
                {/* Phase number and icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: `rgba(${phase.color}, 0.8)`,
                    }}
                  >
                    PHASE {phase.number}
                  </span>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: `rgba(${phase.color}, 0.1)`,
                      transition: 'transform 0.3s ease',
                      transform: isExpanded ? 'rotate(10deg) scale(1.1)' : 'none',
                    }}
                  >
                    <Icon
                      size={24}
                      style={{ color: `rgba(${phase.color}, 0.9)` }}
                    />
                  </div>
                </div>

                {/* Title and subtitle */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: 'var(--text-95)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {phase.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontStyle: 'italic',
                    color: `rgba(${phase.color}, 0.7)`,
                    marginBottom: '1rem',
                  }}
                >
                  {phase.subtitle}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-60)',
                    lineHeight: 1.7,
                    marginBottom: isExpanded ? '1.5rem' : 0,
                  }}
                >
                  {phase.description}
                </p>

                {/* Expanded details */}
                {isExpanded && (
                  <div
                    className="phase-details"
                    style={{
                      borderTop: `1px solid rgba(${phase.color}, 0.15)`,
                      paddingTop: '1.25rem',
                    }}
                  >
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      {phase.details.map((detail, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                            fontSize: '0.875rem',
                            color: 'var(--text-70)',
                          }}
                        >
                          <ArrowRight
                            size={14}
                            style={{
                              color: `rgba(${phase.color}, 0.6)`,
                              marginTop: '3px',
                              flexShrink: 0,
                            }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expand indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--glass-06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'var(--text-40)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {isExpanded ? 'Click to collapse' : 'Click to expand'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JourneyNarrative;
