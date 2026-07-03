
export const etvDeviceLadder = [
  {
    id: "etvPhone",
    name: "E-TV Phone",
    pairedModel: "Pocket Signal",
    deviceUse: "Starter mobile signal access, quick previews, pocket drops, and limited visitor viewing.",
    publicLine: "Your pocket signal for starter programming inside the Mine.",
  },
  {
    id: "etvTablet",
    name: "E-TV Tablet",
    pairedModel: "DormScreen Book",
    deviceUse: "Student/tablet-style viewing, campus drops, DormMageddon access, and portable creator previews.",
    publicLine: "A portable screen for student, campus, and creator-friendly programming.",
  },
  {
    id: "etvBook",
    name: "E-TV Book",
    pairedModel: "RiftView",
    deviceUse: "Core living-book viewing, AI'ality episodes, scheduled drops, and GM E-TV Lounge access.",
    publicLine: "A regular ebook opens. An E-TV Book turns on.",
  },
  {
    id: "etvProductionBook",
    name: "E-TV Production Book",
    pairedModel: "CastWire",
    deviceUse: "Casting, audition, voice, writer, actor, callback, and production access.",
    publicLine: "Wire into production when you are ready to audition, write, perform, or build a cast profile.",
  },
  {
    id: "etvBotBox",
    name: "E-TV BotBox",
    pairedModel: "BotBox Book",
    deviceUse: "Bot rentals, bot training, AI worker setup, and business bot operations.",
    publicLine: "The bot-ready model for renting, wiring, and managing approved AI workers.",
  },
  {
    id: "etvDiamondFrame",
    name: "E-TV DiamondFrame",
    pairedModel: "DiamondFrame",
    deviceUse: "Premium viewing, upgraded screen experiences, creator drops, and diamond-level lounge access.",
    publicLine: "Premium signal. Bigger shine. Higher-level programming.",
  },
  {
    id: "etvBroadcast",
    name: "E-TV Broadcast",
    pairedModel: "Broadcast Bible",
    deviceUse: "Live rooms, interviews, classes, watch parties, network events, and broadcast-level programming.",
    publicLine: "The live-screen model for broadcast experiences and network programming.",
  },
  {
    id: "etvVault",
    name: "E-TV Vault",
    pairedModel: "VaultScreen",
    deviceUse: "Replay vaults, archives, saved courses, premium replays, and licensed drops.",
    publicLine: "The archive screen for saved drops, replays, and vault programming.",
  },
  {
    id: "etvGhost",
    name: "E-TV Ghost",
    pairedModel: "GhostSignal",
    deviceUse: "Private founder drops, beta rooms, approved private programming, and admin-approved access.",
    publicLine: "Private signal. Founder-level access. Admin approval required.",
  },
];

