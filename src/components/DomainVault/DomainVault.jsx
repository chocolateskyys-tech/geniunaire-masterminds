import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'geniunaireDomainVault';

function toNumber(value) {
  const cleaned = String(value || '').replace(/[^0-9.]/g, '');
  const number = Number(cleaned);
  return Number.isNaN(number) ? 0 : number;
}

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function DomainVault({ onReturn }) {
  const [form, setForm] = useState({
    domain: '',
    registrar: 'IONOS',
    managedBy: 'Geniunaire MasterMinds',
    launchPath: 'GM Managed',
    purchasePrice: '',
    renewalPrice: '',
    rentalPrice: '',
    salePrice: '',
    client: '',
    project: '',
    renewalDate: '',
    status: '',
    notes: '',
  });

  const [copyStatus, setCopyStatus] = useState('');

  const [domains, setDomains] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(domains));
  }, [domains]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addDomain(event) {
    event.preventDefault();

    const newDomain = {
      id: Date.now(),
      domain: form.domain || 'unnamed-domain.com',
      registrar: form.registrar || 'Unknown',
      managedBy: form.managedBy || 'Geniunaire MasterMinds',
      launchPath: form.launchPath || 'GM Managed',
      purchasePrice: form.purchasePrice || '0',
      renewalPrice: form.renewalPrice || '0',
      rentalPrice: form.rentalPrice || '0',
      salePrice: form.salePrice || '0',
      client: form.client || 'Unassigned',
      project: form.project || 'No project attached',
      renewalDate: form.renewalDate || 'Not listed',
      status: form.status || 'Available',
      notes: form.notes || '',
    };

    setDomains([newDomain, ...domains]);

    setForm({
      domain: '',
      registrar: 'IONOS',
      managedBy: 'Geniunaire MasterMinds',
      launchPath: 'GM Managed',
      purchasePrice: '',
      renewalPrice: '',
      rentalPrice: '',
      salePrice: '',
      client: '',
      project: '',
      renewalDate: '',
      status: '',
      notes: '',
    });

    setCopyStatus('Domain record saved.');
  }

  function deleteDomain(id) {
    setDomains(domains.filter((domain) => domain.id !== id));
  }

  function getMath(domain) {
    const purchase = toNumber(domain.purchasePrice);
    const renewal = toNumber(domain.renewalPrice);
    const rental = toNumber(domain.rentalPrice);
    const sale = toNumber(domain.salePrice);

    const monthlyCost = renewal / 12;
    const monthlyProfit = rental - monthlyCost;
    const saleProfit = sale - purchase;

    return { monthlyCost, monthlyProfit, saleProfit };
  }

  const totals = useMemo(() => {
    return domains.reduce(
      (sum, domain) => {
        const math = getMath(domain);
        return {
          rental: sum.rental + toNumber(domain.rentalPrice),
          monthlyCost: sum.monthlyCost + math.monthlyCost,
          monthlyProfit: sum.monthlyProfit + math.monthlyProfit,
          salePotential: sum.salePotential + toNumber(domain.salePrice),
        };
      },
      { rental: 0, monthlyCost: 0, monthlyProfit: 0, salePotential: 0 }
    );
  }, [domains]);

  function buildDomainCopy(domain) {
    const math = getMath(domain);

    return [
      'GM DOMAIN VAULT RECORD',
      '',
      `Domain: ${domain.domain}`,
      `Registrar: ${domain.registrar}`,
      `Managed By: ${domain.managedBy}`,
      `Launch Path: ${domain.launchPath}`,
      `Status: ${domain.status}`,
      `Client Assigned: ${domain.client}`,
      `Project Attached: ${domain.project}`,
      `Renewal Date: ${domain.renewalDate}`,
      '',
      `Purchase Price: ${domain.purchasePrice}`,
      `Renewal Price: ${domain.renewalPrice}`,
      `Monthly Cost Estimate: ${money(math.monthlyCost)}`,
      `Monthly Rental Price: ${domain.rentalPrice}`,
      `Estimated Monthly Profit: ${money(math.monthlyProfit)}`,
      `Sale Price: ${domain.salePrice}`,
      `Estimated Sale Profit: ${money(math.saleProfit)}`,
      '',
      'Notes:',
      domain.notes || 'No notes added.',
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

  const domainRules = [
    'GM DOMAIN VAULT RULES',
    '',
    'Domains may be purchased through IONOS or another registrar, but client-facing management can remain under Geniunaire MasterMinds.',
    '',
    'Registrar means where the domain was purchased. Managed By means who controls setup, assignment, renewal tracking, client use, and launch support.',
    '',
    'Domain rental pricing should cover renewal cost, management time, client use, support, and profit.',
    '',
    'A client may use a GM-managed domain, rent a domain monthly, buy a domain if approved, or attach a domain to a larger build package.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Domain Control
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          DOMAIN VAULT
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Track GM-managed domains, registrar costs, renewal dates, client assignments, rental prices, sale prices, and monthly profit.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Monthly Rental</p>
            <h2 className="text-2xl text-purple-300 font-bold">{money(totals.rental)}</h2>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Monthly Cost</p>
            <h2 className="text-2xl text-purple-300 font-bold">{money(totals.monthlyCost)}</h2>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Monthly Profit</p>
            <h2 className="text-2xl text-purple-300 font-bold">{money(totals.monthlyProfit)}</h2>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Sale Potential</p>
            <h2 className="text-2xl text-purple-300 font-bold">{money(totals.salePotential)}</h2>
          </div>
        </div>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">GM Domain Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            Domains can be purchased through a registrar, but managed, rented, assigned, tracked, and packaged through Geniunaire MasterMinds.
          </p>

          <button
            type="button"
            onClick={() => copyText(domainRules, 'domain rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Domain Rules
          </button>
        </div>

        <form onSubmit={addDomain} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Domain Record</h2>

          <input value={form.domain} onChange={(e) => updateForm('domain', e.target.value)} placeholder="Domain Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.registrar} onChange={(e) => updateForm('registrar', e.target.value)} placeholder="Registrar" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
            <input value={form.managedBy} onChange={(e) => updateForm('managedBy', e.target.value)} placeholder="Managed By" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          </div>

          <select value={form.launchPath} onChange={(e) => updateForm('launchPath', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="GM Managed">GM Managed</option>
            <option value="IONOS Connected">IONOS Connected</option>
            <option value="External Host">External Host</option>
            <option value="Transfer Needed">Transfer Needed</option>
            <option value="Parking / Holding">Parking / Holding</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input value={form.purchasePrice} onChange={(e) => updateForm('purchasePrice', e.target.value)} placeholder="Purchase Price" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
            <input value={form.renewalPrice} onChange={(e) => updateForm('renewalPrice', e.target.value)} placeholder="Renewal Price / Year" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
            <input value={form.rentalPrice} onChange={(e) => updateForm('rentalPrice', e.target.value)} placeholder="Rental Price / Month" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
            <input value={form.salePrice} onChange={(e) => updateForm('salePrice', e.target.value)} placeholder="Sale Price" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          </div>

          <input value={form.client} onChange={(e) => updateForm('client', e.target.value)} placeholder="Client Assigned" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.project} onChange={(e) => updateForm('project', e.target.value)} placeholder="Project Attached" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.renewalDate} onChange={(e) => updateForm('renewalDate', e.target.value)} placeholder="Renewal Date" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Rented">Rented</option>
            <option value="Client Use">Client Use</option>
            <option value="For Sale">For Sale</option>
            <option value="Parking / Holding">Parking / Holding</option>
          </select>

          <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} placeholder="Domain notes, client rules, renewal notes, pricing notes." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Domain Record
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Saved Domains</h2>

          {domains.length === 0 && <p className="text-slate-500">No domains saved yet.</p>}

          {domains.map((domain) => {
            const math = getMath(domain);

            return (
              <div key={domain.id} className="border border-slate-800 rounded-xl p-5 mb-5">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                  {domain.status} // {domain.launchPath}
                </p>

                <h2 className="text-2xl text-purple-300 font-bold mb-2">
                  {domain.domain}
                </h2>

                <p className="text-slate-500 text-sm mb-2">
                  Registrar: {domain.registrar} // Managed By: {domain.managedBy}
                </p>

                <p className="text-slate-500 text-sm mb-2">
                  Client: {domain.client} // Project: {domain.project}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                  <div className="border border-purple-900/50 rounded p-3">
                    <p className="text-xs text-slate-500">Monthly Cost</p>
                    <p className="text-purple-300">{money(math.monthlyCost)}</p>
                  </div>

                  <div className="border border-purple-900/50 rounded p-3">
                    <p className="text-xs text-slate-500">Monthly Profit</p>
                    <p className="text-purple-300">{money(math.monthlyProfit)}</p>
                  </div>

                  <div className="border border-purple-900/50 rounded p-3">
                    <p className="text-xs text-slate-500">Sale Profit</p>
                    <p className="text-purple-300">{money(math.saleProfit)}</p>
                  </div>
                </div>

                <p className="text-slate-500 text-sm mb-5">
                  {domain.notes || 'No notes added.'}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => copyText(buildDomainCopy(domain), domain.domain)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                    Copy Record
                  </button>

                  <button type="button" onClick={() => deleteDomain(domain.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
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

export default DomainVault;