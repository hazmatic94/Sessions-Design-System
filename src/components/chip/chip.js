import { escapeHtml } from "../../utils.js";

export function renderSessionsChip({ label = "Chip", className = "" } = {}) {
  const classes = ["sessions-chip", className].filter(Boolean).join(" ");

  return `<span class="${classes}">${escapeHtml(label)}</span>`;
}
