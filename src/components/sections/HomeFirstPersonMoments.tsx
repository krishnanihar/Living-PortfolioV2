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
  chatContext?: string; // Message to show when opening chatbot
}

interface HomeFirstPersonMomentsProps {
  onOpenChat?: (contextMessage?: string) => void;
}

/**
 * First-Person Perspective Moments for Home Page
 * Appears as chatbot notifications - click to open chat with context
 */
export function HomeFirstPersonMoments({ onOpenChat }: HomeFirstPersonMomentsProps) {
  const narrativeState = useHomeNarrative();
  const [activeMoment, setActiveMoment] = useState<FirstPersonMoment | null>(null);
  const [shownMoments, setShownMoments] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  const moments: FirstPersonMoment[] = [
    {
      trigger: 0.05,
      act: 'arrival',
      text: 'You arrive at a portfolio. But this feels... different.',
      icon: <Eye className="w-8 h-8" />,
      duration: 4500,
      chatContext: "I noticed you're just getting started. Let me show you around!",
    },
    {
      trigger: 0.15,
      act: 'arrival',
      text: 'Ego death simulators. Enterprise systems. What range is this?',
      subtext: 'Psychedelic art installations to aviation dashboards serving millions',
      icon: <Brain className="w-8 h-8" />,
      duration: 5000,
      chatContext: "The breadth of work here is quite something. Want to explore specific projects?",
    },
    {
      trigger: 0.28,
      act: 'arrival',
      text: '18 months on one project. That\'s dedication.',
      subtext: 'Or obsession. Sometimes they\'re the same.',
      icon: <Sparkles className="w-8 h-8" />,
      duration: 4500,
      chatContext: "Curious about the long-term projects? I can tell you more!",
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

  const handleClick = () => {
    if (onOpenChat && activeMoment) {
      onOpenChat(activeMoment.chatContext);
    }
  };

  return (
    <AnimatePresence>
      {activeMoment && (
        <motion.div
          key={activeMoment.text}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isHovered ? 1.02 : 1,
          }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            scale: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.02 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          style={{
            position: 'fixed',
            bottom: 'calc(clamp(48px, 10vw, 56px) + 5rem)',
            right: 'clamp(1rem, 3vw, 2rem)',
            maxWidth: '380px',
            padding: '1.5rem 2rem',
            background: 'rgba(10, 10, 10, 0.15)',
            backdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isHovered
              ? `0 25px 70px rgba(0, 0, 0, 0.7),
                 0 0 1px rgba(255, 255, 255, 0.15) inset,
                 0 -1px 2px rgba(255, 255, 255, 0.08) inset,
                 0 0 30px ${narrativeState.color.primary.replace('0.8', '0.2')}`
              : `0 20px 60px rgba(0, 0, 0, 0.6),
                 0 0 1px rgba(255, 255, 255, 0.1) inset,
                 0 -1px 2px rgba(255, 255, 255, 0.05) inset`,
            zIndex: 9996,
            cursor: onOpenChat ? 'pointer' : 'default',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Chatbot badge - Sparkles icon in top-right */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'backOut' }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: narrativeState.color.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 20px ${narrativeState.color.primary.replace('0.8', '0.6')}`,
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: '#0A0A0A' }} />
          </motion.div>

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

          {/* Click hint */}
          {onOpenChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: narrativeState.color.primary,
                textAlign: 'right',
                fontWeight: '500',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Click to chat →
            </motion.div>
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
