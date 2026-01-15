# Design System Swarm

> Equipo de 14 agentes especializados para desarrollo de Design Systems.

---

## Resumen

El **Design System Swarm** es un equipo coordinado de agentes de IA especializados que trabajan juntos para crear, mantener y evolucionar sistemas de diseño de alta calidad.

| Aspecto | Detalle |
|---------|---------|
| **Nombre** | Design System Swarm |
| **Agentes** | 14 especializados |
| **Coordinador** | Queen Agent (design-system-coordinator) |
| **Path Config** | `.claude/SWARM.md` |
| **Path Agentes** | `.claude/agents/` |

---

## Arquitectura

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
         📖   🧠           🤖                🏢
```

---

## Catálogo de Agentes

### Layer: Diseño (6 agentes)

| Emoji | ID | Especialidad | Responsabilidades |
|-------|-----|--------------|-------------------|
| 👑 | `design-system-coordinator` | **Queen Agent** | Coordinación general, delegación de tareas, toma de decisiones |
| 🖼️ | `visual-design-master` | UI/UX Visual | Diseño visual, layouts, composición, estética |
| 🎯 | `design-tokens-specialist` | Token Architecture | Tokens primitivos, semánticos, estructura de variables |
| 🌈 | `color-accessibility-expert` | Color & WCAG | Contraste, paletas accesibles, validación WCAG |
| 🧠 | `color-psychology-expert` | Color Psychology | Psicología del color, emociones, impacto de marca |
| 🏢 | `industry-brand-specialist` | Industry Palettes | Paletas por industria, tendencias de mercado |

### Layer: Desarrollo (4 agentes)

| Emoji | ID | Especialidad | Responsabilidades |
|-------|-----|--------------|-------------------|
| ⚛️ | `react-19-specialist` | React Components | Componentes React 19, hooks, Server Components |
| 🎨 | `tailwind-css-specialist` | Tailwind Styles | Clases Tailwind, tokens CSS, dark mode |
| 🔧 | `build-system-engineer` | Build Pipeline | tsup, Vite, CI/CD, optimización de builds |
| 📖 | `storybook-specialist` | Storybook Docs | Stories, documentación interactiva, addons |

### Layer: QA/Docs (4 agentes)

| Emoji | ID | Especialidad | Responsabilidades |
|-------|-----|--------------|-------------------|
| ♿ | `accessibility-specialist` | WCAG Compliance | ARIA, keyboard nav, screen readers, auditorías |
| 🧪 | `test-engineer` | Testing | Unit tests, integration tests, coverage |
| 📚 | `technical-documentation-specialist` | Documentation | Docs técnicos, guías, API reference |
| 🤖 | `ai-integration-specialist` | MCP & AI | Integración con MCP servers, herramientas AI |

---

## Comandos de Invocación

### Invocar Swarm Completo
```
/swarm
```
El Queen Agent analiza la tarea y coordina los agentes necesarios.

### Invocar Agente Individual
```
/swarm:react      → ⚛️ react-19-specialist
/swarm:a11y       → ♿ accessibility-specialist
/swarm:tokens     → 🎯 design-tokens-specialist
/swarm:test       → 🧪 test-engineer
/swarm:color      → 🌈 color-accessibility-expert
/swarm:psychology → 🧠 color-psychology-expert
/swarm:industry   → 🏢 industry-brand-specialist
/swarm:tailwind   → 🎨 tailwind-css-specialist
/swarm:storybook  → 📖 storybook-specialist
/swarm:build      → 🔧 build-system-engineer
/swarm:docs       → 📚 technical-documentation-specialist
/swarm:ai         → 🤖 ai-integration-specialist
/swarm:visual     → 🖼️ visual-design-master
```

### Invocar Layer Completo
```
/swarm:design     → 🖼️ + 🎯 + 🌈 + 🧠 + 🏢 (Design layer)
/swarm:dev        → ⚛️ + 🎨 + 🔧 + 📖 (Development layer)
/swarm:qa         → ♿ + 🧪 + 📚 + 🤖 (QA/Docs layer)
```

---

## Flujos de Trabajo

### Fase 1: Discovery & Planning
```
Agentes: 👑 + 🖼️ + 🤖
Tareas:
  - Analizar requerimientos
  - Definir scope y prioridades
  - Crear roadmap de implementación
