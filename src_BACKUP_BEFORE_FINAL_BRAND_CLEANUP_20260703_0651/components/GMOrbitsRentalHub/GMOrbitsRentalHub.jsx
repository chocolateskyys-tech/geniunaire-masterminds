import React, { useMemo, useState } from "react";
import "./GMOrbitsRentalHub.css";

const brandStack = [
  {
    title: "GM E-TV Network",
    detail: "The branded streaming, avatar, product, club, campus, sports, and broadcast network inside Geniunaire MasterMinds.",
  },
  {
    title: "GM E-TV Store",
    detail: "Where customers buy passes, streams, e-products, monthly activations, avatar time, and product network access.",
  },
  {
    title: "GM E-TV Lounge",
    detail: "Where viewers, guests, avatars, club customers, dorm users, home viewers, and promo audiences hang out.",
  },
  {
    title: "GM StarPlay Studios",
    detail: "Where shows, promos, CheerFrames, creator reels, orbit displays, and avatar media get made.",
  },
  {
    title: "GM Broadcasting & Productions",
    detail: "The official media side for filming, streaming, interviews, promos, channels, and E-TV packages.",
  },
  {
    title: "GM AiALITY Casting",
    detail: "The casting division for talent, casting avatars, approvals, appearance access, and E-TV-ready performers.",
  },
];

const orbitDisplays = [
  {
    name: "Cast Orbits",
    badge: "GM AiALITY Casting",
    purpose: "For dancers, DJs, performers, promo talent, E-TV approved people, and casting clients.",
    looks: ["Performer", "DJ", "Promo Talent", "Host"],
    network: "GM E-TV Casting Stream",
  },
  {
    name: "Park Orbits",
    badge: "GM Park Helpers",
    purpose: "For greeters, ticket booth helpers, front gate guides, plaza hosts, and ride helpers.",
    looks: ["Gate Guide", "Ticket Booth", "Ride Helper", "Park Host"],
    network: "GM E-TV Basic Stream",
  },
  {
    name: "Niche Orbits",
    badge: "Business / Creator Display",
    purpose: "For beauty, books, wellness, real estate, restaurants, clubs, sports, creators, and specialty shops.",
    looks: ["Beauty", "Books", "Wellness", "Sports"],
    network: "GM E-TV Business Stream",
  },
  {
    name: "Job Orbits",
    badge: "Dressed By Job",
    purpose: "For waitresses, bartenders, bar backs, security, hookah managers, support, sales, and host roles.",
    looks: ["Waitress", "Bartender", "Security", "Host"],
    network: "GM E-TV Club / Staff Stream",
  },
  {
    name: "Holiday Orbits",
    badge: "Seasonal Display Rentals",
    purpose: "For Christmas, Valentine, Halloween, birthday, New Year, launch parties, and themed promo rooms.",
    looks: ["Christmas", "Valentine", "Halloween", "Birthday"],
    network: "GM E-TV Product Stream",
  },
  {
    name: "Sports Orbits",
    badge: "GM E-TV Sports World",
    purpose: "For game nights, fight nights, fan rooms, sports watch parties, teams, and sports promo rooms.",
    looks: ["Game Day", "Fight Night", "Fan Room", "Tailgate"],
    network: "GM E-TV Sports World",
  },
  {
    name: "Cheer Orbits",
    badge: "CheerFrame / Hype Display",
    purpose: "For CheerFrames, school spirit, launch cheerleaders, promo hype bots, and student creator displays.",
    looks: ["CheerFrame", "Campus Spirit", "Launch Hype", "Promo Cheer"],
    network: "GM E-TV Creator Stream",
  },
];

const etvCategories = [
  ["GM E-TV Basic Product Stream", "$9.99/mo", "E-books, guides, PDFs, small e-products, downloads, and live links."],
  ["GM E-TV Business Stream", "$19.99/mo", "E-businesses, service pages, e-stores, mini-sites, promo pages."],
  ["GM E-TV Creator / Thread Set Stream", "$29.99/mo", "Thread Set, NextGen, E-Folio, E-Brochure, CheerFrame, creator rooms."],
  ["GM E-TV Club / Nightlife Stream", "$49.99/mo", "Club streaming, PCOA TV, owner streaming package, worker list, staff helper access."],
  ["GM E-TV Casting Stream", "$29.99/mo", "Dancers, DJs, performers, casting clients, avatar reels, talent promos."],
  ["GM E-TV Home Stream", "$9.99/mo", "Home TV, living room viewers, Comcast-style viewing, E-TV home access."],
  ["GM E-TV Campus Network", "$9.99/mo", "DormMageddon, college TV, dorm watch rooms, campus creator channels."],
  ["GM E-TV Sports World", "$29.99/mo+", "Games, fights, sports rooms, club watch parties, fan avatars, official viewing links."],
  ["GM E-TV Chix Flix Nation", "$19.99/mo+", "Girls night, date night, cozy rooms, drama recaps, Bun Bun Room, lifestyle promos."],
  ["GM E-TV Pro Channel", "$49.99/mo", "Multiple products, multiple rooms, heavier promotion, multi-display customers."],
  ["GM E-TV Partner Channel", "$99/mo+", "Franchise, partner, operator, large club, business, or branch channel."],
];

