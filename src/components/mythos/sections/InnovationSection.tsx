'use client';

import { Brain, Link2, Lightbulb, Search, X } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import styles from '../styles/mythos.module.css';

const features = [
  {
    icon: Brain,
    title: 'Understands Intent',
    description: 'Traditional search requires exact keywords. Mythos interprets the feeling behind your words—mood, aesthetic, emotional resonance.',
    example: 'You say: "art that feels like loneliness" → Mythos finds: solitary figures, empty landscapes, melancholic palettes across centuries.'
  },
  {
    icon: Link2,
    title: 'Sees Connections',
    description: 'Museums organize by time and place. Mythos discovers hidden threads—shared motifs, compositional echoes, thematic parallels.',
    example: 'Connects Vermeer\'s domestic light (1650s) with Hopper\'s urban isolation (1940s) through shared use of window-light symbolism.'
  },
  {
    icon: Lightbulb,
    title: 'Explains Why',
    description: 'Wall text assumes expertise. Mythos translates art history into accessible language—symbolism, context, cultural impact.',
    example: 'Instead of: "Mannerist compositional asymmetry" → Mythos says: "The artist purposely made this unbalanced to create tension."'
  }
];

export const InnovationSection = () => {
  return (
    <section id="the-innovation" className={styles.innovationSection}>
      <div className={styles.innovationContent}>
        {/* Section heading */}
        <ScrollReveal animation="fade-up" threshold={0.3}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>
              How AI Curates Differently
            </h2>
            <div className={styles.divider} />
          </div>
        </ScrollReveal>

        {/* Feature grid */}
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              animation="fade-up"
              delay={index * 200}
              threshold={0.2}
            >
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon size={24} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <div className={styles.featureExample}>
                  <div className={styles.exampleLabel}>Example</div>
                  <div className={styles.exampleText}>{feature.example}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Before/After Comparison */}
        <ScrollReveal animation="fade-up" delay={600} threshold={0.2}>
          <div className={styles.comparisonSection}>
            <h3 className={styles.comparisonTitle}>
              Traditional vs. AI-Powered Curation
            </h3>
            <div className={styles.comparisonGrid}>
              {/* Traditional Column */}
              <div className={`${styles.comparisonColumn} ${styles.traditional}`}>
                <div className={styles.comparisonHeader}>
                  <X size={20} />
                  <span>Traditional Museums</span>
                </div>
                <ul className={styles.comparisonList}>
                  <li>Browse by century, region, or artist</li>
                  <li>Pre-defined exhibitions that rarely change</li>
                  <li>One-size-fits-all wall text</li>
                  <li>Requires prior art history knowledge</li>
                  <li>Linear, chronological organization</li>
                </ul>
              </div>

              {/* Mythos Column */}
              <div className={`${styles.comparisonColumn} ${styles.mythos}`}>
                <div className={styles.comparisonHeader}>
                  <Brain size={20} />
                  <span>Mythos AI Curator</span>
                </div>
                <ul className={styles.comparisonList}>
                  <li>Search by emotion, theme, or visual quality</li>
                  <li>Infinite personalized exhibitions on demand</li>
                  <li>Context tailored to your curiosity</li>
                  <li>No expertise required—just curiosity</li>
                  <li>Discovers unexpected cross-century connections</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
