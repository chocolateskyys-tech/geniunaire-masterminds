import React, { useMemo, useState } from "react";
import "./GMRecoveryPark.css";

const ACCESS_HASHES = {
  owner: "057662375775b172ecd63527747b33c96c481eed4a97118924c5a81d92fb30d7",
  frontGatePlay: "d739e382656660c4c8e470a25a2aad7943a7d5a9513286f0caf87141e6992943",
  kadenAdmin: "7bbd65de388a0f822c238d921d34fc26bd8bd2db88d527b7cc3a7a5b79d4b2c5",
  kadenPlay: "4c43bc0de7f6da64db30bd2363966c0b36b2b1ce7b61d54bf1019ffa01a64514",
  poolBarPartner: ""
};

const attractions = [
  ["front", "Front Gate"],
  ["parking", "GM RIDZ Lot"],
  ["pool", "PCOA Pool"],
  ["pool-bar", "Pool Bar"],
  ["orbits", "GM Orbits"],
  ["etv", "GM E-TV"],
  ["threadfolio", "ThreadFolio Glow"],
  ["dorm", "DormMageddon House"],
  ["kiddie", "Kiddie Land Shell"]
];

const driverTags = Array.from({ length: 16 }, (_, index) => {
  return `GMPark RIDEZ ${String(index + 1).padStart(2, "0")}`;
});

const orbitDisplays = [
  {
    title: "Cast Orbits",
    badge: "GM AiALITY Casting",
    use: "Dancers, DJs, performers, promo talent, E-TV approved talent, and casting clients.",
    looks: ["Host Orbit", "Performer Orbit", "DJ Orbit", "Promo Orbit"]
  },
  {
    title: "Park Orbits",
    badge: "GM Park Crew",
    use: "Greeters, ticket helpers, front gate guides, plaza hosts, pool support, and attraction workers.",
    looks: ["Gate Orbit", "Ticket Orbit", "Pool Orbit", "Lounge Orbit"]
  },
  {
    title: "Niche Orbits",
    badge: "Business / Creator Displays",
    use: "Beauty, books, wellness, restaurants, nightlife, real estate, sports, creators, and specialty shops.",
    looks: ["Beauty Orbit", "Book Orbit", "Wellness Orbit", "Sports Orbit"]
  },
  {
    title: "Job Orbits",
    badge: "Dressed By Role",
    use: "Waitresses, bartenders, bar backs, security, hookah managers, support workers, sales, and hosts.",
    looks: ["Waitress Orbit", "Bartender Orbit", "Security Orbit", "Host Orbit"]
  },
  {
    title: "Seasonal Orbits",
    badge: "Seasonal Display Rentals",
    use: "Holiday campaigns, launch parties, birthdays, team events, club nights, and themed promo displays.",
    looks: ["Holiday Orbit", "Launch Orbit", "Birthday Orbit", "Event Orbit"]
  },
  {
    title: "Team Orbits",
    badge: "Group / Crew Rentals",
    use: "Team displays, worker crews, club staff packs, campus groups, and branded attraction teams.",
    looks: ["Team Lead Orbit", "Crew Orbit", "Brand Orbit", "Hype Orbit"]
  }
];

const etvModels = [
  ["Pocket Signal", "Starter viewing and previews."],
  ["DormScreen Book", "DormMageddon student founder features."],
  ["RiftView", "AI’ALITY viewing and living-book drops."],
  ["CastWire", "Casting, voice chamber, writer room, actor room."],
  ["BotBox Book", "Business workers, training panels, and service support."],
  ["DiamondFrame", "Premium drops and upgraded screen experiences."],
  ["Broadcast Bible", "Live rooms, classes, interviews, watch parties."],
  ["VaultScreen", "Replays, archives, saved courses, licensed drops."],
  ["GhostSignal", "Private founder, admin, and beta drops."]
];

