import { escapeHtml } from "../../utils.js";

export function renderSessionsCheckbox({
  checked = false,
  className = "",
  attributes = {},
} = {}) {
  const classes = ["sessions-checkbox", className].filter(Boolean).join(" ");
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeHtml(String(value ?? ""))}"`)
    .join(" ");

  return `<span class="${classes}"><input class="sessions-checkbox__input" type="checkbox"${checked ? " checked" : ""}${attrs ? ` ${attrs}` : ""} /><span class="sessions-checkbox__control" aria-hidden="true"></span></span>`;
}
