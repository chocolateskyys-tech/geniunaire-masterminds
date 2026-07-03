import React, { useMemo, useState } from "react";
import "./GMRecoveryPark.css";
import MoneyTracker from "../MoneyTracker/MoneyTracker";
import GMPaymentCenter from "../GMPaymentCenter/GMPaymentCenter";

const ACCESS_HASHES = {
  owner: "057662375775b172ecd63527747b33c96c481eed4a97118924c5a81d92fb30d7",
  frontGatePlay: "d739e382656660c4c8e470a25a2aad7943a7d5a9513286f0caf87141e6992943",
  kadenAdmin: "7bbd65de388a0f822c238d921d34fc26bd8bd2db88d527b7cc3a7a5b79d4b2c5",
  kadenPlay: "4c43bc0de7f6da64db30bd2363966c0b36b2b1ce7b61d54bf1019ffa01a64514",
  pcoaPartner: "15149d9728f884721fe3b32b55dd0c76bc85408ff43435f0bc7f6fb63fe29705"
};

const publicBuildings = [
  ["front", "Front Gate"],
  ["gm-ridz", "GM RIDZ Lot"],
  ["pcoa-pool", "PCOA Pool"],
  ["pool-bar", "Pool Bar"],
  ["orbits-store", "GM Orbits Store"],
  ["gm-estore", "GM E-Store"],
  ["gm-etv", "GM E-TV Network"],
  ["threadfolio", "ThreadFolio Glow"],
  ["dorm-house", "DormMageddon House"],
  ["kiddie-shell", "Kiddie Land Relocation"]
];

const rideTags = Array.from({ length: 18 }, (_, index) => {
  return `GMPark RIDEZ ${String(index + 1).padStart(2, "0")}`;
});

const estoreProducts = [
  ["ThreadFolio", "Thread-to-product business build system."],
  ["Glow", "Visual promo glow-up and attraction display layer."],
  ["E-Folio", "Client-ready proof, business offer, and handoff structure."],
  ["E-Map", "Park routing and attraction placement map."],
  ["E-Brochure", "Public-facing product explainer and sales handout."],
  ["CheerFrame", "Live picture-to-performance promo attraction."],
  ["GM E-TV Book Models", "Pocket Signal, DormScreen Book, RiftView, CastWire, BotBox Book, Broadcast Bible, VaultScreen."],
  ["GM Orbits", "Adult Orbit display rentals, clothing rentals, team Orbits, seasonal Orbits, and niche workers."],
  ["Casting Passes", "Voice, acting, writer, performer, host, promo, and production lanes."],
  ["PCOA / Pool Bar Offers", "Day passes, streaming displays, staff helper offers, club customer sign-up, and watch-room offers."]
];

const orbitDisplays = [
  {
    name: "Cast Orbits",
    tag: "GM AiALITY Casting",
    purpose: "Dancers, DJs, performers, voice talent, hosts, promo talent, creators, and casting clients.",
    looks: ["Host Orbit", "Performer Orbit", "DJ Orbit", "Promo Orbit"]
  },
  {
    name: "Park Orbits",
    tag: "GM Park Crew",
    purpose: "Gate guides, ticket help, pool support, lounge support, guest flow, and attraction workers.",
    looks: ["Gate Orbit", "Ticket Orbit", "Pool Orbit", "Lounge Orbit"]
  },
  {
    name: "Niche Orbits",
    tag: "Business / Creator Display",
    purpose: "Beauty, books, wellness, restaurants, nightlife, real estate, sports, creators, and specialty shops.",
    looks: ["Beauty Orbit", "Book Orbit", "Wellness Orbit", "Sports Orbit"]
  },
  {
    name: "Job Orbits",
    tag: "Dressed By Role",
    purpose: "Waitresses, bartenders, bar backs, security, hookah managers, sales, hosts, and support workers.",
    looks: ["Waitress Orbit", "Bartender Orbit", "Security Orbit", "Host Orbit"]
  },
  {
    name: "Seasonal Orbits",
    tag: "Seasonal Display Rentals",
    purpose: "Holiday campaigns, launch parties, birthdays, team events, club nights, and themed promo displays.",
    looks: ["Holiday Orbit", "Launch Orbit", "Birthday Orbit", "Event Orbit"]
  },
  {
    name: "Team Orbits",
    tag: "Crew / Group Rentals",
    purpose: "Team displays, worker crews, club packs, campus groups, brand teams, and park squads.",
    looks: ["Team Lead Orbit", "Crew Orbit", "Brand Orbit", "Hype Orbit"]
  }
];

