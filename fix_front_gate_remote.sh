#!/usr/bin/env bash
set -e

echo "ADDING FRONT GATE REMOTE..."

ENTRY="src/components/EntryGate/EntryGate.jsx"

if [ ! -f "$ENTRY" ]; then
  echo "STOP: EntryGate.jsx not found."
  exit 1
fi

python3 - <<'PY'
from pathlib import Path
import re

path = Path("src/components/EntryGate/EntryGate.jsx")
text = path.read_text()

# Remove earlier Front Gate Remote if 
text = re.sub(
    r"\s*\{/\* FRONT_GATE_REMOTE_ALWAYS \*/\}[\s\S]*?</div>\s*",
    "\n",
    text,
    count=1
)

remote = """
      {/* FRONT_GATE_REMOTE_ALWAYS */}
      <div
          position: 'fixed',
          top: '14px',
          right: '14px',
          zIndex: 999999,
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: '#22d3ee',
            color: '#000',
            border: '3px solid #fff',
            borderRadius: '999px',
            padding: '12px 16px',
            fontWeight: 900,
            fontSize: '13px',
            boxShadow: '0 0 24px rgba(34, 211, 238, 0.75)',
            cursor: 'pointer',
          }}
        >
          GATE VIEW
        </button>

        <button
          type="button"
          onClick={() => {
            if (typeof onFounderAccess !== 'undefined' && onFounderAccess) {
              onFounderAccess();
            } else {
              alert('Secret control is ready, but onFounderAccess is not wired in this gate yet.');
            }
          }}
          style={{
            background: '#facc15',
            color: '#000',
            border: '3px solid #fff',
            borderRadius: '999px',
            padding: '12px 16px',
            fontWeight: 900,
            fontSize: '13px',
            boxShadow: '0 0 24px rgba(250, 204, 21, 0.85)',
            cursor: 'pointer',
          }}
        >
          SECRET
        </button>
      </div>
"""

# Put it immediately inside the main tag so it floats over the gate
match = re.search(r"<main[^>]*>", text)
if not match:
    raise SystemExit("STOP: Could not find <main> in EntryGate.jsx.")

insert_at = match.end()
text = text[:insert_at] + "\n" + remote + text[insert_at:]

path.write_text(text)
print("Front Gate Remote installed.")
PY

npm run build

git add src/components/EntryGate/EntryGate.jsx

if git diff --cached --quiet; then
  echo "No new changes to commit."
else
  git commit -m "Move front gate secret controls into visible gate remote"
fi

git push -u origin "$(git branch --show-current)"

echo "GREEN CHECK: FRONT GATE REMOTE ADDED"
