'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';

// Dynamically import 3D scene to avoid SSR issues with Three.js
const SpatialJourneyScene = dynamic(
  () => import('@/components/journey/SpatialJourneyScene'),
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
          color: 'var(--text-50)',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '14px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid var(--glass-20)',
              borderTopColor: 'var(--text-50)',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 1s linear infinite',
            }}
          />
          Loading journey...
        </div>
      </div>
    ),
  }
);

// Dynamically import mobile fallback
const JourneyMobileFallback = dynamic(
  () => import('@/components/journey/JourneyMobileFallback'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function JourneyPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      // Check for mobile device or small screen
      const mobile =
        window.innerWidth < 768 ||
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        ('ontouchstart' in window && window.innerWidth < 1024);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show loading state while detecting device
  if (isMobile === null) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0A0A0A',
        }}
      />
    );
  }

  return (
    <>
      <PortfolioNavigation />
      {isMobile ? <JourneyMobileFallback /> : <SpatialJourneyScene />}

      {/* Global styles for loading spinner */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
