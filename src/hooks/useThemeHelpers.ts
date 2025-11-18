import { useTheme } from '@/components/effects/ThemeProvider';

/**
 * Theme helper functions for converting hardcoded rgba colors to theme-aware values
 * Used across large components with many inline styles
 */
export function useThemeHelpers() {
  const { resolvedTheme } = useTheme();

  const getTextPrimary = (opacity: number) =>
    resolvedTheme === 'light' ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;

  const getBorderColor = (opacity: number) =>
    resolvedTheme === 'light' ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;

  const getSurfaceColor = (opacity: number) =>
    resolvedTheme === 'light' ? `rgba(255, 255, 255, ${opacity})` : `rgba(255, 255, 255, ${opacity * 0.05})`;

  const getShadowColor = (opacity: number) =>
    resolvedTheme === 'light' ? `rgba(0, 0, 0, ${opacity * 0.4})` : `rgba(0, 0, 0, ${opacity})`;

  // Get theme-aware base styles
  const baseStyles = getBaseStyles(resolvedTheme);

  return {
    resolvedTheme,
    getTextPrimary,
    getBorderColor,
    getSurfaceColor,
    getShadowColor,
    baseStyles,
  };
}

// Theme-aware base styles function
const getBaseStyles = (theme: string | undefined) => ({
  main: {
    position: 'relative' as const,
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    overflow: 'hidden' as const,
  },
  section: {
    position: 'relative' as const,
    padding: '5rem 1rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  glassCard: {
    background: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    border: `1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: '16px',
    boxShadow: theme === 'light' ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  heroGlass: {
    background: theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(150%)',
    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
    border: `1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'}`,
    borderRadius: '24px',
    boxShadow: theme === 'light' ? '0 20px 40px rgba(0, 0, 0, 0.08)' : '0 20px 40px rgba(0, 0, 0, 0.2)',
  }
});
