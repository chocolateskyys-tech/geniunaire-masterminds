import React, { useState } from "react";
import "./Guest PassRoam.css";

const stops = [
  "Front Gate",
  "Main Street",
  "GM E-TV Lounge",
  "E-Mall",
  "Production Studio",
  "Casting Network",
  "Celebrity Marketplace",
  "DormMageddon House",
  "Geniunaire K!ddz- K!ddz Planet",
  "Guest Pass Center",
  "Threadfolio Tower"
];

export default function Guest PassRoam({ onBack }) {
  const [location, setLocation] = useState("Front Gate");
  const [mode, setMode] = useState("Walking");
  const [pass, setPass] = useState(localStorage.getItem("gm_guest pass_pass") || "$5 / Hour Guest Pass Rental");

  const move = (stop) => {
    setLocation(stop);
    setMode("Walking");
    localStorage.setItem("gm_guest pass_location", stop);
  };

  return (
    <main className="guest pass-roam-page">
      <button className="guest pass-back" type="button" onClick={onBack}>← Return To Gate</button>

      <section className="guest pass-hero">
        <p>MINI GUEST PASS BODY ACTIVE</p>
        <h1>Walk The Park Virtually</h1>
        <h2>Your guest pass can shop, sit, chill, watch, visit rooms, and return to the hub.</h2>
      </section>

      <section className="guest pass-grid">
        <article className="guest pass-status">
          <h3>Guest Pass Status</h3>
          <p><strong>Pass:</strong> {pass}</p>
          <p><strong>Mode:</strong> {mode}</p>
          <p><strong>Current Location:</strong> {location}</p>

          <button type="button" onClick={() => setMode("Sitting / Chilling")}>Sit & Chill</button>
          <button type="button" onClick={() => setMode("Watching E-TV")}>Watch E-TV</button>
          <button type="button" onClick={() => setMode("Shopping")}>Shop</button>
          <button type="button" onClick={() => setMode("Returning To Hub")}>Return To Hub</button>
        </article>

        <article className="guest pass-map">
          <h3>Choose Where Your Guest Pass Walks</h3>
          <div className="guest pass-stops">
            {stops.map((stop) => (
              <button
                key={stop}
                type="button"
                className={location === stop ? "active-stop" : ""}
                onClick={() => move(stop)}
              >
                {stop}
              </button>
            ))}
          </div>
        </article>

        <article className="guest pass-upsell">
          <h3>Time Extension</h3>
          <p>When the hour ends, the guest pass returns to the hub. Guest can stay regular-site mode or renew access.</p>
          <button type="button" onClick={() => setPass("$5 / Hour Guest Pass Rental")}>Renew $5 / Hour</button>
          <button type="button" onClick={() => setPass("Day Pass Guest Pass Rental")}>Upgrade Day Pass</button>
          <button type="button" onClick={() => setPass("Monthly Guest Pass Pass")}>Monthly Guest Pass Pass</button>
        </article>
      </section>
    </main>
  );
}
