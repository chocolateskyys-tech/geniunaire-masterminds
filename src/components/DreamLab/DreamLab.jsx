import { useState } from 'react';

function DreamLab({ onReturn }) {
  const [alias, setAlias] = useState('');
  const [projectType, setProjectType] = useState('');
  const [goal, setGoal] = useState('');
  const [support, setSupport] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-purple-400 tracking-[0.4em] uppercase mb-4">
            Geniunaire MasterMinds // Stage 2.5
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-purple-400 to-slate-300 mb-6">
            DREAM LAB
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            This is where imagination gets analyzed, matched, and prepared for deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="border border-purple-900 bg-black rounded-xl p-6"
          >
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-6">
              Creator Intake
            </h2>

            <input
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              placeholder="Name / Creator Alias"
              className="w-full mb-4 bg-black border border-slate-700 text-slate-200 px-4 py-3 rounded"
            />

            <select
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="w-full mb-4 bg-black border border-slate-700 text-slate-200 px-4 py-3 rounded"
            >
              <option value="">Select Project Type</option>
              <option value="Website">Website</option>
              <option value="Funnel">Funnel</option>
              <option value="Ebook / Nook Book">Ebook / Nook Book</option>
              <option value="Product Brand">Product Brand</option>
              <option value="App Idea">App Idea</option>
              <option value="Full Ecosystem">Full Ecosystem</option>
            </select>

            <textarea
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Biggest Goal"
              rows="4"
              className="w-full mb-4 bg-black border border-slate-700 text-slate-200 px-4 py-3 rounded"
            />

            <select
              value={support}
              onChange={(event) => setSupport(event.target.value)}
              className="w-full mb-6 bg-black border border-slate-700 text-slate-200 px-4 py-3 rounded"
            >
              <option value="">Select Support Level</option>
              <option value="Baby Steps">Baby Steps</option>
              <option value="Guided Build">Guided Build</option>
              <option value="Full Creation">Full Creation</option>
              <option value="Ecosystem Deployment">Ecosystem Deployment</option>
            </select>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-purple-900 border border-purple-500 text-white rounded uppercase tracking-widest text-sm font-bold"
            >
              Analyze Intake
            </button>
          </form>

          <div className="border border-purple-900 bg-black rounded-xl p-6">
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-6">
              Intake Preview
            </h2>

            {!submitted && (
              <p className="text-slate-500">
                Complete the intake form to preview the first Dream Lab profile.
              </p>
            )}

            {submitted && (
              <div className="space-y-4 text-sm">
                <p><span className="text-purple-300">Alias:</span> {alias || 'Not provided'}</p>
                <p><span className="text-purple-300">Project:</span> {projectType || 'Not selected'}</p>
                <p><span className="text-purple-300">Support:</span> {support || 'Not selected'}</p>
                <p><span className="text-purple-300">Goal:</span> {goal || 'Not provided'}</p>
              </div>
            )}

            <button
              type="button"
              onClick={onReturn}
              className="mt-8 px-6 py-3 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
            >
              Return To Entry Gate
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DreamLab;