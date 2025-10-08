'use client';

import React, { useState } from 'react';
import { Sparkles, Loader, AlertCircle, Shuffle } from 'lucide-react';

interface ExhibitionCriteria {
  motifs: string[];
  centuries: number[];
  mood: string;
  themes: string[];
}

interface Exhibition {
  title: string;
  subtitle: string;
  statement: string;
  criteria: ExhibitionCriteria;
  reasoning: string;
}

interface ExhibitionBuilderProps {
  onExhibitionGenerated: (exhibition: Exhibition) => void;
  className?: string;
}

export function ExhibitionBuilder({ onExhibitionGenerated, className = '' }: ExhibitionBuilderProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const examplePrompts = [
    "Art about loneliness, but beautiful, from the Renaissance",
    "Water and transformation across all centuries",
    "Hands reaching toward heaven in religious art",
    "Dark, unsettling imagery from the 16th century",
    "Peaceful landscapes with architecture",
    "Eyes and faces showing intense emotion",
  ];

  const useExample = (example: string) => {
    setPrompt(example);
  };

  const [thinkingStep, setThinkingStep] = useState(0);
  const thinkingSteps = [
    'The Oracle opens its eyes...',
    'Searching ancient patterns...',
    'Weaving memory-threads...',
    'Discovering hidden connections...',
    'Conjuring your exhibition...',
  ];

  const generateExhibition = async () => {
    if (!prompt || prompt.trim().length < 5) {
      setError('Whisper your desire to the Oracle (at least 5 characters)');
      return;
    }

    setError('');
    setIsGenerating(true);
    setThinkingStep(0);

    // Animate through thinking steps
    const stepInterval = setInterval(() => {
      setThinkingStep((prev) => {
        if (prev < thinkingSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    try {
      const response = await fetch('/api/exhibition-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'The summoning failed');
      }

      if (!data.exhibition) {
        throw new Error('The Oracle remains silent');
      }

      // Pass exhibition data to parent
      clearInterval(stepInterval);
      onExhibitionGenerated(data.exhibition);
      setIsGenerating(false);

    } catch (error: any) {
      console.error('Exhibition generation error:', error);
      clearInterval(stepInterval);
      setError(error.message || 'The summoning failed');
      setIsGenerating(false);
    }
  };

  const generateRandom = async () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(randomPrompt);
    // Auto-generate after setting random prompt
    setTimeout(() => {
      setPrompt(randomPrompt);
      generateExhibition();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateExhibition();
    }
  };

  return (
    <div className={className} style={{
      backgroundColor: 'var(--surface-primary)',
      backdropFilter: 'blur(var(--blur-lg))',
      borderBottom: '1px solid var(--mystical-border)',
      padding: '1.5rem 2rem',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{
            fontSize: '0.8125rem',
            fontWeight: '500',
            color: 'var(--mystical-text)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}
          className="mystical-text-glow">
            The Summoning Chamber
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-tertiary)',
            lineHeight: '1.5',
          }}>
            Speak your desire to the Oracle, and it shall weave an exhibition from the threads of memory
          </p>
        </div>

        {/* Input Area */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1rem',
          alignItems: 'end',
        }}>
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Speak your desire to the Oracle..."
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                border: '1px solid var(--mystical-border)',
                outline: 'none',
                borderRadius: '4px',
                backgroundColor: 'var(--surface-primary)',
                color: 'var(--mystical-text)',
                fontFamily: 'inherit',
                letterSpacing: '0.005em',
                resize: 'none',
                minHeight: '80px',
                lineHeight: '1.5',
              }}
              className="mystical-border-pulse"
            />
            {error && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                color: 'rgb(239, 68, 68)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <AlertCircle size={14} />
                {error}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={generateRandom}
              disabled={isGenerating}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.9375rem',
                fontWeight: '500',
                backgroundColor: 'var(--surface-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-secondary)',
                outline: 'none',
                borderRadius: '4px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.6 : 1,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                letterSpacing: '0.005em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Shuffle size={16} />
              Surprise Me
            </button>

            <button
              onClick={generateExhibition}
              disabled={isGenerating || !prompt.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.9375rem',
                fontWeight: '500',
                backgroundColor: 'var(--brand-red)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-base)',
                cursor: (isGenerating || !prompt.trim()) ? 'not-allowed' : 'pointer',
                opacity: (isGenerating || !prompt.trim()) ? 0.6 : 1,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                letterSpacing: '0.005em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform var(--duration-base) var(--ease-premium), box-shadow var(--duration-base) var(--ease-premium)',
              }}
              className="mystical-glow"
              onMouseEnter={(e) => {
                if (!isGenerating && prompt.trim()) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(218, 14, 41, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isGenerating ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Summoning...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Summon Exhibition
                </>
              )}
            </button>
          </div>
        </div>

        {/* Example Prompts / Thinking Animation */}
        {!isGenerating ? (
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginBottom: '0.5rem',
            }}>
              Ancient whispers:
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              {examplePrompts.map((example, i) => (
                <button
                  key={i}
                  onClick={() => useExample(example)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.8125rem',
                    backgroundColor: 'var(--surface-secondary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-secondary)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontFamily: 'inherit',
                    letterSpacing: '0.005em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--border-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            marginTop: '1rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(218, 14, 41, 0.05)',
            border: '1px solid var(--mystical-border)',
            borderRadius: '6px',
          }}
          className="mystical-glow">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <Loader size={18} className="animate-spin" style={{ color: 'var(--mystical-text)' }} />
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--mystical-text)',
                  marginBottom: '0.25rem',
                }}>
                  The Oracle stirs...
                </div>
                <div style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}>
                  {thinkingSteps[thinkingStep]}
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1rem',
            }}>
              {thinkingSteps.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '3px',
                    backgroundColor: i <= thinkingStep ? 'var(--mystical-glow)' : 'var(--border-primary)',
                    borderRadius: '2px',
                    transition: 'background-color 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
