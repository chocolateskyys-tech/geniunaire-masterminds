export const avatarStatuses = {
  available: {
    label: "AVAILABLE",
    publicMeaning: "This avatar can be requested, booked, or rented.",
    adminMeaning: "No active approved assignment.",
  },
  pendingReview: {
    label: "PENDING REVIEW",
    publicMeaning: "A request has been submitted and is waiting for admin approval.",
    adminMeaning: "Review customer, subscription, payment, avatar fit, and usage request.",
  },
  booked: {
    label: "BOOKED",
    publicMeaning: "This avatar is reserved for an approved role, project, or upcoming production.",
    adminMeaning: "Approved reservation. Do not assign to another user without admin override.",
  },
  rented: {
    label: "RENTED",
    publicMeaning: "This avatar is actively rented under a subscription or approved rental plan.",
    adminMeaning: "Monthly rental active. Track renewal, permitted usage, and continuity.",
  },
  casted: {
    label: "CASTED",
    publicMeaning: "This avatar has been assigned to a show, episode, role, or production lane.",
    adminMeaning: "Production continuity applies. Wardrobe, voice, role, and identity changes require review.",
  },
  retired: {
    label: "RETIRED",
    publicMeaning: "This avatar is no longer available in the public store.",
    adminMeaning: "Archive or remove from public shelf. Keep production history if used.",
  },
};

export const avatarStoreItems = [
  {
    id: "vexaNoir",
    name: "Vexa Noir",
    avatarType: "Talk Show Host / Villain Energy",
    category: "Host / Villain",
    roleLane: "Talk show, debate desk, villain commentary, interview segments",
    requiredMembership: "Talk Show Creator Pass or Featured Cast Pass",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    monthlyRental: "$49/mo",
    bookingFee: "$19 review fee",
    status: "available",
    workerBot: "Persona Booking Bot",
    wardrobeLane: "Glam Villain / Studio Host",
    adminApprovalRequired: true,
    publicNote:
      "For members who want a sharp host, villain, or commentary-style personality lane.",
  },
  {
    id: "novaPrime",
    name: "Nova Prime",
    avatarType: "Superhero Lead",
    category: "Superhero",
    roleLane: "Hero, team lead, power-based scripted scenes, action episodes",
    requiredMembership: "Superhero Series Pass",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    monthlyRental: "$79/mo",
    bookingFee: "$29 review fee",
    status: "available",
    workerBot: "Persona Booking Bot",
    wardrobeLane: "Hero Suit / Power Armor",
    adminApprovalRequired: true,
    publicNote:
      "For members who want a heroic avatar lane for superhero-style AI'ality episodes.",
  },
  {
    id: "miraGlow",
    name: "Mira Glow",
    avatarType: "Lifestyle Host / Glam Personality",
    category: "Lifestyle / Glam",
    roleLane: "Makeup room, wardrobe segments, lifestyle talk, product features",
    requiredMembership: "Featured Cast Pass or Talk Show Creator Pass",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    monthlyRental: "$49/mo",
    bookingFee: "$19 review fee",
    status: "available",
    workerBot: "Persona Booking Bot",
    wardrobeLane: "Glam / Studio Wardrobe",
    adminApprovalRequired: true,
    publicNote:
      "For members who want a beauty, glam, lifestyle, or soft host avatar lane.",
  },
  {
    id: "byteRyder",
    name: "Byte Ryder",
    avatarType: "Game Show Host / Tech Trickster",
    category: "Game Show / Tech",
    roleLane: "Game show host, challenge host, tech games, audience prompts",
    requiredMembership: "Game Show Host Pass",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    monthlyRental: "$59/mo",
    bookingFee: "$19 review fee",
    status: "available",
    workerBot: "Persona Booking Bot",
    wardrobeLane: "Game Show Host / Neon Tech",
    adminApprovalRequired: true,
    publicNote:
      "For members who want to host challenges, games, interactive episodes, or digital contests.",
  },
  {
    id: "crowdSpark",
    name: "CrowdSpark Extra",
    avatarType: "Background Extra",
    category: "Extra",
    roleLane: "Crowd scenes, audience reactions, background moments, supporter cameos",
    requiredMembership: "Background Extra Pass",
    requiredModel: "RiftView or higher",
    requiredSignal: "Viewer Signal or higher",
    monthlyRental: "$19/mo",
    bookingFee: "$0 included review",
    status: "available",
    workerBot: "Persona Booking Bot",
    wardrobeLane: "Basic Extra Wardrobe",
    adminApprovalRequired: true,
    publicNote:
      "For members who want a simple background presence in approved AI'ality-style scenes.",
  },
  {
    id: "onyxVolt",
    name: "Onyx Volt",
    avatarType: "Villain / Antihero",
    category: "Superhero / Villain",
    roleLane: "Villain scenes, antihero arcs, conflict moments, dramatic production lanes",
    requiredMembership: "Superhero Series Pass",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    monthlyRental: "$79/mo",
    bookingFee: "$29 review fee",
    status: "available",
    workerBot: "Persona Booking Bot",
    wardrobeLane: "Villain Suit / Shadow Armor",
    adminApprovalRequired: true,
    publicNote:
      "For members who want a darker superhero-series role lane with villain or antihero energy.",
  },
];

