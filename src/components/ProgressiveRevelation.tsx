'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, FileText, Eye, Lightbulb, Code, Palette, Users } from 'lucide-react';

interface RevealableContent {
  id: string;
  type: 'process' | 'sketch' | 'video' | 'insight' | 'code' | 'palette' | 'team';
  title: string;
  description: string;
  content: string;
  unlocked: boolean;
  unlockCondition: string;
}

interface ProgressiveRevelationProps {
  selectedIntent?: string | null;
  currentContent?: string | null;
  onContentUnlock?: (contentId: string) => void;
}

export function ProgressiveRevelation({ selectedIntent, currentContent, onContentUnlock }: ProgressiveRevelationProps) {
  const [revealedContent, setRevealedContent] = useState<Set<string>>(new Set());
  const [activeReveal, setActiveReveal] = useState<RevealableContent | null>(null);
  const [userProgress, setUserProgress] = useState({
    timeSpent: 0,
    interactionCount: 0,
    sectionsVisited: new Set<string>(),
    cursorMovement: 0,
  });

  // Define content that can be progressively revealed
  const revealableContents: RevealableContent[] = [
    {
      id: 'air-india-process',
      type: 'process',
      title: 'Air India Design Process',
      description: 'See how I transformed 450+ daily user workflows',
      content: 'Behind-the-scenes look at research, user interviews, and iterative design process that led to 40% efficiency improvement.',
      unlocked: false,
      unlockCondition: 'hiring+work'
    },
    {
      id: 'design-sketches',
      type: 'sketch',
      title: 'Original Design Sketches',
      description: 'Raw ideation and concept exploration',
      content: 'Hand-drawn wireframes and initial concepts showing the creative thinking process.',
      unlocked: false,
      unlockCondition: 'inspiration+work'
    },
    {
      id: 'consciousness-philosophy',
      type: 'insight',
      title: 'Living Interface Philosophy',
      description: 'Why interfaces should have consciousness',
      content: 'Deep dive into the thinking behind consciousness-aware design and adaptive user experiences.',
      unlocked: false,
      unlockCondition: 'learning+hero'
    },
    {
      id: 'design-system-code',
      type: 'code',
      title: 'Design System Architecture',
      description: 'Technical implementation details',
      content: 'Code examples showing how design tokens scale across platforms and maintain consistency.',
      unlocked: false,
      unlockCondition: 'collaboration+work'
    },
    {
      id: 'color-psychology',
      type: 'palette',
      title: 'Color Psychology Research',
      description: 'The science behind the Air India palette',
      content: 'Research on how specific colors affect user behavior and brand perception in aviation contexts.',
      unlocked: false,
      unlockCondition: 'learning+work'
    },
    {
      id: 'team-collaboration',
      type: 'team',
      title: 'Cross-functional Collaboration',
      description: 'How design bridges teams at scale',
      content: 'Stories of working with engineers, product managers, and stakeholders to ship design systems.',
      unlocked: false,
      unlockCondition: 'hiring+work'
    },
    {
      id: 'creative-process-video',
      type: 'video',
      title: 'Creative Process Timelapse',
      description: 'Watch the design come alive',
      content: 'Time-lapse video showing the evolution from concept to final implementation.',
      unlocked: false,
      unlockCondition: 'inspiration+work'
    }
  ];

  // Check unlock conditions based on user behavior
  useEffect(() => {
    const checkUnlockConditions = () => {
      revealableContents.forEach(content => {
        if (revealedContent.has(content.id)) return;

        const [requiredIntent, requiredContent] = content.unlockCondition.split('+');

        if (selectedIntent === requiredIntent && currentContent === requiredContent) {
          // Additional conditions based on user engagement
          const shouldUnlock =
            userProgress.timeSpent > 5000 || // 5 seconds on content
            userProgress.interactionCount > 3 || // 3 interactions
            userProgress.cursorMovement > 1000; // Significant cursor movement

          if (shouldUnlock) {
            setRevealedContent(prev => new Set([...prev, content.id]));
            onContentUnlock?.(content.id);

            // Show unlock notification
            setActiveReveal(content);
            setTimeout(() => setActiveReveal(null), 5000);
          }
        }
      });
    };

    const interval = setInterval(checkUnlockConditions, 1000);
    return () => clearInterval(interval);
  }, [selectedIntent, currentContent, userProgress, revealedContent, onContentUnlock]);

  // Track user engagement
  useEffect(() => {
    let startTime = Date.now();
    let interactionCount = 0;
    let totalMovement = 0;
    let lastMousePos = { x: 0, y: 0 };

    const trackTime = () => {
      setUserProgress(prev => ({
        ...prev,
        timeSpent: Date.now() - startTime
      }));
    };

    const trackInteraction = () => {
      interactionCount++;
      setUserProgress(prev => ({
        ...prev,
        interactionCount
      }));
    };

    const trackMouseMovement = (e: MouseEvent) => {
      const movement = Math.sqrt(
        Math.pow(e.clientX - lastMousePos.x, 2) + Math.pow(e.clientY - lastMousePos.y, 2)
      );
      totalMovement += movement;
      lastMousePos = { x: e.clientX, y: e.clientY };

      setUserProgress(prev => ({
        ...prev,
        cursorMovement: totalMovement
      }));
    };

    const timeInterval = setInterval(trackTime, 1000);
    window.addEventListener('click', trackInteraction);
    window.addEventListener('scroll', trackInteraction);
    window.addEventListener('mousemove', trackMouseMovement);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('scroll', trackInteraction);
      window.removeEventListener('mousemove', trackMouseMovement);
    };
  }, [currentContent]);

  const getContentIcon = (type: RevealableContent['type']) => {
    switch (type) {
      case 'process': return FileText;
      case 'sketch': return Palette;
      case 'video': return Play;
      case 'insight': return Lightbulb;
      case 'code': return Code;
      case 'palette': return Palette;
      case 'team': return Users;
      default: return Eye;
    }
  };

  const getRevealedContents = () => {
    return revealableContents.filter(content => revealedContent.has(content.id));
  };

  return (
    <>
      {/* Unlock Notification */}
      <AnimatePresence>
        {activeReveal && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{
              position: 'fixed',
              top: '20%',
              right: '2rem',
              background: 'var(--surface-primary)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid var(--border-primary)',
              borderRadius: '16px',
              padding: '1.5rem',
              maxWidth: '320px',
              zIndex: 9996,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}>
              <div style={{
                background: 'rgba(218, 14, 41, 0.2)',
                borderRadius: '12px',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {React.createElement(getContentIcon(activeReveal.type), {
                  size: 20,
                  style: { color: 'var(--brand-red)' }
                })}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--brand-red)',
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Unlocked!
                </div>

                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: '1.3',
                }}>
                  {activeReveal.title}
                </h4>

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4',
                  marginBottom: '1rem',
                }}>
                  {activeReveal.description}
                </p>

                <button
                  onClick={() => {/* Handle reveal */}}
                  style={{
                    background: 'rgba(218, 14, 41, 0.15)',
                    border: '1px solid rgba(218, 14, 41, 0.3)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    color: 'var(--brand-red)',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Reveal Content
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveReveal(null)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.25rem',
              }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progressive Content Indicators */}
      {getRevealedContents().length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 9995,
            pointerEvents: 'none',
          }}
        >
          {getRevealedContents().map((content, index) => {
            const IconComponent = getContentIcon(content.type);

            return (
              <motion.button
                key={content.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {/* Handle content reveal */}}
                style={{
                  background: 'var(--surface-secondary)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(218, 14, 41, 0.1)';
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(218, 14, 41, 0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--surface-secondary)';
                  (e.currentTarget as HTMLElement).style.border = '1px solid var(--border-primary)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
                title={content.title}
              >
                <IconComponent size={20} style={{ color: 'var(--text-primary)' }} />
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Progress Indicator */}
      <div style={{
        position: 'fixed',
        top: '50%',
        right: '1rem',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 9994,
        opacity: revealedContent.size > 0 ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}>
        {revealableContents.map((content, index) => (
          <div
            key={content.id}
            style={{
              width: '3px',
              height: '20px',
              borderRadius: '2px',
              background: revealedContent.has(content.id)
                ? 'var(--brand-red)'
                : 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s ease',
            }}
          />
        ))}
      </div>
    </>
  );
}