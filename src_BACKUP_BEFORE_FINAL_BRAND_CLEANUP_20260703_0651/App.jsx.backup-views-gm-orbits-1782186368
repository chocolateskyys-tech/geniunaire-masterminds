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
  const [requestedDestination, setRequestedDestination] =
    useState('clientIntake');
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
    ['AI\'ality', 'broadcastStudio'],
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

  const roomProps = {
    onReturn: () => {
      setAccessGranted(false);
      setCurrentView('entryGate');
    },
  };

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
          onEnterAIality={() =>
            requestAccess("AI'ality Tv Network Access", "broadcastStudio")
          }
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
        <nav className="sticky top-0 z-50 border-b border-purple-900 bg-black/90 backdrop-blur px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-purple-400 text-xs uppercase tracking-[0.35em]">
                Geniunaire MasterMinds
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Admiration Mine Integrator
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
                      requestAccess(
                        'General Admiration Funnel Access',
                        'paymentDoors'
                      );
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
