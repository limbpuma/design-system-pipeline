# Google AI Ecosystem - Design System Pipeline

Guía completa para integrar el Design System Pipeline con el ecosistema de herramientas Google AI Pro.

**Fecha:** Enero 2026
**Suscripción:** Google AI Pro ($19.99/mes)

---

## Ecosistema Completo

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      GOOGLE AI ECOSYSTEM - DESIGN SYSTEM                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                         DISEÑO → CÓDIGO → DEPLOY                        │    │
│  ├─────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                         │    │
│  │   STITCH              JULES               GITHUB            DEPLOY      │    │
│  │  ┌─────────┐        ┌─────────┐        ┌─────────┐       ┌─────────┐   │    │
│  │  │ Diseño  │───────▶│ + Prompt│───────▶│   PR    │──────▶│Storybook│   │    │
│  │  │   UI    │        │ Código  │        │ Review  │       │  Live   │   │    │
│  │  └─────────┘        └─────────┘        └─────────┘       └─────────┘   │    │
│  │       │                  │                  │                          │    │
│  │       │                  ▼                  ▼                          │    │
│  │       │            ┌─────────┐        ┌─────────┐                      │    │
│  │       │            │AGENTS.md│        │  CI/CD  │                      │    │
│  │       │            │Contexto │        │  A11y   │                      │    │
│  │       │            └─────────┘        └─────────┘                      │    │
│  │       │                                                                │    │
│  │       ▼                                                                │    │
│  │  OPCIONES DE EXPORT:                                                   │    │
│  │  ├── Jules (recomendado para Design System)                            │    │
│  │  ├── AI Studio (apps completas)                                        │    │
│  │  ├── Figma (diseño colaborativo)                                       │    │
│  │  ├── ZIP (descarga local)                                              │    │
│  │  └── Clipboard (copiar código)                                         │    │
│  │                                                                         │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                      HERRAMIENTAS DE DESARROLLO                         │    │
│  ├─────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                         │    │
│  │  ANTIGRAVITY        GEMINI CLI        CODE ASSIST       AI STUDIO      │    │
│  │  ┌─────────┐       ┌─────────┐       ┌─────────┐       ┌─────────┐     │    │
│  │  │IDE Agent│       │Terminal │       │ VS Code │       │Build App│     │    │
│  │  │ Multi-  │       │ Agent   │       │JetBrains│       │  Mode   │     │    │
│  │  │ Task    │       │         │       │         │       │         │     │    │
│  │  └─────────┘       └─────────┘       └─────────┘       └─────────┘     │    │
│  │                                                                         │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    DOCUMENTACIÓN & CONOCIMIENTO                         │    │
│  ├─────────────────────────────────────────────────────────────────────────┤    │
│  │                                                                         │    │
│  │  NOTEBOOKLM         DEEP SEARCH        WORKSPACE                        │    │
│  │  ┌─────────┐       ┌─────────┐        ┌─────────┐                      │    │
│  │  │Research │       │  Web    │        │  Docs   │                      │    │
│  │  │ Audio   │       │Analysis │        │ Sheets  │                      │    │
│  │  │Overview │       │         │        │ Slides  │                      │    │
│  │  └─────────┘       └─────────┘        └─────────┘                      │    │
│  │                                                                         │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Herramientas Disponibles

| Herramienta | Propósito | Uso en Design System |
|-------------|-----------|---------------------|
| **Stitch** | Diseño de UI con IA | Generar diseños de componentes y páginas |
| **Jules** | Agente de código autónomo | Convertir diseños en código, fixes, PRs |
| **Antigravity** | IDE agéntico | Desarrollo local multi-agente |
| **AI Studio** | Desarrollo de apps | Apps completas con backend |
| **Gemini CLI** | Terminal agent | Comandos, scripts, automatización |
| **Code Assist** | VS Code/JetBrains | Autocompletado, /fix, /test |
| **NotebookLM** | Research & docs | Knowledge base, Audio Overviews |

---

