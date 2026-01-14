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
       │    │            │                 │
      📖   🧠           🤖
           │
          🏢
```

## The 14 Agents

### 🎨 Design Layer (6)
| Agent | ID | Role |
|-------|-----|------|
| 👑 | design-system-coordinator | Queen Agent - Coordination |
| 🖼️ | visual-design-master | UI/UX Visual Design |
| 🎯 | design-tokens-specialist | Token Architecture |
| 🌈 | color-accessibility-expert | Color & A11y WCAG |
| 🧠 | color-psychology-expert | Color Psychology & Emotions |
| 🏢 | industry-brand-specialist | Industry-specific Palettes |

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
/swarm:color      → 🌈 color-accessibility-expert
/swarm:psychology → 🧠 color-psychology-expert
/swarm:industry   → 🏢 industry-brand-specialist
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
| **Quality Score** | **≥70** | **👑 🖼️ ⚛️ 🎨** |
| A11y Violations | 0 | ♿ |
| TypeScript Coverage | 100% | ⚛️ |
| Test Coverage | 80% | 🧪 |
| Storybook Stories | All components | 📖 |
| Color Contrast | WCAG AA | 🌈 |
| SVG aria-hidden | 100% | ♿ |

---

## 🚨 QUALITY FRAMEWORK INTEGRATION

### Minimum Score Requirement
**TODOS los componentes DEBEN tener score ≥ 70/100**

Componentes con score < 70 serán **RECHAZADOS** por `submit_component`.

### Quality Validation Phase (NEW)
```
Phase 3.5: QUALITY VALIDATION
Agents: 👑 + 🖼️ + ⚛️ + 🎨
Tasks:
- Run validate_design_quality on each component
- Verify score >= 70
- Fix issues if score < 70
- Use suggest_design_improvements for guidance
```

### Required Premium Patterns
```
✅ MANDATORY (all components):
├── hover: states
├── focus-visible: ring
├── disabled: opacity
├── transition + duration + easing
└── semantic tokens

⭐ PREMIUM (required for 70+):
├── active: scale-[0.98]
├── hover: -translate-y-0.5
├── shadow-lg shadow-*/25
├── ring-1 ring-inset ring-white/20
└── bg-gradient-to-b
```

### Quality Tools
```json
validate_design_quality   → Check compliance
get_design_quality_score  → Get numeric score
suggest_design_improvements → Get fix suggestions
submit_component          → Auto-rejects if score < 70
```

### Component Upgrade Priority
```
Component   │ Current │ Target │ Priority
────────────┼─────────┼────────┼──────────
Select      │ ~35     │ 70+    │ 🔴 HIGH
HeroSection │ ~35     │ 70+    │ 🔴 HIGH
Input       │ ~45     │ 70+    │ 🔴 HIGH
Dialog      │ ~55     │ 70+    │ 🟡 MEDIUM
Card        │ ~60     │ 70+    │ 🟡 MEDIUM
Tabs        │ ~65     │ 70+    │ 🟢 LOW
Button      │ ~85     │ ✅     │ ✅ DONE
```

### Reference
- `design://rules/quality` - MCP quality resource
- `docs/DESIGN-QUALITY-FRAMEWORK.md` - Full framework
- `docs/AI-AGENT-INSTRUCTIONS.md` - Agent instructions

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