const etvPlans = [
  ["Pocket Signal", "$9/mo", "Starter mobile signal, previews, pocket drops, and quick entry."],
  ["DormScreen Book", "$19/mo", "Student screen for DormMageddon, Student Founder Drops, Campus Creator Tools, and E-TV Lounge."],
  ["RiftView", "$29/mo", "Living-book viewing, AI’ality drops, scheduled scenes, and E-TV Lounge."],
  ["CastWire", "$49/mo", "Casting, voice chamber, writer room, actor room, callback desk, and production access."],
  ["BotBox Book", "$69/mo", "Bot rentals, AI worker setup, business bot rooms, and training."],
  ["Broadcast Bible", "$149/mo", "Live rooms, interviews, classes, watch parties, and network events."],
  ["VaultScreen", "$79/mo", "Replay vault, archives, saved courses, premium replays, and licensed drops."]
];

const dormHouseAttractions = [
  ["Dorm TV", "Campus TV and DormMageddon programming hub."],
  ["Watch Rooms", "DormScreen, Broadcast Bible, VaultScreen, and campus viewing rooms."],
  ["Legal Anime / Motion Comics", "Original student-friendly anime and comic-inspired production lanes with paperwork, consent, and license controls routed through GM Admin."],
  ["Creator Hub", "Students create, organize, publish, promote, and monetize original work through approved paths."],
  ["Campus Hustle", "Student services, founder offers, campus drops, dorm survival products, and money lanes."],
  ["Merch Drops", "DormMageddon merch, Alliance drops, campus founder items, and creator collections."],
  ["Campus Ambassador Flow", "Referral, founder, campus partner, and student community growth structure."],
  ["Founder Desk", "Kaden’s graduation-gift founder desk for Dorm House, Dorm TV, and campus creator movement."]
];

const pcoaRoles = [
  ["PCOA Pool Safety", "Pool entry, pool flow, cabana flow, and crowd support."],
  ["Orbit Pool Entry", "Orbit jump, pool effect, pool display, and VIP lane support."],
  ["GM E-TV Screen Support", "Huge screen over the bar, casting display, watch rooms, and streaming presentation."],
  ["Pool Bar Flow", "Day pass sign-up, club customer sit-down flow, and worker verification routed to GM Admin."],
  ["Live Performance Support", "Casting stage display, performance timing, and crowd handoff."]
];

const adminBuildings = [
  ["GM Money Vault", "Projected revenue, actual revenue, gap tracking, notes, attraction money lanes, and owner summaries."],
  ["GM Payment Center", "Stripe checkout links, passes, streams, Orbits, staff helper, casting, and activation products."],
  ["GM E-Store Manager", "ThreadFolio, E-Folio, CheerFrame, E-TV models, e-books, offers, storefront products, and affiliate-ready products."],
  ["Paperwork / License Vault", "LLC structure, contracts, consent, artist policies, celebrity policies, SDA policies, streaming policies, casting paperwork, and partner paperwork."],
  ["Copywriter Desk", "Built-in copywriting support for offers, listings, contracts summaries, attraction language, and launch text."],
  ["Partner Desk", "Four business partner lanes, real-world business mapping, streaming operations, production/sound studio, and company controls."],
  ["Attraction LLC Structure", "Each attraction operates like a real business property inside the GM park."],
  ["Compliance Routing", "Age, consent, payment, license, likeness, casting, student, and partner paperwork stays in owner-side operations."]
];

