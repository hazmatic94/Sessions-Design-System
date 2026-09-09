export function renderSessionsMenuDivider({ className = "" } = {}) {
  const classes = ["sessions-menu-panel__divider", className].filter(Boolean).join(" ");
  return `<hr class="${classes}" aria-hidden="true" />`;
}
