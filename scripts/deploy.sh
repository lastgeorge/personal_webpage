#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_HOST="${DEPLOY_REMOTE:-xqian@xqian.phy.bnl.gov}"
REMOTE_DIR="${DEPLOY_DIR:-~/public_html}"
BUILD_BASE="${BUILD_BASE:-/xqian/}"
RSYNC_DELETE="${DEPLOY_DELETE:-0}"
DRY_RUN="${DEPLOY_DRY_RUN:-0}"

cd "$ROOT_DIR"

echo "Building static site with base path: $BUILD_BASE"
npm run build -- --base "$BUILD_BASE"

normalized_base="/${BUILD_BASE#/}"
if [[ "$normalized_base" != */ ]]; then
  normalized_base="$normalized_base/"
fi

fallback_target="${normalized_base}index.html"
cat > dist/.htaccess <<HTACCESS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${normalized_base}
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . ${fallback_target} [L]
</IfModule>
HTACCESS

rsync_args=(-az --progress --exclude ".DS_Store")

if [[ "$RSYNC_DELETE" == "1" ]]; then
  rsync_args+=(--delete)
fi

if [[ "$DRY_RUN" == "1" ]]; then
  rsync_args+=(--dry-run)
fi

echo "Deploying dist/ to ${REMOTE_HOST}:${REMOTE_DIR}/"
rsync "${rsync_args[@]}" dist/ "${REMOTE_HOST}:${REMOTE_DIR%/}/"

echo "Deploy complete."
