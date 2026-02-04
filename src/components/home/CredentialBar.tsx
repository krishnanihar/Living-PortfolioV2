'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export interface Credential {
  logo: string;
  name: string;
  role?: string;
  isPhoto?: boolean; // Photos can't use monochrome filter
  scale?: number; // Optional scale multiplier for individual logos
}

export interface CredentialBarProps {
  credentials?: Credential[];
  className?: string;
}

const defaultCredentials: Credential[] = [
  { logo: '/logos/nid-light.svg', name: 'NID Gandhinagar', role: 'Graduate' },
  { logo: '/logos/ISB.jpeg', name: 'ISB Hyderabad', role: 'Product', isPhoto: true },
  { logo: '/logos/infosys.svg', name: 'Infosys', role: 'Former' },
  { logo: '/logos/air-india.svg', name: 'Air India', role: 'Current', scale: 1.4 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export function CredentialBar({
  credentials = defaultCredentials,
  className = '',
}: CredentialBarProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode (site default) until mounted
  const isDark = mounted ? resolvedTheme !== 'light' : true;

  // Get filter for each credential type
  const getFilter = (cred: Credential) => {
    if (cred.isPhoto) {
      // Photos: just grayscale (preserves image)
      return 'grayscale(100%)';
    }
    // SVGs: convert to white (dark mode) or black (light mode)
    return isDark
      ? 'brightness(0) invert(1)'
      : 'brightness(0)';
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(1.25rem, 3vw, 2rem)',
      }}
    >
      {credentials.map((cred) => (
        <motion.div
          key={cred.name}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default',
            padding: '0.5rem',
          }}
        >
          <motion.div
            variants={{
              hover: {
                opacity: 0.9,
                filter: 'none',
              },
            }}
            style={{
              position: 'relative',
              width: `calc(clamp(26px, 3.5vw, 32px) * ${cred.scale || 1})`,
              height: `calc(clamp(26px, 3.5vw, 32px) * ${cred.scale || 1})`,
              opacity: 0.4,
              filter: getFilter(cred),
              transition: 'opacity 0.3s ease, filter 0.3s ease',
            }}
            title={cred.name}
          >
            <Image
              src={cred.logo}
              alt={cred.name}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </motion.div>
          {cred.role && (
            <motion.span
              variants={{
                hover: {
                  opacity: 1,
                },
              }}
              initial={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.5625rem',
                fontWeight: 500,
                color: 'var(--text-40)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {cred.role}
            </motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default CredentialBar;
