import { useState } from 'react';

const STORY_MODES = [
  {
    title: 'Living Bedtime Story',
    icon: '🌙',
    copy: 'Turn approved family photos and a parent-provided prompt into a narrated, animated bedtime experience.',
  },
  {
    title: 'Family Memory Book',
    icon: '📸',
    copy: 'Build a private family storybook where pictures come to life, tell the story, and freeze back into the page.',
  },
  {
    title: 'Geniunaire Jr. Stage',
    icon: '🎭',
    copy: 'Safe, parent-managed mini productions, character reads, celebration stories, and family event nights.',
  },
  {
    title: 'Junior Helper Bots',
    icon: '🤖',
    copy: 'Age-appropriate guide characters for story clues, reading prompts, scavenger hunts, and family activities.',
  },
];

function KiddieLand({ onReturn }) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  function joinPreview(event) {
    event.preventDefault();
    if (!email.trim()) return;

    const existing = JSON.parse(localStorage.getItem('gm_kiddie_land_preview') || '[]');
    const next = [
      {
        email: email.trim(),
        joinedAt: new Date().toISOString(),
        status: 'Coming Soon Preview List',
      },
      ...existing,
    ];

    localStorage.setItem('gm_kiddie_land_preview', JSON.stringify(next));
    setJoined(true);
    setEmail('');
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#17345f_0%,#35134d_34%,#08030d_72%)] px-5 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-cyan-300/30 bg-black/55 p-7 text-center shadow-[0_0_80px_rgba(103,232,249,0.12)] md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.38em] text-cyan-200">
            Geniunaire MasterMinds Family Attraction
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
            KIDDIE <span className="text-cyan-200">LAND</span>
          </h1>
          <p className="mt-4 text-sm font-black uppercase tracking-[0.28em] text-pink-200">
            Coming Soon
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            A parent-managed story world for living bedtime books, animated family memories, junior productions, and safe character-led adventures.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {STORY_MODES.map((mode) => (
            <article key={mode.title} className="rounded-3xl border border-white/10 bg-black/50 p-6 backdrop-blur">
              <div className="text-4xl">{mode.icon}</div>
              <h2 className="mt-4 text-2xl font-black">{mode.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{mode.copy}</p>
            </article>
          ))}
        </div>

        <section className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-3xl border border-pink-300/25 bg-pink-300/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-pink-200">Family Safety Shell</p>
            <h2 className="mt-3 text-3xl font-black">Parent Account First. Child Experience Second.</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Parent-managed uploads',
                'Private-by-default family projects',
                'No public child messaging',
                'No unapproved outside links',
                'Age-appropriate helper bots',
                'Adult approval before publishing',
              ].map((rule) => (
                <div key={rule} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-slate-300">
                  {rule}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-cyan-300/25 bg-cyan-300/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Preview List</p>
            <h2 className="mt-3 text-3xl font-black">Save A Family Pass</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Collect early interest now without blocking the main GM launch.
            </p>

            {joined ? (
              <div className="mt-6 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-5 text-emerald-100">
                Family preview request saved.
              </div>
            ) : (
              <form onSubmit={joinPreview} className="mt-6">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Parent or guardian email"
                  className="w-full rounded-xl border border-cyan-300/25 bg-black/60 px-4 py-3 text-white outline-none focus:border-cyan-300"
                  required
                />
                <button className="mt-3 w-full rounded-xl border border-cyan-200 bg-cyan-200/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-cyan-100 hover:bg-cyan-200/20">
                  Join Coming Soon List
                </button>
              </form>
            )}
          </article>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            ThreadFolio Glow and E-Folio remain LifeScope products licensed into GM.
          </p>
          {onReturn && (
            <button
              type="button"
              onClick={onReturn}
              className="rounded-xl border border-white/20 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-200 hover:border-cyan-300"
            >
              Return To Front Gate
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default KiddieLand;
