# Component Development Guidelines

## Overview

This guide establishes standards for creating components in the design system. All components must follow these guidelines to ensure consistency, accessibility, and maintainability.

## Component Structure

```
src/components/
└── ComponentName/
    ├── ComponentName.tsx      # Main component
    ├── ComponentName.stories.tsx  # Storybook stories
    ├── ComponentName.test.tsx # Unit tests (optional)
    └── index.ts               # Barrel export
```

## File Templates

### Component File (ComponentName.tsx)

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ============================================
// VARIANTS (using CVA)
// ============================================

const componentVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================
// TYPES
// ============================================

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  /** Description of this prop */
  customProp?: string;
  /** Make component disabled */
  disabled?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, disabled, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Story File (ComponentName.stories.tsx)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Brief description of the component and its use cases.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// Default story
export const Default: Story = {
  args: {
    children: 'Component Content',
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
    </div>
  ),
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};

// Accessibility story
export const AccessibilityDemo: Story = {
  name: 'Accessibility',
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Tab through the components to verify focus states
      </p>
      <div className="flex gap-4">
        <ComponentName>Focusable 1</ComponentName>
        <ComponentName>Focusable 2</ComponentName>
        <ComponentName disabled>Disabled</ComponentName>
      </div>
    </div>
  ),
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
};
```

### Index File (index.ts)

```tsx
export { ComponentName, type ComponentNameProps } from './ComponentName';
```

## Styling Guidelines

### Use Design Tokens

Always use design tokens instead of hardcoded values:

```tsx
// GOOD - Uses Tailwind classes mapped to tokens
className="bg-primary-600 text-gray-900 p-4"

// BAD - Hardcoded values
className="bg-[#3b82f6] text-[#111827] p-[16px]"
```

### Available Token Categories

| Category | Examples | Usage |
|----------|----------|-------|
| Colors | `bg-primary-500`, `text-gray-900` | All color values |
| Spacing | `p-4`, `gap-2`, `m-8` | Margins, padding, gaps |
| Typography | `text-sm`, `font-medium` | Font sizes, weights |
| Borders | `rounded-md`, `border` | Border radius, width |
| Shadows | `shadow-sm`, `shadow-lg` | Box shadows |

### Focus States

All interactive elements MUST have visible focus states:

```tsx
// Using Tailwind focus utilities
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"

// Or using the a11y tokens
className="focus-visible:ring-[var(--a11y-focus-ring-width)] focus-visible:ring-[var(--a11y-focus-ring-color)]"
```

### Disabled States

```tsx
// Use aria-disabled for interactive elements (maintains focusability)
<button
  aria-disabled={disabled}
  className={cn(
    'base-styles',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
  )}
>

// Exception: Use disabled attribute only when the element truly shouldn't be focusable
<input disabled={disabled} />
```

## Accessibility Requirements

### Semantic HTML

Always use the correct HTML element:

| Need | Element | NOT |
|------|---------|-----|
| Button action | `<button>` | `<div onClick>` |
| Navigation | `<nav>`, `<a>` | `<div>` |
| Heading | `<h1>`-`<h6>` | `<div className="title">` |
| List | `<ul>`, `<ol>`, `<li>` | `<div>` |
| Form input | `<input>`, `<select>` | `<div contentEditable>` |

### Required ARIA by Component Type

#### Buttons

```tsx
<button
  type="button"
  aria-label="Close dialog"  // Required for icon-only buttons
  aria-pressed={isActive}    // For toggle buttons
  aria-expanded={isOpen}     // For menu triggers
  aria-haspopup="menu"       // For menu triggers
>
```

#### Dialogs

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

#### Tabs

```tsx
<div role="tablist" aria-label="Settings tabs">
  <button
    role="tab"
    aria-selected={selected}
    aria-controls="panel-1"
    id="tab-1"
  >
    Tab 1
  </button>
</div>
<div
  role="tabpanel"
  id="panel-1"
  aria-labelledby="tab-1"
>
  Content
</div>
```

#### Form Fields

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert">
      Please enter a valid email
    </span>
  )}
</div>
```

### Keyboard Navigation

All interactive components must support keyboard:

| Component | Required Keys |
|-----------|---------------|
| Button | Enter, Space |
| Dialog | Escape (close), Tab (trap focus) |
| Tabs | Arrow Left/Right, Home, End |
| Menu | Arrow Up/Down, Enter, Escape |
| Combobox | Arrow Up/Down, Enter, Escape |

