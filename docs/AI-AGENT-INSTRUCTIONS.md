# AI Agent Instructions - Design System Pipeline

## 🚨 MANDATORY READING

**Before creating ANY component, you MUST:**

1. Read `design://rules/quality` (Design Quality Framework)
2. Read `design://rules/accessibility` (WCAG 2.1 AA Requirements)
3. Follow all quality standards - components below PREMIUM level will be REJECTED

---

## Quality Requirements

### Minimum Score: 70/100 (GOOD level)

Components that don't meet this threshold will be **automatically rejected** by `submit_component`.

### Required Features for ALL Components

```
✅ MANDATORY - Will cause rejection if missing:
├── hover: state                    → hover:bg-*, hover:text-*, etc.
├── focus-visible: state            → focus-visible:ring-*, focus-visible:outline-none
├── disabled: state                 → disabled:opacity-50, disabled:pointer-events-none
├── transition: animations          → transition-all, transition-colors
├── duration: timing                → duration-150, duration-200, duration-300
├── ease: easing function           → ease-out, ease-in-out
├── aria: accessibility             → aria-label, aria-hidden, role
└── semantic tokens                 → var(--semantic-color-*)

⭐ PREMIUM - Required for GOOD+ rating:
├── active: state                   → active:scale-[0.98], active:bg-*
├── transforms: elevation           → hover:-translate-y-0.5
├── shadows: depth                  → shadow-lg, shadow-xl
├── gradients: visual richness      → bg-gradient-to-b
├── ring: definition                → ring-1 ring-inset ring-white/20
└── multi-layer: shadows            → shadow-lg shadow-blue-500/25
```

---

## Component Submission Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    SUBMISSION PIPELINE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. CREATE COMPONENT                                         │
│     ↓                                                        │
│  2. SELF-VALIDATE with validate_design_quality               │
│     ↓                                                        │
│  3. CHECK SCORE ≥ 70?                                        │
│     ├─ NO  → Fix issues, return to step 1                   │
│     └─ YES → Continue                                        │
│     ↓                                                        │
│  4. SUBMIT with submit_component                             │
│     ↓                                                        │
│  5. AUTOMATIC VALIDATION (server-side)                       │
│     ├─ PASS → Component saved                               │
│     └─ FAIL → Rejection with improvement suggestions        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Available Quality Tools

### 1. `validate_design_quality`
Validates component code against quality standards.

```json
{
  "tool": "validate_design_quality",
  "input": {
    "code": "<your component code>",
    "componentType": "primitive|block|template|layout"
  }
}
```

### 2. `get_design_quality_score`
Gets numerical quality score (0-100).

```json
{
  "tool": "get_design_quality_score",
  "input": {
    "code": "<your component code>"
  }
}
```

### 3. `suggest_design_improvements`
Gets specific suggestions to improve quality.

```json
{
  "tool": "suggest_design_improvements",
  "input": {
    "code": "<your component code>"
  }
}
```

---

## Reference Examples

### Gold Standard Button (Score: 95+)

```tsx
const buttonVariants = cva(
  [
    // Base
    'relative inline-flex items-center justify-center gap-2',
    'font-medium overflow-hidden',

    // ✅ Transitions with easing
    'transition-all duration-200 ease-out',

    // ✅ Focus visible
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-offset-2',

    // ✅ Disabled
    'disabled:pointer-events-none disabled:opacity-50',

    // ✅ Active tactile feedback
    'active:scale-[0.98] active:transition-transform active:duration-75',
  ],
  {
    variants: {
      primary: [
        // ✅ Gradient
        'bg-gradient-to-b from-blue-500 to-blue-600',

        // ✅ Multi-layer shadow
        'shadow-lg shadow-blue-500/25',

        // ✅ Ring for definition
        'ring-1 ring-inset ring-white/20',

        // ✅ Hover with elevation
        'hover:from-blue-400 hover:to-blue-500',
        'hover:shadow-xl hover:shadow-blue-500/30',
        'hover:-translate-y-0.5',

        // ✅ Active pressed
        'active:shadow-md active:translate-y-0',
      ],
    },
  }
);
```

---

## Rejection Reasons

Components will be REJECTED if:

1. **Missing hover states** - No `hover:` classes
2. **Missing focus-visible** - No keyboard focus indication
3. **Missing transitions** - Abrupt state changes
4. **Missing easing** - Linear or no easing functions
5. **No accessibility** - Missing aria attributes
6. **Score below 70** - Overall quality too low

---

## Quick Checklist Before Submission

```
□ Does it have hover: states?
□ Does it have focus-visible: ring?
□ Does it have active: feedback?
□ Does it have disabled: states?
□ Does it use transition-all or transition-colors?
□ Does it have duration-200 or similar?
□ Does it have ease-out or ease-in-out?
□ Does it use semantic tokens (var(--semantic-*))?
□ Are all SVGs marked with aria-hidden="true"?
□ Are interactive elements keyboard accessible?
□ Did I run validate_design_quality?
□ Is my score ≥ 70?
```

---

## Contact

For questions about quality standards, refer to:
- `design://rules/quality` - Full quality framework
- `docs/examples/ButtonPremium.example.tsx` - Gold standard reference
