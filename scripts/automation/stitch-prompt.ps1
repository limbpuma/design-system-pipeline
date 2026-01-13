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

# Design System context
$designSystemContext = @"
DESIGN SYSTEM: Design System Pipeline

SEMANTIC COLORS (use these names):
- Background: surface, surface-alt, surface-elevated
- Text: primary, secondary, muted, inverse
- Brand: accent, accent-hover, accent-muted
- Feedback: success, warning, error, info
- Interactive: interactive, interactive-hover

CONTRAST RATIOS:
- Text on surface: min 4.5:1
- Large text: min 3:1
- Interactive elements: min 3:1

TYPOGRAPHY:
- Font: Inter (sans-serif)
- Sizes: xs(12), sm(14), base(16), lg(18), xl(20), 2xl(24), 3xl(30)
- Weights: normal(400), medium(500), semibold(600), bold(700)

SPACING (4px base):
- 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px)

BORDER RADIUS:
- sm(4px), md(8px), lg(12px), xl(16px), full(9999px)

SHADOWS:
- sm: subtle elevation
- md: cards, dropdowns
- lg: modals, popovers
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
