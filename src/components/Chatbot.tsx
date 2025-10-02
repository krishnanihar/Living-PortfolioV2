'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: number;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  intentContext?: string;
}

export function Chatbot({ isOpen, onClose, initialMessage, intentContext }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Send initial message when chat opens
  useEffect(() => {
    if (isOpen && initialMessage && messages.length === 0) {
      handleSendMessage(initialMessage);
    }
  }, [isOpen, initialMessage]);

  // Add greeting when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && !initialMessage) {
      const greeting = getGreeting(intentContext);
      setMessages([{
        id: 'greeting',
        content: greeting,
        isUser: false,
        timestamp: Date.now(),
      }]);
    }
  }, [isOpen, intentContext]);

  const getGreeting = (intent?: string): string => {
    switch (intent) {
      case 'hiring':
        return "Hello! I'd love to share insights about the design systems and methodologies behind these projects. What interests you most?";
      case 'inspiration':
        return "Hey! 👋 Welcome to a conversation with the portfolio itself! I'm full of stories and secrets about these projects. What would you like to discover?";
      case 'learning':
        return "Hello, fellow learner. What questions about design, technology, or the creative process can we explore together?";
      case 'collaboration':
        return "Hi there! Excited to discuss potential collaborations. What kind of project do you have in mind?";
      default:
        return "Hello! I'm your AI assistant, here to help you explore Nihar's portfolio. What would you like to know?";
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: textToSend,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          context: intentContext || 'general',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: data.message || data.response || "I'm here to help! Could you rephrase that?",
        isUser: false,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "I'm experiencing some technical difficulties, but I'm still here! Try asking me something else or check back in a moment.",
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
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          opacity: 0,
          animation: 'fadeIn 0.3s ease forwards',
        }}
      />

      {/* Chatbot Container */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: 'min(400px, calc(100vw - 4rem))',
        height: 'min(600px, calc(100vh - 4rem))',
        zIndex: 9999,
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}>
        {/* Glass Card */}
        <div style={{
          height: '100%',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
          backdropFilter: 'blur(60px) saturate(150%) brightness(0.85)',
          WebkitBackdropFilter: 'blur(60px) saturate(150%) brightness(0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            0 16px 32px rgba(0, 0, 0, 0.4),
            0 0 60px rgba(218, 14, 41, 0.05)
          `,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.8)',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <div>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em',
                }}>
                  Portfolio Assistant
                </h3>
                <p style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  fontWeight: '300',
                }}>
                  AI-powered by Gemini
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'var(--text-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(218, 14, 41, 0.2)';
                e.currentTarget.style.color = 'rgba(218, 14, 41, 0.9)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.transform = 'rotate(0)';
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  opacity: 0,
                  animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.875rem 1.125rem',
                  borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: message.isUser
                    ? 'linear-gradient(135deg, rgba(218, 14, 41, 0.3) 0%, rgba(218, 14, 41, 0.2) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: message.isUser
                    ? '1px solid rgba(218, 14, 41, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px) brightness(0.9)',
                  WebkitBackdropFilter: 'blur(20px) brightness(0.9)',
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    fontWeight: '300',
                    lineHeight: '1.5',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {message.content}
                  </p>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.5rem',
                    opacity: 0.7,
                  }}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                opacity: 0,
                animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}>
                <div style={{
                  padding: '0.875rem 1.125rem',
                  borderRadius: '18px 18px 18px 4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px) brightness(0.9)',
                  WebkitBackdropFilter: 'blur(20px) brightness(0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <Loader size={16} style={{
                    animation: 'spin 1s linear infinite',
                    color: 'rgba(218, 14, 41, 0.7)',
                  }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    fontWeight: '300',
                  }}>
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px) brightness(0.8)',
              WebkitBackdropFilter: 'blur(20px) brightness(0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '0.75rem 1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '1px solid rgba(218, 14, 41, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
            }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
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
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: (inputValue.trim() && !isLoading) ? 'rgba(218, 14, 41, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                  border: (inputValue.trim() && !isLoading) ? '1px solid rgba(218, 14, 41, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: (inputValue.trim() && !isLoading) ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  opacity: (inputValue.trim() && !isLoading) ? 1 : 0.5,
                  color: (inputValue.trim() && !isLoading) ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isLoading) {
                    e.currentTarget.style.background = 'rgba(218, 14, 41, 0.4)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputValue.trim() && !isLoading) {
                    e.currentTarget.style.background = 'rgba(218, 14, 41, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              marginTop: '0.75rem',
              textAlign: 'center',
              opacity: 0.6,
            }}>
              Press Enter to send • ESC to close
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
