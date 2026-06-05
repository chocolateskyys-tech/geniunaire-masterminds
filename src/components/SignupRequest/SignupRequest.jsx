import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireSignupRequests';

function SignupRequest({ onReturn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [notes, setNotes] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  function addRequest(event) {
    event.preventDefault();

    const newRequest = {
      id: Date.now(),
      name: name || 'Unnamed Request',
      email: email || 'No email added',
      interest: interest || 'General Access',
      notes: notes || '',
    };

    setRequests([newRequest, ...requests]);

    setName('');
    setEmail('');
    setInterest('');
    setNotes('');
    setCopyStatus('Access request saved.');
  }

  function deleteRequest(id) {
    setRequests(requests.filter((request) => request.id !== id));
  }

  function clearRequests() {
    const confirmed = window.confirm(
      'Are you sure you want to clear all saved access requests? This cannot be undone.'
    );

    if (confirmed) {
      setRequests([]);
      setCopyStatus('');
    }
  }

  function buildRequestCopy(request) {
    return [
      'ADMIRATION FUNNEL ACCESS REQUEST',
      '',
      `Name: ${request.name}`,
      `Email: ${request.email}`,
      `Interest: ${request.interest}`,
      '',
      'Notes:',
      request.notes || 'No notes added.',
    ].join('\n');
  }

  async function copyRequest(request) {
    try {
      await navigator.clipboard.writeText(buildRequestCopy(request));
      setCopyStatus(`Copied request for ${request.name}.`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Access Portal
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          ENTER THE RIFT
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Submit interest for Admiration Funnel access, client niche builds, Vault releases, DormMageddon, or founder promo opportunities.
        </p>

        <form onSubmit={addRequest} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Access Request</h2>

          <p className="text-slate-500 text-sm mb-6">
            Save the request here first. Later, this can connect to email, Google Sheets, Stripe, or a real signup database.
          </p>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <select
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
          >
            <option value="">What are you interested in?</option>
            <option value="Client Niche Build">Client Niche Build</option>
            <option value="DormMageddon">DormMageddon</option>
            <option value="Founder Promo Program">Founder Promo Program</option>
            <option value="Vault Release Promotion">Vault Release Promotion</option>
            <option value="Creator Studio Access">Creator Studio Access</option>
            <option value="General Admiration Funnel Access">General Admiration Funnel Access</option>
          </select>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Tell us what you want to build, promote, or access."
            rows="4"
            className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded"
          />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Access Request
          </button>
        </form>

        {copyStatus && (
          <p className="mb-6 text-purple-300">
            {copyStatus}
          </p>
        )}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Saved Requests</h2>

          <p className="text-slate-500 text-sm mb-6">
            These requests stay saved after refresh and can be copied for follow-up.
          </p>

          {requests.length === 0 && (
            <p className="text-slate-500">No access requests yet.</p>
          )}

          {requests.map((request) => (
            <div key={request.id} className="border border-slate-800 rounded-xl p-5 mb-4">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {request.interest}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-2">
                {request.name}
              </h2>

              <p className="text-slate-500 text-sm mb-3">
                {request.email}
              </p>

              <p className="text-slate-400 text-sm mb-5">
                {request.notes || 'No notes added.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyRequest(request)}
                  className="px-4 py-2 bg-purple-900 border border-purple-500 rounded"
                >
                  Copy Request
                </button>

                <button
                  type="button"
                  onClick={() => deleteRequest(request.id)}
                  className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950"
                >
                  Delete Request
                </button>
              </div>
            </div>
          ))}

          {requests.length > 0 && (
            <button
              type="button"
              onClick={clearRequests}
              className="mt-4 px-6 py-3 border border-red-900 text-red-300 rounded hover:bg-red-950"
            >
              Clear Requests
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

export default SignupRequest;