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
import RobotStorefront from './components/RobotStorefront/RobotStorefront';

function App() {
  const [currentView, setCurrentView] = useState('entryGate');

  const navItems = [
    ['Entry Gate', 'entryGate'],
    ['Dream Lab', 'dreamLab'],
    ['Money Tracker', 'moneyTracker'],
    ['DormMageddon', 'dormMageddon'],
    ['Creator Studio', 'creatorStudio'],
    ['Vault Releases', 'vaultReleaseLibrary'],
    ['Promo Vault', 'founderPromoVault'],
    ['Founder Rules', 'founderTierRules'],
    ['Request Clearance', 'signupRequest'],
    ['Asset Vault', 'assetVault'],
    ['Checkout', 'checkoutRoom'],
    ['Domains', 'domainVault'],
    ['Robots', 'robotStorefront'],
  ];

  function renderCurrentView() {
    const roomProps = {
      onReturn: () => setCurrentView('entryGate'),
    };

    const views = {
      dreamLab: <DreamLab {...roomProps} />,
      moneyTracker: <MoneyTracker {...roomProps} />,
      dormMageddon: <DormMageddon {...roomProps} />,
      creatorStudio: <CreatorStudio {...roomProps} />,
      vaultReleaseLibrary: <VaultReleaseLibrary {...roomProps} />,
      founderPromoVault: <FounderPromoVault {...roomProps} />,
      founderTierRules: <FounderTierRules {...roomProps} />,
      signupRequest: <SignupRequest {...roomProps} />,
      assetVault: <AssetVault {...roomProps} />,
      checkoutRoom: <CheckoutRoom {...roomProps} />,
      domainVault: <DomainVault {...roomProps} />,
      robotStorefront: <RobotStorefront {...roomProps} />,
    };

    if (views[currentView]) {
      return views[currentView];
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
              {navItems.map(([label, view]) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setCurrentView(view)}
                  className={
                    currentView === view
                      ? 'px-4 py-2 border border-purple-500 text-purple-300 rounded bg-purple-950'
                      : 'px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-purple-500'
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {renderCurrentView()}
    </div>
  );
}

export default App;