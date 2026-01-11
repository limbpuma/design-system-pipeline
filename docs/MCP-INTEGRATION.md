# MCP Integration Guide

## Overview

This guide documents how AI agents can consume the `@limbpuma/design-system` via MCP (Model Context Protocol) to generate accessible, consistent UI components.

## What is MCP?

Model Context Protocol (MCP) is a standard for connecting AI assistants to external data sources and tools. It enables AI agents to:

- Read design tokens and component specifications
- Access Storybook documentation
- Validate generated code against design system rules
- Maintain consistency across AI-generated interfaces

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AI Agent (Claude, etc.)                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ MCP Protocol
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MCP Server                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Tokens    │  │ Components  │  │    Rules    │             │
│  │   Resource  │  │  Resource   │  │  Resource   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Design System Pipeline                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Tokens  │→ │ Tailwind │→ │Components│→ │ Storybook│        │
│  │  (JSON)  │  │ (CSS)    │  │  (React) │  │  (Docs)  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

## MCP Server Configuration

### Option 1: File-Based MCP Server

Create an MCP server that exposes the design system files:

```json
{
  "mcpServers": {
    "design-system": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem"],
      "env": {
        "ALLOWED_DIRECTORIES": "/path/to/design-system-pipeline"
      }
    }
  }
}
```

### Option 2: Custom MCP Server

For more control, create a custom MCP server:

```javascript
// mcp-server/index.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "design-system-mcp",
  version: "1.0.0",
}, {
  capabilities: {
    resources: {},
    tools: {},
  }
});

// Resource: Design Tokens
server.setRequestHandler("resources/list", async () => ({
  resources: [
    {
      uri: "design://tokens/primitives",
      name: "Primitive Tokens",
      description: "Base colors, typography, spacing values",
      mimeType: "application/json"
    },
    {
      uri: "design://tokens/semantic",
      name: "Semantic Tokens",
      description: "Purpose-based tokens (brand, feedback, accessibility)",
      mimeType: "application/json"
    },
    {
      uri: "design://components",
      name: "Component Catalog",
      description: "Available React components with props",
      mimeType: "application/json"
    },
    {
      uri: "design://rules/accessibility",
      name: "Accessibility Rules",
      description: "WCAG 2.1 AA compliance rules",
      mimeType: "text/markdown"
    }
  ]
}));

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Resources Available to AI Agents

### 1. Design Tokens

**Location**: `tokens/` directory

| Resource | Path | Description |
|----------|------|-------------|
| Primitives | `tokens/primitives/colors.json` | Base color palette (gray, blue, green, red, etc.) |
| Primitives | `tokens/primitives/typography.json` | Font families, sizes, weights |
| Primitives | `tokens/primitives/spacing.json` | Spacing scale |
| Primitives | `tokens/primitives/shadows.json` | Box shadow definitions |
| Primitives | `tokens/primitives/radii.json` | Border radius values |
| Semantic | `tokens/semantic/colors.json` | Semantic colors (primary, secondary, success, warning, destructive) |
| Semantic | `tokens/semantic/colors-dark.json` | Dark mode semantic colors |
| Semantic | `tokens/semantic/components.json` | Component-specific tokens |
| Semantic | `tokens/semantic/accessibility.json` | Focus rings, touch targets, motion |

**Example Query**:
```
"Read the design tokens from tokens/semantic/colors.json to understand the semantic color system"
```

### 2. Component Specifications

**Location**: `src/components/`

| Component | Path | ARIA Pattern |
|-----------|------|--------------|
| Button | `src/components/Button/` | button role, aria-pressed, aria-disabled |
| Card | `src/components/Card/` | article/section semantics |
| Dialog | `src/components/Dialog/` | dialog role, focus trap |
| Tabs | `src/components/Tabs/` | tablist, tab, tabpanel |
| SearchBar | `src/components/SearchBar/` | combobox pattern |

**Example Query**:
```
"Read src/components/Button/Button.tsx to understand the Button API and variants"
```

### 3. Generated CSS Variables

**Location**: `src/styles/generated/variables.css`

```css
:root {
  /* Colors */
  --color-primary-500: #3b82f6;
  --color-gray-900: #111827;

  /* Typography */
  --font-size-base: 1rem;
  --line-height-normal: 1.5;

  /* Spacing */
  --spacing-4: 1rem;
  --spacing-8: 2rem;

  /* Accessibility */
  --a11y-focus-ring-width: 2px;
  --a11y-focus-ring-color: #3b82f6;
  --a11y-touch-target-min: 44px;
}
```

### 4. Tailwind Preset

**Location**: `src/styles/generated/tailwind.preset.js`

AI agents can reference this to understand available utility classes:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
        gray: { /* ... */ },
      },
      spacing: { /* ... */ },
      fontSize: { /* ... */ },
    }
  }
}
```

### 5. Accessibility Rules

**Location**: `docs/ACCESSIBILITY.md` and `.cursor/rules.md`

