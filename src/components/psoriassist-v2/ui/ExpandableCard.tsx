'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface ExpandableCardProps {
  id: string;
  icon?: ReactNode;
  title: string;
  subtitle: string;
  accentColor?: string;
  children: ReactNode; // Expanded content
  expandMode?: 'inline' | 'modal';
}

export function ExpandableCard({
  id,
  icon,
  title,
  subtitle,
  accentColor = '74, 144, 226',
  children,
  expandMode = 'inline',
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);

    // Lock body scroll for modal mode
    if (expandMode === 'modal' && !isExpanded) {
      document.body.style.overflow = 'hidden';
    } else if (expandMode === 'modal' && isExpanded) {
      document.body.style.overflow = '';
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    document.body.style.overflow = '';
  };

  // Inline expansion
  if (expandMode === 'inline') {
    return (
      <motion.div
        layout
        onClick={handleToggle}
        style={{
          padding: isExpanded ? '2rem' : '1.5rem',
          borderRadius: '24px',
          background: 'var(--glass-03)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: `1px solid ${isExpanded ? 'var(--border-hover)' : 'var(--border-primary)'}`,
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
        }}
        whileHover={{
          background: 'var(--glass-05)',
          borderColor: 'var(--border-hover)',
          y: isExpanded ? 0 : -4,
        }}
      >
        {/* Header - Always Visible */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {icon && (
            <motion.div
              animate={{
                rotate: isExpanded ? 5 : 0,
                scale: isExpanded ? 1.05 : 1,
              }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: `rgba(${accentColor}, ${isExpanded ? 0.2 : 0.1})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease',
              }}
            >
              {icon}
            </motion.div>
          )}

          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                color: 'var(--text-90)',
                marginBottom: '0.25rem',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-50)',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Expand Indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} color="var(--text-40)" />
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  paddingTop: '1.5rem',
                  marginTop: '1.5rem',
                  borderTop: '1px solid var(--border-primary)',
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

  // Modal expansion
  return (
    <>
      <motion.div
        layoutId={`card-${id}`}
        onClick={handleToggle}
        style={{
          padding: '1.5rem',
          borderRadius: '24px',
          background: 'var(--glass-03)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid var(--border-primary)',
          cursor: 'pointer',
        }}
        whileHover={{
          background: 'var(--glass-05)',
          borderColor: 'var(--border-hover)',
          y: -4,
          boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 40px rgba(${accentColor}, 0.1)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {icon && (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: `rgba(${accentColor}, 0.1)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </div>
          )}

          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                color: 'var(--text-90)',
                marginBottom: '0.25rem',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-50)',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: `rgb(${accentColor})`,
              opacity: 0.6,
            }}
          />
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem',
            }}
          >
            <motion.div
              layoutId={`card-${id}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                borderRadius: '32px',
                background: 'var(--glass-05)',
                backdropFilter: 'blur(60px) saturate(180%)',
                WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                border: '1px solid var(--border-hover)',
                overflow: 'auto',
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '2rem',
                  borderBottom: '1px solid var(--border-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  position: 'sticky',
                  top: 0,
                  background: 'var(--glass-05)',
                  backdropFilter: 'blur(60px)',
                  WebkitBackdropFilter: 'blur(60px)',
                  zIndex: 1,
                }}
              >
                {icon && (
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      backgroundColor: `rgba(${accentColor}, 0.15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--text-95)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {title}
                  </h2>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--text-60)',
                      margin: 0,
                    }}
                  >
                    {subtitle}
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--glass-08)',
                    border: '1px solid var(--border-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--glass-12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--glass-08)';
                  }}
                >
                  <X size={18} color="var(--text-60)" />
                </button>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '2rem' }}>{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
