'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Konami Code Easter Egg Hook
 *
 * Listens for the classic Konami Code sequence:
 * ↑ ↑ ↓ ↓ ← → ← → B A
 *
 * When completed, navigates to /work/living-organism
 */

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useKonamiCode(callback?: () => void) {
  const router = useRouter();
  const inputSequence = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Add the key to sequence
      inputSequence.current.push(event.code);

      // Keep only the last N keys (where N is the length of the Konami code)
      if (inputSequence.current.length > KONAMI_CODE.length) {
        inputSequence.current.shift();
      }

      // Reset timeout - if user stops typing for 2 seconds, reset sequence
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        inputSequence.current = [];
      }, 2000);

      // Check if the sequence matches
      const isMatch = inputSequence.current.every(
        (key, index) => key === KONAMI_CODE[index]
      );

      if (isMatch && inputSequence.current.length === KONAMI_CODE.length) {
        // Success! Execute callback or navigate
        inputSequence.current = [];

        if (callback) {
          callback();
        } else {
          // Default: navigate to Living Organism page
          router.push('/work/living-organism');
        }
      }
    },
    [callback, router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyDown]);
}

/**
 * Component version for easy inclusion in layouts
 */
export function KonamiCodeListener() {
  useKonamiCode();
  return null;
}
