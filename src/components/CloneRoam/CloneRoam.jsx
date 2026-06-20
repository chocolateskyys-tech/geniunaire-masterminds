import React, { useState } from "react";
import "./CloneRoam.css";

const stops = ["Front Gate", "Main Street", "E-TV Lounge", "E-Mall", "Production Studio", "DormMageddon House", "Clone Center", "Pay Desk"];

export default function CloneRoam({ onBack }) {
  const [location, setLocation] = useState("Front Gate");
  const [timer, setTimer] = useState("60:00");
  const [mode, setMode] = useState("Walking");

  const move = (stop) => {
    setLocation(stop);
    localStorage.setItem("gm_clone_location", stop);
  };

  return (
    <main className="clone-roam-page">
      <button className="clone-back" onClick={onBack}>← Return To Gate</button>
      <section className="clone-roam-hero">
        <p>Mini Clone Body Active</p>
        <h1>Walk The Park Virtually</h1>
        <h2>Your clone can shop, sit, chill, watch, visit rooms, and return to the hub when time expires.</h2>
      </section>

      <section className="clone-stage">
        <div className="clone-body">
          <span className="clone-head" />
          <span className="clone-torso" />
          <span className="clone-feet" />
        </div>

        <article>
          <p>Current Location</p>
          <h2>{location}</h2>
          <strong>{mode}</strong>
          <small>Time Left: {timer}</small>
        </article>
      </section>

      <section className="clone-stop-grid">
        {stops.map((stop) => (
          <button key={stop} onClick={() => move(stop)}>{stop}</button>
        ))}
      </section>

      <section className="clone-pass-row">
        <button onClick={() => setMode("Shopping")}>Shop</button>
        <button onClick={() => setMode("Watching E-TV")}>Watch TV</button>
        <button onClick={() => setMode("Sitting / Chilling")}>Sit & Chill</button>
        <button onClick={() => setMode("Returning To Hub")}>Return To Hub</button>
      </section>
    </main>
  );
}
