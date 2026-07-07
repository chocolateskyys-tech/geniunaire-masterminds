import React, { useState } from "react";
import "./EntryGate.css";
import "./EntryGateExpansion.css";

const OWNER_CODE = "ASPIRE!";
const FRONT_GATE_PLAY_CODE = "ORBIT!";

const booths = [
  {
    key: "walk",
    label: "Walk The Park",
    booth: "Main Gate",
    note: "Name and email required before the gate opens."
  },
  {
    key: "pay",
    label: "GM Pay Desk",
    booth: "Ticket Booth",
    note: "Name and email required before GM Pay Desk access."
  },
  {
    key: "etv",
    label: "GM E-TV Network",
    booth: "Broadcast Gate",
    note: "Name and email required before GM E-TV Network access."
  },
  {
    key: "threadfolio",
    label: "ThreadFolio Set",
    booth: "ThreadFolio Set Gate",
    note: "Name and email required before ThreadFolio Set access."
  },
  {
    key: "casting",
    label: "Casting Gate",
    booth: "Casting Security",
    note: "Name and email required before Casting Gate access."
  },
  {
    key: "vip",
    label: "VIP Gate",
    booth: "VIP Entry",
    note: "Name and email required before VIP access."
  }
];

const parkStops = [
  {
    title: "Gold Mine",
    body: "Master power cave, vault energy, owner signal, park control, and Geniunaire MasterMinds command center."
  },
  {
    title: "ThreadFolio Set Pavilion",
    body: "ThreadFolio, E-Folio, E-Map, client builds, launch packages, business setup, and founder handoff."
  },
  {
    title: "GM E-TV Network Row",
    body: "E-TV Book models, signal plans, scheduled drops, commercials, living-book programming, and broadcast access."
  },
  {
    title: "Hotel & Apartment District",
    body: "Hotel and apartment building visuals, room booking, relocation stays, sponsor placement, VIP travel, and GM Pay Desk routing."
  },
  {
    title: "Production Studio",
    body: "Shows, scripts, commercials, voiceover, promo TV, release packages, and studio planning."
  },
  {
    title: "Casting Gate",
    body: "Talent sign-in, verification, agreements, rules, casting access, and GM E-TV Network placement."
  },
  {
    title: "Sound Mine",
    body: "Music, sound effects, voice drops, intro drops, jingles, commercial audio, and broadcast mix."
  },
  {
    title: "E-Store District",
    body: "Products, services, digital shelves, affiliate shelves, checkout paths, and GM marketplace offers."
  },
  {
    title: "Celebrity Marketplace",
    body: "Verification, placement review, booking requests, promo TV packages, and high-security review."
  },
  {
    title: "DormMageddon House",
    body: "Student creator attraction, campus drops, watch rooms, creator hub, merch, and student survival offers."
  },
  {
    title: "Sponsor & Auto-Money Lane",
    body: "Paid sign placement, room sponsorships, E-TV commercials, day-pass offers, VIP upgrades, and checkout-ready sponsor flow."
  },
  {
    title: "Orbit Machine",
    body: "SKYY owner signal, Orbit intake logic, body-rental concept notes, and founder-side routing without placing robots on the gate picture."
  },
  {
    title: "GM Pay Desk",
    body: "Tickets, GM E-TV streams, guest passes, subscriptions, prepaid builds, sponsor slots, booking deposits, and client checkout."
  }
];

