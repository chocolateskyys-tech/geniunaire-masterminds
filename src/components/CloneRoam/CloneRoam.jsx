import React, { useState } from "react";
import "./CloneRoam.css";

const stops = [
  "Front Gate",
  "Main Street",
  "E-TV Lounge",
  "E-Mall",
  "Production Studio",
  "Casting Network",
  "Celebrity Marketplace",
  "DormMageddon House",
  "Kiddie Land",
  "Clone Center",
  "Threadfolio Tower"
];

export default function CloneRoam({ onBack }) {
  const [location, setLocation] = useState("Front Gate");
  const [mode, setMode] = useState("Walking");
  const [pass, setPass] = useState(localStorage.getItem("gm_clone_pass") || "$5 / Hour Clone Rental");

  const move = (stop) => {
    setLocation(stop);
    setMode("Walking");
    localStorage.setItem("gm_clone_location", stop);
  };

  return (
    <main className="clone-roam-page">
      <button className="clone-back" type="button" onClick={onBack}>← Return To Gate</button>

      <section className="clone-hero">
        <p>MINI CLONE BODY ACTIVE</p>
        <h1>Walk The Park Virtually</h1>
        <h2>Your clone can shop, sit, chill, watch, visit rooms, and return to the hub.</h2>
      </section>

      <section className="clone-grid">
        <article className="clone-status">
          <h3>Clone Status</h3>
          <p><strong>Pass:</strong> {pass}</p>
          <p><strong>Mode:</strong> {mode}</p>
          <p><strong>Current Location:</strong> {location}</p>

          <button type="button" onClick={() => setMode("Sitting / Chilling")}>Sit & Chill</button>
          <button type="button" onClick={() => setMode("Watching E-TV")}>Watch E-TV</button>
          <button type="button" onClick={() => setMode("Shopping")}>Shop</button>
          <button type="button" onClick={() => setMode("Returning To Hub")}>Return To Hub</button>
        </article>

        <article className="clone-map">
          <h3>Choose Where Your Clone Walks</h3>
          <div className="clone-stops">
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

        <article className="clone-upsell">
          <h3>Time Extension</h3>
          <p>When the hour ends, the clone returns to the hub. Guest can stay regular-site mode or renew access.</p>
          <button type="button" onClick={() => setPass("$5 / Hour Clone Rental")}>Renew $5 / Hour</button>
          <button type="button" onClick={() => setPass("Day Pass Clone Rental")}>Upgrade Day Pass</button>
          <button type="button" onClick={() => setPass("Monthly Clone Pass")}>Monthly Clone Pass</button>
        </article>
      </section>
    </main>
  );
}
