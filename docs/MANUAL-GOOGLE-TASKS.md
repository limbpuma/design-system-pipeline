# Manual Google Tasks - Sistema de Tareas Planificadas

Este documento define tareas estructuradas para servicios Google que requieren intervención manual del usuario.

---

## Arquitectura de Dos Niveles

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    NIVEL 1: GOOGLE CLOUD (MANUAL)                       │
│                                                                         │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐            │
│   │ Stitch  │    │AI Studio│    │NotebookLM│   │  Jules  │            │
│   │  (UI)   │    │  (UI)   │    │   (UI)   │   │  (Web)  │            │
│   └────┬────┘    └────┬────┘    └────┬────┘   └────┬────┘            │
│        │              │              │              │                  │
│   ┌────▼──────────────▼──────────────▼──────────────▼────┐            │
│   │        TASK TEMPLATES (instrucciones precisas)       │            │
│   │              + PROMPTS INCLUIDOS                      │            │
│   └───────────────────────┬──────────────────────────────┘            │
│                           │                                            │
│                    [ Usuario ejecuta ]                                 │
│                           │                                            │
└───────────────────────────┼────────────────────────────────────────────┘
                            │
                     [ Output local ]
                            │
┌───────────────────────────▼────────────────────────────────────────────┐
│                    NIVEL 2: LOCAL (AUTOMATIZADO)                       │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                     Claude Code                                  │  │
│   │              (Revisión + Validación + Delegación)               │  │
│   └───────────┬─────────────────────────────────┬───────────────────┘  │
│               │                                 │                      │
│               ▼                                 ▼                      │
│   ┌───────────────────────┐       ┌─────────────────────────────────┐ │
│   │   antigravity-inbox   │       │       automation-team           │ │
│   │ (Delegación a Gemini) │       │    (Multi-agent worktrees)      │ │
│   │                       │       │                                 │ │
│   │  ┌─────────────────┐  │       │  ┌────────┐  ┌────────┐        │ │
│   │  │   Antigravity   │  │       │  │Gemini-1│  │Gemini-2│        │ │
│   │  │  (Gemini IDE)   │  │       │  │Research│  │Analysis│        │ │
│   │  │                 │  │       │  └────────┘  └────────┘        │ │
│   │  │  MCP Servers:   │  │       │                                 │ │
│   │  │  - compute-rtr  │  │       │  ┌────────┐  ┌────────┐        │ │
│   │  │  - crewai       │  │       │  │ Jules  │  │ Claude │        │ │
│   │  │  - brave-search │  │       │  │  CLI   │  │Worktree│        │ │
│   │  │  - playwright   │  │       │  └────────┘  └────────┘        │ │
│   │  └─────────────────┘  │       └─────────────────────────────────┘ │
│   └───────────────────────┘                                           │
│                                                                        │
│   Paths:                                                               │
│   - antigravity-inbox: C:\Users\limbp\Documents\AI_FIRST\antigravity-inbox
│   - automation-team:   C:\Users\limbp\Documents\AI_FIRST\automation-team
└────────────────────────────────────────────────────────────────────────┘
```

---

## NIVEL 1: Tareas Manuales Google

### Task Template Format

```yaml
TASK_ID: [task-001]
SERVICIO: [Stitch | AI Studio | NotebookLM | Jules Web]
CASO_DE_USO: [Descripción del caso de uso real]
TIEMPO_ESTIMADO: [5-15 min]

INSTRUCCIONES:
  1. [Paso 1]
  2. [Paso 2]
  ...

PROMPT_INCLUIDO: |
  [Prompt completo para copiar/pegar]

OUTPUT_ESPERADO:
  - [Qué debe generar el servicio]

ENTREGA_LOCAL:
  - [Cómo enviar el resultado a local]
```

---

## TAREAS PARA STITCH (UI Design)

### TASK-STITCH-001: Diseñar Página Completa

**Caso de uso**: Diseñar una página de aplicación completa (Dashboard, Settings, Profile, etc.)

**Instrucciones**:
1. Abrir Stitch en https://stitch.google.com
2. Crear nuevo proyecto "Design System Pipeline - [NombrePágina]"
3. Copiar el prompt incluido
4. Revisar el diseño generado
5. Ajustar manualmente si es necesario
6. Exportar → **Jules** con el prompt de implementación incluido

**Prompt para Stitch**:
```
Diseña una página completa de [NOMBRE_PÁGINA] para una aplicación web moderna.

