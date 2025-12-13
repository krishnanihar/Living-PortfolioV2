'use client';

/**
 * Oneiros Portal
 *
 * Wrapper component that manages the 3D Oneiros Palace experience
 * within the Latent Space scroll narrative. Handles:
 * - Entry/exit transitions
 * - Full-screen overlay when active
 * - Pointer lock management
 * - Escape key to exit
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUnifiedNarrative } from '@/hooks/useUnifiedNarrativeContext';
import dynamic from 'next/dynamic';

// Dynamically import OneirosExperience to avoid SSR issues with Three.js
const OneirosExperience = dynamic(
  () => import('@/components/oneiros/OneirosExperience').then(mod => ({ default: mod.OneirosExperience })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
              margin: '0 auto 1.5rem',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.875rem',
              color: 'var(--text-50)',
              letterSpacing: '0.1em',
            }}
          >
            Preparing the Palace...
          </p>
        </div>
      </div>
    )
  }
);

export function OneirosPortal() {
  const { state, transitionToScroll } = useUnifiedNarrative();
  const [showExitHint, setShowExitHint] = useState(false);

  const isActive = state.mode === '3d';
  const isTransitioning = state.isTransitioning;

  // Show exit hint after a delay
  useEffect(() => {
    if (isActive && !isTransitioning) {
      const timer = setTimeout(() => {
        setShowExitHint(true);
        // Hide hint after 5 seconds
        setTimeout(() => setShowExitHint(false), 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, isTransitioning]);

  // Handle escape key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && isActive && !isTransitioning) {
        // Exit pointer lock first
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        transitionToScroll();
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive, isTransitioning, transitionToScroll]);

  return (
    <AnimatePresence>
      {(isActive || isTransitioning) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#0A0A0A',
          }}
        >
          {/* 3D Experience */}
          <OneirosExperience embedded />

          {/* Exit Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => {
              if (document.pointerLockElement) {
                document.exitPointerLock();
              }
              transitionToScroll();
            }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--glass-10)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--text-15)',
              borderRadius: '8px',
              color: 'var(--text-70)',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.8125rem',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              zIndex: 110,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-15)';
              e.currentTarget.style.color = 'var(--text-90)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-10)';
              e.currentTarget.style.color = 'var(--text-70)';
            }}
          >
            <span style={{ fontSize: '1rem' }}>←</span>
            Return to Scroll
          </motion.button>

          {/* Exit Hint */}
          <AnimatePresence>
            {showExitHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'fixed',
                  bottom: '2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0.75rem 1.5rem',
                  background: 'var(--glass-08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--text-10)',
                  borderRadius: '8px',
                  zIndex: 110,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-60)',
                    margin: 0,
                  }}
                >
                  Press <kbd style={{
                    padding: '0.2rem 0.5rem',
                    background: 'var(--glass-10)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: 'var(--text-80)',
                  }}>ESC</kbd> to return to the narrative
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transition Overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: '#0A0A0A',
                  zIndex: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    fontStyle: 'italic',
                    color: 'var(--text-50)',
                  }}
                >
                  {state.mode === 'scroll' ? 'Entering the palace...' : 'Returning to the surface...'}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OneirosPortal;