const moneySeparation = [
  ["Front Gate", "Tickets, VIP entry, Orbit entry, owner access, guest check-in."],
  ["GM RIDZ Parking Lot", "Parking passes, golf carts, driver tags, future ride-app merge."],
  ["PCOA Pool", "Pool access, cabanas, Orbit jumps, pool effects, VIP pool experiences."],
  ["NightOwl Hideout Pool Bar", "Day passes, club customer sign-up, worker specials, casting upgrades, E-TV club stream offers."],
  ["GM Orbits Store", "Orbit rentals, clothing rentals, dressing rooms, team Orbits, seasonal displays, niche workers."],
  ["GM E-TV Network", "Signal plans, E-TV book models, casting memberships, broadcasts, replays, commercial breaks, watch rooms."],
  ["ThreadFolio Glow E-Folio Set", "ThreadFolio, Glow, E-Folio, E-Map, E-Brochure, CheerFrame, creator packages."],
  ["DormMageddon House", "Dorm TV, student founder lanes, Campus TV, merch, watch rooms, creator access, campus subscriptions."],
  ["GM E-Store", "All products, offers, affiliate-ready items, storefront purchases, and digital product lanes."]
];

const nextGenSet = [
  ["Teen / Youth Operating Brain", "NextGen Set belongs with Kiddie Land as the operating brain of the kids mini-GM."],
  ["Parent Controls", "Parent approval, commerce limits, fundraising permissions, and guardian-side review."],
  ["School / Student Path", "Age-appropriate student lanes, founder growth, report-card stages, and future handoff points."],
  ["GM Display Rule", "Inside GM, Kiddie Land remains a relocation shell and business handoff only."]
];

const poolColors = [
  ["Gemini Purple", "pool-purple"],
  ["PCOA Gold", "pool-gold"],
  ["Neon Pink", "pool-pink"],
  ["Aqua Signal", "pool-aqua"],
  ["Bass Pulse", "pool-bass"]
];