## 1. Stitch - Diseño de UI con IA

### ¿Qué es Stitch?

Stitch es una herramienta de diseño que genera interfaces de usuario a partir de:
- **Texto natural**: "Crea un dashboard de métricas con cards y gráficos"
- **Imágenes**: Sube un sketch, wireframe o screenshot

**No es solo para componentes individuales** - puedes diseñar:
- Landing pages completas
- Dashboards de aplicación
- Flujos de usuario multi-pantalla
- Interfaces móviles
- Soluciones de diseño para casos de uso específicos

### URL
```
https://stitch.withgoogle.com/
```

### Modelos Disponibles

| Modo | Modelo | Generaciones/mes | Uso |
|------|--------|------------------|-----|
| Standard | Gemini 2.5 Flash | 350 | Diseños rápidos |
| Experimental | Gemini 3 Pro | 50 | Alta calidad |

### Opciones de Export

Cuando tienes un diseño listo, puedes exportar a:

| Export | Descripción | Recomendado para |
|--------|-------------|------------------|
| **Jules** | Envía diseño + prompt a Jules | **Design System** (recomendado) |
| **AI Studio** | Importa en Build mode | Apps completas con backend |
| **Figma** | Export con layers editables | Colaboración con diseñadores |
| **ZIP** | Descarga HTML/CSS/React | Desarrollo manual local |
| **Clipboard** | Copia código | Quick paste |

### Prompt de Contexto para Stitch

Antes de tu solicitud, incluye el contexto del Design System:

```
CONTEXTO DE DESIGN SYSTEM:
- Proyecto: limbpuma/design-system-pipeline
- Stack: React 18 + TypeScript + Tailwind CSS
- Accesibilidad: WCAG 2.1 AA obligatorio
- Contraste mínimo: 4.5:1

COLORES SEMÁNTICOS:
- Light mode muted text: text-slate-500 (#6b7280)
- Dark mode muted text: text-slate-400 (#9ca3af) - NUNCA slate-500
- Primary: blue-600 (light) / blue-500 (dark)
- Background: white (light) / gray-950 (dark)

PATRONES REQUERIDOS:
- Todos los SVGs: aria-hidden="true"
- Botones icon-only: requieren aria-label
- Transiciones: transition-all duration-200 ease-out
- Focus: focus-visible:ring-2 focus-visible:ring-offset-2

---

DISEÑO SOLICITADO:
[Tu solicitud específica aquí]
```

---

## 2. Flujo Stitch → Jules

Este es el flujo principal para el Design System. Stitch genera el diseño y Jules lo convierte en código que sigue nuestros patrones.

### Flujo Paso a Paso

```
┌─────────────────────────────────────────────────────────────────┐
│                    STITCH → JULES WORKFLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. STITCH: Crear diseño                                         │
│     └── Prompt + contexto Design System                          │
│     └── Iterar hasta satisfecho                                  │
│                                                                  │
│  2. STITCH: Click "Export" → Seleccionar "Jules"                 │
│     └── Seleccionar repo: limbpuma/design-system-pipeline        │
│                                                                  │
│  3. STITCH: Escribir PROMPT para Jules ⭐ CRÍTICO                │
│     └── Explicar qué debe hacer con el diseño                    │
│     └── Referenciar AGENTS.md, tokens, a11y guide                │
│     └── Especificar ubicación y estructura de archivos           │
│                                                                  │
│  4. JULES: Recibe diseño + prompt                                │
│     └── Lee AGENTS.md para entender el proyecto                  │
│     └── Crea plan de implementación                              │
│     └── Implementa código en VM                                  │
│     └── Crea PR en GitHub                                        │
│                                                                  │
│  5. GITHUB: PR creado automáticamente                            │
│     └── CI/CD ejecuta a11y-validation                            │
│     └── Si falla → agregar label "jules" para auto-fix           │
│                                                                  │
│  6. REVIEW & MERGE                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Templates de Prompts para Jules

#### Template 1: Nuevo Componente

```
Convierte este diseño en un componente React para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/[nombre-componente]

