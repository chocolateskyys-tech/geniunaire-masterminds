import { useState } from 'react';

const promoMaterials = [
  {
    id: 1,
    title: 'DormMageddon Instagram Caption',
    platform: 'Instagram',
    tone: 'Student / Move-In Prep',
    copy:
      'College move-in is coming fast. DormMageddon helps students get organized with dorm setup ideas, campus survival tools, and student-ready resources before the chaos hits.\n\nFounder link — I may earn rewards if you join or purchase through my link.',
  },
  {
    id: 2,
    title: 'DormMageddon TikTok Caption',
    platform: 'TikTok',
    tone: 'Quick / Viral',
    copy:
      'POV: You’re going to college and refuse to let dorm life catch you slipping. DormMageddon is for move-in prep, dorm survival, campus tools, and student deals.\n\nFounder link — I may earn rewards if you join or purchase through my link.',
  },
  {
    id: 3,
    title: 'Group Chat Message',
    platform: 'Text / Group Chat',
    tone: 'Friendly / Direct',
    copy:
      'Y’all, I found something for students getting ready for college. DormMageddon is built around dorm setup, campus survival, and student resources. I’m sharing my founder link if anybody wants to check it out.\n\nFounder link — I may earn rewards if you join or purchase through my link.',
  },
  {
    id: 4,
    title: 'Parent-Friendly Message',
    platform: 'Parents / Family',
    tone: 'Helpful / Safe',
    copy:
      'DormMageddon is a student-focused resource built to help with dorm setup, campus preparation, and move-in planning. It is designed to help students feel more organized before school starts.\n\nFounder link — I may earn rewards if you join or purchase through my link.',
  },
  {
    id: 5,
    title: 'Founder Rewards Explanation',
    platform: 'Any Platform',
    tone: 'Clear / Compliant',
    copy:
      'DormMageddon founder rewards are paid only on active paid direct subscribers connected to an approved founder link or code. No rewards are paid on free users, failed payments, canceled accounts, refunded payments, or indirect referrals.',
  },
];

function FounderPromoVault({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyPromo(material) {
    try {
      await navigator.clipboard.writeText(material.copy);
      setCopyStatus(`Copied: ${material.title}`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Approved Promotion Room
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          FOUNDER PROMO VAULT
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Approved copy/paste promo materials for founders, student spreaders, campus promoters, and affiliate-style release partners.
        </p>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Promo Rule</h2>
          <p className="text-slate-500 text-sm">
            Promoters must use approved promotional material from this Vault and include the required reward disclosure when sharing founder links.
          </p>
        </div>

        {copyStatus && (
          <p className="mb-6 text-purple-300">
            {copyStatus}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {promoMaterials.map((material) => (
            <div key={material.id} className="border border-slate-800 rounded-xl p-5 bg-black/40">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {material.platform} // {material.tone}
              </p>

              <h2 className="text-2xl text-purple-300 font-bold mb-4">
                {material.title}
              </h2>

              <div className="border border-purple-900/50 rounded p-4 mb-5 whitespace-pre-line">
                <p className="text-slate-400 text-sm">
                  {material.copy}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copyPromo(material)}
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

export default FounderPromoVault;