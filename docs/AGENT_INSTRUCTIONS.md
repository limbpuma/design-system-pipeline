# Instructions for AI Agents - Design System Development

## Overview

This document provides instructions for AI agents working on the design system WITHOUT Figma access.
The design system is self-documented through code, Storybook, and metadata files.

---

## How to Work Without Figma

### 1. Use Storybook as Visual Reference

Storybook is deployed at: https://limbpuma.github.io/design-system-pipeline

Run locally:
```bash
npm run storybook
```

Storybook contains:
- Visual examples of all components
- Interactive props controls
- Code snippets
- Accessibility information

### 2. Read Existing Code Patterns

All design patterns are established in existing components:

```
src/
├── components/     # Atomic components (Button, Card, Dialog)
├── blocks/         # Section components (HeroSection, StatsCards)
├── layouts/        # Page layouts (AppShell, AuthLayout)
└── templates/      # Complete pages (DashboardOverview)
```

### 3. Use Registry Files for Discovery

Machine-readable component lists:

```bash
# List all blocks
cat src/registry/blocks.registry.json

# List all templates
cat src/registry/templates.registry.json
```

### 4. Follow Design Token System

All colors, spacing, typography come from tokens:

```bash
# View generated CSS variables
cat src/styles/generated/variables.css

# View Tailwind theme
cat src/styles/generated/theme.json
```

---

## Creating New Components

### Step 1: Choose Category

| Category | Path | Purpose |
|----------|------|---------|
| components | `src/components/` | Atomic UI elements |
| blocks | `src/blocks/{category}/` | Page sections |
| layouts | `src/layouts/` | Page structure |
| templates | `src/templates/{category}/` | Complete pages |

### Step 2: Follow File Structure

```
src/blocks/{category}/{ComponentName}/
├── {ComponentName}.tsx           # Main component
├── {ComponentName}.metadata.json # MCP metadata (optional)
├── index.ts                      # Exports
```

### Step 3: Use CVA Pattern

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-styles',
        elevated: 'shadow-lg',
      },
      size: {
        sm: 'p-2 text-sm',
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
  className?: string;
  children?: React.ReactNode;
}

export function Component({ variant, size, className, children }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant, size }), className)}>
      {children}
    </div>
  );
}
```

### Step 4: Apply Design Patterns

**Color Usage:**
```tsx
// Use semantic tokens, NOT hardcoded colors
'bg-[var(--semantic-color-primary-default)]'
'text-[var(--semantic-color-foreground-default)]'
'border-[var(--semantic-color-border-default)]'
```

**Gradient Backgrounds:**
```tsx
'bg-gradient-to-br from-blue-50/50 to-blue-100/30'
'dark:from-blue-900/20 dark:to-blue-800/10'
```

**Border Accents:**
```tsx
'border-l-4 border-blue-500/70'
```

**Animations:**
```tsx
'transition-all duration-200'
'group-hover:opacity-100'
'animate-in fade-in duration-300'
```

### Step 5: Add Accessibility

```tsx
// Required for all components:
- aria-label for icon-only buttons
- aria-hidden="true" for decorative SVGs
- role="status" aria-live="polite" for dynamic content
- Semantic HTML (button, nav, main, article)
- Focus visible states: focus-visible:ring-2
```

### Step 6: Export Component

Add to `src/blocks/index.ts` or appropriate index:
```tsx
export { ComponentName } from './{category}/{ComponentName}';
```

Add to `src/index.ts`:
```tsx
export { ComponentName } from './blocks/{category}/{ComponentName}';
```

---

## Blocks to Create (Roadmap)

### Marketing Blocks
- [ ] PricingCards - Pricing tier comparison
- [ ] Testimonials - Customer testimonials carousel
- [ ] FAQ - Frequently asked questions accordion
- [ ] Newsletter - Email signup section
- [ ] Footer - Site footer with links

### Application Blocks
- [ ] DataTable - Sortable, filterable table
- [ ] ChartSection - Chart container with controls
- [ ] ActivityFeed - Recent activity list
- [ ] NotificationList - Notification center
- [ ] UserProfile - User info card

### E-commerce Blocks
- [ ] ProductCard - Product display card
- [ ] CartSummary - Shopping cart summary
- [ ] CheckoutForm - Multi-step checkout
- [ ] OrderHistory - Order list view

---

## Quality Checklist

Before completing any component:

```bash
# 1. TypeScript check
npx tsc --noEmit

# 2. ESLint check
npx eslint src/ --ext .ts,.tsx

# 3. Build tokens (if you added new tokens)
npm run tokens:build

# 4. Run Storybook to verify visually
npm run storybook
```

---

## Design Reference (No Figma Needed)

### Color Palette

Primary colors use blue tones:
- Primary: Blue 600 (light) / Blue 500 (dark)
- Success: Emerald 600
- Warning: Amber 500
- Error: Red 600

### Typography

- Headings: `font-bold text-{size}`
- Body: `text-base text-slate-600 dark:text-slate-300`
- Muted: `text-sm text-slate-500 dark:text-slate-400`

### Spacing

- Card padding: `p-4` to `p-6`
- Section spacing: `space-y-6`
- Grid gaps: `gap-4` to `gap-6`

### Border Radius

- Small elements: `rounded-md`
- Cards: `rounded-lg` or `rounded-xl`
- Buttons: `rounded-md` to `rounded-full`

### Shadows

- Cards: `shadow-sm` to `shadow-md`
- Elevated: `shadow-lg`
- Focus: Use ring utilities instead

---

## Reference Components

Study these components as examples:

1. **StatsCards** (`src/blocks/application/StatsCards/`)
   - CVA variants pattern
   - Grid layout
   - Semantic tokens

2. **ChatMessage** (`src/components/ChatMessage/`)
   - Complex component with multiple features
   - Hover states with group pattern
   - Accessibility implementation

3. **DashboardOverview** (`src/templates/dashboard/DashboardOverview/`)
   - Template composition pattern
   - Layout slot pattern
   - Props typing

---

## Git Workflow

After completing a category of components:

```bash
# 1. Verify all checks pass
npx tsc --noEmit && npx eslint src/ --ext .ts,.tsx

# 2. Commit with descriptive message
git add -A
git commit -m "feat({category}): add {ComponentName} component

- Description of what was added
- Any notable features

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# 3. Do NOT push unless explicitly requested
```

---

## Communication

When creating components, document:
1. What component was created
2. What variants/props are available
3. Any dependencies or requirements
4. Location in codebase

Example output:
```
Created: ProductCard block

Location: src/blocks/ecommerce/ProductCard/
Exports: ProductCard, ProductCardProps

Variants:
- variant: default | compact | horizontal
- size: sm | md | lg

Features:
- Image with lazy loading
- Price display with sale support
- Add to cart button
- Wishlist toggle

Dependencies: Button, Card components
```
