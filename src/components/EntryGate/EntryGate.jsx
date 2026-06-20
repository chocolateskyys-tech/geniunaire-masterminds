import React, { useState } from "react";
import "./EntryGate.css";

const ticketOptions = [
  {
    id: "free",
    label: "Free Sign Up",
    subtitle: "Limited access pass",
    booth: "Free Guest Ticket Booth",
    action: "onRequestClearance",
  },
  {
    id: "etv",
    label: "E-TV Lounge",
    subtitle: "Watch commercials, TV, drops, ads",
    booth: "E-TV Lounge Ticket Booth",
    action: "onEnterAiality",
  },
  {
    id: "walk",
    label: "Walk The Park",
    subtitle: "Browse through the tunnel",
    booth: "Park Walk Ticket Booth",
    action: "walkPark",
  },
  {
    id: "chill",
    label: "Chill In E-TV Lounge",
    subtitle: "Sit down and watch programmed screens",
    booth: "E-TV Chill Pass Booth",
    action: "onEnterAiality",
  },
  {
    id: "casting",
    label: "Casting / E-TV Network",
    subtitle: "Contracts, rules, verification, broadcast access",
    booth: "Casting & Network Clearance",
    action: "onEnterAiality",
  },
  {
    id: "subscribers",
    label: "Subscribers",
    subtitle: "Monthly signal access",
    booth: "Subscriber Signal Booth",
    action: "onEnterAiality",
  },
  {
    id: "thread",
    label: "Thread Clients",
    subtitle: "Onboarding, admin, business setup",
    booth: "Thread Set Client Booth",
    action: "onEnterDreamLab",
  },
  {
    id: "celeb",
    label: "Celeb Verification",
    subtitle: "Security, ID, marketplace placement",
    booth: "Celebrity Security Booth",
    action: "onRequestClearance",
  },
];

