export const adminOnlyTools = [
  {
    id: "avatarMachine",
    name: "Avatar Machine / Avatar Maker",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Request Avatar / Choose Avatar Lane",
    reason:
      "Avatar generation is a protected production tool. Members may request avatars or select approved lanes, but the machine stays admin-controlled.",
  },
  {
    id: "copywriterEngine",
    name: "Copywriter Engine",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Request Copy Package / Submit Copy Request",
    reason:
      "Copywriting tools create monetizable business assets. Members may request copy or purchase copy services, but the internal engine stays locked.",
  },
  {
    id: "animeCreator",
    name: "Anime Creator / Character Generator",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Request Character Style / Submit Character Concept",
    reason:
      "Character and anime creation tools are production assets and should not be open for unlimited public use.",
  },
  {
    id: "botBuilder",
    name: "Bot Builder / Bot Training Desk",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Rent Bot Service / Request Bot Setup",
    reason:
      "Worker bots are rentable service products. Users should not freely build, copy, train, or export bots from the backend.",
  },
  {
    id: "workerBotTools",
    name: "Worker Bot Tools",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Hire / Rent Approved Worker Bot",
    reason:
      "Worker bot tools are internal operations. Customers rent outcomes, workflows, or approved bot access.",
  },
  {
    id: "commercialWriter",
    name: "Commercial Writer / Sponsor Break Builder",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Request Commercial Placement / Sponsor Break",
    reason:
      "Commercial creation and sponsor wiring are monetized production services controlled by admin.",
  },
  {
    id: "scriptStudio",
    name: "Script Studio",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Submit Script Request / Submit Episode Idea",
    reason:
      "Script tools are production-side assets. Supporters can submit ideas, but admin controls scripts and final production.",
  },
  {
    id: "episodeBuilder",
    name: "Episode Builder",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Submit Episode / Show Request",
    reason:
      "Episode building controls the network programming and should stay locked behind production/admin access.",
  },
  {
    id: "wardrobeCreator",
    name: "Wardrobe Creator / Swagged Persona Closet",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Request Wardrobe Style / Choose Approved Style Lane",
    reason:
      "Wardrobe, character styling, and branded inventory are protected creative assets.",
  },
  {
    id: "etvProgrammingConsole",
    name: "E-TV Programming Console",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "GM E-TV Lounge / Signal Status / Request Upgrade",
    reason:
      "Programming console controls drops, signal clipping, model-room assignment, commercial breaks, and access overrides.",
  },
  {
    id: "broadcastStudioAdmin",
    name: "Broadcast Studio Admin Controls",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "AI'ality Casting Call / Submit Network Application",
    reason:
      "Broadcast production, show assignment, casting decisions, and release scheduling require admin approval.",
  },
  {
    id: "assetVault",
    name: "Asset Vault",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Purchased Downloads / Approved Member Assets",
    reason:
      "The vault contains protected files, templates, graphics, copy, production materials, and release assets.",
  },
  {
    id: "memoryBotControls",
    name: "Memory Bot Controls",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Resume Episode / View Approved Progress",
    reason:
      "Memory tools control continuity, user progress, cast history, unlocked drops, and production notes.",
  },
  {
    id: "signalClipRestore",
    name: "Signal Clip / Restore Controls",
    lockLevel: "ADMIN_ONLY",
    publicReplacement: "Renew Signal / Restore Access Request",
    reason:
      "Signal clipping and restoration should be controlled by payment status, subscription status, and admin override only.",
  },
];

export const paidToolRentalPaths = [
  {
    id: "avatarRequest",
    label: "Request Avatar",
    customerAction: "Submit avatar style, role lane, and character preference.",
    adminAction: "Admin reviews, creates, approves, or assigns the avatar.",
    possibleFee: "Avatar package, casting membership, or custom quote",
  },
  {
    id: "copyRequest",
    label: "Request Copy Package",
    customerAction: "Submit business, offer, product, or campaign details.",
    adminAction: "Admin uses protected copy tools to create approved output.",
    possibleFee: "Copy package, service fee, or member add-on",
  },
  {
    id: "botRental",
    label: "Rent Worker Bot",
    customerAction: "Choose needed bot service or business task.",
    adminAction: "Admin configures or assigns approved bot workflow.",
    possibleFee: "Bot rental fee, Bot Signal plan, or monthly service",
  },
  {
    id: "showRequest",
    label: "Submit Episode / Show Request",
    customerAction: "Submit episode, show, scene, or programming request.",
    adminAction: "Admin reviews for E-TV programming or AI'ality production.",
    possibleFee: "Supporter access, E-TV signal plan, or production package",
  },
  {
    id: "castingProfile",
    label: "Create Cast Profile",
    customerAction: "Submit bio, portfolio, avatar lane, role interest, and subscription tier.",
    adminAction: "Admin approves, tags, declines, or assigns casting fit.",
    possibleFee: "AI'ality casting membership",
  },
];

export const accessRoleRules = {
  publicVisitor: {
    label: "Public Visitor",
    allowed: [
      "View public previews",
      "Start limited dig",
      "Read public information",
      "Submit basic request forms",
    ],
    blocked: [
      "Avatar Machine",
      "Copywriter Engine",
      "Bot Builder",
      "E-TV Programming Console",
      "Asset Vault",
      "Admin Logs",
    ],
  },
  paidMember: {
    label: "Paid Member",
    allowed: [
      "Use subscribed rooms",
      "Access GM E-TV Lounge",
      "View purchased drops",
      "Submit episode/show requests",
      "Request upgrades",
    ],
    blocked: [
      "Admin-only machines",
      "Production consoles",
      "Owner controls",
      "Private vault management",
      "Signal override controls",
    ],
  },
  castingMember: {
    label: "AI'ality Casting Member",
    allowed: [
      "Create cast profile",
      "Choose eligible avatar lane",
      "Submit bio and portfolio",
      "Join eligible casting pool",
      "Receive casting alerts if approved",
    ],
    blocked: [
      "Final casting decisions",
      "Avatar machine backend",
      "Episode builder backend",
      "Production scheduler",
      "Admin cast notes",
    ],
  },
  adminOwner: {
    label: "Admin / Owner",
    allowed: [
      "Control protected tools",
      "Approve cast members",
      "Assign avatars",
      "Manage worker bots",
      "Program E-TV drops",
      "Clip or restore signals",
      "Manage vault assets",
      "Review payments and access",
    ],
    blocked: [],
  },
};

export const protectedToolNotice =
  "Internal creator tools, avatar systems, copywriting engines, bot builders, worker bot tools, production consoles, programming controls, vault assets, memory systems, and admin review logs are protected Geniunaire MasterMinds operations. Members may request services, submit materials, rent approved tools, or access permitted features based on their subscription, but admin-only systems are not included with standard membership.";

export const customerFacingRule =
  "Customers do not receive open access to the factory. They may request, rent, subscribe, submit, or purchase approved outputs and permitted room access.";

export const adminLockStatusCopy = {
  locked:
    "This tool is protected. Submit a request, rent the approved service, or upgrade your access.",
  adminOnly:
    "Admin-only production tool. Owner approval required.",
  paidRental:
    "This feature is available as a paid service, rental, subscription add-on, or custom quote.",
  approved:
    "Access approved. Continue to permitted tool or room.",
};
