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
import AvatarStore from './components/AvatarStore/AvatarStore';
import SoundscapeStudio from './components/SoundscapeStudio/SoundscapeStudio';
import SoundMine from './components/SoundMine/SoundMine';
import BroadcastStudio from './components/BroadcastStudio/BroadcastStudio';
import WardrobeCreator from './components/WardrobeCreator/WardrobeCreator';
import ETVProgrammingConsole from './components/ETVProgrammingConsole/ETVProgrammingConsole';
import AIBuildLab from './components/AIBuildLab/AIBuildLab';
import WebsiteRescueLab from './components/WebsiteRescueLab/WebsiteRescueLab';
import ProductVault from './components/ProductVault/ProductVault';
import PreviewGallery from './components/PreviewGallery/PreviewGallery';
import EStore from './components/EStore/EStore';
import ETVStore from './components/ETVStore/ETVStore';
import ETVLounge from './components/ETVLounge/ETVLounge';
import AICastingMembership from './components/AICastingMembership/AICastingMembership';
import PaymentDoors from './components/PaymentDoors/PaymentDoors';
import ClientIntakeDashboard from './components/ClientIntakeDashboard/ClientIntakeDashboard';
import MineLab from './components/MineLab/MineLab';
import SourceSalesTracker from './components/SourceSalesTracker/SourceSalesTracker';
import LaunchReadiness from './components/LaunchReadiness/LaunchReadiness';

