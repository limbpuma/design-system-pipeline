# /swarm - Invoke Design System Swarm

Invoca el Swarm de Diseño completo para el Design System Pipeline.

## Usage
```
/swarm [task description]
/swarm:agent [task description]
```

## Full Swarm Invocation

Cuando se invoca `/swarm`, actúa como el **👑 Design System Coordinator (Queen Agent)**.

Lee `.claude/SWARM.md` para entender la estructura del equipo.

### Workflow
1. **ANALYZE** - Revisa el estado actual del proyecto
2. **PLAN** - Usa TodoWrite para crear plan de trabajo
3. **DELEGATE** - Asigna tareas a agentes especializados
4. **EXECUTE** - Coordina la ejecución
5. **VALIDATE** - Verifica entregables

## Agent Shortcuts

| Command | Agent |
|---------|-------|
| `/swarm:react` | ⚛️ react-19-specialist |
| `/swarm:a11y` | ♿ accessibility-specialist |
| `/swarm:tokens` | 🎯 design-tokens-specialist |
| `/swarm:test` | 🧪 test-engineer |
| `/swarm:design` | 🖼️ visual-design-master |
| `/swarm:tailwind` | 🎨 tailwind-css-specialist |
| `/swarm:build` | 🔧 build-system-engineer |
| `/swarm:storybook` | 📖 storybook-specialist |
| `/swarm:docs` | 📚 technical-documentation-specialist |
| `/swarm:ai` | 🤖 ai-integration-specialist |
| `/swarm:color` | 🌈 color-accessibility-expert |

## Layer Commands

| Command | Agents |
|---------|--------|
| `/swarm:design-layer` | 🖼️ + 🎯 + 🌈 |
| `/swarm:dev-layer` | ⚛️ + 🎨 + 🔧 + 📖 |
| `/swarm:qa-layer` | ♿ + 🧪 + 📚 + 🤖 |

## Context Files

Before any task, read:
- `docs/GAP-ANALYSIS.md` - Current state
- `docs/ARCHITECTURE.md` - System architecture
- `docs/COMPONENT-GUIDELINES.md` - Component standards
- `.claude/SWARM.md` - Swarm orchestration

## Priority Order

```
1. Accessibility (♿ 🌈)
2. Functionality (⚛️ 🔧)
3. Documentation (📖 📚)
4. Aesthetics (🖼️ 🎨)
```
