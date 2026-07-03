import "./ETVStore.css";

const etvModels = [
  {
    name: "Pocket Signal",
    tier: "Starter Model",
    screen: "Mini Viewing Square",
    price: "Starter Slot",
    bestFor: "Previews, short drops, character samples, and first-time viewers.",
    unlocks: ["Preview Drops", "Basic Sound", "Limited Character Follows"],
    signal: "Basic Signal",
    button: "Choose Pocket Signal",
  },
  {
    name: "DormScreen Book",
    tier: "Student / Campus Model",
    screen: "Dorm Viewing Square",
    price: "Student Slot",
    bestFor:
      "DormMageddon, campus creators, student drops, dormroom entertainment, and creator-class programming.",
    unlocks: ["DormMageddon", "Student Drops", "Creator Lite Access"],
    signal: "Dorm Signal",
    button: "Choose DormScreen",
  },
  {
    name: "RiftView",
    tier: "Core Viewer Model",
    screen: "Standard Viewing Square",
    price: "Core Slot",
    bestFor:
      "AI’ALITY viewers, living E-TV Book episodes, commercial breaks, cast follows, and scheduled drops.",
    unlocks: ["AI’ALITY Episodes", "Commercial Breaks", "Cast Follows"],
    signal: "Core Signal",
    button: "Choose RiftView",
  },
  {
    name: "CastWire",
    tier: "Talent / Production Model",
    screen: "Script + Screen Layout",
    price: "Production Slot",
    bestFor:
      "Actors, writers, voice performers, auditions, callbacks, read-throughs, and character production work.",
    unlocks: ["Casting Room", "Voice Booth", "Script Reads"],
    signal: "Production Signal",
    button: "Choose CastWire",
  },
  {
    name: "BotBox Book",
    tier: "Bot / Business Model",
    screen: "Bot Control Square",
    price: "Bot Slot",
    bestFor:
      "Business bots, AI workers, bot rentals, promo bots, lead capture bots, and personality-powered service tools.",
    unlocks: ["Bot Rental Desk", "AI Worker Setup", "Bot Training Notes"],
    signal: "Bot Signal",
    button: "Choose BotBox",
  },
  {
    name: "DiamondFrame",
    tier: "Premium Viewer Model",
    screen: "Luxury Viewing Square",
    price: "Premium Slot",
    bestFor:
      "Premium drops, sponsor-enhanced scenes, exclusive character moments, and high-glow programming.",
    unlocks: ["Premium Drops", "Exclusive Scenes", "Priority Reminders"],
    signal: "Diamond Signal",
    button: "Choose DiamondFrame",
  },
  {
    name: "Broadcast Bible",
    tier: "Creator Pro Model",
    screen: "Broadcast Viewing Square",
    price: "Broadcast Slot",
    bestFor:
      "Live rooms, interviews, talk shows, classes, watch parties, creator launches, and full broadcast events.",
    unlocks: ["Broadcast Studio", "Watch Parties", "Live Programming"],
    signal: "Broadcast Signal",
    button: "Choose Broadcast Bible",
  },
  {
    name: "VaultScreen",
    tier: "Archive / Replay Model",
    screen: "Vault Viewing Square",
    price: "Archive Slot",
    bestFor:
      "Replay vaults, protected drops, archived episodes, paid rewatch rooms, courses, and saved programming.",
    unlocks: ["Replay Vault", "Archived Drops", "Protected Content"],
    signal: "Vault Signal",
    button: "Choose VaultScreen",
  },
  {
    name: "GhostSignal",
    tier: "Private / Founder Model",
    screen: "Hidden Signal Square",
    price: "Private Slot",
    bestFor:
      "Private drops, beta testers, hidden rooms, founder previews, locked files, and ASPIRE-level access.",
    unlocks: ["Private Drops", "Beta Rooms", "Founder Signals"],
    signal: "Ghost Signal",
    button: "Choose GhostSignal",
  },
];

export default function ETVStore({ onReturn }) {
  function saveModel(model) {
    const record = {
      selectedModel: model.name,
      tier: model.tier,
      signal: model.signal,
      screen: model.screen,
      selectedAt: new Date().toISOString(),
      status: "etv-model-selected",
    };

    localStorage.setItem("gm_selected_etv_model", JSON.stringify(record));
    alert(`${model.name} selected. Next step: signal activation + wired rooms.`);
  }

  return (
    <main className="etv-store-page">
      <section className="etv-store-hero">
        <p className="etv-store-kicker">Programmable E-TV Book Models</p>
        <h1>E-TV Store</h1>
        <p className="etv-store-lead">
          A regular ebook opens. An E-TV device turns the signal on.
        </p>
        <p className="etv-store-copy">
          Choose your device, wire your signal, and enter the programming.
          Each E-TV Book Model unlocks different rooms, drops, screen sizes,
          bot features, broadcasts, archives, and living-book experiences
          inside the Admiration Mine Integrator.
        </p>
      </section>

      <section className="etv-rule-panel">
        <div>
          <span>No E-TV, no signal.</span>
          <span>No active signal, no scheduled drops.</span>
          <span>Choose your viewing square.</span>
        </div>
      </section>

      <section className="etv-model-grid">
        {etvModels.map((model) => (
          <article className="etv-model-card" key={model.name}>
            <div className="etv-card-screen">
              <div className="etv-screen-glow">
                <span>{model.screen}</span>
              </div>
            </div>

            <div className="etv-card-content">
              <p className="etv-tier">{model.tier}</p>
              <h2>{model.name}</h2>
              <p className="etv-price">{model.price}</p>
              <p className="etv-best">{model.bestFor}</p>

              <div className="etv-unlocks">
                {model.unlocks.map((unlock) => (
                  <small key={unlock}>{unlock}</small>
                ))}
              </div>

              <div className="etv-signal-box">
                <strong>Signal Plan</strong>
                <span>{model.signal}</span>
              </div>

              <div className="etv-actions">
                <button type="button" onClick={() => saveModel(model)}>
                  {model.button}
                </button>
                <button
                  type="button"
                  className="etv-secondary"
                  onClick={() => saveModel(model)}
                >
                  Wire My Signal
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="etv-store-note">
        <h2>Digital access model notice</h2>
        <p>
          E-TV Book Models are digital access products used to unlock compatible
          rooms, programming, features, screen sizes, drops, and virtual viewing
          experiences inside the platform. They are not physical televisions
          unless explicitly stated at checkout.
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
