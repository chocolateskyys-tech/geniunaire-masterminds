#!/usr/bin/env bash
set -e

echo "🏁 GM WILD PUSH STARTING..."

if [ ! -f package.json ]; then
  echo "❌ STOP: package.json not found. You are not inside the app folder."
  echo "Run: cd ~/geniunaire-masterminds"
  exit 1
fi

echo "✅ App folder confirmed."

git status || true
git switch launch/gm-kiddieland-access-pass 2>/dev/null || git switch -c launch/gm-kiddieland-access-pass

mkdir -p src/components/WildPushRooms

cat > src/components/WildPushRooms/WildPushRooms.jsx <<'REACT'
import { useMemo, useState } from "react";

const STORAGE_KEY = "gmWildPushTickets";

const rooms = [
  {
    id: "thread",
    title: "Thread Set Machine",
    tag: "WITH RECEIPTS",
    purpose: "Scan ideas, save receipts, route builds, protect vault notes, and stop million-dollar chaos from disappearing.",
    fields: ["Receipt Title", "Thread / Idea / Blueprint", "Route"],
    routes: ["Send To GM", "Send To ETV", "Send To Kiddie Land", "Send To DormMageddon", "Send To E-Store", "Send To Legal Vault", "Create Website Ticket", "Vault For Later"],
  },
  {
    id: "eservice",
    title: "GM E-Service Machine",
    tag: "DOMAIN → BUILD → DEPLOY",
    purpose: "Turn owned domains into paid service tickets: ETV setup, lounge pass, casting page, website build, ebook store, deployment, and BNPL.",
    fields: ["Client / Project", "Domain / URL", "Service Lane"],
    routes: ["Domain + Launch Setup", "Landing Page", "Website Rescue", "$10K Web Creation Deal", "ETV Network Setup", "Ebook Store Setup", "Full E-Service Machine"],
  },
  {
    id: "pcoa",
    title: "PCOA Link Launcher",
    tag: "CODED OFFERS",
    purpose: "Create coded affiliate, sponsor, promo, BNPL, casting, ETV, arcade reward, ebook store, and website build links.",
    fields: ["Campaign Name", "URL / Payment Link", "Placement"],
    routes: ["ETV Lounge Screen", "Commercial Break", "Casting Page", "Website Build Offer", "Ebook Store Feature", "GM Arcade Reward", "DormMageddon Board", "Thread Set Receipt"],
  },
  {
    id: "legal",
    title: "Legal Vault + Dorm Admin Locks",
    tag: "LAUNCH SHIELD",
    purpose: "Hold terms, consent, SDA, creator rights, parent control, endorsement, merch, franchise, auction, BNPL, and DormMageddon approval locks.",
    fields: ["Document / Approval", "Rule / Contract Note", "Assigned Area"],
    routes: ["Terms of Use", "Parent Consent", "Performer Release", "Creator Ownership", "SDA", "DormMageddon Approval", "Merch Rights", "BNPL Terms", "Franchise Desk"],
  },
];

const masterRules = [
  "No child feature goes live without parent control.",
  "No character goes public without rights.",
  "No endorsement runs without disclosure.",
  "No paid lane runs without terms.",
  "No creator work is used without permission.",
  "No reward promises cash-out or guaranteed results.",
  "No website, promo, ETV placement, or build guarantees sales.",
  "Thread Set keeps the receipts.",
];

