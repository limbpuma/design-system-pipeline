# @limbpuma/design-system

Scalable Design System Pipeline: **Figma → Tokens → Tailwind → React → Storybook**

[![npm version](https://img.shields.io/npm/v/@limbpuma/design-system.svg)](https://www.npmjs.com/package/@limbpuma/design-system)
[![Storybook](https://img.shields.io/badge/storybook-deployed-ff4785)](https://limbpuma.github.io/design-system-pipeline)
[![Tokens Sync](https://github.com/limbpuma/design-system-pipeline/actions/workflows/tokens-sync.yml/badge.svg)](https://github.com/limbpuma/design-system-pipeline/actions/workflows/tokens-sync.yml)

## Installation

```bash
npm install @limbpuma/design-system
```

## Quick Start

### 1. Import Components

```tsx
import { Button } from '@limbpuma/design-system';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

### 2. Import CSS Styles

```tsx
// In your main file (app.tsx, main.tsx, etc.)
import '@limbpuma/design-system/styles';
```

### 3. Use with Tailwind CSS

```js
// tailwind.config.js
import designSystemPreset from '@limbpuma/design-system/tailwind-preset';

export default {
  presets: [designSystemPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@limbpuma/design-system/dist/**/*.js'
  ],
};
```

### 4. Use CSS Variables

```css
.my-component {
  background-color: var(--color-blue-600);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   FIGMA                    GITHUB                     YOUR PROJECT      │
│   ─────                    ──────                     ────────────      │
│                                                                         │
│   Tokens Studio  ────────► design-system-pipeline ────► npm install     │
│   (designer)               (this repo)                  @limbpuma/      │
│                                   │                     design-system   │
│                                   │                                     │
│                                   ▼                                     │
│                            npm publish (auto)                           │
│                                   │                                     │
│                                   ▼                                     │
│                            @limbpuma/design-system                      │
│                            (public npm package)                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
design-system-pipeline/
├── tokens/                    # Design tokens (source of truth)
│   ├── primitives/            # Base values
│   │   ├── colors.json
│   │   ├── spacing.json
│   │   └── typography.json
│   └── semantic/              # Semantic tokens
│       ├── colors.json
│       └── components.json
│
├── src/
│   ├── components/            # React components
│   │   └── Button/
│   ├── styles/generated/      # Generated files (DO NOT edit)
│   │   ├── variables.css
│   │   ├── theme.json
│   │   └── tailwind.preset.js
│   └── stories/               # Storybook stories
│
├── .github/workflows/         # CI/CD
│   ├── tokens-sync.yml        # Auto-build on token changes
│   └── publish-npm.yml        # Publish to npm on tags
│
└── dist/                      # Production build
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run tokens:build` | Generate files from JSON tokens |
| `npm run storybook` | Start Storybook at localhost:6006 |
| `npm run build` | Full build (tokens + components) |
| `npm run test:e2e` | Run end-to-end pipeline tests |

## Workflow

### For Designers (Figma)

1. Open **Tokens Studio** in Figma
2. Modify tokens (colors, spacing, etc.)
3. Click **"Push to GitHub"**
4. Changes propagate automatically

### For Developers

1. Tokens update via GitHub Actions
2. New version publishes to npm automatically
3. In your project: `npm update @limbpuma/design-system`

### Publish New Version

```bash
# Bump version
npm version patch  # or minor, major

# Push with tags
git push && git push --tags

# GitHub Actions publishes to npm automatically
```

## Available Components

| Component | Variants |
|-----------|----------|
| `Button` | primary, secondary, outline, ghost, danger, success |
| `Input` | (coming soon) |
| `Card` | (coming soon) |
| `Modal` | (coming soon) |

## Available Tokens

### Colors
- `color.blue.50` - `color.blue.950`
- `color.gray.50` - `color.gray.950`
- `color.green`, `color.red`, `color.yellow`, `color.purple`
- `semantic.color.primary`, `secondary`, `danger`, `success`

### Spacing
- `spacing.1` (4px) to `spacing.16` (64px)

### Typography
- `fontFamily.sans`, `fontFamily.mono`
- `fontSize.xs` to `fontSize.5xl`

### Shadows & Radii
- `shadow.sm`, `shadow.md`, `shadow.lg`
- `radius.sm`, `radius.md`, `radius.lg`, `radius.full`

## Figma Integration

This system uses **Tokens Studio** to sync design ↔ code:

1. Install [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978) in Figma
2. Connect with GitHub (Settings → Sync → GitHub)
3. Repository: `limbpuma/design-system-pipeline`
4. File path: `tokens`

## MCP Integration (AI Assistants)

This design system supports bidirectional AI integration:

- **Read designs**: Use Framelink MCP to read Figma files
- **Create designs**: Use Talk to Figma MCP to create from code

See [.mcp/README.md](./.mcp/README.md) for setup instructions.

## License

MIT © limbpuma
