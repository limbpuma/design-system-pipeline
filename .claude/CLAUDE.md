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

## 🚨 QUALITY FRAMEWORK (MANDATORY)

### Minimum Score: 70/100
**Components below 70 will be REJECTED by submit_component.**

### Before Creating ANY Component
1. Read `design://rules/quality` (via MCP)
2. Read `docs/AI-AGENT-INSTRUCTIONS.md`
3. Use `validate_design_quality` before submission

### Required Premium Patterns
```tsx
// ✅ MANDATORY
'transition-all duration-200 ease-out'
'hover:bg-[var(--semantic-color-*-hover)]'
'focus-visible:ring-2 focus-visible:ring-offset-2'
'disabled:pointer-events-none disabled:opacity-50'

// ⭐ PREMIUM (for 70+ score)
'active:scale-[0.98]'
'hover:-translate-y-0.5'
'shadow-lg shadow-*/25'
'ring-1 ring-inset ring-white/20'
```

### Reference: `docs/examples/ButtonPremium.example.tsx`

---

## Critical Rules

### 1. SVG Icons (MANDATORY)
```tsx
// ✅ ALWAYS
<svg aria-hidden="true" ...>

// ❌ NEVER
<svg ...>
```

### 2. Semantic Tokens (OBLIGATORIO)

**SIEMPRE usar variables CSS semánticas en lugar de clases directas de Tailwind.**

```tsx
// ✅ CORRECTO - Tokens semánticos (dark mode automático)
'bg-[var(--semantic-color-background-default)]'
'text-[var(--semantic-color-foreground-default)]'
'text-[var(--semantic-color-foreground-muted)]'
'bg-[var(--semantic-color-primary-default)]'
'border-[var(--semantic-color-border-default)]'

// ❌ INCORRECTO - Clases directas (requiere dark: prefix)
'bg-white dark:bg-gray-950'
'text-gray-900 dark:text-gray-50'
'text-gray-500 dark:text-gray-400'
```

**Variables disponibles:**
| Variable | Light | Dark |
|----------|-------|------|
| `--semantic-color-background-default` | white | gray-950 |
| `--semantic-color-foreground-default` | gray-900 | gray-50 |
| `--semantic-color-foreground-muted` | gray-500 | gray-400 |
| `--semantic-color-primary-default` | blue-600 | blue-500 |
| `--semantic-color-border-default` | gray-200 | gray-800 |

Ver todas en: `src/styles/generated/variables.css`

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
2. **Quality Score ≥ 70** - MANDATORY for all components
3. **Functionality** - Component behavior
4. **Documentation** - Storybook + docs
5. **Aesthetics** - Visual polish beyond 70

---

## Before Any Task

1. Read `docs/AI-AGENT-INSTRUCTIONS.md` ⭐ QUALITY RULES
2. Read `docs/COMPONENT-GUIDELINES.md`
3. Check `.claude/SWARM.md` for agent delegation
4. Use `TodoWrite` for planning
5. Run `validate_design_quality` before submit

---

## 🔗 Delegación a Antigravity (Agent Bridge MCP)

Para delegar tareas de UI/páginas a Antigravity, usar el **Agent Bridge MCP**.

### Cuándo Delegar a Antigravity
- Páginas completas de aplicación
- Componentes con UI compleja
- Tareas que requieren browser automation
- Generación de imágenes/assets

### Flujo Push + PR

```
Claude Code delega → Antigravity implementa → Push a branch → Crea PR → Claude Code revisa/merge
```

### Cómo Delegar

```python
# Enviar tarea a Antigravity
send_task(
  from_agent="claude-code",
  to_agent="antigravity",
  title="Implementar <PageName> Page",
  description="""
  Crear página <PageName> siguiendo DESIGN-SYSTEM-RULES.

  ## 🚀 ENTREGA: Push + PR (OBLIGATORIO)

  1. Crear branch: feature/ag-<task_id>
  2. Implementar en: src/blocks/application/<PageName>/
  3. Ejecutar: npm run lint (DEBE pasar)
  4. Commit con mensaje estructurado
  5. Push y crear PR con gh CLI
  6. Responder con URL del PR

  ## Requisitos Técnicos
  - React 19 + TypeScript + CVA
  - Tailwind con tokens semánticos CSS
  - WCAG 2.1 AA (contraste mínimo 4.5:1)
  - Dark mode automático via CSS variables

  ## 🎨 TOKENS SEMÁNTICOS (OBLIGATORIO)

  USAR variables CSS en lugar de clases Tailwind directas:

  ✅ CORRECTO:
  - bg-[var(--semantic-color-background-default)]
  - text-[var(--semantic-color-foreground-default)]
  - text-[var(--semantic-color-foreground-muted)]
  - border-[var(--semantic-color-border-default)]
  - bg-[var(--semantic-color-primary-default)]

  ❌ INCORRECTO:
  - bg-white dark:bg-gray-950
  - text-gray-900 dark:text-gray-50

  Ver: src/styles/generated/variables.css

  ## Estructura de Archivos
  src/blocks/application/<PageName>/
  ├── <PageName>.tsx
  ├── <PageName>.stories.tsx
  └── index.ts

  ## ⚠️ REGLAS CRÍTICAS DE LINT (OBLIGATORIAS)

  1. NO declarar código sin usar (variables, funciones, imports)
  2. NO usar role redundante: <ul role="list"> ❌ → <ul> ✅
  3. NO usar href="#": <a href="#"> ❌ → <button type="button"> ✅
  4. NO usar tabIndex en elementos no interactivos
  5. SVG SIEMPRE con aria-hidden="true"
  6. Select DEBE tener aria-label o label asociado

  ## Checklist Antes de Push
  - [ ] npm run lint pasa sin errores
  - [ ] No hay imports/variables sin usar
  - [ ] No hay role redundante en ul/nav/main
  - [ ] No hay href="#" (usar button o URL real)
  - [ ] Todos los SVG tienen aria-hidden="true"
  - [ ] Los select tienen aria-label
  - [ ] Ambos modos light/dark implementados
  """,
  task_type="page",
  priority="high",
  project="design-system",
  context={
    "target_path": "src/blocks/application/<PageName>/",
    "branch_name": "feature/ag-<task_id>",
    "delivery_method": "push_pr"
  }
)
```

### Verificar Respuesta

```python
# Consultar estado de la tarea
response = get_response(agent_id="claude-code", task_id="<task_id>")

# La respuesta incluirá:
# - pr_url: URL del Pull Request creado
# - branch: nombre del branch
# - files_created: lista de archivos
```

### Después de Recibir PR

1. **Revisar PR en GitHub** - Verificar cambios y CI status
2. **Merge si todo OK** - `gh pr merge <pr_number> --squash`
3. **O solicitar cambios** - Comentar en el PR si hay issues

