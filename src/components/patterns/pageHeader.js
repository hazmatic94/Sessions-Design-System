import { escapeHtml } from "../../utils.js";

export function renderSessionsPageHeader({
  title = "Page title",
  body = "",
  bodyMarkup = "",
  className = "",
} = {}) {
  const classes = ["sessions-page-header", className].filter(Boolean).join(" ");
  const bodyContent = bodyMarkup
    ? bodyMarkup
    : body
      ? `<p class="sessions-page-header__body">${escapeHtml(body)}</p>`
      : "";

  return `<header class="${classes}"><div class="sessions-page-header__text"><h3 class="sessions-page-header__title">${escapeHtml(title)}</h3>${bodyContent}</div></header>`;
}
