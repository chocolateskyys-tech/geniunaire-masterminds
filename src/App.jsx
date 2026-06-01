import { useState } from 'react';
import EntryGate from './components/EntryGate/EntryGate';
import DreamLab from './components/DreamLab/DreamLab';
import MoneyTracker from './components/MoneyTracker/MoneyTracker';
import DormMageddon from './components/DormMageddon/DormMageddon';
import CreatorStudio from './components/CreatorStudio/CreatorStudio';
import VaultReleaseLibrary from './components/VaultReleaseLibrary/VaultReleaseLibrary';
import FounderPromoVault from './components/FounderPromoVault/FounderPromoVault';
import FounderTierRules from './components/FounderTierRules/FounderTierRules';
import SignupRequest from './components/SignupRequest/SignupRequest';
import AssetVault from './components/AssetVault/AssetVault';
import CheckoutRoom from './components/CheckoutRoom/CheckoutRoom';
import DomainVault from './components/DomainVault/DomainVault';

function App() {
  const [currentView, setCurrentView] = useState('entryGate');

  function renderCurrentView() {
    if (currentView === 'dreamLab') {
      return <DreamLab onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'moneyTracker') {
      return <MoneyTracker onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'dormMageddon') {
      return <DormMageddon onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'creatorStudio') {
      return <CreatorStudio onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'vaultReleaseLibrary') {
      return <VaultReleaseLibrary onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'founderPromoVault') {
      return <FounderPromoVault onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'founderTierRules') {
      return <FounderTierRules onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'signupRequest') {
      return <SignupRequest onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'assetVault') {
      return <AssetVault onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'checkoutRoom') {
      return <CheckoutRoom onReturn={() => setCurrentView('entryGate')} />;
    }

    if (currentView === 'domainVault') {
      return <DomainVault onReturn={() => setCurrentView('entryGate')} />;
    }

    return (
      <EntryGate
        onEnterDreamLab={() => setCurrentView('dreamLab')}
        onEnterMoneyTracker={() => setCurrentView('moneyTracker')}
        onRequestClearance={() => setCurrentView('signupRequest')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {currentView !== 'entryGate' && (
        <nav className="sticky top-0 z-50 border-b border-purple-900 bg-black/90 backdrop-blur px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-purple-400 text-xs uppercase tracking-[0.35em]">
                Geniunaire MasterMinds
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Dream Funnel Command Navigation
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setCurrentView('entryGate')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Entry Gate
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('dreamLab')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Dream Lab
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('moneyTracker')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Money Tracker
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('dormMageddon')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                DormMageddon
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('creatorStudio')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Creator Studio
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('vaultReleaseLibrary')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Vault Releases
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('founderPromoVault')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Promo Vault
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('founderTierRules')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Founder Rules
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('signupRequest')}
                className="px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500"
              >
                Request Clearance
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('assetVault')}
                className="px-4 py-2 border border-purple-500 text-purple-300 rounded hover:bg-purple-950"
              >
                Asset Vault
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('checkoutRoom')}
                className="px-4 py-2 border border-green-500 text-green-300 rounded hover:bg-green-950"
              >
                Checkout
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('domainVault')}
                className="px-4 py-2 border border-yellow-500 text-yellow-300 rounded hover:bg-yellow-950"
              >
                Domains
              </button>
            </div>
          </div>
        </nav>
      )}

      {renderCurrentView()}
    </div>
  );
}

export default App;