```

### Fase 2: Design Tokens
```
Agentes: 🎯 + 🌈 + 🧠
Tareas:
  - Auditar tokens actuales
  - Expandir primitivos/semánticos
  - Validar contraste de colores
  - Configurar dark mode
```

### Fase 3: Component Development
```
Agentes: ⚛️ + 🎨 + ♿
Tareas:
  - Implementar componentes React
  - Aplicar estilos Tailwind
  - Validar accesibilidad
  - Agregar navegación por teclado
```

### Fase 3.5: 🚨 Pa11y Composition Audit (CRÍTICO)
```
Agentes: 🌈 + ♿ + ⚛️ + 👑
Comandos:
  - npm run pa11y:composition   ← OBLIGATORIO
  - npm run pa11y:audit         ← Si Storybook activo

Tareas:
  - ESCANEAR todas las composiciones padre-hijo
  - VALIDAR contraste de iconos/elementos vs fondo del contenedor
  - RECHAZAR si ratio < 3:1 para iconos UI
  - NUNCA asumir que el contraste se hereda correctamente
  - Revisar reportes en reports/pa11y/

Gap Corregido:
  - El swarm NO detectaba iconos invisibles dentro de cards oscuras
  - Ejemplo: Card(bg-gray-900) + Icon(text-gray-900) = INVISIBLE
  - AHORA: pa11y + escaneo recursivo obligatorio

Reference: docs/PA11Y-AUDIT-GUIDE.md
```

### Fase 3.6: Quality Validation
```
Agentes: 👑 + 🖼️ + ⚛️ + 🎨
Tareas:
  - Ejecutar validate_design_quality
  - Verificar score >= 70
  - Corregir issues si score < 70
  - Usar suggest_design_improvements
```

### Fase 4: Documentation & Testing
```
Agentes: 📖 + 🧪 + 📚
Tareas:
  - Crear Storybook stories
  - Escribir unit tests
  - Documentar API
  - Testing automatizado de a11y
```

### Fase 5: Build & Release
```
Agentes: 🔧 + 🤖
Tareas:
  - Configurar CI/CD
  - Actualizar MCP Server
  - Publicar package
  - Actualizar registros
```

---

## Ejemplos de Uso

### Crear Nuevo Componente
```
Tarea: Crear componente Dropdown

Flujo:
1. 👑 Coordinator → Planifica y delega
2. ⚛️ React → Implementa componente
3. 🎨 Tailwind → Estiliza con tokens
4. ♿ A11y → Patrones ARIA, keyboard
5. 📖 Storybook → Stories y docs
6. 🧪 Test → Unit tests
```

### Corregir Issue de Accesibilidad
```
Tarea: Corregir contraste en Button

Flujo:
1. 🌈 Color Expert → Analiza ratios de contraste
2. 🎯 Tokens → Ajusta valores de tokens
3. ⚛️ React → Actualiza componente
4. ♿ A11y → Valida corrección
```

### Implementar Dark Mode
```
Tarea: Dark mode para Card

Flujo:
1. 🎯 Tokens → Crea tokens semánticos dark
2. 🌈 Color → Valida contrastes dark
3. 🎨 Tailwind → Agrega variantes dark:
4. ⚛️ React → Aplica al componente
5. 📖 Storybook → Documenta dark mode
```

### Crear Paleta para Industria
```
Tarea: Paleta para industria Healthcare

