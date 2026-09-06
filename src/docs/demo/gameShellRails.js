function readBreakpointToken(tokenName, fallback) {
  const breakpoint = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  return breakpoint || fallback;
}

function getNavigationDesktopBreakpointQuery() {
  return `(max-width: ${readBreakpointToken("--breakpoint-navigation-desktop", "1300px")})`;
}

function getGameShellChromeBreakpointQuery() {
  return `(max-width: ${readBreakpointToken("--breakpoint-game-shell-chrome", "950px")})`;
}

export function syncGameShellChromeVisibility(root = document) {
  if (typeof window === "undefined" || !window.matchMedia) return;

  const hidden = window.matchMedia(getGameShellChromeBreakpointQuery()).matches;
  document.documentElement.dataset.gameShellChrome = hidden ? "hidden" : "visible";

  root.querySelectorAll(".joker-game-shell, .joker-game-chrome-preview").forEach((shell) => {
    shell.classList.toggle("is-chrome-hidden", hidden);
  });
}

export function syncStaticGameShellRails(root = document) {
  if (!window.matchMedia) return;

  syncGameShellChromeVisibility(root);

  const compact = window.matchMedia(getNavigationDesktopBreakpointQuery()).matches;

  root.querySelectorAll(
    ".joker-game-shell-preview-frame .joker-product-rail, .joker-game-chrome-preview .joker-product-rail",
  ).forEach((rail) => {
    rail.classList.toggle("is-collapsed", compact);
  });
}

export function parseShowroomBalanceAmount(value) {
  const numeric = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatShowroomBalanceAmount(value) {
  return Math.round(value).toLocaleString("en-US");
}
