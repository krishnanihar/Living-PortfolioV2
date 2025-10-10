'use client';

import { ScrollReveal } from '../ui/ScrollReveal';
import styles from '../styles/mythos.module.css';

export const CTASection = () => {
  return (
    <section id="the-cta" className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <ScrollReveal animation="fade-up" threshold={0.3}>
          <h2 className={styles.ctaTitle}>
            Ready to Explore?
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200} threshold={0.3}>
          <p className={styles.ctaSubtitle}>
            Mythos is in active development. Experience the future of art discovery through AI-powered curation.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="scale" delay={400} threshold={0.3}>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaButtonPrimary}>
              Try Demo (Coming Soon)
            </button>
            <button className={styles.ctaButtonSecondary}>
              View on GitHub
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={600} threshold={0.3}>
          <div className={styles.ctaFooter}>
            <p className={styles.ctaFooterText}>
              A research project by Krishnan Ihar Sunkara
            </p>
            <div className={styles.ctaFooterLinks}>
              <a href="/" className={styles.ctaFooterLink}>
                Back to Portfolio
              </a>
              <a href="/work" className={styles.ctaFooterLink}>
                View Other Projects
              </a>
              <a href="/contact" className={styles.ctaFooterLink}>
                Get in Touch
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
