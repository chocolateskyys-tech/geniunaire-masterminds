import { useState } from 'react';
import EntryGate from './components/EntryGate/EntryGate';
import DreamLab from './components/DreamLab/DreamLab';
import MoneyTracker from './components/MoneyTracker/MoneyTracker';

function App() {
  const [currentView, setCurrentView] = useState('entryGate');

  if (currentView === 'dreamLab') {
    return <DreamLab onReturn={() => setCurrentView('entryGate')} />;
  }

  if (currentView === 'moneyTracker') {
    return <MoneyTracker onReturn={() => setCurrentView('entryGate')} />;
  }

  return (
    <EntryGate
      onEnterDreamLab={() => setCurrentView('dreamLab')}
      onEnterMoneyTracker={() => setCurrentView('moneyTracker')}
    />
  );
}

export default App;