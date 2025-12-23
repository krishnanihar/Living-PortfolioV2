'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Calendar, ExternalLink } from 'lucide-react';

interface ContactCardProps {
  onClose?: () => void;
}

export function ContactCard({ onClose }: ContactCardProps) {
  const contactLinks = [
    {
      icon: <Mail size={14} />,
      label: 'Email',
      href: 'mailto:krishnanihar30@gmail.com',
      external: true,
    },
    {
      icon: <Linkedin size={14} />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/krishnanihar',
      external: true,
    },
    {
      icon: <Calendar size={14} />,
      label: 'Schedule a Call',
      href: '/contact',
      external: false,
    },
  ];

  return (
    <div
      style={{
        marginTop: '0.75rem',
        background: 'var(--glass-06)',
        borderRadius: '16px',
        border: '1px solid var(--glass-10)',
        padding: '1rem',
        opacity: 0,
        animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
      }}
    >
      <h4
        style={{
          fontSize: '0.8rem',
          fontWeight: '500',
          color: 'var(--text-primary)',
          margin: 0,
          marginBottom: '0.75rem',
        }}
      >
        Get in Touch
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {contactLinks.map((link, index) => {
          const Component = link.external ? 'a' : Link;
          const props = link.external
            ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
            : { href: link.href, onClick: onClose };

          return (
            <Component
              key={index}
              {...props}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.625rem 0.75rem',
                background: 'var(--glass-05)',
                border: '1px solid var(--glass-08)',
                borderRadius: '10px',
                color: 'var(--text-80)',
                fontSize: '0.75rem',
                fontWeight: '400',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.background = 'rgba(218, 14, 41, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(218, 14, 41, 0.25)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.background = 'var(--glass-05)';
                e.currentTarget.style.borderColor = 'var(--glass-08)';
                e.currentTarget.style.color = 'var(--text-80)';
              }}
            >
              <span style={{ opacity: 0.8 }}>{link.icon}</span>
              <span style={{ flex: 1 }}>{link.label}</span>
              {link.external && <ExternalLink size={12} style={{ opacity: 0.5 }} />}
            </Component>
          );
        })}
      </div>
    </div>
  );
}

export default ContactCard;
