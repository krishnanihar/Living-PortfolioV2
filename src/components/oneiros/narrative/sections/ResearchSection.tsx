'use client';

/**
 * Research Section - "Surveillance Dreams"
 *
 * Historical and research context on dream monitoring,
 * corporate sleep tracking, and privacy implications.
 */

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';

interface ResearchSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Research cards with expandable content
const RESEARCH_CARDS = [
  {
    id: 'history',
    title: 'Historical Dream Research',
    preview: 'From Freud to neuroscience',
    content: `Dreams have been studied for over a century. Freud's "The Interpretation of Dreams" (1899) launched modern dream analysis. Today, we can detect REM sleep with EEG, track eye movements, and even predict dream content from brain activity patterns. The question is no longer "can we study dreams?" but "should we?"`,
    source: 'Neuroscience literature',
  },
  {
    id: 'corporate',
    title: 'Corporate Sleep Tracking',
    preview: 'Your sleep data as a commodity',
    content: `Major tech companies already collect sleep data through wearables and smart mattresses. This data is used for "wellness insights" but also informs advertising, insurance premiums, and employment decisions. Sleep scores are becoming another metric of human optimization.`,
    source: 'Industry analysis',
  },
  {
    id: 'neural',
    title: 'Neural Interface Ethics',
    preview: 'When thoughts become readable',
    content: `Brain-computer interfaces are advancing rapidly. Companies like Neuralink and Kernel are developing consumer neural interfaces. As these technologies mature, the boundary between private thought and readable data will blur. Dream monitoring may become as common as fitness tracking.`,
    source: 'Tech ethics research',
  },
  {
    id: 'consent',
    title: 'Consent in Sleep',
    preview: 'Can you consent while unconscious?',
    content: `Traditional consent models assume a conscious, deliberating individual. But what about consent for data collection during sleep? If you agree to dream tracking tonight, does that consent extend to tomorrow's dreams? To dreams you don't remember? To content you'd rather keep private?`,
    source: 'Bioethics literature',
  },
];

function ResearchCard({
  card,
  isExpanded,
  onToggle,
  color,
  index,
}: {
  card: typeof RESEARCH_CARDS[0];
  isExpanded: boolean;
  onToggle: () => void;
  color: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: 'var(--glass-03)',
        border: `1px solid ${isExpanded ? color + '30' : 'var(--text-06)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-85)',
              marginBottom: '0.25rem',
            }}
          >
            {card.title}
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.8125rem',
              color: 'var(--text-50)',
            }}
          >
            {card.preview}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: isExpanded ? `${color}15` : 'var(--glass-05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ChevronDown
            size={18}
            style={{ color: isExpanded ? color : 'var(--text-50)' }}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 1.5rem 1.5rem',
                borderTop: '1px solid var(--text-06)',
                marginTop: '0.5rem',
                paddingTop: '1.25rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-70)',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}
              >
                {card.content}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Source: {card.source}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ResearchSection({ narrativeState }: ResearchSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: narrativeState.color.primary,
              marginBottom: '1rem',
            }}
          >
            Surveillance Dreams
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--text-90)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            The research behind the questions
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Dream monitoring isn't science fiction. The technologies exist—the
            question is how we choose to use them.
          </p>
        </motion.div>

        {/* Research Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {RESEARCH_CARDS.map((card, index) => (
            <ResearchCard
              key={card.id}
              card={card}
              isExpanded={expandedId === card.id}
              onToggle={() => setExpandedId(expandedId === card.id ? null : card.id)}
              color={narrativeState.color.primary}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResearchSection;
