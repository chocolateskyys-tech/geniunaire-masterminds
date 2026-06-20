import React, { useState } from "react";
import MainStreetPlaza from "../MainStreetPlaza/MainStreetPlaza";
import CrowdControl from "../CrowdControl/CrowdControl";
import CloneRoam from "../CloneRoam/CloneRoam";
import "./EntryGate.css";

const SECRET_ADMIN = "ASPIRE!";
const SECRET_PLAY = "ORBIT!";

const gateButtons = [
  { key: "free", label: "Free Sign Up", destination: "Limited Guest Access", price: "Free", info: "Free limited browsing pass. Guest can look around before upgrading." },
  { key: "etv", label: "E-TV Lounge", destination: "E-TV Lounge Ticket Booth", price: "Preview / Signal Plan", info: "Watch commercials, TV drops, ads, E-TV Book previews, and monthly stream offers." },
  { key: "walk", label: "Walk The Park", destination: "Park Walk Ticket Booth", price: "Ticket / Clone Optional", info: "Open the gate tunnel and enter Main Street Plaza." },
  { key: "chill", label: "Chill In E-TV Lounge", destination: "E-TV Chill Lounge Booth", price: "Signal Plan", info: "Sit in the lounge, watch screens, commercials, programmed drops, and affiliate ads." },
  { key: "casting", label: "Casting / E-TV Network", destination: "Casting Network Booth", price: "Verification Required", info: "Talent signs in, accepts agreements, reviews rules/bylaws, and enters broadcast review." },
  { key: "subscribers", label: "Subscribers", destination: "Subscriber Booth", price: "Monthly Signal", info: "Subscribers enter E-TV Book, stream plans, programmed drops, and signal access." },
  { key: "thread", label: "Thread Clients", destination: "Thread Client Booth", price: "Client Setup", info: "Thread clients enter onboarding, admin handoff, website/business setup, and prepaid builds." },
  { key: "celeb", label: "Celeb Verification", destination: "Celebrity Security Booth", price: "Security Review", info: "Celebrities enter identity/security verification, marketplace placement, and promo TV review." }
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
  const [passType, setPassType] = useState("Guest Pass");
  const [signup, setSignup] = useState({ name: "", email: "", phone: "" });

  if (cloneRoam) return <CloneRoam onBack={() => setCloneRoam(false)} />;
  if (crowdConsole) return <CrowdControl onBack={() => setCrowdConsole(false)} />;
  if (insidePark) return <MainStreetPlaza />;

  const changeMusic = () => {
    const mixes = ["Crowd Mix 01", "Tunnel Rumble", "Clone Parade", "E-TV Lounge Ads", "Park Walk Loop", "Atlanta Gate Brass"];
    setMusicMode(mixes[Math.floor(Math.random() * mixes.length)]);
  };

  const chooseGate = (item) => {
    setSelected(item);
    setGateStatus(`${item.label} booth loaded — complete sign in, then open gate`);
    localStorage.setItem("gm_selected_gate", JSON.stringify(item));

    if (item.key === "free") {
      setPassType("Guest Pass");
    }

    if (item.key === "etv" || item.key === "chill") {
      setPassType("Subscriber Pass");
    }

    if (item.key === "walk") {
      setPassType("Ticket Pass");
    }

    if (item.key === "casting") {
      setPassType("Casting Pass");
    }

    if (item.key === "subscribers") {
      setPassType("Subscriber Pass");
    }

    if (item.key === "thread") {
      setPassType("Thread Client Pass");
    }

    if (item.key === "celeb") {
      setPassType("Celebrity Pass");
    }
  };

  const submitTicket = () => {
    if (!selected) return;

    localStorage.setItem("gm_gate_signup", JSON.stringify({
      selected,
      passType,
      signup,
      time: new Date().toISOString()
    }));

    setGateStatus("Ticket accepted. Gate opening...");
    setTimeout(() => setGateStatus("Tunnel rumble active..."), 550);
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
    }, 1200);
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
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setSelected(item);
                setGateStatus(item.label + " booth loaded");
                setPassType(
                  item.key === "thread" ? "Thread Client Pass" :
                  item.key === "celeb" ? "Celebrity Pass" :
                  item.key === "casting" ? "Casting Pass" :
                  item.key === "subscribers" || item.key === "etv" || item.key === "chill" ? "Subscriber Pass" :
                  item.key === "walk" ? "Ticket Pass" :
                  "Guest Pass"
                );
                localStorage.setItem("gm_selected_gate", JSON.stringify(item));
              }}
            >
              {item.label}
            </button>
          ))}>
              {item.label}
            </button>
          ))}

          <button className="music-btn" onClick={changeMusic}>Park Music</button>

          <button className="ghost-admin" onClick={() => setCrowdConsole(true)}>◇</button>
          <button className="ghost-admin" onClick={onFounderAccess}>◌</button>
        </nav>

        <div className="selected-gate-strip">
          <strong>SELECTED:</strong> {selected ? selected.label + " → " + selected.destination : "No booth selected yet"}
        </div>

        <section className="gm-hero-gate">
          <div className="gate-topline">GENIUNAIRE MASTERMINDS ONLINE VIRTUAL THEME PARK — ATLANTA, GA</div>

          <div className="gate-visual">
            <div className="gate-tower left"><span>Tickets & Entry</span></div>

            <div className={`gate-arch ${gateStatus.includes("opening") || gateStatus.includes("rumble") ? "gate-open" : ""}`}>
              <h1>GENIUNAIRE MASTERMINDS</h1>
              <p>Virtual Theme Park</p>
              <small>Atlanta, GA</small>
              <div className="gate-doors"><span /><span /></div>
            </div>

            <div className="gate-tower right"><span>Clone Rental</span></div>
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
            <h2>{selected ? selected.destination : "Choose Your Entrance"}</h2>
            <p>{selected ? selected.info : "Pick a gate button above. Every guest goes through a booth before the gate opens."}</p>

            {selected && (
              <div className="status-box">
                <span>Active Top Button</span>
                <strong>{selected.label}</strong>
                <small>This button is wired to this booth.</small>
              </div>
            )}

            <div className="status-box">
              <span>Pass Type</span>
              {["Guest Pass", "Ticket Pass", "Subscriber Pass", "Thread Client Pass", "Casting Pass", "Celebrity Pass"].map((pass) => (
                <label key={pass} className="radio-line">
                  <input
                    type="radio"
                    name="passType"
                    checked={passType === pass}
                    onChange={() => setPassType(pass)}
                  />
                  {pass}
                </label>
              ))}
            </div>

            {selected && (
              <div className="status-box">
                <span>Selected Booth</span>
                <strong>{selected.label}</strong>
                <small>Price / Requirement: {selected.price}</small>
              </div>
            )}

            <div className="status-box">
              <span>Guest Sign Up / Check In</span>
              <input placeholder="Name / Stage Name" value={signup.name} onChange={(e) => setSignup({ ...signup, name: e.target.value })} />
              <input placeholder="Email" value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} />
              <input placeholder="Phone / Optional" value={signup.phone} onChange={(e) => setSignup({ ...signup, phone: e.target.value })} />
            </div>

            <div className="status-box">
              <span>Gate Status</span>
              <strong>{gateStatus}</strong>
              <small>Music: {musicMode}</small>
              <small>Crowd: {crowdLevel}</small>
              <small>Pass: {passType}</small>
            </div>

            <button className="open-gate-btn" onClick={submitTicket} disabled={!selected}>
              Sign / Verify / Open Gate
            </button>

            <div className="status-box">
              <span>Secret Access</span>
              <input placeholder="Secret word" value={secretBox} onChange={(e) => setSecretBox(e.target.value)} />
              <button className="open-gate-btn" onClick={unlockSecret}>Unlock</button>
            </div>
          </article>

          <article className="clone-machine">
            <p className="panel-kicker cyan">Mini Clone Bot Machine</p>
            <h2>Come Inside The Screen</h2>
            <p>Rent a mini clone body to walk, shop, sit, chill, watch TV, and roam the park virtually.</p>

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
