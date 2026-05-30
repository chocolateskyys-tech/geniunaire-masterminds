import { useState } from 'react';
import EntryGate from './components/EntryGate/EntryGate';
import DreamLab from './components/DreamLab/DreamLab';
import MoneyTracker from './components/MoneyTracker/MoneyTracker';
import DormMageddon from './components/DormMageddon/DormMageddon';
import CreatorStudio from './components/CreatorStudio/CreatorStudio';

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

    return (
      <EntryGate
        onEnterDreamLab={() => setCurrentView('dreamLab')}
        onEnterMoneyTracker={() => setCurrentView('moneyTracker')}
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
            </div>
          </div>
        </nav>
      )}

      {renderCurrentView()}
    </div>
  );
}

export default App;