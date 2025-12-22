'use client';

import { useRef, useEffect } from 'react';

/**
 * Hook to track the previous value of a variable
 * Used by FrozenRouter to detect route segment changes
 */
export function usePreviousValue<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
