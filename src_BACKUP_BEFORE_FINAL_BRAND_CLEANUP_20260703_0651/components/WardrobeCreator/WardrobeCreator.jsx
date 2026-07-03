import "./WardrobeCreator.css";

const wardrobeSections = [
  {
    name: "Cast Closet",
    type: "Wardrobe Packs",
    description:
      "Dress AI cast members, bot celebrities, creator avatars, and E-TV show characters with scene-ready outfits, identity looks, and wardrobe packs.",
    items: ["Talk Show Fit", "Confessional Look", "Reality House Outfit", "Red Carpet Set"],
    access: "Style shop / production access",
  },
  {
    name: "Glam Mine",
    type: "Makeup + Hair",
    description:
      "Create glam looks, makeup moods, hair styles, beauty upgrades, camera-ready looks, and character polish for aired appearances.",
    items: ["Soft Glam", "Villain Era", "Luxury Boss", "Camera Ready"],
    access: "Premium glam access",
  },
  {
    name: "Scene Packs",
    type: "Production Styling",
    description:
      "Prepare matching wardrobe and prop sets for story scenes, podcasts, cast trips, slumber parties, studio sessions, and special episodes.",
    items: ["Girls Trip PJs", "Hawaii Cast Trip", "Podcast Host Set", "Studio Session Fit"],
    access: "Scene / broadcast access",
  },
  {
    name: "Device Skins",
    type: "E-TV Identity",
    description:
      "Dress the viewer devices too: E-TV phones, tablets, E-TV books, Broadcast Bible screens, VaultScreen shells, and DiamondFrame skins.",
    items: ["Rhinestone Case", "Army Pattern Skin", "Tiffany Blue Signal", "Gold Mine Border"],
    access: "E-TV Store add-on",
  },
  {
    name: "Broadcast Gifts",
    type: "Virtual Gifts + Snacks",
    description:
      "Send fun virtual gifts, snacks, reactions, and branded energy drops during broadcasts, episodes, watch parties, and community moments.",
    items: ["Popcorn Drop", "Mic Drop", "Diamond Roses", "Hey Ms. Geniunaire Badge"],
    access: "Viewer impulse buys",
  },
  {
    name: "Milestone Certificates",
    type: "Progress + Participation",
    description:
      "Reward viewers, creators, cast members, and beta testers with progress badges, certificates, access moments, and branded participation proof.",
    items: ["First Signal Activated", "First Cast Follow", "VIP Viewer Badge", "Founder Glow"],
    access: "Achievement layer",
  },
  {
    name: "Avatar Continuity Rules",
    type: "Production Protection",
    description:
      "Protect ongoing shows by keeping cast identity consistent once an avatar is cast, filmed, assigned, or attached to active production.",
    items: ["Style allowed", "Identity locked", "Production history protected", "Role continuity"],
    access: "Required policy",
  },
  {
    name: "Swagged Persona Inventory",
    type: "Real Brand Foundation",
    description:
      "Connect real-world apparel, accessory, and product inventory logic from Swagged Persona LLC into the virtual wardrobe economy.",
    items: ["Product name", "Retail price", "Quantity", "Customer request"],
    access: "Owner / brand admin",
  },
];

const featuredPacks = [
  {
    title: "Girls Trip Glam Pack",
    tag: "Scene Bundle",
    copy: "Matching trip looks, soft glam, vacation accessories, and cast-photo energy for AI’ALITY travel scenes.",
  },
  {
    title: "Talk Show Takeover Pack",
    tag: "Broadcast Fit",
    copy: "Camera-ready host looks, statement jewelry, studio makeup, and mic-moment accessories.",
  },
  {
    title: "Drifty Street Persona Pack",
    tag: "Character Style",
    copy: "Casual-but-coded fits for characters drifting through the Rift with attitude, edge, and story presence.",
  },
];

export default function WardrobeCreator({ onReturn }) {
  function saveSection(section) {
    const record = {
      selectedWardrobeSection: section.name,
      type: section.type,
      access: section.access,
      selectedAt: new Date().toISOString(),
      status: "wardrobe-section-selected",
    };

    localStorage.setItem("gm_selected_wardrobe_section", JSON.stringify(record));
    alert(`${section.name} selected. Next step: add products, looks, or scene assets.`);
  }

  function savePack(pack) {
    const record = {
      selectedWardrobePack: pack.title,
      tag: pack.tag,
      selectedAt: new Date().toISOString(),
      status: "wardrobe-pack-selected",
    };

    localStorage.setItem("gm_selected_wardrobe_pack", JSON.stringify(record));
    alert(`${pack.title} selected. Next step: attach looks, prices, or avatar rules.`);
  }

  return (
    <main className="wardrobe-page">
      <section className="wardrobe-hero">
        <p className="wardrobe-kicker">Swagged Persona LLC presents</p>
        <h1>AI’ALITY Wardrobe Creator</h1>
        <p className="wardrobe-lead">
          Change the fit. Don’t break the cast.
        </p>
        <p className="wardrobe-copy">
          Dress the AI’ALITY cast, style creator avatars, build scene looks,
          create glam moments, sell device skins, send broadcast gifts, and
          protect production identity while the show keeps moving.
        </p>
      </section>

      <section className="wardrobe-rule-panel">
        <span>Style the personality.</span>
        <span>Protect the production.</span>
        <span>Your persona is cast. Your wardrobe can evolve.</span>
        <span>Swagged Persona dresses the AI’ALITY cast.</span>
      </section>

      <section className="featured-pack-panel">
        <div className="featured-pack-intro">
          <p className="wardrobe-kicker">Featured Style Drops</p>
          <h2>Scene-ready wardrobe ideas</h2>
          <p>
            These packs show how AI cast members can shop for looks without
            replacing the production identity attached to their role.
          </p>
        </div>

        <div className="featured-pack-grid">
          {featuredPacks.map((pack) => (
            <article className="featured-pack-card" key={pack.title}>
              <span>{pack.tag}</span>
              <h3>{pack.title}</h3>
              <p>{pack.copy}</p>
              <button type="button" onClick={() => savePack(pack)}>
                Select Pack
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="wardrobe-grid">
        {wardrobeSections.map((section) => (
          <article className="wardrobe-card" key={section.name}>
            <div className="wardrobe-card-top">
              <span>{section.type}</span>
            </div>

            <h2>{section.name}</h2>
            <p>{section.description}</p>

            <div className="wardrobe-item-list">
              {section.items.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>

            <div className="wardrobe-access-box">
              <strong>Access</strong>
              <span>{section.access}</span>
            </div>

            <button type="button" onClick={() => saveSection(section)}>
              Open Section
            </button>
          </article>
        ))}
      </section>

      <section className="continuity-policy">
        <h2>Avatar Continuity Policy</h2>
        <p>
          You may style, dress, accessorize, and upgrade your avatar’s
          appearance through approved wardrobe, glam, device skin, and scene
          packs. However, once an avatar, bot, or AI cast member is assigned to
          an active production, replacing the production identity may interrupt
          or forfeit casting history, episode continuity, role assignments, and
          active production status.
        </p>

        {onReturn && (
          <button type="button" onClick={onReturn}>
            Return To Entry
          </button>
        )}
      </section>
    </main>
  );
}
