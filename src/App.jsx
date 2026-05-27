import { useState } from 'react';
import EntryGate from './components/EntryGate/EntryGate';
import DreamLab from './components/DreamLab/DreamLab';

function App() {
  const [currentView, setCurrentView] = useState('entryGate');

  if (currentView === 'dreamLab') {
    return <DreamLab onReturn={() => setCurrentView('entryGate')} />;
  }

  return <EntryGate onEnterDreamLab={() => setCurrentView('dreamLab')} />;
}

export default App;