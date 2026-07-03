import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gmOwnerMoneyVault";

const defaultLanes = [
  "Front Gate",
  "GMPark RIDEZ VR Lot Party Experience",
  "NightOwl HideOut Pool, Lounge & Discovery Bar",
  "NightOwl HideOut Pool, Lounge & Discovery Bar",
  "GM OrbitS Ai & AiALITY Display Rental Hub",
  "GM E-TV Network",
  "ThreadFolio Glow E-Folio Set",
  "DormMageddon House",
  "GM E-Store",
  "PCOA Partner Streaming",
  "Geniunaire K!ddz- K!ddz Planet / NextGen Separate App"
];

function MoneyTracker({ onReturn }) {
  const [name, setName] = useState("");
  const [lane, setLane] = useState("");
  const [projected, setProjected] = useState("");
  const [actual, setActual] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const totals = useMemo(() => {
    return records.reduce(
      (sum, record) => {
        sum.projected += Number(record.projected || 0);
        sum.actual += Number(record.actual || 0);
        return sum;
      },
      { projected: 0, actual: 0 }
    );
  }, [records]);

  const counts = useMemo(() => {
    return {
      planning: records.filter((item) => item.status === "Planning").length,
      building: records.filter((item) => item.status === "Building").length,
      live: records.filter((item) => item.status === "Live").length,
      review: records.filter((item) => item.status === "Owner Review").length
    };
  }, [records]);

  function addRecord(event) {
    event.preventDefault();

    const newRecord = {
      id: Date.now(),
      name: name || "Untitled GM Money Lane",
      lane: lane || "GM Owner Admin",
      projected: projected || "0",
      actual: actual || "0",
      status: status || "Planning",
      priority: priority || "Medium",
      notes: notes || "",
      createdAt: new Date().toISOString()
    };

    setRecords([newRecord, ...records]);
    setName("");
    setLane("");
    setProjected("");
    setActual("");
    setStatus("");
    setPriority("");
    setNotes("");
  }

  function updateRecord(id, field, value) {
    setRecords(
      records.map((record) => {
        if (record.id === id) {
          return { ...record, [field]: value };
        }
        return record;
      })
    );
  }

  function deleteRecord(id) {
    setRecords(records.filter((record) => record.id !== id));
  }

  function buildSummary() {
    const lines = records.map((record, index) => {
      return [
        `GM Money Lane ${index + 1}: ${record.name}`,
        `Attraction / Building: ${record.lane}`,
        `Status: ${record.status}`,
        `Priority: ${record.priority}`,
        `Projected Revenue: $${record.projected || "0"}`,
        `Actual Revenue: $${record.actual || "0"}`,
        `Notes: ${record.notes || "No notes added"}`
      ].join("\n");
    });

    return [
      "GENIUNAIRE MASTERMINDS — GM OWNER MONEY VAULT",
      "",
      `Tracked Money Lanes: ${records.length}`,
      `Total Projected Revenue: $${totals.projected}`,
      `Total Actual Revenue: $${totals.actual}`,
      `Revenue Gap: $${totals.projected - totals.actual}`,
      "",
      `Planning: ${counts.planning}`,
      `Building: ${counts.building}`,
      `Live: ${counts.live}`,
      `Owner Review: ${counts.review}`,
      "",
      "GM MONEY LANE DETAILS",
      "",
      lines.length ? lines.join("\n\n") : "No tracked GM money lanes yet."
    ].join("\n");
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopyStatus("GM Money Vault summary copied.");
    } catch {
      setCopyStatus("Copy failed. Select and copy manually.");
    }
  }

  return (
    <main className="gm-money-vault">
      <section className="gm-money-header">
        <p className="gm-kicker">GM Owner Admin Building</p>
        <h1>GM Money Vault</h1>
        <p>
          Owner-side tracking for attraction money, projected revenue, actual revenue,
          revenue gaps, status, priorities, Stripe notes, partner notes, and launch movement.
        </p>
      </section>

      <section className="gm-money-stats">
        <article><span>Money Lanes</span><strong>{records.length}</strong></article>
        <article><span>Projected</span><strong>${totals.projected}</strong></article>
        <article><span>Actual</span><strong>${totals.actual}</strong></article>
        <article><span>Revenue Gap</span><strong>${totals.projected - totals.actual}</strong></article>
      </section>

      <section className="gm-money-stats small">
        <article><span>Planning</span><strong>{counts.planning}</strong></article>
        <article><span>Building</span><strong>{counts.building}</strong></article>
        <article><span>Live</span><strong>{counts.live}</strong></article>
        <article><span>Owner Review</span><strong>{counts.review}</strong></article>
      </section>

      <section className="gm-money-panel">
        <h2>Add GM Money Lane</h2>
        <form onSubmit={addRecord} className="gm-money-form">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Offer / Product / Revenue Lane Name" />

          <select value={lane} onChange={(e) => setLane(e.target.value)}>
            <option value="">Attraction / Building</option>
            {defaultLanes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <input value={projected} onChange={(e) => setProjected(e.target.value)} placeholder="Projected Revenue" />
          <input value={actual} onChange={(e) => setActual(e.target.value)} placeholder="Actual Revenue" />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option>Planning</option>
            <option>Building</option>
            <option>Live</option>
            <option>Owner Review</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>

          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Money notes / Stripe link / partner note / policy note / contract note / next action" rows="4" />

          <button type="submit">Save To GM Money Vault</button>
        </form>
      </section>

      <section className="gm-money-panel">
        <div className="gm-money-panel-head">
          <h2>Tracked GM Money Lanes</h2>
          <button type="button" onClick={copySummary}>Copy Owner Summary</button>
        </div>

        {copyStatus && <p className="gm-copy-status">{copyStatus}</p>}

        {records.length === 0 && <p className="gm-empty">No tracked GM money lanes yet.</p>}

        {records.map((record) => (
          <article className="gm-money-record" key={record.id}>
            <input value={record.name} onChange={(e) => updateRecord(record.id, "name", e.target.value)} />

            <select value={record.lane} onChange={(e) => updateRecord(record.id, "lane", e.target.value)}>
              {defaultLanes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <div className="gm-money-two">
              <label>
                Projected Revenue
                <input value={record.projected} onChange={(e) => updateRecord(record.id, "projected", e.target.value)} />
              </label>

              <label>
                Actual Revenue
                <input value={record.actual} onChange={(e) => updateRecord(record.id, "actual", e.target.value)} />
              </label>
            </div>

            <div className="gm-money-two">
              <select value={record.status} onChange={(e) => updateRecord(record.id, "status", e.target.value)}>
                <option>Planning</option>
                <option>Building</option>
                <option>Live</option>
                <option>Owner Review</option>
              </select>

              <select value={record.priority} onChange={(e) => updateRecord(record.id, "priority", e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <textarea value={record.notes} onChange={(e) => updateRecord(record.id, "notes", e.target.value)} rows="3" />

            <button type="button" className="danger" onClick={() => deleteRecord(record.id)}>Delete Lane</button>
          </article>
        ))}
      </section>

      {onReturn && (
        <button type="button" className="gm-return" onClick={onReturn}>
          Return To GM Admin Building
        </button>
      )}
    </main>
  );
}

export default MoneyTracker;
