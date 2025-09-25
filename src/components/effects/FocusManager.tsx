'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/utils';

interface FocusManagerProps {
  className?: string;
}

interface FocusRing {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
}

export function FocusManager({ className = '' }: FocusManagerProps) {
  const [focusRing, setFocusRing] = useState<FocusRing | null>(null);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    let isUsingKeyboard = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab, arrow keys, enter, space indicate keyboard navigation
      if (['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        isUsingKeyboard = true;
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      isUsingKeyboard = false;
      setIsKeyboardUser(false);

      // Clear focus ring after mouse interaction
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFocusRing(null);
      }, 100);
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (!isUsingKeyboard || prefersReducedMotion()) return;

      const target = e.target as HTMLElement;
      if (!target || target === document.body) return;

      // Skip focus ring for certain elements
      if (target.hasAttribute('data-no-focus-ring') || target.closest('[data-no-focus-ring]')) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const computedStyle = getComputedStyle(target);

      // Calculate border radius
      const borderRadius = Math.max(
        parseInt(computedStyle.borderTopLeftRadius) || 0,
        parseInt(computedStyle.borderTopRightRadius) || 0,
        parseInt(computedStyle.borderBottomLeftRadius) || 0,
        parseInt(computedStyle.borderBottomRightRadius) || 0
      );

      const newFocusRing: FocusRing = {
        id: `focus-${Date.now()}`,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        borderRadius: borderRadius + 2, // Add 2px for better visual separation
      };

      setFocusRing(newFocusRing);
      lastFocusedRef.current = target;
    };

    const handleFocusOut = () => {
      if (!isUsingKeyboard) return;

      // Delay hiding the focus ring to prevent flickering
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFocusRing(null);
        lastFocusedRef.current = null;
      }, 150);
    };

    const handleResize = () => {
      if (!lastFocusedRef.current || !focusRing) return;

      const target = lastFocusedRef.current;
      const rect = target.getBoundingClientRect();
      const computedStyle = getComputedStyle(target);

      const borderRadius = Math.max(
        parseInt(computedStyle.borderTopLeftRadius) || 0,
        parseInt(computedStyle.borderTopRightRadius) || 0,
        parseInt(computedStyle.borderBottomLeftRadius) || 0,
        parseInt(computedStyle.borderBottomRightRadius) || 0
      );

      setFocusRing(prev => prev ? {
        ...prev,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        borderRadius: borderRadius + 2,
      } : null);
    };

    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [focusRing]);

  if (prefersReducedMotion() || !isKeyboardUser) {
    return null;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9998] ${className}`}>
      <AnimatePresence>
        {focusRing && (
          <motion.div
            key={focusRing.id}
            initial={{
              opacity: 0,
              scale: 0.95,
              x: focusRing.x - 4,
              y: focusRing.y - 4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: focusRing.x - 4,
              y: focusRing.y - 4,
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.2,
            }}
            className="absolute"
            style={{
              width: focusRing.width + 8,
              height: focusRing.height + 8,
              borderRadius: focusRing.borderRadius,
            }}
          >
            {/* Main focus ring */}
            <div
              className="absolute inset-0 border-2 border-[#DA0E29] animate-pulse"
              style={{
                borderRadius: focusRing.borderRadius,
                boxShadow: `
                  0 0 0 2px rgba(218, 14, 41, 0.3),
                  0 0 20px rgba(218, 14, 41, 0.2),
                  inset 0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
              }}
            />

            {/* Animated glow */}
            <motion.div
              className="absolute inset-0"
              style={{
                borderRadius: focusRing.borderRadius,
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(218, 14, 41, 0.4)',
                  '0 0 30px rgba(218, 14, 41, 0.6)',
                  '0 0 20px rgba(218, 14, 41, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Corner indicators */}
            {[
              { top: -2, left: -2 },
              { top: -2, right: -2 },
              { bottom: -2, left: -2 },
              { bottom: -2, right: -2 },
            ].map((position, index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-[#DA0E29] rounded-full"
                style={position}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Flowing border animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                borderRadius: focusRing.borderRadius,
                background: `
                  linear-gradient(90deg,
                    transparent,
                    rgba(218, 14, 41, 0.4),
                    transparent
                  )
                `,
                maskImage: `
                  linear-gradient(90deg,
                    transparent,
                    black,
                    transparent
                  )
                `,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced focus utilities
export const focusStyles = {
  // Remove default focus styles and add custom ones
  base: `
    focus:outline-none
    focus-visible:outline-none
    focus-visible:ring-0
  `,

  // For elements that should show custom focus ring
  custom: `
    focus:outline-none
    focus-visible:outline-none
    focus-visible:ring-0
    data-[focused]:ring-2
    data-[focused]:ring-[#DA0E29]
    data-[focused]:ring-offset-2
    data-[focused]:ring-offset-black
  `,

  // For elements that should not show focus ring
  none: `
    focus:outline-none
    focus-visible:outline-none
    focus-visible:ring-0
    data-no-focus-ring
  `,
};

// Hook for managing focus states
export function useFocusManagement() {
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsKeyboardFocus(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
      setIsKeyboardFocus(true);
    }
  };

  const handleMouseDown = () => {
    setIsKeyboardFocus(false);
  };

  return {
    isFocused,
    isKeyboardFocus,
    focusProps: {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onMouseDown: handleMouseDown,
      'data-focused': isFocused,
      'data-keyboard-focused': isKeyboardFocus,
    },
  };
}