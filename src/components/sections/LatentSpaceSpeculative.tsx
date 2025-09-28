'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Play,
  Phone,
  Brain,
  Shield,
  Eye,
  Heart,
  Sparkles,
  Activity,
  Waves,
  Layers,
  Network,
  Lock,
  Timer,
  BarChart3,
  Mic,
  Camera,
  FileText,
  Moon,
  Zap
} from 'lucide-react';

/**
 * LATENT SPACE — Speculative Design Experience
 * A critical design fiction exploring dream technology, consciousness interfaces,
 * and the ethics of mental privacy. Questions what we might lose by making the invisible visible.
 */

// Animation variants using proven framer motion patterns
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Base styles that work - using proven inline approach
const baseStyles = {
  main: {
    position: 'relative' as const,
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    overflow: 'hidden' as const,
  },
  section: {
    position: 'relative' as const,
    padding: '5rem 1rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  heroGlass: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(150%)',
    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  }
};

export default function LatentSpaceSpeculative() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main style={baseStyles.main}>
      {/* Background gradient overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.3,
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, transparent 50%, rgba(14, 165, 233, 0.05) 100%)',
        }} />
      </div>

      {/* Hero Section */}
      <HeroSection isLoaded={isLoaded} />

      {/* Design Research Overview */}
      <DesignResearchSection />

      {/* Narrative Arc */}
      <NarrativeArcSection />

      {/* Science Exploration */}
      <ScienceExplorationSection />

      {/* Six Pillars */}
      <SixPillarsSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}

// Hero Section with proven inline styles
function HeroSection({ isLoaded }: { isLoaded: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section style={{
      ...baseStyles.section,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      paddingTop: '8rem',
      paddingBottom: '4rem',
    }}>
      <motion.div
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Card */}
        <div style={{
          ...baseStyles.heroGlass,
          padding: '4rem 3rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              background: 'rgba(218, 14, 41, 0.1)',
              border: '1px solid rgba(218, 14, 41, 0.3)',
              marginBottom: '2rem',
            }}
          >
            <Sparkles size={16} style={{ color: '#DA0E29' }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.8)',
            }}>
              Speculative Design
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{ marginBottom: '2rem' }}
          >
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '200',
              letterSpacing: '-0.025em',
              lineHeight: '0.9',
              marginBottom: '1rem',
            }}>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #ffffff 0%, rgba(147, 51, 234, 0.8) 50%, rgba(14, 165, 233, 0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Latent
              </span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.8) 0%, rgba(147, 51, 234, 0.8) 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Space
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ marginBottom: '3rem' }}
          >
            <p style={{
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: '300',
              letterSpacing: '-0.01em',
              lineHeight: '1.3',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '1rem',
            }}>
              What if we could navigate our dreams through technology while preserving the mystery of consciousness?
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: '400',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.6)',
            }}>
              A speculative exploration questioning the ethics of consciousness interfaces.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              Explore the Questions
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Design Research Section
function DesignResearchSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const researchAreas = [
    {
      count: "04",
      title: "Critical Questions",
      brief: "What should we ask before consciousness becomes data?",
      expanded: "Four foundational questions exploring consent, agency, privacy, and the preservation of human mystery in consciousness technology."
    },
    {
      count: "06",
      title: "Ethical Frameworks",
      brief: "How do we protect mental sovereignty?",
      expanded: "Six frameworks for ensuring human dignity and autonomy in speculative consciousness interfaces."
    },
    {
      count: "03",
      title: "Speculative Scenarios",
      brief: "What futures are we creating?",
      expanded: "Three critical scenarios exploring potential consequences of consciousness technology on society and individual identity."
    },
    {
      count: "05",
      title: "Design Principles",
      brief: "Guidelines for ethical dream interfaces",
      expanded: "Privacy-first design, user agency, transparency, and the preservation of mystery. These principles prioritize human dignity over technological capability."
    }
  ];

  return (
    <section style={baseStyles.section}>
      <div style={{ textAlign: 'center' as const, marginBottom: '4rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              Critical Questions
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'rgba(255, 255, 255, 0.95)',
          }}>
            What should we ask before consciousness becomes data?
          </motion.h2>
        </motion.div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
      }}>
        {researchAreas.map((area, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              style={{
                ...baseStyles.glassCard,
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ...(expandedCard === index ? {
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderColor: 'rgba(218, 14, 41, 0.3)',
                } : {})
              }}
              onMouseEnter={(e) => {
                if (expandedCard !== index) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (expandedCard !== index) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.02)';
                }
              }}
            >
              <div style={{ textAlign: 'center' as const }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '200',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '0.5rem',
                }}>
                  {area.count}
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.025em',
                }}>
                  {area.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.5',
                }}>
                  {area.brief}
                </p>
              </div>

              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      marginTop: '1.5rem',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.6',
                    }}>
                      {area.expanded}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Narrative Arc Section
