import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  themePresets,
  type ThemePreset,
  type ThemeColors,
} from '@/lib/themes';

/**
 * Showcase component for displaying all themes
 */
function ThemeShowcase() {
  const [selectedTheme, setSelectedTheme] = React.useState<string>('default');
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light');

  const themes = Object.entries(themePresets);

  return (
    <div className="space-y-8">
      {/* Theme selector */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="theme-select"
            className="text-sm font-medium text-[var(--semantic-color-foreground-default)]"
          >
            Theme:
          </label>
          <select
            id="theme-select"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            aria-label="Select theme"
            className="rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-foreground-default)]"
          >
            {themes.map(([id, preset]) => (
              <option key={id} value={id}>
                {preset.name} - {preset.industry}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="mode-select"
            className="text-sm font-medium text-[var(--semantic-color-foreground-default)]"
          >
            Mode:
          </label>
          <select
            id="mode-select"
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value as 'light' | 'dark')}
            aria-label="Select color mode"
            className="rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-foreground-default)]"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Selected theme preview */}
      <ThemePreviewCard
        theme={themePresets[selectedTheme]}
        mode={colorMode}
        expanded
      />

      {/* All themes grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
          All Industry Themes
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {themes.map(([id, preset]) => (
            <ThemePreviewCard
              key={id}
              theme={preset}
              mode={colorMode}
              onClick={() => setSelectedTheme(id)}
              selected={selectedTheme === id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Theme preview card component
 */
function ThemePreviewCard({
  theme,
  mode,
  expanded = false,
  selected = false,
  onClick,
}: {
  theme: ThemePreset;
  mode: 'light' | 'dark';
  expanded?: boolean;
  selected?: boolean;
  onClick?: () => void;
}) {
  const colors = mode === 'light' ? theme.light : theme.dark;
  const bgColor = mode === 'light' ? '#ffffff' : '#0f172a';

  const baseClassName = `overflow-hidden rounded-lg border transition-all duration-200 text-left w-full ${
    selected
      ? 'border-[var(--semantic-color-primary-default)] ring-2 ring-[var(--semantic-color-primary-default)] ring-opacity-50'
      : 'border-[var(--semantic-color-border-default)]'
  }`;

  const cardContent = (
    <>
      {/* Header */}
      <div className="border-b border-opacity-20 p-4" style={{ borderColor: mode === 'light' ? '#000' : '#fff' }}>
        <h3
          className="font-semibold"
          style={{ color: mode === 'light' ? '#1f2937' : '#f9fafb' }}
        >
          {theme.name}
        </h3>
        <p
          className="mt-1 text-sm opacity-60"
          style={{ color: mode === 'light' ? '#1f2937' : '#f9fafb' }}
        >
          {theme.industry}
        </p>
      </div>

      {/* Color swatches */}
      <div className="p-4">
        <div className="flex gap-2">
          <ColorPill color={colors.primary.default} label="Primary" />
          <ColorPill color={colors.secondary.default} label="Secondary" />
          <ColorPill color={colors.accent.default} label="Accent" />
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            {/* Psychology info */}
            <div
              className="text-sm"
              style={{ color: mode === 'light' ? '#6b7280' : '#9ca3af' }}
            >
              <p>
                <strong>Psychology:</strong> {theme.psychology.primary} + {theme.psychology.secondary}
              </p>
              <p className="mt-1 text-xs opacity-75">{theme.psychology.overall}</p>
            </div>

            {/* Component preview */}
            <ComponentPreview colors={colors} mode={mode} />
          </div>
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={`${baseClassName} cursor-pointer hover:shadow-lg`}
        style={{ backgroundColor: bgColor }}
        onClick={onClick}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div
      className={baseClassName}
      style={{ backgroundColor: bgColor }}
    >
      {cardContent}
    </div>
  );
}

/**
 * Color pill component
 */
function ColorPill({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-black/5 px-2 py-1">
      <div
        className="h-3 w-3 rounded-full border border-black/10"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs" style={{ color: 'inherit', opacity: 0.7 }}>
        {label}
      </span>
    </div>
  );
}

/**
 * Mini component preview
 */
function ComponentPreview({
  colors,
  mode,
}: {
  colors: ThemeColors;
  mode: 'light' | 'dark';
}) {
  return (
    <div className="space-y-3 rounded-lg border border-opacity-10 p-3" style={{ borderColor: mode === 'light' ? '#000' : '#fff' }}>
      {/* Button examples */}
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105"
          style={{
            backgroundColor: colors.primary.default,
            color: colors.primary.foreground,
          }}
        >
          Primary
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105"
          style={{
            backgroundColor: colors.secondary.default,
            color: colors.secondary.foreground,
          }}
        >
          Secondary
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105"
          style={{
            backgroundColor: colors.accent.default,
            color: colors.accent.foreground,
          }}
        >
          Accent
        </button>
      </div>

      {/* Input example */}
      <div>
        <input
          type="text"
          placeholder="Input field"
          className="w-full rounded-md border px-3 py-1.5 text-xs"
          style={{
            backgroundColor: colors.background.subtle,
            borderColor: colors.border.default,
            color: colors.foreground.default,
          }}
        />
      </div>

      {/* Text examples */}
      <div className="space-y-1">
        <p className="text-sm font-medium" style={{ color: colors.foreground.default }}>
          Default text
        </p>
        <p className="text-xs" style={{ color: colors.foreground.muted }}>
          Muted secondary text for descriptions
        </p>
      </div>
    </div>
  );
}

/**
 * All themes comparison view
 */
function AllThemesComparison() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[var(--semantic-color-foreground-default)]">
        Industry Theme Comparison
      </h2>

      {/* Light mode */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
          Light Mode
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(themePresets).map(([id, preset]) => (
            <ThemePreviewCard key={id} theme={preset} mode="light" />
          ))}
        </div>
      </div>

      {/* Dark mode */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
          Dark Mode
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(themePresets).map(([id, preset]) => (
            <ThemePreviewCard key={id} theme={preset} mode="dark" />
          ))}
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System/Theme Showcase',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Theme Showcase

Interactive demonstration of all industry-specific color themes.

## Available Themes

| Theme | Industry | Primary Emotion | Secondary Emotion |
|-------|----------|-----------------|-------------------|
| Default | Technology/SaaS | Trust | Innovation |
| Finance | Banking | Security | Prosperity |
| Healthcare | Medical | Calm | Health |
| Salon | Beauty | Elegance | Luxury |
| Florist | Nature | Growth | Freshness |
| Restaurant | Food | Appetite | Warmth |

## Color Psychology

Each theme is designed using color psychology principles:
- **Finance**: Navy blue for trust + gold for prosperity
- **Healthcare**: Teal for calm + green for health
- **Salon**: Black for elegance + gold for luxury
- **Florist**: Green for growth + pink for freshness
- **Restaurant**: Red for appetite + gold for warmth

## Usage

Apply themes using CSS classes:

\`\`\`html
<div class="theme-finance">
  <!-- Finance theme colors -->
</div>

<div class="theme-healthcare dark">
  <!-- Healthcare dark mode -->
</div>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Interactive theme explorer
 */
export const Interactive: Story = {
  render: () => <ThemeShowcase />,
};

/**
 * Side-by-side comparison of all themes
 */
export const Comparison: Story = {
  render: () => <AllThemesComparison />,
};

/**
 * Finance theme in detail
 */
export const FinanceDetail: Story = {
  render: () => (
    <ThemePreviewCard theme={themePresets.finance} mode="light" expanded />
  ),
};

/**
 * Healthcare theme in detail
 */
export const HealthcareDetail: Story = {
  render: () => (
    <ThemePreviewCard theme={themePresets.healthcare} mode="light" expanded />
  ),
};

/**
 * Dark mode showcase
 */
export const DarkModeShowcase: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(themePresets).map(([id, preset]) => (
        <ThemePreviewCard key={id} theme={preset} mode="dark" expanded />
      ))}
    </div>
  ),
};
