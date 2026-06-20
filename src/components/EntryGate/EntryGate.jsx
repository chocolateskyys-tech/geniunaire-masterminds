import React, { useState } from "react";
import MainStreetPlaza from "../MainStreetPlaza/MainStreetPlaza";
import CrowdControl from "../CrowdControl/CrowdControl";
import "./EntryGate.css";

const SECRET_ADMIN = "ASPIRE!";
const SECRET_PLAY = "ORBIT!";

const gateButtons = [
  {
    key: "free",
    label: "Free Sign Up",
    title: "Free Limited Guest Pass",
    pass: "Guest Pass",
    price: "Free",
    info: "Create a limited access guest pass. Browse the park, preview rooms, and upgrade when ready."
  },
  {
    key: "etv",
    label: "E-TV Lounge",
    title: "E-TV Lounge Preview",
    pass: "E-TV Preview Pass",
    price: "Preview / Monthly Signal",
    info: "Enter the E-TV Lounge to watch commercials, TV drops, ads, affiliate previews, and E-TV Book programming."
  },
  {
    key: "walk",
    label: "Walk The Park",
    title: "Walk The Park Ticket",
    pass: "Park Walk Pass",
    price: "Ticket / Clone Optional",
    info: "Open the front gate tunnel and enter Main Street Plaza to walk the full virtual theme park."
  },
  {
    key: "chill",
    label: "Chill In E-TV Lounge",
    title: "Chill Lounge Access",
    pass: "E-TV Lounge Pass",
    price: "Signal Plan",
    info: "Sit in the lounge, watch programmed screens, commercials, affiliate ads, and entertainment drops."
  },
  {
    key: "casting",
    label: "Casting / E-TV Network",
    title: "Casting & Network Verification",
    pass: "Casting Pass",
    price: "Verification Required",
    info: "Talent signs in, accepts agreements, reviews rules and bylaws, verifies identity, then enters broadcast review."
  },
  {
    key: "subscribers",
    label: "Subscribers",
    title: "Subscriber Entrance",
    pass: "Subscriber Pass",
    price: "Monthly Signal",
    info: "Subscribers enter E-TV Book, monthly stream plans, programmed drops, and signal access."
  },
  {
    key: "thread",
    label: "Thread Clients",
    title: "Thread Client Onboarding",
    pass: "Thread Client Pass",
    price: "Client Setup",
    info: "Thread clients enter onboarding, admin handoff, website setup, business setup, and prepaid build requests."
  },
  {
    key: "celeb",
    label: "Celeb Verification",
    title: "Celebrity Security Booth",
    pass: "Celebrity Pass",
    price: "Security Review",
    info: "Celebrities enter tight verification, marketplace placement, promo TV, booking review, and security approval."
  }
];