export const etvModels = [
  {
    id: "pocketSignal",
    deviceType: "E-TV Phone",
    deviceDisplay: "E-TV Phone / Pocket Signal",
    name: "Pocket Signal",
    category: "Programmable E-TV Book",
    label: "Starter Screen",
    viewingSquare: "Pocket View",
    activationFee: "$9",
    monthlySignal: "$9/mo",
    minimumSignal: "Basic Signal",
    upgradePath: "Upgrade to DormScreen Book, RiftView, or CastWire",
    compatibleRooms: [
      "Public Preview",
      "Starter Drops",
      "GM E-TV Lounge Preview",
      "Limited Visitor Access",
    ],
    accessNote:
      "Starter digital E-TV model for preview access, starter drops, and limited public programming.",
  },
  {
    id: "dormScreenBook",
    deviceType: "E-TV Tablet",
    deviceDisplay: "E-TV Tablet / DormScreen Book",
    name: "DormScreen Book",
    category: "Programmable E-TV Book",
    label: "Student Screen",
    viewingSquare: "Dorm View",
    activationFee: "$19",
    monthlySignal: "$19/mo",
    minimumSignal: "Student Signal",
    upgradePath: "Upgrade to CastWire, BotBox Book, or Broadcast Bible",
    compatibleRooms: [
      "DormMageddon",
      "Student Founder Drops",
      "Campus Creator Tools",
      "GM E-TV Lounge",
    ],
    accessNote:
      "Student/founder model for campus drops, DormMageddon, student creator access, and campus-style programming.",
  },
  {
    id: "riftView",
    deviceType: "E-TV Book",
    deviceDisplay: "E-TV Book / RiftView",
    name: "RiftView",
    category: "Programmable E-TV Book",
    label: "Core Screen",
    viewingSquare: "Living Book View",
    activationFee: "$29",
    monthlySignal: "$29/mo",
    minimumSignal: "Viewer Signal",
    upgradePath: "Upgrade to CastWire for casting and production access",
    compatibleRooms: [
      "AI'ality Viewing",
      "GM E-TV Lounge",
      "Scheduled Drops",
      "Bonus Scenes",
      "Living Book Programming",
    ],
    accessNote:
      "Core AI'ality viewer model for living-book episodes, scheduled drops, bonus scenes, and GM E-TV Lounge access.",
  },
  {
    id: "castWire",
    deviceType: "E-TV Production Book",
    deviceDisplay: "E-TV Production Book / CastWire",
    name: "CastWire",
    category: "Programmable E-TV Book",
    label: "Production Screen",
    viewingSquare: "Casting View",
    activationFee: "$49",
    monthlySignal: "$49/mo",
    minimumSignal: "Production Signal",
    upgradePath: "Upgrade to Broadcast Bible for live rooms and advanced network events",
    compatibleRooms: [
      "AI'ality Casting",
      "Voice Chamber",
      "Writer Room",
      "Actor Room",
      "Callback Desk",
      "Audition Review",
    ],
    accessNote:
      "Required for casting, voice, writer, performer, audition, callback, and production access.",
  },
  {
    id: "botBoxBook",
    deviceType: "E-TV BotBox",
    deviceDisplay: "E-TV BotBox / BotBox Book",
    name: "BotBox Book",
    category: "Programmable E-TV Book",
    label: "Bot Rental Screen",
    viewingSquare: "Bot Ops View",
    activationFee: "$69",
    monthlySignal: "$69/mo",
    minimumSignal: "Bot Signal",
    upgradePath: "Upgrade to DiamondFrame or Broadcast Bible for premium programming",
    compatibleRooms: [
      "Bot Rental Desk",
      "Bot Training",
      "Business Bot Setup",
      "AI Worker Rentals",
      "BotBox Operations",
    ],
    accessNote:
      "Required for bot rentals, bot training, business bots, AI worker setup, and bot-powered service rooms.",
  },
  {
    id: "diamondFrame",
    deviceType: "E-TV DiamondFrame",
    deviceDisplay: "E-TV DiamondFrame / DiamondFrame",
    name: "DiamondFrame",
    category: "Programmable E-TV Book",
    label: "Premium Screen",
    viewingSquare: "Diamond View",
    activationFee: "$99",
    monthlySignal: "$99/mo",
    minimumSignal: "Diamond Signal",
    upgradePath: "Upgrade to Broadcast Bible or VaultScreen for live/archive access",
    compatibleRooms: [
      "Premium Drops",
      "Creator Studio",
      "Advanced GM E-TV Lounge",
      "Upgrade Wall",
      "Diamond Programming",
    ],
    accessNote:
      "Premium viewing and creator model for upgraded drops, larger screen experiences, and advanced lounge access.",
  },
  {
    id: "broadcastBible",
    deviceType: "E-TV Broadcast",
    deviceDisplay: "E-TV Broadcast / Broadcast Bible",
    name: "Broadcast Bible",
    category: "Programmable E-TV Book",
    label: "Live Screen",
    viewingSquare: "Broadcast View",
    activationFee: "$149",
    monthlySignal: "$149/mo",
    minimumSignal: "Broadcast Signal",
    upgradePath: "Add VaultScreen for replay/archive access",
    compatibleRooms: [
      "Broadcast Studio",
      "Live Rooms",
      "Classes",
      "Interviews",
      "Watch Parties",
      "AI'ality Network Events",
    ],
    accessNote:
      "Required for broadcast-level programming, live drops, classes, interviews, watch parties, and network events.",
  },
  {
    id: "vaultScreen",
    deviceType: "E-TV Vault",
    deviceDisplay: "E-TV Vault / VaultScreen",
    name: "VaultScreen",
    category: "Programmable E-TV Book",
    label: "Archive Screen",
    viewingSquare: "Vault View",
    activationFee: "$129",
    monthlySignal: "$79/mo",
    minimumSignal: "Vault Signal",
    upgradePath: "Add Diamond Signal or Founder Override for deeper archive access",
    compatibleRooms: [
      "Replay Vault",
      "Archives",
      "Saved Courses",
      "Licensed Drops",
      "Premium Replays",
    ],
    accessNote:
      "Archive model for replays, premium saved content, licensed drops, courses, and vault programming.",
  },
  {
    id: "ghostSignal",
    deviceType: "E-TV Ghost",
    deviceDisplay: "E-TV Ghost / GhostSignal",
    name: "GhostSignal",
    category: "Programmable E-TV Book",
    label: "Private Screen",
    viewingSquare: "Private Founder View",
    activationFee: "Private Quote",
    monthlySignal: "Private Quote",
    minimumSignal: "Founder Override",
    upgradePath: "Admin approval only",
    compatibleRooms: [
      "Private Drops",
      "Founder Rooms",
      "Beta Rooms",
      "Admin Approved Access",
      "Ghost Programming",
    ],
    accessNote:
      "Private/founder/beta model. Approval required. This does not grant public admin access.",
  },
];

