import React, { useEffect, useState } from 'react';
import "./EntryGate.css";

function EntryGate({
  onEnterDreamLab,
  onEnterMoneyTracker,
  onRequestClearance,
  onFounderAccess,
}) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessStatus, setAccessStatus] = useState('idle');
  const [logIndex, setLogIndex] = useState(0);

  const systemLogs = [
    'Awaiting user input...',
    'Scanning creator ecosystem...',
    'Routing neural pathways...',
    'Vault systems locked and secured.',
    'Ready for creative deployment.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((previousIndex) => (previousIndex + 1) % systemLogs.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [systemLogs.length]);

  const handleAccessCheck = (event) => {
    event.preventDefault();

    if (!accessCode.trim()) {
      return;
    }

    setAccessStatus('checking');

    setTimeout(() => {
      if (accessCode.trim().toUpperCase() === 'ASPIRE!') {
        setAccessStatus('granted');
      } else {
        setAccessStatus('denied');

        setTimeout(() => {
          setAccessStatus('idle');
        }, 3000);
      }
    }, 1200);
  };

return (
  <main className="min-h-screen bg-black text-slate-300 font-sans relative overflow-hidden flex flex-col items-center justify-center">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-40" />
      <div className="absolute top-[60%] left-[80%] w-2 h-2 bg-slate-300 rounded-full animate-pulse opacity-30" />
      <div className="absolute top-[80%] left-[25%] w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50" />
      <div className="absolute top-[30%] left-[75%] w-2 h-2 bg-slate-400 rounded-full animate-pulse opacity-40" />
    </div>

    <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

    <header className="absolute top-0 left-0 w-full px-6 py-5 flex items-center justify-between border-b border-purple-900/30 bg-black/50 backdrop-blur-sm z-10">
      <div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-ping" />
          <span className="tracking-widest text-xs md:text-sm text-purple-400 font-bold uppercase">
            Geniunaire MasterMinds
          </span>
        </div>

        <p className="mt-2 text-[10px] text-slate-500 font-mono tracking-widest">
          {'>_ ' + systemLogs[logIndex]}
        </p>
      </div>

      <button onClick={(event) => { document.body.classList.remove("mine-rumble"); void document.body.offsetWidth; document.body.classList.add("mine-rumble"); setTimeout(() => document.body.classList.remove("mine-rumble"), 520); }}
        type="button"
        onClick={() => setSoundEnabled((currentValue) => !currentValue)}
        className="text-slate-400 hover:text-purple-300 transition-all duration-300 border border-slate-700 hover:border-purple-500 px-4 py-2 rounded bg-black/50"
      >
        <span className="text-[10px] md:text-xs tracking-widest uppercase">
          {soundEnabled ? 'Soundscape: ON' : 'Soundscape: OFF'}
        </span>
      </button>
    </header>

    <section className="relative z-10 max-w-5xl mx-auto text-center px-6 mt-20">
      <p className="text-xs md:text-sm text-purple-400 tracking-[0.45em] uppercase mb-6">
        EMBRACE "YOUR" GENIUNAIRE MASTERMIND!
      </p>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-purple-400 to-slate-300 mb-8 drop-shadow-[0_0_18px_rgba(168,85,247,0.6)] tracking-tight">
        WHAT ARE "YOU" WAITING FOR
        <br />
        YOU'VE LANDED..SO, DRIFT INSIDE THE RIFT TUNNEL
      </h1>

      <div className="h-px bg-purple-500/80 max-w-2xl mx-auto mb-8" />

      <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        INSIDE "THIS" ADMIRATION FUNNEL MINE
WE MINE DREAMS INTO DIAMONDS
..EVERYTIME      </p>

      <form onSubmit={handleAccessCheck} className="mb-10 max-w-sm mx-auto">
        <input
          type="text"
          placeholder="ENTER RIFT CODE"
          value={accessCode}
          onChange={(event) => setAccessCode(event.target.value)}
          disabled={accessStatus === 'checking' || accessStatus === 'granted'}
          className="w-full bg-black/60 border border-purple-900 focus:border-purple-400 text-center text-purple-300 tracking-widest uppercase py-3 rounded outline-none transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.15)] focus:shadow-[0_0_22px_rgba(168,85,247,0.5)] disabled:opacity-60"
        />

        <div className="h-7 mt-3 flex justify-center items-center">
          {accessStatus === 'checking' && (
            <span className="text-[10px] text-purple-400 tracking-[0.3em] uppercase animate-pulse">
              Verifying Signature...
            </span>
          )}

          {accessStatus === 'granted' && (
            <button type="button" onClick={onFounderAccess}>
              DREAM
            </button>
          )}

          {accessStatus === 'denied' && (
            <span className="text-[10px] text-red-500 tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
              Access Denied // Invalid Signature
            </span>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={onEnterDreamLab}
          className="group relative px-8 py-5 bg-black border border-purple-500/50 hover:border-purple-400 rounded overflow-hidden transition-all duration-500 hover:shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:-translate-y-1"
        >
          <span className="relative z-10 text-slate-200 uppercase tracking-widest font-semibold text-sm group-hover:text-white">
            Enter The Think Tank
          </span>
        </button>

        <button
          type="button"
          onClick={onRequestClearance}
          className="group relative px-8 py-5 bg-purple-900/40 border border-purple-500 rounded overflow-hidden transition-all duration-500 hover:shadow-[0_0_28px_rgba(168,85,247,0.7)] hover:bg-purple-800/50 hover:-translate-y-1"
        >   
          <span className="relative z-10 text-white uppercase tracking-widest font-bold text-sm">
            Enter The Rift
          </span>
        </button>
  
        <button
          type="button"
          onClick={onEnterDreamLab}
          className="group relative px-8 py-5 bg-black border border-slate-700 hover:border-purple-500/70 rounded overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:-translate-y-1"
        >
          <span className="relative z-10 text-slate-400 uppercase tracking-widest font-semibold text-sm group-hover:text-purple-300">
            Open Build Lab
          </span>
        </button>

        <button
          type="button"
          onClick={onEnterMoneyTracker}
          className="group relative px-8 py-5 bg-black border border-slate-700 hover:border-slate-300 rounded overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(203,213,225,0.55)] hover:-translate-y-1"
        >
          <span className="relative z-10 text-slate-400 uppercase tracking-widest font-semibold text-sm group-hover:text-white">
            Access The Vault
          </span>
        </button>
      </div>
    </section>

    <footer className="relative z-10 mt-10 pb-6 w-full text-center">
      <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse" />
        <span>Secure Connection Established // Aspiration Mine Integrator Active</span>
      </p>
    </footer>
  </main>
);
}

export default EntryGate;
