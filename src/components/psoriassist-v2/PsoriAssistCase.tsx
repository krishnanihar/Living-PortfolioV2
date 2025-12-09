'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Smartphone, Camera, Clock, Activity, Brain, Heart, Users, Zap, CheckCircle } from 'lucide-react';
import { SnapSection } from './ui/SnapSection';
import { ExpandableCard } from './ui/ExpandableCard';
import {
  heroStats,
  genesisTimeline,
  problemCards,
  heroFeatures,
  secondaryFeatures,
  impactMetrics,
  learnings,
  testimonialQuote,
  // New imports for missing sections
  stakeholders,
  researchThemes,
  adherenceGap,
  competitors,
  marketGaps,
  designPrinciples,
  personas,
  processPhases,
  testingRounds,
  usabilityMetrics,
  colorPalette,
  typographyScale,
  techStack,
  mlModels,
  securityCompliance,
  userFlows,
  roadmap,
} from './data/content';

// Import interactive prototypes
import { PsoriAssistPhoneMockup } from '@/components/sections/PsoriAssistPhoneMockup';
import { GhostOverlayDemo, SmartReminderDemo, PASIScoringDemo } from '@/components/sections/PsoriAssistInteractivePrototypes';

export function PsoriAssistCase() {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [expandedLearnings, setExpandedLearnings] = useState(false);
  const [activeDemo, setActiveDemo] = useState<'phone' | 'ghost' | 'reminder' | 'pasi'>('phone');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      {/* ===== SECTION 1: HERO ===== */}
      <SnapSection id="hero">
        <div
          style={{
            maxWidth: 900,
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: 20,
              background: 'rgba(74, 144, 226, 0.1)',
              border: '1px solid rgba(74, 144, 226, 0.2)',
              color: 'rgb(74, 144, 226)',
              fontSize: '0.8rem',
              fontWeight: 500,
              marginBottom: '2rem',
            }}
          >
            Digital Health &middot; AI/ML &middot; CONCEPT
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: isMobile ? '3rem' : '6rem',
              fontWeight: 100,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              background: 'linear-gradient(135deg, var(--text-95) 0%, var(--text-60) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
            }}
          >
            PsoriAssist
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: isMobile ? '1.125rem' : '1.375rem',
              color: 'var(--text-60)',
              maxWidth: 600,
              margin: '0 auto 3rem',
              lineHeight: 1.6,
            }}
          >
            Reimagining psoriasis care through AI-powered digital therapeutics
          </motion.p>

          {/* Stats Grid - Staggered entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.7 },
              },
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  y: -6,
                  background: 'var(--glass-08)',
                  boxShadow: `0 8px 32px rgba(${stat.color}, 0.15)`,
                  borderColor: `rgba(${stat.color}, 0.3)`,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '1.25rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  cursor: 'default',
                }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                  style={{
                    fontSize: '2rem',
                    fontWeight: 200,
                    color: `rgb(${stat.color})`,
                    marginBottom: '0.25rem',
                  }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-70)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-30)',
            }}
          >
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>SCROLL</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 2: GENESIS ===== */}
      <SnapSection id="genesis" background="subtle">
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            The Genesis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '3rem',
              fontStyle: 'italic',
            }}
          >
            "It starts with a single patch. Then another."
          </motion.p>

          {/* Timeline - Enhanced with stagger and glow effects */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.2 },
              },
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
            }}
          >
            {genesisTimeline.map((node, i) => (
              <motion.div
                key={node.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 12px 40px rgba(${node.color}, 0.2)`,
                  borderColor: `rgba(${node.color}, 0.4)`,
                }}
                onClick={() =>
                  setExpandedTimeline(expandedTimeline === node.id ? null : node.id)
                }
                style={{
                  flex: isMobile ? '1 1 45%' : 1,
                  padding: '1.5rem',
                  borderRadius: 20,
                  background:
                    expandedTimeline === node.id ? 'var(--glass-06)' : 'var(--glass-03)',
                  border: `1px solid ${
                    expandedTimeline === node.id
                      ? `rgba(${node.color}, 0.3)`
                      : 'var(--border-primary)'
                  }`,
                  cursor: 'pointer',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `rgba(${node.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: `rgb(${node.color})`,
                  }}
                >
                  {node.shortLabel}
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-40)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {node.year}
                </div>

                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--text-80)',
                    marginBottom: expandedTimeline === node.id ? '1rem' : 0,
                  }}
                >
                  {node.title}
                </div>

                <AnimatePresence>
                  {expandedTimeline === node.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-50)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {node.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 3: RESEARCH ===== */}
      <SnapSection id="research">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Research Discovery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            25 patient interviews · 12 provider interviews · 75+ studies reviewed
          </motion.p>

          {/* Research Themes Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {researchThemes.map((theme, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: `rgba(${theme.color}, 0.4)` }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: `linear-gradient(135deg, rgba(${theme.color}, 0.05) 0%, var(--glass-02) 100%)`,
                  border: `1px solid rgba(${theme.color}, 0.2)`,
                  cursor: 'default',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: `rgb(${theme.color})`,
                  }}>
                    {theme.stat}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-70)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {theme.label}
                  </div>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-60)',
                  fontStyle: 'italic',
                  marginBottom: '0.75rem',
                  lineHeight: 1.6,
                }}>
                  {theme.quote}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-40)', marginBottom: '0.75rem' }}>
                  {theme.author}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-50)',
                  padding: '0.75rem',
                  background: 'var(--glass-03)',
                  borderRadius: 10,
                  borderLeft: `3px solid rgb(${theme.color})`,
                }}>
                  {theme.insight}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Adherence Gap Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              borderRadius: 20,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <h4 style={{ fontSize: '1rem', color: 'var(--text-80)', marginBottom: '1rem', textAlign: 'center' }}>
              {adherenceGap.title}
            </h4>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {adherenceGap.data.map((item, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 120 }}>
                  <div style={{
                    height: 8,
                    background: 'var(--glass-10)',
                    borderRadius: 4,
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      style={{
                        height: '100%',
                        background: `rgb(${item.color})`,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: `rgb(${item.color})` }}>
                    {item.value}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-50)' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginTop: '1rem',
              fontStyle: 'italic',
            }}>
              {adherenceGap.insight}
            </p>
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 4: COMPETITIVE LANDSCAPE ===== */}
      <SnapSection id="landscape" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Competitive Landscape
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            15 apps analyzed using MARS-G framework
          </motion.p>

          {/* Competitor Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}>
            {competitors.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: `rgba(${app.color}, 0.4)` }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: `rgba(${app.color}, 0.03)`,
                  border: `1px solid rgba(${app.color}, 0.2)`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-90)' }}>{app.name}</h3>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: 8,
                    background: `rgba(${app.color}, 0.15)`,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: `rgb(${app.color})`,
                  }}>
                    {app.rating}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-40)', marginBottom: '1rem' }}>{app.market}</div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgb(80, 200, 120)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Strengths</div>
                  {app.strengths.map((s, j) => (
                    <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.25rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'rgb(80, 200, 120)' }}>✓</span>
                      {s}
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgb(239, 68, 68)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Gaps</div>
                  {app.gaps.map((g, j) => (
                    <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.25rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'rgb(239, 68, 68)' }}>✗</span>
                      {g}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Market Gaps Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              padding: '1.5rem',
              borderRadius: 20,
              background: 'rgba(251, 191, 36, 0.05)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: 'rgb(251, 191, 36)', marginBottom: '1rem' }}>
              Critical Market Gaps Identified
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {marketGaps.map((gap, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 600, color: 'rgb(251, 191, 36)' }}>{gap.value}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-60)', maxWidth: 150 }}>{gap.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 5: PROBLEM ===== */}
      <SnapSection id="problem">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            The Treatment Gap
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            125 million patients. Three critical failures.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            {problemCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ExpandableCard
                  key={card.id}
                  id={card.id}
                  icon={<Icon size={24} color={`rgb(${card.color})`} />}
                  title={card.title}
                  subtitle={card.subtitle}
                  accentColor={card.color}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div
                        style={{
                          fontSize: '3rem',
                          fontWeight: 100,
                          color: `rgb(${card.color})`,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {card.stat}
                      </div>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Research
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-70)', margin: 0 }}>
                        {card.expandedContent.research}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Impact
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-70)', margin: 0 }}>
                        {card.expandedContent.impact}
                      </p>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Insight
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-70)', margin: 0 }}>
                        {card.expandedContent.insight}
                      </p>
                    </div>
                  </div>
                </ExpandableCard>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 6: DESIGN PRINCIPLES ===== */}
      <SnapSection id="principles" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Design Principles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            5 core principles guiding every design decision
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {designPrinciples.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, borderColor: `rgba(${p.color}, 0.4)` }}
                  style={{
                    padding: '1.5rem',
                    borderRadius: 20,
                    background: `rgba(${p.color}, 0.05)`,
                    border: `1px solid rgba(${p.color}, 0.2)`,
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `rgba(${p.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}>
                    <Icon size={28} color={`rgb(${p.color})`} />
                  </div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: `rgb(${p.color})`,
                    marginBottom: '0.5rem',
                  }}>
                    {p.principle}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-60)',
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                  }}>
                    {p.description}
                  </p>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-50)',
                    padding: '0.75rem',
                    background: 'var(--glass-03)',
                    borderRadius: 10,
                    fontStyle: 'italic',
                  }}>
                    {p.example}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 7: PERSONAS ===== */}
      <SnapSection id="personas">
        <div style={{ maxWidth: 1200, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            User Personas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Synthesized from 25 in-depth patient interviews
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {personas.map((persona, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -5, boxShadow: `0 12px 40px rgba(${persona.color}, 0.2)` }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: `1px solid rgba(${persona.color}, 0.2)`,
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `rgba(${persona.color}, 0.15)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: `rgb(${persona.color})`,
                  }}>
                    {persona.name[0]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-90)', marginBottom: '0.125rem' }}>
                      {persona.name}, {persona.age}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-50)' }}>{persona.role}</div>
                  </div>
                </div>

                {/* Severity Badge */}
                <div style={{
                  fontSize: '0.75rem',
                  color: `rgb(${persona.color})`,
                  marginBottom: '1rem',
                }}>
                  {persona.severity} · {persona.techSavvy}
                </div>

                {/* Quote */}
                <div style={{
                  padding: '0.75rem',
                  background: 'var(--glass-04)',
                  borderRadius: 10,
                  borderLeft: `3px solid rgb(${persona.color})`,
                  marginBottom: '1rem',
                }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-70)', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                    "{persona.quote}"
                  </p>
                </div>

                {/* Goals */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Goals</h4>
                  {persona.goals.map((goal, j) => (
                    <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.2rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${persona.color})` }}>✓</span>
                      {goal}
                    </div>
                  ))}
                </div>

                {/* Frustrations */}
                <div>
                  <h4 style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Frustrations</h4>
                  {persona.frustrations.map((frust, j) => (
                    <div key={j} style={{ fontSize: '0.8rem', color: 'var(--text-60)', paddingLeft: '1rem', position: 'relative', marginBottom: '0.2rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${persona.color})` }}>✗</span>
                      {frust}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 8: DESIGN PROCESS ===== */}
      <SnapSection id="process" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Double Diamond Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            18-month systematic design methodology
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {processPhases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: `rgba(${phase.color}, 0.4)` }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: `1px solid rgba(${phase.color}, 0.15)`,
                }}
              >
                <div style={{
                  display: 'inline-block',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 10,
                  background: `rgba(${phase.color}, 0.15)`,
                  color: `rgb(${phase.color})`,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                }}>
                  {phase.phase}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-50)', marginBottom: '1rem' }}>
                  {phase.subtitle}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {phase.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-60)',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                        marginBottom: '0.4rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${phase.color})` }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 9: SOLUTION ===== */}
      <SnapSection id="solution" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            AI-Powered Care
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            Four core innovations. Click to explore.
          </motion.p>

          {/* Hero Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            {heroFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <ExpandableCard
                  key={feature.id}
                  id={feature.id}
                  icon={<Icon size={24} color={`rgb(${feature.color})`} />}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  accentColor={feature.color}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ fontSize: '1rem', color: 'var(--text-70)', margin: 0 }}>
                      {feature.description}
                    </p>

                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      {feature.details.map((detail, i) => (
                        <li
                          key={i}
                          style={{ fontSize: '0.9rem', color: 'var(--text-60)' }}
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{
                        padding: '1rem',
                        borderRadius: 12,
                        background: 'var(--glass-03)',
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-40)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Technical
                      </h4>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-50)',
                          margin: 0,
                          fontFamily: 'monospace',
                        }}
                      >
                        {feature.technical}
                      </p>
                    </div>
                  </div>
                </ExpandableCard>
              );
            })}
          </div>

          {/* See All Features Button */}
          <motion.button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            whileHover={{ y: -2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto',
              padding: '0.75rem 1.5rem',
              borderRadius: 16,
              background: 'var(--glass-05)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-70)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {showAllFeatures ? 'Hide' : 'See All 12 Features'}
            <motion.span animate={{ rotate: showAllFeatures ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.button>

          {/* Secondary Features */}
          <AnimatePresence>
            {showAllFeatures && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', marginTop: '2rem' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: '1rem',
                  }}
                >
                  {secondaryFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.id}
                        whileHover={{ y: -4, background: 'var(--glass-06)' }}
                        style={{
                          padding: '1.25rem',
                          borderRadius: 16,
                          background: 'var(--glass-03)',
                          border: '1px solid var(--border-primary)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: `rgba(${feature.color}, 0.1)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <Icon size={18} color={`rgb(${feature.color})`} />
                        </div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: 'var(--text-80)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {feature.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-50)' }}>
                          {feature.subtitle}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SnapSection>

      {/* ===== SECTION 10: USABILITY TESTING ===== */}
      <SnapSection id="testing">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Usability Testing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            3 rounds · 45 participants · iterative improvement
          </motion.p>

          {/* Testing Rounds */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {testingRounds.map((round, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: 16,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-90)', marginBottom: '0.25rem' }}>
                    {round.round}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-50)', marginBottom: '0.75rem' }}>
                    {round.participants} participants
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Key Finding
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-70)', lineHeight: 1.5 }}>{round.keyFinding}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Iteration
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-70)', lineHeight: 1.5 }}>{round.iteration}</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  borderRadius: 12,
                  background: 'rgba(80, 200, 120, 0.1)',
                  border: '1px solid rgba(80, 200, 120, 0.2)',
                  textAlign: 'center',
                  minWidth: 80,
                }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'rgb(80, 200, 120)' }}>
                    {round.taskCompletion}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-50)' }}>Task Completion</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              padding: '1.5rem',
              borderRadius: 20,
              background: 'rgba(80, 200, 120, 0.05)',
              border: '1px solid rgba(80, 200, 120, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-90)', textAlign: 'center', marginBottom: '1.25rem' }}>
              Final Usability Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {usabilityMetrics.map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'rgb(80, 200, 120)' }}>{m.value}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-80)', fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-50)' }}>{m.sublabel}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 11: DESIGN SYSTEM ===== */}
      <SnapSection id="design-system" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Design System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            WCAG AA compliant · Inter typeface · Calming color palette
          </motion.p>

          {/* Color Palette */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>Color Palette</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1rem' }}>
              {colorPalette.map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: '1rem',
                    borderRadius: 16,
                    background: 'var(--glass-03)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: color.hex,
                    marginBottom: '0.75rem',
                    boxShadow: `0 4px 20px rgba(${color.rgb}, 0.3)`,
                  }} />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: color.hex, marginBottom: '0.25rem' }}>{color.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-50)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>{color.hex}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-40)' }}>WCAG: {color.contrast}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-50)', marginTop: '0.5rem', lineHeight: 1.4 }}>{color.use}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>Typography Scale</h3>
            <div style={{
              padding: '1.25rem',
              borderRadius: 16,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-40)', marginBottom: '0.75rem' }}>
                Typeface: Inter (Google Fonts) - Optimized for digital screens
              </div>
              {typographyScale.map((type, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: i < typographyScale.length - 1 ? '1px solid var(--border-primary)' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: type.size, fontWeight: type.weight, color: 'var(--text-90)' }}>{type.sample}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-40)', fontFamily: 'monospace' }}>
                    {type.name}: {type.size}, {type.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 12: USER FLOWS ===== */}
      <SnapSection id="flows">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Key User Flows
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Critical interaction patterns designed for minimal friction
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {userFlows.map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: `rgba(${flow.color}, 0.03)`,
                  border: `1px solid rgba(${flow.color}, 0.2)`,
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: `rgb(${flow.color})`, marginBottom: '1.25rem' }}>
                  {flow.title}
                </h3>
                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                  {/* Vertical line */}
                  <div style={{
                    position: 'absolute',
                    left: 12,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `rgba(${flow.color}, 0.2)`,
                  }} />
                  {flow.steps.map((s, j) => (
                    <div
                      key={j}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: j < flow.steps.length - 1 ? '1rem' : 0,
                        position: 'relative',
                      }}
                    >
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: `rgba(${flow.color}, 0.15)`,
                        border: `2px solid rgb(${flow.color})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: `rgb(${flow.color})`,
                        flexShrink: 0,
                        zIndex: 1,
                        marginLeft: '-14px',
                      }}>
                        {s.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-80)', marginBottom: '0.25rem' }}>
                          {s.action}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-50)',
                          paddingLeft: '0.75rem',
                          borderLeft: `2px solid rgba(${flow.color}, 0.3)`,
                        }}>
                          → {s.result}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 13: TECHNICAL ARCHITECTURE ===== */}
      <SnapSection id="technical" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Technical Architecture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            HIPAA-compliant · Scalable · AI/ML pipeline
          </motion.p>

          {/* System Layers */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>System Architecture</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {techStack.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 14,
                    background: `rgba(${layer.color}, 0.05)`,
                    border: `1px solid rgba(${layer.color}, 0.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: `rgb(${layer.color})`,
                    flexShrink: 0,
                  }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: `rgb(${layer.color})`, marginBottom: '0.125rem' }}>
                      {layer.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-50)', margin: 0 }}>{layer.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ML Models */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>AI/ML Pipeline</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
              {mlModels.map((ml, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 16,
                    background: `rgba(${ml.color}, 0.05)`,
                    border: `1px solid rgba(${ml.color}, 0.2)`,
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 500, color: `rgb(${ml.color})`, marginBottom: '1rem' }}>
                    {ml.model}
                  </h4>
                  {ml.stages.map((stage, j) => (
                    <div
                      key={j}
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-60)',
                        paddingLeft: '1rem',
                        position: 'relative',
                        marginBottom: '0.4rem',
                        fontFamily: j > 0 ? 'monospace' : 'inherit',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: `rgb(${ml.color})` }}>
                        {j === ml.stages.length - 1 ? '↓' : '•'}
                      </span>
                      {stage}
                    </div>
                  ))}
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    borderRadius: 10,
                    background: 'var(--glass-04)',
                    borderLeft: `3px solid rgb(${ml.color})`,
                  }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-40)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Performance
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-60)', fontFamily: 'monospace' }}>{ml.performance}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-70)', marginBottom: '1rem' }}>HIPAA Compliance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem' }}>
              {securityCompliance.map((sec, i) => {
                const Icon = sec.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 16,
                      background: `rgba(${sec.color}, 0.05)`,
                      border: `1px solid rgba(${sec.color}, 0.2)`,
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `rgba(${sec.color}, 0.15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}>
                      <Icon size={20} color={`rgb(${sec.color})`} />
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 500, color: `rgb(${sec.color})`, marginBottom: '0.75rem' }}>
                      {sec.category}
                    </h4>
                    {sec.items.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-60)',
                          paddingLeft: '1rem',
                          position: 'relative',
                          marginBottom: '0.3rem',
                        }}
                      >
                        <span style={{ position: 'absolute', left: 0, color: `rgb(${sec.color})` }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 14: PROTOTYPE (Full Interactive) ===== */}
      <SnapSection id="prototype">
        <div style={{ maxWidth: 1200, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Experience It
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-50)',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Interactive prototypes. Try them yourself.
          </motion.p>

          {/* Demo Selector Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { id: 'phone', label: 'Full App', icon: Smartphone, color: '74, 144, 226' },
              { id: 'ghost', label: 'Ghost Overlay', icon: Camera, color: '74, 144, 226' },
              { id: 'reminder', label: 'Smart Reminders', icon: Clock, color: '168, 85, 247' },
              { id: 'pasi', label: 'PASI Scoring', icon: Activity, color: '80, 200, 120' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeDemo === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveDemo(tab.id as typeof activeDemo)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    borderRadius: 12,
                    background: isActive ? `rgba(${tab.color}, 0.15)` : 'var(--glass-03)',
                    border: `1px solid ${isActive ? `rgba(${tab.color}, 0.3)` : 'var(--border-primary)'}`,
                    color: isActive ? `rgb(${tab.color})` : 'var(--text-60)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Demo Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMobile ? 500 : 600,
              }}
            >
              {activeDemo === 'phone' && (
                <div style={{ transform: isMobile ? 'scale(0.75)' : 'scale(0.85)', transformOrigin: 'center' }}>
                  <PsoriAssistPhoneMockup />
                </div>
              )}

              {activeDemo === 'ghost' && (
                <div style={{ width: '100%', maxWidth: 500 }}>
                  <GhostOverlayDemo />
                </div>
              )}

              {activeDemo === 'reminder' && (
                <div style={{ width: '100%', maxWidth: 500 }}>
                  <SmartReminderDemo />
                </div>
              )}

              {activeDemo === 'pasi' && (
                <div style={{ width: '100%', maxWidth: 600 }}>
                  <PASIScoringDemo />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Feature description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: 12,
              background: 'var(--glass-02)',
            }}
          >
            {activeDemo === 'phone' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                Full iOS 17 prototype with 8 interactive screens. Swipe to navigate, pull to refresh.
              </p>
            )}
            {activeDemo === 'ghost' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                Ghost overlay innovation for consistent photo tracking. Adjust opacity 20-80% for perfect alignment.
              </p>
            )}
            {activeDemo === 'reminder' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                AI-powered reminders learn from your patterns to suggest optimal treatment times.
              </p>
            )}
            {activeDemo === 'pasi' && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-50)', margin: 0 }}>
                AI PASI scoring is 33% more accurate than average dermatologist assessment.
              </p>
            )}
          </motion.div>
        </div>
      </SnapSection>

      {/* ===== SECTION 6: IMPACT ===== */}
      <SnapSection id="impact" background="accent">
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '3rem',
              textAlign: 'center',
            }}
          >
            The Impact
          </motion.h2>

          {/* Impact Metrics - Staggered with glow hover */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            {impactMetrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 16px 48px rgba(${metric.color}, 0.25)`,
                  borderColor: `rgba(${metric.color}, 0.4)`,
                  background: 'var(--glass-06)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: 'var(--glass-03)',
                  border: '1px solid var(--border-primary)',
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 150 }}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 100,
                    color: `rgb(${metric.color})`,
                    marginBottom: '0.25rem',
                  }}
                >
                  {metric.value}
                </motion.div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-70)' }}>
                  {metric.label}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-40)' }}>
                  {metric.sublabel}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote - Elegant entrance */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{
              boxShadow: '0 8px 32px rgba(74, 144, 226, 0.1)',
              borderColor: 'rgba(74, 144, 226, 0.2)',
            }}
            style={{
              padding: '2rem',
              borderRadius: 24,
              background: 'var(--glass-03)',
              border: '1px solid var(--border-primary)',
              marginBottom: '2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative quote marks */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 24,
                fontSize: '4rem',
                color: 'var(--glass-08)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
            >
              "
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: '1.25rem',
                color: 'var(--text-80)',
                fontStyle: 'italic',
                marginBottom: '1rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1,
              }}
            >
              "{testimonialQuote.text}"
            </motion.p>
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '0.9rem', color: 'var(--text-50)' }}
            >
              — {testimonialQuote.author}, {testimonialQuote.role}
            </motion.footer>
          </motion.blockquote>

          {/* Learnings Expandable */}
          <motion.button
            onClick={() => setExpandedLearnings(!expandedLearnings)}
            whileHover={{ y: -2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto',
              padding: '0.75rem 1.5rem',
              borderRadius: 16,
              background: 'var(--glass-05)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-70)',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            {expandedLearnings ? 'Hide' : 'View'} Learnings
            <motion.span animate={{ rotate: expandedLearnings ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {expandedLearnings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', marginTop: '2rem' }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: 20,
                      background: 'rgba(80, 200, 120, 0.05)',
                      border: '1px solid rgba(80, 200, 120, 0.2)',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '1rem',
                        color: 'rgb(80, 200, 120)',
                        marginBottom: '1rem',
                      }}
                    >
                      What Worked
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {learnings.worked.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-60)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: 20,
                      background: 'rgba(251, 191, 36, 0.05)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '1rem',
                        color: 'rgb(251, 191, 36)',
                        marginBottom: '1rem',
                      }}
                    >
                      What I'd Do Differently
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                      {learnings.different.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-60)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            <motion.a
              href="/work"
              whileHover={{ y: -2 }}
              style={{
                padding: '0.875rem 1.75rem',
                borderRadius: 16,
                background: 'rgba(74, 144, 226, 0.15)',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                color: 'rgb(74, 144, 226)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              View Other Projects
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ y: -2 }}
              style={{
                padding: '0.875rem 1.75rem',
                borderRadius: 16,
                background: 'var(--glass-05)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-70)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Get in Touch
            </motion.a>
          </div>
        </div>
      </SnapSection>

      {/* ===== SECTION 16: FUTURE ROADMAP ===== */}
      <SnapSection id="roadmap" background="subtle">
        <div style={{ maxWidth: 1100, width: '100%' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 200,
              color: 'var(--text-90)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            Future Roadmap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-50)',
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Evolution from MVP to comprehensive digital health platform
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            {roadmap.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, boxShadow: `0 12px 40px rgba(${phase.color}, 0.2)` }}
                style={{
                  padding: '1.5rem',
                  borderRadius: 20,
                  background: `rgba(${phase.color}, 0.05)`,
                  border: `1px solid rgba(${phase.color}, 0.3)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Timeframe badge */}
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  padding: '0.25rem 0.5rem',
                  borderRadius: 8,
                  background: `rgba(${phase.color}, 0.2)`,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: `rgb(${phase.color})`,
                  textTransform: 'uppercase',
                }}>
                  {phase.timeframe}
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: `rgb(${phase.color})`,
                  marginBottom: '1.5rem',
                }}>
                  {phase.tier}
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {phase.goals.map((goal, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        color: 'var(--text-60)',
                        marginBottom: '0.75rem',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.4rem',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: `rgb(${phase.color})`,
                      }} />
                      {goal}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '2.5rem',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-60)',
              marginBottom: '1.5rem',
            }}>
              Interested in collaborating on digital health solutions?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="/contact"
                whileHover={{ y: -2 }}
                style={{
                  padding: '0.875rem 1.75rem',
                  borderRadius: 16,
                  background: 'rgba(74, 144, 226, 0.15)',
                  border: '1px solid rgba(74, 144, 226, 0.3)',
                  color: 'rgb(74, 144, 226)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Let's Connect
              </motion.a>
              <motion.a
                href="/work"
                whileHover={{ y: -2 }}
                style={{
                  padding: '0.875rem 1.75rem',
                  borderRadius: 16,
                  background: 'var(--glass-05)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-70)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                View Other Projects
              </motion.a>
            </div>
          </motion.div>
        </div>
      </SnapSection>
    </div>
  );
}