export const signalPlans = [
  {
    id: "basicSignal",
    name: "Basic Signal",
    monthlyPrice: "$9/mo",
    purpose: "Starter viewing and limited public programming.",
    unlocks: ["starter viewing", "preview drops", "limited lounge access"],
  },
  {
    id: "studentSignal",
    name: "Student Signal",
    monthlyPrice: "$19/mo",
    purpose: "Student founder and DormMageddon style programming.",
    unlocks: ["student drops", "campus creator access", "DormMageddon features"],
  },
  {
    id: "viewerSignal",
    name: "Viewer Signal",
    monthlyPrice: "$29/mo",
    purpose: "AI'ality viewer access and scheduled living-book drops.",
    unlocks: ["AI'ality viewing", "scheduled drops", "bonus scenes", "GM E-TV Lounge"],
  },
  {
    id: "productionSignal",
    name: "Production Signal",
    monthlyPrice: "$49/mo",
    purpose: "Casting, voice, writer, actor, and production access.",
    unlocks: ["casting page", "voice chamber", "writer room", "actor room", "callback desk"],
  },
  {
    id: "botSignal",
    name: "Bot Signal",
    monthlyPrice: "$69/mo",
    purpose: "Bot rentals, bot training, and AI worker setup.",
    unlocks: ["bot rentals", "bot training", "AI worker setup", "business bot rooms"],
  },
  {
    id: "diamondSignal",
    name: "Diamond Signal",
    monthlyPrice: "$99/mo+",
    purpose: "Premium drops, larger viewing squares, and advanced creator access.",
    unlocks: ["premium drops", "larger viewing square", "advanced creator access"],
  },
  {
    id: "broadcastSignal",
    name: "Broadcast Signal",
    monthlyPrice: "$149/mo",
    purpose: "Live rooms, interviews, classes, watch parties, and network events.",
    unlocks: ["broadcast studio", "live classes", "interviews", "watch parties"],
  },
  {
    id: "vaultSignal",
    name: "Vault Signal",
    monthlyPrice: "$79/mo",
    purpose: "Replay, archive, saved course, and licensed drop access.",
    unlocks: ["replay vault", "archives", "saved courses", "licensed drops"],
  },
];

export const wiredRoomRules = [
  {
    room: "AI'ality Full Episodes",
    requiredModel: "RiftView or higher",
    requiredSignal: "Viewer Signal or higher",
    reason: "AI'ality full episodes require living-book viewing and scheduled drop access.",
  },
  {
    room: "AI'ality Casting",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    reason: "Casting requires audition playback, role intake, callback scheduling, and production review tools.",
  },
  {
    room: "Voice Chamber",
    requiredModel: "CastWire or higher",
    requiredSignal: "Production Signal",
    reason: "Voice roles require production access, audition files, script sides, and review tools.",
  },
  {
    room: "Bot Rental Desk",
    requiredModel: "BotBox Book or higher",
    requiredSignal: "Bot Signal",
    reason: "Bot rentals require bot memory, training files, and monthly AI worker access.",
  },
  {
    room: "Broadcast Studio",
    requiredModel: "Broadcast Bible",
    requiredSignal: "Broadcast Signal",
    reason: "Broadcast rooms require live programming, interviews, classes, watch parties, and network scheduling.",
  },
  {
    room: "Replay Vault",
    requiredModel: "VaultScreen",
    requiredSignal: "Vault Signal",
    reason: "Replay and archive access require vault programming and saved drop permissions.",
  },
  {
    room: "Private Founder Drops",
    requiredModel: "GhostSignal",
    requiredSignal: "Founder Override",
    reason: "Private/founder/beta access requires admin approval and is not public admin access.",
  },
];