INSTRUCCIONES:
1. Lee AGENTS.md para entender patrones del proyecto
2. Usa CVA (class-variance-authority) para variantes
3. Usa tokens semánticos de tokens/semantic/colors.json
4. Sigue reglas de accesibilidad de docs/accessibility/A11Y-ERROR-GUIDE.md:
   - Contraste dark mode: dark:text-slate-400 (NUNCA slate-500)
   - SVGs decorativos: aria-hidden="true"
   - Botones icon-only: aria-label obligatorio
5. Crea archivo .stories.tsx con decorator withA11yStoryWrapper
6. Incluye soporte dark mode completo

ESTRUCTURA DE ARCHIVOS:
- src/components/[Nombre]/[Nombre].tsx
- src/components/[Nombre]/[Nombre].stories.tsx
- src/components/[Nombre]/index.ts

VALIDACIÓN: npm run a11y:validate debe pasar
```

#### Template 2: Bloque de Marketing

```
Convierte este diseño en un bloque de marketing para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/block-[nombre]

INSTRUCCIONES:
1. Lee AGENTS.md para contexto del proyecto
2. Ubicar en src/blocks/marketing/[NombreBloque]/
3. REUTILIZAR componentes existentes de src/components/:
   - Button, Card, Input, Tabs, Dialog, etc.
4. Incluir landmark regions: <section>, <article>, etc.
5. Crear stories con variantes y responsive preview

COMPONENTES DISPONIBLES:
Ver src/components/ para lista completa

VALIDACIÓN: npm run a11y:validate debe pasar
```

#### Template 3: Dashboard/Aplicación

```
Convierte este diseño en una página de aplicación para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/app-[nombre]

INSTRUCCIONES:
1. Lee AGENTS.md para patrones del proyecto
2. Ubicar en src/blocks/application/[NombrePagina]/
3. Usar layout responsive con Tailwind Grid/Flexbox
4. Reutilizar componentes existentes
5. Incluir manejo de estados: loading, empty, error
6. Soporte completo dark mode

ACCESIBILIDAD CRÍTICA:
- Scrollable regions: tabIndex={0} role="region" aria-label
- Tablas: <th> con scope, caption si aplica
- Gráficos: texto alternativo descriptivo

VALIDACIÓN: npm run a11y:validate debe pasar
```

#### Template 4: Fix de Accesibilidad

```
Corrige los errores de accesibilidad en este diseño/componente.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: fix/a11y-[componente]

GUÍA DE REFERENCIA: docs/accessibility/A11Y-ERROR-GUIDE.md

ERRORES COMUNES A CORREGIR:
- dark:text-slate-500 → dark:text-slate-400 (contraste)
- SVGs sin aria-hidden="true"
- Botones icon-only sin aria-label
- Scrollable regions sin tabIndex={0}
- Links genéricos ("click here") → texto descriptivo

VALIDACIÓN OBLIGATORIA:
npm run a11y:validate

Si no pasa validación, NO crear PR.
```

---

## 3. Jules - Agente de Código Autónomo

### ¿Qué es Jules?

Jules es un agente de código que trabaja de forma asíncrona en la nube:
1. Recibe una tarea (desde Stitch, CLI, GitHub Issue, Dashboard)
2. Clona el repo en una VM
3. Lee AGENTS.md para entender el proyecto
4. Crea un plan
5. Implementa cambios
6. Crea un PR en GitHub

### Dashboard
```
https://jules.google.com/repo/github/limbpuma/design-system-pipeline/
```

### Límites AI Pro

| Característica | Free | AI Pro |
|----------------|------|--------|
| Tareas/día | 15 | 100 |
| Concurrentes | 3 | 15 |
| Modelo | Gemini 2.5 | Gemini 3 Pro |

### CLI Local (Instalado)

```bash
# Ubicación
C:\Users\limbp\AppData\Roaming\npm\jules

