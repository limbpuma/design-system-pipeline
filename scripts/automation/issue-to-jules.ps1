# issue-to-jules.ps1
# Automatiza: GitHub Issue -> Gemini Analysis -> Jules Task
# Uso: .\issue-to-jules.ps1 -IssueNumber 42

param(
    [Parameter(Mandatory=$true)]
    [int]$IssueNumber,

    [Parameter(Mandatory=$false)]
    [int]$Parallel = 1,

    [Parameter(Mandatory=$false)]
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

Write-Host "=== Issue to Jules Pipeline ===" -ForegroundColor Cyan

# 1. Fetch issue from GitHub
Write-Host "`n[1/4] Fetching issue #$IssueNumber from GitHub..." -ForegroundColor Yellow
$issue = gh issue view $IssueNumber --json title,body,labels --repo limbpuma/design-system-pipeline | ConvertFrom-Json

if (-not $issue) {
    Write-Error "Issue #$IssueNumber not found"
    exit 1
}

Write-Host "  Title: $($issue.title)" -ForegroundColor Green
Write-Host "  Labels: $($issue.labels.name -join ', ')" -ForegroundColor Gray

# 2. Analyze with Gemini CLI
Write-Host "`n[2/4] Analyzing issue with Gemini..." -ForegroundColor Yellow

$geminiPrompt = @"
Analiza este GitHub issue y genera un prompt optimizado para Jules (coding agent).

ISSUE:
Titulo: $($issue.title)
Descripcion: $($issue.body)
Labels: $($issue.labels.name -join ', ')

CONTEXTO DEL PROYECTO:
- Design System Pipeline con React 19 + Tailwind CSS
- Componentes en src/components/, bloques en src/blocks/
- Cada componente tiene archivo .stories.tsx para Storybook
- Usar semantic tokens (bg-surface, text-primary, etc.)
- Seguir AGENTS.md del repositorio

GENERA:
Un prompt conciso (max 500 chars) para Jules que incluya:
1. Que crear/modificar
2. Donde ubicarlo
3. Patrones a seguir
4. Archivos adicionales necesarios (stories, tests)

Solo responde con el prompt, sin explicaciones.
"@

$julesPrompt = $geminiPrompt | gemini 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Warning "Gemini analysis failed, using original issue as prompt"
    $julesPrompt = "$($issue.title): $($issue.body)"
}

Write-Host "  Generated prompt:" -ForegroundColor Green
Write-Host "  $julesPrompt" -ForegroundColor White

# 3. Create Jules task
Write-Host "`n[3/4] Creating Jules task..." -ForegroundColor Yellow

if ($DryRun) {
    Write-Host "  [DRY RUN] Would create Jules task with prompt above" -ForegroundColor Magenta
    $sessionId = "DRY-RUN-ID"
} else {
    $julesArgs = @("new")
    if ($Parallel -gt 1) {
        $julesArgs += "--parallel"
        $julesArgs += $Parallel
    }
    $julesArgs += $julesPrompt

    $result = & jules @julesArgs 2>&1

    # Extract session ID from output
    if ($result -match "ID:\s*(\d+)") {
        $sessionId = $matches[1]
        Write-Host "  Session created: $sessionId" -ForegroundColor Green
        Write-Host "  URL: https://jules.google.com/session/$sessionId" -ForegroundColor Cyan
    } else {
        Write-Host "  $result" -ForegroundColor Yellow
        $sessionId = "unknown"
    }
}

# 4. Add comment to GitHub issue
Write-Host "`n[4/4] Updating GitHub issue..." -ForegroundColor Yellow

if (-not $DryRun) {
    $comment = @"
:robot: **Jules Task Created**

- Session ID: ``$sessionId``
- URL: https://jules.google.com/session/$sessionId
- Parallel instances: $Parallel

**Generated Prompt:**
> $julesPrompt

_Automated by issue-to-jules pipeline_
"@

    gh issue comment $IssueNumber --body $comment --repo limbpuma/design-system-pipeline
    Write-Host "  Comment added to issue #$IssueNumber" -ForegroundColor Green
}

Write-Host "`n=== Pipeline Complete ===" -ForegroundColor Cyan
Write-Host "Monitor: jules remote list --session" -ForegroundColor Gray
Write-Host "Pull result: jules remote pull --session $sessionId --apply" -ForegroundColor Gray
