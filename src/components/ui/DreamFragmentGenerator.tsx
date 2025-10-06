'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader, AlertCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DreamFragmentGeneratorProps {
  className?: string;
}

interface GeneratedImage {
  data: string;
  mimeType: string;
  aspectRatio: string;
}

export function DreamFragmentGenerator({ className = '' }: DreamFragmentGeneratorProps) {
  const [dreamInput, setDreamInput] = useState('');
  const [dreamFragment, setDreamFragment] = useState('');
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
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

  // Quick-start presets
  const quickStarts = [
    'Ethereal flight through infinite mirrors',
    'Lost in time loops and shifting memories',
    'Underwater cities of forgotten dreams',
    'Keys unlocking impossible doorways',
  ];

  const generateBoth = async () => {
    if (!dreamInput.trim()) {
      setError('Please describe your dream to generate');
      return;
    }

    setError('');
    setDreamFragment('');
    setGeneratedImage(null);
    setIsGenerating(true);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // Generate text first, then image (sequential to avoid rate limits)
      await generateText();
      await generateImage();
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Dream generation error:', error);
        setError(error.message || 'Failed to generate dream');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateText = async () => {
    try {
      const response = await fetch('/api/dream-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamInput }),
        signal: abortControllerRef.current?.signal,
      });

      // Check if response is JSON error (for non-streaming errors)
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        if (errorData.error) {
          throw new Error(errorData.message || 'Failed to generate dream');
        }
      }

      if (!response.ok) {
        throw new Error('Failed to generate dream');
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

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        throw error;
      }
    }
  };

  const generateImage = async () => {
    try {
      const response = await fetch('/api/dream-image-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamInput, aspectRatio: '1:1' }),
        signal: abortControllerRef.current?.signal,
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Failed to generate image');
      }

      if (!data.success || !data.image) {
        throw new Error('Invalid response format');
      }

      setGeneratedImage(data.image);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        throw error;
      }
    }
  };

  const cancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  };

  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = `data:${generatedImage.mimeType};base64,${generatedImage.data}`;
    link.download = `dream-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setDreamInput('');
    setDreamFragment('');
    setGeneratedImage(null);
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
          Describe your dream and watch AI generate both text and imagery simultaneously. A single input creates dual experiences.
        </p>

        {/* Single Textarea Input */}
        <textarea
          value={dreamInput}
          onChange={(e) => setDreamInput(e.target.value)}
          placeholder="Describe your dream... a mood, theme, symbols, or anything surreal..."
          disabled={isGenerating}
          rows={4}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.3s ease',
            marginBottom: '1rem',
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

        {/* Quick-start presets */}
        <div style={{
          marginBottom: '1.5rem',
        }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Quick Starts
          </label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            {quickStarts.map((preset) => (
              <button
                key={preset}
                onClick={() => setDreamInput(preset)}
                disabled={isGenerating}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.75rem',
                  background: dreamInput === preset ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: dreamInput === preset ? '1px solid rgba(147, 51, 234, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
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
                  if (dreamInput !== preset) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={generateBoth}
            disabled={isGenerating || !dreamInput.trim()}
            style={{
              flex: 1,
              padding: '0.875rem 1.5rem',
              background: isGenerating || !dreamInput.trim()
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(14, 165, 233, 0.3))',
              border: isGenerating || !dreamInput.trim()
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(147, 51, 234, 0.5)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isGenerating || !dreamInput.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              opacity: isGenerating || !dreamInput.trim() ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isGenerating && dreamInput.trim()) {
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

          {!isGenerating && (dreamInput || dreamFragment || generatedImage) && (
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

      {/* Dual Results Display: Text + Image Side-by-Side */}
      <AnimatePresence>
        {(dreamFragment || generatedImage || isGenerating) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '2rem',
            }}
          >
            {/* Text Dream Column */}
            <div style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '20px',
              padding: '1.5rem',
              overflow: 'hidden',
              minHeight: '300px',
            }}>
              {/* Border shimmer */}
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

              {/* Loading state */}
              {isGenerating && !dreamFragment && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '268px',
                  gap: '1.5rem',
                }}>
                  <div style={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                  }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '2px solid rgba(147, 51, 234, 0.5)',
                          animation: `pulse${i} 2s ease-in-out infinite`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6), rgba(14, 165, 233, 0.3))',
                      filter: 'blur(6px)',
                      animation: 'float 3s ease-in-out infinite',
                    }} />
                  </div>
                  <div style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                  }}>
                    <span>Weaving words</span>
                    <span style={{ animation: 'dots 1.5s steps(4, end) infinite' }}>...</span>
                  </div>
                </div>
              )}

              {/* Text content */}
              {dreamFragment && (
                <div style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.8',
                  color: 'var(--text-primary)',
                  fontWeight: '300',
                  whiteSpace: 'pre-wrap',
                }}>
                  {dreamFragment}
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
              )}
            </div>

            {/* Image Dream Column */}
            <div style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '20px',
              padding: '1.5rem',
              overflow: 'hidden',
              minHeight: '300px',
            }}>
              {/* Border shimmer */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '20px',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.5), rgba(147, 51, 234, 0.5), rgba(14, 165, 233, 0.5))',
                backgroundSize: '200% 200%',
                animation: 'borderShimmer 4s ease-in-out infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none',
              }} />

              {/* Loading state */}
              {isGenerating && !generatedImage && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '268px',
                  gap: '1.5rem',
                }}>
                  <div style={{
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                  }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '2px solid rgba(14, 165, 233, 0.5)',
                          animation: `pulse${i} 2s ease-in-out infinite`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(14, 165, 233, 0.6), rgba(147, 51, 234, 0.3))',
                      filter: 'blur(6px)',
                      animation: 'float 3s ease-in-out infinite',
                    }} />
                  </div>
                  <div style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                  }}>
                    <span>Visualizing imagery</span>
                    <span style={{ animation: 'dots 1.5s steps(4, end) infinite' }}>...</span>
                  </div>
                </div>
              )}

              {/* Image content */}
              {generatedImage && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(0, 0, 0, 0.3)',
                  }}>
                    <img
                      src={`data:${generatedImage.mimeType};base64,${generatedImage.data}`}
                      alt="Generated dream visualization"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                  </div>
                  <button
                    onClick={downloadImage}
                    style={{
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(147, 51, 234, 0.3))',
                      border: '1px solid rgba(14, 165, 233, 0.5)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
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

        @keyframes pulse0 {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.3;
          }
        }

        @keyframes pulse1 {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
        }

        @keyframes pulse2 {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.7);
            opacity: 0.1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }

        @keyframes dots {
          0%, 20% {
            content: '';
          }
          40% {
            content: '.';
          }
          60% {
            content: '..';
          }
          80%, 100% {
            content: '...';
          }
        }
      `}</style>
    </div>
  );
}
