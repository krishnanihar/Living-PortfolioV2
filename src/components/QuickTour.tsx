'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface QuickTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'intro',
    title: 'Hi, I\'m Krishna Nihar',
    description: 'Product & New Media Designer who builds living interfaces. I\'ve worked with Air India, NID, ISB, and Microsoft — designing systems that serve 450+ users daily.',
    targetSelector: '[data-tour="hero-card"]',
    position: 'bottom',
  },
  {
    id: 'philosophy',
    title: 'I believe interfaces should feel alive',
    description: 'This portfolio itself is an experiment in consciousness-aware design. Every interaction, animation, and response is intentional — creating an experience that breathes and adapts to you.',
    targetSelector: '[data-tour="hero-card"]',
    position: 'center',
  },
  {
    id: 'experience',
    title: 'Designed at Scale',
    description: 'From Air India\'s DesignLAB to Microsoft, I\'ve built design systems and tools that work across teams, platforms, and cultures. My focus: systems that scale without losing humanity.',
    targetSelector: '[data-tour="navigation"]',
    position: 'bottom',
  },
  {
    id: 'work',
    title: 'Exploring the Intersection',
    description: 'My projects sit at the intersection of design systems, new media, and speculative futures. From Pixel Radar (Figma plugin) to consciousness-aware interfaces — each explores what\'s possible.',
    targetSelector: '[data-tour="hero-card"]',
    position: 'bottom',
  },
  {
    id: 'connect',
    title: 'Let\'s Talk',
    description: 'I document my process, share insights openly, and believe in conversations over portfolios. Choose an intent above to explore my work through your lens — or just say hi.',
    targetSelector: '[data-tour="conversation-starter"]',
    position: 'bottom',
  },
];

export function QuickTour({ isOpen, onClose }: QuickTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const step = tourSteps[currentStep];
      const target = document.querySelector(step.targetSelector);

      if (target) {
        const rect = target.getBoundingClientRect();
        setHighlightRect(rect);

        // Calculate tooltip position based on step position
        let top = 0;
        let left = 0;

        switch (step.position) {
          case 'bottom':
            top = rect.bottom + 20;
            left = rect.left + rect.width / 2;
            break;
          case 'top':
            top = rect.top - 20;
            left = rect.left + rect.width / 2;
            break;
          case 'center':
            top = window.innerHeight / 2;
            left = window.innerWidth / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - 20;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + 20;
            break;
        }

        setTooltipPosition({ top, left });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);

      // Auto-scroll to next element
      const nextStep = tourSteps[currentStep + 1];
      const target = document.querySelector(nextStep.targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);

      // Auto-scroll to previous element
      const prevStep = tourSteps[currentStep - 1];
      const target = document.querySelector(prevStep.targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleClose = () => {
    localStorage.setItem('portfolio_tour_completed', 'true');
    onClose();
  };

  const handleFinish = () => {
    localStorage.setItem('portfolio_tour_completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Dark Overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 9998,
        opacity: 0,
        animation: 'fadeIn 0.4s ease forwards',
      }} />

      {/* Spotlight Highlight */}
      {highlightRect && (
        <div style={{
          position: 'fixed',
          top: highlightRect.top - 8,
          left: highlightRect.left - 8,
          width: highlightRect.width + 16,
          height: highlightRect.height + 16,
          border: '2px solid rgba(218, 14, 41, 0.6)',
          borderRadius: '24px',
          boxShadow: '0 0 0 4px rgba(218, 14, 41, 0.1), 0 0 40px rgba(218, 14, 41, 0.3)',
          zIndex: 9999,
          pointerEvents: 'none',
          animation: 'spotlightPulse 2s ease-in-out infinite',
        }} />
      )}

      {/* Tooltip Card */}
      <div style={{
        position: 'fixed',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: step.position === 'center'
          ? 'translate(-50%, -50%)'
          : step.position === 'bottom' || step.position === 'top'
          ? 'translateX(-50%)'
          : 'translateY(-50%)',
        maxWidth: '400px',
        minWidth: '320px',
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(40px) brightness(0.9)',
        WebkitBackdropFilter: 'blur(40px) brightness(0.9)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '1.75rem',
        zIndex: 10000,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        opacity: 0,
        animation: 'tooltipSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={16} />
        </button>

        {/* Step Counter */}
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginBottom: '0.75rem',
          fontWeight: '400',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <Sparkles size={14} style={{ color: 'rgba(218, 14, 41, 0.7)' }} />
          STEP {currentStep + 1} OF {tourSteps.length}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
        }}>
          {step.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1.5rem',
          fontWeight: '300',
        }}>
          {step.description}
        </p>

        {/* Progress Dots */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          justifyContent: 'center',
        }}>
          {tourSteps.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === currentStep ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentStep
                  ? 'rgba(218, 14, 41, 0.8)'
                  : index < currentStep
                  ? 'rgba(218, 14, 41, 0.3)'
                  : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'space-between',
        }}>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '0.75rem 1.25rem',
              color: currentStep === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: '400',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              opacity: currentStep === 0 ? 0.4 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentStep > 0) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep > 0) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {/* Skip/Next/Finish Button */}
          <button
            onClick={currentStep === tourSteps.length - 1 ? handleFinish : handleNext}
            style={{
              flex: 1,
              background: 'rgba(218, 14, 41, 0.25)',
              border: '1px solid rgba(218, 14, 41, 0.5)',
              borderRadius: '16px',
              padding: '0.75rem 1.25rem',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(218, 14, 41, 0.35)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(218, 14, 41, 0.25)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {currentStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next'}
            {currentStep < tourSteps.length - 1 && <ChevronRight size={16} />}
          </button>
        </div>

        {/* Skip Button */}
        {currentStep < tourSteps.length - 1 && (
          <button
            onClick={handleClose}
            style={{
              width: '100%',
              marginTop: '0.75rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: '400',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            Skip tour
          </button>
        )}
      </div>
    </>
  );
}