Contains WCAG 2.1 AA requirements that AI agents MUST follow when generating components.

## AI Agent Workflow

### Step 1: Read Rules First

Before generating any component, agents should read:

```
1. .cursor/rules.md - Complete ruleset for this design system
2. docs/ACCESSIBILITY.md - WCAG compliance requirements
```

### Step 2: Check Available Tokens

```
Read tokens/semantic/colors.json to understand available semantic colors
(primary, secondary, success, warning, destructive, etc.)
```

### Step 3: Reference Existing Components

```
Read src/components/Button/Button.tsx as reference for:
- Component structure
- CVA variant patterns
- Accessibility implementation
```

### Step 4: Generate Component

Using the patterns from existing components, generate new components that:

- Use design tokens (not hardcoded values)
- Follow CVA pattern for variants
- Include all required ARIA attributes
- Support keyboard navigation
- Meet WCAG 2.1 AA contrast ratios

### Step 5: Validate

```
Run: npm run lint
Run: npm run test:a11y
```

## Example Prompts for AI Agents

### Creating a New Component

```
Using the @limbpuma/design-system:

1. Read .cursor/rules.md for component guidelines
2. Read tokens/semantic/colors.json for available semantic colors
3. Read src/components/Button/Button.tsx as a reference pattern

Create a new Badge component that:
- Uses CVA for variants (info, success, warning, error)
- Uses design tokens for colors
- Has proper aria-label when used as status indicator
- Meets WCAG 2.1 AA contrast requirements
```

### Modifying an Existing Component

```
Read src/components/SearchBar/SearchBar.tsx

Add autocomplete functionality that:
- Follows ARIA combobox pattern (see docs/ACCESSIBILITY.md)
- Announces results to screen readers
- Supports keyboard navigation (Arrow keys, Enter, Escape)
- Uses existing design tokens for styling
```

### Generating a Page Layout

```
Using the design system:

1. Read the Tailwind preset at src/styles/generated/tailwind.preset.js
2. Read tokens/semantic/accessibility.json for spacing guidelines

Create a responsive dashboard layout using:
- Design system spacing tokens
- touch.target.min (44px) for interactive elements
- text.lineLength.optimal (65ch) for content areas
- Proper landmark regions (main, nav, aside)
```

## Storybook Integration

AI agents can reference the live Storybook documentation:

**URL**: https://limbpuma.github.io/design-system-pipeline/

### Storybook API (via MCP)

```javascript
// Tool: Get component stories
{
  name: "get_component_stories",
  description: "Fetch Storybook stories for a component",
  inputSchema: {
    type: "object",
    properties: {
      component: { type: "string", description: "Component name" }
    }
  }
}

// Tool: Run accessibility audit
{
  name: "run_a11y_audit",
  description: "Run axe-core accessibility audit on a story",
  inputSchema: {
    type: "object",
    properties: {
      storyId: { type: "string", description: "Story ID to audit" }
    }
  }
}
```

## Package Consumption

### NPM Installation

```bash
npm install @limbpuma/design-system
```

### Imports for AI-Generated Code

```typescript
// Components
import { Button, Card, Dialog, Tabs, SearchBar } from '@limbpuma/design-system';

// Utilities
import { cn } from '@limbpuma/design-system';

// Styles (in CSS/global)
import '@limbpuma/design-system/styles';

// Tailwind preset (in tailwind.config.js)
const preset = require('@limbpuma/design-system/tailwind-preset');
```

## Validation Checklist for AI Agents

Before completing any component generation, verify:

```markdown
## Accessibility
- [ ] All interactive elements have accessible names
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus states are visible (use a11y.focus.ring tokens)
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] ARIA attributes are correct for the component pattern

## Design Tokens
- [ ] Using design tokens, not hardcoded values
- [ ] Colors from tokens/semantic/colors.json
- [ ] Spacing from spacing tokens
- [ ] Typography from typography tokens

## Component Pattern
- [ ] Using CVA for variants
- [ ] Using cn() for class merging
- [ ] Props interface is typed
- [ ] Default props are sensible
- [ ] Component is exported from index.ts

## Documentation
- [ ] Storybook story exists
- [ ] All variants are demonstrated
- [ ] Accessibility notes in story
```

## Troubleshooting

### Token Not Found

If a token reference fails, check:
1. Token exists in `tokens/` directory
2. Token has been built: `npm run tokens:build`
3. Reference path is correct (e.g., `{color.primary.500}`)

### Accessibility Violations

Run the full a11y test suite:
```bash
npm run test:a11y
```

Check specific rules in `.storybook/preview.ts` for enabled axe-core rules.

### Component Not Exporting

Ensure the component is added to `src/index.ts`:
```typescript
export { NewComponent } from './components/NewComponent';
```

## Related Documentation

- [Architecture](./ARCHITECTURE.md) - System overview
- [Accessibility](./ACCESSIBILITY.md) - WCAG compliance guide
- [Rules](./.cursor/rules.md) - Complete ruleset for AI/human developers
