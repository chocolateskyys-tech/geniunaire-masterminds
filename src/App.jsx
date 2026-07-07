import { useState } from "react";
import GMFinalVisual from "./components/GMFinalVisual/GMFinalVisual";
import EntryGate from "./components/EntryGate/EntryGate";
import "./App.css";

export default function App() {
  const [view, setView] = useState("live-gate");
  const [lastAction, setLastAction] = useState("Waiting for guest action.");

  const handleAction = (action) => {
    console.log("GM ACTION:", action);
    setLastAction(`Last action: ${action}`);

    if (action === "secret-gate-play" || action === "secret-admin" || action === "kiddz-special-events") {
      setView("live-gate");
    }
  };

  return (
    <main className="gm-app-shell">
      <section className="gm-view-switcher" aria-label="Geniunaire MasterMinds view switcher">
        <div>
          <p>Geniunaire MasterMinds</p>
          <h1>Front Gate Build Console</h1>
          <span>{lastAction}</span>
        </div>

        <div className="gm-view-buttons">
          <button className={view === "live-gate" ? "active" : ""} onClick={() => setView("live-gate")}>
            Live Front Gate
          </button>
          <button className={view === "approved-visual" ? "active" : ""} onClick={() => setView("approved-visual")}>
            Approved Visual / Parking Lot
          </button>
        </div>
      </section>

      {view === "live-gate" ? (
        <EntryGate />
      ) : (
        <GMFinalVisual onAction={handleAction} />
      )}
    </main>
  );
}