export const castingMemberships = [
  {
    id: "backgroundExtra",
    name: "Background Extra Pass",
    monthlyPrice: "$19/mo",
    avatarAccess: "Limited avatar choices",
    roleLane: "Background scenes, group scenes, crowd moments, supporter cast pool",
    requiresModel: "RiftView or higher",
    requiresSignal: "Viewer Signal or higher",
    adminReview: true,
    note:
      "For members who want to exist inside the AI'ality world without leading a show. Extras may appear in background-style programming lanes when approved.",
  },
  {
    id: "featuredCast",
    name: "Featured Cast Pass",
    monthlyPrice: "$49/mo",
    avatarAccess: "Expanded avatar choices",
    roleLane: "Featured scene consideration, voice/personality intake, cast alerts",
    requiresModel: "CastWire or higher",
    requiresSignal: "Production Signal",
    adminReview: true,
    note:
      "For members who want more visibility, stronger casting consideration, and a deeper role profile.",
  },
  {
    id: "talkShowCreator",
    name: "Talk Show Creator Pass",
    monthlyPrice: "$99/mo",
    avatarAccess: "Host avatar concept intake",
    roleLane: "Talk show host, interview host, personality-led episode requests",
    requiresModel: "CastWire or higher",
    requiresSignal: "Production Signal",
    adminReview: true,
    note:
      "For members who want their own talk show concept reviewed for future AI'ality programming.",
  },
  {
    id: "gameShowHost",
    name: "Game Show Host Pass",
    monthlyPrice: "$99/mo",
    avatarAccess: "Host/avatar concept intake",
    roleLane: "Game show host, challenge host, interactive episode host",
    requiresModel: "CastWire or higher",
    requiresSignal: "Production Signal",
    adminReview: true,
    note:
      "For members who want to be considered for game-show style network programming.",
  },
  {
    id: "superheroSeries",
    name: "Superhero Series Pass",
    monthlyPrice: "$149/mo",
    avatarAccess: "Superhero avatar concept intake",
    roleLane: "Hero, villain, sidekick, power-based character, scripted series consideration",
    requiresModel: "CastWire or higher",
    requiresSignal: "Production Signal",
    adminReview: true,
    note:
      "For members who want to create or be considered for superhero-style AI'ality series roles.",
  },
  {
    id: "leadCharacterBuild",
    name: "Lead Character / Original Show Build",
    monthlyPrice: "Custom Quote",
    avatarAccess: "Custom avatar and show concept review",
    roleLane: "Lead role, original show, premium production concept, advanced build review",
    requiresModel: "Broadcast Bible or approved access",
    requiresSignal: "Broadcast Signal or approved access",
    adminReview: true,
    note:
      "Premium request path. Approval required. Subscription does not guarantee production placement.",
  },
];

export const etvBotWorkers = [
  {
    id: "etvConciergeBot",
    name: "E-TV Concierge Bot",
    job: "Helps users choose the right E-TV model.",
    asks: [
      "Are you here to watch, create, audition, rent bots, broadcast, or sponsor?",
      "Do you need student access, production access, bot rental access, or premium access?",
      "Which room are you trying to unlock?",
    ],
    routesTo: ["Choose This Model", "Compare Models", "Wire This Room"],
  },
  {
    id: "signalActivationBot",
    name: "Signal Activation Bot",
    job: "Confirms model purchase, active subscription, unlocked rooms, renewal date, and upgrade options.",
    successMessage: "Your E-TV has been wired. Your signal is active. Your programming is unlocked.",
    failureMessage: "Your signal is interrupted. Restore access to continue scheduled drops.",
    routesTo: ["Activate Signal", "Renew Signal Plan", "Restore Access"],
  },
  {
    id: "castingDeskBot",
    name: "Casting Desk Bot",
    job: "Supports casting page routing, role selection, paid casting membership, and production checks.",
    checks: [
      "Does the applicant have CastWire or higher?",
      "Did the applicant pay the casting pass or membership?",
      "Did the applicant accept consent terms?",
      "Did the applicant upload required bio, portfolio, or audition material?",
      "Did the applicant select availability and role lane?",
    ],
    routesTo: ["Submit Audition", "Book Callback", "Join Voice Chamber", "Upgrade to CastWire"],
  },
  {
    id: "auditionCoachBot",
    name: "Audition Coach Bot",
    job: "Offers paid prep services before auditions and casting submissions.",
    offers: [
      "voice lesson",
      "acting class",
      "callback prep",
      "script read review",
      "profile polish",
      "character audition package",
    ],
    routesTo: ["Book Prep Session", "Polish Profile", "Review Script Read"],
  },
  {
    id: "etvLoungeHostBot",
    name: "GM E-TV Lounge Host Bot",
    job: "Welcomes users into their wired E-TV lounge and shows active drops, rewards, upgrades, and alerts.",
    sampleMessage:
      "Welcome back. Your RiftView signal is active. You have scheduled drops, commercial rewards, and AI'ality casting alerts.",
    routesTo: ["View Drops", "Enter AI'ality", "Submit Episode Request", "Upgrade Signal"],
  },
  {
    id: "upgradeBot",
    name: "Upgrade Bot",
    job: "Explains compatibility and sells upgrades without making access feel random.",
    sampleMessage:
      "This room requires CastWire or higher because it includes audition playback, script sides, callback scheduling, and production review tools.",
    routesTo: ["Upgrade Screen", "Add Production Signal", "Wire Voice Chamber", "Add Bot Access"],
  },
  {
    id: "commercialBot",
    name: "Commercial Bot",
    job: "Manages affiliate and sponsor ad breaks, offer placement, commercial scripts, and reward prompts.",
    sampleMessage:
      "Commercial break wired. This ad will appear after Scene 2 for RiftView and higher.",
    routesTo: ["Attach Sponsor", "Write Commercial", "Add Affiliate Link"],
  },
  {
    id: "memoryBot",
    name: "Memory Bot",
    job: "Stores episode progress, character choices, model ownership, drops unlocked, followed characters, and casting call history.",
    stores: [
      "episode summaries",
      "character choices",
      "viewer progress",
      "E-TV model owned",
      "drops unlocked",
      "characters followed",
      "casting calls joined",
    ],
    routesTo: ["View Memory", "Resume Drop", "Continue Episode"],
  },
];

