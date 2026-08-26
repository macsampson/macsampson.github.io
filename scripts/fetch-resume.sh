#!/usr/bin/env bash
# Pulls the résumé out of the private macsampson/resumes repo for local dev.
# CI does this with a scoped secret instead; see .github/workflows/deploy.yml.
set -euo pipefail

REPO="macsampson/resumes"
SOURCE="${RESUME_SOURCE:-swe/pdf/mackenzie_sampson_resume.pdf}"
DEST="public/assets/resume.pdf"

mkdir -p "$(dirname "$DEST")"
gh api "repos/$REPO/contents/$SOURCE" \
  -H "Accept: application/vnd.github.raw" > "$DEST"

echo "Wrote $DEST ($(du -h "$DEST" | cut -f1)) from $REPO/$SOURCE"