const accessRules = [
  {
    title: "$5 Hour Machine / Day Pass",
    rule: "Customers and party guests get the same roaming guest avatar, same pool, same park, same extension pop-up.",
  },
  {
    title: "GM E-TV Staff Helper Avatar",
    rule: "Waitresses, servers, bartenders, bar backs, hookah managers, and security get limited helper avatars only after owner approval.",
  },
  {
    title: "GM AiALITY Casting Avatar",
    rule: "Dancers, DJs, performers, promo talent, E-TV approved clients, and casting clients get casting avatars.",
  },
  {
    title: "Owner First Rule",
    rule: "Club owner must have an active GM E-TV Club Streaming Package before workers can receive staff avatar access.",
  },
  {
    title: "E-Store Monthly Rule",
    rule: "Anything bought from any GM e-store that needs to stay live, displayed, streamed, promoted, or working goes through GM E-TV monthly.",
  },
];

const sourceLanes = [
  "Regular Park Guest",
  "Club Referral Guest",
  "Dorm / Student User",
  "Streaming / Home TV Customer",
  "E-Book / E-Product Client",
  "GM E-TV Client",
  "GM AiALITY Casting Client",
  "GM E-TV Staff Helper",
  "Club Owner / Streaming Partner",
  "Affiliate / Promo Referral",
];

const stripeChecklist = [
  ["GM Founder Access Pass", "$49", "One-time"],
  ["Wild Push Setup Ticket", "$97", "One-time"],
  ["Thread Set / E-Folio Preorder", "$197", "One-time"],
  ["Monthly Guest Pass Parking Bot", "$19.99/mo", "Subscription"],
  ["VIP Guest Pass Valet Pass", "$49.99/mo", "Subscription"],
  ["Customer Day Pass / $5 Hour Machine", "$5", "One-time"],
  ["Club Staff Avatar Demo Pack", "$15", "One-time / verified staff only"],
  ["Club Staff Team Demo Pack", "$49", "One-time / up to 5 approved workers"],
  ["GM E-TV Basic Product Stream", "$9.99/mo", "Subscription"],
  ["GM E-TV Business Stream", "$19.99/mo", "Subscription"],
  ["GM E-TV Creator Stream", "$29.99/mo", "Subscription"],
  ["GM E-TV Club Stream", "$49.99/mo", "Subscription"],
  ["GM E-TV Casting Stream", "$29.99/mo", "Subscription"],
  ["GM E-TV Sports World", "$29.99/mo", "Subscription"],
  ["GM E-TV Chix Flix Nation", "$19.99/mo", "Subscription"],
  ["GM E-TV Campus Network", "$9.99/mo", "Subscription"],
  ["GM E-TV Pro Channel", "$49.99/mo", "Subscription"],
  ["GM E-TV Partner Channel", "$99/mo", "Subscription"],
];

function GMMonogram() {
  return (
    <div className="gm-orbits-monogram" aria-hidden="true">
      <span>GM</span>
      <small>AiALITY</small>
    </div>
  );
}

