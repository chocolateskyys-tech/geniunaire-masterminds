import { useEffect, useState } from 'react';

const STORAGE_KEY = 'geniunaireMoneyProjects';

function MoneyTracker({ onReturn }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [projected, setProjected] = useState('');
  const [actual, setActual] = useState('');
  const [status, setStatus] = useState('');
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const totalProjected = projects.reduce((sum, p) => {
    return sum + Number(p.projected || 0);
  }, 0);

  const totalActual = projects.reduce((sum, p) => {
    return sum + Number(p.actual || 0);
  }, 0);

  const planning = projects.filter((p) => p.status === 'Planning').length;
  const building = projects.filter((p) => p.status === 'Building').length;
  const live = projects.filter((p) => p.status === 'Live').length;

  function addProject(event) {
    event.preventDefault();

    const newProject = {
      id: Date.now(),
      name: name || 'Unnamed Project',
      type: type || 'Not selected',
      projected: projected || '0',
      actual: actual || '0',
      status: status || 'Planning',
    };

    setProjects([newProject, ...projects]);
    setName('');
    setType('');
    setProjected('');
    setActual('');
    setStatus('');
  }

  function updateProject(id, field, value) {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            [field]: value,
          };
        }

        return project;
      })
    );
  }

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  function clearProjects() {
    setProjects([]);
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-purple-400 mb-4">
          MONEY TRACKER
        </h1>

        <p className="text-slate-400 mb-8">
          Track project money, status, and revenue movement.
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

        <form onSubmit={addProject} className="border border-purple-900 rounded-xl p-6 mb-8">
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
            className="w-full mb-5 bg-black border border-slate-700 px-4 py-3 rounded"
          >
            <option value="">Status</option>
            <option value="Planning">Planning</option>
            <option value="Building">Building</option>
            <option value="Live">Live</option>
          </select>

          <button className="px-6 py-3 bg-purple-900 border border-purple-500 rounded">
            Save Project
          </button>
        </form>

        <div className="border border-purple-900 rounded-xl p-6 mb-8">
          <h2 className="text-purple-300 mb-4">Tracked Projects</h2>

          {projects.length === 0 && (
            <p className="text-slate-500">No tracked projects yet.</p>
          )}

          {projects.map((project) => (
            <div key={project.id} className="border border-slate-800 rounded p-4 mb-4">
              <input
                value={project.name}
                onChange={(event) => updateProject(project.id, 'name', event.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <select
                value={project.type}
                onChange={(event) => updateProject(project.id, 'type', event.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded"
              >
                <option value="Not selected">Not selected</option>
                <option value="Website">Website</option>
                <option value="Funnel">Funnel</option>
                <option value="Ebook">Ebook</option>
                <option value="App">App</option>
                <option value="Full Ecosystem">Full Ecosystem</option>
              </select>

              <input
                value={project.projected}
                onChange={(event) => updateProject(project.id, 'projected', event.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <input
                value={project.actual}
                onChange={(event) => updateProject(project.id, 'actual', event.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded"
              />

              <select
                value={project.status}
                onChange={(event) => updateProject(project.id, 'status', event.target.value)}
                className="w-full mb-3 bg-black border border-slate-700 px-4 py-2 rounded"
              >
                <option value="Planning">Planning</option>
                <option value="Building">Building</option>
                <option value="Live">Live</option>
              </select>

              <button
                type="button"
                onClick={() => deleteProject(project.id)}
                className="px-4 py-2 border border-red-900 text-red-300 rounded"
              >
                Delete Project
              </button>
            </div>
          ))}

          {projects.length > 0 && (
            <button
              type="button"
              onClick={clearProjects}
              className="mt-4 px-6 py-3 border border-red-900 text-red-300 rounded"
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