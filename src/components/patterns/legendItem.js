import { escapeHtml } from "../../utils.js";

export function renderSessionsLegendItem({
  label = "Legend item",
  color = "var(--green-300)",
  className = "",
} = {}) {
  const classes = ["sessions-legend-item", className].filter(Boolean).join(" ");

  return `<span class="${classes}"><span class="sessions-legend-item__dot" style="background-color: ${escapeHtml(color)}" aria-hidden="true"></span><span class="sessions-legend-item__label">${escapeHtml(label)}</span></span>`;
}
