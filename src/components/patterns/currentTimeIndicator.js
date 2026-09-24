import { escapeHtml } from "../../utils.js";
import { resolveHourTime } from "./hourTime.js";

export function renderSessionsCurrentTimeIndicator({
  hour,
  minute,
  className = "",
  live = true,
} = {}) {
  const resolved =
    hour != null && minute != null
      ? resolveHourTime(hour, minute)
      : resolveHourTime(new Date().getHours(), new Date().getMinutes());
  const classes = ["sessions-current-time", className].filter(Boolean).join(" ");
  const liveAttr = live ? " data-sessions-current-time" : "";

  return `<div class="${classes}"${liveAttr} role="status" aria-live="polite" aria-label="Current time ${escapeHtml(resolved.time)}"><span class="sessions-current-time__chip"><span class="sessions-current-time__label" data-sessions-current-time-label>${escapeHtml(resolved.time)}</span></span><span class="sessions-current-time__line" aria-hidden="true"></span></div>`;
}

export function applySessionsCurrentTimeIndicator(element, date = new Date()) {
  if (!element) return;

  const labelEl = element.querySelector("[data-sessions-current-time-label]");
  const resolved = resolveHourTime(date.getHours(), date.getMinutes());

  if (labelEl) labelEl.textContent = resolved.time;
  element.setAttribute("aria-label", `Current time ${resolved.time}`);
}

function syncCurrentTimeIndicators(root = document) {
  root.querySelectorAll("[data-sessions-current-time]").forEach((element) => {
    applySessionsCurrentTimeIndicator(element);
  });
}

function scheduleCurrentTimeTick() {
  syncCurrentTimeIndicators(document);
  const now = new Date();
  const msUntilNextMinute =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50;

  setupSessionsCurrentTimeIndicators._timeout = window.setTimeout(
    scheduleCurrentTimeTick,
    msUntilNextMinute,
  );
}

export function setupSessionsCurrentTimeIndicators(root = document) {
  syncCurrentTimeIndicators(root);

  if (setupSessionsCurrentTimeIndicators._timeout) {
    clearTimeout(setupSessionsCurrentTimeIndicators._timeout);
  }

  scheduleCurrentTimeTick();
}
