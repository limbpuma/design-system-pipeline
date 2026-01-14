# Google AI Ecosystem - Design System Pipeline

Guía completa para integrar el Design System Pipeline con el ecosistema de herramientas Google AI Pro.

**Fecha:** Enero 2026
**Suscripción:** Google AI Pro ($19.99/mes) + Claude Code Ultra ($100/mes)

---

## Arquitectura de Dos Niveles

El ecosistema se divide en dos niveles operativos:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              NIVEL 1: GOOGLE CLOUD (Intervención Manual)                    │
│                                                                             │
│   ┌─────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐               │
│   │ Stitch  │    │AI Studio│    │NotebookLM│    │  Jules  │               │
│   │  (UI)   │    │  (UI)   │    │   (UI)   │    │  (Web)  │               │
│   └────┬────┘    └────┬────┘    └────┬─────┘    └────┬────┘               │
│        │              │              │               │                     │
│   ┌────▼──────────────▼──────────────▼───────────────▼────┐               │
│   │     MANUAL TASKS (docs/MANUAL-GOOGLE-TASKS.md)        │               │
│   │        + Structured Prompts + Instructions            │               │
│   └─────────────────────────┬─────────────────────────────┘               │
│                             │                                              │
│                      [ User Executes ]                                     │
│                             │                                              │
└─────────────────────────────┼──────────────────────────────────────────────┘
                              │
                       [ Output to Local ]
                              │
┌─────────────────────────────▼──────────────────────────────────────────────┐
│              NIVEL 2: LOCAL (Semi/Full Automatizado)                       │
│                                                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐ │
│   │                      Claude Code (Orchestrator)                      │ │
│   │              Revisión + Validación + Integración                    │ │
│   └─────────────────────────────┬───────────────────────────────────────┘ │
│                                 │                                          │
│   ┌─────────────────────────────▼───────────────────────────────────────┐ │
│   │                       automation-team                                │ │
│   │        C:\Users\limbp\Documents\AI_FIRST\automation-team            │ │
│   │                                                                      │ │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐           │ │
│   │  │gemini-cli│  │jules-cli │  │Antigravity│  │ Worktrees │           │ │
│   │  │ Research │  │  Async   │  │  Advanced │  │ Claude 1-4│           │ │
│   │  │ Analysis │  │  Tasks   │  │   Agent   │  │ Gemini 1-2│           │ │
│   │  └──────────┘  └──────────┘  └──────────┘  └───────────┘           │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Capacidad Diaria

| Herramienta | Límite | Tipo |
|-------------|--------|------|
| Gemini CLI | 100/día | Automatizable |
| Jules CLI | 100/día (15 concurrent) | Automatizable |
| AI Studio UI | Ilimitado | Manual |
| Stitch | Ilimitado | Manual |
| NotebookLM | Ilimitado | Manual |
| Claude Code | ~60/5h | Semi-auto |

**Ver:** `docs/MANUAL-GOOGLE-TASKS.md` para tareas estructuradas

---

## Arquitectura Original del Ecosistema

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    GOOGLE AI ECOSYSTEM - ARQUITECTURA REAL                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                        ┌─────────────────────────┐                               │
│                        │   GEMINI (App/Web)      │                               │
│                        │   🎯 ORQUESTADOR        │                               │
│                        │   + Extensiones         │                               │
│                        └───────────┬─────────────┘                               │
│                                    │                                             │
│            ┌───────────────────────┼───────────────────────┐                     │
│            │                       │                       │                     │
│            ▼                       ▼                       ▼                     │
│   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐             │
│   │  WORKSPACE      │    │   NOTEBOOKLM    │    │    DRIVE        │             │
│   │  STUDIO         │    │   📚 Research    │    │    📁 Files     │             │
│   │  🤖 Agents/Flows│    │   Audio Overview │    │    Docs/Sheets  │             │
│   └─────────────────┘    └─────────────────┘    └─────────────────┘             │
│                                                                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                         FLUJO DE DESARROLLO                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐            │
│   │  STITCH  │─────▶│  JULES   │─────▶│  GITHUB  │─────▶│  DEPLOY  │            │
│   │  Diseño  │      │  Código  │      │    PR    │      │Storybook │            │
│   └──────────┘      └──────────┘      └──────────┘      └──────────┘            │
│        │                 │                                                       │
│        │                 ▼                                                       │
│        │           ┌──────────┐                                                  │
│        │           │AGENTS.md │ ← Jules lee este archivo                         │
│        │           └──────────┘                                                  │
│        │                                                                         │
│        ▼                                                                         │
│   EXPORT OPTIONS:                                                                │
│   ├── Jules (código automático) ⭐ Requiere GitHub App instalada                 │
│   ├── AI Studio (desarrollo interactivo)                                         │
│   ├── Figma (diseño colaborativo)                                                │
│   ├── ZIP / Clipboard (manual)                                                   │
│                                                                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                      HERRAMIENTAS LOCALES                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                        │
│   │ GEMINI CLI   │   │ JULES CLI    │   │ ANTIGRAVITY  │                        │
│   │ Terminal     │   │ Tareas async │   │ IDE Agéntico │                        │
│   │ v0.23.0 ✓    │   │ Instalado ✓  │   │ Multi-agent  │                        │
│   └──────────────┘   └──────────────┘   └──────────────┘                        │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Herramienta Central: Gemini + Extensiones

