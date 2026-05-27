import { useState } from 'react';

function DreamLab({ onReturn }) {
  const [alias, setAlias] = useState('');
  const [projectType, setProjectType] = useState('');
  const [goal, setGoal] = useState('');
  const [support, setSupport] = useState('');
  const [profile, setProfile] = useState(null);

  function buildProfile() {
    let creatorType = 'Emerging Builder';
    let recommendedLane = 'Starter Brand Lane';
    let nextStep = 'Clarify the offer, audience, and first simple launch path.';
    let revenuePath = 'Start with one paid offer, then expand into recurring support.';

    if (projectType === 'Full Ecosystem') {
      creatorType = 'Ecosystem Architect';
      recommendedLane = 'Creator Operating System Lane';
      nextStep = 'Map the core rooms, client journey, and phased deployment structure.';
      revenuePath = 'Recurring memberships, managed services, licensing, and premium builds.';
    }

    if (projectType === 'App Idea') {
      creatorType = 'System Visionary';
      recommendedLane = 'Prototype + Validation Lane';
      nextStep = 'Build a clickable prototype and define the first user problem clearly.';
      revenuePath = 'Beta access, subscriptions, setup fees, and future upgrades.';
    }

    if (projectType === 'Ebook / Nook Book') {
      creatorType = 'Knowledge Product Creator';
      recommendedLane = 'Digital Product Lane';
      nextStep = 'Package the idea into a clear title, promise, outline, and sales page.';
      revenuePath = 'Ebook sales, bundles, mini-courses, and affiliate add-ons.';
    }

    if (projectType === 'Website' || projectType === 'Funnel') {
      creatorType = 'Launch Builder';
      recommendedLane = 'Fast Launch Lane';
      nextStep = 'Create the front door, offer message, lead capture, and first conversion path.';
      revenuePath = 'Service sales, consultations, affiliate links, and upgrade packages.';
    }

    if (projectType === 'Product Brand') {
      creatorType = 'Brand Builder';
      recommendedLane = 'Commerce + Identity Lane';
      nextStep = 'Define the product promise, visual identity, buyer type, and first sales page.';
      revenuePath = 'Product sales, bundles, upsells, subscriptions, and brand collaborations.';
    }

    return {
      alias: alias || 'Unnamed Creator',
      creatorType,
      recommendedLane,
      supportLevel: support || 'Not selected',
      nextStep,
      revenuePath,
      goal: goal || 'No goal entered yet.',
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    setProfile(buildProfile());
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-purple-400 tracking-[0.4em] uppercase mb-4">
            Geniunaire MasterMinds // Stage 3
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
              Generate Deployment Profile
            </button>
          </form>

          <div className="border border-purple-900 bg-black rounded-xl p-6">
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-6">
              Deployment Profile
            </h2>

            {!profile && (
              <p className="text-slate-500">
                Complete the intake form to generate the first Dream Lab deployment profile.
              </p>
            )}

            {profile && (
              <div className="space-y-4 text-sm">
                <p><span className="text-purple-300">Creator:</span> {profile.alias}</p>
                <p><span className="text-purple-300">Creator Type:</span> {profile.creatorType}</p>
                <p><span className="text-purple-300">Recommended Lane:</span> {profile.recommendedLane}</p>
                <p><span className="text-purple-300">Support Level:</span> {profile.supportLevel}</p>
                <p><span className="text-purple-300">Next Best Step:</span> {profile.nextStep}</p>
                <p><span className="text-purple-300">Revenue Path:</span> {profile.revenuePath}</p>
                <p><span className="text-purple-300">Goal:</span> {profile.goal}</p>
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