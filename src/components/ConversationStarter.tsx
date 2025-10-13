'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Sparkles, ArrowLeft, Briefcase, BookOpen, Users, Map, User } from 'lucide-react';
import { projects } from '@/data/projects';

interface Intent {
  id: 'hiring' | 'inspiration' | 'learning' | 'collaboration';
  label: string;
  icon: React.ElementType;
  accentColor: string;
  description: string;
  ctaText: string;
  featuredProjects?: string[];
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
  const [isClient, setIsClient] = useState(false);
  const [heroText, setHeroText] = useState('Hi, welcome to my site');
  const [gradientPhase, setGradientPhase] = useState(0); // 0 = red phase, 1 = blue phase

  // Prevent hydration mismatch by only rendering time-based content on client
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Animated text transformation
  React.useEffect(() => {
    // After 1.5 seconds, change text
    const textTimer = setTimeout(() => {
      setHeroText('What brings you here today?');
    }, 1500);

    // Start gradient transition at 1.2s (slightly before text change)
    const gradientTimer = setTimeout(() => {
      setGradientPhase(1);
    }, 1200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(gradientTimer);
    };
  }, []);

  const intents: Intent[] = [
    {
      id: 'hiring',
      label: 'Hiring',
      icon: Briefcase,
      accentColor: '#3B82F6', // Professional blue
      ctaText: 'Discuss opportunity',
      featuredProjects: ['aviation-analytics', 'token-architecture', 'mobile-ux-patterns'],
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
      icon: Sparkles,
      accentColor: '#8B5CF6', // Creative purple
      ctaText: 'Explore ideas',
      featuredProjects: ['living-organism', 'metamorphic-fractal-reflections', 'latent-space'],
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
      icon: BookOpen,
      accentColor: '#10B981', // Growth green
      ctaText: 'Start learning',
      featuredProjects: ['pixel-radar', 'aviation-analytics', 'token-architecture'],
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
      icon: Users,
      accentColor: '#F59E0B', // Partnership orange
      ctaText: 'Let\'s collaborate',
      featuredProjects: ['internal-innovation-sprint', 'microsoft-air-india', 'living-organism'],
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

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
    const isLateNight = hour >= 22 || hour < 5;

    if (isLateNight) return 'Burning the midnight oil';
    if (hour < 12) return isWeekend ? 'Good morning, weekend warrior' : 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Working late';
  };

  const getHeroContent = () => {
    const greeting = isClient ? `${getTimeBasedGreeting()}.` : 'Welcome.';

    if (!selectedIntent) {
      return {
        greeting,
        title: heroText,
        subtitle: 'Choose your path to explore this living portfolio'
      };
    }

    const intent = intents.find(i => i.id === selectedIntent);
    return intent?.heroContent || {
      greeting,
      title: 'I build living interfaces',
      subtitle: 'Product & New Media Designer'
    };
  };

  const content = getHeroContent();
  const selectedIntentData = intents.find(i => i.id === selectedIntent);
  const accentColor = selectedIntentData?.accentColor || 'rgba(218, 14, 41, 0.7)';
  const SelectedIcon = selectedIntentData?.icon || Sparkles;

  const getPlaceholder = () => {
    if (!selectedIntent) return '';

    const placeholders: Record<string, string> = {
      'hiring': 'Tell me about your role or project...',
      'inspiration': 'What kind of experience are you dreaming up?...',
      'learning': 'What would you like to explore?...',
      'collaboration': 'What are we building together?...',
    };

    return placeholders[selectedIntent] || `Let's discuss ${selectedIntentData?.label.toLowerCase()}...`;
  };

  return (
    <div data-tour="conversation-starter" style={{ position: 'relative', zIndex: 1 }}>
      {/* Dynamic Hero Content */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.25rem, 2vw, 2rem)',
      }}>
        <div style={{
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          marginBottom: '0.875rem',
          letterSpacing: '0.025em',
          fontWeight: '200',
          opacity: 0,
          animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        }}>
          {content.greeting}
        </div>

