export const ACCESS_ROLES = {
  PUBLIC: "public",
  LEAD: "lead",
  CLIENT: "client",
  ADMIN: "admin",
};

export const ROOM_ACCESS = {
  entryGate: ["public", "lead", "client", "admin"],
  signupRequest: ["public", "lead", "client", "admin"],
  previewGallery: ["public", "lead", "client", "admin"],

  paymentDoors: ["lead", "client", "admin"],
checkoutRoom: ["lead", "client", "admin"],
  clientDashboard: ["client", "admin"],

  dreamLab: ["admin"],
  aiBuildLab: ["admin"],
  moneyTracker: ["admin"],
  dormMageddon: ["admin"],
  creatorStudio: ["admin"],
  vaultReleaseLibrary: ["admin"],
  founderPromoVault: ["admin"],
  founderTierRules: ["admin"],
  assetVault: ["admin"],
  domainVault: ["admin"],
  helperStorefront: ["admin"],
  soundscapeStudio: ["admin"],
  websiteRescueLab: ["admin"],
  productVault: ["admin"],
  eStore: ["admin"],
};

export const PUBLIC_ROOMS = [
  "entryGate",
  "signupRequest",
  "previewGallery",
];

export const LEAD_ROOMS = [
  "entryGate",
  "signupRequest",
  "previewGallery",
  "paymentDoors",
  "checkoutRoom",
];

export const CLIENT_ROOMS = [
  "entryGate",
  "signupRequest",
  "previewGallery",
  "paymentDoors",
  "checkoutRoom",
  "clientDashboard",
];

export const ADMIN_ROOMS = [
  "entryGate",
  "signupRequest",
  "previewGallery",
  "paymentDoors",
  "checkoutRoom",
  "dreamLab",
  "aiBuildLab",
  "moneyTracker",
  "dormMageddon",
  "creatorStudio",
  "vaultReleaseLibrary",
  "founderPromoVault",
  "founderTierRules",
  "assetVault",
  "domainVault",
  "helperStorefront",
  "soundscapeStudio",
  "websiteRescueLab",
  "productVault",
  "eStore",
];

export function getStoredRole() {
  return localStorage.getItem("gm_access_role") || ACCESS_ROLES.PUBLIC;
}

export function setStoredRole(role) {
  localStorage.setItem("gm_access_role", role);
}

export function clearStoredRole() {
  localStorage.removeItem("gm_access_role");
}

export function canAccessRoom(role, roomKey) {
  const allowedRoles = ROOM_ACCESS[roomKey];

  if (!allowedRoles) {
    return role === ACCESS_ROLES.ADMIN;
  }

  return allowedRoles.includes(role);
}

export function getAllowedRooms(role) {
  if (role === ACCESS_ROLES.ADMIN) return ADMIN_ROOMS;
  if (role === ACCESS_ROLES.CLIENT) return CLIENT_ROOMS;
  if (role === ACCESS_ROLES.LEAD) return LEAD_ROOMS;
  return PUBLIC_ROOMS;
}

export function isAdminRole(role) {
  return role === ACCESS_ROLES.ADMIN;
}

export function isClientRole(role) {
  return role === ACCESS_ROLES.CLIENT;
}

export function isLeadRole(role) {
  return role === ACCESS_ROLES.LEAD;
}

export function isPublicRole(role) {
  return role === ACCESS_ROLES.PUBLIC;
}
