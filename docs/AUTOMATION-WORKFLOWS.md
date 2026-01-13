# Automation Workflows

Guía completa de automatización del ecosistema de herramientas AI para el Design System Pipeline.

## Arquitectura del Ecosistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORQUESTADOR LOCAL                             │
│           (PowerShell Scripts + Claude Code)                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
  ┌──────────┐       ┌──────────┐       ┌──────────┐
  │gemini-cli│       │jules-cli │       │  gh CLI  │
  │(análisis)│       │ (tareas) │       │ (issues) │
  └────┬─────┘       └────┬─────┘       └────┬─────┘
       │                  │                  │
       ▼                  ▼                  ▼
  ┌──────────┐       ┌──────────┐       ┌──────────┐
  │  Gemini  │       │  Jules   │       │  GitHub  │
  │  Cloud   │       │  Cloud   │       │   API    │
  └──────────┘       └──────────┘       └──────────┘
       │                  │                  │
       └──────────────────┴──────────────────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
       ┌──────────┐           ┌──────────┐
       │  STITCH  │           │NotebookLM│
       │(diseños) │           │(research)│
       └──────────┘           └──────────┘
```

## Herramientas Disponibles

### Cloud (Google AI Pro)
| Herramienta | Función | Integración |
|------------|---------|-------------|
| **Stitch** | Genera diseños UI desde prompts | Export → Jules, AI Studio, ZIP |
| **Jules** | Coding agent async en VM cloud | Output → PR, branch, patch |
| **AI Studio** | Desarrollo y pruebas de prompts | Multimodal, experimentos |
| **NotebookLM** | Research y análisis de docs | Audio Overviews, Drive |
| **Gemini App** | Orquestador central | Extensions, Workspace |
| **Workspace Studio** | Automations no-code | Flows, Agents |

### Local
| Herramienta | Función | Comando |
|------------|---------|---------|
| **gemini-cli** | Agente terminal | `gemini "prompt"` |
| **jules-cli** | Gestión de tareas Jules | `jules new "prompt"` |
| **Antigravity** | IDE multi-agente | VS Code fork |
| **Claude Code** | Desarrollo interactivo | CLI actual |

---

## Scripts de Automatización

### 1. Issue to Jules Pipeline

Convierte GitHub Issues en tareas de Jules automáticamente.

```powershell
# Uso básico
.\scripts\automation\issue-to-jules.ps1 -IssueNumber 42

# Con múltiples instancias paralelas
.\scripts\automation\issue-to-jules.ps1 -IssueNumber 42 -Parallel 3

# Dry run (sin crear tarea)
.\scripts\automation\issue-to-jules.ps1 -IssueNumber 42 -DryRun
```

**Flujo:**
```
GitHub Issue → Gemini Analysis → Jules Task → Comment on Issue
```

---

### 2. Component Review

Revisa componentes con Gemini antes de commit.

```powershell
# Revisión completa de un componente
.\scripts\automation\component-review.ps1 -Component Button

# Solo accesibilidad
.\scripts\automation\component-review.ps1 -Component Card -ReviewType accessibility

# Por path directo
.\scripts\automation\component-review.ps1 -Path src/blocks/application/Sidebar/

# Generar código corregido
.\scripts\automation\component-review.ps1 -Component Dialog -Fix
```

**Tipos de revisión:**
- `accessibility` - WCAG, ARIA, contraste, keyboard
- `performance` - Re-renders, memoización, bundle size
- `patterns` - Design System tokens, Tailwind, React patterns
- `full` - Todo lo anterior

---

### 3. Stitch Prompt Generator

Genera prompts optimizados para Stitch con contexto del Design System.

```powershell
# Componente nuevo
.\scripts\automation\stitch-prompt.ps1 -Type component -Name "DataTable"

# Bloque compuesto
.\scripts\automation\stitch-prompt.ps1 -Type block -Name "UserProfile" -Theme dark

# Solución completa
.\scripts\automation\stitch-prompt.ps1 -Type solution -Name "Checkout Flow" -CopyToClipboard