export default function GMOrbitsRentalHub() {
  const [selectedOrbit, setSelectedOrbit] = useState(orbitDisplays[0]);
  const [selectedLane, setSelectedLane] = useState(sourceLanes[0]);

  const activeSummary = useMemo(() => {
    return `${selectedOrbit.name} assigned to ${selectedLane} through ${selectedOrbit.network}.`;
  }, [selectedOrbit, selectedLane]);

  return (
    <section className="gm-orbits-hub" id="gm-orbits">
      <div className="gm-orbits-hero">
        <div>
          <p className="gm-orbits-kicker">Geniunaire MasterMinds Attraction</p>
          <h1>GM Orbits</h1>
          <h2>AI &amp; AiALITY Display Rental Hub</h2>
          <p>
            A walk-in storefront attraction where guests browse, rent, dress, activate,
            and send GM Orbits into GM E-TV, GM AiALITY Casting, clubs, stores, sports rooms,
            Chix Flix Nation, campus streams, CheerFrames, and promo spaces.
          </p>
        </div>
        <GMMonogram />
      </div>

      <div className="gm-orbits-brand-grid">
        {brandStack.map((item) => (
          <article key={item.title} className="gm-orbits-brand-card">
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="gm-orbits-section-head">
        <p className="gm-orbits-kicker">Walk-In Storefront Rule</p>
        <h2>Not pages. Places.</h2>
        <p>
          Every major GM feature should feel like a storefront, plaza, lounge, studio,
          booth, rental desk, casting room, broadcast room, shop, or control room inside the park.
        </p>
      </div>

      <div className="gm-orbits-layout">
        <aside className="gm-orbits-menu">
          <h3>Helper Store Showroom</h3>
          <p>Browse the cute display setup by purpose, job, season, niche, or E-TV world.</p>
          {orbitDisplays.map((orbit) => (
            <button
              key={orbit.name}
              className={selectedOrbit.name === orbit.name ? "active" : ""}
              onClick={() => setSelectedOrbit(orbit)}
              type="button"
            >
              <strong>{orbit.name}</strong>
              <span>{orbit.badge}</span>
            </button>
          ))}
        </aside>

        <main className="gm-orbits-display">
          <div className="gm-orbits-display-top">
            <div>
              <p className="gm-orbits-kicker">{selectedOrbit.badge}</p>
              <h2>{selectedOrbit.name}</h2>
              <p>{selectedOrbit.purpose}</p>
            </div>
            <div className="gm-orbits-network-chip">{selectedOrbit.network}</div>
          </div>

          <div className="gm-orbits-stalls">
            {selectedOrbit.looks.map((look, index) => (
              <article key={look} className="gm-orbit-stall">
                <div className="gm-orbit-stall-door">
                  <span>GM</span>
                  <small>MONOGRAM STALL {index + 1}</small>
                </div>
                <h3>{look} Orbit</h3>
                <p>Dressing room stall with GM monogram logo walls, role styling, and display-ready activation.</p>
                <button type="button">Dress This Orbit</button>
              </article>
            ))}
          </div>

          <div className="gm-orbits-tracker">
            <div>
              <h3>Source Lane Tracker</h3>
              <p>
                Same avatar pool. Same park. Same extension pop-up. Different invisible tracking tag.
              </p>
            </div>
            <select value={selectedLane} onChange={(e) => setSelectedLane(e.target.value)}>
              {sourceLanes.map((lane) => (
                <option key={lane}>{lane}</option>
              ))}
            </select>
            <strong>{activeSummary}</strong>
          </div>
        </main>
      </div>

      <div className="gm-orbits-section-head">
        <p className="gm-orbits-kicker">GM E-TV Network</p>
        <h2>Branded streaming categories</h2>
        <p>
          Anything purchased from any GM e-store that needs to stay live, displayed, streamed,
          promoted, connected, animated, or working uses the correct GM E-TV monthly category.
        </p>
      </div>

      <div className="gm-orbits-category-grid">
        {etvCategories.map(([name, price, detail]) => (
          <article key={name} className="gm-orbits-category-card">
            <h3>{name}</h3>
            <strong>{price}</strong>
            <p>{detail}</p>
          </article>
        ))}
      </div>

      <div className="gm-orbits-rules-grid">
        {accessRules.map((item) => (
          <article key={item.title} className="gm-orbits-rule-card">
            <h3>{item.title}</h3>
            <p>{item.rule}</p>
          </article>
        ))}
      </div>

      <div className="gm-orbits-warning">
        <h3>Sports + Chix Flix Safety Rule</h3>
        <p>
          GM E-TV Sports World and GM E-TV Chix Flix Nation do not illegally host games,
          fights, movies, or shows. They offer watch rooms, official viewing links, approved content,
          creator showcases, promos, avatar rooms, club/campus/home viewing lanes, and event passes.
        </p>
      </div>

      <div className="gm-orbits-stripe">
        <div>
          <p className="gm-orbits-kicker">Stripe Build List</p>
          <h2>Create Payment Links Only</h2>
          <p>
            Copy only public <strong>https://buy.stripe.com</strong> links. No API keys. No secret keys.
            No Cloud Run. No old PCOA bash.
          </p>
        </div>

        <div className="gm-orbits-stripe-list">
          {stripeChecklist.map(([name, price, type]) => (
            <div key={name} className="gm-orbits-stripe-item">
              <span>{name}</span>
              <strong>{price}</strong>
              <small>{type}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
