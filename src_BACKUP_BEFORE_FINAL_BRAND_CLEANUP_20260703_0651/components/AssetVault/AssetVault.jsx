import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireAssetVault';

const priceCards = [
  ['Domain Rental', '$4.99 - $49.99/mo', 'Reserved domains, client-used domains, and niche identity assets.'],
  ['Hosting / Support', '$29.99 - $199.99/mo', 'Website hosting, basic updates, support, and monthly care.'],
  ['Helper Rental', '$19.99 - $99.99/mo', 'Programmed AI workers for websites, promo, support, or niche tasks.'],
  ['Sample Preview', '$49 - $99', 'Mock website, landing page, or niche preview before full build.'],
  ['Managed Launch', '$199 - $999/mo', 'Ongoing launch support, updates, promo, tracking, and strategy.'],
  ['Growth Project', '$1,000 - $5,000/mo', 'High-potential apps, funnels, or brands needing serious support.'],
];

function AssetVault({ onReturn }) {
  const [assetName, setAssetName] = useState('');
  const [clientName, setClientName] = useState('');
  const [niche, setNiche] = useState('');
  const [domain, setDomain] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');
  const [revenueHistory, setRevenueHistory] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  }, [assets]);

  function isSellEligible(asset) {
    return asset.sourceType === 'Co-Created Approved Build';
  }

  function addAsset(event) {
    event.preventDefault();

    const newAsset = {
      id: Date.now(),
      assetName: assetName || 'Unnamed Asset',
      clientName: clientName || 'No client listed',
      niche: niche || 'General',
      domain: domain || 'No domain listed',
      sourceType: sourceType || 'Vault-Picked / House-Owned',
      monthlyFee: monthlyFee || 'TBD',
      revenueHistory: revenueHistory || 'No revenue listed',
      status: status || 'Active',
      notes: notes || '',
    };

    setAssets([newAsset, ...assets]);

    setAssetName('');
    setClientName('');
    setNiche('');
    setDomain('');
    setSourceType('');
    setMonthlyFee('');
    setRevenueHistory('');
    setStatus('');
    setNotes('');
    setCopyStatus('Asset saved.');
  }

  function deleteAsset(id) {
    setAssets(assets.filter((asset) => asset.id !== id));
  }

  function buildAssetCopy(asset) {
    const sellRule = isSellEligible(asset)
      ? 'Sell eligible: YES. This is a co-created, company/client-approved build.'
      : 'Sell eligible: NO. Vault-picked, pre-made, or house-owned assets cannot be sold by the client. The house decides future use.';

    return [
      'DREAM ASSET VAULT RECORD',
      '',
      `Asset: ${asset.assetName}`,
      `Client / Contributor: ${asset.clientName}`,
      `Niche: ${asset.niche}`,
      `Domain: ${asset.domain}`,
      `Source Type: ${asset.sourceType}`,
      `Monthly Fee: ${asset.monthlyFee}`,
      `Revenue History: ${asset.revenueHistory}`,
      `Status: ${asset.status}`,
      '',
      sellRule,
      '',
      'Notes:',
      asset.notes || 'No notes added.',
    ].join('\n');
  }

  async function copyAsset(asset) {
    try {
      await navigator.clipboard.writeText(buildAssetCopy(asset));
      setCopyStatus(`Copied asset record: ${asset.assetName}`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  const rulesCopy = [
    'ADMIRATION FUNNEL ASSET RULES',
    '',
    'Only custom, co-created, Geniunaire MasterMinds/client-approved builds can become sellable assets.',
    '',
    'Vault-picked niches, pre-made releases, house-owned ideas, product bases, or ready-made materials cannot be sold by the client as their own asset.',
    '',
    'If a client stops paying, the project may be paused, vaulted, relaunched, rented, sold, auctioned, or repurposed depending on the agreement and asset source.',
    '',
    'Monthly money paths may include hosting/support, domain rental, helper rental, promo support, product vault access, checkout links, and managed launch services.',
  ].join('\n');

  async function copyRules() {
    try {
      await navigator.clipboard.writeText(rulesCopy);
      setCopyStatus('Copied Admiration Funnel asset rules.');
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Monetization Control
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          DREAM ASSET VAULT
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Track created assets, Vault-picked assets, hosting money, helper rental, domain rental, sell eligibility, and project status.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Asset Ownership Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            Only custom, co-created, Geniunaire MasterMinds/client-approved builds can become sellable assets. Vault-picked or house-owned ideas cannot be sold by the client.
          </p>
          <button
            type="button"
            onClick={copyRules}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Asset Rules
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {priceCards.map(([name, price, detail]) => (
            <div key={name} className="border border-slate-800 rounded-xl p-5 bg-black/40">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                Monetization Path
              </p>
              <h2 className="text-xl text-purple-300 font-bold mb-2">{name}</h2>
              <p className="text-purple-400 font-bold mb-2">{price}</p>
              <p className="text-slate-500 text-sm">{detail}</p>
            </div>
          ))}
        </div>

        <form onSubmit={addAsset} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Asset Record</h2>

          <input value={assetName} onChange={(e) => setAssetName(e.target.value)} placeholder="Asset / Project Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client / Contributor Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Niche / Category" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Domain / Link" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Source Type</option>
            <option value="Co-Created Approved Build">Co-Created Approved Build</option>
            <option value="Vault-Picked / House-Owned">Vault-Picked / House-Owned</option>
            <option value="Website Rescue / Relaunch">Website Rescue / Relaunch</option>
            <option value="Product Vault / White Label">Product Vault / White Label</option>
            <option value="Helper Rental / AI Worker">Helper Rental / AI Worker</option>
          </select>

          <input value={monthlyFee} onChange={(e) => setMonthlyFee(e.target.value)} placeholder="Monthly Fee / Plan" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={revenueHistory} onChange={(e) => setRevenueHistory(e.target.value)} placeholder="Revenue History / Projection" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Past Due">Past Due</option>
            <option value="Vault Hold">Vault Hold</option>
            <option value="For Sale">For Sale</option>
            <option value="Auction Ready">Auction Ready</option>
            <option value="Relaunch Ready">Relaunch Ready</option>
            <option value="House-Owned">House-Owned</option>
          </select>

          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Asset notes, split notes, payment notes, support needs." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Asset Record
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Saved Assets</h2>

          {assets.length === 0 && <p className="text-slate-500">No assets saved yet.</p>}

          {assets.map((asset) => (
            <div key={asset.id} className="border border-slate-800 rounded-xl p-5 mb-4">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {asset.sourceType}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-2">
                {asset.assetName}
              </h2>

              <p className="text-slate-500 text-sm mb-2">
                Client: {asset.clientName} // Niche: {asset.niche}
              </p>

              <p className="text-slate-500 text-sm mb-2">
                Domain: {asset.domain}
              </p>

              <p className="text-slate-400 text-sm mb-2">
                Monthly Fee: {asset.monthlyFee}
              </p>

              <p className="text-slate-400 text-sm mb-2">
                Revenue: {asset.revenueHistory}
              </p>

              <p className="text-sm mb-4 text-purple-300">
                {isSellEligible(asset)
                  ? 'Sell Eligible: YES'
                  : 'Sell Eligible: NO / House Controls Future Use'}
              </p>

              <p className="text-slate-500 text-sm mb-5">
                {asset.notes || 'No notes added.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyAsset(asset)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Record
                </button>
                <button type="button" onClick={() => deleteAsset(asset.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
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

export default AssetVault;