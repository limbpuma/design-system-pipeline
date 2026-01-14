/**
 * useRuntimeTheme Hook
 *
 * Hook for runtime theme injection without requiring a ThemeProvider.
 * Useful for applying custom/generated themes dynamically.
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { applyThemeToElement, generateThemeCSS, removeThemeFromElement } from './generator';
import type { ThemePreset } from './presets';

/**
 * Runtime theme state
 */
export interface RuntimeThemeState {
  /** Current custom theme */
  theme: ThemePreset | null;
  /** Current color mode */
  colorMode: 'light' | 'dark';
  /** Whether theme is currently applied */
  isApplied: boolean;
  /** Generated CSS (for export) */
  generatedCss: string;
}

/**
 * Runtime theme actions
 */
export interface RuntimeThemeActions {
  /** Apply a custom theme */
  applyTheme: (theme: ThemePreset) => void;
  /** Remove the current custom theme */
  removeTheme: () => void;
  /** Set color mode */
  setColorMode: (mode: 'light' | 'dark') => void;
  /** Toggle color mode */
  toggleColorMode: () => void;
  /** Inject theme as style element (for scoped application) */
  injectStyleElement: (containerId?: string) => HTMLStyleElement | null;
  /** Remove injected style element */
  removeStyleElement: () => void;
}

/**
 * Options for useRuntimeTheme
 */
export interface UseRuntimeThemeOptions {
  /** Target element for CSS variable injection (default: document.documentElement) */
  targetElement?: HTMLElement | null;
  /** Initial color mode */
  initialColorMode?: 'light' | 'dark';
  /** Apply theme immediately when set */
  autoApply?: boolean;
  /** Persist theme to localStorage */
  persist?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
}

/**
 * Storage key constants
 */
const STORAGE_KEYS = {
  THEME: 'ds-runtime-theme',
  COLOR_MODE: 'ds-runtime-color-mode',
} as const;

/**
 * Hook for runtime theme injection
 *
 * @example
 * ```tsx
 * const { applyTheme, removeTheme, colorMode, toggleColorMode } = useRuntimeTheme();
 *
 * // Apply a generated theme
 * const customTheme = generateTheme({ primaryColor: '#3B82F6', name: 'My Theme' });
 * applyTheme(customTheme);
 *
 * // Toggle dark mode
 * toggleColorMode();
 *
 * // Remove custom theme
 * removeTheme();
 * ```
 */
export function useRuntimeTheme(
  options: UseRuntimeThemeOptions = {}
): RuntimeThemeState & RuntimeThemeActions {
  const {
    targetElement,
    initialColorMode = 'light',
    autoApply = true,
    persist = false,
    storageKey = '',
  } = options;

  // Storage key with optional prefix
  const themeStorageKey = storageKey
    ? `${storageKey}-${STORAGE_KEYS.THEME}`
    : STORAGE_KEYS.THEME;
  const colorModeStorageKey = storageKey
    ? `${storageKey}-${STORAGE_KEYS.COLOR_MODE}`
    : STORAGE_KEYS.COLOR_MODE;

  // State
  const [theme, setTheme] = useState<ThemePreset | null>(() => {
    if (persist && typeof window !== 'undefined') {
      const stored = localStorage.getItem(themeStorageKey);
      if (stored) {
        try {
          return JSON.parse(stored) as ThemePreset;
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const [colorMode, setColorModeState] = useState<'light' | 'dark'>(() => {
    if (persist && typeof window !== 'undefined') {
      const stored = localStorage.getItem(colorModeStorageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    }
    return initialColorMode;
  });

  const [isApplied, setIsApplied] = useState(false);
  const [generatedCss, setGeneratedCss] = useState('');

  // Refs
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  // Get target element (returns null during SSR)
  const getTargetElement = useCallback((): HTMLElement | null => {
    if (targetElement) {
      return targetElement;
    }
    if (typeof document !== 'undefined') {
      return document.documentElement;
    }
    return null;
  }, [targetElement]);

  // Apply theme to element
  const applyToElement = useCallback(
    (themeToApply: ThemePreset, mode: 'light' | 'dark') => {
      const element = getTargetElement();
      if (!element) return;

      const colors = mode === 'light' ? themeToApply.light : themeToApply.dark;
      applyThemeToElement(element, colors);

      // Update dark mode class
      if (mode === 'dark') {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }

      // Set data attributes
      element.setAttribute('data-runtime-theme', themeToApply.id);
      element.setAttribute('data-color-mode', mode);
    },
    [getTargetElement]
  );

  // Remove theme from element
  const removeFromElement = useCallback(() => {
    const element = getTargetElement();
    if (!element) return;

    removeThemeFromElement(element);
    element.removeAttribute('data-runtime-theme');
  }, [getTargetElement]);

  // Apply theme
  const applyTheme = useCallback(
    (newTheme: ThemePreset) => {
      setTheme(newTheme);
      setGeneratedCss(generateThemeCSS(newTheme));

      if (autoApply) {
        applyToElement(newTheme, colorMode);
        setIsApplied(true);
      }

      if (persist && typeof window !== 'undefined') {
        localStorage.setItem(themeStorageKey, JSON.stringify(newTheme));
      }
    },
    [autoApply, colorMode, applyToElement, persist, themeStorageKey]
  );

  // Remove theme
  const removeTheme = useCallback(() => {
    removeFromElement();
    setTheme(null);
    setIsApplied(false);
    setGeneratedCss('');

    if (persist && typeof window !== 'undefined') {
      localStorage.removeItem(themeStorageKey);
    }
  }, [removeFromElement, persist, themeStorageKey]);

  // Set color mode
  const setColorMode = useCallback(
    (mode: 'light' | 'dark') => {
      setColorModeState(mode);

      if (theme && isApplied) {
        applyToElement(theme, mode);
      }

      if (persist && typeof window !== 'undefined') {
        localStorage.setItem(colorModeStorageKey, mode);
      }
    },
    [theme, isApplied, applyToElement, persist, colorModeStorageKey]
  );

  // Toggle color mode
  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  // Inject as style element (for CSS-based application)
  const injectStyleElement = useCallback(
    (containerId?: string): HTMLStyleElement | null => {
      if (!theme || typeof document === 'undefined') return null;

      // Remove existing style element
      if (styleElementRef.current) {
        styleElementRef.current.remove();
      }

      // Create new style element
      const styleEl = document.createElement('style');
      styleEl.id = `runtime-theme-${theme.id}`;
      styleEl.textContent = generateThemeCSS(theme);

      // Inject into container or head
      const container = containerId
        ? document.getElementById(containerId)
        : document.head;

      if (container) {
        container.appendChild(styleEl);
        styleElementRef.current = styleEl;
        return styleEl;
      }

      return null;
    },
    [theme]
  );

  // Remove style element
  const removeStyleElement = useCallback(() => {
    if (styleElementRef.current) {
      styleElementRef.current.remove();
      styleElementRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeStyleElement();
    };
  }, [removeStyleElement]);

  // Apply persisted theme on mount
  useEffect(() => {
    if (theme && autoApply && !isApplied) {
      applyToElement(theme, colorMode);
      setIsApplied(true);
      setGeneratedCss(generateThemeCSS(theme));
    }
  }, [theme, autoApply, isApplied, applyToElement, colorMode]);

  return {
    // State
    theme,
    colorMode,
    isApplied,
    generatedCss,
    // Actions
    applyTheme,
    removeTheme,
    setColorMode,
    toggleColorMode,
    injectStyleElement,
    removeStyleElement,
  };
}

export default useRuntimeTheme;
