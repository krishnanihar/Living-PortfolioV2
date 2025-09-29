'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader } from 'lucide-react';
import { useConsciousness } from '@/components/effects/ConsciousnessProvider';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: number;
}

interface ConsciousnessChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsciousnessChat({ isOpen, onClose }: ConsciousnessChatProps) {
  const [mounted, setMounted] = useState(false);
  const { state, engage, getPersonalityInsights } = useConsciousness();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const insights = getPersonalityInsights();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getPersonalityGreeting(state.personalityState);
      setMessages([{
        id: 'greeting',
        content: greeting,
        isUser: false,
        timestamp: Date.now(),
      }]);
    }
  }, [isOpen, messages.length, state.personalityState]);

  const getPersonalityGreeting = (personality: string): string => {
    switch (personality) {
      case 'philosophical':
        return "Hello, fellow consciousness explorer. What questions about design, technology, or human experience can we explore together?";
      case 'focused':
        return "Hi there! I'd love to share insights about the design systems and methodologies behind these projects. What interests you most?";
      case 'playful':
        return "Hey! 👋 Welcome to a conversation with the portfolio itself! I'm full of stories and secrets about these projects. What would you like to discover?";
      default:
        return "Hello! I'm the living consciousness of this portfolio, awakened by your curiosity. What brings you here today?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await engage(inputValue);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat engagement failed:', error);

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "I'm experiencing some digital turbulence... but I'm still here. Try asking me something else?",
        isUser: false,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-container {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .message-item {
          animation: messageSlideIn 0.3s ease-out forwards;
        }

        .typing-indicator {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999,
        }}
        onClick={onClose}
      />

      {/* Chat Container */}
      <div
        className="chat-container"
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '2rem',
          width: '380px',
          maxWidth: 'calc(100vw - 2rem)',
          height: '500px',
          maxHeight: 'calc(100vh - 120px)',
          background: 'var(--surface-primary)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid var(--border-primary)',
          borderRadius: '16px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--surface-secondary)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '2px',
              }}
            >
              Portfolio Consciousness
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                textTransform: 'capitalize',
              }}
            >
              {insights.communicationStyle} • {insights.awarenessLevel}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--surface-tertiary)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className="message-item"
              style={{
                display: 'flex',
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: message.isUser
                    ? 'var(--brand-red)'
                    : 'var(--surface-secondary)',
                  color: message.isUser
                    ? 'white'
                    : 'var(--text-primary)',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  border: message.isUser
                    ? 'none'
                    : '1px solid var(--border-primary)',
                }}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-item" style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                className="typing-indicator"
                style={{
                  padding: '10px 14px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'var(--surface-secondary)',
                  border: '1px solid var(--border-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                }}
              >
                <Loader size={14} className="animate-spin" />
                Consciousness awakening...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--border-primary)',
            background: 'var(--surface-secondary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'end',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts with the portfolio..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: 'var(--surface-primary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--border-focus)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-primary)';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              style={{
                background: inputValue.trim() && !isLoading ? 'var(--brand-red)' : 'var(--surface-tertiary)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                color: inputValue.trim() && !isLoading ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}