const threadfolioSet = [
  ["ThreadFolio", "Thread-to-product business recovery and build package."],
  ["Glow", "Visual promo glow-up layer for public display."],
  ["E-Folio", "Business proof, offer, client handoff, and brand presentation."],
  ["E-Map", "Park/path routing for where the offer lives inside GM."],
  ["E-Brochure", "Public-facing promo and sales explanation."],
  ["CheerFrame", "Live/picture-to-performance promo attraction."],
  ["NextGen Set", "Student/family branch with approval lanes and future unlocks."]
];

const lifeguardRoles = [
  "PCOA Pool Safety check",
  "Orbit pool entry monitor",
  "VIP cabana watcher",
  "Pool color effect control",
  "21+ flow enforcement",
  "Live crowd safety",
  "Bar/lounge pool boundary watch",
  "GM E-TV screen crowd support"
];

const workerDeals = [
  ["Club Customer Day Pass", "Sit down, sign up, enter the TV virtually, explore Pool Bar / E-TV / Casting lanes."],
  ["Club Worker Verification", "Worker status verified through club owner signup process before staff lanes unlock."],
  ["Staff Helper Access", "Approved workers only: waitresses, bartenders, bar backs, hookah, security, hosts."],
  ["Owner Streaming Package", "Club owner must activate the correct GM E-TV Club/Nightlife stream first."],
  ["Casting Upgrade", "Performers route through Casting for stage, voice, promo, live show, and E-TV placement."]
];

const poolColors = [
  { name: "Gemini Purple", className: "pool-purple" },
  { name: "PCOA Gold", className: "pool-gold" },
  { name: "Neon Pink", className: "pool-pink" },
  { name: "Aqua Signal", className: "pool-aqua" },
  { name: "Bass Pulse", className: "pool-bass" }
];

const roomCards = [
  ["GM E-TV Store", "Choose your model. Wire your signal. Enter the programming."],
  ["Signal Plans", "Basic, Creator, Production, Bot, Broadcast, Diamond, and private founder signals."],
  ["Wired Rooms", "Each model unlocks compatible rooms, drops, screens, workers, and broadcast areas."],
  ["E-TV Lounge", "Your signal lives here: My E-TV, signal status, unlocked programming, scheduled drops."],
  ["AI’ALITY Casting", "Voice, acting, writer, animator, promo host, and student founder casting lanes."],
  ["Programming Console", "Assign drops, rooms, commercial breaks, affiliate links, memory, schedule, and access."]
];

