export function renderSessionsSurface({ children = "", className = "" } = {}) {
  const classes = ["sessions-surface", className].filter(Boolean).join(" ");

  return `<div class="${classes}">${children}</div>`;
}