# Crear nueva tarea
jules new "Fix color contrast in ChatMessage component"

# Listar tareas activas
jules list

# Ver estado de tarea
jules status <task-id>

# Ver plan de tarea
jules plan <task-id>

# Aplicar cambios localmente (para revisar)
jules apply <task-id>

# Aprobar y crear PR
jules approve <task-id>
```

### Scheduled Tasks (Automatización)

Configurar en Dashboard → Scheduled Tasks:

#### Daily: Validación A11y
```
Nombre: Daily A11y Check
Frecuencia: Diaria (6:00 AM)
Prompt:
  Run npm run a11y:validate on all story files.

  If ANY critical or serious errors found:
  1. Read docs/accessibility/A11Y-ERROR-GUIDE.md
  2. Apply fixes following documented patterns
  3. Create PR: "fix(a11y): [date] automated fixes"

  Common fixes:
  - dark:text-slate-500 → dark:text-slate-400
  - Add aria-hidden="true" to decorative SVGs
  - Add aria-label to icon-only buttons

  If no errors, skip PR creation.
```

#### Weekly: Dependency Updates
```
Nombre: Weekly Deps Update
Frecuencia: Domingo 2:00 AM
Prompt:
  1. Run npm outdated
  2. Update minor and patch versions only
  3. Run npm run build && npm run test && npm run a11y:validate
  4. If all pass, create PR: "chore(deps): weekly updates"
  5. If any fails, do NOT create PR
```

### GitHub Issues con Jules

Agregar label `jules` a cualquier Issue:

```markdown
## Issue: Add loading state to DataTable

The DataTable component needs a skeleton loading state.

Requirements:
- Use existing Skeleton component from src/components/
- Follow patterns in AGENTS.md
- Include story with loading variant

Labels: jules, enhancement
```

Jules automáticamente:
1. Lee el Issue
2. Clona el repo
3. Implementa la solución
4. Crea PR

---

## 4. Google Antigravity - IDE Agéntico

### ¿Qué es Antigravity?

IDE basado en VS Code con capacidades de agentes autónomos:
- **Manager View**: Lanzar múltiples agentes en paralelo
- **Browser Testing**: Agentes que verifican UI automáticamente
- **Artifacts**: Verificar el trabajo del agente (screenshots, plans)
- **Knowledge Base**: Aprendizaje persistente

### Cuándo usar Antigravity vs Jules

| Escenario | Jules | Antigravity |
|-----------|-------|-------------|
| Tareas simples | ✅ | - |
| Fixes rápidos | ✅ | - |
| Trabajo asíncrono | ✅ | - |
| Desarrollo intensivo | - | ✅ |
| Múltiples tareas paralelas | Limitado | ✅ |
| Browser testing interactivo | - | ✅ |
| Debug complejo | - | ✅ |

### Instalación

```
https://antigravity.google/download
```

Disponible para Windows, macOS, Linux.

### Manager View

Lanzar múltiples agentes simultáneos:

```
Agent 1: "Fix all contrast errors in src/components/"
Agent 2: "Add loading states to all async components"
Agent 3: "Update stories to include dark mode variants"
```

Cada agente trabaja independientemente y genera Artifacts para verificación.

---

## 5. Gemini CLI - Terminal Agent

### Versión Instalada
```
gemini --version
0.23.0
```

### Comandos Útiles

```bash
# Análisis de código
gemini "Analiza src/components/Button/Button.tsx y sugiere mejoras de accesibilidad"

# Generar componente
gemini "Genera un Tooltip component siguiendo patrones de AGENTS.md"

# Review de cambios
gemini "Revisa git diff HEAD~1 y verifica cumplimiento con AGENTS.md"

# Debug de error
gemini "Este error aparece al ejecutar npm run build: [error]. ¿Cómo lo corrijo?"

# Documentación
gemini "Genera JSDoc para todas las props de src/components/Card/Card.tsx"
```

### Script de Pre-commit con Gemini

```bash
#!/bin/bash
# scripts/gemini-review.sh

