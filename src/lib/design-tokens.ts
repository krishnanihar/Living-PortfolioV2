/**
 * Design Tokens - Single Source of Truth for Living Portfolio v2
 * Extracted from v1 and enhanced for maintainability
 */

// Brand Colors
export const brandColors = {
  red: '#DA0E29',
  redRgb: '218, 14, 41',
} as const;

// Section Accent Colors
export const accentColors = {
  home: '#DA0E29',
  work: '#3B82F6',
  labs: '#F59E0B',
  about: '#8B5CF6',
  life: '#10B981',
} as const;

// Color System
export const colors = {
  brand: brandColors,
  accent: accentColors,

  // Dark Theme (Default)
  dark: {
    background: {
      primary: '#0A0A0A',
      secondary: '#0F0F0F',
      tertiary: '#141414',
    },
    surface: {
      primary: 'rgba(255, 255, 255, 0.04)',
      secondary: 'rgba(255, 255, 255, 0.06)',
      hover: 'rgba(255, 255, 255, 0.08)',
      active: 'rgba(255, 255, 255, 0.12)',
    },
    border: {
      primary: 'rgba(255, 255, 255, 0.08)',
      secondary: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.16)',
      focus: 'rgba(255, 255, 255, 0.24)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.80)',
      tertiary: 'rgba(255, 255, 255, 0.60)',
      muted: 'rgba(255, 255, 255, 0.40)',
      disabled: 'rgba(255, 255, 255, 0.24)',
    },
  },

  // Light Theme
  light: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
    surface: {
      primary: 'rgba(0, 0, 0, 0.04)',
      secondary: 'rgba(0, 0, 0, 0.06)',
      hover: 'rgba(0, 0, 0, 0.08)',
      active: 'rgba(0, 0, 0, 0.12)',
    },
    border: {
      primary: 'rgba(0, 0, 0, 0.08)',
      secondary: 'rgba(0, 0, 0, 0.12)',
      hover: 'rgba(0, 0, 0, 0.16)',
      focus: 'rgba(0, 0, 0, 0.24)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.95)',
      secondary: 'rgba(0, 0, 0, 0.80)',
      tertiary: 'rgba(0, 0, 0, 0.60)',
      muted: 'rgba(0, 0, 0, 0.40)',
      disabled: 'rgba(0, 0, 0, 0.24)',
    },
  },
} as const;

// Spacing Scale
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

// Border Radius Scale
export const borderRadius = {
  xs: '4px',
  sm: '6px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

// Typography Scale
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '4rem',     // 64px
  },
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const;

// Blur Scale for Glassmorphism
export const blur = {
  xs: '4px',
  sm: '6px',
  md: '12px',
  lg: '24px',
  xl: '32px',
} as const;

// Motion System
export const motion = {
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    premium: 'cubic-bezier(0.22, 1, 0.36, 1)', // Target easing
  },
} as const;

// Shadows
export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
} as const;

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-Index Scale
export const zIndex = {
  hide: '-1',
  auto: 'auto',
  base: '0',
  docked: '10',
  dropdown: '1000',
  sticky: '1100',
  banner: '1200',
  overlay: '1300',
  modal: '1400',
  popover: '1500',
  skipLink: '1600',
  toast: '1700',
  tooltip: '1800',
} as const;

// Component Specific Tokens
export const components = {
  navigation: {
    height: '56px',
    heightMobile: '48px',
    zIndex: '10001',
  },
  hero: {
    minHeight: '100dvh',
    perspective: '1500px',
    tiltMax: '25deg',
    tiltZ: '50px',
  },
  particles: {
    opacity: {
      default: '0.6',
      light: '0.4',
      reducedMotion: '0.3',
    },
    connectionOpacity: {
      default: '0.3',
      light: '0.2',
      reducedMotion: '0.1',
    },
  },
} as const;

// Type definitions for better TypeScript support
export type ColorMode = 'light' | 'dark';
export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof borderRadius;
export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;