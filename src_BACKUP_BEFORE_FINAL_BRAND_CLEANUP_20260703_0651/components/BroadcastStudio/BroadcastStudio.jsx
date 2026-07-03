import "./BroadcastStudio.css";

const productionLanes = [
  {
    name: "Show Concepts",
    type: "Series Development",
    description:
      "Plan AI’ALITY shows, Living E-TV Book drops, talk shows, confessionals, reality-style series, campus shows, and character-driven broadcast concepts.",
    tools: ["Show title", "Series hook", "Target audience", "E-TV model requirement"],
    status: "Concept Board",
  },
  {
    name: "AI Cast Profiles",
    type: "Character / Bot Casting",
    description:
      "Build original AI cast members with names, roles, backstories, secrets, voice style, emotional rules, relationships, and show persona.",
    tools: ["Cast bio", "Persona notes", "Memory rules", "Voice direction"],
    status: "Cast Builder",
  },
  {
    name: "Casting Calls",
    type: "Human Performance Intake",
    description:
      "Create audition calls for real humans to perform scripted parts, voice tests, confessionals, reactions, and emotional scenes that inspire original fictional AI characters.",
    tools: ["Audition call", "Role type", "Script side", "Consent reminder"],
    status: "Open Call",
  },
  {
    name: "Audition Room",
    type: "Talent Review",
    description:
      "Track performer submissions, voice clips, read-throughs, video auditions, callback notes, casting decisions, and creator approvals.",
    tools: ["Submission link", "Callback status", "Role match", "Performance notes"],
    status: "Review Desk",
  },
  {
    name: "Script Studio",
    type: "Writing Room",
    description:
      "Write scenes, confessionals, commercial bumpers, dialogue beats, character conflict, cliffhangers, intros, outros, and episode scripts.",
    tools: ["Scene script", "Confessional", "Episode beat", "Copywriter app slot"],
    status: "Writing Room",
  },
  {
    name: "Episode Builder",
    type: "Living E-TV Book Assembly",
    description:
      "Build the episode/page flow with TV-screen scenes, book-style turns, interactive choices, commercial breaks, cast moments, and reminders.",
    tools: ["Episode order", "Page turn", "TV scene", "Viewer choice"],
    status: "Episode Build",
  },
  {
    name: "Commercial Break Manager",
    type: "Affiliate / Sponsor Ads",
    description:
      "Attach affiliate ads, sponsor reads, product placements, intermission cards, and commercial-style breaks between scenes or page turns.",
    tools: ["Affiliate link", "Ad script", "Sponsor note", "Break placement"],
    status: "Ad Breaks",
  },
  {
    name: "Sound Mine Assignment",
    type: "Audio Production",
    description:
      "Send episode audio needs into The Sound Mine: music, sound effects, character voice, ad reads, intro drops, and broadcast mixes.",
    tools: ["Music cue", "SFX cue", "Voice cue", "Broadcast mix"],
    status: "Needs Sound",
  },
  {
    name: "E-TV Model Requirements",
    type: "Access / Compatibility",
    description:
      "Decide which E-TV Book Models and Signal Plans unlock each show, episode, room, replay, cast feature, or broadcast event.",
    tools: ["RiftView", "CastWire", "Broadcast Bible", "VaultScreen"],
    status: "Signal Rules",
  },
  {
    name: "Broadcast Release Schedule",
    type: "Programming Calendar",
    description:
      "Plan release dates, drop windows, reminders, replay vault timing, private previews, cast announcements, and public programming windows.",
    tools: ["Release date", "Reminder", "Replay window", "Signal status"],
    status: "Scheduling",
  },
  {
    name: "Usage Footage / Beta Notes",
    type: "Testing + Proof",
    description:
      "Track beta usage, tester reactions, footage notes, screen recordings, app behavior, creator feedback, and launch proof for future pitching.",
    tools: ["Tester notes", "Footage link", "Bug note", "Feedback status"],
    status: "Beta Proof",
  },
  {
    name: "Bot Celebrity Desk",
    type: "Virtual Talent Life",
    description:
      "Manage AI personalities as working virtual talent: auditions, booked appearances, studio sessions, cast drama, show roles, and brand moments.",
    tools: ["Bot status", "Booked gig", "Training session", "Show appearance"],
    status: "Talent Desk",
  },
];

