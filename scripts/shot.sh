#!/usr/bin/env bash
# Minimal screenshot helper — no metrics, no dependencies beyond chromium.
#
#   scripts/shot.sh <html-file> <out.png> [width] [height]
#
# Captures the viewport at width x height (default 1440x900), scrollbars hidden.
# If you also need the full page, overflow/contrast/tap-target numbers, use
# `node scripts/shot.mjs --full --deep` instead — same browser, more evidence.
set -euo pipefail

html=${1:?usage: shot.sh <html-file> <out.png> [width] [height]}
out=${2:?usage: shot.sh <html-file> <out.png> [width] [height]}
width=${3:-1440}
height=${4:-900}

browser=""
for candidate in chromium chromium-browser google-chrome google-chrome-stable chrome; do
  if command -v "$candidate" >/dev/null 2>&1; then
    browser="$candidate"
    break
  fi
done
if [ -z "$browser" ]; then
  echo "no chromium/chrome on PATH" >&2
  exit 1
fi

abs_html=$(realpath "$html")
mkdir -p "$(dirname "$out")"

# Sandboxes hand out read-only or missing $HOME and a tiny /dev/shm; chromium then
# exits without writing anything, which looks like "the page is broken". Give it
# somewhere to live instead.
home_tmp=$(mktemp -d)
trap 'rm -rf "$home_tmp"' EXIT

HOME=${HOME:-$home_tmp} "$browser" --headless=new --disable-gpu --no-sandbox \
  --disable-dev-shm-usage --disable-crash-reporter \
  --hide-scrollbars --force-device-scale-factor=1 \
  --user-data-dir="$home_tmp/profile" \
  --window-size="${width},${height}" \
  --screenshot="$(realpath -m "$out")" \
  "file://${abs_html}" >/dev/null 2>&1

if [ ! -s "$out" ]; then
  echo "chromium produced no image at $out (try: node scripts/shot.mjs)" >&2
  exit 1
fi

echo "wrote $out (${width}x${height})"
