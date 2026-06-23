import { useEffect, useState } from "react";
import "./LaunchReadiness.css";

const launchSections = [
  {
    title: "Front Page Protected",
    status: "Owner Review",
    description:
      "EntryGate stays protected. Gold mine visual direction, shimmer, rumble, purple, Tiffany blue, and owner-written messaging are not replaced without direct approval.",
    checks: [
      "Front page loads",
      "No accidental structure replacement",
      "ASPIRE access still works",
      "Public entry button still routes properly",
    ],
  },
  {
    title: "Access + Entry Flow",
    status: "Functional",
    description:
      "Visitors can enter a request/build-info path without hitting blank pages. Full role lock can be tightened later after the flow stays stable.",
    checks: [
      "Build info form appears",
      "Submit does not white-page",
      "ASPIRE opens owner/admin path",
      "Return buttons work",
    ],
  },
  {
    title: "Payment Doors",
    status: "Present",
    description:
      "Buyer-facing service doors exist for quotes, plans, payment provider slots, and main service categories.",
    checks: [
      "Payment Doors page opens",
      "Offer cards are visible",
      "Stripe/PayPal/Square slots noted",
      "Request quote/payment plan paths noted",
    ],
  },
  {
    title: "Client Intake Dashboard",
    status: "Present",
    description:
      "Clients can choose their build lane before the mansion-level version gets full database/client portal upgrades.",
    checks: [
      "Website Build lane",
      "Website Rescue lane",
      "Product Brand lane",
      "Dropshipping lane",
      "Adult Novelty lane",
      "Managed Launch lane",
    ],
  },
  {
    title: "Store Shelves",
    status: "Upload Ready",
    description:
      "Store-style shelves exist so product images, descriptions, prices, affiliate links, purchase links, ingredients, and use info can be uploaded later.",
    checks: [
      "Helper Storefront",
      "White Label Product Store",
      "E-Store",
      "Future novelty/dropship shelf noted",
    ],
  },
  {
    title: "Mine Lab",
    status: "Beta Shelf",
    description:
      "Future tools are visible as beta concepts inside the Mine without pretending they are fully built yet.",
    checks: [
      "Threaddy listed",
      "Mine Radio listed",
      "Dropshipping Builder listed",
      "AI Worker Rentals listed",
      "Client Mini-Portals listed",
    ],
  },
  {
    title: "Source + Sales Tracker",
    status: "Present",
    description:
      "Dropshipping, supplier, affiliate, auction/resale, adult novelty, and product shelf lanes exist as working placeholders.",
    checks: [
      "Supplier lane",
      "Dropshipping lane",
      "Adult novelty lane",
      "Auction/resale lane",
      "Affiliate lane",
    ],
  },
  {
    title: "Mobile + Preview Test",
    status: "Needs Review",
    description:
      "Before reconnecting the public domain, preview needs to be checked on phone/tablet for navigation, spacing, card stacking, and no blank routes.",
    checks: [
      "Mobile front page",
      "Mobile signup form",
      "Mobile payment cards",
      "Mobile client intake cards",
      "Mobile nav wrap",
    ],
  },
  {
    title: "Public Domain Safety",
    status: "Hold",
    description:
      "Keep the custom public domain disconnected until the access flow, payment doors, mobile view, and launch checklist are reviewed.",
    checks: [
      "IONOS preview tested",
      "Domain not public too early",
      "Payment links confirmed",
      "Owner approval before reconnect",
    ],
  },
];

export default function LaunchReadiness({ onReturn }) {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gm_launch_readiness") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("gm_launch_readiness", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const totalChecks = launchSections.reduce(
    (count, section) => count + section.checks.length,
    0
  );

  const completedChecks = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedChecks / totalChecks) * 100);

  function toggleCheck(key) {
    setCheckedItems((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <main className="launch-readiness-page">
      <section className="launch-readiness-hero">
        <p className="launch-readiness-kicker">Geniunaire MasterMinds</p>
        <h1>Launch Readiness</h1>
        <p>
          This is the functional condo checklist before the Mine gets public
          traffic. The goal is not mansion-perfect. The goal is stable, clear,
          clickable, payment-ready, and safe enough to move in.
        </p>

        <div className="launch-progress-wrap">
          <div className="launch-progress-top">
            <span>{completedChecks} / {totalChecks} checks complete</span>
            <strong>{progress}%</strong>
          </div>
          <div className="launch-progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <section className="launch-readiness-grid">
        {launchSections.map((section) => (
          <article className="launch-readiness-card" key={section.title}>
            <div className="launch-card-head">
              <span>{section.status}</span>
            </div>

            <h2>{section.title}</h2>
            <p>{section.description}</p>

            <div className="launch-checks">
              {section.checks.map((check) => {
                const key = `${section.title}-${check}`;

                return (
                  <label key={key} className="launch-check">
                    <input
                      type="checkbox"
                      checked={Boolean(checkedItems[key])}
                      onChange={() => toggleCheck(key)}
                    />
                    <span>{check}</span>
                  </label>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="launch-readiness-note">
        <h2>Secure your condo inside the Mine.</h2>
        <p>
          Launch means every working part is present and stable enough to use.
          Renovation comes after move-in. Public domain reconnect waits until
          this checklist feels safe.
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
