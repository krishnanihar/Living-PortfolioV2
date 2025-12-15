'use client';

import React, { useRef, useEffect, useState } from 'react';
import { BookOpen, Lightbulb, Box, Wrench, Home, Sparkles, Cpu, TestTube, Quote, Shield, Accessibility } from 'lucide-react';
import { useMetamorphic } from './MetamorphicContext';

/**
 * EgoArcNarrative - Three-Act Scroll-Driven Narrative
 *
 * Structures the case study into three emotional arcs:
 * - Act I: The Approach (research, concept, preparation)
 * - Act II: The Dissolution (process, creation, transformation)
 * - Act III: The Integration (ethics, reflection, return)
 */

// Process steps data
const PROCESS_STEPS = [
  {
    icon: BookOpen,
    title: 'Research',
    description: 'Reading Timothy Leary, Terence McKenna, and Ram Dass; exploring psychedelic subreddits; browsing Erowid for trip reports and safety learnings.',
    color: '255, 0, 122', // Pink
  },
  {
    icon: Lightbulb,
    title: 'Conceptualization',
    description: 'Ideating across mediums to distill a bathroom–mirror portal motif and an ego-dissolution arc. Mapping sensory stages and consent guardrails.',
    color: '255, 184, 0', // Orange
  },
  {
    icon: Box,
    title: '3D Modelling',
    description: 'Blocking the environment in 3D and reviewing the flow in VR to validate spatial pacing before fabrication.',
    color: '0, 255, 255', // Cyan
  },
  {
    icon: Wrench,
    title: 'Metal Frame',
    description: 'Welding a stable metal skeleton to support panels, mirror assembly, and embedded sensors.',
    color: '102, 255, 0', // Green
  },
  {
    icon: Home,
    title: 'Building',
    description: 'Plywood superstructure with granite finishes for realistic tactility; concealed cable runs to keep the illusion intact.',
    color: '181, 131, 255', // Purple
  },
  {
    icon: Sparkles,
    title: 'Visuals',
    description: 'Generating video sequences using Deforum Stable Diffusion; comparing models, samplers, steps, prompt embeddings for organic motion.',
    color: '255, 0, 170', // Magenta
  },
  {
    icon: Cpu,
    title: 'TouchDesigner',
    description: 'Tap-sensor input triggers the mirror dissolve; TouchDesigner orchestrates video, audio and light; Arduino handles IO and safety failsafes.',
    color: '0, 200, 255', // Light Blue
  },
  {
    icon: TestTube,
    title: 'Testing',
    description: 'Every viewer experiences different visuals and timing. Iterative tests tuned thresholds, volume and fade-curves to keep it safe yet profound.',
    color: '140, 255, 180', // Mint
  },
];

const TECH_STACK = [
  'TouchDesigner',
  'Arduino',
  'Deforum Stable Diffusion',
  'VR Previz',
  'Granite · Plywood',
  'Audio-Reactive SFX',
  'Safety Flow',
];

interface NarrativeSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function NarrativeSection({ id, children, className }: NarrativeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { prefersReducedMotion } = useMetamorphic();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        opacity: prefersReducedMotion ? 1 : isVisible ? 1 : 0,
        transform: prefersReducedMotion ? 'none' : isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </section>
  );
}

