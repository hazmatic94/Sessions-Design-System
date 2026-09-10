import { escapeHtml } from "../../utils.js";

export function renderSessionsMetricValue({
  value = "0",
  label = "",
  period = "",
  className = "",
} = {}) {
  const classes = ["sessions-metric-value", className].filter(Boolean).join(" ");
  const periodMarkup = period
    ? `<p class="sessions-metric-value__period">${escapeHtml(period)}</p>`
    : "";
  const labelMarkup = label
    ? `<span class="sessions-metric-value__label"> ${escapeHtml(label)}</span>`
    : "";

  return `<div class="${classes}">${periodMarkup}<h2 class="sessions-metric-value__value">${escapeHtml(value)}${labelMarkup}</h2></div>`;
}
