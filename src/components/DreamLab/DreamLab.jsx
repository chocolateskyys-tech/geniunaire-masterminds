function DreamLab({ onReturn }) {
  return (
    <main className="min-h-screen bg-black text-slate-300 font-sans relative overflow-hidden flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[12%] w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-40" />
        <div className="absolute top-[68%] left-[82%] w-2 h-2 bg-slate-300 rounded-full animate-pulse opacity-30" />
        <div className="absolute top-[78%] left-[22%] w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50" />
      </div>

      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <section className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-[11px] text-purple-400 tracking-[0.45em] uppercase mb-4">
          Geniunaire MasterMinds // Stage 2
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-purple-400 to-slate-300 mb-6 drop-shadow-[0_0_18px_rgba(168,85,247,0.6)] tracking-widest">
          DREAM LAB
        </h1>

        <h2 className="text-xl md:text-2xl text-purple-400 font-semibold mb-8 tracking-[0.2em] uppercase">
          Selective Deployment System
        </h2>

        <div className="h-px bg-purple-500/80 max-w-2xl mx-auto mb-8" />

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          This is where imagination gets analyzed, matched, and prepared for deployment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="border border-purple-900/60 bg-black/50 rounded p-5 shadow-[0_0_18px_rgba(168,85,247,0.12)]">
            <h3 className="text-purple-300 uppercase tracking-widest text-xs font-bold mb-3">
              Analyze
            </h3>
            <p className="text-sm text-slate-500">
              Identify personality, creative style, support needs, and project potential.
            </p>
          </div>

          <div className="border border-purple-900/60 bg-black/50 rounded p-5 shadow-[0_0_18px_rgba(168,85,247,0.12)]">
            <h3 className="text-purple-300 uppercase tracking-widest text-xs font-bold mb-3">
              Match
            </h3>
            <p className="text-sm text-slate-500">
              Connect the right person to the right niche, system, idea, or business lane.
            </p>
          </div>

          <div className="border border-purple-900/60 bg-black/50 rounded p-5 shadow-[0_0_18px_rgba(168,85,247,0.12)]">
            <h3 className="text-purple-300 uppercase tracking-widest text-xs font-bold mb-3">
              Deploy
            </h3>
            <p className="text-sm text-slate-500">
              Prepare the concept for branding, buildout, monetization, and launch.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReturn}
          className="px-8 py-4 bg-black border border-purple-500 text-purple-300 hover:text-white hover:bg-purple-900/30 hover:shadow-[0_0_24px_rgba(168,85,247,0.45)] rounded transition-all duration-500 uppercase tracking-widest text-sm font-semibold"
        >
          Return To Entry Gate
        </button>
      </section>

      <footer className="relative z-10 mt-12 pb-6 w-full text-center">
        <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse" />
          <span>Dream Lab Systems // Online</span>
        </p>
      </footer>
    </main>
  );
}

export default DreamLab;