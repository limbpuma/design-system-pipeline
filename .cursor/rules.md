# Cursor Rules - Design System Pipeline

## Project Context

This is a design system project that bridges Figma designs with React/Tailwind code.
**Target**: WCAG 2.1 AA compliance, usable by humans AND AI agents.

---

## CRITICAL: Accessibility Rules (WCAG 2.1 AA)

### 1. Semantic HTML First
```tsx
// CORRECT
<button onClick={handleClick}>Submit</button>
<nav aria-label="Main navigation">...</nav>
<main>...</main>

// WRONG - Never do this
<div onClick={handleClick}>Submit</div>
<div className="nav">...</div>
```

### 2. Interactive Elements
| Element | Required Attributes |
|---------|---------------------|
| Button (icon-only) | `aria-label="Description"` |
| Button (with text) | Text content is sufficient |
| Link | `href` + descriptive text (not "click here") |
| Input | `id` + `<label htmlFor="id">` |
| Image | `alt="description"` or `alt=""` if decorative |
| Icon (decorative) | `aria-hidden="true"` |
| Icon (functional) | `role="img" aria-label="description"` |

### 3. Keyboard Navigation (WCAG 2.1.1)
ALL interactive components MUST support:
```tsx
// Required keyboard handlers
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') { /* activate */ }
  if (e.key === 'Escape') { /* close/cancel */ }
  if (e.key === 'ArrowDown') { /* next item */ }
  if (e.key === 'ArrowUp') { /* previous item */ }
}}
```

### 4. Focus Management (WCAG 2.4.3)
- **Visible focus**: Always use `focus-visible:ring-2` or similar
- **Focus trap**: Modals/dialogs must trap focus inside
- **Focus return**: When closing modal, return focus to trigger
- **Skip links**: Provide skip-to-content for complex pages

### 5. ARIA Patterns by Component Type

#### Popover/Dropdown
```tsx
<button
  aria-expanded={isOpen}
  aria-haspopup="dialog" // or "listbox", "menu"
  aria-controls={isOpen ? "popover-id" : undefined}
>
  Trigger
</button>
<div
  id="popover-id"
  role="dialog" // or "listbox", "menu"
  aria-label="Description"
  tabIndex={-1}
>
  Content
</div>
```

#### Combobox/Autocomplete
```tsx
<input
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-controls="listbox-id"
  aria-autocomplete="list"
  aria-activedescendant={activeOptionId}
/>
<ul id="listbox-id" role="listbox">
  <li id="option-1" role="option" aria-selected={isSelected}>
    Option 1
  </li>
</ul>
```

#### Tabs
```tsx
<div role="tablist" aria-label="Tab group">
  <button role="tab" aria-selected={true} aria-controls="panel-1">Tab 1</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Content</div>
```

#### Modal/Dialog
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Title</h2>
  <p id="dialog-description">Description</p>
</div>
```

### 6. Color & Contrast (WCAG 1.4.3)
- **Text contrast**: Minimum 4.5:1 (normal text), 3:1 (large text 18px+)
- **UI contrast**: Minimum 3:1 for borders, icons, focus indicators
- **Never use color alone**: Always combine with icon, text, or pattern
```tsx
// CORRECT - Color + icon + text
<span className="text-red-700">
  <XCircleIcon aria-hidden="true" /> Error: Invalid input
</span>

// WRONG - Color only
<span className="text-red-700">Invalid</span>
```

---

## Component Structure

### File Organization
```
src/components/[ComponentName]/
├── ComponentName.tsx       # Main component
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx  # Tests
└── index.ts               # Exports
```

### Required Props Pattern
```tsx
interface ComponentProps {
  /** User-facing description for docs */
  children: React.ReactNode;

  /** Accessible label (required for icon-only) */
  'aria-label'?: string;

  /** Additional CSS classes */
  className?: string;
}
```

### Component Template
```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const componentVariants = cva(
  'base-classes focus-visible:outline-none focus-visible:ring-2',
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Props here
}

export function Component({
  className,
  variant,
  size,
  ...props
}: ComponentProps) {
  return (
    <element
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export default Component;
```

---

## Styling Rules

### Tailwind + Design Tokens
1. **Always use tokens**: Never hardcode colors, spacing, or typography
2. **Use CVA**: For component variants with type safety
3. **Use cn()**: For conditional class merging
4. **Semantic colors**: `bg-[var(--semantic-color-primary-default)]`

### Focus States (Mandatory)
```tsx
// Every interactive element needs visible focus
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-color-ring-default)] focus-visible:ring-offset-2'
```

### Disabled States
```tsx
'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'
// Also add aria-disabled for screen readers
aria-disabled={disabled}
```

---

## UI/UX Patterns

### Loading States
- Always show loading indicator for async operations
- Use `aria-busy="true"` on the loading container
- Provide screen reader text: `<span className="sr-only">Loading...</span>`

### Error States
- Show error messages inline, near the problematic field
- Use `role="alert"` for important error messages
- Link error to field with `aria-describedby`

### Touch Targets
- Minimum 44x44px for touch devices (WCAG 2.5.5)
- Use padding, not just content size

### Animation
- Respect `prefers-reduced-motion`:
```tsx
'motion-safe:transition-all motion-reduce:transition-none'
```

---

## Storybook Stories

### Required Stories per Component
1. **Default**: Basic usage
2. **Variants**: All visual variants
3. **Sizes**: All size options
4. **States**: Hover, Focus, Disabled, Loading, Error
5. **Accessibility**: Keyboard navigation demo
6. **Composition**: Usage with other components

### Story Template
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: 'Description of what this component does and when to use it.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Document all props
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* default props */ },
};
```

---

## For AI Agents (MCP)

### Before Generating Code, ALWAYS:
1. Check if component needs keyboard navigation
2. Include appropriate ARIA attributes
3. Add `aria-hidden="true"` to decorative icons
4. Use semantic HTML elements
5. Include focus-visible styles
6. Test with the a11y addon in Storybook

### Common Mistakes to Avoid:
- Using `<div onClick>` instead of `<button>`
- Missing `aria-label` on icon-only buttons
- Using `title` instead of `aria-label`
- Forgetting `htmlFor` on labels
- Missing keyboard event handlers on custom components
- Using `role="tooltip"` for interactive content (use `role="dialog"`)
- Not returning focus after closing modals

### Checklist Before Completing Component:
- [ ] Semantic HTML used
- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all interactive elements
- [ ] ARIA attributes correct for component pattern
- [ ] Icons have aria-hidden or aria-label
- [ ] Color contrast meets 4.5:1
- [ ] Touch targets are 44x44px minimum
- [ ] Loading/error states accessible
- [ ] Works with screen reader

---

## Design Tokens

All design values come from `tokens/` directory:
- Never hardcode colors, spacing, or typography
- Tokens are transformed via Style Dictionary to Tailwind preset
- Use CSS variables: `var(--semantic-color-*)`

---

## Commands

```bash
npm run tokens:build  # Rebuild tokens from JSON
npm run storybook     # Start Storybook dev server
npm run build         # Build for production
npm run lint          # Check for issues
```

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)
