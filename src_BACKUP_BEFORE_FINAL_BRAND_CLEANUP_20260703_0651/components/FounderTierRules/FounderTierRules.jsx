import { useState } from 'react';

const tiers = [
  ['Campus Founders', '10%', '$0.80/month', '$7.19/month before fees'],
  ['Class Founders', '15%', '$1.20/month', '$6.79/month before fees'],
  ['Family Founders', '25%', '$2.00/month', '$5.99/month before fees'],
];

const tools = [
  ['IONOS Website Builder', 'Build sites, landing pages, domains, and hosting.', 'https://www.ionos.com/'],
  ['Gumroad', 'Release ebooks, mini guides, and digital products.', 'https://gumroad.com/'],
  ['Stripe', 'Set up subscriptions, payments, and checkout links.', 'https://stripe.com/'],
  ['Canva', 'Create covers, promo graphics, and social posts.', 'https://www.canva.com/'],
  ['Amazon Associates', 'Create affiliate links for approved products.', 'https://affiliate-program.amazon.com/'],
];

function FounderTierRules({ onReturn }) {
  const [copyStatus, setCopyStatus] = useState('');

  const founderRules = [
    'DORMMAGEDDON FOUNDER REWARD STRUCTURE',
    '',
    'Monthly Plan: $7.99/month',
    '',
    'Campus Founders: 10% = about $0.80/month per active paid direct subscriber.',
    'Class Founders: 15% = about $1.20/month per active paid direct subscriber.',
    'Family Founders: 25% = about $2.00/month per active paid direct subscriber.',
    '',
    'Payout Rule:',
    'Founder rewards are paid only on active paid direct subscribers connected to the founder’s approved referral link or founder code.',
    '',
    'No payout on free users, trial-only users, failed payments, canceled accounts, refunded payments, or indirect referrals.',
    '',
    'Promo Rule:',
    'Promoters must use approved promotional materials from the Founder Promo Vault and include the required disclosure.',
    '',
    'Disclosure:',
    'Founder link — I may earn rewards if you join or purchase through my link.',
  ].join('\n');

  const hostingChecklist = [
    'ADMIRATION FUNNEL HOSTING / CREATOR TOOLKIT CHECKLIST',
    '',
    '1. Create the product or niche idea inside Creator Studio.',
    '2. Mark it Draft, Ready, or Released.',
    '3. Build the landing page or website in IONOS.',
    '4. Create product checkout or digital download in Gumroad or Stripe.',
    '5. Create cover graphics and promo images in Canva.',
    '6. Add approved promo copy to Founder Promo Vault.',
    '7. Add the release to Vault Release Library.',
    '8. Assign founder or affiliate links.',
    '9. Track revenue and project movement inside Money Tracker.',
    '10. Pay rewards only on active paid direct subscribers or valid paid sales.',
  ].join('\n');

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(`Copied ${label}.`);
    } catch (error) {
      setCopyStatus('Copy failed. Select and copy manually.');
    }
  }

  return (
    <main className="min-h-screen bg-black text-slate-300 px-6 py-10">
      <section className="max-w-6xl mx-auto">
        <p className="text-xs text-purple-400 tracking-[0.35em] uppercase mb-3">
          Geniunaire MasterMinds // Founder Structure
        </p>

        <h1 className="text-6xl font-bold text-purple-400 mb-4">
          FOUNDER TIER RULES
        </h1>

        <p className="text-slate-400 max-w-3xl mb-8">
          Official founder payout structure, active subscriber rules, disclosure language, and creator hosting toolkit.
        </p>

        {copyStatus && <p className="mb-6 text-purple-300">{copyStatus}</p>}

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Non-Negotiable Payout Rule</h2>
          <p className="text-slate-500 text-sm">
            Founder rewards are paid only on active paid direct subscribers connected to an approved founder link or founder code.
            No payout on free users, failed payments, canceled accounts, refunded payments, or indirect referrals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {tiers.map(([name, commission, payout, house]) => (
            <div key={name} className="border border-slate-800 rounded-xl p-5 bg-black/40">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                {commission} Commission
              </p>
              <h2 className="text-2xl text-purple-300 font-bold mb-3">{name}</h2>
              <p className="text-slate-400 text-sm mb-2">
                Founder earns: <span className="text-purple-300">{payout}</span>
              </p>
              <p className="text-slate-400 text-sm">
                House keeps: <span className="text-purple-300">{house}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Copy Founder Rules</h2>
          <p className="text-slate-500 text-sm mb-5">
            Copy the official payout and promo rules for founder pages, onboarding, or internal planning.
          </p>
          <button
            type="button"
            onClick={() => copyText(founderRules, 'founder rules')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Founder Rules
          </button>
        </div>

        <div className="border border-purple-900 rounded-xl p-6 mb-8 bg-black/40">
          <h2 className="text-purple-300 mb-2">Hosting / Creator Toolkit</h2>
          <p className="text-slate-500 text-sm mb-6">
            Use these tools to build, host, sell, design, and release products from the Vault.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {tools.map(([name, purpose, link]) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="border border-slate-800 rounded-xl p-5 bg-black hover:border-purple-500 block"
              >
                <h3 className="text-purple-300 font-bold mb-2">{name}</h3>
                <p className="text-slate-500 text-sm">{purpose}</p>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => copyText(hostingChecklist, 'hosting checklist')}
            className="px-6 py-3 bg-purple-900 border border-purple-500 rounded"
          >
            Copy Hosting Checklist
          </button>
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

export default FounderTierRules;