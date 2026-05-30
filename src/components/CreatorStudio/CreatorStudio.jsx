import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireCreatorStudioDrafts';

function CreatorStudio({ onReturn }) {
  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const [problem, setProblem] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const [drafts, setDrafts] = useState(() => {
    const savedDrafts = localStorage.getItem(STORAGE_KEY);
    return savedDrafts ? JSON.parse(savedDrafts) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  }, [drafts]);

  function addDraft(event) {
    event.preventDefault();

    const newDraft = {
      id: Date.now(),
      title: title || 'Untitled Release',
      niche: niche || 'General',
      audience: audience || 'Not selected',
      problem: problem || 'Not listed',
      price: price || 'TBD',
      status: status || 'Draft',
      notes: notes || '',
    };

    setDrafts([newDraft, ...drafts]);

    setTitle('');
    setNiche('');
    setAudience('');
    setProblem('');
    setPrice('');
    setStatus('');
    setNotes('');
    setCopyStatus('');
  }

  function updateDraft(id, field, value) {
    setDrafts(
      drafts.map((draft) => {
        if (draft.id === id) {
          return { ...draft, [field]: value };
        }

        return draft;
      })
    );
  }

  function deleteDraft(id) {
    setDrafts(drafts.filter((draft) => draft.id !== id));
  }

  function clearDrafts() {
    const confirmed = window.confirm(
      'Are you sure you want to clear all Creator Studio drafts? This cannot be undone.'
    );

    if (confirmed) {
      setDrafts([]);
      setCopyStatus('');
    }
  }

  function buildReleaseCopy(draft) {
    return [
      `Release Title: ${draft.title}`,
      `Niche: ${draft.niche}`,
      `Audience: ${draft.audience}`,
      `Problem It Solves: ${draft.problem}`,
      `Price: ${draft.price}`,
      `Status: ${draft.status}`,
      '',
      'Creator Notes:',
      draft.notes || 'No notes added.',
      '',
      'IONOS / Builder Prompt:',
      `Create a bold, modern landing page for "${draft.title}" in the ${draft.niche} niche. The page should speak to ${draft.audience}, explain the problem: ${draft.problem}, and position the product as a helpful digital release from the Vault.`,
    ].join('\n');
  }

  async function copyRelease(draft) {
    try {
      await navigator.clipboard.writeText(buildReleaseCopy(draft));
      setCopyStatus(`Copied ${draft.title} release copy.`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Creation Room
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          CREATOR STUDIO
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Build ebooks, niche releases, mini guides, promo kits, and digital products before releasing them from the Vault.
        </p>

        <form onSubmit={addDraft} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Create New Vault Release</h2>

          <p className="text-slate-500 text-sm mb-6">
            Draft the product idea here first. Later, release it into the Vault for promotion, selling, or client buildout.
          </p>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Release Title / Ebook Name"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <input
            value={niche}
            onChange={(event) => setNiche(event.target.value)}
            placeholder="Niche / Category"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <input
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            placeholder="Target Audience"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <textarea
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            placeholder="What problem does this release solve?"
            rows="3"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price / Offer Example: $7.99, $9.99, Free Lead Magnet"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          >
            <option value="">Release Status</option>
            <option value="Draft">Draft</option>
            <option value="Ready">Ready</option>
            <option value="Released">Released</option>
          </select>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Creator notes / chapters / promo angle / builder instructions"
            rows="4"
            className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Creator Draft
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Saved Creator Drafts</h2>

          <p className="text-slate-500 text-sm mb-6">
            Edit drafts, copy release copy, and prepare products for the Vault.
          </p>

          {copyStatus && (
            <p className="mb-5 text-purple-300">
              {copyStatus}
            </p>
          )}

          {drafts.length === 0 && (
            <p className="text-slate-500">No creator drafts yet.</p>
          )}

          {drafts.map((draft) => (
            <div key={draft.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                Release Title
              </label>
              <input
                value={draft.title}
                onChange={(event) => updateDraft(draft.id, 'title', event.target.value)}
                className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                Niche
              </label>
              <input
                value={draft.niche}
                onChange={(event) => updateDraft(draft.id, 'niche', event.target.value)}
                className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                Audience
              </label>
              <input
                value={draft.audience}
                onChange={(event) => updateDraft(draft.id, 'audience', event.target.value)}
                className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                Problem It Solves
              </label>
              <textarea
                value={draft.problem}
                onChange={(event) => updateDraft(draft.id, 'problem', event.target.value)}
                rows="3"
                className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                    Price
                  </label>
                  <input
                    value={draft.price}
                    onChange={(event) => updateDraft(draft.id, 'price', event.target.value)}
                    className="w-full bg-black border border-slate-700 px-4 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                    Status
                  </label>
                  <select
                    value={draft.status}
                    onChange={(event) => updateDraft(draft.id, 'status', event.target.value)}
                    className="w-full bg-black border border-slate-700 px-4 py-2 rounded"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Ready">Ready</option>
                    <option value="Released">Released</option>
                  </select>
                </div>
              </div>

              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                Creator Notes
              </label>
              <textarea
                value={draft.notes || ''}
                onChange={(event) => updateDraft(draft.id, 'notes', event.target.value)}
                rows="4"
                className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyRelease(draft)}
                  className="px-4 py-2 bg-purple-900 border border-purple-500 rounded"
                >
                  Copy Release Copy
                </button>

                <button
                  type="button"
                  onClick={() => deleteDraft(draft.id)}
                  className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950"
                >
                  Delete Draft
                </button>
              </div>
            </div>
          ))}

          {drafts.length > 0 && (
            <button
              type="button"
              onClick={clearDrafts}
              className="mt-4 px-6 py-3 border border-red-900 text-red-300 rounded hover:bg-red-950"
            >
              Clear Creator Drafts
            </button>
          )}
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

export default CreatorStudio;