# Página completa
.\scripts\automation\stitch-prompt.ps1 -Type page -Name "Dashboard" -Description "Admin dashboard with metrics"
```

**Tipos:**
- `component` - Componente atómico reutilizable
- `block` - Bloque compuesto de múltiples componentes
- `solution` - Flujo de usuario completo
- `page` - Layout de página completo

---

### 4. Jules Monitor

Monitorea y aplica resultados de tareas Jules.

```powershell
# Listar sesiones activas
.\scripts\automation\jules-monitor.ps1 -List

# Monitorear con auto-refresh
.\scripts\automation\jules-monitor.ps1 -Watch

# Aplicar sesión completada
.\scripts\automation\jules-monitor.ps1 -Apply -SessionId 5668561409937888553
```

---

## Workflows Completos

### Workflow A: Nuevo Componente (Design-First)

```
1. Generar prompt para Stitch
   .\scripts\automation\stitch-prompt.ps1 -Type component -Name "Avatar" -CopyToClipboard

2. En Stitch: pegar prompt y generar diseño

3. En Stitch: Export → Jules (con instrucciones generadas)

4. Monitorear Jules
   .\scripts\automation\jules-monitor.ps1 -Watch

5. Aplicar cuando complete
   .\scripts\automation\jules-monitor.ps1 -Apply -SessionId <ID>

6. Revisar con Gemini
   .\scripts\automation\component-review.ps1 -Component Avatar

7. Commit y push
```

### Workflow B: Issue → Implementación

```
1. Crear issue en GitHub con descripción clara

2. Ejecutar pipeline
   .\scripts\automation\issue-to-jules.ps1 -IssueNumber 42

3. Monitorear progreso
   .\scripts\automation\jules-monitor.ps1 -Watch

4. Aplicar resultado
   jules teleport <SESSION_ID>

5. Revisar y ajustar con Claude Code si necesario

6. Commit y push
```

### Workflow C: Revisión Pre-Commit

```
1. Desarrollar con Claude Code

2. Antes de commit, revisar
   .\scripts\automation\component-review.ps1 -Path src/components/MyComponent/ -ReviewType full

3. Si hay problemas, pedir fixes
   .\scripts\automation\component-review.ps1 -Path src/components/MyComponent/ -Fix

4. Aplicar correcciones

5. Commit
```

### Workflow D: Research → Implementación

```
1. En NotebookLM: analizar documentación/competencia

2. Exportar insights a Drive

3. Usar Gemini para generar plan
   gemini "Basado en este research, genera un plan de implementación..."

4. Crear tareas en Jules para cada item
   cat plan.txt | ForEach-Object { jules new $_ }

5. Monitorear y aplicar resultados
```

### Workflow E: Delegación a Antigravity (Push + PR)

**Ideal para:** Páginas completas, UI compleja, browser automation, generación de assets.

**Flujo:** `Claude Code delega → Antigravity implementa → Push a branch → Crea PR → Claude Code revisa/merge`

```
1. Claude Code envía tarea via Agent Bridge MCP:
   send_task(
     from_agent="claude-code",
     to_agent="antigravity",
     title="Implementar Dashboard Page",
     description="""
     Crear página Dashboard siguiendo DESIGN-SYSTEM-RULES.

     ## 🚀 ENTREGA: Push + PR (OBLIGATORIO)
     1. Crear branch: feature/ag-<task_id>
     2. Implementar en: src/blocks/application/Dashboard/
     3. Ejecutar: npm run lint (DEBE pasar)
     4. Commit con mensaje estructurado
     5. Push y crear PR con gh CLI
     6. Responder con URL del PR

     ## ⚠️ REGLAS CRÍTICAS DE LINT
     - NO declarar código sin usar
     - NO usar role redundante (ul, nav, main)
     - NO usar href="#" (usar button)
     - SVG SIEMPRE con aria-hidden="true"
     - Select DEBE tener aria-label
     """,
     task_type="page",
     priority="high",
     context={
       "target_path": "src/blocks/application/Dashboard/",
       "branch_name": "feature/ag-<task_id>",
       "delivery_method": "push_pr"
     }
   )

