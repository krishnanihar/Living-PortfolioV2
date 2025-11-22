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
  if (context === undefined) {
    throw new Error('useNarrativeContext must be used within a NarrativeProvider');
  }
  return context;
}
