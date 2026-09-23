import { escapeHtml } from "../../utils.js";
import { resolveHourTime } from "./hourTime.js";

export function renderSessionsHourLabel({
  hour = 0,
  minute = 0,
  className = "",
} = {}) {
  const resolved = resolveHourTime(hour, minute);
  const classes = ["sessions-hour-label", className].filter(Boolean).join(" ");

  return `<button class="${classes}" type="button" data-sessions-hour-label data-hour="${resolved.hour}" data-minute="${resolved.minute}" aria-label="${escapeHtml(resolved.labelSpaced)}"><span class="sessions-hour-label__time" data-sessions-hour-label-time>${escapeHtml(resolved.time)}</span><span class="sessions-hour-label__period" data-sessions-hour-label-period>${escapeHtml(resolved.period)}</span></button>`;
}

export function applySessionsHourLabel(label, hour, minute) {
  if (!label) return;

  const resolved = resolveHourTime(
    hour ?? label.dataset.hour,
    minute ?? label.dataset.minute,
  );
  const timeEl = label.querySelector("[data-sessions-hour-label-time]");
  const periodEl = label.querySelector("[data-sessions-hour-label-period]");

  label.dataset.hour = String(resolved.hour);
  label.dataset.minute = String(resolved.minute);
  label.setAttribute("aria-label", resolved.labelSpaced);
  if (timeEl) timeEl.textContent = resolved.time;
  if (periodEl) periodEl.textContent = resolved.period;
}
