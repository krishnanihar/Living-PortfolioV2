'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import type { SleepStage } from '@/hooks/useDepthProgress';

/**
 * Binaural frequencies for each sleep stage
 * These frequencies are designed to create ambient dreamlike sounds
 */
const STAGE_FREQUENCIES: Record<SleepStage, { base: number; binaural: number; volume: number }> = {
  wake: { base: 440, binaural: 10, volume: 0.03 }, // Alpha waves (8-12 Hz)
  n1: { base: 330, binaural: 8, volume: 0.04 }, // Alpha/Theta transition
  n2: { base: 262, binaural: 6, volume: 0.05 }, // Theta waves (4-8 Hz)
  n3: { base: 196, binaural: 2, volume: 0.06 }, // Delta waves (0.5-4 Hz)
  rem: { base: 392, binaural: 7, volume: 0.05 }, // Theta with REM activity
};

interface SpatialAudioProps {
  sleepStage: SleepStage;
  enabled?: boolean;
  masterVolume?: number;
}

/**
 * Spatial Audio System for Oneiros Palace
 * Creates ambient binaural tones that change with sleep stage
 */
export function SpatialAudio({
  sleepStage,
  enabled = false,
  masterVolume = 0.5,
}: SpatialAudioProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const mergerRef = useRef<ChannelMergerNode | null>(null);
  const isInitialized = useRef(false);

  // Initialize audio context and nodes
  const initAudio = useCallback(() => {
    if (isInitialized.current || typeof window === 'undefined') return;

    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create stereo merger for binaural effect
      const merger = audioContext.createChannelMerger(2);
      mergerRef.current = merger;

      // Left channel oscillator
      const leftOsc = audioContext.createOscillator();
      const leftGain = audioContext.createGain();
      leftOsc.type = 'sine';
      leftOsc.connect(leftGain);
      leftGain.connect(merger, 0, 0);
      leftOscRef.current = leftOsc;
      leftGainRef.current = leftGain;

      // Right channel oscillator (slightly different frequency for binaural)
      const rightOsc = audioContext.createOscillator();
      const rightGain = audioContext.createGain();
      rightOsc.type = 'sine';
      rightOsc.connect(rightGain);
      rightGain.connect(merger, 0, 1);
      rightOscRef.current = rightOsc;
      rightGainRef.current = rightGain;

      // Connect merger to output
      merger.connect(audioContext.destination);

      // Start oscillators
      leftOsc.start();
      rightOsc.start();

      // Set initial volume to 0
      leftGain.gain.value = 0;
      rightGain.gain.value = 0;

      isInitialized.current = true;
    } catch (e) {
      console.warn('Web Audio API not available:', e);
    }
  }, []);

  // Update frequencies based on sleep stage
  useEffect(() => {
    if (!isInitialized.current || !audioContextRef.current) return;

    const { base, binaural, volume } = STAGE_FREQUENCIES[sleepStage];
    const targetVolume = enabled ? volume * masterVolume : 0;

    const audioContext = audioContextRef.current;
    const currentTime = audioContext.currentTime;

    // Smoothly transition frequencies
    if (leftOscRef.current && rightOscRef.current) {
      leftOscRef.current.frequency.linearRampToValueAtTime(base, currentTime + 1);
      rightOscRef.current.frequency.linearRampToValueAtTime(base + binaural, currentTime + 1);
    }

    // Smoothly transition volumes
    if (leftGainRef.current && rightGainRef.current) {
      leftGainRef.current.gain.linearRampToValueAtTime(targetVolume, currentTime + 0.5);
      rightGainRef.current.gain.linearRampToValueAtTime(targetVolume, currentTime + 0.5);
    }
  }, [sleepStage, enabled, masterVolume]);

  // Initialize on first enable
  useEffect(() => {
    if (enabled && !isInitialized.current) {
      initAudio();
    }
  }, [enabled, initAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Audio toggle button for UI
 */
interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
  primaryColor?: string;
}

export function AudioToggle({ enabled, onToggle, primaryColor = '#8B5CF6' }: AudioToggleProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${enabled ? primaryColor : 'rgba(255, 255, 255, 0.1)'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 40,
        transition: 'all 0.2s ease',
      }}
      title={enabled ? 'Disable ambient audio' : 'Enable ambient audio'}
    >
      {/* Sound wave icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={enabled ? primaryColor : 'rgba(255, 255, 255, 0.5)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {enabled ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}

export default SpatialAudio;
