'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Check, Mail, Linkedin, Briefcase, Sparkles, Code, Palette } from 'lucide-react';
import { animate, createTimeline } from '@/lib/anime-utils';

// Ultra-Liquid Glass Style - iOS 26 Inspired
const UNIFIED_GLASS = {
  background: 'var(--glass-03)',
  backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  border: '1px solid var(--text-10)',
  boxShadow: `
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.10),
    inset 0 1px 2px var(--glass-25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15)
  `,
};

// Tour step content
const TOUR_STEPS = [
  {
    id: 'journey',
    title: 'MY JOURNEY',
    description: 'From curious designer to crafting experiences for millions',
    milestones: [
      { year: '2019', label: 'UX Design', icon: Palette },
      { year: '2021', label: 'AI + Health', icon: Code },
      { year: '2024', label: 'Now', icon: Sparkles },
    ],
    particleColor: 'blue',
  },
  {
    id: 'work',
    title: 'MY WORK',
    description: 'Projects that push boundaries',
    projects: [
      { slug: 'air-india', name: 'Air India', category: 'System Design' },
      { slug: 'psoriassist', name: 'PsoriAssist', category: 'AI + Health' },
      { slug: 'latent-space', name: 'Latent Space', category: 'Research' },
    ],
    particleColor: 'purple',
  },
  {
    id: 'connect',
    title: "LET'S CONNECT",
    description: 'Ready to create something meaningful together?',
    ctas: [
      { label: 'Contact', href: 'mailto:krishnaniharsunkara@gmail.com', icon: Mail },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/krishnanihar', icon: Linkedin, external: true },
    ],
    particleColor: 'pink',
  },
];

interface QuickTourV2Props {
  isOpen: boolean;
  onClose: () => void;
  onStepChange?: (step: number) => void;
}

