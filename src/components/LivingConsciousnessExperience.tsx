'use client';

import React, { useState, useEffect } from 'react';
import { FloatingDesignCompanion } from './FloatingDesignCompanion';
import { ProgressiveRevelation } from './ProgressiveRevelation';

interface LivingConsciousnessExperienceProps {
  pastHero?: boolean;
  showExperience?: boolean;
  selectedIntent?: string | null;
}

export function LivingConsciousnessExperience({
  pastHero = false,
  showExperience = false,
  selectedIntent = null
}: LivingConsciousnessExperienceProps) {
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [unlockedContent, setUnlockedContent] = useState<string[]>([]);
  const [companionMessage, setCompanionMessage] = useState<string | null>(null);

  // Track current page section for contextual awareness
  useEffect(() => {
    const detectCurrentContent = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroThreshold = windowHeight * 0.8;

      if (scrollY < heroThreshold) {
        setCurrentContent('hero');
      } else {
        // Detect work section or other content areas
        const workElements = document.querySelectorAll('[data-project]');
        let foundWorkSection = false;

        workElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setCurrentContent('work');
            foundWorkSection = true;
          }
        });

        if (!foundWorkSection) {
          setCurrentContent('other');
        }
      }
    };

    window.addEventListener('scroll', detectCurrentContent);
    detectCurrentContent(); // Initial detection

    return () => window.removeEventListener('scroll', detectCurrentContent);
  }, []);


  const handleCompanionReveal = (content: string) => {
    // Handle when the companion wants to reveal something
    setCompanionMessage(content);

    // Trigger progressive revelation based on context
    if (currentContent === 'work' && selectedIntent) {
      // This will be handled by the ProgressiveRevelation component
    }
  };

  const handleContentUnlock = (contentId: string) => {
    setUnlockedContent(prev => [...prev, contentId]);

    // Update companion to acknowledge the unlock
    setCompanionMessage("New content unlocked! Check the indicators to explore deeper.");

    // Clear the message after a few seconds
    setTimeout(() => setCompanionMessage(null), 4000);
  };

  return (
    <>

      {/* Floating Design Companion - ONLY appears after scroll past hero */}
      {selectedIntent && showExperience && pastHero && (
        <FloatingDesignCompanion
          selectedIntent={selectedIntent}
          onReveal={handleCompanionReveal}
        />
      )}

      {/* Progressive Revelation System - ONLY active after scroll past hero */}
      {selectedIntent && showExperience && pastHero && (
        <ProgressiveRevelation
          selectedIntent={selectedIntent}
          currentContent={currentContent}
          onContentUnlock={handleContentUnlock}
        />
      )}

      {/* Master Debug Console */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.95)',
          color: '#00ff00',
          padding: '1.25rem',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          zIndex: 99999,
          border: '2px solid #333',
          minWidth: '380px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        }}>
          <div style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#ffffff', textAlign: 'center' }}>
            🧠 CONSCIOUSNESS DEBUG CONSOLE
          </div>
          <div style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: '#cccccc', marginBottom: '0.25rem' }}>ACTIVATION STATUS:</div>
            <div>Selected Intent: <span style={{ color: selectedIntent ? '#00ff00' : '#ff6666', fontWeight: 'bold' }}>{selectedIntent || 'NONE'}</span></div>
            <div>Show Experience: <span style={{ color: showExperience ? '#00ff00' : '#ff6666', fontWeight: 'bold' }}>{showExperience ? 'TRUE' : 'FALSE'}</span></div>
            <div>Past Hero: <span style={{ color: pastHero ? '#00ff00' : '#ff6666', fontWeight: 'bold' }}>{pastHero ? 'TRUE' : 'FALSE'}</span></div>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#cccccc', marginBottom: '0.25rem' }}>CONTEXT:</div>
            <div>Current Content: <span style={{ color: '#ffff00' }}>{currentContent || 'NONE'}</span></div>
            <div>Unlocked Content: <span style={{ color: '#00ffff' }}>{unlockedContent.length}</span></div>
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#cccccc' }}>
            Conditions for activation:
          </div>
          <div style={{ fontSize: '0.7rem', color: selectedIntent ? '#00ff00' : '#ff6666' }}>
            ✓ Intent Selected: {selectedIntent ? 'YES' : 'MISSING'}
          </div>
          <div style={{ fontSize: '0.7rem', color: showExperience ? '#00ff00' : '#ff6666' }}>
            ✓ Experience Enabled: {showExperience ? 'YES' : 'MISSING'}
          </div>
          <div style={{ fontSize: '0.7rem', color: pastHero ? '#00ff00' : '#ff6666' }}>
            ✓ Scrolled Past Hero: {pastHero ? 'YES' : 'MISSING'}
          </div>
          <div style={{
            marginTop: '0.75rem',
            padding: '0.75rem',
            borderRadius: '8px',
            background: selectedIntent && showExperience && pastHero ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
            border: selectedIntent && showExperience && pastHero ? '1px solid #00ff00' : '1px solid #ff6666',
            textAlign: 'center'
          }}>
            {selectedIntent && showExperience && pastHero ? (
              <div>
                <div style={{ color: '#00ff00', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  🎉 CONSCIOUSNESS ACTIVE!
                </div>
                <div style={{ fontSize: '0.7rem', color: '#cccccc' }}>
                  Look for the blue orb companion and progressive revelation system
                </div>
              </div>
            ) : (
              <div>
                <div style={{ color: '#ff6666', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  ⚠️ WAITING FOR ACTIVATION
                </div>
                <div style={{ fontSize: '0.7rem', color: '#cccccc' }}>
                  {!selectedIntent && '1. Select an intent in the hero section'}
                  {selectedIntent && !showExperience && '2. Experience should auto-enable'}
                  {selectedIntent && showExperience && !pastHero && '3. Scroll down past 80% of screen height'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}