**Gemini (gemini.google.com)** es el **orquestador central** del ecosistema. No busques una app "integradora" - Gemini con extensiones activadas es el centro de mando.

### Activar Extensiones en Gemini

1. Ir a **gemini.google.com**
2. Click en **Configuración** (⚙️)
3. Ir a **Extensions/Apps**
4. Activar:
   - ✅ **Google Workspace** (Drive, Gmail, Docs, Calendar, Keep, Tasks)
   - ✅ **Google Maps** (datos geográficos)
   - ✅ **YouTube** (videos)

### Qué puedes hacer con Gemini + Extensiones

```
"Busca en mi Drive los documentos del Design System y resume los patrones de accesibilidad"

"Revisa mis emails de GitHub y crea un resumen de los PRs pendientes"

"Basándote en mi cuaderno de NotebookLM sobre WCAG, genera una checklist de accesibilidad"
```

---

## Google Workspace Studio - Automatizaciones

**URL:** https://workspace.google.com/studio/

Workspace Studio (antes "Flows") permite crear **agentes y automatizaciones sin código**.

### Disponibilidad
- Business Starter, Standard, Plus
- Enterprise Standard, Plus
- Education editions
- Requiere que admin habilite Gemini

### Cómo crear un Flow

1. Ir a Workspace Studio
2. Describir en lenguaje natural: *"Cuando reciba un email con label 'jules-review', extraer el link del PR y guardarlo en un Sheet"*
3. Gemini genera los pasos automáticamente

### Componentes de un Agent

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| **Starter** | Qué dispara la automatización | Email recibido, hora específica |
| **Steps** | Acciones a ejecutar | Extraer datos, crear doc, enviar mensaje |
| **Variables** | Datos dinámicos | Contenido del email, fecha |

### Ejemplos para Design System

```
FLOW 1: PR Review Automático
- Starter: Email de GitHub con "Pull Request"
- Steps:
  1. Extraer link del PR
  2. Gemini analiza cambios
  3. Crear resumen en Doc
  4. Notificar en Chat

FLOW 2: A11y Report Semanal
- Starter: Lunes 9:00 AM
- Steps:
  1. Leer último reporte de a11y de Drive
  2. Gemini genera resumen ejecutivo
  3. Enviar por email al equipo
```

---

## Stitch → Jules: Configuración Correcta

### Requisito: GitHub App Instalada

**⚠️ IMPORTANTE:** Para que Stitch pueda exportar a Jules, Jules debe estar instalado como **GitHub App** (no solo OAuth).

### Verificar Instalación

1. Ir a **GitHub → Settings → Applications**
2. Tab **Installed GitHub Apps**
3. Buscar **"Google Jules"**
4. Verificar que tenga acceso a `limbpuma/design-system-pipeline`

### Si no aparece Jules:

1. Ir a https://jules.google/
2. Click **"Connect to GitHub"**
3. Autorizar la app
4. Seleccionar **"All repositories"** o específicamente tu repo
5. Completar el flujo

### Troubleshooting

| Problema | Solución |
|----------|----------|
| Jules no ve mi repo | Verificar GitHub App instalada con acceso |
| Export no funciona | Revocar y reconectar desde Jules dashboard |
| Repo privado no aparece | Necesita permisos `repo (full control)` |
| Tarea no aparece en Jules | Verificar en https://jules.google.com/ el dashboard |

### Reinstalar Jules (si hay problemas)

```
1. GitHub Settings → Applications → Installed GitHub Apps
2. Click "Google Jules" → Configure
3. Click "Uninstall" (al fondo)
4. Ir a https://jules.google/
5. Reconectar seleccionando "All repositories"
```

---

## Flujos de Trabajo Recomendados

