'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Mail,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  Linkedin,
  Github,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Hand,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { usePersonalization } from '@/hooks/usePersonalization';
import { Chatbot } from '@/components/Chatbot';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
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
    subtitle: 'krishnanihar.s@gmail.com',
    href: 'mailto:krishnanihar.s@gmail.com',
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


interface ConceptHeroProps {
  scrollProgress?: number;
}

export default function ConceptHero({ scrollProgress = 0 }: ConceptHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenisScroll();

  // Personalization hook
  const { state: personalizationState } = usePersonalization();
  const { greeting, scrollMemory, isHydrated } = personalizationState;

  const [mounted, setMounted] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<'contact' | 'tour' | null>(null);
  const [showScrollPill, setShowScrollPill] = useState(true);
  const [scrollPillHovered, setScrollPillHovered] = useState(false);

  // Multi-view state
  const [activeView, setActiveView] = useState<HeroView>('default');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [viewTransition, setViewTransition] = useState(false);

  // Switch view with transition
  const switchView = useCallback((newView: HeroView) => {
    setViewTransition(true);
    setTimeout(() => {
      setActiveView(newView);
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
    // Staggered animation stages (4 = scroll memory pill)
    const stages = [1, 2, 3, 4];
    stages.forEach((stage, i) => {
      setTimeout(() => setAnimationStage(stage), i * 100);
    });
  }, []);

  // Shrinking animation on scroll - using useGSAP for proper cleanup
  useGSAP(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    // Initialize styles to prevent stale state from previous navigation
    gsap.set(container, { paddingLeft: 0, paddingRight: 0 });
    gsap.set(inner, { borderRadius: 0 });

    // Create the shrink animation with unique ID
    ScrollTrigger.create({
      id: 'home-hero-shrink', // Unique ID for this trigger
      trigger: container,
      start: 'top top',
      end: 'bottom 60%',
      scrub: 0.5,
      invalidateOnRefresh: true, // Recalculate on refresh
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = gsap.parseEase('power2.out')(progress);

        // Animate padding: 0 -> 48px (left/right)
        gsap.set(container, {
          paddingLeft: easedProgress * 48,
          paddingRight: easedProgress * 48,
        });

        // Animate border-radius: 0 -> 32px
        gsap.set(inner, { borderRadius: easedProgress * 32 });
      },
    });
  }, { scope: containerRef }); // Scoped cleanup

  const handleScrollToNext = () => {
    scrollTo('#philosophy-section', { offset: -60, duration: 1.5 });
  };

  const renderGreetingIcon = () => {
    const iconProps = { size: 16, style: { opacity: 0.8 } };
    switch (greeting.icon) {
      case 'hand': return <Hand {...iconProps} />;
      case 'sun': return <Sun {...iconProps} />;
      case 'moon': return <Moon {...iconProps} />;
      case 'sparkles': return <Sparkles {...iconProps} />;
      default: return <Sun {...iconProps} />;
    }
  };

  // Dismiss scroll memory pill
  const dismissScrollPill = useCallback(() => {
    setShowScrollPill(false);
  }, []);

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

      {/* Role Title - Professional Descriptor */}
      <div
        style={{
          fontSize: 'clamp(0.8125rem, 1.25vw, 0.9375rem)',
          fontWeight: 400,
          color: 'var(--text-50)',
          letterSpacing: '0.03em',
          marginBottom: '0.5rem',
          opacity: animationStage >= 1 ? 1 : 0,
          transform: animationStage >= 1 ? 'translateY(0)' : 'translateY(10px)',
          filter: animationStage >= 1 ? 'blur(0)' : 'blur(6px)',
          transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
          fontFamily: 'var(--font-dm-sans)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.25rem',
        }}
      >
        <span>Product & New Media Designer</span>
        <span style={{ color: 'var(--text-25)' }}>|</span>
        <span>Design Systems & Aviation UX</span>
        <span style={{ color: 'var(--text-25)' }}>|</span>
        <span>4 Years</span>
      </div>

      {/* Secondary Message - Only show if present (null for 8+ visits) */}
      {greeting.secondary && (
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
      )}

      {/* CTA Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 2.5vw, 2rem)',
          flexWrap: 'wrap',
          marginTop: '2rem',
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

        {/* Explore Button */}
        <button
          onClick={handleScrollToNext}
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
          <ChevronDown size={15} style={{ position: 'relative', zIndex: 1 }} />
          <span style={{ position: 'relative', zIndex: 1 }}>Explore</span>
        </button>
      </div>

      {/* Scroll Memory Pill - Shows if user has viewing history */}
      {isHydrated && scrollMemory.hasHistory && showScrollPill && scrollMemory.lastProjectName && (
        <div
          onMouseEnter={() => setScrollPillHovered(true)}
          onMouseLeave={() => setScrollPillHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
            padding: '10px 16px 10px 20px',
            ...UNIFIED_GLASS,
            background: scrollPillHovered
              ? 'var(--glass-08)'
              : 'var(--glass-04)',
            borderRadius: '24px',
            opacity: animationStage >= 4 ? 1 : 0,
            transform: animationStage >= 4 ? 'translateY(0)' : 'translateY(15px)',
            filter: animationStage >= 4 ? 'blur(0)' : 'blur(8px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, background 0.2s ease, transform 0.2s ease',
          }}
        >
          <Link
            href={`/work/${scrollMemory.lastProject}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-80)',
              fontSize: '0.8125rem',
              fontWeight: 400,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-95)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-80)')}
          >
            <span style={{ color: 'var(--text-50)' }}>Continue from</span>
            <span style={{ fontWeight: 500, color: 'var(--text-90)' }}>
              {scrollMemory.lastProjectName}
            </span>
            <ArrowRight size={14} style={{ opacity: 0.6 }} />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dismissScrollPill();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'var(--glass-08)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginLeft: '0.25rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-08)';
            }}
            aria-label="Dismiss"
          >
            <X size={12} style={{ color: 'var(--text-50)' }} />
          </button>
        </div>
      )}
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
