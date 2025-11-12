'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHomeNarrative } from '@/hooks/useHomeNarrative';
import { Eye, Brain, Sparkles } from 'lucide-react';

interface FirstPersonMoment {
  trigger: number; // Scroll progress (0-1) when this moment appears
  act: 'arrival' | 'philosophy' | 'catalog';
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
  duration?: number; // How long it stays visible (ms)
}

/**
 * First-Person Perspective Moments for Home Page
 * Immersive narrative devices that create engagement through progressive revelation
 */
export function HomeFirstPersonMoments() {
  const narrativeState = useHomeNarrative();
  const [activeMoment, setActiveMoment] = useState<FirstPersonMoment | null>(null);
  const [shownMoments, setShownMoments] = useState<Set<number>>(new Set());

  const moments: FirstPersonMoment[] = [
    {
      trigger: 0.05,
      act: 'arrival',
      text: 'You arrive at a portfolio. But this feels... different.',
      icon: <Eye className="w-8 h-8" />,
      duration: 4500,
    },
    {
      trigger: 0.15,
      act: 'arrival',
      text: 'Ego death simulators. Enterprise systems. What range is this?',
      subtext: 'Psychedelic art installations to aviation dashboards serving millions',
      icon: <Brain className="w-8 h-8" />,
      duration: 5000,
    },
    {
      trigger: 0.28,
      act: 'arrival',
      text: '18 months on one project. That\'s dedication.',
      subtext: 'Or obsession. Sometimes they\'re the same.',
      icon: <Sparkles className="w-8 h-8" />,
      duration: 4500,
    },
  ];

  useEffect(() => {
    // Check if any moment should be triggered
    moments.forEach((moment, index) => {
      const triggerRange = 0.02; // 2% scroll tolerance
      const isInRange =
        narrativeState.progress >= moment.trigger &&
        narrativeState.progress < moment.trigger + triggerRange;

      if (isInRange && !shownMoments.has(index)) {
        setActiveMoment(moment);
        setShownMoments((prev) => new Set(prev).add(index));

        // Auto-dismiss after duration
        const duration = moment.duration || 5000;
        setTimeout(() => {
          setActiveMoment(null);
        }, duration);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrativeState.progress]);

  return (
    <AnimatePresence>
      {activeMoment && (
        <motion.div
          key={activeMoment.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            maxWidth: '420px',
            padding: '1.5rem 2rem',
            background: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(60px) saturate(180%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%) brightness(0.9)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow:
              '0 20px 60px rgba(0, 0, 0, 0.6), ' +
              '0 0 1px rgba(255, 255, 255, 0.1) inset, ' +
              '0 -1px 2px rgba(255, 255, 255, 0.05) inset',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          {/* Icon */}
          {activeMoment.icon && (
            <div
              style={{
                color: narrativeState.color.primary,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {activeMoment.icon}
            </div>
          )}

          {/* Main Text */}
          <div
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.5',
              marginBottom: activeMoment.subtext ? '0.75rem' : '0',
              textAlign: 'left',
            }}
          >
            {activeMoment.text}
          </div>

          {/* Subtext */}
          {activeMoment.subtext && (
            <div
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                fontStyle: 'italic',
                textAlign: 'left',
              }}
            >
              {activeMoment.subtext}
            </div>
          )}

          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '1.5rem',
              right: '1.5rem',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${narrativeState.color.primary}, transparent)`,
              opacity: 0.4,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
