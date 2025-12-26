'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TouchHighlight } from './shared';

interface MCPHandoffMobileProps {
  brandColor: string;
}

type PipelinePhase = 'idle' | 'design' | 'server' | 'agent' | 'output';

const pipelineStages = [
  {
    icon: '◇',
    title: 'FIGMA DESIGN',
    items: ['Components', 'Variables', 'Styles'],
    phase: 'design' as const,
    color: '#A259FF',
  },
  {
    icon: '⚡',
    title: 'MCP SERVER',
    items: ['get_design_context()', 'get_variables()'],
    phase: 'server' as const,
    color: '#0D99FF',
  },
  {
    icon: '◉',
    title: 'AI AGENT',
    items: ['Claude 4.5', 'Cursor'],
    phase: 'agent' as const,
    color: '#30D158',
  },
  {
    icon: '</>',
    title: 'CODE OUTPUT',
    items: ['<Button />', 'Tokens Applied'],
    phase: 'output' as const,
    color: '#FF9F0A',
  },
];

const impactMetrics = [
  { value: '3x', label: 'Faster' },
  { value: '75%', label: 'Accuracy' },
  { value: '0', label: 'Manual Docs' },
];

/**
 * MCPHandoffMobile - Mobile-optimized MCP pipeline visualization
 * Features vertical timeline and tap-to-watch demo
 */
export function MCPHandoffMobile({ brandColor }: MCPHandoffMobileProps) {
  const [phase, setPhase] = useState<PipelinePhase>('idle');
  const [hasPlayed, setHasPlayed] = useState(false);

  const runDemo = useCallback(() => {
    if (phase !== 'idle') return;

    setPhase('design');
    setTimeout(() => setPhase('server'), 600);
    setTimeout(() => setPhase('agent'), 1200);
    setTimeout(() => setPhase('output'), 1800);
    setTimeout(() => {
      setPhase('idle');
      setHasPlayed(true);
    }, 3000);
  }, [phase]);

  return (
    <div style={{
      width: '100%',
      padding: '20px',
      borderRadius: '16px',
      background: 'var(--glass-06)',
      border: `1px solid rgba(${brandColor}, 0.2)`,
    }}>
      {/* Header with Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
      }}>
        <span style={{
          padding: '4px 10px',
          borderRadius: '6px',
          background: `rgba(${brandColor}, 0.15)`,
          fontSize: '9px',
          fontWeight: '700',
          color: `rgb(${brandColor})`,
          letterSpacing: '0.1em',
        }}>
          EARLY ADOPTER
        </span>
        <span style={{
          fontSize: '10px',
          color: 'var(--text-40)',
        }}>
          Q1 2025
        </span>
      </div>

      {/* Title */}
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: 'var(--text-90)',
        marginBottom: '16px',
      }}>
        Bridging Design-Engineering Handoff
      </div>

      {/* Impact Metrics Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px',
        background: 'var(--glass-04)',
        borderRadius: '10px',
        marginBottom: '20px',
      }}>
        {impactMetrics.map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: `rgb(${brandColor})`,
              lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '9px',
              color: 'var(--text-40)',
              marginTop: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Pipeline Timeline */}
      <div style={{
        position: 'relative',
        paddingLeft: '24px',
        marginBottom: '20px',
      }}>
        {/* Connecting Line */}
        <div style={{
          position: 'absolute',
          left: '11px',
          top: '20px',
          bottom: '20px',
          width: '2px',
          background: 'var(--glass-15)',
          borderRadius: '1px',
        }}>
          <motion.div
            animate={{
              height: phase === 'idle' ? '0%' :
                phase === 'design' ? '25%' :
                phase === 'server' ? '50%' :
                phase === 'agent' ? '75%' : '100%',
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              background: `linear-gradient(180deg, #A259FF, #0D99FF, #30D158, #FF9F0A)`,
              borderRadius: '1px',
            }}
          />
        </div>

        {/* Pipeline Stages */}
        {pipelineStages.map((stage, index) => (
          <div
            key={stage.title}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: index < pipelineStages.length - 1 ? '20px' : '0',
              position: 'relative',
            }}
          >
            {/* Node */}
            <motion.div
              animate={{
                scale: phase === stage.phase ? 1.2 : 1,
                boxShadow: phase === stage.phase
                  ? `0 0 20px ${stage.color}60`
                  : 'none',
              }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '8px',
                background: phase === stage.phase ? `${stage.color}30` : 'var(--glass-08)',
                border: `2px solid ${phase === stage.phase ? stage.color : 'var(--glass-20)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}
            >
              {stage.icon}
            </motion.div>

            {/* Content */}
            <div style={{ flex: 1, paddingTop: '2px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: phase === stage.phase ? stage.color : 'var(--text-60)',
                marginBottom: '4px',
                letterSpacing: '0.08em',
                transition: 'color 0.3s ease',
              }}>
                {stage.title}
              </div>
              <div style={{
                fontSize: '11px',
                color: 'var(--text-50)',
                lineHeight: 1.4,
              }}>
                {stage.items.join(' • ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Context Stream Preview */}
      <div style={{
        padding: '12px',
        borderRadius: '8px',
        background: '#0D0D0D',
        border: '1px solid var(--glass-15)',
        marginBottom: '16px',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <span style={{
            fontSize: '9px',
            fontWeight: '600',
            color: '#30D158',
            letterSpacing: '0.1em',
          }}>
            CONTEXT STREAM
          </span>
          <motion.span
            animate={{ opacity: phase !== 'idle' ? 1 : 0.4 }}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: phase !== 'idle' ? '#30D158' : 'var(--glass-30)',
            }}
          />
        </div>
        <pre style={{
          fontFamily: 'SF Mono, Monaco, monospace',
          fontSize: '9px',
          color: '#30D158',
          margin: 0,
          lineHeight: 1.4,
          opacity: phase !== 'idle' ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}>
{`{ "component": "Button",
  "tokens": { "color": "--brand-red" }}`}
        </pre>
      </div>

      {/* Demo Button */}
      <TouchHighlight
        onTap={runDemo}
        disabled={phase !== 'idle'}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '10px',
          background: phase === 'idle' ? `rgb(${brandColor})` : 'var(--glass-15)',
          border: 'none',
          textAlign: 'center',
          minHeight: '48px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          {phase !== 'idle' && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid var(--text-20)',
                borderTopColor: 'var(--text-80)',
              }}
            />
          )}
          <span style={{
            fontSize: '13px',
            fontWeight: '600',
            color: phase === 'idle' ? 'white' : 'var(--text-60)',
          }}>
            {phase !== 'idle' ? 'Running Pipeline...' : hasPlayed ? 'Replay Demo' : 'Watch Pipeline Demo'}
          </span>
        </div>
      </TouchHighlight>

      {/* Adopted By (Compact) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '16px',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontSize: '9px',
          color: 'var(--text-30)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Adopted by
        </span>
        {['Anthropic', 'Figma', 'Cursor'].map((company) => (
          <span key={company} style={{
            fontSize: '10px',
            fontWeight: '500',
            color: 'var(--text-50)',
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'var(--glass-04)',
            border: '1px solid var(--glass-08)',
          }}>
            {company}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MCPHandoffMobile;