DESIGN SYSTEM: Design System Pipeline
SOURCE OF TRUTH: docs/DESIGN-SYSTEM-RULES.md

═══════════════════════════════════════════════════════════════
COLORES SEMÁNTICOS (OBLIGATORIO)
═══════════════════════════════════════════════════════════════

LIGHT MODE:
- Background: white (#ffffff)
- Background subtle: gray-50 (#f9fafb)
- Foreground: gray-900 (#111827)
- Foreground muted: gray-500 (#6b7280) → Ratio 5.5:1 ✓
- Primary: blue-600 (#2563eb)
- Border: gray-200 (#e5e7eb)

DARK MODE:
- Background: gray-950 (#030712)
- Foreground: gray-50 (#f9fafb)
- Foreground muted: gray-400 (#9ca3af) → Ratio 5.4:1 ✓
- Primary: blue-500 (#3b82f6)
- Border: gray-800 (#1f2937)

═══════════════════════════════════════════════════════════════
CONTRASTE WCAG 2.1 AA
═══════════════════════════════════════════════════════════════

APROBADO ✅:
- text-gray-500 en fondo blanco (5.5:1)
- text-gray-400 en fondo gray-900/950 (5.4:1)

PROHIBIDO ❌:
- text-gray-400 en fondo blanco (3.0:1)
- text-gray-500 en fondo gray-900 (3.75:1)

═══════════════════════════════════════════════════════════════
REQUISITOS
═══════════════════════════════════════════════════════════════

1. Layout responsive (mobile-first)
2. Estados: default, hover, focus, disabled
3. Modo claro Y oscuro
4. Accesibilidad completa
5. Espaciado consistente (base 4px)
6. Border radius: rounded-md para cards, rounded-lg para modals

Theme: both mode
Mostrar versión desktop y mobile side-by-side.
```

**Prompt para Jules Export**:
```
Convierte este diseño en una página React para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/page-[nombre-pagina]
UBICACIÓN: src/blocks/application/[NombrePagina]/

INSTRUCCIONES:
1. Lee AGENTS.md para patrones del proyecto
2. Lee docs/DESIGN-SYSTEM-RULES.md para colores exactos
3. Usa CVA para variantes de componentes
4. Implementa light/dark mode con clases Tailwind
5. Todos los SVG deben tener aria-hidden="true"
6. Crea stories en [NombrePagina].stories.tsx

VALIDACIÓN: npm run a11y:validate debe pasar
```

**Entrega Local**:
- Esperar PR de Jules en GitHub
- Ejecutar: `jules session list` para ver estado
- Una vez completado: `git pull origin feature/page-[nombre]`

---

### TASK-STITCH-002: Diseñar Componente Complejo

**Caso de uso**: Diseñar componentes complejos (DataTable, Calendar, FileUploader, etc.)

**Instrucciones**:
1. Abrir Stitch
2. Usar `stitch-prompt.ps1` para generar prompt:
   ```powershell
   .\scripts\automation\stitch-prompt.ps1 -Type component -Name "DataTable" -Theme both
   ```
3. Copiar prompt generado a Stitch
4. Revisar diseño
5. Exportar a Jules

---

## TAREAS PARA AI STUDIO (UI)

### TASK-AISTUDIO-001: Prototipo Rápido con Imagen

**Caso de uso**: Generar imágenes de referencia para UI

**Instrucciones**:
1. Abrir AI Studio: https://aistudio.google.com
2. Seleccionar modelo: Gemini 2.5 Pro
3. Usar prompt incluido
4. Descargar imagen generada
5. Guardar en: `docs/references/[nombre].png`

**Prompt**:
```
Genera una imagen de referencia para una interfaz de usuario moderna:

Elemento: [NOMBRE_ELEMENTO]
Estilo: Minimalista, profesional, accesible
Colores: Azul (#2563eb) como primario, grises neutros
Fondo: Blanco o gris muy claro

NO incluir texto en la imagen.
Formato: 16:9, alta resolución
```

---

### TASK-AISTUDIO-002: Análisis de Codebase Grande

**Caso de uso**: Analizar todo el codebase con contexto de 1M tokens

**Instrucciones**:
1. Abrir AI Studio
2. Seleccionar Gemini 2.5 Pro (1M context)
3. Subir archivos del proyecto
4. Ejecutar análisis
5. Copiar resultado a: `docs/analysis/[fecha]-[tema].md`

**Prompt**:
```
Analiza este codebase de Design System y genera un reporte de:

1. Estructura del proyecto
2. Patrones utilizados
3. Inconsistencias encontradas
4. Oportunidades de mejora
5. Componentes faltantes

Formato: Markdown estructurado con ejemplos de código
```

---

## TAREAS PARA NOTEBOOKLM

### TASK-NOTEBOOKLM-001: Documentación Interactiva

**Caso de uso**: Crear knowledge base del Design System

**Instrucciones**:
1. Abrir NotebookLM: https://notebooklm.google.com
2. Crear nuevo notebook: "Design System Pipeline"
3. Subir documentos:
   - `docs/DESIGN-SYSTEM-RULES.md`
   - `AGENTS.md`
   - `docs/accessibility/A11Y-ERROR-GUIDE.md`
4. Hacer preguntas sobre el sistema
5. Guardar respuestas útiles en: `docs/knowledge/[tema].md`

---

## TAREAS PARA ANTIGRAVITY (Gemini Local)

Antigravity es el IDE de Google con Gemini integrado. Funciona como "Claude Code pero con Gemini".

### Directorio de Entrega

```
C:\Users\limbp\Documents\AI_FIRST\antigravity-inbox\
├── CLAUDE.md           ← Contexto para Gemini
├── tasks/              ← Tareas pendientes (Claude Code las crea)
├── output/             ← Resultados de Gemini
├── templates/          ← Templates de tareas
└── archive/            ← Tareas completadas
```

### TASK-ANTIGRAVITY-001: Delegar Pagina Completa

**Caso de uso**: Implementar una pagina completa del Design System

**Desde Claude Code:**
```powershell
# Crear tarea para Antigravity
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Dashboard" -Type page -Priority high

# Con descripcion adicional
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Settings" -Type page -Description "Pagina de configuracion con tabs para Profile, Security, Notifications"

# Abrir Antigravity automaticamente
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Profile" -Type page -OpenAntigravity
```

**Manualmente:**
1. Crear archivo en `antigravity-inbox/tasks/TASK-XXX.md`
2. Usar template de `templates/PAGE-TEMPLATE.md`
3. Abrir Antigravity con el directorio `antigravity-inbox`
4. Gemini leera CLAUDE.md y ejecutara la tarea

### TASK-ANTIGRAVITY-002: Analisis de Codigo

**Caso de uso**: Analizar codebase con Gemini's 1M context

```powershell
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Component Quality" -Type analysis -Description "Revisar todos los componentes contra DESIGN-SYSTEM-RULES.md"
```

### TASK-ANTIGRAVITY-003: Research con Web Search

**Caso de uso**: Investigar tecnologias o patrones

```powershell
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "React 19 Patterns" -Type research -Description "Investigar nuevos patrones de React 19 para Server Components"
```

### MCP Tools en Antigravity

Antigravity tiene acceso a estos MCP servers:

| Server | Uso |
|--------|-----|
| `compute-router` | Agentes especializados, generacion de codigo |
| `crewai-orchestrator` | NPU local (Phi-4, DeepSeek-R1, Llama-3.1) |
| `brave-search` | Busqueda web |
| `playwright` | Testing de browser |

---

## TAREAS PARA JULES (Web Interface)

### TASK-JULES-WEB-001: Tarea Compleja desde Web

**Caso de uso**: Crear tarea que requiere contexto visual de Stitch

**Instrucciones**:
1. Abrir Jules: https://jules.google.com
2. Seleccionar repositorio: `limbpuma/design-system-pipeline`
3. Crear nueva sesión con prompt incluido
4. Esperar completación
5. Revisar PR generado

---

## NIVEL 2: Delegación a automation-team

### Integración con automation-team

Una vez que el output de Google services está en local, delegamos a automation-team para:

1. **Páginas completas** → Antigravity / Claude worktrees
2. **Análisis de código** → Gemini-1/2
3. **Tareas batch** → Jules CLI (async)
4. **Revisión final** → Claude Code

### Workflow de Delegación

```bash
# 1. Verificar estado del team
cd C:\Users\limbp\Documents\AI_FIRST\automation-team
python scripts/orchestrator.py status

# 2. Delegar página completa a Jules
python scripts/orchestrator.py feature "Implementar página [nombre] basada en diseño de Stitch" --repo ../design-system-pipeline

# 3. O delegar análisis a Gemini
python scripts/team_cli.py gemini "Revisar implementación de [componente] contra DESIGN-SYSTEM-RULES.md" --search

# 4. Para múltiples tareas paralelas
python scripts/team_cli.py jules "Fix accessibility en todos los componentes" --repo ../design-system-pipeline
```

### Casos de Uso para Delegación

| Caso de Uso | Servicio Manual | Delegación Local |
|-------------|-----------------|------------------|
| Dashboard Page | Stitch → diseño | **Antigravity** → implementación completa |
| E-commerce Product Page | Stitch → diseño | Antigravity o Jules CLI → código |
| Settings Page | Stitch → diseño | Antigravity (con MCP compute-router) |
| AI Chat Interface | AI Studio → prototipo | Antigravity → implementación |
| Component Library Review | NotebookLM → docs | Antigravity → análisis con 1M context |
| Research tecnológico | — | Antigravity (brave-search MCP) |
| Testing visual | — | Antigravity (playwright MCP) |

### Cuando usar cada delegación

| Delegación | Mejor para |
|------------|------------|
| **Antigravity** | Páginas completas, análisis profundo, tareas que requieren MCP tools |
| **automation-team** | Múltiples tareas paralelas, worktrees de Claude, batch processing |
| **Jules CLI** | PRs en GitHub, tareas async que no requieren supervisión |
| **Gemini CLI** | Research rápido, tareas pequeñas |

---

## Checklist de Flujo Completo

### Paso 1: Diseño (Manual)
- [ ] Elegir tarea de este documento
- [ ] Ejecutar en servicio Google correspondiente
- [ ] Exportar/guardar output

### Paso 2: Revisión (Claude Code)
- [ ] Recibir output en local
- [ ] Claude Code revisa contra DESIGN-SYSTEM-RULES.md
- [ ] Identificar correcciones necesarias

### Paso 3: Delegación (automation-team)
- [ ] Ejecutar `orchestrator.py status` para verificar capacidad
- [ ] Delegar implementación con workflow apropiado
- [ ] Monitorear progreso

### Paso 4: Integración (Claude Code)
- [ ] Revisar PRs generados
- [ ] Ejecutar `npm run a11y:validate`
- [ ] Merge si pasa validación

---

## Comandos Rápidos

```powershell
# ═══════════════════════════════════════════════════════════════
# ANTIGRAVITY (Delegación principal para páginas)
# ═══════════════════════════════════════════════════════════════

# Delegar página a Antigravity
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Dashboard" -Type page -Priority high

# Delegar con descripción
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Settings" -Type page -Description "Tabs: Profile, Security, Notifications"

# Delegar análisis
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Quality Review" -Type analysis

# Delegar research
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "React 19" -Type research

# Preview sin crear (dry run)
.\scripts\automation\delegate-to-antigravity.ps1 -TaskName "Test" -Type page -DryRun

# ═══════════════════════════════════════════════════════════════
# STITCH (Diseño UI)
# ═══════════════════════════════════════════════════════════════

# Generar prompt para Stitch
.\scripts\automation\stitch-prompt.ps1 -Type page -Name "Dashboard" -CopyToClipboard

# ═══════════════════════════════════════════════════════════════
# AUTOMATION-TEAM (Multi-agent)
# ═══════════════════════════════════════════════════════════════

# Ver estado de automation-team
cd C:\Users\limbp\Documents\AI_FIRST\automation-team
python scripts/orchestrator.py status

# Delegar tarea a Jules
python scripts/orchestrator.py feature "Implementar Dashboard desde diseño Stitch"

# Monitorear Jules
jules session list

# ═══════════════════════════════════════════════════════════════
# PATHS IMPORTANTES
# ═══════════════════════════════════════════════════════════════

# Inbox de Antigravity (abrir en Antigravity IDE)
# C:\Users\limbp\Documents\AI_FIRST\antigravity-inbox

# automation-team
# C:\Users\limbp\Documents\AI_FIRST\automation-team

# Design System Pipeline
# C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline
```