function loadTickets() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveTickets(tickets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export default function WildPushRooms({ onReturn }) {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [tickets, setTickets] = useState(() => loadTickets());
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    one: "",
    two: "",
    route: rooms[0].routes[0],
    status: "Draft / Needs Review",
    notes: "",
  });

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      live: tickets.filter((x) => x.status === "Live / Active").length,
      review: tickets.filter((x) => x.status.includes("Review")).length,
      paused: tickets.filter((x) => x.status.includes("Paused")).length,
    };
  }, [tickets]);

  function switchRoom(room) {
    setActiveRoom(room);
    setForm({
      one: "",
      two: "",
      route: room.routes[0],
      status: "Draft / Needs Review",
      notes: "",
    });
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function createTicket(event) {
    event.preventDefault();

    const ticket = {
      id: Date.now(),
      code: `GM-${activeRoom.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 899999)}`,
      room: activeRoom.title,
      tag: activeRoom.tag,
      createdAt: new Date().toLocaleString(),
      fieldOne: form.one || "Untitled",
      fieldTwo: form.two || "Details pending",
      route: form.route,
      status: form.status,
      notes: form.notes,
      rule: "GM approval, legal terms, payment/scope rules, and receipts may be required before public launch or delivery.",
    };

    const next = [ticket, ...tickets];
    setTickets(next);
    saveTickets(next);
    setMessage(`${ticket.code} saved inside ${activeRoom.title}.`);
    setForm({
      one: "",
      two: "",
      route: activeRoom.routes[0],
      status: "Draft / Needs Review",
      notes: "",
    });
  }

  function copyTicket(ticket) {
    const text = [
      "GM WILD PUSH TICKET",
      "",
      `Code: ${ticket.code}`,
      `Room: ${ticket.room}`,
      `Created: ${ticket.createdAt}`,
      `Title / Client / Campaign: ${ticket.fieldOne}`,
      `Details / URL / Rule: ${ticket.fieldTwo}`,
      `Route: ${ticket.route}`,
      `Status: ${ticket.status}`,
      "",
      "Notes:",
      ticket.notes || "No notes.",
      "",
      ticket.rule,
    ].join("\n");

    navigator.clipboard?.writeText(text);
    setMessage(`Copied ${ticket.code}.`);
  }

  function changeStatus(id, status) {
    const next = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status } : ticket
    );
    setTickets(next);
    saveTickets(next);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-7xl mx-auto">
        <button onClick={onReturn} className="mb-5 rounded-xl border border-purple-500 px-4 py-2">
          ← Back To Gate
        </button>

        <p className="text-yellow-300 uppercase tracking-[0.35em] text-xs">
          GM Wild Push // Thread Set · E-Service · PCOA · Legal Locks
        </p>

        <h1 className="text-5xl md:text-7xl font-black mt-3 mb-4">
          Wild Push Control Room
        </h1>

        <p className="text-slate-300 max-w-4xl text-lg mb-8">
          Four launch-critical rooms in one safe door: Thread Set receipts, GM E-Service tickets,
          PCOA coded offers, and Legal/Dorm approval locks. Build now. Split later.
        </p>

        {message && <p className="mb-5 text-cyan-300">{message}</p>}

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-3xl border border-purple-700 bg-black/70 p-5">
            <p className="text-xs uppercase tracking-widest text-purple-300">Total Tickets</p>
            <h2 className="text-4xl font-black mt-2">{stats.total}</h2>
          </div>
          <div className="rounded-3xl border border-cyan-700 bg-black/70 p-5">
            <p className="text-xs uppercase tracking-widest text-cyan-300">Live</p>
            <h2 className="text-4xl font-black mt-2">{stats.live}</h2>
          </div>
          <div className="rounded-3xl border border-yellow-700 bg-black/70 p-5">
            <p className="text-xs uppercase tracking-widest text-yellow-300">Review</p>
            <h2 className="text-4xl font-black mt-2">{stats.review}</h2>
          </div>
          <div className="rounded-3xl border border-red-700 bg-black/70 p-5">
            <p className="text-xs uppercase tracking-widest text-red-300">Paused</p>
            <h2 className="text-4xl font-black mt-2">{stats.paused}</h2>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <aside className="grid gap-3">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => switchRoom(room)}
                className={`text-left rounded-2xl border p-4 ${
                  activeRoom.id === room.id
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-slate-800 bg-black/60"
                }`}
              >
                <p className="text-xs text-cyan-300 uppercase tracking-widest">{room.tag}</p>
                <h3 className="font-black mt-1 text-xl">{room.title}</h3>
                <p className="text-xs text-slate-500 mt-2">{room.purpose}</p>
              </button>
            ))}
          </aside>

          <article className="lg:col-span-2 rounded-3xl border border-cyan-700 bg-black/70 p-6">
            <p className="text-yellow-300 uppercase tracking-[0.25em] text-xs">{activeRoom.tag}</p>
            <h2 className="text-4xl font-black mt-3 mb-4">{activeRoom.title}</h2>
            <p className="text-slate-300 text-lg mb-5">{activeRoom.purpose}</p>

            <form onSubmit={createTicket} className="rounded-2xl border border-purple-700 bg-purple-950/20 p-5 mb-6">
              <h3 className="text-purple-300 text-2xl font-black mb-4">Create Ticket</h3>

              <input
                value={form.one}
                onChange={(e) => update("one", e.target.value)}
                placeholder={activeRoom.fields[0]}
                className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3"
              />

              <textarea
                value={form.two}
                onChange={(e) => update("two", e.target.value)}
                placeholder={activeRoom.fields[1]}
                className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3 min-h-[120px]"
              />

              <select
                value={form.route}
                onChange={(e) => update("route", e.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3"
              >
                {activeRoom.routes.map((route) => (
                  <option key={route}>{route}</option>
                ))}
              </select>

              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 rounded px-4 py-3"
              >
                <option>Draft / Needs Review</option>
                <option>Waiting On Payment</option>
                <option>Waiting On Approval</option>
                <option>Ready To Build</option>
                <option>Ready To Deploy</option>
                <option>Live / Active</option>
                <option>Paused / Payment Needed</option>
                <option>Archived / Vaulted</option>
              </select>

              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Notes, scope, legal rule, payment link, domain, ETV placement, approval status..."
                className="w-full mb-4 bg-black border border-slate-700 rounded px-4 py-3 min-h-[90px]"
              />

              <button className="rounded-xl bg-yellow-400 text-black font-black px-6 py-3">
                Save Wild Push Ticket
              </button>
            </form>

            <div className="rounded-2xl border border-yellow-500/60 bg-black/60 p-5">
              <h3 className="font-black text-yellow-300 text-2xl mb-3">Launch Shield Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {masterRules.map((rule) => (
                  <div key={rule} className="rounded-xl border border-slate-800 bg-black/70 p-3 text-sm text-slate-300">
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-black/70 p-5">
          <h2 className="text-3xl font-black text-cyan-300 mb-4">Saved Wild Push Tickets</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="rounded-2xl border border-slate-800 bg-black/60 p-4">
                <p className="text-xs text-yellow-300 uppercase tracking-widest">{ticket.code}</p>
                <h3 className="text-xl font-black mt-1">{ticket.fieldOne}</h3>
                <p className="text-purple-300 text-sm mt-1">{ticket.room} · {ticket.route}</p>
                <p className="text-slate-400 text-sm mt-3">{ticket.fieldTwo}</p>
                <p className="text-cyan-300 text-sm mt-3">{ticket.status}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <button onClick={() => copyTicket(ticket)} className="rounded border border-cyan-500 px-3 py-2 text-sm">
                    Copy
                  </button>
                  <button onClick={() => changeStatus(ticket.id, "Live / Active")} className="rounded border border-green-500 px-3 py-2 text-sm">
                    Mark Live
                  </button>
                  <button onClick={() => changeStatus(ticket.id, "Paused / Payment Needed")} className="rounded border border-red-500 px-3 py-2 text-sm">
                    Pause
                  </button>
                </div>
              </div>
            ))}

            {tickets.length === 0 && <p className="text-slate-500">No tickets saved yet.</p>}
          </div>
        </section>
      </section>
    </main>
  );
}
REACT

