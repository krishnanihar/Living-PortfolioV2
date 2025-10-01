'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { useConsciousness } from '@/hooks/useConsciousness';

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: '/work' | '/about' | '/contact' | '/' | string;
}

interface SmartNavItemProps {
  item: NavItem;
  isActive: boolean;
}

function SmartNavItem({ item, isActive }: SmartNavItemProps) {
  const consciousness = useConsciousness();
  const visitCount = consciousness.getPageVisitCount(item.href);
  const navigationInsight = consciousness.getNavigationInsights(item.href);
  const isFrequent = consciousness.isFrequentlyVisited(item.href);
  const Icon = item.icon;

  return (
    <div className="smart-nav-item-container">
      <style jsx>{`
        .smart-nav-tooltip {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .smart-nav-item-container:hover .smart-nav-tooltip {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .visit-indicator {
          animation: ${isFrequent ? 'pulse 2s ease-in-out infinite' : 'none'};
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .frequent-glow {
          box-shadow: ${isFrequent ? '0 0 8px rgba(218, 14, 41, 0.3)' : 'none'};
        }
      `}</style>

      <Link href={item.href as any} style={{ textDecoration: 'none' }}>
        <div
          onClick={() => consciousness.trackPageVisit(item.href)}
          onMouseEnter={() => consciousness.registerInteraction()}
          style={{
            position: 'relative',
            padding: '0.5rem 1.25rem',
            borderRadius: '24px',
            fontSize: '0.825rem',
            fontWeight: '400',
            letterSpacing: '0.025em',
            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
          }}
          className="frequent-glow"
        >
          {/* Glass hover background */}
          <div
            className="hover-bg"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              background: isActive
                ? 'linear-gradient(135deg, rgba(218, 14, 41, 0.15) 0%, rgba(218, 14, 41, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isActive
                ? '1px solid rgba(218, 14, 41, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.06)',
              opacity: isActive ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          />

          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <Icon size={15} style={{
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
            <span>{item.name}</span>

            {/* Visit indicator */}
            {visitCount > 0 && (
              <div
                className="visit-indicator"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isFrequent
                    ? 'var(--brand-red)'
                    : 'rgba(255, 255, 255, 0.4)',
                  marginLeft: '0.25rem',
                  transition: 'all 0.3s ease',
                }}
              />
            )}
          </div>

          {/* Smart tooltip */}
          <div
            className="smart-nav-tooltip"
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '0.5rem',
              background: 'var(--surface-secondary)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              zIndex: 10000,
            }}
          >
            <div style={{ fontWeight: '500', marginBottom: '2px' }}>
              {item.name}
            </div>
            <div style={{ opacity: 0.8, fontSize: '0.65rem' }}>
              {navigationInsight}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

interface SmartNavigationProps {
  navItems: NavItem[];
}

export function SmartNavigation({ navItems }: SmartNavigationProps) {
  const pathname = usePathname();
  const consciousness = useConsciousness();

  // Track page visit when component mounts or pathname changes
  useEffect(() => {
    consciousness.trackPageVisit(pathname);
  }, [pathname, consciousness]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
    }}>
      {navItems.map((item) => (
        <SmartNavItem
          key={item.name}
          item={item}
          isActive={pathname === item.href}
        />
      ))}
    </div>
  );
}