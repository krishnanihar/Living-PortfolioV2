'use client';

import { Sparkles } from 'lucide-react';
import styles from '../styles/mythos.module.css';

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      {/* Background gradient */}
      <div className={styles.heroGradient} />

      {/* Floating particles */}
      <div className={styles.particleLayer}>
        {[...Array(20)].map((_, i) => {
          // Deterministic positions (prevents hydration mismatch)
          const seed = i / 20;
          const left = ((seed * 87.3 + 13.7 + i * 4.2) % 100);
          const top = ((seed * 73.1 + 17.3 + i * 5.7) % 100);
          const delay = ((seed * 5.5 + 0.5 + i * 0.3) % 6);
          const opacity = ((seed * 0.35) + 0.35 + (i % 3) * 0.05);

          return (
            <div
              key={i}
              className={styles.particle}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                width: '2px',
                height: '2px',
                background: '#DA0E29',
                borderRadius: '50%',
                boxShadow: '0 0 8px rgba(218, 14, 41, 0.6)',
                animationDelay: `${delay}s`,
                opacity: opacity,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Badge */}
        <div className={`${styles.fadeInUp} ${styles.badgePulse}`} style={{ animationDelay: '0.3s' }}>
          <div className={styles.badge}>
            <Sparkles className="w-4 h-4 text-[#DA0E29]" />
            <span>Mythos</span>
          </div>
        </div>

        {/* Title */}
        <h1 className={`${styles.heroTitle} ${styles.gradientText} ${styles.fadeInUp}`} style={{ animationDelay: '0.6s' }}>
          The Archive Awakens
        </h1>

        {/* Subtitle */}
        <p className={`${styles.heroSubtitle} ${styles.fadeInUp}`} style={{ animationDelay: '0.9s' }}>
          Whisper your desire—from{' '}
          <span className="text-[#E0D8C8] font-medium">"art that feels like loneliness"</span> to{' '}
          <span className="text-[#E0D8C8] font-medium">"dramatic light in the 17th century."</span>
        </p>

        {/* Value prop */}
        <p className={`${styles.heroSubtitle} ${styles.fadeInUp}`} style={{ animationDelay: '1.2s', opacity: 0.8 }}>
          An ancient AI curator materializes a personal exhibition from{' '}
          <span className="text-white font-semibold">62 masterworks</span> spanning{' '}
          <span className="text-white font-semibold">1,000 years</span> of human expression.
        </p>

        {/* Value props grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ${styles.fadeInUp}`} style={{ animationDelay: '1.5s' }}>
          <ValueProp
            title="Understands Intent"
            description="It deciphers the poetry behind your words, grasping mood, theme, and aesthetic."
          />
          <ValueProp
            title="Sees Connections"
            description="It finds the hidden threads connecting art across centuries, cultures, and styles."
          />
          <ValueProp
            title="Explains Why"
            description="Mythos reveals its reasoning, teaching you to see art through its ancient eyes."
          />
        </div>

        {/* Scroll indicator */}
        <a
          href="#the-problem"
          className={`inline-flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors mt-16 ${styles.fadeInUp} ${styles.scrollDown}`}
          style={{ animationDelay: '1.8s' }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll to discover</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

const ValueProp = ({ title, description }: { title: string; description: string }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70 text-sm leading-relaxed">{description}</p>
  </div>
);
