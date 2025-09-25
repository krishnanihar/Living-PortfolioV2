'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/utils';

interface CursorProps {
  className?: string;
}

type CursorState = 'default' | 'hover' | 'click' | 'drag' | 'text' | 'link' | 'button';

interface CursorEvent extends Event {
  detail: {
    state: CursorState;
    text?: string;
    size?: 'sm' | 'md' | 'lg';
  };
}

export function CustomCursor({ className = '' }: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorSize, setCursorSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for cursor following
  const springX = useSpring(mouseX, {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  });
  const springY = useSpring(mouseY, {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  });

  // Trail effect
  const trailX = useSpring(mouseX, {
    stiffness: 150,
    damping: 25,
    mass: 1,
  });
  const trailY = useSpring(mouseY, {
    stiffness: 150,
    damping: 25,
    mass: 1,
  });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target?.closest('button, a, input, textarea, [role="button"], [data-cursor]');

      setIsPointer(!!isInteractive);

      // Auto-detect cursor states based on element
      if (target?.closest('button, [role="button"]')) {
        setCursorState('button');
      } else if (target?.closest('a')) {
        setCursorState('link');
      } else if (target?.closest('input, textarea')) {
        setCursorState('text');
      } else if (cursorState !== 'default') {
        setCursorState('default');
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleCustomCursor = (e: Event) => {
      const event = e as CursorEvent;
      setCursorState(event.detail.state);
      setCursorText(event.detail.text || '');
      setCursorSize(event.detail.size || 'md');
    };

    // Mouse event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Custom cursor events
    document.addEventListener('cursor-change', handleCustomCursor);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('cursor-change', handleCustomCursor);
    };
  }, [mouseX, mouseY, cursorState]);

  // Hide default cursor when custom cursor is active
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;

    if (isVisible) {
      document.head.appendChild(style);
    }

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [isVisible]);

  if (prefersReducedMotion() || !isVisible) return null;

  const getSizeClasses = () => {
    switch (cursorSize) {
      case 'sm':
        return 'w-6 h-6';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  };

  const getStateStyles = () => {
    switch (cursorState) {
      case 'hover':
      case 'button':
        return {
          scale: 1.5,
          backgroundColor: 'rgba(218, 14, 41, 0.2)',
          border: '2px solid rgba(218, 14, 41, 0.6)',
        };
      case 'link':
        return {
          scale: 1.2,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          border: '2px solid rgba(59, 130, 246, 0.6)',
        };
      case 'click':
        return {
          scale: 0.8,
          backgroundColor: 'rgba(218, 14, 41, 0.4)',
          border: '2px solid rgba(218, 14, 41, 0.8)',
        };
      case 'drag':
        return {
          scale: 1.3,
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          border: '2px solid rgba(251, 191, 36, 0.6)',
        };
      case 'text':
        return {
          scaleX: 0.3,
          scaleY: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
        };
      default:
        return {
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        };
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 rounded-full mix-blend-difference backdrop-blur-sm ${getSizeClasses()}`}
        animate={getStateStyles()}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Inner dot */}
        <motion.div
          className="absolute inset-2 rounded-full bg-white/80"
          animate={{
            scale: cursorState === 'click' ? 1.5 : 1,
            opacity: cursorState === 'text' ? 0 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 30,
          }}
        />

        {/* Cursor text */}
        <AnimatePresence>
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-sm rounded-md whitespace-nowrap"
            >
              {cursorText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white/20 backdrop-blur-sm"
        animate={{
          scale: isPointer ? 2 : 1,
          opacity: isPointer ? 0.6 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
      />

      {/* Cursor particles */}
      {cursorState === 'hover' && (
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed top-0 left-0"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Custom hook for cursor interactions
export function useCursor() {
  const setCursor = (
    state: CursorState,
    options?: {
      text?: string;
      size?: 'sm' | 'md' | 'lg';
    }
  ) => {
    if (prefersReducedMotion()) return;

    const event = new CustomEvent('cursor-change', {
      detail: {
        state,
        text: options?.text,
        size: options?.size,
      },
    });
    document.dispatchEvent(event);
  };

  return { setCursor };
}