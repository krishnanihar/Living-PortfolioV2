'use client';

import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronDown,
  Mail,
  Compass,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  Linkedin,
  Github,
  MessageCircle,
  Palette,
  Code,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { Chatbot } from '@/components/Chatbot';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// View types
type HeroView = 'default' | 'contact' | 'tour';

// Ultra-Liquid Glass Style - iOS 26 Inspired
const UNIFIED_GLASS = {
  background: 'var(--glass-03)',
  backdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(100px) saturate(220%) brightness(1.08)',
  border: '1px solid var(--text-10)',
  boxShadow: `
    0 12px 48px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.10),
    inset 0 1px 2px var(--glass-25),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15)
  `,
};

// Contact methods data
const contactMethods = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    subtitle: 'hello@nihar.design',
    href: 'mailto:hello@nihar.design',
    color: '#3B82F6',
    isExternal: false
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    title: 'LinkedIn',
    subtitle: 'Connect professionally',
    href: 'https://linkedin.com/in/krishnanihar',
    color: '#8B5CF6',
    isExternal: true
  },
  {
    id: 'github',
    icon: Github,
    title: 'GitHub',
    subtitle: 'View my code',
    href: 'https://github.com/krishnanihar',
    color: '#EC4899',
    isExternal: true
  },
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Chat',
    subtitle: 'Talk to my AI',
    href: null,
    color: '#8B5CF6',
    isChat: true
  },
];

// Tour steps data
const tourSteps = [
  {
    id: 'journey',
    title: 'My Journey',
    description: 'From design to code to AI',
    milestones: [
      { year: '2019', label: 'Design', icon: Palette, color: '#EC4899' },
      { year: '2021', label: 'Code', icon: Code, color: '#3B82F6' },
      { year: '2024', label: 'AI', icon: Sparkles, color: '#8B5CF6' },
    ],
  },
  {
    id: 'work',
    title: 'Featured Work',
    description: 'Products used by millions',
    projects: [
      { id: 'air-india', name: 'Air India', role: 'Design System', color: '#DA0E29' },
      { id: 'psoriassist', name: 'PsoriAssist', role: 'AI Healthcare', color: '#10B981' },
    ],
  },
  {
    id: 'connect',
    title: "Let's Connect",
    description: 'Start a conversation',
    ctas: [
      { id: 'contact', label: 'Get in Touch', icon: Mail },
      { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    ],
  },
];

interface ConceptHeroProps {
  scrollProgress?: number;
}

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { icon: 'sun', opener: 'Good morning', message: "I'm Nihar.", secondary: 'Welcome.' };
  } else if (hour >= 12 && hour < 17) {
    return { icon: 'sun', opener: 'Good afternoon', message: "I'm Nihar.", secondary: 'Welcome.' };
  } else if (hour >= 17 && hour < 21) {
    return { icon: 'moon', opener: 'Good evening', message: "I'm Nihar.", secondary: 'Welcome.' };
  } else {
    return { icon: 'sparkles', opener: 'Hello, night owl', message: "I'm Nihar.", secondary: 'Welcome.' };
  }
}

