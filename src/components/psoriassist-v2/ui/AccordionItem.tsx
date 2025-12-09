'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  accentColor?: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
  headerContent?: ReactNode; // Custom header content
}

export function AccordionItem({
  id,
  title,
  subtitle,
  badge,
  icon,
  accentColor = '255, 255, 255',
  isOpen,
  onToggle,
  children,
  headerContent,
}: AccordionItemProps) {
  return (
    <motion.div
      layout
      style={{
        borderRadius: 16,
        background: isOpen ? 'var(--glass-05)' : 'var(--glass-03)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: `1px solid ${isOpen ? 'var(--border-hover)' : 'var(--border-primary)'}`,
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Header - Always Visible */}
      <motion.button
        onClick={() => onToggle(id)}
        style={{
          width: '100%',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
        }}
        whileHover={{
          background: 'var(--glass-03)',
        }}
      >
        {icon && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: `rgba(${accentColor}, ${isOpen ? 0.2 : 0.1})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background-color 0.3s ease',
            }}
          >
            {icon}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {headerContent || (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h4
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text-90)',
                    margin: 0,
                  }}
                >
                  {title}
                </h4>
                {badge}
              </div>
              {subtitle && (
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-50)',
                    margin: '0.125rem 0 0 0',
                  }}
                >
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>

        {/* Expand Indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={18} color="var(--text-40)" />
        </motion.div>
      </motion.button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 1.25rem 1.25rem 1.25rem',
                borderTop: '1px solid var(--border-primary)',
                marginTop: 0,
                paddingTop: '1rem',
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
