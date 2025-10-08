'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';
import { Moon, Eye, Brain, Waves } from 'lucide-react';

interface FirstPersonMoment {
  trigger: number; // Scroll progress (0-1) when this moment appears
  act: 'seduction' | 'complication' | 'resolution';
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
  duration?: number; // How long it stays visible (ms)
}

/**
 * First-Person Perspective Moments
 * Immersive narrative devices that put the user in the role of protagonist
 * "Show don't tell" through experiential storytelling
 */
export function FirstPersonMoments() {
  const narrativeState = useNarrativeProgress();
  const [activeMoment, setActiveMoment] = useState<FirstPersonMoment | null>(null);
  const [shownMoments, setShownMoments] = useState<Set<number>>(new Set());

  const moments: FirstPersonMoment[] = [
    {
      trigger: 0.05,
      act: 'seduction',
      text: 'It\'s 22:47. You close your eyes.',
      subtext: 'The EEG sensors hum softly against your temples...',
      icon: <Moon className="w-8 h-8" />,
      duration: 5000,
    },
    {
      trigger: 0.12,
      act: 'seduction',
      text: 'Your brain waves slow. Theta emerges.',
      subtext: 'The interface detects your descent into sleep...',
      icon: <Waves className="w-8 h-8" />,
      duration: 5000,
    },
    {
      trigger: 0.28,
      act: 'seduction',
      text: 'You are dreaming.',
      subtext: 'The system is recording...',
      icon: <Eye className="w-8 h-8" />,
      duration: 6000,
    },
    {
      trigger: 0.35,
      act: 'complication',
      text: 'But wait—',
      subtext: 'Who granted permission to enter this space?',
      duration: 5000,
    },
    {
      trigger: 0.48,
      act: 'complication',
      text: 'Your dreams become data.',
      subtext: 'Analyzed. Categorized. Stored. Owned?',
      icon: <Brain className="w-8 h-8" />,
      duration: 6000,
    },
    {
      trigger: 0.62,
      act: 'complication',
      text: 'Can you still dream freely?',
      subtext: 'When you know you\'re being watched...',
      duration: 6000,
    },
    {
      trigger: 0.72,
      act: 'resolution',
      text: 'You wake.',
      subtext: 'The recording ends. But the questions remain.',
      duration: 5000,
    },
    {
      trigger: 0.88,
      act: 'resolution',
      text: 'What should we have asked first?',
      duration: 5000,
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

        // Auto-hide after duration
        if (moment.duration) {
          setTimeout(() => {
            setActiveMoment((current) => (current === moment ? null : current));
          }, moment.duration);
        }
      }
    });
  }, [narrativeState.progress, moments, shownMoments]);

  return (
    <AnimatePresence>
      {activeMoment && (
        <motion.div
          key={`moment-${activeMoment.trigger}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 200,
            maxWidth: '600px',
            width: '90%',
            padding: '3rem 2rem',
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            border: `1px solid ${narrativeState.color.primary.replace('0.8', '0.3')}`,
            borderRadius: '24px',
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${narrativeState.color.primary.replace('0.8', '0.2')}`,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Pulsing border effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              padding: '1px',
              background: `linear-gradient(135deg, ${narrativeState.color.primary}, ${narrativeState.color.secondary}, ${narrativeState.color.primary})`,
              backgroundSize: '200% 200%',
              animation: 'borderShimmer 4s ease-in-out infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.4,
            }}
          />

          {/* Icon */}
          {activeMoment.icon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                marginBottom: '1.5rem',
                color: narrativeState.color.primary,
                display: 'flex',
                justifyContent: 'center',
                filter: `drop-shadow(0 0 20px ${narrativeState.color.primary})`,
              }}
            >
              {activeMoment.icon}
            </motion.div>
          )}

          {/* Main text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: '200',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              color: '#ffffff',
              marginBottom: '1rem',
            }}
          >
            {activeMoment.text}
          </motion.h2>

          {/* Subtext */}
          {activeMoment.subtext && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.7)',
                fontStyle: 'italic',
                lineHeight: '1.6',
              }}
            >
              {activeMoment.subtext}
            </motion.p>
          )}

          {/* Breathing indicator */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              marginTop: '2rem',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: narrativeState.color.primary,
              margin: '2rem auto 0',
              boxShadow: `0 0 20px ${narrativeState.color.primary}`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Ambient text whispers - subtle narrative hints that float in the background
 */
export function NarrativeWhispers() {
  const narrativeState = useNarrativeProgress();
  const [whispers, setWhispers] = useState<string[]>([]);

  const whispersByAct = {
    seduction: [
      'unprecedented insight',
      'perfect recall',
      'lucid control',
      'shared dreams',
      'creative enhancement',
    ],
    complication: [
      'who owns this data?',
      'neural privacy',
      'algorithmic bias',
      'commodification',
      'loss of mystery',
    ],
    resolution: [
      'what boundaries?',
      'whose consent?',
      'preserve the ineffable',
      'human dignity',
      'technological restraint',
    ],
  };

  useEffect(() => {
    setWhispers(whispersByAct[narrativeState.act]);
  }, [narrativeState.act]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {whispers.map((whisper, index) => (
        <motion.div
          key={`${narrativeState.act}-${whisper}`}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.15, 0],
            y: [-100, -500],
            x: [(index % 3 - 1) * 50, (index % 3 - 1) * 100],
          }}
          transition={{
            duration: 25 + index * 5,
            repeat: Infinity,
            delay: index * 4,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${20 + index * 15}%`,
            fontSize: 'clamp(0.75rem, 2vw, 1rem)',
            fontWeight: '200',
            color: narrativeState.color.primary,
            textTransform: 'lowercase',
            letterSpacing: '0.2em',
            whiteSpace: 'nowrap',
          }}
        >
          {whisper}
        </motion.div>
      ))}
    </div>
  );
}