### Flujo 1: Diseño → Código (Stitch + Jules)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. STITCH: Crear diseño                                     │
│    └── Usar STITCH-SYSTEM-PROMPT.md como contexto           │
│                                                             │
│ 2. STITCH: Export → Jules                                   │
│    └── Requiere: GitHub App instalada ⚠️                    │
│    └── Seleccionar repo: limbpuma/design-system-pipeline    │
│    └── Escribir prompt para Jules (ver templates)           │
│                                                             │
│ 3. JULES: Recibe diseño + prompt                            │
│    └── Lee AGENTS.md para contexto                          │
│    └── Implementa código                                    │
│    └── Crea PR en GitHub                                    │
│                                                             │
│ 4. CI/CD: Valida accesibilidad                              │
│                                                             │
│ 5. MERGE & DEPLOY                                           │
└─────────────────────────────────────────────────────────────┘
```

### Flujo 2: Research → Código (NotebookLM + Gemini + Jules)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. NOTEBOOKLM: Crear notebook con fuentes                   │
│    └── AGENTS.md, A11Y-ERROR-GUIDE.md, WCAG docs            │
│                                                             │
│ 2. GEMINI: Consultar notebook                               │
│    └── "Basándote en mi notebook, genera un plan para       │
│         implementar un Wallet Dashboard accesible"          │
│                                                             │
│ 3. JULES CLI: Crear tarea                                   │
│    └── jules new "[pegar plan de Gemini]"                   │
│                                                             │
│ 4. JULES: Implementa y crea PR                              │
└─────────────────────────────────────────────────────────────┘
```

### Flujo 3: Automatización (Workspace Studio)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. WORKSPACE STUDIO: Crear Flow                             │
│    └── "Cuando llegue email de GitHub con 'PR merged',      │
│         actualizar un Sheet de tracking y notificar"        │
│                                                             │
│ 2. GEMINI: Genera los pasos                                 │
│                                                             │
│ 3. ACTIVAR: El flow se ejecuta automáticamente              │
└─────────────────────────────────────────────────────────────┘
```

---

## Jules - Uso Detallado

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

### CLI Local

```bash
# Crear tarea
jules new "Implementar Wallet Dashboard siguiendo AGENTS.md"

# Listar tareas
jules list

# Ver estado
jules status <task-id>

# Ver plan antes de aprobar
jules plan <task-id>

# Aplicar cambios localmente (preview)
jules apply <task-id>

# Aprobar y crear PR
jules approve <task-id>
```

### Scheduled Tasks

Configurar en Jules Dashboard → Scheduled:

```yaml
# Daily A11y Check
Nombre: Daily A11y Validation
Frecuencia: Diaria 6:00 AM
Prompt: |
  Run npm run a11y:validate on all stories.
  If errors found, read A11Y-ERROR-GUIDE.md and fix.
  Create PR with fixes.
```

---

## NotebookLM - Knowledge Base

### URL
```
https://notebooklm.google.com/
```

### Crear Notebook para Design System

**Sources recomendados:**
- AGENTS.md
- docs/accessibility/A11Y-ERROR-GUIDE.md
- docs/STITCH-SYSTEM-PROMPT.md
- tokens/semantic/colors.json
- WCAG 2.1 Guidelines (URL)

### Uso con Gemini

En Gemini, puedes referenciar tu notebook:
```
"Usando mi notebook de Design System en NotebookLM,
genera una guía de implementación para un componente de Chat"
```

### Audio Overviews (20/día con Pro)

Generar podcasts explicativos para onboarding:
- "Sistema de tokens del Design System"
- "Patrones de accesibilidad obligatorios"
- "Flujo de contribución con Jules"

---

## AI Studio - Desarrollo Interactivo

### URL
```
https://aistudio.google.com/
```

### Cuándo usar AI Studio vs Stitch→Jules

| Escenario | Stitch→Jules | AI Studio |
|-----------|--------------|-----------|
| Componente UI | ✅ | - |
| Iteración visual | ✅ | - |
| App con backend | - | ✅ |
| Lógica compleja | - | ✅ |
| Prototipo rápido | ✅ | ✅ |

### Build Mode

```
System Context:
Este proyecto usa Design System de limbpuma/design-system-pipeline.
React 18 + TypeScript + Tailwind CSS.
WCAG 2.1 AA obligatorio.

Tarea: [describir lo que necesitas]
```

---

## Gemini CLI - Terminal

### Versión instalada
```
gemini --version → 0.23.0
```

### Instalar Extensión de Workspace

```bash
gemini extensions install https://github.com/gemini-cli-extensions/workspace
```

Esto permite a Gemini CLI acceder a Drive, Gmail, Docs desde terminal.

### Comandos útiles

```bash
# Análisis de código
gemini "Analiza src/components/Button.tsx para accesibilidad"

