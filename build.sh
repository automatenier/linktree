#!/usr/bin/env bash
# build.sh - Syncs root files to dist/ for Cloudflare Wrangler deployment
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$REPO_DIR/dist"

mkdir -p "$DIST_DIR"

echo "[*] Syncing root static assets to $DIST_DIR..."
rsync -av \
  --exclude 'dist/' \
  --exclude '.git/' \
  --exclude '.wrangler/' \
  --exclude 'build.sh' \
  --exclude 'AGENTS.md' \
  --exclude 'test_*.js' \
  "$REPO_DIR/" "$DIST_DIR/"

echo "[✓] Build complete. dist/ is now synchronized with root."
echo "    Root index.html: $(stat -c %y "$REPO_DIR/index.html" 2>/dev/null || stat -f %m "$REPO_DIR/index.html")"
echo "    Dist index.html: $(stat -c %y "$DIST_DIR/index.html" 2>/dev/null || stat -f %m "$DIST_DIR/index.html")"
