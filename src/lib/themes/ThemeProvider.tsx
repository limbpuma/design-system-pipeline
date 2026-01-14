'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getThemePreset, themePresets, type ThemePresetId } from './presets';

/**
 * Color mode type
 */
export type ColorMode = 'light' | 'dark' | 'system';

/**
 * Theme context value
 */
interface ThemeContextValue {
  /** Current theme preset ID */
  theme: ThemePresetId;
  /** Current color mode */
  colorMode: ColorMode;
  /** Resolved color mode (light or dark) */
  resolvedColorMode: 'light' | 'dark';
  /** Set the theme preset */
  setTheme: (theme: ThemePresetId) => void;
  /** Set the color mode */
  setColorMode: (mode: ColorMode) => void;
  /** Toggle between light and dark mode */
  toggleColorMode: () => void;
  /** Available theme presets */
  availableThemes: typeof themePresets;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Storage keys for persistence
 */
const STORAGE_KEYS = {
  THEME: 'design-system-theme',
  COLOR_MODE: 'design-system-color-mode',
} as const;

/**
 * Get system color mode preference
 */
function getSystemColorMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
  /** Default theme preset */
  defaultTheme?: ThemePresetId;
  /** Default color mode */
  defaultColorMode?: ColorMode;
  /** Storage key prefix for persistence */
  storageKey?: string;
  /** Disable persistence */
  disablePersistence?: boolean;
  /** Element to apply theme class to (default: document.documentElement) */
  targetElement?: HTMLElement | null;
}

/**
 * Theme Provider Component
 *
 * Provides theme context for the entire application.
 * Handles theme and color mode switching with persistence.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="finance" defaultColorMode="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'default',
  defaultColorMode = 'system',
  storageKey = '',
  disablePersistence = false,
  targetElement,
}: ThemeProviderProps) {
  // Get storage keys with optional prefix
  const themeKey = storageKey
    ? `${storageKey}-${STORAGE_KEYS.THEME}`
    : STORAGE_KEYS.THEME;
  const colorModeKey = storageKey
    ? `${storageKey}-${STORAGE_KEYS.COLOR_MODE}`
    : STORAGE_KEYS.COLOR_MODE;

  // Initialize state from storage or defaults
  const [theme, setThemeState] = useState<ThemePresetId>(() => {
    if (disablePersistence || typeof window === 'undefined') {
      return defaultTheme;
    }
    const stored = localStorage.getItem(themeKey);
    return (stored as ThemePresetId) || defaultTheme;
  });

  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (disablePersistence || typeof window === 'undefined') {
      return defaultColorMode;
    }
    const stored = localStorage.getItem(colorModeKey);
    return (stored as ColorMode) || defaultColorMode;
  });

  const [systemColorMode, setSystemColorMode] = useState<'light' | 'dark'>(
    () => getSystemColorMode()
  );

  // Resolve the actual color mode
  const resolvedColorMode = useMemo(
    () => (colorMode === 'system' ? systemColorMode : colorMode),
    [colorMode, systemColorMode]
  );

  // Listen for system color mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemColorMode(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme and color mode to DOM
  useEffect(() => {
    const element = targetElement ?? document.documentElement;

    // Remove all theme classes
    Object.keys(themePresets).forEach((t) => {
      element.classList.remove(`theme-${t}`);
    });

    // Add current theme class
    element.classList.add(`theme-${theme}`);

    // Handle dark mode class
    if (resolvedColorMode === 'dark') {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }

    // Set data attribute for potential CSS selectors
    element.setAttribute('data-theme', theme);
    element.setAttribute('data-color-mode', resolvedColorMode);
  }, [theme, resolvedColorMode, targetElement]);

  // Persist theme changes
  const setTheme = useCallback(
    (newTheme: ThemePresetId) => {
      setThemeState(newTheme);
      if (!disablePersistence && typeof window !== 'undefined') {
        localStorage.setItem(themeKey, newTheme);
      }
    },
    [disablePersistence, themeKey]
  );

  // Persist color mode changes
  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      if (!disablePersistence && typeof window !== 'undefined') {
        localStorage.setItem(colorModeKey, mode);
      }
    },
    [disablePersistence, colorModeKey]
  );

  // Toggle color mode
  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedColorMode === 'light' ? 'dark' : 'light');
  }, [resolvedColorMode, setColorMode]);

  const value = useMemo(
    () => ({
      theme,
      colorMode,
      resolvedColorMode,
      setTheme,
      setColorMode,
      toggleColorMode,
      availableThemes: themePresets,
    }),
    [
      theme,
      colorMode,
      resolvedColorMode,
      setTheme,
      setColorMode,
      toggleColorMode,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 *
 * @example
 * ```tsx
 * const { theme, setTheme, toggleColorMode } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get current theme preset data
 *
 * @example
 * ```tsx
 * const preset = useThemePreset();
 * console.log(preset.psychology.primary); // "trust"
 * ```
 */
export function useThemePreset() {
  const { theme } = useTheme();
  return getThemePreset(theme);
}
