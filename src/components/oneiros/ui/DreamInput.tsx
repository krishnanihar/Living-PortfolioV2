'use client';

/**
 * Dream Input Component
 *
 * Pre-palace interface for entering dream descriptions.
 * Shows analysis results and matched rooms before entering.
 */

import React, { useState } from 'react';
import { Moon, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useDreamAnalysis } from '../context/DreamAnalysisContext';

const EXAMPLE_DREAMS = [
  "I'm flying over an endless ocean at night, stars reflected in the water below. I feel free but also aware that I'm being watched by something in the deep.",
  "I keep finding new rooms in my childhood home. Each door leads to spaces I've never seen, filled with old photographs of people I don't recognize but feel connected to.",
  "I'm running through a forest that keeps shifting. Trees become corridors, paths fold back on themselves. I'm chasing something, or being chased - I can't tell which.",
];

interface DreamInputProps {
  embedded?: boolean; // When true, renders inline instead of fixed overlay
}

export function DreamInput({ embedded = false }: DreamInputProps) {
  const { state, analyzeDreams, enterPalace, completeNarrative } = useDreamAnalysis();
  const [dreams, setDreams] = useState('');

  const charCount = dreams.trim().length;
  const isValid = charCount >= 20;

  const handleAnalyze = async () => {
    if (isValid && !state.isAnalyzing) {
      await analyzeDreams(dreams);
    }
  };

  const handleExampleClick = (example: string) => {
    setDreams(example);
  };

  const handleEnter = () => {
    enterPalace();
  };

  // Skip dream input and enter directly (for quick access)
  const handleSkip = () => {
    enterPalace();
  };

  // Container styles based on embedded mode
  const containerStyle: React.CSSProperties = embedded
    ? {
        // Embedded mode - inline within scroll
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
      }
    : {
        // Full-screen overlay mode
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#0c0c10',
        zIndex: 50,
        overflow: 'auto',
      };

  return (
    <div style={containerStyle}>
      {/* Background gradient - only in non-embedded mode */}
      {!embedded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          maxWidth: '640px',
          width: '100%',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--glass-05)',
              border: '1px solid var(--text-10)',
              borderRadius: '9999px',
              marginBottom: '1rem',
            }}
          >
            <Moon size={16} style={{ color: '#8B5CF6' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-60)', fontFamily: 'var(--font-newsreader)' }}>
              ONEIROS PALACE
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 500,
              color: 'var(--text-95)',
              fontFamily: 'var(--font-newsreader)',
              marginBottom: '0.75rem',
            }}
          >
            Describe Your Dreams
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-50)',
              fontFamily: 'var(--font-urbanist)',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            Share your recurring dreams, and we&apos;ll create a personalized gallery
            filled with masterworks that resonate with your unconscious.
          </p>
        </div>

        {/* Textarea */}
        <div style={{ marginBottom: '1rem' }}>
          <textarea
            value={dreams}
            onChange={(e) => setDreams(e.target.value)}
            placeholder="I often dream about..."
            disabled={state.isAnalyzing}
            style={{
              width: '100%',
              minHeight: '160px',
              padding: '1rem',
              backgroundColor: 'var(--glass-05)',
              border: '1px solid var(--text-10)',
              borderRadius: '12px',
              color: 'var(--text-90)',
              fontFamily: 'var(--font-urbanist)',
              fontSize: '1rem',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--text-10)';
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-40)',
            }}
          >
            <span>{charCount} / 20 min characters</span>
            {state.error && (
              <span style={{ color: '#EF4444' }}>{state.error}</span>
            )}
          </div>
        </div>

        {/* Example dreams */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-40)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-newsreader)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Try an example:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Flying', 'Hidden Rooms', 'Chase'].map((label, i) => (
              <button
                key={label}
                onClick={() => handleExampleClick(EXAMPLE_DREAMS[i])}
                disabled={state.isAnalyzing}
                style={{
                  padding: '0.375rem 0.75rem',
                  backgroundColor: 'var(--glass-05)',
                  border: '1px solid var(--text-10)',
                  borderRadius: '6px',
                  color: 'var(--text-60)',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-urbanist)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--glass-10)';
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--glass-05)';
                  e.currentTarget.style.borderColor = 'var(--text-10)';
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Analyze button */}
        {!state.analysis && (
          <button
            onClick={handleAnalyze}
            disabled={!isValid || state.isAnalyzing}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: isValid ? '#8B5CF6' : 'var(--glass-10)',
              border: 'none',
              borderRadius: '12px',
              color: isValid ? '#fff' : 'var(--text-40)',
              fontSize: '1rem',
              fontWeight: 500,
              fontFamily: 'var(--font-newsreader)',
              cursor: isValid ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
            }}
          >
            {state.isAnalyzing ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing your dreams...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze Dreams
              </>
            )}
          </button>
        )}

        {/* Analysis results */}
        {state.analysis && (
          <div style={{ marginTop: '1.5rem' }}>
            {/* Themes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-40)',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-newsreader)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Detected Themes
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {state.analysis.themes.slice(0, 4).map((theme) => (
                  <div
                    key={theme.name}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-80)',
                        fontFamily: 'var(--font-urbanist)',
                      }}
                    >
                      {theme.name}
                    </span>
                    <span
                      style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.75rem',
                        color: '#8B5CF6',
                      }}
                    >
                      {theme.frequency}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated rooms preview */}
            {state.generatedRooms.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-40)',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-newsreader)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Your Palace Rooms
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {state.generatedRooms.map((room, i) => (
                    <div
                      key={room.roomConfig.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'var(--glass-05)',
                        border: '1px solid var(--text-10)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      {/* Color indicator */}
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          background: `linear-gradient(135deg, ${room.roomConfig.atmosphere.primaryColor}, ${room.roomConfig.atmosphere.secondaryColor})`,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'var(--text-90)',
                            fontFamily: 'var(--font-newsreader)',
                          }}
                        >
                          {room.roomConfig.name}
                        </div>
                        <div
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-50)',
                            fontFamily: 'var(--font-urbanist)',
                          }}
                        >
                          {room.roomConfig.sleepStage} • {room.artworks.length} artworks
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enter palace button */}
            <button
              onClick={handleEnter}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#8B5CF6',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 500,
                fontFamily: 'var(--font-newsreader)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7C3AED';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8B5CF6';
              }}
            >
              Enter the Palace
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Skip option */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-40)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-urbanist)',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-60)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-40)';
            }}
          >
            Skip and explore default gallery
          </button>
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default DreamInput;