2. Antigravity recibe y reclama tarea:
   list_tasks(agent_id="antigravity", status="pending")
   claim_task(agent_id="antigravity", task_id="<id>")

3. Antigravity prepara branch y trabaja:
   git checkout main && git pull origin main
   git checkout -b feature/ag-<task_id>
   # Implementa cambios...
   npm run lint  # DEBE pasar

4. Antigravity hace commit, push y crea PR:
   git add . && git commit -m "feat(dashboard): implement Dashboard page"
   git push -u origin feature/ag-<task_id>
   gh pr create --title "feat(dashboard): Dashboard page" --base main

5. Antigravity responde con URL del PR:
   submit_response(
     agent_id="antigravity",
     task_id="<id>",
     content="✅ PR creado: https://github.com/...",
     status="success",
     metadata={"pr_url": "...", "branch": "feature/ag-<task_id>"}
   )

6. Claude Code revisa y hace merge:
   gh pr view <pr_number>  # Revisar cambios
   gh pr merge <pr_number> --squash  # Si todo OK
```

**MCP Tools disponibles:**
- `send_task` - Enviar tarea a otro agente
- `list_tasks` - Listar tareas pendientes
- `claim_task` - Reclamar tarea para procesar
- `submit_response` - Enviar respuesta con resultado
- `get_response` - Obtener respuesta de tarea enviada
- `bridge_status` - Ver estado del bridge

**Ventajas del workflow Push + PR:**
- ✅ CI/CD se ejecuta automáticamente
- ✅ Code review documentado
- ✅ Trazabilidad completa en GitHub
- ✅ Rollback fácil si hay problemas
- ✅ Sin copia manual de archivos

---

## División de Responsabilidades

| Tarea | Herramienta Recomendada |
|-------|------------------------|
| Diseño UI nuevo | Stitch → Jules |
| Fix rápido | Claude Code |
| Refactor grande | Jules (async) |
| Nuevo componente completo | Stitch → Jules → Claude review |
| Documentación | Claude Code |
| Tests | Claude Code o Jules |
| Code review | gemini-cli (component-review.ps1) |
| Research | NotebookLM → Gemini |
| Análisis de issues | gemini-cli |
| Tareas paralelas | Jules (--parallel) |
| **Páginas completas UI** | **Claude Code → Antigravity (Agent Bridge)** |
| **Browser automation** | **Antigravity** |

---

## Tips de Productividad

### Combinar Herramientas

```powershell
# Analizar issue con Gemini y enviar a Jules
gh issue view 42 --json body | gemini -p "resume la tarea" | jules new

# Revisar todos los componentes modificados
git diff --name-only HEAD~1 | Where-Object { $_ -match "\.tsx$" } | ForEach-Object {
    .\scripts\automation\component-review.ps1 -Path $_
}

# Crear múltiples tareas desde TODO
Get-Content TODO.md | ForEach-Object { jules new $_ }
```

### Aliases Útiles (PowerShell Profile)

```powershell
# Agregar a $PROFILE
function jl { jules remote list --session }
function jn { param($prompt) jules new $prompt }
function jp { param($id) jules remote pull --session $id --apply }
function cr { param($component) .\scripts\automation\component-review.ps1 -Component $component }
```

---

## Troubleshooting

### Jules no recibe tarea de Stitch
1. Verificar GitHub App instalada: Settings → Applications → Installed GitHub Apps
2. Verificar permisos del repo
3. Usar jules-cli como alternativa

### Gemini-cli no responde
1. Verificar login: `gemini auth`
2. Verificar quota de API
3. Simplificar prompt si es muy largo

### Component review falla
1. Verificar que el path existe
2. Verificar que hay archivos .tsx
3. Revisar output de gemini para errores de API

---

## Próximas Mejoras

- [ ] Integración con Workspace Studio Flows
- [x] ~~Configuración de Antigravity para multi-agente~~ → **Agent Bridge MCP v1.0.1**
- [ ] Webhooks para notificaciones de Jules completado
- [ ] Dashboard local de métricas de productividad
