import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunairePreviewGallery';

function PreviewGallery({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [form, setForm] = useState({
    title: '',
    client: '',
    category: '',
    previewLink: '',
    status: '',
    beforeNotes: '',
    afterNotes: '',
    offer: '',
    nextStep: '',
  });

  const [previews, setPreviews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(previews));
  }, [previews]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addPreview(event) {
    event.preventDefault();

    const newPreview = {
      id: Date.now(),
      ...form,
      title: form.title || 'Unnamed Preview',
      client: form.client || 'House / Internal',
      category: form.category || 'Website Preview',
      previewLink: form.previewLink || '',
      status: form.status || 'Draft',
      beforeNotes: form.beforeNotes || 'No before notes added.',
      afterNotes: form.afterNotes || 'No after notes added.',
      offer: form.offer || 'Offer not listed.',
      nextStep: form.nextStep || 'Needs review.',
      createdAt: new Date().toLocaleString(),
    };

    setPreviews([newPreview, ...previews]);
    setForm({
      title: '',
      client: '',
      category: '',
      previewLink: '',
      status: '',
      beforeNotes: '',
      afterNotes: '',
      offer: '',
      nextStep: '',
    });
    setCopyStatus('Preview saved.');
  }

  function deletePreview(id) {
    setPreviews(previews.filter((preview) => preview.id !== id));
  }

  function buildPreviewCopy(preview) {
    return [
      'ADMIRATION FUNNEL PREVIEW RECORD',
      '',
      `Title: ${preview.title}`,
      `Client / Owner: ${preview.client}`,
      `Category: ${preview.category}`,
      `Status: ${preview.status}`,
      `Preview Link: ${preview.previewLink || 'No link added yet.'}`,
      `Created: ${preview.createdAt}`,
      '',
      'BEFORE NOTES:',
      preview.beforeNotes,
      '',
      'AFTER NOTES:',
      preview.afterNotes,
      '',
      'OFFER / PURPOSE:',
      preview.offer,
      '',
      'NEXT STEP:',
      preview.nextStep,
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

  const galleryRules = [
    'PREVIEW GALLERY RULES',
    '',
    'Use this room to store mockups, website samples, app previews, Vault release previews, client before/after examples, and launch demos.',
    'A preview does not have to be a finished product.',
    'Preview links can point to IONOS drafts, GitHub deployments, screenshots, sample pages, client mockups, or Vault release demos.',
    'Before/after notes help turn a rough idea into proof of progress.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Showcase Control
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          PREVIEW GALLERY
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Track sample sites, app previews, mockup links, before/after examples, Vault release demos, and launch-ready proof.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Preview Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            Previews help clients see what was imagined, what was improved, and what is ready to launch or upgrade.
          </p>

          <button
            type="button"
            onClick={() => copyText(galleryRules, 'preview gallery rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Gallery Rules
          </button>
        </div>

        <form onSubmit={addPreview} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Preview</h2>

          <input value={form.title} onChange={(e) => updateForm('title', e.target.value)} placeholder="Preview Title" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.client} onChange={(e) => updateForm('client', e.target.value)} placeholder="Client / Owner" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.category} onChange={(e) => updateForm('category', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Category</option>
            <option value="Website Preview">Website Preview</option>
            <option value="App Preview">App Preview</option>
            <option value="Vault Release Demo">Vault Release Demo</option>
            <option value="Before / After Example">Before / After Example</option>
            <option value="Product Launch Preview">Product Launch Preview</option>
            <option value="Helper Demo">Helper Demo</option>
            <option value="PCOA / Teaser Gate">PCOA / Teaser Gate</option>
          </select>

          <input value={form.previewLink} onChange={(e) => updateForm('previewLink', e.target.value)} placeholder="Preview Link / Demo URL" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Draft">Draft</option>
            <option value="Client Review">Client Review</option>
            <option value="Approved">Approved</option>
            <option value="Launch Ready">Launch Ready</option>
            <option value="Needs Update">Needs Update</option>
            <option value="Live Teaser">Live Teaser</option>
          </select>

          <textarea value={form.beforeNotes} onChange={(e) => updateForm('beforeNotes', e.target.value)} placeholder="Before notes: what existed before, what was rough, what needed fixing." rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <textarea value={form.afterNotes} onChange={(e) => updateForm('afterNotes', e.target.value)} placeholder="After notes: what changed, what got improved, what is stronger." rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <textarea value={form.offer} onChange={(e) => updateForm('offer', e.target.value)} placeholder="Offer / purpose / what this preview is meant to sell or prove." rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <textarea value={form.nextStep} onChange={(e) => updateForm('nextStep', e.target.value)} placeholder="Next step: launch, revise, send invoice, connect checkout, update copy, assign domain." rows="3" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Preview
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Saved Previews</h2>

          {previews.length === 0 && <p className="text-slate-500">No previews saved yet.</p>}

          {previews.map((preview) => (
            <div key={preview.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {preview.category} // {preview.status}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-2">
                {preview.title}
              </h2>

              <p className="text-slate-500 text-sm mb-2">
                Client / Owner: {preview.client}
              </p>

              <p className="text-slate-500 text-sm mb-4 break-all">
                Link: {preview.previewLink || 'No link added yet.'}
              </p>

              <p className="text-slate-400 text-sm mb-4">
                {preview.afterNotes}
              </p>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildPreviewCopy(preview), preview.title)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Preview
                </button>

                <button type="button" onClick={() => copyText(preview.previewLink || 'No preview link added yet.', 'preview link')} className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950">
                  Copy Link
                </button>

                <button type="button" onClick={() => deletePreview(preview.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
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

export default PreviewGallery;