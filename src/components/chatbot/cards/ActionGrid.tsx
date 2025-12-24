'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, Briefcase, MessageCircle, ExternalLink } from 'lucide-react';

interface ActionGridProps {
  actions: string[];
  onClose?: () => void;
}

// Action definitions
const ACTION_MAP: Record<string, { icon: React.ReactNode; label: string; href: string; external?: boolean }> = {
  resume: {
    icon: <FileText size={14} />,
    label: 'View Resume',
    href: '/resume.pdf',
    external: true,
  },
  portfolio: {
    icon: <Download size={14} />,
    label: 'Download Portfolio',
    href: '/portfolio.pdf',
    external: true,
  },
  projects: {
    icon: <Briefcase size={14} />,
    label: 'See All Projects',
    href: '/work',
    external: false,
  },
  contact: {
    icon: <MessageCircle size={14} />,
    label: 'Get in Touch',
    href: '/contact',
    external: false,
  },
  about: {
    icon: <FileText size={14} />,
    label: 'About Me',
    href: '/about',
    external: false,
  },
  journey: {
    icon: <FileText size={14} />,
    label: 'My Journey',
    href: '/journey',
    external: false,
  },
};

export function ActionGrid({ actions, onClose }: ActionGridProps) {
  // Filter to only valid actions
  const validActions = actions
    .map(action => ACTION_MAP[action])
    .filter(Boolean)
    .slice(0, 4);

  if (validActions.length === 0) return null;

  return (
    <div
      style={{
        marginTop: '0.75rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
        opacity: 0,
        animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
      }}
    >
      {validActions.map((action, index) => {
        const Component = action.external ? 'a' : Link;
        const props = action.external
          ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
          : { href: action.href, onClick: onClose };

        return (
          <Component
            key={index}
            {...props}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'var(--glass-05)',
              border: '1px solid var(--glass-10)',
              borderRadius: '12px',
              color: 'var(--text-75)',
              fontSize: '0.7rem',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
              e.currentTarget.style.background = 'var(--glass-05)';
              e.currentTarget.style.borderColor = 'var(--glass-10)';
              e.currentTarget.style.color = 'var(--text-75)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ opacity: 0.8 }}>{action.icon}</span>
            <span>{action.label}</span>
          </Component>
        );
      })}
    </div>
  );
}

export default ActionGrid;
