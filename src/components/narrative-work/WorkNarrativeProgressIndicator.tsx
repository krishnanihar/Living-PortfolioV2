'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkNarrativeProgress } from '@/hooks/useWorkNarrativeProgress';
import { Palette, Briefcase, Lightbulb } from 'lucide-react';

interface WorkNarrativeProgressIndicatorProps {
  showLabels?: boolean;
  position?: 'left' | 'right';
}

/**
 * Visual indicator showing narrative position through work journey
 * Foundation → Industry → Innovation
 */
export function WorkNarrativeProgressIndicator({
  showLabels = true,
  position = 'right',
}: WorkNarrativeProgressIndicatorProps) {
  const narrativeState = useWorkNarrativeProgress();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  // Debounced hover handlers to prevent glitching
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovering(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 150);
  };

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const acts = [
    {
      id: 'industry',
      label: 'Industry',
      description: 'Professional Work',
      icon: Briefcase,
      range: [0, 0.3],
      color: 'rgba(218, 14, 41, 0.8)',
    },
    {
      id: 'innovation',
      label: 'Innovation',
      description: 'Research & Futures',
      icon: Lightbulb,
      range: [0.3, 0.7],
      color: 'rgba(14, 165, 233, 0.8)',
    },
    {
      id: 'foundation',
      label: 'Foundation',
      description: 'College & Exploration',
      icon: Palette,
      range: [0.7, 1],
      color: 'rgba(147, 51, 234, 0.8)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        top: '50%',
        [position]: '2rem',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: position === 'right' ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: '1rem',
        pointerEvents: 'auto',
      }}
      className="hidden md:flex"
    >
      {/* Progress track */}
      <div style={{ position: 'relative' }}>
        {/* Background track */}
        <div
          style={{
            width: '3px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            position: 'relative',
          }}
        >
          {/* Progress fill */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${narrativeState.progress * 100}%`,
              background: `linear-gradient(180deg, ${acts[0].color}, ${acts[1].color}, ${acts[2].color})`,
              borderRadius: '2px',
              boxShadow: `0 0 10px ${narrativeState.color.primary}`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Act markers */}
          {acts.map((act, index) => {
            const isActive = narrativeState.act === act.id;
            const Icon = act.icon;
            const markerPosition = (act.range[0] + act.range[1]) / 2;

            return (
              <motion.div
                key={act.id}
                style={{
                  position: 'absolute',
                  top: `${markerPosition * 100}%`,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isActive ? '16px' : '12px',
                  height: isActive ? '16px' : '12px',
                  borderRadius: '50%',
                  background: isActive ? act.color : 'rgba(255, 255, 255, 0.3)',
                  border: `2px solid ${isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 0 15px ${act.color}` : 'none',
                }}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isActive ? Infinity : 0,
                }}
              >
                {isActive && (
                  <Icon
                    size={8}
                    style={{
                      color: '#ffffff',
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Current position indicator */}
        <motion.div
          style={{
            position: 'absolute',
            top: `${narrativeState.progress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: `0 0 12px ${narrativeState.color.primary}`,
          }}
        />
      </div>

      {/* Labels (expanded state) */}
      <AnimatePresence>
        {isExpanded && showLabels && (
          <motion.div
            initial={{ opacity: 0, x: position === 'right' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === 'right' ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1rem',
              minWidth: '180px',
              pointerEvents: 'auto',
            }}
          >
            {acts.map((act) => {
              const isActive = narrativeState.act === act.id;
              const Icon = act.icon;

              return (
                <div
                  key={act.id}
                  style={{
                    marginBottom: '0.75rem',
                    opacity: isActive ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <Icon
                      size={14}
                      style={{
                        color: isActive ? act.color : 'rgba(255, 255, 255, 0.5)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: isActive ? act.color : 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {act.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.6875rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontStyle: 'italic',
                      marginLeft: '1.25rem',
                    }}
                  >
                    {act.description}
                  </p>
                </div>
              );
            })}

            {/* Progress percentage */}
            <div
              style={{
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '200',
                  color: narrativeState.color.primary,
                }}
              >
                {Math.round(narrativeState.progress * 100)}%
              </span>
              <div
                style={{
                  fontSize: '0.625rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Journey Progress
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Minimal version for mobile - top progress bar
 */
export function WorkNarrativeProgressBar() {
  const narrativeState = useWorkNarrativeProgress();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: 100,
      }}
      className="md:hidden"
    >
      <motion.div
        style={{
          height: '100%',
          background: `linear-gradient(90deg, rgba(147, 51, 234, 0.8), rgba(218, 14, 41, 0.8), rgba(14, 165, 233, 0.8))`,
          width: `${narrativeState.progress * 100}%`,
          boxShadow: `0 0 10px ${narrativeState.color.primary}`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