CHANGES=$(git diff --cached --name-only)

if [ -z "$CHANGES" ]; then
  echo "No staged changes"
  exit 0
fi

echo "Reviewing with Gemini..."

gemini "Review these files for:
1. Accessibility (A11Y-ERROR-GUIDE.md patterns)
2. Design System patterns (AGENTS.md)
3. Semantic token usage

Files: $CHANGES

Reply PASS if ok, or list issues."
```

---

## 6. AI Studio - Desarrollo de Apps

### ¿Qué es AI Studio?

Plataforma para crear aplicaciones completas con IA:
- **Build Mode**: Describe la app en lenguaje natural
- **Annotation Mode**: Señala UI y describe cambios
- **Multi-Model**: Gemini + Imagen + Veo + Search
- **Deploy**: Export a GitHub, Firebase, GCP

### URL
```
https://aistudio.google.com/
```

### Cuándo usar AI Studio vs Stitch→Jules

| Escenario | Stitch→Jules | AI Studio |
|-----------|--------------|-----------|
| Componente individual | ✅ | - |
| Página estática | ✅ | - |
| App con backend | - | ✅ |
| Iteración interactiva | - | ✅ |
| Prototipo rápido | ✅ | ✅ |
| API integrations | - | ✅ |

### Build Mode para Design System

```
System Context:

Este proyecto usa el Design System de limbpuma/design-system-pipeline.

Requisitos:
- React 18 + TypeScript + Tailwind CSS
- WCAG 2.1 AA accessibility
- Tokens semánticos (no colores hardcoded)
- CVA para variantes de componentes

Cuando generes código:
1. Usa semantic color tokens
2. Incluye aria-labels apropiados
3. Soporta dark mode
4. Sigue patrones de AGENTS.md
```

### Drive Integration

Los proyectos se guardan en Google Drive:
- Permisos heredados de Drive
- Compartir con equipo
- Fork para variantes

---

## 7. Gemini Code Assist - VS Code

### Instalación

1. VS Code Extensions → "Gemini Code Assist"
2. Instalar extensión oficial Google
3. Sign in con cuenta Google AI Pro

### Configuración para Design System

`.vscode/settings.json`:
```json
{
  "gemini.codeAssist.enable": true,
  "gemini.codeAssist.suggestions.triggerMode": "automatic",
  "gemini.workspace.contextFiles": [
    "AGENTS.md",
    "docs/accessibility/A11Y-ERROR-GUIDE.md",
    "tokens/semantic/colors.json"
  ]
}
```

### Comandos

| Atajo | Comando | Descripción |
|-------|---------|-------------|
| `Ctrl+I` | Chat inline | Pregunta sobre código seleccionado |
| `Ctrl+Shift+I` | Panel chat | Chat completo |
| `/explain` | - | Explicar código |
| `/fix` | - | Sugerir fix |
| `/test` | - | Generar tests |
| `/docs` | - | Generar documentación |

### Prompts Contextuales

```
@workspace /fix Este componente tiene errores de accesibilidad.
Revisa A11Y-ERROR-GUIDE.md y aplica los patrones correctos.
```

```
@workspace Genera tests de accesibilidad para este componente
usando @testing-library/react siguiendo patrones de AGENTS.md.
```

---

## 8. NotebookLM - Knowledge Base

### URL
```
https://notebooklm.google.com/
```

### Límites AI Pro

| Característica | Free | AI Pro |
|----------------|------|--------|
| Audio Overviews/día | 3 | 20 |
| Notebooks | 100 | 500 |
| Sources/notebook | 50 | 300 |
| Chat queries/día | 50 | 500 |

### Notebook: Design System Knowledge Base

**Sources a agregar:**
- AGENTS.md
- docs/accessibility/A11Y-ERROR-GUIDE.md
- docs/STITCH-SYSTEM-PROMPT.md
- tokens/semantic/colors.json
- README.md

**Usar para:**
- Consultas rápidas sobre tokens y patrones
- Onboarding de nuevos contribuidores
- Explicaciones de decisiones de diseño

### Audio Overviews

Generar podcasts explicativos:
- "Cómo funciona el sistema de tokens"
- "Errores de accesibilidad comunes y soluciones"
- "Guía de contribución al Design System"
- "Flujo Stitch → Jules explicado"

---

## 9. Casos de Uso Específicos

### Caso 1: Crear nuevo componente

```
1. STITCH: Diseñar UI del componente
   └── Incluir contexto de Design System en prompt
   └── Iterar hasta satisfecho con diseño

