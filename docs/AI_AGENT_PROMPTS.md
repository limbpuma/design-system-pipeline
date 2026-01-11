# AI Agent Prompts - Design System Pipeline

## Overview

This document contains structured prompts and instructions for AI agents to work effectively with the design system. Use these prompts as reference templates when working on design system tasks.

---

## Design Philosophy

### Core Principles

1. **Professional Enterprise Aesthetic** - Following patterns from enterprise dashboards like Vristo, WowDash, Tailwick, Dashtrap
2. **Accessibility First** - WCAG AA compliance, semantic HTML, ARIA attributes
3. **Token-Driven Design** - All visual properties derive from design tokens
4. **Component Composition** - Build complex UIs from simple, reusable primitives

### Visual Design Patterns

```
Color Strategy:
- Soft backgrounds with subtle gradients
- Border accents with opacity (border-{color}/30)
- Semantic colors for states (success, warning, error)
- Dark mode support via CSS variables

Animation Strategy:
- Subtle transitions (200-300ms)
- Hover state animations using group-hover
- Loading states with shimmer/pulse effects
- Entrance animations for dynamic content

Shadow Strategy:
- Minimal shadows for flat design
- Elevated variants for cards and modals
- Ring focus states for accessibility
```

---

## Agent Prompts

### 1. Component Design Prompt

```markdown
## Task: Design [ComponentName] Component

### Context
- Design System: @limbpuma/design-system
- Framework: React + TypeScript
- Styling: Tailwind CSS with CVA (class-variance-authority)
- Patterns: shadcn/ui patterns with semantic tokens

### Design Requirements
1. Use semantic CSS variables from tokens:
   - Background: var(--semantic-color-{context}-default)
   - Foreground: var(--semantic-color-{context}-foreground)
   - Border: var(--semantic-color-border-default)

2. Apply enterprise dashboard styling:
   - Soft gradients: from-{color}-50/50 to-{color}-100/30
   - Border accents: border-l-4 border-{color}-500/70
   - Rounded corners: rounded-xl for containers
   - Subtle shadows: shadow-sm with elevation variants

3. Implement accessibility:
   - Proper ARIA roles and labels
   - Focus visible states with ring utilities
   - Keyboard navigation support
   - Color contrast WCAG AA

4. Create variants using CVA:
   - variant: default | elevated | minimal
   - size: sm | md | lg
   - status: (component-specific states)

### Code Structure
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const componentVariants = cva(
  'base-classes transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'default-styles',
        elevated: 'shadow-lg hover:shadow-xl',
      },
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ComponentProps extends VariantProps<typeof componentVariants> {
  // Props definition
}
```

### Output Format
1. Main component file: Component.tsx
2. Export file: index.ts
3. Story file: Component.stories.tsx
```

---

### 2. Block Creation Prompt

```markdown
## Task: Create [BlockName] Block

### Definition
Blocks are reusable page sections composed of multiple components.

### Architecture
```
src/blocks/{category}/{BlockName}/
├── {BlockName}.tsx          # Main component
├── {BlockName}.metadata.json # MCP-consumable metadata
├── {BlockName}.stories.tsx  # Storybook stories
└── index.ts                 # Exports
```

### Categories
- marketing/ - Landing pages, hero sections, CTAs
- application/ - Dashboard widgets, data displays
- ecommerce/ - Product cards, checkout forms
- ai/ - AI-specific interfaces (chat, upload, results)

### Block Metadata Schema
```json
{
  "id": "block-id",
  "name": "Block Display Name",
  "category": "marketing|application|ecommerce|ai",
  "version": "1.0.0",
  "description": "Block purpose and usage",
  "composition": {
    "components": ["Button", "Card"],
    "blocks": []
  },
  "variants": {
    "layout": ["left", "right", "center"],
    "theme": ["light", "dark", "subtle"]
  },
  "props": {
    "title": { "type": "string", "required": true }
  },
  "accessibility": {
    "wcag": "AA",
    "landmarks": ["region"],
    "headingLevel": "h2"
  },
  "tags": ["conversion", "dashboard", "responsive"]
}
```

### Implementation Pattern
```tsx
export interface BlockProps extends VariantProps<typeof blockVariants> {
  // Slot props for composition
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  // Data props
  items?: DataItem[];
  // Event props
  onAction?: () => void;
}

export function BlockName({ variant, size, items, ...props }: BlockProps) {
  return (
    <section aria-labelledby="section-title" className={cn(blockVariants({ variant }))}>
      {/* Block content */}
    </section>
  );
}
```
```

---

### 3. Layout Creation Prompt

```markdown
## Task: Create [LayoutName] Layout

### Definition
Layouts provide page structure with slots for content areas.

### Common Layouts
- AppShell: Dashboard with sidebar + header + main
- AuthLayout: Centered card for login/register
- MarketingLayout: Full-width with sticky nav

### Implementation Pattern
```tsx
export interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Layout({ children, sidebar, header, footer, className }: LayoutProps) {
  return (
    <div className={cn('min-h-screen flex', className)}>
      {sidebar && (
        <aside className="fixed inset-y-0 left-0 w-64 border-r" aria-label="Sidebar">
          {sidebar}
        </aside>
      )}

      <div className="flex-1 flex flex-col ml-64">
        {header && (
          <header className="sticky top-0 z-40 border-b">
            {header}
          </header>
        )}

        <main className="flex-1 p-6" role="main">
          {children}
        </main>

        {footer && <footer className="border-t">{footer}</footer>}
      </div>
    </div>
  );
}
```

### Responsive Considerations
- Mobile: Collapsible sidebar with hamburger menu
- Tablet: Sidebar overlay mode
- Desktop: Fixed sidebar
```

---

### 4. Template Creation Prompt

```markdown
## Task: Create [TemplateName] Template

