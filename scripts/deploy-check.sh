#!/usr/bin/env bash
# Pre-deploy validation for this Vercel portfolio.
set -euo pipefail

ENVIRONMENT="production"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)
      shift
      ENVIRONMENT="${1:-production}"
      ;;
  esac
  shift || true
done

PASS=0
FAIL=0
WARN=0

ok() { echo "OK: $1"; PASS=$((PASS + 1)); }
fail() { echo "FAIL: $1"; FAIL=$((FAIL + 1)); }
warn() { echo "WARN: $1"; WARN=$((WARN + 1)); }

echo "Deploy check: $ENVIRONMENT"

if git diff --quiet && git diff --cached --quiet; then
  ok "working tree clean"
else
  if [[ "$ENVIRONMENT" == "production" ]]; then
    fail "uncommitted changes present"
  else
    warn "uncommitted changes present"
  fi
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$ENVIRONMENT" == "production" && "$BRANCH" != "master" ]]; then
  warn "production deploy normally uses master, current branch is $BRANCH"
else
  ok "branch $BRANCH"
fi

if git ls-files --cached | grep -E '(^|/)\.env($|\.)' | grep -vqE '(^|/)\.env\.example$'; then
  fail "env file is tracked by git"
else
  ok "no env files tracked"
fi

if git grep -nE '(password|secret|api[_-]?key|token)\s*[:=]\s*['\''"][^'\''"${}]{8,}' -- '*.ts' '*.tsx' '*.js' '*.jsx' >/dev/null 2>&1; then
  fail "possible hardcoded secret in source"
else
  ok "no obvious hardcoded secrets in source"
fi

if rg -n "localhost|127\.0\.0\.1|0\.0\.0\.0|bearer|private endpoint|internal port|fail2ban|systemd|nginx|ssl" src/data/portfolio.ts 'src/app/(portfolio)' >/dev/null 2>&1; then
  warn "public copy may contain internal/security implementation details"
else
  ok "public copy avoids known internal/security detail keywords"
fi

npm run build
ok "build succeeded"

echo
echo "Passed: $PASS  Failed: $FAIL  Warned: $WARN"
[[ "$FAIL" -eq 0 ]]
