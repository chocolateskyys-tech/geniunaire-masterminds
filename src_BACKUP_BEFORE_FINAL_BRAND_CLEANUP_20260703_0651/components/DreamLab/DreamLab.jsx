import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireDreamProfiles';

function DreamLab({ onReturn }) {
  const [alias, setAlias] = useState('');
  const [type, setType] = useState('');
  const [saved, setSaved] = useState(() => {
    const storedProfiles = localStorage.getItem(STORAGE_KEY);
    return storedProfiles ? JSON.parse(storedProfiles) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  function addProfile(event) {
    event.preventDefault();

    const profile = {
      id: Date.now(),
      alias: alias || 'Unnamed Creator',
      type: type || 'Starter Project',
    };

    setSaved([profile, ...saved]);
    setAlias('');
    setType('');
  }

  function deleteProfile(profileId) {
    setSaved(saved.filter((profile) => profile.id !== profileId));
  }

  function clearProfiles() {
  const confirmed = window.confirm(
    'Are you sure you want to clear all saved Aspire Lab profiles? This cannot be undone.'
  );

  if (confirmed) {
    setSaved([]);
  }
}

  return (
  <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
    <section className="max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          DREAM LAB
        </h1>

        <p className="text-slate-400 max-w-2xl">
          Save creator ideas, project profiles, and early-stage concepts before moving them into the Money Tracker.
        </p>
      </div>

      <form onSubmit={addProfile} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
        <h2 className="text-purple-300 mb-2">Creator Intake</h2>

        <p className="text-slate-500 text-sm mb-6">
          Capture the creator, project type, or idea lane before it becomes a tracked build.
        </p>

        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
          Creator Alias
        </label>
        <input
          value={alias}
          onChange={(event) => setAlias(event.target.value)}
          placeholder="Creator Alias"
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        />

        <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
          Project Type
        </label>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded"
        >
          <option value="">Project Type</option>
          <option value="Website">Website</option>
          <option value="Funnel">Funnel</option>
          <option value="Ebook">Ebook</option>
          <option value="App">App</option>
          <option value="Ecosystem">Ecosystem</option>
        </select>

        <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
          Save Profile
        </button>
      </form>

      <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
        <h2 className="text-purple-300 mb-2">Saved Profiles</h2>

        <p className="text-slate-500 text-sm mb-6">
          These profiles stay saved after refresh and can be used as your early Aspire Lab idea bank.
        </p>

        {saved.length === 0 && (
          <p className="text-slate-500">No saved profiles yet.</p>
        )}

        {saved.map((profile) => (
          <div key={profile.id} className="border border-slate-800 rounded-xl p-5 mb-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Creator Alias
            </p>
            <p className="text-slate-200 mb-4">{profile.alias}</p>

            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
              Project Type
            </p>
            <p className="text-purple-300 mb-4">{profile.type}</p>

            <button
              type="button"
              onClick={() => deleteProfile(profile.id)}
              className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950"
            >
              Delete Profile
            </button>
          </div>
        ))}

        {saved.length > 0 && (
          <button
            type="button"
            onClick={clearProfiles}
            className="mt-4 px-6 py-3 border border-red-900 text-red-300 rounded hover:bg-red-950"
          >
            Clear Saved Profiles
          </button>
        )}
      </div>

      <button
        onClick={onReturn}
        className="px-6 py-3 border border-slate-700 rounded hover:border-purple-500"
      >
        Return To Entry Gate
      </button>
    </section>
  </main>
);
}

export default DreamLab;