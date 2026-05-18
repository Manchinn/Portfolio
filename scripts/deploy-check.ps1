param(
  [ValidateSet("production", "preview")]
  [string]$Env = "production"
)

$ErrorActionPreference = "Continue"
$pass = 0
$fail = 0
$warn = 0

function Ok([string]$Message) {
  Write-Host "OK: $Message"
  $script:pass += 1
}

function Fail([string]$Message) {
  Write-Host "FAIL: $Message"
  $script:fail += 1
}

function Warn([string]$Message) {
  Write-Host "WARN: $Message"
  $script:warn += 1
}

Write-Host "Deploy check: $Env"

git diff --quiet
$worktreeDirty = $LASTEXITCODE -ne 0
git diff --cached --quiet
$indexDirty = $LASTEXITCODE -ne 0

if (-not $worktreeDirty -and -not $indexDirty) {
  Ok "working tree clean"
} elseif ($Env -eq "production") {
  Fail "uncommitted changes present"
} else {
  Warn "uncommitted changes present"
}

$branch = git rev-parse --abbrev-ref HEAD
if ($Env -eq "production" -and $branch -ne "master") {
  Warn "production deploy normally uses master, current branch is $branch"
} else {
  Ok "branch $branch"
}

$trackedEnv = git ls-files --cached | Where-Object {
  ($_ -match '(^|/)\.env($|\.)') -and ($_ -notmatch '(^|/)\.env\.example$')
}
if ($trackedEnv) {
  Fail "env file is tracked by git"
} else {
  Ok "no env files tracked"
}

git grep -nE "(password|secret|api[_-]?key|token)\s*[:=]\s*['""][^'""]{8,}" -- "*.ts" "*.tsx" "*.js" "*.jsx" | Out-Null
if ($LASTEXITCODE -eq 0) {
  Fail "possible hardcoded secret in source"
} else {
  Ok "no obvious hardcoded secrets in source"
}

rg -n "localhost|127\.0\.0\.1|0\.0\.0\.0|bearer|private endpoint|internal port|fail2ban|systemd|nginx|ssl" src/data/portfolio.ts 'src/app/(portfolio)' | Out-Null
if ($LASTEXITCODE -eq 0) {
  Warn "public copy may contain internal/security implementation details"
} else {
  Ok "public copy avoids known internal/security detail keywords"
}

npm run build
if ($LASTEXITCODE -eq 0) {
  Ok "build succeeded"
} else {
  Fail "build failed"
}

Write-Host ""
Write-Host "Passed: $pass  Failed: $fail  Warned: $warn"
if ($fail -gt 0) {
  exit 1
}
