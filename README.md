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
- **AI-Ready Components** - Professional chat interfaces, image upload, analysis displays
- **MCP Integration** - Bidirectional Figma communication via MCP

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  TEMPLATES        (LoginPage, DashboardOverview, LandingPage)   │
│  └─ Complete pages composed of blocks + layout                  │
├─────────────────────────────────────────────────────────────────┤
│  LAYOUTS          (AppShell, AuthLayout, MarketingLayout)       │
│  └─ Page structure with sidebar, header, main, footer slots     │
├─────────────────────────────────────────────────────────────────┤
│  BLOCKS           (HeroSection, StatsCards, FeatureGrid)        │
│  └─ Reusable page sections composed of components               │
├─────────────────────────────────────────────────────────────────┤
│  COMPONENTS       (Button, Card, Dialog, ChatMessage)           │
│  └─ Atomic UI elements with variants                            │
├─────────────────────────────────────────────────────────────────┤
│  TOKENS           (Colors, Typography, Spacing)                 │
│  └─ Design primitives + semantic mappings                       │
└─────────────────────────────────────────────────────────────────┘
```

---

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

---

## Available Components

### Core Components

| Component | Description | Built on |
|-----------|-------------|----------|
| `Button` | Primary, secondary, outline, ghost, danger, success variants | CVA |
| `Card` | CardHeader, CardTitle, CardDescription, CardContent, CardFooter | Native |
| `Dialog` | Modal dialogs with overlay, animations, accessible | Radix UI |
| `Tabs` | Tabbed interface with keyboard navigation | Radix UI |

### AI Components

| Component | Description | Use Case |
|-----------|-------------|----------|
| `ChatMessage` | Professional chat bubbles with avatars, actions | AI chat interfaces |
| `PromptInput` | Advanced input with suggestions, voice, attachments | AI query input |
| `ConversationPanel` | Full conversation container with status | Chat applications |
| `ImageUploader` | Drag-drop image upload with progress | AI image analysis |
| `AnalysisProgress` | Multi-step progress with animations | Long-running tasks |
| `AIResultsCard` | Structured AI response display | Analysis results |
| `AIStatusIndicator` | Connection/processing status | AI state feedback |

### Blocks

| Block | Category | Description |
|-------|----------|-------------|
| `HeroSection` | marketing | Landing page hero with variants |
| `FeatureGrid` | marketing | Grid of features with icons |
| `CTASection` | marketing | Call-to-action sections |
| `StatsCards` | application | Dashboard KPI/metrics cards |

### Layouts

| Layout | Description |
|--------|-------------|
| `AppShell` | Dashboard with collapsible sidebar |
| `AuthLayout` | Centered card for auth pages |
| `MarketingLayout` | Full-width with sticky navigation |

### Templates

| Template | Layout | Description |
|----------|--------|-------------|
| `DashboardOverview` | AppShell | Complete dashboard with stats, charts, activity |
| `LoginPage` | AuthLayout | Authentication page |
| `LandingPage` | MarketingLayout | Marketing landing page |

---

## Component Examples

### Button

```tsx
import { Button } from '@limbpuma/design-system';

<Button variant="primary" size="md">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button isLoading>Processing...</Button>
```

### ChatMessage (AI)

```tsx
import { ChatMessage } from '@limbpuma/design-system';

<ChatMessage
  role="assistant"
  content="I've analyzed your image and found several areas of concern."
  timestamp={new Date()}
  avatar={{ initials: "AI", color: "blue" }}
  status="delivered"
  reactions={[
    { emoji: "👍", count: 2 },
    { emoji: "🎯", count: 1 }
  ]}
/>
```

### PromptInput (AI)

```tsx
import { PromptInput } from '@limbpuma/design-system';

<PromptInput
  value={prompt}
  onChange={setPrompt}
  onSubmit={handleSubmit}
  placeholder="Describe what you want to analyze..."
  showVoice
  showAttachment
  suggestions={[
    { id: '1', text: 'Analyze roof condition', icon: '🏠' },
    { id: '2', text: 'Check for water damage', icon: '💧' },
  ]}
/>
```

### StatsCards (Block)

```tsx
import { StatsCards } from '@limbpuma/design-system';

<StatsCards
  stats={[
    { label: 'Total Users', value: '12,345', change: '+12.5%', changeType: 'positive' },
    { label: 'Revenue', value: '$45,678', change: '+8.2%', changeType: 'positive' },
    { label: 'Active Sessions', value: '1,234', changeType: 'neutral' },
  ]}
  variant="bordered"
  columns={3}
/>
```

### DashboardOverview (Template)

```tsx
import { DashboardOverview } from '@limbpuma/design-system';

