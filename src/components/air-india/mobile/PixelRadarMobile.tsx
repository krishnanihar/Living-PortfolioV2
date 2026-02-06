'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TouchHighlight, MobileStepIndicator, SwipeableCards } from './shared';

interface PixelRadarMobileProps {
  brandColor: string;
  isMobile?: boolean;
}

type AnalysisPhase = 'idle' | 'scan' | 'analyze' | 'complete';

const tokens = [
  { id: 'color', color: '#3B82F6', library: 'color/primary', local: 'color/primary', matched: true },
  { id: 'typo', color: '#8B5CF6', library: 'typography/h1', local: 'typography/heading-1', matched: false },
  { id: 'space', color: '#10B981', library: 'spacing/lg', local: 'spacing/lg', matched: true },
];

const backendModules = [
  { name: 'Token Scanner', phase: 'scan', color: '#30D158', items: ['Variables', 'Styles', 'Libraries'] },
  { name: 'Analysis Engine', phase: 'analyze', color: '#0D99FF', items: ['Duplicate Detection', 'Consistency'] },
  { name: 'Figma APIs', phase: null, color: '#DA0E29', items: ['variables', 'styles', 'teamLibrary'] },
  { name: 'Results', phase: 'complete', color: '#30D158', items: ['Match tokens', 'Fix duplicates'] },
];

/**
 * PixelRadarMobile - Mobile-optimized Pixel Radar demo
 * Features swipeable cards between Plugin UI and Backend Architecture
 */
