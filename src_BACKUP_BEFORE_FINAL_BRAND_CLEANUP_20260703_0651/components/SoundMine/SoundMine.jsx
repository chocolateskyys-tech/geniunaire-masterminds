import "./SoundMine.css";

const soundStations = [
  {
    name: "Music Generator Station",
    type: "Music / Theme Creation",
    description:
      "Create theme songs, background music, character themes, intro tracks, episode moods, commercial jingles, and scene scores.",
    tools: ["AI music generator", "Theme builder", "Mood track planner", "Episode score notes"],
    access: "Premium / booked access",
  },
  {
    name: "Sound Effects Station",
    type: "Scene Audio",
    description:
      "Collect and assign sound effects for scenes, page turns, TV static, room transitions, dramatic stings, crowd reactions, door slams, footsteps, and studio moments.",
    tools: ["SFX library", "Scene effect notes", "Transition sounds", "Commercial break sounds"],
    access: "Production access",
  },
  {
    name: "Voice / Casting Booth",
    type: "Voice + Character Performance",
    description:
      "Record or plan narrator voices, character voices, audition clips, confessionals, bot voice tests, commercial reads, and scripted role performances.",
    tools: ["Voiceover app", "Audition notes", "Character voice tests", "Consent reminders"],
    access: "CastWire / production access",
  },
  {
    name: "Commercial Audio Station",
    type: "Ads / Affiliate Breaks",
    description:
      "Create audio for affiliate ads, sponsor reads, product commercials, intermission announcements, and E-TV Book ad breaks.",
    tools: ["Ad read scripts", "Sponsor audio", "Affiliate commercial clips", "Break timing"],
    access: "Sponsor / creator access",
  },
  {
    name: "Broadcast Mix Station",
    type: "Final Audio Assembly",
    description:
      "Combine music, voice, sound effects, commercial audio, episode cues, and broadcast notes into a release-ready sound package.",
    tools: ["Mix checklist", "Episode sound map", "Broadcast assignment", "Release status"],
    access: "Broadcast / ASPIRE access",
  },
  {
    name: "Studio Booking Desk",
    type: "Booking / Access Rules",
    description:
      "Request studio time, track session purpose, approve access, assign production windows, and keep The Sound Mine premium, limited, and structured.",
    tools: ["Booking request", "Session tier", "Approval status", "Studio rules"],
    access: "Booked only",
  },
];

export default function SoundMine({ onReturn }) {
  function saveStation(station) {
    const record = {
      selectedStation: station.name,
      type: station.type,
      access: station.access,
      selectedAt: new Date().toISOString(),
      status: "sound-mine-station-selected",
    };

    localStorage.setItem("gm_selected_sound_station", JSON.stringify(record));
    alert(`${station.name} selected. Next step: connect tool, booking, or audio asset.`);
  }

  return (
    <main className="sound-mine-page">
      <section className="sound-mine-hero">
        <p className="sound-mine-kicker">Admiration Mine Integrator</p>
        <h1>The Sound Mine</h1>
        <p className="sound-mine-lead">
          Every show needs a signal. Every signal needs a sound.
        </p>
        <p className="sound-mine-copy">
          The Sound Mine is the structured audio production resource for
          AI’ALITY, E-TV Books, broadcast drops, character voices, commercial
          breaks, music, effects, and studio sessions.
        </p>
      </section>

      <section className="sound-mine-rule-panel">
        <span>Premium access.</span>
        <span>Limited booking.</span>
        <span>Not casual. Not unlimited.</span>
        <span>Build the sound behind the story.</span>
      </section>

      <section className="sound-station-grid">
        {soundStations.map((station) => (
          <article className="sound-station-card" key={station.name}>
            <div className="sound-station-top">
              <span>{station.type}</span>
            </div>

            <h2>{station.name}</h2>
            <p>{station.description}</p>

            <div className="sound-tool-list">
              {station.tools.map((tool) => (
                <small key={tool}>{tool}</small>
              ))}
            </div>

            <div className="sound-access-box">
              <strong>Access</strong>
              <span>{station.access}</span>
            </div>

            <button type="button" onClick={() => saveStation(station)}>
              Open Station
            </button>
          </article>
        ))}
      </section>

      <section className="sound-mine-note">
        <h2>The Sound Mine replaced the old playlist idea.</h2>
        <p>
          This room is not just for playing music. It is where audio gets
          created, booked, assigned, mixed, and prepared for broadcasts,
          interactive E-TV Book scenes, commercials, and character-driven
          entertainment.
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