async function sha256(text) {
  const data = new TextEncoder().encode(text.trim());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export default function GMRecoveryPark() {
  const [active, setActive] = useState("front");
  const [status, setStatus] = useState("GM Front Gate ready.");
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedOrbit, setSelectedOrbit] = useState(orbitDisplays[0]);
  const [poolEffect, setPoolEffect] = useState(poolColors[0]);
  const [access, setAccess] = useState({
    owner: "",
    frontGatePlay: "",
    kadenAdmin: "",
    kadenPlay: "",
    pcoaPartner: ""
  });
  const [guest, setGuest] = useState({
    name: "",
    email: "",
    pass: "GM $5 Hour Machine Day Pass"
  });

  const activeDriver = useMemo(() => {
    return rideTags[Math.floor(Math.random() * rideTags.length)];
  }, [status]);

  function openBuilding(id) {
    setActive(id);
    const label = publicBuildings.find((item) => item[0] === id)?.[1] || id;
    setStatus(`${label} opened.`);
  }

  async function openSecure(key, destination, message) {
    const entered = await sha256(access[key] || "");
    if (entered === ACCESS_HASHES[key]) {
      setActive(destination);
      setGateOpen(true);
      setStatus(message);
    } else {
      setStatus("Code did not open that door.");
    }
  }

  function checkInGuest() {
    if (!guest.name.trim() || !guest.email.trim()) {
      setStatus("Guest check-in needs name and email.");
      return;
    }

    localStorage.setItem("gm_guest_checkin", JSON.stringify({
      ...guest,
      createdAt: new Date().toISOString()
    }));

    setGateOpen(true);
    setActive("gm-ridz");
    setStatus(`${guest.pass} saved. GM RIDZ Lot opened.`);
  }

  function activatePool(effect) {
    setPoolEffect(effect);
    setStatus(`Orbit jumped into PCOA Pool. ${effect[0]} activated.`);
  }

  return (
    <main className="gm-park">
      <header className="gm-header">
        <div className="gm-logo-lockup">
          <span className="gm-logo">GM</span>
          <div>
            <h1>Geniunaire MasterMinds</h1>
            <p>VIRTUAL THEME PARK — ATLANTA, GA</p>
          </div>
        </div>

        <nav className="gm-building-nav">
          {publicBuildings.map(([id, label]) => (
            <button key={id} type="button" className={active === id ? "active" : ""} onClick={() => openBuilding(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <section className="gm-status">
        <span>{status}</span>
        <strong>Active Driver: {activeDriver}</strong>
      </section>

      {active === "front" && (
        <section className="gm-front">
          <div className="front-visual">
            <img src="/assets/gm-front-gate-final.png" alt="Geniunaire MasterMinds finalized front gate" />
            <div className="front-title-glow">VIRTUAL THEME PARK</div>

            <div className="cover cover-orbit-title">
              <strong>ORBIT RENTAL</strong>
              <span>Bring your virtual self to life.</span>
            </div>

            <div className="cover cover-machine-title">MINI ORBIT MACHINE</div>

            <div className="cover cover-orbit-picker">
              <strong>CHOOSE YOUR ORBIT</strong>
              <span>1-HOUR</span>
              <span>DAY PASS</span>
              <span>MONTHLY PASS</span>
            </div>

            <div className="adult-orbit-window">
              <div className="adult-orbits">
                <span />
                <span />
                <span />
              </div>
              <strong>18+ ADULT ORBITS</strong>
              <small>All nationalities • GM styled</small>
            </div>

            <div className="cover cover-world">
              <strong>YOUR ORBIT.</strong>
              <strong>YOUR STYLE.</strong>
              <strong>YOUR WORLD.</strong>
            </div>

            <div className="cover cover-line">ORBIT RENTAL LINE STARTS HERE</div>
            <div className={`gate-light ${gateOpen ? "open" : ""}`} />
          </div>

          <div className="front-control-grid">
            <article className="gm-card">
              <p className="gm-kicker">Guest Entry</p>
              <h2>Choose Your GM Experience</h2>
              <input value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Name / Stage Name" />
              <input value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="Email" />
              <select value={guest.pass} onChange={(e) => setGuest({ ...guest, pass: e.target.value })}>
                <option>GM $5 Hour Machine Day Pass</option>
                <option>Orbit Rental Day Pass</option>
                <option>GM RIDZ Parking Lot Pass</option>
                <option>Pool Bar Day Pass</option>
                <option>GM E-TV Casting Pass</option>
                <option>GM E-Store Product Access</option>
              </select>
              <button type="button" onClick={checkInGuest}>Check In / Enter GM</button>
            </article>

            <article className="gm-card secure">
              <p className="gm-kicker">Owner / Operator Doors</p>
              <h2>Secure Building Access</h2>

              <label>GM Owner Admin</label>
              <input type="password" value={access.owner} onChange={(e) => setAccess({ ...access, owner: e.target.value })} placeholder="Owner code" />
              <button type="button" onClick={() => openSecure("owner", "owner-admin", "GM Owner Admin Building opened.")}>Open GM Owner Admin</button>

              <label>Front Gate Play</label>
              <input type="password" value={access.frontGatePlay} onChange={(e) => setAccess({ ...access, frontGatePlay: e.target.value })} placeholder="Front Gate Play code" />
              <button type="button" onClick={() => openSecure("frontGatePlay", "front-play", "Front Gate Play opened.")}>Open Front Gate Play</button>
            </article>
          </div>
        </section>
      )}

      {active === "front-play" && (
        <section className="gm-building control-building">
          <p className="gm-kicker">Front Gate Play</p>
          <h2>Live Front Gate Control</h2>
          <div className="control-grid">
            {["Open Gate", "Close Gate", "VIP Rope Glow", "GM RIDZ Rush", "Gold Mine Glow", "Guest Spotlight"].map((mode) => (
              <button key={mode} type="button" onClick={() => {
                setGateOpen(mode !== "Close Gate");
                setStatus(`${mode} activated.`);
              }}>
                {mode}
              </button>
            ))}
          </div>
        </section>
      )}

      {active === "gm-ridz" && (
        <section className="gm-building">
          <p className="gm-kicker">Paid Virtual Parking Attraction</p>
          <h2>GM RIDZ Parking Lot</h2>
          <p>Landscaped paid parking lot under the front gate with refreshment stands, golf cart booth, table sign-up, driver flow, and virtual park entry.</p>

          <div className="ridz-lot">
            <div className="stand refreshment">Refreshment Stand</div>
            <div className="stand golf">Golf Cart Booth</div>
            <div className="stand table">Sit-Down Sign-Up</div>
            <div className="stand drop">Golf Cart Drop-Off</div>
            {rideTags.map((tag, index) => (
              <div key={tag} className={`ridz-car c${(index % 9) + 1}`}>
                {tag}
              </div>
            ))}
          </div>
        </section>
      )}

      {active === "pcoa-pool" && (
        <section className={`gm-building pcoa-pool ${poolEffect[1]}`}>
          <p className="gm-kicker">Powered By PCOA • Rooted In Gemini</p>
          <h2>GM Empire Pool</h2>
          <p>Finalized PCOA pool building with Orbit jumps, pool color effects, bass pulse, cabana flow, and Pool Bar connection.</p>

          <div className="pool-logo-frame">
            <img src="/assets/gm-pcoa-pool-logo-final.png" alt="GM Empire PCOA Gemini pool logo" />
            <div className="pool-effect-glow" />
            <button type="button" className="orbit-jump" onClick={() => {
              const next = poolColors[(poolColors.indexOf(poolEffect) + 1) % poolColors.length];
              activatePool(next);
            }}>
              Orbit Jump
            </button>
          </div>

          <div className="control-grid">
            {poolColors.map((effect) => (
              <button key={effect[0]} type="button" onClick={() => activatePool(effect)}>{effect[0]}</button>
            ))}
          </div>

          <div className="gm-card-grid">
            {pcoaRoles.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>
      )}

      {active === "pool-bar" && (
        <section className="gm-building poolbar">
          <p className="gm-kicker">Sponsored By Party Crashers Of Atlanta</p>
          <h2>NightOwl Hideout Pool Bar</h2>
          <p>Real GM E-TV streaming and casting display building for club TVs, Pool Bar day passes, worker offers, live performance stage, and customer TV-entry sign-up.</p>

          <div className="poolbar-stage">
            <div className="huge-screen">
              <strong>GM E-TV LIVE SCREEN</strong>
              <span>Streaming • Casting • Performances • Club TV Display</span>
            </div>
            <div className="bar-counter">Pool Bar</div>
            <div className="performance-stage">Live Performance Stage</div>
          </div>

          <div className="front-control-grid">
            <article className="gm-card secure">
              <p className="gm-kicker">PCOA Partner Streaming</p>
              <h2>Club TV Stream Door</h2>
              <p>Partner streaming door for club TV display and casting presentation. Money and admin remain in GM Owner Admin.</p>
              <input type="password" value={access.pcoaPartner} onChange={(e) => setAccess({ ...access, pcoaPartner: e.target.value })} placeholder="PCOA streaming code" />
              <button type="button" onClick={() => openSecure("pcoaPartner", "pcoa-partner-stream", "PCOA Partner Streaming opened.")}>Open PCOA Streaming</button>
            </article>

            <article className="gm-card">
              <p className="gm-kicker">Club Customer Day Pass</p>
              <h2>Sit Down / Enter The TV</h2>
              <p>Customers can sit down, sign up, get day-pass access, enter the virtual TV experience, see special deals, and route into GM E-TV / Casting / Pool Bar.</p>
            </article>
          </div>
        </section>
      )}

      {active === "pcoa-partner-stream" && (
        <section className="gm-building control-building">
          <p className="gm-kicker">PCOA Partner Streaming</p>
          <h2>GM E-TV Club Streaming Console</h2>
          <p>Streaming and casting display controls for the club TVs. Owner money, payments, paperwork, and admin stay inside GM Owner Admin.</p>
          <div className="control-grid">
            <button>Start GM E-TV Club Stream</button>
            <button>Pause GM E-TV Club Stream</button>
            <button>Open Casting Stage Display</button>
            <button>Show Day Pass Promo</button>
            <button>Send Guest To GM E-TV Lounge</button>
            <button>Request GM Admin Review</button>
          </div>
        </section>
      )}

      {active === "orbits-store" && (
        <section className="gm-building">
          <p className="gm-kicker">Walk-In Storefront Attraction</p>
          <h2>GM Orbits Store</h2>
          <p>Adult Orbit storefront with dressing rooms, collector-style displays, seasonal Orbits, team Orbits, Orbit clothing rentals, niche workers, and E-TV display activation.</p>

          <div className="orbit-layout">
            <aside>
              {orbitDisplays.map((orbit) => (
                <button key={orbit.name} type="button" className={selectedOrbit.name === orbit.name ? "active" : ""} onClick={() => setSelectedOrbit(orbit)}>
                  <strong>{orbit.name}</strong>
                  <span>{orbit.tag}</span>
                </button>
              ))}
            </aside>

            <div className="orbit-showroom">
              <p className="gm-kicker">{selectedOrbit.tag}</p>
              <h3>{selectedOrbit.name}</h3>
              <p>{selectedOrbit.purpose}</p>

              <div className="dressing-grid">
                {selectedOrbit.looks.map((look, index) => (
                  <article key={look} className="dressing-room">
                    <div className="adult-display"><span className={`person p${index + 1}`} /></div>
                    <h4>{look}</h4>
                    <p>GM monogram dressing room with adult role styling, outfit rental, and display-ready activation.</p>
                    <button>Dress This Orbit</button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {active === "gm-estore" && (
        <section className="gm-building">
          <p className="gm-kicker">GM E-Store / Storefront Property</p>
          <h2>GM E-Store</h2>
          <p>Products live inside a real storefront property in the park, ready for purchase, affiliate use, activation, or owner management.</p>

          <div className="gm-card-grid">
            {estoreProducts.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
                <button type="button" onClick={() => setActive("gm-payment-center")}>Open Owner Payment Lane</button>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "gm-etv" && (
        <section className="gm-building">
          <p className="gm-kicker">Real E-TV Store • Signal Plan • Lounge • Programming Console</p>
          <h2>GM E-TV Network</h2>
          <p>A regular ebook opens. An E-TV Book turns on. These are Comcast-like digital access plans for programming, casting, streaming, rooms, drops, replays, and broadcast structures.</p>

          <div className="gm-card-grid">
            {etvPlans.map(([name, price, body]) => (
              <article key={name}>
                <h3>{name}</h3>
                <strong>{price}</strong>
                <p>{body}</p>
                <button type="button" onClick={() => setActive("gm-estore")}>Send To GM E-Store</button>
              </article>
            ))}
          </div>
        </section>
      )}

      {active === "threadfolio" && (
        <section className="gm-building">
          <p className="gm-kicker">GM E-Store Product Set</p>
          <h2>ThreadFolio Glow E-Folio Set</h2>
          <p>ThreadFolio, Glow, E-Folio, E-Map, E-Brochure, CheerFrame, and E-TV placement live as products inside the GM E-Store and owner admin.</p>

          <div className="gm-card-grid">
            {estoreProducts.slice(0, 6).map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>
      )}

      {active === "dorm-house" && (
        <section className="gm-building dorm-house">
          <p className="gm-kicker">High School Graduation Gift • Freshman Founder Campus House</p>
          <h2>DormMageddon House</h2>
          <p>
            College/campus creator attraction built for Dorm TV, Campus TV, legal anime and motion-comic culture,
            student founder drops, watch rooms, campus hustle, merch, creator rooms, and the DormMageddon Originals ecosystem.
          </p>

          <div className="gm-card-grid">
            {dormHouseAttractions.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>

          <div className="front-control-grid">
            <article className="gm-card secure">
              <p className="gm-kicker">Kaden Founder Door</p>
              <h2>Enter Dorm House Admin</h2>
              <p>DormMageddon House tools for Dorm TV, watch rooms, campus drops, creator hub, merch, founder desk, and graduation-gift buildout.</p>
              <input type="password" value={access.kadenAdmin} onChange={(e) => setAccess({ ...access, kadenAdmin: e.target.value })} placeholder="Kaden admin code" />
              <button type="button" onClick={() => openSecure("kadenAdmin", "kaden-admin", "Kaden Dorm House Admin opened.")}>Enter Dorm House Admin</button>
            </article>

            <article className="gm-card secure">
              <p className="gm-kicker">Dorm TV Door</p>
              <h2>Enter Dorm TV Control</h2>
              <p>Turn on Dorm TV, open watch rooms, preview campus drops, show merch drops, and run the DormMageddon house vibe.</p>
              <input type="password" value={access.kadenPlay} onChange={(e) => setAccess({ ...access, kadenPlay: e.target.value })} placeholder="Kaden play code" />
              <button type="button" onClick={() => openSecure("kadenPlay", "kaden-play", "Kaden Dorm TV Control opened.")}>Enter Dorm TV Control</button>
            </article>
          </div>
        </section>
      )}

      {active === "kaden-admin" && (
        <section className="gm-building control-building dorm-house">
          <p className="gm-kicker">Kaden Founder Lane</p>
          <h2>DormMageddon House Admin</h2>
          <div className="control-grid">
            <button>Open Dorm TV</button>
            <button>Open Creator Hub</button>
            <button>Open Campus Drops</button>
            <button>Open Merch Desk</button>
            <button>Open Watch Rooms</button>
            <button>Send To GM Admin Review</button>
          </div>
        </section>
      )}

      {active === "kaden-play" && (
        <section className="gm-building control-building dorm-house">
          <p className="gm-kicker">DormMageddon House Control</p>
          <h2>Dorm TV / Campus TV</h2>
          <div className="control-grid">
            <button>Start Dorm TV Preview</button>
            <button>Open Watch Room</button>
            <button>Show Campus Drop</button>
            <button>Show Merch Drop</button>
            <button>Start Creator Spotlight</button>
            <button>Request Founder Review</button>
          </div>
        </section>
      )}

      {active === "kiddie-shell" && (
        <section className="gm-building kiddie-shell">
          <p className="gm-kicker">Relocation Building Inside GM</p>
          <h2>Geniunaire Kids — Kiddie Land</h2>
          <p>Kiddie Land is the separate mini replica of GM for kids. Inside GM, this building is a relocation and business handoff shell only.</p>

          <div className="relocation-card">
            <strong>GENIUNAIRE KIDS — KIDDIE LAND HAS BEEN RELOCATED</strong>
            <span>Separate app / separate theme park</span>
            <span>Geniunaire-Kids-ThemePark-Atl.me</span>
          </div>

          <div className="gm-card-grid">
            {nextGenSet.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>
      )}

      {active === "owner-admin" && (
        <section className="gm-building owner-admin">
          <p className="gm-kicker">GM Owner Admin Building</p>
          <h2>GM Admin / Money / Paperwork Command</h2>
          <p>
            Owner-side control for real business operations: money, payment links, attraction LLC structure,
            licenses, contracts, policies, copywriter desk, partner operations, streaming, casting, store products,
            and approval routing.
          </p>

          <div className="admin-command-grid">
            <button type="button" onClick={() => setActive("money-vault")}>Open GM Money Vault</button>
            <button type="button" onClick={() => setActive("gm-payment-center")}>Open GM Payment Center</button>
            <button type="button" onClick={() => setActive("estore-admin")}>Open GM E-Store Manager</button>
            <button type="button" onClick={() => setActive("paperwork-vault")}>Open Paperwork / License Vault</button>
            <button type="button" onClick={() => setActive("copywriter-desk")}>Open Copywriter Desk</button>
            <button type="button" onClick={() => setActive("money-separation")}>Open Attraction Money Separation</button>
          </div>

          <div className="gm-card-grid">
            {adminBuildings.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>
      )}

      {active === "money-vault" && (
        <section className="admin-tool-shell">
          <div className="admin-tool-head">
            <p className="gm-kicker">GM Owner Admin Building</p>
            <h2>GM Money Vault</h2>
            <button onClick={() => setActive("owner-admin")}>Return To GM Admin Building</button>
          </div>
          <MoneyTracker onReturn={() => setActive("owner-admin")} />
        </section>
      )}

      {active === "gm-payment-center" && (
        <section className="admin-tool-shell">
          <div className="admin-tool-head">
            <p className="gm-kicker">GM Owner Admin Building</p>
            <h2>GM Payment Center</h2>
            <button onClick={() => setActive("owner-admin")}>Return To GM Admin Building</button>
          </div>
          <GMPaymentCenter />
        </section>
      )}

      {active === "estore-admin" && (
        <section className="gm-building owner-admin">
          <p className="gm-kicker">GM Owner Admin Building</p>
          <h2>GM E-Store Manager</h2>
          <p>All products, storefront offers, affiliate-ready products, E-TV products, ThreadFolio products, Orbit rentals, and activation packages live here for owner management.</p>
          <div className="gm-card-grid">
            {estoreProducts.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>
      )}

      {active === "paperwork-vault" && (
        <section className="gm-building owner-admin">
          <p className="gm-kicker">GM Owner Admin Building</p>
          <h2>Paperwork / License Vault</h2>
          <p>Storage structure for real LLC paperwork, contracts, licenses, artist policies, celebrity policies, SDA policies, streaming documents, production documents, casting policies, student policies, partner documents, and owner approvals.</p>

          <div className="gm-card-grid">
            {["LLC / Attraction Structure", "Artist & Celebrity Policy", "SDA Policy Vault", "Streaming / Broadcasting Documents", "Casting Agreements", "Student / Campus Paperwork", "Voiceover / Production Studio Docs", "Partner Operating Agreements"].map((item) => (
              <article key={item}><h3>{item}</h3><p>Owner-side document lane. Public attractions do not replace paperwork.</p></article>
            ))}
          </div>
        </section>
      )}

      {active === "copywriter-desk" && (
        <section className="gm-building owner-admin">
          <p className="gm-kicker">Built-In Site Copywriter</p>
          <h2>GM Copywriter Desk</h2>
          <p>Owner-side copywriting desk for attraction text, store listings, product descriptions, partner blurbs, launch copy, policy summaries, and park wording.</p>
          <textarea className="copywriter-box" placeholder="Paste rough offer, policy, product, attraction, or partner notes here..." />
          <div className="control-grid">
            <button>Draft Store Listing</button>
            <button>Draft Attraction Copy</button>
            <button>Draft Policy Summary</button>
            <button>Draft Partner Blurb</button>
            <button>Draft Launch Announcement</button>
          </div>
        </section>
      )}

      {active === "money-separation" && (
        <section className="gm-building owner-admin">
          <p className="gm-kicker">Attraction LLC / Money Separation</p>
          <h2>Attraction Money Separation</h2>
          <p>Each attraction runs like a real business property inside the park. Money, pricing, payment links, approvals, paperwork, and final controls route through GM Owner Admin.</p>
          <div className="money-lane-board">
            {moneySeparation.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