export function PixelRadarMobile({ brandColor, isMobile = true }: PixelRadarMobileProps) {
  const [viewIndex, setViewIndex] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('idle');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const runAnalysis = useCallback(() => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisPhase('scan');

    setTimeout(() => setAnalysisPhase('analyze'), 500);
    setTimeout(() => {
      setAnalysisPhase('complete');
      setIsAnalyzing(false);
      setHasPlayed(true);
    }, 1500);
  }, [isAnalyzing]);

  // Plugin UI View
  const PluginView = (
    <div style={{
      background: '#2C2C2C',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
    }}>
      {/* Plugin Header */}
      <div style={{
        background: '#1E1E1E',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            background: '#0D99FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '10px', color: 'white', fontWeight: '700' }}>P</span>
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
          }}>
            Pixel Radar
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
            }} />
          ))}
        </div>
      </div>

      {/* Plugin Content */}
      <div style={{ padding: '14px' }}>
        {/* Library Dropdown */}
        <div style={{
          background: '#383838',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '10px 12px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>Library:</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>Design System v2.0</span>
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>▼</span>
        </div>

        {/* Token Analysis Section */}
        <div style={{
          background: '#1E1E1E',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '14px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.66)' }}>
              Token Analysis
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>3 tokens</span>
          </div>

          {/* Token Rows */}
          {tokens.map((token) => (
            <TouchHighlight
              key={token.id}
              onTap={() => setSelectedToken(selectedToken === token.id ? null : token.id)}
              highlightColor="rgba(255, 255, 255, 0.06)"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                background: selectedToken === token.id ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                minHeight: '48px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '3px',
                  background: token.color,
                }} />
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'SF Mono, Monaco, monospace',
                  }}>
                    {token.library}
                  </div>
                  {selectedToken === token.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        fontSize: '10px',
                        color: 'rgba(255, 255, 255, 0.4)',
                        marginTop: '2px',
                      }}
                    >
                      Local: {token.local}
                    </motion.div>
                  )}
                </div>
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {token.matched ? (
                  <span style={{ fontSize: '14px', color: '#30D158' }}>✓</span>
                ) : (
                  <span style={{
                    fontSize: '11px',
                    color: '#FF9F0A',
                    fontWeight: '700',
                    background: 'rgba(255, 159, 10, 0.15)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>!</span>
                )}
              </div>
            </TouchHighlight>
          ))}
        </div>

        {/* Stats Bar */}
        <div style={{
          background: '#1E1E1E',
          borderRadius: '8px',
          padding: '12px 14px',
          marginBottom: '14px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#30D158',
                }}>
                  {analysisPhase === 'complete' ? '195' : '—'}
                </span>
                <span style={{
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginLeft: '4px',
                }}>
                  matched
                </span>
              </div>
              <div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#FF9F0A',
                }}>
                  {analysisPhase === 'complete' ? '79' : '—'}
                </span>
                <span style={{
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginLeft: '4px',
                }}>
                  suggested
                </span>
              </div>
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: '600',
              color: analysisPhase === 'complete' ? '#30D158' : 'rgba(255, 255, 255, 0.4)',
            }}>
              {analysisPhase === 'complete' ? '71%' : '—'}
            </span>
          </div>
          <div style={{
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <motion.div
              animate={{ width: analysisPhase === 'complete' ? '71%' : '0%' }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
              style={{
                height: '100%',
                background: '#30D158',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* Run Analysis Button */}
        <TouchHighlight
          onTap={runAnalysis}
          disabled={isAnalyzing}
          style={{
            width: '100%',
            background: isAnalyzing ? '#1E1E1E' : '#0D99FF',
            border: isAnalyzing ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            borderRadius: '8px',
            padding: '14px',
            textAlign: 'center',
            minHeight: '48px',
            animation: !isAnalyzing ? 'demoButtonPulse 2s ease-in-out infinite' : 'none',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            {isAnalyzing && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderTopColor: 'rgba(255, 255, 255, 0.9)',
                }}
              />
            )}
            <span style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'white',
            }}>
              {isAnalyzing ? 'Analyzing...' : hasPlayed ? 'Replay Analysis' : 'Run Analysis'}
            </span>
          </div>
        </TouchHighlight>
      </div>
    </div>
  );

  // Backend Architecture View
  const BackendView = (
    <div style={{
      background: '#2C2C2C',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: '#1E1E1E',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          background: 'rgba(162, 89, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '10px', color: '#A259FF' }}>⚡</span>
        </div>
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)',
        }}>
          Backend Architecture
        </span>
      </div>

      {/* Module Grid */}
      <div style={{
        padding: '14px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
      }}>
        {backendModules.map((module) => {
          const isActive = module.phase === analysisPhase;
          return (
            <div
              key={module.name}
              style={{
                background: module.phase === null
                  ? `rgba(${brandColor}, 0.08)`
                  : '#1E1E1E',
                borderRadius: '8px',
                padding: '12px',
                border: `1px solid ${isActive ? `${module.color}80` : module.phase === null ? `rgba(${brandColor}, 0.25)` : 'rgba(255, 255, 255, 0.1)'}`,
                boxShadow: isActive ? `0 0 12px ${module.color}30` : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                fontSize: '10px',
                fontWeight: '600',
                color: module.color,
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <motion.span
                  animate={{
                    scale: isActive ? [1, 1.3, 1] : 1,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isActive ? module.color : `${module.color}50`,
                  }}
                />
                {module.name}
              </div>
              <div style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.4)',
                lineHeight: 1.4,
              }}>
                {module.items.map((item, i) => (
                  <div key={i}>
                    {module.phase === 'complete' && analysisPhase === 'complete' ? (
                      <span style={{ color: '#30D158' }}>✓ </span>
                    ) : '• '}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Bar */}
      <div style={{
        margin: '0 14px 14px',
        padding: '10px 12px',
        background: '#1E1E1E',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: analysisPhase === 'complete'
          ? '1px solid rgba(48, 209, 88, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <motion.div
          animate={{
            background: analysisPhase === 'complete' ? '#30D158' :
              analysisPhase !== 'idle' ? '#0D99FF' : 'rgba(255, 255, 255, 0.3)',
          }}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
          }}
        />
        <span style={{
          fontSize: '11px',
          color: analysisPhase === 'complete'
            ? '#30D158'
            : analysisPhase !== 'idle'
            ? '#0D99FF'
            : 'rgba(255, 255, 255, 0.4)',
        }}>
          {analysisPhase === 'complete' ? 'Analysis Complete' :
           analysisPhase === 'scan' ? 'Scanning tokens...' :
           analysisPhase === 'analyze' ? 'Running analysis...' :
           'Ready'}
        </span>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%' }}>
      {/* Interactive Prototype Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '14px',
        padding: '8px 14px',
        background: 'rgba(13, 153, 255, 0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(13, 153, 255, 0.2)',
      }}>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#0D99FF',
          }}
        />
        <span style={{
          fontSize: '11px',
          color: 'var(--text-70)',
          fontWeight: '500',
        }}>
          Interactive Prototype
        </span>
      </div>

      {isMobile ? (
        <>
          {/* Swipeable Views (mobile) */}
          <SwipeableCards
            currentIndex={viewIndex}
            onIndexChange={setViewIndex}
            hintText="Swipe to see backend"
          >
            {[PluginView, BackendView]}
          </SwipeableCards>

          {/* Step Indicator */}
          <MobileStepIndicator
            totalSteps={2}
            currentStep={viewIndex}
            onStepTap={setViewIndex}
            activeColor="#0D99FF"
          />
        </>
      ) : (
        /* Side-by-side views (desktop) */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          alignItems: 'start',
        }}>
          {PluginView}
          {BackendView}
        </div>
      )}
    </div>
  );
}

export default PixelRadarMobile;
