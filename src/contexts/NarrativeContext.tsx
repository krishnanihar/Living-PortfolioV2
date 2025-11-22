'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ContentType = 'transition' | 'content';

interface NarrativeContextValue {
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
}

const NarrativeContext = createContext<NarrativeContextValue | undefined>(undefined);

export function NarrativeProvider({ children }: { children: ReactNode }) {
  const [contentType, setContentType] = useState<ContentType>('transition');

  return (
    <NarrativeContext.Provider value={{ contentType, setContentType }}>
      {children}
    </NarrativeContext.Provider>
  );
}

export function useNarrativeContext() {
  const context = useContext(NarrativeContext);

  // Provide fallback for pages without NarrativeProvider
  // Default to 'transition' mode (particles always active)
  if (context === undefined) {
    return {
      contentType: 'transition' as ContentType,
      setContentType: () => {}, // No-op when outside provider
    };
  }

  return context;
}
