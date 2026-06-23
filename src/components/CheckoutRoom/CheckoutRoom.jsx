import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireCheckoutOffers';

const starterOffers = [
  ['DormMageddon Student Access', '$7.99/month', 'Monthly Subscription', 'Students, campus founders, parents, and supporters'],
  ['Website Sample Preview', '$49 - $99', 'One-Time Fee', 'Clients testing a niche/site idea before full build'],
  ['Starter Website + Hosting Support', '$29.99 - $99.99/month', 'Monthly Plan', 'Low-cash clients needing website, hosting, and updates'],
  ['Helper Rental', '$19.99 - $99.99/month', 'Monthly Rental', 'Clients wanting a programmed AI worker'],
  ['Admiration Funnel Consultation', '$25 - $149', 'One-Time Fee', 'Clients needing niche review, rebrand help, or launch direction'],
].map(([name, price, type, audience], index) => ({
  id: index + 1,
  name,
  price,
  type,
  audience,
  link: '',
  status: 'Draft',
  notes: 'Add payment link, offer limits, support notes, and checkout instructions.',
}));

function CheckoutRoom({ onReturn }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    type: '',
    audience: '',
    link: '',
    status: '',
    notes: '',
  });

  const [copyStatus, setCopyStatus] = useState('');

  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterOffers;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  }, [offers]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addOffer(event) {
    event.preventDefault();

    const newOffer = {
      id: Date.now(),
      name: form.name || 'Unnamed Offer',
      price: form.price || 'TBD',
      type: form.type || 'Custom Quote',
      audience: form.audience || 'General',
      link: form.link || '',
      status: form.status || 'Draft',
      notes: form.notes || '',
    };

    setOffers([newOffer, ...offers]);
    setForm({ name: '', price: '', type: '', audience: '', link: '', status: '', notes: '' });
    setCopyStatus('Checkout offer saved.');
  }

  function updateOffer(id, field, value) {
    setOffers(
      offers.map((offer) => {
        if (offer.id === id) {
          return { ...offer, [field]: value };
        }

        return offer;
      })
    );
  }

  function deleteOffer(id) {
    setOffers(offers.filter((offer) => offer.id !== id));
  }

  function restoreStarterOffers() {
    setOffers(starterOffers);
    setCopyStatus('Starter checkout offers restored.');
  }

  function buildOfferCopy(offer) {
    return [
      'ADMIRATION FUNNEL CHECKOUT OFFER',
      '',
      `Offer: ${offer.name}`,
      `Price: ${offer.price}`,
      `Billing Type: ${offer.type}`,
      `Audience: ${offer.audience}`,
      `Status: ${offer.status}`,
      '',
      `Payment Link: ${offer.link || 'Payment link not added yet.'}`,
      '',
      'Notes:',
      offer.notes || 'No notes added.',
    ].join('\n');
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(`Copied ${label}.`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  const checkoutRules = [
    'ADMIRATION FUNNEL CHECKOUT RULES',
    '',
    'Every paid offer needs a clear price, billing type, checkout link, and support notes before sharing.',
    '',
    'Use external checkout first: Stripe links, Gumroad links, PayPal links, financing links, or approved payment processors.',
    '',
    'Do not promise guaranteed income. Position offers as build, support, hosting, promotion, product, helper, or launch services.',
    '',
    'Clients can start with cash, card, financing, credit approval, pay-over-time, or custom monthly support depending on the offer.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Money Door
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          CHECKOUT ROOM
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Store payment links, offer prices, monthly plans, consultation fees, helper rentals, domain rentals, and paid launch paths.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Payment Path Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            Admiration Funnel can route clients through cash, card, financing, pay-over-time, subscription, or custom monthly support. The checkout link handles payment while this room tracks the offer.
          </p>

          <button
            type="button"
            onClick={() => copyText(checkoutRules, 'checkout rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Checkout Rules
          </button>
        </div>

        <form onSubmit={addOffer} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Checkout Offer</h2>

          <input value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Offer Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.price} onChange={(e) => updateForm('price', e.target.value)} placeholder="Price / Range" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.type} onChange={(e) => updateForm('type', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Billing Type</option>
            <option value="One-Time Fee">One-Time Fee</option>
            <option value="Monthly Subscription">Monthly Subscription</option>
            <option value="Monthly Rental">Monthly Rental</option>
            <option value="Setup Fee + Monthly Plan">Setup Fee + Monthly Plan</option>
            <option value="Financing / Pay-Over-Time">Financing / Pay-Over-Time</option>
            <option value="Custom Quote">Custom Quote</option>
          </select>

          <input value={form.audience} onChange={(e) => updateForm('audience', e.target.value)} placeholder="Audience / Client Type" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.link} onChange={(e) => updateForm('link', e.target.value)} placeholder="Payment Link / Checkout URL" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Needs Link">Needs Link</option>
          </select>

          <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} placeholder="Offer notes, included services, financing notes, limits, support terms." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Checkout Offer
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-purple-300 mb-2">Saved Checkout Offers</h2>
              <p className="text-slate-500 text-sm">
                Edit offers, add real payment links, copy checkout summaries, and route clients to the right money path.
              </p>
            </div>

            <button
              type="button"
              onClick={restoreStarterOffers}
              className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950"
            >
              Restore Starter Offers
            </button>
          </div>

          {offers.length === 0 && <p className="text-slate-500">No checkout offers saved yet.</p>}

          {offers.map((offer) => (
            <div key={offer.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {offer.type} // {offer.status}
              </p>

              <input value={offer.name} onChange={(e) => updateOffer(offer.id, 'name', e.target.value)} className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded text-purple-300 text-xl font-bold" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input value={offer.price} onChange={(e) => updateOffer(offer.id, 'price', e.target.value)} className="w-full bg-black border border-slate-700 px-4 py-2 rounded" />
                <input value={offer.type} onChange={(e) => updateOffer(offer.id, 'type', e.target.value)} className="w-full bg-black border border-slate-700 px-4 py-2 rounded" />
              </div>

              <input value={offer.audience} onChange={(e) => updateOffer(offer.id, 'audience', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
              <input value={offer.link} onChange={(e) => updateOffer(offer.id, 'link', e.target.value)} placeholder="Payment Link" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />

              <textarea value={offer.notes || ''} onChange={(e) => updateOffer(offer.id, 'notes', e.target.value)} rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildOfferCopy(offer), offer.name)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Offer
                </button>

                <button type="button" onClick={() => copyText(offer.link || 'No payment link added yet.', 'payment link')} className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950">
                  Copy Link
                </button>

                <button type="button" onClick={() => deleteOffer(offer.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
                  Delete
                </button>
              </div>
            </div>
          ))}
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

export default CheckoutRoom;