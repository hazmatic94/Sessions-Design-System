let assetBase = "/assets";

export function setSessionsAssetBase(base = "/assets") {
  assetBase = String(base).replace(/\/$/, "");
}

export function sessionsAsset(path) {
  const normalized = String(path).replace(/^\/+/, "");
  return `${assetBase}/${normalized}`;
}
