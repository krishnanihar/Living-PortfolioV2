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
    <section style={{
      position: 'relative',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '3rem',
      paddingBottom: '3rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    }}>
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0.2,
          pointerEvents: 'none',
          background: `radial-gradient(circle at 50% 50%, ${actColor.replace('0.8', '0.1')} 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '48rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Act title */}
          <h2
            style={{
              fontSize: 'clamp(3rem, 6vw, 3.75rem)',
              fontWeight: '200',
              marginBottom: '2rem',
              color: 'white',
            }}
          >
            {actTitle}
          </h2>

          {/* Quote */}
          <motion.p
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "{quote}"
          </motion.p>

          {/* Decorative dot */}
          <motion.div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '3rem',
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '9999px',
              background: actColor,
            }}
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
