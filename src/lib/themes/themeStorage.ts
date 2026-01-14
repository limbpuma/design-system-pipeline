/**
 * Theme Storage Utilities
 *
 * Manage persistence of custom themes to localStorage.
 * Supports saving, loading, and managing multiple custom themes.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

import type { ThemePreset } from './presets';

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  CUSTOM_THEMES: 'ds-custom-themes',
  ACTIVE_CUSTOM_THEME: 'ds-active-custom-theme',
  FAVORITES: 'ds-favorite-themes',
} as const;

/**
 * Stored theme with metadata
 */
export interface StoredTheme {
  /** Theme preset data */
  theme: ThemePreset;
  /** Date created */
  createdAt: string;
  /** Date last modified */
  modifiedAt: string;
  /** User-defined tags */
  tags?: string[];
  /** Is favorite */
  isFavorite?: boolean;
}

/**
 * Theme storage manager
 */
export interface ThemeStorage {
  /** Get all saved custom themes */
  getAll: () => StoredTheme[];
  /** Get a specific theme by ID */
  get: (id: string) => StoredTheme | null;
  /** Save a new theme */
  save: (theme: ThemePreset, tags?: string[]) => StoredTheme;
  /** Update an existing theme */
  update: (id: string, theme: Partial<ThemePreset>, tags?: string[]) => StoredTheme | null;
  /** Delete a theme */
  delete: (id: string) => boolean;
  /** Check if theme exists */
  exists: (id: string) => boolean;
  /** Get active custom theme ID */
  getActiveId: () => string | null;
  /** Set active custom theme */
  setActive: (id: string | null) => void;
  /** Toggle favorite status */
  toggleFavorite: (id: string) => boolean;
  /** Get favorite themes */
  getFavorites: () => StoredTheme[];
  /** Clear all custom themes */
  clearAll: () => void;
  /** Export all themes as JSON string */
  exportAll: () => string;
  /** Import themes from JSON string */
  importAll: (json: string) => number;
}

/**
 * Check if localStorage is available
 */
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get themes from storage
 */
function getStoredThemes(): Record<string, StoredTheme> {
  if (!isStorageAvailable()) return {};

  const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
  if (!stored) return {};

  try {
    return JSON.parse(stored) as Record<string, StoredTheme>;
  } catch {
    return {};
  }
}

/**
 * Save themes to storage
 */
function saveStoredThemes(themes: Record<string, StoredTheme>): void {
  if (!isStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(themes));
}

/**
 * Create theme storage manager
 *
 * @example
 * ```ts
 * const storage = createThemeStorage();
 *
 * // Save a custom theme
 * const stored = storage.save(myTheme, ['blue', 'corporate']);
 *
 * // Get all themes
 * const themes = storage.getAll();
 *
 * // Delete a theme
 * storage.delete('my-theme-id');
 * ```
 */
