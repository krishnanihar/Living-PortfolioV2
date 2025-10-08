'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useNarrativeProgress } from '@/hooks/useNarrativeProgress';

/**
 * Narrative Audio System
 * Optional binaural tones and ambient soundscapes that shift with narrative acts
 *
 * NOTE: This uses Web Audio API to generate sounds - no external files needed
 * Can be easily disabled by user
 */
export function NarrativeAudio() {
  const narrativeState = useNarrativeProgress();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<{ left: OscillatorNode; right: OscillatorNode } | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize audio context (must be after user interaction)
  const initializeAudio = () => {
    if (typeof window === 'undefined' || isInitialized) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.15; // Start quiet
      gainNode.connect(audioContext.destination);
      gainNodeRef.current = gainNode;

      setIsInitialized(true);
    } catch (error) {
      console.warn('Web Audio API not supported', error);
    }
  };

  // Get frequencies based on narrative act
  const getFrequencies = (act: string): { left: number; right: number } => {
    switch (act) {
      case 'seduction':
        // Alpha waves (8-13 Hz) - relaxed, creative state
        return { left: 220, right: 230 }; // 10 Hz binaural beat
      case 'complication':
        // Beta waves (13-30 Hz) - alert, focused state
        return { left: 220, right: 235 }; // 15 Hz binaural beat
      case 'resolution':
        // Theta waves (4-8 Hz) - meditative, contemplative
        return { left: 220, right: 226 }; // 6 Hz binaural beat
      default:
        return { left: 220, right: 228 };
    }
  };

  // Start/update audio based on narrative state
  useEffect(() => {
    if (!isEnabled || !isInitialized || !audioContextRef.current || !gainNodeRef.current) return;

    const audioContext = audioContextRef.current;
    const gainNode = gainNodeRef.current;

    // Stop existing oscillators
    if (oscillatorsRef.current) {
      oscillatorsRef.current.left.stop();
      oscillatorsRef.current.right.stop();
    }

    // Create stereo panner for left/right channels
    const leftPanner = audioContext.createStereoPanner();
    leftPanner.pan.value = -1; // Full left
    leftPanner.connect(gainNode);

    const rightPanner = audioContext.createStereoPanner();
    rightPanner.pan.value = 1; // Full right
    rightPanner.connect(gainNode);

    // Create oscillators
    const frequencies = getFrequencies(narrativeState.act);

    const leftOsc = audioContext.createOscillator();
    leftOsc.type = 'sine';
    leftOsc.frequency.value = frequencies.left;
    leftOsc.connect(leftPanner);

    const rightOsc = audioContext.createOscillator();
    rightOsc.type = 'sine';
    rightOsc.frequency.value = frequencies.right;
    rightOsc.connect(rightPanner);

    // Fade in
    gainNode.gain.setTargetAtTime(0.15, audioContext.currentTime, 0.5);

    leftOsc.start();
    rightOsc.start();

    oscillatorsRef.current = { left: leftOsc, right: rightOsc };

    return () => {
      // Fade out and stop
      gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.3);
      setTimeout(() => {
        leftOsc.stop();
        rightOsc.stop();
      }, 500);
    };
  }, [isEnabled, isInitialized, narrativeState.act]);

  // Adjust volume based on intensity
  useEffect(() => {
    if (!isEnabled || !gainNodeRef.current || !audioContextRef.current) return;

    const targetVolume = 0.1 + narrativeState.intensity * 0.1; // 0.1 to 0.2 range
    gainNodeRef.current.gain.setTargetAtTime(
      targetVolume,
      audioContextRef.current.currentTime,
      1.0
    );
  }, [isEnabled, narrativeState.intensity]);

  const toggleAudio = () => {
    if (!isInitialized) {
      initializeAudio();
    }
    setIsEnabled(!isEnabled);
  };

  return (
    <motion.button
      onClick={toggleAudio}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${isEnabled ? narrativeState.color.primary.replace('0.8', '0.3') : 'rgba(255, 255, 255, 0.1)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: isEnabled
          ? `0 0 20px ${narrativeState.color.primary.replace('0.8', '0.3')}`
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
      }}
      aria-label={isEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
      title={isEnabled ? 'Disable ambient audio' : 'Enable ambient audio'}
    >
      {isEnabled ? (
        <Volume2
          size={20}
          style={{
            color: narrativeState.color.primary,
          }}
        />
      ) : (
        <VolumeX size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
      )}

      {/* Pulsing indicator when enabled */}
      {isEnabled && (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: `2px solid ${narrativeState.color.primary}`,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.button>
  );
}

/**
 * Audio tooltip that appears on first visit
 */
export function AudioOnboardingTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(false);

  useEffect(() => {
    // Check localStorage
    const seen = localStorage.getItem('latent-space-audio-tooltip-seen');
    if (seen) {
      setHasSeenTooltip(true);
      return;
    }

    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismissTooltip = () => {
    setIsVisible(false);
    setHasSeenTooltip(true);
    localStorage.setItem('latent-space-audio-tooltip-seen', 'true');
  };

  if (hasSeenTooltip) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '2rem',
            zIndex: 101,
            maxWidth: '280px',
            padding: '1rem 1.25rem',
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.5',
              marginBottom: '0.75rem',
            }}
          >
            Enable ambient audio for an immersive experience. Binaural tones shift with the narrative.
          </div>

          <button
            onClick={dismissTooltip}
            style={{
              fontSize: '0.75rem',
              color: 'rgba(147, 51, 234, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              fontWeight: '500',
            }}
          >
            Got it
          </button>

          {/* Arrow pointing to button */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '24px',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(10, 10, 10, 0.98)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Audio visualization bars
 * Visual feedback for audio state
 */
export function AudioVisualization({ isActive }: { isActive: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        height: '16px',
      }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={
            isActive
              ? {
                  scaleY: [0.3, 1, 0.3],
                }
              : { scaleY: 0.3 }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
          style={{
            width: '2px',
            height: '100%',
            background: 'rgba(147, 51, 234, 0.8)',
            borderRadius: '1px',
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  );
}
