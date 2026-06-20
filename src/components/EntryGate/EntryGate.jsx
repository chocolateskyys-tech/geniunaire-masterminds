import React, { useState } from "react";
import MainStreetPlaza from "../MainStreetPlaza/MainStreetPlaza";
import "./EntryGate.css";

const gateButtons = [
  "Free Sign Up",
  "E-TV Lounge",
  "Walk The Park",
  "Chill In E-TV Lounge",
  "Casting / E-TV Network",
  "Subscribers",
  "Thread Clients",
  "Celeb Verification"
];

const musicModes = [
  "Crowd Mix 01",
  "Atlanta Gate Brass",
  "Tunnel Rumble",
  "Clone Parade",
  "E-TV Lounge Ads",
  "Night Park Pulse"
];

export default function EntryGate({
  onEnterDreamLab,
  onEnterMoneyTracker,
  onRequestClearance,
  onFounderAccess,
  onEnterAiality,
}) {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [insidePark, setInsidePark] = useState(false);
  const [gateStatus, setGateStatus] = useState("Closed");
  const [musicMode, setMusicMode] = useState("Crowd Mix 01");
  const [crowdLevel, setCrowdLevel] = useState("Normal");
  const [clonePass, setClonePass] = useState("");

  if (insidePark) return <MainStreetPlaza />;

  const chooseTicket = (ticket) => {
    setSelectedTicket(ticket);
    setGateStatus("Ticket Selected");
  };

  const rentClone = (pass) => {
    setClonePass(pass);
    setSelectedTicket(pass);
    setGateStatus("Clone Body Reserved");
    localStorage.setItem("gm_clone_pass", pass);
  };

  const openGate = () => {
    if (!selectedTicket) return;
    setGateStatus("Ticket Verified");
    setTimeout(() => setGateStatus("Gate Opening"), 450);
    setTimeout(() => setGateStatus("Tunnel Rumble Active"), 850);
    setTimeout(() => setInsidePark(true), 1450);
  };

  const changeMusic = () => {
    const next = musicModes[Math.floor(Math.random() * musicModes.length)];
    setMusicMode(next);
    localStorage.setItem("gm_gate_music", next);
  };

  const crowdPlay = () => {
    const levels = ["Light", "Normal", "Heavy", "Maximum"];
    const next = levels[(levels.indexOf(crowdLevel) + 1) % levels.length];
    setCrowdLevel(next);
    setGateStatus(`Crowd Control: ${next}`);
  };

  const routeButton = (ticket) => {
    chooseTicket(ticket);

    if (ticket === "E-TV Lounge" || ticket === "Chill In E-TV Lounge") onEnterAiality?.();
    if (ticket === "Casting / E-TV Network") onEnterAiality?.();
    if (ticket === "Subscribers") onEnterMoneyTracker?.();
    if (ticket === "Thread Clients") onEnterDreamLab?.();
    if (ticket === "Celeb Verification") onRequestClearance?.();
  };

  return (
    <main className="gm-front-gate">
      <section className="gm-gate-shell">
        <nav className="gm-gate-nav">
          {gateButtons.map((button) => (
            <button key={button} onClick={() => routeButton(button)}>
              {button}
            </button>
          ))}

          <button className="music-btn" onClick={changeMusic}>Change Park Music</button>
          <button className="ghost-admin" onClick={onFounderAccess}>Owner Access</button>
          <button className="ghost-admin" onClick={crowdPlay}>Crowd Control</button>
        </nav>

        <section className="gm-hero-gate">
          <div className="gate-topline">GENIUNAIRE MASTERMINDS ONLINE VIRTUAL THEME PARK — ATLANTA, GA</div>

          <div className="gate-visual">
            <div className="gate-tower left">
              <span>Tickets & Entry</span>
            </div>

            <div className={`gate-arch ${gateStatus.includes("Opening") || gateStatus.includes("Tunnel") ? "gate-open" : ""}`}>
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
            {Array.from({ length: crowdLevel === "Maximum" ? 34 : crowdLevel === "Heavy" ? 25 : crowdLevel === "Light" ? 10 : 18 }).map((_, index) => (
              <span key={index} className="crowd-person" />
            ))}
          </div>
        </section>

        <section className="gate-grid">
          <article className="ticket-booth">
            <p className="panel-kicker">Front Gate Ticket Booth</p>
            <h2>{selectedTicket || "Choose Your Entrance"}</h2>
            <p>Pick your pass, verify entry, activate the tunnel, and walk into the park.</p>

            <div className="status-box">
              <span>Gate Status</span>
              <strong>{gateStatus}</strong>
              <small>Music: {musicMode}</small>
              <small>Crowd: {crowdLevel}</small>
              {clonePass && <small>Clone Pass: {clonePass}</small>}
            </div>

            <button className="open-gate-btn" onClick={openGate} disabled={!selectedTicket}>
              Pay / Verify / Open Gate
            </button>
          </article>

          <article className="clone-machine">
            <p className="panel-kicker cyan">Mini Clone Bot Machine</p>
            <h2>Come Inside The Screen</h2>
            <p>Rent a mini clone body to walk, shop, chill, watch TV, visit rooms, and return to the hub.</p>

            <button onClick={() => rentClone("$5 / Hour Clone Rental")}>$5 / Hour</button>
            <button onClick={() => rentClone("Day Pass Clone Rental")}>Day Pass</button>
            <button onClick={() => rentClone("Monthly Clone Pass")}>Monthly Clone Pass</button>
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
