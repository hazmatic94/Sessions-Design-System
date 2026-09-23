import * as ds from "../src/index.js";

const required = [
  "renderSessionsButton",
  "renderSessionsHourColumn",
  "renderSessionsHourBooking",
  "renderSessionsAvatar",
  "renderSessionsFooter",
  "SESSIONS_CHART_COLORS",
  "setSessionsAssetBase",
  "sessionsAsset",
];

for (const name of required) {
  if (ds[name] == null) {
    throw new Error(`Missing export: ${name}`);
  }
}

console.log("package exports ok");
