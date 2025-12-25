'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTourSnap } from './useTourSnap';
import { TourSection } from './TourSection';
import { TourProgress } from './TourProgress';
import { WelcomeSection } from './sections/WelcomeSection';
import { MilestoneSection, MILESTONES } from './sections/MilestoneSection';
import { WorkSection } from './sections/WorkSection';
import { ConnectSection } from './sections/ConnectSection';

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const SECTION_COLORS = [
  '#8B5CF6', // Welcome
  '#3B82F6', // Origins
  '#EC4899', // Systems
  '#DA0E29', // Scale
  '#8B5CF6', // Work
  '#EC4899', // Connect
];

interface ScrollytellingTourProps {
  onClose: () => void;
  onContact?: () => void;
}

export function ScrollytellingTour({ onClose, onContact }: ScrollytellingTourProps) {
  const prefersReducedMotion = useReducedMotion();

  const {
    currentIndex,
    verticalY,
    goToSection,
    viewportHeight,
    progress,
  } = useTourSnap({
    onClose,
    onComplete: onClose,
  });

  // Lock body scroll when tour is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleContact = () => {
    onClose();
    onContact?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--background)',
        overflow: 'hidden',
      }}
    >
      {/* Backdrop with subtle gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, ${SECTION_COLORS[currentIndex]}08 0%, transparent 60%),
            var(--background)
          `,
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 10001,
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'var(--glass-05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--text-08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-60)',
          transition: 'all 0.2s ease',
        }}
      >
        <X size={20} />
      </motion.button>

      {/* Progress indicator (desktop only) */}
      <div
        style={{
          display: 'none',
        }}
        className="tour-progress-desktop"
      >
        <TourProgress
          currentIndex={currentIndex}
          progress={progress}
          onGoToSection={goToSection}
        />
      </div>

      {/* Show progress on larger screens */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .tour-progress-desktop {
            display: block !important;
          }
        }
      `}</style>

      {/* Sections container */}
      <motion.div
        style={{
          y: verticalY,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section 1: Welcome */}
        <TourSection
          accentColor={SECTION_COLORS[0]}
          index={0}
          isActive={currentIndex === 0}
        >
          <WelcomeSection isActive={currentIndex === 0} />
        </TourSection>

        {/* Section 2-4: Milestones */}
        {MILESTONES.map((milestone, index) => (
          <TourSection
            key={milestone.year}
            accentColor={milestone.accentColor}
            index={index + 1}
            isActive={currentIndex === index + 1}
          >
            <MilestoneSection
              milestone={milestone}
              isActive={currentIndex === index + 1}
            />
          </TourSection>
        ))}

        {/* Section 5: Work */}
        <TourSection
          accentColor={SECTION_COLORS[4]}
          index={4}
          isActive={currentIndex === 4}
        >
          <WorkSection isActive={currentIndex === 4} />
        </TourSection>

        {/* Section 6: Connect */}
        <TourSection
          accentColor={SECTION_COLORS[5]}
          index={5}
          isActive={currentIndex === 5}
        >
          <ConnectSection
            isActive={currentIndex === 5}
            onClose={onClose}
            onContact={handleContact}
          />
        </TourSection>
      </motion.div>

      {/* Section indicator dots (mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          display: 'flex',
          gap: '0.5rem',
        }}
        className="tour-dots-mobile"
      >
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.button
            key={index}
            onClick={() => goToSection(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: currentIndex === index ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentIndex === index
                ? SECTION_COLORS[index]
                : 'var(--glass-25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </motion.div>

      {/* Hide mobile dots on desktop */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .tour-dots-mobile {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default ScrollytellingTour;