python3 - <<'PY'
from pathlib import Path

path = Path("src/App.jsx")
text = path.read_text()

import_line = "import WildPushRooms from './components/WildPushRooms/WildPushRooms';"

if "WildPushRooms" not in text:
    lines = text.splitlines()
    last_import = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import = i
    lines.insert(last_import + 1, import_line)
    text = "\n".join(lines) + "\n"

if "['Wild Push', 'wildPushRooms']" not in text:
    text = text.replace(
        "const navItems = [",
        "const navItems = [\n    ['Wild Push', 'wildPushRooms'],",
        1
    )

if "wildPushRooms: <WildPushRooms" not in text:
    markers = [
        "    domainVault: <DomainVault {...roomProps} />,",
        "    dreamLab: <DreamLab {...roomProps} />,",
        "    entryGate: <EntryGate",
    ]

    inserted = False
    for marker in markers:
        if marker in text and marker != "    entryGate: <EntryGate":
            text = text.replace(
                marker,
                marker + "\n    wildPushRooms: <WildPushRooms {...roomProps} />,",
                1
            )
            inserted = True
            break

    if not inserted:
        raise SystemExit("❌ Could not find view mapping spot in App.jsx. Paste this error to ChatGPT.")

path.write_text(text)
print("✅ App.jsx wired with Wild Push room.")
PY

echo "🔎 Building app..."
npm run build

echo "💾 Committing..."
git add src/components/WildPushRooms src/App.jsx

if git diff --cached --quiet; then
  echo "ℹ️ No new changes to commit."
else
  git commit -m "Add GM Wild Push control room"
fi

echo "🚀 Pushing branch..."
git push -u origin launch/gm-kiddieland-access-pass

echo "✅ GM WILD PUSH COMPLETE."
echo "Next: open preview/deploy branch or merge when ready."
