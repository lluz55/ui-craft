#!/usr/bin/env bash
# Headless screenshot helper for web eval arms.
#
#   scripts/shot.sh <html-file> <out.png> [width] [height]
#
# Captures the viewport at width x height (default 1440x900), scrollbars hidden,
# device scale 1. Uses the first chromium/chrome found on PATH.
set -euo pipefail

html=${1:?usage: shot.sh <html-file> <out.png> [width] [height]}
out=${2:?usage: shot.sh <html-file> <out.png> [width] [height]}
width=${3:-1440}
height=${4:-900}

browser=""
for candidate in chromium chromium-browser google-chrome google-chrome-stable; do
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

"$browser" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size="${width},${height}" \
  --screenshot="$(realpath -m "$out")" \
  "file://${abs_html}" >/dev/null 2>&1

echo "wrote $out (${width}x${height})"
