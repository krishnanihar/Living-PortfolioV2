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
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
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

      {/* System Architecture Visualization */}
      <SystemArchitectureSection />

      {/* Interactive Prototypes */}
      <InteractivePrototypesSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Interface Speculation */}
      <InterfaceSpeculationSection />

      {/* Six Pillars */}
      <SixPillarsSection />

      {/* Team as Perspectives */}
      <TeamPerspectivesSection />

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
            <Sparkles size={16} style={{ color: 'var(--brand-red)' }} />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: 'var(--text-secondary)',
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
              color: 'var(--text-secondary)',
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
            color: 'var(--text-primary)',
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
                  color: 'var(--text-secondary)',
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
            color: 'var(--text-primary)',
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
            color: 'var(--text-primary)',
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
                  color: 'var(--text-secondary)',
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
                    background: 'linear-gradient(90deg, var(--brand-red), rgba(218, 14, 41, 0.6))',
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
            color: 'var(--text-primary)',
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
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            {currentPillar.title}
          </h3>
          <p style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            color: 'var(--text-secondary)',
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
// System Architecture Visualization Section
function SystemArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dataFlowActive, setDataFlowActive] = useState(false);

  const architectureLayers = [
    {
      name: "Input Layer",
      color: "rgba(218, 14, 41, 0.6)",
      components: [
        { id: "eeg", name: "EEG Sensors", description: "Non-invasive brainwave detection" },
        { id: "env", name: "Environment", description: "Sleep stage and ambient monitoring" },
        { id: "bio", name: "Biometrics", description: "Heart rate, movement, breathing" },
        { id: "user", name: "User Input", description: "Conscious dream intentions" }
      ]
    },
    {
      name: "Processing Layer",
      color: "rgba(147, 51, 234, 0.6)",
      components: [
        { id: "filter", name: "Signal Filter", description: "Noise reduction and amplification" },
        { id: "pattern", name: "Pattern Detection", description: "REM cycle and dream state recognition" },
        { id: "ml", name: "ML Analysis", description: "Learning user-specific patterns" },
        { id: "sync", name: "Synchronization", description: "Real-time processing coordination" }
      ]
    },
    {
      name: "Interface Layer",
      color: "rgba(14, 165, 233, 0.6)",
      components: [
        { id: "render", name: "Visualization", description: "Dream state rendering" },
        { id: "control", name: "Controls", description: "User interaction interfaces" },
        { id: "feedback", name: "Feedback", description: "Gentle lucidity guidance" },
        { id: "record", name: "Recording", description: "Memory capture and storage" }
      ]
    },
    {
      name: "Output Layer",
      color: "rgba(255, 255, 255, 0.6)",
      components: [
        { id: "display", name: "Dream Display", description: "Visual dream representation" },
        { id: "insights", name: "Insights", description: "Pattern analysis and meaning" },
        { id: "export", name: "Export", description: "Save and share capabilities" },
        { id: "privacy", name: "Privacy", description: "Encryption and local storage" }
      ]
    }
  ];

  return (
    <section style={{
      ...baseStyles.section,
      background: 'linear-gradient(180deg, transparent 0%, rgba(147, 51, 234, 0.01) 50%, transparent 100%)',
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
              System Architecture
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            How might consciousness become data?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Explore the speculative layers of dream technology architecture
          </motion.p>
        </motion.div>
      </div>

      {/* Architecture Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        marginBottom: '3rem',
        position: 'relative',
      }}>
        {architectureLayers.map((layer, layerIndex) => (
          <div key={layer.name} style={{ position: 'relative' }}>
            {/* Layer Header */}
            <div style={{
              textAlign: 'center' as const,
              marginBottom: '1.5rem',
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '300',
                color: layer.color,
                marginBottom: '0.5rem',
                letterSpacing: '0.05em',
              }}>
                {layer.name}
              </h3>
              <div style={{
                height: '2px',
                background: layer.color,
                margin: '0 auto',
                width: '60%',
                borderRadius: '1px',
              }} />
            </div>

            {/* Layer Components */}
            <div style={{
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '1rem',
            }}>
              {layer.components.map((component, componentIndex) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (layerIndex * 4 + componentIndex) * 0.1 }}
                  onClick={() => setSelectedNode(selectedNode === component.id ? null : component.id)}
                  style={{
                    ...baseStyles.glassCard,
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    border: selectedNode === component.id
                      ? `2px solid ${layer.color}`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    ...(dataFlowActive ? {
                      boxShadow: `0 0 20px ${layer.color}`,
                      animation: `pulse-${layerIndex} 2s ease-in-out infinite alternate`,
                    } : {})
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
                    (e.currentTarget as HTMLElement).style.borderColor = layer.color;
                  }}
                  onMouseLeave={(e) => {
                    if (selectedNode !== component.id) {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.02)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  {/* Data flow indicator */}
                  {dataFlowActive && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '-1rem',
                      width: '8px',
                      height: '8px',
                      background: layer.color,
                      borderRadius: '50%',
                      animation: 'flow-right 1.5s ease-in-out infinite',
                      animationDelay: `${(layerIndex * 4 + componentIndex) * 0.2}s`,
                    }} />
                  )}

                  <div style={{ textAlign: 'center' as const }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: '0.5rem',
                    }}>
                      {component.name}
                    </h4>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.4',
                    }}>
                      {component.description}
                    </p>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {selectedNode === component.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: `1px solid ${layer.color}`,
                        }}
                      >
                        <p style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.5',
                        }}>
                          Critical Question: How do we ensure this component respects human dignity and mental sovereignty?
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Data Flow Control */}
      <div style={{ textAlign: 'center' as const }}>
        <motion.button
          onClick={() => setDataFlowActive(!dataFlowActive)}
          style={{
            ...baseStyles.glassCard,
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '400',
            color: dataFlowActive ? 'var(--brand-red)' : 'var(--text-secondary)',
            border: dataFlowActive ? '2px solid var(--brand-red)' : '1px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Activity size={16} />
          {dataFlowActive ? 'Stop Data Flow' : 'Start Data Flow'}
        </motion.button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flow-right {
          0% { opacity: 0; transform: translateX(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(2rem); }
        }
        @keyframes pulse-0 {
          0% { box-shadow: 0 0 20px rgba(218, 14, 41, 0.3); }
          100% { box-shadow: 0 0 30px rgba(218, 14, 41, 0.6); }
        }
        @keyframes pulse-1 {
          0% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          100% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.6); }
        }
        @keyframes pulse-2 {
          0% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); }
          100% { box-shadow: 0 0 30px rgba(14, 165, 233, 0.6); }
        }
        @keyframes pulse-3 {
          0% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.6); }
        }
      `}</style>
    </section>
  );
}

// Interactive Prototypes Section
function InteractivePrototypesSection() {
  const [activePrototype, setActivePrototype] = useState('explorer');
  const [dreamFragments, setDreamFragments] = useState<Array<{id: string, x: number, y: number, text: string}>>([]);
  const [isRecording, setIsRecording] = useState(false);

  const prototypes = [
    {
      id: 'explorer',
      name: 'Dream Explorer',
      description: 'Click to add floating dream fragments that auto-connect',
      icon: Brain
    },
    {
      id: 'timeline',
      name: 'Sleep Timeline',
      description: 'Hourly breakdown visualization of sleep cycles',
      icon: Timer
    },
    {
      id: 'patterns',
      name: 'Pattern Analysis',
      description: 'Discovering recurring themes in dream data',
      icon: BarChart3
    },
    {
      id: 'voice',
      name: 'Voice Capture',
      description: 'Simulated recording interface with waveform',
      icon: Mic
    }
  ];

  const addDreamFragment = (e: React.MouseEvent) => {
    if (activePrototype !== 'explorer') return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const fragments = [
      "floating through starlight",
      "doors that lead nowhere",
      "conversations with strangers",
      "flying over cities",
      "childhood memories",
      "impossible architectures"
    ];

    const newFragment = {
      id: Date.now().toString(),
      x,
      y,
      text: fragments[Math.floor(Math.random() * fragments.length)]
    };

    setDreamFragments(prev => [...prev, newFragment]);
  };

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
              Interactive Prototypes
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            What might the interfaces look like?
          </motion.h2>
        </motion.div>
      </div>

      {/* Prototype Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap' as const,
      }}>
        {prototypes.map((prototype, index) => {
          const Icon = prototype.icon;
          return (
            <motion.button
              key={prototype.id}
              onClick={() => setActivePrototype(prototype.id)}
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
                border: activePrototype === prototype.id
                  ? '2px solid var(--brand-red)'
                  : '1px solid rgba(255, 255, 255, 0.2)',
                background: activePrototype === prototype.id
                  ? 'rgba(218, 14, 41, 0.1)'
                  : 'rgba(255, 255, 255, 0.02)',
                color: activePrototype === prototype.id
                  ? 'var(--brand-red)'
                  : 'var(--text-secondary)',
                cursor: 'pointer',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={16} />
              {prototype.name}
            </motion.button>
          );
        })}
      </div>

      {/* Prototype Display */}
      <div style={{
        ...baseStyles.glassCard,
        padding: '3rem',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <AnimatePresence mode="wait">
          {activePrototype === 'explorer' && (
            <motion.div
              key="explorer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                height: '100%',
                width: '100%',
                cursor: 'crosshair',
                position: 'relative',
              }}
              onClick={addDreamFragment}
            >
              <div style={{ textAlign: 'center' as const, marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '0.5rem',
                }}>
                  Dream Fragment Explorer
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}>
                  Click anywhere to add dream fragments and watch them connect
                </p>
              </div>

              {/* Dream Fragments */}
              {dreamFragments.map((fragment) => (
                <motion.div
                  key={fragment.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: 'absolute',
                    left: `${fragment.x}%`,
                    top: `${fragment.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(218, 14, 41, 0.2)',
                    border: '1px solid rgba(218, 14, 41, 0.4)',
                    borderRadius: '999px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDreamFragments(prev => prev.filter(f => f.id !== fragment.id));
                  }}
                >
                  {fragment.text}
                </motion.div>
              ))}

              {/* Connection lines between fragments */}
              <svg style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}>
                {dreamFragments.map((fragment, index) =>
                  dreamFragments.slice(index + 1).map((otherFragment, otherIndex) => (
                    <motion.line
                      key={`${fragment.id}-${otherFragment.id}`}
                      x1={`${fragment.x}%`}
                      y1={`${fragment.y}%`}
                      x2={`${otherFragment.x}%`}
                      y2={`${otherFragment.y}%`}
                      stroke="rgba(218, 14, 41, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  ))
                )}
              </svg>
            </motion.div>
          )}

          {activePrototype === 'voice' && (
            <motion.div
              key="voice"
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
                Voice Dream Capture
              </h3>

              <motion.button
                onClick={() => setIsRecording(!isRecording)}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: isRecording
                    ? 'rgba(218, 14, 41, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isRecording
                    ? '3px solid var(--brand-red)'
                    : '2px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '2rem auto',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isRecording ? {
                  boxShadow: ['0 0 0 0 rgba(218, 14, 41, 0.4)', '0 0 0 20px rgba(218, 14, 41, 0)']
                } : {}}
                transition={isRecording ? { duration: 1.5, repeat: Infinity } : {}}
              >
                <Mic size={32} color={isRecording ? 'var(--brand-red)' : 'rgba(255, 255, 255, 0.6)'} />
              </motion.button>

              {/* Waveform Visualization */}
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2px',
                    height: '40px',
                    marginBottom: '2rem',
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{
                        width: '3px',
                        background: 'var(--brand-red)',
                        borderRadius: '1px',
                      }}
                      animate={{
                        height: [5, Math.random() * 30 + 10, 5],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
              }}>
                {isRecording ? 'Recording your dream narrative...' : 'Click to start recording'}
              </p>
            </motion.div>
          )}

          {(activePrototype === 'timeline' || activePrototype === 'patterns') && (
            <motion.div
              key={activePrototype}
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
                {activePrototype === 'timeline' ? 'Sleep Timeline Visualization' : 'Pattern Recognition Engine'}
              </h3>
              <div style={{
                height: '200px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed rgba(255, 255, 255, 0.2)',
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                  Interactive {activePrototype === 'timeline' ? 'timeline' : 'analysis'} prototype would appear here
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Vision Section
function VisionSection() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const visionQuestions = [
    {
      question: "What if dreams became data?",
      scenario: "In a world where every dream is captured, analyzed, and stored, we discover patterns we never knew existed. But do we lose the poetry of the unconscious mind in our pursuit of understanding?",
      implications: ["Loss of mental privacy", "Commodification of consciousness", "Death of mystery"]
    },
    {
      question: "Who decides what dreams mean?",
      scenario: "When algorithms interpret our most intimate thoughts, who controls the narrative? The platform? The corporation? The government? Or do we retain sovereignty over our own consciousness?",
      implications: ["Algorithmic bias in interpretation", "Corporate control of meaning", "Erosion of personal narrative"]
    },
    {
      question: "What do we lose when we capture dreams?",
      scenario: "Dreams have always been ephemeral—fleeting glimpses into our subconscious that fade with morning light. In making them permanent, do we fundamentally change what it means to dream?",
      implications: ["End of forgetting", "Mechanization of wonder", "Loss of the ineffable"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestion((prev) => (prev + 1) % visionQuestions.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [visionQuestions.length]);

  return (
    <section style={{
      ...baseStyles.section,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)',
      paddingTop: '8rem',
      paddingBottom: '8rem',
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
              Speculative Futures
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '200',
            letterSpacing: '-0.03em',
            lineHeight: '1',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
          }}>
            Questions Without Answers
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            The future isn't predetermined. These are the questions we must ask before consciousness becomes code.
          </motion.p>
        </motion.div>
      </div>

      {/* Video Placeholder */}
      <div style={{
        marginBottom: '6rem',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            ...baseStyles.glassCard,
            width: '100%',
            maxWidth: '800px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
          }} />

          <motion.div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(218, 14, 41, 0.2)' }}
            whileTap={{ scale: 0.9 }}
          >
            <Play size={32} color="var(--text-secondary)" />
          </motion.div>

          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.5rem',
            textAlign: 'center',
          }}>
            Concept Film: The Last Dream
          </h3>

          <p style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            A speculative documentary exploring what we might lose when dreams become data
          </p>
        </motion.div>
      </div>

      {/* Vision Questions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {visionQuestions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            onClick={() => setActiveQuestion(index)}
            style={{
              ...baseStyles.glassCard,
              padding: '3rem',
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              border: activeQuestion === index
                ? '2px solid rgba(218, 14, 41, 0.4)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeQuestion === index
                ? 'rgba(218, 14, 41, 0.05)'
                : 'rgba(255, 255, 255, 0.02)',
            }}
            whileHover={{
              scale: 1.02,
              background: 'rgba(255, 255, 255, 0.04)',
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '300',
              color: activeQuestion === index ? 'var(--brand-red)' : 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            }}>
              {item.question}
            </h3>

            <p style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.6',
              marginBottom: '2rem',
            }}>
              {item.scenario}
            </p>

            <AnimatePresence>
              {activeQuestion === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    borderTop: '1px solid rgba(218, 14, 41, 0.3)',
                    paddingTop: '1.5rem',
                  }}
                >
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase' as const,
                  }}>
                    Critical Implications
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap' as const,
                    gap: '0.75rem',
                  }}>
                    {item.implications.map((implication, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(218, 14, 41, 0.1)',
                          border: '1px solid rgba(218, 14, 41, 0.3)',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {implication}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Interface Speculation Section
function InterfaceSpeculationSection() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const interfaceScreens = [
    {
      title: "Dream Capture",
      description: "Non-invasive consciousness monitoring",
      features: ["EEG Integration", "Privacy First", "Local Processing"]
    },
    {
      title: "Pattern Recognition",
      description: "Understanding without invasiveness",
      features: ["Personal Patterns", "No Cloud Storage", "Your Data Only"]
    },
    {
      title: "Gentle Interaction",
      description: "Respecting the mystery of dreams",
      features: ["Opt-in Analysis", "Preserve Wonder", "Human Dignity"]
    }
  ];

  const designPrinciples = [
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "All processing happens locally. Your dreams never leave your device."
    },
    {
      icon: Heart,
      title: "Human Dignity",
      description: "Technology serves consciousness, not the other way around."
    },
    {
      icon: Lock,
      title: "Consent First",
      description: "Every interaction requires explicit, informed consent."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Open algorithms, clear processes, no black boxes."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % interfaceScreens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [interfaceScreens.length]);

  return (
    <section style={{
      ...baseStyles.section,
      background: 'linear-gradient(180deg, transparent 0%, rgba(14, 165, 233, 0.02) 50%, transparent 100%)',
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
              Interface Speculation
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            How might we design for consciousness?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Speculative interfaces that prioritize human dignity over technological capability
          </motion.p>
        </motion.div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, rotateY: -30 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            perspective: '1000px',
          }}
        >
          <motion.div
            style={{
              width: '280px',
              height: '580px',
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              borderRadius: '40px',
              padding: '20px',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              position: 'relative',
              transformStyle: 'preserve-3d' as const,
            }}
            animate={{
              rotateY: isRotating ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isRotating ? Infinity : 0,
            }}
            onMouseEnter={() => setIsRotating(true)}
            onMouseLeave={() => setIsRotating(false)}
          >
            {/* Phone Screen */}
            <div style={{
              width: '100%',
              height: '100%',
              background: '#000',
              borderRadius: '30px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    padding: '2rem 1.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column' as const,
                    justifyContent: 'center',
                    textAlign: 'center' as const,
                  }}
                >
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '300',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}>
                    {interfaceScreens[currentScreen].title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '2rem',
                    lineHeight: '1.5',
                  }}>
                    {interfaceScreens[currentScreen].description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: '0.75rem',
                  }}>
                    {interfaceScreens[currentScreen].features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(218, 14, 41, 0.1)',
                          border: '1px solid rgba(218, 14, 41, 0.3)',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Screen indicators */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.5rem',
              }}>
                {interfaceScreens.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: currentScreen === index
                        ? 'var(--brand-red)'
                        : 'rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '300',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
          }}>
            Design Principles
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1.5rem',
          }}>
            {designPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  style={{
                    ...baseStyles.glassCard,
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
                  <div style={{
                    background: 'rgba(14, 165, 233, 0.1)',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={20} color="rgba(14, 165, 233, 0.8)" />
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '400',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: '0.5rem',
                    }}>
                      {principle.title}
                    </h4>

                    <p style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: '1.5',
                    }}>
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Team as Perspectives Section
function TeamPerspectivesSection() {
  const [activeQuestioner, setActiveQuestioner] = useState(0);

  const questioners = [
    {
      role: "The Neuroscientist",
      name: "Dr. Neural",
      perspective: "Scientific Inquiry",
      question: "How do we measure consciousness without reducing it to mere data?",
      concern: "In our pursuit of understanding the brain's electrical patterns during dreams, we risk losing sight of the subjective experience that makes consciousness fundamentally human. Can objective science capture subjective reality?",
      color: "rgba(218, 14, 41, 0.6)"
    },
    {
      role: "The Designer",
      name: "Alex Interface",
      perspective: "Human-Centered Design",
      question: "What interfaces respect the intimacy of consciousness?",
      concern: "Every design decision shapes how users interact with their own minds. If we create interfaces for consciousness, how do we ensure they enhance rather than commodify human experience? What aesthetic language honors the sacred?",
      color: "rgba(147, 51, 234, 0.6)"
    },
    {
      role: "The Ethicist",
      name: "Sam Moral",
      perspective: "Rights & Dignity",
      question: "Who owns the data of your dreams?",
      concern: "When consciousness becomes information, we enter uncharted territory of human rights. Who has access? Who profits? How do we ensure mental sovereignty in an age of surveillance capitalism? The stakes couldn't be higher.",
      color: "rgba(14, 165, 233, 0.6)"
    },
    {
      role: "The Dreamer",
      name: "River Subconscious",
      perspective: "Lived Experience",
      question: "What magic do we lose when dreams become data?",
      concern: "Dreams have always been mysteries—fleeting gifts from our unconscious minds. In making them visible, tangible, analyzable, do we kill the very thing that makes them powerful? Some doors perhaps should remain closed.",
      color: "rgba(255, 255, 255, 0.6)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuestioner((prev) => (prev + 1) % questioners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [questioners.length]);

  return (
    <section style={{
      ...baseStyles.section,
      background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)',
      paddingTop: '8rem',
      paddingBottom: '8rem',
    }}>
      <div style={{ textAlign: 'center' as const, marginBottom: '6rem' }}>
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
              Critical Voices
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '200',
            letterSpacing: '-0.03em',
            lineHeight: '1',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
          }}>
            Who Questions the Future?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Four archetypal perspectives questioning consciousness technology
          </motion.p>
        </motion.div>
      </div>

      {/* Questioner Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem',
      }}>
        {questioners.map((questioner, index) => (
          <motion.div
            key={questioner.role}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onClick={() => setActiveQuestioner(index)}
            style={{
              ...baseStyles.glassCard,
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              border: activeQuestioner === index
                ? `2px solid ${questioner.color}`
                : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeQuestioner === index
                ? questioner.color.replace('0.6', '0.05')
                : 'rgba(255, 255, 255, 0.02)',
              textAlign: 'center' as const,
            }}
            whileHover={{
              scale: 1.02,
              background: questioner.color.replace('0.6', '0.03'),
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: questioner.color.replace('0.6', '0.2'),
              border: `2px solid ${questioner.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.5rem',
              fontWeight: '300',
              color: questioner.color,
            }}>
              {questioner.name.split(' ').map(n => n[0]).join('')}
            </div>

            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '300',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              {questioner.role}
            </h3>

            <p style={{
              fontSize: '0.875rem',
              color: questioner.color,
              marginBottom: '1rem',
              fontWeight: '400',
            }}>
              {questioner.perspective}
            </p>

            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
              lineHeight: '1.5',
            }}>
              "{questioner.question}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* Active Questioner Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuestioner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{
            ...baseStyles.glassCard,
            padding: '3rem',
            maxWidth: '900px',
            margin: '0 auto',
            border: `2px solid ${questioners[activeQuestioner].color}`,
            background: questioners[activeQuestioner].color.replace('0.6', '0.03'),
          }}
        >
          <div style={{ textAlign: 'center' as const, marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '300',
              color: questioners[activeQuestioner].color,
              marginBottom: '1rem',
            }}>
              {questioners[activeQuestioner].role} Speaks
            </h3>

            <div style={{
              height: '2px',
              width: '80px',
              background: questioners[activeQuestioner].color,
              margin: '0 auto',
              borderRadius: '1px',
            }} />
          </div>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            textAlign: 'center' as const,
          }}>
            {questioners[activeQuestioner].concern}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '3rem',
      }}>
        {questioners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveQuestioner(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: activeQuestioner === index
                ? questioners[index].color
                : 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}

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