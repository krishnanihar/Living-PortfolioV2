'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Token pill component
function TokenPill({
  value,
  name,
  isDark,
  delay = 0,
}: {
  value: string;
  name?: string;
  isDark: boolean;
  delay?: number;
}) {
  const bgColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
  const borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 20,
        padding: '0.4rem 0.75rem',
      }}
    >
      {name && (
        <span style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
        }} />
      )}
      <span style={{
        fontSize: '0.7rem',
        fontFamily: 'monospace',
        color: textColor,
        fontWeight: 500,
      }}>
        {value}
      </span>
    </motion.div>
  );
}

// Connecting line with animation
function ConnectingLine({
  isDark,
  isInView,
  delay = 0,
  direction = 'down',
}: {
  isDark: boolean;
  isInView: boolean;
  delay?: number;
  direction?: 'down' | 'diagonal';
}) {
  const strokeColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)';

  if (direction === 'diagonal') {
    return (
      <svg width="60" height="50" style={{ display: 'block', margin: '0 auto' }}>
        <motion.path
          d="M 30 0 L 30 50"
          stroke={strokeColor}
          strokeWidth={1}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay }}
        />
        <motion.circle
          cx="30"
          cy="50"
          r="3"
          fill={strokeColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: delay + 0.3 }}
        />
      </svg>
    );
  }

  return (
    <svg width="40" height="30" style={{ display: 'block', margin: '0.25rem auto' }}>
      <motion.path
        d="M 20 0 L 20 30"
        stroke={strokeColor}
        strokeWidth={1}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay }}
      />
      <motion.polygon
        points="16,25 20,32 24,25"
        fill={strokeColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay + 0.2 }}
      />
    </svg>
  );
}

// Sample button component
function SampleButton({ isDark }: { isDark: boolean }) {
  const bgColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textColor = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)';
  const borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        padding: '0.5rem 1rem',
        color: textColor,
        fontSize: '0.75rem',
        fontWeight: 500,
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '0.85rem' }}>+</span>
      Button
    </motion.button>
  );
}

export function ThemeSwitchVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove once: true so it can re-check when parent becomes visible
  const isInView = useInView(containerRef, { amount: 0.2 });

  return (
    <div ref={containerRef}>
      {/* Hint */}
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-40)',
        marginBottom: '0.75rem',
      }}>
        Same component token, different theme values
      </div>

      {/* Main split container */}
      <div style={{
        display: 'flex',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--border-primary)',
      }}>
        {/* Light Mode Side */}
        <div style={{
          flex: 1,
          background: 'rgba(245, 243, 237, 0.95)',
          padding: '1.5rem',
          position: 'relative',
        }}>
          {/* Dotted grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Raw value */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <TokenPill value="#1A1A2E" isDark={false} delay={0.1} />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.4)' }}
              >
                —
              </motion.span>
              <TokenPill value="Opacity: 8%" isDark={false} delay={0.2} />
            </div>

            <ConnectingLine isDark={false} isInView={isInView} delay={0.3} />

            {/* Semantic token */}
            <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
              <TokenPill value="deep-night-08" name="token" isDark={false} delay={0.4} />
            </div>

            <ConnectingLine isDark={false} isInView={isInView} delay={0.5} direction="diagonal" />
          </div>
        </div>

        {/* Center divider with merge point */}
        <div style={{
          width: 2,
          background: 'var(--border-primary)',
          position: 'relative',
        }}>
          {/* Merge dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            style={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'var(--bg-primary)',
              border: '2px solid var(--text-40)',
            }}
          />
        </div>

        {/* Dark Mode Side */}
        <div style={{
          flex: 1,
          background: 'rgba(15, 15, 20, 0.98)',
          padding: '1.5rem',
          position: 'relative',
        }}>
          {/* Dotted grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Raw value */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <TokenPill value="#FFFFFF" isDark={true} delay={0.1} />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}
              >
                —
              </motion.span>
              <TokenPill value="Opacity: 8%" isDark={true} delay={0.2} />
            </div>

            <ConnectingLine isDark={true} isInView={isInView} delay={0.3} />

            {/* Semantic token */}
            <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
              <TokenPill value="white-08" name="token" isDark={true} delay={0.4} />
            </div>

            <ConnectingLine isDark={true} isInView={isInView} delay={0.5} direction="diagonal" />
          </div>
        </div>
      </div>

      {/* Bottom: Merged component token + buttons */}
      <div style={{
        background: 'var(--glass-03)',
        borderRadius: '0 0 16px 16px',
        border: '1px solid var(--border-primary)',
        borderTop: 'none',
        padding: '1rem',
        marginTop: -1,
      }}>
        {/* Component token */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{
              display: 'inline-block',
              background: 'var(--glass-30)',
              border: '1px solid var(--border-primary)',
              borderRadius: 20,
              padding: '0.5rem 1rem',
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: 'var(--text-80)',
              fontWeight: 500,
            }}>
              button-secondary-background-default
            </span>
          </motion.div>
        </div>

        {/* Buttons side by side */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(245, 243, 237, 0.95)',
              borderRadius: 8,
              padding: '1rem',
            }}>
              <SampleButton isDark={false} />
            </div>
            <div style={{
              fontSize: '0.65rem',
              color: 'var(--text-40)',
              marginTop: '0.5rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}>
              LIGHT MODE
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(15, 15, 20, 0.98)',
              borderRadius: 8,
              padding: '1rem',
            }}>
              <SampleButton isDark={true} />
            </div>
            <div style={{
              fontSize: '0.65rem',
              color: 'var(--text-40)',
              marginTop: '0.5rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}>
              DARK MODE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
