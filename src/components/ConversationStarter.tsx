'use client';

import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface Intent {
  id: string;
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
  onIntentSelect: (intentId: string) => void;
}

export function ConversationStarter({ onIntentSelect }: ConversationStarterProps) {
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
    console.log('🎯 ConversationStarter: Intent button clicked:', intentId);
    setSelectedIntent(intentId);
    onIntentSelect(intentId);
    console.log('🎯 ConversationStarter: Intent selection complete, state updated');
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

  return (
    <div>
      {/* Intent Selection Debug */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#00ff00',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          zIndex: 99998,
          border: '1px solid #333',
          minWidth: '250px',
        }}>
          <div style={{ color: '#ffffff', marginBottom: '0.5rem' }}>🎯 Intent Selection</div>
          <div>Selected Intent: <span style={{ color: selectedIntent ? '#00ff00' : '#ff6666' }}>{selectedIntent || 'NONE'}</span></div>
          <div>Buttons Visible: <span style={{ color: !selectedIntent ? '#00ff00' : '#ffff00' }}>{!selectedIntent ? 'YES' : 'NO'}</span></div>
          <div>Input Visible: <span style={{ color: selectedIntent ? '#00ff00' : '#ffff00' }}>{selectedIntent ? 'YES' : 'NO'}</span></div>
          {!selectedIntent && (
            <div style={{ fontSize: '0.7rem', color: '#cccccc', marginTop: '0.5rem' }}>
              ⚠️ Click an intent button above to continue
            </div>
          )}
        </div>
      )}

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
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        }}>
          {getHeroContent().greeting}
        </div>

        <h1 style={{
          fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
          fontWeight: '200',
          color: 'var(--text-primary)',
          marginBottom: selectedIntent ? '1rem' : '2.5rem',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          position: 'relative',
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {getHeroContent().title}

          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '42%',
            width: '18px',
            height: '18px',
            pointerEvents: 'none',
            opacity: selectedIntent ? 0.5 : 1,
            transition: 'opacity 0.8s ease',
          }}>
            <Sparkles size={18} style={{
              color: 'rgba(218, 14, 41, 0.7)',
              animation: 'sparkle 3s ease-in-out infinite',
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
            {getHeroContent().subtitle}
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
                const target = e.currentTarget as HTMLElement;
                target.style.background = 'rgba(255, 255, 255, 0.05)';
                target.style.border = '1px solid rgba(218, 14, 41, 0.2)';
                target.style.transform = 'translateY(-2px) scale(1.02)';
                target.style.boxShadow = '0 8px 32px rgba(218, 14, 41, 0.1)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
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
          marginBottom: '2.5rem',
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both',
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(30px) brightness(0.8)',
            WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '28px',
            padding: '0.875rem 1.25rem',
          }}>
            <input
              type="text"
              placeholder={`Let's discuss ${intents.find(i => i.id === selectedIntent)?.label.toLowerCase()}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
              style={{
                background: 'rgba(218, 14, 41, 0.25)',
                border: '1px solid rgba(218, 14, 41, 0.5)',
                borderRadius: '20px',
                padding: '0.5rem 1.25rem',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                fontWeight: '400',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
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