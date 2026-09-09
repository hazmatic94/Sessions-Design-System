import { escapeHtml } from "../../utils.js";

export const DATE_VARIANTS = ["selected", "current", "hover", "pressed", "default", "disabled"];

export function renderSessionsDate({
  day = 25,
  variant = "default",
  className = "",
  disabled = false,
  dataDay,
  calendarDate,
} = {}) {
  const resolvedDay = dataDay ?? day;
  const classes = [
    "sessions-date",
    variant !== "default" ? `sessions-date--${variant}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const attrs = [
    `class="${classes}"`,
    'type="button"',
    `data-day="${resolvedDay}"`,
    calendarDate ? `data-calendar-date="${calendarDate}"` : "",
    disabled || variant === "disabled" ? "disabled" : "",
    variant === "selected" ? 'aria-pressed="true"' : "",
    variant === "current" ? 'aria-current="date"' : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `<button ${attrs}>${escapeHtml(String(day))}</button>`;
}