export function QuickTourV2({ isOpen, onClose, onStepChange }: QuickTourV2Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = TOUR_STEPS.length;
  const step = TOUR_STEPS[currentStep];

  // Auto-advance timer (4 seconds per step)
  useEffect(() => {
    if (!isOpen || isPaused || isTransitioning) return;

    autoAdvanceRef.current = setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        goToStep(currentStep + 1);
      }
    }, 4000);

    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
      }
    };
  }, [isOpen, currentStep, isPaused, isTransitioning, totalSteps]);

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // Entrance animation when tour opens
  useEffect(() => {
    if (isOpen && cardRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        animate(cardRef.current, {
          opacity: [0, 1],
          scale: [0.9, 1],
          translateY: [30, 0],
          duration: 500,
          ease: 'outExpo',
        });
      }
    }
  }, [isOpen]);

  const goToStep = useCallback((nextStep: number) => {
    if (isTransitioning || nextStep === currentStep) return;

    setIsTransitioning(true);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !cardRef.current) {
      setCurrentStep(nextStep);
      setIsTransitioning(false);
      return;
    }

    // Animate card transition
    const timeline = createTimeline({
      onComplete: () => {
        setCurrentStep(nextStep);
        setIsTransitioning(false);
      },
    });

    timeline
      .add(cardRef.current, {
        opacity: [1, 0],
        scale: [1, 0.95],
        duration: 200,
        ease: 'inQuad',
      })
      .add(cardRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 300,
        ease: 'outExpo',
      });
  }, [currentStep, isTransitioning]);

  const handleClose = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !cardRef.current) {
      onClose();
      setCurrentStep(0);
      return;
    }

    animate(cardRef.current, {
      opacity: [1, 0],
      scale: [1, 0.95],
      translateY: [0, 20],
      duration: 300,
      ease: 'inExpo',
      complete: () => {
        onClose();
        setCurrentStep(0);
      },
    });
  }, [onClose]);

  const handlePrev = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        padding: '1.5rem',
        ...UNIFIED_GLASS,
        borderRadius: '24px',
        color: 'var(--text-95)',
      }}
    >
      {/* Header: Progress dots + Skip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToStep(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: idx === currentStep
                  ? 'var(--text-80)'
                  : 'var(--glass-20)',
                transition: 'all 0.3s ease',
                transform: idx === currentStep ? 'scale(1.2)' : 'scale(1)',
              }}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={handleClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'var(--glass-05)',
            border: '1px solid var(--text-08)',
            borderRadius: '12px',
            color: 'var(--text-50)',
            fontSize: '0.75rem',
            fontWeight: '400',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--glass-10)';
            e.currentTarget.style.color = 'var(--text-70)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--glass-05)';
            e.currentTarget.style.color = 'var(--text-50)';
          }}
        >
          <X size={12} />
          <span>Skip</span>
        </button>
      </div>

      {/* Title */}
      <h2
        style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          letterSpacing: '0.1em',
          color: 'var(--text-50)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}
      >
        {step.title}
      </h2>

      {/* Description */}
      <p
        style={{
          fontSize: '1rem',
          fontWeight: '300',
          color: 'var(--text-70)',
          marginBottom: '1.5rem',
          lineHeight: '1.5',
        }}
      >
        {step.description}
      </p>

      {/* Step Content */}
      <div style={{ marginBottom: '1.5rem' }}>
        {/* Journey Step - Milestones */}
        {step.id === 'journey' && step.milestones && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {step.milestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'var(--glass-05)',
                    border: '1px solid var(--text-06)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: 'rgba(59, 130, 246, 0.8)',
                      marginBottom: '0.5rem',
                    }}
                  />
                  <div
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-90)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {milestone.year}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: '400',
                      color: 'var(--text-50)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {milestone.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Work Step - Project Cards */}
        {step.id === 'work' && step.projects && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {step.projects.map((project, idx) => (
              <Link
                key={idx}
                href={`/work/${project.slug}`}
                onClick={handleClose}
                style={{
                  flex: 1,
                  padding: '1rem 0.75rem',
                  background: 'var(--glass-05)',
                  border: '1px solid var(--text-06)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--glass-10)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--glass-05)';
                  e.currentTarget.style.borderColor = 'var(--text-06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-90)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {project.name}
                </div>
                <div
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: '400',
                    color: 'var(--text-40)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {project.category}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Connect Step - CTAs */}
        {step.id === 'connect' && step.ctas && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {step.ctas.map((cta, idx) => {
              const Icon = cta.icon;
              const Component = cta.external ? 'a' : Link;
              const props = cta.external
                ? { href: cta.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: cta.href };

              return (
                <Component
                  key={idx}
                  {...props}
                  onClick={handleClose}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '1rem',
                    background: idx === 0
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.05))'
                      : 'var(--glass-05)',
                    border: '1px solid',
                    borderColor: idx === 0
                      ? 'rgba(236, 72, 153, 0.15)'
                      : 'var(--text-06)',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    color: 'var(--text-85)',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = idx === 0
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(139, 92, 246, 0.08))'
                      : 'var(--glass-10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = idx === 0
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.05))'
                      : 'var(--glass-05)';
                  }}
                >
                  <Icon size={16} />
                  <span>{cta.label}</span>
                </Component>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--text-08)',
            borderRadius: '12px',
            color: currentStep === 0 ? 'var(--text-20)' : 'var(--text-60)',
            fontSize: '0.8125rem',
            fontWeight: '400',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.5 : 1,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (currentStep > 0) {
              e.currentTarget.style.background = 'var(--glass-05)';
              e.currentTarget.style.color = 'var(--text-80)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = currentStep === 0 ? 'var(--text-20)' : 'var(--text-60)';
          }}
        >
          <ChevronLeft size={14} />
          <span>Prev</span>
        </button>

        {/* Auto-advance indicator */}
        {!isPaused && (
          <div
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-30)',
              letterSpacing: '0.02em',
            }}
          >
            Auto-advancing...
          </div>
        )}

        {/* Next/Done Button */}
        <button
          onClick={handleNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: currentStep === totalSteps - 1
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))'
              : 'var(--glass-08)',
            border: '1px solid',
            borderColor: currentStep === totalSteps - 1
              ? 'rgba(139, 92, 246, 0.2)'
              : 'var(--text-10)',
            borderRadius: '12px',
            color: 'var(--text-80)',
            fontSize: '0.8125rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = currentStep === totalSteps - 1
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.15))'
              : 'var(--glass-12)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = currentStep === totalSteps - 1
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.1))'
              : 'var(--glass-08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>{currentStep === totalSteps - 1 ? 'Done' : 'Next'}</span>
          {currentStep === totalSteps - 1 ? <Check size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
}

export default QuickTourV2;
