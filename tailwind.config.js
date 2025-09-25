/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DA0E29',
        },
        accent: {
          home: '#DA0E29',
          work: '#3B82F6',
          labs: '#F59E0B',
          about: '#8B5CF6',
          life: '#10B981',
        },
        // Dark theme colors
        dark: {
          bg: {
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
        // Light theme colors
        light: {
          bg: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '6px',
        'md': '12px',
        'lg': '24px',
        'xl': '32px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'slower': '500ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      zIndex: {
        'hide': '-1',
        'auto': 'auto',
        'base': '0',
        'docked': '10',
        'dropdown': '1000',
        'sticky': '1100',
        'banner': '1200',
        'overlay': '1300',
        'modal': '1400',
        'popover': '1500',
        'skip-link': '1600',
        'toast': '1700',
        'tooltip': '1800',
      },
    },
  },
  plugins: [
    // Custom utilities for glassmorphism effects
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-dark': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(24px) saturate(150%)',
          'border': '1px solid rgba(255, 255, 255, 0.12)',
        },
        '.glass-light': {
          'background': 'rgba(255, 255, 255, 0.85)',
          'backdrop-filter': 'blur(20px) saturate(110%)',
          'border': '1px solid rgba(0, 0, 0, 0.08)',
        },
        '.nav-height': {
          'height': '56px',
        },
        '.nav-height-mobile': {
          'height': '48px',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}