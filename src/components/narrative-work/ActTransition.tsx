'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ActTransitionProps {
  actTitle: string;
  quote: string;
  actColor: string;
}

/**
 * Visual transition between narrative acts
 * Announces new act with color theme
 */
export function ActTransition({ actTitle, quote, actColor }: ActTransitionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${actColor.replace('0.8', '0.1')} 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Act title */}
          <h2
            className="text-5xl md:text-6xl font-extralight mb-8"
            style={{
              background: `linear-gradient(135deg, ${actColor} 0%, ${actColor.replace('0.8', '0.4')} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {actTitle}
          </h2>

          {/* Quote */}
          <motion.p
            className="text-xl md:text-2xl font-light text-white/70 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "{quote}"
          </motion.p>

          {/* Decorative dot */}
          <motion.div
            className="mx-auto mt-12 w-2 h-2 rounded-full"
            style={{ background: actColor }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
