'use client';

import { motion } from 'framer-motion';

interface HealthcareResearchIconProps {
  size?: number;
  className?: string;
}

export function HealthcareResearchIcon({
  size = 24,
  className = ''
}: HealthcareResearchIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: 'inline-block' }}
      // Hover animation for entire icon
      whileHover={{
        scale: 1.15,
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1], // Premium cubic-bezier
      }}
    >
      {/* ECG/Pulse line - animates first, then breathes */}
      <motion.path
        d="M2 12h3l2-4 2 8 2-4 2 0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: [1, 0.7, 1], // Breathing opacity
        }}
        transition={{
          pathLength: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          opacity: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5, // Start breathing after draw-in completes
          },
        }}
        whileHover={{
          opacity: 1,
          strokeDasharray: "1 3", // Pulse effect on hover
        }}
      />

      {/* Brain/neural pattern - subtle breathing with reduced opacity */}
      <motion.path
        d="M14 8c1.5 0 2.5 1 2.5 2.5c0 0.8-0.3 1.5-0.8 2 0.5 0.3 0.8 0.9 0.8 1.5 0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-0.6 0.3-1.2 0.8-1.5-0.5-0.5-0.8-1.2-0.8-2 0-1.5 1-2.5 2.5-2.5z"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: [0.5, 0.35, 0.5], // Breathing opacity (starts at 0.5)
        }}
        transition={{
          pathLength: { duration: 1, delay: 0.5, ease: "easeOut" },
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          },
        }}
        whileHover={{
          opacity: 0.8, // Boost on hover
        }}
      />

      {/* Medical cross circle - subtle scale pulse */}
      <motion.circle
        cx="19"
        cy="7"
        r="2.5"
        stroke="currentColor"
        strokeWidth={1.3}
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [1, 1.08, 1], // Subtle breathing scale
          opacity: 1,
        }}
        transition={{
          scale: {
            duration: 0.4,
            delay: 1,
            type: "spring",
            stiffness: 200,
          },
          opacity: {
            duration: 0.4,
            delay: 1,
          },
        }}
        style={{ transformOrigin: '19px 7px' }}
      />

      {/* Medical cross badge - breathes and rotates on hover */}
      <motion.path
        d="M19 6v2M18 7h2"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: [1, 0.8, 1], // Subtle opacity breathing
          scale: [1, 1.05, 1], // Subtle scale pulse
        }}
        transition={{
          pathLength: { duration: 0.3, delay: 1.2 },
          opacity: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
          scale: {
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
        }}
        whileHover={{
          rotate: 90, // Spin cross on hover
          opacity: 1,
        }}
        style={{ transformOrigin: '19px 7px' }}
      />
    </motion.svg>
  );
}
