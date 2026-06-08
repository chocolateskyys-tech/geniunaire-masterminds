import React, { useMemo, useState } from "react";
import {
  etvModels,
  signalPlans,
  wiredRoomRules,
  etvBotWorkers,
  etvLoungeCopy,
  signalStatusCopy,
  etvComplianceNotice,
  subscriptionComplianceNotice,
} from "../../data/etvWireMap";
import {
  protectedToolNotice,
  customerFacingRule,
} from "../../data/adminAccessMap";
import "./ETVLounge.css";

const defaultRequest = {
  name: "",
  email: "",
  requestType: "",
  title: "",
  details: "",
  modelInterest: "",
};

const demoDrops = [
  {
    title: "AI'ality First Drop",
    time: "Friday // 8:00 PM",
    room: "AI'ality Viewing",
    requiredModel: "RiftView or higher",
    status: "Scheduled",
  },
  {
    title: "DormMageddon Campus Signal",
    time: "Saturday // 2:00 PM",
    room: "DormMageddon",
    requiredModel: "DormScreen Book or higher",
    status: "Preview",
  },
  {
    title: "Voice Chamber Casting Alert",
    time: "Sunday // 6:00 PM",
    room: "AI'ality Casting",
    requiredModel: "CastWire or higher",
    status: "Upgrade Required",
  },
];

const commercialRewards = [
  "Watch sponsor break // unlock bonus scene",
  "Claim affiliate offer // save to reward shelf",
  "Commercial reward // unlock replay reminder",
];

