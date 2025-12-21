'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';
import { FloatingChatButton } from '@/components/FloatingChatButton';
import { Chatbot } from '@/components/Chatbot';
import ConceptHero from './ConceptHero';
import ConceptStatement from './ConceptStatement';
import ConceptWorkStack from './ConceptWorkStack';
import ConceptFooter from './ConceptFooter';

// Dynamic import for HeroParticleSystem (no SSR - uses Three.js)
const HeroParticleSystem = dynamic(
  () => import('@/components/effects/HeroParticleSystem'),
  { ssr: false }
);

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConceptPage() {
  const { progress, lenis } = useLenisScroll();
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const isResetting = useRef(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Refresh ScrollTrigger after all content is loaded
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      // Clean up all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Fade transition for infinite scroll loop
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      if (isResetting.current) return;

      // Use Lenis's own scroll/limit for accurate progress
      const scrollProgress = limit > 0 ? scroll / limit : 0;

      // Start fading when 97% scrolled (very end of page)
      if (scrollProgress > 0.97 && !hasTriggered.current) {
        // Calculate fade opacity (0.97 -> 1.0 maps to 0 -> 1)
        const fadeProgress = (scrollProgress - 0.97) / 0.03;
        setFadeOpacity(Math.min(fadeProgress, 1));

        // When fade is at 70%+, trigger reset
        if (fadeProgress >= 0.7) {
          hasTriggered.current = true;
          isResetting.current = true;

          // Ensure full black before reset
          setFadeOpacity(1);

          // Small delay to ensure fade is visible, then reset
          setTimeout(() => {
            // Use window.scrollTo as backup
            window.scrollTo(0, 0);
            lenis.scrollTo(0, { immediate: true });

            // Fade out after reset
            setTimeout(() => {
              setFadeOpacity(0);
              isResetting.current = false;

              // Allow re-trigger after cooldown
              setTimeout(() => {
                hasTriggered.current = false;
              }, 1500);
            }, 150);
          }, 50);
        }
      } else if (scrollProgress < 0.95) {
        // Reset fade when scrolled back up
        setFadeOpacity(0);
        hasTriggered.current = false;
      }
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Particle background - fixed, full viewport */}
      <HeroParticleSystem
        starOpacity={0.35}
        scrollProgress={progress}
      />

      {/* Navigation - fixed */}
      <PortfolioNavigation />

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero - Shrinks on scroll with glassmorphism */}
        <ConceptHero scrollProgress={progress} />

        {/* Statement - Glassmorphic container */}
        <ConceptStatement />

        {/* Work Cards - 3D cards that pin on scroll */}
        <ConceptWorkStack />

        {/* Footer */}
        <ConceptFooter />
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => setFloatingChatOpen(true)} />

      {/* Floating Chatbot Modal */}
      {floatingChatOpen && (
        <Chatbot
          isOpen={floatingChatOpen}
          onClose={() => setFloatingChatOpen(false)}
          intentContext="collaboration"
        />
      )}

      {/* Fade Transition Overlay - for seamless infinite scroll loop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0A0A0A',
          opacity: fadeOpacity,
          pointerEvents: fadeOpacity > 0 ? 'auto' : 'none',
          transition: fadeOpacity === 0 ? 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          zIndex: 9999,
        }}
      />
    </div>
  );
}
