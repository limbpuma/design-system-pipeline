# AGENTS.md - Jules Configuration

This file provides context for Google Jules and other AI agents working on this repository.

## Project Overview

**Name:** @limbpuma/design-system
**Type:** Design System Pipeline
**Stack:** React 18 + TypeScript + Tailwind CSS + Storybook
**Repository:** https://github.com/limbpuma/design-system-pipeline

### Pipeline Flow
```
Figma → Design Tokens → Tailwind Preset → React Components → Storybook
```

---

## Build & Test Commands

```bash
# Install dependencies
npm install

# Development
npm run dev              # Start Storybook on port 6006
npm run storybook        # Same as dev

# Build
npm run build            # Build tokens + components
npm run tokens:build     # Build design tokens only
npm run build:components # Build React components only
npm run build:storybook  # Build static Storybook

# Linting & Type Checking
npm run lint             # ESLint with jsx-a11y plugin

# Testing
npm run test             # Vitest unit tests
npm run test:a11y        # Accessibility tests via Storybook

# Accessibility Validation
npm run a11y:validate           # Validate all stories
npm run a11y:validate:json      # Output as JSON
npm run a11y:report             # Generate HTML report
```

---

## Project Structure

```
design-system-pipeline/
├── src/
│   ├── components/          # Atomic UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
│   ├── blocks/              # Section/page components
│   │   ├── marketing/
│   │   ├── application/
│   │   └── ai/
│   ├── styles/
│   │   └── generated/       # Auto-generated CSS from tokens
│   └── index.ts             # Public exports
├── tokens/
│   ├── primitives/          # Base design values
│   │   └── colors.json
│   └── semantic/            # Intent-based tokens
│       └── colors.json
├── tools/
│   └── a11y-validator/      # Custom accessibility validator
├── docs/
│   ├── accessibility/       # A11y documentation
│   │   └── A11Y-ERROR-GUIDE.md
│   ├── STITCH-SYSTEM-PROMPT.md
│   └── GOOGLE-ECOSYSTEM-INTEGRATION.md
├── .storybook/              # Storybook configuration
├── .github/workflows/       # CI/CD pipelines
└── .husky/                  # Git hooks
```

---

## Accessibility Requirements (CRITICAL)

This project enforces **WCAG 2.1 AA** compliance. All components MUST pass accessibility validation.

### Pre-commit Hook
The pre-commit hook (`npm run a11y:validate`) runs automatically and **blocks commits** with critical/serious a11y errors.

### Common Fixes

#### Color Contrast (WCAG 1.4.3)
```tsx
// ❌ WRONG - Insufficient contrast in dark mode
<span className="text-slate-500 dark:text-slate-500">

// ✅ CORRECT - Invert colors for proper contrast
<span className="text-slate-500 dark:text-slate-400">
```

**Safe color pairs:**
| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `text-slate-500` | `text-slate-400` | Secondary text |
| `text-gray-900` | `text-gray-50` | Primary text |
| `bg-emerald-700` | N/A | Success with white text |

#### Icon Buttons (WCAG 4.1.2)
```tsx
// ❌ WRONG - No accessible name
<button><XIcon /></button>

// ✅ CORRECT - With aria-label
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

#### SVG Icons
```tsx
// ❌ WRONG
<svg className="w-5 h-5">...</svg>

// ✅ CORRECT - Always hide decorative icons
<svg className="w-5 h-5" aria-hidden="true">...</svg>
```

#### Scrollable Regions (WCAG 2.1.1)
```tsx
// ❌ WRONG
<div className="overflow-y-auto max-h-96">{content}</div>

// ✅ CORRECT - Keyboard accessible
<div
  className="overflow-y-auto max-h-96"
  tabIndex={0}
  role="region"
  aria-label="Message list"
>
  {content}
</div>
```

#### Landmarks
```tsx
// ❌ WRONG
<div className="container">{content}</div>

// ✅ CORRECT - Semantic HTML
<main className="container">{content}</main>
```

### Reference Documentation
- `docs/accessibility/A11Y-ERROR-GUIDE.md` - Complete error reference
- `docs/STITCH-SYSTEM-PROMPT.md` - Design system rules with contrast ratios

---

## Design Tokens

### Semantic Colors (ALWAYS use these)

**Light Mode:**
- Background: `white` (#ffffff)
- Foreground: `gray-900` (#111827)
- Muted text: `gray-500` (#6b7280) - Ratio 5.5:1 ✓
- Primary: `blue-600` (#2563eb)
- Destructive: `red-600` (#dc2626)
- Border: `gray-200` (#e5e7eb)

**Dark Mode:**
- Background: `gray-950` (#030712)
- Foreground: `gray-50` (#f9fafb)
- Muted text: `gray-400` (#9ca3af) - NOT gray-500!
- Primary: `blue-500` (#3b82f6)
- Border: `gray-800` (#1f2937)

### Token Files
- `tokens/primitives/colors.json` - Base color values
- `tokens/semantic/colors.json` - Intent-based tokens
- `src/styles/generated/variables.css` - Generated CSS variables

---

## Component Patterns

### CVA (Class Variance Authority)
All components use CVA for variant management:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

### Required Patterns
```tsx
// Transitions
'transition-all duration-200 ease-out'

