import React, { useState } from "react";

const valetOptions = [
  "Bring my parked clone to the front gate",
  "Hold my clone in virtual parking",
  "Send clone to ETV Lounge entrance",
  "Send clone to Casting curb",
  "Send clone to E-Service / Website Build desk",
];

export default function CloneValetFeature() {
  const [status, setStatus] = useState("Clone cart idle at GM Ridz curb.");
  const [ticket, setTicket] = useState(null);

  function callCloneCart(option) {
    const code = `GM-CLONE-VALET-${Math.floor(100000 + Math.random() * 899999)}`;
    const request = {
      code,
      option,
      status: "Cart dispatched",
      note: "Virtual parking / clone valet feature. Paid pass, bot rental, or GM access may be required.",
      createdAt: new Date().toLocaleString(),
    };

    setTicket(request);
    localStorage.setItem("gmCloneValetTicket", JSON.stringify(request));
    setStatus(`${option}. Golf cart bot dispatched to parking lot.`);
  }

  return (
    <section className="relative z-20 max-w-7xl mx-auto -mt-4 mb-8 rounded-[2rem] border border-cyan-400/50 bg-black/85 p-5 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-1 rounded-3xl border border-yellow-400 bg-yellow-400/10 p-5">
          <p className="text-yellow-300 text-xs uppercase tracking-[0.3em]">
            GM Ridz Curb
          </p>
          <h2 className="text-3xl font-black text-white mt-2">
            Clone Valet Bot
          </h2>
          <p className="text-slate-300 text-sm mt-3">
            Park your clone in the virtual lot. When you are ready, the GM golf cart brings it to the front gate.
          </p>

          <div className="mt-5 rounded-2xl border border-cyan-400 bg-cyan-400/10 p-4">
            <p className="text-cyan-300 text-xs uppercase tracking-widest">
              Cart Status
            </p>
            <p className="text-white font-black mt-1">{status}</p>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-3xl border border-slate-700 bg-slate-950/70 p-5">
          <h3 className="text-2xl font-black text-cyan-300 mb-4">
            Virtual Parking Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {valetOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => callCloneCart(option)}
                className="rounded-2xl border border-slate-700 bg-black/70 px-4 py-3 text-left text-sm font-black text-slate-200 hover:border-yellow-400 hover:text-yellow-300"
              >
                {option}
              </button>
            ))}
          </div>

          {ticket && (
            <div className="mt-5 rounded-2xl border border-yellow-400 bg-yellow-400/10 p-4">
              <p className="text-yellow-300 text-xs uppercase tracking-widest">
                Clone Valet Ticket
              </p>
              <p className="text-white font-black mt-1">{ticket.code}</p>
              <p className="text-slate-300 text-sm mt-2">{ticket.option}</p>
              <p className="text-slate-500 text-xs mt-2">{ticket.note}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