function NarrativeArcSection() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = [
    {
      number: "01",
      title: "The Promise",
      question: "What if dreams were data?",
      dilemma: "Technology offers unprecedented insight into consciousness, but at what cost to the mystery that makes us human?",
      implications: ["Loss of privacy", "Commercialization of dreams", "Algorithmic interpretation"]
    },
    {
      number: "02",
      title: "The Interface",
      question: "How do we touch the intangible?",
      dilemma: "Creating interfaces for consciousness raises questions about who controls the experience and what gets lost in translation.",
      implications: ["Interface bias", "Reduced complexity", "Digital divide"]
    },
    {
      number: "03",
      title: "The Ethics",
      question: "Who owns your dreams?",
      dilemma: "When consciousness becomes data, questions of ownership, consent, and mental sovereignty become paramount.",
      implications: ["Data ownership", "Consent frameworks", "Mental autonomy"]
    },
    {
      number: "04",
      title: "The Mystery",
      question: "What do we lose?",
      dilemma: "If we could perfectly map and understand our dreams, would this empower us or constrain the freedom of our unconscious minds? Some mysteries might be meant to remain unsolved.",
      implications: ["Death of wonder", "Mechanical consciousness", "Loss of the ineffable"]
    }
  ];

  return (
    <section style={{
      ...baseStyles.section,
      background: 'linear-gradient(180deg, transparent 0%, rgba(147, 51, 234, 0.02) 50%, transparent 100%)',
    }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '5rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              Narrative Arc
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1.5rem',
          }}>
            The Journey from Dreams to Data
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Four chapters exploring the ethical implications of consciousness technology
          </motion.p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '2rem' }}>
        {chapters.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <div
              onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              style={{
                ...baseStyles.glassCard,
                padding: '2.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ...(expandedChapter === index ? {
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderColor: 'rgba(218, 14, 41, 0.3)',
                } : {})
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '2rem',
                    marginBottom: '1rem',
                  }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: '200',
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}>
                      {chapter.number}
                    </span>
                    <div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '0.5rem',
                      }}>
                        {chapter.title}
                      </h3>
                      <p style={{
                        fontSize: '1.125rem',
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}>
                        {chapter.question}
                      </p>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={24}
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    transition: 'transform 0.3s ease',
                    transform: expandedChapter === index ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              </div>

              <AnimatePresence>
                {expandedChapter === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      marginTop: '2rem',
                      paddingTop: '2rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                    }}>
                      {chapter.dilemma}
                    </p>
                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginBottom: '0.75rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase' as const,
                      }}>
                        Implications to Consider
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
                        {chapter.implications.map((implication, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '999px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              fontSize: '0.75rem',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }}
                          >
                            {implication}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Science Exploration Section
function ScienceExplorationSection() {
  const [activeTab, setActiveTab] = useState('stages');

  const tabs = [
    { id: 'stages', label: 'Sleep Stages', icon: Moon },
    { id: 'waves', label: 'Brain Waves', icon: Activity },
    { id: 'detection', label: 'Detection', icon: Eye },
    { id: 'processing', label: 'Processing', icon: Layers },
  ];

  return (
    <section style={baseStyles.section}>
      <div style={{ textAlign: 'center' as const, marginBottom: '5rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              Speculative Science
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1.5rem',
          }}>
            What if we could map consciousness?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Exploring the theoretical frameworks that might enable dream technology
          </motion.p>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap' as const,
        gap: '0.75rem',
        marginBottom: '3rem',
      }}>
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: '400',
                transition: 'all 0.3s ease',
                border: '1px solid',
                cursor: 'pointer',
                ...(activeTab === tab.id ? {
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(218, 14, 41, 0.4)',
                  color: 'rgba(255, 255, 255, 0.9)',
                } : {
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                })
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.02)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <Icon size={16} />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'stages' && <SleepStagesTab key="stages" />}
          {activeTab === 'waves' && <BrainWavesTab key="waves" />}
          {activeTab === 'detection' && <DetectionTab key="detection" />}
          {activeTab === 'processing' && <ProcessingTab key="processing" />}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Sleep Stages Tab
function SleepStagesTab() {
  const stages = [
    { name: "Wake", duration: "10%", description: "Conscious awareness", color: "rgba(34, 197, 94, 0.2)" },
    { name: "N1", duration: "5%", description: "Light sleep transition", color: "rgba(59, 130, 246, 0.2)" },
    { name: "N2", duration: "45%", description: "Deeper sleep with spindles", color: "rgba(99, 102, 241, 0.2)" },
    { name: "N3", duration: "25%", description: "Deep restorative sleep", color: "rgba(236, 72, 153, 0.2)" },
    { name: "REM", duration: "20%", description: "Rapid eye movement dreams", color: "rgba(251, 146, 60, 0.2)" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '1.5rem',
        }}>
          What if we could navigate between sleep stages?
        </h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          lineHeight: '1.6',
        }}>
          Current sleep science identifies distinct stages, each with unique neural signatures.
          But what ethical questions arise if we could consciously control these transitions?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
          {stages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                ...baseStyles.glassCard,
                padding: '1.5rem',
                background: `linear-gradient(90deg, ${stage.color} 0%, rgba(255, 255, 255, 0.02) 100%)`,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h4 style={{
                    fontSize: '1.125rem',
                    fontWeight: '300',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}>
                    {stage.name}
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}>
                    {stage.description}
                  </p>
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}>
                  {stage.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Brain Waves Tab
function BrainWavesTab() {
  const waves = [
    { name: "Delta", range: "0.5-4 Hz", purpose: "Deep sleep", power: 85 },
    { name: "Theta", range: "4-8 Hz", purpose: "REM dreams", power: 65 },
    { name: "Alpha", range: "8-13 Hz", purpose: "Relaxed awareness", power: 45 },
    { name: "Beta", range: "13-30 Hz", purpose: "Active consciousness", power: 30 },
    { name: "Gamma", range: "30-100 Hz", purpose: "Binding consciousness", power: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
      }}
    >
      <div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '1.5rem',
        }}>
          What if consciousness had a frequency?
        </h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '2rem',
          lineHeight: '1.6',
        }}>
          Different brain wave patterns correlate with states of consciousness.
          But can frequency truly capture the richness of subjective experience?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
          {waves.map((wave, index) => (
            <motion.div
              key={wave.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                ...baseStyles.glassCard,
                padding: '1rem',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}>
                <div>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: '300',
                  }}>
                    {wave.name} Wave
                  </span>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.875rem',
                    marginLeft: '0.75rem',
                  }}>
                    {wave.range}
                  </span>
                </div>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                }}>
                  {wave.purpose}
                </span>
              </div>
              <div style={{
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden' as const,
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${wave.power}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #DA0E29, rgba(218, 14, 41, 0.6))',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Detection Tab
function DetectionTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ textAlign: 'center' as const }}
    >
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '300',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '1.5rem',
      }}>
        What patterns would reveal our inner worlds?
      </h3>
      <p style={{
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '0 auto 2rem',
        lineHeight: '1.6',
      }}>
        Detection algorithms might identify dream states, but what happens to the mystery and
        ineffability of consciousness when it becomes measurable data?
      </p>
      <div style={{
        ...baseStyles.glassCard,
        height: '16rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' as const }}>
          <Eye size={48} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '1rem' }} />
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Pattern recognition speculation</p>
        </div>
      </div>
    </motion.div>
  );
}

