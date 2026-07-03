import React, { useMemo, useState } from "react";
import {
  avatarStoreItems,
  avatarStatuses,
  avatarWorkerBots,
  wardrobeCategoriesByAvatar,
  avatarBookingFlow,
  avatarStoreCopy,
  avatarAdminProtectionNotice,
  avatarStatusCopy,
} from "../../data/avatarStoreMap";
import {
  protectedToolNotice,
  customerFacingRule,
} from "../../data/adminAccessMap";
import "./AvatarStore.css";

const defaultRequest = {
  name: "",
  email: "",
  avatarId: "",
  usageType: "",
  wardrobeCategory: "",
  details: "",
};

export default function AvatarStore({ onNavigate }) {
  const [selectedAvatarId, setSelectedAvatarId] = useState("");
  const [request, setRequest] = useState(defaultRequest);

  const selectedAvatar = useMemo(
    () => avatarStoreItems.find((avatar) => avatar.id === selectedAvatarId),
    [selectedAvatarId]
  );

  const personaBot = avatarWorkerBots.find((bot) => bot.id === "personaBookingBot");
  const wardrobeBot = avatarWorkerBots.find((bot) => bot.id === "wardrobeDeskBot");
  const glamBot = avatarWorkerBots.find((bot) => bot.id === "glamDeskBot");
  const continuityBot = avatarWorkerBots.find((bot) => bot.id === "continuityBot");

  const updateRequest = (field, value) => {
    setRequest((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const chooseAvatar = (avatar) => {
    setSelectedAvatarId(avatar.id);
    setRequest((current) => ({
      ...current,
      avatarId: avatar.id,
      wardrobeCategory: avatar.wardrobeLane,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const avatar = avatarStoreItems.find((item) => item.id === request.avatarId);

    const savedRequests = JSON.parse(
      localStorage.getItem("avatarBookingRequests") || "[]"
    );

    const bookingRequest = {
      ...request,
      avatarName: avatar?.name || "Not selected",
      requestedStatus: "Pending Admin Review",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "avatarBookingRequests",
      JSON.stringify([bookingRequest, ...savedRequests])
    );

    alert(
      "Avatar request submitted. This avatar is pending admin review. Booking, rental, casting, wardrobe, glam, and continuity approval are required before use."
    );

    setSelectedAvatarId("");
    setRequest(defaultRequest);
  };

  return (
    <main className="avatar-store-room">
      <section className="avatar-hero">
        <p className="avatar-kicker">AI'ALITY PERSONA SHELF</p>
        <h1>{avatarStoreCopy.title}</h1>
        <h2>{avatarStoreCopy.subtitle}</h2>
        <p>{avatarStoreCopy.explanation}</p>

        <div className="avatar-alert">
          <strong>Factory stays locked:</strong> {avatarAdminProtectionNotice}
        </div>

        <div className="avatar-actions">
          <button type="button" onClick={() => onNavigate?.("aiCastingMembership")}>
            Join Casting Membership
          </button>
          <button type="button" onClick={() => onNavigate?.("helperStorefront")}>
            Rent Worker Bot
          </button>
          <button type="button" onClick={() => onNavigate?.("etvLounge")}>
            Open GM E-TV Lounge
          </button>
        </div>
      </section>

      <section className="avatar-shelf">
        {avatarStoreItems.map((avatar) => {
          const status = avatarStatuses[avatar.status];

          return (
            <article key={avatar.id} className={`avatar-card status-${avatar.status}`}>
              <div className="avatar-image-placeholder">
                <span>{avatar.name.charAt(0)}</span>
                <div className="avatar-status-ribbon">
                  {status?.label || avatar.status}
                </div>
              </div>

              <div className="avatar-card-body">
                <p className="avatar-category">{avatar.category}</p>
                <h3>{avatar.name}</h3>
                <p>{avatar.publicNote}</p>

                <div className="avatar-meta">
                  <span>Avatar Type</span>
                  <strong>{avatar.avatarType}</strong>
                </div>

                <div className="avatar-meta">
                  <span>Role Lane</span>
                  <strong>{avatar.roleLane}</strong>
                </div>

                <div className="avatar-meta">
                  <span>Membership</span>
                  <strong>{avatar.requiredMembership}</strong>
                </div>

                <div className="avatar-meta">
                  <span>Rental</span>
                  <strong>{avatar.monthlyRental}</strong>
                </div>

                <div className="avatar-meta">
                  <span>Required E-TV</span>
                  <strong>{avatar.requiredModel}</strong>
                </div>

                <div className="avatar-meta">
                  <span>Wardrobe Lane</span>
                  <strong>{avatar.wardrobeLane}</strong>
                </div>

                <button type="button" onClick={() => chooseAvatar(avatar)}>
                  Book / Rent This Avatar
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="avatar-request-section">
        <div className="request-copy">
          <p className="avatar-kicker">BOOKING REQUEST</p>
          <h2>Request Avatar Review</h2>
          <p>
            Select an avatar, choose the intended use, and submit your request.
            The avatar may become <strong>Pending Review</strong>,{" "}
            <strong>Booked</strong>, <strong>Rented</strong>, or{" "}
            <strong>Casted</strong> only after admin approval.
          </p>

          {selectedAvatar && (
            <div className="selected-avatar-box">
              <strong>Selected Avatar:</strong> {selectedAvatar.name}
              <br />
              <span>{selectedAvatar.requiredMembership}</span>
            </div>
          )}
        </div>

        <form className="avatar-request-form" onSubmit={handleSubmit}>
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
            Avatar
            <select
              value={request.avatarId}
              onChange={(event) => {
                setSelectedAvatarId(event.target.value);
                updateRequest("avatarId", event.target.value);
              }}
              required
            >
              <option value="">Choose an avatar</option>
              {avatarStoreItems.map((avatar) => (
                <option key={avatar.id} value={avatar.id}>
                  {avatar.name} — {avatar.avatarType}
                </option>
              ))}
            </select>
          </label>

          <label>
            Intended Use
            <select
              value={request.usageType}
              onChange={(event) => updateRequest("usageType", event.target.value)}
              required
            >
              <option value="">Choose one</option>
              <option value="Monthly Rental">Monthly Rental</option>
              <option value="Casting Membership Profile">
                Casting Membership Profile
              </option>
              <option value="Talk Show Concept">Talk Show Concept</option>
              <option value="Game Show Concept">Game Show Concept</option>
              <option value="Superhero Series">Superhero Series</option>
              <option value="Background Extra">Background Extra</option>
              <option value="Commercial / Promo Appearance">
                Commercial / Promo Appearance
              </option>
            </select>
          </label>

          <label>
            Wardrobe / Glam Category
            <select
              value={request.wardrobeCategory}
              onChange={(event) =>
                updateRequest("wardrobeCategory", event.target.value)
              }
            >
              <option value="">Choose one</option>
              {Object.values(wardrobeCategoriesByAvatar).map((category) => (
                <option key={category.label} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Request Details
            <textarea
              value={request.details}
              onChange={(event) => updateRequest("details", event.target.value)}
              placeholder="Tell us how you want to use this avatar, what show/role you want, and any wardrobe/glam direction."
              rows="6"
              required
            />
          </label>

          <button type="submit">Submit Avatar Request</button>
        </form>
      </section>

      <section className="wardrobe-options">
        <div className="section-heading">
          <p className="avatar-kicker">WARDROBE + GLAM OPTIONS</p>
          <h2>Allowed choices by avatar lane</h2>
          <p>
            Worker bots show choices. Admin machines create and approve the
            final look.
          </p>
        </div>

        <div className="wardrobe-grid">
          {Object.entries(wardrobeCategoriesByAvatar).map(([key, category]) => (
            <article key={key} className="wardrobe-card">
              <h3>{category.label}</h3>

              <h4>Included Options</h4>
              <ul>
                {category.includedOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>

              <h4>Premium / Review Options</h4>
              <ul>
                {category.premiumOptions.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="avatar-worker-bots">
        <article>
          <h3>{personaBot?.name}</h3>
          <p>{personaBot?.job}</p>
        </article>

        <article>
          <h3>{wardrobeBot?.name}</h3>
          <p>{wardrobeBot?.job}</p>
        </article>

        <article>
          <h3>{glamBot?.name}</h3>
          <p>{glamBot?.job}</p>
        </article>

        <article>
          <h3>{continuityBot?.name}</h3>
          <p>{continuityBot?.job}</p>
        </article>
      </section>

      <section className="avatar-flow">
        <div className="section-heading">
          <p className="avatar-kicker">BOOKING FLOW</p>
          <h2>How an avatar gets locked</h2>
        </div>

        <div className="flow-grid">
          {avatarBookingFlow.map((step) => (
            <article key={step.step} className="flow-card">
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="avatar-rules">
        <article>
          <h3>Status Rules</h3>
          {Object.entries(avatarStatusCopy).map(([status, copy]) => (
            <p key={status}>
              <strong>{avatarStatuses[status]?.label || status}:</strong> {copy}
            </p>
          ))}
        </article>

        <article>
          <h3>Public Notice</h3>
          <p>{avatarStoreCopy.publicNotice}</p>
        </article>

        <article>
          <h3>Protected Tools</h3>
          <p>{protectedToolNotice}</p>
          <p>{customerFacingRule}</p>
        </article>
      </section>
    </main>
  );
}