<DashboardOverview
  stats={stats}
  activities={recentActivity}
  chartContent={<MyChart data={chartData} />}
  sidebar={<Sidebar />}
  header={<Header />}
  title="Dashboard"
  subtitle="Welcome back, here's what's happening"
/>
```

---

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

### CSS Variable Usage

```css
/* Semantic tokens (recommended) */
.my-component {
  background-color: var(--semantic-color-primary-default);
  color: var(--semantic-color-primary-foreground);
  border-color: var(--semantic-color-border-default);
}

/* Dark mode automatically switches via .dark class */
```

### OKLCH Color Format

All colors use OKLCH for better perceptual uniformity:

```css
/* OKLCH: L (lightness 0-1), C (chroma), H (hue 0-360) */
--color-blue-500: oklch(0.623 0.188 259.82);
--color-red-600: oklch(0.577 0.215 27.32);
```

---

## Project Structure

```
design-system-pipeline/
├── tokens/                    # Design tokens (source of truth)
│   ├── primitives/            # Base values (colors, spacing, typography)
│   └── semantic/              # Semantic tokens
│
├── src/
│   ├── components/            # Core React components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Dialog/
│   │   ├── ChatMessage/       # AI chat component
│   │   ├── PromptInput/       # AI input component
│   │   └── ConversationPanel/ # AI conversation container
│   │
│   ├── blocks/                # Page sections
│   │   ├── marketing/         # HeroSection, FeatureGrid, CTASection
│   │   ├── application/       # StatsCards, DataTable
│   │   └── ai/                # ImageUploader, AnalysisProgress, AIResultsCard
│   │
│   ├── layouts/               # Page layouts
│   │   ├── AppShell/
│   │   ├── AuthLayout/
│   │   └── MarketingLayout/
│   │
│   ├── templates/             # Complete pages
│   │   ├── dashboard/         # DashboardOverview
│   │   ├── authentication/    # LoginPage
│   │   └── marketing/         # LandingPage
│   │
│   ├── lib/
│   │   └── utils.ts           # cn() utility for class merging
│   │
│   ├── styles/generated/      # Auto-generated (DO NOT edit)
│   │   ├── variables.css
│   │   ├── theme.json
│   │   └── tailwind.preset.js
│   │
│   └── stories/               # Storybook stories
│
├── docs/                      # Documentation
│   ├── AI_AGENT_PROMPTS.md    # Prompts for AI agents
│   └── phases/ROADMAP.md      # Project roadmap
│
├── .github/workflows/         # CI/CD
│   ├── tokens-sync.yml
│   ├── publish-npm.yml
│   └── deploy-storybook.yml
│
└── mcp-server/                # MCP server for AI integration
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run tokens:build` | Generate CSS/JS from JSON tokens |
| `npm run storybook` | Start Storybook at localhost:6006 |
| `npm run build` | Full build (tokens + components) |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run end-to-end pipeline tests |

---

## AI Agent Integration

### For AI Agents Working on This Project

See [docs/AI_AGENT_PROMPTS.md](./docs/AI_AGENT_PROMPTS.md) for:
- Component design patterns
- Block/Layout/Template creation guides
- Accessibility review checklist
- Story creation templates
- MCP tool usage examples

### Design Philosophy for AI Agents

```markdown
1. Use CVA for all component variants
2. Apply semantic CSS variables from tokens
3. Follow enterprise dashboard styling (soft gradients, subtle shadows)
4. Ensure WCAG AA accessibility
5. Create stories for visual documentation
6. Export from index.ts for public API
```

---

## MCP Integration

### Bidirectional Figma Communication

- **Read designs**: Use Figma MCP to read design files
- **Create designs**: Use Talk to Figma MCP to create from code

### Available MCP Tools

```javascript
// Read Figma selection
mcp__talk-to-figma__get_selection()

// Create frame in Figma
mcp__talk-to-figma__create_frame({ x, y, width, height, name })

// Export as image
mcp__talk-to-figma__export_node_as_image({ nodeId, format: 'PNG' })
```

See [.mcp/README.md](./.mcp/README.md) for setup instructions.

---

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

### For AI Agents

1. Read existing patterns with Explore agent
2. Plan implementation with Plan agent
3. Create components following CVA pattern
4. Document with stories and metadata
5. Verify with ESLint and TypeScript

---

## Browser Support

- Chrome/Edge 111+ (native OKLCH)
- Firefox 113+ (native OKLCH)
- Safari 15.4+ (native OKLCH)

---

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

---

## Credits

Architecture inspired by:
- [shadcn/ui](https://ui.shadcn.com/) - Component patterns & semantic tokens
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tremor](https://www.tremor.so/) - Dashboard components
- [Vristo](https://vristo.sbthemes.com/) - Enterprise dashboard design
- [WowDash](https://themeforest.net/item/wowdash/) - Modern dashboard patterns

---

## License

MIT © limbpuma
