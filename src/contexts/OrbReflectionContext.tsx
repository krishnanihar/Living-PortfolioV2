'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface OrbReflectionState {
  dominantColor: string;
  secondaryColor: string;
  intensity: number;
  breathing: number;
  mouseProximity: number;
}

interface OrbReflectionContextType {
  orbState: OrbReflectionState;
  updateOrbState: (state: Partial<OrbReflectionState>) => void;
}

const OrbReflectionContext = createContext<OrbReflectionContextType | undefined>(undefined);

export function OrbReflectionProvider({ children }: { children: React.ReactNode }) {
  const [orbState, setOrbState] = useState<OrbReflectionState>({
    dominantColor: 'rgba(124, 58, 237, 0.3)', // Purple (default)
    secondaryColor: 'rgba(33, 150, 243, 0.25)', // Blue
    intensity: 0.5,
    breathing: 0,
    mouseProximity: 0,
  });

  const animationFrameRef = useRef<number | undefined>(undefined);
  const breathingRef = useRef(0);

  // Breathing animation (synced with ParticleSphere's breathing)
  useEffect(() => {
    const animate = () => {
      breathingRef.current += 0.0002; // Same speed as ParticleSphere
      const breathingValue = Math.sin(breathingRef.current) * 0.5 + 0.5; // 0 to 1

      setOrbState(prev => ({
        ...prev,
        breathing: breathingValue,
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Color cycling animation (simulates orb's color rotation)
  useEffect(() => {
    const colorCycleInterval = setInterval(() => {
      setOrbState(prev => {
        // Cycle through orb colors (Blue → Purple → Cyan → repeat)
        const colors = [
          { dominant: 'rgba(33, 150, 243, 0.3)', secondary: 'rgba(124, 58, 237, 0.25)' },  // Blue/Purple
          { dominant: 'rgba(124, 58, 237, 0.3)', secondary: 'rgba(6, 182, 212, 0.25)' },   // Purple/Cyan
          { dominant: 'rgba(6, 182, 212, 0.3)', secondary: 'rgba(33, 150, 243, 0.25)' },   // Cyan/Blue
        ];

        // Simple index rotation
        const currentIndex = Math.floor(Date.now() / 3000) % colors.length;
        return {
          ...prev,
          ...colors[currentIndex],
        };
      });
    }, 3000); // Cycle every 3 seconds

    return () => clearInterval(colorCycleInterval);
  }, []);

  const updateOrbState = (newState: Partial<OrbReflectionState>) => {
    setOrbState(prev => ({ ...prev, ...newState }));
  };

  return (
    <OrbReflectionContext.Provider value={{ orbState, updateOrbState }}>
      {children}
    </OrbReflectionContext.Provider>
  );
}

export function useOrbReflection() {
  const context = useContext(OrbReflectionContext);
  if (!context) {
    throw new Error('useOrbReflection must be used within OrbReflectionProvider');
  }
  return context;
}