const adminZones = [
  {
    title: "Owner Admin Control Room",
    body: "Founder access, Geniunaire MasterMinds command, gate operations, visitor routing, park controls, and override access."
  },
  {
    title: "Universal Client Admin",
    body: "Client intake, sponsor routing, hotel/apartment booking requests, quote notes, contract status, GM Pay Desk handoff, and launch follow-up."
  },
  {
    title: "Vault Log System",
    body: "Emergency build notes, launch records, restore notes, access logs, build status, and incident tracking."
  },
  {
    title: "Emergency Build Guide",
    body: "Plain-language build guide for restoring the park, verifying rooms, checking buttons, and confirming launch status."
  },
  {
    title: "Party Crashers of Atlanta",
    body: "Sponsored by Party Crashers of Atlanta routing, business processing, paperwork, approvals, and official park-side support."
  },
  {
    title: "NightOwl Hideout Pool Lounge & Discovery Bar GM E-TV Network & Business Plan",
    body: "NightOwl Hideout Pool Lounge & Discovery Bar placement, GM E-TV Network plan, service model, business plan, and club-side rollout."
  },
  {
    title: "GM E-TV Programming Console",
    body: "E-TV Store, Signal Plans, Wired Rooms, Programming Scheduler, Signal Clipping System, and founder override."
  },
  {
    title: "Hotel / Apartment Booking Admin",
    body: "Hotel stay requests, apartment building leads, VIP guest lodging, relocation offers, deposits, sponsor rooms, and future travel upgrades."
  },
  {
    title: "Sponsor Flow Admin",
    body: "Sponsor packages, ad placement, E-TV commercial slots, park sign rentals, room naming rights, day-pass promos, and paid spotlight controls."
  },
  {
    title: "ThreadFolio Set Admin",
    body: "ThreadFolio, E-Folio, E-Map, client setup, business setup, launch package, and handoff control."
  },
  {
    title: "DormMageddon House Admin",
    body: "Kaden access, campus creator hub, student watch rooms, side-hustle lanes, merch, and DormMageddon rollout."
  },
  {
    title: "GENIUNAIRE K!DDZ-K!DDZ PLANET Special Events",
    body: "Owner-side special event routing for kid-safe gate moments, ride timing, approvals, event notes, and guardian-facing controls. This is separate from Kaden Admin."
  }
];

const phaseTwoUpgrades = [
  {
    title: "Hotel & Apartment Revenue Flow",
    body: "Connect room booking, apartment building leads, relocation stays, deposits, VIP upgrades, and sponsor placements to GM Pay Desk."
  },
  {
    title: "Sponsor Trigger Flow",
    body: "Every visible district can become a paid sponsor slot: gate signs, hotel rooms, apartment building naming, E-TV ads, and day-pass promos."
  },
  {
    title: "Universal Client Admin",
    body: "One admin lane routes clients, sponsors, vendors, hotel/apartment leads, and build requests before sending them to the right GM room."
  },
  {
    title: "Phase 2 Upgrade Note",
    body: "GMPark RIDEZ, travel shuttles, hotel check-in, apartment walk-throughs, and sponsored district routing are ready to wire when the expansion goes live."
  }
];

const frontGatePlayUpgrades = [
  {
    title: "Founder Play Button Restore",
    body: "Owner-side play stack with gate motions, crowd reactions, guest spotlight, park announcements, music swap, and visible play status."
  },
  {
    title: "Guest Tease / Welcome Moment",
    body: "Runs a fuller welcome sequence: gate shimmer, ticket booth cue, music change, and front gate announcement."
  },
  {
    title: "VIP + Sponsor Flash",
    body: "Lights VIP lane, Sponsor Lane, hotel/apartment placement, and GM Pay Desk routes for premium offers."
  },
  {
    title: "Orbit Machine Moment",
    body: "Shows the Orbit Machine as a separate front-gate feature tied to SKYY owner signal, without placing robots on the gate picture."
  },
  {
    title: "Emergency Pause / Save-My-Ass Check",
    body: "Play-side reminder to verify guest info, owner lock, paperwork/approval routing, and child-safe separation before any special event goes live."
  }
];

const kadenOrbitHouseUpgrades = [
  {
    title: "Kaden Orbit Feature Queue",
    body: "DormMageddon-only Orbit feature queue for student creator drops, watch room cues, and campus content moments."
  },
  {
    title: "DormMageddon House Play Mode",
    body: "House lights, watch room pulse, creator board, merch/drop reminder, and student side-hustle signal for the DormMageddon attraction."
  },
  {
    title: "Campus Creator Watch Rooms",
    body: "Queue rooms for writers, artists, editors, film students, voice actors, and student collaborators."
  },
  {
    title: "Kaden Restriction Lock",
    body: "Kaden access remains DormMageddon House only. No GENIUNAIRE K!DDZ-K!DDZ PLANET, Kiddie, owner, payment, waiver, or kid-event management is granted here."
  },
  {
    title: "Dorm House / Dorm TV Upgrade Path",
    body: "Future path for Dorm House and Dorm TV controls, campus drops, show releases, room playlists, and student creator monetization."
  }
];