const starterShows = [
  {
    title: "AI’ALITY: First Drop",
    model: "RiftView or higher",
    format: "Casted AI reality-book pilot",
  },
  {
    title: "DormMageddon Campus Drop",
    model: "DormScreen Book or higher",
    format: "Student creator / animated campus universe",
  },
  {
    title: "Bot Celebrity Weird Life",
    model: "Broadcast Bible or GhostSignal",
    format: "Virtual talent lifestyle + production comedy",
  },
];

export default function BroadcastStudio({ onReturn }) {
  function saveLane(lane) {
    const record = {
      selectedProductionLane: lane.name,
      type: lane.type,
      status: lane.status,
      selectedAt: new Date().toISOString(),
      statusNote: "broadcast-studio-lane-selected",
    };

    localStorage.setItem("gm_selected_broadcast_lane", JSON.stringify(record));
    alert(`${lane.name} selected. Next step: attach assets, scripts, cast, or schedule.`);
  }

  function saveShow(show) {
    const record = {
      selectedShow: show.title,
      requiredModel: show.model,
      format: show.format,
      selectedAt: new Date().toISOString(),
      status: "starter-show-selected",
    };

    localStorage.setItem("gm_selected_starter_show", JSON.stringify(record));
    alert(`${show.title} selected. Next step: build episode/cast package.`);
  }

  return (
    <main className="broadcast-studio-page">
      <section className="broadcast-studio-hero">
        <p className="broadcast-kicker">AI’ALITY Production Funnel</p>
        <h1>Broadcast Studio</h1>
        <p className="broadcast-lead">
          Cast the bots. Build the show. Wire the signal. Drop the episode.
        </p>
        <p className="broadcast-copy">
          This is the production environment for Living E-TV Books, AI’ALITY
          series, bot celebrities, scripted scenes, casting calls, commercial
          breaks, Sound Mine assignments, and private broadcast drops inside the
          Admiration Mine Integrator.
        </p>
      </section>

      <section className="broadcast-rule-panel">
        <span>AI cast lives here.</span>
        <span>Scripts get built here.</span>
        <span>Sound gets assigned here.</span>
        <span>Programming gets scheduled here.</span>
      </section>

      <section className="starter-show-panel">
        <div className="starter-show-intro">
          <p className="broadcast-kicker">Starter Broadcast Drops</p>
          <h2>First Shows On The Board</h2>
          <p>
            These are early programming lanes that can connect to the E-TV Store,
            The Sound Mine, DormMageddon, and the AI’ALITY Living E-TV Book
            format.
          </p>
        </div>

        <div className="starter-show-grid">
          {starterShows.map((show) => (
            <article className="starter-show-card" key={show.title}>
              <h3>{show.title}</h3>
              <p>{show.format}</p>
              <small>{show.model}</small>
              <button type="button" onClick={() => saveShow(show)}>
                Select Show
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="production-lane-grid">
        {productionLanes.map((lane) => (
          <article className="production-lane-card" key={lane.name}>
            <div className="production-lane-top">
              <span>{lane.status}</span>
              <small>{lane.type}</small>
            </div>

            <h2>{lane.name}</h2>
            <p>{lane.description}</p>

            <div className="production-tool-list">
              {lane.tools.map((tool) => (
                <small key={tool}>{tool}</small>
              ))}
            </div>

            <button type="button" onClick={() => saveLane(lane)}>
              Open Lane
            </button>
          </article>
        ))}
      </section>

      <section className="broadcast-studio-note">
        <h2>This is where the E-TV Book becomes a network.</h2>
        <p>
          The E-TV Store sells the model. The Sound Mine builds the audio. The
          Broadcast Studio casts, scripts, schedules, and prepares the show. The
          Programming Console will decide what signal receives the drop.
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
