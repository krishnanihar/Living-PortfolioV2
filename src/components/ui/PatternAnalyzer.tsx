'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Loader, AlertCircle, TrendingUp, Heart, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Theme {
  name: string;
  frequency: number;
  description: string;
  examples: string[];
}

interface Symbol {
  symbol: string;
  occurrences: number;
  interpretation: string;
}

interface EmotionalSignature {
  primary: string;
  secondary: string[];
  intensity: number;
}

interface AnalysisData {
  themes: Theme[];
  symbols: Symbol[];
  emotionalSignature: EmotionalSignature;
  insights: string[];
}

interface PatternAnalyzerProps {
  className?: string;
}

export function PatternAnalyzer({ className = '' }: PatternAnalyzerProps) {
  const [dreams, setDreams] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [expandedTheme, setExpandedTheme] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const exampleDreams = `I keep dreaming about being in my childhood home, but the rooms are different - endless hallways that shouldn't exist. Last night I was flying over the ocean, feeling completely free, but then I couldn't remember how to land. There's this recurring dream where I'm searching for something important in a library, but I can never find what I'm looking for. Sometimes I'm back in school taking a test I didn't study for, feeling anxious and unprepared.`;

  const analyzeDreams = async () => {
    if (dreams.trim().length < 20) {
      setError('Please provide more detail about your dreams (at least 20 characters)');
      return;
    }

    setError('');
    setAnalysis(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/pattern-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreams }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Analysis failed');
      }

      if (!data.analysis) {
        throw new Error('Invalid response format');
      }

      setAnalysis(data.analysis);
    } catch (error: any) {
      console.error('Pattern analysis error:', error);
      setError(error.message || 'Failed to analyze patterns');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadExample = () => {
    setDreams(exampleDreams);
    setAnalysis(null);
    setError('');
  };

  const clearAll = () => {
    setDreams('');
    setAnalysis(null);
    setError('');
    setExpandedTheme(null);
  };

  const getEmotionColor = (emotion: string): string => {
    const emotionColors: Record<string, string> = {
      anxiety: 'rgba(239, 68, 68, 0.6)',
      fear: 'rgba(239, 68, 68, 0.6)',
      joy: 'rgba(34, 197, 94, 0.6)',
      happiness: 'rgba(34, 197, 94, 0.6)',
      nostalgia: 'rgba(147, 51, 234, 0.6)',
      melancholy: 'rgba(99, 102, 241, 0.6)',
      sadness: 'rgba(99, 102, 241, 0.6)',
      curiosity: 'rgba(14, 165, 233, 0.6)',
      wonder: 'rgba(14, 165, 233, 0.6)',
      confusion: 'rgba(251, 146, 60, 0.6)',
      excitement: 'rgba(236, 72, 153, 0.6)',
    };

    const lowerEmotion = emotion.toLowerCase();
    for (const [key, color] of Object.entries(emotionColors)) {
      if (lowerEmotion.includes(key)) {
        return color;
      }
    }
    return 'rgba(147, 51, 234, 0.6)'; // Default purple
  };

  return (
    <div className={className} style={{
      width: '100%',
      maxWidth: '1000px',
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
          <Brain size={24} style={{ color: 'rgba(147, 51, 234, 0.9)' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Dream Pattern Analyzer
          </h3>
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          lineHeight: '1.6',
        }}>
          Describe your dreams (one or multiple) and let AI identify recurring themes, symbols, and emotional patterns. The more detail you provide, the deeper the analysis.
        </p>

        {/* Textarea */}
        <textarea
          value={dreams}
          onChange={(e) => setDreams(e.target.value)}
          placeholder="Describe your dreams here... Include details about settings, emotions, recurring elements, and any patterns you've noticed."
          disabled={isAnalyzing}
          rows={8}
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

        {/* Character count */}
        <div style={{
          fontSize: '0.75rem',
          color: dreams.length < 20 ? 'rgba(239, 68, 68, 0.7)' : 'var(--text-muted)',
          marginTop: '0.5rem',
          textAlign: 'right',
        }}>
          {dreams.length} characters {dreams.length < 20 && '(minimum 20 required)'}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={analyzeDreams}
            disabled={isAnalyzing || dreams.trim().length < 20}
            style={{
              flex: 1,
              padding: '0.875rem 1.5rem',
              background: isAnalyzing || dreams.trim().length < 20
                ? 'rgba(255, 255, 255, 0.05)'
                : 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(14, 165, 233, 0.3))',
              border: isAnalyzing || dreams.trim().length < 20
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(147, 51, 234, 0.5)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isAnalyzing || dreams.trim().length < 20 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              opacity: isAnalyzing || dreams.trim().length < 20 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isAnalyzing && dreams.trim().length >= 20) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(147, 51, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isAnalyzing ? (
              <>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing Patterns...
              </>
            ) : (
              <>
                <TrendingUp size={16} />
                Analyze Dreams
              </>
            )}
          </button>

          <button
            onClick={loadExample}
            disabled={isAnalyzing}
            style={{
              padding: '0.875rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!isAnalyzing) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            Load Example
          </button>

          {!isAnalyzing && (dreams || analysis) && (
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

      {/* Loading State */}
      {isAnalyzing && !analysis && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}>
            {/* Animated consciousness orbs */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
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
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6), rgba(14, 165, 233, 0.3))',
                filter: 'blur(8px)',
                animation: 'float 3s ease-in-out infinite',
              }} />
            </div>

            <div style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
            }}>
              <span>Analyzing dream patterns</span>
              <span style={{ animation: 'dots 1.5s steps(4, end) infinite' }}>...</span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              opacity: 0.6,
            }}>
              <span>Identifying recurring themes</span>
              <span>Mapping symbolic elements</span>
              <span>Detecting emotional patterns</span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              display: 'grid',
              gap: '2rem',
            }}
          >
            {/* Themes Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
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

              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <TrendingUp size={20} style={{ color: 'rgba(147, 51, 234, 0.9)' }} />
                Recurring Themes
              </h4>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {analysis.themes.map((theme, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      onClick={() => setExpandedTheme(expandedTheme === index ? null : index)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.border = '1px solid rgba(147, 51, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                      }}>
                        <span style={{
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          color: 'var(--text-primary)',
                        }}>
                          {theme.name}
                        </span>
                        <span style={{
                          fontSize: '0.875rem',
                          color: 'rgba(147, 51, 234, 0.9)',
                          fontWeight: '500',
                        }}>
                          {theme.frequency}%
                        </span>
                      </div>

                      {/* Frequency Bar */}
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: '0.75rem',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${theme.frequency}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.6), rgba(14, 165, 233, 0.6))',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                            animation: 'borderShimmer 3s ease-in-out infinite',
                          }} />
                        </motion.div>
                      </div>

                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: '1.5',
                        margin: 0,
                      }}>
                        {theme.description}
                      </p>

                      {/* Expanded Examples */}
                      <AnimatePresence>
                        {expandedTheme === index && theme.examples && theme.examples.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                              marginTop: '0.75rem',
                              paddingTop: '0.75rem',
                              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <div style={{
                              fontSize: '0.75rem',
                              color: 'rgba(147, 51, 234, 0.9)',
                              marginBottom: '0.5rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}>
                              Examples:
                            </div>
                            <ul style={{
                              margin: 0,
                              paddingLeft: '1.25rem',
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              lineHeight: '1.6',
                            }}>
                              {theme.examples.map((example, i) => (
                                <li key={i} style={{ marginBottom: '0.25rem' }}>{example}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Symbols & Emotional Signature Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '2rem',
            }}>
              {/* Symbols */}
              {analysis.symbols && analysis.symbols.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
                    WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '20px',
                    padding: '2rem',
                  }}
                >
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <Lightbulb size={20} style={{ color: 'rgba(14, 165, 233, 0.9)' }} />
                    Symbolic Elements
                  </h4>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {analysis.symbols.map((symbol, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '1rem',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                        }}>
                          <span style={{
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                          }}>
                            {symbol.symbol}
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '8px',
                          }}>
                            {symbol.occurrences}x
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          lineHeight: '1.5',
                          margin: 0,
                        }}>
                          {symbol.interpretation}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Emotional Signature */}
              {analysis.emotionalSignature && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
                    WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '20px',
                    padding: '2rem',
                  }}
                >
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <Heart size={20} style={{ color: 'rgba(236, 72, 153, 0.9)' }} />
                    Emotional Signature
                  </h4>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1rem',
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Primary Emotion
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '300',
                      color: getEmotionColor(analysis.emotionalSignature.primary),
                      marginBottom: '1rem',
                    }}>
                      {analysis.emotionalSignature.primary}
                    </div>

                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Intensity
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.emotionalSignature.intensity}%` }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{
                          height: '100%',
                          background: getEmotionColor(analysis.emotionalSignature.primary),
                        }}
                      />
                    </div>
                  </div>

                  {analysis.emotionalSignature.secondary && analysis.emotionalSignature.secondary.length > 0 && (
                    <>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Secondary Emotions
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}>
                        {analysis.emotionalSignature.secondary.map((emotion, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${getEmotionColor(emotion)}`,
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </div>

            {/* Insights */}
            {analysis.insights && analysis.insights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%) brightness(0.85)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '20px',
                  padding: '2rem',
                }}
              >
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <Lightbulb size={20} style={{ color: 'rgba(34, 197, 94, 0.9)' }} />
                  AI Insights
                </h4>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {analysis.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: '1.6',
                        paddingLeft: '2.5rem',
                        position: 'relative',
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '1rem',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.6)',
                      }} />
                      {insight}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
            content: '.';
          }
          40% {
            content: '..';
          }
          60%, 100% {
            content: '...';
          }
        }
      `}</style>
    </div>
  );
}