export function EgoArcNarrative() {
  const { atmosphereColor, currentAct, isMobile } = useMetamorphic();
  const brandRgb = '147, 51, 234';

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0 1.5rem' : '0 2rem',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: '200',
    letterSpacing: '-0.02em',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: 'var(--text-95)',
  };

  const leadTextStyle: React.CSSProperties = {
    color: 'var(--text-60)',
    maxWidth: '800px',
    margin: '0 auto 3rem auto',
    fontWeight: '300',
    fontSize: isMobile ? '1rem' : '1.0625rem',
    textAlign: 'center',
    lineHeight: '1.8',
  };

  return (
    <div className="ego-arc-narrative">
      {/* ========== ACT I: THE APPROACH ========== */}
      <NarrativeSection id="act-one">
        <div
          style={{
            padding: isMobile ? '4rem 0' : '6rem 0',
            background: `radial-gradient(ellipse at top center, rgba(${brandRgb}, 0.05) 0%, transparent 50%)`,
          }}
        >
          <div style={containerStyle}>
            {/* Act indicator */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: currentAct === 1 ? `rgb(${brandRgb})` : 'var(--text-40)',
                  transition: 'color 0.5s ease',
                }}
              >
                Act I — The Approach
              </span>
            </div>

            {/* Quote block */}
            <blockquote
              style={{
                maxWidth: '700px',
                margin: '0 auto 4rem auto',
                padding: '2rem',
                background: 'var(--glass-03)',
                borderRadius: '20px',
                border: '1px solid var(--glass-08)',
                position: 'relative',
              }}
            >
              <Quote
                size={32}
                style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '24px',
                  color: `rgba(${brandRgb}, 0.4)`,
                }}
              />
              <p
                style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontStyle: 'italic',
                  lineHeight: '1.8',
                  color: 'var(--text-70)',
                  margin: 0,
                }}
              >
                "The psychedelic experience is simply a compressed and intensified version of
                what happens to us every night when we dream."
              </p>
              <footer
                style={{
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-50)',
                }}
              >
                — Terence McKenna
              </footer>
            </blockquote>

            {/* Concept cards */}
            <h2 style={sectionTitleStyle}>Concept</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1.5rem',
              }}
            >
              <article
                style={{
                  background: 'var(--glass-03)',
                  border: '1px solid var(--glass-08)',
                  borderRadius: '20px',
                  padding: '2rem',
                }}
              >
                <p style={{ color: 'var(--text-70)', lineHeight: '1.8', margin: 0 }}>
                  The viewers confront death-like states within an immersive environment. The design
                  intentionally mirrors bardo-like passages: loss of ordinary identity, surrender to
                  sensory overload, and re-emergence with insight.
                </p>
              </article>
              <article
                style={{
                  background: 'var(--glass-03)',
                  border: '1px solid var(--glass-08)',
                  borderRadius: '20px',
                  padding: '2rem',
                }}
              >
                <p style={{ color: 'var(--text-70)', lineHeight: '1.8', margin: 0 }}>
                  Soundscapes avoid rigid structure—free-flowing, emergent, and deeply textural—while
                  visuals behave like sentient reflections born from light itself. The guide archetype
                  appears briefly as a compassionate presence.
                </p>
              </article>
            </div>
          </div>
        </div>
      </NarrativeSection>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${atmosphereColor.primary}, 0.3), transparent)`,
          maxWidth: '1200px',
          margin: '0 auto',
          transition: 'background 1s ease',
        }}
      />

      {/* ========== ACT II: THE DISSOLUTION ========== */}
      <NarrativeSection id="act-two">
        <div
          style={{
            padding: isMobile ? '4rem 0' : '6rem 0',
            background: `radial-gradient(ellipse at center, rgba(255, 0, 122, 0.03) 0%, transparent 50%)`,
          }}
        >
          <div style={containerStyle}>
            {/* Act indicator */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: currentAct === 2 ? 'rgb(255, 0, 122)' : 'var(--text-40)',
                  transition: 'color 0.5s ease',
                }}
              >
                Act II — The Dissolution
              </span>
            </div>

            <h2 style={sectionTitleStyle}>Process</h2>
            <p style={leadTextStyle}>
              Eight stages of creation, from research to final testing.
            </p>

            {/* Process grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <ProcessCard
                    key={index}
                    icon={Icon}
                    title={step.title}
                    description={step.description}
                    color={step.color}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </NarrativeSection>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${atmosphereColor.primary}, 0.3), transparent)`,
          maxWidth: '1200px',
          margin: '0 auto',
          transition: 'background 1s ease',
        }}
      />

      {/* ========== ACT III: THE INTEGRATION ========== */}
      <NarrativeSection id="act-three">
        <div
          style={{
            padding: isMobile ? '4rem 0' : '6rem 0',
            background: `radial-gradient(ellipse at bottom center, rgba(0, 255, 255, 0.03) 0%, transparent 50%)`,
          }}
        >
          <div style={containerStyle}>
            {/* Act indicator */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: currentAct === 3 ? 'rgb(0, 255, 255)' : 'var(--text-40)',
                  transition: 'color 0.5s ease',
                }}
              >
                Act III — The Integration
              </span>
            </div>

            {/* Tech Stack */}
            <h2 style={sectionTitleStyle}>Tech Stack</h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: 'center',
                marginBottom: '4rem',
              }}
            >
              {TECH_STACK.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '100px',
                    background: 'var(--glass-05)',
                    border: '1px solid var(--glass-10)',
                    color: 'var(--text-70)',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Ethics section */}
            <h2 style={sectionTitleStyle}>Ethics & Safety</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1.5rem',
              }}
            >
              <article
                style={{
                  background: 'var(--glass-03)',
                  border: '1px solid var(--glass-08)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <Shield size={24} style={{ color: 'rgba(0, 255, 255, 0.6)', flexShrink: 0 }} />
                <p style={{ color: 'var(--text-70)', lineHeight: '1.8', margin: 0 }}>
                  Inspired by <em>The Psychedelic Experience</em> (Leary et al.), the installation
                  frames ego-dissolution symbolically—no substances involved. Clear opt-out,
                  calming lights on exit, and staff-visible safety indicators.
                </p>
              </article>
              <article
                style={{
                  background: 'var(--glass-03)',
                  border: '1px solid var(--glass-08)',
                  borderRadius: '20px',
                  padding: '2rem',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <Accessibility size={24} style={{ color: 'rgba(0, 255, 255, 0.6)', flexShrink: 0 }} />
                <p style={{ color: 'var(--text-70)', lineHeight: '1.8', margin: 0 }}>
                  Accessibility: subtitles for audio sequences, path lighting, and a seated option
                  near the mirror. Motion intensity respects <code style={{ color: 'var(--text-50)', background: 'var(--glass-05)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>prefers-reduced-motion</code>.
                </p>
              </article>
            </div>
          </div>
        </div>
      </NarrativeSection>
    </div>
  );
}

// Process Card Component
interface ProcessCardProps {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
  color: string;
  index: number;
}

function ProcessCard({ icon: Icon, title, description, color, index }: ProcessCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'var(--glass-06)' : 'var(--glass-03)',
        border: isHovered ? `1px solid rgba(${color}, 0.3)` : '1px solid var(--glass-08)',
        borderRadius: '20px',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px rgba(${color}, 0.1)` : 'none',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '64px',
          height: '64px',
          margin: '0 auto 1.25rem auto',
          borderRadius: '16px',
          background: `rgba(${color}, 0.1)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s ease',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
        }}
      >
        <Icon size={28} style={{ color: `rgb(${color})` }} />
      </div>

      {/* Stage number */}
      <span
        style={{
          display: 'block',
          fontSize: '0.7rem',
          fontWeight: '500',
          letterSpacing: '0.15em',
          color: `rgba(${color}, 0.7)`,
          marginBottom: '0.75rem',
        }}
      >
        STAGE {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: '500',
          color: 'var(--text-95)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--text-60)',
          lineHeight: '1.7',
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default EgoArcNarrative;