export function createThemeStorage(): ThemeStorage {
  return {
    getAll(): StoredTheme[] {
      const themes = getStoredThemes();
      return Object.values(themes).sort(
        (a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
      );
    },

    get(id: string): StoredTheme | null {
      const themes = getStoredThemes();
      return themes[id] || null;
    },

    save(theme: ThemePreset, tags?: string[]): StoredTheme {
      const themes = getStoredThemes();
      const now = new Date().toISOString();

      // Generate unique ID if theme ID already exists
      let themeId = theme.id;
      let counter = 1;
      while (themes[themeId]) {
        themeId = `${theme.id}-${counter}`;
        counter++;
      }

      const storedTheme: StoredTheme = {
        theme: { ...theme, id: themeId },
        createdAt: now,
        modifiedAt: now,
        tags,
        isFavorite: false,
      };

      themes[themeId] = storedTheme;
      saveStoredThemes(themes);

      return storedTheme;
    },

    update(id: string, themeUpdate: Partial<ThemePreset>, tags?: string[]): StoredTheme | null {
      const themes = getStoredThemes();
      const existing = themes[id];

      if (!existing) return null;

      const now = new Date().toISOString();
      const updatedTheme: StoredTheme = {
        ...existing,
        theme: { ...existing.theme, ...themeUpdate },
        modifiedAt: now,
        tags: tags ?? existing.tags,
      };

      themes[id] = updatedTheme;
      saveStoredThemes(themes);

      return updatedTheme;
    },

    delete(id: string): boolean {
      const themes = getStoredThemes();
      if (!themes[id]) return false;

      delete themes[id];
      saveStoredThemes(themes);

      // Clear active if it was the deleted theme
      if (this.getActiveId() === id) {
        this.setActive(null);
      }

      return true;
    },

    exists(id: string): boolean {
      const themes = getStoredThemes();
      return id in themes;
    },

    getActiveId(): string | null {
      if (!isStorageAvailable()) return null;
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_CUSTOM_THEME);
    },

    setActive(id: string | null): void {
      if (!isStorageAvailable()) return;

      if (id) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_CUSTOM_THEME, id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_CUSTOM_THEME);
      }
    },

    toggleFavorite(id: string): boolean {
      const themes = getStoredThemes();
      const theme = themes[id];

      if (!theme) return false;

      theme.isFavorite = !theme.isFavorite;
      theme.modifiedAt = new Date().toISOString();
      saveStoredThemes(themes);

      return theme.isFavorite;
    },

    getFavorites(): StoredTheme[] {
      return this.getAll().filter((t) => t.isFavorite);
    },

    clearAll(): void {
      if (!isStorageAvailable()) return;
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_THEMES);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_CUSTOM_THEME);
    },

    exportAll(): string {
      const themes = getStoredThemes();
      return JSON.stringify(
        {
          version: 1,
          exportedAt: new Date().toISOString(),
          themes: Object.values(themes),
        },
        null,
        2
      );
    },

    importAll(json: string): number {
      try {
        const data = JSON.parse(json) as {
          version?: number;
          themes: StoredTheme[];
        };

        if (!data.themes || !Array.isArray(data.themes)) {
          throw new Error('Invalid theme data format');
        }

        const existingThemes = getStoredThemes();
        let importedCount = 0;

        for (const storedTheme of data.themes) {
          if (storedTheme.theme?.id) {
            // Generate unique ID if already exists
            let id = storedTheme.theme.id;
            let counter = 1;
            while (existingThemes[id]) {
              id = `${storedTheme.theme.id}-imported-${counter}`;
              counter++;
            }

            existingThemes[id] = {
              ...storedTheme,
              theme: { ...storedTheme.theme, id },
              modifiedAt: new Date().toISOString(),
            };
            importedCount++;
          }
        }

        saveStoredThemes(existingThemes);
        return importedCount;
      } catch {
        throw new Error('Failed to import themes: Invalid JSON format');
      }
    },
  };
}

/**
 * Default theme storage instance
 */
export const themeStorage = createThemeStorage();

/**
 * React hook for theme storage (with state updates)
 *
 * Provides reactive state that updates when localStorage changes.
 */
export function useThemeStorage() {
  const storage = createThemeStorage();

  // Reactive state for themes
  const [themes, setThemes] = useState<StoredTheme[]>(() => storage.getAll());
  const [favorites, setFavorites] = useState<StoredTheme[]>(() => storage.getFavorites());
  const [activeId, setActiveId] = useState<string | null>(() => storage.getActiveId());

  // Refresh state from storage
  const refresh = useCallback(() => {
    setThemes(storage.getAll());
    setFavorites(storage.getFavorites());
    setActiveId(storage.getActiveId());
  }, [storage]);

  // Listen for storage events (cross-tab sync)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === STORAGE_KEYS.CUSTOM_THEMES ||
        event.key === STORAGE_KEYS.ACTIVE_CUSTOM_THEME ||
        event.key === STORAGE_KEYS.FAVORITES
      ) {
        refresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refresh]);

  // Wrapped methods that update state after mutation
  const save = useCallback(
    (theme: ThemePreset, tags?: string[]) => {
      const result = storage.save(theme, tags);
      refresh();
      return result;
    },
    [storage, refresh]
  );

  const update = useCallback(
    (id: string, theme: Partial<ThemePreset>, tags?: string[]) => {
      const result = storage.update(id, theme, tags);
      refresh();
      return result;
    },
    [storage, refresh]
  );

  const deleteTheme = useCallback(
    (id: string) => {
      const result = storage.delete(id);
      refresh();
      return result;
    },
    [storage, refresh]
  );

  const setActive = useCallback(
    (id: string | null) => {
      storage.setActive(id);
      setActiveId(id);
    },
    [storage]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      const result = storage.toggleFavorite(id);
      refresh();
      return result;
    },
    [storage, refresh]
  );

  const clearAll = useCallback(() => {
    storage.clearAll();
    refresh();
  }, [storage, refresh]);

  const importAll = useCallback(
    (json: string) => {
      const result = storage.importAll(json);
      refresh();
      return result;
    },
    [storage, refresh]
  );

  return {
    // Reactive state
    themes,
    favorites,
    activeId,
    // Read-only methods (use storage directly)
    get: storage.get,
    getAll: storage.getAll,
    exists: storage.exists,
    getActiveId: storage.getActiveId,
    getFavorites: storage.getFavorites,
    exportAll: storage.exportAll,
    // Wrapped methods that trigger re-renders
    save,
    update,
    delete: deleteTheme,
    setActive,
    toggleFavorite,
    clearAll,
    importAll,
    // Manual refresh if needed
    refresh,
  };
}

export default themeStorage;
