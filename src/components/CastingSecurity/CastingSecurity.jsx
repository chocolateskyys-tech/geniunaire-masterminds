import React, { useState } from "react";
import "./CastingSecurity.css";

export default function CastingSecurity({ type = "casting", onBack }) {
  const [step, setStep] = useState("Start");
  const title = type === "celeb" ? "Celebrity Verification" : "Casting / GM E-TV Network";
  const lead = type === "celeb"
    ? "Tight security, placement review, booking lane, promo TV package, marketplace approval."
    : "Talent sign in, agreements, rules, bylaws, verification, series access, broadcast readiness.";

  const steps = type === "celeb"
    ? ["Identity Check", "Security Review", "Marketplace Placement", "Booking Rules", "Promo Package"]
    : ["Talent Sign In", "Agreement", "Rules / Bylaws", "Verification", "Join Series"];

  const save = (item) => {
    setStep(item);
    localStorage.setItem("gm_casting_security", JSON.stringify({ type, item, time: new Date().toISOString() }));
  };

  return (
    <main className="security-page">
      <button className="security-back" onClick={onBack}>← Back</button>
      <section className="security-panel">
        <p>{type === "celeb" ? "High Security Lane" : "Network Talent Lane"}</p>
        <h1>{title}</h1>
        <h2>{lead}</h2>

        <div className="security-status">
          Current Step: <strong>{step}</strong>
        </div>

        <div className="security-grid">
          {steps.map((item) => (
            <button key={item} onClick={() => save(item)}>{item}</button>
          ))}
        </div>

        <button className="security-finish" onClick={() => save("Approved / Ready For Placement")}>
          Approve / Submit / Continue
        </button>
      </section>
    </main>
  );
}
