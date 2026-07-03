import React, { useState } from "react";
import "./ParkDistricts.css";
import ParkStore from "../ParkStore/ParkStore";
import ETVLounge from "../ETVLounge/ETVLounge";
import CastingSecurity from "../CastingSecurity/CastingSecurity";

const roomData = {
  threadfolio: {
    title: "ThreadFolio Tower",
    type: "Thread Set Brain",
    lead: "Imports threads, scans ideas, creates E-Folio, E-Map, build plans, client handoff, and prepaid builds.",
    icon: "🧠",
    actions: ["Scan Thread", "Create E-Folio", "Create E-Map", "Build Client Page", "Send To Pay Desk"]
  },
  etv: {
    title: "GM E-TV Lounge",
    type: "Streaming / E-TV Book",
    lead: "Runs commercials, drops, E-TV Book previews, product streams, creator streams, and subscription channels.",
    icon: "📺",
    actions: ["Watch Commercials", "Open E-TV Book", "Choose Stream Plan", "Send To Home TV", "Subscribe Monthly"]
  },
  production: {
    title: "Production Studio",
    type: "GM Broadcasting & Productions",
    lead: "Creates shows, commercials, scripts, schedules, voice drops, promo TV, and release packages.",
    icon: "🎬",
    actions: ["Create Show", "Write Commercial", "Schedule Drop", "Send To Sound Mine", "Release Promo Package"]
  },
  casting: {
    title: "Casting / GM E-TV Network",
    type: "Talent Gate",
    lead: "Talent signs in, accepts agreements, reviews rules, verifies access, and enters E-TV casting.",
    icon: "🎭",
    actions: ["Start Casting Sign In", "Open Agreement", "Verify Talent", "Join Series", "Send To Broadcast"]
  },
  sound: {
    title: "Sound Mine",
    type: "Audio Production",
    lead: "Music, voice, sound effects, theme songs, intro drops, commercials, and broadcast mixdowns.",
    icon: "🎧",
    actions: ["Create Theme Cue", "Record Voice Drop", "Make Commercial Audio", "Send To E-TV", "Broadcast Mix"]
  },
  mall: {
    title: "E-Mall",
    type: "Store District",
    lead: "Digital products, affiliate shelves, services, courses, wardrobe plans, toy store paths, and checkout doors.",
    icon: "🛍️",
    actions: ["Open Store", "Product Shelf", "Affiliate Door", "Service Checkout", "Send To Pay Desk"]
  },
  celeb: {
    title: "Celebrity Marketplace",
    type: "Security Verification",
    lead: "Verification, marketplace placement, promo TV packages, booking requests, and high-security review.",
    icon: "⭐",
    actions: ["Start Security Check", "Submit Verification", "Request Placement", "Open Marketplace", "Promo TV Package"]
  },
  dorm: {
    title: "DormMageddon House",
    type: "College Haunted Attraction",
    lead: "Student creators, campus watch rooms, haunted dorm drops, merch, subscriptions, and student side hustles.",
    icon: "🏚️",
    actions: ["Enter Dorm House", "Open Campus Drop", "Watch Room", "Student Creator Pass", "Dorm Store"]
  },
  guest pass: {
    title: "Guest Pass Center",
    type: "Mini Guest Pass Bot Machine",
    lead: "Rent guest pass bodies by hour, day, or month so guests can walk, shop, sit, chill, watch, and roam.",
    icon: "🤖",
    actions: ["$5 Hour Rental", "Day Pass", "Monthly Guest Pass Pass", "Return Guest Pass To Hub", "Recommend Upgrade"]
  },
  paydesk: {
    title: "Pay Desk",
    type: "Stripe / Ticket / Subscription",
    lead: "The cash register for tickets, subscriptions, guest pass rental, E-TV streams, client onboarding, and prepaid builds.",
    icon: "💳",
    actions: ["Ticket Checkout", "Subscriber Checkout", "Thread Client Checkout", "Guest Pass Rental Checkout", "Prepaid Build Checkout"]
  }
};

export default function ParkDistricts({ activeKey, onBack }) {
  const room = roomData[activeKey] || roomData.threadfolio;
  const [activity, setActivity] = useState("Room console online. Choose an action.");
  const [saved, setSaved] = useState([]);
  const [storeOpen, setStoreOpen] = useState(false);
  const [etvOpen, setEtvOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState("");

  if (securityOpen) return <CastingSecurity type={securityOpen} onBack={() => setSecurityOpen("")} />;
  if (etvOpen) return <ETVLounge onBack={() => setEtvOpen(false)} />;
  if (storeOpen) return <ParkStore onBack={() => setStoreOpen(false)} />;

  const runAction = (action) => {
    const record = {
      room: room.title,
      action,
      time: new Date().toLocaleTimeString(),
      status: "staged"
    };

    setActivity(`${action} staged inside ${room.title}.`);
    setSaved((current) => [record, ...current].slice(0, 5));
    localStorage.setItem("gm_last_room_action", JSON.stringify(record));

    const lower = action.toLowerCase();
    if (lower.includes("checkout") || lower.includes("store") || lower.includes("rental") || lower.includes("pay")) setStoreOpen(true);
    if (lower.includes("watch") || lower.includes("e-tv") || lower.includes("stream")) setEtvOpen(true);
    if (lower.includes("casting") || lower.includes("talent") || lower.includes("agreement") || lower.includes("verify") || lower.includes("security")) {
      setSecurityOpen(activeKey === "celeb" ? "celeb" : "casting");
    }
  };

  return (
    <main className="park-room-page">
      <section className="park-room-hero">
        <button className="back-btn" onClick={onBack}>← Back To Main Street</button>
        <div style={{ fontSize: "64px" }}>{room.icon}</div>
        <p>{room.type}</p>
        <h1>{room.title}</h1>
        <h2>{room.lead}</h2>
      </section>

      <section className="park-room-grid">
        <article className="park-room-card big">
          <p className="eyebrow">Live Room Console</p>
          <h2>{activity}</h2>
          <div className="room-actions">
            {room.actions.map((action) => (
              <button key={action} onClick={() => runAction(action)}>
                {action}
              </button>
            ))}
          </div>
        </article>

        <article className="park-room-card">
          <p className="eyebrow">Guest Pass Guide</p>
          <h2>Mini Bot Available</h2>
          <p>A roaming bot can greet visitors, explain the room, recommend passes, and send them to checkout.</p>
          <button onClick={() => runAction("Guest Pass Bot Guest Approach")}>Send Bot To Guest</button>
        </article>

        <article className="park-room-card">
          <p className="eyebrow">Saved Activity</p>
          {saved.length === 0 ? <p>No activity yet.</p> : saved.map((item, index) => (
            <div className="activity-line" key={`${item.action}-${index}`}>
              <strong>{item.action}</strong>
              <span>{item.time}</span>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
