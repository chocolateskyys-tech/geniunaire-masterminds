#!/usr/bin/env bash
set -e

echo "ADDING ALWAYS-VISIBLE BK 2 GATE BUTTON..."

python3 - <<'PY'
from pathlib import Path
import re

path = Path("src/App.jsx")
text = path.read_text()

# Remove earlier gate button attempts so we don't stack buttons
text = re.sub(r"\s*\{/\* GLOBAL_BACK_TO_GATE_BUTTON[\s\S]*?\n\s*\)\}", "", text, count=3)
text = re.sub(r"\s*\{/\* GLOBAL_BACK_TO_GATE_BUTTON_FORCE[\s\S]*?\n\s*\)\}", "", text, count=3)

button = """
      {/* BK_2_GATE_ALWAYS_ON */}
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 999999,
          background: '#facc15',
          color: '#000',
          border: '3px solid #fff',
          borderRadius: '999px',
          padding: '14px 20px',
          fontWeight: 900,
          fontSize: '14px',
          boxShadow: '0 0 30px rgba(250, 204, 21, 0.85)',
          cursor: 'pointer',
        }}
      >
        BK 2 GATE
      </button>
"""

marker = "{renderCurrentView()}"
if marker not in text:
    raise SystemExit("STOP: Could not find renderCurrentView marker in App.jsx.")

if "BK_2_GATE_ALWAYS_ON" not in text:
    text = text.replace(marker, button + "\n      " + marker, 1)

path.write_text(text)
print("BK 2 GATE always-on button installed.")
PY

npm run build

git add src/App.jsx

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Add always visible BK 2 Gate escape button"
fi

git push -u origin "$(git branch --show-current)"

echo "GREEN CHECK: BK 2 GATE BUTTON ADDED"
