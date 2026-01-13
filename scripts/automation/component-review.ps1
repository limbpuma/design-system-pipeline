# component-review.ps1
# Revisa componentes con Gemini CLI antes de commit
# Uso: .\component-review.ps1 -Component Button
# Uso: .\component-review.ps1 -Path src/components/Card/

param(
    [Parameter(Mandatory=$false)]
    [string]$Component,

    [Parameter(Mandatory=$false)]
    [string]$Path,

    [Parameter(Mandatory=$false)]
    [ValidateSet("accessibility", "performance", "patterns", "full")]
    [string]$ReviewType = "full",

    [Parameter(Mandatory=$false)]
    [switch]$Fix
)

$ErrorActionPreference = "Stop"
$repoRoot = "C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline"

Write-Host "=== Component Review with Gemini ===" -ForegroundColor Cyan

# Determine path
if ($Component) {
    # Check components first, then blocks
    $componentPath = "$repoRoot\src\components\$Component"
    $blockPath = "$repoRoot\src\blocks\*\$Component"

    if (Test-Path $componentPath) {
        $Path = $componentPath
    } elseif (Test-Path $blockPath) {
        $Path = (Get-Item $blockPath).FullName
    } else {
        Write-Error "Component '$Component' not found in components or blocks"
        exit 1
    }
}

if (-not $Path -or -not (Test-Path $Path)) {
    Write-Error "Path not specified or does not exist: $Path"
    exit 1
}

Write-Host "Reviewing: $Path" -ForegroundColor Yellow

# Gather files
$files = Get-ChildItem -Path $Path -Filter "*.tsx" -Recurse | ForEach-Object {
    @{
        Name = $_.Name
        Content = Get-Content $_.FullName -Raw
    }
}

if ($files.Count -eq 0) {
    Write-Error "No .tsx files found in $Path"
    exit 1
}

Write-Host "Found $($files.Count) file(s) to review" -ForegroundColor Gray

# Build review prompt based on type
$reviewPrompts = @{
    "accessibility" = @"
Revisa estos componentes React enfocandote SOLO en accesibilidad:

CRITERIOS:
- WCAG 2.1 AA compliance
- Roles ARIA correctos
- Labels y alt text
- Contraste de colores (semantic tokens)
- Navegacion por teclado
- Focus management

Para cada problema encontrado:
1. Archivo y linea
2. Problema especifico
3. Solucion recomendada
"@
    "performance" = @"
Revisa estos componentes React enfocandote SOLO en rendimiento:

CRITERIOS:
- Memoizacion innecesaria o faltante
- Re-renders evitables
- Bundle size (imports)
- Lazy loading oportunidades
- Event handlers optimizados

Para cada problema encontrado:
1. Archivo y linea
2. Impacto en performance
3. Solucion recomendada
"@
    "patterns" = @"
Revisa estos componentes React enfocandote en patrones del Design System:

CRITERIOS:
- Uso correcto de semantic tokens (bg-surface, text-primary, etc.)
- Tailwind CSS best practices
- React 19 patterns
- Consistencia con otros componentes
- Variants y sizes correctos
- Props interface completa

Para cada problema encontrado:
1. Archivo y linea
2. Patron incorrecto
3. Patron correcto a usar
"@
    "full" = @"
Revisa estos componentes React completamente:

CRITERIOS DE ACCESIBILIDAD:
- WCAG 2.1 AA, ARIA roles, labels, contraste, keyboard nav

CRITERIOS DE PATRONES:
- Semantic tokens (bg-surface, text-primary)
- Tailwind CSS correctamente aplicado
- React 19 patterns
- Props interface TypeScript completa

CRITERIOS DE CALIDAD:
- Codigo limpio y mantenible
- Tests coverage si hay .test.tsx
- Stories coverage si hay .stories.tsx

Formato de respuesta:
## Resumen
[puntuacion /10 y resumen]

## Problemas Criticos
[lista numerada]

## Mejoras Sugeridas
[lista numerada]

## Codigo Corregido (si aplica)
[snippets de codigo]
"@
}

$prompt = $reviewPrompts[$ReviewType]

# Add file contents to prompt
$filesContent = $files | ForEach-Object {
    "=== $($_.Name) ===`n$($_.Content)"
} | Out-String

$fullPrompt = @"
$prompt

ARCHIVOS A REVISAR:
$filesContent
"@

# Run Gemini review
Write-Host "`nRunning $ReviewType review..." -ForegroundColor Yellow

$review = $fullPrompt | gemini 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Error "Gemini review failed: $review"
    exit 1
}

# Output review
Write-Host "`n$review" -ForegroundColor White

# Save review to file
$reviewFile = "$Path\REVIEW-$(Get-Date -Format 'yyyyMMdd-HHmmss').md"
$review | Out-File -FilePath $reviewFile -Encoding utf8
Write-Host "`nReview saved to: $reviewFile" -ForegroundColor Green

# If Fix flag, ask Gemini to generate fixes
if ($Fix) {
    Write-Host "`n=== Generating Fixes ===" -ForegroundColor Cyan

    $fixPrompt = @"
Basado en esta revision:
$review

Genera el codigo corregido completo para cada archivo que necesite cambios.
Formato:
=== FILENAME.tsx ===
[codigo completo corregido]
"@

    $fixes = $fixPrompt | gemini 2>&1

    Write-Host "`nSuggested fixes:" -ForegroundColor Yellow
    Write-Host $fixes -ForegroundColor White

    $fixFile = "$Path\FIXES-$(Get-Date -Format 'yyyyMMdd-HHmmss').md"
    $fixes | Out-File -FilePath $fixFile -Encoding utf8
    Write-Host "`nFixes saved to: $fixFile" -ForegroundColor Green
}

Write-Host "`n=== Review Complete ===" -ForegroundColor Cyan