### Color Contrast

| Text Type | Minimum Ratio | Example |
|-----------|---------------|---------|
| Normal text (<18px) | 4.5:1 | `text-gray-900` on white |
| Large text (>=18px bold, >=24px) | 3:1 | `text-gray-700` on white |
| UI components | 3:1 | Borders, icons, focus rings |

## Props Interface Guidelines

### Naming Conventions

```tsx
// Boolean props - use "is" or adjective
isLoading?: boolean;
disabled?: boolean;
open?: boolean;

// Event handlers - use "on" prefix
onClick?: () => void;
onOpenChange?: (open: boolean) => void;

// Render props - use "render" prefix or "as" for polymorphic
renderIcon?: () => React.ReactNode;
asChild?: boolean;

// Slots - use descriptive names
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
```

### Required vs Optional

```tsx
interface ButtonProps {
  // Required - component can't function without it
  children: React.ReactNode;

  // Optional - has sensible default
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';

  // Optional - enhances functionality
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}
```

### Extending HTML Attributes

```tsx
// Extend the appropriate HTML element props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
}

// For components that can be different elements
interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'article' | 'section' | 'div';
}
```

## Testing Checklist

Before submitting a component:

### Functionality
- [ ] All variants render correctly
- [ ] All sizes render correctly
- [ ] Props are applied as expected
- [ ] Default values work

### Accessibility
- [ ] Can be operated with keyboard only
- [ ] Focus states are visible
- [ ] Screen reader announces correctly
- [ ] Color contrast passes (4.5:1 text, 3:1 UI)
- [ ] Touch targets are 44x44px minimum
- [ ] **ALL SVGs have `aria-hidden="true"`** (CRITICAL)

### Storybook
- [ ] All stories render without errors
- [ ] Controls work for all props
- [ ] a11y addon shows no violations
- [ ] Documentation is complete

### Code Quality
- [ ] TypeScript types are complete
- [ ] No any types
- [ ] No eslint warnings
- [ ] Follows naming conventions
- [ ] Uses design tokens (no hardcoded values)

## Common Patterns

### Compound Components

For complex components with related parts:

```tsx
// Tabs.tsx
const TabsRoot = ({ children }) => <div role="tablist">{children}</div>;
const TabsTrigger = ({ children }) => <button role="tab">{children}</button>;
const TabsContent = ({ children }) => <div role="tabpanel">{children}</div>;

export const Tabs = Object.assign(TabsRoot, {
  Trigger: TabsTrigger,
  Content: TabsContent,
});

// Usage
<Tabs>
  <Tabs.Trigger>Tab 1</Tabs.Trigger>
  <Tabs.Content>Content 1</Tabs.Content>
</Tabs>
```

### Polymorphic Components

When a component should render as different elements:

```tsx
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps {
  asChild?: boolean;
}

const Button = ({ asChild, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
};

// Usage - renders as <a> with button styles
<Button asChild>
  <a href="/home">Go Home</a>
</Button>
```

### Controlled vs Uncontrolled

Support both patterns:

```tsx
interface DialogProps {
  // Controlled
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Uncontrolled
  defaultOpen?: boolean;
}
```

## Export Guidelines

### Component Export (index.ts in component folder)

```tsx
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### Main Export (src/index.ts)

```tsx
// Components
export { Button, type ButtonProps } from './components/Button';
export { Card, type CardProps } from './components/Card';

// Utilities
export { cn } from './utils/cn';
```

## SVG Icon Guidelines

### Mandatory: aria-hidden for All Decorative SVGs

Every SVG icon in the design system MUST include `aria-hidden="true"` to prevent screen readers from announcing decorative content.

### Icon Component Pattern

```tsx
// CORRECT: Icon component with aria-hidden
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"  // ← REQUIRED
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// Usage in a button
<button aria-label="Search">
  <SearchIcon />
</button>
```

### Inline SVG Pattern

```tsx
// CORRECT: Inline SVG with aria-hidden
<button aria-label="Close">
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"  // ← REQUIRED
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
```

### Verification Command

```bash
# Check for SVGs missing aria-hidden
grep -r "<svg" src/components/YourComponent --include="*.tsx" | grep -v "aria-hidden"
# Should return NO results
```

## Version Compatibility

- React: ^18.0.0
- TypeScript: ^5.0.0
- Tailwind CSS: ^3.4.0
- Node.js: >=18.0.0
