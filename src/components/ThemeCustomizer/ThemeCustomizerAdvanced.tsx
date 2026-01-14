/**
 * Advanced Theme Customizer Component
 *
 * Enhanced theme customizer with live preview, persistence,
 * and export capabilities. Integrates with useRuntimeTheme
 * for immediate theme application.
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import {
  generateTheme,
  quickPresets,
  useRuntimeTheme,
  themeStorage,
  type ThemeGeneratorOptions,
  type ThemePreset,
  type StoredTheme,
} from '@/lib/themes';

import { ThemeExporter } from '../ThemeExporter';

const advancedCustomizerVariants = cva(
  'rounded-lg border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)]',
  {
    variants: {
      size: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

export interface ThemeCustomizerAdvancedProps
  extends VariantProps<typeof advancedCustomizerVariants> {
  /** Callback when theme is applied */
  onThemeApplied?: (theme: ThemePreset) => void;
  /** Callback when theme is saved */
  onThemeSaved?: (stored: StoredTheme) => void;
  /** Initial primary color */
  initialColor?: string;
  /** Enable live preview (applies theme to page) */
  enableLivePreview?: boolean;
  /** Enable theme persistence */
  enablePersistence?: boolean;
  /** Show export panel */
  showExportPanel?: boolean;
  /** Additional CSS classes */
  className?: string;
}

type HarmonyType = ThemeGeneratorOptions['harmony'];
type TabId = 'customize' | 'saved' | 'export';

const harmonyOptions: { value: HarmonyType; label: string; description: string }[] = [
  { value: 'complementary', label: 'Complementary', description: 'Opposite colors' },
  { value: 'analogous', label: 'Analogous', description: 'Adjacent colors' },
  { value: 'triadic', label: 'Triadic', description: 'Three evenly spaced' },
  { value: 'split-complementary', label: 'Split Comp.', description: 'Base + two adjacent' },
];

const quickPresetOptions = [
  { id: 'ocean', name: 'Ocean', color: '#3B82F6' },
  { id: 'forest', name: 'Forest', color: '#22C55E' },
  { id: 'sunset', name: 'Sunset', color: '#F97316' },
  { id: 'royal', name: 'Royal', color: '#8B5CF6' },
  { id: 'coral', name: 'Coral', color: '#FB7185' },
  { id: 'mint', name: 'Mint', color: '#2DD4BF' },
] as const;

/**
 * Color swatch component
 */
function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="h-8 w-8 rounded-md border border-[var(--semantic-color-border-default)] shadow-sm"
        style={{ backgroundColor: color }}
        title={color}
      />
      <span className="text-[10px] text-[var(--semantic-color-foreground-muted)]">
        {label}
      </span>
    </div>
  );
}

/**
 * Theme card for saved themes list
 */