const kidsSpecialEventControls = [
  {
    title: "Kid-Safe Special Event Gate",
    body: "Owner-approved gate timing for GENIUNAIRE K!DDZ-K!DDZ PLANET special events, with guardian-friendly entry notes and event-only routing."
  },
  {
    title: "Ride Event Scheduler",
    body: "Plan ride moments, countdown cues, ticket timing, and safe ride-zone routing for special events."
  },
  {
    title: "Guardian / Agreement Reminder",
    body: "Event checklist reminder for paperwork, waivers, approvals, and guardian-facing rules before children enter a special event."
  },
  {
    title: "Next Gen / Clones / E-Map Route",
    body: "Notes the auto-run system for GENIUNAIRE K!DDZ-K!DDZ PLANET using Next Gen, Clones, E-map, and SKYY oversight."
  },
  {
    title: "Separate From Kaden",
    body: "This control panel belongs to owner-side kid-event routing. Kaden does not manage GENIUNAIRE K!DDZ-K!DDZ PLANET."
  }
];

export default function EntryGate() {
  const [selected, setSelected] = useState(null);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [ownerCode, setOwnerCode] = useState("");
  const [playCode, setPlayCode] = useState("");
  const [status, setStatus] = useState("Front gate closed. Choose a booth or use secure owner access.");
  const [music, setMusic] = useState("Atlanta Gate Brass");
  const [gateOpen, setGateOpen] = useState(false);
  const [showParkSigns, setShowParkSigns] = useState(false);
  const [activeStop, setActiveStop] = useState(null);
  const [ownerAdminOpen, setOwnerAdminOpen] = useState(false);
  const [frontGatePlayOpen, setFrontGatePlayOpen] = useState(false);
  const [kadenAdminOpen, setKadenAdminOpen] = useState(false);
  const [activeAdminZone, setActiveAdminZone] = useState(adminZones[0]);
  const [frontGateMode, setFrontGateMode] = useState("Standard Guest Flow");
  const [announcement, setAnnouncement] = useState("Welcome to Geniunaire MasterMinds Online Virtual Theme Park — Atlanta, GA.");
  const [activePlayFeature, setActivePlayFeature] = useState(frontGatePlayUpgrades[0]);
  const [activeKadenFeature, setActiveKadenFeature] = useState(kadenOrbitHouseUpgrades[0]);
  const [activeKidsFeature, setActiveKidsFeature] = useState(kidsSpecialEventControls[0]);

  const hasGuestInfo = () => guest.name.trim().length > 0 && guest.email.trim().length > 0;

  const chooseBooth = (booth) => {
    setSelected(booth);
    setGateOpen(false);
    setShowParkSigns(false);
    setActiveStop(null);
    setOwnerAdminOpen(false);
    setFrontGatePlayOpen(false);
    setKadenAdminOpen(false);
    setStatus(`${booth.label} selected. Name and email required before access opens.`);
    localStorage.setItem("gm_selected_booth", JSON.stringify(booth));
  };

  const changeMusic = () => {
    const tracks = [
      "Atlanta Gate Brass",
      "Parking Lot Bass",
      "Gold Mine Rumble",
      "GM E-TV Street Mix",
      "Main Gate Drumline",
      "Hotel Lobby Glow",
      "Apartment District Ride-In",
      "K!DDZ Special Event Spark",
      "DormMageddon House Pulse"
    ];
    const nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setMusic(nextTrack);
    setStatus(`Park music changed: ${nextTrack}.`);
  };

  const submitGate = () => {
    if (!selected) {
      setStatus("Choose a booth first.");
      return;
    }

    if (!hasGuestInfo()) {
      setStatus("LOCKED: Name and email required before this gate opens.");
      return;
    }

    localStorage.setItem("gm_gate_guest", JSON.stringify({
      selected,
      guest,
      time: new Date().toISOString()
    }));

    setGateOpen(true);
    setShowParkSigns(true);
    setStatus(`${selected.label} accepted. Gate opened for checked-in guest.`);
  };

  const submitOwnerCode = () => {
    if (ownerCode === OWNER_CODE) {
      setGateOpen(true);
      setShowParkSigns(true);
      setOwnerAdminOpen(true);
      setFrontGatePlayOpen(false);
      setKadenAdminOpen(false);
      setActiveAdminZone(adminZones[0]);
      setStatus("Owner access accepted. Admin Control Room opened.");
      return;
    }

    setOwnerAdminOpen(false);
    setStatus("Owner access denied.");
  };

  const submitFrontGatePlayCode = () => {
    if (playCode === FRONT_GATE_PLAY_CODE) {
      setFrontGatePlayOpen(true);
      setOwnerAdminOpen(false);
      setKadenAdminOpen(false);
      setActivePlayFeature(frontGatePlayUpgrades[0]);
      setStatus("Front Gate Play Console opened with restored owner play controls.");
      return;
    }

    setFrontGatePlayOpen(false);
    setStatus("Front Gate Play access denied.");
  };

  const openKadenAdmin = () => {
    setKadenAdminOpen(true);
    setOwnerAdminOpen(false);
    setFrontGatePlayOpen(false);
    setActiveKadenFeature(kadenOrbitHouseUpgrades[0]);
    setGateOpen(true);
    setShowParkSigns(true);
    setActiveStop({
      title: "DormMageddon House",
      body: "Kaden Admin access opened for DormMageddon House."
    });
    setStatus("Kaden Admin opened for DormMageddon House only.");
  };

  const runFrontGateEffect = (mode) => {
    setFrontGateMode(mode);

    if (mode === "Open Gate") {
      setGateOpen(true);
      setStatus("Front Gate Play Console opened the gate for the live scene.");
      return;
    }

    if (mode === "Close Gate") {
      setGateOpen(false);
      setStatus("Front Gate Play Console closed the gate.");
      return;
    }

    if (mode === "Parking Lot Rush") {
      setStatus("Parking Lot Rush activated.");
      return;
    }

    if (mode === "Gold Mine Rumble") {
      setStatus("Gold Mine Rumble activated.");
      return;
    }

    if (mode === "Guest Spotlight") {
      setStatus("Guest Spotlight activated.");
      return;
    }

    if (mode === "Hotel Check-In Glow") {
      setStatus("Hotel Check-In Glow activated for lodging and sponsor flow.");
      return;
    }

    if (mode === "Apartment Booking Glow") {
      setStatus("Apartment Booking Glow activated for building leads and relocation offers.");
      return;
    }

    if (mode === "Sponsor Spotlight") {
      setStatus("Sponsor Spotlight activated for paid placement, signs, rooms, and E-TV promos.");
      return;
    }

    if (mode === "DormMageddon House Glow") {
      setStatus("DormMageddon House Play Mode activated. Kaden remains restricted to DormMageddon only.");
      return;
    }

    if (mode === "Kids Special Event Glow") {
      setStatus("GENIUNAIRE K!DDZ-K!DDZ PLANET special event glow staged for owner-side kid-safe routing.");
      return;
    }

    setStatus(`${mode} activated.`);
  };

  const activatePlayFeature = (feature) => {
    setActivePlayFeature(feature);
    setAnnouncement(feature.body);
    setStatus(`${feature.title} selected in Front Gate Play Console.`);
  };

  const activateKadenFeature = (feature) => {
    setActiveKadenFeature(feature);
    setAnnouncement(feature.body);
    setStatus(`${feature.title} selected inside DormMageddon House. Kaden access remains restricted.`);
  };

  const activateKidsFeature = (feature) => {
    setActiveKidsFeature(feature);
    setAnnouncement(feature.body);
    setStatus(`${feature.title} selected for GENIUNAIRE K!DDZ-K!DDZ PLANET special events.`);
  };

  return (
    <main className="gm-front-gate">
      <section className="gm-front-park-scene">
        <nav className="gm-booth-row">
          {booths.map((item) => (
            <button key={item.key} onClick={() => chooseBooth(item)}>
              {item.label}
            </button>
          ))}
          <button className="music-btn" onClick={changeMusic}>Park Music</button>
          <button className="kaden-btn" onClick={openKadenAdmin}>Kaden House Play</button>
        </nav>

        <section className={`gm-front-picture ${frontGateMode.toLowerCase().replaceAll(" ", "-")}`}>
          <div className="gm-night-sky">
            <span className="star s1" />
            <span className="star s2" />
            <span className="star s3" />
            <span className="moon" />
          </div>

          <div className="gm-theme-park-title">
            <p>Geniunaire MasterMinds</p>
            <h1>Online Virtual Theme Park</h1>
            <span>Atlanta, GA</span>
          </div>

          <div className="gm-city-district">
            <div className="hotel-building">
              <div className="building-sign">HOTEL DISTRICT</div>
              <div className="building-windows">
                {Array.from({ length: 16 }).map((_, index) => <span key={`hotel-window-${index}`} />)}
              </div>
              <strong>Hotel Check-In</strong>
            </div>

            <div className="apartment-building">
              <div className="building-sign">APARTMENT BUILDING</div>
              <div className="building-windows apt-windows">
                {Array.from({ length: 20 }).map((_, index) => <span key={`apt-window-${index}`} />)}
              </div>
              <strong>Apartment Building</strong>
            </div>
          </div>

          <div className="gm-front-gate-art">
            <div className="park-tower">
              <span>VIP</span>
            </div>

            <div className="main-gate-building">
              <div className="gold-mine-glow">GOLD MINE</div>
              <h2>Geniunaire MasterMinds Front Gate</h2>
              <p>Tickets • Parking • GM E-TV Network • ThreadFolio Set • VIP Entry</p>

              <div className={`gate-doors ${gateOpen ? "gate-open" : ""}`}>
                <span />
                <span />
              </div>
            </div>

            <div className="park-tower">
              <span>ENTRY</span>
            </div>
          </div>

          <div className="sponsor-lane">
            <div>
              <strong>SPONSOR LANE</strong>
              <span>Paid signs • E-TV commercials • Hotel rooms • Apartment placements • Day-pass promos</span>
            </div>
            <button type="button" onClick={() => runFrontGateEffect("Sponsor Spotlight")}>Activate Sponsor Spotlight</button>
          </div>

          <div className="ticket-lot-row">
            <div className="lot-booth">
              <strong>Ticket Booth</strong>
              <span>{selected ? selected.booth : "Choose A Booth"}</span>
            </div>
            <div className="lot-booth">
              <strong>Hotel / Apartment</strong>
              <span>Booking / Leads</span>
            </div>
            <div className="lot-booth">
              <strong>Security</strong>
              <span>Park Rules Apply</span>
            </div>
          </div>

          <div className="parking-lot">
            <div className="lot-label">LIVE PARKING LOT</div>
            <div className="moving-car car-a"><span /></div>
            <div className="moving-car car-b"><span /></div>
            <div className="moving-car car-c"><span /></div>
            <div className="moving-car car-d"><span /></div>
            <div className="parked-car p1" />
            <div className="parked-car p2" />
            <div className="parked-car p3" />
            <div className="parked-car p4" />
          </div>
        </section>

        <section className="gate-grid">
          <article className="ticket-booth">
            <p className="panel-kicker">Front Gate Check-In</p>
            <h2>{selected ? selected.booth : "Ticket Booth Waiting"}</h2>
            <p>{selected ? selected.note : "The park front is live. Guests must check in before the gate opens."}</p>

            {selected && (
              <div className="status-box">
                <span>Selected Booth</span>
                <strong>{selected.label}</strong>
                <small>Requirement: Guest Info</small>
              </div>
            )}

            <div className="status-box">
              <span>Guest Sign Up / Check In</span>
              <input placeholder="Name / Stage Name REQUIRED" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} />
              <input placeholder="Email REQUIRED" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} />
              <input placeholder="Phone / Optional" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} />
            </div>

            <div className="status-box">
              <span>Gate Status</span>
              <strong>{status}</strong>
              <small>Music: {music}</small>
              <small>Front Gate Mode: {frontGateMode}</small>
            </div>

            <button className="open-gate-btn" onClick={submitGate}>
              Submit Info / Open Gate
            </button>
          </article>

          <article className="secure-access-booth">
            <p className="panel-kicker cyan">Secure Access</p>
            <h2>Owner / Front Gate Play / Kaden</h2>
            <p>Codes are hidden. Access opens the correct control area without showing the code on the park screen.</p>

            <div className="status-box">
              <span>Owner Admin</span>
              <input type="password" placeholder="Owner code" value={ownerCode} onChange={(e) => setOwnerCode(e.target.value)} />
              <button className="open-gate-btn" onClick={submitOwnerCode}>Open Owner Admin</button>
            </div>

            <div className="status-box play-access-box">
              <span>Front Gate Play</span>
              <input type="password" placeholder="Front gate play code" value={playCode} onChange={(e) => setPlayCode(e.target.value)} />
              <button className="open-gate-btn" onClick={submitFrontGatePlayCode}>Open Restored Front Gate Play</button>
              <small>Restores richer owner-side play controls for gate, crowd, music, sponsor, Orbit Machine, and safety checks.</small>
            </div>

            <button className="kaden-admin-wide" onClick={openKadenAdmin}>Open Kaden House Play / DormMageddon House</button>
          </article>
        </section>

        {frontGatePlayOpen && (
          <section className="control-room front-play-room">
            <div className="control-room-header">
              <p>RESTORED FRONT GATE PLAY CONSOLE</p>
              <h2>Owner-Side Gate Play Controls</h2>
              <span>Use this to play with guests at the gate without opening Owner Admin. This is the fuller play stack, not an empty button.</span>
            </div>

            <div className="control-button-grid">
              <button onClick={() => runFrontGateEffect("Open Gate")}>Open Gate</button>
              <button onClick={() => runFrontGateEffect("Close Gate")}>Close Gate</button>
              <button onClick={() => runFrontGateEffect("Parking Lot Rush")}>Parking Lot Rush</button>
              <button onClick={() => runFrontGateEffect("Gold Mine Rumble")}>Gold Mine Rumble</button>
              <button onClick={() => runFrontGateEffect("Guest Spotlight")}>Guest Spotlight</button>
              <button onClick={() => runFrontGateEffect("Hotel Check-In Glow")}>Hotel Check-In Glow</button>
              <button onClick={() => runFrontGateEffect("Apartment Booking Glow")}>Apartment Booking Glow</button>
              <button onClick={() => runFrontGateEffect("Sponsor Spotlight")}>Sponsor Spotlight</button>
              <button onClick={() => runFrontGateEffect("DormMageddon House Glow")}>DormMageddon House Glow</button>
              <button onClick={() => runFrontGateEffect("Kids Special Event Glow")}>K!DDZ Event Glow</button>
              <button onClick={() => setAnnouncement("The gate crew is watching. Choose your booth and check in.")}>Gate Announcement</button>
              <button onClick={changeMusic}>Swap Gate Music</button>
            </div>

            <div className="mini-control-panel">
              <div className="park-sign-header compact">
                <p>PLAY BUTTON UPGRADES</p>
                <h2>Front Gate Play Stack</h2>
                <span>Pick a play feature to stage the exact action and announcement.</span>
              </div>
              <div className="admin-zone-grid compact-grid">
                {frontGatePlayUpgrades.map((feature) => (
                  <button key={feature.title} onClick={() => activatePlayFeature(feature)}>
                    <strong>{feature.title}</strong>
                    <span>{feature.body}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="inside-status feature-status">
              <p>Active Play Feature</p>
              <h2>{activePlayFeature.title}</h2>
              <span>{activePlayFeature.body}</span>
              <small>Mode: {frontGateMode}</small>
            </div>
          </section>
        )}

        {ownerAdminOpen && (
          <section className="control-room owner-admin-room">
            <div className="control-room-header">
              <p>OWNER ADMIN CONTROL ROOM</p>
              <h2>Geniunaire MasterMinds Command</h2>
              <span>Founder access, vault logs, emergency build guide, Party Crashers of Atlanta, NightOwl Hideout Pool Lounge & Discovery Bar, GM E-TV, ThreadFolio Set, lodging, sponsor flow, Universal Client Admin controls, and owner-side K!DDZ special event routing.</span>
            </div>

            <div className="admin-zone-grid">
              {adminZones.map((zone) => (
                <button key={zone.title} onClick={() => setActiveAdminZone(zone)}>
                  <strong>{zone.title}</strong>
                  <span>{zone.body}</span>
                </button>
              ))}
            </div>

            <div className="inside-status">
              <p>Selected Admin Area</p>
              <h2>{activeAdminZone.title}</h2>
              <span>{activeAdminZone.body}</span>
            </div>

            <section className="kids-control-panel">
              <div className="control-room-header kids-header">
                <p>GENIUNAIRE K!DDZ-K!DDZ PLANET CONTROL PANEL</p>
                <h2>Gate + Rides Special Events</h2>
                <span>Owner-side kid-safe event control. This is separate from Kaden Admin and does not give Kaden kid-site management.</span>
              </div>

              <div className="admin-zone-grid compact-grid kids-grid">
                {kidsSpecialEventControls.map((feature) => (
                  <button key={feature.title} onClick={() => activateKidsFeature(feature)}>
                    <strong>{feature.title}</strong>
                    <span>{feature.body}</span>
                  </button>
                ))}
              </div>

              <div className="inside-status feature-status kids-status">
                <p>Active K!DDZ Event Feature</p>
                <h2>{activeKidsFeature.title}</h2>
                <span>{activeKidsFeature.body}</span>
              </div>
            </section>
          </section>
        )}

        {kadenAdminOpen && (
          <section className="control-room kaden-admin-room">
            <div className="control-room-header">
              <p>KADEN HOUSE PLAY ACCESS</p>
              <h2>DormMageddon House</h2>
              <span>Campus creator ecosystem, watch rooms, student survival offers, merch, Orbit features, and house play upgrades. Kaden manages DormMageddon only.</span>
            </div>

            <div className="admin-zone-grid">
              {kadenOrbitHouseUpgrades.map((feature) => (
                <button key={feature.title} onClick={() => activateKadenFeature(feature)}>
                  <strong>{feature.title}</strong>
                  <span>{feature.body}</span>
                </button>
              ))}
            </div>

            <div className="inside-status feature-status kaden-status">
              <p>Active DormMageddon / Kaden Feature</p>
              <h2>{activeKadenFeature.title}</h2>
              <span>{activeKadenFeature.body}</span>
            </div>
          </section>
        )}

        {showParkSigns && (
          <section className="park-sign-area">
            <div className="park-sign-header">
              <p>INSIDE THE FRONT GATE</p>
              <h2>Park Sign Trail</h2>
              <span>Signs appear only after entry.</span>
            </div>

            <div className="park-sign-board">
              {parkStops.map((stop) => (
                <button key={stop.title} onClick={() => setActiveStop(stop)}>
                  <strong>{stop.title}</strong>
                  <span>{stop.body}</span>
                  <em>Walk This Way</em>
                </button>
              ))}
            </div>

            <div className="inside-status">
              <p>Park Guide</p>
              <h2>{activeStop ? activeStop.title : "Choose a park sign."}</h2>
              <span>{activeStop ? activeStop.body : "The gate is open. The park is live."}</span>
            </div>
          </section>
        )}

        <section className="phase-two-board">
          <div className="park-sign-header">
            <p>PHASE 2 / AUTO-MONEY UPGRADE BOARD</p>
            <h2>Ready-To-Wire Expansion Notes</h2>
            <span>Added because these connect directly to hotel/apartment booking, sponsorship, checkout, and GM E-TV revenue.</span>
          </div>

          <div className="admin-zone-grid">
            {phaseTwoUpgrades.map((upgrade) => (
              <button key={upgrade.title}>
                <strong>{upgrade.title}</strong>
                <span>{upgrade.body}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="gate-bottom-bar">
          <span>Front Gate Live</span>
          <span>Parking Lot Active</span>
          <span>Hotel / Apartment Building</span>
          <span>Secure Access Hidden</span>
          <span>ThreadFolio Set</span>
          <span>GM E-TV Network</span>
          <span>Restored Play Button</span>
          <span>Kaden House Play</span>
          <span>GENIUNAIRE K!DDZ-K!DDZ PLANET Events</span>
        </section>
      </section>
    </main>
  );
}
