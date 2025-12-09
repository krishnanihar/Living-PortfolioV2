'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Mic, MicOff, RotateCcw, Plane, Briefcase, MessageCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { usePersonalization } from '@/hooks/usePersonalization';
import { PersonalizationPrompt } from '@/components/ui/PersonalizationPrompt';
import type { VisitorIntent } from '@/lib/personalization/types';
import type { SpeechRecognitionEvent } from '@/types/speech-recognition';

// Define recognition type for the ref
interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

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

// Storage key for message persistence
const STORAGE_KEY = 'chatbot_history';
const STORAGE_EXPIRY_HOURS = 24;

// Sound generation using Web Audio API
const createAudioContext = () => {
  if (typeof window !== 'undefined') {
    return new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return null;
};

const playSound = (type: 'send' | 'receive') => {
  // Check for reduced motion preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const audioContext = createAudioContext();
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (type === 'send') {
    // Soft whoosh - rising tone
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } else {
    // Gentle pop - descending tone
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.08);
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.12);
  }
};

// Typing indicator component with animated dots
const TypingIndicator = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-start',
    opacity: 0,
    animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  }}>
    <div style={{
      padding: '0.875rem 1.125rem',
      borderRadius: '18px 18px 18px 4px',
      background: 'var(--glass-05)',
      border: '1px solid var(--glass-08)',
      backdropFilter: 'blur(20px) brightness(0.9)',
      WebkitBackdropFilter: 'blur(20px) brightness(0.9)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(218, 14, 41, 0.7)',
            animation: `typingBounce 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
    <style jsx>{`
      @keyframes typingBounce {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-8px);
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

// Quick prompts based on intent
const getQuickPrompts = (intent: string): { text: string; icon?: React.ReactNode }[] => {
  const basePrompts = [
    { text: 'Tell me about Air India project', icon: <Plane size={12} /> },
    { text: 'What are your key skills?', icon: <Briefcase size={12} /> },
    { text: 'How can I contact you?', icon: <MessageCircle size={12} /> },
  ];

  switch (intent) {
    case 'hiring':
      return [
        { text: 'Walk me through your design process' },
        { text: 'What makes you unique as a designer?' },
        { text: 'Tell me about your Air India work' },
      ];
    case 'inspiration':
      return [
        { text: 'What inspires your designs?' },
        { text: 'Tell me a story behind a project' },
        { text: 'What\'s your creative philosophy?' },
      ];
    case 'learning':
      return [
        { text: 'How did you learn design systems?' },
        { text: 'What tools do you recommend?' },
        { text: 'Tips for aspiring designers?' },
      ];
    case 'collaboration':
      return [
        { text: 'What services do you offer?' },
        { text: 'How do you approach new projects?' },
        { text: 'What\'s your availability?' },
      ];
    default:
      return basePrompts;
  }
};

// Quick action buttons
const QuickActions = ({ onAction }: { onAction: (action: string) => void }) => (
  <div style={{
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  }}>
    {[
      { label: 'Projects', action: 'Show me your featured projects' },
      { label: 'Air India', action: 'Tell me about the Air India project' },
      { label: 'Contact', action: 'How can I get in touch with you?' },
    ].map((item) => (
      <button
        key={item.label}
        onClick={() => onAction(item.action)}
        style={{
          fontSize: '0.7rem',
          fontWeight: '500',
          color: 'var(--text-60)',
          background: 'var(--glass-05)',
          border: '1px solid var(--glass-10)',
          borderRadius: '12px',
          padding: '0.35rem 0.75rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(218, 14, 41, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.3)';
          e.currentTarget.style.color = 'var(--text-90)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--glass-05)';
          e.currentTarget.style.borderColor = 'var(--glass-10)';
          e.currentTarget.style.color = 'var(--text-60)';
        }}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export function Chatbot({ isOpen, onClose, initialMessage, intentContext }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntentPrompt, setShowIntentPrompt] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Get personalization state
  const { state } = usePersonalization();
  const storedIntent = state.schema.visitor.intent;
  const intentDeclined = state.schema.visitor.intentDeclined;

  // Effective intent: prop takes priority, then stored, then 'general'
  const effectiveIntent = intentContext || storedIntent || 'general';

  // Check for Web Speech API support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognitionAPI);
    }
  }, []);

  // Load messages from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isOpen) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const { messages: storedMessages, timestamp, intent } = JSON.parse(stored);
          const hoursSinceStored = (Date.now() - timestamp) / (1000 * 60 * 60);

          // Check if messages are from same intent and not expired
          if (hoursSinceStored < STORAGE_EXPIRY_HOURS && intent === effectiveIntent && storedMessages.length > 0) {
            setMessages(storedMessages);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
  }, [isOpen, effectiveIntent]);

  // Save messages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          messages,
          timestamp: Date.now(),
          intent: effectiveIntent,
        }));
      } catch (e) {
        console.error('Failed to save chat history:', e);
      }
    }
  }, [messages, effectiveIntent]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens (and not showing intent prompt)
  useEffect(() => {
    if (isOpen && inputRef.current && !showIntentPrompt) {
      inputRef.current.focus();
    }
  }, [isOpen, showIntentPrompt]);

  // Check if we should show intent prompt when chat opens
  useEffect(() => {
    if (isOpen && !storedIntent && !intentDeclined && !intentContext) {
      setShowIntentPrompt(true);
    } else if (isOpen) {
      setShowIntentPrompt(false);
    }
  }, [isOpen, storedIntent, intentDeclined, intentContext]);

  // Handle intent selection from prompt
  const handleIntentComplete = (intent: NonNullable<VisitorIntent> | null) => {
    setShowIntentPrompt(false);
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Send initial message when chat opens
  useEffect(() => {
    if (isOpen && initialMessage && messages.length === 0) {
      handleSendMessage(initialMessage);
    }
  }, [isOpen, initialMessage]);

  // Add greeting when chat first opens (after intent prompt is dismissed)
  useEffect(() => {
    if (isOpen && messages.length === 0 && !initialMessage && !showIntentPrompt) {
      const greeting = getGreeting(effectiveIntent);
      setMessages([{
        id: 'greeting',
        content: greeting,
        isUser: false,
        timestamp: Date.now(),
      }]);
    }
  }, [isOpen, effectiveIntent, showIntentPrompt]);

  const getGreeting = (intent?: string): string => {
    switch (intent) {
      case 'hiring':
        return "Hello! I'd love to share insights about the **design systems** and methodologies behind these projects. What interests you most?";
      case 'inspiration':
        return "Hey! 👋 Welcome to a conversation with the portfolio itself! I'm full of *stories and secrets* about these projects. What would you like to discover?";
      case 'learning':
        return "Hello, fellow learner. What questions about **design**, **technology**, or the creative process can we explore together?";
      case 'collaboration':
        return "Hi there! Excited to discuss potential collaborations. What kind of project do you have in mind?";
      default:
        return "Hello! I'm your AI assistant, here to help you explore **Nihar's portfolio**. What would you like to know?";
    }
  };

  // Voice input handling
  const startListening = useCallback(() => {
    if (!speechSupported) return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI() as unknown as SpeechRecognitionInstance;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [speechSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    // Play send sound
    playSound('send');

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
          context: effectiveIntent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Play receive sound
      playSound('receive');

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

  const handleClearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    // Add fresh greeting
    const greeting = getGreeting(effectiveIntent);
    setMessages([{
      id: 'greeting',
      content: greeting,
      isUser: false,
      timestamp: Date.now(),
    }]);
  };

  const quickPrompts = getQuickPrompts(effectiveIntent);
  const showQuickPrompts = messages.length <= 1 && !isLoading;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--overlay-30)',
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
        width: 'min(420px, calc(100vw - 4rem))',
        height: 'min(650px, calc(100vh - 4rem))',
        zIndex: 9999,
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}>
        {/* Glass Card */}
        <div style={{
          height: '100%',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--solid-15) 0%, var(--solid-10) 100%)',
          backdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(140px) saturate(120%) brightness(1.05)',
          border: '1px solid var(--glass-06)',
          boxShadow: `
            inset 0 1px 0 var(--glass-05),
            inset 0 -1px 0 var(--overlay-20),
            0 16px 32px var(--overlay-40),
            0 0 60px rgba(218, 14, 41, 0.05)
          `,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: showIntentPrompt ? 'none' : '1px solid var(--glass-08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isLoading ? 'rgba(218, 14, 41, 0.8)' : 'rgba(16, 185, 129, 0.8)',
                boxShadow: isLoading ? '0 0 8px rgba(218, 14, 41, 0.6)' : '0 0 8px rgba(16, 185, 129, 0.6)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <div>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em',
                }}>
                  {showIntentPrompt ? 'Welcome!' : 'Portfolio Assistant'}
                </h3>
                <p style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  fontWeight: '300',
                }}>
                  {showIntentPrompt ? 'Let me personalize your experience' : 'AI-powered by Gemini'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {!showIntentPrompt && messages.length > 1 && (
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--glass-05)',
                    border: '1px solid var(--glass-10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--glass-10)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--glass-05)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <RotateCcw size={12} />
                </button>
              )}
              <button
                onClick={onClose}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--glass-05)',
                  border: '1px solid var(--glass-10)',
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
                  e.currentTarget.style.background = 'var(--glass-05)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'rotate(0)';
                }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Intent Prompt or Chat Content */}
          {showIntentPrompt ? (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}>
              <PersonalizationPrompt
                variant="embedded"
                forceShow={true}
                onComplete={handleIntentComplete}
              />
            </div>
          ) : (
            <>
              {/* Quick Actions */}
              {!showIntentPrompt && (
                <div style={{ padding: '0.75rem 1.5rem 0' }}>
                  <QuickActions onAction={handleSendMessage} />
                </div>
              )}

              {/* Messages */}
              <div
                data-lenis-prevent
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  padding: '1rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.875rem',
                }}
              >
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                      opacity: 0,
                      animation: `messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s forwards`,
                    }}
                  >
                    <div style={{
                      maxWidth: '85%',
                      padding: '0.75rem 1rem',
                      borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: message.isUser
                        ? 'linear-gradient(135deg, rgba(218, 14, 41, 0.3) 0%, rgba(218, 14, 41, 0.2) 100%)'
                        : 'var(--glass-08)',
                      border: message.isUser
                        ? '1px solid rgba(218, 14, 41, 0.4)'
                        : '1px solid var(--glass-08)',
                      backdropFilter: 'blur(20px) saturate(120%) brightness(0.95)',
                      WebkitBackdropFilter: 'blur(20px) saturate(120%) brightness(0.95)',
                    }}>
                      {message.isUser ? (
                        <p style={{
                          fontSize: '0.8125rem',
                          color: 'var(--text-primary)',
                          fontWeight: '300',
                          lineHeight: '1.5',
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}>
                          {message.content}
                        </p>
                      ) : (
                        <div className="markdown-content" style={{
                          fontSize: '0.8125rem',
                          color: 'var(--text-primary)',
                          fontWeight: '300',
                          lineHeight: '1.6',
                        }}>
                          <Markdown
                            components={{
                              p: ({ children }) => <p style={{ margin: '0 0 0.5rem 0' }}>{children}</p>,
                              strong: ({ children }) => <strong style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{children}</strong>,
                              em: ({ children }) => <em style={{ fontStyle: 'italic', color: 'var(--text-90)' }}>{children}</em>,
                              code: ({ children }) => (
                                <code style={{
                                  background: 'var(--glass-10)',
                                  padding: '0.125rem 0.375rem',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontFamily: 'monospace',
                                }}>
                                  {children}
                                </code>
                              ),
                              ul: ({ children }) => <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>{children}</ul>,
                              ol: ({ children }) => <ol style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>{children}</ol>,
                              li: ({ children }) => <li style={{ marginBottom: '0.25rem' }}>{children}</li>,
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: 'rgba(218, 14, 41, 0.9)', textDecoration: 'underline' }}
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.content}
                          </Markdown>
                        </div>
                      )}
                      <div style={{
                        fontSize: '0.625rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.375rem',
                        opacity: 0.7,
                      }}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Prompts */}
                {showQuickPrompts && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                  }}>
                    <p style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      fontWeight: '400',
                    }}>
                      Try asking:
                    </p>
                    {quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(prompt.text)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.625rem 0.875rem',
                          background: 'var(--glass-05)',
                          border: '1px solid var(--glass-10)',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          color: 'var(--text-70)',
                          fontSize: '0.75rem',
                          fontWeight: '400',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(218, 14, 41, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.2)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--glass-05)';
                          e.currentTarget.style.borderColor = 'var(--glass-10)';
                          e.currentTarget.style.color = 'var(--text-70)';
                        }}
                      >
                        {prompt.icon && <span style={{ opacity: 0.7 }}>{prompt.icon}</span>}
                        {prompt.text}
                      </button>
                    ))}
                  </div>
                )}

                {/* Typing Indicator */}
                {isLoading && <TypingIndicator />}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{
                padding: '1rem 1.5rem 1.25rem',
                borderTop: '1px solid var(--glass-08)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--glass-05)',
                  backdropFilter: 'blur(20px) saturate(120%) brightness(0.9)',
                  WebkitBackdropFilter: 'blur(20px) saturate(120%) brightness(0.9)',
                  border: '1px solid var(--glass-08)',
                  borderRadius: '20px',
                  padding: '0.5rem 0.75rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(218, 14, 41, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid var(--glass-08)';
                }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={isListening ? 'Listening...' : 'Ask me anything...'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || isListening}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.8125rem',
                      fontWeight: '300',
                      letterSpacing: '0.01em',
                    }}
                  />

                  {/* Voice Input Button */}
                  {speechSupported && (
                    <button
                      onClick={isListening ? stopListening : startListening}
                      disabled={isLoading}
                      title={isListening ? 'Stop listening' : 'Voice input'}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isListening ? 'rgba(218, 14, 41, 0.3)' : 'var(--glass-05)',
                        border: isListening ? '1px solid rgba(218, 14, 41, 0.5)' : '1px solid var(--glass-10)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        color: isListening ? 'rgba(218, 14, 41, 0.9)' : 'var(--text-muted)',
                        animation: isListening ? 'pulse 1s ease-in-out infinite' : 'none',
                      }}
                    >
                      {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    </button>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: (inputValue.trim() && !isLoading) ? 'rgba(218, 14, 41, 0.3)' : 'var(--glass-05)',
                      border: (inputValue.trim() && !isLoading) ? '1px solid rgba(218, 14, 41, 0.5)' : '1px solid var(--glass-10)',
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
                    <Send size={12} />
                  </button>
                </div>
                <div style={{
                  fontSize: '0.625rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.5rem',
                  textAlign: 'center',
                  opacity: 0.6,
                }}>
                  Enter to send • ESC to close {speechSupported && '• Mic for voice'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes typingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .markdown-content p:last-child {
          margin-bottom: 0 !important;
        }
      `}</style>
    </>
  );
}
