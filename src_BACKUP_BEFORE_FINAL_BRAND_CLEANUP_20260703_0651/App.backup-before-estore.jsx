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
import HelperStorefront from './components/HelperStorefront/HelperStorefront';
import SoundscapeStudio from './components/SoundscapeStudio/SoundscapeStudio';
import AIBuildLab from './components/AIBuildLab/AIBuildLab';
import WebsiteRescueLab from './components/WebsiteRescueLab/WebsiteRescueLab';
import ProductVault from './components/ProductVault/ProductVault';
import PreviewGallery from './components/PreviewGallery/PreviewGallery';

function App() {
  const [currentView, setCurrentView] = useState('entryGate');
  const [requestedAccess, setRequestedAccess] = useState('General Dream Funnel Access');
  const [requestedDestination, setRequestedDestination] = useState('dreamLab');
  const [accessGranted, setAccessGranted] = useState(false);

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
    ['Helpers', 'helperStorefront'],
    ['Soundscape', 'soundscapeStudio'],
    ['AI Build Lab', 'aiBuildLab'],
    ['Website Rescue', 'websiteRescueLab'],
    ['Product Vault', 'productVault'],
    ['Preview Gallery', 'previewGallery'],
  ];

  const roomProps = {
    onReturn: () => {
      setAccessGranted(false);
      setCurrentView('entryGate');
    },
  };

  const views = {
    dreamLab: <DreamLab {...roomProps} />,
    moneyTracker: <MoneyTracker {...roomProps} />,
    dormMageddon: <DormMageddon {...roomProps} />,
    creatorStudio: <CreatorStudio {...roomProps} />,
    vaultReleaseLibrary: <VaultReleaseLibrary {...roomProps} />,
    founderPromoVault: <FounderPromoVault {...roomProps} />,
    founderTierRules: <FounderTierRules {...roomProps} />,
    assetVault: <AssetVault {...roomProps} />,
    checkoutRoom: <CheckoutRoom {...roomProps} />,
    domainVault: <DomainVault {...roomProps} />,
    helperStorefront: <HelperStorefront {...roomProps} />,
    soundscapeStudio: <SoundscapeStudio {...roomProps} />,
    aiBuildLab: <AIBuildLab {...roomProps} />,
    websiteRescueLab: <WebsiteRescueLab {...roomProps} />,
    productVault: <ProductVault {...roomProps} />,
    previewGallery: <PreviewGallery {...roomProps} />,
  };

  function requestAccess(accessType, destination = 'dreamLab') {
    setRequestedAccess(accessType);
    setRequestedDestination(destination);
    setAccessGranted(false);
    setCurrentView('signupRequest');
  }

  function grantAccess() {
    setAccessGranted(true);
    setCurrentView(requestedDestination || 'dreamLab');
  }

  function founderAccess() {
    setRequestedAccess('Founder / Owner Full Access');
    setRequestedDestination('aiBuildLab');
    setAccessGranted(true);
    setCurrentView('aiBuildLab');
  }

  function renderSignup() {
    return (
      <SignupRequest
        onReturn={() => {
          setAccessGranted(false);
          setCurrentView('entryGate');
        }}
        requestedAccess={requestedAccess}
        onAccessGranted={grantAccess}
      />
    );
  }

  function renderCurrentView() {
    if (currentView === 'entryGate') {
      return (
        <EntryGate
          onEnterDreamLab={() => requestAccess('Think Tank / Dream Lab Access', 'dreamLab')}
          onEnterMoneyTracker={() => requestAccess('Vault / Money Tracker Access', 'moneyTracker')}
          onRequestClearance={() => requestAccess('General Dream Funnel Access', 'dreamLab')}
          onFounderAccess={founderAccess}
        />
      );
    }

    if (currentView === 'signupRequest') {
      return renderSignup();
    }

    if (!accessGranted) {
      return renderSignup();
    }

    return views[currentView] || views.dreamLab;
  }

  return (
    <div className="min-h-screen bg-black">
      {currentView !== 'entryGate' && accessGranted && (
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
                  onClick={() => {
                    if (view === 'entryGate') {
                      setAccessGranted(false);
                      setCurrentView('entryGate');
                    } else if (view === 'signupRequest') {
                      requestAccess('General Dream Funnel Access', 'dreamLab');
                    } else {
                      setCurrentView(view);
                    }
                  }}
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