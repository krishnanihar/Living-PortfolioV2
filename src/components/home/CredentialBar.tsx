'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/components/effects/ThemeProvider';

export interface Credential {
  logo: string;
  lightLogo?: string; // Optional different logo for light mode
  name: string;
  role?: string;
  isPhoto?: boolean; // Photos can't use monochrome filter
  scale?: number; // Optional scale multiplier for individual logos
  hoverFilter?: string; // Custom CSS filter on hover
}

export interface CredentialBarProps {
  credentials?: Credential[];
  className?: string;
}

const defaultCredentials: Credential[] = [
  { logo: '/logos/nid-light.svg', lightLogo: '/logos/nid-dark.svg', name: 'NID Gandhinagar', role: 'Graduate' },
  { logo: '/logos/isbnew.svg', name: 'ISB Hyderabad', role: 'Product', hoverFilter: 'brightness(0) invert(27%) sepia(83%) saturate(1500%) hue-rotate(185deg) brightness(92%)' },
  { logo: '/logos/infosys.svg', lightLogo: '/logos/infosys-dark.svg', name: 'Infosys', role: 'Former' },
  { logo: '/logos/air-india.svg', lightLogo: '/logos/air-india-dark.svg', name: 'Air India', role: 'Current', scale: 1.4 },
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

  // ThemeProvider already handles hydration - resolvedTheme is ready to use
  const isLight = resolvedTheme === 'light';

  // Get the appropriate logo source based on theme
  const getLogoSrc = (cred: Credential) => {
    if (isLight && cred.lightLogo) {
      return cred.lightLogo;
    }
    return cred.logo;
  };

  // Get filter for each credential type
  const getFilter = (cred: Credential) => {
    if (cred.isPhoto) {
      // Photos: grayscale, with brightness adjustment for light mode visibility
      return isLight
        ? 'grayscale(100%) brightness(0.4) contrast(1.2)'
        : 'grayscale(100%)';
    }
    // If using theme-specific logo (lightLogo), minimal filter needed
    if (isLight && cred.lightLogo) {
      return 'none'; // lightLogo should already be correct color
    }
    // SVGs without lightLogo: convert to black (light mode) or white (dark mode)
    return isLight
      ? 'brightness(0) saturate(0)'  // Force black
      : 'brightness(0) invert(1)';   // Force white
  };

  // Higher opacity in light mode for better visibility on light backgrounds
  const getOpacity = () => isLight ? 0.55 : 0.4;

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
          key={`${cred.name}-${isLight ? 'light' : 'dark'}`}
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
                filter: cred.hoverFilter || 'none',
              },
            }}
            style={{
              position: 'relative',
              width: `calc(clamp(26px, 3.5vw, 32px) * ${cred.scale || 1})`,
              height: `calc(clamp(26px, 3.5vw, 32px) * ${cred.scale || 1})`,
              opacity: getOpacity(),
              filter: getFilter(cred),
              transition: 'opacity 0.3s ease, filter 0.3s ease',
            }}
            title={cred.name}
          >
            <Image
              key={`${cred.name}-${isLight ? 'light' : 'dark'}`}
              src={getLogoSrc(cred)}
              alt={cred.name}
              fill
              unoptimized
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
