import { useEffect, useState } from 'react';
import './EntryGate.css';

const MINI_BOTS = [
  { name: 'Promo Miner', icon: '📣', line: 'I roam the park promoting your approved business.' },
  { name: 'Guide Bot', icon: '🧭', line: "Follow me to AI'ality, E-TV, and the next attraction." },
  { name: 'Treasure Bot', icon: '💎', line: 'Find me to unlock clues, drops, and scavenger hunts.' },
  { name: 'House Guide', icon: '🏚️', line: 'I guide approved guests through DormMageddon.' },
];

const PARK_STATS = [
  ['Drifters in Park', '1,842'],
  ['Active Mini Bots', '637'],
  ['E-TV Signals Active', '291'],
  ["AI'ality Cast Requests", '84'],
  ['DormMageddon Founder Passes', '52'],
  ['Diamonds Mined Today', '119'],
];

function EntryGate({
  onEnterDreamLab,
  onEnterMoneyTracker,
  onRequestClearance,
  onFounderAccess,
  onEnterAIality,
  onEnterDormMageddon,
  onEnterETVStore,
  onEnterETVLounge,
  onEnterCheckout,
  onEnterRobotStore,
}) {
  const [accessCode, setAccessCode] = useState('');
  const [accessStatus, setAccessStatus] = useState('idle');
  const [promoCode, setPromoCode] = useState('');
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoStatus, setPromoStatus] = useState('idle');
  const [selectedBot, setSelectedBot] = useState(MINI_BOTS[0]);
  const [logIndex, setLogIndex] = useState(0);
  const [sparkles, setSparkles] = useState(0);

  const founderCode = import.meta.env.VITE_FOUNDER_CODE || 'ASPIRE!';
  const promoGateCode = import.meta.env.VITE_PROMO_GATE_CODE || 'PLAY!';

  const systemLogs = [
    'Awaiting user input...',
    'Scanning creator ecosystem...',
    'Mini Bot station online...',
    'E-TV signals routing...',
    'DormMageddon house lights active...',
    'Ready for creative deployment.',
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLogIndex((previous) => (previous + 1) % systemLogs.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [systemLogs.length]);

  function handleFounderAccess(event) {
    event.preventDefault();
    if (!accessCode.trim()) return;

    setAccessStatus('checking');
    window.setTimeout(() => {
      if (accessCode.trim().toUpperCase() === founderCode.toUpperCase()) {
        setAccessStatus('granted');
      } else {
        setAccessStatus('denied');
        window.setTimeout(() => setAccessStatus('idle'), 2400);
      }
    }, 700);
  }

  function handlePromoGate(event) {
    event.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === promoGateCode.toUpperCase()) {
      setPromoStatus('granted');
    } else {
      setPromoStatus('denied');
      window.setTimeout(() => setPromoStatus('idle'), 2200);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 pb-16 pt-28 text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[18%] h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-50" />
        <div className="absolute right-[12%] top-[22%] h-2 w-2 animate-pulse rounded-full bg-cyan-300 opacity-40" />
        <div className="absolute bottom-[18%] left-[22%] h-1.5 w-1.5 animate-ping rounded-full bg-amber-200 opacity-50" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/20 blur-[130px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-purple-900/50 bg-black/85 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-ping rounded-full bg-purple-500" />
              <span className="text-xs font-black uppercase tracking-[0.32em] text-purple-300">
                Geniunaire MasterMinds
              </span>
            </div>
            <p className="mt-2 font-mono text-[10px] tracking-widest text-slate-500">
              {'>_ ' + systemLogs[logIndex]}
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => setPromoOpen((open) => !open)}
              className="rounded-full border border-amber-300/50 bg-amber-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-200 hover:bg-amber-300/20"
            >
              Secret Promo Gate
            </button>
            <button
              type="button"
              onClick={onEnterAIality}
              className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200 hover:bg-cyan-400/20"
            >
              AI&apos;ality TV Network
            </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl text-center">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.48em] text-purple-400">
          The Digital Theme Park
        </p>
        <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight text-transparent md:text-7xl lg:text-8xl">
          WE SHINE IN THIS MINE.
          <br />
          START DIGGING!
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
          Where drifters become builders, ideas become attractions, and the website starts feeling like a place.
        </p>

        <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">
          <button onClick={onRequestClearance} className="rounded-xl border border-purple-400 bg-purple-700/40 px-6 py-4 text-sm font-black uppercase tracking-widest hover:bg-purple-700/60">
            Enter The Park
          </button>
          <button onClick={onEnterDormMageddon} className="rounded-xl border border-emerald-400/60 bg-emerald-400/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-emerald-200 hover:bg-emerald-400/20">
            DormMageddon
          </button>
          <button onClick={onEnterETVStore} className="rounded-xl border border-cyan-400/60 bg-cyan-400/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-cyan-200 hover:bg-cyan-400/20">
            E-TV Store
          </button>
          <button onClick={onEnterETVLounge} className="rounded-xl border border-pink-400/60 bg-pink-400/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-pink-200 hover:bg-pink-400/20">
            E-TV Lounge
          </button>
        </div>
      </section>

      {promoOpen && (
        <section className="relative z-20 mx-auto mt-10 max-w-5xl rounded-3xl border border-amber-300/40 bg-amber-300/5 p-6 text-left shadow-[0_0_45px_rgba(252,211,77,0.12)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">Founder Promo Control</p>
              <h2 className="mt-2 text-3xl font-black text-white">Play With The Crowd</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Prototype control for Free Day Pass, Two-Minute Gate Drop, Family Night, BOO Pass Drop, Flash Sale Gate, and Founder&apos;s Choice.
              </p>
            </div>

            {promoStatus !== 'granted' ? (
              <form onSubmit={handlePromoGate} className="flex w-full max-w-md gap-2">
                <input
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="ENTER PROMO GATE CODE"
                  className="min-w-0 flex-1 rounded-lg border border-amber-300/30 bg-black/70 px-4 py-3 text-sm text-amber-100 outline-none focus:border-amber-300"
                />
                <button className="rounded-lg border border-amber-300/50 px-4 py-3 text-xs font-black uppercase tracking-widest text-amber-100">Unlock</button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {['Free Day Pass', '2-Minute Gate', 'Family Night', 'BOO Pass Drop', 'Flash Sale', "Founder's Choice"].map((label) => (
                  <button key={label} type="button" className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-3 text-xs font-bold text-amber-100 hover:bg-amber-300/20">
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {promoStatus === 'denied' && <p className="mt-3 text-xs font-bold uppercase tracking-widest text-red-400">Promo gate denied.</p>}
        </section>
      )}

      <section className="relative z-10 mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-3xl border border-purple-800/60 bg-slate-950/80 p-6 text-left shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-300">Front Gate Bot Station</p>
              <h2 className="mt-2 text-3xl font-black text-white">Rent A Mini Bot — $5 / Hour</h2>
            </div>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-200">Automated Bot</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {MINI_BOTS.map((bot) => (
              <button
                key={bot.name}
                type="button"
                onClick={() => setSelectedBot(bot)}
                className={selectedBot.name === bot.name
                  ? 'rounded-2xl border border-purple-400 bg-purple-500/15 p-4 text-left'
                  : 'rounded-2xl border border-slate-800 bg-black/40 p-4 text-left hover:border-purple-700'}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{bot.icon}</span>
                  <div>
                    <p className="font-black text-white">{bot.name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{bot.line}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-200">Selected Shift</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xl font-black text-white">{selectedBot.icon} {selectedBot.name}</p>
                <p className="mt-1 text-sm text-slate-400">One hour. Public rooms only. Guest stays when the bot clocks out.</p>
              </div>
              <button onClick={onEnterCheckout} className="rounded-xl border border-cyan-300 bg-cyan-300/10 px-5 py-3 text-sm font-black uppercase tracking-widest text-cyan-100 hover:bg-cyan-300/20">
                Rent This Bot
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onEnterRobotStore} className="rounded-lg border border-slate-700 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:border-purple-500">Visit Bot Store</button>
            <button onClick={onEnterCheckout} className="rounded-lg border border-purple-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-purple-200 hover:bg-purple-800/30">Founding Pre-Tickets</button>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-800 bg-black/70 p-6 text-left">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">Today&apos;s Park Stats</p>
          <p className="mt-2 text-xs text-slate-500">Launch-preview display</p>
          <div className="mt-5 space-y-3">
            {PARK_STATS.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="font-black text-white">{value}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSparkles((count) => count + 1)}
            className="mt-6 w-full rounded-2xl border border-fuchsia-400/50 bg-fuchsia-400/10 px-4 py-5 text-2xl shadow-[0_0_24px_rgba(232,121,249,0.15)] hover:bg-fuchsia-400/20"
            aria-label="Sparkle button"
          >
            ✨
          </button>
          <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-slate-600">Sparkles released: {sparkles}</p>
        </aside>
      </section>

      <section className="relative z-10 mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-800 bg-black/60 p-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">Founder Access</p>
        <form onSubmit={handleFounderAccess} className="mx-auto mt-4 flex max-w-md gap-2">
          <input
            type="password"
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value)}
            placeholder="ENTER RIFT CODE"
            className="min-w-0 flex-1 rounded-lg border border-purple-800 bg-black/70 px-4 py-3 text-center text-sm tracking-widest text-purple-200 outline-none focus:border-purple-400"
          />
          <button className="rounded-lg border border-purple-500 px-4 py-3 text-xs font-black uppercase tracking-widest text-purple-100">Verify</button>
        </form>
        <div className="mt-3 min-h-6">
          {accessStatus === 'checking' && <span className="text-xs uppercase tracking-widest text-purple-300">Verifying signature...</span>}
          {accessStatus === 'denied' && <span className="text-xs uppercase tracking-widest text-red-400">Access denied.</span>}
          {accessStatus === 'granted' && (
            <button onClick={onFounderAccess} className="rounded-lg border border-emerald-400 bg-emerald-400/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-emerald-100">Open Founder Door</button>
          )}
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        <button onClick={onEnterDreamLab} className="rounded-2xl border border-purple-700 bg-purple-900/10 p-5 text-left hover:border-purple-400">
          <p className="text-xs font-black uppercase tracking-widest text-purple-300">Mine Your Dream Project</p>
          <p className="mt-2 text-sm text-slate-500">Enter Aspire Lab and start shaping the build.</p>
        </button>
        <button onClick={onEnterMoneyTracker} className="rounded-2xl border border-slate-700 bg-slate-900/20 p-5 text-left hover:border-slate-400">
          <p className="text-xs font-black uppercase tracking-widest text-slate-200">Verified Geniunaire Passageway</p>
          <p className="mt-2 text-sm text-slate-500">Continue through the money and operations lane.</p>
        </button>
      </section>

      <footer className="relative z-10 mx-auto mt-12 max-w-6xl border-t border-slate-900 pt-6 text-center text-[10px] uppercase tracking-[0.22em] text-slate-600">
        Automated characters are labeled. Promotional bot activity must be disclosed. Guests stay. Bots clock out. The park keeps moving.
      </footer>
    </main>
  );
}

export default EntryGate;
