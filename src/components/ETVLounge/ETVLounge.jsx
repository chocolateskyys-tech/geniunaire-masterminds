import React, { useState } from "react";
import "./ETVLounge.css";

const channels = [
  ["AI’ALITY First Drop", "Interactive E-TV Book episode"],
  ["Promo TV Lounge", "Commercials, sponsor ads, affiliate links"],
  ["DormMageddon Channel", "College haunted attraction drops"],
  ["Creator Broadcast", "Live creator shows and series"],
  ["Casting Alerts", "Auditions, calls, cast updates"]
];

export default function ETVLounge({ onBack }) {
  const [channel, setChannel] = useState(channels[0]);
  const [ad, setAd] = useState("Lumen Noir // Shop Now");

  const runAd = () => {
    const ads = ["Lumen Noir // Shop Now", "Geniunaire Trio Bundle", "ThreadFolio Glow", "Guest Pass Pass Upgrade", "Wardrobe Plan"];
    setAd(ads[Math.floor(Math.random() * ads.length)]);
  };

  return (
    <main className="etv-page">
      <button className="etv-back" onClick={onBack}>← Back To Park</button>
      <section className="etv-shell">
        <p>Geniunaire GM E-TV Lounge</p>
        <h1>Watch. Stream. Cast. Shop.</h1>

        <div className="tv-screen">
          <h2>{channel[0]}</h2>
          <p>{channel[1]}</p>
          <div className="tv-caption">Commercial Break: {ad}</div>
        </div>

        <div className="tv-controls">
          <button onClick={runAd}>Play Commercial</button>
          <button onClick={() => alert("Cast to home TV staged.")}>Cast To TV</button>
          <button onClick={() => alert("Monthly E-TV Book signal staged.")}>Monthly Signal</button>
          <button onClick={() => alert("Affiliate link slot staged.")}>Affiliate Link</button>
        </div>

        <div className="channel-grid">
          {channels.map((item) => (
            <button key={item[0]} onClick={() => setChannel(item)}>{item[0]}</button>
          ))}
        </div>
      </section>
    </main>
  );
}