// Focus states
'focus-visible:ring-2 focus-visible:ring-offset-2'

// Disabled states
'disabled:pointer-events-none disabled:opacity-50'

// Hover states
'hover:bg-[var(--semantic-color-*-hover)]'
```

---

## Storybook Stories

### File Naming
`ComponentName.stories.tsx`

### Story Structure
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default props
  },
};
```

### Accessibility Decorator
For components that need landmark context:
```tsx
import { withA11yStoryWrapper } from '../utils/storyDecorators';

const meta: Meta<typeof Component> = {
  decorators: [withA11yStoryWrapper],
};
```

---

## Git Workflow

### Branches
- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `a11y/*` - Accessibility improvements

### Commit Messages
Follow conventional commits:
```
feat: add new Button variant
fix: improve color contrast in dark mode
a11y: add aria-label to icon buttons
docs: update A11Y error guide
```

### Pre-commit Validation
The pre-commit hook validates:
1. Only `.stories.tsx` files are checked
2. Runs `npm run a11y:validate` on staged files
3. Blocks commit if critical/serious errors found

---

## Jules Task Examples

### Accessibility Fix Task
```
Fix the color contrast error in ChatMessage component.
The timestamp text uses dark:text-slate-500 which has
insufficient contrast. Change to dark:text-slate-400
following the pattern in docs/accessibility/A11Y-ERROR-GUIDE.md
```

### Component Creation Task
```
Create a new Avatar component following existing patterns:
- Use CVA for variants
- Include size variants (sm, md, lg)
- Support image and fallback initials
- Add proper alt text handling
- Include Storybook stories with accessibility tests
```

### Scheduled Tasks (Weekly)
```
1. Run npm run a11y:validate on all stories
2. If errors found, create PR with fixes
3. Follow patterns in A11Y-ERROR-GUIDE.md
```

---

## Integration with Google Tools

### Stitch → Jules Flow

Stitch genera diseños de UI que se exportan a Jules para convertir en código.

```
STITCH (diseño) → JULES (código + prompt) → GITHUB (PR) → CI/CD (a11y) → DEPLOY
```

**Proceso:**
1. En Stitch, genera el diseño de UI con contexto del Design System
2. Click **Export → Jules**
3. Selecciona repo: `limbpuma/design-system-pipeline`
4. **Escribe un prompt** explicando a Jules qué hacer (ver templates abajo)
5. Jules lee AGENTS.md + tu prompt
6. Jules implementa el código siguiendo los patrones del proyecto
7. Jules crea PR en GitHub
8. CI/CD ejecuta `npm run a11y:validate`
9. Si falla, agregar label `jules` para auto-fix

### Prompt Templates para Stitch → Jules

Ver `docs/prompts/STITCH-JULES-TEMPLATES.md` para templates completos.

**Template básico:**
```
Convierte este diseño en un componente React para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/[nombre]

INSTRUCCIONES:
1. Lee AGENTS.md para patrones del proyecto
2. Usa CVA para variantes
3. Sigue reglas de accesibilidad de A11Y-ERROR-GUIDE.md
4. Crea stories con withA11yStoryWrapper

VALIDACIÓN: npm run a11y:validate debe pasar
```

### Documentación Completa
- `docs/GOOGLE-AI-ECOSYSTEM.md` - Guía completa del ecosistema
- `docs/prompts/STITCH-JULES-TEMPLATES.md` - Templates de prompts
- `docs/STITCH-SYSTEM-PROMPT.md` - Contexto para Stitch

---

## Quality Score

Components must achieve **minimum 70/100** quality score.

### Scoring Criteria
- Accessibility compliance: 30 points
- TypeScript coverage: 20 points
- Storybook documentation: 20 points
- Visual consistency: 15 points
- Performance: 15 points

---

## Contact & Resources

- **Repository:** https://github.com/limbpuma/design-system-pipeline
- **Storybook:** Run `npm run storybook` locally
- **Documentation:** `docs/` directory
- **A11y Guide:** `docs/accessibility/A11Y-ERROR-GUIDE.md`
