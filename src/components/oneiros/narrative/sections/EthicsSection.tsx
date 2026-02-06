'use client';

/**
 * Ethics Section - Dilemma Cards
 *
 * Four expandable cards presenting ethical dilemmas around
 * dream analysis and consciousness as data.
 */

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { OneirosNarrativeState } from '@/hooks/useOneirosNarrativeProgress';

interface EthicsSectionProps {
  narrativeState: OneirosNarrativeState;
}

// Four ethical dilemmas
const DILEMMAS = [
  {
    number: '01',
    title: 'The Promise',
    question: 'What if dreams were data?',
    dilemma: `The technology promises unprecedented self-knowledge. Dream patterns could reveal our deepest fears, desires, and creative potential. But self-knowledge has always come through reflection, not extraction. What happens when understanding becomes a product rather than a practice?`,
    implications: ['Commodified introspection', 'Outsourced self-awareness', 'Data as identity'],
  },
  {
    number: '02',
    title: 'The Interface',
    question: 'How do we touch the intangible?',
    dilemma: `Every interface shapes what it reveals. A dream recorded is a dream interpreted—filtered through sensors, algorithms, and visualizations. The raw experience becomes mediated. Who decides what aspects of dreams are worth capturing? What gets lost in translation?`,
    implications: ['Interpretive bias', 'Technological framing', 'Loss of ambiguity'],
  },
  {
    number: '03',
    title: 'The Ethics',
    question: 'Who owns your dreams?',
    dilemma: `When dreams become data, they enter economies of ownership. The platform that records them, the algorithms that analyze them, the companies that store them—all stake claims. Dreams have always been personal. Can they remain so when they become digital assets?`,
    implications: ['Mental property rights', 'Corporate access', 'Privacy erosion'],
  },
  {
    number: '04',
    title: 'The Mystery',
    question: 'What do we lose by making dreams visible?',
    dilemma: `Dreams have always held mystery—spaces where the unconscious speaks in its own language. Making them legible, categorizable, and shareable may diminish their power. Some things gain value from being ineffable. Are we willing to sacrifice mystery for metrics?`,
    implications: ['Disenchantment', 'Over-explanation', 'Lost meaning'],
  },
];

function DilemmaCard({
  dilemma,
  isExpanded,
  onToggle,
  color,
  index,
}: {
  dilemma: typeof DILEMMAS[0];
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        background: isExpanded ? 'var(--glass-05)' : 'var(--glass-03)',
        border: `1px solid ${isExpanded ? color + '40' : 'var(--text-06)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      {/* Header */}
      <div style={{ padding: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color,
              letterSpacing: '0.1em',
            }}
          >
            {dilemma.number}
          </span>
          <h4
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: '1.125rem',
              fontWeight: 500,
              color: 'var(--text-90)',
            }}
          >
            {dilemma.title}
          </h4>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'var(--text-70)',
            lineHeight: 1.4,
          }}
        >
          "{dilemma.question}"
        </p>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 2rem 2rem',
                borderTop: '1px solid var(--text-08)',
                paddingTop: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-urbanist)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-60)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                {dilemma.dilemma}
              </p>

              {/* Implications */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {dilemma.implications.map((implication) => (
                  <span
                    key={implication}
                    style={{
                      padding: '0.375rem 0.75rem',
                      background: `${color}10`,
                      border: `1px solid ${color}25`,
                      borderRadius: '6px',
                      fontFamily: 'var(--font-newsreader)',
                      fontSize: '0.6875rem',
                      color: color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
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
    </motion.div>
  );
}

export function EthicsSection({ narrativeState }: EthicsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: narrativeState.color.primary,
              marginBottom: '1rem',
            }}
          >
            Ethical Framework
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: 'var(--text-90)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Four questions before you descend
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-urbanist)',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-60)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Each chapter of this journey raises dilemmas that have no easy
            answers. Consider them before entering the palace.
          </p>
        </motion.div>

        {/* Dilemma Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {DILEMMAS.map((dilemma, index) => (
            <DilemmaCard
              key={dilemma.number}
              dilemma={dilemma}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              color={narrativeState.color.primary}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EthicsSection;
