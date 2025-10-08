'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Circle,
  Square,
  Activity,
  Waves,
  Eye,
  Brain,
  Mic,
  Camera,
  Lock,
  Unlock,
  Moon,
  Sun,
  AlertCircle,
  Check,
} from 'lucide-react';

/**
 * Speculative Dream Recorder Interface
 * A critical design fiction prototype that materializes ethical questions
 * through interface design - showing rather than telling the dilemmas
 */
export function DreamRecorderPrototype() {
  const [isRecording, setIsRecording] = useState(false);
  const [sleepStage, setSleepStage] = useState<'wake' | 'n1' | 'n2' | 'n3' | 'rem'>('wake');
  const [privacyMode, setPrivacyMode] = useState<'full' | 'limited' | 'off'>('off');
  const [dreamFragments, setDreamFragments] = useState<string[]>([]);
  const [ethicalWarning, setEthicalWarning] = useState<string | null>(null);

  // Simulate sleep stage progression when recording
  useEffect(() => {
    if (!isRecording) return;

    const stages: Array<'wake' | 'n1' | 'n2' | 'n3' | 'rem'> = ['wake', 'n1', 'n2', 'n3', 'rem'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % stages.length;
      setSleepStage(stages[currentIndex]);

      // Trigger ethical warnings
      if (stages[currentIndex] === 'rem') {
        setEthicalWarning('REM detected. Dream content monitoring active. Who consented to this?');
        setTimeout(() => setEthicalWarning(null), 4000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulate dream fragment collection
  useEffect(() => {
    if (sleepStage !== 'rem' || !isRecording) return;

    const fragments = [
      'Flying over cityscape',
      'Childhood home (distorted)',
      'Unknown faces',
      'Water, endless ocean',
      'Being chased',
      'Speech without sound',
    ];

    const interval = setInterval(() => {
      const randomFragment = fragments[Math.floor(Math.random() * fragments.length)];
      setDreamFragments((prev) => [...prev.slice(-5), randomFragment]);
    }, 2000);

    return () => clearInterval(interval);
  }, [sleepStage, isRecording]);

  const getSleepStageColor = () => {
    switch (sleepStage) {
      case 'wake':
        return 'rgba(34, 197, 94, 0.8)';
      case 'n1':
        return 'rgba(59, 130, 246, 0.8)';
      case 'n2':
        return 'rgba(99, 102, 241, 0.8)';
      case 'n3':
        return 'rgba(236, 72, 153, 0.8)';
      case 'rem':
        return 'rgba(251, 146, 60, 0.8)';
    }
  };

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem',
      }}
    >
      {/* Main Interface Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '0.5rem',
            }}
          >
            DREAM-01 Recording Interface
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontStyle: 'italic',
            }}
          >
            Speculative prototype • Not for actual use
          </p>
        </div>

        {/* Status Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {/* Current State */}
          <div
            style={{
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Sleep Stage
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: getSleepStageColor(),
                  boxShadow: `0 0 12px ${getSleepStageColor()}`,
                  animation: isRecording ? 'thoughtPulse 2s ease-in-out infinite' : 'none',
                }}
              />
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textTransform: 'uppercase',
                }}
              >
                {sleepStage === 'wake' ? 'Awake' : sleepStage.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Privacy Mode */}
          <div
            style={{
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Privacy Mode
            </div>
            <select
              value={privacyMode}
              onChange={(e) => setPrivacyMode(e.target.value as any)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              <option value="full">Full Protection</option>
              <option value="limited">Limited Sharing</option>
              <option value="off">No Protection</option>
            </select>
            <p
              style={{
                fontSize: '0.6875rem',
                color: 'rgba(255, 255, 255, 0.4)',
                marginTop: '0.5rem',
                fontStyle: 'italic',
              }}
            >
              {privacyMode === 'full' && 'Data encrypted, local only'}
              {privacyMode === 'limited' && 'Anonymized patterns shared'}
              {privacyMode === 'off' && 'Full access granted to platform'}
            </p>
          </div>
        </div>

        {/* Control Center */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.01)',
            borderRadius: '16px',
            marginBottom: '2rem',
          }}
        >
          {/* Record Button */}
          <motion.button
            onClick={() => {
              setIsRecording(!isRecording);
              if (!isRecording) {
                setDreamFragments([]);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: isRecording
                ? 'rgba(218, 14, 41, 0.2)'
                : 'rgba(147, 51, 234, 0.2)',
              border: `3px solid ${isRecording ? 'rgba(218, 14, 41, 0.6)' : 'rgba(147, 51, 234, 0.6)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
          >
            {isRecording && (
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'rgba(218, 14, 41, 0.3)',
                }}
              />
            )}
            {isRecording ? (
              <Square size={40} fill="rgba(218, 14, 41, 0.9)" color="rgba(218, 14, 41, 0.9)" />
            ) : (
              <Circle size={40} fill="rgba(147, 51, 234, 0.9)" color="rgba(147, 51, 234, 0.9)" />
            )}
          </motion.button>

          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '0.25rem',
              }}
            >
              {isRecording ? 'Recording...' : 'Ready to Record'}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {isRecording ? 'Click to stop' : 'Click to begin monitoring'}
            </div>
          </div>
        </div>

        {/* Active Sensors */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {[
            { icon: Activity, label: 'EEG', active: isRecording },
            { icon: Eye, label: 'Eye Track', active: isRecording && sleepStage === 'rem' },
            { icon: Waves, label: 'Heart Rate', active: isRecording },
            { icon: Brain, label: 'fMRI', active: false },
          ].map((sensor) => {
            const Icon = sensor.icon;
            return (
              <div
                key={sensor.label}
                style={{
                  padding: '1rem',
                  background: sensor.active
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  border: `1px solid ${sensor.active ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <Icon
                  size={20}
                  style={{
                    color: sensor.active ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                    marginBottom: '0.5rem',
                  }}
                />
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: sensor.active ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {sensor.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dream Fragments Display */}
        <AnimatePresence>
          {dreamFragments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                padding: '1.5rem',
                background: 'rgba(251, 146, 60, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(251, 146, 60, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Eye size={14} />
                Dream Content Detected
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {dreamFragments.map((fragment, index) => (
                  <motion.div
                    key={`${fragment}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {fragment}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ethical Warning Banner */}
      <AnimatePresence>
        {ethicalWarning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(218, 14, 41, 0.1)',
              border: '1px solid rgba(218, 14, 41, 0.3)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <AlertCircle size={24} style={{ color: 'rgba(218, 14, 41, 0.9)', flexShrink: 0 }} />
            <div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'rgba(218, 14, 41, 0.9)',
                  marginBottom: '0.25rem',
                }}
              >
                Ethical Consideration
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontStyle: 'italic',
                }}
              >
                {ethicalWarning}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Critical Design Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: '1.6',
          }}
        >
          This interface asks questions through design:
          <br />
          <em>Can consent be meaningfully given for unconscious monitoring?</em>
          <br />
          <em>Who owns the data generated from your dreams?</em>
          <br />
          <em>What happens to the mystery when everything is measured?</em>
        </p>
      </motion.div>
    </div>
  );
}
