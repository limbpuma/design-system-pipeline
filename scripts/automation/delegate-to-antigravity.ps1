# delegate-to-antigravity.ps1
# Crea tareas en antigravity-inbox para que Gemini (Antigravity) las ejecute
# Uso: .\delegate-to-antigravity.ps1 -TaskName "Dashboard" -Type "page" -Priority "high"

param(
    [Parameter(Mandatory=$true)]
    [string]$TaskName,

    [Parameter(Mandatory=$false)]
    [ValidateSet("page", "component", "analysis", "fix", "research")]
    [string]$Type = "page",

    [Parameter(Mandatory=$false)]
    [ValidateSet("low", "medium", "high")]
    [string]$Priority = "medium",

    [Parameter(Mandatory=$false)]
    [string]$Description = "",

    [Parameter(Mandatory=$false)]
    [string[]]$ContextFiles = @(),

    [Parameter(Mandatory=$false)]
    [switch]$OpenAntigravity,

    [Parameter(Mandatory=$false)]
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# Paths
$InboxPath = "C:\Users\limbp\Documents\AI_FIRST\antigravity-inbox"
$TasksPath = "$InboxPath\tasks"
$DesignSystemPath = "C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline"

Write-Host "=== Antigravity Task Delegation ===" -ForegroundColor Cyan
Write-Host "Task: $TaskName" -ForegroundColor White
Write-Host "Type: $Type" -ForegroundColor Gray
Write-Host "Priority: $Priority" -ForegroundColor Gray

# Verify inbox exists
if (-not (Test-Path $InboxPath)) {
    Write-Host "ERROR: antigravity-inbox not found at $InboxPath" -ForegroundColor Red
    Write-Host "Creating inbox structure..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $TasksPath -Force | Out-Null
    New-Item -ItemType Directory -Path "$InboxPath\output" -Force | Out-Null
    New-Item -ItemType Directory -Path "$InboxPath\templates" -Force | Out-Null
    New-Item -ItemType Directory -Path "$InboxPath\archive" -Force | Out-Null
}

# Generate task ID
$existingTasks = Get-ChildItem -Path $TasksPath -Filter "TASK-*.md" -ErrorAction SilentlyContinue
$nextNumber = 1
if ($existingTasks) {
    $numbers = $existingTasks | ForEach-Object {
        if ($_.Name -match 'TASK-(\d+)') { [int]$Matches[1] }
    }
    $nextNumber = ($numbers | Measure-Object -Maximum).Maximum + 1
}
$taskId = "TASK-{0:D3}" -f $nextNumber

# Build task content based on type
$taskContent = switch ($Type) {
    "page" {
        @"
# $taskId`: Implementar Pagina $TaskName

## Priority
$($Priority.ToUpper())

## Source
Claude Code

## Target Project
$DesignSystemPath

## Instructions

Implementar la pagina **$TaskName** siguiendo el Design System Pipeline.

### Contexto
- Proyecto: Design System Pipeline
- Framework: React 19 + TypeScript
- Estilos: Tailwind CSS con tokens semanticos
- Variantes: CVA (class-variance-authority)

### Requisitos Obligatorios

1. **Estructura de archivos:**
   ``````
   src/blocks/application/$($TaskName -replace ' ', '')/
   ├── $($TaskName -replace ' ', '').tsx
   ├── $($TaskName -replace ' ', '').stories.tsx
   └── index.ts
   ``````

2. **Tokens Semanticos CSS (CRITICO):**
   USAR variables CSS en lugar de clases Tailwind directas:

   CORRECTO:
   - bg-[var(--semantic-color-background-default)]
   - text-[var(--semantic-color-foreground-default)]
   - text-[var(--semantic-color-foreground-muted)]
   - border-[var(--semantic-color-border-default)]
   - bg-[var(--semantic-color-primary-default)]

   INCORRECTO:
   - bg-white dark:bg-gray-950
   - text-gray-900 dark:text-gray-50

3. **Accesibilidad WCAG 2.1 AA:**
   - Todos los SVG con aria-hidden="true"
   - Contraste minimo 4.5:1 para texto
   - Focus visible en elementos interactivos
   - Soporte para navegacion por teclado

4. **Dark mode automatico:**
   - NO usar clases dark: de Tailwind
   - Los tokens semanticos manejan dark mode automaticamente

$(if ($Description) { "### Descripcion Adicional`n$Description`n" })

## Context Files
- docs/DESIGN-SYSTEM-RULES.md (colores y tipografia)
- docs/AI-AGENT-INSTRUCTIONS.md (patrones de calidad)
- AGENTS.md (estructura del proyecto)
$(if ($ContextFiles) { $ContextFiles | ForEach-Object { "- $_" } | Out-String })

## Expected Output
- Componente React funcional
- Stories de Storybook
- Export en index.ts

## Validation Loop (OBLIGATORIO)

Antes de entregar, ejecutar este ciclo hasta que TODO pase:

``````bash
# 1. Lint
npm run lint
# Si falla → corregir y repetir

# 2. Validacion de accesibilidad estatica
npm run a11y:validate
# Si falla → corregir y repetir

# 3. Pa11y Composition Contrast (CRITICO)
npm run pa11y:composition
# Si falla → corregir iconos/colores y repetir
# Requisito: 0 failures en composition contrast

# 4. Solo cuando los 3 pasen → entregar
``````

### Pa11y Composition - Errores Comunes

Si pa11y:composition falla, verificar:
- Iconos en containers oscuros deben usar text-gray-300 o mas claro
- Iconos en containers claros deben usar text-gray-700 o mas oscuro
- Usar tokens semanticos: text-[var(--semantic-color-icon-default)]
- Ratio minimo: 3:1 para iconos UI (WCAG 1.4.11)

## Delivery via GitHub MCP (OBLIGATORIO)

Una vez que TODOS los checks pasen, usar herramientas MCP de GitHub:

### 1. Crear Branch
``````json
mcp__github__create_branch({
  "owner": "limbpuma",
  "repo": "design-system-pipeline",
  "branch": "feature/ag-$taskId"
})
``````

### 2. Push Files
``````json
mcp__github__push_files({
  "owner": "limbpuma",
  "repo": "design-system-pipeline",
  "branch": "feature/ag-$taskId",
  "files": [
    { "path": "src/blocks/application/$($TaskName -replace ' ', '')/$($TaskName -replace ' ', '').tsx", "content": "..." },
    { "path": "src/blocks/application/$($TaskName -replace ' ', '')/$($TaskName -replace ' ', '').stories.tsx", "content": "..." },
    { "path": "src/blocks/application/$($TaskName -replace ' ', '')/index.ts", "content": "..." }
  ],
  "message": "feat($TaskName): implement page from Antigravity\n\nTask: $taskId\nValidation: ALL PASSED\n\nCo-Authored-By: Gemini <noreply@google.com>"
})
``````

### 3. Crear Pull Request
``````json
mcp__github__create_pull_request({
  "owner": "limbpuma",
  "repo": "design-system-pipeline",
  "title": "feat($TaskName): $taskId from Antigravity",
  "head": "feature/ag-$taskId",
  "base": "main",
  "body": "## Summary\n- Implemented $TaskName page\n- Task ID: $taskId\n- Delegated from Claude Code\n\n## Validation Passed\n- [x] npm run lint\n- [x] npm run a11y:validate\n- [x] npm run pa11y:composition (0 failures)\n\n---\nGenerated by Antigravity (Gemini)"
})
``````

### 4. Responder con URL del PR
Incluir en la respuesta final la URL del PR creado para que Claude Code pueda revisarlo.

- PR Target: main
- Reviewer: Claude Code verificara y hara merge

## MCP Tools Sugeridos
- `compute-router` para generar codigo React
- `playwright` para testing visual

---
*Tarea generada por Claude Code: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@
    }
    "component" {
        @"
# $taskId`: Crear Componente $TaskName

## Priority
$($Priority.ToUpper())

## Source
Claude Code

## Target Project
$DesignSystemPath

## Instructions

Crear el componente **$TaskName** para el Design System.

### Requisitos
1. React 19 + TypeScript
2. CVA para variantes
3. Accesibilidad completa
4. Stories de Storybook
5. Light/dark mode

$(if ($Description) { "### Descripcion`n$Description`n" })

## Context Files
- docs/DESIGN-SYSTEM-RULES.md
- docs/examples/ButtonPremium.example.tsx (referencia de calidad)
$(if ($ContextFiles) { $ContextFiles | ForEach-Object { "- $_" } | Out-String })

## Expected Output
- Componente en src/components/
- Stories file
- Tipos TypeScript

## Validation Loop (OBLIGATORIO)

Ejecutar hasta que TODO pase:

``````bash
npm run lint                  # Debe pasar
npm run a11y:validate         # Debe pasar
npm run pa11y:composition     # Debe pasar (0 failures)
``````

Si pa11y:composition falla → corregir contraste de iconos y repetir.

## Delivery via GitHub MCP (OBLIGATORIO)

1. mcp__github__create_branch → feature/ag-$taskId
2. mcp__github__push_files → archivos del componente
3. mcp__github__create_pull_request → PR a main
4. Responder con URL del PR

---
*Tarea generada por Claude Code: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@
    }
    "analysis" {
        @"
# $taskId`: Analisis - $TaskName

## Priority
$($Priority.ToUpper())

## Source
Claude Code

## Target Project
$DesignSystemPath

## Instructions

Realizar analisis de **$TaskName**.

$(if ($Description) { "$Description`n" } else { "Analizar el codebase y generar reporte detallado.`n" })

## Context Files
$(if ($ContextFiles) { $ContextFiles | ForEach-Object { "- $_" } | Out-String } else { "- Todo el proyecto" })

## Expected Output
- Reporte en formato Markdown
- Recomendaciones accionables
- Ejemplos de codigo si aplica

## Delivery
- Output Path: $InboxPath\output\$taskId\
- Format: Markdown (.md)

---
*Tarea generada por Claude Code: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@
    }
    "fix" {
        @"
# $taskId`: Fix - $TaskName

## Priority
$($Priority.ToUpper())

## Source
Claude Code

## Target Project
$DesignSystemPath

## Instructions

Corregir: **$TaskName**

$(if ($Description) { "$Description`n" } else { "Identificar y corregir el problema.`n" })

## Context Files
$(if ($ContextFiles) { $ContextFiles | ForEach-Object { "- $_" } | Out-String } else { "- Archivos relacionados al bug" })

## Expected Output
- Codigo corregido
- Explicacion del fix
- Test de regresion si aplica

## Validation Loop (OBLIGATORIO)

Ejecutar hasta que TODO pase:

``````bash
npm run lint                  # Debe pasar
npm run test                  # Debe pasar
npm run pa11y:composition     # Debe pasar (0 failures)
``````

Si pa11y:composition falla → corregir contraste y repetir.

## Delivery via GitHub MCP (OBLIGATORIO)

1. mcp__github__create_branch → fix/ag-$taskId
2. mcp__github__push_files → archivos corregidos
3. mcp__github__create_pull_request → PR a main
4. Responder con URL del PR

---
*Tarea generada por Claude Code: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@
    }
    "research" {
        @"
# $taskId`: Research - $TaskName

## Priority
$($Priority.ToUpper())

## Source
Claude Code

## Target Project
$DesignSystemPath

## Instructions

Investigar: **$TaskName**

$(if ($Description) { "$Description`n" } else { "Realizar investigacion y documentar hallazgos.`n" })

## Context Files
$(if ($ContextFiles) { $ContextFiles | ForEach-Object { "- $_" } | Out-String } else { "- N/A (busqueda web)" })

## Expected Output
- Documento de investigacion
- Fuentes citadas
- Recomendaciones

## Delivery
- Output Path: $InboxPath\output\$taskId\
- Format: Markdown (.md)

## MCP Tools Sugeridos
- `brave-search` para busqueda web

---
*Tarea generada por Claude Code: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@
    }
}

# Show task preview
Write-Host "`n$("="*60)" -ForegroundColor Gray
Write-Host "TASK PREVIEW ($taskId):" -ForegroundColor Cyan
Write-Host $taskContent -ForegroundColor White
Write-Host "$("="*60)`n" -ForegroundColor Gray

if ($DryRun) {
    Write-Host "[DRY RUN] Would create task at: $TasksPath\$taskId.md" -ForegroundColor Yellow
    exit 0
}

# Create task file
$taskFile = "$TasksPath\$taskId.md"
$taskContent | Out-File -FilePath $taskFile -Encoding utf8

Write-Host "Task created: $taskFile" -ForegroundColor Green

# Create output directory for this task
$outputDir = "$InboxPath\output\$taskId"
New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
Write-Host "Output directory created: $outputDir" -ForegroundColor Green

# Open Antigravity if requested
if ($OpenAntigravity) {
    Write-Host "`nOpening Antigravity with inbox directory..." -ForegroundColor Yellow
    $antigravityPath = "C:\Users\limbp\AppData\Local\Programs\Antigravity\Antigravity.exe"
    if (Test-Path $antigravityPath) {
        Start-Process $antigravityPath -ArgumentList $InboxPath
        Write-Host "Antigravity opened with: $InboxPath" -ForegroundColor Green
    } else {
        Write-Host "Antigravity not found at expected path. Open manually with:" -ForegroundColor Yellow
        Write-Host "  Directory: $InboxPath" -ForegroundColor White
    }
}

Write-Host "`n=== Task Delegation Complete ===" -ForegroundColor Green
Write-Host @"

Next steps:
1. Open Antigravity IDE
2. Open folder: $InboxPath
3. Gemini will read CLAUDE.md and tasks/
4. Output will be saved to: $outputDir
5. Copy results to design-system-pipeline when ready

Quick open (if Antigravity in PATH):
  antigravity "$InboxPath"

"@ -ForegroundColor Gray
