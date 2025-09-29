'use client';

import React, { useState, useEffect } from 'react';
import { ConversationStarter } from './ConversationStarter';
import { FloatingDesignCompanion } from './FloatingDesignCompanion';
import { ProgressiveRevelation } from './ProgressiveRevelation';

interface LivingConsciousnessExperienceProps {
  pastHero?: boolean;
  showExperience?: boolean;
}

export function LivingConsciousnessExperience({
  pastHero = false,
  showExperience = false
}: LivingConsciousnessExperienceProps) {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
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

  const handleIntentSelect = (intentId: string) => {
    setSelectedIntent(intentId);

    // Update companion state when intent is selected
    const intentMessages = {
      hiring: "Great choice! I'll show you my professional impact and leadership experience.",
      inspiration: "Perfect! Let me reveal the creative process behind these living interfaces.",
      learning: "Excellent! I'll guide you through the methodology and thinking behind each design.",
      collaboration: "Wonderful! I'll share insights about working together and open projects."
    };

    setCompanionMessage(intentMessages[intentId as keyof typeof intentMessages] || null);
  };

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
      {/* Hero Section with Conversation Starter */}
      {!pastHero && (
        <div style={{
          position: 'relative',
          zIndex: 1,
        }}>
          <ConversationStarter onIntentSelect={handleIntentSelect} />
        </div>
      )}

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

      {/* Experience State Indicator (for debugging/monitoring) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          zIndex: 10000,
          maxWidth: '200px',
        }}>
          <div>Intent: {selectedIntent || 'none'}</div>
          <div>Content: {currentContent || 'none'}</div>
          <div>Past Hero: {pastHero ? 'yes' : 'no'}</div>
          <div>Show Experience: {showExperience ? 'yes' : 'no'}</div>
          <div>Unlocked: {unlockedContent.length}</div>
        </div>
      )}
    </>
  );
}