export default function EntryGate({
  onEnterDreamLab,
  onEnterMoneyTracker,
  onRequestClearance,
  onFounderAccess,
  onEnterAiality,
}) {
  const [selected, setSelected] = useState(null);
  const [insidePark, setInsidePark] = useState(false);
  const [crowdConsole, setCrowdConsole] = useState(false);
  const [cloneRoam, setCloneRoam] = useState(false);
  const [secretBox, setSecretBox] = useState("");
  const [gateStatus, setGateStatus] = useState("Closed");
  const [musicMode, setMusicMode] = useState("Crowd Mix 01");
  const [crowdLevel, setCrowdLevel] = useState("Normal");
  const [signup, setSignup] = useState({ name: "", email: "", phone: "" });

  if (cloneRoam) return <CloneRoam onBack={() => setCloneRoam(false)} />;
  if (crowdConsole) return <CrowdControl onBack={() => setCrowdConsole(false)} />;
  if (crowdConsole) return <CrowdControl onBack={() => setCrowdConsole(false)} />;
  if (crowdConsole) return <CrowdControl onBack={() => setCrowdConsole(false)} />;
  if (insidePark) return <MainStreetPlaza />;

  const chooseGate = (item) => {
    setSelected(item);
    setGateStatus(`${item.label} booth loaded`);
    localStorage.setItem("gm_selected_gate", JSON.stringify(item));
  };

  const changeMusic = () => {
    const mixes = [
      "Crowd Mix 01",
      "Tunnel Rumble",
      "Clone Parade",
      "E-TV Lounge Ads",
      "Park Walk Loop",
      "Atlanta Gate Brass"
    ];
    const next = mixes[Math.floor(Math.random() * mixes.length)];
    setMusicMode(next);
    localStorage.setItem("gm_gate_music", next);
  };

  const submitTicket = () => {
    if (!selected) {
      setGateStatus("Choose a gate button first");
      return;
    }

    localStorage.setItem(
      "gm_gate_signup",
      JSON.stringify({
        selected,
        signup,
        time: new Date().toISOString()
      })
    );

    setGateStatus("Ticket accepted. Gate opening...");
    setTimeout(() => setGateStatus("Tunnel rumble active..."), 500);

    setTimeout(() => {
      if (selected.key === "subscribers") {
        onEnterMoneyTracker?.();
        return;
      }

      if (selected.key === "thread") {
        onEnterDreamLab?.();
        return;
      }

      if (selected.key === "celeb") {
        onRequestClearance?.();
        return;
      }

      if (selected.key === "etv" || selected.key === "chill" || selected.key === "casting") {
        onEnterAiality?.();
        return;
      }

      setInsidePark(true);
    }, 1000);
  };

  const rentClone = (pass) => {
    localStorage.setItem("gm_clone_pass", pass);
    setGateStatus(`${pass} activated`);
    setCloneRoam(true);
  };

  const unlockSecret = () => {
    if (secretBox === SECRET_ADMIN) {
      onFounderAccess?.();
      return;
    }

    if (secretBox === SECRET_PLAY) {
      setCrowdConsole(true);
      return;
    }

    setGateStatus("Secret access denied");
  };
  return (
    <main className="gm-front-gate">
      <section className="gm-gate-shell">
        <nav className="gm-gate-nav">
          {gateButtons.map((item) => (
            <button
              key={item.key}
              type="button"
              className={selected?.key === item.key ? "active-gate-btn" : ""}
              onClick={() => chooseGate(item)}
            >
              {item.label}
            </button>
          ))}

          <button type="button" className="music-btn" onClick={changeMusic}>
            Park Music
          </button>

          <button type="button" className="play-gate-btn" onClick={() => setCrowdConsole(true)}>
            Play Gate
          </button>

          <button type="button" className="ghost-admin" onClick={onFounderAccess}>
            ◌
          </button>
        </nav>

        <div className="selected-gate-strip">
          <strong>SELECTED:</strong>{" "}
          {selected ? `${selected.label} → ${selected.title}` : "No booth selected yet"}
        </div>

        <section className="gm-hero-gate">
          <div className="gate-topline">
            GENIUNAIRE MASTERMINDS ONLINE VIRTUAL THEME PARK — ATLANTA, GA
          </div>

          <div className="gate-visual">
            <div className="gate-tower left">
              <span>Tickets & Entry</span>
            </div>

            <div
              className={`gate-arch ${
                gateStatus.toLowerCase().includes("opening") ||
                gateStatus.toLowerCase().includes("rumble")
                  ? "gate-open"
                  : ""
              }`}
            >
              <h1>GENIUNAIRE MASTERMINDS</h1>
              <p>Virtual Theme Park</p>
              <small>Atlanta, GA</small>
              <div className="gate-doors">
                <span />
                <span />
              </div>
            </div>

            <div className="gate-tower right">
              <span>Clone Rental</span>
            </div>
          </div>

          <div className="crowd-row">
            {Array.from({ length: crowdLevel === "Maximum" ? 34 : 18 }).map((_, i) => (
              <span key={i} className="crowd-person" />
            ))}
          </div>
        </section>

        <section className="gate-grid">
          <article className="ticket-booth">
            <p className="panel-kicker">Front Gate Ticket Booth</p>
            <h2>{selected ? selected.title : "Choose Your Entrance"}</h2>
            <p>
              {selected
                ? selected.info
                : "Pick a gate button above. Every guest goes through a booth before the gate opens."}
            </p>

            {selected && (
              <div className="status-box">
                <span>Active Booth</span>
                <strong>{selected.label}</strong>
                <small>Pass: {selected.pass}</small>
                <small>Price / Requirement: {selected.price}</small>
              </div>
            )}

            <div className="status-box">
              <span>Guest Sign Up / Check In</span>
              <input
                placeholder="Name / Stage Name"
                value={signup.name}
                onChange={(e) => setSignup({ ...signup, name: e.target.value })}
              />
              <input
                placeholder="Email"
                value={signup.email}
                onChange={(e) => setSignup({ ...signup, email: e.target.value })}
              />
              <input
                placeholder="Phone / Optional"
                value={signup.phone}
                onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
              />
            </div>

            <div className="status-box">
              <span>Gate Status</span>
              <strong>{gateStatus}</strong>
              <small>Music: {musicMode}</small>
              <small>Crowd: {crowdLevel}</small>
              <small>Pass: {selected ? selected.pass : "None selected"}</small>
            </div>

            <button className="open-gate-btn" type="button" onClick={submitTicket}>
              Sign / Verify / Open Gate
            </button>

            <div className="status-box">
              <span>Secret Access</span>
              <input
                placeholder="GM PLAY DAY!"
                value={secretBox}
                onChange={(e) => setSecretBox(e.target.value)}
              />
              <button className="open-gate-btn" type="button" onClick={unlockSecret}>
                Unlock
              </button>
            </div>
          </article>

          <article className="clone-machine">
            <p className="panel-kicker cyan">Mini Clone Bot Machine</p>
            <h2>Come Inside The Screen</h2>
            <p>
              Rent a mini clone body to walk, shop, sit, chill, watch TV, and roam the park virtually.
            </p>

            <button type="button" onClick={() => rentClone("$5 / Hour Clone Rental")}>
              $5 / Hour
            </button>
            <button type="button" onClick={() => rentClone("Day Pass Clone Rental")}>
              Day Pass
            </button>
            <button type="button" onClick={() => rentClone("Monthly Clone Pass")}>
              Monthly Clone Pass
            </button>

            <button
              type="button"
              onClick={() => {
                setCrowdLevel(crowdLevel === "Maximum" ? "Normal" : "Maximum");
                setGateStatus("Crowd level changed");
              }}
            >
              Test Crowd
            </button>
          </article>
        </section>

        <section className="gate-bottom-bar">
          <span>E-TV Book runs media.</span>
          <span>Thread Set runs business.</span>
          <span>Clone Bots operate the park.</span>
        </section>
      </section>
    </main>
  );
}
