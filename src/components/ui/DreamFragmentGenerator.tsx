'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DreamFragmentGeneratorProps {
  className?: string;
}

export function DreamFragmentGenerator({ className = '' }: DreamFragmentGeneratorProps) {
  const [mood, setMood] = useState('');
  const [theme, setTheme] = useState('');
  const [symbols, setSymbols] = useState('');
  const [dreamFragment, setDreamFragment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preset suggestions
  const moodPresets = ['Ethereal', 'Unsettling', 'Nostalgic', 'Transcendent', 'Melancholic'];
  const themePresets = ['Flying', 'Lost spaces', 'Time loops', 'Transformation', 'Memory'];
  const symbolPresets = ['Mirrors', 'Water', 'Keys', 'Doors', 'Light'];

  const generateDream = async () => {
    if (!mood && !theme && !symbols) {
      setError('Please provide at least one input to generate a dream');
      return;
    }

    setError('');
    setDreamFragment('');
    setIsGenerating(true);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/dream-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, theme, symbols }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate dream');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream available');
      }

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              setIsGenerating(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                accumulatedText += parsed.text;
                setDreamFragment(accumulatedText);
              }
            } catch (parseError) {
              // Skip malformed JSON chunks
              continue;
            }
          }
        }
      }

      setIsGenerating(false);

    } catch (error: any) {
      if (error.name === 'AbortError') {
        setError('Generation cancelled');
      } else {
        console.error('Dream generation error:', error);
        setError(error.message || 'Failed to generate dream fragment');
      }
      setIsGenerating(false);
    }
  };

  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  };

  const clearAll = () => {
    setMood('');
    setTheme('');
    setSymbols('');
    setDreamFragment('');
    setError('');
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className={className} style={{
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Input Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <Sparkles size={24} style={{ color: 'rgba(147, 51, 234, 0.9)' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Dream Fragment Generator
          </h3>
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          lineHeight: '1.6',
        }}>
          Provide a mood, theme, or symbols to generate a unique dream fragment using AI. The generator creates surreal, vivid dream experiences in real-time.
        </p>

        {/* Input Fields */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          {/* Mood Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Mood
            </label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., Ethereal"
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = '1px solid rgba(147, 51, 234, 0.5)';
                e.currentTarget.style.background = 'rgba(147, 51, 234, 0.05)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}>
              {moodPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMood(preset)}
                  disabled={isGenerating}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.7rem',
                    background: mood === preset ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: mood === preset ? '1px solid rgba(147, 51, 234, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    color: 'var(--text-muted)',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isGenerating) {
                      e.currentTarget.style.background = 'rgba(147, 51, 234, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (mood !== preset) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Theme
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g., Flying"
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = '1px solid rgba(147, 51, 234, 0.5)';
                e.currentTarget.style.background = 'rgba(147, 51, 234, 0.05)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}>
              {themePresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTheme(preset)}
                  disabled={isGenerating}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.7rem',
                    background: theme === preset ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: theme === preset ? '1px solid rgba(147, 51, 234, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    color: 'var(--text-muted)',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isGenerating) {
                      e.currentTarget.style.background = 'rgba(147, 51, 234, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (theme !== preset) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Symbols Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Symbols
            </label>
            <input
              type="text"
              value={symbols}
              onChange={(e) => setSymbols(e.target.value)}
              placeholder="e.g., Mirrors"
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = '1px solid rgba(147, 51, 234, 0.5)';
                e.currentTarget.style.background = 'rgba(147, 51, 234, 0.05)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '0.5rem',
            }}>
              {symbolPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSymbols(preset)}
                  disabled={isGenerating}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.7rem',
                    background: symbols === preset ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: symbols === preset ? '1px solid rgba(147, 51, 234, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    color: 'var(--text-muted)',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isGenerating) {
                      e.currentTarget.style.background = 'rgba(147, 51, 234, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (symbols !== preset) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={generateDream}
            disabled={isGenerating || (!mood && !theme && !symbols)}
            style={{
              flex: 1,
              padding: '0.875rem 1.5rem',
              background: isGenerating || (!mood && !theme && !symbols)
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(14, 165, 233, 0.3))',
              border: isGenerating || (!mood && !theme && !symbols)
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(147, 51, 234, 0.5)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isGenerating || (!mood && !theme && !symbols) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              opacity: isGenerating || (!mood && !theme && !symbols) ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isGenerating && (mood || theme || symbols)) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(147, 51, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isGenerating ? (
              <>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Dream
              </>
            )}
          </button>

          {isGenerating && (
            <button
              onClick={cancelGeneration}
              style={{
                padding: '0.875rem 1.5rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              }}
            >
              Cancel
            </button>
          )}

          {!isGenerating && (mood || theme || symbols || dreamFragment) && (
            <button
              onClick={clearAll}
              style={{
                padding: '0.875rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginTop: '1rem',
                padding: '0.875rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <AlertCircle size={18} style={{ color: 'rgba(239, 68, 68, 0.9)' }} />
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                flex: 1,
              }}>
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dream Fragment Display */}
      <AnimatePresence>
        {(dreamFragment || isGenerating) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              overflow: 'hidden',
            }}
          >
            {/* Animated border shimmer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '20px',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(14, 165, 233, 0.5), rgba(147, 51, 234, 0.5))',
              backgroundSize: '200% 200%',
              animation: 'borderShimmer 4s ease-in-out infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }} />

            <div style={{
              fontSize: '0.875rem',
              lineHeight: '1.8',
              color: 'var(--text-primary)',
              fontWeight: '300',
              whiteSpace: 'pre-wrap',
              animation: isGenerating ? 'dreamFadeIn 0.5s ease-in-out' : 'none',
            }}>
              {dreamFragment || (
                <span style={{ color: 'var(--text-muted)' }}>
                  Generating dream fragment...
                </span>
              )}
              {isGenerating && (
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  marginLeft: '2px',
                  background: 'rgba(147, 51, 234, 0.7)',
                  animation: 'blink 1s step-end infinite',
                }} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
