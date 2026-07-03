function DormMageddon({ onReturn }) {
  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Funnel Add-In
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          DORMMAGEDDON
        </h1>

        <p className="text-slate-400 max-w-2xl mb-8">
          A student-focused launch lane for dorm setup, campus survival kits,
          budget builds, affiliate products, student services, and quick-start
          micro-business ideas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-3">
              Dorm Setup
            </h2>
            <p className="text-slate-500 text-sm">
              Essentials, room upgrades, bundles, and student living needs.
            </p>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-3">
              Campus Hustle
            </h2>
            <p className="text-slate-500 text-sm">
              Student services, side hustles, offers, and quick launch tasks.
            </p>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-3">
              Survival Kits
            </h2>
            <p className="text-slate-500 text-sm">
              Curated lists for back-to-campus life, safety, comfort, and convenience.
            </p>
          </div>
        </div>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-3">DormMageddon Status</h2>
          <p className="text-slate-500">
            Placeholder active. This room is ready for future product links,
            student packages, campus funnels, and DormMageddon project templates.
          </p>
        </div>

        <button
          type="button"
          onClick={onReturn}
          className="px-6 py-3 border border-slate-700 rounded hover:border-purple-500"
        >
          Return To Entry Gate
        </button>
      </section>
    </main>
  );
}

export default DormMageddon;