function SavedThemeCard({
  stored,
  isActive,
  onApply,
  onDelete,
  onToggleFavorite,
}: {
  stored: StoredTheme;
  isActive: boolean;
  onApply: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div
      className={`rounded-lg border p-4 transition-all duration-200 ${
        isActive
          ? 'border-[var(--semantic-color-primary-default)] ring-2 ring-[var(--semantic-color-primary-default)] ring-opacity-30'
          : 'border-[var(--semantic-color-border-default)]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-[var(--semantic-color-foreground-default)]">
            {stored.theme.name}
          </h4>
          <p className="mt-1 text-xs text-[var(--semantic-color-foreground-muted)]">
            {stored.theme.industry}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleFavorite}
          className="text-lg transition-transform hover:scale-110"
          aria-label={stored.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {stored.isFavorite ? '★' : '☆'}
        </button>
      </div>

      {/* Color preview */}
      <div className="mt-3 flex gap-2">
        <ColorSwatch color={stored.theme.light.primary.default} label="Pri" />
        <ColorSwatch color={stored.theme.light.secondary.default} label="Sec" />
        <ColorSwatch color={stored.theme.light.accent.default} label="Acc" />
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onApply}
          className="flex-1 rounded-md bg-[var(--semantic-color-primary-default)] px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[var(--semantic-color-primary-hover)] active:scale-[0.98]"
        >
          {isActive ? 'Applied' : 'Apply'}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 active:scale-[0.98]"
        >
          Delete
        </button>
      </div>

      {/* Metadata */}
      <div className="mt-2 text-[10px] text-[var(--semantic-color-foreground-subtle)]">
        Created: {new Date(stored.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

/**
 * Advanced Theme Customizer with live preview, persistence, and export
 */
export function ThemeCustomizerAdvanced({
  onThemeApplied,
  onThemeSaved,
  initialColor = '#3B82F6',
  enableLivePreview = true,
  enablePersistence = true,
  showExportPanel = true,
  size,
  className,
}: ThemeCustomizerAdvancedProps) {
  // State
  const [activeTab, setActiveTab] = React.useState<TabId>('customize');
  const [primaryColor, setPrimaryColor] = React.useState(initialColor);
  const [themeName, setThemeName] = React.useState('Custom Theme');
  const [harmony, setHarmony] = React.useState<HarmonyType>('complementary');
  const [generatedTheme, setGeneratedTheme] = React.useState<ThemePreset | null>(null);
  const [savedThemes, setSavedThemes] = React.useState<StoredTheme[]>([]);
  const [notification, setNotification] = React.useState<string | null>(null);

  // Runtime theme hook
  const {
    applyTheme: applyRuntimeTheme,
    removeTheme: removeRuntimeTheme,
    colorMode,
    toggleColorMode,
    isApplied,
  } = useRuntimeTheme({ persist: enablePersistence });

  // Load saved themes
  React.useEffect(() => {
    if (enablePersistence) {
      setSavedThemes(themeStorage.getAll());
    }
  }, [enablePersistence]);

  // Generate theme when inputs change
  React.useEffect(() => {
    try {
      const theme = generateTheme({
        primaryColor,
        name: themeName,
        harmony,
      });
      setGeneratedTheme(theme);
    } catch (error) {
      console.error('Error generating theme:', error);
    }
  }, [primaryColor, themeName, harmony]);

  // Show notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Apply theme live
  const handleApplyTheme = () => {
    if (!generatedTheme) return;

    if (enableLivePreview) {
      applyRuntimeTheme(generatedTheme);
    }
    onThemeApplied?.(generatedTheme);
    showNotification('Theme applied!');
  };

  // Save theme
  const handleSaveTheme = () => {
    if (!generatedTheme || !enablePersistence) return;

    const stored = themeStorage.save(generatedTheme);
    setSavedThemes(themeStorage.getAll());
    onThemeSaved?.(stored);
    showNotification('Theme saved!');
  };

  // Apply saved theme
  const handleApplySavedTheme = (stored: StoredTheme) => {
    if (enableLivePreview) {
      applyRuntimeTheme(stored.theme);
    }
    setGeneratedTheme(stored.theme);
    onThemeApplied?.(stored.theme);
    showNotification('Theme applied!');
  };

  // Delete saved theme
  const handleDeleteTheme = (id: string) => {
    themeStorage.delete(id);
    setSavedThemes(themeStorage.getAll());
    showNotification('Theme deleted');
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    themeStorage.toggleFavorite(id);
    setSavedThemes(themeStorage.getAll());
  };

  // Apply quick preset
  const applyQuickPreset = (presetId: keyof typeof quickPresets) => {
    const preset = quickPresets[presetId]();
    setGeneratedTheme(preset);
    setThemeName(preset.name);
  };

  // Reset theme
  const handleResetTheme = () => {
    removeRuntimeTheme();
    showNotification('Theme reset to default');
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'customize', label: 'Customize' },
    { id: 'saved', label: `Saved (${savedThemes.length})` },
    ...(showExportPanel ? [{ id: 'export' as TabId, label: 'Export' }] : []),
  ];

  return (
    <div className={advancedCustomizerVariants({ size, className })}>
      {/* Header with tabs */}
      <div className="border-b border-[var(--semantic-color-border-default)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--semantic-color-foreground-default)]">
              Theme Studio
            </h2>
            <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
              Create, customize, and manage your themes
            </p>
          </div>

          {/* Dark mode toggle */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleColorMode}
              className="flex items-center gap-2 rounded-md border border-[var(--semantic-color-border-default)] px-3 py-1.5 text-sm transition-all hover:bg-[var(--semantic-color-background-subtle)]"
            >
              <span>{colorMode === 'light' ? '☀️' : '🌙'}</span>
              <span>{colorMode === 'light' ? 'Light' : 'Dark'}</span>
            </button>

            {isApplied && (
              <button
                type="button"
                onClick={handleResetTheme}
                className="rounded-md border border-[var(--semantic-color-border-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-foreground-muted)] transition-all hover:bg-[var(--semantic-color-background-subtle)]"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-primary-default)] border-t border-x border-[var(--semantic-color-border-default)]'
                  : 'text-[var(--semantic-color-foreground-muted)] hover:text-[var(--semantic-color-foreground-default)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="bg-[var(--semantic-color-primary-default)] px-4 py-2 text-center text-sm text-white">
          {notification}
        </div>
      )}

      {/* Tab content */}
      <div className="p-6">
        {/* Customize Tab */}
        {activeTab === 'customize' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Controls */}
            <div className="space-y-6">
              {/* Theme name */}
              <div>
                <label htmlFor="adv-theme-name" className="block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
                  Theme Name
                </label>
                <input
                  type="text"
                  id="adv-theme-name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
                />
              </div>

              {/* Color picker */}
              <div>
                <label htmlFor="adv-primary-color" className="block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
                  Primary Color
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="color"
                    id="adv-primary-color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Harmony */}
              <fieldset>
                <legend className="block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
                  Color Harmony
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {harmonyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setHarmony(option.value)}
                      className={`rounded-md border px-3 py-2 text-left text-sm transition-all ${
                        harmony === option.value
                          ? 'border-[var(--semantic-color-primary-default)] bg-[var(--semantic-color-primary-default)] text-white'
                          : 'border-[var(--semantic-color-border-default)] hover:border-[var(--semantic-color-border-strong)]'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      <p className="text-xs opacity-75">{option.description}</p>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Quick presets */}
              <fieldset>
                <legend className="block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
                  Quick Presets
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {quickPresetOptions.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyQuickPreset(preset.id as keyof typeof quickPresets)}
                      className="flex items-center gap-2 rounded-full border border-[var(--semantic-color-border-default)] px-3 py-1.5 text-sm hover:shadow-sm"
                    >
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: preset.color }} />
                      {preset.name}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleApplyTheme}
                  className="flex-1 rounded-md bg-[var(--semantic-color-primary-default)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--semantic-color-primary-hover)] active:scale-[0.98]"
                >
                  Apply Theme
                </button>
                {enablePersistence && (
                  <button
                    type="button"
                    onClick={handleSaveTheme}
                    className="rounded-md border border-[var(--semantic-color-border-default)] px-4 py-2 text-sm font-medium transition-all hover:bg-[var(--semantic-color-background-subtle)] active:scale-[0.98]"
                  >
                    Save Theme
                  </button>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              {generatedTheme && (
                <>
                  <div className="rounded-md bg-[var(--semantic-color-background-subtle)] p-4">
                    <h3 className="font-medium">{generatedTheme.name}</h3>
                    <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
                      {generatedTheme.description}
                    </p>
                    <div className="mt-2 text-xs text-[var(--semantic-color-foreground-muted)]">
                      Psychology: {generatedTheme.psychology.primary} + {generatedTheme.psychology.secondary}
                    </div>
                  </div>

                  {/* Color grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Light mode */}
                    <div className="rounded-md border bg-white p-4">
                      <h4 className="mb-3 text-sm font-medium text-gray-900">Light Mode</h4>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <ColorSwatch color={generatedTheme.light.primary.default} label="Primary" />
                          <ColorSwatch color={generatedTheme.light.secondary.default} label="Secondary" />
                          <ColorSwatch color={generatedTheme.light.accent.default} label="Accent" />
                        </div>
                        <div className="flex gap-2">
                          <ColorSwatch color={generatedTheme.light.background.default} label="Bg" />
                          <ColorSwatch color={generatedTheme.light.foreground.default} label="Text" />
                          <ColorSwatch color={generatedTheme.light.border.default} label="Border" />
                        </div>
                      </div>
                    </div>

                    {/* Dark mode */}
                    <div className="rounded-md border border-gray-700 bg-gray-900 p-4">
                      <h4 className="mb-3 text-sm font-medium text-gray-100">Dark Mode</h4>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <ColorSwatch color={generatedTheme.dark.primary.default} label="Primary" />
                          <ColorSwatch color={generatedTheme.dark.secondary.default} label="Secondary" />
                          <ColorSwatch color={generatedTheme.dark.accent.default} label="Accent" />
                        </div>
                        <div className="flex gap-2">
                          <ColorSwatch color={generatedTheme.dark.background.default} label="Bg" />
                          <ColorSwatch color={generatedTheme.dark.foreground.default} label="Text" />
                          <ColorSwatch color={generatedTheme.dark.border.default} label="Border" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <div>
            {savedThemes.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[var(--semantic-color-foreground-muted)]">
                  No saved themes yet. Create and save a theme to see it here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedThemes.map((stored) => (
                  <SavedThemeCard
                    key={stored.theme.id}
                    stored={stored}
                    isActive={generatedTheme?.id === stored.theme.id && isApplied}
                    onApply={() => handleApplySavedTheme(stored)}
                    onDelete={() => handleDeleteTheme(stored.theme.id)}
                    onToggleFavorite={() => handleToggleFavorite(stored.theme.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && generatedTheme && (
          <ThemeExporter theme={generatedTheme} showPreview size="full" />
        )}

        {activeTab === 'export' && !generatedTheme && (
          <div className="py-12 text-center">
            <p className="text-[var(--semantic-color-foreground-muted)]">
              Generate a theme first to export it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemeCustomizerAdvanced;
