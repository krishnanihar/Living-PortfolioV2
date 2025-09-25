'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSystemTheme } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'living-portfolio-theme',
  attribute = 'data-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load theme from storage or use default
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    let currentResolvedTheme: 'light' | 'dark';

    if (theme === 'system') {
      currentResolvedTheme = getSystemTheme();

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const newSystemTheme = getSystemTheme();
        setResolvedTheme(newSystemTheme);
        document.documentElement.setAttribute(attribute, newSystemTheme);
      };

      mediaQuery.addEventListener('change', handleChange);

      // Cleanup
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      currentResolvedTheme = theme;
    }

    setResolvedTheme(currentResolvedTheme);
    document.documentElement.setAttribute(attribute, currentResolvedTheme);

    // Save to storage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, mounted, storageKey, attribute]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const contextValue: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme toggle button component
export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === 'system') return '🌓';
    return resolvedTheme === 'dark' ? '🌙' : '☀️';
  };

  const getThemeLabel = () => {
    if (theme === 'system') return 'System';
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50
        p-3 rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/20
        hover:bg-white/20 hover:scale-110
        transition-all duration-base
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red
        [data-theme="light"] &:bg-black/10 [data-theme="light"] &:border-black/20
        [data-theme="light"] &:hover:bg-black/20
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
      aria-label={`Current theme: ${getThemeLabel()}. Click to cycle themes.`}
    >
      <span className="text-lg" aria-hidden="true">
        {getThemeIcon()}
      </span>
    </button>
  );
}