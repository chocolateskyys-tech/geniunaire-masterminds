import React, { useState } from "react";
import "./EntryGate.css";

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
    body: "Master power cave, vault energy, owner signal, park control, and GM command center."
  },
  {
    title: "ThreadFolio Set Pavilion",
    body: "ThreadFolio, E-Folio, E-Map, client builds, launch packages, and business setup."
  },
  {
    title: "GM E-TV Network Row",
    body: "E-TV Book models, signal plans, scheduled drops, commercials, living-book programming, and broadcast access."
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
    title: "GM Pay Desk",
    body: "Tickets, GM E-TV streams, guest passes, subscriptions, prepaid builds, and client checkout."
  }
];

const adminZones = [
  {
    title: "Owner Admin Control Room",
    body: "Founder access, GM command, gate operations, visitor routing, park controls, and override access."
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
    title: "PCOA",
    body: "PCOA access point, business routing, paperwork, approvals, and official park-side processing."
  },
  {
    title: "NightOwl Hideout GM E-TV Network & Business Plan",
    body: "NightOwl Hideout placement, GM E-TV Network plan, service model, business plan, and club-side rollout."
  },
  {
    title: "GM E-TV Programming Console",
    body: "E-TV Store, Signal Plans, Wired Rooms, Programming Scheduler, Signal Clipping System, and founder override."
  },
  {
    title: "ThreadFolio Set Admin",
    body: "ThreadFolio, E-Folio, E-Map, client setup, business setup, launch package, and handoff control."
  },
  {
    title: "DormMageddon House Admin",
    body: "Kaden access, campus creator hub, student watch rooms, side-hustle lanes, merch, and DormMageddon rollout."
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
    const tracks = ["Atlanta Gate Brass", "Parking Lot Bass", "Gold Mine Rumble", "GM E-TV Street Mix", "Main Gate Drumline"];
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
      setStatus("Front Gate Play Console opened.");
      return;
    }

    setFrontGatePlayOpen(false);
    setStatus("Front Gate Play access denied.");
  };

  const openKadenAdmin = () => {
    setKadenAdminOpen(true);
    setOwnerAdminOpen(false);
    setFrontGatePlayOpen(false);
    setGateOpen(true);
    setShowParkSigns(true);
    setActiveStop({
      title: "DormMageddon House",
      body: "Kaden Admin access opened for DormMageddon House."
    });
    setStatus("Kaden Admin opened for DormMageddon House.");
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

    setStatus(`${mode} activated.`);
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
          <button className="kaden-btn" onClick={openKadenAdmin}>Kaden Admin</button>
        </nav>

        <section className={`gm-front-picture ${frontGateMode.toLowerCase().replaceAll(" ", "-")}`}>
          <div className="gm-night-sky">
            <span className="star s1" />
            <span className="star s2" />
            <span className="star s3" />
            <span className="moon" />
          </div>

          <div className="gm-theme-park-title">
            <p>GENIUNAIRE MASTERMINDS</p>
            <h1>ONLINE VIRTUAL THEME PARK</h1>
            <span>ATLANTA, GA</span>
          </div>

          <div className="gm-front-gate-art">
            <div className="park-tower">
              <span>VIP</span>
            </div>

            <div className="main-gate-building">
              <div className="gold-mine-glow">GOLD MINE</div>
              <h2>GM FRONT GATE</h2>
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

          <div className="ticket-lot-row">
            <div className="lot-booth">
              <strong>Ticket Booth</strong>
              <span>{selected ? selected.booth : "Choose A Booth"}</span>
            </div>
            <div className="lot-booth">
              <strong>Guest Pass</strong>
              <span>Info Required</span>
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
            <h2>Owner / Front Gate / Kaden</h2>
            <p>Codes are hidden. Access opens the correct control area without showing the code on the park screen.</p>

            <div className="status-box">
              <span>Owner Admin</span>
              <input type="password" placeholder="Owner code" value={ownerCode} onChange={(e) => setOwnerCode(e.target.value)} />
              <button className="open-gate-btn" onClick={submitOwnerCode}>Open Owner Admin</button>
            </div>

            <div className="status-box">
              <span>Front Gate Play</span>
              <input type="password" placeholder="Front gate play code" value={playCode} onChange={(e) => setPlayCode(e.target.value)} />
              <button className="open-gate-btn" onClick={submitFrontGatePlayCode}>Open Front Gate Play</button>
            </div>

            <button className="kaden-admin-wide" onClick={openKadenAdmin}>Open Kaden Admin / DormMageddon House</button>
          </article>
        </section>

        {frontGatePlayOpen && (
          <section className="control-room front-play-room">
            <div className="control-room-header">
              <p>FRONT GATE PLAY CONSOLE</p>
              <h2>Operate The Live Front Gate Scene</h2>
              <span>Use this to play with guests at the gate without opening Owner Admin.</span>
            </div>

            <div className="control-button-grid">
              <button onClick={() => runFrontGateEffect("Open Gate")}>Open Gate</button>
              <button onClick={() => runFrontGateEffect("Close Gate")}>Close Gate</button>
              <button onClick={() => runFrontGateEffect("Parking Lot Rush")}>Parking Lot Rush</button>
              <button onClick={() => runFrontGateEffect("Gold Mine Rumble")}>Gold Mine Rumble</button>
              <button onClick={() => runFrontGateEffect("Guest Spotlight")}>Guest Spotlight</button>
              <button onClick={() => setAnnouncement("The gate crew is watching. Choose your booth and check in.")}>Gate Announcement</button>
            </div>

            <div className="inside-status">
              <p>Live Announcement</p>
              <h2>{announcement}</h2>
              <span>Mode: {frontGateMode}</span>
            </div>
          </section>
        )}

        {ownerAdminOpen && (
          <section className="control-room owner-admin-room">
            <div className="control-room-header">
              <p>OWNER ADMIN CONTROL ROOM</p>
              <h2>Geniunaire MasterMinds Command</h2>
              <span>Founder access, vault logs, emergency build guide, PCOA, NightOwl, GM E-TV, and ThreadFolio Set controls.</span>
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
          </section>
        )}

        {kadenAdminOpen && (
          <section className="control-room kaden-admin-room">
            <div className="control-room-header">
              <p>KADEN ADMIN ACCESS</p>
              <h2>DormMageddon House</h2>
              <span>Campus creator ecosystem, watch rooms, student survival offers, merch, and creator hub access.</span>
            </div>

            <div className="admin-zone-grid">
              <button>
                <strong>DormMageddon Creator Hub</strong>
                <span>Artists, writers, editors, voice actors, creators, and student collaborators.</span>
              </button>
              <button>
                <strong>DormMageddon Watch Rooms</strong>
                <span>Community watch spaces, campus drops, student events, and scheduled sessions.</span>
              </button>
              <button>
                <strong>Side Hustle / Student Survival</strong>
                <span>Student resources, campus ambassador path, survival drops, and money lanes.</span>
              </button>
              <button>
                <strong>Merch & Alliance Drops</strong>
                <span>DormMageddon merch, limited drops, creator economy offers, and campus release items.</span>
              </button>
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

        <section className="gate-bottom-bar">
          <span>Front Gate Live</span>
          <span>Parking Lot Active</span>
          <span>Secure Access Hidden</span>
          <span>ThreadFolio Set</span>
          <span>GM E-TV Network</span>
          <span>DormMageddon House</span>
        </section>
      </section>
    </main>
  );
}
