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

2. **Colores (CRITICO):**
   - Light mode: bg-white, text-gray-900, text-gray-500 (muted)
   - Dark mode: bg-gray-950, text-gray-50, text-gray-400 (muted)
   - Primary: blue-600 (light) / blue-500 (dark)

3. **Accesibilidad WCAG 2.1 AA:**
   - Todos los SVG con aria-hidden="true"
   - Contraste minimo 4.5:1 para texto
   - Focus visible en elementos interactivos
   - Soporte para navegacion por teclado

4. **Ambos modos de tema:**
   - Implementar light Y dark mode
   - Usar clases dark: de Tailwind

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

## Delivery
- Output Path: $InboxPath\output\$taskId\
- PR Required: No (copiar a design-system-pipeline manualmente)
- Validation: npm run lint && npm run a11y:validate

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

## Delivery
- Output Path: $InboxPath\output\$taskId\
- Validation: npm run lint

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

## Delivery
- Output Path: $InboxPath\output\$taskId\
- Validation: npm run lint && npm run test

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
