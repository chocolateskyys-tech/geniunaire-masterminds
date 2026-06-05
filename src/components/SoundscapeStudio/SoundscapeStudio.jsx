import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireSoundscapeStations';

const starterStations = [
  {
    id: 1,
    title: 'Neo Soul Creator Flow',
    vibe: 'Smooth / Creative / Grounded',
    use: 'Writing, designing, planning, and niche building.',
    genre: 'Neo Soul',
    link: '',
    status: 'Concept Station',
    prompt: 'Create a smooth neo soul instrumental with warm bass, soft keys, light drums, and confident creator-flow energy.',
  },
  {
    id: 2,
    title: 'Zodiac Inspired Energy',
    vibe: 'Mystical / Cosmic / Reflective',
    use: 'LifeScope-style planning, journaling, and reflection.',
    genre: 'Zodiac Inspired',
    link: '',
    status: 'Concept Station',
    prompt: 'Create a cosmic zodiac-inspired soundscape with dreamy pads, soft percussion, and mystical late-night energy.',
  },
  {
    id: 3,
    title: 'Money Mode',
    vibe: 'Focused / Boss / Strategic',
    use: 'Revenue tracking, pricing, offer planning, and launch math.',
    genre: 'Focus / Luxury',
    link: '',
    status: 'Concept Station',
    prompt: 'Create a confident money-mode instrumental with deep bass, clean drums, luxury synths, and focused boss energy.',
  },
  {
    id: 4,
    title: 'Dorm Prep Radio',
    vibe: 'Bright / Youthful / Motivating',
    use: 'DormMageddon, student move-in, and campus launch content.',
    genre: 'Campus Energy',
    link: '',
    status: 'Concept Station',
    prompt: 'Create an upbeat dorm prep radio vibe with bright melodies, fun percussion, and fresh college move-in energy.',
  },
  {
    id: 5,
    title: 'Night Owl Build Mode',
    vibe: 'Late Night / Determined / Atlanta',
    use: 'Late-night funnel building and quiet grind sessions.',
    genre: 'Night Work',
    link: '',
    status: 'Concept Station',
    prompt: 'Create a late-night build mode instrumental with moody keys, soft drums, ambient textures, and determined night owl energy.',
  },
];

function SoundscapeStudio({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [form, setForm] = useState({
    title: '',
    vibe: '',
    use: '',
    genre: '',
    link: '',
    status: '',
    prompt: '',
  });

  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterStations;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stations));
  }, [stations]);

  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

  function addStation(event) {
    event.preventDefault();

    const newStation = {
      id: Date.now(),
      title: form.title || 'Unnamed Station',
      vibe: form.vibe || 'Custom Vibe',
      use: form.use || 'Creator workflow.',
      genre: form.genre || 'Custom',
      link: form.link || '',
      status: form.status || 'Concept Station',
      prompt: form.prompt || 'Create a polished Admiration Funnel soundscape for this station.',
    };

    setStations([newStation, ...stations]);
    setForm({ title: '', vibe: '', use: '', genre: '', link: '', status: '', prompt: '' });
    setCopyStatus('Soundscape station saved.');
  }

  function updateStation(id, field, value) {
    setStations(
      stations.map((station) => {
        if (station.id === id) {
          return { ...station, [field]: value };
        }

        return station;
      })
    );
  }

  function deleteStation(id) {
    setStations(stations.filter((station) => station.id !== id));
  }

  function restoreStations() {
    setStations(starterStations);
    setCopyStatus('Starter soundscape stations restored.');
  }

  function buildStationCopy(station) {
    return [
      'ADMIRATION FUNNEL SOUNDSCAPE STATION',
      '',
      `Station: ${station.title}`,
      `Genre: ${station.genre}`,
      `Vibe: ${station.vibe}`,
      `Best Use: ${station.use}`,
      `Status: ${station.status}`,
      '',
      `Playlist Link: ${station.link || 'No link added yet.'}`,
      '',
      'Music Brief:',
      station.prompt || 'No music brief added.',
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
    'SOUNDSCAPE / RADIO RULES',
    '',
    'This beta room does not need to stream custom music yet.',
    'Each station can hold a playlist link, AI music brief, mood direction, genre, and use case.',
    'Use Pandora, Spotify, YouTube, Suno, Udio, or custom music links as placeholders until full music integration is ready.',
  ].join('\n');

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Radio Room
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          SOUNDSCAPE STUDIO
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Store radio stations, playlist links, AI music briefs, mood-based soundscapes, and future creator-flow music ideas.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Beta Radio Rule</h2>
          <p className="text-slate-500 text-sm mb-5">
            This room can use playlist links for now. Later it can become a custom music/radio feature with branded stations and AI music hosts.
          </p>

          <button
            type="button"
            onClick={() => copyText(rules, 'soundscape rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Soundscape Rules
          </button>
        </div>

        <form onSubmit={addStation} className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-5">Add Soundscape Station</h2>

          <input value={form.title} onChange={(e) => updateForm('title', e.target.value)} placeholder="Station Title" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.vibe} onChange={(e) => updateForm('vibe', e.target.value)} placeholder="Vibe / Mood" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.use} onChange={(e) => updateForm('use', e.target.value)} placeholder="Best Use" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.genre} onChange={(e) => updateForm('genre', e.target.value)} placeholder="Genre" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />
          <input value={form.link} onChange={(e) => updateForm('link', e.target.value)} placeholder="Playlist / Pandora / Spotify / YouTube Link" className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded" />

          <select value={form.status} onChange={(e) => updateForm('status', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded">
            <option value="">Status</option>
            <option value="Concept Station">Concept Station</option>
            <option value="Linked Playlist">Linked Playlist</option>
            <option value="Custom Music Needed">Custom Music Needed</option>
            <option value="Released">Released</option>
          </select>

          <textarea value={form.prompt} onChange={(e) => updateForm('prompt', e.target.value)} placeholder="AI music brief / station notes." rows="4" className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded" />

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Station
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-purple-300 mb-2">Saved Stations</h2>
              <p className="text-slate-500 text-sm">
                Add links, copy music briefs, and prepare future radio/music releases.
              </p>
            </div>

            <button type="button" onClick={restoreStations} className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950">
              Restore Starter Stations
            </button>
          </div>

          {stations.map((station) => (
            <div key={station.id} className="border border-slate-800 rounded-xl p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {station.genre} // {station.status}
              </p>

              <input value={station.title} onChange={(e) => updateStation(station.id, 'title', e.target.value)} className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded text-purple-300 text-xl font-bold" />
              <input value={station.vibe} onChange={(e) => updateStation(station.id, 'vibe', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
              <input value={station.use} onChange={(e) => updateStation(station.id, 'use', e.target.value)} className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
              <input value={station.link} onChange={(e) => updateStation(station.id, 'link', e.target.value)} placeholder="Playlist Link" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />
              <textarea value={station.prompt} onChange={(e) => updateStation(station.id, 'prompt', e.target.value)} rows="3" className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded" />

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => copyText(buildStationCopy(station), station.title)} className="px-4 py-2 bg-purple-900 border border-purple-500 rounded">
                  Copy Station
                </button>

                <button type="button" onClick={() => copyText(station.link || 'No playlist link added yet.', 'playlist link')} className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950">
                  Copy Link
                </button>

                <button type="button" onClick={() => deleteStation(station.id)} className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950">
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

export default SoundscapeStudio;