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
    'Interpreting your vision...',
    'Analyzing visual patterns...',
    'Searching across centuries...',
    'Discovering connections...',
    'Curating exhibition...',
  ];

  const generateExhibition = async () => {
    if (!prompt || prompt.trim().length < 5) {
      setError('Please describe what kind of art you want to explore (at least 5 characters)');
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
        throw new Error(data.message || 'Failed to generate exhibition');
      }

      if (!data.exhibition) {
        throw new Error('No exhibition data received');
      }

      // Pass exhibition data to parent
      clearInterval(stepInterval);
      onExhibitionGenerated(data.exhibition);
      setIsGenerating(false);

    } catch (error: any) {
      console.error('Exhibition generation error:', error);
      clearInterval(stepInterval);
      setError(error.message || 'Failed to generate exhibition');
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
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #DADADA',
      padding: '1.5rem 2rem',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{
            fontSize: '0.8125rem',
            fontWeight: '500',
            color: '#606060',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}>
            AI Exhibition Curator
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#9E9E9E',
            lineHeight: '1.5',
          }}>
            Describe the art experience you want, and AI will curate a thematic exhibition
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
              placeholder="Tell me about art that feels like..."
              disabled={isGenerating}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                border: '1px solid #D0D0D0', outline: 'none',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                fontFamily: 'inherit',
                letterSpacing: '0.005em',
                resize: 'none',
                minHeight: '80px',
                lineHeight: '1.5',
              }}
            />
            {error && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: '#FEE',
                border: '1px solid #FCC',
                borderRadius: '4px',
                fontSize: '0.8125rem',
                color: '#C00',
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
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                border: '1px solid #D0D0D0', outline: 'none',
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
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: (isGenerating || !prompt.trim()) ? 'not-allowed' : 'pointer',
                opacity: (isGenerating || !prompt.trim()) ? 0.6 : 1,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                letterSpacing: '0.005em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {isGenerating ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Curating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Exhibition
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
              color: '#9E9E9E',
              marginBottom: '0.5rem',
            }}>
              Try these:
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
                    backgroundColor: '#F5F5F5',
                    color: '#606060',
                    border: '1px solid #EBEBEB',
                    borderRadius: '4px',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                    fontFamily: 'inherit',
                letterSpacing: '0.005em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EBEBEB';
                    e.currentTarget.style.borderColor = '#D0D0D0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5F5F5';
                    e.currentTarget.style.borderColor = '#EBEBEB';
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
            backgroundColor: '#F0F4FF',
            border: '1px solid #C3D4F5',
            borderRadius: '6px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <Loader size={18} className="animate-spin" style={{ color: '#606060' }} />
              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1A1A1A',
                  marginBottom: '0.25rem',
                }}>
                  AI is thinking...
                </div>
                <div style={{
                  fontSize: '0.8125rem',
                  color: '#606060',
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
                    backgroundColor: i <= thinkingStep ? '#C3D4F5' : '#E8E8E8',
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
