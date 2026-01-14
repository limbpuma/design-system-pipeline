/**
 * Theme Customizer Component
 *
 * Interactive UI for generating custom themes from a base color.
 * Allows users to pick colors, choose harmony types, and preview results.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  generateTheme,
  generateThemeCSS,
  quickPresets,
  type ThemeGeneratorOptions,
  type ThemePreset,
} from '@/lib/themes';

const themeCustomizerVariants = cva(
  'rounded-lg border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] p-6',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ThemeCustomizerProps
  extends VariantProps<typeof themeCustomizerVariants> {
  /** Callback when theme is generated */
  onThemeGenerated?: (theme: ThemePreset, css: string) => void;
  /** Initial primary color */
  initialColor?: string;
  /** Show CSS output panel */
  showCssOutput?: boolean;
  /** Additional CSS classes */
  className?: string;
}

type HarmonyType = ThemeGeneratorOptions['harmony'];

const harmonyOptions: { value: HarmonyType; label: string; description: string }[] = [
  {
    value: 'complementary',
    label: 'Complementary',
    description: 'Colors opposite on the color wheel',
  },
  {
    value: 'analogous',
    label: 'Analogous',
    description: 'Adjacent colors for harmony',
  },
  {
    value: 'triadic',
    label: 'Triadic',
    description: 'Three evenly spaced colors',
  },
  {
    value: 'split-complementary',
    label: 'Split Complementary',
    description: 'Base + two adjacent to complement',
  },
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
 * Color swatch preview component
 */
function ColorSwatch({
  color,
  label,
  size = 'md',
}: {
  color: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClasses[size]} rounded-md border border-[var(--semantic-color-border-default)] shadow-sm`}
        style={{ backgroundColor: color }}
        title={color}
      />
      <span className="text-xs text-[var(--semantic-color-foreground-muted)]">
        {label}
      </span>
    </div>
  );
}

/**
 * Theme preview showing generated colors
 */
function ThemePreview({ theme, mode }: { theme: ThemePreset; mode: 'light' | 'dark' }) {
  const colors = mode === 'light' ? theme.light : theme.dark;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-[var(--semantic-color-foreground-default)]">
        {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
      </h4>

      <div className="space-y-3">
        {/* Primary colors */}
        <div>
          <span className="text-xs font-medium text-[var(--semantic-color-foreground-muted)] uppercase tracking-wide">
            Primary
          </span>
          <div className="mt-1 flex gap-2">
            <ColorSwatch color={colors.primary.default} label="Default" size="sm" />
            <ColorSwatch color={colors.primary.hover} label="Hover" size="sm" />
            <ColorSwatch color={colors.primary.active} label="Active" size="sm" />
            <ColorSwatch color={colors.primary.foreground} label="Text" size="sm" />
          </div>
        </div>

        {/* Secondary colors */}
        <div>
          <span className="text-xs font-medium text-[var(--semantic-color-foreground-muted)] uppercase tracking-wide">
            Secondary
          </span>
          <div className="mt-1 flex gap-2">
            <ColorSwatch color={colors.secondary.default} label="Default" size="sm" />
            <ColorSwatch color={colors.secondary.hover} label="Hover" size="sm" />
            <ColorSwatch color={colors.secondary.foreground} label="Text" size="sm" />
          </div>
        </div>

        {/* Accent colors */}
        <div>
          <span className="text-xs font-medium text-[var(--semantic-color-foreground-muted)] uppercase tracking-wide">
            Accent
          </span>
          <div className="mt-1 flex gap-2">
            <ColorSwatch color={colors.accent.default} label="Default" size="sm" />
            <ColorSwatch color={colors.accent.hover} label="Hover" size="sm" />
            <ColorSwatch color={colors.accent.foreground} label="Text" size="sm" />
          </div>
        </div>

        {/* Background colors */}
        <div>
          <span className="text-xs font-medium text-[var(--semantic-color-foreground-muted)] uppercase tracking-wide">
            Background
          </span>
          <div className="mt-1 flex gap-2">
            <ColorSwatch color={colors.background.default} label="Default" size="sm" />
            <ColorSwatch color={colors.background.subtle} label="Subtle" size="sm" />
            <ColorSwatch color={colors.background.muted} label="Muted" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ThemeCustomizer - Interactive theme generation UI
 */
export function ThemeCustomizer({
  onThemeGenerated,
  initialColor = '#3B82F6',
  showCssOutput = true,
  size,
  className,
}: ThemeCustomizerProps) {
  const [primaryColor, setPrimaryColor] = React.useState(initialColor);
  const [themeName, setThemeName] = React.useState('Custom Theme');
  const [harmony, setHarmony] = React.useState<HarmonyType>('complementary');
  const [generatedTheme, setGeneratedTheme] = React.useState<ThemePreset | null>(null);
  const [generatedCss, setGeneratedCss] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  // Generate theme when inputs change
  React.useEffect(() => {
    try {
      const theme = generateTheme({
        primaryColor,
        name: themeName,
        harmony,
      });
      const css = generateThemeCSS(theme);

      setGeneratedTheme(theme);
      setGeneratedCss(css);
      onThemeGenerated?.(theme, css);
    } catch (error) {
      console.error('Error generating theme:', error);
    }
  }, [primaryColor, themeName, harmony, onThemeGenerated]);

  // Apply quick preset
  const applyQuickPreset = (presetId: keyof typeof quickPresets) => {
    const preset = quickPresets[presetId]();
    setGeneratedTheme(preset);
    setGeneratedCss(generateThemeCSS(preset));
    setThemeName(preset.name);
    onThemeGenerated?.(preset, generateThemeCSS(preset));
  };

  // Copy CSS to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className={themeCustomizerVariants({ size, className })}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--semantic-color-foreground-default)]">
          Theme Customizer
        </h2>
        <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
          Generate a complete theme palette from a single color
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column - Controls */}
        <div className="space-y-6">
          {/* Theme name input */}
          <div>
            <label
              htmlFor="theme-name"
              className="block text-sm font-medium text-[var(--semantic-color-foreground-default)]"
            >
              Theme Name
            </label>
            <input
              type="text"
              id="theme-name"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm text-[var(--semantic-color-foreground-default)] shadow-sm focus:border-[var(--semantic-color-primary-default)] focus:outline-none focus:ring-1 focus:ring-[var(--semantic-color-primary-default)]"
              placeholder="My Custom Theme"
            />
          </div>

          {/* Color picker */}
          <div>
            <label
              htmlFor="primary-color"
              className="block text-sm font-medium text-[var(--semantic-color-foreground-default)]"
            >
              Primary Color
            </label>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="color"
                id="primary-color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border border-[var(--semantic-color-border-default)] bg-transparent"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm text-[var(--semantic-color-foreground-default)] shadow-sm focus:border-[var(--semantic-color-primary-default)] focus:outline-none focus:ring-1 focus:ring-[var(--semantic-color-primary-default)]"
                placeholder="#3B82F6"
              />
            </div>
          </div>

          {/* Harmony selector */}
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
                  className={`rounded-md border px-3 py-2 text-left text-sm transition-all duration-200 ${
                    harmony === option.value
                      ? 'border-[var(--semantic-color-primary-default)] bg-[var(--semantic-color-primary-default)] text-white'
                      : 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)] hover:border-[var(--semantic-color-border-strong)]'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <p className="mt-0.5 text-xs opacity-75">{option.description}</p>
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
                  className="flex items-center gap-2 rounded-full border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-foreground-default)] transition-all duration-200 hover:border-[var(--semantic-color-border-strong)] hover:shadow-sm"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: preset.color }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Right column - Preview */}
        <div className="space-y-6">
          {generatedTheme && (
            <>
              {/* Theme info */}
              <div className="rounded-md bg-[var(--semantic-color-background-subtle)] p-4">
                <h3 className="font-medium text-[var(--semantic-color-foreground-default)]">
                  {generatedTheme.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
                  {generatedTheme.description}
                </p>
                <div className="mt-2 flex gap-4 text-xs text-[var(--semantic-color-foreground-muted)]">
                  <span>
                    Primary: <strong>{generatedTheme.psychology.primary}</strong>
                  </span>
                  <span>
                    Secondary: <strong>{generatedTheme.psychology.secondary}</strong>
                  </span>
                </div>
              </div>

              {/* Color previews */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-[var(--semantic-color-border-default)] bg-white p-4">
                  <ThemePreview theme={generatedTheme} mode="light" />
                </div>
                <div className="rounded-md border border-[var(--semantic-color-border-default)] bg-gray-900 p-4">
                  <ThemePreview theme={generatedTheme} mode="dark" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CSS Output */}
      {showCssOutput && generatedCss && (
        <div className="mt-6 border-t border-[var(--semantic-color-border-default)] pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--semantic-color-foreground-default)]">
              Generated CSS
            </h3>
            <button
              type="button"
              onClick={copyToClipboard}
              className="rounded-md bg-[var(--semantic-color-primary-default)] px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--semantic-color-primary-hover)] active:scale-[0.98]"
            >
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
          <pre className="mt-3 max-h-64 overflow-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
            <code>{generatedCss}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default ThemeCustomizer;
