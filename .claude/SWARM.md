# 🐝 Design System Swarm - Orchestration Guide

## Overview

Este documento define el **Swarm de Diseño** para el Design System Pipeline.
Un equipo de 12 agentes especializados que trabajan coordinadamente.

## Swarm Architecture

```
                     👑 QUEEN AGENT
              (design-system-coordinator)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   🎨 DISEÑO        💻 DESARROLLO     📋 QA/DOCS
        │                │                │
   ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
   │    │    │      │    │    │      │    │    │
  🖼️   🎯   🌈     ⚛️   🎨   🔧      ♿   🧪   📚
       │                 │                 │
      📖                🤖
```

## The 12 Agents

### 🎨 Design Layer (4)
| Agent | ID | Role |
|-------|-----|------|
| 👑 | design-system-coordinator | Queen Agent - Coordination |
| 🖼️ | visual-design-master | UI/UX Visual Design |
| 🎯 | design-tokens-specialist | Token Architecture |
| 🌈 | color-accessibility-expert | Color & A11y |

### 💻 Development Layer (4)
| Agent | ID | Role |
|-------|-----|------|
| ⚛️ | react-19-specialist | React Components |
| 🎨 | tailwind-css-specialist | Tailwind Styles |
| 🔧 | build-system-engineer | Build Pipeline |
| 📖 | storybook-specialist | Documentation |

### 📋 QA/Docs Layer (4)
| Agent | ID | Role |
|-------|-----|------|
| ♿ | accessibility-specialist | WCAG Compliance |
| 🧪 | test-engineer | Testing |
| 📚 | technical-documentation-specialist | Docs |
| 🤖 | ai-integration-specialist | MCP & AI |

---

## Invocation Patterns

### 1. Full Swarm (Queen Coordinates)
```
/swarm

Invoca al Queen Agent que coordina todo el equipo según la tarea.
```

### 2. Single Agent
```
/swarm:react      → ⚛️ react-19-specialist
/swarm:a11y       → ♿ accessibility-specialist
/swarm:tokens     → 🎯 design-tokens-specialist
/swarm:test       → 🧪 test-engineer
```

### 3. Layer Activation
```
/swarm:design     → 🖼️ + 🎯 + 🌈 (Design layer)
/swarm:dev        → ⚛️ + 🎨 + 🔧 + 📖 (Dev layer)
/swarm:qa         → ♿ + 🧪 + 📚 + 🤖 (QA layer)
```

---

## Workflow Phases

### Phase 1: DISCOVERY & PLANNING
```
Agents: 👑 + 🖼️ + 🤖
Tasks:
- Analyze GAP-ANALYSIS.md
- Define scope and priorities
- Create implementation roadmap
```

### Phase 2: DESIGN TOKENS
```
Agents: 🎯 + 🌈
Tasks:
- Audit current tokens
- Expand primitives/semantics
- Validate color contrast
- Configure dark mode
```

### Phase 3: COMPONENT DEVELOPMENT
```
Agents: ⚛️ + 🎨 + ♿
Tasks:
- Implement React components
- Apply Tailwind styles
- Validate accessibility
- Add keyboard navigation
```

### Phase 4: DOCUMENTATION & TESTING
```
Agents: 📖 + 🧪 + 📚
Tasks:
- Create Storybook stories
- Write unit tests
- Document API
- A11y automated testing
```

### Phase 5: BUILD & RELEASE
```
Agents: 🔧 + 🤖
Tasks:
- Configure CI/CD
- Update MCP Server
- Publish package
- Update registries
```

---

## Agent File Mapping

```
.claude/agents/
├── design-system-coordinator.md   👑
├── visual-design-master.md        🖼️
├── design-tokens-specialist.md    🎯
├── color-accessibility-expert.md  🌈
├── react-19-specialist.md         ⚛️
├── tailwind-css-specialist.md     🎨
├── build-system-engineer.md       🔧
├── storybook-specialist.md        📖
├── accessibility-specialist.md    ♿
├── test-engineer.md               🧪
├── technical-documentation-specialist.md  📚
└── ai-integration-specialist.md   🤖
```

---

## Task Examples

### Create New Component
```
Task: Create a new Dropdown component

Agents involved:
1. 👑 Coordinator → Plan and delegate
2. ⚛️ React → Implement component
3. 🎨 Tailwind → Style with tokens
4. ♿ A11y → ARIA patterns, keyboard
5. 📖 Storybook → Stories and docs
6. 🧪 Test → Unit tests
```

### Fix Accessibility Issue
```
Task: Fix contrast in Button component

Agents involved:
1. 🌈 Color Expert → Analyze contrast ratios
2. 🎯 Tokens → Adjust token values
3. ⚛️ React → Update component
4. ♿ A11y → Validate fix
```

### Add Dark Mode
```
Task: Implement dark mode for Card

Agents involved:
1. 🎯 Tokens → Create dark semantic tokens
2. 🌈 Color → Validate dark contrasts
3. 🎨 Tailwind → Add dark: variants
4. ⚛️ React → Apply to component
5. 📖 Storybook → Document dark mode
```

---

## Success Metrics

| Metric | Target | Agent |
|--------|--------|-------|
| A11y Violations | 0 | ♿ |
| TypeScript Coverage | 100% | ⚛️ |
| Test Coverage | 80% | 🧪 |
| Storybook Stories | All components | 📖 |
| Color Contrast | WCAG AA | 🌈 |
| SVG aria-hidden | 100% | ♿ |

---

## Quick Reference

```bash
# Invoke full swarm
"Actúa como el Design System Swarm para este proyecto"

# Invoke specific agent
"Actúa como el ⚛️ react-19-specialist"
"Actúa como el ♿ accessibility-specialist"

# Read agent instructions
cat .claude/agents/[agent-name].md
```

---

## Project Context

```
PROYECTO: Design System Pipeline
UBICACIÓN: C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline
NAMESPACE: design_system_pipeline_2025
COORDINACIÓN: Hive-Mind con Queen Agent
```
