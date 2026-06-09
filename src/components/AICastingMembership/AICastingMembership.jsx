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



const characterRightsRules = [
  {
    title: "Characters Stay Inside The Network",
    detail:
      "AI'ality characters, avatars, cast identities, show concepts, episode roles, and production assets must remain inside the approved Geniunaire MasterMinds / AI'ality TV Network system unless written approval says otherwise.",
  },
  {
    title: "Submit Ideas, Do Not Self-Release",
    detail:
      "Cast members may submit character, merch, comic, product, show, and business ideas for review. They may not independently produce, sell, distribute, license, or release AI'ality-related merch or character products outside the site without written approval.",
  },
  {
    title: "Business Must Be Created Or Approved Through Us",
    detail:
      "If a cast member wants a character business, merch shelf, comic book, shirt line, cup, keychain, sticker pack, or promo product, it must be submitted for admin review and created, approved, licensed, or packaged through Geniunaire MasterMinds.",
  },
  {
    title: "Approved Monetization Can Be Built",
    detail:
      "Approved cast members may be offered paid packages, licensing terms, promotional support, merch setup, business setup, revenue-share terms, or custom agreements based on their tier, character, and approval status.",
  },
];

const characterRightsNotice =
  "Geniunaire MasterMinds / AI'ality TV Network controls the approved use of AI'ality shows, characters, avatars, cast identities, episodes, clips, artwork, merch concepts, production assets, and related brand materials. Cast members may submit ideas and request business or merch setup, but they may not independently sell, distribute, license, recreate, copy, repackage, or monetize AI'ality-related characters, shows, merch, clips, or assets outside the platform without written approval.";

const castMonetizationPaths = [
  {
    title: "Promote Your Episodes",
    detail:
      "Use approved AI'ality episode clips, character moments, show teasers, and cast announcements to build attention on TikTok, Instagram, YouTube Shorts, Facebook, and other creator platforms.",
  },
  {
    title: "Grow Your Character Audience",
    detail:
      "Your avatar lane can become a recognizable persona. The goal is to help cast members grow followers around their character, show role, host identity, or episode appearances.",
  },
  {
    title: "Build Creator Money Around Your Role",
    detail:
      "Cast members may use their approved content strategy to pursue outside monetization such as creator platform revenue, affiliate offers, bookings, sponsorship attention, tips, merch, services, or audience-supported opportunities.",
  },
  {
    title: "Request Promo Strategy",
    detail:
      "Higher tiers can request guidance on how to post, clip, caption, promote, and position their AI'ality appearances so the membership feels like a media-growth lane, not just a profile form.",
  },
];

const castValueRules = [
  "Geniunaire MasterMinds does not guarantee income, fame, followers, casting, screen time, employment, or platform monetization.",
  "Membership gives access to submit a cast profile, choose eligible avatar lanes, request review, and receive approved casting/promotion opportunities based on tier and admin approval.",
  "Cast members are responsible for building their own audience, posting approved materials properly, following platform rules, and using their content strategy consistently.",
];

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



      <section className="character-rights-section">
        <div className="character-rights-copy">
          <p className="ai-casting-kicker">CHARACTER RIGHTS + MERCH APPROVAL</p>
          <h2>Your character can become a business — but it must be approved.</h2>
          <p>
            Cast members can design character concepts, submit merch ideas, ask
            for comics, cups, shirts, keychains, stickers, promo products, and
            character business setup. But AI'ality-related characters, shows,
            merch, clips, avatars, and brand assets must be reviewed and
            approved through Geniunaire MasterMinds before anyone sells,
            distributes, or monetizes them.
          </p>
        </div>

        <div className="character-rights-grid">
          {characterRightsRules.map((rule) => (
            <article key={rule.title} className="character-right-card">
              <h3>{rule.title}</h3>
              <p>{rule.detail}</p>
            </article>
          ))}
        </div>

        <div className="character-rights-notice">
          <h3>Network Ownership / Approval Notice</h3>
          <p>{characterRightsNotice}</p>
        </div>
      </section>

      <section className="cast-monetization-section">
        <div className="cast-monetization-copy">
          <p className="ai-casting-kicker">CAST MEMBER GROWTH STRATEGY</p>
          <h2>How Cast Members Can Build Their Own Money Lane</h2>
          <p>
            AI'ality casting membership is not a guaranteed job. It is a paid
            media-positioning lane where approved cast members can build a cast
            profile, grow a character identity, request promotional guidance,
            and use approved appearances to help build their own creator
            audience.
          </p>
        </div>

        <div className="cast-money-grid">
          {castMonetizationPaths.map((path) => (
            <article key={path.title} className="cast-money-card">
              <h3>{path.title}</h3>
              <p>{path.detail}</p>
            </article>
          ))}
        </div>

        <div className="cast-value-rules">
          <h3>Worthwhile, But Honest</h3>
          <ul>
            {castValueRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
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
