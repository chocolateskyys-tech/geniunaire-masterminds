import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'geniunaireRobotStorefront';

const starterWorkers = [
  ['Dream Funnel Host', 'Welcome visitors, explain rules, and guide new users.', 'Entry Gate', 'Internal + Rentable'],
  ['Vault Keeper', 'Explain Vault releases, promo rules, and approved materials.', 'Vault Releases', 'Internal + Rentable'],
  ['HR / Payroll Bot', 'Explain founder tiers, payout rules, and active subscriber requirements.', 'Founder Rules', 'Internal'],
  ['Promo Releaser Bot', 'Create approved promo captions, launch notes, and campaign drops.', 'Promo Vault', 'Rentable'],
  ['Soundscape Curator', 'Create music briefs, playlist moods, and soundscape concepts.', 'Soundscape Studio', 'Rentable'],
  ['Proofreader Bot', 'Review copy, product descriptions, disclaimers, and website text.', 'Creator Studio', 'Rentable'],
  ['Domain Broker Bot', 'Help track domain cost, rental pricing, and renewal notes.', 'Domain Vault', 'Internal + Rentable'],
  ['Client Intake Bot', 'Collect client project needs, budgets, links, and access requests.', 'Request Clearance', 'Rentable'],
].map(([name, job, room, status], index) => ({
  id: index + 1,
  name,
  job,
  room,
  status,
  setupFee: '$49 - $199',
  monthlyFee: '$19.99 - $99.99/month',
  client: 'Unassigned',
  link: '',
  notes: 'Program this worker for a specific niche, room, client, or campaign.',
}));

