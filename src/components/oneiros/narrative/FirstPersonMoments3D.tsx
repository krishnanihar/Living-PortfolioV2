'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { SleepStage, NarrativeAct } from '@/hooks/useDepthProgress';

/**
 * First-Person Narrative Moment
 * 3D text overlay triggered by player position or time
 */
interface NarrativeMoment {
  id: string;
  trigger: 'position' | 'time' | 'room';
  triggerValue: number; // Z position, seconds since entry, or room index
  sleepStage: SleepStage;
  act: NarrativeAct;
  text: string;
  subtext?: string;
  duration: number; // How long it stays visible (ms)
  position?: [number, number, number]; // Where to show in 3D space (relative to camera)
}

// Narrative moments for Oneiros Palace
const PALACE_MOMENTS: NarrativeMoment[] = [
  // Act I: Seduction (Wake/N1)
  {
    id: 'enter',
    trigger: 'time',
    triggerValue: 3,
    sleepStage: 'wake',
    act: 'seduction',
    text: 'Welcome to the Palace.',
    subtext: 'Your dreams echo through the ages...',
    duration: 5000,
  },
  {
    id: 'first-art',
    trigger: 'time',
    triggerValue: 12,
    sleepStage: 'n1',
    act: 'seduction',
    text: 'Each masterwork was chosen for you.',
    subtext: 'The archive knows what resonates...',
    duration: 5000,
  },
  {
    id: 'descent-begin',
    trigger: 'time',
    triggerValue: 25,
    sleepStage: 'n1',
    act: 'seduction',
    text: 'Descend deeper.',
    subtext: 'The palace remembers all who enter...',
    duration: 4000,
  },
  // Act II: Complication (N2/N3)
  {
    id: 'watched',
    trigger: 'time',
    triggerValue: 45,
    sleepStage: 'n2',
    act: 'complication',
    text: 'But wait—',
    subtext: 'Who catalogued your unconscious?',
    duration: 5000,
  },
  {
    id: 'data',
    trigger: 'time',
    triggerValue: 70,
    sleepStage: 'n2',
    act: 'complication',
    text: 'Your dreams become data.',
    subtext: 'Analyzed. Categorized. Stored.',
    duration: 6000,
  },
  {
    id: 'freedom',
    trigger: 'time',
    triggerValue: 100,
    sleepStage: 'n3',
    act: 'complication',
    text: 'Can you still dream freely?',
    subtext: 'When you know you\'re being watched...',
    duration: 6000,
  },
  // Act III: Resolution (REM)
  {
    id: 'wake',
    trigger: 'time',
    triggerValue: 140,
    sleepStage: 'rem',
    act: 'resolution',
    text: 'You wake.',
    subtext: 'The recording ends. But the questions remain.',
    duration: 5000,
  },
  {
    id: 'question',
    trigger: 'time',
    triggerValue: 180,
    sleepStage: 'rem',
    act: 'resolution',
    text: 'What should we have asked first?',
    duration: 6000,
  },
];

interface FirstPersonMoments3DProps {
  isActive?: boolean;
  currentSleepStage?: SleepStage;
  currentRoomIndex?: number;
}

/**
 * 3D First-Person Moments Component
 * Shows narrative text overlays as player explores
 * Uses refs to avoid state updates in useFrame
 */
export function FirstPersonMoments3D({
  isActive = true,
  currentSleepStage = 'wake',
  currentRoomIndex = 0,
}: FirstPersonMoments3DProps) {
  const [activeMoment, setActiveMoment] = useState<NarrativeMoment | null>(null);
  const timeRef = useRef(0);
  const shownMomentsRef = useRef<Set<string>>(new Set());
  const pendingMomentRef = useRef<NarrativeMoment | null>(null);

  // Track time since component mounted - no state updates in useFrame
  useFrame((_, delta) => {
    if (!isActive) return;
    timeRef.current += delta;

    // Check time-based triggers using ref (no state updates here)
    for (const moment of PALACE_MOMENTS) {
      if (
        moment.trigger === 'time' &&
        timeRef.current >= moment.triggerValue &&
        !shownMomentsRef.current.has(moment.id)
      ) {
        // Mark as shown in ref immediately to prevent double-triggering
        shownMomentsRef.current.add(moment.id);
        pendingMomentRef.current = moment;
        break; // Only trigger one moment at a time
      }
    }
  });

  // Handle pending moments outside of useFrame via useEffect
  useEffect(() => {
    if (!isActive) return;

    const checkPendingMoment = () => {
      if (pendingMomentRef.current) {
        const moment = pendingMomentRef.current;
        pendingMomentRef.current = null;

        setActiveMoment(moment);

        // Auto-hide after duration
        const timer = setTimeout(() => {
          setActiveMoment((current) =>
            current?.id === moment.id ? null : current
          );
        }, moment.duration);

        return () => clearTimeout(timer);
      }
    };

    // Check periodically for pending moments
    const interval = setInterval(checkPendingMoment, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  if (!activeMoment || !isActive) return null;

  // Get color based on act
  const getActColor = (act: NarrativeAct): string => {
    switch (act) {
      case 'seduction':
        return '#8B5CF6';
      case 'complication':
        return '#EF4444';
      case 'resolution':
        return '#3B82F6';
      default:
        return '#FFFFFF';
    }
  };

  const color = getActColor(activeMoment.act);

  return (
    <Html
      center
      style={{
        width: '400px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          padding: '1.5rem 2rem',
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          borderRadius: '16px',
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${color}20`,
          animation: 'fadeIn 0.5s ease-out',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            borderRadius: '16px 16px 0 0',
            background: `linear-gradient(90deg, ${color}80, ${color}40)`,
          }}
        />

        {/* Main text */}
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: '400',
            letterSpacing: '-0.01em',
            lineHeight: '1.3',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: activeMoment.subtext ? '0.5rem' : '0',
            fontFamily: 'var(--font-newsreader)',
          }}
        >
          {activeMoment.text}
        </h2>

        {/* Subtext */}
        {activeMoment.subtext && (
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.6)',
              fontStyle: 'italic',
              lineHeight: '1.5',
              fontFamily: 'var(--font-urbanist)',
            }}
          >
            {activeMoment.subtext}
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Html>
  );
}

export default FirstPersonMoments3D;
