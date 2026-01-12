# Design System Pipeline - Claude Code Instructions

## Project Overview

Design System Pipeline con enfoque AI-first para interfaces modernas.

**Location:** `C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline`

---

## 🐝 SWARM DE DISEÑO

Este proyecto utiliza un **Swarm de 12 Agentes Especializados**.

### Quick Invocation
```
/swarm              → Queen Agent coordinates all
/swarm:react        → React specialist
/swarm:a11y         → Accessibility specialist
/swarm:tokens       → Design tokens specialist
```

### Swarm Structure
```
👑 Queen (Coordinator)
├── 🎨 DESIGN: 🖼️ Visual, 🎯 Tokens, 🌈 Color
├── 💻 DEV: ⚛️ React, 🎨 Tailwind, 🔧 Build, 📖 Storybook
└── 📋 QA: ♿ A11y, 🧪 Test, 📚 Docs, 🤖 AI
```

### Agent Files
All agent definitions: `.claude/agents/`
Orchestration guide: `.claude/SWARM.md`

---

## Critical Rules

### 1. SVG Icons (MANDATORY)
```tsx
// ✅ ALWAYS
<svg aria-hidden="true" ...>

// ❌ NEVER
<svg ...>
```

### 2. Semantic Tokens
```tsx
// ✅ USE
'bg-[var(--semantic-color-background-default)]'

// ❌ AVOID
'bg-white'
```

### 3. CVA Pattern
```tsx
const variants = cva('base', {
  variants: { variant: {}, size: {} },
  defaultVariants: {},
});
```

### 4. Accessibility First
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Focus visible states

---

## File Structure

```
src/
├── components/     # Atomic components
├── blocks/         # Section components
│   ├── marketing/
│   ├── application/
│   └── ai/
├── layouts/        # Page layouts
├── templates/      # Complete pages
└── styles/         # Generated CSS

tokens/
├── primitives/     # Base values
└── semantic/       # Intent-based

docs/               # Documentation
.claude/            # Swarm agents
```

---

## Commands

```bash
# Development
npm run dev
npm run storybook

# Build
npm run build
npm run tokens:build

# Quality
npm run lint
npm run typecheck
npm run test
```

---

## Priority Order

1. **Accessibility** - No violations allowed
2. **Functionality** - Component behavior
3. **Documentation** - Storybook + docs
4. **Aesthetics** - Visual polish

---

## Before Any Task

1. Read `docs/COMPONENT-GUIDELINES.md`
2. Check `.claude/SWARM.md` for agent delegation
3. Use `TodoWrite` for planning
4. Validate with accessibility checks
