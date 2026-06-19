import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'gmPayDeskOffers';

const DEFAULT_OFFERS = [
  {
    id: 'mini-bot',
    name: 'Mini Bot Ride Pass',
    price: '$5.00',
    billing: 'One time',
    category: 'Bots',
    details: 'One temporary Mini Bot for one hour in approved public areas. The guest stays when the bot clocks out.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'founder-ticket',
    name: 'Founding Guest Pre-Ticket',
    price: '$15.00',
    billing: 'One time',
    category: 'Park Pass',
    details: 'Early-entry preview, founding badge, beta access lane, and launch-day account credit.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'dorm-founder',
    name: 'DormMageddon Founder Pass',
    price: '$12.99/month',
    billing: 'Subscription',
    category: 'DormMageddon',
    details: 'Founder dashboard, creator channel, Funny Money wallet, house challenges, and supervised E-TV access.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'dorm-member',
    name: 'DormMageddon House Member Pass',
    price: '$5.99/month',
    billing: 'Subscription',
    category: 'DormMageddon',
    details: 'House activities, creator-team access, approved productions, and monitored community participation.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'etv-signal',
    name: 'E-TV Creator Signal',
    price: '$19.99/month',
    billing: 'Subscription',
    category: 'E-TV',
    details: 'Creator signal, channel listing, programming tools, and access to approved E-TV screens.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'elounge',
    name: 'E-Lounge Promo Package',
    price: '$49.00/month',
    billing: 'Subscription',
    category: 'E-TV',
    details: 'One approved commercial or promotional rotation on selected E-Lounge screens.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'casting',
    name: 'Production Studio Casting Submission',
    price: '$7.00',
    billing: 'One time',
    category: 'Production',
    details: 'One reviewed submission for an eligible GM Production Studio opportunity.',
    link: '',
    status: 'Needs Link',
    owner: 'GM',
  },
  {
    id: 'lifescope-thread-e',
    name: 'ThreadFolio Glow + E-Folio Experience',
    price: 'Coming Soon',
    billing: 'Licensed product',
    category: 'LifeScope',
    details: 'LifeScope-owned ThreadFolio and E-Folio experience licensed into the GM ecosystem.',
    link: '',
    status: 'Coming Soon',
    owner: 'LifeScope',
  },
];

function CheckoutRoom({ onReturn }) {
  const [mode, setMode] = useState('shop');
  const [category, setCategory] = useState('All');
  const [notice, setNotice] = useState('');
  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_OFFERS;
    } catch {
      return DEFAULT_OFFERS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  }, [offers]);

  const categories = useMemo(
    () => ['All', ...new Set(offers.map((offer) => offer.category))],
    [offers]
  );

  const visibleOffers = useMemo(
    () => (category === 'All' ? offers : offers.filter((offer) => offer.category === category)),
    [category, offers]
  );

  function updateOffer(id, field, value) {
    setOffers((current) =>
      current.map((offer) => (offer.id === id ? { ...offer, [field]: value } : offer))
    );
  }

  function openOffer(offer) {
    if (!offer.link) {
      setNotice(`${offer.name} still needs its secure checkout link.`);
      return;
    }

    window.open(offer.link, '_blank', 'noopener,noreferrer');
  }

  function restoreOffers() {
    setOffers(DEFAULT_OFFERS);
    setNotice('GM launch catalog restored.');
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#271044_0%,#090311_38%,#020202_75%)] px-5 py-10 text-slate-100">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-3xl border border-purple-400/30 bg-black/75 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-purple-300">GM Money Door</p>
            <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">GM PAY DESK</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              Park passes, Mini Bots, DormMageddon, E-TV, production services, and licensed LifeScope experiences.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setMode('shop')} className={mode === 'shop' ? 'rounded-xl border border-purple-300 bg-purple-300/15 px-4 py-3 text-xs font-black uppercase tracking-widest text-purple-100' : 'rounded-xl border border-slate-700 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500'}>Shop</button>
            <button type="button" onClick={() => setMode('manage')} className={mode === 'manage' ? 'rounded-xl border border-amber-300 bg-amber-300/15 px-4 py-3 text-xs font-black uppercase tracking-widest text-amber-100' : 'rounded-xl border border-slate-700 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500'}>Founder Manage</button>
          </div>
        </div>

        {notice && <p className="mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-4 text-sm text-cyan-100">{notice}</p>}

        {mode === 'shop' && (
          <>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? 'rounded-full border border-purple-300 bg-purple-300/15 px-4 py-2 text-xs font-black text-purple-100' : 'rounded-full border border-slate-800 bg-black/50 px-4 py-2 text-xs font-black text-slate-500 hover:border-purple-600'}>{item}</button>
              ))}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleOffers.map((offer) => (
                <article key={offer.id} className="flex min-h-[330px] flex-col rounded-3xl border border-slate-800 bg-black/70 p-6 shadow-2xl transition hover:-translate-y-1 hover:border-purple-500/60">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-200">{offer.category}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{offer.status}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-white">{offer.name}</h2>
                  <p className="mt-3 text-3xl font-black text-purple-300">{offer.price}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-slate-500">{offer.details}</p>
                  <p className="mt-5 border-t border-slate-800 pt-4 text-xs text-slate-600">{offer.billing}{offer.owner !== 'GM' ? ` • Licensed by ${offer.owner}` : ''}</p>
                  <button type="button" onClick={() => openOffer(offer)} disabled={offer.status === 'Coming Soon'} className="mt-5 rounded-xl border border-purple-400 bg-purple-500/15 px-5 py-4 text-xs font-black uppercase tracking-widest text-purple-100 hover:bg-purple-500/25 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600">{offer.link ? 'Open Secure Checkout' : offer.status === 'Coming Soon' ? 'Coming Soon' : 'Checkout Link Needed'}</button>
                </article>
              ))}
            </div>
          </>
        )}

        {mode === 'manage' && (
          <section className="mt-6 rounded-3xl border border-amber-300/25 bg-black/75 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">Founder Wiring Board</p>
                <h2 className="mt-2 text-3xl font-black text-white">Add Checkout Links</h2>
              </div>
              <button type="button" onClick={restoreOffers} className="rounded-xl border border-slate-700 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Restore Catalog</button>
            </div>
            <p className="mt-3 text-sm text-slate-500">Paste one hosted checkout link per offer. Do not place private account credentials in this page.</p>

            <div className="mt-6 space-y-4">
              {offers.map((offer) => (
                <article key={offer.id} className="rounded-2xl border border-slate-800 bg-slate-950/75 p-5">
                  <div className="grid gap-4 lg:grid-cols-[1fr_2fr_auto] lg:items-center">
                    <div>
                      <p className="font-black text-white">{offer.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{offer.price} • {offer.category}</p>
                    </div>
                    <input value={offer.link || ''} onChange={(event) => updateOffer(offer.id, 'link', event.target.value)} placeholder="Paste secure checkout link" className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-cyan-200 outline-none focus:border-cyan-400" />
                    <button type="button" onClick={() => updateOffer(offer.id, 'status', offer.link ? 'Active' : 'Needs Link')} className="rounded-xl border border-emerald-500 px-4 py-3 text-xs font-black uppercase tracking-widest text-emerald-300">Activate</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-600">Customers leave GM only for the secure hosted checkout and return after payment.</p>
          <button type="button" onClick={onReturn} className="rounded-xl border border-slate-700 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:border-purple-500">Return To Front Gate</button>
        </div>
      </section>
    </main>
  );
}

export default CheckoutRoom;