export default function ConceptHero({ scrollProgress = 0 }: ConceptHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();

  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'tour' | null>(null);
  const [greeting] = useState(getGreeting);

  // Multi-view state
  const [activeView, setActiveView] = useState<HeroView>('default');
  const [tourStep, setTourStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [viewTransition, setViewTransition] = useState(false);

  // Switch view with transition
  const switchView = useCallback((newView: HeroView) => {
    setViewTransition(true);
    setTimeout(() => {
      setActiveView(newView);
      if (newView === 'tour') setTourStep(0);
      setTimeout(() => setViewTransition(false), 50);
    }, 200);
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeView !== 'default') {
        switchView('default');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, switchView]);

  useEffect(() => {
    setMounted(true);
    // Staggered animation stages
    const stages = [1, 2, 3];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    // Create the shrink animation
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom 60%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = gsap.parseEase('power2.out')(progress);

        // Animate padding: 0 -> 48px (left/right)
        const padding = easedProgress * 48;
        container.style.paddingLeft = `${padding}px`;
        container.style.paddingRight = `${padding}px`;

        // Animate border-radius: 0 -> 32px
        const radius = easedProgress * 32;
        inner.style.borderRadius = `${radius}px`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleScrollToNext = () => {
    scrollTo('#philosophy-section', { offset: -60, duration: 1.5 });
  };

  const renderGreetingIcon = () => {
    const iconProps = { size: 16, style: { opacity: 0.8 } };
    switch (greeting.icon) {
      case 'sun': return <Sun {...iconProps} />;
      case 'moon': return <Moon {...iconProps} />;
      case 'sparkles': return <Sparkles {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  // Contact View Component
  const ContactView = () => (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative',
        opacity: viewTransition ? 0 : 1,
        transform: viewTransition ? 'scale(0.98)' : 'scale(1)',
        filter: viewTransition ? 'blur(8px)' : 'blur(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => switchView('default')}
        style={{
          position: 'absolute',
          top: '-3rem',
          left: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-60)',
          fontSize: '0.875rem',
          fontWeight: 400,
          cursor: 'pointer',
          padding: '0.5rem',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-95)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-60)')}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Heading */}
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 300,
          color: 'var(--text-95)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-space-grotesk)',
          textAlign: 'center',
        }}
      >
        Let's Connect
      </h2>
      <p
        style={{
          fontSize: '0.9375rem',
          color: 'var(--text-50)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Choose your preferred way to reach me
      </p>

      {/* Contact Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
      >
        {contactMethods.map((method) => {
          const Icon = method.icon;
          const isHovered = hoveredCard === method.id;

          const cardContent = (
            <div
              onMouseEnter={() => setHoveredCard(method.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={method.isChat ? () => setChatOpen(true) : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem 1rem',
                background: isHovered ? 'var(--glass-08)' : 'var(--glass-04)',
                backdropFilter: mounted ? 'blur(40px) saturate(150%)' : 'none',
                WebkitBackdropFilter: mounted ? 'blur(40px) saturate(150%)' : 'none',
                border: `1px solid ${isHovered ? `${method.color}30` : 'var(--text-08)'}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${method.color}20`
                  : '0 4px 16px rgba(0,0,0,0.1)',
                textDecoration: 'none',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${method.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <Icon size={22} style={{ color: method.color }} />
              </div>

              {/* Title */}
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--text-95)',
                  marginBottom: '0.25rem',
                }}
              >
                {method.title}
              </span>

              {/* Subtitle */}
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-45)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {method.subtitle}
                {method.isExternal && <ExternalLink size={10} />}
              </span>
            </div>
          );

          if (method.isChat) {
            return <div key={method.id}>{cardContent}</div>;
          }

          return (
            <Link
              key={method.id}
              href={method.href || '#'}
              target={method.isExternal ? '_blank' : undefined}
              rel={method.isExternal ? 'noopener noreferrer' : undefined}
              style={{ textDecoration: 'none' }}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );

  // Tour View Component
  const TourView = () => {
    const currentStep = tourSteps[tourStep];
    const isLastStep = tourStep === tourSteps.length - 1;

    return (
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 1.5rem',
          position: 'relative',
          opacity: viewTransition ? 0 : 1,
          transform: viewTransition ? 'scale(0.98)' : 'scale(1)',
          filter: viewTransition ? 'blur(8px)' : 'blur(0)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => switchView('default')}
          style={{
            position: 'absolute',
            top: '-3rem',
            left: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-60)',
            fontSize: '0.875rem',
            fontWeight: 400,
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-95)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-60)')}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Step Content */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 300,
              color: 'var(--text-95)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            {currentStep.title}
          </h2>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-50)',
            }}
          >
            {currentStep.description}
          </p>
        </div>

        {/* Step-specific content */}
        <div style={{ marginBottom: '2rem' }}>
          {/* Journey Step - Timeline */}
          {currentStep.id === 'journey' && currentStep.milestones && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'var(--glass-04)',
                backdropFilter: mounted ? 'blur(40px)' : 'none',
                borderRadius: '20px',
                border: '1px solid var(--text-08)',
              }}
            >
              {currentStep.milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={milestone.year} style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '16px',
                          background: `${milestone.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={24} style={{ color: milestone.color }} />
                      </div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-85)' }}>
                        {milestone.label}
                      </span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-40)' }}>
                        {milestone.year}
                      </span>
                    </div>
                    {index < currentStep.milestones!.length - 1 && (
                      <div
                        style={{
                          width: '40px',
                          height: '2px',
                          background: 'var(--text-15)',
                          marginLeft: '1rem',
                          marginRight: '0rem',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Work Step - Project Cards */}
          {currentStep.id === 'work' && currentStep.projects && (
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              {currentStep.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/work/${project.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem 2rem',
                    background: 'var(--glass-04)',
                    backdropFilter: mounted ? 'blur(40px)' : 'none',
                    borderRadius: '16px',
                    border: '1px solid var(--text-08)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = `${project.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--text-08)';
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${project.color}20`,
                      marginBottom: '0.75rem',
                    }}
                  />
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-95)' }}>
                    {project.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-45)' }}>
                    {project.role}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Connect Step - CTA Buttons */}
          {currentStep.id === 'connect' && currentStep.ctas && (
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              {currentStep.ctas.map((cta) => {
                const Icon = cta.icon;
                return (
                  <button
                    key={cta.id}
                    onClick={() => {
                      if (cta.id === 'contact') switchView('contact');
                      if (cta.id === 'linkedin') window.open('https://linkedin.com/in/krishnanihar', '_blank');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1rem 1.5rem',
                      background: 'var(--glass-06)',
                      backdropFilter: mounted ? 'blur(40px)' : 'none',
                      borderRadius: '14px',
                      border: '1px solid var(--text-10)',
                      color: 'var(--text-95)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'var(--glass-10)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'var(--glass-06)';
                    }}
                  >
                    <Icon size={16} />
                    {cta.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step Dots & Navigation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Step Dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setTourStep(index)}
                style={{
                  width: tourStep === index ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: tourStep === index ? 'var(--text-60)' : 'var(--text-20)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Next/Done Button */}
          <button
            onClick={() => {
              if (isLastStep) {
                switchView('default');
              } else {
                setTourStep((prev) => prev + 1);
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--glass-08)',
              backdropFilter: mounted ? 'blur(40px)' : 'none',
              borderRadius: '12px',
              border: '1px solid var(--text-12)',
              color: 'var(--text-95)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-08)';
            }}
          >
            {isLastStep ? 'Done' : 'Next'}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  };

  // Default View Component (original hero content)
  const DefaultView = () => (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
        padding: '0 clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        zIndex: 10,
        opacity: viewTransition ? 0 : 1,
        transform: viewTransition ? 'scale(0.98)' : 'scale(1)',
        filter: viewTransition ? 'blur(8px)' : 'blur(0)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Opener Greeting - Small, Subtle with Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          fontWeight: 300,
          color: 'var(--text-60)',
          letterSpacing: '0.02em',
          marginBottom: '0.5rem',
          opacity: animationStage >= 1 ? 1 : 0,
          transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
          filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {renderGreetingIcon()}
        <span>{greeting.opener}</span>
      </div>

      {/* Main Greeting Message */}
      <h1
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          fontWeight: 200,
          lineHeight: 1.3,
          letterSpacing: '0.02em',
          marginBottom: '0.75rem',
          color: 'var(--text-95)',
          position: 'relative',
          opacity: animationStage >= 1 ? 1 : 0,
          transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(20px)',
          filter: animationStage >= 1 ? 'blur(0)' : 'blur(12px)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'var(--font-space-grotesk)',
        }}
      >
        <span
          style={{
            position: 'relative',
            background: `linear-gradient(120deg,
              rgba(59, 130, 246, 0.15),
              rgba(139, 92, 246, 0.15),
              rgba(236, 72, 153, 0.15),
              rgba(139, 92, 246, 0.15),
              rgba(59, 130, 246, 0.15))`,
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            animation: 'gradientFlow 20s ease-in-out infinite',
          }}
        >
          {greeting.message}
        </span>
      </h1>

      {/* Secondary Message */}
      <div
        style={{
          fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
          fontWeight: 300,
          color: 'var(--text-60)',
          letterSpacing: '0.01em',
          marginBottom: '1.5rem',
          opacity: animationStage >= 1 ? 1 : 0,
          transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(15px)',
          filter: animationStage >= 1 ? 'blur(0)' : 'blur(8px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
        }}
      >
        {greeting.secondary}
      </div>

      {/* Subtitle */}
      <div
        style={{
          maxWidth: '650px',
          margin: '0 auto',
          marginBottom: '2.5rem',
          opacity: animationStage >= 2 ? 1 : 0,
          transform: animationStage >= 2 ? 'translateY(0)' : 'translateY(20px)',
          filter: animationStage >= 2 ? 'blur(0)' : 'blur(10px)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(0.9375rem, 1.75vw, 1.125rem)',
            fontWeight: 300,
            color: 'var(--text-65)',
            letterSpacing: '0.01em',
            lineHeight: 1.6,
          }}
        >
          Designing experiences that millions interact with daily, from 30,000ft to healthcare
        </p>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 2.5vw, 2rem)',
          flexWrap: 'wrap',
          opacity: animationStage >= 3 ? 1 : 0,
          transform: animationStage >= 3 ? 'translateY(0)' : 'translateY(15px)',
          filter: animationStage >= 3 ? 'blur(0)' : 'blur(8px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}
      >
        {/* Contact Button */}
        <button
          onClick={() => switchView('contact')}
          onMouseEnter={() => setHoveredButton('contact')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '13px 26px',
            ...UNIFIED_GLASS,
            background: hoveredButton === 'contact'
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.04), rgba(139, 92, 246, 0.03))'
              : 'linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(139, 92, 246, 0.02))',
            borderColor: hoveredButton === 'contact' ? 'rgba(236, 72, 153, 0.12)' : 'rgba(236, 72, 153, 0.08)',
            borderRadius: '20px',
            color: 'var(--text-95)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hoveredButton === 'contact' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg,
                rgba(236, 72, 153, 0.08) 0%,
                transparent 40%,
                transparent 60%,
                rgba(139, 92, 246, 0.05) 100%)`,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              opacity: hoveredButton === 'contact' ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
          />
          <Mail size={15} style={{ position: 'relative', zIndex: 1 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
        </button>

        {/* Quick Tour Button */}
        <button
          onClick={() => switchView('tour')}
          onMouseEnter={() => setHoveredButton('tour')}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '13px 26px',
            ...UNIFIED_GLASS,
            background: hoveredButton === 'tour'
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(236, 72, 153, 0.04))'
              : 'linear-gradient(135deg, rgba(139, 92, 246, 0.04), rgba(236, 72, 153, 0.02))',
            borderColor: hoveredButton === 'tour' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)',
            borderRadius: '20px',
            color: 'var(--text-95)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hoveredButton === 'tour' ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg,
                rgba(139, 92, 246, 0.08) 0%,
                transparent 40%,
                transparent 60%,
                rgba(236, 72, 153, 0.05) 100%)`,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              opacity: hoveredButton === 'tour' ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
          />
          <Compass size={15} style={{ position: 'relative', zIndex: 1 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>Quick Tour</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes particleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.1); }
          33% { text-shadow: 0 0 30px rgba(59, 130, 246, 0.15); }
          66% { text-shadow: 0 0 25px rgba(236, 72, 153, 0.12); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      <section
        ref={containerRef}
        style={{
          height: '100dvh',
          position: 'relative',
          padding: 0,
          willChange: 'padding',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 0,
            willChange: 'border-radius',
            background: 'var(--glass-03)',
            backdropFilter: 'blur(60px) saturate(180%)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Gradient overlay for depth */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(
                  ellipse 80% 50% at 50% 0%,
                  var(--glass-08) 0%,
                  transparent 50%
                ),
                radial-gradient(
                  ellipse 60% 40% at 80% 100%,
                  var(--glass-05) 0%,
                  transparent 40%
                )
              `,
              pointerEvents: 'none',
            }}
          />

          {/* View-based Content */}
          {activeView === 'default' && <DefaultView />}
          {activeView === 'contact' && <ContactView />}
          {activeView === 'tour' && <TourView />}

          {/* Scroll indicator - only show in default view */}
          {activeView === 'default' && (
            <button
              onClick={handleScrollToNext}
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: 1 - scrollProgress * 3,
                transition: 'opacity 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <span
                style={{
                  color: 'var(--text-40)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Scroll
              </span>
              <ChevronDown
                size={20}
                style={{
                  color: 'var(--text-40)',
                  animation: 'scrollBounce 2s ease-in-out infinite',
                }}
              />
            </button>
          )}
        </div>
      </section>

      {/* Chatbot Modal */}
      {chatOpen && (
        <Chatbot
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          intentContext="collaboration"
          initialMessage=""
        />
      )}
    </>
  );
}
