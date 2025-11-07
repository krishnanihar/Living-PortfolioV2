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
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {/* ECG/Pulse line - animates first */}
      <motion.path
        d="M2 12h3l2-4 2 8 2-4 2 0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
      />

      {/* Brain/neural pattern (simplified organic curves) */}
      <motion.path
        d="M14 8c1.5 0 2.5 1 2.5 2.5c0 0.8-0.3 1.5-0.8 2 0.5 0.3 0.8 0.9 0.8 1.5 0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-0.6 0.3-1.2 0.8-1.5-0.5-0.5-0.8-1.2-0.8-2 0-1.5 1-2.5 2.5-2.5z"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: "easeOut"
        }}
      />

      {/* Medical cross badge (top-right) */}
      <motion.circle
        cx="19"
        cy="7"
        r="2.5"
        stroke="currentColor"
        strokeWidth={1.3}
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.4,
          delay: 1,
          type: "spring",
          stiffness: 200
        }}
      />
      <motion.path
        d="M19 6v2M18 7h2"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 1.2
        }}
      />
    </svg>
  );
}
