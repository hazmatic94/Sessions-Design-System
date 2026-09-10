import { escapeHtml } from "../../utils.js";

export function renderSessionsMetricRow({
  label = "Metric label",
  value = "0",
  className = "",
} = {}) {
  const classes = ["sessions-metric-row", className].filter(Boolean).join(" ");

  return `<div class="${classes}"><span class="sessions-metric-row__label">${escapeHtml(label)}</span><span class="sessions-metric-row__value">${escapeHtml(value)}</span></div>`;
}
