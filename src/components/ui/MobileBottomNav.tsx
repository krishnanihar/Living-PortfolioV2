'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, User, Sparkles, LucideIcon } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';

interface NavItem {
  name: string;
  icon: LucideIcon;
  href?: string;
  isChat?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Work', icon: Briefcase, href: '/work' },
  { name: 'Chat', icon: Sparkles, isChat: true },
  { name: 'About', icon: User, href: '/about' },
];

/**
 * MobileBottomNav - iOS/Android-style bottom navigation bar
 *
 * Features:
 * - Fixed at bottom with safe area handling
 * - 4 navigation items with icons and labels (Home, Work, Chat, About)
 * - Active state highlighting
 * - Glassmorphism background
 * - Chat button integrates with ChatContext
 *
 * Only rendered on mobile screens (<768px)
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const { isOpen: isChatOpen, openChat, closeChat } = useChatContext();

  // Determine if a nav item is active
  const isActive = (item: NavItem) => {
    if (item.isChat) {
      return isChatOpen;
    }
    if (item.href === '/') {
      return pathname === '/' && !isChatOpen;
    }
    return item.href ? pathname.startsWith(item.href) && !isChatOpen : false;
  };

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(64px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: 'var(--glass-05)',
        backdropFilter: 'blur(100px) saturate(220%)',
        WebkitBackdropFilter: 'blur(100px) saturate(220%)',
        borderTop: '1px solid var(--text-08)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {navItems.map((item) => {
        const active = isActive(item);
        const Icon = item.icon;

        // Common styles for nav items
        const itemStyle = {
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          padding: '10px 16px',
          minWidth: '56px',
          minHeight: '48px',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          borderRadius: '12px',
          backgroundColor: active
            ? item.isChat
              ? 'rgba(218, 14, 41, 0.15)' // Brand red glow for active chat
              : 'var(--glass-08)'
            : 'transparent',
          border: 'none',
          cursor: 'pointer',
        };

        const iconStyle = {
          color: active
            ? item.isChat
              ? 'rgba(218, 14, 41, 1)' // Brand red for active chat
              : 'var(--text-95)'
            : 'var(--text-50)',
          transition: 'color 0.2s ease',
        };

        const labelStyle = {
          fontSize: '10px',
          fontWeight: active ? 500 : 400,
          color: active
            ? item.isChat
              ? 'rgba(218, 14, 41, 1)' // Brand red for active chat
              : 'var(--text-90)'
            : 'var(--text-40)',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          letterSpacing: '0.02em',
          transition: 'all 0.2s ease',
        };

        // Chat button renders as button, not Link
        if (item.isChat) {
          return (
            <button
              key={item.name}
              onClick={openChat}
              style={itemStyle}
              aria-label="Open chat"
            >
              <Icon size={22} style={iconStyle} />
              <span style={labelStyle}>{item.name}</span>
            </button>
          );
        }

        // Regular nav items render as Links
        return (
          <Link
            key={item.name}
            href={item.href!}
            style={itemStyle}
            onClick={() => {
              if (isChatOpen) {
                closeChat();
              }
            }}
          >
            <Icon size={22} style={iconStyle} />
            <span style={labelStyle}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