function App() {
  const [currentView, setCurrentView] = useState('entryGate');
  const [requestedAccess, setRequestedAccess] = useState(
    'General Admiration Funnel Access'
  );
  const [requestedDestination, setRequestedDestination] = useState('clientIntake');
  const [accessGranted, setAccessGranted] = useState(false);

  const navItems = [
    ['Entry Gate', 'entryGate'],
    ['Payment Doors', 'paymentDoors'],
    ['Client Intake', 'clientIntake'],
    ['Mine Lab', 'mineLab'],
    ['Source + Sales', 'sourceSalesTracker'],
    ['Launch Readiness', 'launchReadiness'],
    ['Enter The Mine', 'signupRequest'],
    ['Preview Gallery', 'previewGallery'],
    ['Checkout', 'checkoutRoom'],
    ['Aspire Lab', 'dreamLab'],
    ['Money Tracker', 'moneyTracker'],
    ['DormMageddon', 'dormMageddon'],
    ['Creator Studio', 'creatorStudio'],
    ['Vault Releases', 'vaultReleaseLibrary'],
    ['Promo Vault', 'founderPromoVault'],
    ['Founder Rules', 'founderTierRules'],
    ['Asset Vault', 'assetVault'],
    ['Domains', 'domainVault'],
    ['Robots', 'robotStorefront'],
    ["AI'ality", 'broadcastStudio'],
    ['Sound Mine', 'soundMine'],
    ['Broadcast Studio', 'broadcastStudio'],
    ['Wardrobe Creator', 'wardrobeCreator'],
    ['Programming Console', 'etvProgrammingConsole'],
    ['AI Build Lab', 'aiBuildLab'],
    ['Website Rescue', 'websiteRescueLab'],
    ['Product Vault', 'productVault'],
    ['E-Store', 'eStore'],
    ['E-TV Store', 'etvStore'],
    ['E-TV Lounge', 'etvLounge'],
    ["AI'ality Casting", 'aiCastingMembership'],
  ];

  const returnToGate = () => {
    setAccessGranted(false);
    setCurrentView('entryGate');
  };

  const roomProps = { onReturn: returnToGate };

  const views = {
    paymentDoors: <PaymentDoors {...roomProps} />,
    clientIntake: <ClientIntakeDashboard {...roomProps} />,
    mineLab: <MineLab {...roomProps} />,
    sourceSalesTracker: <SourceSalesTracker {...roomProps} />,
    launchReadiness: <LaunchReadiness {...roomProps} />,
    checkoutRoom: <CheckoutRoom {...roomProps} />,
    dreamLab: <DreamLab {...roomProps} />,
    moneyTracker: <MoneyTracker {...roomProps} />,
    dormMageddon: <DormMageddon {...roomProps} />,
    creatorStudio: <CreatorStudio {...roomProps} />,
    vaultReleaseLibrary: <VaultReleaseLibrary {...roomProps} />,
    founderPromoVault: <FounderPromoVault {...roomProps} />,
    founderTierRules: <FounderTierRules {...roomProps} />,
    assetVault: <AssetVault {...roomProps} />,
    domainVault: <DomainVault {...roomProps} />,
    robotStorefront: <RobotStorefront {...roomProps} />,
    avatarStore: <AvatarStore {...roomProps} />,
    soundscapeStudio: <SoundscapeStudio {...roomProps} />,
    soundMine: <SoundMine {...roomProps} />,
    broadcastStudio: <BroadcastStudio {...roomProps} />,
    wardrobeCreator: <WardrobeCreator {...roomProps} />,
    etvProgrammingConsole: <ETVProgrammingConsole {...roomProps} />,
    aiBuildLab: <AIBuildLab {...roomProps} />,
    websiteRescueLab: <WebsiteRescueLab {...roomProps} />,
    productVault: <ProductVault {...roomProps} />,
    previewGallery: <PreviewGallery {...roomProps} />,
    eStore: <EStore {...roomProps} />,
    etvStore: <ETVStore {...roomProps} />,
    etvLounge: <ETVLounge {...roomProps} />,
    aiCastingMembership: <AICastingMembership {...roomProps} />,
  };

  function requestAccess(accessType, destination = 'clientIntake') {
    setRequestedAccess(accessType);
    setRequestedDestination(destination || 'paymentDoors');
    setAccessGranted(false);
    setCurrentView('signupRequest');
  }

  function openPublicRoom(destination) {
    setAccessGranted(true);
    setCurrentView(destination);
  }

  function grantAccess() {
    setAccessGranted(true);
    setCurrentView(requestedDestination || 'clientIntake');
  }

  function founderAccess() {
    setRequestedAccess('ASPIRE / Owner Full Access');
    setRequestedDestination('aiBuildLab');
    setAccessGranted(true);
    setCurrentView('aiBuildLab');
  }

  function renderSignup() {
    return (
      <SignupRequest
        onReturn={returnToGate}
        requestedAccess={requestedAccess}
        onAccessGranted={grantAccess}
      />
    );
  }

  function renderCurrentView() {
    if (currentView === 'entryGate') {
      return (
        <EntryGate
          onEnterDreamLab={() =>
            requestAccess('Think Tank / Aspire Lab Access', 'clientIntake')
          }
          onEnterMoneyTracker={() =>
            requestAccess('Vault / Money Tracker Access', 'clientIntake')
          }
          onRequestClearance={() =>
            requestAccess('General Admiration Funnel Access', 'clientIntake')
          }
          onFounderAccess={founderAccess}
          onEnterAIality={() => openPublicRoom('broadcastStudio')}
          onEnterDormMageddon={() => openPublicRoom('dormMageddon')}
          onEnterETVStore={() => openPublicRoom('etvStore')}
          onEnterETVLounge={() => openPublicRoom('etvLounge')}
          onEnterCheckout={() => openPublicRoom('checkoutRoom')}
          onEnterRobotStore={() => openPublicRoom('robotStorefront')}
        />
      );
    }

    if (currentView === 'signupRequest') {
      return renderSignup();
    }

    if (!accessGranted) {
      return renderSignup();
    }

    return views[currentView] || views.paymentDoors;
  }

  return (
    <div className="min-h-screen bg-black">
      {currentView !== 'entryGate' && accessGranted && (
        <nav className="sticky top-0 z-50 border-b border-purple-900 bg-black/90 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-purple-400">
                Geniunaire MasterMinds
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Admiration Mine Integrator
              </p>
            </div>

            <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto md:max-h-none">
              {navItems.map(([label, view]) => (
                <button
                  key={`${label}-${view}`}
                  type="button"
                  onClick={() => {
                    if (view === 'entryGate') {
                      returnToGate();
                    } else if (view === 'signupRequest') {
                      requestAccess('General Admiration Funnel Access', 'paymentDoors');
                    } else {
                      setCurrentView(view);
                    }
                  }}
                  className={
                    currentView === view
                      ? 'rounded border border-purple-500 bg-purple-950 px-3 py-2 text-xs text-purple-300'
                      : 'rounded border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-purple-500'
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
