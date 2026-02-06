'use client';

import React, { useState, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ContactChatProps {
  onMessageSubmit: (message: string, intent: string) => void;
}

export function ContactChat({ onMessageSubmit }: ContactChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onMessageSubmit(inputValue, 'collaboration');
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const accentColor = '#d97757';

  return (
    <div style={{
      width: '100%',
      maxWidth: '640px',
      margin: '0 auto',
      opacity: 0,
      animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both',
    }}>
      {/* Input Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(30px) saturate(120%) brightness(0.9)',
          WebkitBackdropFilter: 'blur(30px) saturate(120%) brightness(0.9)',
          border: '1px solid rgba(217, 119, 87, 0.15)',
          borderRadius: isMobile ? '24px' : '28px',
          padding: isMobile ? '0.625rem 0.875rem' : '0.875rem 1.25rem',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = `1px solid ${accentColor}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = `1px solid ${accentColor}20`;
        }}
      >
        <input
          type="text"
          placeholder="What are we building together?..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            fontWeight: '300',
            letterSpacing: '0.01em',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          style={{
            background: inputValue.trim() ? `${accentColor}40` : 'rgba(255, 255, 255, 0.05)',
            border: inputValue.trim() ? `1px solid ${accentColor}80` : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: isMobile ? '0.5rem 0.75rem' : '0.5rem 1.25rem',
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
              e.currentTarget.style.background = `${accentColor}60`;
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (inputValue.trim()) {
              e.currentTarget.style.background = `${accentColor}40`;
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          <Send size={isMobile ? 16 : 14} />
          {!isMobile && "Let's collaborate"}
        </button>
      </div>

      {/* Suggested Prompts */}
      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center',
      }}>
        {[
          "I have a design project in mind...",
          "Looking to collaborate on...",
          "Interested in your design systems work..."
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInputValue(prompt)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(30px) saturate(120%) brightness(0.9)',
              WebkitBackdropFilter: 'blur(30px) saturate(120%) brightness(0.9)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: isMobile ? '12px' : '16px',
              padding: isMobile ? '0.25rem 0.625rem' : '0.375rem 0.875rem',
              color: 'var(--text-secondary)',
              fontSize: isMobile ? '0.6875rem' : '0.75rem',
              fontWeight: '300',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0,
              animation: `fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + i * 0.1}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.border = `1px solid ${accentColor}30`;
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
