#!/usr/bin/env bash
# Builds the whole website: the new site at / and the old site at /v1.
# Netlify runs this on every push to main.
set -euo pipefail
cd "$(dirname "$0")"

NEW="Updates - fnfmedia"
OLD="copy-of-main-copy-of-frame-n-flow-media"

(cd "$NEW" && npx --yes pnpm@10 install --frozen-lockfile && npm run build)
(cd "$OLD" && npm install --no-audit --no-fund && npm run build)

mv "$OLD/dist" "$NEW/dist/v1"
mv "$NEW/dist/v1/CNAME" "$NEW/dist/CNAME"
rm "$NEW/dist/v1/_redirects"

# The finished site goes where Netlify already publishes from.
mv "$NEW/dist" "$OLD/dist"
