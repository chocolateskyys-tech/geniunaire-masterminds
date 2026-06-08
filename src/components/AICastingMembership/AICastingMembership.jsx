import React, { useMemo, useState } from "react";
import {
  castingMemberships,
  castingPageCopy,
  castingComplianceNotice,
  etvBotWorkers,
  wiredRoomRules,
} from "../../data/etvWireMap";
import {
  protectedToolNotice,
  customerFacingRule,
} from "../../data/adminAccessMap";
import "./AICastingMembership.css";

const defaultForm = {
  name: "",
  email: "",
  stageName: "",
  roleInterest: "",
  avatarLane: "",
  portfolio: "",
  bio: "",
  selectedTier: "",
  consent: false,
};

export default function AICastingMembership({ onNavigate }) {
  const [form, setForm] = useState(defaultForm);

  const selectedMembership = useMemo(
    () => castingMemberships.find((tier) => tier.id === form.selectedTier),
    [form.selectedTier]
  );

  const castingDeskBot = etvBotWorkers.find((bot) => bot.id === "castingDeskBot");
  const auditionCoachBot = etvBotWorkers.find((bot) => bot.id === "auditionCoachBot");

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedApplications = JSON.parse(
      localStorage.getItem("aiCastingApplications") || "[]"
    );

    const application = {
      ...form,
      selectedMembershipName: selectedMembership?.name || "Not selected",
      status: "Pending Admin Review",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "aiCastingApplications",
      JSON.stringify([application, ...savedApplications])
    );

    alert(
      "Casting profile submitted for admin review. Membership/payment verification and approval are required before any casting access is granted."
    );

    setForm(defaultForm);
  };

  return (
    <main className="ai-casting-room">
      <section className="ai-casting-hero">
        <p className="ai-casting-kicker">AI'ALITY TV NETWORK</p>
        <h1>{castingPageCopy.title}</h1>
        <h2>{castingPageCopy.subtitle}</h2>
        <p>{castingPageCopy.explanation}</p>

        <div className="ai-casting-alert">
          <strong>Live Network Casting Call Invite:</strong> choose the role you
          want to build toward, create your cast profile, pick your avatar lane,
          submit your bio/portfolio, and enter the AI'ality casting pool.
        </div>

        <div className="ai-casting-actions">
          <button type="button" onClick={() => onNavigate?.("etvStore")}>
            Visit E-TV Store
          </button>
          <button type="button" onClick={() => onNavigate?.("broadcastStudio")}>
            View Broadcast Studio
          </button>
        </div>
      </section>

      <section className="ai-casting-grid">
        {castingMemberships.map((tier) => (
          <article key={tier.id} className="casting-tier-card">
            <p className="tier-price">{tier.monthlyPrice}</p>
            <h3>{tier.name}</h3>
            <p>{tier.note}</p>

            <div className="tier-details">
              <span>Avatar Access</span>
              <strong>{tier.avatarAccess}</strong>
            </div>

            <div className="tier-details">
              <span>Role Lane</span>
              <strong>{tier.roleLane}</strong>
            </div>

            <div className="tier-details">
              <span>Required Model</span>
              <strong>{tier.requiresModel}</strong>
            </div>

            <div className="tier-details">
              <span>Required Signal</span>
              <strong>{tier.requiresSignal}</strong>
            </div>

            <button
              type="button"
              onClick={() => updateForm("selectedTier", tier.id)}
            >
              Choose This Casting Lane
            </button>
          </article>
        ))}
      </section>

      <section className="ai-casting-intake">
        <div className="intake-copy">
          <p className="ai-casting-kicker">CAST PROFILE INTAKE</p>
          <h2>Who do you want to become inside the network?</h2>
          <p>
            This is where future extras, hosts, voice talent, show creators,
            superhero characters, performers, and network personalities submit
            their profile for locked admin review.
          </p>

          {selectedMembership && (
            <div className="selected-tier">
              <strong>Selected Lane:</strong> {selectedMembership.name} —{" "}
              {selectedMembership.monthlyPrice}
            </div>
          )}
        </div>

        <form className="casting-form" onSubmit={handleSubmit}>
          <label>
            Legal / Contact Name
            <input
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateForm("email", event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Stage Name / Cast Name
            <input
              value={form.stageName}
              onChange={(event) => updateForm("stageName", event.target.value)}
              placeholder="Your AI'ality name"
            />
          </label>

          <label>
            What do you want to be?
            <select
              value={form.roleInterest}
              onChange={(event) => updateForm("roleInterest", event.target.value)}
              required
            >
              <option value="">Choose one</option>
              <option value="Background Extra">Background Extra</option>
              <option value="Featured Character">Featured Character</option>
              <option value="Talk Show Host">Talk Show Host</option>
              <option value="Game Show Host">Game Show Host</option>
              <option value="Voice Actor">Voice Actor</option>
              <option value="Writer / Story Builder">Writer / Story Builder</option>
              <option value="Superhero Series Character">
                Superhero Series Character
              </option>
              <option value="Original Show Creator">Original Show Creator</option>
            </select>
          </label>

          <label>
            Avatar Lane
            <select
              value={form.avatarLane}
              onChange={(event) => updateForm("avatarLane", event.target.value)}
              required
            >
              <option value="">Choose one</option>
              <option value="Limited Extra Avatar">Limited Extra Avatar</option>
              <option value="Featured Persona Avatar">Featured Persona Avatar</option>
              <option value="Talk Show Host Avatar">Talk Show Host Avatar</option>
              <option value="Game Show Host Avatar">Game Show Host Avatar</option>
              <option value="Superhero Avatar">Superhero Avatar</option>
              <option value="Villain Avatar">Villain Avatar</option>
              <option value="Custom Quote Avatar">Custom Quote Avatar</option>
            </select>
          </label>

          <label>
            Portfolio / Social / Sample Link
            <input
              value={form.portfolio}
              onChange={(event) => updateForm("portfolio", event.target.value)}
              placeholder="Paste portfolio, video, voice sample, or social link"
            />
          </label>

          <label>
            Bio / Character Idea / Why You Fit
            <textarea
              value={form.bio}
              onChange={(event) => updateForm("bio", event.target.value)}
              placeholder="Tell us who you are, what role you want, and what kind of AI'ality character or show lane fits you."
              rows="6"
              required
            />
          </label>

          <label className="checkbox-line">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateForm("consent", event.target.checked)}
              required
            />
            I understand this is a paid casting membership request and all access,
            avatars, roles, casting, and production placement require admin review.
          </label>

          <button type="submit">Submit Casting Profile For Review</button>
        </form>
      </section>

      <section className="ai-casting-rules">
        <article>
          <h3>Important Casting Rule</h3>
          <p>{castingComplianceNotice}</p>
        </article>

        <article>
          <h3>Protected Tools Rule</h3>
          <p>{protectedToolNotice}</p>
          <p>{customerFacingRule}</p>
        </article>

        <article>
          <h3>Required Production Access</h3>
          <ul>
            {wiredRoomRules
              .filter((rule) =>
                ["AI'ality Casting", "Voice Chamber", "Broadcast Studio"].includes(
                  rule.room
                )
              )
              .map((rule) => (
                <li key={rule.room}>
                  <strong>{rule.room}:</strong> {rule.requiredModel} /{" "}
                  {rule.requiredSignal}. {rule.reason}
                </li>
              ))}
          </ul>
        </article>

        <article>
          <h3>Worker Bots Supporting This Room</h3>
          <p>
            <strong>{castingDeskBot?.name}:</strong> {castingDeskBot?.job}
          </p>
          <p>
            <strong>{auditionCoachBot?.name}:</strong> {auditionCoachBot?.job}
          </p>
        </article>
      </section>
    </main>
  );
}
