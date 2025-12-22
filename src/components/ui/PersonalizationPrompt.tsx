'use client';

/**
 * PersonalizationPrompt Component
 *
 * "What brings you here?" progressive profiling prompt.
 * Appears for returning visitors who haven't set an intent.
 *
 * Features:
 * - Ultra-liquid glass aesthetic
 * - 4 intent options + skip
 * - Keyboard accessible
 * - Non-intrusive
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Sparkles, GraduationCap, Users, X } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';
import type { VisitorIntent } from '@/lib/personalization/types';

// ============================================
// Intent Configuration
// ============================================

interface IntentOption {
  value: NonNullable<VisitorIntent>;
  label: string;
  icon: typeof Briefcase;
  color: string;
  description: string;
}

const INTENT_OPTIONS: IntentOption[] = [
  {
    value: 'hiring',
    label: 'Hiring',
    icon: Briefcase,
    color: '#3B82F6', // Professional blue
    description: "I'm looking to hire",
  },
  {
    value: 'inspiration',
    label: 'Inspiration',
    icon: Sparkles,
    color: '#8B5CF6', // Creative purple
    description: 'Seeking creative ideas',
  },
  {
    value: 'learning',
    label: 'Learning',
    icon: GraduationCap,
    color: '#10B981', // Growth green
    description: 'Studying design patterns',
  },
  {
    value: 'collaboration',
    label: 'Collaboration',
    icon: Users,
    color: '#F59E0B', // Partnership orange
    description: 'Looking to work together',
  },
];

// ============================================
// Component
// ============================================

interface PersonalizationPromptProps {
  variant?: 'embedded' | 'floating' | 'modal';
  onClose?: () => void;
  /** Callback when intent is selected (for chatbot integration) */
  onComplete?: (intent: NonNullable<VisitorIntent> | null) => void;
  /** Force show regardless of shouldShowIntentPrompt (for chatbot integration) */
  forceShow?: boolean;
}

export function PersonalizationPrompt({
  variant = 'embedded',
  onClose,
  onComplete,
  forceShow = false,
}: PersonalizationPromptProps) {
  const { setIntent, declineIntent, state, shouldShowIntentPrompt } = usePersonalization();
  const [isVisible, setIsVisible] = useState(forceShow);
  const [selectedIntent, setSelectedIntent] = useState<NonNullable<VisitorIntent> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Delay appearance for smoother UX (only when not force shown)
  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
      return;
    }

    if (shouldShowIntentPrompt) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, variant === 'embedded' ? 500 : 2000);

      return () => clearTimeout(timer);
    }
  }, [shouldShowIntentPrompt, variant, forceShow]);

  // Handle intent selection
  const handleSelectIntent = useCallback(
    (intent: NonNullable<VisitorIntent>) => {
      setSelectedIntent(intent);

      // Brief visual feedback before saving
      setTimeout(() => {
        setIntent(intent);
        setIsVisible(false);
        onComplete?.(intent);
        onClose?.();
      }, 300);
    },
    [setIntent, onClose, onComplete]
  );

  // Handle skip
  const handleSkip = useCallback(() => {
    declineIntent();
    setIsVisible(false);
    onComplete?.(null);
    onClose?.();
  }, [declineIntent, onClose, onComplete]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleSkip();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleSkip]);

  // Don't render if shouldn't show or intent already set (unless forceShow)
  if (!forceShow && (!shouldShowIntentPrompt || state.schema.visitor.intent || state.schema.visitor.intentDeclined)) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className={getContainerClass(variant)}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-labelledby="personalization-title"
          aria-describedby="personalization-description"
        >
          {/* Glass background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              background: 'var(--glass-05)',
              backdropFilter: 'blur(80px) saturate(180%)',
              WebkitBackdropFilter: 'blur(80px) saturate(180%)',
              border: '1px solid var(--glass-10)',
              boxShadow: `
                0 4px 24px rgba(0, 0, 0, 0.1),
                0 1px 2px rgba(0, 0, 0, 0.05),
                inset 0 1px 0 var(--glass-08)
              `,
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, padding: '1.5rem' }}>
            {/* Close button (for floating/modal variants) */}
            {variant !== 'embedded' && (
              <button
                onClick={handleSkip}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  background: 'var(--glass-05)',
                  border: 'none',
                  color: 'var(--text-40)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Close"
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
            )}

            {/* Title */}
            <h3
              id="personalization-title"
              style={{
                textAlign: 'center',
                marginBottom: '0.5rem',
                color: 'var(--text-90)',
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                fontWeight: 500,
              }}
            >
              What brings you to my portfolio today?
            </h3>

            {/* Subtitle */}
            <p
              id="personalization-description"
              style={{
                textAlign: 'center',
                marginBottom: '1.25rem',
                color: 'var(--text-50)',
                fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)',
              }}
            >
              This helps me show you relevant work
            </p>

            {/* Intent buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              {INTENT_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedIntent === option.value;

                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSelectIntent(option.value)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      background: isSelected ? `${option.color}20` : 'var(--glass-08)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: `1px solid ${isSelected ? option.color : 'var(--glass-12)'}`,
                      color: isSelected ? option.color : 'var(--text-80)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-pressed={isSelected}
                  >
                    <Icon
                      style={{
                        width: '16px',
                        height: '16px',
                        flexShrink: 0,
                        color: isSelected ? option.color : 'var(--text-60)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: isSelected ? option.color : 'var(--text-80)',
                      }}
                    >
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Skip button */}
            <button
              onClick={handleSkip}
              style={{
                width: '100%',
                padding: '0.5rem 0',
                textAlign: 'center',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-40)',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
            >
              Skip – I'm just browsing
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// Styling Helpers
// ============================================

function getContainerClass(variant: PersonalizationPromptProps['variant']): string {
  const base = 'relative overflow-hidden';

  switch (variant) {
    case 'floating':
      return `${base} fixed bottom-6 right-6 w-80 max-w-[calc(100vw-3rem)] z-50`;
    case 'modal':
      return `${base} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[calc(100vw-2rem)] z-50`;
    case 'embedded':
    default:
      return `${base} w-full max-w-md mx-auto`;
  }
}

// ============================================
// Floating Trigger Component
// ============================================

export function PersonalizationPromptFloating() {
  return <PersonalizationPrompt variant="floating" />;
}

// ============================================
// Modal Overlay (for modal variant)
// ============================================

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PersonalizationModal({ isOpen, onClose }: PersonalizationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <PersonalizationPrompt variant="modal" onClose={onClose} />
    </>
  );
}
