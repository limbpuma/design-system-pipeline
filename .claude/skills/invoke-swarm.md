# Skill: Invoke Swarm

## Description
Invoca el Swarm de Diseño completo para tareas del Design System Pipeline.

## Trigger
Cuando el usuario mencione:
- "swarm"
- "equipo de diseño"
- "agentes especializados"
- Cualquier tarea compleja del design system

## Execution

### Step 1: Load Context
```
Read: .claude/SWARM.md
Read: docs/GAP-ANALYSIS.md
Read: docs/ARCHITECTURE.md
```

### Step 2: Identify Agents Needed
Basado en la tarea, seleccionar agentes:

| Task Type | Agents |
|-----------|--------|
| New component | ⚛️ 🎨 ♿ 📖 🧪 |
| Fix a11y | ♿ 🌈 ⚛️ |
| Add tokens | 🎯 🌈 |
| Documentation | 📖 📚 |
| Testing | 🧪 ♿ |
| Build/CI | 🔧 |
| AI integration | 🤖 |

### Step 3: Create Plan
Use TodoWrite to create structured task list.

### Step 4: Execute
Coordinate agents based on priority:
1. Accessibility
2. Functionality
3. Documentation
4. Aesthetics

### Step 5: Validate
- Run lint/typecheck
- Check a11y violations
- Verify storybook renders

## Agent Quick Reference

```
👑 design-system-coordinator
🖼️ visual-design-master
🎯 design-tokens-specialist
🌈 color-accessibility-expert
⚛️ react-19-specialist
🎨 tailwind-css-specialist
🔧 build-system-engineer
📖 storybook-specialist
♿ accessibility-specialist
🧪 test-engineer
📚 technical-documentation-specialist
🤖 ai-integration-specialist
```
