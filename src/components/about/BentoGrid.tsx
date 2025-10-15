'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EducationCard } from './EducationCard';
import { TimelineVisual } from './TimelineVisual';
import { CurrentRoleCard } from './CurrentRoleCard';
import { SkillsMarquee } from './SkillsMarquee';
import { ExperienceCard } from './ExperienceCard';
import { AvailabilityWidget } from './AvailabilityWidget';

export function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
      className="md:grid-cols-2 lg:grid-cols-3"
    >
      {/* First row: Education, Timeline, Currently */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <EducationCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block"
      >
        <TimelineVisual />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <CurrentRoleCard />
      </motion.div>

      {/* Second row: Skills Marquee (full width) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        <SkillsMarquee />
      </motion.div>

      {/* Third row: Experience, Availability */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <ExperienceCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="md:col-span-1 lg:col-span-2"
      >
        <AvailabilityWidget />
      </motion.div>

      {/* Mobile Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block lg:hidden col-span-1 md:col-span-2"
      >
        <TimelineVisual />
      </motion.div>
    </motion.div>
  );
}
