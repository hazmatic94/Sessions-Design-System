import { escapeHtml } from "../../utils.js";

export function renderSessionsAvatar({
  src,
  alt = "",
  name,
  initial,
  label,
  href,
  className = "",
} = {}) {
  const classes = ["sessions-avatar", className].filter(Boolean).join(" ");
  const resolvedInitial = resolveInitial({ initial, name });
  const contentMarkup = src
    ? `<img class="sessions-avatar__image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`
    : resolvedInitial
      ? `<span class="sessions-avatar__initial" aria-hidden="true">${escapeHtml(resolvedInitial)}</span>`
      : "";
  const inner = `<span class="sessions-avatar__inner">${contentMarkup}</span>`;
  const resolvedLabel = label ?? alt ?? name ?? (resolvedInitial ? `User ${resolvedInitial}` : "Profile");

  if (href) {
    return `<a class="${classes}" href="${escapeHtml(href)}" aria-label="${escapeHtml(resolvedLabel)}">${inner}</a>`;
  }

  if (label) {
    return `<button class="${classes}" type="button" aria-label="${escapeHtml(label)}">${inner}</button>`;
  }

  const ariaLabel = resolvedLabel ? ` aria-label="${escapeHtml(resolvedLabel)}"` : "";
  const role = src || resolvedInitial ? ' role="img"' : "";

  return `<span class="${classes}"${role}${ariaLabel}>${inner}</span>`;
}

function resolveInitial({ initial, name } = {}) {
  const value = initial ?? name;
  if (!value) return "";
  return String(value).trim().charAt(0).toUpperCase();
}
