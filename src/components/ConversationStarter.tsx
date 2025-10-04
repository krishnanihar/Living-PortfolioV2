'use client';

import React, { useState } from 'react';
import { Send, Sparkles, ArrowLeft } from 'lucide-react';

interface Intent {
  id: 'hiring' | 'inspiration' | 'learning' | 'collaboration';
  label: string;
  icon: string;
  description: string;
  heroContent: {
    greeting: string;
    title: string;
    subtitle: string;
  };
}

interface ConversationStarterProps {
  onMessageSubmit: (message: string, intent: string) => void;
}

export function ConversationStarter({ onMessageSubmit }: ConversationStarterProps) {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const intents: Intent[] = [
    {
      id: 'hiring',
      label: 'Hiring',
      icon: '👔',
      description: 'Looking to hire or collaborate',
      heroContent: {
        greeting: 'Perfect timing.',
        title: 'I solve complex design problems at scale',
        subtitle: '450+ users daily • Design systems • Team leadership'
      }
    },
    {
      id: 'inspiration',
      label: 'Inspiration',
      icon: '✨',
      description: 'Seeking creative inspiration',
      heroContent: {
        greeting: 'Welcome, fellow creator.',
        title: 'I craft experiences that feel alive',
        subtitle: 'Consciousness-aware interfaces • Living design systems'
      }
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: '🧠',
      description: 'Want to learn and grow',
      heroContent: {
        greeting: 'Let\'s explore together.',
        title: 'I document the design process',
        subtitle: 'Behind-the-scenes • Process insights • Design thinking'
      }
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      icon: '🤝',
      description: 'Interested in working together',
      heroContent: {
        greeting: 'Let\'s build something.',
        title: 'I thrive on meaningful partnerships',
        subtitle: 'Open source • Design systems • Innovation projects'
      }
    }
  ];

  const handleIntentSelect = (intentId: string) => {
    setSelectedIntent(intentId);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedIntent) return;
    onMessageSubmit(inputValue, selectedIntent);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getHeroContent = () => {
    if (!selectedIntent) {
      return {
        greeting: 'Good evening.',
        title: 'What brings you here today?',
        subtitle: 'Choose your path to explore this living portfolio'
      };
    }

    const intent = intents.find(i => i.id === selectedIntent);
    return intent?.heroContent || {
      greeting: 'Good evening.',
      title: 'I build living interfaces',
      subtitle: 'Product & New Media Designer'
    };
  };

  const content = getHeroContent();

  return (
    <div data-tour="conversation-starter" style={{ position: 'relative', zIndex: 1 }}>
      {/* Dynamic Hero Content */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
      }}>
        <div style={{
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          letterSpacing: '0.025em',
          fontWeight: '200',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        }}>
          {content.greeting}
        </div>

        <h1 style={{
          fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
          fontWeight: '200',
          color: 'var(--text-primary)',
          marginBottom: selectedIntent ? '1rem' : '2.5rem',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          position: 'relative',
          display: 'inline-block',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
          transition: 'margin-bottom 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {content.title}

          {/* Sparkle icon */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-30px',
            opacity: selectedIntent ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}>
            <Sparkles size={18} style={{
              color: 'rgba(218, 14, 41, 0.7)',
            }} />
          </div>
        </h1>

        {selectedIntent && (
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontWeight: '300',
            letterSpacing: '0.01em',
            opacity: 0,
            animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
          }}>
            {content.subtitle}
          </p>
        )}
      </div>

      {/* Intent Selection Buttons */}
      {!selectedIntent && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2.5rem',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
        }}>
          {intents.map((intent) => (
            <button
              key={intent.id}
              onClick={() => handleIntentSelect(intent.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(30px) brightness(0.8)',
                WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '20px',
                padding: '1.25rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.background = 'rgba(255, 255, 255, 0.05)';
                target.style.border = '1px solid rgba(218, 14, 41, 0.2)';
                target.style.transform = 'translateY(-2px) scale(1.02)';
                target.style.boxShadow = '0 8px 32px rgba(218, 14, 41, 0.1)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.background = 'rgba(255, 255, 255, 0.02)';
                target.style.border = '1px solid rgba(255, 255, 255, 0.06)';
                target.style.transform = 'translateY(0) scale(1)';
                target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
              }}>
                {intent.icon}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
                letterSpacing: '0.01em',
              }}>
                {intent.label}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                fontWeight: '300',
                lineHeight: '1.4',
              }}>
                {intent.description}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Continue Conversation Input */}
      {selectedIntent && (
        <div style={{
          position: 'relative',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both',
        }}>
          {/* Back Button */}
          <button
            onClick={() => setSelectedIntent(null)}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(30px) brightness(0.8)',
              WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.825rem',
              fontWeight: '400',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(30px) brightness(0.8)',
            WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '28px',
            padding: '0.875rem 1.25rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid rgba(218, 14, 41, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.06)';
          }}
          >
            <input
              type="text"
              placeholder={`Let's discuss ${intents.find(i => i.id === selectedIntent)?.label.toLowerCase()}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '300',
                letterSpacing: '0.01em',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={{
                background: inputValue.trim() ? 'rgba(218, 14, 41, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: inputValue.trim() ? '1px solid rgba(218, 14, 41, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '0.5rem 1.25rem',
                color: inputValue.trim() ? 'var(--text-primary)' : 'var(--text-muted)',
                fontSize: '0.825rem',
                fontWeight: '400',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                opacity: inputValue.trim() ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.background = 'rgba(218, 14, 41, 0.35)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.background = 'rgba(218, 14, 41, 0.25)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <Send size={14} />
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
