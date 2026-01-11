# @limbpuma/design-system

Scalable Design System Pipeline: **Figma → Tokens → Tailwind → React → Storybook**

[![npm version](https://img.shields.io/npm/v/@limbpuma/design-system.svg)](https://www.npmjs.com/package/@limbpuma/design-system)
[![Storybook](https://img.shields.io/badge/storybook-deployed-ff4785)](https://limbpuma.github.io/design-system-pipeline)
[![Tokens Sync](https://github.com/limbpuma/design-system-pipeline/actions/workflows/tokens-sync.yml/badge.svg)](https://github.com/limbpuma/design-system-pipeline/actions/workflows/tokens-sync.yml)

## Features

- **OKLCH Color Space** - Better perceptual uniformity for colors
- **Dark Mode Support** - Built-in light/dark theme tokens
- **Semantic Tokens** - Primary, secondary, destructive, success, warning with foreground variants
- **Accessible Components** - Built on Radix UI primitives with WAI-ARIA support
- **CVA Variants** - Type-safe component variants with class-variance-authority
- **Auto-sync** - Figma → GitHub → npm automatic pipeline

## Installation

```bash
npm install @limbpuma/design-system
```

## Quick Start

### 1. Import Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@limbpuma/design-system';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
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

### 4. Enable Dark Mode

```tsx
// Add 'dark' class to enable dark theme
<html className="dark">
  {/* Your app */}
</html>
```

### 5. Use CSS Variables

```css
/* Semantic tokens (recommended) */
.my-component {
  background-color: var(--semantic-color-primary-default);
  color: var(--semantic-color-primary-foreground);
}

/* Dark mode automatically switches via .dark class */
.dark .my-component {
  /* Uses --color-primary-default from .dark scope */
}
```

## Available Components

| Component | Description | Built on |
|-----------|-------------|----------|
| `Button` | Primary, secondary, outline, ghost, danger, success variants | CVA |
| `Card` | CardHeader, CardTitle, CardDescription, CardContent, CardFooter | Native |
| `Dialog` | Modal dialogs with overlay, animations, accessible | Radix UI |
| `Tabs` | Tabbed interface with keyboard navigation | Radix UI |

### Button

```tsx
import { Button } from '@limbpuma/design-system';

<Button variant="primary" size="md">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button isLoading>Processing...</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@limbpuma/design-system';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@limbpuma/design-system';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <p>Dialog content</p>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@limbpuma/design-system';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Design Tokens

### Token Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  PRIMITIVES (base values)                                       │
│  color.blue.500, color.gray.900, spacing.4, etc.               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  SEMANTIC (light mode)                                          │
│  --semantic-color-primary-default: oklch(0.546 0.215 262.89)   │
│  --semantic-color-primary-foreground: oklch(1 0 0)             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  DARK MODE (.dark class)                                        │
│  --color-primary-default: oklch(0.623 0.188 259.82)            │
│  --color-primary-foreground: oklch(0.13 0.027 261.7)           │
└─────────────────────────────────────────────────────────────────┘
```

### Semantic Tokens (shadcn/ui pattern)

| Token | Light | Dark | Use Case |
|-------|-------|------|----------|
| `primary` | Blue 600 | Blue 500 | Primary actions |
| `primary-foreground` | White | Gray 950 | Text on primary |
| `secondary` | Gray 100 | Gray 800 | Secondary actions |
| `destructive` | Red 600 | Red 600 | Dangerous actions |
| `success` | Green 600 | Green 600 | Success states |
| `warning` | Yellow 500 | Yellow 500 | Warning states |
| `muted` | Gray 100 | Gray 800 | Muted backgrounds |
| `accent` | Purple 100 | Purple 900 | Accent highlights |
| `card` | White | Gray 900 | Card backgrounds |
| `popover` | White | Gray 900 | Popover backgrounds |
| `border` | Gray 200 | Gray 800 | Borders |

### OKLCH Color Format

All colors use OKLCH for better perceptual uniformity:

```css
/* OKLCH: L (lightness 0-1), C (chroma), H (hue 0-360) */
--color-blue-500: oklch(0.623 0.188 259.82);
--color-red-600: oklch(0.577 0.215 27.32);
```

Benefits:
- Consistent perceived lightness across hues
- Better for generating color scales
- Native browser support

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
│   ├── primitives/            # Base values (colors, spacing, typography)
│   └── semantic/              # Semantic tokens
│       ├── colors.json        # Light mode semantic colors
│       ├── colors-dark.json   # Dark mode semantic colors
│       └── components.json    # Component-specific tokens
│
├── src/
│   ├── components/            # React components
│   │   ├── Button/            # CVA-based button
│   │   ├── Card/              # Card compound component
│   │   ├── Dialog/            # Radix UI dialog
│   │   └── Tabs/              # Radix UI tabs
│   ├── lib/
│   │   └── utils.ts           # cn() utility for class merging
│   ├── styles/generated/      # Auto-generated (DO NOT edit)
│   │   ├── variables.css      # CSS variables with dark mode
│   │   ├── theme.json
│   │   └── tailwind.preset.js
│   └── stories/               # Storybook stories
│
├── .github/workflows/         # CI/CD
│   ├── tokens-sync.yml        # Auto-build on token changes
│   ├── publish-npm.yml        # Publish to npm on tags
│   └── deploy-storybook.yml   # Deploy Storybook to GitHub Pages
│
└── examples/
    └── nextjs-app/            # Example Next.js project
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run tokens:build` | Generate CSS/JS from JSON tokens |
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

## Dependencies

### Runtime
- `react` ^18.0.0
- `class-variance-authority` - Type-safe variants
- `clsx` + `tailwind-merge` - Class merging
- `@radix-ui/react-dialog` - Accessible dialogs
- `@radix-ui/react-tabs` - Accessible tabs

### Development
- `style-dictionary` ^4.2.0 - Token transformation
- `tailwindcss` ^3.4.0 - Utility CSS
- `storybook` ^8.4.0 - Component documentation

## Browser Support

- Chrome/Edge 111+ (native OKLCH)
- Firefox 113+ (native OKLCH)
- Safari 15.4+ (native OKLCH)

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

## Credits

Architecture inspired by:
- [shadcn/ui](https://ui.shadcn.com/) - Component patterns & semantic tokens
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tremor](https://www.tremor.so/) - Dashboard components

## License

MIT © limbpuma