export const etvStoreCopy = {
  title: "E-TV Store",
  subtitle: "Choose your model. Wire your signal. Enter the programming.",
  explanation:
    "A regular ebook opens. An E-TV Book turns on. Choose a digital E-TV Book Model to unlock compatible rooms, drops, bots, broadcasts, casting pages, and living-book programming inside the Mine.",
  publicExplanation:
    "The E-TV Store lets users choose a digital book-TV model that activates compatible programming inside the Mine. Each model unlocks different screen sizes, rooms, drops, bot features, broadcasts, and living-book experiences. Think of it like buying the glasses before the 3D movie — the E-TV model is what activates the experience.",
};

export const etvLoungeCopy = {
  title: "GM E-TV Lounge",
  subtitle: "Your signal lives here.",
  explanation:
    "Manage your E-TV model, unlocked rooms, scheduled drops, cast bot access, commercial rewards, upgrades, and signal status.",
  activeMessage: "Your E-TV is wired. Signal active. Programming unlocked.",
  interruptedMessage: "Signal interrupted. Restore your E-TV access to continue scheduled drops.",
};

export const castingPageCopy = {
  title: "AI'ality Casting",
  subtitle: "Cast the voice. Build the persona. Enter production.",
  explanation:
    "Voice actors, writers, performers, animators, student creators, hosts, and character builders can join paid casting membership lanes to help bring AI characters, cast bots, and living-book episodes to life. CastWire or higher is required for production access.",
  publicNotice:
    "Choose your casting membership, build your profile, submit your bio or portfolio, select your avatar lane, and enter the AI'ality casting pool.",
};

export const etvComplianceNotice =
  "E-TV Book Models are digital access products used to unlock compatible platform features, rooms, drops, screens, bot tools, and virtual programming. They are not physical televisions unless clearly stated at checkout.";

export const subscriptionComplianceNotice =
  "Access may pause, restrict, or terminate if the required signal plan, model purchase, subscription, or payment status is inactive.";

export const castingComplianceNotice =
  "AI'ality casting memberships give members access to create and maintain a cast profile, select eligible avatar and role lanes, submit bio and portfolio materials, and be considered for future network opportunities. Membership does not guarantee casting, screen time, income, employment, ownership, or production placement. Admin approval is required for all featured roles, lead roles, original shows, network appearances, and protected production access.";

export const signalStatusCopy = {
  active: "Your E-TV is wired. Signal active. Programming unlocked.",
  pending: "Signal pending. Complete activation to unlock compatible programming.",
  interrupted: "Signal interrupted. Restore your E-TV access to continue scheduled drops.",
  clipped: "Signal clipped. Required model, signal plan, or payment status is inactive.",
  restored: "Signal restored. Programming access may resume.",
  founderOverride: "Founder override active. Private access approved by admin.",
};
