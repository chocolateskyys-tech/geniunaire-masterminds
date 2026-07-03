import React, { useState } from "react";
import ParkDistricts from "../ParkDistricts/ParkDistricts";

const parkZones = [
  ["threadfolio", "ThreadFolio Tower", "Thread Set brain, E-Folio, E-Map, build plans.", "🧠"],
  ["etv", "E-TV Lounge", "Streams, commercials, drops, E-TV Book, subscriptions.", "📺"],
  ["production", "Production Studio", "Shows, episodes, commercials, scripts, release drops.", "🎬"],
  ["casting", "Casting / E-TV Network", "Talent sign-in, rules, verification, agreements.", "🎭"],
  ["sound", "Sound Mine", "Music, voice, intro drops, sound effects, broadcast mix.", "🎧"],
  ["mall", "E-Mall", "Stores, products, services, affiliate shelves, checkout doors.", "🛍️"],
  ["celeb", "Celebrity Marketplace", "Verification, placement, promo TV, booking review.", "⭐"],
  ["dorm", "DormMageddon House", "College haunted attraction, student creators, watch rooms.", "🏚️"],
  ["guest pass", "Guest Pass Center", "Guest Pass rentals, day passes, monthly roaming bodies.", "🤖"],
  ["paydesk", "Pay Desk", "Stripe passes, streams, subscriptions, prepaid builds.", "💳"]
];

export default function MainStreetPlaza() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [guideMessage, setGuideMessage] = useState("Welcome inside GM. Choose a building and the guest pass guide will route you.");

  if (activeRoom) {
    return <ParkDistricts activeKey={activeRoom} onBack={() => setActiveRoom(null)} />;
  }

  const enterRoom = (zone) => {
    localStorage.setItem("gm_last_park_room", zone[0]);
    setGuideMessage(`Routing guest to ${zone[1]}.`);
    setActiveRoom(zone[0]);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <section className="relative min-h-screen px-5 py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6d28d955,transparent_35%),radial-gradient(circle_at_bottom,#0891b255,transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto">
          <header className="text-center rounded-[2rem] border border-purple-500 bg-black/80 p-6 shadow-2xl shadow-purple-900/40">
            <p className="text-cyan-300 tracking-[0.45em] uppercase text-xs">
              Geniunaire MasterMinds Theme Park
            </p>
            <h1 className="text-4xl md:text-7xl font-black mt-3">
              MAIN STREET PLAZA
            </h1>
            <p className="text-slate-300 mt-4 text-lg">
              The park is open: build, shop, watch, cast, stream, rent guest passs, and hit the Pay Desk.
            </p>
            <div className="mt-5 rounded-2xl border border-cyan-400 bg-cyan-950/30 p-4">
              <p className="text-xs text-cyan-300 uppercase tracking-[0.35em]">Guest Pass Guide</p>
              <h2 className="text-2xl font-black mt-2">{guideMessage}</h2>
            </div>
          </header>

          <section className="mt-7 rounded-[2rem] border border-purple-700 bg-gradient-to-b from-purple-950/60 via-black to-black p-5">
            <div className="text-center mb-5">
              <p className="text-yellow-300 text-xs uppercase tracking-[0.35em]">Live Park Map</p>
              <h2 className="text-3xl md:text-5xl font-black">Choose A Building</h2>
            </div>

            <div className="relative rounded-[2rem] border border-cyan-700 bg-black/80 p-5">
              <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-5 -translate-x-1/2 rounded-full bg-purple-700/50" />
              <div className="hidden md:block absolute top-1/2 left-8 right-8 h-5 -translate-y-1/2 rounded-full bg-cyan-700/40" />

              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {parkZones.map((zone) => (
                  <button
                    key={zone[0]}
                    onClick={() => enterRoom(zone)}
                    className="group min-h-[210px] rounded-3xl border border-purple-600 bg-black/90 p-5 text-left hover:border-cyan-300 hover:bg-purple-950/70 transition shadow-xl"
                  >
                    <div className="text-5xl">{zone[3]}</div>
                    <h3 className="mt-4 text-2xl font-black text-purple-200 group-hover:text-cyan-200">
                      {zone[1]}
                    </h3>
                    <p className="mt-3 text-sm text-slate-400">{zone[2]}</p>
                    <div className="mt-5 rounded-xl bg-purple-700 py-3 text-center font-black group-hover:bg-cyan-700">
                      Enter Building
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-cyan-500 bg-black/80 p-5">
              <h3 className="font-black text-cyan-300">Guest Pass Body Active</h3>
              <p className="text-sm text-slate-400 mt-2">Guest can roam virtually, shop, watch, and return to hub.</p>
            </div>
            <div className="rounded-2xl border border-purple-500 bg-black/80 p-5">
              <h3 className="font-black text-purple-300">E-TV Book Brain</h3>
              <p className="text-sm text-slate-400 mt-2">Runs media, commercials, streams, casting, broadcasting.</p>
            </div>
            <div className="rounded-2xl border border-yellow-500 bg-black/80 p-5">
              <h3 className="font-black text-yellow-300">Thread Set Brain</h3>
              <p className="text-sm text-slate-400 mt-2">Runs ThreadFolio, E-Folio, E-Map, products, prepaid builds.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