async function sha256(text) {
  const clean = text.trim();
  const data = new TextEncoder().encode(clean);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function GMRecoveryPark() {
  const [active, setActive] = useState("front");
  const [gateOpen, setGateOpen] = useState(false);
  const [status, setStatus] = useState("Front Gate ready. Choose an attraction or use secure access.");
  const [access, setAccess] = useState({
    owner: "",
    frontGatePlay: "",
    kadenAdmin: "",
    kadenPlay: "",
    poolBarPartner: ""
  });
  const [selectedOrbit, setSelectedOrbit] = useState(orbitDisplays[0]);
  const [poolEffect, setPoolEffect] = useState(poolColors[0]);
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    pass: "GM $5 Hour Machine Day Pass"
  });
  const [spotlight, setSpotlight] = useState("Standard Gate Flow");

  const activeDriver = useMemo(() => {
    return driverTags[Math.floor(Math.random() * driverTags.length)];
  }, [spotlight]);

  const openAttraction = (id) => {
    setActive(id);
    setStatus(`Opened attraction: ${attractions.find((item) => item[0] === id)?.[1] || id}.`);
  };

  const checkAccess = async (key, nextArea, successText) => {
    if (!ACCESS_HASHES[key]) {
      setStatus("Pool Bar partner code is waiting for the final private code hash. Button is in place.");
      return;
    }

    const enteredHash = await sha256(access[key] || "");
    if (enteredHash === ACCESS_HASHES[key]) {
      setActive(nextArea);
      setGateOpen(true);
      setStatus(successText);
    } else {
      setStatus("Secure access denied.");
    }
  };

  const submitGuest = () => {
    if (!guest.name.trim() || !guest.email.trim()) {
      setStatus("Guest check-in needs name and email before access opens.");
      return;
    }

    localStorage.setItem("gm_guest_checkin", JSON.stringify({
      ...guest,
      createdAt: new Date().toISOString()
    }));

    setGateOpen(true);
    setActive("parking");
    setStatus(`${guest.pass} check-in saved. Parking lot / GM RIDZ opened.`);
  };

  const activatePool = (effect) => {
    setPoolEffect(effect);
    setStatus(`Orbit jumped into PCOA Pool. ${effect.name} activated.`);
  };

  return (
    <main className="gm-recovery">
      <header className="gm-topbar">
        <div className="gm-brand-lockup">
          <span className="gm-crest">GM</span>
          <div>
            <h1>Geniunaire MasterMinds</h1>
            <p>Virtual Theme Park — Atlanta, GA</p>
          </div>
        </div>

        <nav className="gm-attraction-nav">
          {attractions.map(([id, label]) => (
            <button key={id} onClick={() => openAttraction(id)} className={active === id ? "active" : ""}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <section className="gm-status-strip">
        <span>{status}</span>
        <strong>Current: {attractions.find((item) => item[0] === active)?.[1] || active}</strong>
      </section>

      {active === "front" && (
        <section className="gm-front-experience">
          <div className="front-visual-frame">
            <img
              src="/assets/gm-front-gate-final.png"
              alt="Geniunaire MasterMinds finalized front gate"
              className="front-gate-image"
            />

            <div className="front-fallback">
              <h2>GENIUNAIRE MASTERMINDS</h2>
              <p>VIRTUAL THEME PARK</p>
              <span>ATLANTA, GA</span>
            </div>

            <div className="purple-theme-title">VIRTUAL THEME PARK</div>

            <div className="orbit-cover orbit-title">
              <strong>ORBIT RENTAL</strong>
              <span>Bring your virtual self to life.</span>
            </div>

            <div className="orbit-cover orbit-machine-title">
              MINI ORBIT MACHINE
            </div>

            <div className="orbit-cover orbit-picker">
              <strong>CHOOSE YOUR ORBIT</strong>
              <span>1-HOUR</span>
              <span>DAY PASS</span>
              <span>MONTHLY PASS</span>
            </div>

            <div className="adult-orbit-machine">
              <div className="orbit-person-row">
                <span />
                <span />
                <span />
              </div>
              <strong>18+ ADULT ORBITS</strong>
              <small>All nationalities • GM styled • No minors</small>
            </div>

            <div className="orbit-cover orbit-side-sign">
              <strong>YOUR ORBIT.</strong>
              <strong>YOUR STYLE.</strong>
              <strong>YOUR WORLD.</strong>
            </div>

            <div className="orbit-cover orbit-line-label">
              ORBIT RENTAL LINE STARTS HERE
            </div>

            <div className={`gate-glow ${gateOpen ? "open" : ""}`} />
          </div>

          <section className="front-actions-grid">
            <article className="gate-card">
              <p className="kicker">Guest Check-In</p>
              <h2>Choose Your Experience</h2>
              <input placeholder="Name / Stage Name" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} />
              <input placeholder="Email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} />
              <select value={guest.pass} onChange={(e) => setGuest({ ...guest, pass: e.target.value })}>
                <option>GM $5 Hour Machine Day Pass</option>
                <option>Orbit Rental Day Pass</option>
                <option>GM RIDZ Parking Lot Pass</option>
                <option>Pool Bar Day Pass</option>
                <option>GM E-TV Casting Pass</option>
              </select>
              <button onClick={submitGuest}>Check In / Enter GM</button>
            </article>

            <article className="gate-card secure-card">
              <p className="kicker">Secure Access</p>
              <h2>Control Buttons</h2>

              <label>Owner Admin</label>
              <input type="password" placeholder="Owner code" value={access.owner} onChange={(e) => setAccess({ ...access, owner: e.target.value })} />
              <button onClick={() => checkAccess("owner", "owner-admin", "Owner Admin opened.")}>Open Owner Admin</button>

              <label>Front Gate Play</label>
              <input type="password" placeholder="Front gate play code" value={access.frontGatePlay} onChange={(e) => setAccess({ ...access, frontGatePlay: e.target.value })} />
              <button onClick={() => checkAccess("frontGatePlay", "front-gate-play", "Front Gate Play Console opened.")}>Open Front Gate Play</button>

              <label>Pool Bar Partner Control</label>
              <input type="password" placeholder="Pool Bar partner code" value={access.poolBarPartner} onChange={(e) => setAccess({ ...access, poolBarPartner: e.target.value })} />
              <button onClick={() => checkAccess("poolBarPartner", "pool-bar-control", "Pool Bar partner control opened.")}>Open Pool Bar Control</button>
            </article>
          </section>
        </section>
      )}

      {active === "front-gate-play" && (
        <section className="gm-room control-room">
          <p className="kicker">Front Gate Play Console</p>
          <h2>Play With The Live Front Gate</h2>
          <div className="control-grid">
            {["Open Gate", "Close Gate", "Parking Lot Rush", "Gold Mine Glow", "Guest Spotlight", "VIP Rope Glow"].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setSpotlight(mode);
                  setGateOpen(mode !== "Close Gate");
                  setStatus(`${mode} activated.`);
                }}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="live-panel">
            <strong>Mode: {spotlight}</strong>
            <span>Active driver tag: {activeDriver}</span>
          </div>
        </section>
      )}

      {active === "parking" && (
        <section className="gm-room parking-attraction">
          <p className="kicker">Paid Virtual Parking Attraction</p>
          <h2>GM RIDZ Parking Lot</h2>
          <p>Landscaped parking lot under the front gate with refreshment stands, golf cart booth, tables, user car areas, driver flow, and virtual park interaction.</p>

          <div className="parking-scene">
            <div className="lot-stand refreshment">Refreshment Stand</div>
            <div className="lot-stand golf">Golf Cart Booth</div>
            <div className="lot-stand tables">Tables / Sit Down Signup</div>
            <div className="lot-stand dropoff">Golf Cart Drop-Off</div>

            {driverTags.map((tag, index) => (
              <div key={tag} className={`ridez-car car-${(index % 8) + 1}`}>
                <span>{tag}</span>
              </div>
            ))}
          </div>

          <div className="card-grid">
            <article>
              <h3>Lot Pass Logic</h3>
              <p>Until user-owned lot/orbit passes activate, cars ride the lot using driver tags only.</p>
            </article>
            <article>
              <h3>Future Ride Merge</h3>
              <p>Reserved for the real Uber-style ride company/app merge after launch wiring is stable.</p>
            </article>
            <article>
              <h3>Club Customer Entry</h3>
              <p>Customers can sit down, sign up, get a day pass, and virtually enter the TV experience.</p>
            </article>
          </div>
        </section>
      )}

      {active === "pool" && (
        <section className={`gm-room pool-area ${poolEffect.className}`}>
          <p className="kicker">PCOA Pool Area</p>
          <h2>GM Empire Pool</h2>
          <p>Powered by PCOA • Rooted in Gemini. Orbits jump into the pool and trigger live color effects.</p>

          <div className="pool-logo-frame">
            <img src="/assets/gm-pcoa-pool-logo-final.png" alt="GM Empire PCOA Gemini pool logo" />
            <div className="pool-water-glow" />
            <button className="orbit-jump" onClick={() => activatePool(poolColors[(poolColors.indexOf(poolEffect) + 1) % poolColors.length])}>
              Orbit Jump
            </button>
          </div>

          <div className="pool-controls">
            {poolColors.map((effect) => (
              <button key={effect.name} onClick={() => activatePool(effect)}>
                {effect.name}
              </button>
            ))}
          </div>

          <div className="card-grid">
            {lifeguardRoles.map((role) => (
              <article key={role}>
                <h3>{role}</h3>
                <p>PCOA safety lane connected to pool access, Orbit movement, and Pool Bar flow.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "pool-bar" && (
        <section className="gm-room poolbar-room">
          <p className="kicker">Sponsored by Party Crashers of Atlanta</p>
          <h2>NightOwl Hideout Pool Bar</h2>
          <p>Poolside bar/lounge with a huge GM E-TV screen over the bar, live performance stage through Casting, club TV streaming control, and worker verification lanes.</p>

          <div className="poolbar-stage">
            <div className="huge-screen">
              <strong>GM E-TV LIVE SCREEN</strong>
              <span>Streaming • Casting • Performances • Club TV Control</span>
            </div>
            <div className="bar-counter">Pool Bar</div>
            <div className="performance-stage">Live Performance Stage</div>
          </div>

          <div className="card-grid">
            {workerDeals.map(([title, detail]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "pool-bar-control" && (
        <section className="gm-room control-room poolbar-control">
          <p className="kicker">Pool Bar Partner Control</p>
          <h2>NightOwl Hideout Pool Bar Control</h2>
          <p>Private partner button for controlling streaming and casting inside the club TVs where he works.</p>
          <div className="control-grid">
            <button>Start Club TV Stream</button>
            <button>Pause Club TV Stream</button>
            <button>Open Casting Stage</button>
            <button>Approve Club Worker Queue</button>
            <button>Show Day Pass Promo</button>
            <button>Send To GM E-TV Lounge</button>
          </div>
        </section>
      )}

      {active === "orbits" && (
        <section className="gm-room orbit-store">
          <p className="kicker">Geniunaire MasterMinds Attraction</p>
          <h2>GM Orbits Store</h2>
          <p>Walk-in storefront attraction with dressing rooms, adult collector-display styling, seasonal displays, team Orbits, niche workers, and Orbit clothing rentals.</p>

          <div className="orbit-layout">
            <aside>
              {orbitDisplays.map((orbit) => (
                <button key={orbit.title} className={selectedOrbit.title === orbit.title ? "active" : ""} onClick={() => setSelectedOrbit(orbit)}>
                  <strong>{orbit.title}</strong>
                  <span>{orbit.badge}</span>
                </button>
              ))}
            </aside>

            <div className="orbit-showroom">
              <p className="kicker">{selectedOrbit.badge}</p>
              <h3>{selectedOrbit.title}</h3>
              <p>{selectedOrbit.use}</p>

              <div className="dressing-grid">
                {selectedOrbit.looks.map((look, index) => (
                  <article key={look} className="dressing-room">
                    <div className="adult-display">
                      <span className={`person p${index + 1}`} />
                    </div>
                    <h4>{look}</h4>
                    <p>Dressing room display with GM monogram walls, adult styling, role outfits, and display-ready activation.</p>
                    <button>Dress This Orbit</button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {active === "etv" && (
        <section className="gm-room etv-room">
          <p className="kicker">Choose Your Model • Wire Your Signal • Enter The Programming</p>
          <h2>GM E-TV Network</h2>
          <p>A regular ebook opens. An E-TV Book turns on.</p>

          <div className="card-grid">
            {roomCards.map(([title, detail]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>

          <div className="model-wall">
            {etvModels.map(([model, detail]) => (
              <article key={model}>
                <h3>{model}</h3>
                <p>{detail}</p>
                <button>Wire This Model</button>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "threadfolio" && (
        <section className="gm-room threadfolio-room">
          <p className="kicker">ThreadFolio Glow / E-Folio Set</p>
          <h2>ThreadFolio Glow E-Folio Set</h2>
          <p>Thread-to-product attraction for business setup, launch packages, E-TV promo placement, and client-ready handoff.</p>

          <div className="card-grid">
            {threadfolioSet.map(([title, detail]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "dorm" && (
        <section className="gm-room dorm-room">
          <p className="kicker">Frat House Attraction Inside GM</p>
          <h2>DormMageddon House</h2>
          <p>Student creator attraction with Dorm TV, watch rooms, campus drops, student survival lanes, merch, and staged access.</p>

          <div className="front-actions-grid">
            <article className="gate-card">
              <h3>Kaden Limited Admin</h3>
              <p>Monitored DormMageddon House admin only. No Owner Admin. No Kiddie Land. No global GM control.</p>
              <input type="password" placeholder="Kaden admin code" value={access.kadenAdmin} onChange={(e) => setAccess({ ...access, kadenAdmin: e.target.value })} />
              <button onClick={() => checkAccess("kadenAdmin", "kaden-admin", "Kaden limited DormMageddon admin opened.")}>Open Kaden Admin</button>
            </article>

            <article className="gate-card">
              <h3>Kaden Play Control</h3>
              <p>Monitored DormMageddon play/control mode for Dorm House and Dorm TV only.</p>
              <input type="password" placeholder="Kaden play code" value={access.kadenPlay} onChange={(e) => setAccess({ ...access, kadenPlay: e.target.value })} />
              <button onClick={() => checkAccess("kadenPlay", "kaden-play", "Kaden DormMageddon play control opened.")}>Open Kaden Play</button>
            </article>
          </div>
        </section>
      )}

      {active === "kaden-admin" && (
        <section className="gm-room control-room">
          <p className="kicker">Limited Monitored Admin</p>
          <h2>Kaden Admin — DormMageddon House</h2>
          <div className="card-grid">
            <article><h3>Dorm TV</h3><p>Manage Dorm TV watch flow, student drops, and approved programming only.</p></article>
            <article><h3>Creator Hub</h3><p>Student creators, scripts, campus ideas, approved side-hustle lanes.</p></article>
            <article><h3>Watch Rooms</h3><p>DormScreen Book, CastWire, Broadcast Bible, and VaultScreen lanes.</p></article>
            <article><h3>Monitoring</h3><p>Limited access stays logged and controlled by Owner Admin.</p></article>
          </div>
        </section>
      )}

      {active === "kaden-play" && (
        <section className="gm-room control-room">
          <p className="kicker">DormMageddon Play Control</p>
          <h2>Kaden Play — Dorm House / Dorm TV</h2>
          <div className="control-grid">
            <button>Open Watch Room</button>
            <button>Start Dorm TV Preview</button>
            <button>Show Campus Drop</button>
            <button>Pause Dorm TV</button>
            <button>Show Merch Drop</button>
            <button>Request Owner Approval</button>
          </div>
        </section>
      )}

      {active === "kiddie" && (
        <section className="gm-room kiddie-shell">
          <p className="kicker">Relocation Shell Only</p>
          <h2>Geniunaire Kids — Kiddie Land Has Relocated</h2>
          <p>Geniunaire Kids / Kiddie Land is not inside GM. It is a separate app and separate theme park.</p>
          <div className="relocation-card">
            <strong>Relocated To:</strong>
            <span>Geniunaire.Kids Theme Park</span>
            <span>Geniunaire-Kids-ThemePark-Atl.me</span>
          </div>
          <p className="warning-line">GM is 18+. No minors enter GM attractions, Orbit machines, Pool Bar, or club lanes.</p>
        </section>
      )}

      {active === "owner-admin" && (
        <section className="gm-room control-room owner-room">
          <p className="kicker">Owner Admin Control Room</p>
          <h2>Geniunaire MasterMinds Command</h2>
          <div className="card-grid">
            <article><h3>Vault Log System</h3><p>Emergency build notes, recovery steps, access status, and launch-state reminders.</p></article>
            <article><h3>PCOA / Pool Bar</h3><p>Pool bar, lifeguards, worker verification, club customer day pass, and stage flow.</p></article>
            <article><h3>GM E-TV</h3><p>Store, lounge, signal plans, wired rooms, casting, programming console, and broadcast control.</p></article>
            <article><h3>GM Orbits</h3><p>Orbit Store, dressing rooms, rentals, adult display rules, workers, and niche displays.</p></article>
            <article><h3>DormMageddon</h3><p>Kaden limited admin, Dorm TV, frat-house attraction, campus lanes, and monitored stages.</p></article>
            <article><h3>Kiddie Relocation</h3><p>Shell only inside GM. Separate app lives outside GM.</p></article>
          </div>
        </section>
      )}
    </main>
  );
}
