'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive Ghost Overlay Demo
 * Simulates the photo tracking feature with adjustable opacity
 */
export function GhostOverlayDemo() {
  const [opacity, setOpacity] = useState(50);
  const [isAligned, setIsAligned] = useState(false);

  return (
    <div style={{
      padding: '3rem 2rem',
      borderRadius: '24px',
      backgroundColor: 'rgba(74, 144, 226, 0.05)',
      border: '1px solid rgba(74, 144, 226, 0.2)'
    }}>
      <h4 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'rgb(74, 144, 226)',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Try the Ghost Overlay
      </h4>

      {/* Simulated Phone Screen */}
      <div style={{
        width: '300px',
        height: '400px',
        margin: '0 auto 2rem',
        borderRadius: '32px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '8px solid rgba(50, 50, 50, 0.9)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Previous Photo (Ghost) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(236, 72, 153, 0.3))',
          opacity: opacity / 100,
          transition: 'opacity 0.3s ease'
        }}>
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '30%',
            width: '120px',
            height: '80px',
            borderRadius: '40% 60% 50% 50%',
            backgroundColor: 'rgba(255, 200, 200, 0.6)',
            filter: 'blur(4px)'
          }} />
        </div>

        {/* Current View */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div
            animate={{
              scale: isAligned ? [1, 1.05, 1] : 1
            }}
            transition={{ duration: 0.5 }}
            style={{
              width: '120px',
              height: '80px',
              borderRadius: '40% 60% 50% 50%',
              backgroundColor: 'rgba(255, 180, 180, 0.8)',
              filter: 'blur(2px)'
            }}
          />
        </div>

        {/* 3x3 Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: '1px'
        }}>
          {[...Array(9)].map((_, i) => (
            <div key={i} style={{
              border: '1px dashed rgba(74, 144, 226, 0.3)'
            }} />
          ))}
        </div>

        {/* Alignment Check */}
        {isAligned && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              backgroundColor: 'rgba(80, 200, 120, 0.9)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            ✓ Aligned
          </motion.div>
        )}
      </div>

      {/* Opacity Slider */}
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <span>Ghost Opacity</span>
          <span>{opacity}%</span>
        </div>
        <input
          type="range"
          min="20"
          max="80"
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'rgb(74, 144, 226)'
          }}
        />
      </div>

      {/* Capture Button */}
      <button
        onClick={() => {
          setIsAligned(true);
          setTimeout(() => setIsAligned(false), 2000);
        }}
        style={{
          display: 'block',
          margin: '2rem auto 0',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          backgroundColor: 'rgb(74, 144, 226)',
          color: 'white',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = 'rgb(94, 164, 246)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'rgb(74, 144, 226)';
        }}
      >
        Capture Photo
      </button>
    </div>
  );
}

/**
 * Interactive Smart Reminder Demo
 * Simulates personalized reminders based on patterns
 */
export function SmartReminderDemo() {
  const [selectedTime, setSelectedTime] = useState<'morning' | 'evening' | 'night'>('evening');
  const [showNotification, setShowNotification] = useState(false);

  const patterns = {
    morning: {
      time: '8:30 AM',
      reason: 'You typically apply treatment after your morning shower',
      confidence: 94
    },
    evening: {
      time: '9:45 PM',
      reason: 'Highest adherence rate window based on 30-day history',
      confidence: 87
    },
    night: {
      time: '11:00 PM',
      reason: 'Before bed routine, when you\'re most consistent',
      confidence: 92
    }
  };

  return (
    <div style={{
      padding: '3rem 2rem',
      borderRadius: '24px',
      backgroundColor: 'rgba(168, 85, 247, 0.05)',
      border: '1px solid rgba(168, 85, 247, 0.2)'
    }}>
      <h4 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'rgb(168, 85, 247)',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Smart Reminder Timing
      </h4>

      {/* Time Selection */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        {(['morning', 'evening', 'night'] as const).map((time) => (
          <button
            key={time}
            onClick={() => {
              setSelectedTime(time);
              setShowNotification(false);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              backgroundColor: selectedTime === time ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${selectedTime === time ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.1)'}`,
              color: selectedTime === time ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.6)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize'
            }}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Pattern Insight Card */}
      <motion.div
        key={selectedTime}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: '2rem',
          borderRadius: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          marginBottom: '2rem'
        }}
      >
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'rgb(168, 85, 247)',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {patterns[selectedTime].time}
        </div>
        <div style={{
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: '1.6',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {patterns[selectedTime].reason}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          color: 'rgba(80, 200, 120, 0.9)',
          fontWeight: '600'
        }}>
          <span>Confidence:</span>
          <span>{patterns[selectedTime].confidence}%</span>
          <div style={{
            width: '100px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${patterns[selectedTime].confidence}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                height: '100%',
                backgroundColor: 'rgb(80, 200, 120)',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Send Notification Button */}
      <button
        onClick={() => {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }}
        style={{
          display: 'block',
          margin: '0 auto',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          backgroundColor: 'rgb(168, 85, 247)',
          color: 'white',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = 'rgb(188, 105, 255)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'rgb(168, 85, 247)';
        }}
      >
        Preview Notification
      </button>

      {/* Notification Preview */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            border: '2px solid rgb(168, 85, 247)',
            boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
          }}
        >
          <div style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '0.5rem'
          }}>
            Time for your treatment! 💊
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.5'
          }}>
            {patterns[selectedTime].reason}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Interactive PASI Scoring Comparison
 * Shows AI vs manual scoring accuracy
 */
