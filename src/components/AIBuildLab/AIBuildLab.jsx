import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireAIBuildLab';

function AIBuildLab({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [form, setForm] = useState({
    projectName: '',
    clientName: '',
    niche: '',
    rawIdea: '',
    audience: '',
    offer: '',
    vibe: '',
    pages: '',
    clientExpectation: '',
    realNeed: '',
    status: '',
  });

  const [drafts, setDrafts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addDraft(event) {
    event.preventDefault();

    const newDraft = {
      id: Date.now(),
      ...form,
      projectName: form.projectName || 'Unnamed Project',
      clientName: form.clientName || 'No client listed',
      niche: form.niche || 'General niche',
      rawIdea: form.rawIdea || 'No raw idea added.',
      audience: form.audience || 'General audience',
      offer: form.offer || 'Offer not defined yet.',
      vibe: form.vibe || 'Modern / clean',
      pages: form.pages || 'Home, About, Services, Contact',
      clientExpectation: form.clientExpectation || 'Not listed.',
      realNeed: form.realNeed || 'Needs strategy review.',
      status: form.status || 'Dream Draft',
      createdAt: new Date().toLocaleString(),
    };

    setDrafts([newDraft, ...drafts]);
    setForm({
      projectName: '',
      clientName: '',
      niche: '',
      rawIdea: '',
      audience: '',
      offer: '',
      vibe: '',
      pages: '',
      clientExpectation: '',
      realNeed: '',
      status: '',
    });
    setCopyStatus('AI build draft saved.');
  }

  function deleteDraft(id) {
    setDrafts(drafts.filter((draft) => draft.id !== id));
  }

  function buildIonosPrompt(draft) {
    return [
      `Create a modern website for ${draft.projectName}.`,
      `Niche: ${draft.niche}`,
      `Target audience: ${draft.audience}`,
      `Main offer: ${draft.offer}`,
      `Brand vibe: ${draft.vibe}`,
      `Pages/sections: ${draft.pages}`,
      '',
      'Use strong headlines, clear calls to action, clean sections, and conversion-focused wording.',
      '',
      `Client raw idea: ${draft.rawIdea}`,
    ].join('\n');
  }

  function buildReview(draft) {
    return [
      'DREAM DRAFT REVIEW',
      '',
      `Project: ${draft.projectName}`,
      `Client: ${draft.clientName}`,
      `Status: ${draft.status}`,
      '',
      'CLIENT RAW IDEA:',
      draft.rawIdea,
      '',
      'WHAT CLIENT THINKS THEY NEED:',
      draft.clientExpectation,
      '',
      'WHAT THE SITE ACTUALLY NEEDS:',
      draft.realNeed,
      '',
      'IONOS PROMPT:',
      buildIonosPrompt(draft),
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

  const rules = [
    'AI BUILD LAB RULES',
    '',
    'Use AI website builders backwards as a client dream-draft tool.',
    'The first mockup reveals what the client thinks they want.',
    'The Geniunaire build plan explains what the site actually needs.',
    'Use this room to create IONOS-ready prompts, before/after notes, and build plans.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // AI Build Command
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          AI BUILD LAB
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Turn raw client ideas into IONOS prompts, mockup reviews, before/after strategy, and Geniunaire build plans.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Dream Draft Method</h2>
          <p className="text-slate-500 text-sm mb-5">
            Let the client dream first. Then use the AI draft to reveal what they expect, what is missing, and what should be built.
          </p>
          <button type="button" onClick={() => copyText(rules, 'AI Build Lab rules')} className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Copy Lab Rules
          </button>
        </div>

        <form onSubmit={addDraft} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Dream Draft</h2>

          <input value={form.projectName} onChange={(e) => updateForm('projectName', e.target.value)} placeholder="Project Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.clientName} onChange={(e) => updateForm('clientName', e.target.value)} placeholder="Client Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.niche} onChange={(e) => updateForm('niche', e.target.value)} placeholder="Niche" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.rawIdea} onChange={(e) => updateForm('rawIdea', e.target.value)} placeholder="Client raw idea" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.audience} onChange={(e) => updateForm('audience', e.target.value)} placeholder="Target Audience" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.offer} onChange={(e) => updateForm('offer', e.target.value)} placeholder="Main Offer" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.vibe} onChange={(e) => updateForm('vibe', e.target.value)} placeholder="Brand Vibe / Colors / Tone" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.pages} onChange={(e) => updateForm('pages', e.target.value)} placeholder="Pages / Sections Needed" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.clientExpectation} onChange={(e) => updateForm('clientExpectation', e.target.value)} placeholder="What client thinks they need" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <textarea value={form.realNeed} onChange={(e) => updateForm('realNeed', e.target.value)} placeholder="What the site actually needs" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Dream Draft">Dream Draft</option>
            <option value="Needs Mockup">Needs Mockup</option>
            <option value="Ready For Build">Ready For Build</option>
            <option value="Client Review">Client Review</option>
            <option value="Approved">Approved</option>
          </select>

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Dream Draft
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Saved Dream Drafts</h2>

          {drafts.length === 0 && <p className="text-slate-500">No drafts saved yet.</p>}

          {drafts.map((draft) => (
            <div key={draft.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {draft.status} // {draft.niche}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-2">
                {draft.projectName}
              </h2>

              <p className="text-slate-500 text-sm mb-3">
                Client: {draft.clientName} // Created: {draft.createdAt}
              </p>

              <p className="text-slate-400 text-sm mb-4">
                {draft.rawIdea}
              </p>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildIonosPrompt(draft), 'IONOS prompt')} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy IONOS Prompt
                </button>
                <button type="button" onClick={() => copyText(buildReview(draft), 'dream draft review')} className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950">
                  Copy Review
                </button>
                <button type="button" onClick={() => deleteDraft(draft.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
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

export default AIBuildLab;