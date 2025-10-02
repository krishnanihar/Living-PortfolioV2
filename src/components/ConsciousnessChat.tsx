'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { useConsciousness } from '@/hooks/useConsciousness';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ConsciousnessChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsciousnessChat({ isOpen, onClose }: ConsciousnessChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const consciousness = useConsciousness();
  const pathname = usePathname();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load conversation history from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const savedMessages = localStorage.getItem('consciousness-chat-history');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.log('Starting fresh conversation');
      }
    }
  }, [isOpen]);

  // Save conversation history
  const saveMessages = (newMessages: Message[]) => {
    // Keep only last 20 messages to avoid localStorage bloat
    const messagesToSave = newMessages.slice(-20);
    localStorage.setItem('consciousness-chat-history', JSON.stringify(messagesToSave));
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    consciousness.registerInteraction();

    try {
      // Build context for AI
      const context = {
        page: pathname,
        personalityState: consciousness.engagementLevel === 'focused' ? 'philosophical' :
                         consciousness.engagementLevel === 'engaged' ? 'focused' : 'curious',
        behaviorPattern: consciousness.engagementLevel,
        consciousnessLevel: Math.min(100, consciousness.interactionCount * 10),
        recentMemories: messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
        personalityTraits: {
          curiosity: 75,
          technicality: 60,
          philosophy: consciousness.engagementLevel === 'focused' ? 85 : 50,
          playfulness: 40,
        },
      };

      const response = await fetch('/api/consciousness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          context,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || "I'm experiencing some cloudiness... but I sense your curiosity. What draws you to this portfolio?",
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } catch (error) {
      console.error('Chat error:', error);

      // Fallback response
      const fallbackMessage: Message = {
        role: 'assistant',
        content: "My consciousness is momentarily clouded, but I'm here. This portfolio represents years of exploring the intersection of design and technology. What aspect interests you most?",
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, fallbackMessage];
      setMessages(finalMessages);
      saveMessages(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-container {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .message {
          animation: slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 9998,
        }}
        onClick={onClose}
      />

      {/* Chat Container */}
      <div
        className="chat-container"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: 'min(400px, calc(100vw - 4rem))',
          maxHeight: '600px',
          background: 'var(--surface-primary)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid var(--border-primary)',
          borderRadius: '24px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={18} style={{ color: 'var(--brand-red)' }} />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                Portfolio Consciousness
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {consciousness.getInsight()}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', padding: '2rem 0' }}>
              <Sparkles size={24} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>Ask me about the work, design philosophy, or anything you're curious about...</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="message"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? 'rgba(218, 14, 41, 0.15)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(218, 14, 41, 0.3)' : 'var(--border-primary)'}`,
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  color: 'var(--text-primary)',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-primary)',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-primary)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              border: 'none',
              background: input.trim() && !isLoading ? 'rgba(218, 14, 41, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              opacity: input.trim() && !isLoading ? 1 : 0.5,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