        <h1
          className={
            !selectedIntent
              ? gradientPhase === 0
                ? "text-gradient-red"
                : "text-gradient-blue"
              : ""
          }
          style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
            fontWeight: '200',
            color: !selectedIntent ? 'transparent' : 'var(--text-primary)',
            marginBottom: selectedIntent ? '1rem' : 'clamp(1rem, 1.5vw, 1.75rem)',
            lineHeight: '1.3',
            letterSpacing: '-0.02em',
            position: 'relative',
            display: 'inline-block',
            opacity: 0,
            animation: heroText === 'What brings you here today?'
              ? 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both, textMorph 0.6s ease-in-out 1.4s both'
              : 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
            transition: 'margin-bottom 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.6s ease',
          }}
        >
          {content.title}

          {/* Dynamic Intent Icon - Hidden when selected */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-30px',
            opacity: 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}>
            {React.createElement(SelectedIcon, {
              size: 18,
              style: { color: accentColor }
            })}
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
          gap: '0.75rem',
          marginBottom: '1.75rem',
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
                padding: '1rem',
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
                marginBottom: '0.5rem',
                color: 'var(--text-secondary)',
              }}>
                {React.createElement(intent.icon, {
                  size: 20,
                  strokeWidth: 1.5
                })}
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
          {/* Input Field First */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(30px) brightness(0.8)',
            WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
            border: `1px solid ${accentColor}20`,
            borderRadius: '28px',
            padding: '0.875rem 1.25rem',
            transition: 'all 0.3s ease',
            marginBottom: '1.5rem',
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
              placeholder={getPlaceholder()}
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
                background: inputValue.trim() ? `${accentColor}40` : 'rgba(255, 255, 255, 0.05)',
                border: inputValue.trim() ? `1px solid ${accentColor}80` : '1px solid rgba(255, 255, 255, 0.1)',
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
                  e.currentTarget.style.background = `${accentColor}60`;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = inputValue.trim() ? `${accentColor}40` : 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Send size={14} />
              {selectedIntentData?.ctaText || 'Send'}
            </button>
          </div>

          {/* Navigation Links - Centered Below Input */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '0',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Back Button */}
            <button
              onClick={() => setSelectedIntent(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(30px) brightness(0.8)',
                WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
                border: `1px solid ${accentColor}15`,
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'var(--text-secondary)',
                fontSize: '0.825rem',
                fontWeight: '400',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = `1px solid ${accentColor}30`;
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.border = `1px solid ${accentColor}15`;
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <ArrowLeft size={14} />
              Choose different path
            </button>

            {/* View Work Link */}
            <Link
              href="/work"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(30px) brightness(0.8)',
                WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
                border: `1px solid ${accentColor}30`,
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                fontWeight: '400',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accentColor}20`;
                e.currentTarget.style.border = `1px solid ${accentColor}60`;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.border = `1px solid ${accentColor}30`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Briefcase size={14} />
              View Work
            </Link>

            {/* My Journey Link */}
            <Link
              href="/journey"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(30px) brightness(0.8)',
                WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
                border: `1px solid ${accentColor}30`,
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                fontWeight: '400',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accentColor}20`;
                e.currentTarget.style.border = `1px solid ${accentColor}60`;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.border = `1px solid ${accentColor}30`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Map size={14} />
              My Journey
            </Link>

            {/* About Me Link */}
            <Link
              href="/about"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(30px) brightness(0.8)',
                WebkitBackdropFilter: 'blur(30px) brightness(0.8)',
                border: `1px solid ${accentColor}30`,
                borderRadius: '20px',
                padding: '0.5rem 1rem',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                fontWeight: '400',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accentColor}20`;
                e.currentTarget.style.border = `1px solid ${accentColor}60`;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.border = `1px solid ${accentColor}30`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <User size={14} />
              About Me
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