# Con archivo de contexto
gemini -f AGENTS.md "Genera un componente Tooltip siguiendo estos patrones"

# Review de cambios
gemini "Revisa git diff HEAD~1 según AGENTS.md"
```

---

## Checklist de Configuración

### 1. Gemini (Orquestador)
- [ ] Extensiones de Workspace activadas
- [ ] Acceso a Drive/Gmail/Docs verificado

### 2. Jules (Código)
- [ ] GitHub App instalada (no solo OAuth)
- [ ] Repo `limbpuma/design-system-pipeline` con acceso
- [ ] Dashboard funcionando: https://jules.google.com/

### 3. Stitch (Diseño)
- [ ] Cuenta activa en https://stitch.withgoogle.com/
- [ ] Export a Jules probado

### 4. Workspace Studio (Automatización)
- [ ] Acceso verificado en https://workspace.google.com/studio/
- [ ] Primer Flow de prueba creado

### 5. NotebookLM (Research)
- [ ] Notebook "Design System" creado
- [ ] Sources principales agregados

### 6. Herramientas Locales
- [x] Gemini CLI 0.23.0 instalado
- [x] Jules CLI instalado
- [ ] Antigravity descargado (opcional)

---

## Troubleshooting

### Stitch → Jules no funciona

1. Verificar GitHub App:
   - GitHub Settings → Applications → Installed GitHub Apps
   - Debe aparecer "Google Jules" con acceso al repo

2. Si no aparece:
   ```
   - Ir a https://jules.google/
   - Reconectar GitHub
   - Seleccionar repositorios
   ```

3. Si sigue sin funcionar:
   - Revocar completamente en GitHub
   - Logout de Jules y GitHub
   - Reconectar desde cero

### Jules no ve la tarea

1. Verificar en dashboard: https://jules.google.com/
2. Revisar que el repo esté conectado
3. Usar CLI como alternativa: `jules new "tarea"`

### Gemini no accede a Drive

1. Verificar extensiones activadas en gemini.google.com
2. Verificar permisos de la cuenta Google
3. Admin debe habilitar Gemini para Workspace

---

## Recursos

### Herramientas
- [Gemini App](https://gemini.google.com/)
- [Stitch](https://stitch.withgoogle.com/)
- [Jules](https://jules.google/)
- [Jules Dashboard](https://jules.google.com/repo/github/limbpuma/design-system-pipeline/)
- [Workspace Studio](https://workspace.google.com/studio/)
- [AI Studio](https://aistudio.google.com/)
- [NotebookLM](https://notebooklm.google.com/)
- [Antigravity](https://antigravity.google/)

### Documentación
- [Jules Docs](https://jules.google/docs/)
- [Workspace Studio Help](https://support.google.com/a/users/answer/16275487)
- [Gemini Extensions](https://support.google.com/a/answer/15756885)
- [Google AI Pro](https://one.google.com/about/google-ai-plans/)

### Foros
- [Google AI Developers Forum](https://discuss.ai.google.dev/)

---

## Integración con automation-team

### Ubicación
```
C:\Users\limbp\Documents\AI_FIRST\automation-team
```

### Delegación de Páginas Completas

Usar `delegate-page.ps1` para delegar implementación:

```powershell
# Desde diseño de Stitch
.\scripts\automation\delegate-page.ps1 -PageName "Dashboard" -Source stitch

# Preview sin ejecutar
.\scripts\automation\delegate-page.ps1 -PageName "Settings" -DryRun
```

### Verificar Capacidad

```bash
cd C:\Users\limbp\Documents\AI_FIRST\automation-team
python scripts/orchestrator.py status
```

### Workflows Disponibles

| Workflow | Comando | Agentes |
|----------|---------|---------|
| Feature | `orchestrator.py feature "..."` | Gemini → Claude → Jules |
| Bug Fix | `orchestrator.py bugfix "..."` | Gemini → Jules |
| Research | `orchestrator.py research "..."` | Gemini |
| Batch | `orchestrator.py batch "pattern" "instr"` | AI Studio API |

### Documentación Relacionada

- `docs/MANUAL-GOOGLE-TASKS.md` - Tareas manuales estructuradas
- `docs/DESIGN-SYSTEM-RULES.md` - Reglas del Design System
- `automation-team/CLAUDE.md` - Coordinación multi-agente
