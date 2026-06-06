import "./EntryGate.css";

export default function EntryGate({
  onFounderAccess,
  onEnterMine,
  onRequestAccess,
  onLeadAccess,
}) {
  const handleEnterMine = () => {
    localStorage.setItem("gm_access_role", "lead");
    localStorage.setItem("gm_entry_status", "entered-mine");

    if (typeof onEnterMine === "function") {
      onEnterMine();
      return;
    }

    if (typeof onRequestAccess === "function") {
      onRequestAccess();
      return;
    }

    if (typeof onLeadAccess === "function") {
      onLeadAccess();
    }
  };

  const handleDreamAccess = () => {
    localStorage.setItem("gm_access_role", "admin");
    localStorage.setItem("gm_entry_status", "dream-founder");

    if (typeof onFounderAccess === "function") {
      onFounderAccess();
    }
  };

  return (
    <main className="entry-gate-page">
      <section className="entry-hero">
        <div className="entry-hero-glow entry-hero-glow-one" />
        <div className="entry-hero-glow entry-hero-glow-two" />

        <div className="entry-hero-content">
          <p className="entry-kicker">Geniunaire MasterMinds Presents</p>

          <h1>
            The Admiration
            <span> Funnel Mine</span>
          </h1>

          <p className="entry-lead">
            You have been admiring the idea long enough.
          </p>

          <p className="entry-statement">
            Step inside the Mine. This is where unfinished ideas, hidden
            products, scattered plans, half-built websites, and “one day”
            dreams get mined into real business diamonds.
          </p>

          <div className="entry-truth-strip">
            <span>We don’t do almost here.</span>
            <span>Enter the Mine.</span>
            <span>Build in the Cloud.</span>
          </div>

          <div className="entry-actions">
            <button className="entry-main-btn" onClick={handleEnterMine}>
              Enter The Mine
            </button>

            <button className="entry-dream-btn" onClick={handleDreamAccess}>
              DREAM Access
            </button>
          </div>

          <p className="entry-admin-note">
            DREAM Access is founder/admin only. Public visitors enter through
            the Mine.
          </p>
        </div>
      </section>

      <section className="entry-condo-grid">
        <article className="entry-condo-card">
          <p className="entry-card-label">01 / The Mine</p>
          <h2>Ideas Get Mined</h2>
          <p>
            Bring the idea, the product, the service, the messy notes, the
            half-built dream, or the “I might one day” plan. The Mine gives it a
            place to become visible.
          </p>
        </article>

        <article className="entry-condo-card">
          <p className="entry-card-label">02 / The Cloud</p>
          <h2>Build Space Before Big Space</h2>
          <p>
            The cloud is where the business can exist before the storefront,
            office, inventory room, team, or full system is ready.
          </p>
        </article>

        <article className="entry-condo-card">
          <p className="entry-card-label">03 / The Diamond</p>
          <h2>Function Before Fancy</h2>
          <p>
            This launch is the functional condo. The doors lock, the lights
            work, the shelves are ready, and the business can move in before the
            mansion renovation begins.
          </p>
        </article>
      </section>

      <section className="entry-path-panel">
        <div>
          <p className="entry-kicker">Inside The Mine</p>
          <h2>Pick a path. Bring the material. Let’s make it make sense.</h2>
        </div>

        <div className="entry-path-list">
          <span>Website Rescue</span>
          <span>Product Brand Build</span>
          <span>Digital Product Launch</span>
          <span>Dropshipping Setup</span>
          <span>Robot Worker Setup</span>
          <span>Domain + Hosting Help</span>
          <span>Promo Campaign Build</span>
          <span>Managed Launch Support</span>
        </div>
      </section>
    </main>
  );
}
