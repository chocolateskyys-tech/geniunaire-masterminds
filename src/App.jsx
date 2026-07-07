import { useState } from "react";
import GMFinalVisual from "./components/GMFinalVisual/GMFinalVisual";
import EntryGate from "./components/EntryGate/EntryGate";
import "./App.css";

export default function App() {
  const [view, setView] = useState("approved-visual");
  const [lastAction, setLastAction] = useState("Approved picture visual loaded.");
  const [launchAction, setLaunchAction] = useState(null);

  const handleAction = (action) => {
    console.log("GM ACTION:", action);
    setLastAction(`Last action: ${action}`);

    if (["secret-gate-play", "secret-admin", "kaden-house-play", "kiddz-special-events"].includes(action)) {
      setLaunchAction(action);
      setView("live-gate");
    }
  };

  return (
    <main className="gm-app-shell picture-first-shell">
      <section className="gm-view-switcher gm-picture-safe-bar" aria-label="Geniunaire MasterMinds view switcher">
        <div>
          <p>Geniunaire MasterMinds</p>
          <h1>Approved Visual / Parking Lot</h1>
          <span>{lastAction}</span>
        </div>

        <div className="gm-view-buttons">
          <button className={view === "approved-visual" ? "active" : ""} onClick={() => setView("approved-visual")}>
            Approved Picture Visual
          </button>
          <button className={view === "live-gate" ? "active" : ""} onClick={() => setView("live-gate")}>
            Gate Controls / Admin
          </button>
        </div>
      </section>

      {view === "approved-visual" ? (
        <GMFinalVisual onAction={handleAction} />
      ) : (
        <EntryGate launchAction={launchAction} onLaunchActionHandled={() => setLaunchAction(null)} />
      )}
    </main>
  );
}
