import React, { useState } from "react";
import MainStreetPlaza from "../MainStreetPlaza/MainStreetPlaza";
import "./EntryGate.css";

const ticketOptions = [
  "Free Sign Up",
  "E-TV Lounge",
  "Walk The Park",
  "Chill In E-TV Lounge",
  "Casting / E-TV Network",
  "Subscribers",
  "Thread Clients",
  "Celeb Verification"
];

export default function EntryGate({
  onEnterDreamLab,
  onEnterMoneyTracker,
  onRequestClearance,
  onFounderAccess,
  onEnterAiality,
}) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [insidePark, setInsidePark] = useState(false);
  const [gateStatus, setGateStatus] = useState("closed");
  const [musicMode, setMusicMode] = useState("Crowd Mix 01");

  if (insidePark) {
    return <MainStreetPlaza />;
  }

  const chooseTicket = (ticket) => {
    setSelectedTicket(ticket);
    setGateStatus("ticket booth");
  };

  const enterPark = () => {
    setGateStatus("gate opening");
    setTimeout(() => setGateStatus("tunnel rumbling"), 500);
    setTimeout(() => setInsidePark(true), 1200);
  };

  const changeMusic = () => {
    const mixes = ["Crowd Mix 01", "Tunnel Rumble", "Clone Parade", "E-TV Lounge Ads", "Park Walk Loop"];
    setMusicMode(mixes[Math.floor(Math.random() * mixes.length)]);
  };

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <section className="max-w-7xl mx-auto min-h-screen rounded-3xl border border-purple-700 bg-gradient-to-b from-purple-950 via-black to-black p-4">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {ticketOptions.map((ticket) => (
            <button
              key={ticket}
              onClick={() => chooseTicket(ticket)}
              className="px-3 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-xs md:text-sm font-black"
            >
              {ticket}
            </button>
          ))}

          <button onClick={changeMusic} className="px-3 py-2 rounded-lg bg-black border border-yellow-500 text-yellow-300 text-xs md:text-sm font-black">
            Park Music
          </button>

          <button onClick={onFounderAccess} className="px-3 py-2 rounded-lg border border-transparent text-black/0 bg-black/20 hover:text-yellow-300 hover:border-yellow-500">
            Admin
          </button>

          <button onClick={onRequestClearance} className="px-3 py-2 rounded-lg border border-transparent text-black/0 bg-black/20 hover:text-purple-300 hover:border-purple-500">
            Play
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-cyan-300 tracking-[0.35em] uppercase text-xs">
            Geniunaire MasterMinds Theme Park — Atlanta GA
          </p>

          <h1 className="text-4xl md:text-7xl font-black mt-4">
            Front Gate Plaza
          </h1>

          <p className="text-slate-300 mt-4 text-lg">
            Choose your ticket booth. Rent a clone. Open the gate. Walk the park.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <section className="lg:col-span-2 rounded-3xl border border-purple-600 bg-black/70 p-6 text-center min-h-[420px] flex flex-col justify-center">
            <p className="text-purple-300 uppercase tracking-[0.35em] text-xs mb-3">
              Live Front Gate
            </p>

            <h2 className="text-3xl md:text-5xl font-black">
              {selectedTicket || "Select A Ticket Booth"}
            </h2>

            <p className="text-slate-400 mt-4">
              Gate Status: <span className="text-cyan-300 uppercase font-black">{gateStatus}</span>
            </p>

            <p className="text-slate-400 mt-2">
              Music: <span className="text-yellow-300">{musicMode}</span>
            </p>

            <button
              onClick={enterPark}
              disabled={!selectedTicket}
              className="mt-8 mx-auto px-8 py-4 rounded-2xl bg-cyan-400 text-black font-black disabled:opacity-40"
            >
              Pay / Verify / Open Gate
            </button>
          </section>

          <aside className="rounded-3xl border border-cyan-500 bg-black/70 p-6">
            <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs mb-3">
              Mini Clone Bot Machine
            </p>

            <h2 className="text-3xl font-black">Come Inside The Screen</h2>

            <p className="text-slate-400 mt-3">
              Rent a mini clone body to walk, shop, chill, watch TV, and roam GM.
            </p>

            <div className="grid grid-cols-1 gap-3 mt-6">
              <button onClick={() => chooseTicket("$5 / Hour Clone Rental")} className="py-3 rounded bg-cyan-400 text-black font-black">
                $5 / Hour
              </button>
              <button onClick={() => chooseTicket("Day Pass Clone Rental")} className="py-3 rounded bg-purple-700 font-black">
                Day Pass
              </button>
              <button onClick={() => chooseTicket("Monthly Clone Pass")} className="py-3 rounded bg-yellow-500 text-black font-black">
                Monthly Clone Pass
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
