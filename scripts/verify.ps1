param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Continue"
$pass = 0
$fail = 0
$warn = 0
$package = Get-Content -Raw "package.json" | ConvertFrom-Json

function Invoke-Step {
  param(
    [string]$Name,
    [scriptblock]$Command
  )

  Write-Host "==> $Name"
  & $Command
  if ($LASTEXITCODE -eq 0) {
    Write-Host "OK: $Name"
    $script:pass += 1
  } else {
    Write-Host "FAILED: $Name"
    $script:fail += 1
  }
}

function Write-Warn {
  param([string]$Message)
  Write-Host "WARN: $Message"
  $script:warn += 1
}

function Test-NodePackage {
  param([string[]]$Names)

  foreach ($name in $Names) {
    if (
      ($package.dependencies.PSObject.Properties.Name -contains $name) -or
      ($package.devDependencies.PSObject.Properties.Name -contains $name)
    ) {
      return $true
    }
  }

  return $false
}

function Test-ESLintAvailable {
  $configFiles = @(
    "eslint.config.js",
    "eslint.config.mjs",
    "eslint.config.cjs",
    ".eslintrc",
    ".eslintrc.js",
    ".eslintrc.cjs",
    ".eslintrc.json",
    ".eslintrc.yaml",
    ".eslintrc.yml"
  )

  $hasConfig = $false
  foreach ($file in $configFiles) {
    if (Test-Path $file) {
      $hasConfig = $true
      break
    }
  }

  $hasDependency = Test-NodePackage @("eslint", "eslint-config-next", "@eslint/js")
  return ($hasConfig -and $hasDependency)
}

if ($package.scripts.PSObject.Properties.Name -contains "typecheck") {
  Invoke-Step "typecheck" { npm run typecheck }
} elseif ((Test-Path "tsconfig.json") -and -not (Test-Path "next.config.ts") -and -not (Test-Path "next.config.js") -and -not (Test-Path "next.config.mjs")) {
  Invoke-Step "typecheck" { npx tsc --noEmit --pretty false }
} elseif (Test-Path "tsconfig.json") {
  Write-Warn "no typecheck script found; Next.js build will run type validation"
}

if ($package.scripts.PSObject.Properties.Name -contains "lint") {
  if (Test-ESLintAvailable) {
    $env:CI = "1"
    Invoke-Step "lint" { npm run lint -- --no-cache }
  } else {
    Write-Warn "lint script exists, but ESLint config/dependency is unavailable; skipping lint"
  }
}

if ($package.scripts.PSObject.Properties.Name -contains "test") {
  Invoke-Step "test" { npm run test }
}

if (-not $SkipBuild) {
  Invoke-Step "build" { npm run build }
}

Write-Host ""
Write-Host "Passed: $pass  Failed: $fail  Warned: $warn"
if ($fail -gt 0) {
  exit 1
}
