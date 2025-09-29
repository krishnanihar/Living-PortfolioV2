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

      {/* Enhanced Experience State Indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#00ff00',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          zIndex: 99997,
          border: '1px solid #333',
          minWidth: '320px',
        }}>
          <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#ffffff' }}>
            🧠 Living Consciousness Experience
          </div>
          <div>Selected Intent: <span style={{ color: selectedIntent ? '#00ff00' : '#ff6666' }}>{selectedIntent || 'NONE'}</span></div>
          <div>Show Experience: <span style={{ color: showExperience ? '#00ff00' : '#ff6666' }}>{showExperience ? 'TRUE' : 'FALSE'}</span></div>
          <div>Past Hero: <span style={{ color: pastHero ? '#00ff00' : '#ff6666' }}>{pastHero ? 'TRUE' : 'FALSE'}</span></div>
          <div>Current Content: <span style={{ color: '#ffff00' }}>{currentContent || 'NONE'}</span></div>
          <div>Unlocked Content: <span style={{ color: '#00ffff' }}>{unlockedContent.length}</span></div>
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
          {selectedIntent && showExperience && pastHero && (
            <div style={{ marginTop: '0.5rem', color: '#00ff00', fontWeight: 'bold' }}>
              🎉 CONSCIOUSNESS ACTIVE!
            </div>
          )}
          {(!selectedIntent || !showExperience || !pastHero) && (
            <div style={{ marginTop: '0.5rem', color: '#ff6666', fontWeight: 'bold' }}>
              ⚠️ Waiting for activation...
            </div>
          )}
        </div>
      )}
    </>
  );
}