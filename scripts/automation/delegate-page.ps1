# delegate-page.ps1
# Delega implementacion de paginas completas a automation-team
# Uso: .\delegate-page.ps1 -PageName "Dashboard" -Source "stitch" -Priority "high"

param(
    [Parameter(Mandatory=$true)]
    [string]$PageName,

    [Parameter(Mandatory=$false)]
    [ValidateSet("stitch", "aistudio", "manual")]
    [string]$Source = "stitch",

    [Parameter(Mandatory=$false)]
    [ValidateSet("low", "medium", "high")]
    [string]$Priority = "medium",

    [Parameter(Mandatory=$false)]
    [string]$DesignFile = "",

    [Parameter(Mandatory=$false)]
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# Paths
$DesignSystemPath = "C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline"
$AutomationTeamPath = "C:\Users\limbp\Documents\AI_FIRST\automation-team"
$OrchestratorPath = "$AutomationTeamPath\scripts\orchestrator.py"

Write-Host "=== Page Delegation System ===" -ForegroundColor Cyan
Write-Host "Page: $PageName" -ForegroundColor White
Write-Host "Source: $Source" -ForegroundColor Gray
Write-Host "Priority: $Priority" -ForegroundColor Gray

# Verify automation-team exists
if (-not (Test-Path $AutomationTeamPath)) {
    Write-Host "ERROR: automation-team not found at $AutomationTeamPath" -ForegroundColor Red
    exit 1
}

# Verify orchestrator exists
if (-not (Test-Path $OrchestratorPath)) {
    Write-Host "ERROR: orchestrator.py not found" -ForegroundColor Red
    exit 1
}

# Check automation-team status
Write-Host "`nChecking automation-team capacity..." -ForegroundColor Yellow
$statusOutput = python $OrchestratorPath status 2>&1
Write-Host $statusOutput -ForegroundColor Gray

# Build task description based on source
$taskDescription = switch ($Source) {
    "stitch" {
        @"
Implementar pagina '$PageName' basada en diseno de Stitch.

CONTEXTO:
- El diseno fue creado en Google Stitch
- Debe seguir docs/DESIGN-SYSTEM-RULES.md estrictamente
- Ubicacion: src/blocks/application/$($PageName -replace ' ', '')/

REQUISITOS:
1. React 19 + TypeScript
2. Tailwind CSS con tokens semanticos
3. CVA para variantes
4. Accesibilidad WCAG 2.1 AA
5. Modo claro Y oscuro
6. Stories de Storybook

VALIDACION:
- npm run lint debe pasar
- npm run a11y:validate debe pasar
- Contraste minimo 4.5:1 para texto

ARCHIVOS A CREAR:
- $($PageName -replace ' ', '').tsx
- $($PageName -replace ' ', '').stories.tsx
- index.ts
"@
    }
    "aistudio" {
        @"
Implementar pagina '$PageName' basada en prototipo de AI Studio.

CONTEXTO:
- Prototipo creado en Google AI Studio
- Referencias visuales en docs/references/
- Seguir docs/DESIGN-SYSTEM-RULES.md

REQUISITOS:
1. Interpretar el prototipo visual
2. Usar patrones existentes del Design System
3. Crear componentes reutilizables si es necesario
4. Documentar decisiones de implementacion
"@
    }
    "manual" {
        @"
Implementar pagina '$PageName' desde especificaciones manuales.

CONTEXTO:
- Especificaciones proporcionadas manualmente
- Revisar docs/DESIGN-SYSTEM-RULES.md para colores y tipografia
- Consultar componentes existentes en src/components/

REQUISITOS:
1. Seguir patrones establecidos
2. Mantener consistencia visual
3. Priorizar accesibilidad
"@
    }
}

# Add design file reference if provided
if ($DesignFile -and (Test-Path $DesignFile)) {
    $taskDescription += "`n`nREFERENCIA DE DISENO: $DesignFile"
}

# Show task
Write-Host "`n$("="*60)" -ForegroundColor Gray
Write-Host "TASK TO DELEGATE:" -ForegroundColor Cyan
Write-Host $taskDescription -ForegroundColor White
Write-Host "$("="*60)`n" -ForegroundColor Gray

if ($DryRun) {
    Write-Host "[DRY RUN] Would delegate this task to automation-team" -ForegroundColor Yellow
    exit 0
}

# Confirm delegation
$confirm = Read-Host "Delegate this task to automation-team? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Delegation cancelled." -ForegroundColor Yellow
    exit 0
}

# Delegate to automation-team
Write-Host "`nDelegating to automation-team..." -ForegroundColor Green

try {
    # Use orchestrator feature workflow
    $result = python $OrchestratorPath feature $taskDescription --repo $DesignSystemPath 2>&1
    Write-Host $result -ForegroundColor Cyan

    # Log delegation
    $logDir = "$DesignSystemPath\docs\delegations"
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    $logFile = "$logDir\$($PageName -replace ' ', '-')-$(Get-Date -Format 'yyyyMMdd-HHmmss').md"
    @"
# Delegation: $PageName
Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
Source: $Source
Priority: $Priority

## Task Description
$taskDescription

## Result
$result
"@ | Out-File -FilePath $logFile -Encoding utf8

    Write-Host "`nDelegation logged: $logFile" -ForegroundColor Green

} catch {
    Write-Host "ERROR delegating task: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Delegation Complete ===" -ForegroundColor Green
Write-Host @"

Next steps:
1. Monitor Jules: jules session list
2. Check GitHub for PR
3. Run validation: npm run a11y:validate
4. Review and merge PR

"@ -ForegroundColor Gray
