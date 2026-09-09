export function renderSessionsMenuPanel({ children = "", className = "" } = {}) {
  const classes = ["sessions-menu-panel", className].filter(Boolean).join(" ");
  return `<div class="${classes}">${children}</div>`;
}
