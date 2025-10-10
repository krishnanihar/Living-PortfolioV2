'use client';

import { ScrollReveal } from '../ui/ScrollReveal';
import styles from '../styles/mythos.module.css';

const useCases = [
  {
    title: 'For Curious Minds',
    description: 'Explore art through your own questions and curiosities. No need to know the "right" terminology or historical periods.'
  },
  {
    title: 'For Visual Thinkers',
    description: 'Discover artworks based on how they look and feel, not just who made them or when they were created.'
  },
  {
    title: 'For Lifelong Learners',
    description: 'Get expert-level analysis and context for every artwork—symbolism, history, cultural impact—without academic jargon.'
  },
  {
    title: 'For Creative Projects',
    description: 'Generate thematic art collections for mood boards, creative research, or discovering visual inspiration.'
  }
];

const techStack = [
  'Next.js 15',
  'TypeScript',
  'Gemini AI',
  'Tailwind CSS',
  'Framer Motion'
];

export const ImpactSection = () => {
  return (
    <section id="the-impact" className={styles.impactSection}>
      <div className={styles.impactContent}>
        {/* Section heading */}
        <ScrollReveal animation="fade-up" threshold={0.3}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>
              Who Is This For?
            </h2>
            <div className={styles.divider} />
          </div>
        </ScrollReveal>

        {/* Use case grid */}
        <div className={styles.useCaseGrid}>
          {useCases.map((useCase, index) => (
            <ScrollReveal
              key={useCase.title}
              animation="fade-up"
              delay={index * 150}
              threshold={0.2}
            >
              <div className={styles.useCaseCard}>
                <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
                <p className={styles.useCaseDescription}>{useCase.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tech stack */}
        <ScrollReveal animation="fade-up" delay={600} threshold={0.2}>
          <div className={styles.techStack}>
            <h3 className={styles.techStackTitle}>Built With Modern Technology</h3>
            <div className={styles.techBadges}>
              {techStack.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
