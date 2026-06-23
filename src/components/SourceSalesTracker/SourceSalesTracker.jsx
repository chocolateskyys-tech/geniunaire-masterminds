import "./SourceSalesTracker.css";

const trackerLanes = [
  {
    title: "Dropshipping Store Builds",
    label: "Store Lane",
    description:
      "Track dropshipping store ideas, supplier notes, product categories, build status, product shelves, and launch readiness.",
    items: ["Store niche", "Supplier/source", "Product shelf", "Checkout path"],
  },
  {
    title: "Sellvia / Supplier Sources",
    label: "Supplier Lane",
    description:
      "Keep supplier links, source notes, product collections, shipping notes, wholesale details, and platform reminders in one place.",
    items: ["Supplier link", "Product category", "Shipping notes", "Source status"],
  },
  {
    title: "Adult Novelty Link Store",
    label: "Private Specialty Lane",
    description:
      "Organize Play Day Pantry style adult novelty products, affiliate links, dropship items, toy categories, supplier notes, and adult-only shelf rules.",
    items: ["Product link", "Adult-only flag", "Affiliate link", "Purchase link"],
  },
  {
    title: "Auction / Resale Assets",
    label: "Sale Asset Lane",
    description:
      "Track domains, products, digital assets, resale items, auction listings, bundle ideas, and offer packaging for future sale paths.",
    items: ["Asset name", "Listing platform", "Starting price", "Status"],
  },
  {
    title: "Affiliate Product Tracker",
    label: "Affiliate Lane",
    description:
      "Save affiliate products, commission links, promo notes, product descriptions, content angles, and campaign ideas.",
    items: ["Affiliate link", "Commission note", "Promo angle", "Campaign status"],
  },
  {
    title: "Product Shelf Prep",
    label: "Shelf Lane",
    description:
      "Prepare products before they move into the Helper Storefront, White Label Product Store, E-Store, or specialty dropship shelves.",
    items: ["Image needed", "Description", "Price", "Shelf destination"],
  },
];

export default function SourceSalesTracker({ onReturn }) {
  function saveLane(lane) {
    const record = {
      selectedLane: lane.title,
      selectedAt: new Date().toISOString(),
      status: "source-sales-lane-selected",
    };

    localStorage.setItem("gm_selected_source_sales_lane", JSON.stringify(record));
    alert(`${lane.title} selected. Next upgrade: detailed source/sales intake.`);
  }

  return (
    <main className="source-sales-page">
      <section className="source-sales-hero">
        <p className="source-sales-kicker">Admiration Mine Integrator</p>
        <h1>Source + Sales Tracker</h1>
        <p>
          This room holds the product sourcing, dropshipping, adult novelty,
          affiliate, auction, resale, and supplier lanes before they become full
          systems.
        </p>
      </section>

      <section className="source-sales-grid">
        {trackerLanes.map((lane) => (
          <article className="source-sales-card" key={lane.title}>
            <div className="source-sales-card-head">
              <span>{lane.label}</span>
            </div>

            <h2>{lane.title}</h2>
            <p>{lane.description}</p>

            <div className="source-sales-mini-list">
              {lane.items.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>

            <button type="button" onClick={() => saveLane(lane)}>
              Open Lane
            </button>
          </article>
        ))}
      </section>

      <section className="source-sales-note">
        <h2>Working part present. Mansion version later.</h2>
        <p>
          For launch, this room proves the source/sales lanes exist. Later, each
          lane can become a real database with supplier records, product uploads,
          affiliate buttons, purchase links, status tracking, and client-facing
          filtered views.
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
