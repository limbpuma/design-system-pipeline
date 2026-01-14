# Design System Theming - Industry Color Palettes

## Overview

El sistema de theming permite aplicar paletas de colores específicas por industria a toda la aplicación o componentes individuales. Cada theme está diseñado siguiendo principios de **psicología del color** y validado para **accesibilidad WCAG**.

## Quick Start

### 1. CSS Classes (Método más simple)

```html
<!-- En tu HTML -->
<html class="theme-finance">
  <!-- Dark mode -->
  <html class="theme-finance dark">
```

### 2. React Provider (Recomendado)

```tsx
import { ThemeProvider, useTheme } from '@/lib/themes';

// Envolver la app
function App() {
  return (
    <ThemeProvider defaultTheme="finance" defaultColorMode="system">
      <YourApp />
    </ThemeProvider>
  );
}

// Usar en componentes
function ThemeSwitcher() {
  const { theme, setTheme, toggleColorMode, availableThemes } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {Object.entries(availableThemes).map(([id, preset]) => (
        <option key={id} value={id}>
          {preset.name} - {preset.industry}
        </option>
      ))}
    </select>
  );
}
```

## Available Themes

| Theme ID | Industry | Primary Color | Psychology |
|----------|----------|---------------|------------|
| `default` | Technology/SaaS | Blue | Trust, Innovation |
| `finance` | Banking & Finance | Navy + Gold | Security, Prosperity |
| `healthcare` | Medical & Wellness | Teal + Green | Calm, Health |
| `salon` | Beauty & Hair | Black + Gold | Elegance, Luxury |
| `florist` | Nature & Flowers | Green + Pink | Growth, Freshness |
| `restaurant` | Food & Dining | Red + Gold | Appetite, Warmth |

## Architecture

```
                      ┌─────────────────────────┐
                      │     ThemeProvider       │
                      │   (React Context)       │
                      └───────────┬─────────────┘
                                  │
                      ┌───────────▼─────────────┐
                      │   Theme Presets (TS)    │
                      │   presets.ts            │
                      └───────────┬─────────────┘
                                  │
               ┌──────────────────┼──────────────────┐
               │                  │                  │
    ┌──────────▼────────┐ ┌──────▼──────┐ ┌────────▼────────┐
    │  themes.css       │ │  generator   │ │  Runtime        │
    │  (pre-generated)  │ │  (build)     │ │  (dynamic)      │
    └───────────────────┘ └─────────────┘ └─────────────────┘
```

### Layers

1. **Theme Presets** (`src/lib/themes/presets.ts`)
   - TypeScript definitions for each theme
   - OKLCH color values for perceptual uniformity
   - Light and dark mode variants
   - Psychology metadata

2. **CSS Variables** (`src/styles/themes.css`)
   - Pre-generated CSS classes
   - `.theme-{id}` for light mode
   - `.theme-{id}.dark` for dark mode

3. **ThemeProvider** (`src/lib/themes/ThemeProvider.tsx`)
   - React context for theme state
   - Persistence (localStorage)
   - System color mode detection

## Usage Examples

### Static Theme (CSS only)

```html
<!DOCTYPE html>
<html class="theme-healthcare">
<head>
  <link rel="stylesheet" href="styles/themes.css" />
</head>
<body>
  <!-- All components use healthcare theme colors -->
</body>
</html>
```

### Dynamic Theme Switching

```tsx
import { ThemeProvider, useTheme } from '@/lib/themes';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, setTheme, resolvedColorMode, toggleColorMode } = useTheme();

  return (
    <header>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Tech</option>
        <option value="finance">Finance</option>
        <option value="healthcare">Healthcare</option>
      </select>
      <button onClick={toggleColorMode}>
        {resolvedColorMode === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
```

### Component-Level Theming

```tsx
function ThemedSection({ theme, children }) {
  return (
    <section className={`theme-${theme}`}>
      {children}
    </section>
  );
}

// Usage
<ThemedSection theme="finance">
  <BankingDashboard />
</ThemedSection>
```

## Storybook Integration

El sistema está integrado en Storybook con dos selectores en la toolbar:

