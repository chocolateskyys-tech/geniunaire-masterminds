import "./ClientIntakeDashboard.css";

const clientPaths = [
  {
    title: "Website Build",
    tag: "New Build",
    description:
      "Start a new website, landing page, funnel page, service page, or public-facing business home from scratch.",
    action: "Start Website Build",
  },
  {
    title: "Website Rescue",
    tag: "Fix / Restore",
    description:
      "Bring in a broken, confusing, unfinished, outdated, or half-built website that needs cleanup, repair, or relaunch help.",
    action: "Start Website Rescue",
  },
  {
    title: "Product Brand",
    tag: "Product Setup",
    description:
      "Turn a product, white label item, private label offer, physical item, or product idea into a branded sales-ready offer.",
    action: "Build Product Brand",
  },
  {
    title: "Dropshipping Store",
    tag: "Store Build",
    description:
      "Create a store path for dropshipping, supplier products, Sellvia-style products, affiliate products, or curated product shelves.",
    action: "Start Store Path",
  },
  {
    title: "Adult Novelty Link Store",
    tag: "Specialty Store",
    description:
      "Build or organize an adult novelty, toy, affiliate, or dropshipping product link store with private admin-managed product shelves.",
    action: "Start Novelty Store Path",
  },
  {
    title: "Helper Worker Setup",
    tag: "AI Worker",
    description:
      "Request AI workers, bot helpers, task assistants, automation helpers, or future helper body selections for your build system.",
    action: "Request Helper Setup",
  },
  {
    title: "Domain / Hosting",
    tag: "Launch Setup",
    description:
      "Get help with domains, hosting, deployment, redirects, GitHub, IONOS, DNS, or launch readiness cleanup.",
    action: "Check Domain Setup",
  },
  {
    title: "Digital Product",
    tag: "Downloads",
    description:
      "Package ebooks, templates, workbooks, guides, mini-courses, PDFs, swipe files, or downloadable offers.",
    action: "Launch Digital Product",
  },
  {
    title: "Promo Campaign",
    tag: "Marketing",
    description:
      "Request launch copy, flyers, social posts, offer cards, teaser campaigns, promo graphics, or campaign structure.",
    action: "Build Promo Campaign",
  },
  {
    title: "Auction / Sale Asset",
    tag: "Resale",
    description:
      "Prepare a product, domain, digital asset, business asset, or resale item for listing, sale, auction, or offer packaging.",
    action: "List My Asset",
  },
  {
    title: "Managed Launch Support",
    tag: "Guided Build",
    description:
      "Get hands-on guidance for organizing, pricing, building, launching, and moving through the Mine without doing it alone.",
    action: "Request Managed Support",
  },
];

export default function ClientIntakeDashboard({ onReturn }) {
  function saveClientPath(path) {
    const record = {
      selectedPath: path.title,
      tag: path.tag,
      selectedAt: new Date().toISOString(),
      status: "client-path-selected",
    };

    localStorage.setItem("gm_selected_client_path", JSON.stringify(record));
    alert(`${path.title} selected. Next step: intake details and payment path.`);
  }

  return (
    <main className="client-intake-page">
      <section className="client-intake-hero">
        <p className="client-intake-kicker">Admiration Mine Integrator</p>
        <h1>Choose Your Build Path</h1>
        <p>
          Pick the path that matches what you are bringing into the Mine. This
          does not have to be perfect yet. The goal is to get your idea, product,
          site, store, or service into the right lane.
        </p>
      </section>

      <section className="client-path-grid">
        {clientPaths.map((path) => (
          <article className="client-path-card" key={path.title}>
            <p className="client-path-tag">{path.tag}</p>
            <h2>{path.title}</h2>
            <p>{path.description}</p>
            <button type="button" onClick={() => saveClientPath(path)}>
              {path.action}
            </button>
          </article>
        ))}
      </section>

      <section className="client-intake-note">
        <h2>Secure your condo inside the Mine.</h2>
        <p>
          You do not need the whole mansion to start. You need a functional
          space your idea can move into. Choose the build path now, then we
          renovate toward the bigger system.
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