// Processing Tab
function ProcessingTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ textAlign: 'center' as const }}
    >
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '300',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '1.5rem',
      }}>
        How do you process a dream?
      </h3>
      <p style={{
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '0 auto 2rem',
        lineHeight: '1.6',
      }}>
        The gap between neural activity and subjective experience remains vast.
        What would be lost in translation from consciousness to code?
      </p>
      <div style={{
        ...baseStyles.glassCard,
        height: '16rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' as const }}>
          <Layers size={48} style={{ color: 'rgba(255, 255, 255, 0.3)', marginBottom: '1rem' }} />
          <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Processing pipeline speculation</p>
        </div>
      </div>
    </motion.div>
  );
}

// Six Pillars Section
function SixPillarsSection() {
  const pillars = [
    {
      title: "Consent",
      question: "How do we consent to consciousness technology?",
      description: "Traditional consent models break down when dealing with unconscious states and dream data."
    },
    {
      title: "Agency",
      question: "Who controls the interface?",
      description: "Questions of user agency become complex when consciousness itself becomes the interface."
    },
    {
      title: "Privacy",
      question: "Is mental privacy a fundamental right?",
      description: "The most private space of human experience becomes potentially observable and recordable."
    },
    {
      title: "Ownership",
      question: "Who owns dream data?",
      description: "Legal and ethical frameworks for consciousness data ownership don't yet exist."
    },
    {
      title: "Authenticity",
      question: "What makes an experience real?",
      description: "When dreams can be modified or artificial, questions of authenticity become paramount."
    },
    {
      title: "Mystery",
      question: "Should some things remain unknown?",
      description: "The value of preserving the ineffable and mysterious aspects of human consciousness."
    }
  ];

  const [activePillar, setActivePillar] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActivePillar((prev) => (prev + 1) % pillars.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, pillars.length]);

  const currentPillar = pillars[activePillar];

  return (
    <section
      style={{
        ...baseStyles.section,
        background: 'linear-gradient(180deg, transparent 0%, rgba(14, 165, 233, 0.02) 50%, transparent 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ textAlign: 'center' as const, marginBottom: '5rem' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.3em',
              textTransform: 'uppercase' as const,
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              Critical Pillars
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1.5rem',
          }}>
            Six questions that shape the future
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Each pillar represents a fundamental question about consciousness technology
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '4rem',
        marginBottom: '4rem',
      }}>
        {/* Active Concept */}
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            ...baseStyles.heroGlass,
            padding: '3rem',
            textAlign: 'center' as const,
          }}
        >
          <div style={{
            fontSize: '4rem',
            fontWeight: '200',
            color: 'rgba(218, 14, 41, 0.8)',
            marginBottom: '1rem',
          }}>
            {String(activePillar + 1).padStart(2, '0')}
          </div>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1rem',
          }}>
            {currentPillar.title}
          </h3>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
          }}>
            {currentPillar.question}
          </p>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.6',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            {currentPillar.description}
          </p>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
      }}>
        {pillars.map((_, index) => (
          <button
            key={index}
            onClick={() => setActivePillar(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === activePillar
                ? 'rgba(218, 14, 41, 0.8)'
                : 'rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}

// Footer Section
function FooterSection() {
  return (
    <section style={{
      ...baseStyles.section,
      textAlign: 'center' as const,
      paddingTop: '6rem',
      paddingBottom: '4rem',
    }}>
      <div style={{
        ...baseStyles.glassCard,
        padding: '3rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '1rem',
        }}>
          The Questions Continue
        </h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}>
          This speculative exploration raises more questions than it answers.
          As we stand at the threshold of consciousness technology, the conversations we have today
          will shape the ethical frameworks of tomorrow.
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.875rem',
        }}>
          <span>⚠</span>
          <span>Speculative design • Critical fiction • Ethical questioning</span>
        </div>
      </div>
    </section>
  );
}