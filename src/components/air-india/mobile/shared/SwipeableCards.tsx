'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface SwipeableCardsProps {
  children: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  swipeThreshold?: number;
  showHint?: boolean;
  hintText?: string;
}

/**
 * SwipeableCards - Horizontal swipe container for mobile carousels
 * Enables swipe gestures to navigate between views
 */
export function SwipeableCards({
  children,
  currentIndex,
  onIndexChange,
  swipeThreshold = 50,
  showHint = true,
  hintText = 'Swipe to navigate',
}: SwipeableCardsProps) {
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const { offset, velocity } = info;

      // Determine swipe direction based on offset and velocity
      if (offset.x < -swipeThreshold || velocity.x < -500) {
        // Swiped left - go to next
        if (currentIndex < children.length - 1) {
          setDirection(1);
          onIndexChange(currentIndex + 1);
        }
      } else if (offset.x > swipeThreshold || velocity.x > 500) {
        // Swiped right - go to previous
        if (currentIndex > 0) {
          setDirection(-1);
          onIndexChange(currentIndex - 1);
        }
      }
    },
    [currentIndex, children.length, onIndexChange, swipeThreshold]
  );

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{
            width: '100%',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {showHint && children.length > 1 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--text-40)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px' }}>←</span>
          <span>{hintText}</span>
          <span style={{ fontSize: '16px' }}>→</span>
        </motion.div>
      )}
    </div>
  );
}

export default SwipeableCards;