function RobotStorefront({ onReturn }) {
  const [form, setForm] = useState({
    name: '',
    job: '',
    room: '',
    status: '',
    setupFee: '',
    monthlyFee: '',
    client: '',
    link: '',
    notes: '',
  });

  const [copyStatus, setCopyStatus] = useState('');

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterWorkers;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workers));
  }, [workers]);

  const totals = useMemo(() => {
    return {
      total: workers.length,
      rentable: workers.filter((worker) => worker.status.includes('Rentable')).length,
      internal: workers.filter((worker) => worker.status.includes('Internal')).length,
      active: workers.filter((worker) => worker.client !== 'Unassigned').length,
    };
  }, [workers]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addWorker(event) {
    event.preventDefault();

    const newWorker = {
      id: Date.now(),
      name: form.name || 'Unnamed Worker',
      job: form.job || 'No job assigned yet.',
      room: form.room || 'Unassigned Room',
      status: form.status || 'Rentable',
      setupFee: form.setupFee || '$49 - $199',
      monthlyFee: form.monthlyFee || '$19.99 - $99.99/month',
      client: form.client || 'Unassigned',
      link: form.link || '',
      notes: form.notes || '',
    };

    setWorkers([newWorker, ...workers]);
    setForm({
      name: '',
      job: '',
      room: '',
      status: '',
      setupFee: '',
      monthlyFee: '',
      client: '',
      link: '',
      notes: '',
    });
    setCopyStatus('Geniunaire Worker saved.');
  }

  function updateWorker(id, field, value) {
    setWorkers(
      workers.map((worker) => {
        if (worker.id === id) {
          return { ...worker, [field]: value };
        }

        return worker;
      })
    );
  }

  function deleteWorker(id) {
    setWorkers(workers.filter((worker) => worker.id !== id));
  }

  function restoreWorkers() {
    setWorkers(starterWorkers);
    setCopyStatus('Starter workers restored.');
  }

  function buildWorkerCopy(worker) {
    return [
      'GENIUNAIRE WORKER RECORD',
      '',
      `Worker: ${worker.name}`,
      `Room Assigned: ${worker.room}`,
      `Status: ${worker.status}`,
      `Setup Fee: ${worker.setupFee}`,
      `Monthly Fee: ${worker.monthlyFee}`,
      `Client Assigned: ${worker.client}`,
      '',
      'Job:',
      worker.job,
      '',
      `Bot Link: ${worker.link || 'No bot link added yet.'}`,
      '',
      'Notes:',
      worker.notes || 'No notes added.',
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

  const workerRules = [
    'GENIUNAIRE WORKER RULES',
    '',
    'Geniunaire Workers are AI-powered room guides, support assistants, promo helpers, and rentable niche workers.',
    '',
    'They should be presented as AI workers, digital assistants, virtual hosts, or programmed bots — not as real human employees.',
    '',
    'Workers can be used internally inside Dream Funnel or rented/programmed for client websites, projects, campaigns, and support flows.',
    '',
    'Rental pricing may include setup/programming fees, monthly usage fees, script updates, niche customization, and support limits.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // AI Worker Inventory
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          ROBOT STOREFRONT
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Track Geniunaire Workers, room guides, rentable bots, setup fees, monthly rental fees, client assignments, and bot links.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Workers</p>
            <h2 className="text-2xl text-purple-300 font-bold">{totals.total}</h2>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Rentable</p>
            <h2 className="text-2xl text-purple-300 font-bold">{totals.rentable}</h2>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Internal</p>
            <h2 className="text-2xl text-purple-300 font-bold">{totals.internal}</h2>
          </div>

          <div className="border border-purple-900 rounded-xl p-5 bg-black/40">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Assigned</p>
            <h2 className="text-2xl text-purple-300 font-bold">{totals.active}</h2>
          </div>
        </div>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Worker Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            These are AI-powered Geniunaire Workers: room guides, promo assistants, support helpers, and rentable bot personalities.
          </p>

          <button
            type="button"
            onClick={() => copyText(workerRules, 'worker rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Worker Rules
          </button>
        </div>

        <form onSubmit={addWorker} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Worker / Bot</h2>

          <input value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="Worker / Bot Name" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <textarea value={form.job} onChange={(e) => updateForm('job', e.target.value)} placeholder="What does this worker do?" rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <input value={form.room} onChange={(e) => updateForm('room', e.target.value)} placeholder="Room Assigned / Best Use" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Internal">Internal</option>
            <option value="Rentable">Rentable</option>
            <option value="Internal + Rentable">Internal + Rentable</option>
            <option value="Client Assigned">Client Assigned</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.setupFee} onChange={(e) => updateForm('setupFee', e.target.value)} placeholder="Setup / Programming Fee" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
            <input value={form.monthlyFee} onChange={(e) => updateForm('monthlyFee', e.target.value)} placeholder="Monthly Rental Fee" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          </div>

          <input value={form.client} onChange={(e) => updateForm('client', e.target.value)} placeholder="Client Assigned" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.link} onChange={(e) => updateForm('link', e.target.value)} placeholder="Bot Link / Embed Link / Platform Link" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <textarea value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} placeholder="Script notes, personality notes, niche setup, update notes." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Worker
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-purple-300 mb-2">Geniunaire Worker Roster</h2>
              <p className="text-slate-500 text-sm">
                Edit workers, assign rooms, add bot links, copy descriptions, and track rentable AI assistants.
              </p>
            </div>

            <button
              type="button"
              onClick={restoreWorkers}
              className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950"
            >
              Restore Starter Workers
            </button>
          </div>

          {workers.length === 0 && <p className="text-slate-500">No workers saved yet.</p>}

          {workers.map((worker) => (
            <div key={worker.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {worker.status} // {worker.room}
              </p>

              <input value={worker.name} onChange={(e) => updateWorker(worker.id, 'name', e.target.value)} className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded text-purple-300 text-xl font-bold" />

              <textarea value={worker.job} onChange={(e) => updateWorker(worker.id, 'job', e.target.value)} rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={worker.room} onChange={(e) => updateWorker(worker.id, 'room', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
                <input value={worker.status} onChange={(e) => updateWorker(worker.id, 'status', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
                <input value={worker.setupFee} onChange={(e) => updateWorker(worker.id, 'setupFee', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
                <input value={worker.monthlyFee} onChange={(e) => updateWorker(worker.id, 'monthlyFee', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
              </div>

              <input value={worker.client} onChange={(e) => updateWorker(worker.id, 'client', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
              <input value={worker.link} onChange={(e) => updateWorker(worker.id, 'link', e.target.value)} placeholder="Bot Link" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />

              <textarea value={worker.notes || ''} onChange={(e) => updateWorker(worker.id, 'notes', e.target.value)} rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildWorkerCopy(worker), worker.name)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Worker
                </button>

                <button type="button" onClick={() => copyText(worker.link || 'No bot link added yet.', 'bot link')} className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950">
                  Copy Link
                </button>

                <button type="button" onClick={() => deleteWorker(worker.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
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

export default RobotStorefront;