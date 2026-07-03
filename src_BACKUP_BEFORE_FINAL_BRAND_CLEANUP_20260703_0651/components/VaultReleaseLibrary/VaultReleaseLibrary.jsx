import { useState } from 'react';

const releases = [
  {
    id: 1,
    title: 'DormMageddon',
    niche: 'Student Life / Dorm Setup',
    status: 'Released',
    price: '$7.99/month',
    commission: '10% - 25%',
    audience: 'College students, freshmen, campus spreaders, parents',
    description:
      'A student-powered campus survival and dorm setup lane with referral rewards and approved promo materials.',
    promo:
      'Going to college? Don’t let dorm life catch you slipping. DormMageddon helps students prep, organize, and find campus-ready tools before move-in chaos hits.',
  },
  {
    id: 2,
    title: 'Nookbook',
    niche: 'Digital Guides / Creator Materials',
    status: 'Draft',
    price: 'TBD',
    commission: 'Coming Soon',
    audience: 'Students, creators, niche promoters, digital product beginners',
    description:
      'A pre-made digital material release that can be packaged, promoted, and sold from the Vault.',
    promo:
      'Browse the Vault for ready-made digital releases you can promote without building your own website first.',
  },
  {
    id: 3,
    title: 'WAH Scam Prevention Playbook',
    niche: 'Work From Home / Fraud Prevention',
    status: 'Released',
    price: '$9.99',
    commission: 'Affiliate Eligible',
    audience: 'Freelancers, remote workers, work-from-home beginners',
    description:
      'A practical digital guide helping people recognize work-from-home scams and protect themselves before getting trapped.',
    promo:
      'Working from home? Learn how to spot red flags, protect your money trail, and avoid getting caught in fake job scams.',
  },
  {
    id: 4,
    title: 'CrashPad Starter Guide',
    niche: 'Airbnb / Rental Setup',
    status: 'Coming Soon',
    price: 'TBD',
    commission: 'Coming Soon',
    audience: 'Airbnb owners, rental hosts, setup clients, property helpers',
    description:
      'A future release for rental setup, furnishing, maintenance planning, and low-stress hosting support.',
    promo:
      'Turn rental setup chaos into a clean, guided plan with CrashPad starter tools and setup support.',
  },
];

function VaultReleaseLibrary({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');

  function buildPromoCopy(release) {
    return [
      `${release.title}`,
      '',
      release.promo,
      '',
      `Niche: ${release.niche}`,
      `Price: ${release.price}`,
      `Status: ${release.status}`,
      '',
      'Disclosure:',
      'Founder link — I may earn rewards if you join or purchase through my link.',
    ].join('\n');
  }

  async function copyPromo(release) {
    try {
      await navigator.clipboard.writeText(buildPromoCopy(release));
      setCopyStatus(`Copied approved promo for ${release.title}.`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Vault Marketplace
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          VAULT RELEASE LIBRARY
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Browse approved Vault releases, niche products, ebooks, student offers, and pre-made materials available for promotion.
        </p>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Promoter Rule</h2>
          <p className="text-slate-500 text-sm">
            Promoters may only share approved Vault releases using approved copy and required disclosure language.
            Rewards are earned only on valid paid sales or active paid direct subscribers.
          </p>
        </div>

        {copyStatus && (
          <p className="mb-6 text-purple-300">
            {copyStatus}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {releases.map((release) => (
            <div key={release.id} className="border border-slate-800 rounded-xl p-5 bg-black/40">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {release.status}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-3">
                {release.title}
              </h2>

              <p className="text-slate-500 text-sm mb-4">
                {release.description}
              </p>

              <div className="grid grid-cols-1 gap-2 text-sm mb-5">
                <p>
                  <span className="text-slate-500">Niche:</span> {release.niche}
                </p>
                <p>
                  <span className="text-slate-500">Audience:</span> {release.audience}
                </p>
                <p>
                  <span className="text-slate-500">Price:</span> {release.price}
                </p>
                <p>
                  <span className="text-slate-500">Commission:</span> {release.commission}
                </p>
              </div>

              <div className="border border-purple-900/50 rounded p-4 mb-5">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                  Approved Promo Angle
                </p>
                <p className="text-slate-400 text-sm">
                  {release.promo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copyPromo(release)}
                className="px-4 py-2 bg-purple-900 border border-purple-500 rounded"
              >
                Copy Approved Promo
              </button>
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

export default VaultReleaseLibrary;