import React, { useState } from "react";
import "./CrowdControl.css";

export default function CrowdControl({ onBack }) {
  const [gate, setGate] = useState("Closed");
  const [prize, setPrize] = useState("No prize loaded.");
  const [crowd, setCrowd] = useState("Normal");
  const [message, setMessage] = useState("Owner crowd control ready.");

  const save = (type, value) => {
    const record = { type, value, time: new Date().toISOString() };
    localStorage.setItem("gm_crowd_control", JSON.stringify(record));
    setMessage(`${type}: ${value}`);
  };

  return (
    <main className="crowd-page">
      <button onClick={onBack} className="crowd-back">← Return</button>
      <section className="crowd-panel">
        <p>Secret Crowd Control</p>
        <h1>Play With The Gate</h1>
        <h2>{message}</h2>

        <div className="crowd-grid">
          {["Open Gate", "Close Gate", "Hold Crowd", "Tunnel Rumble", "Send Prize"].map((item) => (
            <button key={item} onClick={() => { setGate(item); save("Gate", item); }}>{item}</button>
          ))}
        </div>

        <div className="crowd-grid">
          {["Light", "Normal", "Heavy", "Maximum"].map((item) => (
            <button key={item} onClick={() => { setCrowd(item); save("Crowd", item); }}>{item} Crowd</button>
          ))}
        </div>

        <div className="crowd-grid">
          {["Free Guest Pass Hour", "E-TV Preview", "Discount Ticket", "Wardrobe Credit", "Founder Surprise"].map((item) => (
            <button key={item} onClick={() => { setPrize(item); save("Prize", item); }}>{item}</button>
          ))}
        </div>

        <article className="crowd-status">
          <strong>Gate: {gate}</strong>
          <strong>Crowd: {crowd}</strong>
          <strong>Prize: {prize}</strong>
        </article>
      </section>
    </main>
  );
}
