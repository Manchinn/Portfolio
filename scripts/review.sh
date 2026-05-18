#!/usr/bin/env bash
# Create a focused diff for AI review and run a lightweight security scan.
set -euo pipefail

ALL=false
SECURITY_ONLY=false
for arg in "$@"; do
  [[ "$arg" == "--all" ]] && ALL=true
  [[ "$arg" == "--security-only" ]] && SECURITY_ONLY=true
done

DIFF_FILE="review-latest.diff"
TEMP_FILE="$(mktemp)"
trap 'rm -f "$TEMP_FILE"' EXIT

if [[ "$ALL" == true ]]; then
  UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || true)"
  if [[ -n "$UPSTREAM" ]]; then
    BASE="$(git merge-base HEAD "$UPSTREAM")"
    git diff "$BASE"...HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.md' > "$TEMP_FILE"
  else
    git diff HEAD~5...HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.md' > "$TEMP_FILE"
  fi
else
  git diff --cached -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.md' > "$TEMP_FILE"
  if [[ ! -s "$TEMP_FILE" ]]; then
    git diff HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.md' > "$TEMP_FILE"
  fi
fi

if [[ ! -s "$TEMP_FILE" ]]; then
  echo "No reviewable TypeScript, JavaScript, or Markdown changes found."
  exit 0
fi

cp "$TEMP_FILE" "$DIFF_FILE"
echo "Diff copied to $DIFF_FILE"
echo "Changed lines: $(wc -l < "$DIFF_FILE")"

ISSUES=0
check_pattern() {
  local label="$1"
  local pattern="$2"
  if grep -qE "$pattern" "$DIFF_FILE"; then
    echo "WARN: $label"
    ISSUES=$((ISSUES + 1))
  fi
}

check_pattern "possible hardcoded secret" '(password|secret|api[_-]?key|token)\s*[:=]\s*['\''"][^'\''"${}]{8,}'
check_pattern "console logging added" '^\+.*console\.(log|debug|info)\('
check_pattern "unsafe HTML rendering" 'dangerouslySetInnerHTML'
check_pattern "eval usage" '\beval\s*\('
check_pattern "explicit any added" '^\+.*:\s*any\b'
check_pattern "public internal detail wording" '(localhost|127\.0\.0\.1|0\.0\.0\.0|bearer|private endpoint|internal port)'

if [[ "$ISSUES" -eq 0 ]]; then
  echo "Security scan: no obvious issues found."
else
  echo "Security scan: $ISSUES potential issue(s), review before commit."
fi

if [[ "$SECURITY_ONLY" == false ]]; then
  echo "Suggested review focus: correctness, security, regressions, missing tests."
fi
