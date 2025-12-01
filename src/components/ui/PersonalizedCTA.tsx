'use client';

/**
 * PersonalizedCTA Component
 *
 * Dynamic call-to-action buttons that adapt based on visitor intent and engagement.
 * Uses the CTA configuration from the personalization system.
 */

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Sparkles } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';
import type { CTAConfig } from '@/lib/personalization/types';

// ============================================
// Icon Mapping
// ============================================

const ICON_MAP: Record<string, typeof ArrowRight> = {
  default: ArrowRight,
  download: Download,
  contact: Mail,
  github: Github,
  explore: Sparkles,
};

function getIcon(href: string, text: string): typeof ArrowRight {
  if (href.includes('resume') || href.includes('.pdf')) return Download;
  if (href.includes('contact')) return Mail;
  if (href.includes('github')) return Github;
  if (text.toLowerCase().includes('experiment') || text.toLowerCase().includes('dive')) {
    return Sparkles;
  }
  return ArrowRight;
}

// ============================================
// Component
// ============================================

interface PersonalizedCTAProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSecondary?: boolean;
  fallbackConfig?: CTAConfig;
}

export function PersonalizedCTA({
  className = '',
  size = 'md',
  showSecondary = true,
  fallbackConfig,
}: PersonalizedCTAProps) {
  const { state } = usePersonalization();
  const { ctaConfig, isReady } = useMemo(
    () => ({
      ctaConfig: state.ctaConfig,
      isReady: state.isReady,
    }),
    [state.ctaConfig, state.isReady]
  );

  // Use fallback until personalization is ready
  const config = isReady ? ctaConfig : (fallbackConfig || getDefaultConfig());

  const { primary, secondary } = config;
  const PrimaryIcon = getIcon(primary.href, primary.text);
  const SecondaryIcon = getIcon(secondary.href, secondary.text);

  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Primary CTA */}
      <CTAButton
        href={primary.href}
        variant={primary.variant}
        size={size}
        icon={PrimaryIcon}
      >
        {primary.text}
      </CTAButton>

      {/* Secondary CTA */}
      {showSecondary && (
        <CTAButton
          href={secondary.href}
          variant={secondary.variant}
          size={size}
          icon={SecondaryIcon}
        >
          {secondary.text}
        </CTAButton>
      )}
    </div>
  );
}

// ============================================
// CTA Button Component
// ============================================

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant: 'default' | 'accent' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  icon?: typeof ArrowRight;
}

function CTAButton({ href, children, variant, size, icon: Icon }: CTAButtonProps) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');
  const sizeClasses = getSizeClasses(size);
  const variantStyles = getVariantStyles(variant);

  const content = (
    <motion.span
      className={`
        inline-flex items-center gap-2 rounded-full font-medium
        transition-all duration-200 ${sizeClasses.button}
      `}
      style={variantStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {Icon && <Icon className={sizeClasses.icon} />}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      >
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

// ============================================
// Styling Helpers
// ============================================

function getSizeClasses(size: 'sm' | 'md' | 'lg') {
  switch (size) {
    case 'sm':
      return {
        button: 'px-4 py-2 text-sm',
        icon: 'w-3.5 h-3.5',
      };
    case 'lg':
      return {
        button: 'px-6 py-3 text-base',
        icon: 'w-5 h-5',
      };
    case 'md':
    default:
      return {
        button: 'px-5 py-2.5 text-sm',
        icon: 'w-4 h-4',
      };
  }
}

function getVariantStyles(
  variant: 'default' | 'accent' | 'ghost'
): React.CSSProperties {
  switch (variant) {
    case 'accent':
      return {
        background: 'linear-gradient(135deg, #DA0E29 0%, #B00C22 100%)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 2px 8px rgba(218, 14, 41, 0.3)',
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-70)',
        border: '1px solid var(--glass-15)',
      };
    case 'default':
    default:
      return {
        background: 'var(--glass-08)',
        color: 'var(--text-90)',
        border: '1px solid var(--glass-15)',
        backdropFilter: 'blur(20px)',
      };
  }
}

function getDefaultConfig(): CTAConfig {
  return {
    primary: {
      text: 'Explore my work',
      href: '/work',
      variant: 'default',
    },
    secondary: {
      text: 'Contact',
      href: '/contact',
      variant: 'ghost',
    },
  };
}

// ============================================
// Standalone Primary/Secondary Exports
// ============================================

interface SingleCTAProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PrimaryCTA({ className, size = 'md' }: SingleCTAProps) {
  const { state } = usePersonalization();
  const { primary } = state.isReady ? state.ctaConfig : getDefaultConfig();
  const Icon = getIcon(primary.href, primary.text);

  return (
    <div className={className}>
      <CTAButton
        href={primary.href}
        variant={primary.variant}
        size={size}
        icon={Icon}
      >
        {primary.text}
      </CTAButton>
    </div>
  );
}

export function SecondaryCTA({ className, size = 'md' }: SingleCTAProps) {
  const { state } = usePersonalization();
  const { secondary } = state.isReady ? state.ctaConfig : getDefaultConfig();
  const Icon = getIcon(secondary.href, secondary.text);

  return (
    <div className={className}>
      <CTAButton
        href={secondary.href}
        variant={secondary.variant}
        size={size}
        icon={Icon}
      >
        {secondary.text}
      </CTAButton>
    </div>
  );
}
