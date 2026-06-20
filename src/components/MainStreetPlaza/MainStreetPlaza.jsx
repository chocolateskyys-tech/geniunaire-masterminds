import React, { useState } from "react";
import ParkDistricts from "../ParkDistricts/ParkDistricts";

const districts = [
  ["threadfolio", "ThreadFolio Tower", "Thread Set brain: imports, scans, business plans, E-Folio, E-Map."],
  ["etv", "E-TV Lounge", "E-TV Book, Lounge, signals, commercials, streaming, subscriptions."],
  ["production", "Production Studio", "Shows, episodes, commercials, scripts, schedules, releases."],
  ["casting", "Casting / E-TV Network", "Auditions, contracts, verification, rules, bylaws, agreements."],
  ["sound", "Sound Mine", "Music, audio, voice, sound effects, commercial audio."],
  ["mall", "E-Mall", "Stores, products, services, affiliate shelves, checkout doors."],
  ["celeb", "Celebrity Marketplace", "Verification, security, promo packages, marketplace placement."],
  ["dorm", "DormMageddon House", "College haunted attraction, campus creators, watch rooms, events."],
  ["clone", "Clone Center", "Clone rentals, day passes, monthly passes, roaming visitor bodies."],
  ["paydesk", "Pay Desk", "Stripe doors, subscriptions, tickets, passes, prepaid builds."],
];

export default function MainStreetPlaza() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [botMessage, setBotMessage] = useState("Mini clone guide online. Choose a building to enter.");

  if (activeRoom) {
    return <ParkDistricts activeKey={activeRoom} onBack={() => setActiveRoom(null)} />;
  }

  const enterRoom = (room) => {
    setBotMessage(`Clone guide routed you to ${room[1]}.`);
    setActiveRoom(room[0]);
  };

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="max-w-7xl mx-auto">
        <section className="rounded-3xl border border-purple-700 bg-gradient-to-b from-purple-950/70 via-black to-black p-6 mb-6 text-center">
          <p className="text-cyan-300 tracking-[0.4em] uppercase text-xs">
            Geniunaire MasterMinds Theme Park
          </p>

          <h1 className="text-4xl md:text-7xl font-black mt-3">
            Main Street Plaza
          </h1>

          <p className="text-slate-300 mt-4 text-lg">
            Walk the park. Enter buildings. Shop, watch, cast, build, apply, and roam.
          </p>

          <div className="mt-5 rounded-2xl border border-cyan-500 bg-black/70 p-4">
            <p className="text-xs text-cyan-300 uppercase tracking-[0.35em]">Clone Guide</p>
            <h2 className="text-2xl font-black mt-2">Park Hub Active</h2>
            <p className="text-slate-400 mt-2">{botMessage}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {districts.map((room) => (
            <button
              key={room[0]}
              onClick={() => enterRoom(room)}
              className="text-left rounded-3xl border border-purple-700 bg-black/80 p-6 hover:border-cyan-400 hover:bg-purple-950/40 transition"
            >
              <h2 className="text-2xl font-black text-purple-300">{room[1]}</h2>
              <p className="text-slate-400 mt-3">{room[2]}</p>
              <div className="mt-5 rounded-xl bg-purple-700 py-3 text-center font-black">
                Enter Building
              </div>
            </button>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-cyan-500 bg-black/70 p-5">
            <h3 className="font-black text-cyan-300">Clone Body Active</h3>
            <p className="text-sm text-slate-400 mt-2">Visitor can roam virtually, shop, watch, and return to hub.</p>
          </div>

          <div className="rounded-2xl border border-purple-500 bg-black/70 p-5">
            <h3 className="font-black text-purple-300">E-TV Book Brain</h3>
            <p className="text-sm text-slate-400 mt-2">Runs media, commercials, signals, casting, broadcasting.</p>
          </div>

          <div className="rounded-2xl border border-yellow-500 bg-black/70 p-5">
            <h3 className="font-black text-yellow-300">Thread Set Brain</h3>
            <p className="text-sm text-slate-400 mt-2">Runs business plans, E-Folio, E-Map, prepaid builds.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