2. EXPORT → JULES
   └── Usar Template 1 (Nuevo Componente)
   └── Especificar branch: feature/[nombre]

3. JULES: Implementa y crea PR

4. REVIEW: Verificar código y stories

5. MERGE
```

### Caso 2: Diseñar página completa

```
1. STITCH: Diseñar layout completo
   └── Prompt con contexto + descripción detallada
   └── Puede ser multi-pantalla

2. EXPORT → JULES
   └── Usar Template 3 (Dashboard/Aplicación)
   └── Especificar reutilización de componentes existentes

3. JULES: Implementa con componentes existentes

4. CI/CD: Valida accesibilidad

5. REVIEW & MERGE
```

### Caso 3: Fix de accesibilidad masivo

```
1. JULES CLI:
   jules new "Run npm run a11y:validate and fix ALL errors
   following patterns in docs/accessibility/A11Y-ERROR-GUIDE.md"

2. JULES: Ejecuta validación, aplica fixes

3. PR: Review de todos los cambios

4. MERGE
```

### Caso 4: Desarrollo local intensivo

```
1. ANTIGRAVITY: Abrir proyecto

2. MANAGER VIEW: Lanzar múltiples agentes
   └── Agent 1: "Add tests to all components without tests"
   └── Agent 2: "Update all stories to include dark mode"
   └── Agent 3: "Fix all TypeScript strict mode errors"

3. REVIEW: Verificar Artifacts de cada agente

4. COMMIT & PUSH
```

---

## 10. CLI Local - Referencia Rápida

### Jules CLI

```bash
# Nueva tarea
jules new "descripción de la tarea"

# Listar tareas
jules list

# Ver estado
jules status <id>

# Ver plan
jules plan <id>

# Aplicar local (preview)
jules apply <id>

# Aprobar y crear PR
jules approve <id>

# Cancelar tarea
jules cancel <id>
```

### Gemini CLI

```bash
# Consulta simple
gemini "pregunta"

# Con archivo como contexto
gemini -f src/components/Button.tsx "mejoras de accesibilidad"

# Modo interactivo
gemini -i

# Output a archivo
gemini "genera componente Tooltip" > Tooltip.tsx
```

---

## 11. Checklist de Setup

### Herramientas Instaladas Localmente

- [x] Jules CLI (`jules` en PATH)
- [x] Gemini CLI 0.23.0 (`gemini` en PATH)
- [ ] Google Antigravity (desktop app)
- [ ] Gemini Code Assist (VS Code extension)

### Configuración de Servicios

- [ ] Dashboard Jules conectado al repo
- [ ] Scheduled Tasks configuradas
- [ ] Label "jules" creado en GitHub
- [ ] NotebookLM notebook creado
- [ ] AI Studio con contexto del proyecto

### Verificación

```bash
# Jules
jules list

# Gemini
gemini --version

# Validación local
npm run a11y:validate
```

---

## Recursos

- [Stitch](https://stitch.withgoogle.com/)
- [Jules](https://jules.google/)
- [Jules Dashboard](https://jules.google.com/repo/github/limbpuma/design-system-pipeline/)
- [Google Antigravity](https://antigravity.google/)
- [AI Studio](https://aistudio.google.com/)
- [NotebookLM](https://notebooklm.google.com/)
- [Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist)
- [Google AI Pro](https://one.google.com/about/google-ai-plans/)
