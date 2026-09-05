#!/usr/bin/env bash
# Regenerate OG images (public/og/og-{en,th}.png, 1200x630) from scripts/og/{en,th}.html
# Uses isolated Edge headless profile — does not touch any real browser session.
set -euo pipefail
EDGE="C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
TMPDIR="${LOCALAPPDATA}/Temp/og-render-profile"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$TMPDIR" "$ROOT/public/og"
for L in en th; do
  "$EDGE" --headless=new --disable-gpu \
    --user-data-dir="$(cygpath -w "$TMPDIR")" \
    --window-size=1200,630 --virtual-time-budget=12000 \
    --screenshot="$(cygpath -w "$ROOT/public/og/og-$L.png")" \
    "file:///$(cygpath -m "$ROOT")/scripts/og/$L.html" 2>&1 | grep -E "bytes written"
done
rm -rf "$TMPDIR"
