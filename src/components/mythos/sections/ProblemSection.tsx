'use client';

import { ScrollReveal } from '../ui/ScrollReveal';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import styles from '../styles/mythos.module.css';

export const ProblemSection = () => {
  return (
    <section id="the-problem" className={styles.problemSection}>
      <div className={styles.problemContent}>
        {/* Section heading */}
        <ScrollReveal animation="fade-up" threshold={0.3}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>
              Art Galleries Are Intimidating
            </h2>
            <div className={styles.divider} />
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className={styles.twoColumn}>
          {/* Left: Visual */}
          <ScrollReveal animation="slide-right" threshold={0.3}>
            <div className={styles.problemCard}>
              {/* Simulated museum categories - rigid and uninspiring */}
              <div className="space-y-3">
                <div className="h-3 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-2/3" />
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-5/6" />
                <div className="h-3 bg-white/10 rounded w-3/4" />
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-4/5" />
              </div>
              {/* Large question mark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-10">?</span>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#DA0E29]/10 rounded-full blur-3xl" />
            </div>
          </ScrollReveal>

          {/* Right: Problem statements */}
          <div className={styles.problemList}>
            <ScrollReveal animation="slide-left" delay={200} threshold={0.3}>
              <div className={styles.problemItem}>
                <div className={styles.problemNumber}>1</div>
                <div className={styles.problemText}>
                  <h3>Rigid Categories</h3>
                  <p>
                    Museums organize by period, region, or medium—but that's not how you <em>feel</em> art.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-left" delay={400} threshold={0.3}>
              <div className={styles.problemItem}>
                <div className={styles.problemNumber}>2</div>
                <div className={styles.problemText}>
                  <h3>Overwhelming Catalogs</h3>
                  <p>
                    Thousands of works with no guidance. Where do you even start?
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-left" delay={600} threshold={0.3}>
              <div className={styles.problemItem}>
                <div className={styles.problemNumber}>3</div>
                <div className={styles.problemText}>
                  <h3>No Emotional Connection</h3>
                  <p>
                    There's no bridge between what you're feeling and what's on the walls.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Transition statement */}
        <ScrollReveal animation="fade-up" delay={800} threshold={0.3}>
          <div className={styles.transitionStatement}>
            <p className={styles.transitionText}>
              What if art could find{' '}
              <span className={`${styles.gradientText}`}>you</span>, instead?
            </p>

            {/* Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  <AnimatedCounter end={62} />
                </div>
                <div className={styles.statLabel}>Masterworks</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  <AnimatedCounter end={1000} />
                </div>
                <div className={styles.statLabel}>Years</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>∞</div>
                <div className={styles.statLabel}>Emotions</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