export default function EntryGate({
  onEnterDreamLab,
  onEnterMoneyTracker,
  onRequestClearance,
  onFounderAccess,
  onEnterAiality,
}) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [gateStatus, setGateStatus] = useState("closed");
  const [musicMode, setMusicMode] = useState("Gate Music: Crowd Mix 01");
  const [message, setMessage] = useState("Choose your booth. The gate opens after your pass is handled.");

  const runAction = (action) => {
    if (action === "onEnterDreamLab") onEnterDreamLab?.();
    if (action === "onEnterMoneyTracker") onEnterMoneyTracker?.();
    if (action === "onRequestClearance") onRequestClearance?.();
    if (action === "onFounderAccess") onFounderAccess?.();
    if (action === "onEnterAiality") onEnterAiality?.();
    if (action === "walkPark") walkPark();
  };

  const openTicketBooth = (ticket) => {
    setSelectedTicket(ticket);
    setGateStatus("ticket");
    setMessage(`Now serving: ${ticket.booth}. Handle ticket, signup, payment, agreement, or verification.`);
  };

  const activateGate = () => {
    if (!selectedTicket) return;
    setGateStatus("opening");
    setMessage("Ticket accepted. Gate opening. Tunnel rumble starting...");
    setTimeout(() => {
      setGateStatus("open");
      setMessage("Gate open. Entering park...");
      setTimeout(() => runAction(selectedTicket.action), 700);
    }, 900);
  };

  const walkPark = () => {
    setGateStatus("rumble");
    setMessage("Tunnel rumbling. Rails glowing. Moving into the park...");
    setTimeout(() => onRequestClearance?.(), 900);
  };

  const changeMusic = () => {
    const mixes = [
      "Gate Music: Crowd Mix 01",
      "Gate Music: Tunnel Rumble",
      "Gate Music: E-TV Lounge Ads",
      "Gate Music: Park Walk Loop",
      "Gate Music: Clone Bot Parade",
      "Gate Music: Founder Signal",
    ];
    setMusicMode(mixes[Math.floor(Math.random() * mixes.length)]);
  };

  const rentClone = (plan) => {
    setSelectedTicket({
      id: "clone",
      label: plan,
      subtitle: "Mini clone body rental",
      booth: "Mini Clone Bot Machine",
      action: "onRequestClearance",
    });
    setGateStatus("ticket");
    setMessage(`${plan} selected. Rent a mini clone body to come inside the screen and roam the park.`);
  };

  return (
    <main className={`min-h-screen bg-black text-white overflow-hidden ${gateStatus === "rumble" || gateStatus === "opening" ? "animate-pulse" : ""}`}>
      <section className="min-h-screen relative px-4 py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-5 rounded-2xl border border-purple-700 bg-black/80 p-3 flex flex-wrap justify-center gap-2">
            {ticketOptions.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => openTicketBooth(ticket)}
                className="px-3 py-2 rounded-lg bg-purple-800 hover:bg-purple-700 text-xs md:text-sm font-black"
              >
                {ticket.label}
              </button>
            ))}

            <button
              onClick={changeMusic}
              className="px-3 py-2 rounded-lg bg-black border border-yellow-500 text-yellow-300 text-xs md:text-sm font-black"
            >
              Change Park Music
            </button>

            <button
              onClick={onFounderAccess}
              className="px-3 py-2 rounded-lg border border-transparent text-black/0 bg-black/20 hover:text-yellow-400 hover:border-yellow-500 text-xs md:text-sm"
            >
              Admin
            </button>

            <button
              onClick={onRequestClearance}
              className="px-3 py-2 rounded-lg border border-transparent text-black/0 bg-black/20 hover:text-purple-300 hover:border-purple-500 text-xs md:text-sm"
            >
              Crowd Control
            </button>
          </div>

          <div className="text-center pt-8">
            <p className="text-purple-300 tracking-[0.35em] uppercase text-xs mb-4">
              Geniunaire MasterMinds Theme Park — Atlanta GA
            </p>

            <h1 className="text-5xl md:text-7xl font-black mb-4">
              YOU BETTER COME IN.
            </h1>

            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Pick your ticket booth. Rent a mini clone body. Activate the gate. Walk into the park.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <section className="lg:col-span-2 rounded-3xl border border-purple-700 bg-black/75 p-6 shadow-2xl">
              <div className="rounded-2xl border border-purple-500 bg-gradient-to-b from-purple-950/80 to-black p-6 min-h-[360px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-purple-300 mb-3">
                  Front Gate Ticket Booth
                </p>

                <h2 className="text-3xl md:text-5xl font-black mb-4">
                  {selectedTicket ? selectedTicket.booth : "Choose A Gate Button"}
                </h2>

                <p className="text-slate-300 max-w-2xl mb-6">
                  {selectedTicket
                    ? selectedTicket.subtitle
                    : "Free guests, subscribers, Thread clients, casting talent, celebrities, and park walkers all enter through the booth first."}
                </p>

                <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/50 bg-black/70 p-5 mb-5">
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.3em] mb-2">
                    Gate Status
                  </p>
                  <p className="text-xl font-black uppercase">{gateStatus}</p>
                  <p className="text-sm text-slate-400 mt-2">{message}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={activateGate}
                    disabled={!selectedTicket}
                    className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-black disabled:opacity-40"
                  >
                    Pay / Verify / Accept Ticket
                  </button>

                  <button
                    onClick={() => {
                      setGateStatus("closed");
                      setSelectedTicket(null);
                      setMessage("Gate reset. Choose your booth.");
                    }}
                    className="px-6 py-3 rounded-xl border border-purple-500"
                  >
                    Close Gate
                  </button>
                </div>
              </div>
            </section>

            <aside className="rounded-3xl border border-cyan-500/60 bg-black/75 p-6">
              <p className="text-cyan-300 text-xs tracking-[0.35em] uppercase mb-2">
                Mini Clone Bot Machine
              </p>

              <h2 className="text-3xl font-black mb-3">
                Come Inside The Screen
              </h2>

              <p className="text-slate-300 mb-5">
                Rent a mini clone body to roam the park, sit in E-TV Lounge, browse stores, visit rooms,
                and return to the hub when time expires.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => rentClone("$5 / Hour Clone Rental")} className="rounded bg-cyan-500 text-black font-black py-3">
                  $5 / Hour
                </button>
                <button onClick={() => rentClone("Day Pass Clone Rental")} className="rounded bg-purple-700 font-black py-3">
                  Day Pass
                </button>
                <button onClick={() => rentClone("Monthly Clone Pass")} className="rounded bg-yellow-600 text-black font-black py-3">
                  Monthly Clone Pass
                </button>
                <button onClick={walkPark} className="rounded border border-cyan-400 py-3">
                  Try Park Walk
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest">
                Roaming recommendation bots may approach guests who are not inside a clone body.
              </p>
            </aside>
          </div>

          <section className="mt-5 rounded-3xl border border-purple-700 bg-black/70 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="font-black text-purple-300">E-TV Book</h3>
              <p className="text-sm text-slate-400">Runs media, signal plans, commercials, casting, streaming, and lounge programming.</p>
            </div>
            <div>
              <h3 className="font-black text-cyan-300">Thread Set</h3>
              <p className="text-sm text-slate-400">Runs ThreadFolio, E-Folio, E-Map, business plans, onboarding, and prepaid builds.</p>
            </div>
            <div>
              <h3 className="font-black text-yellow-300">Clone Bots</h3>
              <p className="text-sm text-slate-400">Operate rooms, route guests, recommend passes, and keep the park moving.</p>
            </div>
          </section>

          <p className="mt-5 text-center text-xs text-cyan-300 tracking-widest uppercase">{musicMode}</p>
        </div>
      </section>
    </main>
  );
}
