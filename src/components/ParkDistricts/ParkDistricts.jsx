import React, { useState } from "react";
import "./ParkDistricts.css";
import ParkStore from "../ParkStore/ParkStore";
import ETVLounge from "../ETVLounge/ETVLounge";
import CastingSecurity from "../CastingSecurity/CastingSecurity";

const roomData = {
  threadfolio: {
    title: "ThreadFolio Tower",
    type: "Thread Set Brain",
    lead: "Upload threads, summarize builds, generate E-Folios, E-Maps, business plans, and prepaid build requests.",
    actions: ["Upload Thread", "Generate BuildOgraphy", "Create E-Folio", "Create Business Plan", "Send To Approval"]
  },
  etv: {
    title: "E-TV Lounge",
    type: "Streaming / E-TV Book",
    lead: "Watch programmed drops, commercials, affiliate ads, cast content, and subscription TV streams.",
    actions: ["Watch Commercials", "Open E-TV Book", "Choose Stream Plan", "Cast To Home TV", "Subscribe Monthly"]
  },
  production: {
    title: "Production Studio",
    type: "Studio Lot",
    lead: "Create shows, commercials, scripts, schedules, broadcast drops, promos, and releases.",
    actions: ["Create Show", "Schedule Drop", "Send To Sound Mine", "Send To Broadcast", "Create Promo Package"]
  },
  casting: {
    title: "Casting / E-TV Network",
    type: "Talent Gate",
    lead: "Talent signs in, verifies identity, accepts agreements, reviews rules, and joins series or network projects.",
    actions: ["Start Casting Sign In", "Open Agreement", "Verify Talent", "Join Series", "Send To Broadcast"]
  },
  celeb: {
    title: "Celebrity Marketplace",
    type: "Security Verification",
    lead: "High-security verification, placement review, promo TV packaging, booking requests, and marketplace access.",
    actions: ["Start Security Check", "Submit Verification", "Request Placement", "Open Marketplace", "Promo TV Package"]
  },
  dorm: {
    title: "DormMageddon House",
    type: "College Haunted Attraction",
    lead: "A spooky college creator attraction with dorm stories, campus events, student drops, and watch rooms.",
    actions: ["Enter Dorm House", "Open Campus Drop", "Watch Room", "Student Creator Pass", "Dorm Store"]
  },
  sound: {
    title: "Sound Mine",
    type: "Audio Production",
    lead: "Music, sound effects, voice, commercial audio, intro drops, and show mixdowns.",
    actions: ["Create Music Cue", "Record Voice", "Commercial Audio", "Send To E-TV", "Broadcast Mix"]
  },
  mall: {
    title: "E-Mall",
    type: "Store District",
    lead: "Digital products, affiliate shelves, courses, services, wardrobe plans, clone gear, and checkout doors.",
    actions: ["Open Store", "Product Shelf", "Affiliate Door", "Wardrobe Plan", "Checkout"]
  },
  clone: {
    title: "Clone Center",
    type: "Mini Clone Bot Machine",
    lead: "Rent clone bodies by hour, day, or month so guests can virtually walk, shop, sit, chill, watch, and roam.",
    actions: ["$5 Hour Rental", "Day Pass", "Monthly Clone Pass", "Return Clone To Hub", "Recommend Guest Upgrade"]
  },
  paydesk: {
    title: "Pay Desk",
    type: "Stripe / Ticket / Subscription",
    lead: "One clean pay desk for tickets, subscriptions, clone rental, client onboarding, and prepaid builds.",
    actions: ["Ticket Checkout", "Subscriber Checkout", "Thread Client Checkout", "Clone Rental Checkout", "Prepaid Build Checkout"]
  }
};

export default function ParkDistricts({ activeKey, onBack }) {
  const room = roomData[activeKey] || roomData.threadfolio;
  const [activity, setActivity] = useState("Waiting for guest action.");
  const [saved, setSaved] = useState([]);
  const [storeOpen, setStoreOpen] = useState(false);
  const [etvOpen, setEtvOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState("");

  if (securityOpen) return <CastingSecurity type={securityOpen} onBack={() => setSecurityOpen("")} />;
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
    if (action.toLowerCase().includes("checkout") || action.toLowerCase().includes("store") || action.toLowerCase().includes("rental")) setStoreOpen(true);
    if (action.toLowerCase().includes("watch") || action.toLowerCase().includes("e-tv") || action.toLowerCase().includes("stream")) setEtvOpen(true);
    if (action.toLowerCase().includes("casting") || action.toLowerCase().includes("talent") || action.toLowerCase().includes("agreement") || action.toLowerCase().includes("verify")) setSecurityOpen(activeKey === "celeb" ? "celeb" : "casting");
    if (activeKey === "celeb" && (action.toLowerCase().includes("security") || action.toLowerCase().includes("placement"))) setSecurityOpen("celeb");
    if (action.toLowerCase().includes("casting") || action.toLowerCase().includes("talent") || action.toLowerCase().includes("agreement") || action.toLowerCase().includes("verify")) setSecurityOpen(activeKey === "celeb" ? "celeb" : "casting");
    if (activeKey === "celeb" && (action.toLowerCase().includes("security") || action.toLowerCase().includes("placement"))) setSecurityOpen("celeb");
  };

  return (
    <main className="park-room-page">
      <section className="park-room-hero">
        <button className="back-btn" onClick={onBack}>← Back To Main Street</button>
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
          <p className="eyebrow">Clone Guide</p>
          <h2>Mini Bot Available</h2>
          <p>A roaming bot can greet visitors, explain the room, recommend passes, and send them to checkout.</p>
          <button onClick={() => runAction("Clone Bot Guest Approach")}>Send Bot To Guest</button>
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
