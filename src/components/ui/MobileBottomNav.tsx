'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, User, Compass, LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Work', icon: Briefcase, href: '/work' },
  { name: 'About', icon: User, href: '/about' },
  { name: 'Journey', icon: Compass, href: '/journey' },
];

/**
 * MobileBottomNav - iOS/Android-style bottom navigation bar
 *
 * Features:
 * - Fixed at bottom with safe area handling
 * - 4 navigation items with icons and labels
 * - Active state highlighting
 * - Glassmorphism background
 *
 * Only rendered on mobile screens (<768px)
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  // Determine if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
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
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 20px',
              minWidth: '64px',
              minHeight: '48px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              borderRadius: '12px',
              backgroundColor: active ? 'var(--glass-08)' : 'transparent',
            }}
          >
            <Icon
              size={22}
              style={{
                color: active ? 'var(--text-95)' : 'var(--text-50)',
                transition: 'color 0.2s ease',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                fontWeight: active ? 500 : 400,
                color: active ? 'var(--text-90)' : 'var(--text-40)',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
              }}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
