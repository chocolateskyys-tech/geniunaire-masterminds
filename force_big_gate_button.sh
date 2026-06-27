#!/usr/bin/env bash
set -e

echo "FORCING BIG GATE EXIT BUTTON..."

python3 - <<'PY'
from pathlib import Path
import re

path = Path("src/App.jsx")
text = path.read_text()

# Remove old global gate block if it exists
text = re.sub(
    r"\s*\{/\* GLOBAL_BACK_TO_GATE_BUTTON \*/\}\s*\{currentView !== 'entryGate' && \([\s\S]*?\n\s*\)\}",
    "",
    text,
    count=1
)

button = """
      {/* GLOBAL_BACK_TO_GATE_BUTTON_FORCE */}
      {currentView !== 'entryGate' && (
        <button
          type="button"
          onClick={() => {
            setAccessGranted(false);
            setCurrentView('entryGate');
          }}
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 999999,
            background: '#facc15',
            color: '#000',
            border: '3px solid #fff',
            borderRadius: '999px',
            padding: '14px 20px',
            fontWeight: 900,
            fontSize: '14px',
            boxShadow: '0 0 30px rgba(250, 204, 21, 0.75)',
            cursor: 'pointer',
          }}
        >
          EXIT TO GATE
        </button>
      )}
"""

marker = "{renderCurrentView()}"
if marker not in text:
    raise SystemExit("STOP: Could not find renderCurrentView marker in App.jsx.")

if "GLOBAL_BACK_TO_GATE_BUTTON_FORCE" not in text:
    text = text.replace(marker, button + "\n      " + marker, 1)

path.write_text(text)
print("Big EXIT TO GATE button installed.")
PY

npm run build

git add src/App.jsx

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Force visible global exit to gate button"
fi

git push -u origin "$(git branch --show-current)"

echo "GREEN CHECK: BIG EXIT TO GATE BUTTON ADDED"
