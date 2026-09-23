import { escapeHtml } from "../../utils.js";

export function renderSessionsFooter({
  text,
  year = new Date().getFullYear(),
  className = "",
} = {}) {
  const classes = ["sessions-footer", className].filter(Boolean).join(" ");
  const label = text ?? `© sessions all rights reserved ${year}`;

  return `<footer class="${classes}"><p class="sessions-footer__text">${escapeHtml(label)}</p></footer>`;
}
