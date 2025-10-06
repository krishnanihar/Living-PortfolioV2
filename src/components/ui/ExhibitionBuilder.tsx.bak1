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

  const generateExhibition = async () => {
    if (!prompt || prompt.trim().length < 5) {
      setError('Please describe what kind of art you want to explore (at least 5 characters)');
      return;
    }

    setError('');
    setIsGenerating(true);

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
      onExhibitionGenerated(data.exhibition);
      setIsGenerating(false);

    } catch (error: any) {
      console.error('Exhibition generation error:', error);
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
            color: '#666666',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}>
            AI Exhibition Curator
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#999999',
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
                border: '1px solid #CACACA',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                color: '#2C2C2C',
                fontFamily: 'inherit',
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
                color: '#2C2C2C',
                border: '1px solid #CACACA',
                borderRadius: '4px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.6 : 1,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
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
                backgroundColor: '#2C2C2C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: (isGenerating || !prompt.trim()) ? 'not-allowed' : 'pointer',
                opacity: (isGenerating || !prompt.trim()) ? 0.6 : 1,
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
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

        {/* Example Prompts */}
        {!isGenerating && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              fontSize: '0.75rem',
              color: '#999999',
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
                    color: '#666666',
                    border: '1px solid #E5E5E5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EBEBEB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5F5F5';
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
