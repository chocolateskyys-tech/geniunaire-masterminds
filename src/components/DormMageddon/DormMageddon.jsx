import { useMemo, useState } from 'react';

const PANELS = [
  ['house', 'House Floor'],
  ['auntie', 'AuntieRental'],
  ['boo', 'BOO Pass'],
  ['money', 'Funny Money'],
  ['payroll', 'Payroll'],
];

const HOUSE_RULES = [
  'No hazing, bullying, illegal dares, or explicit content.',
  'No shared admin credentials. Guests use monitored BOO Passes.',
  'Discord access is request-only and time-limited.',
  'Publishing, payouts, and outside links may require Auntie approval.',
  'Manage the house. Protect the signal. Pass the semester. Earn the key.',
];

function DormMageddon({ onReturn }) {
  const [activePanel, setActivePanel] = useState('house');
  const [approvalStatus, setApprovalStatus] = useState('review');
  const [booName, setBooName] = useState('');
  const [booPurpose, setBooPurpose] = useState('Creator guest');
  const [booDuration, setBooDuration] = useState('2 hours');
  const [booPasses, setBooPasses] = useState([]);
  const [revenue, setRevenue] = useState(12500);
  const [expenses, setExpenses] = useState(4200);
  const [reserveMonths, setReserveMonths] = useState(6);

  const payrollResult = useMemo(() => {
    const monthlyFreeCash = Math.max(0, Number(revenue) - Number(expenses));
    const protectedReserve = Number(expenses) * Number(reserveMonths);
    const safeMonthlyPayroll = Math.floor(monthlyFreeCash * 0.25);
    return {
      monthlyFreeCash,
      protectedReserve,
      safeMonthlyPayroll,
      safeHourlyRate: safeMonthlyPayroll > 0 ? Math.floor(safeMonthlyPayroll / 40) : 0,
    };
  }, [revenue, expenses, reserveMonths]);

  function createBooPass(event) {
    event.preventDefault();
    if (!booName.trim()) return;

    const newPass = {
      id: Date.now(),
      name: booName.trim(),
      purpose: booPurpose,
      duration: booDuration,
      status: 'Awaiting Auntie',
    };

    setBooPasses((passes) => [newPass, ...passes]);
    setBooName('');
  }

  function updatePass(id, status) {
    setBooPasses((passes) =>
      passes.map((pass) => (pass.id === id ? { ...pass, status } : pass))
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#132109_0%,#071008_28%,#020403_70%)] px-5 py-10 text-slate-100">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 rounded-3xl border border-lime-400/30 bg-black/70 p-6 shadow-[0_0_60px_rgba(163,230,53,0.12)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-lime-300">
              Geniunaire Masterminded Online Frat Attraction
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">
              DORM<span className="text-lime-300">MAGEDDON</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              A monitored creator house where students build channels, productions, businesses, and leadership skills while Auntie keeps the emergency brake.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-5 py-4 text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200">House Status</p>
            <p className="mt-2 text-lg font-black text-white">AuntieRental Control Active</p>
            <p className="mt-1 text-xs text-slate-400">Freshman-year training ride: 6–12 months</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {PANELS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActivePanel(id)}
              className={
                activePanel === id
                  ? 'rounded-full border border-lime-300 bg-lime-300/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-lime-100'
                  : 'rounded-full border border-slate-700 bg-black/50 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:border-lime-500'
              }
            >
              {label}
            </button>
          ))}
        </div>

        {activePanel === 'house' && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-3xl border border-lime-500/30 bg-black/65 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-lime-300">Founder Station</p>
              <h2 className="mt-3 text-3xl font-black text-white">His House. GM Property. Auntie Has The Spare Key.</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['Founder Admin Door', 'His own branded entrance and station dashboard.'],
                  ['Creator Channels', 'Film, animation, stories, shows, and campus programming.'],
                  ['Funny Money', 'Training economy for budgeting, pricing, and rewards.'],
                  ['E-TV Signal', 'Approved productions can move onto GM screens.'],
                  ['Casting Requests', 'Build teams without sharing admin access.'],
                  ['Semester Unlocks', 'More freedom, tools, and money access through responsibility.'],
                ].map(([title, copy]) => (
                  <article key={title} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                    <h3 className="font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-amber-300/30 bg-amber-300/5 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">Keep The Frat Standing</p>
              <div className="mt-5 space-y-3">
                {HOUSE_RULES.map((rule, index) => (
                  <div key={rule} className="flex gap-3 rounded-xl border border-slate-800 bg-black/50 p-4">
                    <span className="font-black text-amber-200">{index + 1}</span>
                    <p className="text-sm leading-6 text-slate-400">{rule}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        )}

        {activePanel === 'auntie' && (
          <section className="mt-6 rounded-3xl border border-fuchsia-400/30 bg-black/70 p-6">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-fuchsia-300">AuntieRental Control</p>
            <h2 className="mt-3 text-3xl font-black text-white">Hold Up, Baby… Auntie Gotta Say “Yeah” First.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Prototype approval control for Discord, publishing, payouts, outside links, BOO Passes, live broadcasts, creator invitations, and expanded admin permissions.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['YEAH, BABY', 'approved'],
                ['NOT YET, BABY', 'hold'],
                ['COME SEE AUNTIE', 'discussion'],
                ['ABSOLUTELY NOT', 'denied'],
                ['JUST THIS ONCE', 'temporary'],
                ['YOU BEEN DOING GOOD', 'extended'],
              ].map(([label, status]) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setApprovalStatus(status)}
                  className={
                    approvalStatus === status
                      ? 'rounded-2xl border border-fuchsia-300 bg-fuchsia-300/15 p-5 text-left text-fuchsia-100'
                      : 'rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-left text-slate-300 hover:border-fuchsia-500'
                  }
                >
                  <span className="text-xs font-black uppercase tracking-widest">{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-black/60 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">Current decision</p>
              <p className="mt-2 text-xl font-black uppercase text-white">{approvalStatus}</p>
            </div>
          </section>
        )}

        {activePanel === 'boo' && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <form onSubmit={createBooPass} className="rounded-3xl border border-cyan-400/30 bg-black/70 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">GM Transferable BOO Pass</p>
              <h2 className="mt-3 text-3xl font-black text-white">Let Them Help. Never Share Admin.</h2>

              <label className="mt-6 block text-xs font-black uppercase tracking-widest text-slate-500">Guest name</label>
              <input
                value={booName}
                onChange={(event) => setBooName(event.target.value)}
                placeholder="WHO IS IT FOR?"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <label className="mt-4 block text-xs font-black uppercase tracking-widest text-slate-500">Purpose</label>
              <select value={booPurpose} onChange={(event) => setBooPurpose(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white">
                {['Creator guest', 'Casting audition', 'Production helper', 'Event guest', 'Backstage access', 'Weekend guest'].map((item) => <option key={item}>{item}</option>)}
              </select>

              <label className="mt-4 block text-xs font-black uppercase tracking-widest text-slate-500">Duration</label>
              <select value={booDuration} onChange={(event) => setBooDuration(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white">
                {['30 minutes', '2 hours', '1 day', 'Weekend'].map((item) => <option key={item}>{item}</option>)}
              </select>

              <button className="mt-5 w-full rounded-xl border border-cyan-300 bg-cyan-300/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-cyan-100 hover:bg-cyan-300/20">Request BOO Pass</button>
            </form>

            <div className="rounded-3xl border border-slate-800 bg-black/70 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">Pass Audit Trail</p>
              <div className="mt-5 space-y-3">
                {booPasses.length === 0 && <p className="rounded-xl border border-dashed border-slate-800 p-6 text-sm text-slate-600">No BOO Pass requests yet.</p>}
                {booPasses.map((pass) => (
                  <article key={pass.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-black text-white">{pass.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{pass.purpose} • {pass.duration}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-widest text-cyan-300">{pass.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => updatePass(pass.id, 'Approved')} className="rounded-lg border border-emerald-500 px-3 py-2 text-xs font-bold text-emerald-300">Yeah, Baby</button>
                        <button type="button" onClick={() => updatePass(pass.id, 'Denied')} className="rounded-lg border border-red-500 px-3 py-2 text-xs font-bold text-red-300">No</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activePanel === 'money' && (
          <section className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              ['House Wallet', '48,500 FM', 'Funny Money available'],
              ['Creator Revenue', '$0.00', 'Real-money release supervised'],
              ['Future Fund', 'LOCKED', 'Founder reserve protected'],
            ].map(([title, value, note]) => (
              <article key={title} className="rounded-3xl border border-emerald-400/25 bg-black/70 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">{title}</p>
                <p className="mt-4 text-4xl font-black text-white">{value}</p>
                <p className="mt-3 text-sm text-slate-500">{note}</p>
              </article>
            ))}
          </section>
        )}

        {activePanel === 'payroll' && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-3xl border border-purple-400/30 bg-black/70 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-300">We Can Afford To Pay Somebody</p>
              <label className="mt-5 block text-xs uppercase tracking-widest text-slate-500">Monthly station revenue</label>
              <input type="number" value={revenue} onChange={(event) => setRevenue(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white" />
              <label className="mt-4 block text-xs uppercase tracking-widest text-slate-500">Monthly expenses</label>
              <input type="number" value={expenses} onChange={(event) => setExpenses(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white" />
              <label className="mt-4 block text-xs uppercase tracking-widest text-slate-500">Reserve months</label>
              <input type="number" value={reserveMonths} onChange={(event) => setReserveMonths(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white" />
            </div>

            <div className="rounded-3xl border border-lime-400/30 bg-lime-400/5 p-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-lime-300">Generated Payroll Budget</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ['Monthly free cash', `$${payrollResult.monthlyFreeCash.toLocaleString()}`],
                  ['Protected reserve target', `$${payrollResult.protectedReserve.toLocaleString()}`],
                  ['Safe monthly payroll', `$${payrollResult.safeMonthlyPayroll.toLocaleString()}`],
                  ['Example safe hourly rate', `$${payrollResult.safeHourlyRate}/hr`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-800 bg-black/60 p-5">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-400">Family gets first opportunity—not automatic payroll. Final worker classification, tax setup, and hiring paperwork require professional review.</p>
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6">
          <p className="text-sm font-black text-lime-300">Enter the house. Survive the semester. Build your channel.</p>
          <button type="button" onClick={onReturn} className="rounded-xl border border-slate-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:border-lime-400">Return To Front Gate</button>
        </div>
      </section>
    </main>
  );
}

export default DormMageddon;
