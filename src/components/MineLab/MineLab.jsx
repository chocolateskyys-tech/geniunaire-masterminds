import "./MineLab.css";

const betaApps = [
  {
    name: "Threaddy",
    status: "Future Beta",
    type: "Thread Companion",
    description:
      "A continuation companion for saving, summarizing, finding, training, and transferring long AI project threads without losing momentum.",
  },
  {
    name: "Mine Radio",
    status: "Concept Room",
    type: "Audio / Focus",
    description:
      "A future sound room for founder focus tracks, launch moods, promo audio clips, client motivation drops, and branded Mine energy.",
  },
  {
    name: "Dropshipping Builder",
    status: "Future Build",
    type: "Store System",
    description:
      "A guided store creation path for supplier products, Sellvia-style sourcing, affiliate items, curated shelves, and product launch prep.",
  },
  {
    name: "Adult Novelty Link Store",
    status: "Private Lane",
    type: "Specialty Store",
    description:
      "A managed dropshipping and affiliate link shelf for adult novelty products, Play Day Pantry concepts, and private client store builds.",
  },
  {
    name: "AI Worker Rentals",
    status: "Future Beta",
    type: "Helper / Automation",
    description:
      "A future lane for AI workers, helper bodies, automation helpers, task bots, and service-specific digital staff.",
  },
  {
    name: "Auction / Resale System",
    status: "Future Build",
    type: "Asset Sales",
    description:
      "A future tracker for domains, resale items, digital assets, auction listings, business assets, and offer-ready inventory.",
  },
  {
    name: "Client Mini-Portals",
    status: "Future Upgrade",
    type: "Client Access",
    description:
      "Small client-specific areas for project status, uploads, payment notes, build requests, deliverables, and launch updates.",
  },
];

export default function MineLab({ onReturn }) {
  return (
    <main className="mine-lab-page">
      <section className="mine-lab-hero">
        <p className="mine-lab-kicker">Inside The Admiration Mine Integrator</p>
        <h1>Mine Lab</h1>
        <p>
          This is the beta shelf for future apps, experiments, service lanes,
          client tools, and founder systems being shaped inside Geniunaire
          MasterMinds.
        </p>
      </section>

      <section className="mine-lab-grid">
        {betaApps.map((app) => (
          <article className="mine-lab-card" key={app.name}>
            <div className="mine-lab-card-top">
              <span>{app.status}</span>
              <small>{app.type}</small>
            </div>

            <h2>{app.name}</h2>
            <p>{app.description}</p>

            <button type="button">Hold Beta Spot</button>
          </article>
        ))}
      </section>

      <section className="mine-lab-note">
        <h2>Secure your condo inside the Mine.</h2>
        <p>
          The Mine Lab is where future rooms get staged before they become full
          systems. The functional condo launches first. The mansion gets built
          room by room.
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
