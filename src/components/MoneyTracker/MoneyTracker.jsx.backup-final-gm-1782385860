import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireMoneyProjects';

function MoneyTracker({ onReturn }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [projected, setProjected] = useState('');
  const [actual, setActual] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const totalProjected = projects.reduce((sum, project) => {
    return sum + Number(project.projected || 0);
  }, 0);

  const totalActual = projects.reduce((sum, project) => {
    return sum + Number(project.actual || 0);
  }, 0);

  const planning = projects.filter((project) => project.status === 'Planning').length;
  const building = projects.filter((project) => project.status === 'Building').length;
  const live = projects.filter((project) => project.status === 'Live').length;

  function addProject(event) {
    event.preventDefault();

    const newProject = {
      id: Date.now(),
      name: name || 'Unnamed Project',
      type: type || 'Not selected',
      projected: projected || '0',
      actual: actual || '0',
      status: status || 'Planning',
      notes: notes || '',
      priority: priority || 'Medium',
    };

    setProjects([newProject, ...projects]);

    setName('');
    setType('');
    setProjected('');
    setActual('');
    setStatus('');
    setNotes('');
    setPriority('');
  }

  function updateProject(id, field, value) {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return { ...project, [field]: value };
        }

        return project;
      })
    );
  }

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  function clearProjects() {
  const confirmed = window.confirm(
    'Are you sure you want to clear all saved Money Tracker projects? This cannot be undone.'
  );

  if (confirmed) {
    setProjects([]);
  }
}

  function buildSummary() {
    const projectLines = projects.map((project, index) => {
      return [
        `Project ${index + 1}: ${project.name}`,
        `Type: ${project.type}`,
        `Priority: ${project.priority || 'Medium'}`,
        `Status: ${project.status}`,
        `Projected Revenue: $${project.projected || '0'}`,
        `Actual Revenue: $${project.actual || '0'}`,
        `Notes: ${project.notes || 'No notes added'}`,
      ].join('\n');
    });

    return [
      'GENIUNAIRE MASTERMINDS — MONEY TRACKER SUMMARY',
      '',
      `Total Projects: ${projects.length}`,
      `Total Projected Revenue: $${totalProjected}`,
      `Total Actual Revenue: $${totalActual}`,
      `Revenue Gap: $${totalProjected - totalActual}`,
      '',
      `Planning: ${planning}`,
      `Building: ${building}`,
      `Live: ${live}`,
      '',
      'PROJECT DETAILS',
      '',
      projectLines.length > 0 ? projectLines.join('\n\n') : 'No tracked projects yet.',
    ].join('\n');
  }

  async function copySummary() {
    const summary = buildSummary();

    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus('Summary copied to clipboard.');
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

return (
  <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
    <section className="max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-purple-400 mb-4">
        MONEY TRACKER
      </h1>

      <p className="text-slate-400 mb-8">
        Track project money, status, priority, revenue movement, and notes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-purple-900 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Projects</p>
          <p className="text-2xl text-purple-300 font-bold">{projects.length}</p>
        </div>

        <div className="border border-purple-900 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Projected</p>
          <p className="text-2xl text-purple-300 font-bold">${totalProjected}</p>
        </div>

        <div className="border border-purple-900 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Actual</p>
          <p className="text-2xl text-purple-300 font-bold">${totalActual}</p>
        </div>

        <div className="border border-purple-900 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Revenue Gap</p>
          <p className="text-2xl text-purple-300 font-bold">
            ${totalProjected - totalActual}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Planning</p>
          <p className="text-xl text-purple-300 font-bold">{planning}</p>
        </div>

        <div className="border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Building</p>
          <p className="text-xl text-purple-300 font-bold">{building}</p>
        </div>

        <div className="border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-sm">Live</p>
          <p className="text-xl text-purple-300 font-bold">{live}</p>
        </div>
      </div>

      <div className="border border-purple-900 rounded-xl p-6 mb-8">
        <h2 className="text-purple-300 mb-4">Export Summary</h2>

        <p className="text-slate-500 mb-4">
          Copy a clean project summary for ChatGPT, email, notes, planning, or investor prep.
        </p>

        <button
          type="button"
          onClick={copySummary}
          className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
        >
          Copy Project Summary
        </button>

        {copyStatus && (
          <p className="mt-4 text-purple-300">
            {copyStatus}
          </p>
        )}
      </div>

      <form onSubmit={addProject} className="border border-purple-900 rounded-xl p-6 mb-8">
        <h2 className="text-purple-300 mb-4">Add New Project</h2>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Project / Client Name"
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        />

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        >
          <option value="">Project Type</option>
          <option value="Website">Website</option>
          <option value="Funnel">Funnel</option>
          <option value="Ebook">Ebook</option>
          <option value="App">App</option>
          <option value="Full Ecosystem">Full Ecosystem</option>
        </select>

        <input
          value={projected}
          onChange={(event) => setProjected(event.target.value)}
          placeholder="Projected Revenue"
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        />

        <input
          value={actual}
          onChange={(event) => setActual(event.target.value)}
          placeholder="Actual Revenue"
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        >
          <option value="">Status</option>
          <option value="Planning">Planning</option>
          <option value="Building">Building</option>
          <option value="Live">Live</option>
        </select>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Project notes / next steps / domain / payment / support notes"
          rows="4"
          className="w-full mb-4 bg-black border border-slate-700 px-4 py-3 rounded"
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded"
        >
          <option value="">Priority Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>

        <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
          Save Project
        </button>
      </form>

      <div className="border border-purple-900 rounded-xl p-6 mb-8">
        <h2 className="text-purple-300 mb-2">Tracked Projects</h2>

        <p className="text-slate-500 text-sm mb-6">
          Edit project details directly inside each card. Changes save automatically.
        </p>

        {projects.length === 0 && (
          <p className="text-slate-500">No tracked projects yet.</p>
        )}

        {projects.map((project) => (
          <div key={project.id} className="border border-slate-800 rounded-xl p-5 mb-5 bg-black/40">
            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
              Project / Client Name
            </label>
            <input
              value={project.name}
              onChange={(event) => updateProject(project.id, 'name', event.target.value)}
              className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
            />

            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
              Project Type
            </label>
            <select
              value={project.type}
              onChange={(event) => updateProject(project.id, 'type', event.target.value)}
              className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
            >
              <option value="Not selected">Not selected</option>
              <option value="Website">Website</option>
              <option value="Funnel">Funnel</option>
              <option value="Ebook">Ebook</option>
              <option value="App">App</option>
              <option value="Full Ecosystem">Full Ecosystem</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Projected Revenue
                </label>
                <input
                  value={project.projected}
                  onChange={(event) => updateProject(project.id, 'projected', event.target.value)}
                  className="w-full bg-black border border-slate-700 px-4 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Actual Revenue
                </label>
                <input
                  value={project.actual}
                  onChange={(event) => updateProject(project.id, 'actual', event.target.value)}
                  className="w-full bg-black border border-slate-700 px-4 py-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Project Status
                </label>
                <select
                  value={project.status}
                  onChange={(event) => updateProject(project.id, 'status', event.target.value)}
                  className="w-full bg-black border border-slate-700 px-4 py-2 rounded"
                >
                  <option value="Planning">Planning</option>
                  <option value="Building">Building</option>
                  <option value="Live">Live</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Priority Level
                </label>
                <select
                  value={project.priority || 'Medium'}
                  onChange={(event) => updateProject(project.id, 'priority', event.target.value)}
                  className="w-full bg-black border border-slate-700 px-4 py-2 rounded"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Priority</option>
                </select>
              </div>
            </div>

            <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">
              Project Notes
            </label>
            <textarea
              value={project.notes || ''}
              onChange={(event) => updateProject(project.id, 'notes', event.target.value)}
              rows="3"
              placeholder="Project notes"
              className="w-full mb-4 bg-black border border-slate-700 px-4 py-2 rounded"
            />

            <button
              type="button"
              onClick={() => deleteProject(project.id)}
              className="px-4 py-2 border border-red-900 text-red-300 rounded hover:bg-red-950"
            >
              Delete Project
            </button>
          </div>
        ))}

        {projects.length > 0 && (
          <button
            type="button"
            onClick={clearProjects}
            className="mt-4 px-6 py-3 border border-red-900 text-red-300 rounded hover:bg-red-950"
          >
            Clear Saved Projects
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

export default MoneyTracker;