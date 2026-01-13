# stitch-prompt.ps1
# Genera prompts optimizados para Stitch basados en el Design System
# Uso: .\stitch-prompt.ps1 -Type component -Name "DataTable"
# Uso: .\stitch-prompt.ps1 -Type solution -Name "User Settings Page"

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("component", "block", "solution", "page")]
    [string]$Type,

    [Parameter(Mandatory=$true)]
    [string]$Name,

    [Parameter(Mandatory=$false)]
    [string]$Description = "",

    [Parameter(Mandatory=$false)]
    [ValidateSet("light", "dark", "both")]
    [string]$Theme = "both",

    [Parameter(Mandatory=$false)]
    [switch]$CopyToClipboard
)

$ErrorActionPreference = "Stop"

Write-Host "=== Stitch Prompt Generator ===" -ForegroundColor Cyan

# Design System context - FROM docs/DESIGN-SYSTEM-RULES.md
$designSystemContext = @"
DESIGN SYSTEM: Design System Pipeline
SOURCE OF TRUTH: docs/DESIGN-SYSTEM-RULES.md

═══════════════════════════════════════════════════════════════
COLORES SEMÁNTICOS (OBLIGATORIO usar estos valores exactos)
═══════════════════════════════════════════════════════════════

LIGHT MODE:
- Background: white (#ffffff)
- Background subtle: gray-50 (#f9fafb)
- Foreground: gray-900 (#111827)
- Foreground muted: gray-500 (#6b7280) → Ratio 5.5:1 ✓
- Primary: blue-600 (#2563eb)
- Success: green-700 (#15803d) para texto blanco
- Destructive: red-600 (#dc2626)
- Warning: yellow-500 (#eab308) con texto OSCURO
- Border: gray-200 (#e5e7eb)

DARK MODE:
- Background: gray-950 (#030712)
- Background subtle: gray-900 (#111827)
- Foreground: gray-50 (#f9fafb)
- Foreground muted: gray-400 (#9ca3af) → Ratio 5.4:1 ✓
- Primary: blue-500 (#3b82f6)
- Border: gray-800 (#1f2937)

═══════════════════════════════════════════════════════════════
CONTRASTE WCAG 2.1 AA (CRÍTICO)
═══════════════════════════════════════════════════════════════

APROBADO ✅:
- text-gray-500 en fondo blanco (5.5:1)
- text-gray-400 en fondo gray-900/950 (5.4:1)
- text-white en bg-blue-600 (4.7:1)
- text-white en bg-green-700 (5.4:1)

PROHIBIDO ❌:
- text-gray-400 en fondo blanco (3.0:1)
- text-gray-500 en fondo gray-900 (3.75:1)
- text-white en bg-green-600 (3.76:1)
- Gradientes con texto superpuesto

═══════════════════════════════════════════════════════════════
TIPOGRAFÍA
═══════════════════════════════════════════════════════════════

Font Family: Inter, system-ui, sans-serif
Font Mono: ui-monospace, SFMono-Regular, Menlo

Sizes:
- xs: 12px | sm: 14px | base: 16px | lg: 18px
- xl: 20px | 2xl: 24px | 3xl: 30px | 4xl: 36px

Weights: normal(400), medium(500), semibold(600), bold(700)

═══════════════════════════════════════════════════════════════
ESPACIADO (base 4px)
═══════════════════════════════════════════════════════════════

1: 4px | 2: 8px | 3: 12px | 4: 16px | 6: 24px | 8: 32px | 12: 48px

═══════════════════════════════════════════════════════════════
BORDER RADIUS
═══════════════════════════════════════════════════════════════

sm: 2px | base: 4px | md: 6px | lg: 8px | xl: 12px | 2xl: 16px | full: 9999px

═══════════════════════════════════════════════════════════════
ACCESIBILIDAD (OBLIGATORIO)
═══════════════════════════════════════════════════════════════

1. SVGs decorativos: aria-hidden="true" SIEMPRE
2. Botones icon-only: aria-label="descripción" SIEMPRE
3. Inputs: label asociado o aria-label SIEMPRE
4. Focus visible: ring-2 ring-offset-2 SIEMPRE
5. Touch targets: mínimo 44x44px

═══════════════════════════════════════════════════════════════
ESTADOS INTERACTIVOS (para score 70+)
═══════════════════════════════════════════════════════════════

transition-all duration-200 ease-out
hover:-translate-y-0.5 hover:shadow-lg
active:scale-[0.98]
focus-visible:ring-2 focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
"@

# Type-specific templates
$templates = @{
    "component" = @"
Create a reusable UI component: $Name

$Description

Requirements:
- Self-contained, atomic component
- Multiple variants (default, outline, ghost if applicable)
- Multiple sizes (sm, md, lg)
- Hover, focus, active, disabled states
- Fully accessible (ARIA, keyboard navigation)
- Responsive design

$designSystemContext

Theme: $Theme mode
Show component in isolation with all variants/states visible.
"@
    "block" = @"
Create a composite UI block: $Name

$Description

Requirements:
- Composed of multiple components working together
- Real-world use case scenario
- Includes placeholder content that looks realistic
- Responsive layout (mobile, tablet, desktop)
- Accessible and keyboard navigable

$designSystemContext

Theme: $Theme mode
Show the block in a realistic context with sample data.
"@
    "solution" = @"
Create a complete design solution: $Name

$Description

Requirements:
- Full user flow/feature design
- Multiple states (empty, loading, populated, error)
- Edge cases considered
- Realistic sample data and content
- Mobile-first responsive design
- Micro-interactions indicated
- Accessibility annotations

$designSystemContext

Theme: $Theme mode
Show the complete solution with annotations for developers.
"@
    "page" = @"
Create a complete page layout: $Name

$Description

Requirements:
- Full page design with header, content, footer as needed
- Navigation and information architecture
- Multiple viewport sizes (mobile, tablet, desktop)
- Realistic content and imagery placeholders
- Loading and error states for dynamic sections
- Scroll behavior and fixed elements indicated

$designSystemContext

Theme: $Theme mode
Show the page at desktop width with mobile variant alongside.
"@
}

# Generate prompt
$prompt = $templates[$Type]

# Add Jules export instructions
$julesInstructions = @"

---
JULES EXPORT INSTRUCTIONS:
When exporting to Jules, include this context:

Repository: limbpuma/design-system-pipeline
Location: src/$( if ($Type -eq "component") { "components" } else { "blocks/application" } )/$($Name -replace ' ', '')/
Files needed:
- $($Name -replace ' ', '').tsx (main component)
- $($Name -replace ' ', '').stories.tsx (Storybook stories)
- index.ts (exports)

Follow AGENTS.md patterns:
- React 19 + TypeScript
- Tailwind CSS with semantic tokens
- Proper accessibility attributes
- Comprehensive Storybook stories
"@

$fullPrompt = $prompt + $julesInstructions

# Output
Write-Host "`n$("="*60)" -ForegroundColor Gray
Write-Host $fullPrompt -ForegroundColor White
Write-Host "$("="*60)`n" -ForegroundColor Gray

# Copy to clipboard if requested
if ($CopyToClipboard) {
    $fullPrompt | Set-Clipboard
    Write-Host "Prompt copied to clipboard!" -ForegroundColor Green
}

# Save to file
$promptFile = "C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline\docs\prompts\generated\$($Name -replace ' ', '-')-$(Get-Date -Format 'yyyyMMdd').md"
$promptDir = Split-Path $promptFile -Parent
if (-not (Test-Path $promptDir)) {
    New-Item -ItemType Directory -Path $promptDir -Force | Out-Null
}

@"
# Stitch Prompt: $Name
Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm')
Type: $Type
Theme: $Theme

## Prompt

$fullPrompt
"@ | Out-File -FilePath $promptFile -Encoding utf8

Write-Host "Prompt saved to: $promptFile" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Copy prompt to Stitch" -ForegroundColor Gray
Write-Host "2. Generate design" -ForegroundColor Gray
Write-Host "3. Export to Jules with the Jules instructions above" -ForegroundColor Gray