export function PASIScoringDemo() {
  const [hoveredMethod, setHoveredMethod] = useState<'manual' | 'ai' | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div style={{
      padding: '3rem 2rem',
      borderRadius: '24px',
      backgroundColor: 'rgba(80, 200, 120, 0.05)',
      border: '1px solid rgba(80, 200, 120, 0.2)'
    }}>
      <h4 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'rgb(80, 200, 120)',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        AI vs Manual PASI Scoring
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Manual Scoring */}
        <motion.div
          onHoverStart={() => setHoveredMethod('manual')}
          onHoverEnd={() => setHoveredMethod(null)}
          whileHover={{ scale: 1.05 }}
          style={{
            padding: '2rem',
            borderRadius: '20px',
            backgroundColor: hoveredMethod === 'manual' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255, 255, 255, 0.03)',
            border: `2px solid ${hoveredMethod === 'manual' ? 'rgb(251, 191, 36)' : 'rgba(255, 255, 255, 0.1)'}`,
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
        >
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'rgb(251, 191, 36)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Manual
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'rgb(251, 191, 36)',
            marginBottom: '0.5rem'
          }}>
            5-7 min
          </div>
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            Average time per assessment
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            ±15% inter-rater variability
          </div>
        </motion.div>

        {/* AI Scoring */}
        <motion.div
          onHoverStart={() => setHoveredMethod('ai')}
          onHoverEnd={() => setHoveredMethod(null)}
          whileHover={{ scale: 1.05 }}
          style={{
            padding: '2rem',
            borderRadius: '20px',
            backgroundColor: hoveredMethod === 'ai' ? 'rgba(80, 200, 120, 0.1)' : 'rgba(255, 255, 255, 0.03)',
            border: `2px solid ${hoveredMethod === 'ai' ? 'rgb(80, 200, 120)' : 'rgba(255, 255, 255, 0.1)'}`,
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
        >
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'rgb(80, 200, 120)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            AI-Powered
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'rgb(80, 200, 120)',
            marginBottom: '0.5rem'
          }}>
            &lt;10 sec
          </div>
          <div style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            Instant, consistent assessment
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            33% better agreement with gold standard
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => setShowComparison(!showComparison)}
        style={{
          display: 'block',
          margin: '0 auto',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          backgroundColor: 'rgb(80, 200, 120)',
          color: 'white',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = 'rgb(100, 220, 140)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'rgb(80, 200, 120)';
        }}
      >
        {showComparison ? 'Hide Details' : 'Show Accuracy Breakdown'}
      </button>

      {showComparison && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: '2rem',
            padding: '2rem',
            borderRadius: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(80, 200, 120, 0.2)'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Erythema
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'rgb(80, 200, 120)' }}>
                91%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Scaling
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'rgb(80, 200, 120)' }}>
                88%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Thickness
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'rgb(80, 200, 120)' }}>
                85%
              </div>
            </div>
          </div>
          <div style={{
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Correlation with dermatologist consensus (n=500 cases)
          </div>
        </motion.div>
      )}
    </div>
  );
}
