# Stitch Prompt: TestAvatar
Generated: 2026-01-13 20:04
Type: component
Theme: both

## Prompt

Create a reusable UI component: TestAvatar



Requirements:
- Self-contained, atomic component
- Multiple variants (default, outline, ghost if applicable)
- Multiple sizes (sm, md, lg)
- Hover, focus, active, disabled states
- Fully accessible (ARIA, keyboard navigation)
- Responsive design

DESIGN SYSTEM: Design System Pipeline
SOURCE OF TRUTH: docs/DESIGN-SYSTEM-RULES.md

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
COLORES SEMÃNTICOS (OBLIGATORIO usar estos valores exactos)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

LIGHT MODE:
- Background: white (#ffffff)
- Background subtle: gray-50 (#f9fafb)
- Foreground: gray-900 (#111827)
- Foreground muted: gray-500 (#6b7280) â†’ Ratio 5.5:1 âœ“
- Primary: blue-600 (#2563eb)
- Success: green-700 (#15803d) para texto blanco
- Destructive: red-600 (#dc2626)
- Warning: yellow-500 (#eab308) con texto OSCURO
- Border: gray-200 (#e5e7eb)

DARK MODE:
- Background: gray-950 (#030712)
- Background subtle: gray-900 (#111827)
- Foreground: gray-50 (#f9fafb)
- Foreground muted: gray-400 (#9ca3af) â†’ Ratio 5.4:1 âœ“
- Primary: blue-500 (#3b82f6)
- Border: gray-800 (#1f2937)

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
CONTRASTE WCAG 2.1 AA (CRÃTICO)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

APROBADO âœ…:
- text-gray-500 en fondo blanco (5.5:1)
- text-gray-400 en fondo gray-900/950 (5.4:1)
- text-white en bg-blue-600 (4.7:1)
- text-white en bg-green-700 (5.4:1)

PROHIBIDO âŒ:
- text-gray-400 en fondo blanco (3.0:1)
- text-gray-500 en fondo gray-900 (3.75:1)
- text-white en bg-green-600 (3.76:1)
- Gradientes con texto superpuesto

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
TIPOGRAFÃA
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

Font Family: Inter, system-ui, sans-serif
Font Mono: ui-monospace, SFMono-Regular, Menlo

Sizes:
- xs: 12px | sm: 14px | base: 16px | lg: 18px
- xl: 20px | 2xl: 24px | 3xl: 30px | 4xl: 36px

Weights: normal(400), medium(500), semibold(600), bold(700)

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
ESPACIADO (base 4px)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

1: 4px | 2: 8px | 3: 12px | 4: 16px | 6: 24px | 8: 32px | 12: 48px

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
BORDER RADIUS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

sm: 2px | base: 4px | md: 6px | lg: 8px | xl: 12px | 2xl: 16px | full: 9999px

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
ACCESIBILIDAD (OBLIGATORIO)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

1. SVGs decorativos: aria-hidden="true" SIEMPRE
2. Botones icon-only: aria-label="descripciÃ³n" SIEMPRE
3. Inputs: label asociado o aria-label SIEMPRE
4. Focus visible: ring-2 ring-offset-2 SIEMPRE
5. Touch targets: mÃ­nimo 44x44px

â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
ESTADOS INTERACTIVOS (para score 70+)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

transition-all duration-200 ease-out
hover:-translate-y-0.5 hover:shadow-lg
active:scale-[0.98]
focus-visible:ring-2 focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50

Theme: both mode
Show component in isolation with all variants/states visible.
---
JULES EXPORT INSTRUCTIONS:
When exporting to Jules, include this context:

Repository: limbpuma/design-system-pipeline
Location: src/components/TestAvatar/
Files needed:
- TestAvatar.tsx (main component)
- TestAvatar.stories.tsx (Storybook stories)
- index.ts (exports)

Follow AGENTS.md patterns:
- React 19 + TypeScript
- Tailwind CSS with semantic tokens
- Proper accessibility attributes
- Comprehensive Storybook stories