export default function ETVLounge({ onNavigate }) {
  const [selectedModelId, setSelectedModelId] = useState("riftView");
  const [signalStatus, setSignalStatus] = useState("active");
  const [request, setRequest] = useState(defaultRequest);

  const selectedModel = useMemo(
    () => etvModels.find((model) => model.id === selectedModelId) || etvModels[0],
    [selectedModelId]
  );

  const loungeHostBot = etvBotWorkers.find((bot) => bot.id === "etvLoungeHostBot");
  const upgradeBot = etvBotWorkers.find((bot) => bot.id === "upgradeBot");
  const signalBot = etvBotWorkers.find((bot) => bot.id === "signalActivationBot");
  const commercialBot = etvBotWorkers.find((bot) => bot.id === "commercialBot");
  const memoryBot = etvBotWorkers.find((bot) => bot.id === "memoryBot");

  const compatibleRules = wiredRoomRules.filter((rule) =>
    selectedModel.compatibleRooms.some((room) =>
      rule.room.toLowerCase().includes(room.toLowerCase()) ||
      room.toLowerCase().includes(rule.room.toLowerCase())
    )
  );

  const updateRequest = (field, value) => {
    setRequest((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedRequests = JSON.parse(
      localStorage.getItem("etvLoungeRequests") || "[]"
    );

    const loungeRequest = {
      ...request,
      modelOwned: selectedModel.name,
      signalStatus,
      status: "Pending Admin Review",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "etvLoungeRequests",
      JSON.stringify([loungeRequest, ...savedRequests])
    );

    alert(
      "E-TV Lounge request submitted. Admin review, model compatibility, signal status, and payment/subscription status may be required before programming is unlocked."
    );

    setRequest(defaultRequest);
  };

  return (
    <main className="etv-lounge">
      <section className="etv-lounge-hero">
        <p className="etv-kicker">PROGRAMMABLE E-TV BOOK</p>
        <h1>{etvLoungeCopy.title}</h1>
        <h2>{etvLoungeCopy.subtitle}</h2>
        <p>{etvLoungeCopy.explanation}</p>

        <div className={`signal-banner signal-${signalStatus}`}>
          <strong>{signalStatusCopy[signalStatus]}</strong>
        </div>

        <div className="lounge-actions">
          <button type="button" onClick={() => onNavigate?.("etvStore")}>
            Visit E-TV Store
          </button>
          <button type="button" onClick={() => onNavigate?.("aiCastingMembership")}>
            Enter AI'ality Casting
          </button>
          <button type="button" onClick={() => onNavigate?.("broadcastStudio")}>
            View Broadcast Studio
          </button>
        </div>
      </section>

      <section className="my-etv-panel">
        <article className="etv-card main-model-card">
          <p className="etv-kicker">MY E-TV</p>
          <h2>{selectedModel.deviceDisplay || selectedModel.name}</h2>
          <p className="device-type-pill">{selectedModel.deviceType}</p>
          <p>{selectedModel.accessNote}</p>

          <div className="model-selector">
            <label>
              Choose demo model
              <select
                value={selectedModelId}
                onChange={(event) => setSelectedModelId(event.target.value)}
              >
                {etvModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} — {model.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Signal status
              <select
                value={signalStatus}
                onChange={(event) => setSignalStatus(event.target.value)}
              >
                <option value="active">Signal Active</option>
                <option value="pending">Signal Pending</option>
                <option value="interrupted">Signal Interrupted</option>
                <option value="clipped">Signal Clipped</option>
                <option value="restored">Signal Restored</option>
                <option value="founderOverride">Founder Override</option>
              </select>
            </label>
          </div>
        </article>

        <article className="etv-card">
          <h3>Viewing Square</h3>
          <strong>{selectedModel.viewingSquare}</strong>
          <p>{selectedModel.label}</p>
        </article>

        <article className="etv-card">
          <h3>Signal Plan</h3>
          <strong>{selectedModel.minimumSignal}</strong>
          <p>{selectedModel.monthlySignal}</p>
        </article>

        <article className="etv-card">
          <h3>Activation</h3>
          <strong>{selectedModel.activationFee}</strong>
          <p>One-time digital model activation.</p>
        </article>
      </section>

      <section className="lounge-grid">
        <article className="lounge-section">
          <h2>Unlocked Programming</h2>
          <div className="pill-list">
            {selectedModel.compatibleRooms.map((room) => (
              <span key={room}>{room}</span>
            ))}
          </div>
        </article>

        <article className="lounge-section">
          <h2>Scheduled Drops</h2>
          <div className="drop-list">
            {demoDrops.map((drop) => (
              <div key={drop.title} className="drop-card">
                <strong>{drop.title}</strong>
                <span>{drop.time}</span>
                <p>{drop.room}</p>
                <small>{drop.requiredModel}</small>
                <em>{drop.status}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="lounge-section">
          <h2>Cast Bot Shelf</h2>
          <div className="bot-shelf">
            {[loungeHostBot, signalBot, upgradeBot, commercialBot, memoryBot]
              .filter(Boolean)
              .map((bot) => (
                <div key={bot.id} className="bot-card">
                  <strong>{bot.name}</strong>
                  <p>{bot.job}</p>
                </div>
              ))}
          </div>
        </article>

        <article className="lounge-section">
          <h2>Commercial Rewards</h2>
          <div className="reward-list">
            {commercialRewards.map((reward) => (
              <span key={reward}>{reward}</span>
            ))}
          </div>
        </article>

        <article className="lounge-section">
          <h2>Upgrade Wall</h2>
          <p>{selectedModel.upgradePath}</p>
          <div className="upgrade-buttons">
            <button type="button" onClick={() => onNavigate?.("etvStore")}>
              Upgrade Screen
            </button>
            <button type="button" onClick={() => onNavigate?.("etvStore")}>
              Add Signal Plan
            </button>
            <button type="button" onClick={() => onNavigate?.("aiCastingMembership")}>
              Wire Casting Access
            </button>
          </div>
        </article>

        <article className="lounge-section">
          <h2>Compatibility Notes</h2>
          {compatibleRules.length > 0 ? (
            compatibleRules.map((rule) => (
              <p key={rule.room}>
                <strong>{rule.room}:</strong> {rule.requiredModel} /{" "}
                {rule.requiredSignal}
              </p>
            ))
          ) : (
            <p>
              Some rooms may require a higher E-TV model, signal plan, payment
              status, or admin approval before access is unlocked.
            </p>
          )}
        </article>
      </section>

      <section className="etv-request-section">
        <div className="request-copy">
          <p className="etv-kicker">SUPPORTER / MEMBER REQUEST</p>
          <h2>Submit Your Episode / Show Request</h2>
          <p>
            This is for supporters, viewers, and members who want to request an
            episode, suggest a show, submit a scene idea, or ask for a future
            E-TV drop. This does not make the submitter cast, talent, staff, or
            a network star.
          </p>
        </div>

        <form className="etv-request-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={request.name}
              onChange={(event) => updateRequest("name", event.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={request.email}
              onChange={(event) => updateRequest("email", event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Request Type
            <select
              value={request.requestType}
              onChange={(event) => updateRequest("requestType", event.target.value)}
              required
            >
              <option value="">Choose one</option>
              <option value="Episode Request">Episode Request</option>
              <option value="Show Idea">Show Idea</option>
              <option value="Character Request">Character Request</option>
              <option value="Commercial / Sponsor Idea">
                Commercial / Sponsor Idea
              </option>
              <option value="DormMageddon Request">DormMageddon Request</option>
              <option value="AI'ality Drop Request">AI'ality Drop Request</option>
            </select>
          </label>

          <label>
            Title / Idea Name
            <input
              value={request.title}
              onChange={(event) => updateRequest("title", event.target.value)}
              placeholder="Name your episode, show, or request"
              required
            />
          </label>

          <label>
            Model / Signal Interest
            <select
              value={request.modelInterest}
              onChange={(event) => updateRequest("modelInterest", event.target.value)}
            >
              <option value="">Not sure yet</option>
              {etvModels.map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Details
            <textarea
              value={request.details}
              onChange={(event) => updateRequest("details", event.target.value)}
              placeholder="Tell us what you want to see, request, unlock, sponsor, or submit for review."
              rows="6"
              required
            />
          </label>

          <button type="submit">Submit E-TV Lounge Request</button>
        </form>
      </section>

      <section className="lounge-rules">
        <article>
          <h3>E-TV Digital Product Notice</h3>
          <p>{etvComplianceNotice}</p>
        </article>

        <article>
          <h3>Signal / Subscription Notice</h3>
          <p>{subscriptionComplianceNotice}</p>
        </article>

        <article>
          <h3>Protected Tool Notice</h3>
          <p>{protectedToolNotice}</p>
          <p>{customerFacingRule}</p>
        </article>

        <article>
          <h3>Signal Plans</h3>
          <ul>
            {signalPlans.map((plan) => (
              <li key={plan.id}>
                <strong>{plan.name}</strong> — {plan.monthlyPrice}:{" "}
                {plan.purpose}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