Flujo:
1. 🏢 Industry → Define colores por sector
2. 🧠 Psychology → Valida impacto emocional
3. 🌈 Color → Verifica accesibilidad
4. 🎯 Tokens → Implementa como preset
```

---

## Métricas de Calidad

| Métrica | Target | Agente Responsable |
|---------|--------|-------------------|
| **Quality Score** | **≥ 70** | 👑 🖼️ ⚛️ 🎨 |
| A11y Violations | 0 | ♿ |
| TypeScript Coverage | 100% | ⚛️ |
| Test Coverage | 80% | 🧪 |
| Storybook Stories | Todos | 📖 |
| Color Contrast | WCAG AA | 🌈 |
| SVG aria-hidden | 100% | ♿ |
| **Composition Contrast** | **≥ 3:1 iconos** | 🌈 + ♿ |

---

## 🚨 Gap Crítico Corregido: Composition Contrast

### El Problema Original
El swarm NO escaneaba el contraste de elementos hijos (iconos) contra el fondo de su contenedor padre. Esto resultó en iconos invisibles dentro de cards oscuras.

### Ejemplo de Falla No Detectada
```tsx
// ❌ El swarm NO detectó esto - icono invisible
<Card className="bg-gray-900 dark:bg-gray-950">
  <Icon className="text-gray-900" />  // Ratio 1:1 = INVISIBLE
</Card>

// ✅ CORRECTO - contraste verificado
<Card className="bg-gray-900 dark:bg-gray-950">
  <Icon className="text-gray-300" />  // Ratio 7.5:1 ✅
</Card>
```

### Solución Implementada
1. **Nueva Fase 3.5**: Composition Contrast Validation obligatoria
2. **Agentes actualizados**: 🌈 color-accessibility-expert y ♿ accessibility-specialist
3. **Escaneo recursivo**: Todos los hijos vs fondo del padre
4. **Nueva métrica**: Composition Contrast ≥ 3:1 para iconos UI

### Validación Requerida
```
Para CADA componente compuesto:
1. Identificar contenedores con bg-* o background
2. Listar todos los hijos con text-*, fill-*, stroke-*
3. Calcular contraste hijo vs fondo-padre (NO fondo-página)
4. RECHAZAR si < 3:1 para iconos, < 4.5:1 para texto
```

---

## Patrones Requeridos

### Obligatorios (todos los componentes)
```tsx
// Estados interactivos
'hover:bg-[var(--semantic-color-*-hover)]'
'focus-visible:ring-2 focus-visible:ring-offset-2'
'disabled:pointer-events-none disabled:opacity-50'

// Transiciones
'transition-all duration-200 ease-out'

// Tokens semánticos
'bg-[var(--semantic-color-background-default)]'
'text-[var(--semantic-color-foreground-default)]'
```

### Premium (requeridos para score 70+)
```tsx
// Micro-interacciones
'active:scale-[0.98]'
'hover:-translate-y-0.5'

// Profundidad visual
'shadow-lg shadow-*/25'
'ring-1 ring-inset ring-white/20'
'bg-gradient-to-b'
```

---

## Archivos de Configuración

```
.claude/
├── SWARM.md                              # Guía de orquestación
├── CLAUDE.md                             # Instrucciones proyecto
└── agents/
    ├── design-system-coordinator.md      # 👑 Queen
    ├── visual-design-master.md           # 🖼️ Visual
    ├── design-tokens-specialist.md       # 🎯 Tokens
    ├── color-accessibility-expert.md     # 🌈 Color
    ├── color-psychology-expert.md        # 🧠 Psychology
    ├── industry-brand-specialist.md      # 🏢 Industry
    ├── react-19-specialist.md            # ⚛️ React
    ├── tailwind-css-specialist.md        # 🎨 Tailwind
    ├── build-system-engineer.md          # 🔧 Build
    ├── storybook-specialist.md           # 📖 Storybook
    ├── accessibility-specialist.md       # ♿ A11y
    ├── test-engineer.md                  # 🧪 Test
    ├── technical-documentation-specialist.md  # 📚 Docs
    └── ai-integration-specialist.md      # 🤖 AI
```

---

## Contexto del Proyecto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Design System Pipeline |
| **Ubicación** | `C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline` |
| **Namespace** | `design_system_pipeline_2025` |
| **Coordinación** | Hive-Mind con Queen Agent |
| **Stack** | React 19 + TypeScript + Tailwind + CVA |

---

## Referencias

- `.claude/SWARM.md` - Configuración original del swarm
- `docs/AI-AGENT-INSTRUCTIONS.md` - Instrucciones para agentes
- `docs/DESIGN-QUALITY-FRAMEWORK.md` - Framework de calidad
- `docs/COMPONENT-GUIDELINES.md` - Guías de componentes

---

*Documentación del Design System Swarm - Enero 2026*
