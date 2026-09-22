import { escapeHtml } from "../../utils.js";

export const HOUR_BLOCK_COUNT = 24;

export function resolveHourBlock(hour = 0, minute = 0) {
  const safeHour = ((Number(hour) % HOUR_BLOCK_COUNT) + HOUR_BLOCK_COUNT) % HOUR_BLOCK_COUNT;
  const safeMinute = ((Number(minute) % 60) + 60) % 60;
  const hour12 = safeHour % 12 === 0 ? 12 : safeHour % 12;
  const period = safeHour < 12 ? "am" : "pm";
  const time = `${hour12}:${String(safeMinute).padStart(2, "0")}`;

  return {
    hour: safeHour,
    minute: safeMinute,
    time,
    period,
    label: `${time} ${period}`,
  };
}

export function renderSessionsHourBlock({
  hour = 0,
  minute = 0,
  className = "",
} = {}) {
  const resolved = resolveHourBlock(hour, minute);
  const classes = ["sessions-hour-block", className].filter(Boolean).join(" ");

  return `<button class="${classes}" type="button" data-sessions-hour-block data-hour="${resolved.hour}" data-minute="${resolved.minute}" aria-label="${escapeHtml(resolved.label)}"><span class="sessions-hour-block__time" data-sessions-hour-block-time>${escapeHtml(resolved.time)}</span><span class="sessions-hour-block__period" data-sessions-hour-block-period>${escapeHtml(resolved.period)}</span></button>`;
}

export function applySessionsHourBlock(block, hour, minute) {
  if (!block) return;

  const resolved = resolveHourBlock(
    hour ?? block.dataset.hour,
    minute ?? block.dataset.minute,
  );
  const timeEl = block.querySelector("[data-sessions-hour-block-time]");
  const periodEl = block.querySelector("[data-sessions-hour-block-period]");

  block.dataset.hour = String(resolved.hour);
  block.dataset.minute = String(resolved.minute);
  block.setAttribute("aria-label", resolved.label);
  if (timeEl) timeEl.textContent = resolved.time;
  if (periodEl) periodEl.textContent = resolved.period;
}

export function setupSessionsHourBlocks() {
  document.addEventListener("click", (event) => {
    const block = event.target.closest("[data-sessions-hour-block]");
    if (!block) return;

    event.preventDefault();
    const currentHour = Number(block.dataset.hour || 0);
    applySessionsHourBlock(block, currentHour + 1, block.dataset.minute);
  });
}
