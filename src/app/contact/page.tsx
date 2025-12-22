'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle, type LucideIcon } from 'lucide-react';
import { PortfolioNavigation } from '@/components/ui/PortfolioNavigation';

// GlobalChatbot is now provided at layout level

// =============================================================================
// ANIMATION CONSTANTS
// =============================================================================
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { type: "spring" as const, stiffness: 400, damping: 25 };

// Contact method accent colors
const CONTACT_COLORS = {
  email: '#3B82F6',    // Blue
  linkedin: '#8B5CF6', // Purple
  github: '#EC4899',   // Pink
  chat: '#8B5CF6',     // Purple (gradient applied in component)
} as const;

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
};

// =============================================================================
// GLASSMORPHISM STYLES
// =============================================================================
const GLASS_CARD = {
  background: 'linear-gradient(135deg, var(--glass-08) 0%, var(--glass-04) 100%)',
  backdropFilter: 'blur(80px) saturate(180%)',
  WebkitBackdropFilter: 'blur(80px) saturate(180%)',
  border: '1px solid var(--text-06)',
  borderRadius: '24px',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 var(--text-08),
    inset 0 -1px 0 var(--glass-04)
  `,
};

// =============================================================================
// CONTACT METHOD DATA
// =============================================================================
const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    description: 'For detailed inquiries & collaborations',
    href: 'mailto:krishnaniharsunkara@gmail.com',
    color: CONTACT_COLORS.email,
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    title: 'LinkedIn',
    description: 'Professional network & updates',
    href: 'https://linkedin.com/in/krishnanihar',
    color: CONTACT_COLORS.linkedin,
    external: true,
  },
  {
    id: 'github',
    icon: Github,
    title: 'GitHub',
    description: 'Open source & code',
    href: 'https://github.com/krishnanihar',
    color: CONTACT_COLORS.github,
    external: true,
  },
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Chat',
    description: 'Quick conversation with AI assistant',
    color: CONTACT_COLORS.chat,
    isChat: true,
  },
];

// Conversation starters
const PROMPTS = [
  "I have a design project in mind...",
  "Looking to collaborate on...",
  "Interested in your design systems work...",
  "Let's discuss AI + design...",
];

// =============================================================================
// TYPES
// =============================================================================
interface ContactMethod {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  color: string;
  external?: boolean;
  isChat?: boolean;
}

// =============================================================================
// AVAILABILITY INDICATOR
// =============================================================================
function AvailabilityIndicator() {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.625rem 1.25rem',
        background: 'var(--glass-05)',
        border: '1px solid var(--text-06)',
        borderRadius: '20px',
        marginTop: '1.5rem',
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#10B981',
          boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      <span
        style={{
          fontSize: '0.875rem',
          fontWeight: '400',
          color: 'var(--text-60)',
          letterSpacing: '0.01em',
        }}
      >
        Typically responds within 24 hours
      </span>
    </motion.div>
  );
}

// =============================================================================
// CONTACT CARD COMPONENT
// =============================================================================
interface ContactCardProps {
  method: ContactMethod;
  index: number;
  onChatClick: () => void;
}

function ContactCard({ method, index, onChatClick }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const Icon = method.icon;

  // Mouse tracking for reflection
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (cardRef.current && !prefersReducedMotion) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
  }, [prefersReducedMotion]);

  const handleClick = () => {
    if (method.isChat) {
      onChatClick();
    }
  };

  const content = (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={SPRING_CONFIG}
      onClick={handleClick}
      style={{
        ...GLASS_CARD,
        position: 'relative',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        cursor: 'pointer',
        overflow: 'hidden',
        borderColor: isHovered ? `${method.color}40` : 'var(--text-06)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Mouse-tracking reflection layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(
            circle 300px at ${mousePos.x}% ${mousePos.y}%,
            ${method.color}15 0%,
            ${method.color}08 30%,
            transparent 60%
          )`,
          pointerEvents: 'none',
          zIndex: 0,
          borderRadius: 'inherit',
          transition: 'background 0.15s ease-out',
          mixBlendMode: 'normal',
        }}
      />

      {/* Aurora glow on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            background: `radial-gradient(
              ellipse 50% 40% at center,
              ${method.color}12 0%,
              transparent 70%
            )`,
            filter: 'blur(30px)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <motion.div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: `${method.color}15`,
            border: `1px solid ${method.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
          animate={isHovered && !prefersReducedMotion ? { rotate: 5, scale: 1.05 } : { rotate: 0, scale: 1 }}
          transition={SPRING_CONFIG}
        >
          <Icon size={22} style={{ color: method.color }} />
        </motion.div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            color: 'var(--text-95)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-space-grotesk)',
          }}
        >
          {method.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: '400',
            color: 'var(--text-50)',
            lineHeight: '1.5',
          }}
        >
          {method.description}
        </p>
      </div>
    </motion.div>
  );

  // Wrap in Link for external links, or return as-is for chat
  if (method.href) {
    if (method.external) {
      return (
        <a
          href={method.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block' }}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={method.href} style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </Link>
    );
  }

  return content;
}

// =============================================================================
// PROMPT PILLS
// =============================================================================
interface PromptPillsProps {
  onSelect: (prompt: string) => void;
}

function PromptPills({ onSelect }: PromptPillsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={itemVariants}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        justifyContent: 'center',
        marginTop: '2rem',
      }}
    >
      {PROMPTS.map((prompt, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(prompt)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={SPRING_CONFIG}
          style={{
            background: hoveredIndex === i ? 'var(--glass-08)' : 'var(--glass-04)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: hoveredIndex === i ? '1px solid var(--text-12)' : '1px solid var(--text-06)',
            borderRadius: '16px',
            padding: '0.625rem 1rem',
            color: hoveredIndex === i ? 'var(--text-90)' : 'var(--text-60)',
            fontSize: '0.8125rem',
            fontWeight: '400',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {prompt}
        </motion.button>
      ))}
    </motion.div>
  );
}

// =============================================================================
// MAIN CONTACT PAGE
// =============================================================================
export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `}</style>

      <PortfolioNavigation />

      <main
        style={{
          minHeight: '100vh',
          paddingTop: 'clamp(100px, 15vh, 140px)',
          paddingBottom: '4rem',
          paddingLeft: 'clamp(1rem, 5vw, 2rem)',
          paddingRight: 'clamp(1rem, 5vw, 2rem)',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Hero Section */}
          <motion.section
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(3rem, 6vw, 4rem)',
            }}
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '1rem',
                fontWeight: '400',
                color: 'var(--text-50)',
                marginBottom: '0.75rem',
                letterSpacing: '0.02em',
              }}
            >
              {getGreeting()}.
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '300',
                color: 'var(--text-95)',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              Let's Create Something{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Meaningful
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                fontWeight: '400',
                color: 'var(--text-60)',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              Whether it's a collaboration, a question, or just saying hello — I'd love to hear from you.
            </motion.p>

            {/* Availability Indicator */}
            <AvailabilityIndicator />
          </motion.section>

          {/* Contact Cards Grid */}
          <motion.div
            variants={containerVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {CONTACT_METHODS.map((method, index) => (
              <ContactCard
                key={method.id}
                method={method}
                index={index}
                onChatClick={() => {}}
              />
            ))}
          </motion.div>

          {/* Conversation Starters */}
          <motion.section
            variants={itemVariants}
            style={{
              textAlign: 'center',
            }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-40)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}
            >
              Quick Start
            </motion.p>
            <PromptPills onSelect={() => {}} />
          </motion.section>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginTop: 'clamp(4rem, 8vw, 6rem)',
              paddingTop: '2rem',
              borderTop: '1px solid var(--text-06)',
            }}
          >
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--text-40)',
                letterSpacing: '0.01em',
              }}
            >
              Based in the US · Available for remote collaborations worldwide
            </p>
          </motion.footer>
        </motion.div>
      </main>

      {/* GlobalChatbot is provided at layout level */}
    </>
  );
}