export const avatarWorkerBots = [
  {
    id: "personaBookingBot",
    name: "Persona Booking Bot",
    assignedRoom: "Avatar Store / Persona Shelf",
    job:
      "Helps users choose, request, book, rent, or reserve approved avatars based on membership, E-TV model, signal plan, and admin rules.",
    allowedActions: [
      "explain avatar status",
      "recommend eligible avatars",
      "collect booking request",
      "route to payment or review",
      "show upgrade requirement",
    ],
    lockedActions: [
      "generate final avatar",
      "approve role",
      "assign production use",
      "unlock admin avatar machine",
      "override booked/rented status",
    ],
  },
  {
    id: "wardrobeDeskBot",
    name: "Wardrobe Desk Bot",
    assignedRoom: "Wardrobe / Swagged Persona Closet",
    job:
      "Shows clothing categories and outfit options based on avatar type, subscription tier, and approved production lane.",
    allowedActions: [
      "show eligible wardrobe categories",
      "collect outfit preferences",
      "flag premium wardrobe add-ons",
      "submit wardrobe change for admin review",
    ],
    lockedActions: [
      "open wardrobe creator backend",
      "edit final production look without approval",
      "change cast continuity",
      "access Swagged Persona inventory backend",
    ],
  },
  {
    id: "glamDeskBot",
    name: "Glam Desk Bot",
    assignedRoom: "Makeup / Hair / Style Desk",
    job:
      "Guides approved glam, makeup, hair, accessories, and camera-ready styling choices based on avatar lane.",
    allowedActions: [
      "show eligible glam options",
      "collect makeup and hair preferences",
      "submit premium glam request",
      "route to admin review",
    ],
    lockedActions: [
      "open glam machine backend",
      "create unrestricted style assets",
      "alter locked cast identity",
    ],
  },
  {
    id: "continuityBot",
    name: "Continuity Bot",
    assignedRoom: "Cast Continuity / Memory",
    job:
      "Tracks approved avatar identity, wardrobe, role, scene usage, and production continuity so cast members do not break character.",
    allowedActions: [
      "show approved look",
      "show pending look",
      "remind user of continuity rules",
      "log requested changes",
    ],
    lockedActions: [
      "approve continuity changes",
      "overwrite production identity",
      "release locked production assets",
    ],
  },
];

export const wardrobeCategoriesByAvatar = {
  extra: {
    label: "Background Extra Wardrobe",
    includedOptions: [
      "Casual background fit",
      "Audience outfit",
      "Campus background look",
      "Neutral studio outfit",
    ],
    premiumOptions: [
      "Custom themed background outfit",
      "Scene-specific extra look",
    ],
  },
  superhero: {
    label: "Superhero Wardrobe",
    includedOptions: [
      "Hero suit",
      "Sidekick fit",
      "Mask / no mask",
      "Cape / no cape",
      "Boots",
      "Color family",
    ],
    premiumOptions: [
      "Power armor",
      "Signature emblem",
      "Transformation look",
      "Episode-specific battle suit",
    ],
  },
  villain: {
    label: "Villain / Antihero Wardrobe",
    includedOptions: [
      "Shadow suit",
      "Villain coat",
      "Masked villain look",
      "Dark glam look",
      "Boots",
      "Color family",
    ],
    premiumOptions: [
      "Power armor",
      "Signature weapon prop",
      "Final boss look",
      "Episode-specific villain suit",
    ],
  },
  host: {
    label: "Host Wardrobe",
    includedOptions: [
      "Talk show blazer",
      "Studio dress look",
      "Interview host fit",
      "Game show jacket",
      "Promo outfit",
    ],
    premiumOptions: [
      "Custom host wardrobe package",
      "Seasonal studio wardrobe",
      "Signature host look",
    ],
  },
  glam: {
    label: "Glam / Lifestyle Wardrobe",
    includedOptions: [
      "Soft glam outfit",
      "Beauty room look",
      "Product feature fit",
      "Camera-ready casual",
    ],
    premiumOptions: [
      "Luxury glam package",
      "Swagged Persona premium look",
      "Episode-specific glam closet",
    ],
  },
};

export const avatarBookingFlow = [
  {
    step: 1,
    title: "Choose Avatar",
    description: "User selects an available avatar from the public shelf.",
  },
  {
    step: 2,
    title: "Check Plan",
    description: "Worker bot checks required membership, E-TV model, signal plan, and payment path.",
  },
  {
    step: 3,
    title: "Submit Request",
    description: "User submits role interest, avatar lane, wardrobe category, and usage request.",
  },
  {
    step: 4,
    title: "Admin Review",
    description: "Admin approves, declines, tags, or requests more information.",
  },
  {
    step: 5,
    title: "Lock Status",
    description: "Avatar becomes Pending Review, Booked, Rented, Casted, or remains Available.",
  },
  {
    step: 6,
    title: "Continuity Rules",
    description: "Approved wardrobe, glam, and role details are logged for future production consistency.",
  },
];

export const avatarStoreCopy = {
  title: "AI'ality Avatar Store",
  subtitle: "Book the persona. Rent the role. Protect the cast.",
  explanation:
    "Choose from approved AI'ality avatars, persona lanes, and cast-ready character options. Avatar machines stay locked in admin. Members may request, book, rent, or apply for approved avatars based on subscription, E-TV model, signal plan, and admin review.",
  publicNotice:
    "Selecting an avatar does not guarantee casting, screen time, ownership, employment, or production placement. Admin approval, active subscription, and permitted access are required.",
};

export const avatarAdminProtectionNotice =
  "Avatar machines, wardrobe creators, glam tools, continuity controls, production assets, and Swagged Persona inventory systems are protected admin tools. Customers may choose from approved avatar shelves, submit requests, rent approved persona lanes, or purchase add-ons, but they do not receive unrestricted access to the backend creation machines.";

export const avatarStatusCopy = {
  available: "Available for request, booking, or rental.",
  pendingReview: "Pending admin review. This avatar is temporarily held.",
  booked: "Booked. This avatar has been reserved for an approved use.",
  rented: "Rented. This avatar is active under a paid rental or subscription.",
  casted: "Casted. This avatar is assigned to a production, role, or episode.",
  retired: "Retired. This avatar is no longer available in the public store.",
};
