# jules-monitor.ps1
# Monitorea y aplica resultados de tareas Jules
# Uso: .\jules-monitor.ps1 -Watch
# Uso: .\jules-monitor.ps1 -Apply -SessionId 123456

param(
    [Parameter(Mandatory=$false)]
    [switch]$Watch,

    [Parameter(Mandatory=$false)]
    [switch]$Apply,

    [Parameter(Mandatory=$false)]
    [string]$SessionId,

    [Parameter(Mandatory=$false)]
    [switch]$List,

    [Parameter(Mandatory=$false)]
    [int]$PollInterval = 60
)

$ErrorActionPreference = "Stop"
$repoRoot = "C:\Users\limbp\Documents\AI_FIRST\design-system-pipeline"

function Get-JulesSessions {
    $output = jules remote list --session 2>&1
    $lines = $output -split "`n" | Where-Object { $_ -match "^\s*\d+" }

    $sessions = @()
    foreach ($line in $lines) {
        if ($line -match "^\s*(\d+)\s+(.+?)\s+([\w/\-]+)\s+(.+?)\s+(\w+)\s*$") {
            $sessions += @{
                Id = $matches[1]
                Description = $matches[2].Trim()
                Repo = $matches[3]
                LastActive = $matches[4]
                Status = $matches[5]
            }
        }
    }
    return $sessions
}

function Show-Sessions {
    param($sessions)

    if ($sessions.Count -eq 0) {
        Write-Host "No active Jules sessions" -ForegroundColor Yellow
        return
    }

    Write-Host "`nJules Sessions:" -ForegroundColor Cyan
    Write-Host ("-" * 80) -ForegroundColor Gray

    foreach ($s in $sessions) {
        $statusColor = switch ($s.Status) {
            "completed" { "Green" }
            "running" { "Yellow" }
            "failed" { "Red" }
            default { "White" }
        }

        Write-Host "[$($s.Status)]" -ForegroundColor $statusColor -NoNewline
        Write-Host " $($s.Id) - $($s.Description.Substring(0, [Math]::Min(50, $s.Description.Length)))..." -ForegroundColor White
    }
    Write-Host ("-" * 80) -ForegroundColor Gray
}

# List mode
if ($List) {
    Write-Host "=== Jules Sessions ===" -ForegroundColor Cyan
    $sessions = Get-JulesSessions
    Show-Sessions $sessions
    exit 0
}

# Apply mode
if ($Apply) {
    if (-not $SessionId) {
        Write-Error "SessionId required for -Apply mode"
        exit 1
    }

    Write-Host "=== Applying Jules Session $SessionId ===" -ForegroundColor Cyan

    # Pull and apply
    Set-Location $repoRoot
    $result = jules remote pull --session $SessionId --apply 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Session applied successfully!" -ForegroundColor Green
        Write-Host $result -ForegroundColor White

        # Show git status
        Write-Host "`nGit status:" -ForegroundColor Yellow
        git status --short
    } else {
        Write-Error "Failed to apply session: $result"
    }
    exit 0
}

# Watch mode
if ($Watch) {
    Write-Host "=== Jules Session Monitor ===" -ForegroundColor Cyan
    Write-Host "Polling every $PollInterval seconds. Press Ctrl+C to stop." -ForegroundColor Gray

    $previousSessions = @{}

    while ($true) {
        Clear-Host
        Write-Host "=== Jules Monitor - $(Get-Date -Format 'HH:mm:ss') ===" -ForegroundColor Cyan

        $sessions = Get-JulesSessions
        Show-Sessions $sessions

        # Check for newly completed sessions
        foreach ($s in $sessions) {
            $prevStatus = $previousSessions[$s.Id]
            if ($prevStatus -and $prevStatus -ne "completed" -and $s.Status -eq "completed") {
                Write-Host "`n*** Session $($s.Id) COMPLETED! ***" -ForegroundColor Green

                # Desktop notification (Windows)
                [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") | Out-Null
                $balloon = New-Object System.Windows.Forms.NotifyIcon
                $balloon.Icon = [System.Drawing.SystemIcons]::Information
                $balloon.BalloonTipIcon = "Info"
                $balloon.BalloonTipTitle = "Jules Task Completed"
                $balloon.BalloonTipText = $s.Description.Substring(0, [Math]::Min(100, $s.Description.Length))
                $balloon.Visible = $true
                $balloon.ShowBalloonTip(5000)
            }
            $previousSessions[$s.Id] = $s.Status
        }

        Write-Host "`nCommands:" -ForegroundColor Gray
        Write-Host "  Apply: .\jules-monitor.ps1 -Apply -SessionId <ID>" -ForegroundColor Gray
        Write-Host "  Teleport: jules teleport <ID>" -ForegroundColor Gray

        Start-Sleep -Seconds $PollInterval
    }
}

# Default: show help
Write-Host @"
Jules Monitor - Manage Jules sessions

Usage:
  .\jules-monitor.ps1 -List                    # List all sessions
  .\jules-monitor.ps1 -Watch                   # Monitor sessions (auto-refresh)
  .\jules-monitor.ps1 -Apply -SessionId 123    # Apply completed session

Options:
  -PollInterval <seconds>    Refresh interval for -Watch mode (default: 60)

Examples:
  .\jules-monitor.ps1 -List
  .\jules-monitor.ps1 -Watch -PollInterval 30
  .\jules-monitor.ps1 -Apply -SessionId 5668561409937888553
"@