1. **Mode** - Light/Dark toggle
2. **Industry Theme** - Selector de paleta por industria

Cada story se renderiza automáticamente con el theme seleccionado.

## Creating Custom Themes

### 1. Define Theme Preset

```typescript
// src/lib/themes/presets.ts
export const myCustomTheme: ThemePreset = {
  id: 'custom',
  name: 'My Custom Theme',
  description: 'Description of your theme',
  industry: 'Your Industry',
  psychology: {
    primary: 'emotion1',
    secondary: 'emotion2',
    overall: 'Combined effect description',
  },
  light: {
    primary: {
      default: 'oklch(0.55 0.20 260)',
      hover: 'oklch(0.50 0.21 260)',
      active: 'oklch(0.45 0.22 260)',
      foreground: 'oklch(1 0 0)',
    },
    // ... rest of colors
  },
  dark: {
    // ... dark mode colors
  },
};

// Add to themePresets object
export const themePresets = {
  // ... existing themes
  custom: myCustomTheme,
};
```

### 2. Generate CSS

```typescript
import { generateThemeCSS, myCustomTheme } from '@/lib/themes';

const css = generateThemeCSS(myCustomTheme);
// Add to themes.css or inject dynamically
```

## Color Psychology Reference

### By Emotion

| Emotion | Colors | Best For |
|---------|--------|----------|
| Trust | Blue, Navy | Finance, Tech, Healthcare |
| Energy | Red, Orange | Food, Retail, Sports |
| Luxury | Black, Gold, Purple | Salon, Fashion, Jewelry |
| Health | Green, Teal | Healthcare, Organic, Fitness |
| Nature | Green, Brown, Cream | Florist, Eco, Agriculture |

### By Industry

| Industry | Primary | Secondary | Avoid |
|----------|---------|-----------|-------|
| Finance | Navy Blue | Gold | Bright reds |
| Healthcare | Teal | Green | Heavy blacks |
| Beauty | Black | Gold/Rose | Harsh colors |
| Food | Red/Orange | Warm golds | Blue/Purple |
| Tech | Blue | Purple/Cyan | Earth tones |

## WCAG Compliance

Todos los themes están validados para cumplir WCAG 2.1 AA:

- **Contraste de texto**: Mínimo 4.5:1 (normal), 3:1 (grande)
- **Contraste UI**: Mínimo 3:1 para componentes
- **Focus visible**: Ring con contraste suficiente

### Validación Automática

```typescript
import { useThemePreset } from '@/lib/themes';

function ContrastChecker() {
  const preset = useThemePreset();

  // Access theme metadata
  console.log(preset.psychology);
  // { primary: "trust", secondary: "stability", overall: "..." }
}
```

## API Reference

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultTheme` | `ThemePresetId` | `'default'` | Initial theme |
| `defaultColorMode` | `ColorMode` | `'system'` | Initial color mode |
| `storageKey` | `string` | `''` | LocalStorage key prefix |
| `disablePersistence` | `boolean` | `false` | Disable localStorage |

### useTheme Return

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `ThemePresetId` | Current theme ID |
| `colorMode` | `ColorMode` | Current mode setting |
| `resolvedColorMode` | `'light' \| 'dark'` | Actual mode (resolved system) |
| `setTheme` | `(id) => void` | Change theme |
| `setColorMode` | `(mode) => void` | Change color mode |
| `toggleColorMode` | `() => void` | Toggle light/dark |
| `availableThemes` | `object` | All theme presets |

## Files

```
src/lib/themes/
├── index.ts            # Public exports
├── presets.ts          # Theme definitions
├── generator.ts        # CSS generation utilities
└── ThemeProvider.tsx   # React context & hooks

src/styles/
├── themes.css          # Pre-generated theme CSS
└── generated/
    └── variables.css   # Base design tokens

.storybook/
└── preview.tsx         # Storybook theme integration
```

## Related

- `.claude/agents/color-psychology-expert.md` - Color psychology knowledge base
- `.claude/agents/industry-brand-specialist.md` - Industry-specific recommendations
- `.claude/agents/color-accessibility-expert.md` - WCAG compliance validation
