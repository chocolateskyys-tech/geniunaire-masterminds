#!/usr/bin/env bash
set -euo pipefail

BRANCH="agent/hotel-apartment-sponsor-upgrades"
REPO="chocolateskyys-tech/geniunaire-masterminds"

echo "============================================================"
echo "Geniunaire MasterMinds final build check"
echo "Repo:   ${REPO}"
echo "Branch: ${BRANCH}"
echo "============================================================"

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git is not installed or not available in this terminal."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "ERROR: npm is not installed or not available in this terminal."
  exit 1
fi

CURRENT_BRANCH="$(git branch --show-current 2>/dev/null || true)"
if [ -z "${CURRENT_BRANCH}" ]; then
  echo "ERROR: This folder does not look like a git repo."
  exit 1
fi

echo "Current branch: ${CURRENT_BRANCH}"

if [ "${CURRENT_BRANCH}" != "${BRANCH}" ]; then
  echo "Switching to ${BRANCH}..."
  git fetch origin "${BRANCH}"
  git checkout "${BRANCH}"
fi

echo "Pulling latest branch changes..."
git pull --ff-only origin "${BRANCH}"

echo "Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "Running production build..."
npm run build

echo "Running lint..."
npm run lint || {
  echo "Lint found issues. Build already ran; review lint output above."
  exit 1
}

echo "Checking git status..."
git status --short

echo "============================================================"
echo "DONE: Build check completed for Geniunaire MasterMinds."
echo "Next: open PR #2, review the visual, then merge when ready."
echo "============================================================"
