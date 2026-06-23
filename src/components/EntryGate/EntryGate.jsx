import React, { useState } from "react";
import "./EntryGate.css";

const OWNER_CODE = "ASPIRE!";

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
    note: "Name and email required before pay desk access."
  },
  {
    key: "etv",
    label: "E-TV Network",
    booth: "Broadcast Gate",
    note: "Name and email required before E-TV access."
  },
  {
    key: "thread",
    label: "Thread Set",
    booth: "Builder Gate",
    note: "Name and email required before Thread Set access."
  },
  {
    key: "casting",
    label: "Casting Gate",
    booth: "Casting Security",
    note: "Name and email required before casting access."
  },
  {
    key: "vip",
    label: "VIP Gate",
    booth: "VIP Entry",
    note: "Name and email required before VIP access."
  }
];

export default function EntryGate() {
  const [selected, setSelected] = useState(null);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [ownerCode, setOwnerCode] = useState("");
  const [status, setStatus] = useState("Front gate closed. Choose a booth or enter owner code.");
  const [music, setMusic] = useState("Atlanta Gate Brass");
  const [gateOpen, setGateOpen] = useState(false);

  const hasGuestInfo = () => guest.name.trim().length > 0 && guest.email.trim().length > 0;

  const chooseBooth = (booth) => {
    setSelected(booth);
    setGateOpen(false);
    setStatus(`${booth.label} selected. Name and email required before access opens.`);
    localStorage.setItem("gm_selected_booth", JSON.stringify(booth));
  };

  const changeMusic = () => {
    const tracks = ["Atlanta Gate Brass", "Parking Lot Bass", "Gold Mine Rumble", "E-TV Street Mix", "Main Gate Drumline"];
    setMusic(tracks[Math.floor(Math.random() * tracks.length)]);
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
    setStatus(`${selected.label} accepted. Gate opened for checked-in guest.`);
  };

  const submitOwnerCode = () => {
    if (ownerCode === OWNER_CODE) {
      setGateOpen(true);
      setStatus("OWNER ACCESS ACCEPTED. Front gate unlocked.");
      return;
    }

    setGateOpen(false);
    setStatus("Secret access denied.");
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
        </nav>

        <section className="gm-front-picture">
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
              <p>Tickets • Parking • E-TV Access • Thread Set • VIP Entry</p>

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
            </div>

            <button className="open-gate-btn" onClick={submitGate}>
              Submit Info / Open Gate
            </button>

            <div className="status-box">
              <span>Owner Secret Access</span>
              <input type="password" placeholder="Secret code" value={ownerCode} onChange={(e) => setOwnerCode(e.target.value)} />
              <button className="open-gate-btn" onClick={submitOwnerCode}>Submit Secret Code</button>
            </div>
          </article>

          <article className="guest-pass-booth">
            <p className="panel-kicker cyan">Guest Pass Booth</p>
            <h2>Day Pass Area</h2>
            <p>Visitors can check in, request access, and enter after name and email are submitted.</p>

            <button onClick={() => chooseBooth(booths[0])}>Walk The Park</button>
            <button onClick={() => chooseBooth(booths[1])}>GM Pay Desk</button>
            <button onClick={() => chooseBooth(booths[2])}>E-TV Access</button>
          </article>
        </section>

        <section className="gate-bottom-bar">
          <span>Front Gate Live</span>
          <span>Parking Lot Active</span>
          <span>Owner Code: ASPIRE</span>
        </section>
      </section>
    </main>
  );
}
