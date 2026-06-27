#!/usr/bin/env bash
set -e

echo "ADDING GLOBAL BACK TO GATE BUTTON..."

if [ ! -f package.json ]; then
  echo "STOP: package.json not found. Run: cd ~/geniunaire-masterminds"
  exit 1
fi

python3 - <<'PY'
from pathlib import Path

path = Path("src/App.jsx")
text = path.read_text()

if "GLOBAL_BACK_TO_GATE_BUTTON" in text:
    print("Global Back To Gate button already installed.")
else:
    marker = '<div className="min-h-screen bg-black">'
    insert = '''<div className="min-h-screen bg-black">
      {/* GLOBAL_BACK_TO_GATE_BUTTON */}
      {currentView !== 'entryGate' && (
        <button
          type="button"
          onClick={() => {
            setAccessGranted(false);
            setCurrentView('entryGate');
          }}
          className="fixed bottom-4 right-4 z-[9999] rounded-full border border-yellow-400 bg-black px-5 py-3 text-sm font-black text-yellow-300 shadow-2xl hover:bg-yellow-400 hover:text-black"
        >
          ← Gate
        </button>
      )}'''

    if marker not in text:
        raise SystemExit("STOP: Could not find main app wrapper in App.jsx. Paste this error to ChatGPT.")

    text = text.replace(marker, insert, 1)
    path.write_text(text)
    print("Global Back To Gate button installed.")
PY

npm run build

git add src/App.jsx

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Add global back to gate escape button"
fi

git push -u origin "$(git branch --show-current)"

echo "GREEN CHECK: GLOBAL BACK TO GATE BUTTON ADDED"