### Definition
Templates are complete page compositions combining layouts and blocks.

### Template Pattern
```tsx
import { AppShell } from '@/layouts/AppShell';
import { StatsCards } from '@/blocks/application/StatsCards';
import { DataTable } from '@/blocks/application/DataTable';

export interface PageTemplateProps {
  // Data from page/API
  stats: Stat[];
  tableData: TableRow[];
  // Injected layout parts
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

export function PageTemplate({ stats, tableData, sidebar, header }: PageTemplateProps) {
  return (
    <AppShell sidebar={sidebar} header={header}>
      <div className="space-y-6">
        <StatsCards stats={stats} />
        <DataTable data={tableData} />
      </div>
    </AppShell>
  );
}
```

### Template Metadata
```json
{
  "id": "template-id",
  "name": "Template Name",
  "category": "dashboard|marketing|auth|ecommerce",
  "layout": "AppShell",
  "blocks": [
    { "id": "stats-cards", "props": { "columns": 4 } },
    { "id": "data-table", "props": { "paginated": true } }
  ]
}
```
```

---

### 5. Accessibility Review Prompt

```markdown
## Task: Review Accessibility for [ComponentName]

### Checklist

#### HTML Semantics
- [ ] Proper heading hierarchy (h1 > h2 > h3)
- [ ] Semantic elements (nav, main, article, section)
- [ ] Lists for related items (ul/ol > li)
- [ ] Buttons for actions, links for navigation

#### ARIA Attributes
- [ ] aria-label for icon-only buttons
- [ ] aria-labelledby for sections with visible headings
- [ ] aria-describedby for additional context
- [ ] role only when semantic HTML insufficient

#### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Visible focus indicators (focus-visible:ring-2)
- [ ] Logical tab order
- [ ] Escape closes modals/dropdowns

#### Visual
- [ ] Color contrast 4.5:1 for text
- [ ] Color not sole indicator
- [ ] Text resizable to 200%
- [ ] Animations respect prefers-reduced-motion

### Common Fixes
```tsx
// BAD: div with onClick
<div onClick={handleClick}>Click me</div>

// GOOD: button for actions
<button onClick={handleClick}>Click me</button>

// BAD: custom role on native element
<ul role="list">

// GOOD: native semantic already provides role
<ul>

// BAD: non-interactive with mouse events
<article onMouseEnter={...}>

// GOOD: CSS-only hover states
<article className="group">
  <div className="group-hover:visible">
```
```

---

### 6. Story Creation Prompt

```markdown
## Task: Create Stories for [ComponentName]

### Storybook Pattern
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName, type ComponentProps } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'padded', // or 'centered', 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    // default props
  },
};

// Variants
export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
};

// States
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'Something went wrong',
  },
};

// Interactive demo with state
const InteractiveDemo = (args: Partial<ComponentProps>) => {
  const [state, setState] = useState(initialState);
  return <ComponentName {...args} value={state} onChange={setState} />;
};

export const Interactive: Story = {
  render: (args) => <InteractiveDemo {...args} />,
};
```
```

---

## Skills and Agents

### Available Skills

```
/project-setup - Initialize new development projects
```

### Subagent Types

```
- Explore: Codebase exploration and search
- Plan: Implementation planning
- Bash: Command execution
- general-purpose: Complex multi-step tasks
```

### Example Agent Usage

```markdown
## Using Explore Agent
For open-ended questions about the codebase:
- "Where are design tokens defined?"
- "How does dark mode work?"
- "What components use the Card component?"

## Using Plan Agent
For implementation planning:
- "Plan the implementation of a new DatePicker component"
- "Design the architecture for a notification system"
```

---

## MCP Tools

### Figma Integration (Talk to Figma)

```javascript
// Create frame in Figma
mcp__talk-to-figma__create_frame({
  x: 0, y: 0,
  width: 1440, height: 900,
  name: 'Dashboard Template',
  layoutMode: 'VERTICAL',
  paddingTop: 24,
  primaryAxisAlignItems: 'MIN'
});

// Read current selection
mcp__talk-to-figma__get_selection();

// Export design as image
mcp__talk-to-figma__export_node_as_image({
  nodeId: 'node-id',
  format: 'PNG',
  scale: 2
});
```

### Context7 for Documentation

```javascript
// Get up-to-date docs for any library
mcp__context7__resolve-library-id({
  libraryName: 'tailwindcss',
  query: 'How to configure dark mode?'
});
```

---

## Common Workflows

### Adding a New AI Component

1. **Research** - Use Explore agent to understand existing patterns
2. **Plan** - Use Plan agent to design implementation
3. **Create** - Write component following CVA pattern
4. **Document** - Create stories and metadata
5. **Test** - Verify accessibility and visual tests
6. **Export** - Add to index.ts and registry

### Updating Design Tokens

1. Modify `tokens/*.json` files
2. Run `npm run tokens:build`
3. Verify generated files in `src/styles/generated/`
4. Update components if semantic tokens changed

### Creating Figma-to-Code Flow

1. Read Figma design with `get_selection` or `read_my_design`
2. Extract design properties (colors, spacing, typography)
3. Map to existing tokens or create new ones
4. Generate component code following patterns
5. Create Storybook story for visual verification

---

## Quality Checklist

Before completing any component work:

- [ ] TypeScript compiles without errors
- [ ] ESLint passes with no errors/warnings
- [ ] Stories render correctly in Storybook
- [ ] Accessibility audit passes (axe-core)
- [ ] Dark mode displays correctly
- [ ] Responsive at all breakpoints
- [ ] Exports added to index.ts
- [ ] Metadata JSON created for MCP
