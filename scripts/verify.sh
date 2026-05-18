#!/usr/bin/env bash
# Run project verification. Build is the required gate for this portfolio.
set -euo pipefail

SKIP_BUILD=false
for arg in "$@"; do
  [[ "$arg" == "--skip-build" ]] && SKIP_BUILD=true
done

PM="npm"
[[ -f "pnpm-lock.yaml" ]] && PM="pnpm"
[[ -f "yarn.lock" ]] && PM="yarn"
[[ -f "bun.lockb" ]] && PM="bun"

PASS=0
FAIL=0
WARN=0

run_step() {
  local name="$1"
  shift
  echo "==> $name"
  if "$@" 2>&1; then
    echo "OK: $name"
    PASS=$((PASS + 1))
  else
    echo "FAILED: $name"
    FAIL=$((FAIL + 1))
  fi
}

warn_step() {
  echo "WARN: $1"
  WARN=$((WARN + 1))
}

has_script() {
  local script="$1"
  node -e "const s=require('./package.json').scripts||{}; process.exit(s['$script'] ? 0 : 1)" 2>/dev/null
}

has_eslint_available() {
  local has_config=false
  for file in eslint.config.js eslint.config.mjs eslint.config.cjs .eslintrc .eslintrc.js .eslintrc.cjs .eslintrc.json .eslintrc.yaml .eslintrc.yml; do
    [[ -f "$file" ]] && has_config=true
  done

  local has_dependency=false
  node -e "const p=require('./package.json'); const d={...(p.dependencies||{}),...(p.devDependencies||{})}; process.exit(d.eslint || d['eslint-config-next'] || d['@eslint/js'] ? 0 : 1)" 2>/dev/null && has_dependency=true

  [[ "$has_config" == true && "$has_dependency" == true ]]
}

if has_script "typecheck"; then
  run_step "typecheck" "$PM" run typecheck
elif [[ -f "tsconfig.json" && ! -f "next.config.ts" && ! -f "next.config.js" && ! -f "next.config.mjs" ]]; then
  run_step "typecheck" npx tsc --noEmit --pretty false
elif [[ -f "tsconfig.json" ]]; then
  warn_step "no typecheck script found; Next.js build will run type validation"
fi

if has_script "lint"; then
  if has_eslint_available; then
    CI=1 run_step "lint" "$PM" run lint -- --no-cache
  else
    warn_step "lint script exists, but ESLint config/dependency is unavailable; skipping lint"
  fi
fi

if has_script "test"; then
  run_step "test" "$PM" run test
fi

if [[ "$SKIP_BUILD" == false ]]; then
  run_step "build" "$PM" run build
fi

echo
echo "Passed: $PASS  Failed: $FAIL  Warned: $WARN"
[[ "$FAIL" -eq 0 ]]
