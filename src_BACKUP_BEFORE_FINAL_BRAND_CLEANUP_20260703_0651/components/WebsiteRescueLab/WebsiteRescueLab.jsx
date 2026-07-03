import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireWebsiteRescueLab';

function WebsiteRescueLab({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [form, setForm] = useState({
    clientName: '',
    businessName: '',
    currentUrl: '',
    platform: '',
    problem: '',
    goal: '',
    brandNeeds: '',
    transferStatus: '',
    domainNeed: '',
    packageLevel: '',
    monthlySupport: '',
    notes: '',
  });

  const [rescues, setRescues] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rescues));
  }, [rescues]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addRescue(event) {
    event.preventDefault();

    const newRescue = {
      id: Date.now(),
      ...form,
      clientName: form.clientName || 'Unnamed Client',
      businessName: form.businessName || 'Unnamed Business',
      currentUrl: form.currentUrl || 'No URL listed',
      platform: form.platform || 'Unknown platform',
      problem: form.problem || 'Needs website review.',
      goal: form.goal || 'Needs relaunch direction.',
      brandNeeds: form.brandNeeds || 'Brand needs not listed.',
      transferStatus: form.transferStatus || 'Unknown',
      domainNeed: form.domainNeed || 'Needs review',
      packageLevel: form.packageLevel || 'Rescue Review',
      monthlySupport: form.monthlySupport || 'TBD',
      notes: form.notes || '',
      createdAt: new Date().toLocaleString(),
    };

    setRescues([newRescue, ...rescues]);
    setForm({
      clientName: '',
      businessName: '',
      currentUrl: '',
      platform: '',
      problem: '',
      goal: '',
      brandNeeds: '',
      transferStatus: '',
      domainNeed: '',
      packageLevel: '',
      monthlySupport: '',
      notes: '',
    });
    setCopyStatus('Website rescue record saved.');
  }

  function deleteRescue(id) {
    setRescues(rescues.filter((rescue) => rescue.id !== id));
  }

  function buildRescuePlan(rescue) {
    return [
      'WEBSITE RESCUE PLAN',
      '',
      `Client: ${rescue.clientName}`,
      `Business: ${rescue.businessName}`,
      `Current URL: ${rescue.currentUrl}`,
      `Current Platform/Host: ${rescue.platform}`,
      `Transfer Status: ${rescue.transferStatus}`,
      `Domain Need: ${rescue.domainNeed}`,
      `Package Level: ${rescue.packageLevel}`,
      `Monthly Support: ${rescue.monthlySupport}`,
      '',
      'CURRENT PROBLEM:',
      rescue.problem,
      '',
      'CLIENT GOAL:',
      rescue.goal,
      '',
      'BRAND / REBUILD NEEDS:',
      rescue.brandNeeds,
      '',
      'GENIUNAIRE RELAUNCH DIRECTION:',
      'Audit the current site, identify what is broken or weak, clean up the offer, improve the brand presentation, choose whether to transfer or rebuild, then connect the client to hosting, domain support, checkout, promo materials, and monthly care.',
      '',
      'NOTES:',
      rescue.notes || 'No notes added.',
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

  const rescueRules = [
    'WEBSITE RESCUE RULES',
    '',
    'Website Rescue is for people who already have a site but need a better brand, clearer offer, stronger funnel, new domain path, transfer help, or monthly support.',
    'Do not promise guaranteed sales. Position the service as audit, rebuild, relaunch, hosting support, strategy, and ongoing updates.',
    'If the old site cannot transfer cleanly, rebuild the concept through Geniunaire MasterMinds and connect the correct domain, checkout, and promo path.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Relaunch Command
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          WEBSITE RESCUE LAB
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Audit old websites, plan rebrands, track transfer needs, map domain changes, and package relaunch support.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Rescue Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            This room turns weak websites into rescue plans: audit, rebrand, rebuild, transfer, relaunch, and support.
          </p>

          <button
            type="button"
            onClick={() => copyText(rescueRules, 'website rescue rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Rescue Rules
          </button>
        </div>

        <form onSubmit={addRescue} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Rescue Record</h2>

          <input value={form.clientName} onChange={(e) => updateForm('clientName', e.target.value)} placeholder="Client Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.businessName} onChange={(e) => updateForm('businessName', e.target.value)} placeholder="Business / Website Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.currentUrl} onChange={(e) => updateForm('currentUrl', e.target.value)} placeholder="Current Website URL" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.platform} onChange={(e) => updateForm('platform', e.target.value)} placeholder="Current Platform / Host" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <textarea value={form.problem} onChange={(e) => updateForm('problem', e.target.value)} placeholder="What is wrong with the current site?" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.goal} onChange={(e) => updateForm('goal', e.target.value)} placeholder="What does the client want instead?" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.brandNeeds} onChange={(e) => updateForm('brandNeeds', e.target.value)} placeholder="Brand/rebuild needs" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.transferStatus} onChange={(e) => updateForm('transferStatus', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Transfer Status</option>
            <option value="Can Transfer">Can Transfer</option>
            <option value="Rebuild Recommended">Rebuild Recommended</option>
            <option value="Needs Login Access">Needs Login Access</option>
            <option value="Domain Only Transfer">Domain Only Transfer</option>
            <option value="Unknown">Unknown</option>
          </select>

          <select value={form.domainNeed} onChange={(e) => updateForm('domainNeed', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Domain Need</option>
            <option value="Keep Current Domain">Keep Current Domain</option>
            <option value="Needs New Domain">Needs New Domain</option>
            <option value="GM Managed Domain">GM Managed Domain</option>
            <option value="Domain Rescue Needed">Domain Rescue Needed</option>
          </select>

          <select value={form.packageLevel} onChange={(e) => updateForm('packageLevel', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Package Level</option>
            <option value="Rescue Review">Rescue Review</option>
            <option value="Rebrand Lite">Rebrand Lite</option>
            <option value="Full Relaunch">Full Relaunch</option>
            <option value="Transfer + Relaunch">Transfer + Relaunch</option>
            <option value="Managed Monthly Support">Managed Monthly Support</option>
          </select>

          <input value={form.monthlySupport} onChange={(e) => updateForm('monthlySupport', e.target.value)} placeholder="Monthly Support Price / Plan" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} placeholder="Extra notes, login needs, domain notes, client situation." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Rescue Record
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Saved Rescue Plans</h2>

          {rescues.length === 0 && <p className="text-slate-500">No rescue plans saved yet.</p>}

          {rescues.map((rescue) => (
            <div key={rescue.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {rescue.packageLevel} // {rescue.transferStatus}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-2">
                {rescue.businessName}
              </h2>

              <p className="text-slate-500 text-sm mb-2">
                Client: {rescue.clientName} // Platform: {rescue.platform}
              </p>

              <p className="text-slate-500 text-sm mb-3">
                URL: {rescue.currentUrl}
              </p>

              <p className="text-slate-400 text-sm mb-4">
                {rescue.problem}
              </p>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildRescuePlan(rescue), rescue.businessName)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Rescue Plan
                </button>

                <button type="button" onClick={() => deleteRescue(rescue.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={onReturn} className="px-6 py-3 border border-slate-700 rounded hover:border-purple-500">
          Return To Entry Gate
        </button>
      </section>
    </main>
  );
}

export default WebsiteRescueLab;