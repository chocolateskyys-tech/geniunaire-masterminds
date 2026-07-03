import "./ETVProgrammingConsole.css";

const consolePanels = [
  {
    name: "Program Drop Builder",
    type: "Drop Setup",
    description:
      "Create a scheduled E-TV drop with title, show, episode, required device, signal plan, commercial breaks, cast appearances, and release notes.",
    fields: ["Drop title", "Show / series", "Episode", "Release window"],
    status: "Build Drop",
  },
  {
    name: "Device Compatibility",
    type: "E-TV Model Rules",
    description:
      "Decide which devices can access each drop: RiftPhone, RiftTab, RiftView, CastWire, Broadcast Bible, VaultScreen, GhostSignal, and premium models.",
    fields: ["Device model", "Viewing square", "Upgrade needed", "Compatible rooms"],
    status: "Wire Device",
  },
  {
    name: "Signal Plan Control",
    type: "Access Status",
    description:
      "Track signal status for viewer access, subscriptions, model upgrades, production access, replay vaults, and private drops.",
    fields: ["Signal active", "Signal pending", "Signal clipped", "Signal restored"],
    status: "Signal Rules",
  },
  {
    name: "Commercial Break Assignment",
    type: "Ads / Affiliate",
    description:
      "Attach affiliate ads, sponsor reads, product placements, intermission cards, virtual snacks, and branded commercial moments to programmed drops.",
    fields: ["Ad slot", "Affiliate link", "Sponsor read", "Break timer"],
    status: "Attach Ads",
  },
  {
    name: "Sound Mine Assignment",
    type: "Audio Layer",
    description:
      "Assign music, voice, effects, commercial audio, intro drops, scene cues, and final broadcast mixes from The Sound Mine.",
    fields: ["Theme song", "SFX cue", "Voiceover", "Broadcast mix"],
    status: "Assign Sound",
  },
  {
    name: "Broadcast Studio Assignment",
    type: "Show Production",
    description:
      "Connect show concepts, cast profiles, auditions, scripts, scenes, episode builder notes, and bot celebrity appearances to each drop.",
    fields: ["Show lane", "Cast members", "Script status", "Episode build"],
    status: "Assign Show",
  },
  {
    name: "Wardrobe + Scene Style",
    type: "Visual Styling",
    description:
      "Attach Swagged Persona wardrobe packs, glam looks, device skins, scene bundles, and avatar continuity rules to a programmed episode.",
    fields: ["Wardrobe pack", "Glam look", "Device skin", "Continuity note"],
    status: "Style Drop",
  },
  {
    name: "Reminder + Notification Scheduler",
    type: "Audience Alerts",
    description:
      "Schedule reminders for episode drops, cast Q&A, live sessions, studio bookings, watch parties, commercial drops, and replay windows.",
    fields: ["Reminder date", "Audience group", "Message", "Send status"],
    status: "Schedule Alerts",
  },
  {
    name: "Replay Vault Control",
    type: "Archive / Access",
    description:
      "Move drops into replay, archive private episodes, set rewatch access, protect paid content, and assign VaultScreen requirements.",
    fields: ["Replay window", "Vault access", "Archive status", "Unlock model"],
    status: "Vault Drop",
  },
  {
    name: "Signal Clip / Restore Desk",
    type: "Payment + Access",
    description:
      "Pause access when a signal plan is inactive, restore access after payment, and mark founder/admin overrides when needed.",
    fields: ["Clip reason", "Restore status", "Payment note", "Override"],
    status: "Clip / Restore",
  },
];

const sampleDrops = [
  {
    title: "AI’ALITY: First Drop",
    device: "RiftView or higher",
    signal: "Core Signal",
    status: "Pilot Drop",
  },
  {
    title: "Bot Celebrity Weird Life",
    device: "Broadcast Bible / GhostSignal",
    signal: "Broadcast Signal",
    status: "Production Concept",
  },
  {
    title: "DormMageddon Campus Drop",
    device: "DormScreen Book or RiftTab",
    signal: "Dorm Signal",
    status: "Student Lane",
  },
];

export default function ETVProgrammingConsole({ onReturn }) {
  function savePanel(panel) {
    const record = {
      selectedConsolePanel: panel.name,
      type: panel.type,
      status: panel.status,
      selectedAt: new Date().toISOString(),
      statusNote: "etv-programming-console-panel-selected",
    };

    localStorage.setItem("gm_selected_programming_panel", JSON.stringify(record));
    alert(`${panel.name} selected. Next step: connect drop details, model rules, or release schedule.`);
  }

  function saveDrop(drop) {
    const record = {
      selectedProgrammedDrop: drop.title,
      device: drop.device,
      signal: drop.signal,
      status: drop.status,
      selectedAt: new Date().toISOString(),
      statusNote: "programmed-drop-selected",
    };

    localStorage.setItem("gm_selected_programmed_drop", JSON.stringify(record));
    alert(`${drop.title} selected. Next step: assign sound, cast, ads, wardrobe, and release schedule.`);
  }

  return (
    <main className="program-console-page">
      <section className="program-console-hero">
        <p className="program-console-kicker">E-TV Signal Operations</p>
        <h1>E-TV Programming Console</h1>
        <p className="program-console-lead">
          Choose the device. Wire the signal. Program the drop.
        </p>
        <p className="program-console-copy">
          This is where E-TV models, signal plans, scheduled drops, Sound Mine
          assignments, Broadcast Studio production, wardrobe styling, commercial
          breaks, reminders, replay vaults, and access status connect into one
          programmed release system.
        </p>
      </section>

      <section className="program-rule-panel">
        <span>The E-TV Store sells the model.</span>
        <span>The Sound Mine builds the audio.</span>
        <span>The Broadcast Studio casts the show.</span>
        <span>The Console wires the signal.</span>
        <span>No E-TV, no signal.</span>
        <span>No active signal, no scheduled drops.</span>
      </section>

      <section className="sample-drop-panel">
        <div className="sample-drop-intro">
          <p className="program-console-kicker">Programmed Drop Examples</p>
          <h2>What gets wired through the console</h2>
          <p>
            These sample drops show how the console controls device access,
            signal plans, production status, and release readiness.
          </p>
        </div>

        <div className="sample-drop-grid">
          {sampleDrops.map((drop) => (
            <article className="sample-drop-card" key={drop.title}>
              <span>{drop.status}</span>
              <h3>{drop.title}</h3>
              <p>{drop.device}</p>
              <small>{drop.signal}</small>
              <button type="button" onClick={() => saveDrop(drop)}>
                Program Drop
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="program-console-grid">
        {consolePanels.map((panel) => (
          <article className="program-console-card" key={panel.name}>
            <div className="program-console-card-top">
              <span>{panel.status}</span>
              <small>{panel.type}</small>
            </div>

            <h2>{panel.name}</h2>
            <p>{panel.description}</p>

            <div className="program-field-list">
              {panel.fields.map((field) => (
                <small key={field}>{field}</small>
              ))}
            </div>

            <button type="button" onClick={() => savePanel(panel)}>
              Open Panel
            </button>
          </article>
        ))}
      </section>

      <section className="program-console-note">
        <h2>A regular ebook opens. An E-TV device turns the signal on.</h2>
        <p>
          The Programming Console is the bridge between the product people buy,
          the signal they activate, the show they follow, and the drops they
          receive. This is the operational layer that makes the Mine feel like a
          real programmed entertainment system.
        </p>

        {onReturn && (
          <button type="button" onClick={onReturn}>
            Return To Entry
          </button>
        )}
      </section>
    </main>
  );
}
