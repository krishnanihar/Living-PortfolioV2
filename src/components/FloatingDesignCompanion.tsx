'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Brain, Eye, Sparkles, Heart, MessageCircle, Lightbulb, Play } from 'lucide-react';

interface FloatingDesignCompanionProps {
  selectedIntent?: string | null;
  onReveal?: (content: string) => void;
}

export function FloatingDesignCompanion({ selectedIntent, onReveal }: FloatingDesignCompanionProps) {
  const [mounted, setMounted] = useState(false);
  const [currentState, setCurrentState] = useState<'idle' | 'attentive' | 'speaking'>('idle');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [companionPosition, setCompanionPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [contextualMessage, setContextualMessage] = useState<string | null>(null);
  const [nearbyContent, setNearbyContent] = useState<string | null>(null);

  const companionRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse movement for contextual awareness
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      setMousePosition({ x, y });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Update companion position with slight delay and offset
      setTimeout(() => {
        setCompanionPosition({
          x: Math.max(5, Math.min(95, x + (Math.random() - 0.5) * 10)),
          y: Math.max(5, Math.min(95, y + (Math.random() - 0.5) * 10))
        });
      }, 800);

      // Detect nearby content for contextual messages
      const target = e.target as HTMLElement;
      const section = target.closest('section');
      const isWorkSection = section?.querySelector('[data-project]');
      const isHeroSection = section?.style.height === '100vh';

      if (isWorkSection) {
        setNearbyContent('work');
        setCurrentState('attentive');
      } else if (isHeroSection) {
        setNearbyContent('hero');
        setCurrentState('idle');
      } else {
        setNearbyContent(null);
        setCurrentState('idle');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, mouseX, mouseY]);

  // Generate contextual messages based on intent and content
  useEffect(() => {
    if (!selectedIntent || !nearbyContent) {
      setContextualMessage(null);
      return;
    }

    const messages = {
      hiring: {
        work: "These projects show my technical leadership at scale",
        hero: "Ready to discuss team collaboration and design systems?"
      },
      inspiration: {
        work: "Each project here pushed creative boundaries",
        hero: "Want to see the creative process behind these interfaces?"
      },
      learning: {
        work: "Click any project to see the design thinking process",
        hero: "I'll guide you through the methodology behind each design"
      },
      collaboration: {
        work: "These are open for iteration and collaboration",
        hero: "Interested in building something together?"
      }
    };

    const intentMessages = messages[selectedIntent as keyof typeof messages];
    if (intentMessages) {
      setContextualMessage(intentMessages[nearbyContent as keyof typeof intentMessages] || null);
      setCurrentState('speaking');

      // Return to attentive state after message
      setTimeout(() => setCurrentState('attentive'), 3000);
    }
  }, [selectedIntent, nearbyContent]);

  const getPersonalityIcon = () => {
    switch (selectedIntent) {
      case 'hiring': return Brain;
      case 'inspiration': return Sparkles;
      case 'learning': return Eye;
      case 'collaboration': return Heart;
      default: return MessageCircle;
    }
  };

  const getStateColor = () => {
    switch (currentState) {
      case 'speaking': return 'rgba(218, 14, 41, 0.8)';
      case 'attentive': return 'rgba(16, 185, 129, 0.7)';
      default: return 'rgba(59, 130, 246, 0.6)';
    }
  };

  const handleCompanionClick = () => {
    if (nearbyContent === 'work') {
      onReveal?.('Show me the design process behind this project');
    } else {
      onReveal?.('Tell me more about your design philosophy');
    }
  };

  if (!mounted) return null;

  const PersonalityIcon = getPersonalityIcon();

  return (
    <>
      {/* Floating Companion Orb */}
      <motion.div
        ref={companionRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: companionPosition.x + '%',
          y: companionPosition.y + '%'
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          zIndex: 9997,
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCompanionClick}
      >
        {/* Main orb */}
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered
              ? `0 0 40px ${getStateColor()}, 0 0 80px ${getStateColor().replace('0.', '0.2')}`
              : `0 0 20px ${getStateColor()}`
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${getStateColor()} 0%, transparent 70%)`,
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: `2px solid ${getStateColor()}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Breathing animation */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: currentState === 'speaking' ? 1 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: `1px solid ${getStateColor()}`,
              opacity: 0.3,
            }}
          />

          {/* Icon */}
          <PersonalityIcon
            size={20}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            }}
          />

          {/* State indicator */}
          <motion.div
            animate={{
              opacity: currentState === 'speaking' ? [1, 0.3, 1] : 1,
              scale: currentState === 'speaking' ? [1, 0.8, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: currentState === 'speaking' ? Infinity : 0,
            }}
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getStateColor(),
              border: '1px solid var(--bg-primary)',
            }}
          />
        </motion.div>

        {/* Contextual message bubble */}
        <AnimatePresence>
          {contextualMessage && isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '12px',
                padding: '12px 16px',
                background: 'var(--surface-primary)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--border-primary)',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '400',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              {contextualMessage}

              {/* Speech bubble tail */}
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid var(--border-primary)`,
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progressive revelation hints */}
        {nearbyContent === 'work' && (
          <motion.div
            animate={{
              rotate: 360,
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              opacity: { duration: 2, repeat: Infinity },
            }}
            style={{
              position: 'absolute',
              top: -8,
              left: -8,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(251, 191, 36, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play size={6} style={{ color: 'white' }} />
          </motion.div>
        )}
      </motion.div>

      {/* Trail effect */}
      <motion.div
        style={{
          position: 'fixed',
          x: springX,
          y: springY,
          transform: 'translate(-50%, -50%)',
          zIndex: 9996,
          pointerEvents: 'none',
        }}
        animate={{
          opacity: 0.3,
          scale: 1,
        }}
      >
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${getStateColor()} 0%, transparent 70%)`,
          opacity: 0.5,
        }} />
      </motion.div>
    </>
  );
}