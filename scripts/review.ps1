param(
  [switch]$All,
  [switch]$SecurityOnly
)

$ErrorActionPreference = "Stop"
$diffFile = "review-latest.diff"
$tempFile = [System.IO.Path]::GetTempFileName()

try {
  if ($All) {
    $upstream = git rev-parse --abbrev-ref --symbolic-full-name "@{u}" 2>$null
    if ($LASTEXITCODE -eq 0 -and $upstream) {
      $base = git merge-base HEAD $upstream
      git diff "$base...HEAD" -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.md" | Set-Content -Path $tempFile
    } else {
      git diff "HEAD~5...HEAD" -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.md" | Set-Content -Path $tempFile
    }
  } else {
    git diff --cached -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.md" | Set-Content -Path $tempFile
    if ((Get-Item $tempFile).Length -eq 0) {
      git diff HEAD -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.md" | Set-Content -Path $tempFile
    }
  }

  if ((Get-Item $tempFile).Length -eq 0) {
    Write-Host "No reviewable TypeScript, JavaScript, or Markdown changes found."
    exit 0
  }

  Copy-Item $tempFile $diffFile -Force
  $lineCount = (Get-Content $diffFile | Measure-Object -Line).Lines
  Write-Host "Diff copied to $diffFile"
  Write-Host "Changed lines: $lineCount"

  $diff = Get-Content -Raw $diffFile
  $issues = 0

  function Test-Pattern {
    param([string]$Label, [string]$Pattern)
    if ($diff -match $Pattern) {
      Write-Host "WARN: $Label"
      $script:issues += 1
    }
  }

  Test-Pattern "possible hardcoded secret" "(password|secret|api[_-]?key|token)\s*[:=]\s*['""][^'""]{8,}"
  Test-Pattern "console logging added" "(?m)^\+.*console\.(log|debug|info)\("
  Test-Pattern "unsafe HTML rendering" "dangerouslySetInnerHTML"
  Test-Pattern "eval usage" "\beval\s*\("
  Test-Pattern "explicit any added" "(?m)^\+.*:\s*any\b"
  Test-Pattern "public internal detail wording" "localhost|127\.0\.0\.1|0\.0\.0\.0|bearer|private endpoint|internal port"

  if ($issues -eq 0) {
    Write-Host "Security scan: no obvious issues found."
  } else {
    Write-Host "Security scan: $issues potential issue(s), review before commit."
  }

  if (-not $SecurityOnly) {
    Write-Host "Suggested review focus: correctness, security, regressions, missing tests."
  }
} finally {
  Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
}
